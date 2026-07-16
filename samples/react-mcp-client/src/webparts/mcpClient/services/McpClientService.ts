import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { McpBridgeTransport } from "./McpBridgeTransport";
import { IServerLaunchConfig, IToolSummary } from "./types";

export class McpClientService {
  private client?: Client;

  async connect(bridgeUrl: string, launchConfig: IServerLaunchConfig): Promise<void> {
    const transport = new McpBridgeTransport(bridgeUrl, launchConfig);
    this.client = new Client(
      { name: "spfx-mcp-client", version: "1.0.0" },
      { capabilities: {} }
    );
    await this.client.connect(transport);
  }

  async listTools(): Promise<IToolSummary[]> {
    if (!this.client) throw new Error("Not connected");
    const result = await this.client.listTools();
    return result.tools.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema as Record<string, unknown>
    }));
  }

  async callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
    if (!this.client) throw new Error("Not connected");
    return this.client.callTool({ name, arguments: args });
  }

  async disconnect(): Promise<void> {
    await this.client?.close();
    this.client = undefined;
  }
}
