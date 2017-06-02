import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,    
  IWebPartContext,  
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as angular from 'angular';
import 'ng-office-ui-fabric';
import { SPComponentLoader } from '@microsoft/sp-loader';

import styles from './MostPopularItems.module.scss';
import * as strings from 'mostPopularItemsStrings';
import { IMostPopularItemsWebPartProps } from './IMostPopularItemsWebPartProps';

import LandingTemplate from './LandingTemplate';

export default class MostPopularItemsWebPart extends BaseClientSideWebPart<IMostPopularItemsWebPartProps> {

  private $injector: angular.auto.IInjectorService;

  public constructor(context: IWebPartContext) {
    super();
    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.min.css');
    SPComponentLoader.loadCss('https://appsforoffice.microsoft.com/fabric/2.6.1/fabric.components.min.css');
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
