import { ITheme } from '@fluentui/react/lib/Styling';
import { useTheme } from '@fluentui/react/lib/Theme';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

/** The colours this web part paints with. */
export interface IThemeColors {
  bodyText: string;
  bodySubtext: string;
  bodyBackground: string;
  bodyStandoutBackground: string;
  bodyDivider: string;
  accent: string;
}

/**
 * Picks the colours to draw with.
 *
 * The section theme variant wins when the web part sits in a section that has
 * its own background, which is what `supportsThemeVariants` in the manifest
 * opts into. A variant may carry only part of a palette, so each colour falls
 * back on its own to the theme Fluent already has loaded, which on a
 * SharePoint page is the site theme.
 */
export function resolveThemeColors(
  themeVariant: IReadonlyTheme | undefined,
  fallback: ITheme
): IThemeColors {
  const semantic = themeVariant ? themeVariant.semanticColors : undefined;
  const palette = themeVariant ? themeVariant.palette : undefined;

  return {
    bodyText: (semantic && semantic.bodyText) || fallback.semanticColors.bodyText,
    bodySubtext: (semantic && semantic.bodySubtext) || fallback.semanticColors.bodySubtext,
    bodyBackground: (semantic && semantic.bodyBackground) || fallback.semanticColors.bodyBackground,
    bodyStandoutBackground:
      (semantic && semantic.bodyStandoutBackground) ||
      fallback.semanticColors.bodyStandoutBackground,
    bodyDivider: (semantic && semantic.bodyDivider) || fallback.semanticColors.bodyDivider,
    accent: (palette && palette.themePrimary) || fallback.palette.themePrimary
  };
}

/** {@link resolveThemeColors}, with the loaded Fluent theme as the fallback. */
export function useThemeColors(themeVariant: IReadonlyTheme | undefined): IThemeColors {
  return resolveThemeColors(themeVariant, useTheme());
}
