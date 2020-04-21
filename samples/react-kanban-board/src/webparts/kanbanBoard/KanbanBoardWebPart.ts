import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneDropdown } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import {sp} from '@pnp/sp';

import * as strings from 'KanbanBoardWebPartStrings';
import KanbanBoard from './components/KanbanBoard';
import { IKanbanBoardProps } from './components/IKanbanBoardProps';

export interface IKanbanBoardWebPartProps {
  listTitle: string;
  lists: Array<any>;
  loaded: boolean;
}

export default class KanbanBoardWebPart extends BaseClientSideWebPart<IKanbanBoardWebPartProps> {

  public onInit(): Promise<void> {

    return super.onInit().then(_ => {
  
      sp.setup({
        spfxContext: this.context
      });
      
    });
  }

  public render(): void {
    

  
    const element: React.ReactElement<IKanbanBoardProps > = React.createElement(
      KanbanBoard,
      {
        listTitle: this.properties.listTitle,
        webUrl: this.context.pageContext.web.absoluteUrl
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
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('listTitle',{
                  label: strings.ListTitleFieldLabel,
                  options: this.properties.lists
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected onPropertyPaneConfigurationStart(){
       // Use the list template ID to locate both the old style task lists (107) and newer task lists (171) 
       sp.web.lists.filter("BaseTemplate eq 171 or BaseTemplate eq 107").select("Title").get().then(res => {
        this.properties.lists = res.map((val,index) => {
          return {
            key: val.Title,
            text: val.Title
          };
        });
        this.context.propertyPane.refresh();
      });
  }
}
