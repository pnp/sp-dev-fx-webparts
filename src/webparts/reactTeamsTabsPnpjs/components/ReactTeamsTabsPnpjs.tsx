import * as React from 'react';
import styles from './ReactTeamsTabsPnpjs.module.scss';
import { IReactTeamsTabsPnpjsProps } from './IReactTeamsTabsPnpjsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem, IPivotProps, PivotLinkSize, PivotLinkFormat } from 'office-ui-fabric-react/lib/Pivot';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { sp } from "@pnp/sp";
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
    this._onRenderTabItem = this._onRenderTabItem.bind(this);

  }

  public render() {
    return (
      <div className={styles.reactTeamsTabsPnpjs}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <div>
                <Pivot linkSize={PivotLinkSize.large} >{this.state.pivotArray}</Pivot>
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
                tmpTabs.push({ name: tab.displayName, tabURL: tab.webUrl });
              });
              tmpChannels.push(this._renderPivotItemList(tmpTabs, channel.displayName));
              this.setState({ pivotArray: tmpChannels });
            });
          });
        });

      } else {
        //TODO show generic message, because there is not a team linked to current site
      }



    });


  }

  private _renderPivotItemList(channels: any[], tabName: string) {
    return (
      <PivotItem headerText={`${tabName} (${channels.length})`}>
        <FocusZone direction={FocusZoneDirection.vertical} >
          <List items={channels} onRenderCell={this._onRenderTabItem} />
        </FocusZone>
      </PivotItem>
    );
  }

  private _onRenderTabItem(item: any, index: number | undefined) {
    return (
      <div className={styles.itemCell} data-is-focusable={true}>
        <div className={styles.itemContent}>
          <div className={styles.itemName}>{item.name}</div>
          <Link className={styles.tablink} href={item.tabURL} target="_blank">{item.name}</Link>
        </div>
      </div>
    );
  }
}
