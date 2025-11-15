import * as React from 'react';
import {
  Panel,
  PanelType,
  SearchBox,
  DetailsList,
  IColumn,
  SelectionMode,
  Text,
  Stack,
  DefaultButton,
  PrimaryButton,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Icon,
  Toggle,
  CommandBar,
  ICommandBarItemProps,
  DetailsListLayoutMode,
  ConstrainMode,
  IObjectWithKey,
  TextField,
  Pivot,
  PivotItem
} from '@fluentui/react';
import { Selection } from '@fluentui/react/lib/Selection';
import { SPHttpClient } from '@microsoft/sp-http';
import { ISiteInfo } from '../services/SiteService';
import { useSiteSelection } from '../hooks/useSiteSelection';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import styles from './styles/SiteSelector.module.scss';

export interface ISiteSelectorProps {
  context: WebPartContext;
  isOpen: boolean;
  onDismiss: () => void;
  onSitesSelected: (sites: ISiteInfo[]) => void;
  selectedSiteUrls?: string[];
}

export const SiteSelector: React.FunctionComponent<ISiteSelectorProps> = (props) => {
  const { context, isOpen, onDismiss, onSitesSelected, selectedSiteUrls } = props;

  const {
    sites,
    selectedSite,
    currentSite,
    loading,
    error,
    searchQuery,
    showRecentOnly,
    searchSites,
    refreshSites,
    toggleRecentOnly,
    clearError
  } = useSiteSelection(context);

  const [localSelectedSites, setLocalSelectedSites] = React.useState<ISiteInfo[]>([]);
  const [selectedTab, setSelectedTab] = React.useState<string>('browse');
  const [customSiteUrl, setCustomSiteUrl] = React.useState<string>('');
  const [validatingUrl, setValidatingUrl] = React.useState<boolean>(false);
  const [urlValidationError, setUrlValidationError] = React.useState<string | null>(null);

  const selection = React.useRef<Selection<IObjectWithKey> | null>(null);

  if (!selection.current) {
    selection.current = new Selection<IObjectWithKey>({
      getKey: (item: IObjectWithKey) => (item as ISiteInfo).url,
      selectionMode: SelectionMode.multiple,
      onSelectionChanged: () => {
        const selectedItems = selection.current?.getSelection() as ISiteInfo[] | undefined;
        setLocalSelectedSites(selectedItems ? selectedItems : []);
      }
    });
  }

  const selectionInstance = selection.current;

  React.useEffect(() => {
    selectionInstance?.setItems(sites as unknown as IObjectWithKey[], false);
  }, [selectionInstance, sites]);

  React.useEffect(() => {
    if (!selectionInstance) {
      return;
    }

    const selectedUrls = new Set(selectedSiteUrls || []);
    if (!selectedUrls.size && selectedSite) {
      selectedUrls.add(selectedSite.url);
    }

    selectionInstance.setChangeEvents(false);
    selectionInstance.setAllSelected(false);
    const updatedSelection: ISiteInfo[] = [];
    sites.forEach(site => {
      if (selectedUrls.has(site.url)) {
        selectionInstance.setKeySelected(site.url, true, false);
        updatedSelection.push(site);
      }
    });
    selectionInstance.setChangeEvents(true);
    setLocalSelectedSites(updatedSelection);
  }, [selectionInstance, selectedSiteUrls, selectedSite, sites]);

  const validateCustomUrl = React.useCallback(async (url: string): Promise<ISiteInfo | null> => {
    if (!url.trim()) {
      setUrlValidationError('Please enter a site URL');
      return null;
    }

    try {
      // Basic URL validation
      const urlObj = new URL(url);
      if (!urlObj.protocol.startsWith('http')) {
        setUrlValidationError('URL must use HTTP or HTTPS protocol');
        return null;
      }

      setValidatingUrl(true);
      setUrlValidationError(null);

      // Try to access the site to validate it exists and is accessible
      const testEndpoint = `${url.replace(/\/$/, '')}/_api/web?$select=Id,Title,Url,ServerRelativeUrl,Description,WebTemplate`;
      const response = await context.spHttpClient.get(testEndpoint, SPHttpClient.configurations.v1);

      if (response.ok) {
        const data = await response.json();
        const siteInfo: ISiteInfo = {
          id: data.Id || '',
          title: data.Title || 'Custom Site',
          url: data.Url || url,
          serverRelativeUrl: data.ServerRelativeUrl || '',
          description: data.Description || '',
          template: data.WebTemplate || 'STS',
          isSubsite: false,
          lastModified: new Date(),
          created: new Date()
        };

        return siteInfo;
      } else {
        setUrlValidationError(`Cannot access site: ${response.status} ${response.statusText}`);
        return null;
      }
    } catch (error) {
      setUrlValidationError(error instanceof Error ? error.message : 'Invalid URL format');
      return null;
    } finally {
      setValidatingUrl(false);
    }
  }, [context.spHttpClient]);

  const handleCustomUrlChange = React.useCallback((_, newValue?: string): void => {
    setCustomSiteUrl(newValue || '');
    setUrlValidationError(null);
  }, []);

  const handleValidateAndSelectCustomUrl = React.useCallback(async (): Promise<ISiteInfo | null> => {
    const validatedSite = await validateCustomUrl(customSiteUrl);
    if (validatedSite) {
      setLocalSelectedSites(prev => {
        const exists = prev.some(site => site.url === validatedSite.url);
        return exists ? prev : [...prev, validatedSite];
      });
      return validatedSite;
    }
    return null;
  }, [validateCustomUrl, customSiteUrl]);

  const handleConfirmSelection = React.useCallback(async (): Promise<void> => {
    let sitesToSelect = localSelectedSites;

    if (selectedTab === 'manual' && customSiteUrl) {
      if (!sitesToSelect || sitesToSelect.length === 0) {
        const validated = await handleValidateAndSelectCustomUrl();
        if (validated) {
          sitesToSelect = [validated];
        }
      }
    }

    if (sitesToSelect && sitesToSelect.length > 0) {
      onSitesSelected(sitesToSelect);
      onDismiss();
    }
  }, [selectedTab, customSiteUrl, localSelectedSites, handleValidateAndSelectCustomUrl, onSitesSelected, onDismiss]);

  const handleSearchChange = React.useCallback((_, newValue?: string): void => {
    searchSites(newValue || '');
  }, [searchSites]);

  const getCommandBarItems = (): ICommandBarItemProps[] => {
    return [
      {
        key: 'refresh',
        text: 'Refresh',
        iconProps: { iconName: 'Refresh' },
        onClick: refreshSites,
        disabled: loading
      },
      {
        key: 'recent',
        text: showRecentOnly ? 'Show All Sites' : 'Recent Sites Only',
        iconProps: { iconName: showRecentOnly ? 'GlobalNavButton' : 'Recent' },
        onClick: toggleRecentOnly,
        disabled: loading
      }
    ];
  };

  const getColumns = (): IColumn[] => {
    return [
      {
        key: 'title',
        name: 'Site Title',
        fieldName: 'title',
        minWidth: 200,
        maxWidth: 300,
        isResizable: true,
        onRender: (item: ISiteInfo) => (
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <Icon
              iconName={item.isSubsite ? 'WebAppBuilderFragment' : 'Website'}
              style={{ color: item.url === currentSite?.url ? '#0078d4' : '#666' }}
            />
            <Stack>
              <Text variant="medium" className={item.url === currentSite?.url ? styles.currentSite : ''}>
                {item.title}
              </Text>
              {item.isSubsite && item.parentUrl && (
                <Text variant="small" style={{ color: '#666' }}>
                  Subsite
                </Text>
              )}
            </Stack>
          </Stack>
        )
      },
      {
        key: 'url',
        name: 'URL',
        fieldName: 'url',
        minWidth: 250,
        maxWidth: 400,
        isResizable: true,
        onRender: (item: ISiteInfo) => (
          <Text variant="small" style={{ color: '#666' }}>
            {item.url}
          </Text>
        )
      },
      {
        key: 'customActions',
        name: 'Custom Actions',
        fieldName: 'customActionsCount',
        minWidth: 100,
        maxWidth: 120,
        onRender: (item: ISiteInfo) => (
          <Text variant="medium">
            {item.customActionsCount || 0}
          </Text>
        )
      },
      {
        key: 'lastModified',
        name: 'Last Modified',
        fieldName: 'lastModified',
        minWidth: 150,
        maxWidth: 180,
        onRender: (item: ISiteInfo) => (
          <Text variant="small">
            {item.lastModified.toLocaleDateString()}
          </Text>
        )
      }
    ];
  };

  const renderBrowseContent = (): React.ReactElement => {
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <Spinner size={SpinnerSize.large} label="Loading sites..." />
        </div>
      );
    }

    if (sites.length === 0 && !loading) {
      return (
        <div className={styles.emptyState}>
          <Icon iconName="Website" className={styles.emptyIcon} />
          <Text variant="xLarge" className={styles.emptyTitle}>
            {searchQuery ? 'No sites found' : 'No sites available'}
          </Text>
          <Text className={styles.emptyText}>
            {searchQuery
              ? `No sites match "${searchQuery}". Try adjusting your search.`
              : 'Unable to load sites from this site collection.'
            }
          </Text>
        </div>
      );
    }

    return (
      <DetailsList
        items={sites}
        columns={getColumns()}
        setKey="sites"
        layoutMode={DetailsListLayoutMode.justified}
        constrainMode={ConstrainMode.unconstrained}
        selectionMode={SelectionMode.multiple}
        selectionPreservedOnEmptyClick={true}
        onItemInvoked={(item) => {
          onSitesSelected([item as ISiteInfo]);
          onDismiss();
        }}
        selection={selectionInstance ?? undefined}
        className={styles.sitesList}
      />
    );
  };

  const renderManualContent = (): React.ReactElement => {
    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Stack tokens={{ childrenGap: 8 }}>
          <Text variant="medium" style={{ fontWeight: '600' }}>
            Enter Site URL
          </Text>
          <Text variant="small" style={{ color: '#666' }}>
            Enter the full URL of the SharePoint site you want to manage custom actions for.
          </Text>
        </Stack>

        <TextField
          placeholder="https://contoso.sharepoint.com/sites/sitename"
          value={customSiteUrl}
          onChange={handleCustomUrlChange}
          errorMessage={urlValidationError || undefined}
          disabled={validatingUrl}
          description="Enter the complete URL including the protocol (https://)"
        />

        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <PrimaryButton
            text="Validate Site"
            onClick={handleValidateAndSelectCustomUrl}
            disabled={!customSiteUrl.trim() || validatingUrl}
            iconProps={{ iconName: validatingUrl ? undefined : 'Accept' }}
          />
          {validatingUrl && (
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <Spinner size={SpinnerSize.small} />
              <Text variant="small">Validating site...</Text>
            </Stack>
          )}
        </Stack>

        {localSelectedSites.length > 0 && selectedTab === 'manual' && (
          <Stack tokens={{ childrenGap: 8 }} style={{
            padding: '12px',
            border: '1px solid #0078d4',
            borderRadius: '4px',
            backgroundColor: '#f3f9ff'
          }}>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
              <Icon iconName="Accept" style={{ color: '#107c10' }} />
              <Text variant="medium" style={{ fontWeight: '600', color: '#107c10' }}>
                {localSelectedSites.length === 1 ? 'Site validated successfully' : `${localSelectedSites.length} sites ready to select`}
              </Text>
            </Stack>
            {localSelectedSites.map(site => (
              <Stack key={site.url} tokens={{ childrenGap: 4 }}>
                <Text variant="medium">{site.title}</Text>
                <Text variant="small" style={{ color: '#666' }}>{site.url}</Text>
                {site.description && (
                  <Text variant="small" style={{ color: '#666' }}>{site.description}</Text>
                )}
              </Stack>
            ))}
          </Stack>
        )}

        <Stack tokens={{ childrenGap: 8 }}>
          <Text variant="small" style={{ fontWeight: '600' }}>
            Examples:
          </Text>
          <Stack tokens={{ childrenGap: 4 }}>
            <Text variant="small" style={{ color: '#666' }}>
              • https://contoso.sharepoint.com/sites/marketing
            </Text>
            <Text variant="small" style={{ color: '#666' }}>
              • https://contoso.sharepoint.com/sites/hr/subsite
            </Text>
            <Text variant="small" style={{ color: '#666' }}>
              • https://contoso-my.sharepoint.com/personal/user_contoso_com
            </Text>
          </Stack>
        </Stack>
      </Stack>
    );
  };

  const renderContent = (): React.ReactElement => {
    return selectedTab === 'browse' ? renderBrowseContent() : renderManualContent();
  };

  const renderFooter = (): React.ReactElement => {
    const selectedCount = localSelectedSites.length;
    const selectedSummary = selectedCount === 1
      ? localSelectedSites[0].title
      : `${selectedCount} sites selected`;

    const includesCurrent = currentSite && localSelectedSites.some(site => site.url === currentSite.url);

    return (
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 16 }}>
          <Text variant="small">
            {selectedCount > 0 ? `Selected: ${selectedSummary}` : 'No site selected'}
          </Text>
          {includesCurrent && (
            <Text variant="small" style={{ color: '#0078d4' }}>
              (Includes current site)
            </Text>
          )}
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <DefaultButton onClick={onDismiss} text="Cancel" />
          <PrimaryButton
            onClick={handleConfirmSelection}
            text={selectedCount > 1 ? 'Select Sites' : 'Select Site'}
            disabled={selectedCount === 0}
          />
        </Stack>
      </Stack>
    );
  };

  return (
    <Panel
      headerText="Select SharePoint Site"
      isOpen={isOpen}
      onDismiss={onDismiss}
      type={PanelType.extraLarge}
      isFooterAtBottom={true}
      onRenderFooterContent={renderFooter}
      className={styles.siteSelector}
    >
      <Stack tokens={{ childrenGap: 16 }}>
        {error && (
          <MessageBar messageBarType={MessageBarType.error} onDismiss={clearError}>
            {error}
          </MessageBar>
        )}

        <Pivot
          selectedKey={selectedTab}
          onLinkClick={(item) => {
            if (item?.props.itemKey) {
              setSelectedTab(item.props.itemKey);
              setUrlValidationError(null);
            }
          }}
        >
          <PivotItem headerText="Browse Sites" itemKey="browse">
            <Stack tokens={{ childrenGap: 12 }} style={{ marginTop: '16px' }}>
              <SearchBox
                placeholder={showRecentOnly ? "Search recent sites..." : "Search sites..."}
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchBox}
                disabled={loading}
              />

              <CommandBar
                items={getCommandBarItems()}
                ariaLabel="Site management commands"
              />
            </Stack>
          </PivotItem>
          <PivotItem headerText="Enter URL" itemKey="manual">
            <div style={{ marginTop: '16px' }} />
          </PivotItem>
        </Pivot>

        <div className={styles.contentContainer}>
          {renderContent()}
        </div>

        {selectedTab === 'browse' && sites.length > 0 && (
          <Text variant="small" className={styles.resultsSummary}>
            Showing {sites.length} sites
            {showRecentOnly && ' (recent only)'}
            {searchQuery && ` matching "${searchQuery}"`}
          </Text>
        )}

        {selectedTab === 'manual' && localSelectedSites.length > 0 && (
          <Text variant="small" className={styles.resultsSummary} style={{ color: '#107c10' }}>
            {localSelectedSites.length === 1 ? 'Site validated and ready to select' : 'Sites validated and ready to select'}
          </Text>
        )}
      </Stack>
    </Panel>
  );
};
