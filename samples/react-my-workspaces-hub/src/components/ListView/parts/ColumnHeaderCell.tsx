import * as React from 'react';
import {
  Button,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Text
} from '@fluentui/react-components';
import {
  ArrowSortDownRegular,
  ArrowSortUpRegular,
  FilterRegular
} from '@fluentui/react-icons';
import type { IListViewColumn, ISortState } from '../interfaces/IListView';

/** Strings consumed by `ColumnHeaderCell`. */
export interface IColumnHeaderCellStrings {
  sortAscending: string;
  sortDescending: string;
  filter: string;
}

/** Props for a single column-header trigger (label + sort/filter menu). */
export interface IColumnHeaderCellProps<TItem> {
  column: IListViewColumn<TItem>;
  sort?: ISortState;
  hasAppliedFilter: boolean;
  onSort: (sort: ISortState) => void;
  onOpenFilter: (columnKey: string) => void;
  strings: IColumnHeaderCellStrings;
  buttonClassName?: string;
}

/** Header cell content with sort / filter menu trigger. */
export const ColumnHeaderCell = <TItem,>(props: IColumnHeaderCellProps<TItem>): React.ReactElement => {
  const { column, sort, hasAppliedFilter, onSort, onOpenFilter, strings, buttonClassName } = props;

  if (column.renderHeader) return <>{column.renderHeader(column)}</>;

  const hasMenu = column.isSortable || column.isFilterable;
  const isSortedColumn = sort?.columnKey === column.key;
  const sortIcon = isSortedColumn
    ? sort?.direction === 'asc' ? <ArrowSortUpRegular /> : <ArrowSortDownRegular />
    : undefined;
  const filterIcon = hasAppliedFilter ? <FilterRegular /> : undefined;

  if (!hasMenu) {
    return <Text weight="semibold">{column.headerIcon}{column.header}</Text>;
  }

  return (
    <Menu>
      <MenuTrigger disableButtonEnhancement>
        <Button appearance="subtle" className={buttonClassName}>
          {column.headerIcon}{column.header}{sortIcon}{filterIcon}
        </Button>
      </MenuTrigger>
      <MenuPopover>
        <MenuList>
          {column.isSortable && (
            <>
              <MenuItem icon={<ArrowSortUpRegular />} onClick={() => onSort({ columnKey: column.key, direction: 'asc' })}>
                {strings.sortAscending}
              </MenuItem>
              <MenuItem icon={<ArrowSortDownRegular />} onClick={() => onSort({ columnKey: column.key, direction: 'desc' })}>
                {strings.sortDescending}
              </MenuItem>
            </>
          )}
          {column.isFilterable && (
            <MenuItem icon={<FilterRegular />} onClick={() => onOpenFilter(column.key)}>
              {strings.filter}
            </MenuItem>
          )}
        </MenuList>
      </MenuPopover>
    </Menu>
  );
};
