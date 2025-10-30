import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ChatWithSkWebPartStrings';
import ChatWithSk from './components/ChatWithSk';
import { IChatWithSkProps } from './components/IChatWithSkProps';

export interface IChatWithSkWebPartProps {
  azFunctionUrl: string;
}

export default class ChatWithSkWebPart extends BaseClientSideWebPart<IChatWithSkWebPartProps> {

  

  public render(): void {
    const element: React.ReactElement<IChatWithSkProps> = React.createElement(
      ChatWithSk,
      {
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        wpcontext: this.context,
        azFunctionUrl: this.properties.azFunctionUrl || 'http://localhost:7071/'
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('azFunctionUrl', {
                  label: 'Azure Function Host URL',
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
