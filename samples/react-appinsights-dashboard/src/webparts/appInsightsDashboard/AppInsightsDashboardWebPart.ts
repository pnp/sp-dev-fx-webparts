import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'AppInsightsDashboardWebPartStrings';
import AppInsightsDashboard from './components/AppInsightsDashboard';
import { IAppInsightsDashboardProps } from './components/AppInsightsDashboard';

export interface IAppInsightsDashboardWebPartProps {
  AppId: string;
  AppKey: string;
}

export default class AppInsightsDashboardWebPart extends BaseClientSideWebPart<IAppInsightsDashboardWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAppInsightsDashboardProps> = React.createElement(
      AppInsightsDashboard,
      {
        AppId: this.properties.AppId,
        AppKey: this.properties.AppKey,
        DisplayMode: this.displayMode,
        onConfigure: this._onConfigure,
        httpClient: this.context.httpClient
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  public _onConfigure = () => {
    this.context.propertyPane.open();
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
                PropertyPaneTextField('AppId', {
                  label: strings.AppIdLabel,
                  multiline: false,
                  placeholder: strings.AppIdLabel,
                  resizable: false,
                  value: this.properties.AppId
                }),
                PropertyPaneTextField('AppKey', {
                  label: strings.AppKeyLabel,
                  multiline: false,
                  placeholder: strings.AppKeyLabel,
                  resizable: false,
                  value: this.properties.AppKey
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
