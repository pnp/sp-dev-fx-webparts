import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'PalettePickerWebPartStrings';
import PalettePicker from './components/PalettePicker';
import { IPalettePickerProps } from './components/IPalettePickerProps';

import { CustomPropertyPane } from './components/CustomPropertyPane';
import { PropertyPaneHost } from 'property-pane-portal';
import { update } from '@microsoft/sp-lodash-subset';

export interface IPalettePickerWebPartProps {
  description: string;
  hueSlider: any;
}

export default class PalettePickerWebPart extends BaseClientSideWebPart<IPalettePickerWebPartProps> {

  public render(): void {
    const mainElement: React.ReactElement<IPalettePickerProps> = React.createElement(
      PalettePicker,
      {
        description: this.properties.description
      }
      
    );

    const ppProps = {
      description: "blah"
    }

    const customPropertyPaneProperties = {
      context: this.context,
      properties: this.properties,
      updateWebPartProperty: this.updateWebPartProperty.bind(this),
    };



    ReactDom.render(
      <>
      <PalettePicker {... ppProps}/>
      <CustomPropertyPane {... customPropertyPaneProperties} />
      </>
      ,  this.domElement);
  }

  public updateWebPartProperty(property, value) {

    update(this.properties, property, () => value);
    this.render();
  
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

    const hostProperties = {
      context: this.context
    };

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
                PropertyPaneHost('fieldSetHue', hostProperties),
                PropertyPaneHost('fieldSetSat', hostProperties),
                PropertyPaneHost('fieldSetLight', hostProperties),
                PropertyPaneHost('fieldSetShades', hostProperties),
                PropertyPaneHost('fieldSetDisplay', hostProperties),
              ]
            }
          ]
        }
      ]
    };
  }
}
