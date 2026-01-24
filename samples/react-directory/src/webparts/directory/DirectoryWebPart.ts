import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
} from '@microsoft/sp-property-pane';

import * as strings from 'DirectoryWebPartStrings';
import DirectoryHook from './components/DirectoryHook';
import { IDirectoryProps } from './components/IDirectoryProps';
import {
  FluentProvider,
  teamsDarkTheme,
  teamsLightTheme,
  Theme,
  webDarkTheme,
  webLightTheme,
  IdPrefixProvider,
} from '@fluentui/react-components';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';

export interface IDirectoryWebPartProps {
  title: string;
  searchFirstName: boolean;
  searchProps: string;
  clearTextSearchProps: string;
  pageSize: number;
  justifycontent: boolean;
}

export enum AppMode {
  SharePoint,
  SharePointLocal,
  Teams,
  TeamsModern,
  Office,
  OfficeLocal,
  Outlook,
  OutlookLocal,
}

export default class DirectoryWebPart extends BaseClientSideWebPart<IDirectoryWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _appMode: AppMode = AppMode.SharePoint;
  private _theme: Theme = webLightTheme;

  public render(): void {
    const element: React.ReactElement<IDirectoryProps> = React.createElement(
      DirectoryHook,
      {
        title: this.properties.title,
        context: this.context,
        searchFirstName: this.properties.searchFirstName,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        searchProps: this.properties.searchProps,
        clearTextSearchProps: this.properties.clearTextSearchProps,
        pageSize: this.properties.pageSize,
        useSpaceBetween: this.properties.justifycontent,
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
      }
    );

    //wrap the component with the Fluent UI 9 Provider.
    const fluentElement: React.ReactElement = React.createElement(
      IdPrefixProvider,
      {
        value: 'reactDirectoryWebpart-',
      },
      React.createElement(
        FluentProvider,
        {
          theme:
            this._appMode === AppMode.Teams ||
            this._appMode === AppMode.TeamsModern
              ? this._isDarkTheme
                ? teamsDarkTheme
                : teamsLightTheme
              : this._appMode === AppMode.SharePoint ||
                this._appMode === AppMode.SharePointLocal
              ? this._isDarkTheme
                ? webDarkTheme
                : this._theme
              : this._isDarkTheme
              ? webDarkTheme
              : webLightTheme,
        },
        element
      )
    );

    ReactDom.render(fluentElement, this.domElement);
  }

  protected async onInit(): Promise<void> {
    await this._getTeamsEnvironment();
  }

  private _getTeamsEnvironment(): Promise<string> {
    const _l = this.context.isServedFromLocalhost;
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          console.log(context, 'context');
          const environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              this._appMode = _l ? AppMode.OfficeLocal : AppMode.Office;
              break;
            case 'Outlook': // running in Outlook
              this._appMode = _l ? AppMode.OutlookLocal : AppMode.Outlook;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              this._appMode = _l ? AppMode.TeamsModern : AppMode.Teams;
              break;
            default:
              throw new Error('Unknown host');
          }

          return environmentMessage;
        });
    } else this._appMode = _l ? AppMode.SharePointLocal : AppMode.SharePoint;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
    //if the app mode is sharepoint, adjust the fluent ui 9 web light theme to use the sharepoint theme color, teams/dark mode should be fine on default
    if (
      this._appMode === AppMode.SharePoint ||
      this._appMode === AppMode.SharePointLocal
    ) {
      this._theme = createV9Theme(currentTheme as undefined, webLightTheme);
    }
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                }),
                PropertyPaneToggle('searchFirstName', {
                  checked: false,
                  label: 'Search on First Name ?',
                }),
                PropertyPaneToggle('justifycontent', {
                  checked: false,
                  label: 'Result Layout',
                  onText: 'SpaceBetween',
                  offText: 'Center',
                }),
                PropertyPaneTextField('searchProps', {
                  label: strings.SearchPropsLabel,
                  description: strings.SearchPropsDesc,
                  value: this.properties.searchProps,
                  multiline: false,
                  resizable: false,
                }),
                PropertyPaneTextField('clearTextSearchProps', {
                  label: strings.ClearTextSearchPropsLabel,
                  description: strings.ClearTextSearchPropsDesc,
                  value: this.properties.clearTextSearchProps,
                  multiline: false,
                  resizable: false,
                }),
                PropertyPaneSlider('pageSize', {
                  label: 'Results per page',
                  showValue: true,
                  max: 20,
                  min: 2,
                  step: 2,
                  value: this.properties.pageSize,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
