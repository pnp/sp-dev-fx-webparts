import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IWebPartPropertiesMetadata,
  WebPartContext
} from '@microsoft/sp-webpart-base';

import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';



import * as strings from 'TabAccordionWebPartStrings';
import Tab from './components/CTab';
import { ICTabProps } from './components/ICTabProps';
import Accordion from './components/CAccordion';
import { ICAccordionProps } from './components/ICAccordionProps';
import { SPComponentLoader } from '@microsoft/sp-loader';
import 'tinymce';
export interface ITabAccordionWebPartProps {
  tabs: any[]; 
  type: string;
  title: string;
  accordion:boolean;
  tabContent: string;
}

export default class TabAccordionWebPart extends BaseClientSideWebPart<ITabAccordionWebPartProps> {
  private propertyFieldCollectionData;
  private customCollectionFieldType;
  private guid: string;
  private isMobile: boolean;

  // ...
  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      'title': { isSearchablePlainText: true },
      'tabContent': { isHtmlString: true }
    };
  }
  // ...

  /**
   * @function
   * Web part contructor.
   */
  public constructor(context?: WebPartContext) {
    super();

    //Initialize unique GUID
    this.guid = this.getGuid();

    this.isMobile = this.detectmob();

    //Hack: to invoke correctly the onPropertyChange function outside this class
    //we need to bind this object on it first
    this.onPropertyPaneFieldChanged = this.onPropertyPaneFieldChanged.bind(this);
  }
  

  public render(): void {
    console.log('Web Part Render Called');
    this.properties.tabContent = "";
    this.properties.tabs.map((tab: any, tabindex: number) => {
      this.properties.tabContent += tab.Title + "," + tab.Content + "|";
    });
    
    const elementTab: React.ReactElement<ICTabProps > = React.createElement(
      Tab,
      {        
        tabs: this.properties.tabs, 
        displayMode: this.displayMode,
        guid: this.guid,
        title:this.properties.title
      }
    );
    const elementAccordion: React.ReactElement<ICAccordionProps > = React.createElement(
      Accordion,
      {        
        tabs: this.properties.tabs, 
        displayMode: this.displayMode,
        guid: this.guid,
        title: this.properties.title,
        accordion:this.properties.accordion
      }
    );
    if(this.isMobile)
    {
      ReactDom.render(elementAccordion, this.domElement);
    }
    else 
    {
      if(this.properties.type == "Accordion")
      {
        ReactDom.render(elementAccordion, this.domElement);
      }
      else
      {
        ReactDom.render(elementTab, this.domElement);
      }
    }
    
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * @function
   * Generates a GUID
   */
  private getGuid(): string {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  private detectmob(): boolean {
    console.log('inside detectmob');
    if(window.innerWidth <= 480) {
      return true;
    } else {
      return false;
    }
 }

  /**
   * @function
   * Generates a GUID part
   */
  private s4(): string {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
  }

  //executes only before property pane is loaded.
  protected async loadPropertyPaneResources(): Promise<void> {
    // import additional controls/components
    const { PropertyFieldCollectionData, CustomCollectionFieldType } = await import (
      /* webpackChunkName: 'pnp-propcontrols-colldata' */
      '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData'
    );

    

    this.propertyFieldCollectionData = PropertyFieldCollectionData;
    this.customCollectionFieldType = CustomCollectionFieldType;
  }

/**
   * @function
   * PropertyPanel settings definition
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneDropdown('type', {
                  label: strings.Type,
                  disabled: false,                   
                  options: [
                    {key: 'Accordion', text: 'Accordion'},
                    {key: 'Tab', text: 'Tab'}
                  ]
                }),  
                this.propertyFieldCollectionData("tabs", {
                  key: "tabs",
                  panelHeader: strings.ManageAccordion,
                  manageBtnLabel: strings.ManageAccordion,
                  value: this.properties.tabs,
                  enableSorting: false,
                  fields: [
                    {
                      id: "Title",
                      title: strings.TitleFieldLabel,
                      type: this.customCollectionFieldType.string,
                      required: true
                    }
                  ]
                }),                           
              ],             
            },            
          ]
        }
      ]
    };
  }
}