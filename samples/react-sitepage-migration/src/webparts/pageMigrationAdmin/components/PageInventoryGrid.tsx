import * as React from 'react';
import {
  Badge,
  Body1Stronger,
  Button,
  Caption1,
  DataGrid,
  DataGridBody,
  DataGridCell,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridRow,
  Link,
  Menu,
  MenuItem,
  MenuItemLink,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Subtitle2,
  TableCellLayout,
  TableColumnDefinition,
  TableColumnSizingOptions,
  TableRowId,
  Tooltip,
  createTableColumn
} from '@fluentui/react-components';
import {
  MoreHorizontalRegular,
  OpenRegular,
  WarningRegular
} from '@fluentui/react-icons';
import { PageInventoryItem, PageMigrationStatus } from '../../../models/PageInventoryItem';
import { ColumnKey, PageGroup } from '../../../hooks/usePageSelection';
import { formatString } from '../../../utilities/formatString';
import { stripAspxExtension } from '../../../utilities/UrlUtilities';
import { formatDateTime, statusLabel } from './localization';
import { useAppStyles } from './useAppStyles';
import * as strings from 'PageMigrationAdminWebPartStrings';

export interface PageInventoryGridProps {
  readonly items: ReadonlyArray<PageInventoryItem>;
  readonly groups: ReadonlyArray<PageGroup> | undefined;
  readonly selectedPageIds: ReadonlySet<string>;
  readonly visibleColumns: ReadonlySet<ColumnKey>;
  readonly sortColumn: keyof PageInventoryItem;
  readonly sortDescending: boolean;
  readonly disabled: boolean;
  readonly onSelectionChange: (pageIds: ReadonlyArray<string>) => void;
  readonly onSort: (column: keyof PageInventoryItem) => void;
  readonly onOpenDetail: (page: PageInventoryItem) => void;
  readonly onValidatePage: (page: PageInventoryItem) => void;
}

type StatusAppearance = {
  readonly color: 'success' | 'warning' | 'danger' | 'brand' | 'informative' | 'subtle';
  readonly appearance: 'filled' | 'tint' | 'outline';
};

const statusAppearance = (status: PageMigrationStatus): StatusAppearance => {
  switch (status) {
    case 'Completed': return { color: 'success', appearance: 'filled' };
    case 'Ready': return { color: 'success', appearance: 'tint' };
    case 'Warning': return { color: 'warning', appearance: 'tint' };
    case 'Failed': return { color: 'danger', appearance: 'tint' };
    case 'Migrating':
    case 'Validating': return { color: 'brand', appearance: 'tint' };
    case 'Queued': return { color: 'informative', appearance: 'tint' };
    default: return { color: 'subtle', appearance: 'outline' };
  }
};

const humanizeToken = (value: string): string =>
  value ? value.charAt(0).toUpperCase() + value.slice(1) : '';

const sortableColumns: ReadonlySet<string> = new Set<string>([
  'title',
  'name',
  'authorName',
  'createdDateTime',
  'lastModifiedDateTime',
  'layout',
  'promotionState',
  'migrationStatus',
  'warningCount',
  'lastMigratedAt'
]);

const columnSizing: TableColumnSizingOptions = {
  title: { minWidth: 200, defaultWidth: 280, idealWidth: 280 },
  name: { minWidth: 140, defaultWidth: 180 },
  authorName: { minWidth: 130, defaultWidth: 160 },
  createdDateTime: { minWidth: 140, defaultWidth: 170 },
  lastModifiedDateTime: { minWidth: 140, defaultWidth: 170 },
  layout: { minWidth: 90, defaultWidth: 110 },
  promotionState: { minWidth: 100, defaultWidth: 120 },
  migrationStatus: { minWidth: 120, defaultWidth: 140 },
  warningCount: { minWidth: 110, defaultWidth: 130 },
  lastMigratedAt: { minWidth: 140, defaultWidth: 170 },
  actions: { minWidth: 96, defaultWidth: 96, idealWidth: 96 }
};

export const PageInventoryGrid: React.FC<PageInventoryGridProps> = React.memo((props) => {
  const styles = useAppStyles();
  const {
    items, groups, selectedPageIds, visibleColumns, disabled,
    onSelectionChange, onOpenDetail, onValidatePage
  } = props;

  const handleSectionSelectionChange = React.useCallback(
    (sectionItems: ReadonlyArray<PageInventoryItem>, sectionSelection: Set<TableRowId>) => {
      const sectionIds = new Set(sectionItems.map((item) => item.id));
      const merged = new Set([...selectedPageIds].filter((id) => !sectionIds.has(id)));
      sectionSelection.forEach((rowId) => merged.add(String(rowId)));
      onSelectionChange([...merged]);
    },
    [selectedPageIds, onSelectionChange]
  );

  const columns = React.useMemo((): TableColumnDefinition<PageInventoryItem>[] => {
    const definitions: TableColumnDefinition<PageInventoryItem>[] = [];

    const push = (
      columnId: string,
      renderHeaderCell: () => React.ReactNode,
      renderCell: (item: PageInventoryItem) => React.ReactNode
    ): void => {
      definitions.push(createTableColumn<PageInventoryItem>({
        columnId,
        renderHeaderCell,
        renderCell,
        compare: () => 0
      }));
    };

    push('title', () => strings.ColumnTitle, (item) => (
      <TableCellLayout truncate>
        <div className={styles.primaryCell}>
          <Link
            appearance="subtle"
            onClick={() => onOpenDetail(item)}
            aria-label={`${strings.ActionOpenDetails}: ${item.title}`}
          >
            <Body1Stronger>{item.title}</Body1Stronger>
          </Link>
          {stripAspxExtension(item.name).toLowerCase() !== stripAspxExtension(item.title).toLowerCase() ? (
            <Caption1 className={styles.truncate}>{stripAspxExtension(item.name)}</Caption1>
          ) : null}
        </div>
      </TableCellLayout>
    ));

    if (visibleColumns.has('name')) {
      push('name', () => strings.ColumnPageName, (item) => (
        <TableCellLayout truncate>{stripAspxExtension(item.name)}</TableCellLayout>
      ));
    }

    if (visibleColumns.has('authorName')) {
      push('authorName', () => strings.ColumnAuthor, (item) => (
        <TableCellLayout truncate>{item.authorName || strings.UnknownValue}</TableCellLayout>
      ));
    }

    if (visibleColumns.has('createdDateTime')) {
      push('createdDateTime', () => strings.ColumnCreated, (item) => (
        <TableCellLayout truncate>{formatDateTime(item.createdDateTime)}</TableCellLayout>
      ));
    }

    if (visibleColumns.has('lastModifiedDateTime')) {
      push('lastModifiedDateTime', () => strings.ColumnModified, (item) => (
        <TableCellLayout truncate>{formatDateTime(item.lastModifiedDateTime)}</TableCellLayout>
      ));
    }

    if (visibleColumns.has('layout')) {
      push('layout', () => strings.ColumnLayout, (item) => (
        <TableCellLayout truncate>{humanizeToken(item.layout)}</TableCellLayout>
      ));
    }

    if (visibleColumns.has('promotionState')) {
      push('promotionState', () => strings.ColumnPromotion, (item) => (
        <TableCellLayout truncate>{humanizeToken(item.promotionState)}</TableCellLayout>
      ));
    }

    if (visibleColumns.has('lastMigratedAt')) {
      push('lastMigratedAt', () => strings.ColumnLastMigrated, (item) => (
        item.lastMigratedAt ? (
          <TableCellLayout truncate>{formatDateTime(item.lastMigratedAt)}</TableCellLayout>
        ) : (
          <TableCellLayout truncate>
            <span className={styles.visuallyHidden}>{strings.NeverMigrated}</span>
          </TableCellLayout>
        )
      ));
    }

    push('migrationStatus', () => strings.ColumnStatus, (item) => {
      if (item.migrationStatus === 'NotStarted') {
        return (
          <TableCellLayout truncate>
            <Caption1 className={styles.mutedText}>{statusLabel(item.migrationStatus)}</Caption1>
          </TableCellLayout>
        );
      }

      const { color, appearance } = statusAppearance(item.migrationStatus);
      return (
        <TableCellLayout truncate>
          <Badge color={color} appearance={appearance}>{statusLabel(item.migrationStatus)}</Badge>
        </TableCellLayout>
      );
    });

    if (visibleColumns.has('warningCount')) {
      push('warningCount', () => strings.ColumnWarnings, (item) => (
        item.warningCount > 0 ? (
          <TableCellLayout truncate media={<WarningRegular aria-hidden="true" />}>
            {formatString(strings.WarningsCount, item.warningCount)}
          </TableCellLayout>
        ) : (
          <TableCellLayout truncate>
            <span className={styles.visuallyHidden}>{strings.NoWarnings}</span>
          </TableCellLayout>
        )
      ));
    }

    push('actions', () => strings.ColumnActions, (item) => (
      <div className={styles.rowActions}>
        <Tooltip content={strings.ActionOpenSource} relationship="label" withArrow>
          <Button
            appearance="subtle"
            size="small"
            icon={<OpenRegular />}
            as="a"
            href={item.webUrl}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${strings.ActionOpenSource}: ${item.title}`}
          />
        </Tooltip>
        <Menu inline>
          <MenuTrigger disableButtonEnhancement>
            <Button
              appearance="subtle"
              size="small"
              icon={<MoreHorizontalRegular />}
              aria-label={`${strings.ColumnActions}: ${item.title}`}
            />
          </MenuTrigger>
          <MenuPopover>
            <MenuList>
              <MenuItem onClick={() => onOpenDetail(item)}>{strings.ActionOpenDetails}</MenuItem>
              <MenuItem disabled={disabled} onClick={() => onValidatePage(item)}>
                {strings.ActionValidatePage}
              </MenuItem>
              {item.targetPageUrl ? (
                <MenuItemLink
                  href={item.targetPageUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {strings.ActionOpenTarget}
                </MenuItemLink>
              ) : null}
            </MenuList>
          </MenuPopover>
        </Menu>
      </div>
    ));

    return definitions;
  }, [visibleColumns, disabled, onOpenDetail, onValidatePage, styles]);

  const sortState = React.useMemo(() => ({
    sortColumn: props.sortColumn as string,
    sortDirection: (props.sortDescending ? 'descending' : 'ascending') as 'ascending' | 'descending'
  }), [props.sortColumn, props.sortDescending]);

  const renderSection = (
    sectionItems: ReadonlyArray<PageInventoryItem>,
    ariaLabel: string,
    key: string
  ): JSX.Element => (
    <DataGrid
      key={key}
      items={sectionItems as PageInventoryItem[]}
      columns={columns}
      getRowId={(item) => item.id}
      selectionMode="multiselect"
      selectedItems={sectionItems.filter((item) => selectedPageIds.has(item.id)).map((item) => item.id)}
      onSelectionChange={(_, data) => handleSectionSelectionChange(sectionItems, data.selectedItems)}
      sortable
      sortState={sortState}
      onSortChange={(_, next) => {
        if (sortableColumns.has(String(next.sortColumn))) {
          props.onSort(next.sortColumn as keyof PageInventoryItem);
        }
      }}
      resizableColumns
      columnSizingOptions={columnSizing}
      focusMode="composite"
      size="small"
      aria-label={ariaLabel}
      subtleSelection
    >
      <DataGridHeader>
        <DataGridRow selectionCell={{ 'aria-label': strings.SelectAllRowsLabel }}>
          {({ renderHeaderCell }) => <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>}
        </DataGridRow>
      </DataGridHeader>
      <DataGridBody<PageInventoryItem>>
        {({ item, rowId }) => (
          <DataGridRow<PageInventoryItem>
            key={rowId}
            selectionCell={{ 'aria-label': formatString(strings.SelectRowLabel, item.title) }}
          >
            {({ renderCell }) => <DataGridCell>{renderCell(item)}</DataGridCell>}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );

  if (groups && groups.length > 0) {
    return (
      <div className={styles.gridWrapper}>
        {groups.map((group) => {
          const sectionItems = items.slice(group.startIndex, group.startIndex + group.count);
          const label = formatString(strings.GroupRowLabel, group.key, group.count);
          const headingId = `group-heading-${encodeURIComponent(group.key)}`;
          return (
            <section key={group.key} aria-labelledby={headingId}>
              <div className={styles.groupHeader}>
                <Subtitle2 as="h4" id={headingId}>{group.key}</Subtitle2>
                <Caption1>{formatString(strings.PageCountLabel, group.count)}</Caption1>
              </div>
              {renderSection(sectionItems, label, `grid-${group.key}`)}
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <div className={styles.gridWrapper}>
      {renderSection(items, strings.GridLabel, 'grid-all')}
    </div>
  );
});

PageInventoryGrid.displayName = 'PageInventoryGrid';
