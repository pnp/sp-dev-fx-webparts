import * as React from 'react';
import { graph } from '@pnp/graph';

export default function Team({ channelID, displayName, showChannels }): JSX.Element {
  const [channelsList, setChannelsList] = React.useState([]);
  React.useEffect(() => {
    (async (): Promise<void> => {
      if (showChannels) {
        const channels = await graph.teams.getById(channelID).channels.get();
        setChannelsList(channels);
      } else {
        setChannelsList([]);
      }
    })().catch(err => {
      console.error(err);
    });
  }, [showChannels]);

  return (
    <div>
      <h4>{displayName}</h4>
      <ul>
        {channelsList.map(channel => (
          <li key={channel.id}>
            <a href={channel.webUrl}>{channel.displayName}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
