import * as React from 'react';
import {
  Panel,
  PanelType,
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
  Icon,
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
import styles from './styles/BulkOperationsPanel.module.scss';

export interface IBulkOperationsPanelProps {
  selectedActions: ICustomAction[];
  context: WebPartContext;
  onClose: () => void;
  onOperationComplete: (operation?: IBulkOperation) => void;
  permissionService: any;
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
}

export class BulkOperationsPanel extends React.Component<IBulkOperationsPanelProps, IBulkOperationsPanelState> {
  private bulkService: BulkOperationsService;

  constructor(props: IBulkOperationsPanelProps) {
    super(props);

    this.bulkService = new BulkOperationsService(props.context);

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
      successMessage: null
    };
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

    switch (selectedOperation) {
      case BulkOperationType.Export:
        return this._renderExportOptions();
      case BulkOperationType.Import:
        return this._renderImportOptions();
      case BulkOperationType.Deploy:
        return this._renderDeploymentOptions();
      case BulkOperationType.Delete:
        return this._renderDeleteWarning();
      default:
        return <></>;
    }
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
    const { importOptions, importFile } = this.state;

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
      </Stack>
    );
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
        <DetailsList
          items={deploymentTargets}
          columns={columns}
          selectionMode={SelectionMode.none}
          layoutMode={DetailsListLayoutMode.justified}
        />
        
        <DialogFooter>
          <PrimaryButton
            onClick={() => this.setState({ showTargetSelection: false })}
            text="Done"
          />
          <DefaultButton
            onClick={this._loadAvailableSites}
            text="Refresh Sites"
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
      this.setState({ 
        selectedOperation: option.key as BulkOperationType,
        errorMessage: null,
        successMessage: null
      });
    }
  };

  private _onFileSelected = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      this.setState({ importFile: file });
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

  private _loadAvailableSites = async (): Promise<void> => {
    try {
      const currentDomain = window.location.hostname.split('.')[0];
      const baseUrl = `https://${currentDomain}.sharepoint.com`;
      
      const availableSites: IDeploymentTarget[] = [
        { 
          siteUrl: `${baseUrl}`, 
          siteName: 'Root Site Collection', 
          selected: false 
        },
        { 
          siteUrl: `${baseUrl}/sites/teamsite`, 
          siteName: 'Team Site', 
          selected: false 
        },
        { 
          siteUrl: `${baseUrl}/sites/communications`, 
          siteName: 'Communications Site', 
          selected: false 
        },
        { 
          siteUrl: `${baseUrl}/sites/intranet`, 
          siteName: 'Intranet Portal', 
          selected: false 
        },
        { 
          siteUrl: `${baseUrl}/sites/projects`, 
          siteName: 'Project Management Hub', 
          selected: false 
        }
      ];
      
      this.setState({ deploymentTargets: availableSites });
    } catch (error) {
      console.error('Error loading available sites:', error);
      this.setState({ 
        errorMessage: 'Failed to load available sites for deployment',
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
          const importResults = await this.bulkService.importFromJson(fileContent, importOptions);
          operation = {
            id: 'import-' + Date.now(),
            name: 'Import Operation',
            description: `Import from ${importFile.name}`,
            targetActions: [],
            operation: BulkOperationType.Import,
            parameters: importOptions,
            createdBy: this.props.context.pageContext.user.displayName,
            createdDate: new Date(),
            status: importResults.every(r => r.success) ? BulkOperationStatus.Completed : BulkOperationStatus.PartiallyCompleted,
            results: importResults
          };
          break;
        }

        case BulkOperationType.Deploy: {
          const selectedTargets = deploymentTargets.filter(t => t.selected);
          if (selectedTargets.length === 0) {
            throw new Error('No deployment targets selected');
          }
          operation = await this.bulkService.executeBulkOperation(
            selectedActions.map(a => a.Id),
            selectedOperation,
            { targets: selectedTargets }
          );
          break;
        }

        case BulkOperationType.Export:
          operation = await this.bulkService.executeBulkOperation(
            selectedActions.map(a => a.Id),
            selectedOperation,
            exportOptions
          );
          break;

        default:
          operation = await this.bulkService.executeBulkOperation(
            selectedActions.map(a => a.Id),
            selectedOperation
          );
          break;
      }

      this.setState({ 
        currentOperation: operation,
        successMessage: `${selectedOperation} operation completed successfully`
      });
      
      this.props.onOperationComplete(operation);

    } catch (error) {
      this.setState({
        errorMessage: error instanceof Error ? error.message : 'Operation failed'
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