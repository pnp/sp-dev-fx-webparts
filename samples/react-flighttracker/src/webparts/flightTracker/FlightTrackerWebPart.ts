/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'FlightTrackerWebPartStrings';
import { loadTheme } from 'office-ui-fabric-react';

import { IReadonlyTheme } from '@microsoft/sp-component-base';
import {
  DisplayMode,
  Version,
} from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneSlider,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { FlightTracker } from '../../components/FlightTracker/FlightTracker';
import {
  IFlightTrackerProps,
} from '../../components/FlightTracker/IFlightTrackerProps';
import { registerSVGIcons } from '../../helpers';

registerSVGIcons();

const teamsDefaultTheme = require("../../teamsThemes/TeamsDefaultTheme.json");
const teamsDarkTheme = require("../../teamsThemes/TeamsDarkTheme.json");
const teamsContrastTheme = require("../../teamsThemes/TeamsContrastTheme.json");
export interface IFlightTrackerWebPartProps {
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
  numberItemsPerPage: number;
}

export default class FlightTrackerWebPart extends BaseClientSideWebPart<IFlightTrackerWebPartProps> {
  private _isDarkTheme: boolean = false;
  private containerWidth: number = 0;
  private _currentTheme: IReadonlyTheme | undefined;

  // Apply Teams Context
  private _applyTheme = (theme: string): void => {
    this.context.domElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);

    if (theme === "dark") {
      loadTheme({
        palette: teamsDarkTheme,
      });
    }

    if (theme === "default") {
      loadTheme({
        palette: teamsDefaultTheme,
      });
    }

    if (theme === "contrast") {
      loadTheme({
        palette: teamsContrastTheme,
      });
    }
  };



  protected onAfterResize(newWidth: number): void {
    this.containerWidth = newWidth;
    this.render();
  }

  public render(): void {
    const element: React.ReactElement<IFlightTrackerProps> = React.createElement(FlightTracker, {
      title: this.properties.title,
      isDarkTheme: this._isDarkTheme,
      context: this.context,
      hasTeamsContext: !!this.context.sdks.microsoftTeams,
      currentTheme: this._currentTheme,
      displayMode: this.displayMode,
      numberItemsPerPage: this.properties.numberItemsPerPage,
      updateProperty: (value: string) => {
        this.properties.title = value;
      },
      webpartContainerWidth: this.containerWidth

    });

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const teamsContext = this.context.sdks.microsoftTeams?.context;
      this._applyTheme(teamsContext.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.registerOnThemeChangeHandler(this._applyTheme);
    }
    this.containerWidth = this.domElement.clientWidth;
    return super.onInit();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }
    this._isDarkTheme = !!currentTheme.isInverted;
    this._currentTheme = currentTheme;
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
                PropertyPaneSlider("numberItemsPerPage", {
                  label: strings.NumberItemsPerPageLabel,
                  value: this.properties.numberItemsPerPage,
                  min: 1,
                  max: 20,
                  showValue: true,
                })

              ],
            },
          ],
        },
      ],
    };
  }
}
