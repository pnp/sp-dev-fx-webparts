import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'MyTeamsWebPartStrings';
import { MyTeams, IMyTeamsProps } from './components/myTeams';
import { ITenant } from '../../shared/interfaces';
import { MSGraphClient } from '@microsoft/sp-http';

export interface IMyTeamsWebPartProps {
  tenantInfo: ITenant;
  openInClientApp: boolean;
}

export default class MyTeamsWebPart extends BaseClientSideWebPart<IMyTeamsWebPartProps> {

  private _graphClient: MSGraphClient;

  public async onInit(): Promise<void> {

    this._graphClient = await this.context.msGraphClientFactory.getClient();
    // get tenant info if not available yet
    if (!this.properties.tenantInfo && this.properties.openInClientApp) {
      this.properties.tenantInfo = await this._getTenantInfo();
    }

    return super.onInit();
  }

  public async render(): Promise<void> {

    const element: React.ReactElement<IMyTeamsProps> = React.createElement(
      MyTeams,
      {
        graphClient: this._graphClient,
        tenantId: this.properties.tenantInfo.id,
        openInClientApp: this.properties.openInClientApp
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
                PropertyPaneToggle('openInClientApp', {
                  label: strings.OpenInClientAppFieldLabel,
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _getTenantInfo = async (): Promise<ITenant> => {
    let tenant: ITenant = null;
    try {
      const tenantResponse = await this._graphClient.api('organization').select('id').version('v1.0').get();
      tenant = tenantResponse.value as ITenant;
      console.log(tenant);
    } catch (error) {
      console.log('Error getting tenant information');
    }
    return tenant;
  }
}
