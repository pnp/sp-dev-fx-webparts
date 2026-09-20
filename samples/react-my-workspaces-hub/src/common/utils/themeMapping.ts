import {
  Theme,
  webLightTheme,
  webDarkTheme,
  teamsLightTheme,
  teamsDarkTheme,
  teamsHighContrastTheme
} from '@fluentui/react-components';

export interface IResolveFluentThemeOptions {
  isDark: boolean;
  hasTeamsContext: boolean;
  isHighContrast?: boolean;
}

/**
 * Maps the current SharePoint / Teams host theme onto the matching Fluent UI v9 theme
 * so that copied v9 components render consistently inside the web part.
 */
export const resolveFluentTheme = (options: IResolveFluentThemeOptions): Theme => {
  if (options.isHighContrast) {
    return teamsHighContrastTheme;
  }

  if (options.hasTeamsContext) {
    return options.isDark ? teamsDarkTheme : teamsLightTheme;
  }

  return options.isDark ? webDarkTheme : webLightTheme;
};

