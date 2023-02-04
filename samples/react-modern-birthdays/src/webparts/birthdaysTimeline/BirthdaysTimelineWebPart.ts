/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'BirthdaysTimelineWebPartStrings';
import { loadTheme } from 'office-ui-fabric-react/lib/Styling';

import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import {
  IPropertyPaneConfiguration,
  PropertyPaneLabel,
  PropertyPaneSlider,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import {
  BirthdaysTimeline,
} from '../../components/birthdaysTimeline/BirthdaysTimeline';
import {
  IBirthdaysTimelineProps,
} from '../../components/birthdaysTimeline/IBirthdaysTimelineProps';
import { registerSVGIcons } from '../../utils/registrySVGIcons';

const teamsDefaultTheme = require("../../teamsThemes/TeamsDefaultTheme.json");
const teamsDarkTheme = require("../../teamsThemes/TeamsDarkTheme.json");
const teamsContrastTheme = require("../../teamsThemes/TeamsContrastTheme.json");

export interface IBirthdaysTimelineWebPartProps {
  title: string;
  numberDays: number;
  todayBirthdaysMessage?: string;
  noBirthdaysMessage?: string;
}

export default class BirthdaysTimelineWebPart extends BaseClientSideWebPart<IBirthdaysTimelineWebPartProps> {
  private _isDarkTheme: boolean = false;

  private _currentTheme: IReadonlyTheme | undefined;

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

  public render(): void {
    const element: React.ReactElement<IBirthdaysTimelineProps> = React.createElement(BirthdaysTimeline, {
      title: this.properties.title ?? strings.titleDefaultValue,
      numberDays: this.properties.numberDays ?? 30,
      isDarkTheme: this._isDarkTheme,
      hasTeamsContext: this.context.sdks.microsoftTeams ? true : false,
      theme: this._currentTheme,
      context: this.context,
      displayMode: this.displayMode,
      pageSize: 10,
      updateProperty: (value: string) => {
        this.properties.title = value;
      },
      todayBirthdaysMessage: this.properties.todayBirthdaysMessage ?? strings.TodayBirthdayMessagePropertyDefaultVaue,
      noBirthdaysMessage: this.properties.noBirthdaysMessage ?? strings.NoUpcomingBirthdayMessageDefaultVaue,
    });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    SPComponentLoader.loadCss("https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap");
    registerSVGIcons(this._currentTheme);
    if (this.context.sdks.microsoftTeams) {
      // in teams ?
      const teamsContext = await this.context.sdks.microsoftTeams?.teamsJs.app.getContext();
      this._applyTheme(teamsContext.app.theme || "default");
      this.context.sdks.microsoftTeams.teamsJs.app.registerOnThemeChangeHandler(this._applyTheme);
    }
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
                  value: this.properties.title ?? strings.DescriptionFieldLabel,
                }),
                PropertyPaneLabel("separator", {
                  text: "",
                }),
                PropertyPaneSlider("numberDays", {
                  label: strings.UpComingDaysPropertyLabel,
                  min: 1,
                  max: 60,
                  value: this.properties.numberDays ?? 30,
                }),
                PropertyPaneLabel("separator", {
                  text: "",
                }),
                PropertyPaneTextField("todayBirthdaysMessage", {
                  label: strings.TodayBirthdayMessagePropertyLabel,
                  value: this.properties.todayBirthdaysMessage ?? strings.TodayBirthdayMessagePropertyDefaultVaue,
                }),
                PropertyPaneLabel("separator", {
                  text: "",
                }),
                PropertyPaneTextField("noBirthdaysMessage", {
                  label: strings.NoUpcomingBirthdayMessageLabel,
                  value: this.properties.noBirthdaysMessage ?? strings.NoUpcomingBirthdayMessageDefaultVaue,
                }),
                PropertyPaneLabel("separator", {
                  text: "",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
