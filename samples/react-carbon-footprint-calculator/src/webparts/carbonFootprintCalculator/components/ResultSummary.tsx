import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import * as strings from 'CarbonFootprintCalculatorWebPartStrings';
import { IEmissionBreakdownItem } from '../../../services/CarbonFootprintService';
import { IThemeColors } from './useThemeColors';
import { categoryLabel } from './categoryLabel';
import { format } from '../../../utils/format';

export interface IResultSummaryProps {
  total: number;
  perPerson: number;
  largest?: IEmissionBreakdownItem;
  colors: IThemeColors;
}

interface IStatProps {
  label: string;
  value: string;
  detail?: string;
  colors: IThemeColors;
}

const Stat: React.FunctionComponent<IStatProps> = ({ label, value, detail, colors }) => (
  <Stack
    tokens={{ childrenGap: 4 }}
    styles={{
      root: {
        flexGrow: 1,
        minWidth: 180,
        padding: 16,
        border: `1px solid ${colors.bodyDivider}`,
        backgroundColor: colors.bodyStandoutBackground
      }
    }}
  >
    <Text variant="small" styles={{ root: { color: colors.bodySubtext } }}>
      {label}
    </Text>
    <Text variant="xxLarge" styles={{ root: { fontWeight: 600, color: colors.bodyText } }}>
      {value}
    </Text>
    {detail && (
      <Text variant="small" styles={{ root: { color: colors.bodySubtext } }}>
        {detail}
      </Text>
    )}
  </Stack>
);

/**
 * The three headline figures.
 *
 * Each one is a number with its own label, so nothing depends on position or
 * colour to be understood.
 */
export const ResultSummary: React.FunctionComponent<IResultSummaryProps> = (props) => (
  <Stack horizontal wrap tokens={{ childrenGap: 12 }}>
    <Stat
      label={strings.TotalEmissionsLabel}
      value={format(strings.KilogramsPerMonth, props.total.toFixed(1))}
      colors={props.colors}
    />
    <Stat
      label={strings.PerPersonLabel}
      value={format(strings.KilogramsPerMonth, props.perPerson.toFixed(1))}
      colors={props.colors}
    />
    <Stat
      label={strings.LargestContributorLabel}
      value={props.largest ? categoryLabel(props.largest.category) : strings.NoDataYet}
      detail={
        props.largest
          ? format(strings.BreakdownValueLabel, props.largest.value, props.largest.share)
          : undefined
      }
      colors={props.colors}
    />
  </Stack>
);
