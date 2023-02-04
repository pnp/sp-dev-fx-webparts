/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { IReadonlyTheme } from '@microsoft/sp-component-base';

export const getMessageColors = (theme: IReadonlyTheme) => {

  const themeColors = [
    { color: theme?.palette?.themePrimary, label: 'Theme Primary' },
    { color: theme?.palette?.themeSecondary, label: 'Theme Secondary' },
    { color: theme?.palette?.themeTertiary, label:  'Theme Tertiary' },
    { color: theme?.palette?.themeLighterAlt, label: 'Theme Lighter Alt' },
    { color: theme?.palette?.themeLighter, label: 'Theme Lighter' },
    { color: theme?.palette?.themeLight, label: 'Theme Light' },
    { color: theme?.palette?.neutralDark, label: 'Neutral Dark' },
    { color: theme?.palette?.themeDark, label: 'Theme Dark' },
    { color: theme?.palette?.themeDarker, label: 'Theme Darker' },
    { color: theme?.palette?.neutralPrimary, label: 'Neutral Primary' },
    { color: theme?.palette?.neutralPrimaryAlt, label: 'Neutral Primary Alt' },
    { color: theme?.palette?.neutralLight, label: 'Neutral Light' },
    { color: theme?.palette?.neutralLighter, label: 'Neutral Lighter' },
    { color: theme?.palette?.neutralLighterAlt, label: 'Neutral Lighter Alt' },
    { color: theme?.palette?.neutralSecondary, label: 'Neutral Secondary' },
    { color: theme?.palette?.neutralTertiary, label: 'Neutral Tertiary' },
    { color: theme?.palette?.neutralTertiaryAlt, label: 'Neutral Tertiary Alt' },
    { color: theme?.palette?.neutralQuaternary, label: 'Neutral Quaternary' },
    { color: theme?.palette?.neutralQuaternaryAlt, label: 'Neutral Quaternary Alt' },

  ];

  const standartColors = [
    { color: '#ffb900', label: 'Yellow' },
    { color: '#fff100', label: 'Light Yellow' },
    { color: '#d83b01', label: 'Orange'},
    { color: '#e81123', label: 'Red' },
    { color: '#a80000', label: 'Dark Red'},
    { color: '#5c005c', label: 'Dark Magenta' },
    { color: '#e3008c', label: 'Light Magenta'},
    { color: '#5c2d91', label: 'Purple'},
    { color: '#0078d4', label: 'Blue'},
    { color: '#00bcf2', label: 'Light Blue' },
    { color: '#008272', label: 'Teal'},
    { color: '#107c10', label: 'Green'},
    { color: '#bad80a', label: 'Light Green' },
    { color: '#eaeaea'},
    { color: 'black', label: 'Black'},
    { color: '#333333', label: 'Neutral'},
    { color: 'rgba(102, 102, 102, 0.5)', label: 'Half Gray' }
  ]

  if (!theme) return [standartColors];
  const messageColors = [...themeColors, ...standartColors];
  return messageColors;
};
