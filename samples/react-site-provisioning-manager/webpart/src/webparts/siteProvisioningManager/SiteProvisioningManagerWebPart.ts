import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SiteProvisioningManagerWebPartStrings';
import SiteProvisioningWebPart from './components/App/App';
import { IAppProps } from './components/App/IAppProps';
import { AadHttpClient } from '@microsoft/sp-http';
import AppService from '../../services/appService';

export interface ISiteProvisioningManagerWebPartProps {
  ApplicationId: string;
  GetTemplateFunctionUrl: string;
  ApplyTemplateFunctionUrl: string;
}

export default class SiteProvisioningManagerWebPart extends BaseClientSideWebPart<ISiteProvisioningManagerWebPartProps> {

  private appService: AppService;
  private aadClient: AadHttpClient;
  public onInit(): Promise<void> {
    return super.onInit().then(async _ => {
      const { GetTemplateFunctionUrl, ApplyTemplateFunctionUrl } = this.properties;

      const clientId: string = this.properties.ApplicationId;
      this.aadClient = await this.context.aadHttpClientFactory.getClient(clientId);
      this.appService = new AppService(this.context, this.aadClient, GetTemplateFunctionUrl, ApplyTemplateFunctionUrl);
    });

  }
  public render(): void {
    const element: React.ReactElement<IAppProps> = React.createElement(
      SiteProvisioningWebPart,
      {
        appService: this.appService,
        webUrl: this.context.pageContext.web.absoluteUrl
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
                PropertyPaneTextField('ApplicationId', {
                  label: strings.ClientIdFieldLabel
                }),
                PropertyPaneTextField('GetTemplateFunctionUrl', {
                  label: strings.GetProvisioningUrlFieldLabel
                }),
                PropertyPaneTextField('ApplyTemplateFunctionUrl', {
                  label: strings.ApplyProvisioningUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
