import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  PropertyPaneLabel,
  PropertyPaneLink
} from '@microsoft/sp-webpart-base';

import * as strings from 'MapWebPartStrings';
import { Map, IMapProps } from './components';
import { IDynamicDataSource } from '@microsoft/sp-dynamic-data';
import { ILocation } from '../../data';

/**
 * Map web part properties
 */
export interface IMapWebPartProps {
  /**
   * The address to display on the map
   */
  address: string;
  /**
   * Bing maps API key to use with the Bing maps API
   */
  bingMapsApiKey: string;
  /**
   * The ID of the dynamic data to which the web part is subscribed
   */
  propertyId: string;
  /**
   * The dynamic data source ID to which the web part is subscribed
   */
  sourceId: string;
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
   * The previous ID of the dynamic data source to which the web part is
   * subscribed. Used to unsubscribe from previously registered dynamic data
   * source notifications after changing web part configuration in the property
   * pane.
   */
  private _lastSourceId: string;
  /**
   * The previous ID of the dynamic data to which the web part is subscribed.
   * Used to unsubscribe from previously registered dynamic data source
   * notifications after changing web part configuration in the property pane.
   */
  private _lastPropertyId: string;

  /**
   * Event handler for clicking the Configure button on the Placeholder
   */
  private _onConfigure = (): void => {
    this.context.propertyPane.open();
  }

  protected onInit(): Promise<void> {
    // bind render method to the current instance so that it can be correctly
    // invoked when dynamic data change notification is triggered
    this.render = this.render.bind(this);

    return Promise.resolve();
  }

  public render(): void {
    // subscribe to dynamic data changes notifications
    // do this only once the first time the web part is rendered and only,
    // if the dynamic data source ID and property ID are provided
    if (this.renderedOnce === false) {
      if (this.properties.sourceId && this.properties.propertyId) {
        try {
          this.context.dynamicDataProvider.registerPropertyChanged(this.properties.sourceId, this.properties.propertyId, this.render);
          this._lastSourceId = this.properties.sourceId;
          this._lastPropertyId = this.properties.propertyId;
        }
        catch (e) {
          this.context.statusRenderer.renderError(this.domElement, `${strings.ErrorText}${e}`);
          return;
        }
      }
    }

    const dynamicAddress: boolean = !!this.properties.sourceId;

    const needsConfiguration: boolean = !this.properties.bingMapsApiKey ||
      (!dynamicAddress && !this.properties.address) ||
      (dynamicAddress && !this.properties.propertyId);

    let address: string = dynamicAddress ? undefined : this.properties.address;

    // if the web part is set to retrieve its address from a dynamic data source
    // and the dynamic data source has been configured, try to retrieve the
    // currently selected location
    if (!needsConfiguration && dynamicAddress) {
      const source: IDynamicDataSource = this.context.dynamicDataProvider.tryGetSource(this.properties.sourceId);
      const location: ILocation = source ? source.getPropertyValue(this.properties.propertyId) : undefined;
      if (location) {
        address = `${location.address} ${location.city}`;
      }
    }

    const element: React.ReactElement<IMapProps> = React.createElement(
      Map,
      {
        needsConfiguration: needsConfiguration,
        httpClient: this.context.httpClient,
        bingMapsApiKey: this.properties.bingMapsApiKey,
        dynamicAddress: dynamicAddress,
        address: address,
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    // get all available dynamic data sources on the page
    const sourceOptions: IPropertyPaneDropdownOption[] =
      this.context.dynamicDataProvider.getAvailableSources().map(source => {
        return {
          key: source.id,
          text: source.metadata.title
        };
      });
    // add an extra option on top to indicate, that the web part should get
    // its address information from the web part configuration rather than from
    // a dynamic data source
    sourceOptions.unshift({
      key: '',
      text: 'Web part configuration'
    });
    const selectedSource: string = this.properties.sourceId;

    let propertyOptions: IPropertyPaneDropdownOption[] = [];
    if (selectedSource) {
      const source: IDynamicDataSource = this.context.dynamicDataProvider.tryGetSource(selectedSource);
      if (source) {
        // get the list of all properties exposed by the currently selected
        // data source
        propertyOptions = source.getPropertyDefinitions().map(prop => {
          return {
            key: prop.id,
            text: prop.title
          };
        });
      }
    }

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
            {
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneTextField('address', {
                  label: strings.AddressFieldLabel
                })
              ]
            },
            {
              groupName: strings.ConnectionGroupName,
              groupFields: [
                PropertyPaneDropdown('sourceId', {
                  label: strings.SourceIdFieldLabel,
                  options: sourceOptions,
                  selectedKey: this.properties.sourceId
                }),
                PropertyPaneDropdown('propertyId', {
                  label: strings.PropertyIdFieldLabel,
                  options: propertyOptions,
                  selectedKey: this.properties.propertyId
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneFieldChanged(propertyPath: string): void {
    if (!this.properties.sourceId) {
      return;
    }

    if (propertyPath === 'sourceId') {
      // reset the selected property ID after selecting a different dynamic
      // data source
      this.properties.propertyId =
        this.context.dynamicDataProvider.tryGetSource(this.properties.sourceId).getPropertyDefinitions()[0].id;
    }

    if (this._lastSourceId && this._lastPropertyId) {
      // unsubscribe from the previously registered dynamic data changes
      // notifications
      this.context.dynamicDataProvider.unregisterPropertyChanged(this._lastSourceId, this._lastPropertyId, this.render);
    }

    // subscribe to the newly configured dynamic data changes notifications
    this.context.dynamicDataProvider.registerPropertyChanged(this.properties.sourceId, this.properties.propertyId, this.render);
    // store current values for the dynamic data source ID and property ID
    // so that the web part can unsubscribe from notifications when the
    // web part configuration changes
    this._lastSourceId = this.properties.sourceId;
    this._lastPropertyId = this.properties.propertyId;
  }

  protected get disableReactivePropertyChanges(): boolean {
    // set property changes mode to reactive, so that the Bing Maps API is not
    // called on each keystroke when typing in the address to show on the map
    // in web part properties
    return true;
  }
}
