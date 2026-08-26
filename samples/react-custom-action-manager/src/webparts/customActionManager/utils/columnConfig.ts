import { ICustomActionManagerWebPartProps } from '../ICustomActionManagerWebPartProps';
import { ICustomActionManagerProps } from '../components/ICustomActionManagerProps';

export const COLUMN_DEFINITIONS = [
  { key: 'title', label: 'Title' },
  { key: 'location', label: 'Location' },
  { key: 'site', label: 'Site' },
  { key: 'scope', label: 'Scope' },
  { key: 'component', label: 'Client Component' },
  { key: 'sequence', label: 'Sequence' },
  { key: 'description', label: 'Description' }
] as const;

export type ColumnKey = typeof COLUMN_DEFINITIONS[number]['key'];

export interface ColumnSetting {
  key: ColumnKey;
  label: string;
  visible: boolean;
}

export const DEFAULT_COLUMN_KEYS: ColumnKey[] = COLUMN_DEFINITIONS.map(def => def.key);

export const COLUMN_LABELS: Record<ColumnKey, string> = COLUMN_DEFINITIONS.reduce(
  (map, def) => {
    map[def.key] = def.label;
    return map;
  },
  {} as Record<ColumnKey, string>
);

const visibleDefaultsFromProps = (props?: Partial<ICustomActionManagerWebPartProps | ICustomActionManagerProps>): Record<ColumnKey, boolean> => ({
  title: props?.showTitleColumn !== false,
  location: props?.showLocationColumn !== false,
  site: props?.showSiteColumn !== false,
  scope: props?.showScopeColumn !== false,
  component: props?.showComponentColumn !== false,
  sequence: props?.showSequenceColumn !== false,
  description: props?.showDescriptionColumn !== false
});

const orderFromString = (order?: string): ColumnKey[] => {
  if (!order || !order.trim()) {
    return [...DEFAULT_COLUMN_KEYS];
  }

  const requested = order
    .split(',')
    .map(value => value.trim().toLowerCase())
    .filter(value => !!value) as string[];

  const normalized: ColumnKey[] = [];
  requested.forEach(value => {
    const match = DEFAULT_COLUMN_KEYS.find(key => key === value);
    if (match && !normalized.includes(match)) {
      normalized.push(match);
    }
  });

  const remaining = DEFAULT_COLUMN_KEYS.filter(key => !normalized.includes(key));
  return [...normalized, ...remaining];
};

const ensureCompleteSettings = (
  settings: ColumnSetting[],
  fallbackVisibility: Record<ColumnKey, boolean>
): ColumnSetting[] => {
  const seen = new Set<ColumnKey>();
  const ordered: ColumnSetting[] = [];

  settings.forEach(setting => {
    if (!DEFAULT_COLUMN_KEYS.includes(setting.key) || seen.has(setting.key)) {
      return;
    }
    ordered.push({
      key: setting.key,
      label: COLUMN_LABELS[setting.key],
      visible: setting.visible
    });
    seen.add(setting.key);
  });

  DEFAULT_COLUMN_KEYS.forEach(key => {
    if (!seen.has(key)) {
      ordered.push({
        key,
        label: COLUMN_LABELS[key],
        visible: fallbackVisibility[key]
      });
      seen.add(key);
    }
  });

  if (!ordered.some(setting => setting.visible)) {
    ordered[0].visible = true;
  }

  return ordered;
};

export const parseColumnConfiguration = (
  config: string | ColumnSetting[] | undefined,
  fallbackVisibility: Record<ColumnKey, boolean>
): ColumnSetting[] | undefined => {
  if (!config) {
    return undefined;
  }

  const normalize = (items: unknown[]): ColumnSetting[] | undefined => {
    const settings = items
      .map(item => ({
        key: (item as any)?.key as ColumnKey,
        visible: (item as any)?.visible !== false
      }))
      .filter(item => DEFAULT_COLUMN_KEYS.includes(item.key));

    if (settings.length === 0) {
      return undefined;
    }

    return ensureCompleteSettings(
      settings.map(setting => ({
        ...setting,
        label: COLUMN_LABELS[setting.key]
      })),
      fallbackVisibility
    );
  };

  if (Array.isArray(config)) {
    return normalize(config);
  }

  if (typeof config === 'string') {
    try {
      const parsed = JSON.parse(config);
      return Array.isArray(parsed) ? normalize(parsed) : undefined;
    } catch (error) {
      console.warn('Failed to parse column configuration:', error);
      return undefined;
    }
  }

  // Handle legacy objects such as { key: ..., visible: ... } or malformed values
  if (typeof config === 'object') {
    if ((config as any).key) {
      return normalize([config]);
    }

    const values = Object.values(config as Record<string, unknown>);
    if (values.every(value => typeof value === 'object')) {
      const normalized = normalize(values);
      if (normalized) {
        return normalized;
      }
    }
  }

  return undefined;
};

export const serializeColumnConfiguration = (settings: ColumnSetting[]): string =>
  JSON.stringify(settings.map(setting => ({ key: setting.key, visible: setting.visible })));

export const deriveColumnSettings = (
  props: Partial<ICustomActionManagerWebPartProps | ICustomActionManagerProps>
): ColumnSetting[] => {
  const fallbackVisibility = visibleDefaultsFromProps(props);
  const parsed = parseColumnConfiguration(
    (props as ICustomActionManagerWebPartProps).columnConfiguration as string | ColumnSetting[] | undefined,
    fallbackVisibility
  );
  if (parsed) {
    return ensureCompleteSettings(parsed, fallbackVisibility);
  }

  const order = orderFromString(props.columnOrder);
  const settings = order.map(key => ({
    key,
    label: COLUMN_LABELS[key],
    visible: fallbackVisibility[key]
  }));

  return ensureCompleteSettings(settings, fallbackVisibility);
};
