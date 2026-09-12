import * as React from 'react';
import {
  Badge,
  Button,
  Checkbox,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  SearchBox,
  Text
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { VariableSizeList } from 'react-window';
import { joinClassNames } from '../utils/joinClassNames';
import type { IListViewFilterPanelProps } from './types';
import {
  FILTER_ROW_EST_CHARS_PER_LINE,
  FILTER_ROW_LINE_HEIGHT,
  FILTER_ROW_MAX_LINES,
  FILTER_ROW_MIN_HEIGHT,
  FILTER_ROW_VERTICAL_PADDING
} from './constants';
import { useListViewFilterPanelStyles } from './ListViewFilterPanel.styles';
import { areSetsEqual } from './utils';
import { FilterValueRow, type IFilterValueRowData } from './FilterValueRow';

export const ListViewFilterPanel: React.FC<Readonly<IListViewFilterPanelProps>> = ({
  open,
  title,
  values,
  appliedValues,
  selectedValues,
  searchValue,
  onSearchChange,
  onToggleValue,
  onReplaceValues,
  onApply,
  onClear,
  onClose,
  strings,
  classNames
}) => {
  const styles = useListViewFilterPanelStyles();
  const listRef = React.useRef<VariableSizeList | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = React.useState<number>(320);

  const hasFilterChanges = React.useMemo(
    () => !areSetsEqual(selectedValues, appliedValues),
    [appliedValues, selectedValues]
  );

  React.useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const update = (): void => setListHeight(Math.max(node.clientHeight, FILTER_ROW_MIN_HEIGHT));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);
    return () => observer.disconnect();
  }, [open]);

  React.useEffect(() => {
    listRef.current?.resetAfterIndex(0, true);
  }, [values]);

  const getItemSize = React.useCallback((index: number): number => {
    const v = values[index] ?? '';
    const lines = Math.min(Math.max(Math.ceil(v.length / FILTER_ROW_EST_CHARS_PER_LINE), 1), FILTER_ROW_MAX_LINES);
    return Math.max(FILTER_ROW_MIN_HEIGHT, lines * FILTER_ROW_LINE_HEIGHT + FILTER_ROW_VERTICAL_PADDING);
  }, [values]);

  const visibleSelectedCount = React.useMemo(
    () => values.reduce((acc, v) => acc + (selectedValues.has(v) ? 1 : 0), 0),
    [selectedValues, values]
  );
  const allVisibleSelected = values.length > 0 && visibleSelectedCount === values.length;
  const someVisibleSelected = visibleSelectedCount > 0 && !allVisibleSelected;

  const handleSelectAllVisible = React.useCallback(() => {
    const next = new Set(selectedValues);
    if (allVisibleSelected) {
      values.forEach((v) => next.delete(v));
    } else {
      values.forEach((v) => next.add(v));
    }
    onReplaceValues(next);
  }, [allVisibleSelected, onReplaceValues, selectedValues, values]);

  const rowData = React.useMemo<IFilterValueRowData>(
    () => ({ values, selectedValues, onToggleValue }),
    [onToggleValue, selectedValues, values]
  );

  return (
    <OverlayDrawer
      position="end"
      size="small"
      open={open}
      onOpenChange={(_event, data) => { if (!data.open) onClose(); }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<DismissRegular />}
              aria-label={strings.closeFilterPanelAriaLabel}
              onClick={onClose}
            />
          }
        >
          {title}
          {appliedValues.size > 0 && (
            <Badge appearance="filled" color="brand" size="small" style={{ marginLeft: 8 }}>
              {appliedValues.size}
            </Badge>
          )}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={joinClassNames(styles.drawerBody, classNames?.drawerBody)}>
        <div className={joinClassNames(styles.body, classNames?.body)}>
          <div className={joinClassNames(styles.searchContainer, classNames?.searchContainer)}>
            <SearchBox
              className={styles.searchBox}
              placeholder={strings.searchValuesPlaceholder}
              value={searchValue}
              onChange={(_event, data) => onSearchChange(data.value ?? '')}
            />
          </div>

          {values.length > 0 && (
            <div className={joinClassNames(styles.bulkRow, classNames?.bulkRow)}>
              <Checkbox
                checked={allVisibleSelected ? true : someVisibleSelected ? 'mixed' : false}
                label={strings.selectAll}
                onChange={handleSelectAllVisible}
              />
              <span className={styles.bulkSpacer} />
              {selectedValues.size > 0 && (
                <Button appearance="subtle" size="small" onClick={() => onReplaceValues(new Set<string>())}>
                  {strings.clearAll}
                </Button>
              )}
            </div>
          )}

          <div ref={containerRef} className={joinClassNames(styles.valuesContainer, classNames?.valuesContainer)}>
            {values.length > 0 ? (
              <VariableSizeList
                ref={listRef}
                className={styles.list}
                height={listHeight}
                itemCount={values.length}
                itemSize={getItemSize}
                width="100%"
                overscanCount={8}
                itemData={rowData}
                style={{ overflowX: 'hidden', overflowY: 'auto' }}
              >
                {FilterValueRow}
              </VariableSizeList>
            ) : (
              <div className={joinClassNames(styles.emptyState, classNames?.emptyState)}>{strings.noValuesFound}</div>
            )}
          </div>

          <div className={styles.statusRow}>
            <Text className={styles.filterCount}>{selectedValues.size} {strings.selectedSuffix}</Text>
          </div>
        </div>
      </DrawerBody>

      <DrawerFooter className={joinClassNames(styles.footer, classNames?.footer)}>
        <Button appearance="subtle" onClick={onClear}>{strings.clear}</Button>
        <Button appearance="primary" onClick={onApply} disabled={!hasFilterChanges}>{strings.apply}</Button>
      </DrawerFooter>
    </OverlayDrawer>
  );
};
