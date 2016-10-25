import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import ModuleLoader from '@microsoft/sp-module-loader';
import styles from './SendEmail.module.scss';
import * as strings from 'sendEmailStrings';
import { ISendEmailWebPartProps } from './ISendEmailWebPartProps';

import * as angular from 'angular';
import './sendEmailApp/app'

export default class SendEmailWebPart extends BaseClientSideWebPart<ISendEmailWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.sendEmail}">
        <div>
        <uif-button uif-type="primary">Click here to send an Email</uif-button>
        </div>
      </div>`;

      angular.bootstrap(this.domElement, ['sendEmailApp']);
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
