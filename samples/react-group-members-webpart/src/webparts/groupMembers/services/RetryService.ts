import { LoggingService } from './LoggingService';
import { ConfigurationService } from './ConfigurationService';

export interface RetryOptions {
  maxAttempts?: number;
  baseDelay?: number;
  maxDelay?: number;
  backoffFactor?: number;
  jitter?: boolean;
  retryCondition?: (error: Error) => boolean;
  onRetry?: (attempt: number, error: Error) => void;
  signal?: AbortSignal;
}

export interface RetryResult<T> {
  result?: T;
  attempts: number;
  totalTime: number;
  errors: Error[];
  success: boolean;
}

export interface IRetryService {
  executeWithRetry<T>(
    operation: () => Promise<T>,
    operationName: string,
    options?: RetryOptions
  ): Promise<T>;
  
  executeWithCircuitBreaker<T>(
    operation: () => Promise<T>,
    operationName: string,
    options?: RetryOptions
  ): Promise<T>;
}

enum CircuitState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN',
  HALF_OPEN = 'HALF_OPEN'
}

interface CircuitBreakerInfo {
  state: CircuitState;
  failures: number;
  lastFailureTime: number;
  nextAttemptTime: number;
  successCount: number;
}

export class RetryService implements IRetryService {
  private static instance: RetryService;
  private logger: LoggingService;
  private config: ConfigurationService;
  private circuitBreakers: Map<string, CircuitBreakerInfo> = new Map();
  
  // Circuit breaker configuration
  private readonly failureThreshold = 5;
  private readonly recoveryTimeout = 30000; // 30 seconds
  private readonly halfOpenMaxCalls = 3;

  constructor() {
    this.logger = LoggingService.getInstance();
    this.config = ConfigurationService.getInstance();
  }

  public static getInstance(): RetryService {
    if (!RetryService.instance) {
      RetryService.instance = new RetryService();
    }
    return RetryService.instance;
  }

  public async executeWithRetry<T>(
    operation: () => Promise<T>,
    operationName: string,
    options: RetryOptions = {}
  ): Promise<T> {
    const config = this.config.getConfiguration();
    const startTime = performance.now();
    
    const {
      maxAttempts = config.api.retryAttempts,
      baseDelay = config.api.retryDelay,
      maxDelay = 30000,
      backoffFactor = 2,
      jitter = true,
      retryCondition = this.defaultRetryCondition,
      onRetry,
      signal
    } = options;

    const errors: Error[] = [];
    let attempt = 0;

    this.logger.debug('RetryService', `Starting retry operation: ${operationName}`, {
      maxAttempts,
      baseDelay,
      maxDelay
    });

    while (attempt < maxAttempts) {
      attempt++;
      
      try {
        // Check if operation was cancelled
        if (signal?.aborted) {
          throw new Error('Operation was cancelled');
        }

        const result = await operation();
        
        const totalTime = performance.now() - startTime;
        this.logger.info('RetryService', `Operation succeeded: ${operationName}`, {
          attempt,
          totalTime,
          success: true
        });

        return result;
        
      } catch (error) {
        errors.push(error);
        
        this.logger.warn('RetryService', `Attempt ${attempt} failed for ${operationName}`, {
          error: error instanceof Error ? error.message : String(error),
          attempt,
          maxAttempts
        });

        // Check if we should retry this error
        if (!retryCondition(error)) {
          this.logger.error('RetryService', `Non-retryable error for ${operationName}`, error as Error);
          throw error;
        }

        // Check if this is the last attempt
        if (attempt >= maxAttempts) {
          break;
        }

        // Call retry callback
        if (onRetry) {
          onRetry(attempt, error);
        }

        // Calculate delay with exponential backoff and jitter
        const delay = this.calculateDelay(attempt, baseDelay, maxDelay, backoffFactor, jitter);
        
        this.logger.debug('RetryService', `Waiting ${delay}ms before retry ${attempt + 1}`, {
          operationName,
          attempt,
          delay
        });

        // Wait before retry (unless cancelled)
        await this.delay(delay, signal);
      }
    }

    // All attempts failed
    const totalTime = performance.now() - startTime;
    const finalError = new Error(
      `Operation '${operationName}' failed after ${maxAttempts} attempts. Last error: ${
        errors[errors.length - 1]?.message || 'Unknown error'
      }`
    );

    this.logger.error('RetryService', `All retry attempts failed for ${operationName}`, finalError, {
      attempts: attempt,
      totalTime,
      errors: errors.map(e => e?.message || String(e))
    });

    throw finalError;
  }

  public async executeWithCircuitBreaker<T>(
    operation: () => Promise<T>,
    operationName: string,
    options: RetryOptions = {}
  ): Promise<T> {
    const circuitInfo = this.getOrCreateCircuitBreaker(operationName);
    
    // Check circuit state
    if (circuitInfo.state === CircuitState.OPEN) {
      if (Date.now() < circuitInfo.nextAttemptTime) {
        throw new Error(`Circuit breaker is OPEN for ${operationName}. Next attempt at ${new Date(circuitInfo.nextAttemptTime).toISOString()}`);
      } else {
        // Move to half-open state
        circuitInfo.state = CircuitState.HALF_OPEN;
        circuitInfo.successCount = 0;
        this.logger.info('RetryService', `Circuit breaker moved to HALF_OPEN for ${operationName}`);
      }
    }

    if (circuitInfo.state === CircuitState.HALF_OPEN && circuitInfo.successCount >= this.halfOpenMaxCalls) {
      throw new Error(`Circuit breaker is HALF_OPEN and has reached max calls for ${operationName}`);
    }

    try {
      const result = await this.executeWithRetry(operation, operationName, options);
      
      // Success - update circuit breaker
      if (circuitInfo.state === CircuitState.HALF_OPEN) {
        circuitInfo.successCount++;
        if (circuitInfo.successCount >= this.halfOpenMaxCalls) {
          // Reset circuit breaker
          circuitInfo.state = CircuitState.CLOSED;
          circuitInfo.failures = 0;
          circuitInfo.successCount = 0;
          this.logger.info('RetryService', `Circuit breaker reset to CLOSED for ${operationName}`);
        }
      } else {
        circuitInfo.failures = 0;
      }

      return result;
      
    } catch (error) {
      // Failure - update circuit breaker
      circuitInfo.failures++;
      circuitInfo.lastFailureTime = Date.now();
      
      if (circuitInfo.failures >= this.failureThreshold) {
        circuitInfo.state = CircuitState.OPEN;
        circuitInfo.nextAttemptTime = Date.now() + this.recoveryTimeout;
        this.logger.warn('RetryService', `Circuit breaker opened for ${operationName}`, {
          failures: circuitInfo.failures,
          nextAttemptTime: circuitInfo.nextAttemptTime
        });
      }
      
      throw error;
    }
  }

  private getOrCreateCircuitBreaker(operationName: string): CircuitBreakerInfo {
    if (!this.circuitBreakers.has(operationName)) {
      this.circuitBreakers.set(operationName, {
        state: CircuitState.CLOSED,
        failures: 0,
        lastFailureTime: 0,
        nextAttemptTime: 0,
        successCount: 0
      });
    }
    return this.circuitBreakers.get(operationName)!;
  }

  private calculateDelay(
    attempt: number,
    baseDelay: number,
    maxDelay: number,
    backoffFactor: number,
    jitter: boolean
  ): number {
    // Exponential backoff: delay = baseDelay * (backoffFactor ^ (attempt - 1))
    let delay = baseDelay * Math.pow(backoffFactor, attempt - 1);
    
    // Cap at maximum delay
    delay = Math.min(delay, maxDelay);
    
    // Add jitter to prevent thundering herd
    if (jitter) {
      delay = delay * (0.5 + Math.random() * 0.5);
    }
    
    return Math.floor(delay);
  }

  private async delay(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(resolve, ms);
      
      if (signal) {
        const abortHandler = (): void => {
          clearTimeout(timeout);
          reject(new Error('Operation was cancelled'));
        };
        
        if (signal.aborted) {
          clearTimeout(timeout);
          reject(new Error('Operation was cancelled'));
          return;
        }
        
        signal.addEventListener('abort', abortHandler, { once: true });
        
        // Clean up listener when delay completes
        setTimeout(() => {
          signal.removeEventListener('abort', abortHandler);
        }, ms);
      }
    });
  }

  private defaultRetryCondition = (error: Error): boolean => {
    // Don't retry for client errors (4xx), but retry for server errors (5xx) and network errors
    const errorWithResponse = error as Error & { response?: { status: number } };
    if (errorWithResponse?.response?.status) {
      const status = errorWithResponse.response.status;
      return status >= 500 || status === 429; // Retry server errors and rate limiting
    }
    
    // Retry network errors, timeouts, and other transient failures
    const errorWithCode = error as Error & { code?: string };
    if (errorWithCode?.code) {
      const retryableCodes = [
        'NETWORK_ERROR',
        'TIMEOUT',
        'ECONNRESET',
        'ECONNREFUSED',
        'ETIMEDOUT',
        'ENOTFOUND'
      ];
      return retryableCodes.includes(errorWithCode.code);
    }
    
    // Retry on specific error messages
    const message = error?.message?.toLowerCase() || '';
    const retryableMessages = [
      'network error',
      'timeout',
      'connection',
      'throttled',
      'rate limit',
      'service unavailable',
      'internal server error'
    ];
    
    return retryableMessages.some(msg => message.includes(msg));
  };

  // Utility method for creating retry decorators
  public createRetryDecorator(options: RetryOptions = {}): (target: unknown, propertyName: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
    return (target: unknown, propertyName: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
      const method = descriptor.value;
      
      descriptor.value = async function (...args: unknown[]): Promise<unknown> {
        const retryService = RetryService.getInstance();
        const operationName = `${(target as { constructor: { name: string } }).constructor.name}.${propertyName}`;
        
        return retryService.executeWithRetry(
          () => method.apply(this, args),
          operationName,
          options
        );
      };
      
      return descriptor;
    };
  }

  // Get circuit breaker status for monitoring
  public getCircuitBreakerStatus(): Record<string, CircuitBreakerInfo> {
    const status: Record<string, CircuitBreakerInfo> = {};
    for (const [name, info] of this.circuitBreakers) {
      status[name] = { ...info };
    }
    return status;
  }

  // Reset specific circuit breaker
  public resetCircuitBreaker(operationName: string): void {
    if (this.circuitBreakers.has(operationName)) {
      this.circuitBreakers.set(operationName, {
        state: CircuitState.CLOSED,
        failures: 0,
        lastFailureTime: 0,
        nextAttemptTime: 0,
        successCount: 0
      });
      this.logger.info('RetryService', `Circuit breaker manually reset for ${operationName}`);
    }
  }

  // Reset all circuit breakers
  public resetAllCircuitBreakers(): void {
    this.circuitBreakers.clear();
    this.logger.info('RetryService', 'All circuit breakers reset');
  }
}

// Decorator for automatic retry
export function Retry(options: RetryOptions = {}): (target: unknown, propertyName: string, descriptor: PropertyDescriptor) => PropertyDescriptor {
  const retryService = RetryService.getInstance();
  return retryService.createRetryDecorator(options);
}

export default RetryService;