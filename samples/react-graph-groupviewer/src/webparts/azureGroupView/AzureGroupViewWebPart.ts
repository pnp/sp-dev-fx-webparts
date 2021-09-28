import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { graph } from "@pnp/graph";
import "@pnp/graph/groups";
import * as strings from 'AzureGroupViewWebPartStrings';
import { AzureGroupView, IAzureGroupViewProps } from './components';

export interface IAzureGroupViewWebPartProps {
  description: string;
  aadGroupId: string;
}

export default class AzureGroupViewWebPart extends BaseClientSideWebPart<IAzureGroupViewWebPartProps> {

  private groupOptions: IPropertyPaneDropdownOption[] = [];
  private groupOptionsLoading: boolean = false;

  public render(): void {

    const element: React.ReactElement<IAzureGroupViewProps> = React.createElement(
      AzureGroupView,
      {
        description: this.properties.description,
        aadGroupId: this.properties.aadGroupId
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(_ => {
      graph.setup({
        spfxContext: this.context
      });
    });
    
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }


}
