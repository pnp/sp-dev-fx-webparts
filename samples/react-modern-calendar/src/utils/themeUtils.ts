import { teamsDarkTheme, teamsHighContrastTheme, teamsLightTheme } from "@fluentui/react-components";

import { Theme as FUI9Theme } from "@fluentui/react-components";
import { Theme } from "@fluentui/react";
import { createV9Theme } from '@fluentui/react-migration-v8-v9';

export const convertThemeV8toV9 = (theme: Theme, hasTeamsContext:boolean, themeString:string):FUI9Theme => {
    if (hasTeamsContext) {
      return themeString === "dark"
        ? teamsDarkTheme
        : themeString === "contrast"
        ? teamsHighContrastTheme
        : {
            ...teamsLightTheme,
          };
    } else {
      const V9theme = createV9Theme(theme as Theme);
      return V9theme;
    }
};