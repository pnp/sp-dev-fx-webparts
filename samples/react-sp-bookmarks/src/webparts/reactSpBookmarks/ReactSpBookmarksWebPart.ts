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

import * as strings from 'ReactSpBookmarksWebPartStrings';
import ReactSpBookmarks from './components/ReactSpBookmarks';
import { IReactSpBookmarksProps } from './components/IReactSpBookmarksProps';
import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';

export interface IReactSpBookmarksWebPartProps {
  title: string;
  listName: string;
  theme: string; // Add theme property
}

export default class ReactSpBookmarksWebPart extends BaseClientSideWebPart<IReactSpBookmarksWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IReactSpBookmarksProps> = React.createElement(
      ReactSpBookmarks,
      {
        title: this.properties.title,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        spHttpClient: this.context.spHttpClient,
        webUrl: this.context.pageContext.web.absoluteUrl,
        listName: this.properties.listName,
        context: this.context,
        theme: this.properties.theme || 'light', // Pass the theme property
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // Set default list name if not configured
    if (!this.properties.listName) {
      this.properties.listName = 'Bookmarks';
    }

    if (!this.properties.title) {
      this.properties.title = 'Bookmarks Manager';
    }

    // Set default theme if not configured
    if (!this.properties.theme) {
      this.properties.theme = 'light';
    }

    this._environmentMessage = await this._getEnvironmentMessage();
    return super.onInit();
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office':
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case 'Outlook':
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case 'Teams':
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
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
            description: "This webpart lets you manage links/bookmarks in a SharePoint list.",
          },
          groups: [
            {
              groupName: "Bookmarks Settings",
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Webpart Title',
                  value: this.properties.title || 'Bookmarks Manager',
                }),
                PropertyPaneTextField('listName', {
                  label: 'List Name',
                  value: this.properties.listName || 'Bookmarks',
                }),
                PropertyPaneDropdown('theme', {
                  label: 'Theme',
                  options: [
                    { key: 'light', text: 'Light Theme' },
                    { key: 'dark', text: 'Dark Theme' },
                  ],
                  selectedKey: this.properties.theme || 'light', // Default to light theme
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}