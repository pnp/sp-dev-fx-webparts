import * as React from 'react';
import { useCallback, useState } from 'react';
import { RadioGroup, Radio } from '@fluentui/react-components';
import { FluentUIProvider, StackV2, TypographyControl } from '@spteck/react-controls-v2';
import { IMarqueeDirectionComponentProps } from '../../models/IMarqueeDirectionProps';
import * as strings from 'NewsFeedWebPartStrings';

const MarqueeDirectionHost: React.FC<IMarqueeDirectionComponentProps> = ({
  label,
  value,
  theme,
  onChange,
}) => {
  const [current, setCurrent] = useState<'vertical' | 'horizontal'>(value);

  const handleChange = useCallback(
    (_: React.FormEvent<HTMLDivElement>, data: { value: string }): void => {
      const newDirection = data.value as 'vertical' | 'horizontal';
      setCurrent(newDirection);
      onChange(newDirection);
    },
    [onChange],
  );

  return (
    <FluentUIProvider theme={theme} targetDocument={document} applicationName={'newfeed-marquee-direction-property-pane'}>
      <StackV2 direction="vertical" gap="xs" paddingTop="s">
        <TypographyControl fontSize="m">{label}</TypographyControl>
        <RadioGroup layout="horizontal" value={current} onChange={handleChange}>
          <Radio value="vertical" label={strings.MarqueeDirectionVerticalLabel} />
          <Radio value="horizontal" label={strings.MarqueeDirectionHorizontalLabel} />
        </RadioGroup>
      </StackV2>
    </FluentUIProvider>
  );
};

export default MarqueeDirectionHost;
