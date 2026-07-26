import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {
  BrandVariants,
  createDarkTheme,
  createLightTheme,
  Theme,
  webDarkTheme,
  webLightTheme
} from '@fluentui/react-components';

interface Rgb {
  readonly r: number;
  readonly g: number;
  readonly b: number;
}

const parseHex = (value: string | undefined): Rgb | undefined => {
  if (!value) {
    return undefined;
  }

  const hex = value.trim().replace('#', '');
  const expanded = hex.length === 3
    ? hex.split('').map((char) => char + char).join('')
    : hex;

  if (!/^[0-9a-f]{6}$/i.test(expanded)) {
    return undefined;
  }

  return {
    r: parseInt(expanded.slice(0, 2), 16),
    g: parseInt(expanded.slice(2, 4), 16),
    b: parseInt(expanded.slice(4, 6), 16)
  };
};

const toHex = ({ r, g, b }: Rgb): string =>
  `#${[r, g, b].map((channel) => Math.max(0, Math.min(255, Math.round(channel))).toString(16).padStart(2, '0')).join('')}`;

const mix = (from: Rgb, to: Rgb, ratio: number): Rgb => ({
  r: from.r + (to.r - from.r) * ratio,
  g: from.g + (to.g - from.g) * ratio,
  b: from.b + (to.b - from.b) * ratio
});

const BRAND_KEYS = [
  10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160
] as const;

const RAMP_ANCHORS: ReadonlyArray<{ readonly index: number; readonly paletteKey: string }> = [
  { index: 1, paletteKey: 'themeDarker' },
  { index: 3, paletteKey: 'themeDark' },
  { index: 6, paletteKey: 'themeDarkAlt' },
  { index: 7, paletteKey: 'themePrimary' },
  { index: 8, paletteKey: 'themeSecondary' },
  { index: 10, paletteKey: 'themeTertiary' },
  { index: 12, paletteKey: 'themeLight' },
  { index: 13, paletteKey: 'themeLighter' },
  { index: 14, paletteKey: 'themeLighterAlt' }
];

const BLACK: Rgb = { r: 0, g: 0, b: 0 };
const WHITE: Rgb = { r: 255, g: 255, b: 255 };

export const buildBrandVariants = (palette: Readonly<Record<string, string>> | undefined): BrandVariants | undefined => {
  if (!palette) {
    return undefined;
  }

  const anchors = RAMP_ANCHORS
    .map((anchor) => ({ index: anchor.index, color: parseHex(palette[anchor.paletteKey]) }))
    .filter((anchor): anchor is { index: number; color: Rgb } => !!anchor.color);

  if (anchors.length < 2) {
    return undefined;
  }

  const shades = BRAND_KEYS.map((_, index) => {
    const exact = anchors.find((anchor) => anchor.index === index);
    if (exact) {
      return exact.color;
    }

    const before = [...anchors].reverse().find((anchor) => anchor.index < index);
    const after = anchors.find((anchor) => anchor.index > index);

    if (before && after) {
      const ratio = (index - before.index) / (after.index - before.index);
      return mix(before.color, after.color, ratio);
    }

    if (after) {
      const ratio = (after.index - index) / (after.index + 1);
      return mix(after.color, BLACK, ratio);
    }

    if (before) {
      const ratio = (index - before.index) / (BRAND_KEYS.length - before.index);
      return mix(before.color, WHITE, ratio);
    }

    return BLACK;
  });

  const variants: Partial<Record<(typeof BRAND_KEYS)[number], string>> = {};
  BRAND_KEYS.forEach((key, index) => {
    variants[key] = toHex(shades[index]);
  });

  return variants as BrandVariants;
};

const prefersDarkScheme = (): boolean => {
  try {
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  } catch {
    return false;
  }
};

export const buildFluentTheme = (themeVariant?: IReadonlyTheme): Theme => {
  const palette = themeVariant?.palette as Readonly<Record<string, string>> | undefined;
  const isDark = themeVariant?.isInverted ?? prefersDarkScheme();
  const brand = buildBrandVariants(palette);

  if (!brand) {
    return isDark ? webDarkTheme : webLightTheme;
  }

  const base = isDark ? createDarkTheme(brand) : createLightTheme(brand);

  const sectionBackground = themeVariant?.semanticColors?.bodyBackground;
  const sectionText = themeVariant?.semanticColors?.bodyText;

  return {
    ...base,
    ...(sectionBackground ? { colorNeutralBackground1: sectionBackground } : {}),
    ...(sectionText ? { colorNeutralForeground1: sectionText } : {})
  };
};
