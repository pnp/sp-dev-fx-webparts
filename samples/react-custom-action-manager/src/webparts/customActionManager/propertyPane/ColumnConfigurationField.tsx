import * as React from 'react';
import { Stack, Checkbox, IconButton, Text } from '@fluentui/react';
import { ColumnSetting } from '../utils/columnConfig';

export interface ColumnConfigurationFieldProps {
  label: string;
  description?: string;
  settings: ColumnSetting[];
  onChange: (settings: ColumnSetting[]) => void;
}

export const ColumnConfigurationField: React.FC<ColumnConfigurationFieldProps> = ({
  label,
  description,
  settings,
  onChange
}) => {
  const [localSettings, setLocalSettings] = React.useState<ColumnSetting[]>(settings);

  React.useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const ensureAtLeastOneVisible = (updated: ColumnSetting[]): ColumnSetting[] => {
    if (updated.some(setting => setting.visible)) {
      return updated;
    }

    if (updated.length > 0) {
      updated[0] = { ...updated[0], visible: true };
    }
    return updated;
  };

  const updateSettings = (updater: (current: ColumnSetting[]) => ColumnSetting[]) => {
    setLocalSettings(prev => {
      const cloned = prev.map(setting => ({ ...setting }));
      const updated = ensureAtLeastOneVisible(updater(cloned));
      onChange(updated.map(setting => ({ ...setting })));
      return updated;
    });
  };

  const toggleVisibility = (index: number, visible: boolean): void => {
    updateSettings(current => {
      if (!visible) {
        const visibleCount = current.filter(setting => setting.visible).length;
        if (visibleCount <= 1) {
          return current;
        }
      }
      current[index] = { ...current[index], visible };
      return current;
    });
  };

  const moveSetting = (index: number, direction: 'up' | 'down'): void => {
    updateSettings(current => {
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= current.length) {
        return current;
      }
      const updated = [...current];
      const [removed] = updated.splice(index, 1);
      updated.splice(swapIndex, 0, removed);
      return updated;
    });
  };

  return (
    <Stack tokens={{ childrenGap: 12 }}>
      <Text variant="medium">{label}</Text>
      {description && (
        <Text variant="small" style={{ color: '#605e5c' }}>
          {description}
        </Text>
      )}
      <Stack tokens={{ childrenGap: 8 }}>
        {localSettings.map((setting, index) => (
          <Stack
            key={setting.key}
            horizontal
            verticalAlign="center"
            tokens={{ childrenGap: 12 }}
          >
            <Checkbox
              label={setting.label}
              checked={setting.visible}
              onChange={(_, checked) => toggleVisibility(index, !!checked)}
              disabled={setting.visible && localSettings.filter(s => s.visible).length === 1}
            />
            <Stack horizontal tokens={{ childrenGap: 4 }} style={{ marginLeft: 'auto' }}>
              <IconButton
                iconProps={{ iconName: 'ChevronUpSmall' }}
                title="Move up"
                ariaLabel={`Move ${setting.label} column up`}
                disabled={index === 0}
                onClick={() => moveSetting(index, 'up')}
              />
              <IconButton
                iconProps={{ iconName: 'ChevronDownSmall' }}
                title="Move down"
                ariaLabel={`Move ${setting.label} column down`}
                disabled={index === localSettings.length - 1}
                onClick={() => moveSetting(index, 'down')}
              />
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
