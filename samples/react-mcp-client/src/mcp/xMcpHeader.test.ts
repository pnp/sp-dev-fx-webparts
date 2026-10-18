import { validateTool, filterValidTools, valueAtPath } from './xMcpHeader';
import { ITool } from './protocol';

const tool = (schema: unknown, name: string = 'a_tool'): ITool =>
  ({ name, inputSchema: schema } as ITool);

describe('validateTool', () => {
  it('accepts the execute_sql example from the specification', () => {
    const result = validateTool(
      tool({
        type: 'object',
        properties: {
          region: { type: 'string', 'x-mcp-header': 'Region' },
          query: { type: 'string' }
        }
      })
    );
    expect(result.valid).toBe(true);
    expect(result.annotations.length).toBe(1);
    expect(result.annotations[0].headerName).toBe('Region');
    expect(result.annotations[0].path).toEqual(['region']);
  });

  it('accepts a nested property reached only through properties keys', () => {
    const result = validateTool(
      tool({
        type: 'object',
        properties: {
          target: {
            type: 'object',
            properties: { tenant: { type: 'string', 'x-mcp-header': 'Tenant' } }
          }
        }
      })
    );
    expect(result.valid).toBe(true);
    expect(result.annotations[0].path).toEqual(['target', 'tenant']);
  });

  it('rejects an annotation on a non primitive', () => {
    const result = validateTool(
      tool({ type: 'object', properties: { tags: { type: 'array', 'x-mcp-header': 'Tags' } } })
    );
    expect(result.valid).toBe(false);
  });

  it('rejects number, which the spec excludes even though it is primitive', () => {
    const result = validateTool(
      tool({ type: 'object', properties: { ratio: { type: 'number', 'x-mcp-header': 'Ratio' } } })
    );
    expect(result.valid).toBe(false);
  });

  it('rejects an empty header name', () => {
    const result = validateTool(
      tool({ type: 'object', properties: { a: { type: 'string', 'x-mcp-header': '' } } })
    );
    expect(result.valid).toBe(false);
  });

  it('rejects a header name that is not a valid field token', () => {
    const result = validateTool(
      tool({ type: 'object', properties: { a: { type: 'string', 'x-mcp-header': 'bad header' } } })
    );
    expect(result.valid).toBe(false);
  });

  it('rejects a header name containing a newline', () => {
    const result = validateTool(
      tool({ type: 'object', properties: { a: { type: 'string', 'x-mcp-header': 'A\nB' } } })
    );
    expect(result.valid).toBe(false);
  });

  it('rejects duplicate header names case insensitively', () => {
    const result = validateTool(
      tool({
        type: 'object',
        properties: {
          a: { type: 'string', 'x-mcp-header': 'Region' },
          b: { type: 'string', 'x-mcp-header': 'region' }
        }
      })
    );
    expect(result.valid).toBe(false);
  });

  it('treats a tool with no schema as valid with no annotations', () => {
    expect(validateTool({ name: 'plain' }).valid).toBe(true);
  });
});

describe('filterValidTools', () => {
  it('excludes only the invalid tool, so one bad definition does not break the list', () => {
    const good = tool({ type: 'object', properties: { a: { type: 'string' } } }, 'good');
    const bad = tool({ type: 'object', properties: { t: { type: 'array', 'x-mcp-header': 'T' } } }, 'bad');

    const result = filterValidTools([good, bad]);

    expect(result.tools.map(t => t.name)).toEqual(['good']);
    expect(result.rejected.length).toBe(1);
    expect(result.rejected[0].name).toBe('bad');
    expect(result.rejected[0].reason.length).toBeGreaterThan(0);
  });
});

describe('valueAtPath', () => {
  it('reads a nested value', () => {
    expect(valueAtPath({ target: { tenant: 'contoso' } }, ['target', 'tenant'])).toBe('contoso');
  });

  it('returns undefined when the path is absent', () => {
    expect(valueAtPath({}, ['target', 'tenant'])).toBeUndefined();
  });
});
