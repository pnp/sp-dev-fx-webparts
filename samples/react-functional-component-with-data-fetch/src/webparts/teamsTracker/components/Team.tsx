import * as React from 'react';
import { graph } from '@pnp/graph';

export default function Team({ channelID, displayName, showChannels }) {
  const [channelsList, setChannelsList] = React.useState([]);
  React.useEffect(() => {
    if (showChannels)
      graph.teams.getById(channelID).channels.get().then(channels => { setChannelsList(channels); });
    else
      setChannelsList([]);
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
