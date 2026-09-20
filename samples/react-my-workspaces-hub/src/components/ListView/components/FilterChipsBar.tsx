import * as React from 'react';
import { Button, InteractionTag, InteractionTagPrimary, InteractionTagSecondary, TagGroup } from '@fluentui/react-components';
import { DEFAULT_LIST_VIEW_STRINGS } from '../constants';
import { joinClassNames } from '../utils/joinClassNames';
import { useFilterChipsBarStyles } from './FilterChipsBar.styles';
import { buildFilterChips } from './buildFilterChips';
import type { IFilterChipsBarProps } from './FilterChipsBar.types';

/** Active filter chips above the table — SharePoint-style clear-by-tag UX. */
export function FilterChipsBar<TItem>(props: Readonly<IFilterChipsBarProps<TItem>>): React.ReactElement | null {
  const styles = useFilterChipsBarStyles();
  const {
    columns,
    appliedFilters,
    onRemoveValueFilter,
    onClearAll,
    filteredByLabel = DEFAULT_LIST_VIEW_STRINGS.filteredByLabel,
    clearAllLabel = DEFAULT_LIST_VIEW_STRINGS.clearAllFiltersLabel,
    className
  } = props;

  const chips = React.useMemo(
    () => buildFilterChips(columns, appliedFilters, onRemoveValueFilter),
    [columns, appliedFilters, onRemoveValueFilter]
  );

  if (chips.length === 0) return null;

  return (
    <div className={joinClassNames(styles.root, className)} role="region" aria-label={filteredByLabel}>
      <span className={styles.label}>{filteredByLabel}</span>
      <TagGroup
        onDismiss={(_event, data) => {
          const chip = chips.find((c) => c.id === data.value);
          chip?.onRemove();
        }}
      >
        {chips.map((chip) => (
          <InteractionTag key={chip.id} value={chip.id} appearance="brand" size="small">
            <InteractionTagPrimary hasSecondaryAction>
              <strong>{chip.columnHeader}</strong>: {chip.valueLabel}
            </InteractionTagPrimary>
            <InteractionTagSecondary aria-label={`${clearAllLabel} ${chip.columnHeader}: ${chip.valueLabel}`} />
          </InteractionTag>
        ))}
      </TagGroup>
      <span className={styles.spacer} />
      <Button appearance="subtle" size="small" onClick={onClearAll}>
        {clearAllLabel}
      </Button>
    </div>
  );
}

export type { IFilterChip, IFilterChipsBarProps } from './FilterChipsBar.types';

