/* eslint-disable @typescript-eslint/no-var-requires */
import * as React from 'react';
import * as ReactDom from 'react-dom';

import { loadTheme } from 'office-ui-fabric-react/lib/Styling';

import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
//import { SPComponentLoader } from '@microsoft/sp-loader';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { ChatGpt } from '../../components/ChatGpt';
import { IChatGptProps } from '../../models/IChatGptProps';
import { registerSVGIcons } from '../../utils/registrySVGIcons';

const teamsDefaultTheme = require("../../teamsThemes/TeamsDefaultTheme.json");
const teamsDarkTheme = require("../../teamsThemes/TeamsDarkTheme.json");
const teamsContrastTheme = require("../../teamsThemes/TeamsContrastTheme.json");

export interface IBirthdaysTimelineWebPartProps {
  title: string;

}

export default class ChatGptWebPart extends BaseClientSideWebPart<IChatGptProps> {
  private _isDarkTheme: boolean = false;
  private _isTeams: boolean = false;
  private _teamId: string = "";
  private _channelId: string = "";
  private _chatId: string = "";
  private _parentMessageId: string = "";
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
    const element: React.ReactElement<IChatGptProps> = React.createElement(ChatGpt, {
      title: this.properties.title ?? "OpenAPI Chat",
      isDarkTheme: this._isDarkTheme,
      hasTeamsContext: this.context.sdks.microsoftTeams ? true : false,
      theme: this._currentTheme,
      context: this.context,
      chatId: this._chatId,
      teamsId: this._teamId,
      channelId: this._channelId,
      parentMessageId: this._parentMessageId,
    });

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
  //  SPComponentLoader.loadCss("https://fonts.googleapis.com/css2?family=Dancing+Script&display=swap");
    registerSVGIcons(this._currentTheme);
    if (this.context.sdks.microsoftTeams) {
      // in teams ?

      const teamsContext = await this.context.sdks.microsoftTeams?.teamsJs.app.getContext();
      this._isTeams = true;
      this._chatId = teamsContext.chat?.id;
      this._teamId = teamsContext.team?.groupId;
      this._channelId = teamsContext.channel?.id;
      this._parentMessageId = teamsContext.app.parentMessageId;


      console.log("chatId", this._chatId);
      console.log("teamId", this._teamId);
      console.log("channelId", this._channelId);
      console.log("parentMessageId", this._parentMessageId);
      console.log("isTeams", this._isTeams);

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
            description:"description",
          },
          groups: [
            {
              groupName: "Group Name",
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Title",
                  value: this.properties.title ?? "OpenAPI Chat",
                }),

              ],
            },
          ],
        },
      ],
    };
  }
}
