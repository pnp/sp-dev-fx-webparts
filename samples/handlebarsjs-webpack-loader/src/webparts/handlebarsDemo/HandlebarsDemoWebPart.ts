import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HandlebarsDemo.module.scss';
import * as strings from 'handlebarsDemoStrings';
import { IHandlebarsDemoWebPartProps } from './IHandlebarsDemoWebPartProps';

// Importing handlebars
import * as Handlebars from 'handlebars';

// load and precompile template
var HelloWorldTemplate = <HandlebarsTemplateDelegate>require('../../templates/HelloWorld.hbs');

export default class HandlebarsDemoWebPart extends BaseClientSideWebPart<IHandlebarsDemoWebPartProps> {

  public render(): void {

    // bind data to template
    var data = {
      styles: styles,
      description: this.properties.description
    }

    // compile and add template
    this.domElement.innerHTML = HelloWorldTemplate(data);

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
