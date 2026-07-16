import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'CopilotAgentStrings';
import CopilotAgent from './components/CopilotAgent';
import { ICopilotAgentProps } from './components/ICopilotAgentProps';

export interface ICopilotAgentWebPartProps {
  agentEndpoint: string;
  agentName: string;
  webPartTitle: string;
}

export default class CopilotAgentWebPart extends BaseClientSideWebPart<ICopilotAgentWebPartProps> {

  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<ICopilotAgentProps> = React.createElement(
      CopilotAgent,
      {
        agentEndpoint: this.properties.agentEndpoint,
        agentName: this.properties.agentName,
        webPartTitle: this.properties.webPartTitle,
        isDarkTheme: this._isDarkTheme,
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
      if (semanticColors.bodyText) {
        this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
      } else {
        this.domElement.style.removeProperty('--bodyText');
      }

      if (semanticColors.link) {
        this.domElement.style.setProperty('--link', semanticColors.link);
      } else {
        this.domElement.style.removeProperty('--link');
      }

      if (semanticColors.linkHovered) {
        this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);
      } else {
        this.domElement.style.removeProperty('--linkHovered');
      }
    }

  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
              groupName: strings.AgentConfigurationGroupName,
              groupFields: [
                PropertyPaneTextField('webPartTitle', { label: strings.WebPartTitleFieldLabel }),
                PropertyPaneTextField('agentName', { label: strings.AgentNameFieldLabel }),
                PropertyPaneTextField('agentEndpoint', { label: strings.AgentEndpointFieldLabel })
              ]
            }
          ]
        }
      ]
    };
  }
}
