import { WebPartContext } from '@microsoft/sp-webpart-base';
import { LoggingService } from './LoggingService';

export interface IConfiguration {
  // API Configuration
  api: {
    retryAttempts: number;
    retryDelay: number;
    requestTimeout: number;
    batchSize: number;
    rateLimitDelay: number;
  };
  
  // Caching Configuration
  cache: {
    userDataTTL: number;
    presenceTTL: number;
    photoTTL: number;
    maxCacheSize: number;
    enableLRU: boolean;
  };
  
  // UI Configuration
  ui: {
    defaultPageSize: number;
    maxPageSize: number;
    searchDebounceDelay: number;
    animationDuration: number;
    presenceIndicatorSize: number;
    enablePresence: boolean;
    enableProfilePhotos: boolean;
  };
  
  // Error Handling Configuration
  errorHandling: {
    maxRetries: number;
    enableErrorBoundaries: boolean;
    enableErrorReporting: boolean;
    enableAutoRecovery: boolean;
  };
  
  // Logging Configuration
  logging: {
    level: number;
    enableConsoleLogging: boolean;
    enableRemoteLogging: boolean;
    maxLogEntries: number;
    flushInterval: number;
  };
  
  // Performance Configuration
  performance: {
    enableMetrics: boolean;
    enablePerformanceMonitoring: boolean;
    memoryWarningThreshold: number;
    slowOperationThreshold: number;
  };
  
  // Feature Flags
  features: {
    enableTeamsPresence: boolean;
    enableAdvancedPermissions: boolean;
    enableSecurityGroups: boolean;
    enableBatchRequests: boolean;
    enableSmartCaching: boolean;
  };
}

export interface IConfigurationService {
  getConfiguration(): IConfiguration;
  updateConfiguration(updates: Partial<IConfiguration>): void;
  resetToDefaults(): void;
  validateConfiguration(): boolean;
  exportConfiguration(): string;
  importConfiguration(config: string): boolean;
}

export class ConfigurationService implements IConfigurationService {
  private static instance: ConfigurationService;
  private config: IConfiguration;
  private context: WebPartContext;
  private logger: LoggingService;
  
  private readonly defaultConfiguration: IConfiguration = {
    api: {
      retryAttempts: 3,
      retryDelay: 1000,
      requestTimeout: 8000,
      batchSize: 20,
      rateLimitDelay: 100
    },
    cache: {
      userDataTTL: 300000, // 5 minutes
      presenceTTL: 300000, // 5 minutes
      photoTTL: 3600000, // 1 hour
      maxCacheSize: 1000,
      enableLRU: true
    },
    ui: {
      defaultPageSize: 10,
      maxPageSize: 50,
      searchDebounceDelay: 300,
      animationDuration: 200,
      presenceIndicatorSize: 12,
      enablePresence: true,
      enableProfilePhotos: true
    },
    errorHandling: {
      maxRetries: 3,
      enableErrorBoundaries: true,
      enableErrorReporting: true,
      enableAutoRecovery: true
    },
    logging: {
      level: 1, // INFO level
      enableConsoleLogging: true,
      enableRemoteLogging: false,
      maxLogEntries: 1000,
      flushInterval: 30000
    },
    performance: {
      enableMetrics: true,
      enablePerformanceMonitoring: true,
      memoryWarningThreshold: 50 * 1024 * 1024, // 50MB
      slowOperationThreshold: 2000 // 2 seconds
    },
    features: {
      enableTeamsPresence: true,
      enableAdvancedPermissions: true,
      enableSecurityGroups: true,
      enableBatchRequests: true,
      enableSmartCaching: true
    }
  };

  constructor(context: WebPartContext) {
    this.context = context;
    this.logger = LoggingService.getInstance(context);
    this.config = this.loadConfiguration();
    this.validateConfiguration();
  }

  public static getInstance(context?: WebPartContext): ConfigurationService {
    if (!ConfigurationService.instance && context) {
      ConfigurationService.instance = new ConfigurationService(context);
    }
    return ConfigurationService.instance;
  }

  private loadConfiguration(): IConfiguration {
    try {
      // Try to load from web part properties first
      const webPartConfig = (this.context as { properties?: { configuration?: unknown } }).properties?.configuration;
      if (webPartConfig) {
        this.logger.info('Configuration', 'Loaded configuration from web part properties');
        return { ...this.defaultConfiguration, ...webPartConfig };
      }

      // Try to load from session storage
      const sessionConfig = sessionStorage.getItem('spfx-configuration');
      if (sessionConfig) {
        const parsed = JSON.parse(sessionConfig);
        this.logger.info('Configuration', 'Loaded configuration from session storage');
        return { ...this.defaultConfiguration, ...parsed };
      }

      // Try to load from local storage
      const localConfig = localStorage.getItem('spfx-configuration');
      if (localConfig) {
        const parsed = JSON.parse(localConfig);
        this.logger.info('Configuration', 'Loaded configuration from local storage');
        return { ...this.defaultConfiguration, ...parsed };
      }

      // Fall back to defaults
      this.logger.info('Configuration', 'Using default configuration');
      return { ...this.defaultConfiguration };

    } catch (error) {
      this.logger.error('Configuration', 'Failed to load configuration, using defaults', error as Error);
      return { ...this.defaultConfiguration };
    }
  }

  private saveConfiguration(): void {
    try {
      const configString = JSON.stringify(this.config, null, 2);
      
      // Save to session storage for current session
      sessionStorage.setItem('spfx-configuration', configString);
      
      // Save to local storage for persistence
      localStorage.setItem('spfx-configuration', configString);
      
      this.logger.debug('Configuration', 'Configuration saved successfully');
    } catch (error) {
      this.logger.error('Configuration', 'Failed to save configuration', error as Error);
    }
  }

  public getConfiguration(): IConfiguration {
    return { ...this.config };
  }

  public updateConfiguration(updates: Partial<IConfiguration>): void {
    try {
      // Deep merge the updates
      this.config = this.mergeDeep(this.config as unknown as Record<string, unknown>, updates as unknown as Record<string, unknown>) as unknown as IConfiguration;
      
      // Validate the updated configuration
      if (this.validateConfiguration()) {
        this.saveConfiguration();
        this.logger.info('Configuration', 'Configuration updated successfully', updates);
      } else {
        this.logger.warn('Configuration', 'Configuration validation failed, changes not saved');
      }
    } catch (error) {
      this.logger.error('Configuration', 'Failed to update configuration', error as Error);
    }
  }

  public resetToDefaults(): void {
    this.config = { ...this.defaultConfiguration };
    this.saveConfiguration();
    this.logger.info('Configuration', 'Configuration reset to defaults');
  }

  public validateConfiguration(): boolean {
    try {
      const config = this.config;
      
      // Validate API configuration
      if (config.api.retryAttempts < 0 || config.api.retryAttempts > 10) {
        this.logger.warn('Configuration', 'Invalid API retry attempts, using default');
        config.api.retryAttempts = this.defaultConfiguration.api.retryAttempts;
      }
      
      if (config.api.requestTimeout < 1000 || config.api.requestTimeout > 60000) {
        this.logger.warn('Configuration', 'Invalid API request timeout, using default');
        config.api.requestTimeout = this.defaultConfiguration.api.requestTimeout;
      }
      
      if (config.api.batchSize < 1 || config.api.batchSize > 50) {
        this.logger.warn('Configuration', 'Invalid API batch size, using default');
        config.api.batchSize = this.defaultConfiguration.api.batchSize;
      }
      
      // Validate cache configuration
      if (config.cache.userDataTTL < 10000 || config.cache.userDataTTL > 3600000) {
        this.logger.warn('Configuration', 'Invalid cache TTL, using default');
        config.cache.userDataTTL = this.defaultConfiguration.cache.userDataTTL;
      }
      
      if (config.cache.maxCacheSize < 100 || config.cache.maxCacheSize > 10000) {
        this.logger.warn('Configuration', 'Invalid cache size, using default');
        config.cache.maxCacheSize = this.defaultConfiguration.cache.maxCacheSize;
      }
      
      // Validate UI configuration
      if (config.ui.defaultPageSize < 1 || config.ui.defaultPageSize > config.ui.maxPageSize) {
        this.logger.warn('Configuration', 'Invalid page size, using default');
        config.ui.defaultPageSize = this.defaultConfiguration.ui.defaultPageSize;
      }
      
      if (config.ui.searchDebounceDelay < 0 || config.ui.searchDebounceDelay > 2000) {
        this.logger.warn('Configuration', 'Invalid search debounce delay, using default');
        config.ui.searchDebounceDelay = this.defaultConfiguration.ui.searchDebounceDelay;
      }
      
      // Validate error handling configuration
      if (config.errorHandling.maxRetries < 0 || config.errorHandling.maxRetries > 10) {
        this.logger.warn('Configuration', 'Invalid error handling retries, using default');
        config.errorHandling.maxRetries = this.defaultConfiguration.errorHandling.maxRetries;
      }
      
      this.logger.debug('Configuration', 'Configuration validation passed');
      return true;
      
    } catch (error) {
      this.logger.error('Configuration', 'Configuration validation failed', error as Error);
      return false;
    }
  }

  public exportConfiguration(): string {
    try {
      const exportData = {
        version: '1.0',
        timestamp: new Date().toISOString(),
        configuration: this.config
      };
      return JSON.stringify(exportData, null, 2);
    } catch (error) {
      this.logger.error('Configuration', 'Failed to export configuration', error as Error);
      return '';
    }
  }

  public importConfiguration(configString: string): boolean {
    try {
      const importData = JSON.parse(configString);
      
      if (!importData.configuration) {
        this.logger.warn('Configuration', 'Invalid configuration format');
        return false;
      }
      
      // Validate imported configuration
      const tempConfig = this.config;
      this.config = { ...this.defaultConfiguration, ...importData.configuration };
      
      if (this.validateConfiguration()) {
        this.saveConfiguration();
        this.logger.info('Configuration', 'Configuration imported successfully');
        return true;
      } else {
        this.config = tempConfig;
        this.logger.warn('Configuration', 'Imported configuration failed validation');
        return false;
      }
      
    } catch (error) {
      this.logger.error('Configuration', 'Failed to import configuration', error as Error);
      return false;
    }
  }

  private mergeDeep(target: Record<string, unknown>, source: Record<string, unknown>): Record<string, unknown> {
    const result = { ...target };
    
    for (const key in source) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = this.mergeDeep((result[key] as Record<string, unknown>) || {}, source[key] as Record<string, unknown>);
      } else {
        result[key] = source[key];
      }
    }
    
    return result;
  }

  // Environment-specific configuration overrides
  public applyEnvironmentOverrides(): void {
    const hostname = window.location.hostname;
    
    if (hostname.includes('localhost') || hostname.includes('workbench')) {
      // Development environment
      this.updateConfiguration({
        logging: {
          ...this.config.logging,
          level: 0, // DEBUG level
          enableConsoleLogging: true
        },
        errorHandling: {
          ...this.config.errorHandling,
          enableErrorReporting: false
        }
      });
      this.logger.info('Configuration', 'Applied development environment overrides');
    } else if (hostname.includes('.sharepoint.com')) {
      // Production environment
      this.updateConfiguration({
        logging: {
          ...this.config.logging,
          level: 2, // WARN level
          enableRemoteLogging: true
        },
        performance: {
          ...this.config.performance,
          enablePerformanceMonitoring: true
        }
      });
      this.logger.info('Configuration', 'Applied production environment overrides');
    }
  }
}

export default ConfigurationService;