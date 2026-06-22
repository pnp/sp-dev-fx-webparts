/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneCheckbox,
  PropertyPaneLabel,
  PropertyPaneSlider,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import * as strings from "CalendarWebPartStrings";
import { ICalendarProps } from "../../components/ICalendarProps";
import { Calendar } from "../../components/Calendar";
import { convertThemeV8toV9 } from "../../utils/themeUtils";
import { PropertyFieldCalendarPicker } from "@nuvemerudita/spfx-propertyfields";
import { EAppHostName } from "../../constants/EAppHostName";
import { Theme } from "@fluentui/react";
import { IUnifiedCalendar } from "@nuvemerudita/m365-hooks";
import { PropertyFieldHeight } from "@nuvemerudita/spfx-propertyfields";
import { PropertyFieldSelectCalendarView } from "@nuvemerudita/spfx-propertyfields";
import { ECalendarViews } from "@nuvemerudita/react-controls";

export interface ICalendarWebPartProps {
  selectedCalendars: IUnifiedCalendar[];
  title: string;
  height: string;
  autoRefresh: boolean;
  refreshInterval: number;
  defaultView: ECalendarViews;
}

export default class CalendarWebPart extends BaseClientSideWebPart<ICalendarWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _theme: Theme | undefined;
  private _themeString: string = "";
  private _appHostName: EAppHostName = EAppHostName.SharePoint;
  private _containerWidth: number = 0;

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

  public render(): void {
    this._containerWidth = this.domElement.clientWidth;
    const element: React.ReactElement<ICalendarProps> = React.createElement(
      Calendar,
      {
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        themeString: this._themeString,
        theme: this._theme,
        context: this.context,
        title: this.properties.title,
        appHostName: this._appHostName,
        isRunninglocal: !this.context.sdks.microsoftTeams,
        aadUserId: this.context.pageContext.aadInfo?.userId ?? "",
        containerWidth: this._containerWidth,
        selectedCalendars: this.properties?.selectedCalendars ?? [],
        height: this.properties.height,
        defaultView: this.properties.defaultView ?? ECalendarViews.Month,
        autoRefresh: this.properties.autoRefresh ?? true,
        refreshInterval: this.properties.refreshInterval ?? 5,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const teamsContext =
        await this.context.sdks.microsoftTeams?.teamsJs.app.getContext();

      switch (teamsContext.app.host.name.toLowerCase()) {
        case "teams":
        case "teamsmodern":
          this._appHostName = EAppHostName.Teams;
          break;
        case "office":
          this._appHostName = EAppHostName.Office;
          break;
        case "outlook":
          this._appHostName = EAppHostName.Outlook;
          break;
        default:
          throw new Error("[DashBoardWebPart._onInit]: Unknown app host name");
      }
      this._applyTheme(teamsContext.app.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.app.registerOnThemeChangeHandler(
        this._applyTheme
      );
    }
    return Promise.resolve();
  }

  protected onAfterResize(newWidth: number): void {
    this._containerWidth = newWidth;
    this.render();
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
    return Version.parse("1.0");
  }

  protected onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const theme = convertThemeV8toV9(
      this._theme as Theme,
      this._isDarkTheme,
      this._themeString
    );
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
                  label: strings.TitleFieldLabel,
                  value: this.properties?.title ?? strings.DefaultTitle,
                }),
                PropertyFieldHeight("height", {
                  key: "height",
                  styles: { marginTop: "10px" },
                  label: strings.HeightFieldLabel,
                  value: this.properties?.height ?? "800px",
                  onPropertyPaneFieldChanged:
                    this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                }),
                PropertyFieldSelectCalendarView("defaultView", {
                  key: "defaultView",
                  label: strings.CalendarViewLabel,
                  styles: { marginTop: "10px" },
                  value: this.properties?.defaultView ?? ECalendarViews.Month,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  theme: theme,
                }),
                PropertyPaneLabel("", { text: "" }),
                PropertyPaneCheckbox("autoRefresh", {
                  text: strings.AutoRefreshLabel,
                  checked: this.properties?.autoRefresh ?? true,
                  ariaLabel: strings.AutoRefreshLabel,
                }),
                PropertyPaneLabel("", { text: "" }),
                PropertyPaneSlider("refreshInterval", {
                  label: strings.AutoRefreshIntervalFieldLabel,
                  min: 1,
                  max: 5,
                  step: 1,
                  value: this.properties?.refreshInterval ?? 1,
                  showValue: true,
                  ariaLabel: strings.AutoRefreshIntervalFieldLabel,
                }),
                PropertyFieldCalendarPicker("selectedCalendars", {
                  key: "selectedCalendars",
                  label: strings.CalendarFieldLabel,
                  disabled: false,
                  styles: { marginTop: "10px" },
                  onPropertyPaneFieldChanged:
                    this.onPropertyPaneFieldChanged.bind(this),
                  selectedKeys: this.properties.selectedCalendars ?? [],
                  webPartContext: this.context,
                  theme: theme,
                  properties: this.properties,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
