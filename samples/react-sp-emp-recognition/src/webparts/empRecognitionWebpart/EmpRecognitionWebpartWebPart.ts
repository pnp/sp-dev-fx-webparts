import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'EmpRecognitionWebpartWebPartStrings';
import EmpRecognitionWebpart from './components/EmpRecognitionWebpart';
import { IEmpRecognitionWebpartProps } from './components/IEmpRecognitionWebpartProps';

export interface IEmpRecognitionWebpartWebPartProps {
  list: string;
  webpartTitle: string;
}

export default class EmpRecognitionWebpartWebPart extends BaseClientSideWebPart<IEmpRecognitionWebpartWebPartProps> {

  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IEmpRecognitionWebpartProps> = React.createElement(
      EmpRecognitionWebpart,
      {
        list: this.properties.list,
        webpartTitle: this.properties.webpartTitle,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {

    if (!this.properties.list) {
      this.properties.list = 'Employee Recognition';
    }

    if (!this.properties.webpartTitle) {
      this.properties.webpartTitle = 'Employee Recognition';
    }
  }



  
  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
              groupFields: [
                PropertyPaneTextField('webpartTitle', {
                  label: "Organisation Chart"
                }),
                PropertyPaneTextField('list', {
                  label: 'List'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
