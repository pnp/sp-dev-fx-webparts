import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';

import { BotFrameworkChatSSO } from './components/BotFrameworkChatSSO';
import { IBotFrameworkSSOProps } from './components/IBotFrameworkChatSSOProps';
import * as strings from 'BotFrameworkChatSSOWebPartStrings';

export interface IBotFrameworkChatSSOWebPartProps {
  botEndpoint: string;
}

export default class BotFrameworkChatSSOWebPart extends BaseClientSideWebPart<IBotFrameworkChatSSOWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IBotFrameworkSSOProps> = React.createElement(BotFrameworkChatSSO, {
      botEndpoint: this.properties.botEndpoint,
      botName: strings.BotName,
      context: this.context,
    });

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
                PropertyPaneTextField('botEndpoint', {
                  label: strings.BotEndpointLabel
                }),           
              ]
            }
          ]
        }
      ],
    };
  }
}
