export interface IServerLaunchConfig {
  command: string;
  args: string[];
  env?: Record<string, string>;
}

export interface IToolSummary {
  name: string;
  description?: string;
  inputSchema: Record<string, unknown>;
}

export type ConnectionStatus = "idle" | "connecting" | "connected" | "error" | "closed";
