import * as React from "react";
import { Badge, Button, Field, Input, makeStyles, tokens } from "@fluentui/react-components";
import { PlugConnected24Regular, PlugDisconnected24Regular } from "@fluentui/react-icons";
import type { ConnectionStatus, IServerLaunchConfig } from "../services/types";

export interface IConnectionPanelProps {
  status: ConnectionStatus;
  onConnect: (launchConfig: IServerLaunchConfig) => void | Promise<void>;
  onDisconnect: () => void | Promise<void>;
  initialConfig?: IServerLaunchConfig;
}

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: tokens.spacingVerticalM, padding: tokens.spacingHorizontalM },
  actions: { display: "flex", alignItems: "center", gap: tokens.spacingHorizontalS },
});

const badgeColor: Record<ConnectionStatus, "success" | "danger" | "warning" | "informative"> = {
  idle: "informative",
  connecting: "warning",
  connected: "success",
  error: "danger",
  closed: "informative",
};

export const ConnectionPanel: React.FC<IConnectionPanelProps> = ({ status, onConnect, onDisconnect, initialConfig }) => {
  const styles = useStyles();
  const [command, setCommand] = React.useState(initialConfig?.command ?? "");
  const [argumentsText, setArgumentsText] = React.useState(initialConfig?.args.join(" ") ?? "");
  const isConnected = status === "connected";

  const connect = (): void => {
    void onConnect({ command, args: argumentsText.trim() ? argumentsText.trim().split(/\s+/) : [] });
  };

  return (
    <section className={styles.root} aria-label="MCP server connection">
      <Field label="Command">
        <Input value={command} onChange={(_, data) => setCommand(data.value)} placeholder="npx" />
      </Field>
      <Field label="Arguments">
        <Input value={argumentsText} onChange={(_, data) => setArgumentsText(data.value)} placeholder="-y server-package" />
      </Field>
      <div className={styles.actions}>
        <Badge appearance="filled" color={badgeColor[status]}>{status}</Badge>
        {isConnected ? (
          <Button icon={<PlugDisconnected24Regular />} onClick={() => void onDisconnect()}>Disconnect</Button>
        ) : (
          <Button appearance="primary" icon={<PlugConnected24Regular />} disabled={!command || status === "connecting"} onClick={connect}>Connect</Button>
        )}
      </div>
    </section>
  );
};
