import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "AwardRecognitionWebPartStrings";
import { AwardRecognition } from "./components/AwardRecognition";
import { IAwardRecognitionProps } from "./components/IAwardRecognitionProps";

import { PnpHookGlobalOptions, createProviderElement } from "pnp-react-hooks";
import { spfi, SPFx } from "@pnp/sp";

export interface IAwardRecognitionWebPartProps {
  webpartTitle: string;
  contentTitle: string;
  contentDescription: string;
  hookOptions: PnpHookGlobalOptions;
}

export default class AwardRecognitionWebPart extends BaseClientSideWebPart<IAwardRecognitionWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<IAwardRecognitionProps> =
      React.createElement(AwardRecognition, {
        webpartTitle: this.properties.webpartTitle,
        contentTitle: this.properties.contentTitle,
        contentDescription: this.properties.contentDescription,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
      });

    // Use helper function to create React elements.
    const rootElement = createProviderElement(
      this.properties.hookOptions,
      element
    );

    // Render root element.
    ReactDom.render(rootElement, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then((message) => {
      this._environmentMessage = message;
      const sp = spfi().using(SPFx(this.context));

      this.properties.hookOptions = {
        sp: sp,
        disabled: "auto",
      };
    });
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
                PropertyPaneTextField("webpartTitle", {
                  label: strings.WebpartFieldLabel,
                }),
                PropertyPaneTextField("contentTitle", {
                  label: strings.ContentTitleFieldLabel,
                }),
                PropertyPaneTextField("contentDescription", {
                  label: strings.ContentDescriptionFieldLabel,
                  multiline: true,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
