import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'SalesordersWebPartStrings';

import { Theme } from '@fluentui/react-components';
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { ISalesordersProps } from '../../components/ISalesordersProps';
import { Salesorders } from '../../components/Salesorders';
import { EAppHostName } from '../../constants/EAppHostname';

export interface ISalesordersWebPartProps {
  title: string;
}

export default class SalesordersWebPart extends BaseClientSideWebPart<ISalesordersWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _theme: Theme | undefined;
  private _themeString: string = "";
  private _appHostName: EAppHostName = EAppHostName.SharePoint;

  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    if (theme === "dark") {
      this._themeString = "dark";
    }
    if (theme === "default") {
      this._themeString = "default";
    }

    if (theme === "contrast") {
      this._themeString = "contrast";
    }
    this.render();
  };

   protected get disableReactivePropertyChanges(): boolean {
    return true;
  }


  public render(): void {
    const element: React.ReactElement<ISalesordersProps> = React.createElement(
      Salesorders,
      {
        isDarkTheme: this._isDarkTheme,
        theme: this._theme,
        themeString: this._themeString,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        title: this.properties.title,
        context: this.context,
        appHostName: this._appHostName,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const teamsContext = await this.context.sdks.microsoftTeams?.teamsJs.app.getContext();
      switch (teamsContext.app.host.name.toLowerCase()) {
        case "teams":
        case "teamsModern":
          this._appHostName = EAppHostName.Teams;
          break;
        case "office":
          this._appHostName = EAppHostName.Office;
          break;
        case "outlook":
          this._appHostName = EAppHostName.Outlook;
          break;
        default:
          throw new Error(`[contentFlow_onInit]: Err:'Unknown app host name'`);
      }
      this._applyTheme(teamsContext.app.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.app.registerOnThemeChangeHandler(this._applyTheme);
    }
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
    return Version.parse('1.0');
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
