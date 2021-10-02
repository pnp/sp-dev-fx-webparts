import {stylesheet} from 'typestyle';
import {IReadonlyTheme} from '@microsoft/sp-component-base';
export const createstyles = (theme: IReadonlyTheme) => {
  return stylesheet({
    root: {
      backgroundColor: theme.semanticColors.bodyBackground,
    },
    title: {
      color: theme.palette.themePrimary,
      fontSize: theme.fonts.large.fontSize
    }
});
};