import * as React from 'react';
import { FluentProvider, makeStyles, Text, tokens, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import type { IMcpClientProps } from './IMcpClientProps';
import { ConnectionPanel } from './ConnectionPanel';
import { ToolList } from './ToolList';
import { ToolInvokeForm } from './ToolInvokeForm';
import { ResultViewer } from './ResultViewer';
import { McpConnectionProvider } from '../context/McpConnectionContext';
import { useMcpConnection } from '../hooks/useMcpConnection';
import { useToolInvocation } from '../hooks/useToolInvocation';
import type { IServerLaunchConfig, IToolSummary } from '../services/types';

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalL, padding: tokens.spacingHorizontalL },
  content: { display: 'grid', gridTemplateColumns: 'minmax(220px, 1fr) minmax(280px, 2fr)', gap: tokens.spacingHorizontalL },
  section: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalM },
});

const McpClientContent: React.FC<IMcpClientProps> = ({
  bridgeUrl,
  defaultServerCommand,
  defaultServerArgs,
  webPartTitle,
  autoConnect = false,
}) => {
  const styles = useStyles();
  const launchConfig = React.useMemo<IServerLaunchConfig>(() => ({
    command: defaultServerCommand,
    args: defaultServerArgs.trim() ? defaultServerArgs.trim().split(/\s+/) : [],
  }), [defaultServerArgs, defaultServerCommand]);
  const [connectionConfig, setConnectionConfig] = React.useState<IServerLaunchConfig>(launchConfig);
  const [connectRequested, setConnectRequested] = React.useState(false);
  const connection = useMcpConnection(bridgeUrl, connectionConfig);
  const invocation = useToolInvocation(connection.service);
  const [selectedTool, setSelectedTool] = React.useState<IToolSummary>();

  React.useEffect(() => {
    setConnectionConfig(launchConfig);
  }, [launchConfig]);

  React.useEffect(() => {
    if ((autoConnect && connection.status === 'idle') || connectRequested) {
      setConnectRequested(false);
      if (!connectionConfig.command) return;
      void connection.connect();
    }
  }, [autoConnect, connectRequested, connection, connectionConfig.command]);

  const requestConnection = React.useCallback((config: IServerLaunchConfig): void => {
    setConnectionConfig(config);
    setConnectRequested(true);
  }, []);

  return (
    <div className={styles.root}>
      <Text as="h2" size={500} weight="semibold">{webPartTitle}</Text>
      <ConnectionPanel
        status={connection.status}
        initialConfig={launchConfig}
        onConnect={requestConnection}
        onDisconnect={connection.disconnect}
      />
      <ResultViewer error={connection.error?.message || invocation.error?.message} result={invocation.result} />
      {connection.status === 'connected' && (
        <div className={styles.content}>
          <section className={styles.section}>
            <Text as="h3" weight="semibold">Tools</Text>
            <ToolList tools={connection.tools} selectedTool={selectedTool} onSelectTool={setSelectedTool} />
          </section>
          {selectedTool && (
            <section className={styles.section}>
              <Text as="h3" weight="semibold">{selectedTool.name}</Text>
              <ToolInvokeForm tool={selectedTool} onInvoke={invocation.invoke} disabled={invocation.isInvoking} />
            </section>
          )}
        </div>
      )}
    </div>
  );
};

const McpClient: React.FC<IMcpClientProps> = (props) => (
  <FluentProvider theme={props.isDarkTheme ? webDarkTheme : webLightTheme}>
    <McpConnectionProvider>
      <McpClientContent {...props} />
    </McpConnectionProvider>
  </FluentProvider>
);

export default McpClient;
