import { redactForLogging } from '../../utilities/ErrorSerialization';

export type LogLevel = 'Info' | 'Warning' | 'Error';

export interface LogEntry {
  readonly timestamp: string;
  readonly level: LogLevel;
  readonly message: string;
  readonly details?: unknown;
}

const MAX_LOG_ENTRIES = 500;
const TRIM_BATCH = 100;

export class Logger {
  private readonly _entries: LogEntry[] = [];
  private _droppedCount = 0;

  public info(message: string, details?: unknown): void {
    this.push('Info', message, details);
  }

  public warning(message: string, details?: unknown): void {
    this.push('Warning', message, details);
  }

  public error(message: string, details?: unknown): void {
    this.push('Error', message, details);
  }

  public get entries(): ReadonlyArray<LogEntry> {
    return this._entries;
  }

  public get droppedCount(): number {
    return this._droppedCount;
  }

  public snapshot(): ReadonlyArray<LogEntry> {
    return [...this._entries];
  }

  public clear(): void {
    this._entries.length = 0;
    this._droppedCount = 0;
  }

  private push(level: LogLevel, message: string, details?: unknown): void {
    this._entries.push({
      timestamp: new Date().toISOString(),
      level,
      message,
      details: details === undefined ? undefined : redactForLogging(details)
    });

    if (this._entries.length > MAX_LOG_ENTRIES) {
      const removed = this._entries.splice(0, TRIM_BATCH);
      this._droppedCount += removed.length;
    }
  }
}
