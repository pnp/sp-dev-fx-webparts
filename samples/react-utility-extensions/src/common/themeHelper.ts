/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITheme, getTheme } from "@fluentui/react";

const ThemeState = (<any>window).__themeState__;
// Get theme from global UI fabric state object if exists, if not fall back to using uifabric
export function getThemeColor(slot: string): any {
	if (ThemeState && ThemeState.theme && ThemeState.theme[slot]) {
		return ThemeState.theme[slot];
	}
	const theme = getTheme();
	return theme[slot as keyof ITheme];
}
