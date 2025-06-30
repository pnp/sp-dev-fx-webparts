import * as React from 'react';
import styles from './TeamsTracker.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import { graph } from '@pnp/graph';
import * as MSGraph from '@microsoft/microsoft-graph-types';
import { ITeamsTrackerWebPartProps } from '../TeamsTrackerWebPart';
import Team from './Team';
import { Spinner } from '@fluentui/react';

export default function TeamsTracker(props: ITeamsTrackerWebPartProps): JSX.Element {

  // Use React Hooks to manage state - useState returns value and setter as array...
  const initialTeamsList: MSGraph.Group[] = null;
  const [teamsList, setTeamsList] = React.useState(initialTeamsList);

  React.useEffect(() => {
    (async (): Promise<void> => {
      const teams = await graph.me.joinedTeams.get();
      setTeamsList(teams);
    })().catch(err => {
      console.error(err);
    });
  }, []);

  let content = null;
  if (teamsList === null) content = <Spinner />;
  else if (teamsList.length === 0) content = <div>You are not a member of any teams.</div>;
  else content = (
    <div>
      <ul>
        {teamsList.map(team => (
          <li key={team.id}>
            <Team channelID={team.id} displayName={team.displayName} showChannels={props.showChannels} />
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.column}>
          <h2>{escape(props.title)}</h2>
          <p>{escape(props.description)}</p>
        </div>
        <div className={styles.column}>
          {content}
          <br />
        </div>
      </div>
    </div>
  );
}