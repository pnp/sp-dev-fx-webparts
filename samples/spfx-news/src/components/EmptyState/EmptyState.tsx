import * as React from 'react';
import { tokens } from '@fluentui/react-components';
import { InlineSVG, StackV2, TypographyControl } from '@spteck/react-controls-v2';
import { undrawNewsSvg } from '../../assets/undrawNews';
import { preprocessNewsSvg } from '../../utils/svgUtils';
import * as strings from 'NewsFeedWebPartStrings';

export interface IEmptyStateProps {
  title?: string;
  description?: string;
  height?: number | string;
}

export const EmptyState: React.FC<IEmptyStateProps> = ({
  title = strings.EmptyStateNoPostsTitleLabel,
  description = strings.EmptyStateNoPostsDescriptionLabel,
  height,
}) => (
  <StackV2
    direction="vertical"
    alignItems="center"
    justifyContent="center"
    gap="l"
    style={{ height, padding: tokens.spacingVerticalXXL }}
  >
    <InlineSVG
      src={undrawNewsSvg}
      width={200}
      height={157}
      style={{ display: 'block' }}
      preProcessor={preprocessNewsSvg}
    />
    <StackV2 direction="vertical" alignItems="center" gap="s">
      <TypographyControl fontSize="l" fontWeight="semibold">
        {title}
      </TypographyControl>
      <TypographyControl
        fontSize="m"
        color={tokens.colorNeutralForeground2}
        style={{ textAlign: 'center', maxWidth: 320 }}
      >
        {description}
      </TypographyControl>
    </StackV2>
  </StackV2>
);

export default EmptyState;
