import * as React from 'react';
import styles from './ReactTeamsTabsPnpjs.module.scss';
import { IReactTeamsTabsPnpjsProps } from './IReactTeamsTabsPnpjsProps';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import { MessageBar } from 'office-ui-fabric-react';
import { ReactTeamsTabsHelper } from './ReactTeamsTabsHelper';


export interface IReactTeamsTabsPnpjsState {
  pivotArray: any[];
}
export default class ReactTeamsTabsPnpjs extends React.Component<IReactTeamsTabsPnpjsProps, IReactTeamsTabsPnpjsState> {

  constructor(props: IReactTeamsTabsPnpjsProps) {
    super(props);
    this.state = {
      pivotArray: []
    };
  }

  public render() {
    return (
      <div className={styles.reactTeamsTabsPnpjs}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div>
                <MessageBar>
                  Here you can find Channels list and Tabs from MS Teams linked to this site.
                </MessageBar>
                <Nav
                  groups={this.state.pivotArray}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  public componentDidMount() {


    var groupId: Promise<string> = ReactTeamsTabsHelper.getGroupId();

    groupId.then(group => {
      console.log("GroupID: " + group);
      var tmpChannels: any[] = [];
      if (group != "") {
        var channels: Promise<any[]> = ReactTeamsTabsHelper.getChannels(group);

        channels.then(chans => {
          console.log("Channels " + chans.length);
          chans.forEach(channel => {
            var tabs: Promise<any[]> = ReactTeamsTabsHelper.getTabsFromChannel(group, channel.id);
            var tmpTabs: any[] = [];
            tabs.then(itemTabs => {
              console.log("Channel" + channel.displayName + "tabs " + itemTabs.length);
              itemTabs.forEach(tab => {
                tmpTabs.push({ key: tab.id, name: tab.displayName, url: tab.webUrl, target: '_blank' });
              });
              tmpChannels.push({ name: channel.displayName + " (" + tmpTabs.length + ")", links: tmpTabs });
              tmpChannels.sort(this.mySorter);
              this.setState({ pivotArray: tmpChannels });
            });
          });
        });

      } else {
        //TODO show generic message, because there is not a team linked to current site
      }

    });


  }

  public mySorter(a: any, b: any) {
    var x = a.name.toLowerCase();
    var y = b.name.toLowerCase();
    //fix to manage general channel at first position, like Teams order
    //verify language general label
    if (x.startsWith("general")) {
      return -1;
    } else if (y.startsWith("general")) {
      return 1;
    }
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  }
}
