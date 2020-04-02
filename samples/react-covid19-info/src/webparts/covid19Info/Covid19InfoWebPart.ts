import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import Covid19Info from './components/Covid19Info';
import { ICovid19InfoProps } from './components/ICovid19InfoProps';
import { PropertyFieldColorPicker, PropertyFieldColorPickerStyle } from '@pnp/spfx-property-controls/lib/PropertyFieldColorPicker';


export interface ICovid19InfoWebPartProps {
  countryCode: string;
  showHistory: boolean;
  viewMoreLink: string;
  countUpTime: number;
  confirmedColor: string;
  deathColor: string;
  recoveredColor: string;
}

export default class Covid19InfoWebPart extends BaseClientSideWebPart <ICovid19InfoWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICovid19InfoProps> = React.createElement(
      Covid19Info,
      {
        countryCode: this.properties.countryCode,
        showHistory: this.properties.showHistory,
        viewMoreLink: this.properties.viewMoreLink,
        countUpTime: this.properties.countUpTime,
        confirmedColor: this.properties.confirmedColor,
        deathColor: this.properties.deathColor,
        recoveredColor: this.properties.recoveredColor,
        displayMode: this.displayMode,
        httpClient: this.context.httpClient,
        onConfigure: this._onConfigure
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
          header: {
            description: "Display regional COVID-19 information"
          },
          groups: [
            {
              groupName: "Country Settings",
              groupFields: [
                PropertyPaneTextField('countryCode', {
                  label: "iso2 Country Code (e.g. US)"
                })
              ]
            },
            {
              groupName: "Web part configuration",
              groupFields: [
                PropertyPaneToggle('showHistory', {
                  label: "Show 'View history' button"
                }),
                PropertyPaneTextField('viewMoreLink', {
                  label: "Provide an optional link to view more statistics"
                }),
                PropertyPaneSlider('countUpTime', {
                  label: "Number of second for the count up counters",
                  min: 1,
                  max: 20,
                  value: 2,
                  showValue: true,
                  step:1
                }),
                PropertyFieldColorPicker('confirmedColor', {
                  label: 'Color for the Confirmed Cases number',
                  selectedColor: this.properties.confirmedColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: true,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'confirmedColorFieldId',
                }),
                PropertyFieldColorPicker('deathColor', {
                  label: 'Color for the Deaths number',
                  selectedColor: this.properties.deathColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: true,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'deathColorFieldId',
                }),
                PropertyFieldColorPicker('recoveredColor', {
                  label: 'Color for the Recovered number',
                  selectedColor: this.properties.recoveredColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: true,
                  style: PropertyFieldColorPickerStyle.Inline,
                  iconName: 'Precipitation',
                  key: 'recoveredColorFieldId',
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _onConfigure = () => {
    this.context.propertyPane.open();
  }
}
