import * as React from 'react';
import { Switch, Slider, webLightTheme } from '@fluentui/react-components';
import { FluentUIProvider, StackV2, TypographyControl, DropdownField } from '@spteck/react-controls-v2';
import { IRotationComponentProps } from '../../models/IRotationProps';
import strings from 'HeroWebPartStrings';

export const Rotation: React.FC<IRotationComponentProps> = ({
  enabledLabel,
  modeLabel,
  intervalLabel,
  enabled,
  mode,
  intervalMs,
  theme,
  hostType,
  onEnabledChange,
  onModeChange,
  onIntervalChange,
}) => {
  return (
    <FluentUIProvider theme={hostType === 'sharepoint' ? webLightTheme : theme} applicationName="rotation-" styles={{backgroundColor: 'transparent'}}>
      <StackV2 direction="vertical"   >

        {/* Enable row */}
        <StackV2
          direction="horizontal"
          alignItems="center"
          justifyContent="space-between"
          paddingTop="xs"
          paddingBottom="xs"
        >
          <TypographyControl fontWeight="semibold">{enabledLabel}</TypographyControl>
          <Switch
            checked={enabled}
            onChange={(_ev, data) => onEnabledChange(data.checked)}
          />
        </StackV2>

        {/* Sub-controls — visible only when enabled */}
        {enabled && (
          <StackV2 direction="vertical" gap="m" paddingLeft="m"     >
            {/* Rotation mode */}
            <DropdownField
              label={<TypographyControl fontWeight="semibold">{modeLabel}</TypographyControl>}
              defaultValue={mode}
              options={[
                { value: 'interval', text: strings.RotationModeIntervalOption },
                { value: 'refresh',  text: strings.RotationModeRefreshOption  },
              ]}
              onChange={(val: string) => onModeChange(val as 'interval' | 'refresh')}
            />

            {/* Rotation interval */}
            <StackV2 direction="vertical" paddingBottom="xs" gap="xs">
              <TypographyControl fontWeight="semibold">{intervalLabel}</TypographyControl>
              <StackV2 direction="horizontal" alignItems="center" gap="s">
                <Slider
                  min={1000}
                  max={10000}
                  step={500}
                  value={intervalMs ?? 5000}
                  style={{ flex: 1 }}
                  onChange={(_ev, data) => onIntervalChange(data.value)}
                />
                <TypographyControl fontSize="s">{((intervalMs ?? 5000) / 1000).toFixed(1)}s</TypographyControl>
              </StackV2>
            </StackV2>
          </StackV2>
        )}

      </StackV2>
    </FluentUIProvider>
  );
};

Rotation.displayName = 'Rotation';
