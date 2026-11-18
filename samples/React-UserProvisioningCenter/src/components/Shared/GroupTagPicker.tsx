import * as React from 'react';
import {
  Field,
  Tag,
  TagPicker,
  TagPickerControl,
  TagPickerGroup,
  TagPickerInput,
  TagPickerList,
  TagPickerOption,
  makeStyles,
  tokens,
  type TagPickerProps
} from '@fluentui/react-components';
import { useQuery } from '@tanstack/react-query';
import * as strings from 'UpcStrings';
import { useServices } from '../../contexts/ServicesContext';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import type { GroupSearchKind, IDirectoryGroupHit } from '../../services/users/UserService';

const useStyles = makeStyles({
  hint: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalSNudge}`,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200
  }
});

export interface IGroupTagPickerProps {
  label: string;
  hint?: string;
  kind: GroupSearchKind;
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export const GroupTagPicker: React.FC<IGroupTagPickerProps> = ({
  label,
  hint,
  kind,
  selectedIds,
  onChange
}) => {
  const styles = useStyles();
  const services = useServices();
  const [query, setQuery] = React.useState<string>('');
  const debounced: string = useDebouncedValue(query);

  const results = useQuery(
    ['graph', 'searchGroups', kind, debounced],
    ({ signal }) => services.users.searchGroups(debounced, kind, signal),
    { enabled: debounced.trim().length >= 2, keepPreviousData: true }
  );

  const [names, setNames] = React.useState<Map<string, string>>(new Map());
  React.useEffect(() => {
    if (!results.data) {
      return;
    }
    setNames((prev) => {
      const next = new Map(prev);
      for (const hit of results.data as IDirectoryGroupHit[]) {
        next.set(hit.id, hit.displayName);
      }
      return next;
    });
  }, [results.data]);

  const resolvedRef = React.useRef<Set<string>>(new Set());
  React.useEffect(() => {
    const unresolved: string[] = selectedIds.filter(
      (id) => !names.has(id) && !resolvedRef.current.has(id)
    );
    if (unresolved.length === 0) {
      return;
    }
    for (const id of unresolved) {
      resolvedRef.current.add(id);
    }
    let cancelled: boolean = false;
    void services.users.getGroupsByIds(unresolved).then((hits) => {
      if (cancelled) {
        return;
      }
      setNames((prev) => {
        const next = new Map(prev);
        for (const hit of hits) {
          next.set(hit.id, hit.displayName);
        }
        return next;
      });
    });
    return () => {
      cancelled = true;
    };
  }, [selectedIds, services.users]);

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
    onChange(data.selectedOptions);
    setQuery('');
  };

  const options: IDirectoryGroupHit[] = (results.data ?? []).filter(
    (hit) => selectedIds.indexOf(hit.id) === -1
  );

  return (
    <Field label={label} hint={hint}>
      <TagPicker selectedOptions={selectedIds} onOptionSelect={onOptionSelect}>
        <TagPickerControl>
          <TagPickerGroup aria-label={label}>
            {selectedIds.map((id) => (
              <Tag key={id} shape="rounded" value={id}>
                {names.get(id) ?? id}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            aria-label={label}
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
            placeholder={strings.AccessGroupSearchPlaceholder}
          />
        </TagPickerControl>
        <TagPickerList>
          {options.map((hit) => (
            <TagPickerOption key={hit.id} value={hit.id} text={hit.displayName}>
              {hit.mail ? `${hit.displayName} · ${hit.mail}` : hit.displayName}
            </TagPickerOption>
          ))}
          {options.length === 0 ? (
            <div className={styles.hint}>
              {debounced.trim().length < 2
                ? strings.AccessGroupSearchHint
                : strings.AccessGroupSearchNoMatches}
            </div>
          ) : undefined}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
