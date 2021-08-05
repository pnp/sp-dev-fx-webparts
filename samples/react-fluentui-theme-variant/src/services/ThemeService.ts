import { Theme } from "@fluentui/react-theme-provider";
import { getNeutralVariant, getSoftVariant, getStrongVariant } from "@fluentui/scheme-utilities/lib/variants";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { BaseSlots, createTheme, FabricSlots, getColorFromString, getContrastRatio, getTheme, IColor, isDark, ThemeGenerator, themeRulesStandardCreator } from "office-ui-fabric-react";

export interface IContrastRatioPair {
    contrastRatioValue: string;
    contrastRatioPair: string;
    colorPair: string;
}

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
    setCustomColors(primaryColor: string, textColor: string, backgroundColor: string): void;
    setThemeVariant(themeVariant: IReadonlyTheme | Theme): void;
    generateTheme(themeType: ThemeType, backgroundShadingType: BackgroundShadingType): IReadonlyTheme | Theme;
}

const ThemeService_ServiceKey = 'ReactFluentUIThemeVariant:ThemeService';

export class ThemeService implements IThemeService {
    public static ServiceKey: ServiceKey<IThemeService> = ServiceKey.create(ThemeService_ServiceKey, ThemeService);
    private serviceScope: ServiceScope;
    private themeRules = themeRulesStandardCreator();

    private themeVariant: IReadonlyTheme | Theme;
    private primaryColor: string;
    private textColor: string;
    private backgroundColor: string;

    public constructor(serviceScope: ServiceScope) {
        this.serviceScope = serviceScope;
    }

    public setCustomColors(primaryColor: string, textColor: string, backgroundColor: string): void {
        if (!primaryColor)
            throw 'primaryColor == null or undefined';
        else
            this.primaryColor = primaryColor;

        if (!textColor)
            throw 'textColor == null or undefined';
        else
            this.textColor = textColor;

        if (!backgroundColor)
            throw 'backgroundColor == null or undefined';
        this.backgroundColor = backgroundColor;
    }

    public setThemeVariant(themeVariant: IReadonlyTheme | Theme): void {
        this.themeVariant = themeVariant;
    }

    public generateTheme(themeType: ThemeType, backgroundShadingType: BackgroundShadingType): IReadonlyTheme | Theme {
        let currentTheme: IReadonlyTheme | Theme;

        switch (themeType) {
            case ThemeType.current: currentTheme = this.getDefaultTheme();
                break;
            case ThemeType.section: currentTheme = this.themeVariant;
                break;
            case ThemeType.custom: currentTheme = this.generateThemeFromColors();
                break;
        }

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

    private generateThemeFromColors(): Theme {
        ThemeGenerator.setSlot(this.themeRules[BaseSlots[BaseSlots.primaryColor]], getColorFromString(this.primaryColor), false, true, true);
        ThemeGenerator.setSlot(this.themeRules[BaseSlots[BaseSlots.foregroundColor]], getColorFromString(this.textColor), false, true, true);
        ThemeGenerator.setSlot(this.themeRules[BaseSlots[BaseSlots.backgroundColor]], getColorFromString(this.backgroundColor), false, true, true);
        ThemeGenerator.insureSlots(this.themeRules, false);

        let generatedTheme = createTheme({
            ...{ palette: ThemeGenerator.getThemeAsJson(this.themeRules) },
            isInverted: isDark(this.themeRules[BaseSlots[BaseSlots.backgroundColor]].color!),
        });

        return generatedTheme;
    }
}