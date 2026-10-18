import * as React from 'react';
import { PrimaryButton, DefaultButton, MessageBar, MessageBarType, Spinner, SpinnerSize, Link } from '@fluentui/react';

import styles from './McpClient.module.scss';
import { IMcpClientProps } from './IMcpClientProps';
import { McpClient, ITraceEntry } from '../../../mcp/McpClient';
import { MockHttpTransport } from '../../../mcp/MockHttpTransport';
import { FetchHttpTransport } from '../../../mcp/FetchHttpTransport';
import { ICallToolResult, ITool, PROTOCOL_VERSION } from '../../../mcp/protocol';
import ToolList from './ToolList';
import ToolInvokeForm from './ToolInvokeForm';
import TracePanel from './TracePanel';

const MOCK_ENDPOINT = 'https://mock.local/mcp';

const message = (e: unknown): string => (e instanceof Error ? e.message : String(e));

const renderResult = (result: ICallToolResult): string => {
  if (result.content && result.content.length > 0) {
    return result.content
      .map(block => (block.type === 'text' && block.text !== undefined ? block.text : JSON.stringify(block, null, 2)))
      .join('\n');
  }
  return JSON.stringify(result, null, 2);
};

export const McpClientView: React.FC<IMcpClientProps> = props => {
  const { endpointUrl, useMockServer, aadResourceUri, getToken, hasTeamsContext } = props;

  const client = React.useMemo<McpClient>(() => {
    const transport = useMockServer
      ? new MockHttpTransport()
      : new FetchHttpTransport(aadResourceUri && getToken ? getToken : undefined);
    return new McpClient(transport, useMockServer ? MOCK_ENDPOINT : endpointUrl);
  }, [useMockServer, endpointUrl, aadResourceUri, getToken]);

  const [tools, setTools] = React.useState<ITool[]>([]);
  const [rejected, setRejected] = React.useState<{ name: string; reason: string }[]>([]);
  const [cacheNote, setCacheNote] = React.useState<string | undefined>(undefined);
  const [selected, setSelected] = React.useState<ITool | undefined>(undefined);
  const [result, setResult] = React.useState<string | undefined>(undefined);
  const [trace, setTrace] = React.useState<ITraceEntry[]>([]);
  const [busy, setBusy] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

  // A new client means a new connection, so nothing from the previous one survives.
  React.useEffect(() => {
    setTools([]);
    setRejected([]);
    setSelected(undefined);
    setResult(undefined);
    setTrace([]);
    setError(undefined);
    setCacheNote(undefined);
  }, [client]);

  const listTools = React.useCallback((): void => {
    setBusy(true);
    setError(undefined);
    client
      .listTools()
      .then(outcome => {
        setTools(outcome.tools);
        setRejected(outcome.rejected);
        setSelected(outcome.tools.length > 0 ? outcome.tools[0] : undefined);
        setCacheNote(
          outcome.ttlMs
            ? `Server says this list is cacheable for ${Math.round(outcome.ttlMs / 1000)}s (scope: ${outcome.cacheScope || 'unspecified'}).`
            : undefined
        );
      })
      .catch((e: unknown) => setError(message(e)))
      .then(() => {
        setTrace(client.trace);
        setBusy(false);
      })
      .catch(() => undefined);
  }, [client]);

  const invoke = React.useCallback(
    (args: { [key: string]: unknown }): void => {
      if (!selected) {
        return;
      }
      setBusy(true);
      setError(undefined);
      setResult(undefined);
      client
        .callTool(selected, args)
        .then(callResult => {
          setResult(renderResult(callResult));
          if (callResult.isError) {
            setError('The tool reported an error. See the result and the trace.');
          }
        })
        .catch((e: unknown) => setError(message(e)))
        .then(() => {
          setTrace(client.trace);
          setBusy(false);
        })
        .catch(() => undefined);
    },
    [client, selected]
  );

  const discover = React.useCallback((): void => {
    setBusy(true);
    setError(undefined);
    client
      .discover()
      .then(info => setResult(JSON.stringify(info, null, 2)))
      .catch((e: unknown) => setError(message(e)))
      .then(() => {
        setTrace(client.trace);
        setBusy(false);
      })
      .catch(() => undefined);
  }, [client]);

  const clearTrace = React.useCallback((): void => {
    client.clearTrace();
    setTrace([]);
  }, [client]);

  const endpointMissing = !useMockServer && !endpointUrl;

  return (
    <section className={`${styles.mcpClient} ${hasTeamsContext ? styles.teams : ''}`}>
      <h2>MCP client</h2>
      <p className={styles.muted}>
        Speaking Model Context Protocol <strong>{PROTOCOL_VERSION}</strong> over Streamable HTTP.
        This revision is stateless: there is no <code>initialize</code> handshake and no{' '}
        <code>Mcp-Session-Id</code>. Every request carries its own protocol version, client identity
        and capabilities.{' '}
        <Link
          href="https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http"
          target="_blank"
          rel="noreferrer"
        >
          Specification
        </Link>
      </p>

      <MessageBar messageBarType={useMockServer ? MessageBarType.warning : MessageBarType.info}>
        Transport: <strong>{client.transportLabel}</strong>
        {useMockServer
          ? '. Nothing leaves the browser. Turn off "Use mock server" in the property pane to point at a real endpoint.'
          : `. Endpoint: ${endpointUrl || '(not set)'}${aadResourceUri ? ', with an Entra bearer token for the signed-in user' : ', unauthenticated'}`}
      </MessageBar>

      {endpointMissing && (
        <MessageBar messageBarType={MessageBarType.severeWarning}>
          Set an endpoint URL in the property pane, or turn the mock server back on.
        </MessageBar>
      )}

      {error && (
        <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
          {error}
        </MessageBar>
      )}

      <div className={styles.controls}>
        <PrimaryButton text="List tools" onClick={listTools} disabled={busy || endpointMissing} />
        <DefaultButton text="server/discover" onClick={discover} disabled={busy || endpointMissing} />
      </div>

      {cacheNote && <p className={styles.muted}>{cacheNote}</p>}
      {busy && <Spinner size={SpinnerSize.medium} label="Waiting for the server" />}

      <div className={styles.layout}>
        <div className={styles.column}>
          <ToolList
            tools={tools}
            rejected={rejected}
            selectedName={selected ? selected.name : undefined}
            onSelect={setSelected}
          />
        </div>

        <div className={styles.column}>
          {selected && <ToolInvokeForm tool={selected} busy={busy} onInvoke={invoke} />}
          {result !== undefined && (
            <div>
              <h3>Result</h3>
              <div className={styles.result}>{result}</div>
            </div>
          )}
        </div>
      </div>

      <TracePanel entries={trace} onClear={clearTrace} />
    </section>
  );
};

export default McpClientView;
