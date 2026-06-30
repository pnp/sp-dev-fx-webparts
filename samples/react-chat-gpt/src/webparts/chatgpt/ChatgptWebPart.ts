import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ChatgptWebPartStrings';
import Chatgpt from './components/Chatgpt';
import { IChatgptProps } from './components/IChatgptProps';

export interface IChatgptWebPartProps {
  apiKey: string;
  modelId?: string;
}

export default class ChatgptWebPart extends BaseClientSideWebPart<IChatgptWebPartProps> {

  private _isDarkTheme: boolean = false;
  private static readonly defaultModelId = 'gpt-5-mini';

  private readonly _modelOptions: IPropertyPaneDropdownOption[] = [
    { key: 'gpt-5', text: 'GPT-5 (flagship)' },
    { key: 'gpt-5-mini', text: 'GPT-5 mini (fast default)' },
    { key: 'gpt-5-nano', text: 'GPT-5 nano (lowest cost)' },
    { key: 'gpt-4.1', text: 'GPT-4.1' },
    { key: 'gpt-4.1-mini', text: 'GPT-4.1 mini' },
    { key: 'gpt-4o', text: 'GPT-4o' },
    { key: 'gpt-4o-mini', text: 'GPT-4o mini' },
    { key: 'o3', text: 'O3 (reasoning)' },
    { key: 'o4-mini', text: 'O4 mini (reasoning)' }
  ];

  public async onInit(): Promise<void> {
    if (!this.properties.modelId) {
      this.properties.modelId = ChatgptWebPart.defaultModelId;
    }

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IChatgptProps> = React.createElement(
      Chatgpt,
      {
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        apiKey: this.properties.apiKey,
        modelId: this.properties.modelId || ChatgptWebPart.defaultModelId,
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
                }),
                PropertyPaneDropdown('modelId', {
                  label: strings.ModelFieldLabel,
                  options: this._modelOptions,
                  selectedKey: this.properties.modelId || ChatgptWebPart.defaultModelId
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
