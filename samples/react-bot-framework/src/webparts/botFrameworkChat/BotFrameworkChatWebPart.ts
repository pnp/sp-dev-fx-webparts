import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'BotFrameworkChatWebPartStrings';
import BotFrameworkChat from './components/BotFrameworkChat';
import { IBotFrameworkChatProps } from './components/IBotFrameworkChatProps';

export interface IBotFrameworkChatWebPartProps {
  description: string;
  message: string;
  directLineSecret: string;
  title: string;
  placeholderText: string;
  titleBarBackgroundColor : string;
  botMessagesBackgroundColor: string;
  botMessagesForegroundColor: string;
  userMessagesBackgroundColor: string;
  userMessagesForegroundColor: string;
}

export default class BotFrameworkChatWebPart extends BaseClientSideWebPart<IBotFrameworkChatWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IBotFrameworkChatProps > = React.createElement(
      BotFrameworkChat,
      {
      description: this.properties.description,
      message: '',
      title: this.properties.title,
      placeholderText: this.properties.placeholderText,
      directLineSecret: this.properties.directLineSecret,
      titleBarBackgroundColor: this.properties.titleBarBackgroundColor,
      botMessagesBackgroundColor: this.properties.botMessagesBackgroundColor,
      botMessagesForegroundColor: this.properties.botMessagesForegroundColor,
      userMessagesBackgroundColor: this.properties.userMessagesBackgroundColor,
      userMessagesForegroundColor: this.properties.userMessagesForegroundColor,
      context: this.context
    });

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
              groupName: 'Appearance',
              groupFields: [
                PropertyPaneTextField('title', {
                  label: 'Title'
                }),
                PropertyPaneTextField('placeholderText', {
                  label: 'Placeholder text'
                }),
                PropertyPaneTextField('titleBarBackgroundColor', {
                  label: 'Title bar background color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500 // delay after which to run the validation function
                }),
                PropertyPaneTextField('botMessagesBackgroundColor', {
                  label: 'Bot messages background color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500 // delay after which to run the validation function
                }),
                PropertyPaneTextField('botMessagesForegroundColor', {
                  label: 'Bot messages foreground color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500 // delay after which to run the validation function
                }),
                PropertyPaneTextField('userMessagesBackgroundColor', {
                  label: 'User messages background color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500 // delay after which to run the validation function
                }),
                PropertyPaneTextField('userMessagesForegroundColor', {
                  label: 'User messages foreground color',
                  onGetErrorMessage: this._validateColorPropertyAsync.bind(this), // validation function
                  deferredValidationTime: 500 // delay after which to run the validation function
                })
              ]
            }
          ]
        }
      ]
    };
  }
  
  private _validateColorPropertyAsync(value: string): string {
    var colorRegex = /^([a-zA-Z0-9]){6}$/;
    if (!value || colorRegex.test(value) == false) {
      return "Please enter a valid 6 character hex color value";
    }

    return "";
  }
}
