import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-webpart-base';

import * as strings from 'sitePageHeaderConfiguratorStrings';
import SitePageHeaderConfiguratorEdit from './components/SitePageHeaderConfiguratorEdit';
import SitePageHeaderConfiguratorView from './components/SitePageHeaderConfiguratorView';
import { ISitePageHeaderConfiguratorProps } from './components/ISitePageHeaderConfiguratorProps';
import { ISitePageHeaderConfiguratorWebPartProps } from './ISitePageHeaderConfiguratorWebPartProps';
import { PropertyPaneColorPicker } from '../../controls/PropertyPaneColorPicker/PropertyPaneColorPicker';
import { update, get } from '@microsoft/sp-lodash-subset';

export default class SitePageHeaderConfiguratorWebPart extends BaseClientSideWebPart<ISitePageHeaderConfiguratorWebPartProps> {

  private onListChange(propertyPath: string, newValue: any): void {
    const oldValue: any = get(this.properties, propertyPath);
    // store new value in web part properties
    update(this.properties, propertyPath, (): any => { return newValue; });
    // refresh web part
    this.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  public render(): void {
    const editElement: React.ReactElement<ISitePageHeaderConfiguratorProps> = React.createElement(
      SitePageHeaderConfiguratorEdit,
      {
        headerSize: this.properties.headerSize,
        headerGfx: this.properties.headerGfx,
        headerFontColor: this.properties.headerFontColor
      }
    );

    const viewElement: React.ReactElement<ISitePageHeaderConfiguratorProps> = React.createElement(
      SitePageHeaderConfiguratorView,
      {
        headerSize: this.properties.headerSize,
        headerGfx: this.properties.headerGfx,
        headerFontColor: this.properties.headerFontColor
      }
    );


    if (this.displayMode == DisplayMode.Edit) {
      ReactDom.render(editElement, this.domElement);
    } else {
      ReactDom.render(viewElement, this.domElement);
    }
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneChoiceGroup('headerSize',
                  {
                    label: "Header size",
                    options: [{ key: 1, text: strings.Large }, { key: 2, text: strings.Medium }, { key: 3, text: strings.Small }, { key: 4, text: strings.None }]
                  }
                ),

                PropertyPaneTextField('headerGfx', {
                  label: "URL",
                  description: "URL to header graphics Graphics (will be scaled)"
                })
                ,

                new PropertyPaneColorPicker('headerFontColor', {
                  label: "Headline color",
                  onPropertyChange: this.onListChange.bind(this),
                  selectedColor: this.properties.headerFontColor
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
