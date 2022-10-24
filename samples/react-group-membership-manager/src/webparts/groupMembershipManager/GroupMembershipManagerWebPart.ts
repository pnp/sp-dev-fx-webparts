import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import GroupMembershipManager from './components/GroupMembershipManager';
import { IGroupMembershipManagerProps } from './components/IGroupMembershipManagerProps';
import { FluentProvider, FluentProviderProps, teamsDarkTheme, teamsLightTheme, webLightTheme, webDarkTheme, Theme } from '@fluentui/react-components';

export enum AppMode {
  SharePoint, SharePointLocal, Teams, TeamsLocal
}

export default class GroupMembershipManagerWebPart extends BaseClientSideWebPart<{}> {
  private _isDarkTheme: boolean = false;
  private _appMode: AppMode = AppMode.SharePoint;
  private _theme: Theme = webLightTheme;

  protected onInit(): Promise<void> {
    //on initalizational set the App Mode
    this._appMode = !!this.context.sdks.microsoftTeams ? (this.context.isServedFromLocalhost ? AppMode.TeamsLocal : AppMode.Teams) : (this.context.isServedFromLocalhost) ? AppMode.SharePointLocal : AppMode.SharePoint;
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
        theme : this._appMode === AppMode.Teams || this._appMode === AppMode.TeamsLocal ? 
                  this._isDarkTheme ? teamsDarkTheme : teamsLightTheme : 
                  this._isDarkTheme ? webDarkTheme : this._theme
      },
      element
    );

    ReactDom.render(fluentElement, this.domElement);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;

    //if the app mode is sharepoint, adjust the fluent ui 9 web light theme to use the sharepoint theme color, teams/dark mode should be fine on default
    if (this._appMode === AppMode.SharePoint || this._appMode === AppMode.SharePointLocal) {
      this._theme = {...webLightTheme, 
        colorBrandBackground: currentTheme.palette.themePrimary,
        colorBrandBackgroundHover: currentTheme.palette.themeDark,
        colorBrandBackgroundPressed: currentTheme.palette.themeDarker,
        colorCompoundBrandForeground1: currentTheme.palette.themePrimary,
        colorCompoundBrandForeground1Hover: currentTheme.palette.themeDark,
        colorCompoundBrandForeground1Pressed: currentTheme.palette.themeDarker,
        colorNeutralForeground2BrandHover: currentTheme.palette.themeSecondary,
        colorNeutralForeground2BrandPressed: currentTheme.palette.themeDarkAlt,
        colorNeutralForeground2BrandSelected: currentTheme.palette.themeDarkAlt,
        colorBrandForeground1: currentTheme.palette.themeSecondary,
        colorBrandStroke1: currentTheme.palette.themePrimary,
        colorBrandStroke2: currentTheme.palette.themeSecondary,
        colorCompoundBrandStroke: currentTheme.palette.themePrimary,
        colorCompoundBrandStrokeHover: currentTheme.palette.themeSecondary,
        colorCompoundBrandStrokePressed: currentTheme.palette.themeDarkAlt,
        colorCompoundBrandBackground: currentTheme.palette.themePrimary,
        colorCompoundBrandBackgroundHover: currentTheme.palette.themeDark,
        colorCompoundBrandBackgroundPressed: currentTheme.palette.themeDarker,

      };
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
      ]
    };
  }
}
