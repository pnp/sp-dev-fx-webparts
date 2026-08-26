import * as React from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { Slider } from '@fluentui/react/lib/Slider';
import { Toggle } from '@fluentui/react/lib/Toggle';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Text } from '@fluentui/react/lib/Text';
import * as strings from 'CarbonFootprintCalculatorWebPartStrings';
import { IConsumption } from '../../../services/CarbonFootprintService';
import { IThemeColors } from './useThemeColors';
import { HeatingType } from '../../../models/HeatingType';

export interface ICalculatorInputsProps {
  consumption: IConsumption;
  residents: number;
  onChange: (patch: Partial<IConsumption>) => void;
  onResidentsChange: (residents: number) => void;
  colors: IThemeColors;
}

export const CalculatorInputs: React.FunctionComponent<ICalculatorInputsProps> = (props) => {
  const { consumption } = props;

  const heatingOptions: IDropdownOption[] = [
    { key: 'electric', text: strings.HeatingElectric },
    { key: 'gas', text: strings.HeatingGas },
    { key: 'heatpump', text: strings.HeatingHeatPump },
    { key: 'wood', text: strings.HeatingWood }
  ];

  return (
    <section aria-labelledby="cfc-inputs-heading">
      <Text
        as="h3"
        variant="large"
        block
        id="cfc-inputs-heading"
        styles={{ root: { marginBottom: 12, color: props.colors.bodyText } }}
      >
        {strings.InputsHeading}
      </Text>

      <Stack tokens={{ childrenGap: 12 }}>
        <Slider
          label={strings.ElectricityLabel}
          min={0}
          max={1000}
          step={10}
          value={consumption.electricity}
          onChange={(v) => props.onChange({ electricity: v })}
          showValue
          ariaLabel={strings.ElectricityLabel}
        />
        <Slider
          label={strings.CarTravelLabel}
          min={0}
          max={5000}
          step={100}
          value={consumption.carKm}
          onChange={(v) => props.onChange({ carKm: v })}
          showValue
          ariaLabel={strings.CarTravelLabel}
        />
        <Slider
          label={strings.ShortFlightsLabel}
          min={0}
          max={5}
          step={1}
          value={consumption.shortFlights}
          onChange={(v) => props.onChange({ shortFlights: v })}
          showValue
          ariaLabel={strings.ShortFlightsLabel}
        />
        <Slider
          label={strings.LongFlightsLabel}
          min={0}
          max={5}
          step={1}
          value={consumption.longFlights}
          onChange={(v) => props.onChange({ longFlights: v })}
          showValue
          ariaLabel={strings.LongFlightsLabel}
        />
        <Slider
          label={strings.NaturalGasLabel}
          min={0}
          max={500}
          step={10}
          value={consumption.gas}
          onChange={(v) => props.onChange({ gas: v })}
          showValue
          ariaLabel={strings.NaturalGasLabel}
        />
        <Slider
          label={strings.WaterLabel}
          min={0}
          max={10000}
          step={100}
          value={consumption.water}
          onChange={(v) => props.onChange({ water: v })}
          showValue
          ariaLabel={strings.WaterLabel}
        />
        <Slider
          label={strings.ResidentsLabel}
          min={1}
          max={10}
          step={1}
          value={props.residents}
          onChange={props.onResidentsChange}
          showValue
          ariaLabel={strings.ResidentsLabel}
        />

        <Dropdown
          label={strings.HeatingLabel}
          selectedKey={consumption.heating}
          options={heatingOptions}
          onChange={(_, option) => option && props.onChange({ heating: option.key as HeatingType })}
        />

        <Toggle
          label={strings.SolarLabel}
          checked={consumption.hasSolar}
          onChange={(_, checked) => props.onChange({ hasSolar: !!checked })}
          onText={strings.ToggleOn}
          offText={strings.ToggleOff}
        />
      </Stack>
    </section>
  );
};
