export class PageTrustError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = "PageTrustError";
  }
}

export function httpStatus(error: unknown): number | undefined {
  if (typeof error === "object" && error) {
    const status = (error as { status?: unknown }).status;
    if (typeof status === "number") {
      return status;
    }
  }
  return undefined;
}

export function toUserMessage(error: unknown, fallback: string): string {
  if (error instanceof PageTrustError && error.message) {
    return error.message;
  }
  const status = httpStatus(error);
  if (status === 401 || status === 403) {
    return "You don't have permission to do that.";
  }
  if (status === 404) {
    return "The page, list, or column could not be found.";
  }
  if (error instanceof Error && error.message && (error.message.indexOf("Page Trust") === 0 || error.message.indexOf("Verified Page Banner") === 0)) {
    return error.message;
  }
  return fallback;
}
