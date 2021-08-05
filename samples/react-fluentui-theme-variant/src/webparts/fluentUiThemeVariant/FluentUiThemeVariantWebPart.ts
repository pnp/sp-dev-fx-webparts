import { IReadonlyTheme, ThemeChangedEventArgs, ThemeProvider } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import { isEqual } from '@microsoft/sp-lodash-subset';
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';
import { PropertyFieldMessage } from '@pnp/spfx-property-controls/lib/PropertyFieldMessage';
import * as strings from 'FluentUiThemeVariantWebPartStrings';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BackgroundShadingType, IContrastRatioPair, IThemeService, ThemeService, ThemeType } from '../../services/ThemeService';
import FluentUiThemeVariant, { IFluentUiThemeVariantProps } from './components/FluentUiThemeVariant';

export interface IFluentUiThemeVariantWebPartProps {
  themeType: ThemeType;
  backgroundShadingType: BackgroundShadingType;
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
}

export default class FluentUiThemeVariantWebPart extends BaseClientSideWebPart<IFluentUiThemeVariantWebPartProps> {
  private themeService: IThemeService;
  protected themeProvider: ThemeProvider;
  protected themeVariant: IReadonlyTheme;

  protected onInit(): Promise<void> {
    this.themeService = this.context.serviceScope.consume<IThemeService>(ThemeService.ServiceKey);

    this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this.themeVariant = this.themeProvider.tryGetTheme();
    this.themeProvider.themeChangedEvent.add(this, (args: ThemeChangedEventArgs): void => {
      if (!isEqual(this.themeVariant, args.theme)) {
        this.themeVariant = args.theme;
        this.themeService.setThemeVariant(this.themeVariant);
        this.render();
      }
    });

    if (!this.properties.primaryColor)
      this.properties.primaryColor = "#0078d4";

    if (!this.properties.textColor)
      this.properties.textColor = "#323130";

    if (!this.properties.backgroundColor)
      this.properties.backgroundColor = "#ffffff";


    this.themeService.setThemeVariant(this.themeVariant);
    this.themeService.setCustomColors(this.properties.primaryColor, this.properties.textColor, this.properties.backgroundColor);

    return super.onInit();
  }

  public render(): void {

    const element: React.ReactElement<IFluentUiThemeVariantProps> = React.createElement(
      FluentUiThemeVariant,
      {
        themeVariant: this.themeService.generateTheme(
          this.properties.themeType,
          this.properties.backgroundShadingType)
      }
    );

    ReactDom.render(element, this.domElement);
  }



  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    let inlineSvgNone = this.generateInlineSvgForBackgroundShadingType(BackgroundShadingType.none);
    let inlineSvgNeutral = this.generateInlineSvgForBackgroundShadingType(BackgroundShadingType.neutral);
    let inlineSvgSoft = this.generateInlineSvgForBackgroundShadingType(BackgroundShadingType.soft);
    let inlineSvgStrong = this.generateInlineSvgForBackgroundShadingType(BackgroundShadingType.strong);

    console.log(inlineSvgNone);
    console.log(inlineSvgStrong);

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('themeType', {
                  label: strings.ThemeTypeField,
                  options: [
                    { key: ThemeType.current, text: strings.Texts.Current },
                    { key: ThemeType.section, text: strings.Texts.Section },
                    { key: ThemeType.custom, text: strings.Texts.Custom }
                  ]
                }),
                // PropertyFieldMessage("", {
                //   key: "colorPaletteAccessibilityErrors",
                //   text: this.getNonAccessiblePairsMessage(this.themeService.getNonAccessiblePairs()),
                //   multiline: true,
                //   messageType: MessageBarType.warning,
                //   isVisible: this.properties.themeType == ThemeType.custom && this.themeService.getNonAccessiblePairs().length > 0,
                // }),
                PropertyFieldColorPicker('primaryColor', {
                  label: strings.PrimaryColorField,
                  selectedColor: this.properties.primaryColor,
                  onPropertyChange: this.onCustomPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: this.properties.themeType != ThemeType.custom,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Color',
                  key: 'primaryColorFieldId'
                }),
                PropertyFieldColorPicker('textColor', {
                  label: strings.TextColorField,
                  selectedColor: this.properties.textColor,
                  onPropertyChange: this.onCustomPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: this.properties.themeType != ThemeType.custom,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Color',
                  key: 'textColorFieldId'
                }),
                PropertyFieldColorPicker('backgroundColor', {
                  label: strings.BackgroundColorField,
                  selectedColor: this.properties.backgroundColor,
                  onPropertyChange: this.onCustomPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: this.properties.themeType != ThemeType.custom,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Color',
                  key: 'backgroundColorFieldId'
                }),
                PropertyPaneChoiceGroup('backgroundShadingType', {
                  label: strings.BackgroundShadingTypeField,
                  options: [{
                    key: BackgroundShadingType.none,
                    text: strings.Texts.None,
                    imageSize: {
                      width: 40,
                      height: 40
                    },
                    imageSrc: inlineSvgNone,
                    selectedImageSrc: inlineSvgNone
                  },
                  {
                    key: BackgroundShadingType.neutral,
                    text: strings.Texts.Neutral,
                    imageSize: {
                      width: 40,
                      height: 40
                    },
                    imageSrc: inlineSvgNeutral,
                    selectedImageSrc: inlineSvgNeutral
                  },
                  {
                    key: BackgroundShadingType.soft,
                    text: strings.Texts.Soft,
                    imageSize: {
                      width: 40,
                      height: 40
                    },
                    imageSrc: inlineSvgSoft,
                    selectedImageSrc: inlineSvgSoft
                  },
                  {
                    key: BackgroundShadingType.strong,
                    text: strings.Texts.Strong,
                    imageSize: {
                      width: 40,
                      height: 40
                    },
                    imageSrc: inlineSvgStrong,
                    selectedImageSrc: inlineSvgStrong
                  }]
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private generateInlineSvgForBackgroundShadingType(type: BackgroundShadingType): string {
    let currentTheme = this.themeService.generateTheme(this.properties.themeType, type);
    let backgroundColor = currentTheme.semanticColors.bodyBackground.replace("#", "%23");
    let textColor = currentTheme.semanticColors.bodyText.replace("#", "%23");

    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='45' height='45'%3E%3Crect x='0' y='0' width='45' height='45' stroke='black' stroke-width='2px' fill='${backgroundColor}'/%3E%3Ctext fill='${textColor}' font-family='Segoe UI, sans-serif' x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle'%3EAa%3C/text%3E%3C/svg%3E`;
  }

  private onCustomPropertyPaneFieldChanged = (targetProperty: string, oldValue: string, newValue: string) => {
    if (targetProperty == "primaryColor" || targetProperty == "textColor" || targetProperty == "backgroundColor") {
      this.themeService.setCustomColors(this.properties.primaryColor, this.properties.textColor, this.properties.backgroundColor);
      //this.themeService.calculateContrastRatioPairs();
    }

    this.onPropertyPaneFieldChanged(targetProperty, oldValue, newValue);
  }

  // private getNonAccessiblePairsMessage(contrastRatios: IContrastRatioPair[]): string {
  //   let message = `Your color palette has ${this.themeService.getNonAccessiblePairs().length} accessibility errors:`;

  //   contrastRatios.forEach((element, index) => {
  //     message += (index > 0) ? `, ${element.colorPair}` : ` ${element.colorPair}`;
  //   });

  //   return message;
  // }
}

