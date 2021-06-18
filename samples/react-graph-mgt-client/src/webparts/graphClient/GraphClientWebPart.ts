import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import GraphClient from './components/GraphClient';
import { IGraphClientProps } from './components/IGraphClientProps';

// Importing MGT in the Web Part
import { SharePointProvider } from '@microsoft/mgt-sharepoint-provider';
import { Providers } from '@microsoft/mgt-element';

export interface IGraphLatestClientWebPartProps {
  description: string;
}

export default class GraphLatestClientWebPart extends BaseClientSideWebPart<IGraphLatestClientWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGraphClientProps> = React.createElement(
      GraphClient,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  /**
   * Assign a new SharePoint provider to the MGT providers
   */
  protected async onInit() {
    Providers.globalProvider = new SharePointProvider(this.context);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
