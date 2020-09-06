import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import * as strings from 'BotFrameworkChatv4WebPartStrings';
import BotFrameworkChatv4 from './components/BotFrameworkChatv4';
import { IBotFrameworkChatv4Props } from './components/IBotFrameworkChatv4Props';

export interface IBotFrameworkChatv4WebPartProps {
  description: string;
  directLineSecret: string;
  bubbleBackground: string;
  bubbleTextColor: string;
  bubbleFromUserBackground: string;
  bubbleFromUserTextColor: string;
  backgroundColor: string;
  botAvatarImage: string;
  botAvatarInitials: string;
  userAvatarImage: string;
  userAvatarInitials: string;
  hideUploadButton: boolean;
  sendBoxBackground: string;
  sendBoxTextColor: string;
}

export default class BotFrameworkChatv4WebPart extends BaseClientSideWebPart<IBotFrameworkChatv4WebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBotFrameworkChatv4Props > = React.createElement(
      BotFrameworkChatv4,
      {
        description: this.properties.description,
        directLineSecret: this.properties.directLineSecret,
        bubbleBackground: this.properties.bubbleBackground,
        bubbleTextColor: this.properties.bubbleTextColor,
        bubbleFromUserBackground: this.properties.bubbleFromUserBackground,
        bubbleFromUserTextColor: this.properties.bubbleFromUserTextColor,
        backgroundColor: this.properties.backgroundColor,
        botAvatarImage: this.properties.botAvatarImage,
        botAvatarInitials: this.properties.botAvatarInitials,
        userAvatarImage: this.properties.userAvatarImage,
        userAvatarInitials: this.properties.userAvatarInitials,
        hideUploadButton: this.properties.hideUploadButton,
        sendBoxBackground: this.properties.sendBoxBackground,
        sendBoxTextColor: this.properties.sendBoxTextColor,
        context: this.context
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
          header: {
            description: 'Here you can set various properties and settings regarding how your bot chat web part will look visually and functionally work'
          },
          groups: [
            {
              groupName: 'Bot Connection',
              groupFields: [
                PropertyPaneTextField('directLineSecret', {
                  label: 'Direct Line Secret'
                })
              ]
            },
            {
              groupName: 'Appearance - Colors',
              groupFields: [
                PropertyPaneTextField('backgroundColor', {
                  label: 'Background color of webchat'
                }),
                PropertyPaneTextField('bubbleBackground', {
                  label: 'Bot messages background color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500 // delay after which to run the validation function
                }),
                PropertyPaneTextField('bubbleTextColor', {
                  label: 'Bot messages foreground color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500 // delay after which to run the validation function
                }),
                PropertyPaneTextField('bubbleFromUserBackground', {
                  label: 'User messages background color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500 // delay after which to run the validation function
                }),
                PropertyPaneTextField('bubbleFromUserTextColor', {
                  label: 'User messages foreground color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500 // delay after which to run the validation function
                }),
                PropertyPaneTextField('sendBoxBackground', {
                  label: 'Sendbox background color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500,  // delay after which to run the validation function
                  
                }),
                PropertyPaneTextField('sendBoxTextColor', {
                  label: 'Sendbox text color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500 // delay after which to run the validation function
                })
              ]
            }
          ]
        },
        {
          header: {
            description: 'Here you can set various properties and settings regarding how your bot chat web part will look visually and functionally work'
          },
          groups: [
            {
              groupName: 'Appearance - Visuals',
              groupFields: [
                PropertyPaneTextField('botAvatarImage', {
                  label: 'Avatar image used for bot'
                }),
                PropertyPaneTextField('botAvatarInitials', {
                  label: 'Avatar initials used for bot'
                }),
                PropertyPaneTextField('userAvatarImage', {
                  label: 'Avatar image used for user'
                }),
                PropertyPaneTextField('userAvatarInitials', {
                  label: 'Avatar initials used for user'
                }),
                PropertyPaneToggle('hideUploadButton', {
                  label: 'Diable upload button'
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _validateColorPropertyAsync(value: string): string {
    var colorRegex = /^#([a-zA-Z0-9]){6}$/;
    if (!value || colorRegex.test(value) == false) {
      return "Please enter a valid 6 character hex color value";
    }

    return "";
  }

}
