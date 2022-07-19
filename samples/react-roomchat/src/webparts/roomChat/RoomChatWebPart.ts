/* eslint-disable @microsoft/spfx/no-async-await */
import * as React from 'react';
import * as ReactDom from 'react-dom';

import * as strings from 'RoomChatWebPartStrings';

import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { IRoomChatProps } from '../../components/RoomChat/IRoomChatProps';
import { RoomChat } from '../../components/RoomChat/RoomChat';
import { getSP } from '../../utils/pnpjsConfig';

export interface IRoomChatWebChatProps {
  topic: string;
  acsConnectString:string;
}

export default class RoomChatWebChat extends BaseClientSideWebPart<IRoomChatWebChatProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _theme : IReadonlyTheme | undefined;

  protected  async onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();
    console.log('legacy', this.context.pageContext.legacyPageContext)
    getSP(this.context);
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IRoomChatProps> = React.createElement(
     RoomChat,
      {
        topic: this.properties.topic,
        isDarkTheme: this._isDarkTheme,
        theme: this._theme,
        context: this.context,
        acsConnectString: this.properties.acsConnectString
      }
    );

    ReactDom.render(element, this.domElement);
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;
    this.domElement.style.setProperty('--bodyText', semanticColors.bodyText);
    this.domElement.style.setProperty('--link', semanticColors.link);
    this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered);
    this._theme = currentTheme;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                PropertyPaneTextField('topic', {
                  label: strings.TopicFieldLabel,
                  value: this.properties.topic
                }),
                PropertyPaneTextField('acsConnectString', {
                  label: strings.ACSConnectStringFieldLabel,
                  onGetErrorMessage:  (value: string) => {
                    if (value.length < 1) {
                      return strings.ascConnectringErrorMessage;
                    }
                    return '';
                  }

                })
              ]
            }
          ]
        }
      ]
    };
  }
}
