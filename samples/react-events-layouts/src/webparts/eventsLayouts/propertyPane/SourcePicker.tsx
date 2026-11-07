import * as React from 'react';
import {
  Field,
  makeStyles,
  Spinner,
  Tag,
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  TagPickerProps,
  tokens
} from '@fluentui/react-components';
import { CalendarLtr20Regular, PeopleTeam20Regular } from '@fluentui/react-icons';
import * as strings from 'EventsLayoutsWebPartStrings';
import { IEventSource } from '../models';
import { SourceSearchService } from '../services/SourceSearchService';

const NO_RESULTS: string = '__none__';
const keyOf = (source: IEventSource): string => `${source.kind}:${source.id}`;

const SourceIcon: React.FC<{ source: IEventSource }> = ({ source }) =>
  source.kind === 'group' ? <PeopleTeam20Regular /> : <CalendarLtr20Regular />;

const useStyles = makeStyles({
  option: { minWidth: 0 },
  secondary: { color: tokens.colorNeutralForeground3, fontSize: tokens.fontSizeBase200 },
  status: { padding: tokens.spacingHorizontalS, color: tokens.colorNeutralForeground3 }
});

export interface ISourcePickerProps {
  label: string;
  description: string;
  selected: IEventSource[];
  searchService: SourceSearchService;
  onChange: (sources: IEventSource[]) => void;
}

/** Multi-select search box for SharePoint Events lists and Microsoft 365 group calendars. */
export const SourcePicker: React.FC<ISourcePickerProps> = ({ label, description, selected: initial, searchService, onChange }) => {
  const styles = useStyles();
  const [selected, setSelected] = React.useState<IEventSource[]>(initial);
  const [query, setQuery] = React.useState<string>('');
  const [results, setResults] = React.useState<IEventSource[]>([]);
  const [searching, setSearching] = React.useState<boolean>(false);

  // Debounced search: runs on open (empty query) and while typing.
  React.useEffect(() => {
    let active = true;
    setSearching(true);
    const timer = setTimeout(() => {
      searchService.search(query).then(found => {
        if (active) {
          setResults(found);
          setSearching(false);
        }
      }, () => active && setSearching(false));
    }, 300);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [query, searchService]);

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
    if (data.value === NO_RESULTS) {
      return;
    }
    const known = selected.concat(results);
    const next = data.selectedOptions
      .map(key => known.filter(source => keyOf(source) === key)[0])
      .filter(Boolean);
    setSelected(next);
    setQuery('');
    onChange(next);
  };

  const available = results.filter(result => selected.every(source => keyOf(source) !== keyOf(result)));

  return (
    <Field label={label} hint={description}>
      <TagPicker inline selectedOptions={selected.map(keyOf)} onOptionSelect={onOptionSelect}>
        <TagPickerControl>
          <TagPickerGroup aria-label={label}>
            {selected.map(source => (
              <Tag key={keyOf(source)} value={keyOf(source)} shape="rounded" media={<SourceIcon source={source} />}
                title={source.subtitle || source.title}>
                {source.title}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            aria-label={strings.SourcesSearchPlaceholder}
            placeholder={selected.length ? undefined : strings.SourcesSearchPlaceholder}
            value={query}
            onChange={event => setQuery(event.target.value)}
          />
        </TagPickerControl>
        <TagPickerList>
          {searching && <div className={styles.status}><Spinner size="tiny" label={strings.SourcesSearching} /></div>}
          {!searching && available.map(source => (
            <TagPickerOption
              key={keyOf(source)}
              value={keyOf(source)}
              text={source.title}
              media={<SourceIcon source={source} />}
              secondaryContent={
                <span className={styles.secondary}>
                  {source.kind === 'group' ? strings.SourceKindGroup : strings.SourceKindList}
                  {source.subtitle ? ` · ${source.subtitle}` : ''}
                </span>
              }
              className={styles.option}
            >
              {source.title}
            </TagPickerOption>
          ))}
          {!searching && !available.length && <TagPickerOption value={NO_RESULTS}>{strings.SourcesNoResults}</TagPickerOption>}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
