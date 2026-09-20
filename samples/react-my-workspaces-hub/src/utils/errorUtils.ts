/**
 * Normalises any thrown value into a human readable message string.
 *
 * @param error - Any value caught from a try/catch block.
 * @returns A best-effort string description of the error.
 */
export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
};
