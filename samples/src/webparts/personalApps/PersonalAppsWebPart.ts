import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneChoiceGroup
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { DisplayMode } from "@microsoft/sp-core-library";
import * as strings from "PersonalAppsWebPartStrings";
import PersonalApps from "./components/PersonalApps";
import { IPersonalAppsProps } from "./components/IPersonalAppsProps";
import {
  PropertyFieldCollectionData,
  CustomCollectionFieldType
} from "@pnp/spfx-property-controls/lib/PropertyFieldCollectionData";
import { ThemeProvider, ThemeChangedEventArgs, IReadonlyTheme } from '@microsoft/sp-component-base';
import dataservices from "../../services/dataservices";
import { loadTheme } from "office-ui-fabric-react";
const teamsDefaultTheme = require("../../common/TeamsDefaultTheme.json");
const teamsDarkTheme = require("../../common/TeamsDarkTheme.json");
const teamsContrastTheme = require("../../common/TeamsContrastTheme.json");

export interface IPersonalAppsWebPartProps {
  title: string;
  view: string | number;

}

export default class PersonalAppsWebPart extends BaseClientSideWebPart<
  IPersonalAppsWebPartProps
> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;
  protected async onInit<T>(): Promise<T> {
    await dataservices.init(this.context);

    this._themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);

    // If it exists, get the theme variant
    this._themeVariant = this._themeProvider.tryGetTheme();

    // Register a handler to be notified if the theme variant changes
    this._themeProvider.themeChangedEvent.add(this, this._handleThemeChangedEvent);

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
        palette: teamsDarkTheme
      });
    }

   if (theme == "default") {
      loadTheme({
        palette: teamsDefaultTheme
      });
    }

    if (theme == "contrast") {
      loadTheme({
        palette: teamsContrastTheme
      });
    }
  }


  public render(): void {
    const element: React.ReactElement<IPersonalAppsProps> = React.createElement(
      PersonalApps,
      {
        title: this.properties.title,
        view: this.properties.view,
        displayMode: this.displayMode,
        themeVariant: this._themeVariant,
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
    const { view } = this.properties;

    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneChoiceGroup("view", {
                  label: "view option",

                  options: [
                    {
                      key: "List",
                      text: "List",
                      iconProps: { officeFabricIconFontName: "List" },
                      checked: view === "List" ? true : false
                    },
                    {
                      key: "Tiles",
                      text: "Tiles",
                      iconProps: { officeFabricIconFontName: "Tiles" },
                      checked: view === "Tiles" ? true : false
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
