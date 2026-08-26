import * as React from 'react';
import { webLightTheme } from '@fluentui/react-components';
import { FluentUIProvider, DropdownField, HeroMosaicOverflowMode } from '@spteck/react-controls-v2';
import { IMosaicOverflowComponentProps } from '../../models/IMosaicOverflowProps';
import strings from 'HeroWebPartStrings';

const getMosaicOverflowOptions = (): { value: string; text: string }[] => [
  { value: 'marquee', text: strings.MosaicOverflowMarqueeOption },
  { value: 'scroll',  text: strings.MosaicOverflowScrollOption  },
];

export const MosaicOverflow: React.FC<IMosaicOverflowComponentProps> = ({
  label, value, theme, hostType, onChange,
}) => {
  return (
    <FluentUIProvider theme={hostType === 'sharepoint' ? webLightTheme : theme} applicationName="mosaic-overflow-" styles={{backgroundColor: 'transparent'}}>
      <DropdownField
        label={label}
        defaultValue={value}
        options={getMosaicOverflowOptions()}
        onChange={(val: string) => onChange(val as HeroMosaicOverflowMode)}
      />
    </FluentUIProvider>
  );
};

MosaicOverflow.displayName = 'MosaicOverflow';
