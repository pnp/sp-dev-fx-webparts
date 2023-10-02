import { ITheme, getTheme } from '@fluentui/react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ThemeState = (<any>window).__themeState__;

// Get theme from global UI fabric state object if exists, if not fall back to using uifabric    
export function getThemeColor(slot: string): string {
    if (ThemeState && ThemeState.theme && ThemeState.theme[slot]) {
        return ThemeState.theme[slot];
    }
    const theme = getTheme();
    return theme[slot as keyof ITheme] as string;
}