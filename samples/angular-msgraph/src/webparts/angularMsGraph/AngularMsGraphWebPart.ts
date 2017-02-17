import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext,
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './AngularMsGraph.module.scss';
import * as strings from 'angularMsGraphStrings';
import { IAngularMsGraphWebPartProps } from './IAngularMsGraphWebPartProps';

import * as angular from 'angular';
import 'ng-office-ui-fabric';
import 'hellojs';
import './app/aad';
import './app/app.module';

export default class AngularMsGraphWebPart extends BaseClientSideWebPart<IAngularMsGraphWebPartProps> {
  private $injector: angular.auto.IInjectorService;

  public constructor(context: IWebPartContext) {
    super();

    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `<angulargraphapi></angulargraphapi>`;
      this.$injector = angular.bootstrap(this.domElement, ['angularconnectsp']);
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
