import * as React from "react"
import * as ReactDom from "react-dom"
import { Version } from "@microsoft/sp-core-library"
import {
  type IPropertyPaneConfiguration,
  PropertyPaneToggle,
} from "@microsoft/sp-property-pane"
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base"
import { IReadonlyTheme, ThemeProvider } from "@microsoft/sp-component-base"
import {
  FluentProvider,
  FluentProviderProps,
  teamsDarkTheme,
  teamsLightTheme,
  webLightTheme,
  webDarkTheme,
  Theme,
  IdPrefixProvider,
} from "@fluentui/react-components"
import {
  PropertyFieldListPicker,
  PropertyFieldListPickerOrderBy,
} from "@pnp/spfx-property-controls/lib/PropertyFieldListPicker"

import * as strings from "ContentCalendarWebPartStrings"
import { App } from "./App"
import { IContentCalendarProps } from "./interfaces/IContentCalendarProps"
import { mapSharePointThemeToV9 } from "./theme/themeMap"
import { getDefaultConfig, IContentCalendarConfig } from "./models"
import { createContentService, IContentService } from "./services"

export interface IContentCalendarWebPartProps {
  title: string
  // The Site Pages library (or any list) that backs the calendar.
  listId: string
  // Show the Draft / Scheduled / Published status legend.
  showStatusLegend: boolean
}

export enum AppMode {
  SharePoint,
  SharePointLocal,
  Teams,
  TeamsLocal,
  Office,
  OfficeLocal,
  Outlook,
  OutlookLocal,
}

export default class ContentCalendarWebPart extends BaseClientSideWebPart<IContentCalendarWebPartProps> {
  private _isDarkTheme: boolean = false
  private _appMode: AppMode = AppMode.SharePoint
  private _theme: Theme | undefined
  private _service: IContentService | undefined

  public render(): void {
    const element: React.ReactElement<IContentCalendarProps> =
      React.createElement(App, {
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
        appMode: this._appMode,
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value
        },
        service: this._service as IContentService,
        config: this.buildConfig(),
        locale: this.context.pageContext.cultureInfo.currentUICultureName || "en-US",
        instanceId: this.context.instanceId,
      })

    //wrap the component with the Fluent UI 9 Provider.
    const fluentElement: React.ReactElement<FluentProviderProps> =
      React.createElement(
        FluentProvider,
        {
          theme:
            this._appMode === AppMode.Teams ||
            this._appMode === AppMode.TeamsLocal
              ? this._isDarkTheme
                ? teamsDarkTheme
                : teamsLightTheme
              : this._appMode === AppMode.SharePoint ||
                  this._appMode === AppMode.SharePointLocal
                ? this._isDarkTheme
                  ? webDarkTheme
                  : this._theme
                : this._isDarkTheme
                  ? webDarkTheme
                  : webLightTheme,
        },
        element,
      )

    const idprefixProvider = React.createElement(
      IdPrefixProvider,
      {
        value: `content-calendar-${this.componentId}`,
      },
      fluentElement,
    )

    ReactDom.render(idprefixProvider, this.domElement)
  }

  protected async onInit(): Promise<void> {
    this._service = createContentService(this.context)
    this.applyDefaults()

    const _l = this.context.isServedFromLocalhost
    if (!!this.context.sdks.microsoftTeams) {
      const teamsContext =
        await this.context.sdks.microsoftTeams.teamsJs.app.getContext()
      switch (teamsContext.app.host.name.toLowerCase()) {
        case "teams":
          this._appMode = _l ? AppMode.TeamsLocal : AppMode.Teams
          break
        case "office":
          this._appMode = _l ? AppMode.OfficeLocal : AppMode.Office
          break
        case "outlook":
          this._appMode = _l ? AppMode.OutlookLocal : AppMode.Outlook
          break
        default:
          throw new Error("Unknown host")
      }
    } else this._appMode = _l ? AppMode.SharePointLocal : AppMode.SharePoint

    const themeProvider = this.context.serviceScope.consume(
      ThemeProvider.serviceKey,
    )
    this._theme = mapSharePointThemeToV9(themeProvider.tryGetTheme())
    return super.onInit()
  }

  // Seed the legend toggle on first drop. The field mapping and content types
  // are fixed internals (see getDefaultConfig), so nothing else is persisted.
  private applyDefaults(): void {
    if (this.properties.showStatusLegend === undefined)
      this.properties.showStatusLegend = true
  }

  // Assembles the resolved config the React tree consumes. Field mapping and
  // content types come from the built-in defaults; only the list and status
  // legend are user-facing.
  private buildConfig(): IContentCalendarConfig {
    const d = getDefaultConfig()
    return {
      ...d,
      listId: this.properties.listId || undefined,
      showStatusLegend: this.properties.showStatusLegend ?? d.showStatusLegend,
    }
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return
    this._isDarkTheme = !!currentTheme.isInverted
    this._theme = mapSharePointThemeToV9(currentTheme)
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
          header: { description: strings.DataSourcePageDescription },
          groups: [
            {
              groupName: strings.DataSourceGroupName,
              groupFields: [
                PropertyFieldListPicker("listId", {
                  label: strings.FieldListLabel,
                  selectedList: this.properties.listId,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  context: this.context as never,
                  deferredValidationTime: 0,
                  key: "listPickerFieldId",
                }),
                PropertyPaneToggle("showStatusLegend", {
                  label: strings.ShowStatusLegendLabel,
                }),
              ],
            },
          ],
        },
      ],
    }
  }
}
