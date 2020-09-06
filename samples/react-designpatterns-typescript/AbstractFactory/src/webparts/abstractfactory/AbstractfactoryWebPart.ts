import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {  
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";

import * as strings from 'AbstractfactoryWebPartStrings';
import Abstractfactory from './components/Abstractfactory';
import { IAbstractFactoryProps } from './components/IAbstractFactoryProps';
import { IAbstractfactoryWebPartProps } from "./IAbstractfactoryWebPartProps";




export default class AbstractfactoryWebPart extends BaseClientSideWebPart<IAbstractfactoryWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAbstractFactoryProps > = React.createElement(
      Abstractfactory,
      {
        datasource: this.properties.datasource
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    this.properties[this.properties.datasource] = newValue;


    this.render();
     
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  

  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }
  
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneDropdown("datasource", {
                  label: "DataSource",
                  options: [
                      { key: "1", text: "Sharepoint"},
                      { key: "2", text: "JSON" }
                    ],
                  selectedKey: "1",
                  
                  })
              ]
            }
          ]
        }
      ]
    };
  }
}
