import { AIProjectsClient } from '@azure/ai-projects';
import { DefaultAzureCredential } from '@azure/identity';

export interface IAgentMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** Thin wrapper around Azure AI Projects Agent operations. */
export default class AgentService {
  private client: AIProjectsClient | undefined;

  public async connect(connectionString: string): Promise<void> {
    if (!connectionString.trim()) {
      throw new Error('Unable to connect to Azure AI Projects: connection string is required.');
    }

    try {
      this.client = AIProjectsClient.fromConnectionString(
        connectionString,
        new DefaultAzureCredential()
      );
    } catch (error) {
      throw new Error(`Unable to connect to Azure AI Projects: ${this.errorMessage(error)}`);
    }
  }

  public async ensureAgent(agentName: string): Promise<string> {
    const client = this.getClient();

    if (!agentName.trim()) {
      throw new Error('Unable to ensure agent: agent name is required.');
    }

    try {
      for await (const agent of client.agents.listAgents()) {
        if (agent.name === agentName) {
          return agent.id;
        }
      }

      const agent = await client.agents.createAgent(agentName, { name: agentName });
      return agent.id;
    } catch (error) {
      throw new Error(`Unable to ensure agent "${agentName}": ${this.errorMessage(error)}`);
    }
  }

  public async sendMessage(agentName: string, message: string): Promise<IAgentMessage[]> {
    const client = this.getClient();

    if (!message.trim()) {
      throw new Error('Unable to send message: message content is required.');
    }

    try {
      const agentId = await this.ensureAgent(agentName);
      const thread = await client.agents.createThread();
      await client.agents.createMessage(thread.id, { role: 'user', content: message });

      let run = await client.agents.createRun(thread.id, agentId);
      while (run.status !== 'completed') {
        if (this.isFailedRunStatus(run.status)) {
          throw new Error(`Run ended with status "${run.status}".`);
        }

        await this.wait(500);
        run = await client.agents.getRun(thread.id, run.id);
      }

      const messages: IAgentMessage[] = [];
      for await (const threadMessage of client.agents.listMessages(thread.id)) {
        if (threadMessage.role === 'assistant') {
          const content = threadMessage.content
            .map((item) => item.type === 'text' ? item.text.value : '')
            .filter(Boolean)
            .join('\n');

          if (content) {
            messages.push({ role: 'assistant', content });
          }
        }
      }

      return messages;
    } catch (error) {
      throw new Error(`Unable to send message to agent "${agentName}": ${this.errorMessage(error)}`);
    }
  }

  public disconnect(): void {
    this.client = undefined;
  }

  private getClient(): AIProjectsClient {
    if (!this.client) {
      throw new Error('Azure AI Projects client is not connected. Call connect first.');
    }

    return this.client;
  }

  private isFailedRunStatus(status: string): boolean {
    return ['cancelled', 'cancelling', 'expired', 'failed', 'incomplete', 'requires_action'].indexOf(status) !== -1;
  }

  private wait(milliseconds: number): Promise<void> {
    return new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  }

  private errorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }
}
