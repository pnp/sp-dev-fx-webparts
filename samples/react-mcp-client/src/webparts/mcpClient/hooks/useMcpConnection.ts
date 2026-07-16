import * as React from "react";
import { McpConnectionContext } from "../context/McpConnectionContext";
import { McpClientService } from "../services/McpClientService";
import { ConnectionStatus, IServerLaunchConfig, IToolSummary } from "../services/types";

interface IMcpConnection {
  status: ConnectionStatus;
  tools: IToolSummary[];
  error?: Error;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  service: McpClientService;
}

export const useMcpConnection = (
  bridgeUrl: string,
  launchConfig: IServerLaunchConfig
): IMcpConnection => {
  const service = React.useContext(McpConnectionContext);
  const [status, setStatus] = React.useState<ConnectionStatus>("idle");
  const [tools, setTools] = React.useState<IToolSummary[]>([]);
  const [error, setError] = React.useState<Error>();

  if (!service) {
    throw new Error("useMcpConnection must be used within an McpConnectionProvider");
  }

  const connect = React.useCallback(async (): Promise<void> => {
    setStatus("connecting");
    setError(undefined);

    try {
      await service.connect(bridgeUrl, launchConfig);
      setTools(await service.listTools());
      setStatus("connected");
    } catch (connectError) {
      setTools([]);
      setError(connectError instanceof Error ? connectError : new Error(String(connectError)));
      setStatus("error");
    }
  }, [bridgeUrl, launchConfig, service]);

  const disconnect = React.useCallback(async (): Promise<void> => {
    try {
      await service.disconnect();
      setTools([]);
      setError(undefined);
      setStatus("closed");
    } catch (disconnectError) {
      setError(disconnectError instanceof Error ? disconnectError : new Error(String(disconnectError)));
      setStatus("error");
    }
  }, [service]);

  return { status, tools, error, connect, disconnect, service };
};
