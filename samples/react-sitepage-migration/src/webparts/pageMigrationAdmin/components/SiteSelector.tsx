import * as React from 'react';
import {
  Body1Stronger,
  Button,
  Caption1,
  Combobox,
  Field,
  Option,
  OptionGroup,
  Spinner,
  Tooltip,
  useId
} from '@fluentui/react-components';
import {
  DismissRegular,
  GlobeRegular,
  OpenRegular
} from '@fluentui/react-icons';
import { SiteReference } from '../../../models/SiteReference';
import { formatString } from '../../../utilities/formatString';
import { isSharePointUrl } from '../../../utilities/UrlUtilities';
import { useAppStyles } from './useAppStyles';
import * as strings from 'PageMigrationAdminWebPartStrings';

export interface SiteSelectorProps {
  readonly label: string;
  readonly hint: string;
  readonly options: ReadonlyArray<SiteReference>;
  readonly recentSites: ReadonlyArray<SiteReference>;
  readonly selectedSite?: SiteReference;
  readonly isSearching: boolean;
  readonly disabled?: boolean;
  readonly onSearch: (query: string) => Promise<void>;
  readonly onSelect: (site?: SiteReference) => void;
}

const SEARCH_DEBOUNCE_MS = 350;
const MIN_QUERY_LENGTH = 2;

export const SiteSelector: React.FC<SiteSelectorProps> = React.memo((props) => {
  const styles = useAppStyles();
  const comboId = useId('site-combobox');
  const [query, setQuery] = React.useState('');
  const lastRequestedRef = React.useRef('');
  const { onSearch, onSelect } = props;

  const trimmedQuery = query.trim();
  const isUrlQuery = isSharePointUrl(trimmedQuery);
  const showRecent = trimmedQuery.length < MIN_QUERY_LENGTH && props.recentSites.length > 0;
  const visibleOptions = showRecent ? props.recentSites : props.options;

  React.useEffect(() => {
    if (trimmedQuery.length < MIN_QUERY_LENGTH) {
      lastRequestedRef.current = '';
      return undefined;
    }

    const normalized = trimmedQuery.toLowerCase();
    if (lastRequestedRef.current === normalized) {
      return undefined;
    }

    if (isUrlQuery) {
      lastRequestedRef.current = normalized;
      void onSearch(trimmedQuery);
      return undefined;
    }

    const handle = window.setTimeout(() => {
      lastRequestedRef.current = normalized;
      void onSearch(trimmedQuery);
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(handle);
  }, [trimmedQuery, isUrlQuery, onSearch]);

  const handleOptionSelect = React.useCallback((optionValue: string | undefined) => {
    const site = visibleOptions.find((candidate) => candidate.id === optionValue);
    if (site) {
      onSelect(site);
      setQuery('');
      lastRequestedRef.current = '';
    }
  }, [visibleOptions, onSelect]);

  const handleClear = React.useCallback(() => {
    onSelect(undefined);
    setQuery('');
    lastRequestedRef.current = '';
  }, [onSelect]);

  if (props.selectedSite) {
    const site = props.selectedSite;
    return (
      <div className={styles.sitePicker}>
        <div role="group" aria-labelledby={`${comboId}-label`} aria-describedby={`${comboId}-hint`}>
          <Caption1 as="p" id={`${comboId}-label`} className={styles.fieldLabel}>{props.label}</Caption1>
          <div className={styles.siteSummary}>
            <GlobeRegular aria-hidden="true" fontSize={20} />
            <div className={styles.siteSummaryText}>
              <Body1Stronger>{site.displayName}</Body1Stronger>
              <Tooltip content={site.webUrl} relationship="description" withArrow>
                <Caption1 className={styles.truncate}>{site.webUrl}</Caption1>
              </Tooltip>
            </div>
            <Tooltip content={strings.SiteOpenLabel} relationship="label" withArrow>
              <Button
                appearance="subtle"
                icon={<OpenRegular />}
                as="a"
                href={site.webUrl}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${strings.SiteOpenLabel}: ${site.displayName}`}
              />
            </Tooltip>
            <Tooltip content={strings.SiteClearLabel} relationship="label" withArrow>
              <Button
                appearance="subtle"
                icon={<DismissRegular />}
                onClick={handleClear}
                disabled={props.disabled}
                aria-label={`${strings.SiteClearLabel}: ${site.displayName}`}
              />
            </Tooltip>
          </div>
          <Caption1 as="p" id={`${comboId}-hint`} className={styles.mutedText}>{props.hint}</Caption1>
        </div>
      </div>
    );
  }

  const hasTooFewCharacters = trimmedQuery.length > 0 && trimmedQuery.length < MIN_QUERY_LENGTH;
  const showNoResults = trimmedQuery.length >= MIN_QUERY_LENGTH && !props.isSearching && props.options.length === 0;

  return (
    <div className={styles.sitePicker}>
      <Field
        label={props.label}
        hint={hasTooFewCharacters ? strings.SitePickerTypeMore : props.hint}
        validationState={showNoResults ? 'warning' : 'none'}
        validationMessage={showNoResults ? strings.SitePickerNoResults : undefined}
      >
        <Combobox
          id={comboId}
          inlinePopup
          freeform
          clearable
          disabled={props.disabled}
          placeholder={strings.SitePickerPlaceholder}
          value={query}
          selectedOptions={[]}
          onChange={(event) => setQuery(event.target.value)}
          onOptionSelect={(_, data) => handleOptionSelect(data.optionValue)}
        >
          {visibleOptions.length > 0 ? (
            <OptionGroup label={showRecent ? strings.SitePickerRecentGroup : strings.SitePickerResultsGroup}>
              {visibleOptions.map((site) => (
                <Option key={site.id} value={site.id} text={site.displayName}>
                  <div className={styles.optionText}>
                    <Body1Stronger>{site.displayName}</Body1Stronger>
                    <Caption1 className={styles.truncate}>{site.webUrl}</Caption1>
                  </div>
                </Option>
              ))}
            </OptionGroup>
          ) : null}
        </Combobox>
      </Field>

      {props.isSearching ? (
        <Caption1>
          <Spinner size="tiny" labelPosition="after" label={strings.SitePickerSearching} />
        </Caption1>
      ) : null}

      <div role="status" aria-live="polite" className={styles.visuallyHidden}>
        {!props.isSearching && trimmedQuery.length >= MIN_QUERY_LENGTH
          ? formatString(strings.SitePickerResultCount, props.options.length)
          : ''}
      </div>
    </div>
  );
});

SiteSelector.displayName = 'SiteSelector';
