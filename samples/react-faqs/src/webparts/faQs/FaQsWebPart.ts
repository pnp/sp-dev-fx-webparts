import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart,
  WebPartContext
} from '@microsoft/sp-webpart-base';

import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
} from '@microsoft/sp-property-pane';

import { RichText } from '@pnp/spfx-controls-react/lib/RichText';

import * as strings from 'FaqsWebPartStrings';
import Faqs from './components/Faqs';
import { IFaqsProps } from './components/IFaqsProps';
import Accordions from './components/Accordions';
import { IAccordionsProps } from './components/IAccordionsProps';
import { IFaq, FaqTarget } from './components/IFaq';
import styles from './components/Faqs.module.scss';

export interface IFaqsWebPartProps {
  collectionData: IFaq[];
  categoryData: any[];
  title: string;
  type: string;
}

export default class FaqsWebPart extends BaseClientSideWebPart<IFaqsWebPartProps> {
  private propertyFieldCollectionData;
  private customCollectionFieldType;
  private guid: string;
  private isMobile: boolean;
  
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
    const element: React.ReactElement<IFaqsProps > = React.createElement(
      Faqs,
      {
        collectionData: this.properties.collectionData,
        title: this.properties.title,
        categoryData: this.properties.categoryData,
        displayMode: this.displayMode,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
        fPropertyPaneOpen: this.context.propertyPane.open
      }

    );

    const elementAccordion: React.ReactElement<IAccordionsProps > = React.createElement(
      Accordions,
      {        
        collectionData: this.properties.collectionData,
        displayMode: this.displayMode,
        guid: this.guid,
        title: this.properties.title,
        accordion:true,
        fUpdateProperty: (value: string) => {
          this.properties.title = value;
        },
        fPropertyPaneOpen: this.context.propertyPane.open
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
        ReactDom.render(element, this.domElement);
      }
    }
  }

  private detectmob(): boolean {
    if(window.innerWidth <= 480) {
      return true;
    } else {
      return false;
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let groups = [];
    if (this.properties.categoryData && this.properties.categoryData.length > 0) {
      groups = this.properties.categoryData.map((category: any) => ({ key: category.title, text: category.title }));
    }

    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                this.propertyFieldCollectionData("categoryData", {
                  key: "categoryData",
                  label: strings.categoryDataLabel,
                  panelHeader: strings.categoryPanelHeader,
                  manageBtnLabel: strings.manageCategoryBtn,
                  value: this.properties.categoryData,
                  enableSorting: true,
                  fields: [
                    {
                      id: "title",
                      title: strings.questionTitleField,
                      type: this.customCollectionFieldType.string,
                      required: true
                    }
                  ]
                }),
                this.propertyFieldCollectionData("collectionData", {
                  key: "collectionData",
                  label: strings.FaqDataLabel,
                  panelHeader: strings.FaqPanelHeader,
                  manageBtnLabel: strings.manageFaqsBtn,
                  value: this.properties.collectionData,
                  tableClassName: 'tableSpan',
                  panelClassName: 'propertyPanel',
                  enableSorting: true,
                  fields: [
                    {
                      id: "questionTitle",
                      title: strings.questionTitleField,
                      type: this.customCollectionFieldType.string,
                      required: true,
                      placeholder: 'Question Title'
                    },
                    {
                      id: "answerText",
                      title: strings.answerTextField,
                      type: this.customCollectionFieldType.custom,
                      required: true,
                      defaultValue: '',
                      onCustomRender: (field, value, onUpdate, item, itemId) => {
                        return (
                          React.createElement("div", {style: {width: "250px"}},
                            React.createElement(RichText, { 
                              key: itemId, 
                              value: value,
                              onChange : (newText: string) => {
                                onUpdate(field.id, newText);
                                return newText;
                              }
                            }),
                            React.createElement("span", {style:{color:'#a80000', top:'-5px', position: 'relative', float: 'right', left: '-5px'}, value: ' *'},'*'),
                          )
                        );
                      }                    
                    },
                    {
                      id: "answerLinkTitle",
                      title: strings.answerLinkTitleField,
                      type: this.customCollectionFieldType.string,
                      placeholder: 'Question Link Url Title'
                    },
                    {
                      id: "answerLink",
                      title: strings.answerLinkField,
                      type: this.customCollectionFieldType.url
                    },
                    {
                      id: "category",
                      title: strings.categoryField,
                      type: this.customCollectionFieldType.dropdown,
                      options: [
                        {
                          key: null,
                          text: ""
                        },
                        ...groups
                      ]
                    }                  
                  ]
                }),
                PropertyPaneDropdown('type', {
                  label: strings.Type,
                  disabled: false,                   
                  options: [
                    {key: 'Accordion', text: 'Accordion'},
                    {key: 'Tab', text: 'Tab'}
                  ]
                })                         
              ]
            }
          ]
        }
      ]
    };
  }
}
