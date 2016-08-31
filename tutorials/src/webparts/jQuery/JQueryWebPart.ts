import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'jQueryStrings';
import { IJQueryWebPartProps } from './IJQueryWebPartProps';
import MyAccordionTemplate from './MyAccordionTemplate';

import * as myjQuery from 'jquery';
require('jqueryui');
import importableModuleLoader from '@microsoft/sp-module-loader';

export default class JQueryWebPart extends BaseClientSideWebPart<IJQueryWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);

    importableModuleLoader.loadCss('//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css');
  }

  public render(): void {
    this.domElement.innerHTML = MyAccordionTemplate.templateHtml;

    const accordionOptions: JQueryUI.AccordionOptions = {
      animate: true,
      collapsible: false,
      icons: {
        header: 'ui-icon-circle-arrow-e',
        activeHeader: 'ui-icon-circle-arrow-s'
      }
    };

    myjQuery(this.domElement).children('.accordion').accordion(accordionOptions);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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
