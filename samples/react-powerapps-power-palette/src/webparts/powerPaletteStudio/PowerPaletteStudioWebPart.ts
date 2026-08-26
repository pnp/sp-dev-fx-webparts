import * as React from "react"
import * as ReactDom from "react-dom"
import { Version } from "@microsoft/sp-core-library"
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane"
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base"
import { IReadonlyTheme } from "@microsoft/sp-component-base"
import { Theme } from "@fluentui/react"

import * as strings from "PowerPaletteStudioWebPartStrings"
import { IAppProps } from "./models/IApp"
import { App } from "./App"

export interface IPowerPaletteStudioWebPartProps {
  description: string
}

export default class PowerPaletteStudioWebPart extends BaseClientSideWebPart<IPowerPaletteStudioWebPartProps> {
  private _isDarkTheme: boolean = false
  private _theme: Theme | undefined

  public render(): void {
    const element: React.ReactElement<IAppProps> = React.createElement(App, {
      description: this.properties.description,
      isDarkTheme: this._isDarkTheme,
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      userDisplayName: this.context.pageContext.user.displayName,
      theme: this._theme,
    })

    ReactDom.render(element, this.domElement)
  }

  public async onInit(): Promise<void> {
    await super.onInit()
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
