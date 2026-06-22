import * as React from "react"
import * as ReactDom from "react-dom"
import { Version } from "@microsoft/sp-core-library"
import {
  type IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane"
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base"
import { IReadonlyTheme } from "@microsoft/sp-component-base"

import * as strings from "ReactEngageHubWebPartStrings"
import { ReactEngageHub } from "./ReactEngageHub"
import { IReactEngageHubProps } from "./IReactEngageHubProps"
import { getSP } from "./utils/spUtility"
import { Theme } from "@fluentui/react"

export interface IReactEngageHubWebPartProps {
  title: string
  maxFileLimit: number
  apiKey: string
  apiEndpoint: string
  deploymentName: string
}

export default class ReactEngageHubWebPart extends BaseClientSideWebPart<IReactEngageHubWebPartProps> {
  private _isDarkTheme: boolean = false
  private _theme: Theme | undefined
  private _environmentMessage: string = ""

  public render(): void {
    const element: React.ReactElement<IReactEngageHubProps> =
      React.createElement(ReactEngageHub, {
        isDarkTheme: this._isDarkTheme,
        theme: this._theme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value
        },
        maxFileLimit: this.properties.maxFileLimit,
        apiKey: this.properties.apiKey,
        apiEndpoint: this.properties.apiEndpoint,
        deploymentName: this.properties.deploymentName,
      })

    ReactDom.render(element, this.domElement)
  }

  public async onInit(): Promise<void> {
    await super.onInit()

    //Initialize our _sp object that we can then use in other packages without having to pass around the context.
    // Check out pnpjsConfig.ts for an example of a project setup file.
    getSP(this.context)
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return
    }
    this._theme = currentTheme as Theme
    this._isDarkTheme = !!currentTheme.isInverted
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement)
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0")
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          displayGroupsAsAccordion: true,
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneSlider("maxFileLimit", {
                  label: "Maximum files can upload",
                  min: 1,
                  max: 8,
                }),
              ],
            },
            {
              groupName: strings.AzureOpenAI,
              groupFields: [
                PropertyPaneTextField("apiKey", {
                  label: "API Key",
                }),
                PropertyPaneTextField("apiEndpoint", {
                  label: "API Endpoint",
                }),
                PropertyPaneTextField("deploymentName", {
                  label: "Deployment Name",
                }),
              ],
            },
          ],
        },
      ],
    }
  }
}
