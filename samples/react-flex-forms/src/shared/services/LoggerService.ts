import { Logger, LogLevel } from '@pnp/logging';

export function logError(operation: string, error: unknown): void {
  const detail = error instanceof Error ? `${error.name}: ${error.message}` : String(error);
  Logger.write(`[Flex Forms] ${operation}: ${detail}`, LogLevel.Error);
}
