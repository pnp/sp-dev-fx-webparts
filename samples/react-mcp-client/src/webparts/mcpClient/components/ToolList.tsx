import * as React from 'react';
import { MessageBar, MessageBarType } from '@fluentui/react';
import styles from './McpClient.module.scss';
import { ITool } from '../../../mcp/protocol';
import { validateTool } from '../../../mcp/xMcpHeader';

export interface IToolListProps {
  tools: ITool[];
  rejected: { name: string; reason: string }[];
  selectedName?: string;
  onSelect: (tool: ITool) => void;
}

export const ToolList: React.FC<IToolListProps> = ({ tools, rejected, selectedName, onSelect }) => (
  <div>
    <h3>Tools ({tools.length})</h3>

    {tools.map(tool => {
      const annotations = validateTool(tool).annotations;
      const selected = tool.name === selectedName;
      return (
        <div
          key={tool.name}
          className={`${styles.toolItem} ${selected ? styles.toolItemSelected : ''}`}
          onClick={() => onSelect(tool)}
          onKeyDown={event => {
            if (event.key === 'Enter' || event.key === ' ') {
              onSelect(tool);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <div className={styles.toolName}>
            {tool.title || tool.name}
            {annotations.length > 0 && <span className={styles.badge}>x-mcp-header</span>}
          </div>
          <div className={styles.muted}>{tool.description}</div>
        </div>
      );
    })}

    {rejected.length > 0 && (
      <MessageBar messageBarType={MessageBarType.severeWarning} isMultiline={true}>
        <strong>{rejected.length} tool definition(s) rejected by this client.</strong> The 2026-07-28
        spec requires a client to exclude a tool whose <code>x-mcp-header</code> annotations are
        invalid, so one malformed definition cannot break the rest of the list.
        <ul>
          {rejected.map(r => (
            <li key={r.name}>
              <code>{r.name}</code>: {r.reason}
            </li>
          ))}
        </ul>
      </MessageBar>
    )}
  </div>
);

export default ToolList;
