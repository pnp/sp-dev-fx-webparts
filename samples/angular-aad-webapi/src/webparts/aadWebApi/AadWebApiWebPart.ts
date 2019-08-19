import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from '@microsoft/sp-loader';

import styles from './AadWebApi.module.scss';
import * as strings from 'aadWebApiStrings';
import { IAadWebApiWebPartProps } from './IAadWebApiWebPartProps';

import * as angular from 'angular';
import './app/app.module';
import 'ng-office-ui-fabric';

export default class AadWebApiWebPart extends BaseClientSideWebPart<IAadWebApiWebPartProps> {
  private $injector: angular.auto.IInjectorService;

  public constructor(context: IWebPartContext){
    super();

    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }
  public render(): void {
    if (this.renderedOnce === false){
      this.domElement.innerHTML = `
      <div ng-controller='appController as vm'>
        <div ui-view></div>
      </div>`;

      this.$injector = angular.bootstrap(this.domElement, ['elevatedprivileges']);
    }
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
