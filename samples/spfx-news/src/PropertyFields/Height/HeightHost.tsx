import * as React from 'react';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Button, Label, tokens } from '@fluentui/react-components';
import { FluentUIProvider, InputField, StackV2, TypographyControl } from '@spteck/react-controls-v2';
import { IHeightComponentProps } from '../../models/IHeightProps';

type HeightUnit = 'px' | '%' | 'vh' | 'custom';

const UNITS: HeightUnit[] = ['px', '%', 'vh', 'custom'];

function parseHeightValue(val: string | number | undefined): { unit: HeightUnit; numeric: string; custom: string } {
  const trimmed = String(val ?? '100%').trim();
  if (/^\d+(\.\d+)?px$/.test(trimmed)) {
    return { unit: 'px', numeric: trimmed.slice(0, -2), custom: '' };
  }
  if (/^\d+(\.\d+)?%$/.test(trimmed)) {
    return { unit: '%', numeric: trimmed.slice(0, -1), custom: '' };
  }
  if (/^\d+(\.\d+)?vh$/.test(trimmed)) {
    return { unit: 'vh', numeric: trimmed.slice(0, -2), custom: '' };
  }
  return { unit: 'custom', numeric: '', custom: trimmed };
}

const HeightHost: React.FC<IHeightComponentProps> = ({
  label,
  value,
  theme,
  onChange,
}) => {
  const parsed = parseHeightValue(value);
  const [unit, setUnit] = useState<HeightUnit>(parsed.unit);
  const [numeric, setNumeric] = useState<string>(parsed.numeric);
  const [custom, setCustom] = useState<string>(parsed.custom);
  const lastPxNumeric = useRef<string>(parsed.unit === 'px' ? parsed.numeric : '800');
  const lastPercentNumeric = useRef<string>(parsed.unit === '%' ? parsed.numeric : '100');
  const lastVhNumeric = useRef<string>(parsed.unit === 'vh' ? parsed.numeric : '100');

  const buildValue = useCallback(
    (heightUnit: HeightUnit, numericPart: string, customPart: string): string =>
      heightUnit === 'custom' ? customPart : `${numericPart}${heightUnit}`,
    [],
  );

  const handleUnitChange = useCallback(
    (newUnit: HeightUnit): void => {
      // Save value for the current unit before switching
      if (unit === 'px') lastPxNumeric.current = numeric || '800';
      if (unit === '%') lastPercentNumeric.current = numeric || '100';
      if (unit === 'vh') lastVhNumeric.current = numeric || '100';

      let newNumeric = numeric;
      if (newUnit === 'px') {
        newNumeric = lastPxNumeric.current;
      } else if (newUnit === '%') {
        newNumeric = lastPercentNumeric.current;
        if (Number(newNumeric) > 100) newNumeric = '100';
      } else if (newUnit === 'vh') {
        newNumeric = lastVhNumeric.current;
        if (Number(newNumeric) > 100) newNumeric = '100';
      }
      setNumeric(newNumeric);
      setUnit(newUnit);
      if (newUnit !== 'custom') {
        onChange(buildValue(newUnit, newNumeric, custom));
      }
    },
    [unit, numeric, custom, onChange, buildValue],
  );

  const handleNumericChange = useCallback(
    (val: string): void => {
      setNumeric(val);
      onChange(buildValue(unit, val, custom));
    },
    [unit, custom, onChange, buildValue],
  );

  const handleCustomChange = useCallback(
    (val: string): void => {
      setCustom(val);
      onChange(val);
    },
    [onChange],
  );

  const displayValue = useMemo(
    () => buildValue(unit, numeric, custom),
    [unit, numeric, custom, buildValue],
  );

  return (
    <FluentUIProvider theme={theme} targetDocument={document} applicationName={'newfeed-height-property-pane'}>
      <StackV2 direction="vertical" gap="xs" paddingTop="s">
        <StackV2 direction="horizontal" justifyContent="space-between" alignItems="center">
          <Label>{label}</Label>
          <TypographyControl fontSize="m" color={tokens.colorNeutralForeground2}>
            {displayValue || '—'}
          </TypographyControl>
        </StackV2>
        <StackV2 direction="horizontal" gap="xs">
          {UNITS.map((unitOption) => (
            <Button
              key={unitOption}
              size="small"
              appearance={unit === unitOption ? 'primary' : 'subtle'}
              onClick={() => handleUnitChange(unitOption)}
            >
              {unitOption}
            </Button>
          ))}
        </StackV2>
        {unit === 'custom' ? (
          <InputField
            value={custom}
            placeholder="e.g. calc(100vh - 60px)"
            onChange={(v) => handleCustomChange(String(v))}
          />
        ) : (
          <InputField
            type="number"
            value={numeric}
            min={0}
            max={unit === '%' || unit === 'vh' ? 100 : undefined}
            onChange={(v) => handleNumericChange(String(v))}
            contentAfter={
              <TypographyControl fontSize="s" color={tokens.colorNeutralForeground3}>
                {unit}
              </TypographyControl>
            }
          />
        )}
      </StackV2>
    </FluentUIProvider>
  );
};

export default HeightHost;
