import * as React from 'react';
import { useCallback, useState } from 'react';
import { Slider, Label, tokens } from '@fluentui/react-components';
import { FluentUIProvider, StackV2, TypographyControl } from '@spteck/react-controls-v2';
import { IMaxNewsComponentProps } from '../../models/IMaxNewsProps';

const MaxNewsHost: React.FC<IMaxNewsComponentProps> = ({
  label,
  value,
  min,
  max,
  step,
  theme,
  onChange,
}) => {
  const [current, setCurrent] = useState(value);

  const handleChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, data: { value: number }): void => {
      setCurrent(data.value);
      onChange(data.value);
    },
    [onChange],
  );

  return (
    <FluentUIProvider theme={theme} targetDocument={document} applicationName={'newfeed-maxnews-property-pane'}>
      <StackV2 direction="vertical" gap="xs" paddingTop="s">
        <StackV2 direction="horizontal" justifyContent="space-between" alignItems="center">
          <Label>{label}</Label>
          <TypographyControl fontSize="m" color={tokens.colorNeutralForeground2}>
            {current}
          </TypographyControl>
        </StackV2>
        <Slider
          min={min}
          max={max}
          step={step}
          value={current}
          onChange={handleChange}
        />
      </StackV2>
    </FluentUIProvider>
  );
};

export default MaxNewsHost;
