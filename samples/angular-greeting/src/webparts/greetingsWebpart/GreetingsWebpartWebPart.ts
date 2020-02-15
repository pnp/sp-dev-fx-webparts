import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './GreetingsWebpartWebPart.module.scss';
import * as strings from 'GreetingsWebpartWebPartStrings';

export interface IGreetingsWebpartWebPartProps {
  description: string;
}

import * as angular from "angular";
import "./app/app.module";

export default class GreetingsWebpartWebPart extends BaseClientSideWebPart <IGreetingsWebpartWebPartProps> {

  private $injector: angular.auto.IInjectorService;

  public render(): void {

    if (this.renderedOnce === false) {
      this.domElement.innerHTML = `<greeting-component></greeting-component>`;
      this.$injector = angular.bootstrap(this.domElement, ["greeting-webpart-app"]);
    }

    let obj1={
      //webTitle, userDisplayName
      currentUserId: this.context.pageContext.legacyPageContext['userId'],
      webAbsoluteUrl: this.context.pageContext.legacyPageContext['webAbsoluteUrl'],
      webTitle: this.context.pageContext.legacyPageContext['webTitle'],
      userDisplayName: this.context.pageContext.legacyPageContext['userDisplayName'],
      tempData: this.properties.description
    };

    this.$injector.get("$rootScope").$broadcast("configurationChangedGreetingWebPart", obj1);
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
