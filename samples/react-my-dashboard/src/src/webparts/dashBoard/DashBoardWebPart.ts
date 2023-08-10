import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'DashBoardWebPartStrings';
import { Theme } from 'office-ui-fabric-react';

import {
  Providers,
  SharePointProvider,
} from '@microsoft/mgt';
import { applyTheme } from '@microsoft/mgt-react';
import {
  BaseComponentContext,
  IReadonlyTheme,
} from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { EAppHostName } from '../../models/EAppHostName';
import { getSP } from '../../pnpjs/pnpjsConfig';
import { Dashboard } from './DashBoard';
import { IDashBoardProps } from './IDashBoardProps';

export interface IDashBoardWebPartProps {
  title: string;
}

export default class DashBoardWebPart extends BaseClientSideWebPart<IDashBoardWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _theme: Theme | undefined;
  private _themeString: string = "";
  private _appHostName: EAppHostName = EAppHostName.SharePoint;

  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    if (theme === "dark") {
      this._themeString = "dark";
      applyTheme("dark");
    }

    if (theme === "default") {
      this._themeString = "default";
      applyTheme("light");
    }

    if (theme === "contrast") {
      this._themeString = "contrast";
    }
    this.render();
  };

  public render(): void {
    const element: React.ReactElement<IDashBoardProps> = React.createElement(Dashboard, {
      isDarkTheme: this._isDarkTheme,
      themeString: this._themeString ?? "default",
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      context: this.context as BaseComponentContext,
      theme: this._theme,
      title: this.properties.title ?? strings.MyDashboard,
      appHostName: this._appHostName,
    });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    if (!Providers.globalProvider) {
      Providers.globalProvider = new SharePointProvider(this.context);
    }
    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const teamsContext = await this.context.sdks.microsoftTeams?.teamsJs.app.getContext();
      switch (teamsContext.app.host.name.toLowerCase()) {
        case "teams":
          this._appHostName = EAppHostName.Teams;
          break;
        case "office":
          this._appHostName = EAppHostName.Office;
          break;
        case "outlook":
          this._appHostName = EAppHostName.Outlook;
          break;
        default:
          throw new Error("[DashBoardWebPart._onInit]: Unknown app host name");
      }
      this._applyTheme(teamsContext.app.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.app.registerOnThemeChangeHandler(this._applyTheme);
    }

    getSP(this.context);
    return Promise.resolve();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }
    this._theme = currentTheme as Theme;
    this._isDarkTheme = !!currentTheme.isInverted;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
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
                PropertyPaneTextField("title", {
                  label: strings.DescriptionFieldLabel,
                  value: this.properties.title ?? strings.MyDashboard,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
