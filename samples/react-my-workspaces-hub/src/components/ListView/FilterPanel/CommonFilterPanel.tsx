import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Badge,
  Button,
  Checkbox,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  InlineDrawer,
  SearchBox,
  Text
} from '@fluentui/react-components';
import { Virtualizer } from '@fluentui/react-virtualizer';
import { DismissRegular } from '@fluentui/react-icons';
import type { IListViewColumn } from '../interfaces/IListView';
import { joinClassNames } from '../utils/joinClassNames';
import { useCommonFilterPanelStyles } from './CommonFilterPanel.styles';

/** Localised strings consumed by {@link CommonFilterPanel}. */
export interface ICommonFilterPanelStrings {
  title: string;
  closeAriaLabel: string;
  apply: string;
  clearAll: string;
  noColumns: string;
  activeSuffix: string;
  searchValuesPlaceholder: string;
  noValuesFound: string;
  selectAll: string;
}

/** A single filterable column descriptor surfaced inside the common drawer. */
export interface ICommonFilterColumnDescriptor<TItem> {
  column: IListViewColumn<TItem>;
  /** Sorted unique display values for choice filters. */
  values: string[];
}

/** Props for {@link CommonFilterPanel}. */
export interface ICommonFilterPanelProps<TItem> {
  open: boolean;
  /** Filterable columns + their value caches. */
  descriptors: ICommonFilterColumnDescriptor<TItem>[];
  /** Draft per-column value selections (mutated locally; applied on Apply). */
  draftValueFilters: Record<string, Set<string>>;
  /** Currently applied per-column value selections — used to surface badges. */
  appliedValueFilters: Record<string, Set<string>>;
  onChangeDraftValues: (columnKey: string, next: Set<string>) => void;
  onApply: () => void;
  onClearAll: () => void;
  onClose: () => void;
  strings: ICommonFilterPanelStrings;
  className?: string;
}

/**
 * In-area drawer that surfaces every filterable column in a single panel.
 * Renders inline (sibling to the table viewport) so it sits "within" the
 * ListView frame instead of overlaying the page.
 */
export const CommonFilterPanel = <TItem,>(props: ICommonFilterPanelProps<TItem>): React.ReactElement => {
  const {
    open,
    descriptors,
    draftValueFilters,
    appliedValueFilters,
    onChangeDraftValues,
    onApply,
    onClearAll,
    onClose,
    strings,
    className
  } = props;

  const styles = useCommonFilterPanelStyles();
  const [searchByColumn, setSearchByColumn] = React.useState<Record<string, string>>({});

  // Reset local search state every time the drawer is re-opened.
  React.useEffect(() => {
    if (!open) setSearchByColumn({});
  }, [open]);

  const totalApplied = React.useMemo(() => {
    let count = 0;
    for (const set of Object.values(appliedValueFilters)) if (set.size > 0) count += 1;
    return count;
  }, [appliedValueFilters]);

  const hasAnyDraft = React.useMemo(() => {
    for (const set of Object.values(draftValueFilters)) if (set.size > 0) return true;
    return false;
  }, [draftValueFilters]);

  return (
    <InlineDrawer
      separator
      position="end"
      open={open}
      className={joinClassNames(styles.drawer, className)}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<DismissRegular />}
              aria-label={strings.closeAriaLabel}
              onClick={onClose}
            />
          }
        >
          {strings.title}
          {totalApplied > 0 && (
            <Badge appearance="filled" color="brand" size="small" className={styles.titleBadge}>
              {totalApplied}
            </Badge>
          )}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.body}>
        {descriptors.length === 0 ? (
          <div className={styles.emptyState}>{strings.noColumns}</div>
        ) : (
          <Accordion multiple collapsible defaultOpenItems={descriptors.slice(0, 3).map((d) => d.column.key)}>
            {descriptors.map((descriptor) => {
              const { column, values } = descriptor;
              const draftSet = draftValueFilters[column.key] ?? new Set<string>();
              const appliedSet = appliedValueFilters[column.key];
              const isActive = appliedSet && appliedSet.size > 0;
              const search = searchByColumn[column.key] ?? '';

              return (
                <AccordionItem key={column.key} value={column.key}>
                  <AccordionHeader expandIconPosition="end">
                    <span className={styles.headerLabel}>
                      <span className={styles.headerText}>{column.header}</span>
                      {isActive && (
                        <Badge appearance="tint" color="brand" size="small">
                          {appliedSet?.size ?? 1}
                        </Badge>
                      )}
                    </span>
                  </AccordionHeader>
                  <AccordionPanel className={styles.panel}>
                    {values.length > 0 && (
                      <ChoiceFilterSection
                        values={values}
                        searchValue={search}
                        onSearchChange={(v) => setSearchByColumn((prev) => ({ ...prev, [column.key]: v }))}
                        selected={draftSet}
                        onChange={(next) => onChangeDraftValues(column.key, next)}
                        strings={{
                          searchPlaceholder: strings.searchValuesPlaceholder,
                          noValues: strings.noValuesFound,
                          selectAll: strings.selectAll
                        }}
                        styles={styles}
                      />
                    )}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        )}
      </DrawerBody>

      <DrawerFooter className={styles.footer}>
        <Text className={styles.footerSummary}>
          {totalApplied > 0 ? `${totalApplied} ${strings.activeSuffix}` : ''}
        </Text>
        <Button appearance="subtle" onClick={onClearAll} disabled={!hasAnyDraft && totalApplied === 0}>
          {strings.clearAll}
        </Button>
        <Button appearance="primary" onClick={onApply}>{strings.apply}</Button>
      </DrawerFooter>
    </InlineDrawer>
  );
};

// ---------------------------------------------------------------------------
// Choice section
// ---------------------------------------------------------------------------

interface IChoiceFilterSectionProps {
  values: string[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  selected: Set<string>;
  onChange: (next: Set<string>) => void;
  strings: { searchPlaceholder: string; noValues: string; selectAll: string };
  styles: ReturnType<typeof useCommonFilterPanelStyles>;
}

/**
 * When the (post-search) value count exceeds this threshold the section
 * switches to a fixed-height virtualized scroller. Below this we render every
 * row so accessibility tooling and small lists feel snappy and predictable.
 */
const VIRTUALIZE_THRESHOLD = 30;
/** Pixel height of a single value row inside the virtualized scroller. */
const VALUE_ROW_HEIGHT = 32;
/** Fixed pixel height of the virtualized value list scroller. */
const VIRTUALIZED_LIST_HEIGHT = 260;

const ChoiceFilterSection: React.FC<IChoiceFilterSectionProps> = ({
  values,
  searchValue,
  onSearchChange,
  selected,
  onChange,
  strings,
  styles
}) => {
  const filtered = React.useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return values;
    return values.filter((v) => v.toLowerCase().includes(q));
  }, [values, searchValue]);

  const allSelected = filtered.length > 0 && filtered.every((v) => selected.has(v));
  const someSelected = !allSelected && filtered.some((v) => selected.has(v));

  const handleSelectAll = React.useCallback(() => {
    const next = new Set(selected);
    if (allSelected) filtered.forEach((v) => next.delete(v));
    else filtered.forEach((v) => next.add(v));
    onChange(next);
  }, [allSelected, filtered, onChange, selected]);

  const handleToggle = React.useCallback((value: string) => {
    const next = new Set(selected);
    if (next.has(value)) next.delete(value); else next.add(value);
    onChange(next);
  }, [onChange, selected]);

  const renderRow = React.useCallback((value: string) => (
    <div className={styles.valueRow} style={{ height: VALUE_ROW_HEIGHT }}>
      <Checkbox
        className={styles.valueCheckbox}
        checked={selected.has(value)}
        label={<span className={styles.valueLabel}>{value}</span>}
        onChange={() => handleToggle(value)}
      />
    </div>
  ), [handleToggle, selected, styles.valueCheckbox, styles.valueLabel, styles.valueRow]);

  const useVirtualization = filtered.length > VIRTUALIZE_THRESHOLD;
  // The virtualized scroller has a fixed pixel height — feed it to the
  // Virtualizer via a ref so it can compute the visible window correctly.
  const containerSizeRef = React.useRef<number>(VIRTUALIZED_LIST_HEIGHT);

  return (
    <div className={styles.section}>
      <SearchBox
        size="small"
        placeholder={strings.searchPlaceholder}
        value={searchValue}
        onChange={(_e, data) => onSearchChange(data.value ?? '')}
      />
      {filtered.length > 0 && (
        <Checkbox
          checked={allSelected ? true : someSelected ? 'mixed' : false}
          label={strings.selectAll}
          onChange={handleSelectAll}
        />
      )}
      {filtered.length === 0 ? (
        <div className={styles.emptyValues}>{strings.noValues}</div>
      ) : useVirtualization ? (
        <div
          className={styles.valueListVirtualized}
          role="listbox"
          aria-multiselectable="true"
          aria-label={strings.searchPlaceholder}
        >
          <Virtualizer
            numItems={filtered.length}
            virtualizerLength={Math.min(filtered.length, 24)}
            bufferItems={4}
            bufferSize={64}
            itemSize={VALUE_ROW_HEIGHT}
            containerSizeRef={containerSizeRef}
          >
            {(index: number) => (
              <React.Fragment key={filtered[index]}>
                {renderRow(filtered[index])}
              </React.Fragment>
            )}
          </Virtualizer>
        </div>
      ) : (
        <div className={styles.valueList}>
          {filtered.map((value) => (
            <React.Fragment key={value}>{renderRow(value)}</React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
