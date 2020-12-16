import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BotFrameworkChatv4 } from './components/BotFrameworkChatv4';
import { IBotFrameworkChatv4Props } from './components/IBotFrameworkChatv4Props';
import * as strings from 'BotFrameworkChatv4WebPartStrings';

export interface IBotFrameworkChatv4WebPartProps {
  botEndpoint: string;
}

export default class BotFrameworkChatv4WebPart extends BaseClientSideWebPart<IBotFrameworkChatv4WebPartProps> {
  public render(): void {
    if (this.renderedOnce === false) {
      const element: React.ReactElement<IBotFrameworkChatv4Props> = React.createElement(BotFrameworkChatv4, {
        botEndpoint: this.properties.botEndpoint,
        botName: strings.BotName,
        context: this.context,
      });

      ReactDom.render(element, this.domElement);
    }
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
