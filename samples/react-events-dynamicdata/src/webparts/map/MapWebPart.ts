import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IWebPartPropertiesMetadata } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneLink, IPropertyPaneConditionalGroup, PropertyPaneDynamicFieldSet, PropertyPaneDynamicField,DynamicDataSharedDepth } from "@microsoft/sp-property-pane";


import * as strings from 'MapWebPartStrings';
import { Map, IMapProps } from './components';
import { DynamicProperty } from '@microsoft/sp-component-base';

/**
 * Map web part properties
 */
export interface IMapWebPartProps {
  /**
   * The address to display on the map
   */
  address: DynamicProperty<string>;
  /**
   * Bing maps API key to use with the Bing maps API
   */
  bingMapsApiKey: string;
  /**
   * The city where the address is located
   */
  city: DynamicProperty<string>;
  /**
   * Web part title
   */
  title: string;
}

/**
 * Map web part. Shows the map of the specified location. The location can be
 * specified either directly in the web part properties or via a dynamic data
 * source connection.
 */
export default class MapWebPart extends BaseClientSideWebPart<IMapWebPartProps> {
  /**
   * Event handler for clicking the Configure button on the Placeholder
   */
  private _onConfigure = (): void => {
    this.context.propertyPane.open();
  }

  public render(): void {
    // Get the location to show on the map. The location will be retrieved
    // either from the event selected in the connected data source or from the
    // address entered in web part properties
    const address: string | undefined = this.properties.address.tryGetValue();
    const city: string | undefined = this.properties.city.tryGetValue();
    const needsConfiguration: boolean = !this.properties.bingMapsApiKey || (!address && !this.properties.address.tryGetSource()) ||
    (!city && !this.properties.city.tryGetSource());

    const element: React.ReactElement<IMapProps> = React.createElement(
      Map,
      {
        needsConfiguration: needsConfiguration,
        httpClient: this.context.httpClient,
        bingMapsApiKey: this.properties.bingMapsApiKey,
        dynamicAddress: !!this.properties.address.tryGetSource(),
        address: `${address} ${city}`,
        onConfigure: this._onConfigure,
        width: this.domElement.clientWidth,
        height: this.domElement.clientHeight,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string): void => {
          this.properties.title = value;
        }
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      // Denote the address web part property as a dynamic property of type
      // object to allow the address information to be serialized by
      // the SharePoint Framework.
      'address': {
        dynamicPropertyType: 'string'
      },
      'city': {
        dynamicPropertyType: 'string'
      }
    } as any as IWebPartPropertiesMetadata;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.BingMapsGroupName,
              groupFields: [
                PropertyPaneTextField('bingMapsApiKey', {
                  label: strings.BingMapsApiKeyFieldLabel
                }),
                PropertyPaneLink('', {
                  href: 'https://www.bingmapsportal.com/',
                  text: strings.GetBingMapsApiKeyLinkText,
                  target: '_blank'
                })
              ]
            },
            // Web part properties group for specifying the information about
            // the address to show on the map.
            {
              // Primary group is used to provide the address to show on the map
              // in a text field in the web part properties
              primaryGroup: {
                groupName: strings.DataGroupName,
                groupFields: [
                  PropertyPaneTextField('address', {
                    label: strings.AddressFieldLabel
                  }),
                  PropertyPaneTextField('city', {
                    label: strings.CityFieldLabel
                  })
                ]
              },
              // Secondary group is used to retrieve the address from the
              // connected dynamic data source
              secondaryGroup: {
                groupName: strings.DataGroupName,
                groupFields: [
                  PropertyPaneDynamicFieldSet({
                    label: 'Address',
                    fields: [
                      PropertyPaneDynamicField('address', {
                        label: strings.AddressFieldLabel
                      }),
                      PropertyPaneDynamicField('city', {
                        label: strings.CityFieldLabel
                      })
                    ],
                    sharedConfiguration: {
                      // because address and city come from the same data source
                      // the connection can share the selected dynamic property
                      depth: DynamicDataSharedDepth.Property
                    }
                  })
                ]
              },
              // Show the secondary group only if the web part has been
              // connected to a dynamic data source
              showSecondaryGroup: !!this.properties.address.tryGetSource()
            } as IPropertyPaneConditionalGroup
          ]
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    // set property changes mode to reactive, so that the Bing Maps API is not
    // called on each keystroke when typing in the address to show on the map
    // in web part properties
    return true;
  }
}
