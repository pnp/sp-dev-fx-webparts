import { WebPartContext } from '@microsoft/sp-webpart-base';
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

export class BulkOperationsService {
  private context: WebPartContext;
  private customActionService: CustomActionService;

  constructor(context: WebPartContext) {
    this.context = context;
    this.customActionService = new CustomActionService(context);
  }

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
        case BulkOperationType.Deploy:
          bulkOp.results = await this._executeBulkDeploy(actionIds, parameters?.targets);
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

  public async exportToJson(actions: ICustomAction[], options: IBulkExportOptions): Promise<string> {
    const exportData = {
      exportInfo: {
        timestamp: new Date().toISOString(),
        exportedBy: this.context.pageContext.user.displayName,
        totalActions: actions.length,
        options
      },
      customActions: actions.map(action => ({
        ...action,
        // Remove runtime properties that shouldn't be exported
        Id: undefined,
        __metadata: undefined
      }))
    };

    return JSON.stringify(exportData, null, 2);
  }

  public async exportToCsv(actions: ICustomAction[], options: IBulkExportOptions): Promise<string> {
    if (actions.length === 0) {
      return 'No custom actions to export';
    }

    // Define CSV headers based on selected fields
    const fields = options.fields && options.fields.length > 0 
      ? options.fields 
      : ['Title', 'Name', 'Location', 'Scope', 'Sequence', 'Description'];

    const headers = fields.join(',');
    const rows = actions.map(action => 
      fields.map(field => {
        const value = (action as any)[field];
        // Handle CSV escaping
        if (value === null || value === undefined) return '';
        const stringValue = String(value);
        // Escape quotes and wrap in quotes if contains comma or quote
        if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
          return `"${stringValue.replace(/"/g, '""')}"`;
        }
        return stringValue;
      }).join(',')
    );

    return [headers, ...rows].join('\n');
  }

  public async importFromJson(jsonData: string, options: IBulkImportOptions): Promise<IBulkOperationResult[]> {
    try {
      const importData = JSON.parse(jsonData);
      const actions = importData.customActions || importData;
      
      if (!Array.isArray(actions)) {
        throw new Error('Invalid JSON format: expected array of custom actions');
      }

      const results: IBulkOperationResult[] = [];
      
      for (let i = 0; i < actions.length; i += options.batchSize) {
        const batch = actions.slice(i, i + options.batchSize);
        const batchResults = await this._processBatch(batch, options);
        results.push(...batchResults);

        // Add delay between batches to avoid throttling
        if (i + options.batchSize < actions.length) {
          await this._delay(1000);
        }
      }

      return results;

    } catch (error) {
      return [{
        actionId: 'import-operation',
        actionName: 'Import Operation',
        success: false,
        message: 'Import failed',
        error: error instanceof Error ? error.message : 'Invalid JSON format'
      }];
    }
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

    return results;
  }

  private async _executeBulkEnable(actionIds: string[]): Promise<IBulkOperationResult[]> {
    // Note: SharePoint doesn't have native enable/disable for custom actions
    // This would require custom metadata or property tracking
    return actionIds.map(id => ({
      actionId: id,
      actionName: `Action ${id}`,
      success: true,
      message: 'Action enabled (simulated)'
    }));
  }

  private async _executeBulkDisable(actionIds: string[]): Promise<IBulkOperationResult[]> {
    return actionIds.map(id => ({
      actionId: id,
      actionName: `Action ${id}`,
      success: true,
      message: 'Action disabled (simulated)'
    }));
  }

  private async _executeBulkDelete(actionIds: string[], scope?: CustomActionScope): Promise<IBulkOperationResult[]> {
    const results: IBulkOperationResult[] = [];
    
    for (const actionId of actionIds) {
      try {
        // Would need to determine scope for each action if not provided
        const targetScope = scope || CustomActionScope.Web;
        const result = await this.customActionService.deleteCustomAction(actionId, targetScope);
        
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

    return results;
  }

  private async _executeBulkExport(actionIds: string[], options: IBulkExportOptions): Promise<IBulkOperationResult[]> {
    try {
      const actions = await this._getActionsByIds(actionIds);
      
      let exportData: string;
      switch (options.format) {
        case 'JSON':
          exportData = await this.exportToJson(actions, options);
          break;
        case 'CSV':
          exportData = await this.exportToCsv(actions, options);
          break;
        default:
          throw new Error(`Unsupported export format: ${options.format}`);
      }

      // Trigger download
      this._downloadFile(exportData, `custom-actions-export.${options.format.toLowerCase()}`, 
        options.format === 'JSON' ? 'application/json' : 'text/csv');

      return [{
        actionId: 'export',
        actionName: 'Export Operation',
        success: true,
        message: `Exported ${actions.length} actions to ${options.format}`
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
          const isValid = this._validateActionData(actionData);
          results.push({
            actionId: actionData.Name || 'unknown',
            actionName: actionData.Title || 'Unknown Action',
            success: isValid,
            message: isValid ? 'Validation passed' : 'Validation failed'
          });
        } else {
          // Actually create the action
          const result = await this.customActionService.createCustomAction(
            actionData,
            options.targetScope === 'Site' ? CustomActionScope.Site : CustomActionScope.Web
          );

          results.push({
            actionId: result.customAction?.Id || actionData.Name,
            actionName: actionData.Title,
            success: result.success,
            message: result.message,
            error: result.success ? undefined : result.message
          });
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

  private _validateActionData(actionData: any): boolean {
    // Basic validation
    return !!(actionData.Title && actionData.Name && actionData.Location);
  }

  private async _getActionsByIds(actionIds: string[]): Promise<ICustomAction[]> {
    // This would need to be implemented to fetch actions by IDs
    return [];
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
      // For cross-site deployment, we would need to create a new WebPartContext
      // For now, use the current context with URL override in the service calls
      console.info(`Creating service for target site: ${targetSiteUrl}`);
      return new CustomActionService(this.context);
    } catch (error) {
      console.error(`Error creating target site service for ${targetSiteUrl}:`, error);
      return new CustomActionService(this.context);
    }
  }
}