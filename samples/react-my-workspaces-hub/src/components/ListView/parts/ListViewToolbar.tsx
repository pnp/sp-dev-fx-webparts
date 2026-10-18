import * as React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuItemCheckbox,
  MenuList,
  MenuPopover,
  MenuTrigger,
  SearchBox,
  Tooltip
} from '@fluentui/react-components';
import {
  ArrowDownloadRegular,
  ChevronDownRegular,
  FilterRegular,
  TextBulletListLtrRegular as Hamburger
} from '@fluentui/react-icons';
import type { IListViewColumn } from '../interfaces/IListView';
import { useListViewToolbarStyles } from './ListViewToolbar.styles';

/** Supported built-in export formats. */
export type TListViewExportFormat = 'csv' | 'excel';

/** Strings consumed by the toolbar. */
export interface IListViewToolbarStrings {
  columnChooserAriaLabel: string;
  searchPlaceholder: string;
  exportButtonLabel: string;
  exportCsvLabel: string;
  exportExcelLabel: string;
  exportMenuAriaLabel: string;
  commonFilterAriaLabel: string;
}

/** Props for the toolbar (column chooser + search + export). */
export interface IListViewToolbarProps<TItem> {
  columns: IListViewColumn<TItem>[];
  visibleColumnKeys: string[];
  onVisibleColumnKeysChange: (keys: string[]) => void;
  enableColumnChooser: boolean;
  enableGlobalSearch: boolean;
  searchValue: string;
  onSearchChange: (value: string) => void;
  /**
   * Available built-in export formats. When the array is empty, no export
   * button is rendered. When it contains a single format, a single button is
   * rendered. When it contains both, a dropdown menu lets the user pick.
   */
  exportFormats: TListViewExportFormat[];
  /** Invoked when the user clicks an export action. */
  onExportFormatClick: (format: TListViewExportFormat) => void;
  /** When `true`, renders a toggle button that opens the common filter drawer. */
  showCommonFilterToggle: boolean;
  /** Whether the common filter drawer is currently open. */
  isCommonFilterOpen: boolean;
  /** Number of currently active common filters — surfaced as a badge. */
  commonFilterAppliedCount: number;
  /** Toggles the common filter drawer. */
  onToggleCommonFilter: () => void;
  strings: IListViewToolbarStrings;
  className?: string;
}

/** Toolbar that combines column chooser, global search, and export. */
export const ListViewToolbar = <TItem,>(props: IListViewToolbarProps<TItem>): React.ReactElement | null => {
  const {
    columns,
    visibleColumnKeys,
    onVisibleColumnKeysChange,
    enableColumnChooser,
    enableGlobalSearch,
    searchValue,
    onSearchChange,
    exportFormats,
    onExportFormatClick,
    showCommonFilterToggle,
    isCommonFilterOpen,
    commonFilterAppliedCount,
    onToggleCommonFilter,
    strings,
    className
  } = props;

  const styles = useListViewToolbarStyles();
  const showExportButton = exportFormats.length > 0;
  const showExportMenu = exportFormats.length > 1;

  if (
    !enableColumnChooser
    && !enableGlobalSearch
    && !showExportButton
    && !showCommonFilterToggle
  ) {
    return null;
  }

  return (
    <div className={className ?? styles.container}>
      <div className={styles.topBar}>
        {enableColumnChooser && (
          <Menu
            checkedValues={{ 'column-chooser': [...visibleColumnKeys] }}
            onCheckedValueChange={(_event, data) => {
              if (data.name !== 'column-chooser' || data.checkedItems.length === 0) return;
              const nextChecked = new Set(data.checkedItems);
              const retained = visibleColumnKeys.filter((k) => nextChecked.has(k));
              const retainedSet = new Set(retained);
              const added = data.checkedItems.filter((k) => !retainedSet.has(k));
              onVisibleColumnKeysChange([...retained, ...added]);
            }}
          >
            <MenuTrigger disableButtonEnhancement>
              <Tooltip content={strings.columnChooserAriaLabel} relationship="label">
                <Button appearance="subtle" icon={<Hamburger />} aria-label={strings.columnChooserAriaLabel} />
              </Tooltip>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {columns.map((column) => (
                  <MenuItemCheckbox key={column.key} name="column-chooser" value={column.key}>
                    {column.header}
                  </MenuItemCheckbox>
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>
        )}

        {enableGlobalSearch && (
          <SearchBox
            className={styles.searchBox}
            placeholder={strings.searchPlaceholder}
            value={searchValue}
            onChange={(_event, data) => onSearchChange(data.value ?? '')}
          />
        )}

        <span className={styles.spacer} />

        {showCommonFilterToggle && (
          <Tooltip content={strings.commonFilterAriaLabel} relationship="label">
            <Button
              appearance={isCommonFilterOpen ? 'primary' : 'subtle'}
              icon={<FilterRegular />}
              aria-label={strings.commonFilterAriaLabel}
              aria-pressed={isCommonFilterOpen}
              onClick={onToggleCommonFilter}
            >
              {commonFilterAppliedCount > 0 ? String(commonFilterAppliedCount) : ''}
            </Button>
          </Tooltip>
        )}

        {showExportButton && !showExportMenu && (
          <Tooltip
            content={
              exportFormats[0] === 'excel' ? strings.exportExcelLabel : strings.exportCsvLabel
            }
            relationship="label"
          >
            <Button
              appearance="subtle"
              icon={<ArrowDownloadRegular />}
              onClick={() => onExportFormatClick(exportFormats[0])}
              aria-label={
                exportFormats[0] === 'excel'
                  ? strings.exportExcelLabel
                  : strings.exportCsvLabel
              }
            />
          </Tooltip>
        )}

        {showExportMenu && (
          <Menu>
            <MenuTrigger disableButtonEnhancement>
              <Tooltip content={strings.exportMenuAriaLabel} relationship="label">
                <Button
                  appearance="subtle"
                  icon={<ArrowDownloadRegular />}
                  iconPosition="before"
                  aria-label={strings.exportMenuAriaLabel}
                  aria-haspopup="menu"
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {strings.exportButtonLabel}
                    <ChevronDownRegular />
                  </span>
                </Button>
              </Tooltip>
            </MenuTrigger>
            <MenuPopover>
              <MenuList>
                {exportFormats.includes('csv') && (
                  <MenuItem onClick={() => onExportFormatClick('csv')}>
                    {strings.exportCsvLabel}
                  </MenuItem>
                )}
                {exportFormats.includes('excel') && (
                  <MenuItem onClick={() => onExportFormatClick('excel')}>
                    {strings.exportExcelLabel}
                  </MenuItem>
                )}
              </MenuList>
            </MenuPopover>
          </Menu>
        )}
      </div>
    </div>
  );
};
