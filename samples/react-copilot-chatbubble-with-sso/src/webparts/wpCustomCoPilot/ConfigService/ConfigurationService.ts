// ConfigurationService.ts
import { MSGraphClientV3 } from '@microsoft/sp-http';
import { Log } from '@microsoft/sp-core-library';
import { WebPartContext } from '@microsoft/sp-webpart-base';

const LOG_SOURCE: string = 'ConfigurationService';

export interface ICoPilotConfiguration {
  botURL: string;
  botName?: string;
  buttonLabel?: string;
  botAvatarImage?: string;
  botAvatarInitials?: string;
  greet?: boolean;
  customScope: string;
  clientID: string;
  authority: string;
  cacheTimeout?: number;
  errorRetryAttempts?: number;
}

export class ConfigurationService {
  private context: WebPartContext;
  private static CONFIG_LIST_NAME = 'CopilotAgentConfig';
  private static CACHE_KEY = 'CHATBOT_CONFIG_CACHE';
  private static DEFAULT_CACHE_TIMEOUT = 30;
  private static DEFAULT_RETRY_ATTEMPTS = 3;
  private static DEFAULT_RETRY_DELAY = 1000;

  private cachedConfig: ICoPilotConfiguration | null = null;
  private cacheTimestamp: number = 0;
  private graphClient: MSGraphClientV3;
  
  constructor(context: WebPartContext) {
    this.context = context;
    this.initializeCache();
  }

  private async ensureGraphClient(): Promise<void> {
    if (!this.graphClient) {
      this.graphClient = await this.context.msGraphClientFactory.getClient('3');
    }
  }

  public async getConfiguration(): Promise<ICoPilotConfiguration> {
    try {
      const cachedConfig = this.getFromCache();
      if (cachedConfig) {
        Log.info(LOG_SOURCE, 'Retrieved configuration from cache');
        return cachedConfig;
      }

      await this.ensureGraphClient();

      const listConfig = await this.getConfigFromListWithRetry();
      if (listConfig) {
        this.updateCache(listConfig);
        return listConfig;
      }

      const tenantConfig = await this.getConfigFromTenantExtensionWithRetry();
      if (tenantConfig) {
        this.updateCache(tenantConfig);
        return tenantConfig;
      }

      throw new Error('No valid configuration found');
    } catch (error) {
      Log.error(LOG_SOURCE, error);
      const fallbackConfig = this.getFallbackConfiguration();
      if (fallbackConfig) {
        return fallbackConfig;
      }
      throw error;
    }
  }

  private async getConfigFromListWithRetry(): Promise<ICoPilotConfiguration | null> {
    const retryAttempts = this.cachedConfig?.errorRetryAttempts || ConfigurationService.DEFAULT_RETRY_ATTEMPTS;
    
    for (let attempt = 0; attempt < retryAttempts; attempt++) {
      try {
        const config = await this.getConfigFromList();
        if (config) return config;
        break;
      } catch (error) {
        if (attempt === retryAttempts - 1) throw error;
        await this.delay(ConfigurationService.DEFAULT_RETRY_DELAY * Math.pow(2, attempt));
      }
    }
    return null;
  }

  private async getConfigFromList(): Promise<ICoPilotConfiguration | null> {
    try {
      // Check if list exists
      const listExists = await this.checkIfListExists();
      if (!listExists) {
        Log.info(LOG_SOURCE, 'Configuration list does not exist');
        return null;
      }

      const siteId = this.context.pageContext.site.id.toString();
      const listId = await this.getListId();
      
      if (!listId) return null;

      // Use Graph API to get the latest item
      const response = await this.graphClient.api(`/sites/${siteId}/lists/${listId}/items`)
        .expand('fields')
        .orderby('fields/Modified desc')
        .top(1)
        .get();

      if (!response.value || response.value.length === 0) {
        return null;
      }

      return this.mapListItemToConfig(response.value[0].fields);
    } catch (error) {
      Log.error(LOG_SOURCE, new Error(`Error getting configuration from list: ${error}`));
      return null;
    }
  }

  private async checkIfListExists(): Promise<boolean> {
    try {
      const siteId = this.context.pageContext.site.id.toString();
      const response = await this.graphClient.api(`/sites/${siteId}/lists`)
        .filter(`displayName eq '${ConfigurationService.CONFIG_LIST_NAME}'`)
        .get();

      return response.value && response.value.length > 0;
    } catch {
      return false;
    }
  }

  private async getListId(): Promise<string | null> {
    try {
      const siteId = this.context.pageContext.site.id.toString();
      const response = await this.graphClient.api(`/sites/${siteId}/lists`)
        .filter(`displayName eq '${ConfigurationService.CONFIG_LIST_NAME}'`)
        .select('id')
        .get();

      if (response.value && response.value.length > 0) {
        return response.value[0].id;
      }
      return null;
    } catch (error) {
      Log.error(LOG_SOURCE, new Error(`Error getting list ID: ${error}`));
      return null;
    }
  }

  private async getConfigFromTenantExtensionWithRetry(): Promise<ICoPilotConfiguration | null> {
    const retryAttempts = this.cachedConfig?.errorRetryAttempts || ConfigurationService.DEFAULT_RETRY_ATTEMPTS;
    
    for (let attempt = 0; attempt < retryAttempts; attempt++) {
      try {
        const config = await this.getConfigFromTenantExtension();
        if (config) return config;
        break;
      } catch (error) {
        if (attempt === retryAttempts - 1) throw error;
        await this.delay(ConfigurationService.DEFAULT_RETRY_DELAY * Math.pow(2, attempt));
      }
    }
    return null;
  }

  private async getConfigFromTenantExtension(): Promise<ICoPilotConfiguration | null> {
    try {
      const appId = '7c2dbe76-c0b8-46d2-a4a2-1b20e50b3df7';
      const response = await this.graphClient.api(`/applications/${appId}`)
        .select('appDefinition')
        .get();

      if (!response || !response.appDefinition) {
        return null;
      }

      const appDefinition = JSON.parse(response.appDefinition);
      if (!appDefinition.tenantwideExtension || !appDefinition.tenantwideExtension.properties) {
        return null;
      }

      const config = JSON.parse(appDefinition.tenantwideExtension.properties);
      return this.validateConfig(config);
    } catch (error) {
      Log.error(LOG_SOURCE, new Error(`Error getting tenant extension config: ${error}`));
      return null;
    }
  }

  private mapListItemToConfig(fields: any): ICoPilotConfiguration {
    return {
      botURL: fields.BotURL,
      botName: fields.Title,
      buttonLabel: fields.ButtonLabel,
      botAvatarImage: fields.BotAvatarImage,
      botAvatarInitials: fields.BotAvatarInitials,
      greet: fields.Greet,
      customScope: fields.CustomScope,
      clientID: fields.ClientID,
      authority: fields.Authority,
      cacheTimeout: fields.CacheTimeout,
      errorRetryAttempts: fields.ErrorRetryAttempts
    };
  }

  private validateConfig(config: any): ICoPilotConfiguration {
    if (!config.botURL || !config.clientID || !config.authority || !config.customScope) {
      throw new Error('Invalid configuration: missing required fields');
    }
    return config as ICoPilotConfiguration;
  }

  private initializeCache(): void {
    try {
      const cached = localStorage.getItem(ConfigurationService.CACHE_KEY);
      if (cached) {
        const { config, timestamp } = JSON.parse(cached);
        this.cachedConfig = config;
        this.cacheTimestamp = timestamp;
      }
    } catch {
      Log.warn(LOG_SOURCE, 'Failed to initialize cache from localStorage');
    }
  }

  private getFromCache(): ICoPilotConfiguration | null {
    if (!this.cachedConfig) return null;

    const now = Date.now();
    const cacheTimeout = (this.cachedConfig.cacheTimeout || ConfigurationService.DEFAULT_CACHE_TIMEOUT) * 60 * 1000;
    
    if (now - this.cacheTimestamp > cacheTimeout) {
      Log.info(LOG_SOURCE, 'Cache expired');
      return null;
    }

    return this.cachedConfig;
  }

  private updateCache(config: ICoPilotConfiguration): void {
    this.cachedConfig = config;
    this.cacheTimestamp = Date.now();
    
    try {
      localStorage.setItem(ConfigurationService.CACHE_KEY, JSON.stringify({
        config,
        timestamp: this.cacheTimestamp
      }));
    } catch  {
      Log.warn(LOG_SOURCE, 'Failed to update localStorage cache');
    }
  }

  private getFallbackConfiguration(): ICoPilotConfiguration | null {
    try {
      const fallback = localStorage.getItem(ConfigurationService.CACHE_KEY);
      if (fallback) {
        const { config } = JSON.parse(fallback);
        Log.info(LOG_SOURCE, 'Using fallback configuration from localStorage');
        return config;
      }
    } catch  {
      Log.error(LOG_SOURCE, new Error('Failed to get fallback configuration'));
    }
    return null;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}