import { IReadonlyTheme, ThemeChangedEventArgs, ThemeProvider } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import { isEqual } from '@microsoft/sp-lodash-subset';
import {
  IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'FluentUiThemeVariantWebPartStrings';
import { MessageBarType } from 'office-ui-fabric-react/lib/components/MessageBar';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BackgroundShadingType, IThemeService, ThemeService, ThemeType } from '../../services/ThemeService';
import FluentUiThemeVariant, { IFluentUiThemeVariantProps } from './components/FluentUiThemeVariant';

export interface IFluentUiThemeVariantWebPartProps {
  themeType: ThemeType;
  backgroundShadingType: BackgroundShadingType;
  customPalette: string;
}

export default class FluentUiThemeVariantWebPart extends BaseClientSideWebPart<IFluentUiThemeVariantWebPartProps> {
  private themeService: IThemeService;

  protected themeProvider: ThemeProvider;
  protected themeVariant: IReadonlyTheme;

  protected propertyFieldCodeEditor;
  protected propertyFieldCodeEditorLanguages;
  protected propertyFieldMessage;

  protected onInit(): Promise<void> {
    this.themeService = this.context.serviceScope.consume<IThemeService>(ThemeService.ServiceKey);

    this.themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this.themeVariant = this.themeProvider.tryGetTheme();
    this.themeProvider.themeChangedEvent.add(this, (args: ThemeChangedEventArgs): void => {
      if (!isEqual(this.themeVariant, args.theme)) {
        this.themeVariant = args.theme;
        this.render();
      }
    });

    if (!this.properties.themeType)
      this.properties.themeType = ThemeType.section;

    if (!this.properties.backgroundShadingType)
      this.properties.backgroundShadingType = BackgroundShadingType.none;

    if (!this.properties.customPalette)
      this.properties.customPalette =
        JSON.stringify(
          JSON.parse(
            `{
              "themePrimary": "#0078d4",
              "themeLighterAlt": "#eff6fc",
              "themeLighter": "#deecf9",
              "themeLight": "#c7e0f4",
              "themeTertiary": "#71afe5",
              "themeSecondary": "#2b88d8",
              "themeDarkAlt": "#106ebe",
              "themeDark": "#005a9e",
              "themeDarker": "#004578",
              "neutralLighterAlt": "#faf9f8",
              "neutralLighter": "#f3f2f1",
              "neutralLight": "#edebe9",
              "neutralQuaternaryAlt": "#e1dfdd",
              "neutralQuaternary": "#d0d0d0",
              "neutralTertiaryAlt": "#c8c6c4",
              "neutralTertiary": "#a19f9d",
              "neutralSecondary": "#605e5c",
              "neutralPrimaryAlt": "#3b3a39",
              "neutralPrimary": "#323130",
              "neutralDark": "#201f1e",
              "black": "#000000",
              "white": "#ffffff"
            }`
          ), null, 2);

    return super.onInit();
  }

  public render(): void {

    const currentTheme = this.themeService.generateTheme(
      this.properties.themeType,
      this.properties.backgroundShadingType,
      this.themeVariant,
      JSON.parse(this.properties.customPalette));

    const element: React.ReactElement<IFluentUiThemeVariantProps> = React.createElement(
      FluentUiThemeVariant,
      {
        themeVariant: currentTheme
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

  protected async loadPropertyPaneResources(): Promise<void> {
    const { PropertyFieldCodeEditor, PropertyFieldCodeEditorLanguages } = await import(
      /* webpackChunkName: 'pnp-controls-property-field-code-editor' */
      '@pnp/spfx-property-controls/lib/PropertyFieldCodeEditor'
    );
    this.propertyFieldCodeEditor = PropertyFieldCodeEditor;
    this.propertyFieldCodeEditorLanguages = PropertyFieldCodeEditorLanguages;

    const { PropertyFieldMessage } = await import(
      /* webpackChunkName: 'pnp-controls-property-field-message' */
      '@pnp/spfx-property-controls/lib/PropertyFieldMessage'
    );
    this.propertyFieldMessage = PropertyFieldMessage;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    let inlineSvgNone = this.generateInlineSvgForBackgroundShadingType(BackgroundShadingType.none);
    let inlineSvgNeutral = this.generateInlineSvgForBackgroundShadingType(BackgroundShadingType.neutral);
    let inlineSvgSoft = this.generateInlineSvgForBackgroundShadingType(BackgroundShadingType.soft);
    let inlineSvgStrong = this.generateInlineSvgForBackgroundShadingType(BackgroundShadingType.strong);

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
                    { key: ThemeType.section, text: strings.Texts.Section },
                    { key: ThemeType.current, text: strings.Texts.Current },
                    { key: ThemeType.custom, text: strings.Texts.Custom }
                  ]
                }),
                this.properties.themeType == ThemeType.custom && this.propertyFieldMessage("", {
                  key: "fluentUiThemeDesignerMessage",
                  text: strings.CustomPaletteMessageField,
                  multiline: true,
                  messageType: MessageBarType.info,
                  isVisible: true,
                }),
                this.properties.themeType == ThemeType.custom && this.propertyFieldCodeEditor('customPalette', {
                  label: strings.CustomPaletteField,
                  panelTitle: strings.CustomPaletteField,
                  initialValue: this.properties.customPalette,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  key: 'customPaletteEditorFieldId',
                  language: this.propertyFieldCodeEditorLanguages.JSON
                }),
                this.properties.themeType != ThemeType.section && PropertyPaneChoiceGroup('backgroundShadingType', {
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
    let currentTheme = this.themeService.generateTheme(this.properties.themeType, type, this.themeVariant, JSON.parse(this.properties.customPalette));
    let backgroundColor = currentTheme.semanticColors.bodyBackground.split("#").join("%23");
    let textColor = currentTheme.semanticColors.bodyText.split("#").join("%23");

    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='45' height='45'%3E%3Crect x='0' y='0' width='45' height='45' stroke='black' stroke-width='2px' fill='${backgroundColor}'/%3E%3Ctext fill='${textColor}' font-family='Segoe UI, sans-serif' x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle'%3EAa%3C/text%3E%3C/svg%3E`;
  }
}

