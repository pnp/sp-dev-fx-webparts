import { PaletteGenerator } from "@pnp/spfx-controls-react";
import Color from 'color';
import { theme } from "./ComponentStyles";

interface ThemeColorsInfo {
    Colors: string[],
    Name: string,
    Id: string
}
export enum ThemedPalette {
    ThemeAccents = 1,
    ThemeMonochromatic = 2,
    AccentYellow = 3,
    AccentOrange = 4,
    AccentRed = 5,
    AccentMagenta = 6,
    AccentPurple = 7,
    AccentBlue = 8,
    AccentTeal = 9,
    AccentGreen = 10,
}

export default class ColorsHelper {

    private static _themeAccentColorsLong: string[] = [
        theme.palette.yellowDark,
        theme.palette.yellow,
        theme.palette.yellowLight,
        theme.palette.orange,
        theme.palette.orangeLight,
        theme.palette.orangeLighter,
        theme.palette.orangeLighter,
        theme.palette.redDark,
        theme.palette.red,
        theme.palette.magentaDark,
        theme.palette.magenta,
        theme.palette.magentaLight,
        theme.palette.purpleDark,
        theme.palette.purple,
        theme.palette.purpleLight,
        theme.palette.blueDark,
        theme.palette.blueMid,
        theme.palette.blue,
        theme.palette.blueLight,
        theme.palette.tealDark,
        theme.palette.teal,
        theme.palette.tealLight,
        theme.palette.greenDark,
        theme.palette.green,
        theme.palette.greenLight,
    ]

    private static _themeAccentColors: string[] = [
        theme.palette.blue,
        theme.palette.orangeLight,
        theme.palette.neutralSecondary,
        theme.palette.yellow,
        theme.palette.blueLight,
        theme.palette.greenLight,
    ]

    public static GetThemeMonochromaticColors(palette: ThemedPalette, _length: number): ThemeColorsInfo {
        //fix for PaletteGenerator.generateNonRepeatingGradient(,1) dividing by 0
        //https://github.com/pnp/sp-dev-fx-controls-react/blob/564f4edd0a14f871f8b2debcb314cfb3f531de6a/src/controls/chartControl/PaletteGenerator.ts#L133
        const length = palette !== ThemedPalette.ThemeAccents && _length===1
            ? 2
            : _length;

        switch (palette) {
            case ThemedPalette.ThemeAccents:
                return {
                    Colors: PaletteGenerator.generateRepeatingPattern(ColorsHelper._themeAccentColors, length).slice(0, length),  //ColorsHelper._themeAccentColors.slice(0, length),
                    Name: "Theme Accents",
                    Id: "1"
                }
            case ThemedPalette.ThemeMonochromatic:
                return {
                    Colors: PaletteGenerator.generateNonRepeatingGradient([theme.palette.themeDarkAlt, theme.palette.themeLighter], length),
                    Name: "Current Theme",
                    Id: "2"
                }
            case ThemedPalette.AccentYellow:
                return {
                    Colors: PaletteGenerator.generateNonRepeatingGradient([theme.palette.yellow, theme.palette.white], length),
                    Name: "Yellow",
                    Id: "3"
                }
            case ThemedPalette.AccentOrange:
                return {
                    Colors: PaletteGenerator.generateNonRepeatingGradient([theme.palette.orangeLight, theme.palette.white], length),
                    Name: "Orange",
                    Id: "4"
                }
            case ThemedPalette.AccentRed:
                return {
                    Colors: PaletteGenerator.generateNonRepeatingGradient([theme.palette.red, theme.palette.white], length),
                    Name: "Red",
                    Id: "5"
                }
            case ThemedPalette.AccentMagenta:
                return {
                    Colors: PaletteGenerator.generateNonRepeatingGradient([theme.palette.magenta, theme.palette.white], length),
                    Name: "Magenta",
                    Id: "6"
                }
            case ThemedPalette.AccentPurple:
                return {
                    Colors: PaletteGenerator.generateNonRepeatingGradient([theme.palette.purple, theme.palette.white], length),
                    Name: "Purple",
                    Id: "7"
                }
            case ThemedPalette.AccentBlue:
                return {
                    Colors: PaletteGenerator.generateNonRepeatingGradient([theme.palette.blue, theme.palette.white], length),
                    Name: "Blue",
                    Id: "8"
                }
            case ThemedPalette.AccentTeal:
                return {
                    Colors: PaletteGenerator.generateNonRepeatingGradient([theme.palette.teal, theme.palette.white], length),
                    Name: "Teal",
                    Id: "9"
                }
            case ThemedPalette.AccentGreen:
                return {
                    Colors: PaletteGenerator.generateNonRepeatingGradient([theme.palette.green, theme.palette.white], length),
                    Name: "Green",
                    Id: "10"
                }
        }
    }
    public static GetContrastColor(colorRGBA: string): string {

        const color = Color(colorRGBA);
        //for background white
        if(color.isLight()){
            return theme.palette.black;
        }
        else if(color.isDark() && color.alpha() < 0.5){
            return theme.palette.black;
        }
        else{
            return theme.palette.white;
        }
    }

}
