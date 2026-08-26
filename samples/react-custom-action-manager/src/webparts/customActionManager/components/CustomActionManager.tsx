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
  DetailsListLayoutMode,
  ConstrainMode,
  Dropdown,
  IDropdownOption,
  TextField,
  Toggle,
  ChoiceGroup,
  IChoiceGroupOption,
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
import {
  ICustomAction,
  CustomActionScope,
  RegistrationType
} from '../../../models';
import { PermissionService, TemplateService } from '../../../services';
import { useCustomActionState } from '../../../hooks/useCustomActionState';
import { useCustomActionSelection } from '../../../hooks/useCustomActionSelection';
import { useCustomActionOperations } from '../../../hooks/useCustomActionOperations';
import { useDebounce } from '../../../utils/PerformanceUtils';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { SiteSelector } from '../../../components/SiteSelector';
import { CurrentSiteInfo } from '../../../components/CurrentSiteInfo';
import { CustomActionForm } from './CustomActionForm';
import { BulkOperationsPanel } from './BulkOperationsPanel';
import { TemplateGallery } from './TemplateGallery';
import { ISiteInfo } from '../../../services/SiteService';
import {
  ColumnSetting,
  ColumnKey,
  deriveColumnSettings
} from '../utils/columnConfig';

const CustomActionManager: React.FunctionComponent<ICustomActionManagerProps> = (props) => {
  const {
    title,
    description,
    context,
    defaultScope,
    pageSize,
    enableSearch,
    enableFiltering,
    enableCRUD,
    showAdvancedProperties,
    showTitleColumn,
    showLocationColumn,
    showSiteColumn,
    showScopeColumn,
    showComponentColumn,
    showSequenceColumn,
    showDescriptionColumn,
    columnOrder,
    columnConfiguration
  } = props;

  const [showCreateForm, setShowCreateForm] = React.useState(false);
  const [showEditForm, setShowEditForm] = React.useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [showBulkOperationsPanel, setShowBulkOperationsPanel] = React.useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = React.useState(false);
  const [showSiteSelector, setShowSiteSelector] = React.useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    const stored = window.sessionStorage.getItem('cam:showAdvancedFilters');
    return stored ? stored === 'true' : false;
  });

  const compactViewStorageKey = 'cam:compactView';
  const [isCompactView, setIsCompactView] = React.useState<boolean>(() => {
    if (typeof window === 'undefined') {
      return false;
    }
    const stored = window.sessionStorage.getItem(compactViewStorageKey);
    return stored ? stored === 'true' : false;
  });

  React.useEffect(() => {
    try {
      window.sessionStorage.setItem(compactViewStorageKey, isCompactView.toString());
    } catch (error) {
      console.warn('Failed to persist compact view preference:', error);
    }
  }, [isCompactView]);

  const columnWidthStorageKey = 'cam:columnWidths';
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>(() => {
    if (typeof window === 'undefined') {
      return {};
    }
    try {
      const stored = window.sessionStorage.getItem(columnWidthStorageKey);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn('Failed to parse stored column widths:', error);
      return {};
    }
  });

  const columnSettings = React.useMemo<ColumnSetting[]>(() =>
    deriveColumnSettings({
      columnConfiguration,
      columnOrder,
      showTitleColumn,
      showLocationColumn,
      showSiteColumn,
      showScopeColumn,
      showComponentColumn,
      showSequenceColumn,
      showDescriptionColumn
    }),
  [
    columnConfiguration,
    columnOrder,
    showTitleColumn,
    showLocationColumn,
    showSiteColumn,
    showScopeColumn,
    showComponentColumn,
    showSequenceColumn,
    showDescriptionColumn
  ]);

  const visibleColumnKeys = React.useMemo<ColumnKey[]>(
    () => columnSettings.filter(setting => setting.visible).map(setting => setting.key),
    [columnSettings]
  );

  React.useEffect(() => {
    try {
      window.sessionStorage.setItem('cam:showAdvancedFilters', showAdvancedFilters.toString());
    } catch (error) {
      console.warn('Failed to persist advanced filter visibility:', error);
    }
  }, [showAdvancedFilters]);

  const handleColumnResize = React.useCallback((column?: IColumn, newWidth?: number) => {
    if (!column || typeof newWidth !== 'number' || Number.isNaN(newWidth)) {
      return;
    }

    setColumnWidths(prev => {
      const updated = { ...prev, [column.key]: newWidth };
      try {
        window.sessionStorage.setItem(columnWidthStorageKey, JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to persist column widths:', error);
      }
      return updated;
    });
  }, []);

  const contextSite: ISiteInfo = React.useMemo(() => ({
    id: context.pageContext.site.id?.toString() || '',
    title: context.pageContext.web.title,
    url: context.pageContext.web.absoluteUrl,
    serverRelativeUrl: context.pageContext.web.serverRelativeUrl,
    description: context.pageContext.web.description || '',
    template: context.pageContext.web.templateName || 'STS',
    isSubsite: (context.pageContext.web as any).isSubWeb || false,
    lastModified: new Date(),
    created: new Date()
  }), [
    context.pageContext.site.id,
    context.pageContext.web.title,
    context.pageContext.web.absoluteUrl,
    context.pageContext.web.serverRelativeUrl,
    context.pageContext.web.description,
    context.pageContext.web.templateName,
    (context.pageContext.web as any).isSubWeb
  ]);

  const [selectedSites, setSelectedSites] = React.useState<ISiteInfo[]>([]);

  const createSiteInfoFromUrl = React.useCallback((url: string): ISiteInfo => {
    if (url === contextSite.url) {
      return contextSite;
    }

    return {
      id: '',
      title: url,
      url,
      serverRelativeUrl: '',
      description: '',
      template: 'STS',
      isSubsite: false,
      lastModified: new Date(),
      created: new Date()
    } as ISiteInfo;
  }, [contextSite]);
  const primarySelectedSite = selectedSites.length > 0 ? selectedSites[0] : null;

  const permissionServiceRef = React.useRef<PermissionService>();
  const templateServiceRef = React.useRef<TemplateService>();

  if (!permissionServiceRef.current) {
    permissionServiceRef.current = new PermissionService(context);
  }
  if (!templateServiceRef.current) {
    templateServiceRef.current = new TemplateService(context);
  }

  const {
    customActions,
    filteredActions,
    loading,
    error,
    filter,
    pagination,
    loadCustomActions,
    setFilter,
    clearError,
    refreshData,
    resetFilters,
    selectedSiteUrls,
    setSelectedSiteUrls
  } = useCustomActionState(context, defaultScope, pageSize, primarySelectedSite?.url);

  React.useEffect(() => {
    if (!selectedSiteUrls || selectedSiteUrls.length === 0) {
      setSelectedSiteUrls([contextSite.url]);
      return;
    }

    setSelectedSites(prev => {
      const prevMap = new Map(prev.map(site => [site.url, site]));
      return selectedSiteUrls.map(url => prevMap.get(url) || createSiteInfoFromUrl(url));
    });
  }, [selectedSiteUrls, setSelectedSiteUrls, createSiteInfoFromUrl]);

  React.useEffect(() => {
    const targetUrl = primarySelectedSite?.url;
    templateServiceRef.current?.setTargetSite(targetUrl);
  }, [primarySelectedSite?.url]);

  const [searchValue, setSearchValue] = React.useState(filter.searchTerm);

  const {
    selectedAction,
    selectedActions,
    selection,
    setSelectedAction,
    clearSelection
  } = useCustomActionSelection();

  const {
    operationInProgress,
    createCustomAction,
    updateCustomAction,
    deleteCustomAction
  } = useCustomActionOperations(context, refreshData, selectedSites.map(site => site.url));

  React.useEffect(() => {
    const initializePermissions = async (): Promise<void> => {
      try {
        await permissionServiceRef.current!.initializePermissions();
        await loadCustomActions();
      } catch (err) {
        console.error('Failed to initialize permissions:', err);
      }
    };

    initializePermissions().catch(console.error);
  }, [loadCustomActions]);

  const debouncedSearch = useDebounce((searchTerm: string) => {
    setFilter({ searchTerm });
  }, 300);

  React.useEffect(() => {
    if (filter.searchTerm !== searchValue) {
      setSearchValue(filter.searchTerm);
    }
  }, [filter.searchTerm]);

  const renderToolbar = (): React.ReactElement => {
   const scopeOptions: IDropdownOption[] = [
     { key: 'All', text: 'All Scopes' },
     { key: CustomActionScope.Web, text: 'Web' },
     { key: CustomActionScope.Site, text: 'Site' }
   ];

    const registrationOptions: IChoiceGroupOption[] = [
      { key: 'any', text: 'Any' },
      { key: RegistrationType.None.toString(), text: 'None' },
      { key: RegistrationType.List.toString(), text: 'List' },
      { key: RegistrationType.ContentType.toString(), text: 'Content Type' },
      { key: RegistrationType.ProgId.toString(), text: 'ProgId' },
      { key: RegistrationType.FileType.toString(), text: 'File Type' }
    ];

   return (
    <Stack tokens={{ childrenGap: 16 }}>
       <Stack horizontal tokens={{ childrenGap: 16 }} verticalAlign="center" wrap>
          {enableSearch && (
            <SearchBox
              placeholder="Search custom actions..."
              value={searchValue}
              onChange={(_, newValue) => {
                const value = newValue || '';
                setSearchValue(value);
                debouncedSearch(value);
              }}
              className={styles.searchBox}
            />
          )}

          {enableFiltering && (
            <Dropdown
              placeholder="Select scope"
              options={scopeOptions}
              selectedKey={filter.scope}
              onChange={(_, option) => {
                if (option) {
                  setFilter({ scope: option.key as CustomActionScope | 'All' });
                }
              }}
              className={styles.scopeDropdown}
            />
          )}

          {enableFiltering && (
            <Toggle
              inlineLabel
              label="Advanced filters"
              checked={showAdvancedFilters}
              onChange={(_, checked) => setShowAdvancedFilters(!!checked)}
            />
          )}

          <Stack.Item grow>
            <span />
          </Stack.Item>

          <DefaultButton
            iconProps={{ iconName: 'Website' }}
            text={primarySelectedSite ? primarySelectedSite.title : "Select Site"}
            onClick={() => setShowSiteSelector(true)}
            disabled={loading}
            title={primarySelectedSite ? `Managing custom actions for: ${primarySelectedSite.title}` : "Select a different SharePoint site"}
          />

          <DefaultButton
            iconProps={{ iconName: 'Refresh' }}
            text="Refresh"
            onClick={refreshData}
            disabled={loading}
          />

          <DefaultButton
            iconProps={{ iconName: 'ClearFilter' }}
            text="Reset Filters"
            onClick={() => {
              resetFilters();
            }}
          />
        </Stack>

        {enableFiltering && showAdvancedFilters && (
          <Stack horizontal tokens={{ childrenGap: 24 }} wrap>
            <TextField
              placeholder="Filter by Component ID (GUID)"
              value={filter.componentId || ''}
              onChange={(_, value) => setFilter({ componentId: value || undefined })}
              styles={{ root: { minWidth: 260 } }}
            />

            <ChoiceGroup
              label="Registration Type"
              selectedKey={typeof filter.registrationType === 'number' ? filter.registrationType.toString() : 'any'}
              options={registrationOptions}
              onChange={(_, option) => {
                if (option?.key === 'any') {
                  setFilter({ registrationType: undefined });
                } else if (option) {
                  setFilter({ registrationType: Number(option.key) });
                }
              }}
              styles={{ root: { maxWidth: 260 } }}
            />

            <Toggle
              label="Only Show Ribbon Customizations"
              checked={filter.hasCommandUI === true}
              onText="Ribbon actions only"
              offText="Include non-ribbon actions"
              onChange={(_, checked) => setFilter({ hasCommandUI: checked ? true : undefined })}
            />
          </Stack>
        )}

        {enableCRUD && renderCommandBar()}
      </Stack>
    );
  };

  const renderCommandBar = (): React.ReactElement => {
    const canBulkOperations = permissionServiceRef.current?.canPerformBulkOperations() || false;

    const items: ICommandBarItemProps[] = [
      {
        key: 'new',
        text: 'New',
        iconProps: { iconName: 'Add' },
        onClick: () => setShowCreateForm(true)
      },
      {
        key: 'template',
        text: 'From Template',
        iconProps: { iconName: 'FabricFolder' },
        onClick: () => setShowTemplateGallery(true)
      },
      {
        key: 'edit',
        text: 'Edit',
        iconProps: { iconName: 'Edit' },
        disabled: !selectedAction,
        onClick: () => setShowEditForm(true)
      },
      {
        key: 'delete',
        text: 'Delete',
        iconProps: { iconName: 'Delete' },
        disabled: !selectedAction,
        onClick: () => setShowDeleteDialog(true)
      }
    ];

    if (canBulkOperations) {
      items.push({
        key: 'bulk',
        text: 'Bulk Operations',
        iconProps: { iconName: 'BulkUpload' },
        disabled: selectedActions.length === 0,
        onClick: () => setShowBulkOperationsPanel(true)
      });
    }

    return <CommandBar items={items} />;
  };

  const renderLoading = (): React.ReactElement => {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size={SpinnerSize.large} label="Loading custom actions..." />
      </div>
    );
  };

  const availableColumns = React.useMemo<Record<ColumnKey, IColumn>>(() => ({
    title: {
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
    location: {
      key: 'location',
      name: 'Location',
      fieldName: 'Location',
      minWidth: 150,
      maxWidth: 200,
      isResizable: true
    },
    site: {
      key: 'site',
      name: 'Site',
      fieldName: 'SiteTitle',
      minWidth: 220,
      maxWidth: 280,
      isResizable: true,
      onRender: (item: ICustomAction) => (
        <Stack tokens={{ childrenGap: 2 }}>
          <Text>{item.SiteTitle || primarySelectedSite?.title || context.pageContext.web.title}</Text>
          <Text variant="small" style={{ color: '#666' }}>
            {item.SiteUrl || primarySelectedSite?.url || context.pageContext.web.absoluteUrl}
          </Text>
        </Stack>
      )
    },
    scope: {
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
    component: {
      key: 'component',
      name: 'Client Component',
      fieldName: 'ClientSideComponentId',
      minWidth: 220,
      maxWidth: 320,
      isResizable: true,
      onRender: (item: ICustomAction) => (
        item.ClientSideComponentId ? (
          <Stack tokens={{ childrenGap: 2 }}>
            <Text variant="small">{item.ClientSideComponentId}</Text>
            {item.ClientSideComponentProperties && (
              <TooltipHost content={item.ClientSideComponentProperties}>
                <Text variant="small" style={{ color: '#666' }}>
                  Properties: {item.ClientSideComponentProperties.length > 60
                    ? `${item.ClientSideComponentProperties.substring(0, 57)}...`
                    : item.ClientSideComponentProperties}
                </Text>
              </TooltipHost>
            )}
            {item.CommandUIExtension && (
              <TooltipHost content={item.CommandUIExtension}>
                <Text variant="small" style={{ color: '#107c10' }}>
                  Ribbon Customization Present
                </Text>
              </TooltipHost>
            )}
          </Stack>
        ) : (
          <Text variant="small" style={{ color: '#666' }}>N/A</Text>
        )
      )
    },
    sequence: {
      key: 'sequence',
      name: 'Sequence',
      fieldName: 'Sequence',
      minWidth: 80,
      maxWidth: 100,
      data: 'number'
    },
    description: {
      key: 'description',
      name: 'Description',
      fieldName: 'Description',
      minWidth: 200,
      isResizable: true,
      onRender: (item: ICustomAction) => (
        <TooltipHost content={item.Description}>
          <div className={styles.descriptionCell}>
            <Text>{item.Description ? item.Description : 'No description'}</Text>
          </div>
        </TooltipHost>
      )
    }
  }), [primarySelectedSite, context.pageContext.web.title, context.pageContext.web.absoluteUrl]);

  const columns = React.useMemo<IColumn[]>(() => {
    return visibleColumnKeys.map(columnKey => {
      const baseColumn = availableColumns[columnKey];
      if (!baseColumn) {
        return null;
      }

      const width = columnWidths[columnKey];
      if (width) {
        return { ...baseColumn, width, calculatedWidth: width };
      }

      return baseColumn;
    }).filter((column): column is IColumn => column !== null);
  }, [visibleColumnKeys, availableColumns, columnWidths]);

  const renderCustomActionsList = React.useMemo((): React.ReactElement => {
    if (filteredActions.length === 0) {
      return (
        <div className={styles.emptyState}>
          <Icon iconName="CustomList" />
          <div className={styles.emptyStateTitle}>No custom actions found</div>
          <div className={styles.emptyStateText}>Create a new custom action or adjust your filters to see results.</div>
        </div>
      );
    }
    return (
      <DetailsList
        items={filteredActions}
        columns={columns}
        setKey="set"
        layoutMode={DetailsListLayoutMode.justified}
        selection={selection}
        selectionPreservedOnEmptyClick={true}
        selectionMode={SelectionMode.multiple}
        constrainMode={ConstrainMode.unconstrained}
        compact={isCompactView}
        onColumnResize={handleColumnResize}
        onItemInvoked={(item: ICustomAction) => {
          setSelectedAction(item);
          setShowEditForm(true);
        }}
      />
    );
  }, [filteredActions, selection, setSelectedAction, columns, isCompactView, handleColumnResize]);

  const handleCreateAction = React.useCallback(async (formData: any, scope?: CustomActionScope): Promise<void> => {
    const targetScope = scope || (filter.scope === 'All' ? CustomActionScope.Web : filter.scope as CustomActionScope);
    const result = await createCustomAction(formData, targetScope);

    if (result.success) {
      setShowCreateForm(false);
      clearSelection();
    }
  }, [createCustomAction, filter.scope, clearSelection]);

  const handleUpdateAction = React.useCallback(async (formData: any): Promise<void> => {
    if (!selectedAction) return;

    const result = await updateCustomAction(selectedAction.Id, formData, selectedAction.Scope);

    if (result.success) {
      setShowEditForm(false);
      clearSelection();
    }
  }, [updateCustomAction, selectedAction, clearSelection]);

  const handleDeleteAction = React.useCallback(async (): Promise<void> => {
    if (!selectedAction) return;

    const result = await deleteCustomAction(selectedAction.Id, selectedAction.Scope);

    if (result.success) {
      setShowDeleteDialog(false);
      clearSelection();
    }
  }, [deleteCustomAction, selectedAction, clearSelection]);

  const handleBulkOperationComplete = React.useCallback(async (): Promise<void> => {
    setShowBulkOperationsPanel(false);
    await refreshData();
    clearSelection();
  }, [refreshData, clearSelection]);

  const handleTemplateSelected = React.useCallback(async (template: any, formData: any): Promise<void> => {
    try {
      const targetScope = filter.scope === 'All' ? CustomActionScope.Web : filter.scope as CustomActionScope;
      const payload = templateServiceRef.current!.getCustomActionFormData(template, formData);
      const result = await createCustomAction(payload, targetScope);

      if (result.success) {
        if (template?.id) {
          await templateServiceRef.current!.markTemplateUsed(template.id);
        }
        setShowTemplateGallery(false);
        await refreshData();
      }
    } catch (err) {
      console.error('Failed to create custom action from template:', err);
    }
  }, [filter.scope, refreshData, createCustomAction]);

  const handleSitesSelected = React.useCallback(async (sites: ISiteInfo[]): Promise<void> => {
    if (!sites || sites.length === 0) {
      return;
    }

    setShowSiteSelector(false);
    clearSelection();

    const uniqueSites = Array.from(new Map(sites.map(site => [site.url, site])).values());
    setSelectedSites(uniqueSites);
    setSelectedSiteUrls(uniqueSites.map(site => site.url));

    try {
      clearError();
      await refreshData();

    } catch (err) {
      console.error('Error switching to sites:', err);
    }
  }, [clearSelection, refreshData, clearError]);

  return (
    <ErrorBoundary>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>{title}</div>
          <div className={styles.headerDescription}>{description}</div>
        </div>

        {error && (
          <MessageBar messageBarType={MessageBarType.error} onDismiss={clearError}>
            {error}
          </MessageBar>
        )}

        <CurrentSiteInfo
          context={context}
          selectedSite={primarySelectedSite}
          additionalSelectedCount={Math.max(0, selectedSites.length - 1)}
          onChangeSite={() => setShowSiteSelector(true)}
          disabled={operationInProgress || loading}
        />

        <div className={styles.toolbar}>
          {renderToolbar()}
        </div>

        <div className={styles.listContainer}>
          {loading ? renderLoading() : renderCustomActionsList}
        </div>

        {showBulkOperationsPanel && (
          <BulkOperationsPanel
            selectedActions={selectedActions}
            onClose={() => setShowBulkOperationsPanel(false)}
            context={context}
            onOperationComplete={handleBulkOperationComplete}
            permissionService={permissionServiceRef.current!}
            selectedSites={selectedSites}
          />
        )}

        {showTemplateGallery && (
          <Panel
            headerText="Template Gallery"
            isOpen={true}
            onDismiss={() => setShowTemplateGallery(false)}
            type={PanelType.extraLarge}
            isFooterAtBottom={false}
          >
            <TemplateGallery
              context={context}
              onTemplateSelected={handleTemplateSelected}
              onClose={() => setShowTemplateGallery(false)}
              defaultScope={filter.scope === 'All' ? CustomActionScope.Web : filter.scope as CustomActionScope}
              targetSiteUrl={primarySelectedSite?.url || context.pageContext.web.absoluteUrl}
            />
          </Panel>
        )}

        {showCreateForm && (
          <Panel
            headerText="Create Custom Action"
            isOpen={true}
            onDismiss={() => setShowCreateForm(false)}
            type={PanelType.largeFixed}
            isFooterAtBottom={true}
          >
            <CustomActionForm
              onSave={handleCreateAction}
              onCancel={() => setShowCreateForm(false)}
              isLoading={operationInProgress}
              showAdvancedProperties={showAdvancedProperties}
            />
          </Panel>
        )}

        {showEditForm && selectedAction && (
          <Panel
            headerText="Edit Custom Action"
            isOpen={true}
            onDismiss={() => setShowEditForm(false)}
            type={PanelType.largeFixed}
            isFooterAtBottom={true}
          >
            <CustomActionForm
              customAction={selectedAction}
              onSave={handleUpdateAction}
              onCancel={() => setShowEditForm(false)}
              isLoading={operationInProgress}
              showAdvancedProperties={showAdvancedProperties}
            />
          </Panel>
        )}

        {showDeleteDialog && selectedAction && (
          <Dialog
            hidden={false}
            onDismiss={() => setShowDeleteDialog(false)}
            dialogContentProps={{
              type: DialogType.normal,
              title: 'Delete Custom Action',
              subText: `Are you sure you want to delete the custom action "${selectedAction.Title}"? This action cannot be undone.`
            }}
            modalProps={{ isBlocking: true }}
          >
            <DialogFooter>
              <PrimaryButton
                onClick={handleDeleteAction}
                disabled={operationInProgress}
                text="Delete"
              />
              <DefaultButton
                onClick={() => setShowDeleteDialog(false)}
                text="Cancel"
                disabled={operationInProgress}
              />
            </DialogFooter>
          </Dialog>
        )}

        {showSiteSelector && (
          <SiteSelector
            context={context}
            isOpen={showSiteSelector}
            onDismiss={() => setShowSiteSelector(false)}
            onSitesSelected={handleSitesSelected}
            selectedSiteUrls={selectedSites.length > 0 ? selectedSites.map(site => site.url) : [context.pageContext.web.absoluteUrl]}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default React.memo(CustomActionManager);
