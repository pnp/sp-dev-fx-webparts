import * as React from 'react';
import { DefaultButton } from '@fluentui/react';
import styles from './McpClient.module.scss';
import { ITraceEntry } from '../../../mcp/McpClient';

export interface ITracePanelProps {
  entries: ITraceEntry[];
  onClear: () => void;
}

const headerLines = (headers: { [name: string]: string }): string =>
  Object.keys(headers)
    .map(name => `${name}: ${headers[name]}`)
    .join('\n');

/**
 * The point of the sample. Every call is shown as the HTTP that went on the
 * wire, including the 2026-07-28 metadata headers, so the protocol is visible
 * rather than hidden inside an agent.
 */
export const TracePanel: React.FC<ITracePanelProps> = ({ entries, onClear }) => (
  <div>
    <h3>
      JSON-RPC trace ({entries.length}){' '}
      <DefaultButton text="Clear" onClick={onClear} disabled={entries.length === 0} />
    </h3>

    {entries.length === 0 && (
      <p className={styles.muted}>Nothing sent yet. List tools or call one to see the traffic.</p>
    )}

    <div className={styles.trace}>
      {entries
        .slice()
        .reverse()
        .map(entry => (
          <div key={entry.seq} className={styles.traceEntry}>
            <div>
              <strong>
                #{entry.seq} {entry.method}
              </strong>{' '}
              {entry.response ? `HTTP ${entry.response.status}` : ''} {entry.durationMs}ms
            </div>

            <div>{'>'} POST {entry.request.url}</div>
            <div>{headerLines(entry.request.headers)}</div>
            <div>{entry.request.body}</div>

            {entry.response && (
              <div>
                <div>
                  {'<'} {entry.response.status} {entry.response.statusText} (
                  {entry.response.contentType})
                </div>
                <div>{entry.response.body}</div>
              </div>
            )}

            {entry.notifications.length > 0 && (
              <div>
                {'<'} {entry.notifications.length} notification(s) before the response
              </div>
            )}

            {entry.error && <div className={styles.traceError}>! {entry.error}</div>}
          </div>
        ))}
    </div>
  </div>
);

export default TracePanel;
