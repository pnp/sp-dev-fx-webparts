/**
 * The `x-mcp-header` extension, introduced in protocol revision 2026-07-28.
 *
 * A server may annotate a tool parameter so the client mirrors its value into
 * an `Mcp-Param-{Name}` HTTP header, letting a gateway route or rate limit on
 * it without reading the body. Support is optional for servers and
 * **mandatory for clients**, which is why it is implemented here rather than
 * skipped as an edge case.
 *
 * The spec also requires clients to reject a tool whose annotations break the
 * rules, excluding it from the result of tools/list, so that one malformed
 * definition cannot poison the whole tool list.
 *
 * Spec: https://modelcontextprotocol.io/specification/2026-07-28/server/tools#x-mcp-header
 */

import { ITool, IToolInputProperty, IToolInputSchema } from './protocol';

export interface IHeaderAnnotation {
  /** Chain of `properties` keys leading to the annotated property. */
  path: string[];
  /** The name portion, used to build `Mcp-Param-{name}`. */
  headerName: string;
}

export interface IToolValidation {
  valid: boolean;
  reason?: string;
  annotations: IHeaderAnnotation[];
}

/** RFC 9110 field-name token characters. */
const TCHAR = /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+$/;

const PRIMITIVE_TYPES: string[] = ['string', 'boolean', 'integer'];

const collect = (
  schema: IToolInputSchema | IToolInputProperty | undefined,
  path: string[],
  found: IHeaderAnnotation[],
  problems: string[]
): void => {
  if (!schema || !schema.properties) {
    return;
  }
  const properties = schema.properties;
  for (const key of Object.keys(properties)) {
    const property = properties[key];
    const here = path.concat([key]);
    const annotation = property['x-mcp-header'];

    if (annotation !== undefined) {
      if (typeof annotation !== 'string' || annotation.length === 0) {
        problems.push(`x-mcp-header on "${here.join('.')}" must be a non empty string`);
      } else if (!TCHAR.test(annotation)) {
        problems.push(`x-mcp-header "${annotation}" is not a valid HTTP field name token`);
      } else if (PRIMITIVE_TYPES.indexOf(property.type || '') < 0) {
        problems.push(
          `x-mcp-header "${annotation}" is on a ${property.type || 'untyped'} property. Only string, boolean and integer may be mirrored`
        );
      } else {
        found.push({ path: here, headerName: annotation });
      }
    }

    // Only chains made entirely of `properties` keys are statically reachable,
    // so nested objects recurse and nothing else does.
    if (property.properties) {
      collect(property, here, found, problems);
    }
  }
};

export const validateTool = (tool: ITool): IToolValidation => {
  const found: IHeaderAnnotation[] = [];
  const problems: string[] = [];

  collect(tool.inputSchema, [], found, problems);

  const seen: { [lower: string]: boolean } = {};
  for (const annotation of found) {
    const lower = annotation.headerName.toLowerCase();
    if (seen[lower]) {
      problems.push(`x-mcp-header "${annotation.headerName}" is used more than once`);
    }
    seen[lower] = true;
  }

  return {
    valid: problems.length === 0,
    reason: problems.length > 0 ? problems.join('; ') : undefined,
    annotations: found
  };
};

export interface IToolFilterResult {
  tools: ITool[];
  rejected: { name: string; reason: string }[];
}

/**
 * Applies the client side rule: a tool with invalid annotations is excluded
 * from the tool list, and the reason is kept so the UI can show it rather than
 * silently dropping the tool.
 */
export const filterValidTools = (tools: ITool[]): IToolFilterResult => {
  const kept: ITool[] = [];
  const rejected: { name: string; reason: string }[] = [];

  for (const tool of tools) {
    const validation = validateTool(tool);
    if (validation.valid) {
      kept.push(tool);
    } else {
      rejected.push({ name: tool.name, reason: validation.reason || 'invalid tool definition' });
    }
  }

  return { tools: kept, rejected };
};

/** Reads the value at an annotation's exact property path from the arguments. */
export const valueAtPath = (args: { [key: string]: unknown }, path: string[]): unknown => {
  let current: unknown = args;
  for (const segment of path) {
    if (current === null || typeof current !== 'object') {
      return undefined;
    }
    current = (current as { [key: string]: unknown })[segment];
  }
  return current;
};
