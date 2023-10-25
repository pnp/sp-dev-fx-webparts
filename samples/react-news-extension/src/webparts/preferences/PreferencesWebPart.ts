import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "PreferencesWebPartStrings";
import { ConsoleListener, Logger } from "@pnp/logging";
import { SPFx, spfi } from "@pnp/sp";
import SPService from "../../services/SPService";
import GraphService from "../../services/GraphService";
import { Container, IContainerProps } from "./components/Container";
import CachingService from "../../services/CachingService";

export interface IPreferencesWebPartProps {
  title: string;
  extensionName: string;
  termsetGuid: string;
  enableCaching: boolean;
}
const LOG_SOURCE: string = "PreferencesWebPart";
export default class PreferencesWebPart extends BaseClientSideWebPart<IPreferencesWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<IContainerProps> = React.createElement(
      Container,
      {
        title: this.properties.title,
        extensionName: this.properties.extensionName,
        termsetGuid: this.properties.termsetGuid,
        enableCaching: this.properties.enableCaching,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        loginName: this.context.pageContext.user.loginName,
        context: this.context,
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // this._getEnvironmentMessage().then((message) => {
    //   this._environmentMessage = message;
    // });
    this._environmentMessage = await this._getEnvironmentMessage();
    // subscribe a listener
    Logger.subscribe(
      ConsoleListener(LOG_SOURCE, { warning: "#e36c0b", error: "#a80000" })
    );

    //Init SharePoint Service
    const sp = spfi().using(SPFx(this.context));
    SPService.Init(sp);
    GraphService.Init(this.context);
    CachingService.Init();

    return super.onInit();
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error("Unknown host");
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
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
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
                  label: "Title",
                }),
                PropertyPaneTextField("extensionName", {
                  label: strings.ExtensionNameFieldLabel,
                }),
                PropertyPaneTextField("termsetGuid", {
                  label: strings.TermSetIdFieldLabel,
                }),
                PropertyPaneToggle("enableCaching", {
                  label: "Enable Caching",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
