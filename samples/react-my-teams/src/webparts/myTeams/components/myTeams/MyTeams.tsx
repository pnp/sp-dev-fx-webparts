import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import styles from '../myTeams/MyTeams.module.scss';
import { IMyTeamsProps, IMyTeamsState } from '.';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITeam, IChannel } from '../../../../shared/interfaces';

export class MyTeams extends React.Component<IMyTeamsProps, IMyTeamsState> {

  private _myTeams: ITeam[] = [];

  constructor(props: IMyTeamsProps) {
    super(props);

    this.state = {
      items: []
    };
  }

  public async componentDidMount() {
    await this._load();
  }

  public async componentDidUpdate(prevProps: IMyTeamsProps) {
    if (this.props.openInClientApp !== prevProps.openInClientApp) {
      await this._load();
    }
  }

  private _load = async (): Promise<void> => {

    this._myTeams = await this._getTeams();

    this.setState({
      items: this._myTeams
    });
  }

  public render(): React.ReactElement<IMyTeamsProps> {
    return (
      <FocusZone>
        <List
          className={styles.myTeams}
          items={this._myTeams}
          renderedWindowsAhead={4}
          onRenderCell={this._onRenderCell}
        />
      </FocusZone>
    );
  }

  private _onRenderCell = (team: ITeam, index: number | undefined): JSX.Element => {
    return (
      <div>
        <a href="#" title='Click to open channel' onClick={this._openChannel.bind(this, team.id, this.props.tenantId)}>
          <span>{team.displayName}</span>
        </a>
      </div>
    );
  }

  private _openChannel = async (teamId: string, tenantId: string): Promise<void> => {
    let link = '#';

    const teamChannels: IChannel[] = await this._getTeamChannels(teamId);
    const channel = teamChannels[0];

    if (this.props.openInClientApp) {
      link = `https://teams.microsoft.com/l/channel/${channel.id}/${channel.displayName}?groupId=${teamId}&tenantId=${tenantId}`;
    } else {
      link = `https://teams.microsoft.com/_#/conversations/${channel.displayName}?threadId=${channel.id}&ctx=channel`;
    }

    window.open(link, '_blank');
  }

  private _getTeams = async (): Promise<ITeam[]> => {
    let myTeams: ITeam[] = [];
    try {
      const teamsResponse = await this.props.graphClient.api('me/joinedTeams').version('v1.0').get();
      myTeams = teamsResponse.value as ITeam[];
    } catch (error) {
      console.log('Error getting teams');
    }
    return myTeams;
  }

  private _getTeamChannels = async (teamId): Promise<IChannel[]> => {
    let channels: IChannel[] = [];
    try {
      const channelsResponse = await this.props.graphClient.api(`teams/${teamId}/channels`).version('v1.0').get();
      channels = channelsResponse.value as IChannel[];
    } catch (error) {
      console.log('Error getting channels for team ' + teamId);
    }
    return channels;
  }
}
