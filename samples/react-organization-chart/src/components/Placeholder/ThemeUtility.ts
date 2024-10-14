import {
    mergeThemes,
    ThemeInput,
    teamsTheme,
    teamsDarkTheme,
    teamsHighContrastTheme
  } from "@fluentui/react-northstar";
  import { createTheme, getTheme, IPalette, IPartialTheme, ITheme } from "@fluentui/react/lib/Styling";
  
  import { ComponentVariablesObject } from "@fluentui/styles";
  import { getVariant, VariantThemeType } from "@fluentui/scheme-utilities";
  
  const colorPaletteV2 = {
    black: "#000",
    white: "#fff",
    grey: {
      25: "#fafafa",
      50: "#f5f5f5",
      100: "#f0f0f0",
      150: "#ebebeb",
      200: "#e0e0e0",
      220: "#d6d6d6",
      230: "#d1d1d1",
      250: "#c7c7c7",
      270: "#bdbdbd",
      300: "#b3b3b3",
      310: "#adadad",
      350: "#949494",
      400: "#8a8a8a",
      430: "#707070",
      440: "#666",
      450: "#616161",
      460: "#5c5c5c",
      500: "#424242",
      550: "#3d3d3d",
      600: "#333",
      650: "#2e2e2e",
      700: "#292929",
      750: "#242424",
      800: "#1f1f1f",
      850: "#1a1a1a",
      870: "#141414",
      900: "#0f0f0f",
      910: "#0a0a0a",
    },
    brand: {
      50: "#e9eaf6",
      100: "#dbdcf0",
      200: "#c7c9ff",
      300: "#b2b5ff",
      400: "#a6a7dc",
      450: "#9ea2ff",
      500: "#7479dc",
      600: "#6264a7",
      700: "#494b83",
      800: "#464775",
      900: "#3d3e66",
      1000: "#323348",
    },
  };
  const teamsNextThemeSiteVariables = {
    teamsTheme: {
      theme: "teamsTheme",
      colors: colorPaletteV2,
      colorScheme: {
        elevations: {
          4: "0px 0.3px 0.9px rgba(0, 0, 0, 0.07), 0px 1.6px 3.6px rgba(0, 0, 0, 0.11)",
          8: "0px 3.2px 7.2px rgba(0, 0, 0, 0.13), 0px 0.6px 1.8px rgba(0, 0, 0, 0.11)",
          16: "0px 6.4px 14.4px rgba(0, 0, 0, 0.07), 0px 1.2px 3.6px rgba(0, 0, 0, 0.03)",
        },
        default: {
          foreground: colorPaletteV2.grey["750"],
          foreground1: colorPaletteV2.grey["500"],
          foreground2: colorPaletteV2.grey["450"],
          foreground3: colorPaletteV2.white,
          foreground4: colorPaletteV2.white,
  
          background: colorPaletteV2.white,
          background1: colorPaletteV2.grey["25"],
          background2: colorPaletteV2.grey["50"],
          background3: colorPaletteV2.grey["100"],
          background4: colorPaletteV2.grey["150"],
          background5: colorPaletteV2.grey["200"],
  
          border: colorPaletteV2.grey["230"],
          border1: colorPaletteV2.grey["100"],
          border2: colorPaletteV2.grey["200"],
          border3: colorPaletteV2.grey["100"],
  
          foregroundHover: colorPaletteV2.grey["750"],
          foregroundHover1: colorPaletteV2.white,
          foregroundHover2: colorPaletteV2.white,
  
          backgroundHover: colorPaletteV2.grey["50"],
          backgroundHover1: colorPaletteV2.grey["25"],
          backgroundHover2: "transparent",
          backgroundHover3: colorPaletteV2.grey["150"],
          backgroundHover4: colorPaletteV2.grey["25"],
  
          borderHover: colorPaletteV2.grey["250"],
  
          foregroundPressed: colorPaletteV2.grey["750"],
          backgroundPressed: colorPaletteV2.grey["200"],
  
          foregroundActive: colorPaletteV2.grey["750"],
          foregroundActive1: colorPaletteV2.white,
  
          backgroundActive: colorPaletteV2.grey["150"],
          backgroundActive1: colorPaletteV2.white,
  
          borderActive: colorPaletteV2.grey["270"],
  
          // foregroundFocus: not specified,
          // backgroundFocus: not specified,
  
          borderFocus: colorPaletteV2.black,
          borderFocusWithin: colorPaletteV2.white,
  
          foregroundDisabled: colorPaletteV2.grey["250"],
          foregroundDisabled1: colorPaletteV2.grey["250"],
  
          borderDisabled: colorPaletteV2.grey["200"],
  
          backgroundDisabled: colorPaletteV2.grey["100"],
          backgroundDisabled1: colorPaletteV2.grey["100"],
        },
        brand: {
          background: colorPaletteV2.brand["600"],
          background1: colorPaletteV2.brand["50"],
          background2: colorPaletteV2.brand["900"],
          background3: colorPaletteV2.brand["1000"],
          background4: colorPaletteV2.brand["800"],
  
          foreground: colorPaletteV2.brand["600"],
          foreground1: colorPaletteV2.brand["600"],
          foreground2: colorPaletteV2.brand["700"],
          foreground3: colorPaletteV2.brand["200"],
          foreground4: colorPaletteV2.white,
  
          border: colorPaletteV2.grey["200"],
          border1: colorPaletteV2.brand["300"],
          border2: colorPaletteV2.brand["200"],
  
          foregroundHover: colorPaletteV2.brand["600"],
          foregroundHover1: colorPaletteV2.white,
          foregroundHover2: colorPaletteV2.brand["200"],
  
          borderHover: colorPaletteV2.brand["300"],
  
          backgroundHover: colorPaletteV2.brand["700"],
          backgroundHover1: colorPaletteV2.brand["50"],
  
          foregroundPressed: colorPaletteV2.brand["700"],
          foregroundPressed1: colorPaletteV2.white,
  
          backgroundPressed: colorPaletteV2.brand["800"],
  
          borderPressed: colorPaletteV2.brand["300"],
  
          foregroundActive: colorPaletteV2.brand["600"],
          foregroundActive1: colorPaletteV2.brand["600"],
          foregroundActive2: colorPaletteV2.brand["50"],
  
          backgroundActive: colorPaletteV2.brand["600"],
          backgroundActive1: colorPaletteV2.brand["600"],
  
          borderActive: colorPaletteV2.grey["200"],
          borderActive1: colorPaletteV2.brand["50"],
          borderActive2: colorPaletteV2.brand["300"],
  
          foregroundFocus: colorPaletteV2.brand["600"],
          foregroundFocus1: colorPaletteV2.brand["600"],
          foregroundFocus2: colorPaletteV2.brand["700"],
          foregroundFocus3: colorPaletteV2.brand["50"],
          foregroundFocus4: colorPaletteV2.white,
  
          backgroundFocus: colorPaletteV2.brand["600"],
          backgroundFocus1: colorPaletteV2.brand["50"],
          backgroundFocus2: colorPaletteV2.brand["900"],
          backgroundFocus3: colorPaletteV2.brand["1000"],
  
          borderFocus: colorPaletteV2.black,
          borderFocus1: colorPaletteV2.brand["600"],
  
          borderFocusWithin: colorPaletteV2.white,
  
          foregroundDisabled: colorPaletteV2.grey["250"],
          foregroundDisabled1: colorPaletteV2.grey["250"],
  
          borderDisabled: colorPaletteV2.grey["550"],
  
          backgroundDisabled: colorPaletteV2.grey["100"],
          backgroundDisabled1: colorPaletteV2.grey["100"],
        },
      },
    },
    teamsDarkTheme: {
      theme: "teamsDarkTheme",
      colors: colorPaletteV2,
      colorScheme: {
        elevations: {
          8: "0px 3.2px 7.2px rgba(0, 0, 0, 0.13), 0px 0.6px 1.8px rgba(0, 0, 0, 0.11)",
          16: "0px 6.4px 14.4px rgba(0, 0, 0, 0.32), 0px 1.2px 3.6px rgba(0, 0, 0, 0.28)",
        },
        default: {
          foreground: colorPaletteV2.white,
          foreground1: colorPaletteV2.grey["220"],
          foreground2: colorPaletteV2.grey["310"],
          foreground3: colorPaletteV2.white,
          foreground4: colorPaletteV2.white,
  
          background: colorPaletteV2.grey["700"],
          background1: colorPaletteV2.grey["750"],
          background2: colorPaletteV2.grey["800"],
          background3: colorPaletteV2.grey["870"],
          background4: colorPaletteV2.grey["550"],
          background5: colorPaletteV2.grey["600"],
  
          border: colorPaletteV2.grey["450"],
          border1: colorPaletteV2.grey["850"],
          border2: colorPaletteV2.grey["900"],
          border3: colorPaletteV2.grey["550"],
  
          foregroundHover: colorPaletteV2.white,
          foregroundHover1: colorPaletteV2.white,
          foregroundHover2: colorPaletteV2.white,
  
          backgroundHover: colorPaletteV2.grey["550"],
          backgroundHover1: colorPaletteV2.grey["750"],
          backgroundHover2: "transparent",
          backgroundHover3: colorPaletteV2.grey["650"],
          backgroundHover4: colorPaletteV2.grey["750"],
  
          borderHover: colorPaletteV2.grey["430"],
  
          foregroundPressed: colorPaletteV2.white,
          backgroundPressed: colorPaletteV2.grey["650"],
  
          foregroundActive: colorPaletteV2.white,
          foregroundActive1: colorPaletteV2.white,
  
          backgroundActive: colorPaletteV2.grey["600"],
          backgroundActive1: colorPaletteV2.grey["800"],
  
          borderActive: colorPaletteV2.grey["440"],
  
          // foregroundFocus: not specified,
          // backgroundFocus: not specified,
  
          borderFocus: colorPaletteV2.white,
          borderFocusWithin: colorPaletteV2.black,
  
          foregroundDisabled: colorPaletteV2.grey["460"],
          foregroundDisabled1: colorPaletteV2.grey["460"],
  
          borderDisabled: colorPaletteV2.grey["500"],
  
          backgroundDisabled: colorPaletteV2.grey["800"],
          backgroundDisabled1: colorPaletteV2.grey["800"],
        },
        brand: {
          background: colorPaletteV2.brand["600"],
          background1: colorPaletteV2.brand["1000"],
          background2: colorPaletteV2.brand["900"],
          background3: colorPaletteV2.brand["1000"],
          background4: colorPaletteV2.grey["910"],
  
          foreground: colorPaletteV2.brand["450"],
          foreground1: colorPaletteV2.brand["450"],
          foreground2: colorPaletteV2.brand["450"],
          foreground3: colorPaletteV2.brand["200"],
          foreground4: colorPaletteV2.white,
  
          border: colorPaletteV2.grey["450"],
          border1: colorPaletteV2.brand["800"],
          border2: colorPaletteV2.brand["800"],
  
          foregroundHover: colorPaletteV2.brand["450"],
          foregroundHover1: colorPaletteV2.white,
          foregroundHover2: colorPaletteV2.brand["200"],
  
          borderHover: colorPaletteV2.brand["600"],
  
          backgroundHover: colorPaletteV2.brand["700"],
          backgroundHover1: colorPaletteV2.brand["900"],
  
          foregroundPressed: colorPaletteV2.brand["200"],
          foregroundPressed1: colorPaletteV2.white,
  
          backgroundPressed: colorPaletteV2.brand["800"],
  
          borderPressed: colorPaletteV2.brand["800"],
  
          foregroundActive: colorPaletteV2.brand["450"],
          foregroundActive1: colorPaletteV2.brand["450"],
          foregroundActive2: colorPaletteV2.brand["50"],
  
          backgroundActive: colorPaletteV2.brand["450"],
          backgroundActive1: colorPaletteV2.brand["450"],
  
          borderActive: colorPaletteV2.grey["450"],
          borderActive1: colorPaletteV2.brand["800"],
          borderActive2: colorPaletteV2.brand["800"],
  
          foregroundFocus: colorPaletteV2.brand["450"],
          foregroundFocus1: colorPaletteV2.brand["450"],
          foregroundFocus2: colorPaletteV2.brand["450"],
          foregroundFocus3: colorPaletteV2.brand["50"],
          foregroundFocus4: colorPaletteV2.white,
  
          backgroundFocus: colorPaletteV2.brand["450"],
          backgroundFocus1: colorPaletteV2.brand["1000"],
          backgroundFocus2: colorPaletteV2.brand["900"],
          backgroundFocus3: colorPaletteV2.brand["1000"],
  
          borderFocus: colorPaletteV2.white,
          borderFocus1: colorPaletteV2.brand["450"],
  
          borderFocusWithin: colorPaletteV2.black,
  
          foregroundDisabled: colorPaletteV2.grey["460"],
          foregroundDisabled1: colorPaletteV2.grey["460"],
  
          borderDisabled: colorPaletteV2.grey["500"],
  
          backgroundDisabled: colorPaletteV2.grey["800"],
          backgroundDisabled1: colorPaletteV2.grey["800"],
        },
      },
    },
    teamsHighContrastTheme: {
      theme: "teamsHighContrastTheme",
      colorScheme: {
        elevations: {
          8: "none",
          16: "none",
        },
      },
    },
  };
  export const themes: { [themeKey: string]: ThemeInput<any> } = { // eslint-disable-line @typescript-eslint/no-explicit-any
    teamsTheme: mergeThemes(teamsTheme, {
      siteVariables: teamsNextThemeSiteVariables.teamsTheme,
    }),
    teamsDarkTheme: mergeThemes(teamsDarkTheme, {
      siteVariables: teamsNextThemeSiteVariables.teamsDarkTheme,
    }),
    teamsHighContrastTheme: mergeThemes(teamsHighContrastTheme, {
      siteVariables: teamsNextThemeSiteVariables.teamsHighContrastTheme,
    }),
  };
  export const teamsNextVariableAssignments = {
    componentStyles: {
      Box: {
        root: ({ variables }: ComponentVariablesObject) => ({
          backgroundColor: variables.backgroundColor,
          boxShadow: variables.elevation,
        }),
      },
      Button: {
        root: ({ variables }: ComponentVariablesObject) => ({
          color: variables.color,
        }),
      },
      ButtonContent: {
        root: ({ variables }: ComponentVariablesObject) => ({
          fontWeight: variables.fontWeight,
        }),
      },
      Card: {
        root: ({ variables }: ComponentVariablesObject) => ({
          boxShadow: variables.elevation,
          "&:hover": { boxShadow: variables.hoverElevation },
          "&:focus": { boxShadow: variables.elevation },
        }),
      },
      Flex: {
        root: ({ variables }: ComponentVariablesObject) => ({
          color: variables.color,
          backgroundColor: variables.backgroundColor,
          boxShadow: variables.elevation,
        }),
      },
      ToolbarItem: {
        root: ({ variables }: ComponentVariablesObject) => ({
          color: variables.color,
          fontWeight: variables.fontWeight,
        }),
      },
      PopupContent: {
        content: ({ variables }: ComponentVariablesObject) => ({
          boxShadow: variables.elevation,
          borderWidth: variables.borderWidth,
        }),
      },
      PopupButton: {
        root: ({ variables }: ComponentVariablesObject) => ({
          color: variables.color,
        }),
      },
      TableRow: {
        root: ({ variables }: ComponentVariablesObject) => ({
          height: variables.compactRow
            ? variables.compactRowHeight
            : variables.defaultRowHeight,
          minHeight: variables.compactRow
            ? variables.compactRowMinHeight
            : variables.defaultRowMinHeight,
          alignItems: variables.cellVerticalAlignment,
        }),
      },
      TableCell: {
        root: ({ variables }: ComponentVariablesObject) => ({
          paddingTop: variables.compactRow
            ? variables.compactRowVerticalPadding
            : variables.defaultRowVerticalPadding,
          paddingBottom: variables.compactRow
            ? variables.compactRowVerticalPadding
            : variables.defaultRowVerticalPadding,
        }),
      },
      TreeItem: {
        root: ({ variables }: ComponentVariablesObject) => ({
          color: variables.color,
        }),
      },
    },
  };
  
  export const getFluentUIThemeOrDefault = (theme?: IPartialTheme | ITheme): ITheme => {
    let currentTheme;
  
    if (theme) {
      currentTheme = getVariant(theme, VariantThemeType.None);
    } else {
      const themeColorsFromWindow: Partial<IPalette> = window.__themeState__?.theme;
      if (themeColorsFromWindow) {
        currentTheme = createTheme({
          palette: themeColorsFromWindow
        });
      }
      else {
        currentTheme = getTheme();
      }
    }
  
    return currentTheme;
  };