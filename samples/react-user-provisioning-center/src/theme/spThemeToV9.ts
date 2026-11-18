import type { Theme } from '@fluentui/react-components';

export interface ISpThemePalette {
  themePrimary: string;
  themeLighterAlt: string;
  themeLighter: string;
  themeLight: string;
  themeTertiary: string;
  themeSecondary: string;
  themeDarkAlt: string;
  themeDark: string;
  themeDarker: string;
  neutralLighterAlt: string;
  neutralLighter: string;
  neutralLight: string;
  neutralQuaternaryAlt: string;
  neutralQuaternary: string;
  neutralTertiaryAlt: string;
  neutralTertiary: string;
  neutralSecondaryAlt: string;
  neutralSecondary: string;
  neutralPrimaryAlt: string;
  neutralPrimary: string;
  white: string;
  black: string;
}

export interface ISpThemeEffects {
  elevation4: string;
  elevation8: string;
  elevation16: string;
  elevation64: string;
  roundedCorner2: string;
  roundedCorner4: string;
  roundedCorner6: string;
}

const grey: Record<number, string> = {
  0: '#000000',
  2: '#050505',
  4: '#0a0a0a',
  6: '#0f0f0f',
  8: '#141414',
  10: '#1a1a1a',
  12: '#1f1f1f',
  14: '#242424',
  16: '#292929',
  18: '#2e2e2e',
  20: '#333333',
  22: '#383838',
  24: '#3d3d3d',
  26: '#424242',
  28: '#474747',
  30: '#4d4d4d',
  32: '#525252',
  34: '#575757',
  36: '#5c5c5c',
  38: '#616161',
  40: '#666666',
  42: '#6b6b6b',
  44: '#707070',
  46: '#757575',
  48: '#7a7a7a',
  50: '#808080',
  52: '#858585',
  54: '#8a8a8a',
  56: '#8f8f8f',
  58: '#949494',
  60: '#999999',
  62: '#9e9e9e',
  64: '#a3a3a3',
  66: '#a8a8a8',
  68: '#adadad',
  70: '#b3b3b3',
  72: '#b8b8b8',
  74: '#bdbdbd',
  76: '#c2c2c2',
  78: '#c7c7c7',
  80: '#cccccc',
  82: '#d1d1d1',
  84: '#d6d6d6',
  86: '#dbdbdb',
  88: '#e0e0e0',
  90: '#e6e6e6',
  92: '#ebebeb',
  94: '#f0f0f0',
  96: '#f5f5f5',
  98: '#fafafa',
  99: '#fcfcfc',
  100: '#ffffff'
};
const whiteAlpha: Record<number, string> = {
  5: 'rgba(255, 255, 255, 0.05)',
  10: 'rgba(255, 255, 255, 0.1)',
  20: 'rgba(255, 255, 255, 0.2)',
  30: 'rgba(255, 255, 255, 0.3)',
  40: 'rgba(255, 255, 255, 0.4)',
  50: 'rgba(255, 255, 255, 0.5)',
  60: 'rgba(255, 255, 255, 0.6)',
  70: 'rgba(255, 255, 255, 0.7)',
  80: 'rgba(255, 255, 255, 0.8)',
  90: 'rgba(255, 255, 255, 0.9)'
};
const blackAlpha: Record<number, string> = {
  5: 'rgba(0, 0, 0, 0.05)',
  10: 'rgba(0, 0, 0, 0.1)',
  20: 'rgba(0, 0, 0, 0.2)',
  30: 'rgba(0, 0, 0, 0.3)',
  40: 'rgba(0, 0, 0, 0.4)',
  50: 'rgba(0, 0, 0, 0.5)',
  60: 'rgba(0, 0, 0, 0.6)',
  70: 'rgba(0, 0, 0, 0.7)',
  80: 'rgba(0, 0, 0, 0.8)',
  90: 'rgba(0, 0, 0, 0.9)'
};
const grey10Alpha: Record<number, string> = {
  5: 'rgba(26, 26, 26, 0.05)',
  10: 'rgba(26, 26, 26, 0.1)',
  20: 'rgba(26, 26, 26, 0.2)',
  30: 'rgba(26, 26, 26, 0.3)',
  40: 'rgba(26, 26, 26, 0.4)',
  50: 'rgba(26, 26, 26, 0.5)',
  60: 'rgba(26, 26, 26, 0.6)',
  70: 'rgba(26, 26, 26, 0.7)',
  80: 'rgba(26, 26, 26, 0.8)',
  90: 'rgba(26, 26, 26, 0.9)'
};
const grey12Alpha: Record<number, string> = {
  5: 'rgba(31, 31, 31, 0.05)',
  10: 'rgba(31, 31, 31, 0.1)',
  20: 'rgba(31, 31, 31, 0.2)',
  30: 'rgba(31, 31, 31, 0.3)',
  40: 'rgba(31, 31, 31, 0.4)',
  50: 'rgba(31, 31, 31, 0.5)',
  60: 'rgba(31, 31, 31, 0.6)',
  70: 'rgba(31, 31, 31, 0.7)',
  80: 'rgba(31, 31, 31, 0.8)',
  90: 'rgba(31, 31, 31, 0.9)'
};

function mapAliasColors(palette: ISpThemePalette, inverted: boolean): Partial<Theme> {
  return {
    colorNeutralForeground1: palette.neutralPrimary,
    colorNeutralForeground1Hover: palette.neutralPrimary,
    colorNeutralForeground1Pressed: palette.neutralPrimary,
    colorNeutralForeground1Selected: palette.neutralPrimary,
    colorNeutralForeground2: palette.neutralSecondary,
    colorNeutralForeground2Hover: palette.neutralPrimary,
    colorNeutralForeground2Pressed: palette.neutralPrimary,
    colorNeutralForeground2Selected: palette.neutralPrimary,
    colorNeutralForeground2BrandHover: palette.themePrimary,
    colorNeutralForeground2BrandPressed: palette.themeDarkAlt,
    colorNeutralForeground2BrandSelected: palette.themePrimary,
    colorNeutralForeground3: inverted ? palette.neutralSecondaryAlt : palette.neutralTertiary,
    colorNeutralForeground3Hover: palette.neutralSecondary,
    colorNeutralForeground3Pressed: palette.neutralSecondary,
    colorNeutralForeground3Selected: palette.neutralSecondary,
    colorNeutralForeground3BrandHover: palette.themePrimary,
    colorNeutralForeground3BrandPressed: palette.themeDarkAlt,
    colorNeutralForeground3BrandSelected: palette.themePrimary,
    colorNeutralForeground4: inverted ? palette.neutralSecondaryAlt : palette.neutralQuaternary,
    colorNeutralForeground5: inverted ? grey[68] : grey[38],
    colorNeutralForeground5Hover: inverted ? '#ffffff' : grey[14],
    colorNeutralForeground5Pressed: inverted ? '#ffffff' : grey[14],
    colorNeutralForeground5Selected: inverted ? '#ffffff' : grey[14],
    colorNeutralForegroundDisabled: palette.neutralTertiaryAlt,
    colorNeutralForegroundInvertedDisabled: whiteAlpha[40],
    colorBrandForegroundLink: palette.themeDarkAlt,
    colorBrandForegroundLinkHover: palette.themeDark,
    colorBrandForegroundLinkPressed: palette.themeDarker,
    colorBrandForegroundLinkSelected: palette.themeDarkAlt,
    colorNeutralForeground2Link: palette.neutralSecondary,
    colorNeutralForeground2LinkHover: palette.neutralPrimary,
    colorNeutralForeground2LinkPressed: palette.neutralPrimary,
    colorNeutralForeground2LinkSelected: palette.neutralPrimary,
    colorCompoundBrandForeground1: palette.themePrimary,
    colorCompoundBrandForeground1Hover: palette.themeDarkAlt,
    colorCompoundBrandForeground1Pressed: palette.themeDark,
    colorBrandForeground1: palette.themePrimary,
    colorBrandForeground2: palette.themeDarkAlt,
    colorBrandForeground2Hover: palette.themeDarkAlt,
    colorBrandForeground2Pressed: palette.themeDarkAlt,
    colorNeutralForeground1Static: palette.neutralPrimary,
    colorNeutralForegroundInverted: palette.white,
    colorNeutralForegroundInvertedHover: palette.white,
    colorNeutralForegroundInvertedPressed: palette.white,
    colorNeutralForegroundInvertedSelected: palette.white,
    colorNeutralForegroundOnBrand: palette.white,
    colorNeutralForegroundStaticInverted: palette.white,
    colorNeutralForegroundInvertedLink: palette.white,
    colorNeutralForegroundInvertedLinkHover: palette.white,
    colorNeutralForegroundInvertedLinkPressed: palette.white,
    colorNeutralForegroundInvertedLinkSelected: palette.white,
    colorNeutralForegroundInverted2: palette.white,
    colorBrandForegroundInverted: palette.themeSecondary,
    colorBrandForegroundInvertedHover: palette.themeTertiary,
    colorBrandForegroundInvertedPressed: palette.themeSecondary,
    colorBrandForegroundOnLight: palette.themePrimary,
    colorBrandForegroundOnLightHover: palette.themeDarkAlt,
    colorBrandForegroundOnLightPressed: palette.themeDark,
    colorBrandForegroundOnLightSelected: palette.themeDark,
    colorNeutralBackground1: palette.white,
    colorNeutralBackground1Hover: palette.neutralLighter,
    colorNeutralBackground1Pressed: palette.neutralQuaternaryAlt,
    colorNeutralBackground1Selected: palette.neutralLight,
    colorNeutralBackground2: palette.neutralLighterAlt,
    colorNeutralBackground2Hover: palette.neutralLighter,
    colorNeutralBackground2Pressed: palette.neutralQuaternaryAlt,
    colorNeutralBackground2Selected: palette.neutralLight,
    colorNeutralBackground3: palette.neutralLighter,
    colorNeutralBackground3Hover: palette.neutralLight,
    colorNeutralBackground3Pressed: palette.neutralQuaternary,
    colorNeutralBackground3Selected: palette.neutralQuaternaryAlt,
    colorNeutralBackground4: palette.neutralLighter,
    colorNeutralBackground4Hover: palette.neutralLighterAlt,
    colorNeutralBackground4Pressed: palette.neutralLighter,
    colorNeutralBackground4Selected: palette.white,
    colorNeutralBackground5: palette.neutralLight,
    colorNeutralBackground5Hover: palette.neutralLighter,
    colorNeutralBackground5Pressed: palette.neutralLighter,
    colorNeutralBackground5Selected: palette.neutralLighterAlt,
    colorNeutralBackground6: palette.neutralLight,
    colorNeutralBackground7: '#00000000',
    colorNeutralBackground7Hover: inverted ? grey[10] : grey[92],
    colorNeutralBackground7Pressed: inverted ? grey[4] : grey[84],
    colorNeutralBackground7Selected: '#00000000',
    colorNeutralBackground8: inverted ? '#ffffff' : grey[99],
    colorNeutralBackgroundStatic: grey[20],
    colorNeutralBackgroundInverted: palette.neutralSecondary,
    colorNeutralBackgroundInvertedHover: inverted ? grey[96] : grey[24],
    colorNeutralBackgroundInvertedPressed: inverted ? grey[88] : grey[12],
    colorNeutralBackgroundInvertedSelected: inverted ? grey[92] : grey[22],
    colorNeutralBackgroundAlpha: inverted ? grey10Alpha[50] : whiteAlpha[50],
    colorNeutralBackgroundAlpha2: inverted ? grey12Alpha[70] : whiteAlpha[80],
    colorSubtleBackground: 'transparent',
    colorSubtleBackgroundHover: palette.neutralLighter,
    colorSubtleBackgroundPressed: palette.neutralQuaternaryAlt,
    colorSubtleBackgroundSelected: palette.neutralLight,
    colorSubtleBackgroundLightAlphaHover: inverted ? whiteAlpha[10] : whiteAlpha[80],
    colorSubtleBackgroundLightAlphaPressed: inverted ? whiteAlpha[5] : whiteAlpha[50],
    colorSubtleBackgroundLightAlphaSelected: 'transparent',
    colorSubtleBackgroundInverted: 'transparent',
    colorSubtleBackgroundInvertedHover: blackAlpha[10],
    colorSubtleBackgroundInvertedPressed: blackAlpha[30],
    colorSubtleBackgroundInvertedSelected: blackAlpha[20],
    colorTransparentBackground: 'transparent',
    colorTransparentBackgroundHover: 'transparent',
    colorTransparentBackgroundPressed: 'transparent',
    colorTransparentBackgroundSelected: 'transparent',
    colorNeutralBackgroundDisabled: palette.neutralLighter,
    colorNeutralBackgroundDisabled2: inverted ? grey[16] : '#ffffff',
    colorNeutralBackgroundInvertedDisabled: whiteAlpha[10],
    colorNeutralStencil1: palette.neutralLight,
    colorNeutralStencil2: palette.neutralLighterAlt,
    colorNeutralStencil1Alpha: inverted ? whiteAlpha[10] : blackAlpha[10],
    colorNeutralStencil2Alpha: inverted ? whiteAlpha[5] : blackAlpha[5],
    colorBackgroundOverlay: blackAlpha[40],
    colorScrollbarOverlay: blackAlpha[50],
    colorBrandBackground: palette.themePrimary,
    colorBrandBackgroundHover: palette.themeDarkAlt,
    colorBrandBackgroundPressed: palette.themeDarker,
    colorBrandBackgroundSelected: palette.themeDark,
    colorCompoundBrandBackground: palette.themePrimary,
    colorCompoundBrandBackgroundHover: palette.themeDarkAlt,
    colorCompoundBrandBackgroundPressed: palette.themeDark,
    colorBrandBackgroundStatic: palette.themePrimary,
    colorBrandBackground2: palette.themeLighterAlt,
    colorBrandBackground2Hover: palette.themeLighterAlt,
    colorBrandBackground2Pressed: palette.themeLighterAlt,
    colorBrandBackground3Static: palette.themeDark,
    colorBrandBackground4Static: palette.themeDarker,
    colorBrandBackgroundInverted: palette.white,
    colorBrandBackgroundInvertedHover: palette.themeLighterAlt,
    colorBrandBackgroundInvertedPressed: palette.themeLight,
    colorBrandBackgroundInvertedSelected: palette.themeLighter,
    colorNeutralCardBackground: inverted ? grey[20] : grey[98],
    colorNeutralCardBackgroundHover: inverted ? grey[24] : palette.white,
    colorNeutralCardBackgroundPressed: inverted ? grey[18] : grey[96],
    colorNeutralCardBackgroundSelected: inverted ? grey[22] : grey[92],
    colorNeutralCardBackgroundDisabled: inverted ? grey[8] : grey[94],
    colorNeutralStrokeAccessible: palette.neutralSecondary,
    colorNeutralStrokeAccessibleHover: palette.neutralSecondary,
    colorNeutralStrokeAccessiblePressed: palette.neutralSecondary,
    colorNeutralStrokeAccessibleSelected: palette.themePrimary,
    colorNeutralStroke1: palette.neutralQuaternary,
    colorNeutralStroke1Hover: palette.neutralTertiaryAlt,
    colorNeutralStroke1Pressed: palette.neutralTertiaryAlt,
    colorNeutralStroke1Selected: palette.neutralTertiaryAlt,
    colorNeutralStroke2: palette.neutralQuaternaryAlt,
    colorNeutralStroke3: palette.neutralLighter,
    colorNeutralStroke4: inverted ? grey[24] : grey[92],
    colorNeutralStroke4Hover: inverted ? grey[18] : grey[88],
    colorNeutralStroke4Pressed: inverted ? grey[14] : grey[84],
    colorNeutralStroke4Selected: inverted ? grey[24] : grey[92],
    colorNeutralStrokeSubtle: palette.neutralQuaternaryAlt,
    colorNeutralStrokeOnBrand: palette.white,
    colorNeutralStrokeOnBrand2: palette.white,
    colorNeutralStrokeOnBrand2Hover: palette.white,
    colorNeutralStrokeOnBrand2Pressed: palette.white,
    colorNeutralStrokeOnBrand2Selected: palette.white,
    colorBrandStroke1: palette.themePrimary,
    colorBrandStroke2: palette.themeLight,
    colorBrandStroke2Hover: palette.themeLight,
    colorBrandStroke2Pressed: palette.themeLight,
    colorBrandStroke2Contrast: palette.themeLight,
    colorCompoundBrandStroke: palette.themePrimary,
    colorCompoundBrandStrokeHover: palette.themeDarkAlt,
    colorCompoundBrandStrokePressed: palette.themeDark,
    colorNeutralStrokeDisabled: palette.neutralQuaternaryAlt,
    colorNeutralStrokeDisabled2: inverted ? grey[24] : grey[92],
    colorNeutralStrokeInvertedDisabled: whiteAlpha[40],
    colorTransparentStroke: 'transparent',
    colorTransparentStrokeInteractive: 'transparent',
    colorTransparentStrokeDisabled: 'transparent',
    colorNeutralStrokeAlpha: inverted ? whiteAlpha[10] : blackAlpha[5],
    colorNeutralStrokeAlpha2: whiteAlpha[20],
    colorStrokeFocus1: palette.white,
    colorStrokeFocus2: palette.black,
    colorNeutralShadowAmbient: 'rgba(0,0,0,0.12)',
    colorNeutralShadowKey: 'rgba(0,0,0,0.14)',
    colorNeutralShadowAmbientLighter: 'rgba(0,0,0,0.06)',
    colorNeutralShadowKeyLighter: 'rgba(0,0,0,0.07)',
    colorNeutralShadowAmbientDarker: 'rgba(0,0,0,0.20)',
    colorNeutralShadowKeyDarker: 'rgba(0,0,0,0.24)',
    colorBrandShadowAmbient: 'rgba(0,0,0,0.30)',
    colorBrandShadowKey: 'rgba(0,0,0,0.25)'
  } as Partial<Theme>;
}

function mapShadowTokens(effects: ISpThemeEffects): Partial<Theme> {
  return {
    shadow4: effects.elevation4,
    shadow8: effects.elevation8,
    shadow16: effects.elevation16,
    shadow64: effects.elevation64
  } as Partial<Theme>;
}

function mapBorderRadiusTokens(effects: ISpThemeEffects): Partial<Theme> {
  return {
    borderRadiusSmall: effects.roundedCorner2,
    borderRadiusMedium: effects.roundedCorner4,
    borderRadiusLarge: effects.roundedCorner6
  } as Partial<Theme>;
}

export function createV9ThemeFromSp(
  palette: ISpThemePalette,
  effects: ISpThemeEffects,
  isInverted: boolean,
  baseThemeV9: Theme
): Theme {
  return {
    ...baseThemeV9,
    ...mapAliasColors(palette, isInverted),
    ...mapShadowTokens(effects),
    ...mapBorderRadiusTokens(effects)
  };
}
