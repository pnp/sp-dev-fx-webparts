import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ChatgptWebPartStrings';
import Chatgpt from './components/Chatgpt';
import { IChatgptProps } from './components/IChatgptProps';

export interface IChatgptWebPartProps {
  apiKey: string;
}

export default class ChatgptWebPart extends BaseClientSideWebPart<IChatgptWebPartProps> {

  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<IChatgptProps> = React.createElement(
      Chatgpt,
      {
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        apiKey: this.properties.apiKey,
        context: this.context
      }
    );

    ReactDom.render(element, this.domElement);
  }


  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
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
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('apiKey', {
                  label: strings.ApiKeyFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
