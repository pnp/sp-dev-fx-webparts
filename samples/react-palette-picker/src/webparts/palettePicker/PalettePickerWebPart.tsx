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
  cssObjectText: string;
  fontColor: string;
  cssObject: any;
}




export default class PalettePickerWebPart extends BaseClientSideWebPart<IPalettePickerWebPartProps> {

  

  public render(): void {
    const mainElement: React.ReactElement<IPalettePickerProps> = React.createElement(
      PalettePicker,

      
    );

    const ppProps = {
      cssObjectText: this.properties["cssObjectText"],
      context: this.context,
      cssObject: this.properties["cssObjectText"] != undefined ? JSON.parse(this.properties["cssObjectText"]) : {},
      fontColor: this.properties.fontColor
    };

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

    if(property == "cssObject" && value != {}) {
     // update(this.properties, "cssObjectText", () => ":root {" + Object.entries(value).map(([k, v]) => `${k}:${v}`).join('; ') + "}");
     update(this.properties, "cssObjectText", () => JSON.stringify(value));
    }

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
                PropertyPaneTextField('fontColor', {
                  label: "Font Color"
                
                }),
                PropertyPaneHost('fieldSetDisplay', hostProperties),
                PropertyPaneHost('cssObjectText', hostProperties),
              ]
            }
          ]
        }
      ]
    };
  }
}
