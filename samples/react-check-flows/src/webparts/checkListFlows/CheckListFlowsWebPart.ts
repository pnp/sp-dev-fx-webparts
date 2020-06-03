import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CheckListFlowsWebPartStrings';
import CheckListFlows from './components/CheckListFlows';
import { ICheckListFlowsProps } from './components/ICheckListFlowsProps';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { sp } from '@pnp/sp';

export interface ICheckListFlowsWebPartProps {
  description: string;
  title: string;
}

export default class CheckListFlowsWebPart extends BaseClientSideWebPart<ICheckListFlowsWebPartProps> {
  private listOptions: IDropdownOption[];

  public render(): void {
    const element: React.ReactElement<ICheckListFlowsProps> = React.createElement(
      CheckListFlows,
      {
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        description: this.properties.description,
        context: this.context,
        listOptions: this.listOptions
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(async _ => {
      sp.setup({
        spfxContext: this.context
      });
      //Get Title and EntityTypeName for all lists in the site
      let listOptions: IDropdownOption[] = [];
      let lists = await sp.web.lists.select('EntityTypeName', 'Title').filter('Hidden eq false').get();
      lists.map((list) => {
        listOptions.push({ key: list.EntityTypeName, text: list.Title });
      });
      this.listOptions = listOptions;
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
                  label: 'Description'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
