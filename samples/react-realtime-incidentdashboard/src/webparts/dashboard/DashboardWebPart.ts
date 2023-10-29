import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "DashboardWebPartStrings";
import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
  PropertyFieldTextWithCallout,
} from "@pnp/spfx-property-controls";
import { CalloutTriggers } from "@pnp/spfx-property-controls/lib/common/callout/Callout";
import { ListSubscriptionFactory } from "@microsoft/sp-list-subscription";
import { IAppContext } from "./models/IAppContext";
import { AppContext } from "./hooks/AppContext";
import { Dashboard } from "./components/Dashboard";
import { ConsoleListener, Logger } from "@pnp/logging";
import { SPFx, spfi } from "@pnp/sp";
import SPService from "../../common/services/SPService";

export interface IDashboardWebPartProps {
  title: string;
  description: string;
  siteUrl: string;
  libraryId: string;
}
const LOG_SOURCE: string = "DashboardWebPart";
export default class DashboardWebPart extends BaseClientSideWebPart<IDashboardWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    console.log(this._isDarkTheme);
    console.log(this._environmentMessage);
    // One main context that will hold all necessary context, properties for your webpart
    const appContext: IAppContext = {
      webpartContext: this.context,
      properties: this.properties,
      listSubscriptionFactory: new ListSubscriptionFactory(this),
    };
    const element: React.ReactElement = React.createElement(
      AppContext.Provider,
      {
        value: {
          appContext: appContext,
        },
      },
      React.createElement(Dashboard)
    );
    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // return this._getEnvironmentMessage().then((message) => {
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
            case "TeamsModern":
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

  protected onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    if (propertyPath === "libraryId" && newValue) {
      //   // push new list value
      //   super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
      //   // refresh the item selector control by repainting the property pane
      this.context.propertyPane.refresh();
      //   // re-render the web part as clearing the loading indicator removes the web part body
      this.render();
    } else {
      //super.onPropertyPaneFieldChanged(propertyPath, oldValue, oldValue);
    }
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
              groupName: "Header",
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Title",
                }),
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
            {
              groupName: "Settings",
              groupFields: [
                PropertyFieldTextWithCallout("siteUrl", {
                  calloutTrigger: CalloutTriggers.Click,
                  key: "siteUrlFieldId",
                  label: "Site URL",
                  calloutContent: React.createElement(
                    "span",
                    {},
                    "URL of the site where the document library to show documents from is located. Leave empty to connect to a document library from the current site"
                  ),
                  calloutWidth: 250,
                  value: this.properties.siteUrl,
                }),
                PropertyFieldListPicker("libraryId", {
                  label: "Select a document library",
                  selectedList: this.properties.libraryId,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as any,
                  deferredValidationTime: 0,
                  key: "listPickerFieldId",
                  webAbsoluteUrl: this.properties.siteUrl,
                  baseTemplate: 100,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
