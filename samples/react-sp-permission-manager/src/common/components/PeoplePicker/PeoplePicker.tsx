import * as React from 'react';
import {
  Avatar,
  Field,
  Spinner,
  Tag,
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOnOptionSelectData,
  TagPickerOption
} from '@fluentui/react-components';
import { GroupRegular, PersonRegular } from '@fluentui/react-icons';
import type { IPrincipalListItem } from '../../interfaces';
import type { IPeoplePickerProps, IPeoplePickerState } from './types';
import { PEOPLE_PICKER_STRINGS } from './constants';
import styles from './PeoplePicker.module.scss';

export const PeoplePicker: React.FC<IPeoplePickerProps> = ({
  spService,
  label = PEOPLE_PICKER_STRINGS.DEFAULT_LABEL,
  placeholder = PEOPLE_PICKER_STRINGS.DEFAULT_PLACEHOLDER,
  mode = 'multiple',
  allowGroups = false,
  allowUsers = true,
  allowSpGroupsOnly = false,
  disabled = false,
  required = false,
  selectedItems,
  defaultSelectedItems,
  onSelectionChange,
  noResultsText = PEOPLE_PICKER_STRINGS.DEFAULT_NO_RESULTS_TEXT,
  searchDebounceInMs = 300,
  maxSuggestions = 20
}) => {
  const isControlled = selectedItems !== undefined;
  const [state, setState] = React.useState<IPeoplePickerState>(() => ({
    internalSelectedItems: defaultSelectedItems ?? [],
    query: '',
    options: [],
    isLoading: false
  }));

  const activeSelectedItems = isControlled ? selectedItems : state.internalSelectedItems;

  const selectedMap = React.useMemo(() => {
    const map = new Map<string, IPrincipalListItem>();

    activeSelectedItems.forEach((item) => {
      map.set(item.key, item);
    });

    return map;
  }, [activeSelectedItems]);

  const updateSelection = React.useCallback(
    (items: IPrincipalListItem[]) => {
      if (!isControlled) {
        setState(prev => ({ ...prev, internalSelectedItems: items }));
      }

      onSelectionChange?.(items);
    },
    [isControlled, onSelectionChange]
  );

  React.useEffect(() => {
    let isCancelled = false;

    const loadPrincipals = async (): Promise<void> => {
      const normalizedQuery = state.query.trim();

      if (!normalizedQuery) {
        setState(prev => ({ ...prev, options: [] }));
        return;
      }

      setState(prev => ({ ...prev, isLoading: true }));

      try {
        const principals = await spService.searchPrincipals(normalizedQuery, {
          includeUsers: allowUsers,
          includeGroups: allowSpGroupsOnly ? true : allowGroups,
          includeSpGroupsOnly: allowSpGroupsOnly,
          top: maxSuggestions
        });

        if (isCancelled) {
          return;
        }

        const filtered = principals.filter((item) => !selectedMap.has(item.key));
        setState(prev => ({ ...prev, options: filtered }));
      } finally {
        if (!isCancelled) {
          setState(prev => ({ ...prev, isLoading: false }));
        }
      }
    };

    const timeoutId = globalThis.setTimeout(async () => {
      await loadPrincipals();
    }, searchDebounceInMs);

    return () => {
      isCancelled = true;
      globalThis.clearTimeout(timeoutId);
    };
  }, [
    allowGroups,
    allowSpGroupsOnly,
    allowUsers,
    maxSuggestions,
    state.query,
    searchDebounceInMs,
    selectedMap,
    spService
  ]);

  const selectedOptionValues = activeSelectedItems.map((item) => item.key);


  const handleOptionSelect = React.useCallback(
    (_event: Event | React.SyntheticEvent<Element, Event>, data: TagPickerOnOptionSelectData) => {
      let nextSelectedKeys: string[] = data.selectedOptions;

      if (mode === 'single') {
        nextSelectedKeys = data.selectedOptions.length > 0 ? [data.selectedOptions[0]] : [];
      }

      const nextSelectedItems = nextSelectedKeys
        .map((key) => selectedMap.get(key) ?? state.options.find((option) => option.key === key))
        .filter((item): item is IPrincipalListItem => Boolean(item));

      updateSelection(nextSelectedItems);
      setState(prev => ({ ...prev, query: '' }));
    },
    [mode, state.options, selectedMap, updateSelection]
  );

  return (
    <Field label={ label } required={required}>
      <TagPicker
        selectedOptions={selectedOptionValues}
        onOptionSelect={handleOptionSelect}
        noPopover={disabled}
      >
        <TagPickerControl expandIcon={null}>
          <TagPickerGroup aria-label={`${label} ${PEOPLE_PICKER_STRINGS.SELECTED_ITEMS_ARIA_LABEL_SUFFIX}`}>
            {activeSelectedItems.map((item) => (
              <Tag
                key={item.key}
                value={item.key}
                dismissible={!disabled}
                media={<Avatar name={item.displayName} color="colorful" />}
                icon={item.principalType === 'Group' ? <GroupRegular /> : <PersonRegular />}
              >
                {item.displayName}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            disabled={disabled}
            value={state.query}
            onChange={(event) => setState(prev => ({ ...prev, query: event.currentTarget.value }))}
            placeholder={mode === 'single' && activeSelectedItems.length > 0 ? '' : placeholder}
          />
        </TagPickerControl>

        <TagPickerList>
          {state.isLoading && (
            <div className={styles.loadingContainer}>
              <Spinner size="tiny" />
            </div>
          )}

          {!state.isLoading && state.options.length === 0 && state.query.trim() && (
            <div className={styles.optionMeta}>{noResultsText}</div>
          )}

          {!state.isLoading && state.options.map((option) => (
            <TagPickerOption key={option.key} value={option.key} text={option.displayName}>
              <div className={styles.optionContent}>
                <span className={styles.optionTitle}>{option.displayName}</span>
                <span className={styles.optionMeta}>{option.secondaryText}</span>
              </div>
            </TagPickerOption>
          ))}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
