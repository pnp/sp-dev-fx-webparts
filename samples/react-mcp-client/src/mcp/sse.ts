/**
 * Minimal Server-Sent Events reader.
 *
 * Under Streamable HTTP the server answers a request with either a single JSON
 * object or an SSE stream carrying request-scoped notifications followed by the
 * final response. A client must support both, so this parses the stream body
 * and separates the notifications from the response.
 *
 * Per the SSE specification a line beginning with a colon is a comment and must
 * be ignored, which is how servers keep long streams alive.
 */

import { IJsonRpcResponse } from './protocol';

export interface ISseParseResult {
  /** Request-scoped notifications received before the response, in order. */
  notifications: unknown[];
  /** The final JSON-RPC response, when the stream carried one. */
  response?: IJsonRpcResponse;
}

const isResponse = (message: unknown): boolean => {
  if (message === null || typeof message !== 'object') {
    return false;
  }
  const candidate = message as { id?: unknown; result?: unknown; error?: unknown };
  return candidate.id !== undefined && (candidate.result !== undefined || candidate.error !== undefined);
};

export const parseSse = (body: string): ISseParseResult => {
  const notifications: unknown[] = [];
  let response: IJsonRpcResponse | undefined;

  // Events are separated by a blank line. Normalise line endings first.
  const events = body.replace(/\r\n/g, '\n').split(/\n\n+/);

  for (const event of events) {
    const dataLines: string[] = [];
    for (const line of event.split('\n')) {
      if (line.length === 0 || line.charAt(0) === ':') {
        continue; // comment or padding, ignore
      }
      if (line.indexOf('data:') === 0) {
        // A single leading space after the colon is part of the framing.
        const value = line.substring('data:'.length);
        dataLines.push(value.charAt(0) === ' ' ? value.substring(1) : value);
      }
    }

    if (dataLines.length === 0) {
      continue;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(dataLines.join('\n'));
    } catch {
      continue; // a frame we cannot read is not fatal to the ones we can
    }

    if (isResponse(parsed)) {
      response = parsed as IJsonRpcResponse;
    } else {
      notifications.push(parsed);
    }
  }

  return { notifications, response };
};
