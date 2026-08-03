import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import { useTheme } from '@fluentui/react/lib/Theme';
import * as strings from 'PublicHolidaysGlobalWebPartStrings';

export interface IConfigurePlaceholderProps {
  onConfigure: () => void;
}

/**
 * Shown until the web part has a country to work with.
 *
 * Deliberately built from Fluent primitives rather than taking a dependency on
 * a control library for one screen: the whole component is a handful of lines
 * and keeps the sample's bundle small.
 */
export const ConfigurePlaceholder: React.FunctionComponent<IConfigurePlaceholderProps> = ({ onConfigure }) => {
  const theme = useTheme();

  return (
    <Stack
      horizontalAlign="center"
      tokens={{ childrenGap: 12 }}
      styles={{
        root: {
          padding: 32,
          border: `1px dashed ${theme.semanticColors.inputBorder}`,
          backgroundColor: theme.semanticColors.bodyStandoutBackground
        }
      }}
    >
      <Icon iconName="Calendar" aria-hidden="true" styles={{ root: { fontSize: 32 } }} />
      <Text as="h2" variant="large" styles={{ root: { margin: 0 } }}>
        {strings.PlaceholderIconText}
      </Text>
      <Text variant="medium" styles={{ root: { color: theme.semanticColors.bodySubtext, textAlign: 'center' } }}>
        {strings.PlaceholderDescription}
      </Text>
      <PrimaryButton onClick={onConfigure}>{strings.PlaceholderButtonLabel}</PrimaryButton>
    </Stack>
  );
};
