import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ReactYammerWebPartStrings';
import ReactYammer from './components/ReactYammer';
import { IReactYammerProps } from './components/IReactYammerProps';
import { AadTokenProvider,AadHttpClient } from '@microsoft/sp-http';
import YammerProvider from './yammer/YammerProvider';
import { IYammerProvider } from './yammer/IYammerProvider';

export interface IReactYammerWebPartProps {
  description: string;
}

export default class ReactYammerWebPart extends BaseClientSideWebPart<IReactYammerWebPartProps> {
  private aadToken: string = "";

  public render(): void {
    let yammerProvider: IYammerProvider = new YammerProvider(this.aadToken, this.context.pageContext.user.email);

    const element: React.ReactElement<IReactYammerProps> = React.createElement(
      ReactYammer,
      {
        context: this.context,
        yammerProvider
      }
    );

    ReactDom.render(element, this.domElement);
  }

  public async onInit(): Promise<void> {    
    const tokenProvider: AadTokenProvider = await this.context.aadTokenProviderFactory.getTokenProvider();
      await tokenProvider.getToken("https://api.yammer.com").then(token => {
        this.aadToken = token;
      }).catch(err => console.log(err));
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
                PropertyPaneTextField('description', {
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
