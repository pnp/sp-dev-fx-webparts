import * as React from 'react';
import styles from './TeamsCreator.module.scss';
import { ITeamsCreatorProps } from './ITeamsCreatorProps';
import { TextField, ITextField } from 'office-ui-fabric-react/lib/TextField';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { PrimaryButton, DefaultButton, ActionButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { PeoplePicker, PrincipalType, IPeoplePickerUserItem } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import * as strings from 'TeamsCreatorWebPartStrings';
import { MSGraphClient } from '@microsoft/sp-http';

/**
 * State of the component
 */
export enum CreationState {
  /**
   * Initial state - user input
   */
  notStarted = 0,
  /**
   * creating all selected elements (group, team, channel, tab)
   */
  creating = 1,
  /**
   * everything has been created
   */
  created = 2,
  /**
   * error during creation
   */
  error = 4
}

/**
 * App definition returned from App Catalog
 */
export interface ITeamsApp {
  id: string;
  externalId?: string;
  displayName: string;
  version: string;
  distributionMethod: string;
}

/**
 * State
 */
export interface ITeamsCreatorState {
  /**
   * Selected team name. Also used as group name
   */
  teamName?: string;
  /**
   * team description
   */
  teamDescription?: string;
  /**
   * Group owners
   */
  owners?: string[];
  /**
   * group members
   */
  members?: string[];
  /**
   * Flag if channel should be created
   */
  createChannel?: boolean;
  /**
   * channel name
   */
  channelName?: string;
  /**
   * channel description
   */
  channelDescription?: string;
  /**
   * flag if we need to add a tab
   */
  addTab?: boolean;
  /**
   * tab name
   */
  tabName?: string;
  /**
   * teams apps from app catalog
   */
  apps?: ITeamsApp[];
  /**
   * current state of the component
   */
  creationState?: CreationState;
  /**
   * creation spinner text
   */
  spinnerText?: string;
  /**
   * id of the selected app to be added as tab
   */
  selectedAppId?: string;
}

export default class TeamsCreator extends React.Component<ITeamsCreatorProps, ITeamsCreatorState> {
  constructor(props: ITeamsCreatorProps) {
    super(props);

    this.state = {
      creationState: CreationState.notStarted
    };

    this._onClearClick = this._onClearClick.bind(this);
  }

  public render(): React.ReactElement<ITeamsCreatorProps> {

    const {
      teamName,
      teamDescription,
      createChannel,
      channelName,
      channelDescription,
      addTab,
      tabName,
      apps,
      creationState,
      spinnerText,
      selectedAppId
    } = this.state;

    const appsDropdownOptions: IDropdownOption[] = apps ? apps.map(app => { return { key: app.id, text: app.displayName }; }) : [];

    return (
      <div className={styles.teamsCreator}>
        <h2>{strings.Welcome}</h2>
        <div className={styles.container}>
          {{
            0: <div>
              <div className={styles.teamSection}>
                <TextField required={true} label={strings.TeamNameLabel} value={teamName} onChanged={this._onTeamNameChange.bind(this)}></TextField>
                <TextField label={strings.TeamDescriptionLabel} value={teamDescription} onChanged={this._onTeamDescriptionChange.bind(this)}></TextField>
                <PeoplePicker
                  context={this.props.context}
                  titleText={strings.Owners}
                  personSelectionLimit={3}
                  showHiddenInUI={false}
                  principleTypes={[PrincipalType.User]}
                  selectedItems={this._onOwnersSelected.bind(this)}
                  isRequired={true} />
                <PeoplePicker
                  context={this.props.context}
                  titleText={strings.Members}
                  personSelectionLimit={3}
                  showHiddenInUI={false}
                  principleTypes={[PrincipalType.User]}
                  selectedItems={this._onMembersSelected.bind(this)} />
              </div>
              <Checkbox label={strings.CreateChannel} checked={createChannel} onChange={this._onCreateChannelChange.bind(this)} />
              {createChannel && <div>
                <div className={styles.channelSection}>
                  <TextField required={createChannel} label={strings.ChannelName} value={channelName} onChanged={this._onChannelNameChange.bind(this)}></TextField>
                  <TextField label={strings.ChannelDescription} value={channelDescription} onChanged={this._onChannelDescriptionChange.bind(this)}></TextField>
                </div>
                <Checkbox label={strings.AddTab} checked={addTab} onChange={this._onAddTabChange.bind(this)} />
                {addTab && <div>
                  <TextField required={addTab} label={strings.TabName} value={tabName} onChanged={this._onTabNameChange.bind(this)}></TextField>
                  <Dropdown
                    required={addTab}
                    label={strings.App}
                    disabled={!this.state.apps}
                    options={appsDropdownOptions}
                    selectedKey={selectedAppId}
                    onChanged={this._onAppSelected.bind(this)}></Dropdown>
                </div>}
              </div>}
              <div className={styles.buttons}>
                <PrimaryButton text={strings.Create} className={styles.button} onClick={this._onCreateClick.bind(this)} />
                <DefaultButton text={strings.Clear} className={styles.button} onClick={this._onClearClick} />
              </div>
            </div>,
            1: <div>
              <Spinner label={spinnerText} />
            </div>,
            2: <div>
              <div>{strings.Success}</div>
              <PrimaryButton iconProps={{ iconName: 'TeamsLogo' }} href='https://aka.ms/mstfw' target='_blank'>{strings.OpenTeams}</PrimaryButton>
              <DefaultButton onClick={this._onClearClick}>{strings.StartOver}</DefaultButton>
            </div>,
            4: <div>
              <div className={styles.error}>{strings.Error}</div>
              <DefaultButton onClick={this._onClearClick}>{strings.StartOver}</DefaultButton>
            </div>
          }[creationState]}
        </div>
      </div>
    );
  }

  private _onTeamNameChange(value: string) {
    this.setState({
      teamName: value
    });
  }

  private _onTeamDescriptionChange(value: string) {
    this.setState({
      teamDescription: value
    });
  }

  private _onChannelNameChange(value: string) {
    this.setState({
      channelName: value
    });
  }

  private _onChannelDescriptionChange(value: string) {
    this.setState({
      channelDescription: value
    });
  }

  private _onTabNameChange(value: string) {
    this.setState({
      tabName: value
    });
  }

  private _onAppSelected(item: IDropdownOption) {
    this.setState({
      selectedAppId: item.key as string
    });
  }

  private _onCreateChannelChange(e: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean) {
    this.setState({
      createChannel: checked
    });
  }

  private _onAddTabChange(e: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean) {
    this.setState({
      addTab: checked
    });

    this._getAvailableApps();
  }

  private _onMembersSelected(members: IPeoplePickerUserItem[]) {
    this.setState({
      members: members.map(m => m.id)
    });
  }

  private _onOwnersSelected(owners: IPeoplePickerUserItem[]) {
    this.setState({
      owners: owners.map(o => o.id)
    });
  }

  private async _onCreateClick() {
    this._processCreationRequest();
  }
  private _onClearClick() {
    this._clearState();
  }

  private _clearState() {
    this.setState({
      teamName: '',
      teamDescription: '',
      members: [],
      owners: [],
      createChannel: false,
      channelName: '',
      channelDescription: '',
      addTab: false,
      tabName: '',
      selectedAppId: '',
      creationState: CreationState.notStarted,
      spinnerText: ''
    });
  }

  private async _getAvailableApps(): Promise<void> {
    if (this.state.apps) {
      return;
    }

    const context = this.props.context;
    const graphClient = await context.msGraphClientFactory.getClient();

    const appsResponse = await graphClient.api('appCatalogs/teamsApps').version('v1.0').get();
    const apps = appsResponse.value as ITeamsApp[];
    apps.sort((a, b) => {
      if (a.displayName < b.displayName) {
        return -1;
      }
      else if (a.displayName > b.displayName) {
        return 1;
      }
      return 0;
    });

    this.setState({
      apps: apps
    });
  }

  /**
   * Main flow
   */
  private async _processCreationRequest(): Promise<void> {
    const context = this.props.context;
    // initializing graph client to be used in all requests
    const graphClient = await context.msGraphClientFactory.getClient();

    this.setState({
      creationState: CreationState.creating,
      spinnerText: strings.CreatingGroup
    });

    //
    // Create a group first
    //
    const groupId = await this._createGroup(graphClient);
    if (!groupId) {
      this._onError();
      return;
    }

    this.setState({
      spinnerText: strings.CreatingTeam
    });

    //
    // Create team
    //
    const teamId = await this._createTeamWithAttempts(groupId, graphClient);
    if (!teamId) {
      this._onError();
      return;
    }

    if (!this.state.createChannel) {
      this.setState({
        creationState: CreationState.created
      });
      return;
    }

    this.setState({
      spinnerText: strings.CreatingChannel
    });

    //
    // Create channel
    //
    const channelId = await this._createChannel(teamId, graphClient);
    if (!channelId) {
      this._onError();
      return;
    }

    if (!this.state.addTab) {
      this.setState({
        creationState: CreationState.created
      });
      return;
    }

    this.setState({
      spinnerText: strings.InstallingApp
    });

    //
    // install app
    //
    const isInstalled = await this._installApp(teamId, graphClient);
    if (!isInstalled) {
      this._onError();
      return;
    }

    this.setState({
      spinnerText: strings.CreatingTab
    });

    //
    // add tab
    //
    const isTabCreated = await this._addTab(teamId, channelId, graphClient);
    if (!isTabCreated) {
      this._onError();
    }
    else {
      this.setState({
        creationState: CreationState.created
      });
    }

  }

  private _onError(message?: string): void {
    this.setState({
      creationState: CreationState.error
    });
  }

  /**
   * Installs the app to the team
   * @param teamId team Id
   * @param graphClient graph client
   */
  private async _installApp(teamId: string, graphClient: MSGraphClient): Promise<boolean> {
    try {
      await graphClient.api(`teams/${teamId}/installedApps`).version('v1.0').post({
        'teamsApp@odata.bind': `https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/${this.state.selectedAppId}`
      });
    }
    catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  /**
   * Adds tab to the specified channel of the team
   * @param teamId team id
   * @param channelId channel id
   * @param graphClient graph client
   */
  private async _addTab(teamId: string, channelId: string, graphClient: MSGraphClient): Promise<boolean> {
    try {
      await graphClient.api(`teams/${teamId}/channels/${channelId}/tabs`).version('v1.0').post({
        displayName: this.state.tabName,
        'teamsApp@odata.bind': `https://graph.microsoft.com/v1.0/appCatalogs/teamsApps/${this.state.selectedAppId}`
      });
    }
    catch (error) {
      console.error(error);
      return false;
    }

    return true;
  }

  /**
   * Creates channel in the team
   * @param teamId team id
   * @param graphClient graph client
   */
  private async _createChannel(teamId: string, graphClient: MSGraphClient): Promise<string> {
    const {
      channelName,
      channelDescription
    } = this.state;

    try {
      const response = await graphClient.api(`teams/${teamId}/channels`).version('v1.0').post({
        displayName: channelName,
        description: channelDescription
      });

      return response.id;
    }
    catch (error) {
      console.error(error);
      return '';
    }
  }

  /**
   * Creates O365 group
   * @param graphClient graph client
   */
  private async _createGroup(graphClient: MSGraphClient): Promise<string> {
    const displayName = this.state.teamName;
    const mailNickname = this._generateMailNickname(displayName);

    let {
      owners,
      members
    } = this.state;

    const groupRequest = {
      displayName: displayName,
      description: this.state.teamDescription,
      groupTypes: [
        'Unified'
      ],
      mailEnabled: true,
      mailNickname: mailNickname,
      securityEnabled: false
    };
    if (owners && owners.length) {
      groupRequest['owners@data.bind'] = owners.map(owner => {
        return `https://graph.microsoft.com/v1.0/users/${owner}`;
      });
    }
    if (members && members.length) {
      groupRequest['members@data.bind'] = members.map(member => {
        return `https://graph.microsoft.com/v1.0/users/${member}`;
      });
    }
    try {
      const response = await graphClient.api('groups').version('v1.0').post(groupRequest);
      return response.id;
    }
    catch (error) {
      console.error(error);
      return '';
    }


  }

  /**
   * Creates team. as mentioned in the documentation - we need to make multiple attempts if team creation request errored
   * @param groupId group id
   * @param graphClient graph client
   */
  private async _createTeamWithAttempts(groupId: string, graphClient: MSGraphClient): Promise<string> {

    let attemptsCount = 0;
    let teamId: string = '';

    //
    // From the documentation: If the group was created less than 15 minutes ago, it's possible for the Create team call to fail with a 404 error code due to replication delays. 
    // The recommended pattern is to retry the Create team call three times, with a 10 second delay between calls.
    //
    do {
      teamId = await this._createTeam(groupId, graphClient);
      if (teamId) {
        attemptsCount = 3;
      }
      else {
        attemptsCount++;
      }
    } while (attemptsCount < 3);

    return teamId;
  }

  /**
   * Waits 10 seconds and tries to create a team
   * @param groupId group id
   * @param graphClient graph client
   */
  private async _createTeam(groupId: string, graphClient: MSGraphClient): Promise<string> {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        graphClient.api(`groups/${groupId}/team`).version('v1.0').put({
          memberSettings: {
            allowCreateUpdateChannels: true
          },
          messagingSettings: {
            allowUserEditMessages: true,
            allowUserDeleteMessages: true
          },
          funSettings: {
            allowGiphy: true,
            giphyContentRating: "strict"
          }
        }).then(response => {
          resolve(response.id);
        }, () => {
          resolve('');
        });
      }, 10000);
    });
  }

  /**
   * Generates mail nick name by display name of the group
   * @param displayName group display name
   */
  private _generateMailNickname(displayName: string): string {
    return displayName.toLowerCase().replace(/\s/gmi, '-');
  }
}
