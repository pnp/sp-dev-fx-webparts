import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';
import * as angular from 'angular';

import styles from './Poll.module.scss';
import * as strings from 'pollStrings';
import { IPollWebPartProps } from './IPollWebPartProps';
import { IConfigurationChanged } from './IConfigurationChanged';
import './app/app.module';

export default class PollWebPart extends BaseClientSideWebPart<IPollWebPartProps> {
  private $injector: ng.auto.IInjectorService;

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `
      <div class="${styles.poll}" ng-controller="appController as vm">
        <div ui-view></div>
      </div>`;

      this.$injector = angular.bootstrap(this.domElement, ['poll']);
    }

    const $rootScope: angular.IRootScopeService = this.$injector.get('$rootScope');
    $rootScope.$broadcast('configurationChanged', <IConfigurationChanged>{
      listName: this.properties.listName,
      sharePointApiUrl: this.context.pageContext.web.absoluteUrl + '/_api',
      title: this.properties.pollTitle,
      description: this.properties.pollDescription,
      displayMode: this.displayMode
    });
    $rootScope.$on('startConfiguration', (event: angular.IAngularEvent): void => {
      this.configureStart();
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
              groupName: strings.ViewGroupName,
              groupFields: [
                PropertyPaneTextField('pollTitle', {
                  label: strings.PollTitleFieldLabel,
                  onGetErrorMessage: this.validatePollTitle
                }),
                PropertyPaneTextField('pollDescription', {
                  label: strings.PollDescriptionFieldLabel
                })
              ]
            },
            {
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel,
                  onGetErrorMessage: this.validateListName
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private validatePollTitle(pollTitle: string): string {
    if (pollTitle.trim().length === 0) {
      return 'Please enter title of this poll';
    }
    else {
      return '';
    }
  }

  private validateListName(listName: string): string {
    if (listName.trim().length === 0) {
      return 'Please enter the name of the list';
    }
    else {
      return '';
    }
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
}
