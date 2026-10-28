import { createTheme, getTheme, IPalette, IPartialTheme, ITheme } from "@fluentui/react/lib/Styling";

export const getFluentUIThemeOrDefault = (theme?: IPartialTheme | ITheme): ITheme => {
  if (theme) {
    return createTheme(theme);
  }

  const themeColorsFromWindow: Partial<IPalette> = window.__themeState__?.theme;
  if (themeColorsFromWindow) {
    return createTheme({
      palette: themeColorsFromWindow
    });
  }

  return getTheme();
};
