import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
/**
 * Use this for dynamic properties
 */
import { DynamicProperty } from '@microsoft/sp-component-base';
/**
 * Plain old boring web part thingies
 */
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from '@microsoft/sp-webpart-base';
export interface IEnhancedPowerAppsWebPartProps {
    dynamicProp: DynamicProperty<string>;
    appWebLink: string;
    useDynamicProp: boolean;
    dynamicPropName: string;
    border: boolean;
    layout: 'FixedHeight' | 'AspectRatio';
    height: number;
    width: number;
    aspectratio: '16:9' | '3:2' | '16:10' | '4:3' | 'Custom';
    themeValues: string[];
}
export default class EnhancedPowerAppsWebPart extends BaseClientSideWebPart<IEnhancedPowerAppsWebPartProps> {
    private _themeProvider;
    private _themeVariant;
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    protected readonly propertiesMetadata: IWebPartPropertiesMetadata;
    private _onConfigure;
    /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
    private _handleThemeChangedEvent;
}
//# sourceMappingURL=EnhancedPowerAppsWebPart.d.ts.map