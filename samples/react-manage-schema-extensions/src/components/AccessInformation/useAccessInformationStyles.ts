import { css } from '@emotion/css';
import { tokens } from '@fluentui/react-components';

/**
 * Styles for the AccessInformation component
 */
export interface AccessInformationStyles   {
  card: string;
  content: string;
  header: string;
  shieldIcon: string;
  lockIcon: string;
  primaryMessage: string;
  secondaryMessage: string;
  infoSection: string;
  infoIcon: string;
  infoText: string;
}

export const useAccessInformationStyles = (): AccessInformationStyles => {
  return {
    card: css({
      margin: tokens.spacingVerticalL,
      padding: tokens.spacingVerticalXL,
      backgroundColor: tokens.colorNeutralBackground2,
      border: `1px solid ${tokens.colorNeutralStroke2}`,
      borderRadius: tokens.borderRadiusLarge,
      textAlign: 'center',
      maxWidth: '500px',
      marginLeft: 'auto',
      marginRight: 'auto',
    }),
    
    content: css({
      padding: tokens.spacingVerticalM,
    }),
    
    header: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: tokens.spacingVerticalL,
      gap: tokens.spacingHorizontalS,
    }),
    
    shieldIcon: css({
      width: '28px',
      height: '28px',
      fontSize: '28px',
      color: tokens.colorPaletteRedForeground1,
    }),
    
   
    
    lockIcon: css({
      fontSize: '34px',
      width: '34px',
      height: '34px',
      color: tokens.colorBrandBackground,
      marginBottom: tokens.spacingVerticalS,
    }),
    
   
    primaryMessage: css({
      color: tokens.colorNeutralForeground1,
      fontWeight: tokens.fontWeightSemibold,
      marginBottom: tokens.spacingVerticalS,
    }),
    
    secondaryMessage: css({
      color: tokens.colorNeutralForeground2,
      lineHeight: tokens.lineHeightBase400,
    }),
    
    infoSection: css({
      
      marginTop: tokens.spacingVerticalL,
      padding: tokens.spacingVerticalM,
      backgroundColor: tokens.colorNeutralBackground1,
      borderRadius: tokens.borderRadiusMedium,
      border: `1px solid ${tokens.colorNeutralStroke1}`,
    }),
    
    infoIcon: css({
      fontSize: '16px',
      color: tokens.colorBrandForeground1,
      marginTop: '2px', // Align with text
    }),
    
    infoText: css({
      color: tokens.colorNeutralForeground2,
      fontStyle: 'italic',
      textAlign: 'left',
      lineHeight: tokens.lineHeightBase300,
    }),
  };
};
