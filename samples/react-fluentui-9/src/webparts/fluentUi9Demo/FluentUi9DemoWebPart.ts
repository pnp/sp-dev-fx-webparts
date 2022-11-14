import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import * as strings from 'FluentUi9DemoWebPartStrings';
import FluentUi9Demo from './components/FluentUi9Demo';
import { IFluentUi9DemoProps } from './components/IFluentUi9DemoProps';
import { FluentProvider, FluentProviderProps, teamsDarkTheme, teamsLightTheme, webLightTheme, webDarkTheme, Theme } from '@fluentui/react-components';
import { createv9Theme } from './shims/v9ThemeShim';

export enum AppMode {
  SharePoint, SharePointLocal, Teams, TeamsLocal
}

export default class FluentUi9DemoWebPart extends BaseClientSideWebPart<{}> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _appMode: AppMode = AppMode.SharePoint;
  private _theme: Theme = webLightTheme;

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();
    //on initalizational set the App Mode
    this._appMode = !!this.context.sdks.microsoftTeams ? (this.context.isServedFromLocalhost ? AppMode.TeamsLocal : AppMode.Teams) : (this.context.isServedFromLocalhost) ? AppMode.SharePointLocal : AppMode.SharePoint;
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IFluentUi9DemoProps> = React.createElement(
      FluentUi9Demo,
      {
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context
      }
    );

    //wrap the component with the Fluent UI 9 Provider.
    const fluentElement: React.ReactElement<FluentProviderProps> = React.createElement(
      FluentProvider,
      {
        theme : this._appMode === AppMode.Teams || this._appMode === AppMode.TeamsLocal ? 
                  this._isDarkTheme ? teamsDarkTheme : teamsLightTheme : 
                  this._isDarkTheme ? webDarkTheme : this._theme
      },
      element
    );

    ReactDom.render(fluentElement, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;

    //if the app mode is sharepoint, adjust the fluent ui 9 web light theme to use the sharepoint theme color, teams/dark mode should be fine on default
    if (this._appMode === AppMode.SharePoint || this._appMode === AppMode.SharePointLocal) {
      this._theme = createv9Theme(currentTheme, webLightTheme);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}