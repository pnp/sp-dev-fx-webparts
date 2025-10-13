import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';

export interface ManageSchemaExtensionsStyles {
  title: string;
  description: string;
  toolbar: string;
  content: string;
  sharePointHost: string;
  otherHosts: string;
}

export const useManageSchemaExtensionsStyles = (): ManageSchemaExtensionsStyles => {
  return {
    title: css({
      fontSize: tokens.fontSizeHero800,
      fontWeight: tokens.fontWeightSemibold,
      color: tokens.colorNeutralForeground1,
      margin: 0,
      marginBottom: tokens.spacingVerticalS,
    }),
    description: css({
      fontSize: tokens.fontSizeBase300,
      color: tokens.colorNeutralForeground2,
      margin: 0,
    }),
    toolbar: css({
      marginBottom: tokens.spacingVerticalM,
    }),
    content: css({
      flex: 1,
      overflow: 'hidden',
    }),
    sharePointHost: css({
      backgroundColor: 'transparent',
    }),
    otherHosts: css({
      backgroundColor: tokens.colorNeutralBackground1,
      height: 'calc(100vh - 64px)',
      padding: tokens.spacingVerticalL,
      paddingLeft: tokens.spacingHorizontalL,
      paddingRight: tokens.spacingHorizontalL,
    }),
  };
};