import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import SecretSanta from './components/SecretSanta';
import { ISecretSantaProps } from './components/ISecretSantaProps';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import '@pnp/sp/site-users/web';

export interface ISecretSantaWebPartProps {
  listName: string;
  webpartTitle: string;
  theme: string;
}

export default class SecretSantaWebPart extends BaseClientSideWebPart<ISecretSantaWebPartProps> {
  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<ISecretSantaProps> = React.createElement(
      SecretSanta,
      {
        context: this.context,
        listName: this.properties.listName,
        webpartTitle: this.properties.webpartTitle,
        theme: this.properties.theme || 'light',
        isDarkTheme: this._isDarkTheme,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    if (!this.properties.listName) {
      this.properties.listName = 'Secret Santa';
    }

    if (!this.properties.webpartTitle) {
      this.properties.webpartTitle = 'Secret Santa';
    }

    if (!this.properties.theme) {
      this.properties.theme = 'light';
    }

  }


  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;

    const { semanticColors } = currentTheme;
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
            description: "Configure your Secret Santa Web Part",
          },
          groups: [
            {
              groupName: "General Settings",
              groupFields: [
                PropertyPaneTextField('webpartTitle', {
                  label: 'Webpart Title',
                  value: this.properties.webpartTitle || 'Secret Santa',
                }),
                PropertyPaneTextField('listName', {
                  label: 'List Name',
                  value: this.properties.listName || 'Secret Santa',
                }),
                PropertyPaneDropdown('theme', {
                  label: 'Theme',
                  options: [
                    { key: 'light', text: 'Light Theme' },
                    { key: 'dark', text: 'Dark Theme' },
                  ],
                  selectedKey: this.properties.theme || 'light',
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
