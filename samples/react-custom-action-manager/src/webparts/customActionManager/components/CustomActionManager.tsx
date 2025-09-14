import * as React from 'react';
import {
  Stack,
  Text,
  SearchBox,
  CommandBar,
  ICommandBarItemProps,
  DetailsList,
  IColumn,
  SelectionMode,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Selection,
  DetailsListLayoutMode,
  ConstrainMode,
  Dropdown,
  IDropdownOption,
  Panel,
  PanelType,
  DefaultButton,
  PrimaryButton,
  Dialog,
  DialogType,
  DialogFooter,
  TooltipHost,
  Icon
} from '@fluentui/react';
import styles from './styles/CustomActionManager.module.scss';
import { ICustomActionManagerProps } from './ICustomActionManagerProps';
import { ICustomActionManagerState } from './ICustomActionManagerState';
import { 
  ICustomAction, 
  CustomActionScope
} from '../../../models';
import { CustomActionService, PermissionService, TemplateService, AdvancedSearchService } from '../../../services';
import { CustomActionForm } from './CustomActionForm';
import { BulkOperationsPanel } from './BulkOperationsPanel';
import { TemplateGallery } from './TemplateGallery';

export default class CustomActionManager extends React.Component<ICustomActionManagerProps, ICustomActionManagerState> {
  private _selection: Selection;
  private _customActionService: CustomActionService;
  private _permissionService: PermissionService;
  private _templateService: TemplateService;
  private _advancedSearchService: AdvancedSearchService;

  constructor(props: ICustomActionManagerProps) {
    super(props);

    this._customActionService = new CustomActionService(props.context);
    this._permissionService = new PermissionService(props.context);
    this._templateService = new TemplateService(props.context);
    this._advancedSearchService = new AdvancedSearchService(props.context);
    this._selection = new Selection({
      onSelectionChanged: () => {
        const selectedItems = this._selection.getSelection() as ICustomAction[];
        this.setState({ 
          selectedAction: selectedItems.length === 1 ? selectedItems[0] : null,
          selectedActions: selectedItems
        });
      }
    });

    this.state = {
      customActions: [],
      filteredActions: [],
      loading: true,
      error: null,
      filter: {
        scope: props.defaultScope,
        searchTerm: '',
        location: undefined,
        group: undefined
      },
      pagination: {
        currentPage: 1,
        pageSize: props.pageSize,
        totalItems: 0,
        totalPages: 0
      },
      selectedAction: null,
      selectedActions: [],
      showCreateForm: false,
      showEditForm: false,
      showDeleteDialog: false,
      showBulkOperationsPanel: false,
      showTemplateGallery: false,
      operationInProgress: false,
      lastRefresh: null
    };
  }

  public async componentDidMount(): Promise<void> {
    await this._permissionService.initializePermissions();
    this._loadCustomActions();
  }

  public render(): React.ReactElement<ICustomActionManagerProps> {
    const { title, description } = this.props;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, filteredActions, showCreateForm, showEditForm, showDeleteDialog, showBulkOperationsPanel, showTemplateGallery, selectedAction, selectedActions } = this.state;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>{title}</div>
          <div className={styles.headerDescription}>{description}</div>
        </div>

        {error && (
          <MessageBar messageBarType={MessageBarType.error} onDismiss={this._clearError}>
            {error}
          </MessageBar>
        )}

        <div className={styles.toolbar}>
          {this._renderToolbar()}
        </div>

        <div className={styles.listContainer}>
          {loading ? this._renderLoading() : this._renderCustomActionsList()}
        </div>

        {showBulkOperationsPanel && (
          <BulkOperationsPanel
            selectedActions={selectedActions}
            onClose={this._hideBulkOperationsPanel}
            context={this.props.context}
            onOperationComplete={this._handleBulkOperationComplete}
            permissionService={this._permissionService}
          />
        )}

        {showTemplateGallery && (
          <Panel
            headerText="Template Gallery"
            isOpen={true}
            onDismiss={this._hideTemplateGallery}
            type={PanelType.extraLarge}
            isFooterAtBottom={false}
          >
            <TemplateGallery
              context={this.props.context}
              onTemplateSelected={this._handleTemplateSelected}
              onClose={this._hideTemplateGallery}
              defaultScope={this.state.filter.scope === 'All' ? CustomActionScope.Web : this.state.filter.scope as CustomActionScope}
            />
          </Panel>
        )}

        {showCreateForm && (
          <Panel
            headerText="Create Custom Action"
            isOpen={true}
            onDismiss={this._hideCreateForm}
            type={PanelType.largeFixed}
            isFooterAtBottom={true}
          >
            <CustomActionForm
              onSave={this._handleCreateAction}
              onCancel={this._hideCreateForm}
              isLoading={this.state.operationInProgress}
              showAdvancedProperties={this.props.showAdvancedProperties}
            />
          </Panel>
        )}

        {showEditForm && selectedAction && (
          <Panel
            headerText="Edit Custom Action"
            isOpen={true}
            onDismiss={this._hideEditForm}
            type={PanelType.largeFixed}
            isFooterAtBottom={true}
          >
            <CustomActionForm
              customAction={selectedAction}
              onSave={this._handleUpdateAction}
              onCancel={this._hideEditForm}
              isLoading={this.state.operationInProgress}
              showAdvancedProperties={this.props.showAdvancedProperties}
            />
          </Panel>
        )}

        {showDeleteDialog && selectedAction && (
          <Dialog
            hidden={false}
            onDismiss={this._hideDeleteDialog}
            dialogContentProps={{
              type: DialogType.normal,
              title: 'Delete Custom Action',
              subText: `Are you sure you want to delete the custom action "${selectedAction.Title}"? This action cannot be undone.`
            }}
            modalProps={{ isBlocking: true }}
          >
            <DialogFooter>
              <PrimaryButton
                onClick={this._handleDeleteAction}
                disabled={this.state.operationInProgress}
                text="Delete"
              />
              <DefaultButton
                onClick={this._hideDeleteDialog}
                text="Cancel"
                disabled={this.state.operationInProgress}
              />
            </DialogFooter>
          </Dialog>
        )}
      </div>
    );
  }

  private _renderToolbar = (): React.ReactElement => {
    const { enableSearch, enableFiltering, enableCRUD } = this.props;
    const { filter } = this.state;

    const scopeOptions: IDropdownOption[] = [
      { key: 'All', text: 'All Scopes' },
      { key: CustomActionScope.Web, text: 'Web' },
      { key: CustomActionScope.Site, text: 'Site' }
    ];

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center">
          {enableSearch && (
            <SearchBox
              placeholder="Search custom actions..."
              value={filter.searchTerm}
              onChange={this._onSearchChanged}
              className={styles.searchBox}
            />
          )}
          
          {enableFiltering && (
            <Dropdown
              placeholder="Select scope"
              options={scopeOptions}
              selectedKey={filter.scope}
              onChange={this._onScopeFilterChanged}
              className={styles.scopeDropdown}
            />
          )}

          <Stack.Item grow>
            <span />
          </Stack.Item>

          <DefaultButton
            iconProps={{ iconName: 'Refresh' }}
            text="Refresh"
            onClick={this._loadCustomActions}
            disabled={this.state.loading}
          />
        </Stack>

        {enableCRUD && this._renderCommandBar()}
      </Stack>
    );
  };

  private _renderCommandBar = (): React.ReactElement => {
    const { selectedAction, selectedActions } = this.state;
    const canBulkOperations = this._permissionService.canPerformBulkOperations();
    
    const items: ICommandBarItemProps[] = [
      {
        key: 'new',
        text: 'New',
        iconProps: { iconName: 'Add' },
        onClick: this._showCreateForm
      },
      {
        key: 'template',
        text: 'From Template',
        iconProps: { iconName: 'TemplateFolderIcon' },
        onClick: this._showTemplateGallery
      },
      {
        key: 'edit',
        text: 'Edit',
        iconProps: { iconName: 'Edit' },
        disabled: !selectedAction,
        onClick: this._showEditForm
      },
      {
        key: 'delete',
        text: 'Delete',
        iconProps: { iconName: 'Delete' },
        disabled: !selectedAction,
        onClick: this._showDeleteDialog
      }
    ];

    if (canBulkOperations) {
      items.push({
        key: 'bulk',
        text: 'Bulk Operations',
        iconProps: { iconName: 'BulkUpload' },
        disabled: selectedActions.length === 0,
        onClick: this._showBulkOperationsPanel
      });
    }

    return <CommandBar items={items} />;
  };

  private _renderLoading = (): React.ReactElement => {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size={SpinnerSize.large} label="Loading custom actions..." />
      </div>
    );
  };

  private _renderCustomActionsList = (): React.ReactElement => {
    const { filteredActions } = this.state;

    if (filteredActions.length === 0) {
      return (
        <div className={styles.emptyState}>
          <Icon iconName="CustomList" />
          <div className={styles.emptyStateTitle}>No custom actions found</div>
          <div className={styles.emptyStateText}>Create a new custom action or adjust your filters to see results.</div>
        </div>
      );
    }

    const columns: IColumn[] = [
      {
        key: 'title',
        name: 'Title',
        fieldName: 'Title',
        minWidth: 200,
        maxWidth: 300,
        isResizable: true,
        onRender: (item: ICustomAction) => (
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <Text>{item.Title || 'Untitled'}</Text>
          </Stack>
        )
      },
      {
        key: 'location',
        name: 'Location',
        fieldName: 'Location',
        minWidth: 150,
        maxWidth: 200,
        isResizable: true
      },
      {
        key: 'scope',
        name: 'Scope',
        fieldName: 'Scope',
        minWidth: 80,
        maxWidth: 100,
        onRender: (item: ICustomAction) => (
          <span className={`${styles.scopeIndicator} ${
            item.Scope === CustomActionScope.Web ? styles.webScope : styles.siteScope
          }`}>
            {item.Scope}
          </span>
        )
      },
      {
        key: 'sequence',
        name: 'Sequence',
        fieldName: 'Sequence',
        minWidth: 80,
        maxWidth: 100,
        data: 'number'
      },
      {
        key: 'description',
        name: 'Description',
        fieldName: 'Description',
        minWidth: 200,
        isResizable: true,
        onRender: (item: ICustomAction) => (
          <TooltipHost content={item.Description}>
            <Text>{item.Description ? 
              (item.Description.length > 50 ? `${item.Description.substring(0, 50)}...` : item.Description)
              : 'No description'
            }</Text>
          </TooltipHost>
        )
      }
    ];

    return (
      <DetailsList
        items={filteredActions}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selection={this._selection}
        selectionPreservedOnEmptyClick={true}
        selectionMode={SelectionMode.multiple}
        constrainMode={ConstrainMode.unconstrained}
        onItemInvoked={this._onItemInvoked}
        compact={false}
      />
    );
  };

  private _loadCustomActions = async (): Promise<void> => {
    this.setState({ loading: true, error: null });

    try {
      const actions = await this._customActionService.getCustomActions(this.state.filter.scope);
      this.setState({
        customActions: actions,
        loading: false,
        lastRefresh: new Date()
      }, this._applyFilters);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.setState({
        loading: false,
        error: errorMessage
      });
    }
  };

  private _applyFilters = (): void => {
    const { customActions, filter } = this.state;
    let filtered = [...customActions];

    if (filter.searchTerm) {
      const searchTerm = filter.searchTerm.toLowerCase();
      filtered = filtered.filter(action => 
        (action.Title && action.Title.toLowerCase().includes(searchTerm)) ||
        (action.Description && action.Description.toLowerCase().includes(searchTerm)) ||
        (action.Location && action.Location.toLowerCase().includes(searchTerm))
      );
    }

    if (filter.scope !== 'All') {
      filtered = filtered.filter(action => action.Scope === filter.scope);
    }

    if (filter.location) {
      filtered = filtered.filter(action => action.Location === filter.location);
    }

    if (filter.group) {
      filtered = filtered.filter(action => action.Group === filter.group);
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / this.state.pagination.pageSize);

    this.setState({
      filteredActions: filtered,
      pagination: {
        ...this.state.pagination,
        totalItems,
        totalPages
      }
    });
  };

  private _onSearchChanged = (_: any, newValue?: string): void => {
    this.setState({
      filter: { ...this.state.filter, searchTerm: newValue || '' }
    }, this._applyFilters);
  };

  private _onScopeFilterChanged = (_: any, option?: IDropdownOption): void => {
    if (option) {
      this.setState({
        filter: { ...this.state.filter, scope: option.key as CustomActionScope | 'All' }
      }, () => {
        this._loadCustomActions();
      });
    }
  };

  private _onItemInvoked = (item: ICustomAction): void => {
    this.setState({ selectedAction: item, showEditForm: true });
  };

  private _showCreateForm = (): void => {
    this.setState({ showCreateForm: true });
  };

  private _hideCreateForm = (): void => {
    this.setState({ showCreateForm: false });
  };

  private _showEditForm = (): void => {
    this.setState({ showEditForm: true });
  };

  private _hideEditForm = (): void => {
    this.setState({ showEditForm: false });
  };

  private _showDeleteDialog = (): void => {
    this.setState({ showDeleteDialog: true });
  };

  private _hideDeleteDialog = (): void => {
    this.setState({ showDeleteDialog: false });
  };

  private _handleCreateAction = async (formData: any): Promise<void> => {
    this.setState({ operationInProgress: true });

    try {
      const result = await this._customActionService.createCustomAction(
        formData, 
        this.state.filter.scope === 'All' ? CustomActionScope.Web : this.state.filter.scope as CustomActionScope
      );

      if (result.success) {
        this.setState({ 
          showCreateForm: false,
          operationInProgress: false
        });
        await this._loadCustomActions();
      } else {
        this.setState({
          error: result.message,
          operationInProgress: false
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.setState({
        error: errorMessage,
        operationInProgress: false
      });
    }
  };

  private _handleUpdateAction = async (formData: any): Promise<void> => {
    if (!this.state.selectedAction) return;

    this.setState({ operationInProgress: true });

    try {
      const result = await this._customActionService.updateCustomAction(
        this.state.selectedAction.Id,
        formData,
        this.state.selectedAction.Scope
      );

      if (result.success) {
        this.setState({ 
          showEditForm: false,
          operationInProgress: false,
          selectedAction: null
        });
        await this._loadCustomActions();
      } else {
        this.setState({
          error: result.message,
          operationInProgress: false
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.setState({
        error: errorMessage,
        operationInProgress: false
      });
    }
  };

  private _handleDeleteAction = async (): Promise<void> => {
    if (!this.state.selectedAction) return;

    this.setState({ operationInProgress: true });

    try {
      const result = await this._customActionService.deleteCustomAction(
        this.state.selectedAction.Id,
        this.state.selectedAction.Scope
      );

      if (result.success) {
        this.setState({ 
          showDeleteDialog: false,
          operationInProgress: false,
          selectedAction: null
        });
        await this._loadCustomActions();
      } else {
        this.setState({
          error: result.message,
          operationInProgress: false
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      this.setState({
        error: errorMessage,
        operationInProgress: false
      });
    }
  };

  private _clearError = (): void => {
    this.setState({ error: null });
  };

  private _showBulkOperationsPanel = (): void => {
    this.setState({ showBulkOperationsPanel: true });
  };

  private _hideBulkOperationsPanel = (): void => {
    this.setState({ showBulkOperationsPanel: false });
  };

  private _handleBulkOperationComplete = async (): Promise<void> => {
    this.setState({ showBulkOperationsPanel: false });
    await this._loadCustomActions();
  };

  private _showTemplateGallery = (): void => {
    this.setState({ showTemplateGallery: true });
  };

  private _hideTemplateGallery = (): void => {
    this.setState({ showTemplateGallery: false });
  };

  private _handleTemplateSelected = async (template: any, formData: any): Promise<void> => {
    try {
      const targetScope = this.state.filter.scope === 'All' ? CustomActionScope.Web : this.state.filter.scope as CustomActionScope;
      const result = await this._templateService.createCustomActionFromTemplate(template, formData, targetScope);
      
      if (result.success) {
        this.setState({ showTemplateGallery: false });
        await this._loadCustomActions();
      } else {
        this.setState({ error: result.message });
      }
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Failed to create custom action from template'
      });
    }
  };
}