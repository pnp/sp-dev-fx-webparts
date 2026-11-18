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
  Text,
  makeStyles,
  tokens,
  type TagPickerProps
} from '@fluentui/react-components';

const useStyles = makeStyles({
  empty: {
    padding: tokens.spacingVerticalS,
    color: tokens.colorNeutralForeground3
  },
  hint: {
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalSNudge}`,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200
  }
});

export interface ICatalogTagPickerItem {
  id: string;
  title: string;
  description?: string;
}

export interface ICatalogTagPickerProps {
  label: string;
  hint?: string;
  items: ICatalogTagPickerItem[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  emptyMessage: string;
  noMatchesMessage: string;
}

export const CatalogTagPicker: React.FC<ICatalogTagPickerProps> = ({
  label,
  hint,
  items,
  selectedIds,
  onChange,
  emptyMessage,
  noMatchesMessage
}) => {
  const styles = useStyles();
  const [query, setQuery] = React.useState<string>('');
  const byId: Map<string, ICatalogTagPickerItem> = React.useMemo(
    () => new Map(items.map((item) => [item.id, item])),
    [items]
  );

  if (items.length === 0) {
    return (
      <Field label={label} hint={hint}>
        <Text className={styles.empty}>{emptyMessage}</Text>
      </Field>
    );
  }

  const needle: string = query.trim().toLowerCase();
  const options: ICatalogTagPickerItem[] = items.filter(
    (item) =>
      selectedIds.indexOf(item.id) === -1 &&
      (!needle || item.title.toLowerCase().indexOf(needle) !== -1)
  );

  const onOptionSelect: TagPickerProps['onOptionSelect'] = (_, data) => {
    onChange(data.selectedOptions);
    setQuery('');
  };

  return (
    <Field label={label} hint={hint}>
      <TagPicker selectedOptions={selectedIds} onOptionSelect={onOptionSelect}>
        <TagPickerControl>
          <TagPickerGroup aria-label={label}>
            {selectedIds.map((id) => (
              <Tag key={id} shape="rounded" value={id}>
                {byId.get(id)?.title ?? id}
              </Tag>
            ))}
          </TagPickerGroup>
          <TagPickerInput
            aria-label={label}
            value={query}
            onChange={(ev) => setQuery(ev.target.value)}
          />
        </TagPickerControl>
        <TagPickerList>
          {options.map((item) => (
            <TagPickerOption key={item.id} value={item.id} text={item.title} secondaryContent={item.description}>
              {item.title}
            </TagPickerOption>
          ))}
          {options.length === 0 ? <div className={styles.hint}>{noMatchesMessage}</div> : undefined}
        </TagPickerList>
      </TagPicker>
    </Field>
  );
};
