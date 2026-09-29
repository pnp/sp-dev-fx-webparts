import {
  BrandVariants,
  createDarkTheme,
  createLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  Theme
} from '@fluentui/react-components';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

const DEFAULT_PRIMARY: string = '#0f6cbd';

function toRgb(hex: string): number[] {
  const value = hex.replace('#', '');
  const full = value.length === 3 ? value.split('').map(c => c + c).join('') : value;
  return [0, 2, 4].map(i => parseInt(full.substr(i, 2), 16));
}

/** Blends two hex colors; weight is the share of `to` (0..1). */
function mix(from: string, to: string, weight: number): string {
  const a = toRgb(from);
  const b = toRgb(to);
  return '#' + a.map((channel, i) => Math.round(channel + (b[i] - channel) * weight).toString(16).padStart(2, '0')).join('');
}

/** Builds the 16-step Fluent v9 brand ramp around the SharePoint theme primary (step 80). */
function createBrandRamp(primary: string): BrandVariants {
  const ramp: Record<number, string> = {};
  for (let step = 10; step <= 160; step += 10) {
    ramp[step] = step <= 80 ? mix(primary, '#000000', (80 - step) / 80) : mix(primary, '#ffffff', (step - 80) / 90);
  }
  return ramp as unknown as BrandVariants;
}

/**
 * Converts the SharePoint theme (including section background variants) into a Fluent UI v9 theme.
 * Brand colors come from the site palette; surface and text colors come from the semantic slots so the
 * web part blends into neutral, soft and strong sections as well as dark themes.
 */
export function createFluentTheme(spTheme: IReadonlyTheme | undefined): Theme {
  const palette = spTheme?.palette ?? {};
  const semantic = spTheme?.semanticColors ?? {};
  const primary = palette.themePrimary || DEFAULT_PRIMARY;
  const base = spTheme?.isInverted ? createDarkTheme(createBrandRamp(primary)) : createLightTheme(createBrandRamp(primary));

  const candidates: Record<string, string | undefined> = {
    colorNeutralBackground1: semantic.bodyBackground,
    colorNeutralBackground1Hover: semantic.bodyBackgroundHovered,
    colorNeutralBackground2: semantic.bodyStandoutBackground,
    colorNeutralForeground1: semantic.bodyText,
    colorNeutralForeground2: semantic.bodySubtext,
    colorNeutralStroke2: semantic.bodyDivider,
    colorBrandForegroundLink: semantic.link,
    colorBrandForegroundLinkHover: semantic.linkHovered,
    // Section variants adjust the primary button slots so brand surfaces keep their contrast
    // (e.g. a white badge with colored text on a "strong" section).
    colorBrandBackground: semantic.primaryButtonBackground,
    colorBrandBackgroundHover: semantic.primaryButtonBackgroundHovered,
    colorBrandBackgroundPressed: semantic.primaryButtonBackgroundPressed,
    colorNeutralForegroundOnBrand: semantic.primaryButtonText,
    fontFamilyBase: spTheme?.fonts?.medium?.fontFamily
  };
  if (!spTheme?.isInverted) {
    Object.assign(candidates, {
      colorBrandForeground1: palette.themePrimary,
      colorBrandForeground2: palette.themeDarkAlt
    });
  }

  const overrides: Record<string, string> = {};
  Object.keys(candidates).forEach(token => {
    const value = candidates[token];
    if (value) {
      overrides[token] = value;
    }
  });
  return { ...base, ...overrides };
}

/** Maps the Microsoft Teams theme name to the matching Fluent UI v9 theme. */
export function getTeamsTheme(themeName: string | undefined): Theme {
  switch (themeName) {
    case 'dark':
      return teamsDarkTheme;
    case 'contrast':
      return teamsHighContrastTheme;
    default:
      return teamsLightTheme;
  }
}
