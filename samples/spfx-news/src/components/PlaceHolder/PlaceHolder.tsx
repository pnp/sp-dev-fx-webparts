import * as React from 'react';
import { Button, tokens } from '@fluentui/react-components';
import { Icon } from '@iconify/react';
import { InlineSVG, StackV2, TypographyControl } from '@spteck/react-controls-v2';
import { undrawNewsSvg } from '../../assets/undrawNews';
import { preprocessNewsSvg } from '../../utils/svgUtils';

export interface IPlaceHolderProps {
  title: string;
  description: string;
  buttonLabel: string;
  onConfigure: () => void;
  height?: number | string;
}

export const PlaceHolder: React.FC<IPlaceHolderProps> = ({
  title,
  description,
  buttonLabel,
  onConfigure,
  height = '100%',
}) => {
  return (
    <StackV2
      direction="vertical"
      alignItems="center"
      justifyContent="center"
      gap="l"
      style={{ height, border: `1px dashed ${tokens.colorNeutralStroke1}`, borderRadius: tokens.borderRadiusMedium }}
    >
      <StackV2 direction="vertical" alignItems="center" gap="m">
        <InlineSVG
          src={undrawNewsSvg}
          width={200}
          height={157}
          style={{ display: 'block' }}
          preProcessor={preprocessNewsSvg}
        />
        <StackV2 direction="vertical" alignItems="center" gap="xs">
          <TypographyControl fontSize="l" fontWeight="semibold">{title}</TypographyControl>
          <TypographyControl fontSize="m" color={tokens.colorNeutralForeground2} style={{ textAlign: 'center', maxWidth: 320 }}>
            {description}
          </TypographyControl>
        </StackV2>
      </StackV2>
      <Button
        appearance="primary"
        icon={<Icon icon="fluent:settings-20-regular" />}
        onClick={onConfigure}
      >
        {buttonLabel}
      </Button>
    </StackV2>
  );
};

export default PlaceHolder;
