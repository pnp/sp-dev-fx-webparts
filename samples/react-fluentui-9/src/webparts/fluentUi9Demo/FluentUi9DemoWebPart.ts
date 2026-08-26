import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme, ThemeProvider } from '@microsoft/sp-component-base';
import FluentUi9Demo from './components/FluentUi9Demo';
import { IFluentUi9DemoProps } from './components/IFluentUi9DemoProps';
import { FluentProvider, FluentProviderProps, teamsDarkTheme, teamsLightTheme, webLightTheme, webDarkTheme, Theme, IdPrefixProvider } from '@fluentui/react-components';
import { createV9Theme } from "@fluentui/react-migration-v8-v9";

export enum AppMode {
  SharePoint, SharePointLocal, Teams, TeamsLocal, Office, OfficeLocal, Outlook, OutlookLocal
}

export default class FluentUi9DemoWebPart extends BaseClientSideWebPart<{}> {

  private _isDarkTheme: boolean = false;
  private _appMode: AppMode = AppMode.SharePoint;
  private _theme: Theme | undefined;

  protected async onInit(): Promise<void> {
    const _l = this.context.isServedFromLocalhost;
    if (!!this.context.sdks.microsoftTeams) {
      const teamsContext = await this.context.sdks.microsoftTeams.teamsJs.app.getContext();
      switch (teamsContext.app.host.name.toLowerCase()) {
        case 'teams': this._appMode = _l ? AppMode.TeamsLocal : AppMode.Teams; break;
        case 'office': this._appMode = _l ? AppMode.OfficeLocal : AppMode.Office; break;
        case 'outlook': this._appMode = _l ? AppMode.OutlookLocal : AppMode.Outlook; break;
        default: throw new Error('Unknown host');
      }
    } else this._appMode = _l ? AppMode.SharePointLocal : AppMode.SharePoint;
    const themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    const _theme = themeProvider.tryGetTheme();
    this._theme = createV9Theme(_theme as never, _theme?.isInverted ? webDarkTheme : webLightTheme);
;
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IFluentUi9DemoProps> = React.createElement(
      FluentUi9Demo,
      {
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        appMode: this._appMode
      }
    );

    //wrap the component with the Fluent UI 9 Provider.
    const fluentElement: React.ReactElement<FluentProviderProps> = React.createElement(
      FluentProvider,
      {
        theme: this._appMode === AppMode.Teams || this._appMode === AppMode.TeamsLocal ?
          this._isDarkTheme ? teamsDarkTheme : teamsLightTheme :
          this._appMode === AppMode.SharePoint || this._appMode === AppMode.SharePointLocal ?
            this._isDarkTheme ? webDarkTheme : this._theme :
            this._isDarkTheme ? webDarkTheme : webLightTheme
      },
      element
    );

    const idprefixProvider =  React.createElement(
      IdPrefixProvider, 
      { 
        value: this.componentId
      },
      fluentElement
    )

    ReactDom.render(idprefixProvider, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
    //if the app mode is sharepoint, adjust the fluent ui 9 web light theme to use the sharepoint theme color, teams/dark mode should be fine on default
    this._theme = createV9Theme(currentTheme as never, currentTheme.isInverted ? webDarkTheme : webLightTheme);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}