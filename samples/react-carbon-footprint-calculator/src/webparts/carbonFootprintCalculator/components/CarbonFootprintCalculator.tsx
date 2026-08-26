import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';

import styles from '../../../styles/CarbonFootprintCalculator.module.scss';
import * as strings from 'CarbonFootprintCalculatorWebPartStrings';
import type { ICarbonFootprintCalculatorProps } from './ICarbonFootprintCalculatorProps';
import { CalculatorInputs } from './CalculatorInputs';
import { ResultSummary } from './ResultSummary';
import { EmissionsBreakdown } from './EmissionsBreakdown';
import { useThemeColors } from './useThemeColors';
import { CarbonFootprintService, IConsumption } from '../../../services/CarbonFootprintService';
import { PrintService } from '../../../services/PrintService';
import { format } from '../../../utils/format';

const DEFAULTS: IConsumption = {
  electricity: 350,
  carKm: 1200,
  shortFlights: 2,
  longFlights: 1,
  gas: 150,
  water: 4000,
  hasSolar: false,
  heating: 'electric'
};

const TIPS: string[] = [
  strings.TipLighting,
  strings.TipTransport,
  strings.TipFlights,
  strings.TipInsulation,
  strings.TipRenewable
];

export default function CarbonFootprintCalculator(
  props: ICarbonFootprintCalculatorProps
): React.ReactElement {
  const colors = useThemeColors(props.themeVariant);
  const [consumption, setConsumption] = React.useState<IConsumption>(DEFAULTS);
  const [residents, setResidents] = React.useState(props.defaultResidents || 2);
  const [showTips, setShowTips] = React.useState(false);

  React.useEffect(() => {
    if (props.defaultResidents) {
      setResidents(props.defaultResidents);
    }
  }, [props.defaultResidents]);

  const patch = React.useCallback(
    (values: Partial<IConsumption>) => setConsumption((current) => ({ ...current, ...values })),
    []
  );

  const emissions = React.useMemo(
    () => CarbonFootprintService.calculateEmissions(consumption),
    [consumption]
  );
  const total = React.useMemo(
    () => CarbonFootprintService.getTotalEmissions(emissions),
    [emissions]
  );
  const breakdown = React.useMemo(
    () => CarbonFootprintService.getBreakdown(emissions),
    [emissions]
  );
  const perPerson = CarbonFootprintService.getEmissionsPerPerson(total, residents);
  const largest = CarbonFootprintService.getLargestContributor(emissions);

  const bodyTextStyles = { root: { color: colors.bodyText } };
  const subtextStyles = { root: { color: colors.bodySubtext } };

  return (
    <div
      className={styles.carbonFootprintCalculator}
      style={{ backgroundColor: colors.bodyBackground, color: colors.bodyText }}
    >
      <Stack tokens={{ childrenGap: 24 }}>
        <Stack tokens={{ childrenGap: 4 }}>
          <Text as="h2" variant="xLarge" block styles={{ root: { margin: 0, color: colors.bodyText } }}>
            {strings.TitleLabel}
          </Text>
          {props.description && (
            <Text variant="medium" styles={subtextStyles}>
              {props.description}
            </Text>
          )}
          <Text variant="small" styles={subtextStyles}>
            {format(strings.CalculatedOnLabel, new Date().toLocaleDateString())}
          </Text>
        </Stack>

        {/* The figures change as the sliders move. */}
        <div aria-live="polite">
          <ResultSummary total={total} perPerson={perPerson} largest={largest} colors={colors} />
        </div>

        <Stack horizontal wrap tokens={{ childrenGap: 32 }}>
          <Stack.Item grow styles={{ root: { minWidth: 280, flexBasis: 320 } }}>
            <div className={styles.noPrint}>
              <CalculatorInputs
                consumption={consumption}
                residents={residents}
                onChange={patch}
                onResidentsChange={setResidents}
                colors={colors}
              />
            </div>
          </Stack.Item>

          <Stack.Item grow styles={{ root: { minWidth: 280, flexBasis: 380 } }}>
            <section aria-labelledby="cfc-breakdown-heading">
              <Text
                as="h3"
                variant="large"
                block
                id="cfc-breakdown-heading"
                styles={{ root: { marginBottom: 12, color: colors.bodyText } }}
              >
                {strings.BreakdownHeading}
              </Text>
              <EmissionsBreakdown items={breakdown} colors={colors} />
            </section>
          </Stack.Item>
        </Stack>

        <div className={styles.noPrint}>
          <Toggle
            label={strings.ShowTipsLabel}
            checked={showTips}
            onChange={(_, checked) => setShowTips(!!checked)}
            onText={strings.ToggleOn}
            offText={strings.ToggleOff}
          />
        </div>

        {showTips && (
          <section aria-labelledby="cfc-tips-heading">
            <Text
              as="h3"
              variant="large"
              block
              id="cfc-tips-heading"
              styles={{ root: { marginBottom: 8, color: colors.bodyText } }}
            >
              {strings.TipsHeading}
            </Text>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {TIPS.map((tip) => (
                <li key={tip}>
                  <Text variant="medium" styles={bodyTextStyles}>{tip}</Text>
                </li>
              ))}
            </ul>
          </section>
        )}

        <MessageBar messageBarType={MessageBarType.info}>{strings.IllustrativeNotice}</MessageBar>

        <div className={styles.noPrint}>
          <DefaultButton
            iconProps={{ iconName: 'Print' }}
            text={strings.PrintButtonLabel}
            onClick={() => PrintService.print()}
          />
        </div>
      </Stack>
    </div>
  );
}
