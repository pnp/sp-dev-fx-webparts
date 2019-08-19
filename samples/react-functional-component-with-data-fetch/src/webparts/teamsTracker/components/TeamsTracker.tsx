import * as React from 'react';
import styles from './TeamsTracker.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import * as Fabric from 'office-ui-fabric-react';
import { graph } from '@pnp/graph';
import * as MSGraph from '@microsoft/microsoft-graph-types';
import { ITeamsTrackerWebPartProps } from '../TeamsTrackerWebPart';
import Team from './Team';

export default function TeamsTracker(props: ITeamsTrackerWebPartProps) {

  // Use React Hooks to manage state - useState returns value and setter as array...
  const initialTeamsList: MSGraph.Group[] = null;
  const [teamsList, setTeamsList] = React.useState(initialTeamsList);
  // Use React Hooks to manage lifecycle events like data fetching...
  React.useEffect(() => {
    graph.me.joinedTeams.get().then(teams => { setTeamsList(teams); });
  }, []);

  // create the content to be shown in the second column
  var content = null;
  if (teamsList === null) content = <Fabric.Spinner />;
  else if (teamsList.length === 0) content = <div>You are not a member if any teams.</div>;
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