import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'TrainningChecklistWebPartStrings';

import {  SPFI } from '@pnp/sp';
import { getSP } from './pnpjsConfig';
import { IChecklistProps } from './components/IChecklistProps';
import Checklist from './components/Checklist';

export interface ITrainningChecklistWebPartProps {
  description: string;
  selectedList: string;
}

export default class TrainningChecklistWebPart extends BaseClientSideWebPart<ITrainningChecklistWebPartProps> {

   private sp: SPFI;
   private listsDropdownOptions: IPropertyPaneDropdownOption[] = [];
  
  public render(): void {
    const element: React.ReactElement<IChecklistProps> = React.createElement(
      Checklist,
      {
        userId: this.context.pageContext.legacyPageContext.userId,
        sp: this.sp,
        selectedList: this.properties.selectedList, 
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    this.sp = getSP(this.context);
    await this.loadLists();
  }

  private async loadLists(): Promise<void> {
    try {
      const lists = await this.sp.web.lists.select("Title", "Id")();
      
      this.listsDropdownOptions = lists.map(list => {
        return {
          key: list.Id,
          text: list.Title
        };
      });

      this.context.propertyPane.refresh();
    } catch (error) {
      console.error("Error loading lists:", error);
    }
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
                }),
                PropertyPaneDropdown('selectedList', {
                  label: "Select a list",
                  options: this.listsDropdownOptions,
                  disabled: this.listsDropdownOptions.length === 0  
                })
              ]
            }
          ]
        }
      ]
    };
  }

  
}
