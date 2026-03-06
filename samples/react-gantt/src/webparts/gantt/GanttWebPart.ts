import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  type IPropertyPaneDropdownOption,
  PropertyPaneLabel,
  IPropertyPaneField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import * as strings from "GanttWebPartStrings";
import Gantt from "../../components/Gantt";
import { IGanttProps } from "../../components/IGanttProps";
import { PropertyPaneGanttListPickerField } from "../../PropertyFields/GanttListPickerPropertyField";
import type { IGanttFieldMappings } from "../../PropertyFields/GanttListPickerPropertyField";
import { SVAR_CSS_URL, DEFAULT_SCALE } from "../../constants/constants";
import type { GanttScaleKey } from "../../constants/constants";
import { EAppHostName } from "../../constants/EAppHostName";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
import type { Theme as V8Theme } from "@fluentui/react";
import {
  type Theme,
  teamsDarkTheme,
  teamsLightTheme,
  teamsHighContrastTheme,
  webDarkTheme,
  webLightTheme,
} from "@fluentui/react-components";

export interface IGanttWebPartProps {
  title: string;
  selectedSiteUrl: string;
  listId: string;
  fieldMappings: IGanttFieldMappings;
  visibleColumns: string[];
  scale: GanttScaleKey;
  height: number;
}

export default class GanttWebPart extends BaseClientSideWebPart<IGanttWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _theme: IReadonlyTheme | undefined;
  private _themeString: string = "";
  private _appHostName: EAppHostName = EAppHostName.SharePoint;

  private _applyTheme = (theme: string): void => {
    this.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    this._themeString = theme;
    this.render();
  };

  public render(): void {
    const element: React.ReactElement<IGanttProps> = React.createElement(
      Gantt,
      {
        isDarkTheme: this._isDarkTheme,
        appHostName: this._appHostName,
        theme: this._resolveFluentV9Theme(),
        themeString: this._themeString,
        listId: this.properties.listId,
        fieldMappings: this.properties.fieldMappings,
        visibleColumns: this.properties.visibleColumns,
        scale: this.properties.scale || DEFAULT_SCALE,
        spHttpClient: this.context.spHttpClient,
        siteUrl:
          this.properties.selectedSiteUrl ||
          this.context.pageContext.web.absoluteUrl,
        onConfigure: () => this.context.propertyPane.open(),
        title: this.properties.title,
        height: this.properties.height || 800,
      },
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    // Inject SVAR Gantt CSS at runtime (SPFx css-loader hashes class names,
    // so we load the vendor CSS via CDN <link> instead of a static import).
    if (!document.querySelector(`link[href="${SVAR_CSS_URL}"]`)) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = SVAR_CSS_URL;
      document.head.appendChild(link);
    }

    if (this.context.sdks.microsoftTeams) {
      const teamsContext =
        await this.context.sdks.microsoftTeams.teamsJs.app.getContext();

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
          this._appHostName = EAppHostName.Teams;
          break;
      }

      this._applyTheme(teamsContext.app.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.app.registerOnThemeChangeHandler(
        this._applyTheme,
      );
    }
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    this._theme = currentTheme;
  }

  private _resolveFluentV9Theme(): Theme {
    if (this._appHostName !== EAppHostName.SharePoint) {
      switch (this._themeString.toLowerCase()) {
        case "dark":
          return teamsDarkTheme;
        case "contrast":
          return teamsHighContrastTheme;
        default:
          return teamsLightTheme;
      }
    }

    if (this._theme) {
      return createV9Theme(this._theme as unknown as V8Theme);
    }

    return this._isDarkTheme ? webDarkTheme : webLightTheme;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const groupFIeldWebPartSettings: IPropertyPaneField<any>[] = [
      PropertyPaneTextField("title", {
        label: strings.DescriptionFieldLabel,
      }),
      PropertyPaneLabel("", {
        text: "",
      }),
    ];

    if (this._appHostName === EAppHostName.SharePoint) {
      groupFIeldWebPartSettings.push(
        PropertyPaneSlider("height", {
          min: 300,
          max: 1200,
          step: 50,
          showValue: true,
          label: strings.WebPartHeightLabel,
        }),
      );
    }

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              isCollapsed: false,
              groupName: strings.BasicGroupName,
              groupFields: groupFIeldWebPartSettings,
            },
            {
              groupName: strings.GanttDataSourceGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneGanttListPickerField("listId", {
                  label: strings.ConfigureGanttListLabel,
                  selectedListId: this.properties.listId || "",
                  selectedSiteUrl:
                    this.properties.selectedSiteUrl ||
                    this.context.pageContext.web.absoluteUrl,
                  fieldMappings: this.properties.fieldMappings || {
                    text: "",
                    start: "",
                    duration: "",
                  },
                  visibleColumns: this.properties.visibleColumns || [
                    "text",
                    "start",
                    "duration",
                  ],
                  onPropertyChange: (
                    propertyPath: string,
                    newValue: string | IGanttFieldMappings | string[],
                  ) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (this.properties as any)[propertyPath] = newValue;
                    this.render();
                    this.context.propertyPane.refresh();
                  },
                  spHttpClient: this.context.spHttpClient,
                  siteUrl: this.context.pageContext.web.absoluteUrl,
                  theme: this._resolveFluentV9Theme(),
                  key: "ganttListPicker",
                }),
              ],
            },
            {
              groupName: strings.GanttDisplayGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyPaneDropdown("scale", {
                  label: strings.TimeScaleLabel,
                  selectedKey: this.properties.scale || DEFAULT_SCALE,
                  options: [
                    { key: "hour", text: strings.ScaleHour },
                    { key: "day", text: strings.ScaleDay },
                    { key: "week", text: strings.ScaleWeek },
                    { key: "month", text: strings.ScaleMonth },
                    { key: "quarter", text: strings.ScaleQuarter },
                    { key: "year", text: strings.ScaleYear },
                  ] as IPropertyPaneDropdownOption[],
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
