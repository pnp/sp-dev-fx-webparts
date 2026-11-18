import type { IReadonlyTheme } from '@microsoft/sp-component-base';
import type { Theme } from '@fluentui/react-components';
import {
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  webLightTheme
} from '@fluentui/react-components';
import { createV9ThemeFromSp, type ISpThemeEffects, type ISpThemePalette } from './spThemeToV9';

export type TeamsAppTheme = 'default' | 'dark' | 'contrast';

export function createAppTheme(
  spTheme: IReadonlyTheme | undefined,
  teamsTheme: TeamsAppTheme | undefined
): Theme {
  if (teamsTheme === 'dark') {
    return teamsDarkTheme;
  }
  if (teamsTheme === 'contrast') {
    return teamsHighContrastTheme;
  }
  if (spTheme?.palette) {
    const base: Theme = spTheme.isInverted ? teamsDarkTheme : webLightTheme;
    return createV9ThemeFromSp(
      spTheme.palette as ISpThemePalette,
      spTheme.effects as ISpThemeEffects,
      !!spTheme.isInverted,
      base
    );
  }
  return teamsTheme === 'default' ? teamsLightTheme : webLightTheme;
}
