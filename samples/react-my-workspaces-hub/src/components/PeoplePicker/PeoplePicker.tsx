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
  TagPickerOption,
  type TagPickerOnOptionSelectData
} from '@fluentui/react-components';
import { GroupRegular, PersonRegular } from '@fluentui/react-icons';
import { usePeopleSearch } from './hooks';
import type {
  IPeoplePickerHandle,
  IPeoplePickerItem,
  IPeoplePickerProps
} from './interfaces/PeoplePicker.types';
import { PEOPLE_PICKER_DEFAULTS, PEOPLE_PICKER_STRINGS } from './constants';
import { useStyles } from './styles/PeoplePicker.styles';
import { joinClassNames } from './utils/utils';


/**
 * SPFx-friendly People Picker built on Fluent UI 9's `TagPicker`.
 *
 * Capabilities (see `IPeoplePickerProps` for the full prop reference):
 *  - Searches users and/or groups via SharePoint and/or Microsoft Graph,
 *    with Graph as a fallback when SharePoint returns no results.
 *  - Restricts SharePoint queries to SP site groups, AAD M365 groups, or
 *    AAD security groups based on the supplied flags.
 *  - Optionally scopes user search to a particular SharePoint site group
 *    or AAD group.
 *  - Optional MGT-style local cache.
 *  - Optional `_api/web/ensureuser` resolution after selection.
 *  - Full Graph payload preserved on each item's `data` property.
 *  - Fully overrideable per-slot styling and pass-through `tagPickerProps`.
 *  - Imperative `getSuggestions(query)` exposed via `ref`.
 */
const PeoplePickerInner: React.ForwardRefRenderFunction<IPeoplePickerHandle, IPeoplePickerProps> = (
  props,
  ref
) => {
  const {
    context,
    spHttpClient,
    msGraphClientFactory,
    spService,
    mode = 'multiple',
    selectedItems,
    defaultSelectedItems,
    onSelectionChange,
    maxSuggestions = PEOPLE_PICKER_DEFAULTS.MAX_SUGGESTIONS,
    maxSelections,
    searchDebounceInMs = PEOPLE_PICKER_DEFAULTS.SEARCH_DEBOUNCE_MS,
    searchScope = PEOPLE_PICKER_DEFAULTS.SEARCH_SCOPE,
    sourceStrategy = PEOPLE_PICKER_DEFAULTS.SOURCE_STRATEGY,
    restrictToSharePointSiteGroups,
    searchInSharePointGroupId,
    searchInAadGroupObjectId,
    includeM365Groups = PEOPLE_PICKER_DEFAULTS.INCLUDE_M365_GROUPS,
    includeSecurityGroups = PEOPLE_PICKER_DEFAULTS.INCLUDE_SECURITY_GROUPS,
    ensureUser = false,
    ensureUserFor = ['User'],
    cache,
    label = PEOPLE_PICKER_STRINGS.DEFAULT_LABEL,
    validationMessage,
    validationState,
    hint,
    fieldProps,
    placeholder = PEOPLE_PICKER_STRINGS.DEFAULT_PLACEHOLDER,
    noResultsText = PEOPLE_PICKER_STRINGS.DEFAULT_NO_RESULTS_TEXT,
    required = false,
    disabled = false,
    className,
    classNames,
    styles: stylesOverride,
    tagPickerProps,
    onResults,
    onSearchTextChange
  } = props;

  const styles = useStyles();
  const isSelectionControlled = selectedItems !== undefined;
  const [internalSelected, setInternalSelected] = React.useState<IPeoplePickerItem[]>(
    defaultSelectedItems ?? []
  );

  const activeSelection = isSelectionControlled
    ? (selectedItems as IPeoplePickerItem[])
    : internalSelected;

  const search = usePeopleSearch({
    context,
    spHttpClient,
    msGraphClientFactory,
    spService,
    searchScope,
    sourceStrategy,
    maxSuggestions,
    searchDebounceInMs,
    restrictToSharePointSiteGroups,
    searchInSharePointGroupId,
    searchInAadGroupObjectId,
    includeM365Groups,
    includeSecurityGroups,
    ensureUser,
    ensureUserFor,
    cache
  });

  const { query, setQuery, results, isLoading, error, isCacheHit, search: searchProgrammatically, ensureSelection, clearCache } = search;

  const selectionMap = React.useMemo(() => {
    const map = new Map<string, IPeoplePickerItem>();
    activeSelection.forEach((item) => map.set(item.key, item));
    return map;
  }, [activeSelection]);

  const visibleSuggestions = React.useMemo(
    () => results.filter((item) => !selectionMap.has(item.key)),
    [results, selectionMap]
  );

  // Fire onResults whenever the visible suggestion list changes.
  const lastNotifiedRef = React.useRef<string>('');
  React.useEffect(() => {
    if (!onResults) return;

    const signature = `${query}:${visibleSuggestions.map((item) => item.key).join(',')}`;
    if (signature === lastNotifiedRef.current) return;

    lastNotifiedRef.current = signature;
    onResults(visibleSuggestions, { query, isCacheHit });
  }, [visibleSuggestions, query, isCacheHit, onResults]);

  const selectionEpochRef = React.useRef(0);

  const updateSelection = React.useCallback(
    async (next: IPeoplePickerItem[]) => {
      const epoch = ++selectionEpochRef.current;
      const ensured = await ensureSelection(next);

      // Discard if a newer selection has been initiated since this call started.
      if (selectionEpochRef.current !== epoch) return;

      if (!isSelectionControlled) {
        setInternalSelected(ensured);
      }

      onSelectionChange?.(ensured);
    },
    [ensureSelection, isSelectionControlled, onSelectionChange]
  );

  const handleOptionSelect = React.useCallback(
    (_event: Event | React.SyntheticEvent<Element, Event>, data: TagPickerOnOptionSelectData) => {
      let nextKeys = data.selectedOptions;

      if (mode === 'single') {
        nextKeys = nextKeys.length > 0 ? [nextKeys[nextKeys.length - 1]] : [];
      }

      if (typeof maxSelections === 'number' && nextKeys.length > maxSelections) {
        nextKeys = nextKeys.slice(0, maxSelections);
      }

      const nextItems = nextKeys
        .map((key) => selectionMap.get(key) ?? results.find((option) => option.key === key))
        .filter((item): item is IPeoplePickerItem => Boolean(item));

      updateSelection(nextItems).catch(() => undefined);
      setQuery('');
    },
    [mode, maxSelections, results, selectionMap, setQuery, updateSelection]
  );

  const handleQueryChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.currentTarget.value;
      setQuery(value);
      onSearchTextChange?.(value);
    },
    [setQuery, onSearchTextChange]
  );

  React.useImperativeHandle(
    ref,
    () => ({
      getSuggestions: (q: string) => searchProgrammatically(q),
      clearCache
    }),
    [searchProgrammatically, clearCache]
  );

  const selectedKeys = activeSelection.map((item) => item.key);
  const selectionCapped = typeof maxSelections === 'number' && activeSelection.length >= maxSelections;
  const inputDisabled = disabled || (mode === 'multiple' && selectionCapped);
  const labelText = typeof label === 'string' ? label : PEOPLE_PICKER_STRINGS.DEFAULT_LABEL;

  return (
    <div
      className={joinClassNames(styles.root, className, classNames?.root)}
      style={stylesOverride?.root}
    >
      <Field
        {...fieldProps}
        label={label}
        required={required}
        validationMessage={validationMessage}
        validationState={validationState}
        hint={hint}
        className={classNames?.field}
        style={stylesOverride?.field}
      >
        <TagPicker
          {...tagPickerProps}
          selectedOptions={selectedKeys}
          onOptionSelect={handleOptionSelect}
          noPopover={disabled || (mode === 'multiple' && selectionCapped)}
        >
          <TagPickerControl
            expandIcon={null}
            className={classNames?.control}
            style={stylesOverride?.control}
          >
            <TagPickerGroup
              aria-label={`${labelText} ${PEOPLE_PICKER_STRINGS.SELECTED_ITEMS_ARIA_LABEL_SUFFIX}`}
              className={classNames?.selectedGroup}
              style={stylesOverride?.selectedGroup}
            >
              {activeSelection.map((item) => (
                <Tag
                  key={item.key}
                  value={item.key}
                  dismissible={!disabled}
                  className={classNames?.selectedTag}
                  style={stylesOverride?.selectedTag}
                  media={<Avatar name={item.displayName} color="colorful" />}
                  icon={item.principalType === 'Group' ? <GroupRegular /> : <PersonRegular />}
                >
                  {item.displayName}
                </Tag>
              ))}
            </TagPickerGroup>
            <TagPickerInput
              disabled={inputDisabled}
              aria-label={labelText}
              aria-required={required}
              aria-disabled={inputDisabled}
              aria-busy={isLoading}
              value={query}
              onChange={handleQueryChange}
              className={classNames?.input}
              style={stylesOverride?.input}
              placeholder={
                mode === 'single' && activeSelection.length > 0
                  ? ''
                  : selectionCapped
                    ? ''
                    : placeholder
              }
            />
          </TagPickerControl>

          <TagPickerList
            className={classNames?.suggestionList}
            style={stylesOverride?.suggestionList}
            role="listbox"
            aria-live="polite"
            aria-busy={isLoading}
            aria-label={`${labelText} ${PEOPLE_PICKER_STRINGS.SELECTED_ITEMS_ARIA_LABEL_SUFFIX}`}
          >
            {isLoading && (
              <div
                role="status"
                aria-busy={true}
                aria-live="polite"
                aria-label={PEOPLE_PICKER_STRINGS.LOADING_ARIA_LABEL}
                className={joinClassNames(styles.loadingContainer, classNames?.loading)}
                style={stylesOverride?.loading}
              >
                <Spinner size="tiny" />
              </div>
            )}

            {!isLoading && !error && visibleSuggestions.length === 0 && query.trim() && (
              <div
                className={joinClassNames(styles.optionMeta, classNames?.noResults)}
                style={stylesOverride?.noResults}
              >
                {noResultsText}
              </div>
            )}

            {!isLoading && error && (
              <div
                role="alert"
                aria-live="assertive"
                className={joinClassNames(styles.errorMessage, classNames?.error)}
                style={stylesOverride?.error}
              >
                {error}
              </div>
            )}

            {!isLoading &&
              visibleSuggestions.map((option) => (
                <TagPickerOption
                  key={option.key}
                  value={option.key}
                  text={option.displayName}
                  className={classNames?.suggestionOption}
                  style={stylesOverride?.suggestionOption}
                  media={
                    option.principalType === 'Group' ? (
                      <GroupRegular />
                    ) : (
                      <Avatar name={option.displayName} color="colorful" size={28} />
                    )
                  }
                >
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>{option.displayName}</span>
                    <span className={styles.optionMeta}>{option.secondaryText}</span>
                  </div>
                </TagPickerOption>
              ))}
          </TagPickerList>
        </TagPicker>
      </Field>
    </div>
  );
};

/** Public People Picker component. */
export const PeoplePicker = React.forwardRef<IPeoplePickerHandle, IPeoplePickerProps>(PeoplePickerInner);
PeoplePicker.displayName = 'PeoplePicker';
