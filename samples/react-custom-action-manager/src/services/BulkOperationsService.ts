import { WebPartContext } from '@microsoft/sp-webpart-base';
import Papa from 'papaparse';
import {
  IBulkOperation,
  IBulkOperationResult,
  IBulkExportOptions,
  IBulkImportOptions,
  IDeploymentTarget,
  BulkOperationType,
  BulkOperationStatus,
  ICustomAction,
  CustomActionScope
} from '../models';
import { CustomActionService } from './CustomActionService';
import { ISiteInfo } from './SiteService';
import { ErrorHandler } from '../utils/ErrorHandler';

export class BulkOperationsService {
  private context: WebPartContext;
  private customActionService: CustomActionService;
  private actionsCache: Map<string, { actions: ICustomAction[]; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds
  private targetSiteUrl?: string;

  constructor(context: WebPartContext, targetSiteUrl?: string) {
    this.context = context;
    this.customActionService = new CustomActionService(context, targetSiteUrl);
    this.targetSiteUrl = targetSiteUrl ? targetSiteUrl.replace(/\/$/, '') : undefined;
  }

  private async _executeOperationForSite(
    actionReferences: ICustomAction[],
    site: ISiteInfo,
    operation: BulkOperationType,
    parameters: any,
    exportAccumulator: Array<{ action: ICustomAction; site: ISiteInfo }>
  ): Promise<IBulkOperationResult[]> {
    const siteResults: IBulkOperationResult[] = [];
    const siteActions = await this.customActionService.getCustomActions('All');
    const matches = this._matchActionsForSite(actionReferences, siteActions);

    switch (operation) {
      case BulkOperationType.Enable:
      case BulkOperationType.Disable: {
        const enable = operation === BulkOperationType.Enable;
        for (const match of matches) {
          if (!match.action) {
            siteResults.push({
              actionId: match.reference.Id || match.reference.Name || match.reference.Title || 'unknown',
              actionName: `${match.reference.Title || match.reference.Name || 'Unknown'} (${site.title || site.url})`,
              success: false,
              message: 'Action not found on site',
              error: 'Action not found'
            });
            continue;
          }

          const result = await this.customActionService.setCustomActionEnabled(
            match.action.Id,
            match.action.Scope,
            enable
          );

          siteResults.push({
            actionId: match.action.Id,
            actionName: `${match.action.Title || match.action.Name || 'Unknown'} (${site.title || site.url})`,
            success: result.success,
            message: result.message,
            error: result.success ? undefined : result.message
          });
        }
        break;
      }

      case BulkOperationType.Delete: {
        for (const match of matches) {
          if (!match.action) {
            siteResults.push({
              actionId: match.reference.Id || match.reference.Name || match.reference.Title || 'unknown',
              actionName: `${match.reference.Title || match.reference.Name || 'Unknown'} (${site.title || site.url})`,
              success: false,
              message: 'Action not found on site',
              error: 'Action not found'
            });
            continue;
          }

          const result = await this.customActionService.deleteCustomAction(match.action.Id, match.action.Scope);

          siteResults.push({
            actionId: match.action.Id,
            actionName: `${match.action.Title || match.action.Name || 'Unknown'} (${site.title || site.url})`,
            success: result.success,
            message: result.message,
            error: result.success ? undefined : result.message
          });
        }
        break;
      }

      case BulkOperationType.Export: {
        for (const match of matches) {
          if (match.action) {
            exportAccumulator.push({
              action: match.action,
              site
            });
          } else {
            siteResults.push({
              actionId: match.reference.Id || match.reference.Name || match.reference.Title || 'unknown',
              actionName: `${match.reference.Title || match.reference.Name || 'Unknown'} (${site.title || site.url})`,
              success: false,
              message: 'Action not found on site',
              error: 'Action not found'
            });
          }
        }
        break;
      }

      default:
        // Unsupported multi-site operation handled by caller.
        break;
    }

    return siteResults;
  }

  private async _exportAggregatedActions(
    actionsBySite: Array<{ action: ICustomAction; site: ISiteInfo }>,
    options: IBulkExportOptions,
    siteCount: number
  ): Promise<IBulkOperationResult[]> {
    if (actionsBySite.length === 0) {
      return [{
        actionId: 'export',
        actionName: 'Export Operation',
        success: false,
        message: 'No matching actions found to export across the selected sites',
        error: 'No matching actions'
      }];
    }

    const actionsForExport = actionsBySite.map(({ action, site }) => ({
      ...action,
      SiteTitle: site.title || site.url,
      SiteUrl: site.url
    }));

    const exportOptions: IBulkExportOptions = {
      ...options,
      fields: options?.fields && options.fields.length > 0
        ? Array.from(new Set([...options.fields, 'SiteTitle', 'SiteUrl']))
        : []
    };

    if (!exportOptions.fields || exportOptions.fields.length === 0) {
      exportOptions.fields = ['SiteTitle', 'SiteUrl', 'Title', 'Name', 'Location', 'Scope', 'Description'];
    }

    if ((options?.format || 'JSON') === 'CSV') {
      await this.exportToCsv(actionsForExport, exportOptions);
    } else {
      await this.exportToJson(actionsForExport, exportOptions);
    }

    return [{
      actionId: 'export',
      actionName: 'Export Operation',
      success: true,
      message: `Exported ${actionsForExport.length} actions across ${siteCount} site(s)`
    }];
  }

  private _matchActionsForSite(actionReferences: ICustomAction[], siteActions: ICustomAction[]): Array<{ reference: ICustomAction; action?: ICustomAction }> {
    return actionReferences.map(reference => ({
      reference,
      action: this._findMatchingAction(reference, siteActions)
    }));
  }

  private _findMatchingAction(reference: ICustomAction, siteActions: ICustomAction[]): ICustomAction | undefined {
    if (!siteActions || siteActions.length === 0) {
      return undefined;
    }

    const byId = reference.Id
      ? siteActions.find(action => action.Id === reference.Id)
      : undefined;
    if (byId) {
      return byId;
    }

    if (reference.Name) {
      const name = reference.Name.toLowerCase();
      const byName = siteActions.find(action => action.Name && action.Name.toLowerCase() === name);
      if (byName) {
        return byName;
      }
    }

    if (reference.ClientSideComponentId) {
      const refComponentId = reference.ClientSideComponentId.toLowerCase();
      const byComponentId = siteActions.find(action => action.ClientSideComponentId && action.ClientSideComponentId.toLowerCase() === refComponentId);
      if (byComponentId) {
        return byComponentId;
      }
    }

    const refTitle = reference.Title?.toLowerCase();
    const refLocation = reference.Location?.toLowerCase();
    const refScope = reference.Scope;

    const byTitleAndLocation = siteActions.find(action => {
      const titleMatches = refTitle && action.Title?.toLowerCase() === refTitle;
      const locationMatches = refLocation ? action.Location?.toLowerCase() === refLocation : true;
      const scopeMatches = refScope ? action.Scope === refScope : true;
      return titleMatches && locationMatches && scopeMatches;
    });
    if (byTitleAndLocation) {
      return byTitleAndLocation;
    }

    if (refTitle) {
      return siteActions.find(action => action.Title?.toLowerCase() === refTitle);
    }

    return undefined;
  }

  /**
   * Updates the target site for subsequent operations.
   * Clears any cached data scoped to the previous site to avoid cross-site bleed.
   */
  public setTargetSite(siteUrl?: string): void {
    const normalized = siteUrl ? siteUrl.replace(/\/$/, '') : undefined;
    if (this.targetSiteUrl === normalized) {
      return;
    }

    this.targetSiteUrl = normalized;
    this.customActionService.setTargetSite(normalized);
    this._clearCache();
  }

  /**
   * Executes a bulk operation on multiple custom actions
   * @param actionIds - Array of custom action IDs to operate on
   * @param operation - The type of bulk operation to perform
   * @param parameters - Optional parameters specific to the operation
   * @returns Promise<IBulkOperation> - The bulk operation result with detailed status
   */
  public async executeBulkOperation(
    actionIds: string[],
    operation: BulkOperationType,
    parameters?: any
  ): Promise<IBulkOperation> {
    const bulkOp: IBulkOperation = {
      id: this._generateId(),
      name: `${operation} Operation`,
      description: `${operation} ${actionIds.length} custom actions`,
      targetActions: actionIds,
      operation,
      parameters,
      createdBy: this.context.pageContext.user.displayName,
      createdDate: new Date(),
      status: BulkOperationStatus.InProgress,
      results: []
    };

    try {
      switch (operation) {
        case BulkOperationType.Enable:
          bulkOp.results = await this._executeBulkEnable(actionIds);
          break;
        case BulkOperationType.Disable:
          bulkOp.results = await this._executeBulkDisable(actionIds);
          break;
        case BulkOperationType.Delete:
          bulkOp.results = await this._executeBulkDelete(actionIds, parameters?.scope);
          break;
        case BulkOperationType.Export:
          bulkOp.results = await this._executeBulkExport(actionIds, parameters);
          break;
        case BulkOperationType.Import:
          if (!parameters?.content || !parameters?.options) {
            throw new Error('Import operation requires file content and options.');
          }
          bulkOp.targetActions = [];
          bulkOp.results = await this.importActions(
            parameters.content,
            parameters.options,
            parameters.format || parameters.options.format || 'JSON'
          );
          break;
        case BulkOperationType.Deploy:
          bulkOp.results = await this._executeBulkDeploy(actionIds, parameters?.targets || []);
          break;
        default:
          throw new Error(`Unsupported bulk operation: ${operation}`);
      }

      // Determine overall status
      const successCount = bulkOp.results!.filter(r => r.success).length;
      const totalCount = bulkOp.results!.length;

      if (successCount === totalCount) {
        bulkOp.status = BulkOperationStatus.Completed;
      } else if (successCount > 0) {
        bulkOp.status = BulkOperationStatus.PartiallyCompleted;
      } else {
        bulkOp.status = BulkOperationStatus.Failed;
      }

    } catch (error) {
      bulkOp.status = BulkOperationStatus.Failed;
      bulkOp.results = [{
        actionId: 'bulk-operation',
        actionName: 'Bulk Operation',
        success: false,
        message: 'Operation failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }];
    }

    return bulkOp;
  }

  public async executeBulkOperationAcrossSites(
    actionReferences: ICustomAction[],
    sites: ISiteInfo[],
    operation: BulkOperationType,
    parameters?: any
  ): Promise<IBulkOperation> {
    const uniqueSites = sites && sites.length > 0 ? sites : [];

    if (uniqueSites.length === 0) {
      throw new Error('No sites provided for multi-site bulk operation');
    }

    const bulkOp: IBulkOperation = {
      id: this._generateId(),
      name: `${operation} Operation`,
      description: `${operation} ${actionReferences.length} custom actions across ${uniqueSites.length} site(s)`,
      targetActions: actionReferences.map(action => action.Id),
      operation,
      parameters,
      createdBy: this.context.pageContext.user.displayName,
      createdDate: new Date(),
      status: BulkOperationStatus.InProgress,
      results: []
    };

    const aggregatedResults: IBulkOperationResult[] = [];
    const exportAccumulator: Array<{ action: ICustomAction; site: ISiteInfo }> = [];

    for (const site of uniqueSites) {
      try {
        this.setTargetSite(site.url);
        const siteResults = await this._executeOperationForSite(actionReferences, site, operation, parameters, exportAccumulator);
        aggregatedResults.push(...siteResults);
      } catch (error) {
        const errorInfo = ErrorHandler.handleError(error);
        ErrorHandler.logError(errorInfo, 'BulkOperationsService.executeBulkOperationAcrossSites');
        aggregatedResults.push({
          actionId: 'bulk-operation',
          actionName: `Bulk Operation (${site.title || site.url})`,
          success: false,
          message: errorInfo.userFriendlyMessage,
          error: errorInfo.message
        });
      }
    }

    if (operation === BulkOperationType.Export) {
      const exportResults = await this._exportAggregatedActions(exportAccumulator, parameters as IBulkExportOptions, uniqueSites.length);
      aggregatedResults.push(...exportResults);
    }

    bulkOp.results = aggregatedResults;

    const successCount = aggregatedResults.filter(r => r.success).length;
    if (successCount === aggregatedResults.length) {
      bulkOp.status = BulkOperationStatus.Completed;
    } else if (successCount > 0) {
      bulkOp.status = BulkOperationStatus.PartiallyCompleted;
    } else {
      bulkOp.status = BulkOperationStatus.Failed;
    }

    return bulkOp;
  }

  public async exportToJson(actions: ICustomAction[], options: IBulkExportOptions): Promise<string> {
    const filteredActions = this._filterActionsForExport(actions, options);
    const exportData = {
      exportInfo: {
        timestamp: new Date().toISOString(),
        exportedBy: this.context.pageContext.user.displayName,
        totalActions: filteredActions.length,
        options
      },
      customActions: filteredActions.map(action => ({
        ...action,
        Id: undefined,
        __metadata: undefined
      }))
    };

    return JSON.stringify(exportData, null, 2);
  }

  public async exportToCsv(actions: ICustomAction[], options: IBulkExportOptions): Promise<string> {
    const filteredActions = this._filterActionsForExport(actions, options);

    if (filteredActions.length === 0) {
      return 'No custom actions to export';
    }

    const fields = options.fields && options.fields.length > 0
      ? options.fields
      : ['Title', 'Name', 'Location', 'Scope', 'Sequence', 'Description'];

    const headers = fields.join(',');
    const rows = filteredActions.map(action =>
      fields.map(field => this._formatCsvValue((action as any)[field])).join(',')
    );

    return [headers, ...rows].join('\n');
  }

  public async importActions(
    content: string,
    options: IBulkImportOptions,
    format: 'JSON' | 'CSV' = 'JSON'
  ): Promise<IBulkOperationResult[]> {
    const normalizedFormat = (format || options.format || 'JSON') as 'JSON' | 'CSV';

    switch (normalizedFormat) {
      case 'JSON':
        return this.importFromJson(content, options);
      case 'CSV':
        return this.importFromCsv(content, options);
      default:
        return [{
          actionId: 'import-operation',
          actionName: 'Import Operation',
          success: false,
          message: `Unsupported import format: ${normalizedFormat}`,
          error: `Unsupported import format: ${normalizedFormat}`
        }];
    }
  }

  public async importFromJson(jsonData: string, options: IBulkImportOptions): Promise<IBulkOperationResult[]> {
    try {
      const importData = JSON.parse(jsonData);
      const actions = importData.customActions || importData;

      if (!Array.isArray(actions)) {
        throw new Error('Invalid JSON format: expected array of custom actions');
      }

      return this._processImportBatches(actions, options);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid JSON format';
      return [{
        actionId: 'import-operation',
        actionName: 'Import Operation',
        success: false,
        message: 'Import failed',
        error: message
      }];
    }
  }

  public async importFromCsv(csvData: string, options: IBulkImportOptions): Promise<IBulkOperationResult[]> {
    try {
      const parsed = Papa.parse<Record<string, string>>(csvData, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim()
      });

      if (parsed.errors.length > 0) {
        throw new Error(parsed.errors.map(e => e.message).join('; '));
      }

      const actions = parsed.data.map(row => this._mapCsvRowToAction(row));
      return this._processImportBatches(actions, options);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid CSV format';
      return [{
        actionId: 'import-operation',
        actionName: 'Import Operation',
        success: false,
        message: 'Import failed',
        error: message
      }];
    }
  }

  private _filterActionsForExport(actions: ICustomAction[], options: IBulkExportOptions): ICustomAction[] {
    const includeInactive = options.includeInactive ?? true;
    const includeSystemActions = options.includeSystemActions ?? true;

    return actions.filter(action => {
      const isInactive = action.Enabled === false;
      const isSystem = this._isSystemAction(action);
      return (includeInactive || !isInactive) && (includeSystemActions || !isSystem);
    });
  }

  private _isSystemAction(action: ICustomAction): boolean {
    const name = (action.Name || '').toLowerCase();
    const title = (action.Title || '').toLowerCase();
    const location = (action.Location || '').toLowerCase();

    return name.startsWith('_') ||
      name.startsWith('vti_') ||
      name.startsWith('microsoft.') ||
      location.startsWith('microsoft.sharepoint.internal') ||
      title.startsWith('sharepoint') && name.startsWith('microsoft');
  }

  private _formatCsvValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    const stringValue = String(value);
    if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
  }

  private async _processImportBatches(actions: any[], options: IBulkImportOptions): Promise<IBulkOperationResult[]> {
    const batchSize = Math.max(1, options.batchSize || 10);
    const results: IBulkOperationResult[] = [];

    for (let i = 0; i < actions.length; i += batchSize) {
      const batch = actions.slice(i, i + batchSize).map(action => this._normalizeImportedAction(action));
      const batchResults = await this._processBatch(batch, options);
      results.push(...batchResults);

      if (i + batchSize < actions.length) {
        await this._delay(1000);
      }
    }

    return results;
  }

  private _mapCsvRowToAction(row: Record<string, string>): any {
    const action: any = {};
    Object.keys(row).forEach(key => {
      const value = row[key];
      if (value !== undefined && value !== null) {
        const trimmed = value.trim();
        if (trimmed !== '') {
          action[key] = trimmed;
        }
      }
    });
    return action;
  }

  private _normalizeImportedAction(action: any): any {
    if (!action || typeof action !== 'object') {
      return action;
    }

    const normalized: any = { ...action };

    if (normalized.Sequence !== undefined) {
      const sequence = Number(normalized.Sequence);
      normalized.Sequence = isNaN(sequence) ? 1000 : sequence;
    }

    if (normalized.RegistrationType !== undefined) {
      const registrationType = Number(normalized.RegistrationType);
      normalized.RegistrationType = isNaN(registrationType) ? 0 : registrationType;
    }

    if (normalized.Enabled !== undefined) {
      if (typeof normalized.Enabled === 'string') {
        normalized.Enabled = normalized.Enabled.trim().toLowerCase() === 'true';
      } else {
        normalized.Enabled = Boolean(normalized.Enabled);
      }
    }

    if (normalized.Scope && typeof normalized.Scope === 'string') {
      normalized.Scope = normalized.Scope === 'Site' ? CustomActionScope.Site : CustomActionScope.Web;
    }

    return normalized;
  }

  public async deployToSites(
    actionIds: string[],
    targetSites: IDeploymentTarget[]
  ): Promise<IBulkOperationResult[]> {
    const results: IBulkOperationResult[] = [];

    // Get source actions
    const sourceActions = await this._getActionsByIds(actionIds);

    for (const site of targetSites) {
      if (!site.selected) continue;

      try {
        const targetService = await this._createTargetSiteService(site.siteUrl);
        let deployedCount = 0;

        for (const action of sourceActions) {
          try {
            const formData = this._actionToFormData(action);
            const result = await targetService.createCustomAction(formData, action.Scope);

            if (result.success) {
              deployedCount++;
              console.info(`Successfully deployed '${action.Title}' to ${site.siteUrl}`);
            } else {
              console.warn(`Failed to deploy '${action.Title}' to ${site.siteUrl}: ${result.message}`);
            }
          } catch (actionError) {
            console.error(`Failed to deploy action ${action.Title} to ${site.siteUrl}:`, actionError);
          }
        }

        results.push({
          actionId: site.siteUrl,
          actionName: `Deploy to ${site.siteName}`,
          success: deployedCount > 0,
          message: `Deployed ${deployedCount}/${sourceActions.length} actions successfully`
        });

      } catch (error) {
        results.push({
          actionId: site.siteUrl,
          actionName: `Deploy to ${site.siteName}`,
          success: false,
          message: 'Deployment failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Clear cache after deployment as new actions may have been created
    this._clearCache();

    return results;
  }

  /**
   * Clears the internal cache of custom actions
   * Useful when custom actions have been modified outside this service
   */
  public clearCache(): void {
    this._clearCache();
  }

  private async _executeBulkEnable(actionIds: string[]): Promise<IBulkOperationResult[]> {
    const results: IBulkOperationResult[] = [];

    // First get the actions to know their scope and names
    const actions = await this._getActionsByIds(actionIds);

    for (const action of actions) {
      try {
        const result = await this.customActionService.setCustomActionEnabled(
          action.Id,
          action.Scope,
          true
        );

        results.push({
          actionId: action.Id,
          actionName: action.Title || `Action ${action.Id}`,
          success: result.success,
          message: result.message,
          error: result.success ? undefined : result.message
        });
      } catch (error) {
        results.push({
          actionId: action.Id,
          actionName: action.Title || `Action ${action.Id}`,
          success: false,
          message: 'Enable failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Handle any missing actions
    const foundIds = actions.map(a => a.Id);
    const missingIds = actionIds.filter(id => !foundIds.includes(id));

    for (const missingId of missingIds) {
      results.push({
        actionId: missingId,
        actionName: `Action ${missingId}`,
        success: false,
        message: 'Action not found',
        error: 'Custom action could not be found'
      });
    }

    // Clear cache after enabling as action states have changed
    this._clearCache();

    return results;
  }

  private async _executeBulkDisable(actionIds: string[]): Promise<IBulkOperationResult[]> {
    const results: IBulkOperationResult[] = [];

    // First get the actions to know their scope and names
    const actions = await this._getActionsByIds(actionIds);

    for (const action of actions) {
      try {
        const result = await this.customActionService.setCustomActionEnabled(
          action.Id,
          action.Scope,
          false
        );

        results.push({
          actionId: action.Id,
          actionName: action.Title || `Action ${action.Id}`,
          success: result.success,
          message: result.message,
          error: result.success ? undefined : result.message
        });
      } catch (error) {
        results.push({
          actionId: action.Id,
          actionName: action.Title || `Action ${action.Id}`,
          success: false,
          message: 'Disable failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    // Handle any missing actions
    const foundIds = actions.map(a => a.Id);
    const missingIds = actionIds.filter(id => !foundIds.includes(id));

    for (const missingId of missingIds) {
      results.push({
        actionId: missingId,
        actionName: `Action ${missingId}`,
        success: false,
        message: 'Action not found',
        error: 'Custom action could not be found'
      });
    }

    // Clear cache after disabling as action states have changed
    this._clearCache();

    return results;
  }

  private async _executeBulkDelete(actionIds: string[], scope?: CustomActionScope): Promise<IBulkOperationResult[]> {
    const results: IBulkOperationResult[] = [];

    if (scope) {
      // If scope is provided, use it for all actions
      for (const actionId of actionIds) {
        try {
          const result = await this.customActionService.deleteCustomAction(actionId, scope);

          results.push({
            actionId,
            actionName: `Action ${actionId}`,
            success: result.success,
            message: result.message,
            error: result.success ? undefined : result.message
          });
        } catch (error) {
          results.push({
            actionId,
            actionName: `Action ${actionId}`,
            success: false,
            message: 'Delete failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }
    } else {
      // Get actions first to determine their scopes and proper names
      const actions = await this._getActionsByIds(actionIds);

      for (const action of actions) {
        try {
          const result = await this.customActionService.deleteCustomAction(action.Id, action.Scope);

          results.push({
            actionId: action.Id,
            actionName: action.Title || `Action ${action.Id}`,
            success: result.success,
            message: result.message,
            error: result.success ? undefined : result.message
          });
        } catch (error) {
          results.push({
            actionId: action.Id,
            actionName: action.Title || `Action ${action.Id}`,
            success: false,
            message: 'Delete failed',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
      }

      // Handle any missing actions
      const foundIds = actions.map(a => a.Id);
      const missingIds = actionIds.filter(id => !foundIds.includes(id));

      for (const missingId of missingIds) {
        results.push({
          actionId: missingId,
          actionName: `Action ${missingId}`,
          success: false,
          message: 'Action not found',
          error: 'Custom action could not be found'
        });
      }
    }

    // Clear cache after deletion as actions have been removed
    this._clearCache();

    return results;
  }

  private async _executeBulkExport(actionIds: string[], options: IBulkExportOptions): Promise<IBulkOperationResult[]> {
    try {
      const resolvedOptions: IBulkExportOptions = {
        format: options?.format || 'JSON',
        includeInactive: options?.includeInactive ?? true,
        includeSystemActions: options?.includeSystemActions ?? true,
        scope: options?.scope || 'Selected',
        fields: options?.fields || []
      };

      let actions = await this._getActionsByIds(actionIds);

      if (resolvedOptions.scope === 'All') {
        actions = await this.customActionService.getCustomActions('All');
      }

      const filteredActions = this._filterActionsForExport(actions, resolvedOptions);

      let exportData: string;
      switch (resolvedOptions.format) {
        case 'JSON':
          exportData = await this.exportToJson(actions, resolvedOptions);
          break;
        case 'CSV':
          exportData = await this.exportToCsv(actions, resolvedOptions);
          break;
        default:
          throw new Error(`Unsupported export format: ${resolvedOptions.format}`);
      }

      // Trigger download
      this._downloadFile(exportData, `custom-actions-export.${resolvedOptions.format.toLowerCase()}`, 
        resolvedOptions.format === 'JSON' ? 'application/json' : 'text/csv');

      return [{
        actionId: 'export',
        actionName: 'Export Operation',
        success: true,
        message: `Exported ${filteredActions.length} actions to ${resolvedOptions.format}`
      }];

    } catch (error) {
      return [{
        actionId: 'export',
        actionName: 'Export Operation', 
        success: false,
        message: 'Export failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      }];
    }
  }

  private async _executeBulkDeploy(actionIds: string[], targets: IDeploymentTarget[]): Promise<IBulkOperationResult[]> {
    return this.deployToSites(actionIds, targets);
  }

  private async _processBatch(actions: any[], options: IBulkImportOptions): Promise<IBulkOperationResult[]> {
    const results: IBulkOperationResult[] = [];

    for (const actionData of actions) {
      try {
        if (options.validateOnly) {
          // Just validate without creating
          const validation = await this._validateActionData(actionData);
          results.push({
            actionId: actionData.Name || 'unknown',
            actionName: actionData.Title || 'Unknown Action',
            success: validation.isValid,
            message: validation.isValid ? 'Validation passed' : validation.message,
            error: validation.isValid ? undefined : validation.message
          });
        } else {
          // Handle conflict resolution
          const scope = options.targetScope === 'Site' ? CustomActionScope.Site : CustomActionScope.Web;
          let shouldCreate = true;
          let actionToCreate = actionData;

          if (options.conflictResolution !== 'CreateNew') {
            // Check if action already exists
            const existingActions = await this.customActionService.getCustomActions(scope);
            const existingAction = existingActions.find(a =>
              a.Name === actionData.Name || a.Title === actionData.Title
            );

            if (existingAction) {
              switch (options.conflictResolution) {
                case 'Skip':
                  shouldCreate = false;
                  results.push({
                    actionId: existingAction.Id,
                    actionName: actionData.Title,
                    success: true,
                    message: 'Skipped - action already exists'
                  });
                  break;

                case 'Overwrite':
                  // Delete existing action first
                  await this.customActionService.deleteCustomAction(existingAction.Id, scope);
                  shouldCreate = true;
                  break;
              }
            }
          } else {
            // CreateNew - append timestamp to make unique
            const timestamp = Date.now();
            actionToCreate = {
              ...actionData,
              Name: `${actionData.Name}_${timestamp}`,
              Title: `${actionData.Title} (Imported ${new Date().toLocaleString()})`
            };
          }

          if (shouldCreate) {
            // Actually create the action
            const result = await this.customActionService.createCustomAction(actionToCreate, scope);

            results.push({
              actionId: result.customAction?.Id || actionToCreate.Name,
              actionName: actionToCreate.Title,
              success: result.success,
              message: result.message,
              error: result.success ? undefined : result.message
            });
          }
        }
      } catch (error) {
        results.push({
          actionId: actionData.Name || 'unknown',
          actionName: actionData.Title || 'Unknown Action',
          success: false,
          message: 'Import failed',
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }

    return results;
  }

  private async _validateActionData(actionData: any): Promise<{ isValid: boolean; message: string }> {
    const errors: string[] = [];

    // Required field validation
    if (!actionData.Title || typeof actionData.Title !== 'string' || actionData.Title.trim() === '') {
      errors.push('Title is required and must be a non-empty string');
    }

    if (!actionData.Name || typeof actionData.Name !== 'string' || actionData.Name.trim() === '') {
      errors.push('Name is required and must be a non-empty string');
    }

    if (!actionData.Location || typeof actionData.Location !== 'string' || actionData.Location.trim() === '') {
      errors.push('Location is required and must be a non-empty string');
    }

    // Sequence validation
    if (actionData.Sequence !== undefined) {
      const sequence = Number(actionData.Sequence);
      if (isNaN(sequence) || sequence < 0 || sequence > 65536) {
        errors.push('Sequence must be a number between 0 and 65536');
      }
    }

    // Script validation
    if (actionData.ScriptBlock && actionData.ScriptSrc) {
      errors.push('Cannot specify both ScriptBlock and ScriptSrc - choose one');
    }

    // URL validation
    if (actionData.Url) {
      try {
        new URL(actionData.Url);
      } catch {
        // Check if it's a relative URL
        const lower = String(actionData.Url).toLowerCase();
        const allowedPrefixes = ['/', './', '../', '~', '~/','~site','~site/','~sitecollection','~sitecollection/','~tenant','~tenant/'];
        if (!allowedPrefixes.some(prefix => lower.startsWith(prefix))) {
          errors.push('Url must be a valid absolute URL or relative path starting with /, ./, ../, or ~');
        }
      }
    }

    // Name uniqueness check (basic pattern validation)
    if (actionData.Name) {
      const namePattern = /^[a-zA-Z][a-zA-Z0-9._-]*$/;
      if (!namePattern.test(actionData.Name)) {
        errors.push('Name must start with a letter and contain only letters, numbers, dots, underscores, and hyphens');
      }

      if (actionData.Name.length > 255) {
        errors.push('Name must be 255 characters or less');
      }
    }

    // Title length validation
    if (actionData.Title && actionData.Title.length > 255) {
      errors.push('Title must be 255 characters or less');
    }

    // Registration validation
    if (actionData.RegistrationType !== undefined) {
      const validRegistrationTypes = [0, 1, 2, 3, 4]; // None, List, ContentType, ProgId, FileType
      if (!validRegistrationTypes.includes(Number(actionData.RegistrationType))) {
        errors.push('RegistrationType must be between 0 (None) and 4 (FileType)');
      }
    }

    const isValid = errors.length === 0;
    const message = isValid ? 'Validation passed' : `Validation failed: ${errors.join('; ')}`;

    return { isValid, message };
  }

  private async _getActionsByIds(actionIds: string[]): Promise<ICustomAction[]> {
    if (!actionIds || actionIds.length === 0) {
      return [];
    }

    try {
      // Create cache key based on sorted action IDs
      const cacheKey = `actions_${this.targetSiteUrl || 'current'}_${actionIds.slice().sort().join('_')}`;

      // Check cache first
      if (this._isCacheValid(cacheKey)) {
        const cached = this.actionsCache.get(cacheKey);
        if (cached) {
          console.info(`Returning ${cached.actions.length} cached custom actions`);
          return cached.actions.filter(action => actionIds.includes(action.Id));
        }
      }

      // Get all custom actions from both scopes
      const allActions = await this.customActionService.getCustomActions('All');

      // Filter actions that match the provided IDs
      const matchedActions = allActions.filter(action =>
        actionIds.includes(action.Id)
      );

      // Cache the results
      this.actionsCache.set(cacheKey, {
        actions: matchedActions,
        timestamp: Date.now()
      });

      // Log any missing actions for debugging
      const foundIds = matchedActions.map(action => action.Id);
      const missingIds = actionIds.filter(id => !foundIds.includes(id));

      if (missingIds.length > 0) {
        console.warn(`Could not find custom actions with IDs: ${missingIds.join(', ')}`);
      }

      console.info(`Found ${matchedActions.length} out of ${actionIds.length} requested custom actions`);

      return matchedActions;

    } catch (error) {
      console.error('Error fetching custom actions by IDs:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to fetch custom actions: ${errorMessage}`);
    }
  }

  private _isCacheValid(cacheKey: string): boolean {
    const cached = this.actionsCache.get(cacheKey);
    if (!cached) {
      return false;
    }

    const isValid = (Date.now() - cached.timestamp) < this.CACHE_DURATION;

    if (!isValid) {
      // Clean up expired cache entry
      this.actionsCache.delete(cacheKey);
      console.debug(`Cache expired for key: ${cacheKey}`);
    }

    return isValid;
  }

  private _clearCache(): void {
    this.actionsCache.clear();
    console.debug('BulkOperationsService cache cleared');
  }

  private _actionToFormData(action: ICustomAction): any {
    return {
      title: action.Title,
      description: action.Description,
      location: action.Location,
      sequence: action.Sequence,
      name: action.Name,
      scriptBlock: action.ScriptBlock,
      scriptSrc: action.ScriptSrc,
      url: action.Url,
      commandUIExtension: action.CommandUIExtension,
      registrationType: action.RegistrationType,
      registrationId: action.RegistrationId,
      rights: action.Rights,
      group: action.Group,
      hostProperties: action.HostProperties,
      clientSideComponentId: action.ClientSideComponentId,
      clientSideComponentProperties: action.ClientSideComponentProperties,
      imageUrl: action.ImageUrl
    };
  }

  private _downloadFile(content: string, fileName: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  private _generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  private _delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async _createTargetSiteService(targetSiteUrl: string): Promise<CustomActionService> {
    try {
      console.info(`Creating service for target site: ${targetSiteUrl}`);

      // Create a new CustomActionService with the target site URL
      const targetService = new CustomActionService(this.context, targetSiteUrl);

      // Test connectivity to the target site
      try {
        await targetService.getCustomActions(CustomActionScope.Web);
        console.info(`Successfully connected to target site: ${targetSiteUrl}`);
      } catch (connectivityError) {
        console.warn(`Warning: Could not verify connectivity to ${targetSiteUrl}:`, connectivityError);
        // Continue anyway - the actual operations will fail with more specific errors
      }

      return targetService;
    } catch (error) {
      console.error(`Error creating target site service for ${targetSiteUrl}:`, error);
      throw new Error(`Failed to create service for target site ${targetSiteUrl}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
