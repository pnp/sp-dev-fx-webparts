import * as React from 'react';
import {
  Button,
  Checkbox,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerHeaderTitle,
  OverlayDrawer,
  SearchBox,
  Text,
  makeStyles,
  tokens
} from '@fluentui/react-components';
import { DismissRegular } from '@fluentui/react-icons';
import { VariableSizeList, type ListChildComponentProps } from 'react-window';
import type { IListViewFilterPanelProps } from './types';
import { FILTER_ROW_MIN_HEIGHT, FILTER_ROW_LINE_HEIGHT, FILTER_ROW_VERTICAL_PADDING, FILTER_ROW_MAX_LINES, FILTER_ROW_EST_CHARS_PER_LINE, LIST_VIEW_FILTER_PANEL_STRINGS } from './constants';

const useStyles = makeStyles({
  drawerBody: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: '8px',
    paddingBottom: 0
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: 0
  },
  searchContainer: {
    paddingLeft: '16px',
    paddingRight: '16px',
    marginBottom: '6px'
  },
  searchBox: {
    width: '100%'
  },
  valuesContainer: {
    flex: 1,
    minHeight: 0,
    marginTop: '2px',
    paddingLeft: '16px',
    paddingRight: '16px'
  },
  list: {
    overflowX: 'hidden'
  },
  valueRow: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingRight: '4px',
    boxSizing: 'border-box',
    overflow: 'hidden'
  },
  valueCheckbox: {
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden'
  },
  valueLabel: {
    display: 'block',
    whiteSpace: 'normal',
    overflowWrap: 'anywhere',
    wordBreak: 'break-word',
    lineHeight: '20px',
    maxHeight: '56px',
    overflow: 'hidden'
  },
  statusRow: {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '6px',
    paddingBottom: '6px'
  },
  filterCount: {
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200
  },
  footer: {
    justifyContent: 'flex-end',
    columnGap: '8px',
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '16px',
    paddingRight: '16px'
  }
});

const areSetsEqual = (setA: Set<string>, setB: Set<string>): boolean => {
  if (setA.size !== setB.size) {
    return false;
  }

  for (const value of setA) {
    if (!setB.has(value)) {
      return false;
    }
  }

  return true;
};

export const ListViewFilterPanel: React.FC<Readonly<IListViewFilterPanelProps>> = ({
  open,
  title,
  values,
  appliedValues,
  selectedValues,
  searchValue,
  onSearchChange,
  onToggleValue,
  onApply,
  onClear,
  onClose
}) => {
  const styles = useStyles();
  const listRef = React.useRef<VariableSizeList | null>(null);
  const valuesContainerRef = React.useRef<HTMLDivElement>(null);
  const [listHeight, setListHeight] = React.useState<number>(320);

  const hasFilterChanges = React.useMemo(
    () => !areSetsEqual(selectedValues, appliedValues),
    [appliedValues, selectedValues]
  );

  React.useEffect(() => {
    const container = valuesContainerRef.current;

    if (!container) {
      return;
    }

    const updateHeight = (): void => {
      setListHeight(Math.max(container.clientHeight, FILTER_ROW_MIN_HEIGHT));
    };

    updateHeight();

    const observer = new ResizeObserver(() => {
      updateHeight();
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, [open]);

  React.useEffect(() => {
    listRef.current?.resetAfterIndex(0, true);
  }, [values]);

  const getItemSize = React.useCallback((index: number): number => {
    const value = values[index] ?? '';
    const estimatedLineCount = Math.ceil(value.length / FILTER_ROW_EST_CHARS_PER_LINE);
    const lineCount = Math.min(Math.max(estimatedLineCount, 1), FILTER_ROW_MAX_LINES);
    return Math.max(FILTER_ROW_MIN_HEIGHT, (lineCount * FILTER_ROW_LINE_HEIGHT) + FILTER_ROW_VERTICAL_PADDING);
  }, [values]);

  const rowData = React.useMemo(
    () => ({
      values,
      selectedValues,
      onToggleValue
    }),
    [onToggleValue, selectedValues, values]
  );

  const renderRow = React.useCallback(({ index, style, data }: ListChildComponentProps<typeof rowData>) => {
    const value = data.values[index];

    return (
      <div style={style} className={styles.valueRow}>
        <Checkbox
          className={styles.valueCheckbox}
          label={<span className={styles.valueLabel}>{value}</span>}
          checked={data.selectedValues.has(value)}
          onChange={() => data.onToggleValue(value)}
        />
      </div>
    );
  }, [styles.valueCheckbox, styles.valueLabel, styles.valueRow]);

  return (
    <OverlayDrawer
      position="end"
      size="small"
      open={open}
      onOpenChange={(_event, data) => {
        if (!data.open) {
          onClose();
        }
      }}
    >
      <DrawerHeader>
        <DrawerHeaderTitle
          action={
            <Button
              appearance="subtle"
              icon={<DismissRegular />}
              aria-label={LIST_VIEW_FILTER_PANEL_STRINGS.CLOSE_FILTER_PANEL_ARIA_LABEL}
              onClick={onClose}
            />
          }
        >
          {title}
        </DrawerHeaderTitle>
      </DrawerHeader>

      <DrawerBody className={styles.drawerBody}>
        <div className={styles.body}>
          <div className={styles.searchContainer}>
            <SearchBox
              className={styles.searchBox}
              placeholder={LIST_VIEW_FILTER_PANEL_STRINGS.SEARCH_VALUES_PLACEHOLDER}
              value={searchValue}
              onChange={(_event, data) => onSearchChange(data.value ?? '')}
            />
          </div>

          <div ref={valuesContainerRef} className={styles.valuesContainer}>
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
                {renderRow}
              </VariableSizeList>
            ) : (
              <Text className={styles.filterCount}>{LIST_VIEW_FILTER_PANEL_STRINGS.NO_VALUES_FOUND}</Text>
            )}
          </div>

          <div className={styles.statusRow}>
            <Text className={styles.filterCount}>{selectedValues.size} {LIST_VIEW_FILTER_PANEL_STRINGS.SELECTED_SUFFIX}</Text>
          </div>
        </div>
      </DrawerBody>

      <DrawerFooter className={styles.footer}>
        <Button appearance="primary" onClick={onApply} disabled={!hasFilterChanges}>{LIST_VIEW_FILTER_PANEL_STRINGS.APPLY}</Button>
        <Button appearance="subtle" onClick={onClear}>{LIST_VIEW_FILTER_PANEL_STRINGS.CLEAR}</Button>
      </DrawerFooter>
    </OverlayDrawer>
  );
};
