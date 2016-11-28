import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import ModuleLoader from '@microsoft/sp-module-loader';

import styles from './AngularMsGraph.module.scss';
import * as strings from 'angularMsGraphStrings';
import { IAngularMsGraphWebPartProps } from './IAngularMsGraphWebPartProps';

import * as angular from 'angular';
import 'ng-office-ui-fabric';
import 'hellojs';
import './app/aad';
import GraphHelper from './app/GraphHelper';
import HomeController from './app/HomeController';

export default class AngularMsGraphWebPart extends BaseClientSideWebPart<IAngularMsGraphWebPartProps> {
  private $injector: ng.auto.IInjectorService;

  get baseUrl(): string {
    return '$BASEURL$';
  }

  public constructor(context: IWebPartContext) {
    super(context);

    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `<angulargraphapi></angulargraphapi>`;

      angular.module('angularconnectsp', [
        'officeuifabric.core',
        'officeuifabric.components'])
        .component('angulargraphapi', {
          controller: ('HomeController', HomeController),
          controllerAs: 'vm',
          templateUrl: `${this.baseUrl}home-template.html`
        })
        .service('GraphHelper', GraphHelper)
        .config(($sceDelegateProvider: ng.ISCEDelegateProvider): void => {
          $sceDelegateProvider.resourceUrlWhitelist([
            'self',
            'https://localhost:4321/dist/**'
          ]);
        });
     this.$injector = angular.bootstrap(this.domElement, ['angularconnectsp']);
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
