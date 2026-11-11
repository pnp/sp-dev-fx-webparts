import { draftSchema } from './supportModel';

export interface ToolResult {
  content: { type: 'text'; text: string }[];
  isError?: boolean;
}

export interface DraftTool {
  name: string;
  description: string;
  inputSchema: typeof draftSchema;
  execute: (input: unknown) => Promise<ToolResult>;
}

interface ModelContext {
  registerTool: (tool: DraftTool, options?: { signal: AbortSignal }) => void | Promise<void>;
  unregisterTool?: (name: string) => void | Promise<void>;
}

export interface WebMcpHost {
  context: ModelContext;
  surface: 'document.modelContext' | 'navigator.modelContext';
}

export function getWebMcpHost(): WebMcpHost | undefined {
  const current = (document as Document & { modelContext?: ModelContext }).modelContext;
  // Earlier Edge/Chromium experiments exposed the same API on navigator.
  const legacy = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
  const context = current || legacy;
  if (context && typeof context.registerTool === 'function') {
    return { context, surface: current ? 'document.modelContext' : 'navigator.modelContext' };
  }
  return undefined;
}

export function toolResult(value: object, isError: boolean = false): ToolResult {
  return { content: [{ type: 'text', text: JSON.stringify(value) }], isError };
}
