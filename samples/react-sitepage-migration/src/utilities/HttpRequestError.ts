const sensitiveHeaders = new Set<string>([
  'authorization',
  'cookie',
  'set-cookie',
  'x-requestdigest',
  'x-ms-cookie',
  'proxy-authorization'
]);

const maxRetainedBodyLength = 2048;

const redactHeaders = (headers: Record<string, string>): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(headers)) {
    result[key] = sensitiveHeaders.has(key.toLowerCase()) ? '[redacted]' : value;
  }
  return result;
};

export class HttpRequestError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly responseBody: string;
  public readonly requestUrl: string;
  public readonly headers: Record<string, string>;

  public constructor(
    status: number,
    statusText: string,
    responseBody: string,
    requestUrl: string,
    headers: Record<string, string> = {}
  ) {
    const truncatedBody = responseBody.length > maxRetainedBodyLength
      ? `${responseBody.slice(0, maxRetainedBodyLength)}… [truncated]`
      : responseBody;

    super(`${status.toString()} ${statusText}: ${truncatedBody}`);
    this.name = 'HttpRequestError';
    this.status = status;
    this.statusText = statusText;
    this.responseBody = truncatedBody;
    this.requestUrl = requestUrl;
    this.headers = redactHeaders(headers);

    Object.setPrototypeOf(this, HttpRequestError.prototype);
  }

  public get retryAfterMs(): number | undefined {
    return parseRetryAfter(this.headers);
  }
}

export const parseRetryAfter = (headers: Record<string, string> | undefined): number | undefined => {
  if (!headers) {
    return undefined;
  }

  const key = Object.keys(headers).find((name) => name.toLowerCase() === 'retry-after');
  const retryAfter = key ? headers[key] : undefined;
  if (!retryAfter) {
    return undefined;
  }

  const seconds = parseInt(retryAfter, 10);
  if (!Number.isNaN(seconds)) {
    return seconds * 1000;
  }

  const retryDate = Date.parse(retryAfter);
  if (!Number.isNaN(retryDate)) {
    return Math.max(0, retryDate - Date.now());
  }

  return undefined;
};
