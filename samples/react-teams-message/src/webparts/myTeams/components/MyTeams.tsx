import * as React from 'react';
import styles from './MyTeams.module.scss';
import { IMyTeamsProps } from './IMyTeamsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ServiceProvider } from '../../../shared/services/ServiceProvider';
import { TreeView, ITreeItem, TreeItemActionsDisplayMode, TreeViewSelectionMode } from "@pnp/spfx-controls-react/lib/TreeView";
import { PrimaryButton, DefaultButton, Dialog, DialogFooter, DialogType, TextField, MessageBar,MessageBarType } from 'office-ui-fabric-react';
import { initializeIcons } from '@uifabric/icons';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";

export interface IMyTeamsState {
  myteams: any[];
  selectedTeam: any;
  teamChannels: any;
  selectedChannel: any;
  hideDailog: boolean;
  currentMessage: string;
  showMessage: boolean;
}

export default class MyTeams extends React.Component<IMyTeamsProps, IMyTeamsState> {
  private serviceProvider;
  private selectedItems;

  public constructor(props: IMyTeamsProps, state: IMyTeamsState) {
    super(props);
    this.serviceProvider = new ServiceProvider(this.props.context);
    this.state = {
      myteams: [],
      selectedTeam: null,
      selectedChannel: null,
      teamChannels: [],
      hideDailog: true,
      currentMessage: "",
      showMessage: false

    };
    initializeIcons();
  }

  public async componentDidMount() {
    this.GetmyTeams();
  }

  private GetmyTeams() {

    this.serviceProvider.
      getmyTeams()
      .then(
        (result: any[]): void => {
          console.log(result);
          this.createRequiredTreeItems(result);
        }
      )
      .catch(error => {
        console.log(error);
      });
  }

  private async createRequiredTreeItems(result) {
    var array = [];
    let i = 0;
    result.forEach(element => {
      array.push({
        index: i,
        key: element.id,
        label: element.displayName,
        subLabel: this.props.showdescription ? element.description : "",
        data: element,
        type: "team",
        selectable: false,
        children: [{ key: element.id + "_d", label: "Loading channels" }]
      });
      i++;
    });

    this.setState({ myteams: array });
  }

  private async loadChannels(teamid, index) {
    var array = this.state.myteams;

    var firstTeamChannels = await this.getChannels(teamid);
    array[index].children = [];
    firstTeamChannels.forEach(channel => {
      array[index].children.push({
        key: channel.id,
        label: channel.displayName,
        subLabel: this.props.showdescription ? channel.description : "",
        data: channel,
        type: "channel",
        parent: array[index],
        iconProps: {
          iconName: 'TeamsLogoInverse'
        },
        actions: [{
          title: "Open Channel",
          iconProps: {
            iconName: 'Link'
          },
          id: "GetItem",
          actionCallback: async (treeItem: ITreeItem) => {
            console.log(treeItem.data.webUrl);
            window.open(treeItem.data.webUrl);
          }
        },
        {
          title: "Send Message",
          iconProps: {
            iconName: 'Send'
          },
          id: "Send Message",
          actionCallback: async (treeItem: ITreeItem) => {
            this.selectedItems = [treeItem];

            this.setState({ hideDailog: false });
          }
        }]
      });
    });

    this.setState({ myteams: array });

  }

  public render(): React.ReactElement<IMyTeamsProps> {
    return (
      <React.Fragment>
        <div className={styles.myTeams}>
          <i className="ms-Icon ms-Icon--TeamsLogo" aria-hidden="true"></i>
          {/* <h1 className={styles.webpartitle}>

            {this.props.webparttitle}</h1> */}

            <WebPartTitle displayMode={this.props.displayMode}
              title={this.props.webparttitle}
              updateProperty={this.props.updateProperty} />
           
          {this.state.showMessage &&
          <React.Fragment>
            <br></br>
            < MessageBar    onDismiss={()=>{this.setState({showMessage:false});}} style={{height:'20px'}} messageBarType={MessageBarType.success} >
            Message Posted Successfully.
            </MessageBar >
            </React.Fragment>
        }
         <TreeView
          items={this.state.myteams}
          defaultExpanded={false}
          selectChildrenIfParentSelected={false}
          selectionMode={TreeViewSelectionMode.Single}
          showCheckboxes={false}
          treeItemActionsDisplayMode={TreeItemActionsDisplayMode.ContextualMenu}
          onSelect={(items) => this.onTreeItemSelect(items)}
          onExpandCollapse={(items, isExpanded) => this.onTreeItemExpandCollapse(items, isExpanded)}
        />
        {!this.state.hideDailog &&
          <Dialog
            hidden={this.state.hideDailog}
            onDismiss={this._closeDialog}
            dialogContentProps={{
              type: DialogType.largeHeader,
              title: this.selectedItems[0].parent.label
              
            }}
            modalProps={{
              isBlocking: false,
              styles: { main: { minWidth: 600 } }
            }}
          >
            <span>{"Sending to channel: "  + this.selectedItems[0].label}</span>
            <TextField required onChange={evt => this.updateInputValue(evt)} value={this.state.currentMessage} label="Message" multiline resizable={true} />
            <DialogFooter>
              <PrimaryButton onClick={() => this._sendMessage()} text="Send" />
              <DefaultButton onClick={this._closeDialog} text="Cancel" />
            </DialogFooter>
          </Dialog>
        }
        </div>
      </React.Fragment >
    );
  }

  private onTreeItemSelect(items: ITreeItem[]) {
    console.log("Items selected: ", items);
    if (this.props.openpopuponselectingchannel) {
      this.selectedItems = items;
      this.setState({ hideDailog: false });
    }
  }

  private async onTreeItemExpandCollapse(item: any, isExpanded: boolean) {
    console.log((isExpanded ? "Item expanded: " : "Item collapsed: ") + item);

    this.loadChannels(item.data.id, item.index);

  }

  private updateInputValue(evt) {
    this.setState({
      currentMessage: evt.target.value
    });
  }

  private _closeDialog = (): void => {
    this.setState({ hideDailog: true });
  }

  private async getChannels(teamid) {

    var returnResult = await this.serviceProvider.
      getChannel(teamid)
      .then(
        (result): void => {
          console.log(result);
          return result;
        }
      )
      .catch(error => {
        console.log(error);
      });

    return returnResult;
  }

  private async _sendMessage() {
    var selecteTeamId = this.selectedItems[0].parent.key;
    var selectedChannelId = this.selectedItems[0].key;
    await this.serviceProvider.
      sendMessage(selecteTeamId, selectedChannelId, this.state.currentMessage)
      .then(
        (result: any[]): void => {
          console.log(result);
          this.setState({ hideDailog: true, currentMessage: "",showMessage:true });
        }
      )
      .catch(error => {
        console.log(error);
      });
  }
}

