import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import GroupMembershipManager from './components/GroupMembershipManager';
import { IGroupMembershipManagerProps } from './components/IGroupMembershipManagerProps';
import { FluentProvider, FluentProviderProps, teamsDarkTheme, teamsLightTheme, webLightTheme, webDarkTheme, Theme } from '@fluentui/react-components';
import { createV9Theme } from '@fluentui/react-migration-v8-v9';

export enum AppMode {
  SharePoint, Teams, Office, Outlook
}

export default class GroupMembershipManagerWebPart extends BaseClientSideWebPart<{}> {
  private _isDarkTheme: boolean = false;
  private _appMode: AppMode = AppMode.SharePoint;
  private _theme: Theme = webLightTheme;

  protected async onInit(): Promise<void> {
    if (!!this.context.sdks.microsoftTeams) {
      const teamsContext = await this.context.sdks.microsoftTeams.teamsJs.app.getContext();
      switch (teamsContext.app.host.name.toLowerCase()) {
        case 'teams': this._appMode = AppMode.Teams; break;
        case 'office': this._appMode = AppMode.Office; break;
        case 'outlook': this._appMode = AppMode.Outlook; break;
        default: throw new Error('Unknown host');
      }
    } else this._appMode = AppMode.SharePoint;
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IGroupMembershipManagerProps> = React.createElement(
      GroupMembershipManager,
      {
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        context: this.context
      }
    );
 
    //wrap the component with the Fluent UI 9 Provider.
    const fluentElement: React.ReactElement<FluentProviderProps> = React.createElement(
      FluentProvider,
      {
        theme: this._appMode === AppMode.Teams ?
          this._isDarkTheme ? teamsDarkTheme : teamsLightTheme :
          this._appMode === AppMode.SharePoint ?
            this._isDarkTheme ? webDarkTheme : this._theme :
            this._isDarkTheme ? webDarkTheme : webLightTheme
      },
      element
    );

    ReactDom.render(fluentElement, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
    //if the app mode is sharepoint, adjust the fluent ui 9 web light theme to use the sharepoint theme color, teams/dark mode should be fine on default
    if (this._appMode === AppMode.SharePoint) {
      this._theme = createV9Theme(currentTheme as undefined, webLightTheme);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
