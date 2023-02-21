import * as React from 'react';

import {
  Depths,
  MotionTimings,
} from 'office-ui-fabric-react';

import { MantineThemeOverride } from '@mantine/core';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export function useMantineThemeFromFluentTheme(theme: IReadonlyTheme): MantineThemeOverride {

    const mantineTheme: MantineThemeOverride = React.useMemo(() => {
        return {
            black: theme.palette.black,
            white: theme.palette.white,
            defaultRadius: "sm",
            colors: {
                "gray": [
                    theme.palette.neutralLighterAlt,
                    theme.palette.neutralLighter,
                    theme.palette.neutralLight,
                    theme.palette.neutralQuaternaryAlt,
                    theme.palette.neutralTertiaryAlt,
                    theme.palette.neutralTertiary,
                    theme.palette.neutralSecondary,
                    theme.palette.neutralPrimaryAlt,
                    theme.palette.neutralPrimary,
                    theme.palette.neutralDark,
                ],
                "theme": [
                    theme.palette.white,
                    theme.palette.themeLighterAlt,
                    theme.palette.themeLighter,
                    theme.palette.themeLight,
                    theme.palette.themeTertiary,
                    theme.palette.themeSecondary,
                    theme.palette.themePrimary,
                    theme.palette.themeDarkAlt,
                    theme.palette.themeDark,
                    theme.palette.themeDarker,
                ]
            },
            primaryColor: 'theme',
            fontFamily: theme.fonts.medium.fontFamily,
            headings: { fontFamily: theme.fonts.large.fontFamily },
            transitionTimingFunction: MotionTimings.decelerate,
            fontSizes: {
                xs: 12,
                sm: 14,
                md: 16,
                lg: 18,
                xl: 20
            },
            spacing: {
                xl: 32,
                lg: 20,
                md: 16,
                sm: 8,
                xs: 4
            },
            radius: {
                xl: 32,
                lg: 16,
                md: 8,
                sm: 4,
                xs: 2
            },
            shadows: {
                xl: theme.effects.elevation64,
                lg: theme.effects.elevation16,
                md: theme.effects.elevation8,
                sm: theme.effects.elevation4,
                xs: Depths.depth0
            },
            breakpoints: {
                xl: 1366,
                lg: 1024,
                md: 640,
                sm: 480,
                xs: 320
            }
        }
    }, [theme]);

    return mantineTheme;
}
