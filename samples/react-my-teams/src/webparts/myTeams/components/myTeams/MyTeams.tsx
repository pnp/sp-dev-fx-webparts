import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import styles from '../myTeams/MyTeams.module.scss';
import { IMyTeamsProps, IMyTeamsState } from '.';
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

    // get teams
    this._myTeams = await this._getTeams();


    this.setState({
      items: this._myTeams,
    });
  }

  public render(): React.ReactElement<IMyTeamsProps> {
    return (
      <FocusZone id="testId">
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
        <a href="#" title='Click to open channel' onClick={this._openChannel.bind(this, team.id)}>
          <span>{team.displayName}</span>
        </a>
      </div>
    );
  }

  private _openChannel = async (teamId: string): Promise<void> => {
    let link = '#';

    const teamChannels: IChannel[] = await this._getTeamChannels(teamId);
    const channel = teamChannels[0];

    if (this.props.openInClientApp) {
      link = channel.webUrl;
    } else {
      link = `https://teams.microsoft.com/_#/conversations/${channel.displayName}?threadId=${channel.id}&ctx=channel`;
    }

    window.open(link, '_blank');
  }

  private _getTeams = async (): Promise<ITeam[]> => {
    let myTeams: ITeam[] = [];
    try {
      myTeams = await this.props.teamsService.GetTeams();
      console.log(myTeams);
    } catch (error) {
      console.log('Error getting teams', error);
    }
    return myTeams;
  }

  private _getTeamChannels = async (teamId): Promise<IChannel[]> => {
    let channels: IChannel[] = [];
    try {
      channels = await this.props.teamsService.GetTeamChannels(teamId);
      console.log(channels);
    } catch (error) {
      console.log('Error getting channels for team ' + teamId, error);
    }
    return channels;
  }
}
