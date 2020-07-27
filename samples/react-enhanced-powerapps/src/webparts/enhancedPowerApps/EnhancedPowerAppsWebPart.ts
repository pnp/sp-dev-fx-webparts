import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneLabel,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';

import * as strings from 'EnhancedPowerAppsWebPartStrings';
import EnhancedPowerApps from './components/EnhancedPowerApps';
import { IEnhancedPowerAppsProps } from './components/IEnhancedPowerAppsProps';

/**
 * Use this for dynamic properties
 */
import { DynamicProperty } from '@microsoft/sp-component-base';

/**
 * Plain old boring web part thingies
 */
import {
  BaseClientSideWebPart,
  IWebPartPropertiesMetadata,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField
} from '@microsoft/sp-webpart-base';

/**
 * Use this for theme awareness
 */
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme
} from '@microsoft/sp-component-base';

/**
 * Use the multi-select for large checklists
 */
import { PropertyFieldMultiSelect } from '@pnp/spfx-property-controls/lib/PropertyFieldMultiSelect';
import { ThemeVariantSlots } from './ThemeVariantSlots';
import { PropertyPaneHTML } from '../../controls/PropertyPaneHTML/PropertyPaneHTML';

/**
 * Super-cool text functions included in SPFx that people don't use often enough
 */
import { Text } from '@microsoft/sp-core-library';

export interface IEnhancedPowerAppsWebPartProps {
  dynamicProp: DynamicProperty<string>;
  appWebLink: string;
  useDynamicProp: boolean;
  dynamicPropName: string;
  border: boolean;
  layout: 'FixedHeight'|'AspectRatio';
  height: number;
  width: number;
  aspectratio: '16:9'|'3:2'|'16:10'|'4:3'|'Custom';
  themeValues: string[];
}

export default class EnhancedPowerAppsWebPart extends BaseClientSideWebPart<IEnhancedPowerAppsWebPartProps> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected onInit(): Promise<void> {
    // Consume the new ThemeProvider service
    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

    return super.onInit();
  }

  public render(): void {
    // Context variables and dynamic properties
    const dynamicProp: string | undefined = this.properties.dynamicProp.tryGetValue();
    const locale: string = this.context.pageContext.cultureInfo.currentCultureName;

    // Get the client width. This is how we'll calculate the aspect ratio and resize the iframe
    const { clientWidth } = this.domElement;

    // Get the aspect width and height based on aspect ratio for the web part
    let aspectWidth: number;
    let aspectHeight: number;
    switch(this.properties.aspectratio) {
      case "16:10":
        aspectWidth = 16;
        aspectHeight = 10;
        break;
      case "16:9":
        aspectWidth = 16;
        aspectHeight = 9;
        break;
      case "3:2":
        aspectWidth = 3;
        aspectHeight = 2;
        break;
      case "4:3":
        aspectWidth = 4;
        aspectHeight = 3;
        break;
      case "Custom":
        // Custom aspects just use the width and height properties
        aspectWidth = this.properties.width;
        aspectHeight = this.properties.height;
    }

    // If we're using fixed height, we pass the height and don't resize, otherwise we
    // calculate the height based on the web part's width and selected aspect ratio
    const clientHeight: number = this.properties.layout === 'FixedHeight' ?
      this.properties.height :
      clientWidth * (aspectHeight/aspectWidth);

    const element: React.ReactElement<IEnhancedPowerAppsProps> = React.createElement(
      EnhancedPowerApps,
      {
        locale: locale,
        dynamicProp: dynamicProp,
        useDynamicProp: this.properties.useDynamicProp,
        dynamicPropName: this.properties.dynamicPropName,
        onConfigure: this._onConfigure,
        appWebLink: this.properties.appWebLink,
        width: clientWidth,
        height: clientHeight,
        themeVariant: this._themeVariant,
        border: this.properties.border,
        themeValues: this.properties.themeValues
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
    return {
      pages: [
        {
          displayGroupsAsAccordion: true,
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              isCollapsed: false,
              groupFields: [
                PropertyPaneTextField('appWebLink', {
                  label: strings.AppWebLinkFieldLabel
                })
              ]
            },
            {
              groupName: strings.AppearanceGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneToggle('border', {
                  label: strings.BorderFieldLabel
                }),
                PropertyPaneChoiceGroup('layout', {
                  label: strings.LayoutFieldLabel,
                  options: [
                    {
                      key: 'FixedHeight',
                      text: strings.LayoutFixedHeightOption,
                      iconProps: {
                        officeFabricIconFontName: 'FullWidth'
                      }
                    },
                    {
                      key: 'AspectRatio',
                      text: strings.LayoutAspectRatioOption,
                      iconProps: {
                        officeFabricIconFontName: 'AspectRatio'
                      }
                    }
                  ]
                }),
                this.properties.layout === "FixedHeight" && PropertyPaneTextField('height', {
                  label: strings.HeightFieldLabel
                }),
                this.properties.layout === "AspectRatio" && PropertyPaneChoiceGroup('aspectratio', {
                  label: strings.AspectRatioFieldLabel,
                  options: [
                    {
                      key: '16:9',
                      text: '16:9',
                    },
                    {
                      key: '3:2',
                      text: '3:2',
                    },
                    {
                      key: '16:10',
                      text: '16:10',
                    },
                    {
                      key: '4:3',
                      text: '4:3',
                    },
                    {
                      key: 'Custom',
                      text: strings.AspectRatioCustomOption,
                    }
                  ]
                }),
                this.properties.layout === "AspectRatio" && this.properties.aspectratio === "Custom" && PropertyPaneTextField('width', {
                  label: strings.WidthFieldLabel,
                }),
                this.properties.layout === "AspectRatio" && this.properties.aspectratio === "Custom" && PropertyPaneTextField('height', {
                  label: strings.HeightFieldLabel,
                }),
              ]
            },
            {
              groupName: strings.DynamicPropertiesGroupLabel,
              isCollapsed: true,
              groupFields: [
                PropertyPaneHTML({
                  key: 'useDynamicProp',
                  html: Text.format(strings.DynamicsPropsGroupDescription1, this.properties.dynamicPropName!== undefined ?this.properties.dynamicPropName:'parametername')
                }),
                PropertyPaneHTML({
                  key: 'useDynamicProp',
                  html: strings.DynamicsPropsGroupDescription2
                }),
                PropertyPaneToggle('useDynamicProp', {
                  checked: this.properties.useDynamicProp === true,
                  label: strings.UseDynamicPropsFieldLabel
                }),
                this.properties.useDynamicProp === true && PropertyPaneDynamicFieldSet({
                  label: strings.SelectDynamicSource,
                  fields: [
                    PropertyPaneDynamicField('dynamicProp', {
                      label: strings.DynamicPropFieldLabel
                    })
                  ]
                }),
                this.properties.useDynamicProp === true && PropertyPaneTextField('dynamicPropName', {
                  label: strings.DynamicPropsNameFieldLabel,
                  description: strings.DynamicsPropNameDescriptionLabel,
                  value: this.properties.dynamicPropName
                })
              ]
            },
            {
              groupName: strings.ThemeGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneLabel('themeValuesPre',{
                  text: strings.ThemeValuePreLabel
                }),
                PropertyFieldMultiSelect('themeValues', {
                  key: 'multithemeValuesSelect',
                  label: strings.ThemeValueFieldLabel,
                  options: ThemeVariantSlots,
                  selectedKeys: this.properties.themeValues
                }),
                PropertyPaneHTML({
                  key: 'themeValuesPost',
                  html: strings.ThemeValuePostLabel
                }),
              ]
            }
          ]
        }
      ]
    };
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      // Specify the web part properties data type to allow the address
      // information to be serialized by the SharePoint Framework.
      'dynamicProp': {
        dynamicPropertyType: 'string'
      }
    };
  }

  private _onConfigure = (): void => {
    this.context.propertyPane.open();
  }

  /**
 * Update the current theme variant reference and re-render.
 *
 * @param args The new theme
 */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }
}
