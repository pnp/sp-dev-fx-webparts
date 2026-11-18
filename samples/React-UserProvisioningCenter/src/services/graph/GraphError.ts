export const RETRYABLE_STATUS_CODES: readonly number[] = [429, 502, 503, 504];

export class GraphServiceError extends Error {
  public readonly statusCode: number;
  public readonly graphCode: string;
  public readonly requestId: string;
  public readonly retryable: boolean;
  public readonly retryAfterSeconds: number | undefined;

  public constructor(
    message: string,
    statusCode: number,
    graphCode: string,
    requestId: string,
    retryAfterSeconds?: number
  ) {
    super(message);
    Object.setPrototypeOf(this, GraphServiceError.prototype);
    this.name = 'GraphServiceError';
    this.statusCode = statusCode;
    this.graphCode = graphCode;
    this.requestId = requestId;
    this.retryable = statusCode === 0 || RETRYABLE_STATUS_CODES.indexOf(statusCode) !== -1;
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export class RequestAbortedError extends Error {
  public constructor() {
    super('Request aborted');
    Object.setPrototypeOf(this, RequestAbortedError.prototype);
    this.name = 'RequestAbortedError';
  }
}

interface IRawGraphErrorShape {
  statusCode?: number;
  code?: string;
  requestId?: string;
  message?: string;
  body?: string;
  headers?: { get?: (name: string) => string | null };
}

export function toGraphServiceError(err: unknown): GraphServiceError {
  if (err instanceof GraphServiceError) {
    return err;
  }
  const raw: IRawGraphErrorShape = (err ?? {}) as IRawGraphErrorShape;
  let code: string = raw.code ?? 'UnknownError';
  let message: string = raw.message ?? 'Unknown Graph error';
  if (raw.body && typeof raw.body === 'string') {
    try {
      const parsed: { error?: { code?: string; message?: string } } = JSON.parse(raw.body);
      code = parsed.error?.code ?? code;
      message = parsed.error?.message ?? message;
    } catch (parseErr) {
      void parseErr;
    }
  }
  let retryAfter: number | undefined;
  const headerValue: string | null | undefined = raw.headers?.get?.('Retry-After');
  if (headerValue) {
    const parsedHeader: number = parseInt(headerValue, 10);
    if (!isNaN(parsedHeader)) {
      retryAfter = parsedHeader;
    }
  }
  return new GraphServiceError(
    message,
    typeof raw.statusCode === 'number' ? raw.statusCode : 0,
    code,
    raw.requestId ?? '',
    retryAfter
  );
}
