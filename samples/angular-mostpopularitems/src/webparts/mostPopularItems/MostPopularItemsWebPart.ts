import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-client-preview';

import * as angular from 'angular';
import 'ng-office-ui-fabric';
import ModuleLoader from '@microsoft/sp-module-loader';
import { EnvironmentType } from '@microsoft/sp-client-base';

import * as strings from 'mostPopularItemsStrings';
import { IMostPopularItemsWebPartProps } from './IMostPopularItemsWebPartProps';
import styles from './MostPopularItems.module.scss';
import LandingTemplate from './LandingTemplate';

export default class MostPopularItemsWebPart extends BaseClientSideWebPart<IMostPopularItemsWebPartProps> {

  private $injector: ng.auto.IInjectorService;

  public constructor(context: IWebPartContext) {
    super(context);
    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    ModuleLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = LandingTemplate.templateHtml;
      require('./app/controller_home.js');
      this.$injector = angular.bootstrap(this.domElement, ['app_MostPopularItems']);
    }

    this.$injector.get('$rootScope').$broadcast('configurationChanged', {
      url: this.properties.url,
      numberOfItems: this.properties.numberOfItems
    });
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
                PropertyPaneTextField('url', {
                  label: strings.UrlFieldLabel
                }),
                PropertyPaneSlider('numberOfItems', {
                  label: strings.NumberOfItemsFieldLabel,
                  min: 5,
                  max: 25,
                  step: 1
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
}
