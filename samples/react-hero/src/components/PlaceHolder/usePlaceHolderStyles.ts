import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';

export interface IPlaceHolderStyles {
  
    card: string;
}

export const usePlaceHolderStyles = (): IPlaceHolderStyles => ({

  card: css({
    width: '100%',
    boxSizing: 'border-box',
     backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusXLarge,
  }),
});

