import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import * as strings from "SmartDevOpsWebPartStrings";
import { ISmartDevOpsProps } from "./components/ISmartDevOpsProps";
import { ConsoleListener, Logger } from "@pnp/logging";
import AzureDevOpsService from "../../services/AzureDevOpsService";
import { SmartDevOps } from "./components/SmartDevOps";
import { PropertyPaneAsyncDropdown } from "../../controls/PropertyPaneAsyncDropdown/PropertyPaneAsyncDropdown";
import { IDropdownOption } from "@fluentui/react";
//import { get, update } from '@microsoft/sp-lodash-subset';
import { SPComponentLoader } from "@microsoft/sp-loader";

export interface ISmartDevOpsWebPartProps {
  organizationName: string;
  openAPIKey: string;
}

const LOG_SOURCE: string = "SmartDevOpsWebPart";
export default class SmartDevOpsWebPart extends BaseClientSideWebPart<ISmartDevOpsWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<ISmartDevOpsProps> = React.createElement(
      SmartDevOps,
      {
        context: this.context,
        organizationName: this.properties.organizationName,
        openAPIKey: this.properties.openAPIKey,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        httpClient: this.context.httpClient,
        configureWebPart: this.configureWebPart,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // subscribe a listener
    Logger.subscribe(
      ConsoleListener(LOG_SOURCE, { warning: "#e36c0b", error: "#a80000" })
    );

    SPComponentLoader.loadCss(
      "https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
    );

    //Init Azure DevOps Service
    await AzureDevOpsService.Init(this.context);

    return this._getEnvironmentMessage().then((message) => {
      this._environmentMessage = message;
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
          groups: [
            {
              groupName: strings.OpenAPISettingsGroupName,
              groupFields: [
                PropertyPaneTextField("openAPIKey", {
                  label: "Open API Key",
                }),
              ],
            },
            {
              groupName: strings.DevOpsSettingsGroupName,
              groupFields: [
                new PropertyPaneAsyncDropdown("organizationName", {
                  label: "Organization name",
                  loadOptions: this.loadsDevOpsOrgs.bind(this),
                  onPropertyChange: this.onChange.bind(this),
                  selectedKey: this.properties.organizationName,
                  disabled: false,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
  private configureWebPart(): void {
    this.context.propertyPane.open();
  }
  private loadsDevOpsOrgs(): Promise<IDropdownOption[]> {
    return new Promise<IDropdownOption[]>(async (resolve, reject) => {
      let options: IDropdownOption[] = [];

      const profile = await AzureDevOpsService.getProfile();
      const accounts = await AzureDevOpsService.getAccounts(profile.id);
      options = accounts.map((account) => {
        return {
          key: account.accountName,
          text: account.accountName,
        };
      });
      resolve(options);
    });
  }

  private onChange(propertyPath: string, newValue: any): void {
    if (propertyPath === "organizationName" && newValue) {
      // Update the web part property
      this.properties.organizationName = newValue;
      // Refresh the web part to reflect the new property value
      this.render();
      this.context.propertyPane.refresh();
    }
  }
}
