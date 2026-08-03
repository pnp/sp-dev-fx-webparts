import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import * as strings from 'CarbonFootprintCalculatorWebPartStrings';
import { IEmissionBreakdownItem } from '../../../services/CarbonFootprintService';
import { IThemeColors } from './useThemeColors';
import { categoryLabel } from './categoryLabel';
import { format } from '../../../utils/format';

export interface IEmissionsBreakdownProps {
  items: IEmissionBreakdownItem[];
  colors: IThemeColors;
}

/** Emissions per category, as a description list with a proportional bar. */
export const EmissionsBreakdown: React.FunctionComponent<IEmissionsBreakdownProps> = ({
  items,
  colors
}) => (
  <dl style={{ margin: 0 }}>
    {items.map((item) => (
      <div
        key={item.category}
        style={{
          paddingBottom: 12,
          marginBottom: 12,
          borderBottom: `1px solid ${colors.bodyDivider}`
        }}
      >
        <Stack horizontal horizontalAlign="space-between" wrap tokens={{ childrenGap: 12 }}>
          <dt style={{ margin: 0, fontWeight: 600 }}>
            <Text variant="medium" styles={{ root: { color: colors.bodyText } }}>
              {categoryLabel(item.category)}
            </Text>
          </dt>
          <dd style={{ margin: 0 }}>
            <Text variant="medium" styles={{ root: { color: colors.bodyText } }}>
              {item.isTrace
                ? format(strings.BreakdownTraceValueLabel, item.value)
                : format(strings.BreakdownValueLabel, item.value, item.share)}
            </Text>
          </dd>
        </Stack>

        {/* The values are already above as text. */}
        <div
          aria-hidden="true"
          style={{
            height: 8,
            marginTop: 6,
            borderRadius: 4,
            backgroundColor: colors.bodyDivider,
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              // A contributing category always shows a sliver, so a small
              // share reads as small rather than as nothing.
              width: item.value > 0 ? `${Math.max(item.share, 0.5)}%` : 0,
              height: '100%',
              backgroundColor: colors.accent
            }}
          />
        </div>
      </div>
    ))}
  </dl>
);
