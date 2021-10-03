import { Theme } from "@fluentui/react-theme-provider";
import { getNeutralVariant, getSoftVariant, getStrongVariant } from "@fluentui/scheme-utilities/lib/variants";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { createTheme, getTheme, IPalette } from "office-ui-fabric-react";

export enum ThemeType {
    current = "current",
    section = "section",
    custom = "custom"
}

export enum BackgroundShadingType {
    none = "none",
    neutral = "neutral",
    soft = "soft",
    strong = "strong"
}

export interface IThemeService {
    generateTheme(themeType: ThemeType, backgroundShadingType: BackgroundShadingType, themeVariant: IReadonlyTheme | Theme, palette: Partial<IPalette>): IReadonlyTheme | Theme;
}

const ThemeService_ServiceKey = 'ReactFluentUIThemeVariant:ThemeService';

export class ThemeService implements IThemeService {
    public static ServiceKey: ServiceKey<IThemeService> = ServiceKey.create(ThemeService_ServiceKey, ThemeService);
    private serviceScope: ServiceScope;

    public constructor(serviceScope: ServiceScope) {
        this.serviceScope = serviceScope;
    }

    public generateTheme(themeType: ThemeType,
        backgroundShadingType: BackgroundShadingType,
        themeVariant: IReadonlyTheme | Theme,
        palette: Partial<IPalette>): IReadonlyTheme | Theme {
        let currentTheme: IReadonlyTheme | Theme;

        switch (themeType) {
            case ThemeType.current: currentTheme = this.getDefaultTheme();
                break;
            case ThemeType.section: currentTheme = themeVariant;
                break;
            case ThemeType.custom: currentTheme = this.generateThemeFromPalette(palette);
                break;
        }

        if (themeType == ThemeType.section)
            return currentTheme;

        switch (backgroundShadingType) {
            case BackgroundShadingType.none: currentTheme = currentTheme;
                break;
            case BackgroundShadingType.neutral: currentTheme = getNeutralVariant(currentTheme);
                break;
            case BackgroundShadingType.soft: currentTheme = getSoftVariant(currentTheme);
                break;
            case BackgroundShadingType.strong: currentTheme = getStrongVariant(currentTheme);
                break;
        }

        return currentTheme;
    }

    private getDefaultTheme(): Theme {
        let currentTheme;
        const themeColorsFromWindow: any = (window as any).__themeState__.theme;
        if (themeColorsFromWindow) {
            currentTheme = createTheme({
                palette: themeColorsFromWindow
            });
        }
        else
            currentTheme = getTheme();

        return currentTheme;
    }

    private generateThemeFromPalette(palette: Partial<IPalette>): Theme {
        let generatedTheme = createTheme({
            ...{ palette: palette }
        });

        return generatedTheme;
    }
}



