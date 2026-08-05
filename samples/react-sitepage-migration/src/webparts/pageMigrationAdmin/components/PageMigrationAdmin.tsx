import * as React from 'react';
import {
  Body1,
  Button,
  Caption1,
  Dropdown,
  Field,
  FluentProvider,
  MessageBar,
  MessageBarBody,
  Option,
  SearchBox,
  Skeleton,
  SkeletonItem,
  Subtitle2,
  Title3
} from '@fluentui/react-components';
import {
  DocumentSearchRegular,
  FilterRegular,
  WebAssetRegular
} from '@fluentui/react-icons';
import { usePageMigrationViewModel } from '../../../hooks/usePageMigrationViewModel';
import { GroupByKey } from '../../../hooks/usePageSelection';
import { PageInventoryItem } from '../../../models/PageInventoryItem';
import { ConflictMode } from '../../../models/OperationalTypes';
import { formatString } from '../../../utilities/formatString';
import { buildFluentTheme } from '../theme/spfxFluentTheme';
import { IPageMigrationAdminProps } from './IPageMigrationAdminProps';
import { ErrorBoundary } from './ErrorBoundary';
import { MigrationConfirmDialog } from './MigrationConfirmDialog';
import { MigrationToolbar } from './MigrationToolbar';
import { PageDetailDrawer } from './PageDetailDrawer';
import { PageInventoryGrid } from './PageInventoryGrid';
import { RunStatus } from './RunStatus';
import { SettingsDrawer } from './SettingsDrawer';
import { SiteSetupSection } from './SiteSetupSection';
import { PortalMountProvider } from './portalMount';
import { useAppStyles } from './useAppStyles';
import * as strings from 'PageMigrationAdminWebPartStrings';

const groupByOptions: ReadonlyArray<{ readonly key: GroupByKey; readonly label: string }> = [
  { key: 'none', label: strings.GroupByNone },
  { key: 'migrationStatus', label: strings.GroupByStatus },
  { key: 'layout', label: strings.GroupByLayout },
  { key: 'promotionState', label: strings.GroupByPromotion }
];

const EmptyState: React.FC<{
  readonly icon: React.ReactNode;
  readonly title: string;
  readonly description: string;
  readonly action?: { readonly label: string; readonly onClick: () => void };
}> = ({ icon, title, description, action }) => {
  const styles = useAppStyles();
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyStateIcon} aria-hidden="true">{icon}</div>
      <Subtitle2 as="h3">{title}</Subtitle2>
      <Body1 className={styles.emptyStateText}>{description}</Body1>
      {action ? (
        <Button appearance="primary" onClick={action.onClick}>{action.label}</Button>
      ) : null}
    </div>
  );
};

const GridSkeleton: React.FC = () => (
  <Skeleton aria-label={strings.ProgressLoadingPages}>
    {Array.from({ length: 6 }).map((_, index) => (
      <SkeletonItem key={index} size={32} style={{ marginBottom: 8 }} />
    ))}
  </Skeleton>
);

const PageMigrationAdminContent: React.FC<IPageMigrationAdminProps> = (props) => {
  const styles = useAppStyles();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = React.useState(false);

  const viewModel = usePageMigrationViewModel({
    services: props.services,
    storageScope: props.storageScope,
    defaultPublishOnComplete: props.defaultPublishOnComplete,
    defaultConflictMode: props.defaultConflictMode,
    persistReports: props.persistReports,
    includePageTemplates: props.includePageTemplates,
    reportStorageSiteUrl: props.reportStorageSiteUrl,
    auditListName: props.auditListName,
    logListName: props.logListName
  });

  const { inventory, run, source, target, detail } = viewModel;
  const isRunning = run.isValidating || run.isMigrating;

  React.useEffect(() => {
    if (!run.isMigrating) {
      return undefined;
    }

    const handler = (event: BeforeUnloadEvent): void => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [run.isMigrating]);

  const handleConfirmMigrate = React.useCallback(() => {
    setIsConfirmOpen(false);
    void run.migrateSelected();
  }, [run]);

  const handleOpenDetail = React.useCallback((page: PageInventoryItem) => {
    void detail.open(page);
  }, [detail]);

  const handleValidatePage = React.useCallback((page: PageInventoryItem) => {
    void viewModel.validatePage(page);
  }, [viewModel]);

  const handleCopyResult = React.useCallback((succeeded: boolean) => {
    viewModel.pushNotification(
      succeeded ? 'success' : 'warning',
      succeeded ? strings.DetailCopiedConfirmation : strings.DetailCopyFailed
    );
  }, [viewModel]);

  const hasBothSites = !!source.selectedSite && !!target.selectedSite;
  const showSitesEmptyState = !hasBothSites && inventory.pages.length === 0 && !inventory.isLoading;
  const showNoPagesEmptyState = hasBothSites && inventory.pages.length === 0 && !inventory.isLoading;
  const showNoResultsEmptyState =
    inventory.pages.length > 0 && inventory.visiblePages.length === 0 && !inventory.isLoading;

  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <Title3 as="h2">{strings.AppTitle}</Title3>
          <Body1 className={styles.subtitle}>{strings.AppDescription}</Body1>
        </div>
      </header>

      <SiteSetupSection
        source={source}
        target={target}
        validations={run.validations}
        disabled={isRunning}
      />

      <section className={styles.section} aria-labelledby="inventory-heading">
        <div className={styles.sectionHeading}>
          <Subtitle2 as="h3" id="inventory-heading">{strings.InventorySectionTitle}</Subtitle2>
          <Caption1>{strings.InventorySectionDescription}</Caption1>
        </div>

        <MigrationToolbar
          canLoadPages={!!source.selectedSite}
          isBusy={run.isBusy}
          isRunning={isRunning}
          hasPages={inventory.pages.length > 0}
          hasReport={run.reportEntries.length > 0}
          selectionCount={inventory.selectedPageIds.size}
          visiblePageCount={inventory.visiblePages.length}
          visibleColumns={inventory.visibleColumns}
          onLoadPages={() => void viewModel.loadPages()}
          onRefresh={() => void viewModel.refreshPages()}
          onValidate={() => void run.validateSelected()}
          onDryRun={() => void run.planSelected()}
          onMigrate={() => setIsConfirmOpen(true)}
          onCancel={run.cancelRun}
          onExport={run.exportReport}
          onSelectAll={inventory.selectAllVisible}
          onClearSelection={inventory.clearSelection}
          onToggleColumn={inventory.toggleColumnVisibility}
          onOpenSettings={() => setIsSettingsOpen(true)}
          failedCount={run.failedCount}
          onSelectFailed={run.selectFailed}
          outstandingCount={run.needingMigrationCount}
          showSelectOutstanding={
            inventory.previouslyMigratedCount > 0 && run.needingMigrationCount < inventory.pages.length
          }
          onSelectOutstanding={run.selectNeedingMigration}
        />

        <RunStatus
          progress={run.progress}
          notifications={viewModel.notifications}
          isRunning={isRunning}
          onDismissNotification={viewModel.dismissNotification}
        />

        {inventory.previouslyMigratedCount > 0 ? (
          <MessageBar intent="info">
            <MessageBarBody>
              {formatString(strings.PreviouslyMigratedNotice, inventory.previouslyMigratedCount)}
            </MessageBarBody>
          </MessageBar>
        ) : null}

        {inventory.isIncomplete ? (
          <MessageBar intent="warning">
            <MessageBarBody>{strings.IncompleteInventoryWarning}</MessageBarBody>
          </MessageBar>
        ) : null}

        {inventory.checkedOutCount > 0 ? (
          <MessageBar intent="warning">
            <MessageBarBody>
              {formatString(strings.CheckedOutPagesNotice, inventory.checkedOutCount)}
            </MessageBarBody>
          </MessageBar>
        ) : null}

        {inventory.pages.length > 0 ? (
          <div className={styles.filterRow}>
            <Field label={strings.SearchPagesLabel} className={styles.searchField}>
              <SearchBox
                placeholder={strings.SearchPagesPlaceholder}
                value={inventory.filterText}
                onChange={(_, data) => inventory.setFilterText(data.value)}
              />
            </Field>
            <Field label={strings.GroupByLabel}>
              <Dropdown
                inlinePopup
                value={groupByOptions.find((option) => option.key === inventory.groupBy)?.label ?? ''}
                selectedOptions={[inventory.groupBy]}
                onOptionSelect={(_, data) => inventory.setGroupBy(data.optionValue as GroupByKey)}
              >
                {groupByOptions.map((option) => (
                  <Option key={option.key} value={option.key}>{option.label}</Option>
                ))}
              </Dropdown>
            </Field>
          </div>
        ) : null}

        {inventory.isLoading ? (
          <GridSkeleton />
        ) : showSitesEmptyState ? (
          <EmptyState
            icon={<WebAssetRegular />}
            title={strings.EmptyNoSitesTitle}
            description={strings.EmptyNoSitesDescription}
          />
        ) : showNoPagesEmptyState ? (
          <EmptyState
            icon={<DocumentSearchRegular />}
            title={strings.EmptyNoPagesTitle}
            description={strings.EmptyNoPagesDescription}
            action={{ label: strings.CommandLoadPages, onClick: () => void viewModel.loadPages() }}
          />
        ) : showNoResultsEmptyState ? (
          <EmptyState
            icon={<FilterRegular />}
            title={strings.EmptyNoResultsTitle}
            description={strings.EmptyNoResultsDescription}
            action={{ label: strings.EmptyClearFilterAction, onClick: () => inventory.setFilterText('') }}
          />
        ) : (
          <PageInventoryGrid
            items={inventory.visiblePages}
            groups={inventory.groups}
            selectedPageIds={inventory.selectedPageIds}
            visibleColumns={inventory.visibleColumns}
            sortColumn={inventory.sortColumn}
            sortDescending={inventory.sortDescending}
            disabled={run.isBusy}
            onSelectionChange={inventory.setSelectedPageIds}
            onSort={inventory.setSorting}
            onOpenDetail={handleOpenDetail}
            onValidatePage={handleValidatePage}
          />
        )}

        <Caption1>{formatString(strings.PageCountLabel, inventory.visiblePages.length)}</Caption1>
      </section>

      <PageDetailDrawer
        page={detail.page}
        isOpen={!!detail.pageId}
        isLoading={detail.isLoading}
        onDismiss={detail.close}
        onCopyResult={handleCopyResult}
      />

      <SettingsDrawer
        isOpen={isSettingsOpen}
        publishOnComplete={run.publishOnComplete}
        conflictMode={run.conflictMode}
        disabled={isRunning}
        onPublishChange={run.setPublishOnComplete}
        onConflictModeChange={(value: ConflictMode) => run.setConflictMode(value)}
        onDismiss={() => setIsSettingsOpen(false)}
      />

      <MigrationConfirmDialog
        isOpen={isConfirmOpen}
        sourceSite={source.selectedSite}
        targetSite={target.selectedSite}
        selectedCount={inventory.selectedPageIds.size}
        commentCount={inventory.selectedCommentCount}
        conflictMode={run.conflictMode}
        publishOnComplete={run.publishOnComplete}
        onConfirm={handleConfirmMigrate}
        onDismiss={() => setIsConfirmOpen(false)}
      />
    </div>
  );
};

export const PageMigrationAdmin: React.FC<IPageMigrationAdminProps> = (props) => {
  const theme = React.useMemo(() => buildFluentTheme(props.themeVariant), [props.themeVariant]);

  const [portalMountNode, setPortalMountNode] = React.useState<HTMLElement | undefined>();

  const handleBoundaryError = React.useCallback(() => {
    props.services.pageMigrationOrchestrator.cancelActiveRun();
  }, [props.services.pageMigrationOrchestrator]);

  return (
    <FluentProvider theme={theme} role="region" aria-label={strings.RegionLabel}>
      <PortalMountProvider mountNode={portalMountNode}>
        <ErrorBoundary onError={handleBoundaryError}>
          <PageMigrationAdminContent {...props} />
        </ErrorBoundary>
        <div ref={(node) => setPortalMountNode(node ?? undefined)} />
      </PortalMountProvider>
    </FluentProvider>
  );
};
