import { WebPartContext } from '@microsoft/sp-webpart-base';

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  CRITICAL = 4
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  category: string;
  message: string;
  data?: unknown;
  context?: {
    userId?: string;
    siteUrl?: string;
    webPartId?: string;
    correlationId?: string;
  };
  performance?: {
    duration?: number;
    memoryUsage?: number;
  };
  stack?: string;
}

export interface ILoggingService {
  debug(category: string, message: string, data?: unknown): void;
  info(category: string, message: string, data?: unknown): void;
  warn(category: string, message: string, data?: unknown): void;
  error(category: string, message: string, error?: Error, data?: unknown): void;
  critical(category: string, message: string, error?: Error, data?: unknown): void;
  startTimer(operation: string): string;
  endTimer(timerId: string, category: string, message: string, data?: unknown): void;
  flush(): Promise<void>;
  getLogs(level?: LogLevel): LogEntry[];
  clearLogs(): void;
}

export class LoggingService implements ILoggingService {
  private static instance: LoggingService;
  private logs: LogEntry[] = [];
  private timers: Map<string, { start: number; operation: string }> = new Map();
  private context: WebPartContext;
  private correlationId: string;
  private readonly maxLogEntries = 1000;
  private readonly flushInterval = 30000; // 30 seconds
  private flushTimer: number | null = null;
  
  constructor(context: WebPartContext) {
    this.context = context;
    this.correlationId = this.generateCorrelationId();
    this.startAutoFlush();
  }

  public static getInstance(context?: WebPartContext): LoggingService {
    if (!LoggingService.instance && context) {
      LoggingService.instance = new LoggingService(context);
    }
    return LoggingService.instance;
  }

  private generateCorrelationId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private createLogEntry(
    level: LogLevel,
    category: string,
    message: string,
    data?: unknown,
    error?: Error
  ): LogEntry {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      category,
      message,
      data,
      context: {
        userId: this.context?.pageContext?.user?.loginName || 'unknown',
        siteUrl: this.context?.pageContext?.web?.absoluteUrl || 'unknown',
        webPartId: this.context?.instanceId || 'unknown',
        correlationId: this.correlationId
      }
    };

    if (error) {
      entry.stack = error.stack;
    }

    // Add performance metrics if available
    if (performance && 'memory' in performance) {
      const memory = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory;
      entry.performance = {
        memoryUsage: memory.usedJSHeapSize
      };
    }

    return entry;
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);

    // Maintain max log entries
    if (this.logs.length > this.maxLogEntries) {
      this.logs.splice(0, this.logs.length - this.maxLogEntries);
    }

    // Console output with appropriate styling
    this.logToConsole(entry);

    // Store in session storage for debugging
    this.storeInSessionStorage(entry);
  }

  private logToConsole(entry: LogEntry): void {
    const timestamp = new Date(entry.timestamp).toLocaleTimeString();
    const prefix = `[${timestamp}] [${entry.category}]`;
    const message = `${prefix} ${entry.message}`;

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(`🔍 ${message}`, entry.data);
        break;
      case LogLevel.INFO:
        console.info(`ℹ️ ${message}`, entry.data);
        break;
      case LogLevel.WARN:
        console.warn(`⚠️ ${message}`, entry.data);
        break;
      case LogLevel.ERROR:
        console.error(`❌ ${message}`, entry.data, entry.stack);
        break;
      case LogLevel.CRITICAL:
        console.error(`🚨 ${message}`, entry.data, entry.stack);
        break;
    }
  }

  private storeInSessionStorage(entry: LogEntry): void {
    try {
      const key = 'spfx-logs';
      const existingLogs = sessionStorage.getItem(key);
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push(entry);

      // Keep only recent logs in session storage
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100);
      }

      sessionStorage.setItem(key, JSON.stringify(logs));
    } catch (error) {
      console.warn('Failed to store log in session storage:', error);
    }
  }

  private startAutoFlush(): void {
    this.flushTimer = window.setInterval(() => {
      this.flush().catch(error => {
        console.warn('Auto-flush failed:', error);
      });
    }, this.flushInterval);
  }

  public debug(category: string, message: string, data?: unknown): void {
    const entry = this.createLogEntry(LogLevel.DEBUG, category, message, data);
    this.addLog(entry);
  }

  public info(category: string, message: string, data?: unknown): void {
    const entry = this.createLogEntry(LogLevel.INFO, category, message, data);
    this.addLog(entry);
  }

  public warn(category: string, message: string, data?: unknown): void {
    const entry = this.createLogEntry(LogLevel.WARN, category, message, data);
    this.addLog(entry);
  }

  public error(category: string, message: string, error?: Error, data?: unknown): void {
    const entry = this.createLogEntry(LogLevel.ERROR, category, message, data, error);
    this.addLog(entry);
  }

  public critical(category: string, message: string, error?: Error, data?: unknown): void {
    const entry = this.createLogEntry(LogLevel.CRITICAL, category, message, data, error);
    this.addLog(entry);
  }

  public startTimer(operation: string): string {
    const timerId = `${operation}-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    this.timers.set(timerId, {
      start: performance.now(),
      operation
    });
    this.debug('Performance', `Started timer for operation: ${operation}`, { timerId });
    return timerId;
  }

  public endTimer(timerId: string, category: string, message: string, data?: unknown): void {
    const timer = this.timers.get(timerId);
    if (timer) {
      const duration = performance.now() - timer.start;
      const entry = this.createLogEntry(LogLevel.INFO, category, message, data);
      entry.performance = {
        ...entry.performance,
        duration
      };
      this.addLog(entry);
      this.timers.delete(timerId);
    } else {
      this.warn('Performance', `Timer not found: ${timerId}`);
    }
  }

  public async flush(): Promise<void> {
    if (this.logs.length === 0) {
      return;
    }

    try {
      this.debug('LoggingService', `Would flush ${this.logs.length} log entries to monitoring service`);
        const recentLogs = this.logs.slice(-50);
      this.logs = recentLogs;
    } catch (error) {
      console.error('Failed to flush logs:', error);
    }
  }

  public getLogs(level?: LogLevel): LogEntry[] {
    if (level !== undefined) {
      return this.logs.filter(log => log.level >= level);
    }
    return [...this.logs];
  }

  public clearLogs(): void {
    this.logs = [];
    try {
      sessionStorage.removeItem('spfx-logs');
    } catch (error) {
      console.warn('Failed to clear session storage logs:', error);
    }
  }

  public dispose(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    this.flush().catch(console.error);
  }
}

// Performance monitoring decorators
export function LogPerformance(category: string, operation?: string): (target: unknown, propertyName: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
  return function (target: unknown, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const method = descriptor.value;
    
    descriptor.value = async function (...args: unknown[]): Promise<unknown> {
      const logger = LoggingService.getInstance();
      const operationName = operation || `${(target as { constructor: { name: string } }).constructor.name}.${propertyName}`;
      const timerId = logger.startTimer(operationName);
      
      try {
        const result = await method.apply(this, args);
        logger.endTimer(timerId, category, `Completed ${operationName}`, { success: true });
        return result;
      } catch (error) {
        logger.endTimer(timerId, category, `Failed ${operationName}`, { success: false, error });
        logger.error(category, `Error in ${operationName}`, error as Error);
        throw error;
      }
    };
    
    return descriptor;
  };
}

export default LoggingService;