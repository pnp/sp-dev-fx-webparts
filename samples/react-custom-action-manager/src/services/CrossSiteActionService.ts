import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import {
  ICustomAction,
  ICustomActionFormData,
  ICustomActionOperationResult,
  CustomActionScope
} from '../models';
import { CustomActionService } from './CustomActionService';

export interface ICrossSiteOperation {
  siteUrl: string;
  siteName: string;
  operation: 'create' | 'update' | 'delete' | 'enable' | 'disable';
  customActionId?: string;
  formData?: ICustomActionFormData;
  scope: CustomActionScope;
}

export interface ICrossSiteOperationResult {
  siteUrl: string;
  siteName: string;
  success: boolean;
  message: string;
  customAction?: ICustomAction;
  error?: string;
}

export interface IBulkOperationSummary {
  totalSites: number;
  successCount: number;
  failureCount: number;
  results: ICrossSiteOperationResult[];
  startTime: Date;
  endTime: Date;
  duration: number;
}

export class CrossSiteActionService {
  private context: WebPartContext;
  private actionServices: Map<string, CustomActionService> = new Map();

  constructor(context: WebPartContext) {
    this.context = context;
  }

  /**
   * Get or create a CustomActionService instance for a specific site
   */
  private getActionService(siteUrl: string): CustomActionService {
    if (!this.actionServices.has(siteUrl)) {
      this.actionServices.set(siteUrl, new CustomActionService(this.context, siteUrl));
    }
    return this.actionServices.get(siteUrl)!;
  }

  /**
   * Test connectivity to a remote site
   */
  public async testSiteConnectivity(siteUrl: string): Promise<{ success: boolean; message: string; siteName?: string }> {
    try {
      const normalizedUrl = siteUrl.replace(/\/$/, '');
      const endpoint = `${normalizedUrl}/_api/web?$select=Title,Url`;

      const response: SPHttpClientResponse = await this.context.spHttpClient.get(
        endpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=verbose',
            'odata-version': '3.0'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        const siteName = data.d?.Title || 'Unknown Site';
        return {
          success: true,
          message: 'Site is accessible',
          siteName
        };
      } else {
        return {
          success: false,
          message: `Cannot access site: ${response.status} ${response.statusText}`
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown connectivity error'
      };
    }
  }

  /**
   * Execute a bulk operation across multiple sites
   */
  public async executeBulkOperation(
    sites: { url: string; name: string }[],
    operation: ICrossSiteOperation,
    onProgress?: (progress: { completed: number; total: number; currentSite: string }) => void
  ): Promise<IBulkOperationSummary> {
    const startTime = new Date();
    const results: ICrossSiteOperationResult[] = [];
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < sites.length; i++) {
      const site = sites[i];

      if (onProgress) {
        onProgress({
          completed: i,
          total: sites.length,
          currentSite: site.name || site.url
        });
      }

      try {
        const siteOperation: ICrossSiteOperation = {
          ...operation,
          siteUrl: site.url,
          siteName: site.name
        };

        const result = await this.executeSiteOperation(siteOperation);
        results.push(result);

        if (result.success) {
          successCount++;
        } else {
          failureCount++;
        }

        // Add a small delay to avoid overwhelming SharePoint
        if (i < sites.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }

      } catch (error) {
        const errorResult: ICrossSiteOperationResult = {
          siteUrl: site.url,
          siteName: site.name,
          success: false,
          message: 'Operation failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        };
        results.push(errorResult);
        failureCount++;
      }
    }

    if (onProgress) {
      onProgress({
        completed: sites.length,
        total: sites.length,
        currentSite: 'Complete'
      });
    }

    const endTime = new Date();
    return {
      totalSites: sites.length,
      successCount,
      failureCount,
      results,
      startTime,
      endTime,
      duration: endTime.getTime() - startTime.getTime()
    };
  }

  /**
   * Execute an operation on a single site
   */
  public async executeSiteOperation(operation: ICrossSiteOperation): Promise<ICrossSiteOperationResult> {
    try {
      const actionService = this.getActionService(operation.siteUrl);
      let result: ICustomActionOperationResult;

      switch (operation.operation) {
        case 'create':
          if (!operation.formData) {
            throw new Error('Form data is required for create operation');
          }
          result = await actionService.createCustomAction(operation.formData, operation.scope);
          break;

        case 'update':
          if (!operation.customActionId || !operation.formData) {
            throw new Error('Custom action ID and form data are required for update operation');
          }
          result = await actionService.updateCustomAction(operation.customActionId, operation.formData, operation.scope);
          break;

        case 'delete':
          if (!operation.customActionId) {
            throw new Error('Custom action ID is required for delete operation');
          }
          result = await actionService.deleteCustomAction(operation.customActionId, operation.scope);
          break;

        case 'enable':
          if (!operation.customActionId) {
            throw new Error('Custom action ID is required for enable operation');
          }
          result = await actionService.setCustomActionEnabled(operation.customActionId, operation.scope, true);
          break;

        case 'disable':
          if (!operation.customActionId) {
            throw new Error('Custom action ID is required for disable operation');
          }
          result = await actionService.setCustomActionEnabled(operation.customActionId, operation.scope, false);
          break;

        default:
          throw new Error(`Unknown operation: ${operation.operation}`);
      }

      return {
        siteUrl: operation.siteUrl,
        siteName: operation.siteName,
        success: result.success,
        message: result.message || '',
        customAction: result.customAction
      };

    } catch (error) {
      return {
        siteUrl: operation.siteUrl,
        siteName: operation.siteName,
        success: false,
        message: 'Operation failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Get custom actions from multiple sites
   */
  public async getCustomActionsFromSites(
    sites: { url: string; name: string }[],
    scope: CustomActionScope | 'All' = 'All',
    onProgress?: (progress: { completed: number; total: number; currentSite: string }) => void
  ): Promise<Map<string, { actions: ICustomAction[]; error?: string }>> {
    const results = new Map<string, { actions: ICustomAction[]; error?: string }>();

    for (let i = 0; i < sites.length; i++) {
      const site = sites[i];

      if (onProgress) {
        onProgress({
          completed: i,
          total: sites.length,
          currentSite: site.name || site.url
        });
      }

      try {
        const actionService = this.getActionService(site.url);
        const actions = await actionService.getCustomActions(scope);
        results.set(site.url, { actions });
      } catch (error) {
        results.set(site.url, {
          actions: [],
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }

      // Add a small delay to avoid overwhelming SharePoint
      if (i < sites.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
    }

    if (onProgress) {
      onProgress({
        completed: sites.length,
        total: sites.length,
        currentSite: 'Complete'
      });
    }

    return results;
  }

  /**
   * Find sites that have a specific custom action
   */
  public async findSitesWithCustomAction(
    sites: { url: string; name: string }[],
    actionName: string,
    scope: CustomActionScope | 'All' = 'All'
  ): Promise<{ url: string; name: string; actions: ICustomAction[] }[]> {
    const actionsMap = await this.getCustomActionsFromSites(sites, scope);
    const matchingSites: { url: string; name: string; actions: ICustomAction[] }[] = [];

    for (const [siteUrl, result] of actionsMap.entries()) {
      if (!result.error) {
        const matchingActions = result.actions.filter(action =>
          action.Title?.toLowerCase().includes(actionName.toLowerCase()) ||
          action.Name?.toLowerCase().includes(actionName.toLowerCase())
        );

        if (matchingActions.length > 0) {
          const site = sites.find(s => s.url === siteUrl);
          if (site) {
            matchingSites.push({
              url: siteUrl,
              name: site.name,
              actions: matchingActions
            });
          }
        }
      }
    }

    return matchingSites;
  }

  /**
   * Clear cached action services
   */
  public clearCache(): void {
    this.actionServices.clear();
  }

  /**
   * Get statistics about custom actions across multiple sites
   */
  public async getCustomActionStatistics(
    sites: { url: string; name: string }[]
  ): Promise<{
    totalSites: number;
    sitesWithActions: number;
    totalActions: number;
    actionsByScope: { web: number; site: number };
    actionsByLocation: Map<string, number>;
    commonActions: { name: string; count: number; sites: string[] }[];
  }> {
    const actionsMap = await this.getCustomActionsFromSites(sites);

    let totalActions = 0;
    let sitesWithActions = 0;
    const actionsByScope = { web: 0, site: 0 };
    const actionsByLocation = new Map<string, number>();
    const actionNames = new Map<string, { count: number; sites: string[] }>();

    for (const [siteUrl, result] of actionsMap.entries()) {
      if (!result.error && result.actions.length > 0) {
        sitesWithActions++;
        totalActions += result.actions.length;

        for (const action of result.actions) {
          // Count by scope
          if (action.Scope === CustomActionScope.Web) {
            actionsByScope.web++;
          } else {
            actionsByScope.site++;
          }

          // Count by location
          const location = action.Location || 'Unknown';
          actionsByLocation.set(location, (actionsByLocation.get(location) || 0) + 1);

          // Track action names
          const actionName = action.Title || action.Name || 'Unnamed';
          if (!actionNames.has(actionName)) {
            actionNames.set(actionName, { count: 0, sites: [] });
          }
          const nameData = actionNames.get(actionName)!;
          nameData.count++;
          nameData.sites.push(siteUrl);
        }
      }
    }

    // Find common actions (appearing in multiple sites)
    const commonActions = Array.from(actionNames.entries())
      .filter(([, data]) => data.count > 1)
      .map(([name, data]) => ({ name, count: data.count, sites: data.sites }))
      .sort((a, b) => b.count - a.count);

    return {
      totalSites: sites.length,
      sitesWithActions,
      totalActions,
      actionsByScope,
      actionsByLocation,
      commonActions
    };
  }
}