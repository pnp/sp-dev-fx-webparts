import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneSlider, PropertyPaneTextField,PropertyPaneToggle } from "@microsoft/sp-property-pane";

import * as strings from 'ReactAccordionWebPartStrings';
import ReactAccordion from './components/ReactAccordion';
import { IReactAccordionProps } from './components/IReactAccordionProps';

export interface IReactAccordionWebPartProps {
  listName: string;
  choice: string;
  title: string;
  displayMode: DisplayMode;
  totalItems:number;
  maxItemsPerPage: number;
  enablePaging:boolean;
  updateProperty: (value: string) => void;
}

export default class ReactAccordionWebPart extends BaseClientSideWebPart<IReactAccordionWebPartProps> {

  public render(): void {
    
    const element: React.ReactElement<IReactAccordionProps> = React.createElement(
      ReactAccordion,
      {
        listName: this.properties.listName,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        title: this.properties.title,
        displayMode: this.displayMode,
        totalItems:this.properties.totalItems,
        maxItemsPerPage: this.properties.maxItemsPerPage,
        enablePaging:this.properties.enablePaging,
        updateProperty: (value: string) => {
          this.properties.title = value;
        }
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
    //set maxitems to top
    if(!this.properties.enablePaging){
      this.properties.maxItemsPerPage = this.properties.totalItems;
    }
    
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
                PropertyPaneTextField('listName', {
                  label: strings.ListNameLabel
                }),
                PropertyPaneSlider('totalItems', {
                  label: strings.TotalItemsLabel,
                  ariaLabel: strings.TotalItemsLabel,
                  min: 3,
                  max: 5000,
                  value: 5,
                  showValue: true,
                  step: 1
                }),
                PropertyPaneToggle('enablePaging', {
                  label: strings.EnablePagingLabel
                }),
                PropertyPaneSlider('maxItemsPerPage', {
                  disabled:!this.properties.enablePaging,
                  label: strings.MaxItemsPerPageLabel,
                  ariaLabel: strings.MaxItemsPerPageLabel,
                  min: 3,
                  max: 5000,
                  value: 5,
                  showValue: true,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
