import { PathValidationError } from '../utils/fileUrl';

export type DocumentLibraryErrorCode = 'accessDenied' | 'throttled' | 'notFound' | 'invalidPath' | 'generic';

export class DocumentLibraryError extends Error {
  public constructor(public readonly code: DocumentLibraryErrorCode, message: string, public readonly cause?: unknown) {
    super(message);
    this.name = 'DocumentLibraryError';
    Object.setPrototypeOf(this, DocumentLibraryError.prototype);
  }
}

function errorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') return undefined;
  const candidate = error as { status?: number; statusCode?: number; response?: { status?: number } };
  return candidate.status || candidate.statusCode || candidate.response?.status;
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error || '');
}

export function classifySharePointError(error: unknown): DocumentLibraryErrorCode {
  if (error instanceof PathValidationError || error instanceof DocumentLibraryError && error.code === 'invalidPath') return 'invalidPath';
  const status = errorStatus(error);
  const text = errorText(error).toLowerCase();
  if (status === 401 || status === 403 || /access denied|forbidden|unauthori[sz]ed/.test(text)) return 'accessDenied';
  if (status === 429 || status === 503 || /throttl|too many requests|retry-after/.test(text)) return 'throttled';
  if (status === 404 || /not found|does not exist|cannot find/.test(text)) return 'notFound';
  return 'generic';
}

export function documentLibraryError(error: unknown): DocumentLibraryError {
  if (error instanceof DocumentLibraryError) return error;
  const code = classifySharePointError(error);
  const messages: Record<DocumentLibraryErrorCode, string> = {
    accessDenied: 'You do not have permission to read this library.',
    throttled: 'SharePoint is temporarily limiting requests. Wait a moment and try again.',
    notFound: 'The configured library or folder could not be found.',
    invalidPath: 'The configured path is invalid or outside the library root.',
    generic: 'The library could not be loaded. Try refreshing the page.'
  };
  return new DocumentLibraryError(code, messages[code], error);
}
