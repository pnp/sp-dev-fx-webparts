import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneDropdown,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { Environment, EnvironmentType	} from '@microsoft/sp-core-library';
import styles from './AngularYammer.module.scss';
import * as strings from 'angularYammerStrings';
import { IAngularYammerWebPartProps } from './IAngularYammerWebPartProps';
import * as angular from 'angular'; 

export default class AngularYammerWebPart extends BaseClientSideWebPart<IAngularYammerWebPartProps> {

  private $injector: angular.auto.IInjectorService; 

  public render(): void {    

    if (this.renderedOnce === false) {     
      require('./app/home.controller.js');
      this.domElement.innerHTML = `
      <div data-ng-controller="homeController">
        <div id="{{yamfeedid}}" style="height:400px;width:100%">
        </div>
      </div>`;
      this.$injector = angular.bootstrap(this.domElement, ['yammerApp']);
    }

    this.$injector.get('$rootScope').$broadcast('configurationChanged', {
      network : escape(this.properties.network),
      feedType : escape(this.properties.feedType),
      defaultGroupId: this.properties.defaultGroupId,
      showOpenGraphPreview: this.properties.showOpenGraphPreview,
      promptText: escape(this.properties.promptText),
      header: this.properties.header, 
      footer: this.properties.footer,
      environment: Environment.type,
      environmentType: EnvironmentType,
      domElement: this.domElement 
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
                PropertyPaneTextField('network', {
                  label: strings.NetworkFieldLabel
                }),
                PropertyPaneTextField('feedtype', {
                  label: strings.FeedTypeFieldLabel
                }),
                PropertyPaneTextField('defaultGroupId', {
                  label: strings.DefaultGroupIdFieldLabel
                }),
                PropertyPaneToggle('showOpenGraphPreview', {
                  label: strings.ShowOpenGraphPreviewFieldLabel,
                  onText: 'On',
                  offText: 'Off'
                }),
                PropertyPaneTextField('promptText', {
                  label: strings.PromptTextFieldLabel
                }),
                PropertyPaneToggle('header', {
                  label: strings.HeaderFieldLabel,
                  onText: 'On',
                  offText: 'Off'
                }),
                PropertyPaneToggle('footer', {
                  label: strings.FooterFieldLabel,
                  onText: 'On',
                  offText: 'Off'
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
