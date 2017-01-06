import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import ModuleLoader from '@microsoft/sp-module-loader';

import * as angular from 'angular';
import 'ng-office-ui-fabric';

import styles from './AngularSecureCall.module.scss';
import * as strings from 'angularSecureCallStrings';
import { IAngularSecureCallWebPartProps } from './IAngularSecureCallWebPartProps';

import './app/app.module';

export default class AngularSecureCallWebPart extends BaseClientSideWebPart<IAngularSecureCallWebPartProps> {
  private $injector: ng.auto.IInjectorService;

  public constructor(context: IWebPartContext) {
    super(context);

    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `
      <div ng-controller='appController as vm'>
        <div ui-view></div>
      </div>`;

      this.$injector = angular.bootstrap(this.domElement, ['elevatedprivileges']);
    }
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
