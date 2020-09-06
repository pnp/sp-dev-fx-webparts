import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";


import * as strings from 'BuilderWebPartStrings';
import Builder from './components/Builder';
import { IBuilderProps } from './components/IBuilderProps';

export interface IBuilderWebPartProps {
  selectedMeal: string;
}

export default class BuilderWebPart extends BaseClientSideWebPart<IBuilderWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBuilderProps > = React.createElement(
      Builder,
      {
       
        selectedMeal: this.properties.selectedMeal
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    this.properties[this.properties.selectedMeal] = newValue;
    this.render();   
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected get disableReactivePropertyChanges(): boolean { 
    return true; 
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration  {
    return {
      pages: [
        {
          header: {
            description: "Header"
          },
          groups: [
            {
              groupName: "Group",
              groupFields: [
                PropertyPaneDropdown("selectedMeal", {
                  label: "Select meal",
                  options: [
                    { key: "0", text: "Veg" },
                    { key: "1", text: "Nonveg" }
                  ],
                  selectedKey: 0
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
