import * as React from 'react';
import type { ICopilotAgentProps } from './ICopilotAgentProps';

export default class CopilotAgent extends React.Component<ICopilotAgentProps> {
  public render(): React.ReactElement<ICopilotAgentProps> {
    const { agentEndpoint, agentName, webPartTitle } = this.props;

    return (
      <section>
        <h2>{webPartTitle}</h2>
        <p>{agentName || 'Configure an M365 Copilot Agent in the property pane.'}</p>
        {agentEndpoint && <p>Endpoint: {agentEndpoint}</p>}
      </section>
    );
  }
}
