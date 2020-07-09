import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneLabel,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
} from "@microsoft/sp-component-base";
import * as strings from "OrganizationChartWebPartStrings";
import { OrganizationChart } from "../../components/OrganizationChart/OrganizationChart";
import { IOrganizationChartProps } from "../../components/OrganizationChart/IOrganizationChartProps";
import { loadTheme } from "office-ui-fabric-react";
import { DisplayMode } from "@microsoft/sp-core-library";
import { sp } from "@pnp/sp";

const teamsDefaultTheme = require("../../common/TeamsDefaultTheme.json");
const teamsDarkTheme = require("../../common/TeamsDarkTheme.json");
const teamsContrastTheme = require("../../common/TeamsContrastTheme.json");

export interface IOrganizationChartWebPartProps {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  refreshInterval: number;
}

export default class OrganizationChartWebPart extends BaseClientSideWebPart<
  IOrganizationChartWebPartProps
> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  protected async onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context,
    });

    this._themeProvider = this.context.serviceScope.consume(
      ThemeProvider.serviceKey
    );
    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();
    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(
      this,
      this._handleThemeChangedEvent
    );

    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const context = this.context.sdks.microsoftTeams!.context;
      this._applyTheme(context.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler(
        this._applyTheme
      );
    }
    return Promise.resolve();
  }

  /**
   * Update the current theme variant reference and re-render.
   *
   * @param args The new theme
   */
  private _handleThemeChangedEvent(args: ThemeChangedEventArgs): void {
    this._themeVariant = args.theme;
    this.render();
  }

  // Apply btheme id in Teams
  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    if (theme == "dark") {
      loadTheme({
        palette: teamsDarkTheme,
      });
    }

    if (theme == "default") {
      loadTheme({
        palette: teamsDefaultTheme,
      });
    }

    if (theme == "contrast") {
      loadTheme({
        palette: teamsContrastTheme,
      });
    }
  }

  public render(): void {
    const element: React.ReactElement<IOrganizationChartProps> = React.createElement(
      OrganizationChart,
      {
        title: this.properties.title,
        currentUser: this.context.pageContext.user,
        context: this.context,
        themeVariant: this._themeVariant,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        refreshInterval: this.properties.refreshInterval,
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField("title", {
                  label: strings.DescriptionFieldLabel,

                }),
                PropertyPaneLabel('',{
                  text: ""
                })
                ,
                PropertyPaneSlider("refreshInterval", {
                  max: 30,
                  min: 5,
                  showValue: true,
                  step: 2,
                  label: "Refresh Presence Status Every (min)",
                  value: this.properties.refreshInterval,

                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
