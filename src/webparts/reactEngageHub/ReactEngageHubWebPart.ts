import * as React from "react"
import * as ReactDom from "react-dom"
import { Version } from "@microsoft/sp-core-library"
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane"
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base"
import { IReadonlyTheme } from "@microsoft/sp-component-base"

import * as strings from "ReactEngageHubWebPartStrings"
import { ReactEngageHub } from "./components/ReactEngageHub"
import { IReactEngageHubProps } from "./components/IReactEngageHubProps"
import { getSP } from "./utils/spUtility"

export interface IReactEngageHubWebPartProps {
  description: string
  title: string
}

export default class ReactEngageHubWebPart extends BaseClientSideWebPart<IReactEngageHubWebPartProps> {
  private _isDarkTheme: boolean = false
  private _environmentMessage: string = ""

  public render(): void {
    const element: React.ReactElement<IReactEngageHubProps> =
      React.createElement(ReactEngageHub, {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value
        },
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

    this._isDarkTheme = !!currentTheme.isInverted
    const { semanticColors } = currentTheme

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      )
      this.domElement.style.setProperty("--link", semanticColors.link || null)
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      )
    }
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
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    }
  }
}
