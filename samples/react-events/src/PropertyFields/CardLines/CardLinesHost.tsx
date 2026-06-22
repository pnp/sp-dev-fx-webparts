import * as React from 'react';
import { useCallback, useState } from 'react';
import { Slider, Label, tokens } from '@fluentui/react-components';
import { FluentUIProvider, StackV2, TypographyControl } from '@spteck/react-controls-v2';
import { ICardLinesComponentProps } from '../../models/ICardLinesProps';

const CardLinesHost: React.FC<ICardLinesComponentProps> = ({
  headlineLinesLabel,
  descriptionLinesLabel,
  headlineLines,
  descriptionLines,
  showDescriptionLines = true,
  theme,
  onChange,
}) => {
  const [currentHeadline, setCurrentHeadline] = useState(headlineLines);
  const [currentDescription, setCurrentDescription] = useState(descriptionLines);

  const handleHeadlineChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, data: { value: number }): void => {
      setCurrentHeadline(data.value);
      onChange(data.value, currentDescription);
    },
    [currentDescription, onChange],
  );

  const handleDescriptionChange = useCallback(
    (_: React.ChangeEvent<HTMLInputElement>, data: { value: number }): void => {
      setCurrentDescription(data.value);
      onChange(currentHeadline, data.value);
    },
    [currentHeadline, onChange],
  );

  return (
    <FluentUIProvider theme={theme} targetDocument={document} applicationName="eventsfeed-cardlines-property-pane" styles={{ background: 'transparent' }}>
      <StackV2 direction="vertical" gap="s" paddingTop="s">
        <StackV2 direction="vertical" gap="xs">
          <StackV2 direction="horizontal" justifyContent="space-between" alignItems="center">
            <Label>{headlineLinesLabel}</Label>
            <TypographyControl fontSize="s" color={tokens.colorNeutralForeground2}>
              {currentHeadline}
            </TypographyControl>
          </StackV2>
          <Slider
            min={1}
            max={5}
            step={1}
            value={currentHeadline}
            onChange={handleHeadlineChange}
          />
        </StackV2>
        {showDescriptionLines && (
          <StackV2 direction="vertical" gap="xs">
            <StackV2 direction="horizontal" justifyContent="space-between" alignItems="center">
              <Label>{descriptionLinesLabel}</Label>
              <TypographyControl fontSize="s" color={tokens.colorNeutralForeground2}>
                {currentDescription === 0 ? '—' : String(currentDescription)}
              </TypographyControl>
            </StackV2>
            <Slider
              min={0}
              max={4}
              step={1}
              value={currentDescription}
              onChange={handleDescriptionChange}
            />
          </StackV2>
        )}
      </StackV2>
    </FluentUIProvider>
  );
};

export default CardLinesHost;
