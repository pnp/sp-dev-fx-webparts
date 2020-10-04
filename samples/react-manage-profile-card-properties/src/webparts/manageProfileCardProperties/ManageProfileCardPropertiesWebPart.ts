import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ManageProfileCardPropertiesWebPartStrings';
import  ManageProfileCardProperties from '../../components//ManageProfileCardProperties/ManageProfileCardProperties';
import { IManageProfileCardPropertiesProps } from '../../components/ManageProfileCardProperties/IManageProfileCardPropertiesProps';

import {
  loadTheme,
  mergeStyleSets,
  MessageBarType,
  FontIcon,
  Toggle,
} from "office-ui-fabric-react";

const teamsDefaultTheme = require("../../common/TeamsDefaultTheme.json");
const teamsDarkTheme = require("../../common/TeamsDarkTheme.json");
const teamsContrastTheme = require("../../common/TeamsContrastTheme.json");
import {
  ThemeProvider,
  ThemeChangedEventArgs,
  IReadonlyTheme,
} from "@microsoft/sp-component-base";



export interface IManageProfileCardPropertiesWebPartProps {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}

export default class ManageProfileCardPropertiesWebPart extends BaseClientSideWebPart <IManageProfileCardPropertiesWebPartProps> {
  private _themeProvider: ThemeProvider;
  private _themeVariant: IReadonlyTheme | undefined;

  protected async onInit<T>(): Promise<T> {
    /* this._tokenProvider =  await this.context.aadTokenProviderFactory.getTokenProvider();
    this._tokenToAzureVault =  await this._tokenProvider.getToken('https://vault.azure.net');

    const _value = await AzureDataStorageApisLibrary.getKeyVaultSecret('Teste',this._tokenToAzureVault);
    console.log(_value); */
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
    // id in teams
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
    const element: React.ReactElement<IManageProfileCardPropertiesProps> = React.createElement(
      ManageProfileCardProperties,
      {
        title: this.properties.title,
        webpartContext: this.context,
        themeVariant: this._themeVariant,
        displayMode: this.displayMode,
         updateProperty: (value: string) => {
         this.properties.title = value;
    }

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
