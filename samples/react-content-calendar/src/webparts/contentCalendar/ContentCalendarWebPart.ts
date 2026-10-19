import * as React from "react"
import * as ReactDom from "react-dom"
import { Log, Version } from "@microsoft/sp-core-library"
import {
  type IPropertyPaneConfiguration,
  PropertyPaneToggle,
  PropertyPaneDropdown,
  type IPropertyPaneDropdownOption,
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
import * as strings from "ContentCalendarWebPartStrings"
import { App } from "./App"
import { IContentCalendarProps } from "./interfaces/IContentCalendarProps"
import { mapSharePointThemeToV9 } from "./theme/themeMap"
import { getDefaultConfig, IContentCalendarConfig } from "./models"
import { createContentService, IContentService } from "./services"

export interface IContentCalendarWebPartProps {
  title: string
  // The current site's Site Pages library.
  listId: string
  contentTypeId?: string
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
  private _contentTypeOptions: IPropertyPaneDropdownOption[] = []
  private _contentTypeLoadError: boolean = false

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
        onConfigure: () => this.context.propertyPane.open(),
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
    await this.applyDefaults(this._service)

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

  private async applyDefaults(service: IContentService): Promise<void> {
    if (this.properties.showStatusLegend === undefined)
      this.properties.showStatusLegend = true
    try {
      this.properties.listId = await service.getSitePagesListId()
      this._contentTypeOptions = await service.getPageContentTypes(this.properties.listId)
      if (!this._contentTypeOptions.length) {
        throw new Error("No page content types are available in the Site Pages library.")
      }
      if (!this._contentTypeOptions.some((option) => option.key === this.properties.contentTypeId)) {
        // The shortest ID is the base Site Page type; custom descendants have longer IDs.
        this.properties.contentTypeId = this._contentTypeOptions
          .map((option) => String(option.key))
          .sort((a, b) => a.length - b.length)[0]
      }
      this._contentTypeLoadError = false
    } catch (error) {
      this.properties.listId = ""
      this._contentTypeOptions = []
      this._contentTypeLoadError = true
      Log.error(
        "ContentCalendarWebPart",
        error instanceof Error ? error : new Error(String(error)),
      )
    }
  }

  protected async onPropertyPaneConfigurationStart(): Promise<void> {
    if (!this._service) return
    await this.applyDefaults(this._service)
    this.context.propertyPane.refresh()
    this.render()
  }

  // Assembles the resolved config the React tree consumes. Field mapping and
  // colors come from the built-in defaults.
  private buildConfig(): IContentCalendarConfig {
    const d = getDefaultConfig()
    return {
      ...d,
      listId: this.properties.listId || undefined,
      contentTypeId: this.properties.contentTypeId,
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
          header: {
            description: this._contentTypeLoadError
              ? strings.ContentListsLoadError
              : strings.DataSourcePageDescription,
          },
          groups: [
            {
              groupName: strings.DataSourceGroupName,
              groupFields: [
                PropertyPaneDropdown("contentTypeId", {
                  label: strings.FieldListLabel,
                  selectedKey: this.properties.contentTypeId,
                  options: this._contentTypeOptions,
                  disabled: this._contentTypeOptions.length === 0,
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
