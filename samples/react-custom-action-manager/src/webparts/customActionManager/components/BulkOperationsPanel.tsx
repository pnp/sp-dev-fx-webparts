import * as React from 'react';
import {
  Stack,
  Text,
  PrimaryButton,
  DefaultButton,
  Dropdown,
  IDropdownOption,
  TextField,
  Toggle,
  MessageBar,
  MessageBarType,
  ProgressIndicator,
  DetailsList,
  IColumn,
  SelectionMode,
  Checkbox,
  Dialog,
  DialogType,
  DialogFooter,
  DetailsListLayoutMode
} from '@fluentui/react';
import {
  IBulkOperation,
  IBulkOperationResult,
  IBulkExportOptions,
  IBulkImportOptions,
  IDeploymentTarget,
  BulkOperationType,
  BulkOperationStatus,
  ICustomAction
} from '../../../models';
import { BulkOperationsService } from '../../../services';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { ISiteInfo } from '../../../services/SiteService';
import { ValidationUtils } from '../../../utils/ValidationUtils';
import { ErrorHandler } from '../../../utils/ErrorHandler';
import styles from './styles/BulkOperationsPanel.module.scss';

export interface IBulkOperationsPanelProps {
  selectedActions: ICustomAction[];
  context: WebPartContext;
  onClose: () => void;
  onOperationComplete: (operation?: IBulkOperation) => void;
  permissionService: {
    canPerformBulkOperations(): boolean;
  };
  selectedSites: ISiteInfo[];
}

export interface IBulkOperationsPanelState {
  selectedOperation: BulkOperationType | null;
  isExecuting: boolean;
  currentOperation: IBulkOperation | null;
  exportOptions: IBulkExportOptions;
  importOptions: IBulkImportOptions;
  importFile: File | null;
  deploymentTargets: IDeploymentTarget[];
  showTargetSelection: boolean;
  validationResults: IBulkOperationResult[];
  errorMessage: string | null;
  successMessage: string | null;
  applyToAllSites: boolean;
}

export class BulkOperationsPanel extends React.Component<IBulkOperationsPanelProps, IBulkOperationsPanelState> {
  private bulkService: BulkOperationsService;

  constructor(props: IBulkOperationsPanelProps) {
    super(props);

    const initialSiteUrl = props.selectedSites[0]?.url;
    this.bulkService = new BulkOperationsService(props.context, initialSiteUrl);

    this.state = {
      selectedOperation: null,
      isExecuting: false,
      currentOperation: null,
      exportOptions: {
        format: 'JSON',
        includeInactive: false,
        includeSystemActions: false,
        scope: 'Selected',
        fields: ['Title', 'Name', 'Location', 'Scope', 'Description']
      },
      importOptions: {
        format: 'JSON',
        conflictResolution: 'Skip',
        validateOnly: false,
        targetScope: 'Web',
        batchSize: 10
      },
      importFile: null,
      deploymentTargets: [],
      showTargetSelection: false,
      validationResults: [],
      errorMessage: null,
      successMessage: null,
      applyToAllSites: props.selectedSites.length > 1
    };
  }

  public componentDidUpdate(prevProps: IBulkOperationsPanelProps): void {
    const previousPrimary = prevProps.selectedSites[0]?.url;
    const currentPrimary = this.props.selectedSites[0]?.url;
    if (previousPrimary !== currentPrimary) {
      this.bulkService.setTargetSite(currentPrimary);
    }

    if (prevProps.selectedSites.length !== this.props.selectedSites.length && this.state.selectedOperation === BulkOperationType.Import) {
      const shouldApplyAll = this.props.selectedSites.length > 1;
      if (shouldApplyAll !== this.state.applyToAllSites) {
        this.setState({ applyToAllSites: shouldApplyAll });
      }
    }
  }

  public render(): React.ReactElement<IBulkOperationsPanelProps> {
    const { selectedActions } = this.props;
    const { selectedOperation, isExecuting, currentOperation } = this.state;

    return (
      <div className={styles.bulkPanel}>
        {this._renderHeader()}
        {this._renderOperationSelector()}
        {selectedOperation && this._renderOperationDetails()}
        {this._renderActionButtons()}
        {isExecuting && this._renderProgress()}
        {currentOperation && this._renderResults()}
      </div>
    );
  }

  private _renderHeader(): React.ReactElement {
    const { selectedActions } = this.props;
    const { errorMessage, successMessage } = this.state;

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <div className={styles.header}>
          <div>
            <Text variant="large" className={styles.title}>
              Bulk Operations
            </Text>
            <div className={styles.subtitle}>
              {selectedActions.length} custom action{selectedActions.length !== 1 ? 's' : ''} selected
            </div>
          </div>
          <button 
            className={styles.closeButton}
            onClick={this.props.onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {errorMessage && (
          <MessageBar 
            messageBarType={MessageBarType.error}
            onDismiss={() => this.setState({ errorMessage: null })}
          >
            {errorMessage}
          </MessageBar>
        )}

        {successMessage && (
          <MessageBar 
            messageBarType={MessageBarType.success}
            onDismiss={() => this.setState({ successMessage: null })}
          >
            {successMessage}
          </MessageBar>
        )}
      </Stack>
    );
  }

  private _renderOperationSelector(): React.ReactElement {
    const { selectedOperation } = this.state;

    const operationOptions: IDropdownOption[] = [
      { key: BulkOperationType.Enable, text: 'Enable Actions' },
      { key: BulkOperationType.Disable, text: 'Disable Actions' },
      { key: BulkOperationType.Delete, text: 'Delete Actions' },
      { key: BulkOperationType.Export, text: 'Export Actions' },
      { key: BulkOperationType.Import, text: 'Import Actions' },
      { key: BulkOperationType.Deploy, text: 'Deploy to Sites' }
    ];

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Dropdown
          label="Select Operation"
          placeholder="Choose a bulk operation"
          options={operationOptions}
          selectedKey={selectedOperation}
          onChange={this._onOperationChange}
          required
        />
      </Stack>
    );
  }

  private _renderOperationDetails(): React.ReactElement {
    const { selectedOperation } = this.state;
    if (!selectedOperation) {
      return <></>;
    }

    let content: React.ReactElement = <></>;

    switch (selectedOperation) {
      case BulkOperationType.Export:
        content = this._renderExportOptions();
        break;
      case BulkOperationType.Import:
        content = this._renderImportOptions();
        break;
      case BulkOperationType.Deploy:
        content = this._renderDeploymentOptions();
        break;
      case BulkOperationType.Delete:
        content = this._renderDeleteWarning();
        break;
      default:
        content = <></>;
        break;
    }

    const multiSiteToggle = this._renderMultiSiteToggle(selectedOperation);

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        {content}
        {multiSiteToggle}
      </Stack>
    );
  }

  private _renderExportOptions(): React.ReactElement {
    const { exportOptions } = this.state;

    const formatOptions: IDropdownOption[] = [
      { key: 'JSON', text: 'JSON' },
      { key: 'CSV', text: 'CSV' }
    ];

    const scopeOptions: IDropdownOption[] = [
      { key: 'Selected', text: 'Selected Actions Only' },
      { key: 'Filtered', text: 'Currently Filtered Actions' },
      { key: 'All', text: 'All Actions' }
    ];

    return (
      <Stack tokens={{ childrenGap: 16 }} className={styles.operationDetails}>
        <Text variant="mediumPlus">Export Options</Text>
        
        <Dropdown
          label="Export Format"
          options={formatOptions}
          selectedKey={exportOptions.format}
          onChange={(_, option) => option && this._updateExportOptions({ format: option.key as any })}
        />

        <Dropdown
          label="Export Scope"
          options={scopeOptions}
          selectedKey={exportOptions.scope}
          onChange={(_, option) => option && this._updateExportOptions({ scope: option.key as any })}
        />

        <Toggle
          label="Include Inactive Actions"
          checked={exportOptions.includeInactive}
          onChange={(_, checked) => this._updateExportOptions({ includeInactive: !!checked })}
        />

        <Toggle
          label="Include System Actions"
          checked={exportOptions.includeSystemActions}
          onChange={(_, checked) => this._updateExportOptions({ includeSystemActions: !!checked })}
        />
      </Stack>
    );
  }

  private _renderImportOptions(): React.ReactElement {
    const { importOptions, importFile, applyToAllSites } = this.state;

    const formatOptions: IDropdownOption[] = [
      { key: 'JSON', text: 'JSON' },
      { key: 'CSV', text: 'CSV' }
    ];

    const conflictOptions: IDropdownOption[] = [
      { key: 'Skip', text: 'Skip Existing' },
      { key: 'Overwrite', text: 'Overwrite Existing' },
      { key: 'CreateNew', text: 'Create New Version' }
    ];

    const scopeOptions: IDropdownOption[] = [
      { key: 'Web', text: 'Web Scope' },
      { key: 'Site', text: 'Site Scope' }
    ];

    return (
      <Stack tokens={{ childrenGap: 16 }} className={styles.operationDetails}>
        <Text variant="mediumPlus">Import Options</Text>
        
        <div className={styles.fileUpload}>
          <Text variant="medium">Select File</Text>
          <input
            type="file"
            accept=".json,.csv"
            onChange={this._onFileSelected}
            className={styles.fileInput}
          />
          {importFile && (
            <Text variant="small" className={styles.fileName}>
              Selected: {importFile.name}
            </Text>
          )}
        </div>

        <Dropdown
          label="File Format"
          options={formatOptions}
          selectedKey={importOptions.format}
          onChange={(_, option) => option && this._updateImportOptions({ format: option.key as any })}
        />

        <Dropdown
          label="Conflict Resolution"
          options={conflictOptions}
          selectedKey={importOptions.conflictResolution}
          onChange={(_, option) => option && this._updateImportOptions({ conflictResolution: option.key as any })}
        />

        <Dropdown
          label="Target Scope"
          options={scopeOptions}
          selectedKey={importOptions.targetScope}
          onChange={(_, option) => option && this._updateImportOptions({ targetScope: option.key as any })}
        />

        <TextField
          label="Batch Size"
          type="number"
          value={importOptions.batchSize.toString()}
          onChange={(_, value) => this._updateImportOptions({ batchSize: parseInt(value || '10', 10) })}
          min={1}
          max={50}
        />

        <Toggle
          label="Validate Only (Don't Import)"
          checked={importOptions.validateOnly}
          onChange={(_, checked) => this._updateImportOptions({ validateOnly: !!checked })}
        />

        {this.props.selectedSites.length > 1 && (
          <Toggle
            label={`Apply to all ${this.props.selectedSites.length} selected sites`}
            checked={applyToAllSites}
            onChange={(_, checked) => this.setState({ applyToAllSites: !!checked })}
          />
        )}
      </Stack>
    );
  }

  private _renderMultiSiteToggle(operation: BulkOperationType): React.ReactElement | null {
    if (operation === BulkOperationType.Import || operation === BulkOperationType.Deploy) {
      return null;
    }

    if (!this._supportsMultiSite(operation) || this.props.selectedSites.length <= 1) {
      return null;
    }

    return (
      <Toggle
        label={`Apply to all ${this.props.selectedSites.length} selected sites`}
        checked={this.state.applyToAllSites}
        onChange={(_, checked) => this.setState({ applyToAllSites: !!checked })}
      />
    );
  }

  private _supportsMultiSite(operation: BulkOperationType): boolean {
    switch (operation) {
      case BulkOperationType.Enable:
      case BulkOperationType.Disable:
      case BulkOperationType.Delete:
      case BulkOperationType.Export:
      case BulkOperationType.Import:
        return true;
      default:
        return false;
    }
  }

  private _renderDeploymentOptions(): React.ReactElement {
    const { deploymentTargets, showTargetSelection } = this.state;

    return (
      <Stack tokens={{ childrenGap: 16 }} className={styles.operationDetails}>
        <Text variant="mediumPlus">Deployment Options</Text>
        
        <DefaultButton
          text="Select Target Sites"
          onClick={() => this.setState({ showTargetSelection: true })}
        />

        <Text variant="small">
          {deploymentTargets.filter(t => t.selected).length} site(s) selected for deployment
        </Text>

        {showTargetSelection && this._renderTargetSelectionDialog()}
      </Stack>
    );
  }

  private _renderDeleteWarning(): React.ReactElement {
    return (
      <Stack tokens={{ childrenGap: 16 }} className={styles.operationDetails}>
        <MessageBar messageBarType={MessageBarType.warning}>
          <Text variant="medium" style={{ fontWeight: 600 }}>Warning: Permanent Deletion</Text>
          <Text variant="small">
            This operation will permanently delete the selected custom actions. This action cannot be undone.
            Please ensure you have exported a backup if needed.
          </Text>
        </MessageBar>
      </Stack>
    );
  }

  private _renderTargetSelectionDialog(): React.ReactElement {
    const { deploymentTargets } = this.state;

    const columns: IColumn[] = [
      {
        key: 'selected',
        name: 'Select',
        minWidth: 50,
        maxWidth: 50,
        onRender: (item: IDeploymentTarget) => (
          <Checkbox
            checked={item.selected}
            onChange={(_, checked) => this._toggleTargetSelection(item.siteUrl, !!checked)}
          />
        )
      },
      {
        key: 'siteName',
        name: 'Site Name',
        fieldName: 'siteName',
        minWidth: 150,
        isResizable: true
      },
      {
        key: 'siteUrl',
        name: 'Site URL',
        fieldName: 'siteUrl',
        minWidth: 200,
        isResizable: true
      }
    ];

    return (
      <Dialog
        hidden={false}
        onDismiss={() => this.setState({ showTargetSelection: false })}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: 'Select Deployment Targets',
          subText: 'Choose the sites where you want to deploy the selected custom actions'
        }}
        modalProps={{ isBlocking: true }}
      >
        <Stack tokens={{ childrenGap: 16 }}>
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <TextField
              placeholder="https://contoso.sharepoint.com/sites/sitename"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  this._addManualTarget((e.target as HTMLInputElement).value);
                  (e.target as HTMLInputElement).value = '';
                }
              }}
              style={{ flexGrow: 1 }}
            />
            <DefaultButton
              text="Add Site"
              onClick={() => {
                const input = document.querySelector('input[placeholder*="contoso.sharepoint.com"]') as HTMLInputElement;
                if (input && input.value) {
                  this._addManualTarget(input.value);
                  input.value = '';
                }
              }}
            />
          </Stack>

          <DetailsList
            items={deploymentTargets}
            columns={columns}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
          />
        </Stack>

        <DialogFooter>
          <PrimaryButton
            onClick={() => this.setState({ showTargetSelection: false })}
            text="Done"
          />
          <DefaultButton
            onClick={this._loadAvailableSites}
            text="Discover Sites"
          />
        </DialogFooter>
      </Dialog>
    );
  }

  private _renderActionButtons(): React.ReactElement {
    const { selectedOperation, isExecuting, importFile } = this.state;
    const { selectedActions } = this.props;

    const canExecute = selectedOperation && !isExecuting && 
      (selectedOperation !== BulkOperationType.Import || importFile) &&
      selectedActions.length > 0;

    return (
      <Stack horizontal tokens={{ childrenGap: 8 }} className={styles.actionButtons}>
        <PrimaryButton
          text="Execute Operation"
          onClick={this._executeOperation}
          disabled={!canExecute}
        />
        <DefaultButton
          text="Cancel"
          onClick={this.props.onClose}
          disabled={isExecuting}
        />
      </Stack>
    );
  }

  private _renderProgress(): React.ReactElement {
    const { currentOperation } = this.state;

    return (
      <Stack tokens={{ childrenGap: 16 }} className={styles.progress}>
        <Text variant="medium">Executing bulk operation...</Text>
        <ProgressIndicator 
          description={currentOperation ? `Processing ${currentOperation.name}` : 'Initializing...'}
        />
      </Stack>
    );
  }

  private _renderResults(): React.ReactElement {
    const { currentOperation } = this.state;

    if (!currentOperation || !currentOperation.results) {
      return <></>;
    }

    const columns: IColumn[] = [
      {
        key: 'actionName',
        name: 'Action',
        fieldName: 'actionName',
        minWidth: 150,
        isResizable: true
      },
      {
        key: 'success',
        name: 'Status',
        minWidth: 80,
        onRender: (item: IBulkOperationResult) => (
          <Text style={{ color: item.success ? '#107c10' : '#d13438' }}>
            {item.success ? 'Success' : 'Failed'}
          </Text>
        )
      },
      {
        key: 'message',
        name: 'Message',
        fieldName: 'message',
        minWidth: 200,
        isResizable: true
      }
    ];

    return (
      <Stack tokens={{ childrenGap: 16 }} className={styles.results}>
        <Text variant="mediumPlus">Operation Results</Text>
        
        <DetailsList
          items={currentOperation.results}
          columns={columns}
          selectionMode={SelectionMode.none}
        />

        <Text variant="small">
          Status: {currentOperation.status} | 
          Success: {currentOperation.results.filter(r => r.success).length} | 
          Failed: {currentOperation.results.filter(r => !r.success).length}
        </Text>
      </Stack>
    );
  }

  private _onOperationChange = (_: any, option?: IDropdownOption): void => {
    if (option) {
      const selectedOperation = option.key as BulkOperationType;
      const supportsMultiSite = this._supportsMultiSite(selectedOperation);
      const shouldApplyAll = supportsMultiSite && this.props.selectedSites.length > 1;

      this.setState({ 
        selectedOperation,
        errorMessage: null,
        successMessage: null,
        applyToAllSites: shouldApplyAll ? true : false
      });
    }
  };

  private _onFileSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const fileTypeError = ValidationUtils.validateFileType(file, ['json', 'csv']);
      if (fileTypeError) {
        this.setState({ errorMessage: fileTypeError });
        return;
      }

      // Validate file size (max 10MB)
      const fileSizeError = ValidationUtils.validateFileSize(file, 10);
      if (fileSizeError) {
        this.setState({ errorMessage: fileSizeError });
        return;
      }

      this.setState({ importFile: file, errorMessage: null });
    }
  };

  private _updateExportOptions = (updates: Partial<IBulkExportOptions>): void => {
    this.setState({
      exportOptions: { ...this.state.exportOptions, ...updates }
    });
  };

  private _updateImportOptions = (updates: Partial<IBulkImportOptions>): void => {
    this.setState({
      importOptions: { ...this.state.importOptions, ...updates }
    });
  };

  private _toggleTargetSelection = (siteUrl: string, selected: boolean): void => {
    const { deploymentTargets } = this.state;
    const updatedTargets = deploymentTargets.map(target =>
      target.siteUrl === siteUrl ? { ...target, selected } : target
    );
    this.setState({ deploymentTargets: updatedTargets });
  };

  private _addManualTarget = (siteUrl: string): void => {
    if (!siteUrl || !siteUrl.trim()) {
      return;
    }

    const normalizedUrl = siteUrl.trim().replace(/\/$/, '');

    // Validate URL format
    try {
      new URL(normalizedUrl);
    } catch {
      this.setState({
        errorMessage: 'Please enter a valid SharePoint site URL (e.g., https://contoso.sharepoint.com/sites/sitename)'
      });
      return;
    }

    // Check if target already exists
    const { deploymentTargets } = this.state;
    if (deploymentTargets.some(target => target.siteUrl === normalizedUrl)) {
      this.setState({
        errorMessage: 'This site is already in the deployment targets list'
      });
      return;
    }

    // Add new target
    const newTarget: IDeploymentTarget = {
      siteUrl: normalizedUrl,
      siteName: normalizedUrl.split('/').pop() || 'Manual Site',
      selected: true
    };

    this.setState({
      deploymentTargets: [...deploymentTargets, newTarget],
      errorMessage: null,
      successMessage: `Added ${newTarget.siteName} to deployment targets`
    });
  };

  private _loadAvailableSites = async (): Promise<void> => {
    try {
      this.setState({ errorMessage: null });

      // Get sites using SharePoint Search API
      const searchEndpoint = `${this.props.context.pageContext.web.absoluteUrl}/_api/search/query?querytext='contentclass:STS_Site OR contentclass:STS_Web'&selectproperties='Title,SPWebUrl,SPSiteUrl,SiteDescription,Path,LastModifiedTime'&rowlimit=100&sortlist='Title:ascending'`;

      const response = await this.props.context.spHttpClient.get(
        searchEndpoint,
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
        const sites = data.d?.query?.PrimaryQueryResult?.RelevantResults?.Table?.Rows || [];

        const deploymentTargets: IDeploymentTarget[] = sites
          .filter((site: any) => {
            // Filter out current site and ensure we have a valid URL
            const siteUrl = this._getCellValue(site.Cells, 'SPWebUrl') || this._getCellValue(site.Cells, 'Path');
            return siteUrl && siteUrl !== this.props.context.pageContext.web.absoluteUrl;
          })
          .map((site: any) => ({
            siteUrl: this._getCellValue(site.Cells, 'SPWebUrl') || this._getCellValue(site.Cells, 'Path'),
            siteName: this._getCellValue(site.Cells, 'Title') || 'Unknown Site',
            selected: false
          }))
          .filter((target: IDeploymentTarget) => target.siteUrl) // Remove any with empty URLs
          .sort((a: IDeploymentTarget, b: IDeploymentTarget) => a.siteName.localeCompare(b.siteName));

        this.setState({
          deploymentTargets,
          successMessage: `Found ${deploymentTargets.length} available sites for deployment`
        });
      } else {
        // Fallback to alternative methods if search fails
        await this._loadSitesFromTenantAdmin();
      }
    } catch (error) {
      console.warn('Search API failed, trying alternative methods:', error);
      await this._loadSitesFromTenantAdmin();
    }
  };

  private _getCellValue = (cells: any[], key: string): string => {
    const cell = cells.find((c: any) => c.Key === key);
    return cell ? cell.Value : '';
  };

  private _getPrimarySite(): ISiteInfo {
    if (this.props.selectedSites.length > 0) {
      return this.props.selectedSites[0];
    }

    const { context } = this.props;
    return {
      id: context.pageContext.site.id?.toString() || '',
      title: context.pageContext.web.title,
      url: context.pageContext.web.absoluteUrl,
      serverRelativeUrl: context.pageContext.web.serverRelativeUrl,
      description: context.pageContext.web.description || '',
      template: context.pageContext.web.templateName || 'STS',
      isSubsite: (context.pageContext.web as any).isSubWeb || false,
      lastModified: new Date(),
      created: new Date()
    };
  }

  private _getImportTargetSites(): ISiteInfo[] {
    const { selectedSites } = this.props;
    const { applyToAllSites } = this.state;

    if (applyToAllSites && selectedSites.length > 1) {
      return selectedSites;
    }

    return selectedSites.length > 0 ? [selectedSites[0]] : [this._getPrimarySite()];
  }

  private _getTargetSitesForOperation(operation: BulkOperationType): ISiteInfo[] {
    if (operation === BulkOperationType.Import) {
      return this._getImportTargetSites();
    }

    if (!this._shouldApplyToAllSites(operation)) {
      return [this._getPrimarySite()];
    }

    return this.props.selectedSites.length > 0 ? this.props.selectedSites : [this._getPrimarySite()];
  }

  private _shouldApplyToAllSites(operation: BulkOperationType): boolean {
    return this._supportsMultiSite(operation) && this.state.applyToAllSites && this.props.selectedSites.length > 1;
  }

  private _loadSitesFromTenantAdmin = async (): Promise<void> => {
    try {
      // Try to get sites from the hub site or site collection admin APIs
      const hubSitesEndpoint = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/hubsitedata`;

      const response = await this.props.context.spHttpClient.get(
        hubSitesEndpoint,
        SPHttpClient.configurations.v1,
        {
          headers: {
            'Accept': 'application/json;odata=verbose'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Process hub site data if available
        const deploymentTargets: IDeploymentTarget[] = [];

        // Add current site collection as a fallback option
        const currentSite: IDeploymentTarget = {
          siteUrl: this.props.context.pageContext.site.absoluteUrl,
          siteName: this.props.context.pageContext.site.serverRequestPath || 'Current Site Collection',
          selected: false
        };

        if (currentSite.siteUrl !== this.props.context.pageContext.web.absoluteUrl) {
          deploymentTargets.push(currentSite);
        }

        this.setState({
          deploymentTargets,
          errorMessage: deploymentTargets.length === 0
            ? 'No additional sites found. You may need to manually add site URLs or ensure you have appropriate permissions to discover sites.'
            : null
        });
      } else {
        throw new Error('Unable to discover sites using available APIs');
      }
    } catch (error) {
      const errorInfo = ErrorHandler.handleError(error);
      ErrorHandler.logError(errorInfo, 'BulkOperationsPanel._loadSitesFromTenantAdmin');

      // Provide manual entry option as fallback
      this.setState({
        errorMessage: 'Automatic site discovery failed. You can manually add deployment targets by entering site URLs.',
        deploymentTargets: []
      });
    }
  };

  private _executeOperation = async (): Promise<void> => {
    const { selectedOperation, exportOptions, importOptions, importFile, deploymentTargets } = this.state;
    const { selectedActions } = this.props;

    if (!selectedOperation) return;

    this.setState({ 
      isExecuting: true, 
      errorMessage: null, 
      successMessage: null 
    });

    try {
      let operation: IBulkOperation;

      switch (selectedOperation) {
        case BulkOperationType.Import: {
          if (!importFile) {
            throw new Error('No import file selected');
          }
          const fileContent = await this._readFile(importFile);
          const format = (importOptions.format || 'JSON') as 'JSON' | 'CSV';
          const targetSites = this._getImportTargetSites();
          const aggregatedResults: IBulkOperationResult[] = [];

          for (const site of targetSites) {
            this.bulkService.setTargetSite(site.url);
            const siteResults = await this.bulkService.importActions(fileContent, importOptions, format);
            siteResults.forEach(result => {
              aggregatedResults.push({
                ...result,
                actionName: `${result.actionName} (${site.title || site.url})`
              });
            });
          }

          const successCount = aggregatedResults.filter(r => r.success).length;
          const status = successCount === aggregatedResults.length
            ? BulkOperationStatus.Completed
            : successCount === 0
              ? BulkOperationStatus.Failed
              : BulkOperationStatus.PartiallyCompleted;

          operation = {
            id: 'import-' + Date.now(),
            name: 'Import Operation',
            description: `Import from ${importFile.name}`,
            targetActions: [],
            operation: BulkOperationType.Import,
            parameters: {
              ...importOptions,
              format,
              appliedSites: targetSites.map(site => site.url)
            },
            createdBy: this.props.context.pageContext.user.displayName,
            createdDate: new Date(),
            status,
            results: aggregatedResults
          };
          break;
        }

        case BulkOperationType.Deploy: {
          const selectedTargets = deploymentTargets.filter(t => t.selected);
          if (selectedTargets.length === 0) {
            throw new Error('No deployment targets selected');
          }
          this.bulkService.setTargetSite(this._getPrimarySite().url);
          operation = await this.bulkService.executeBulkOperation(
            selectedActions.map(a => a.Id),
            selectedOperation,
            { targets: selectedTargets }
          );
          break;
        }

        case BulkOperationType.Export: {
          if (this._shouldApplyToAllSites(selectedOperation)) {
            operation = await this.bulkService.executeBulkOperationAcrossSites(
              selectedActions,
              this._getTargetSitesForOperation(selectedOperation),
              selectedOperation,
              exportOptions
            );
          } else {
            this.bulkService.setTargetSite(this._getPrimarySite().url);
            operation = await this.bulkService.executeBulkOperation(
              selectedActions.map(a => a.Id),
              selectedOperation,
              exportOptions
            );
          }
          break;
        }

        default:
          if (this._shouldApplyToAllSites(selectedOperation)) {
            operation = await this.bulkService.executeBulkOperationAcrossSites(
              selectedActions,
              this._getTargetSitesForOperation(selectedOperation),
              selectedOperation
            );
          } else {
            this.bulkService.setTargetSite(this._getPrimarySite().url);
            operation = await this.bulkService.executeBulkOperation(
              selectedActions.map(a => a.Id),
              selectedOperation
            );
          }
          break;
      }

      this.setState({ 
        currentOperation: operation,
        successMessage: `${selectedOperation} operation completed successfully`
      });
      
      this.props.onOperationComplete(operation);

    } catch (error) {
      const errorInfo = ErrorHandler.handleError(error);
      ErrorHandler.logError(errorInfo, 'BulkOperationsPanel._executeOperation');
      this.setState({
        errorMessage: errorInfo.userFriendlyMessage
      });
    } finally {
      this.setState({ isExecuting: false });
    }
  };

  private _readFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };
}
