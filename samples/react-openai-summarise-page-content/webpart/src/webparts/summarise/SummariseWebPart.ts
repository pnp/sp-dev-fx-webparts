import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import Summarise from './components/Summarise';
import { ISummariseProps } from './components/ISummariseProps';

export interface ISummariseWebPartProps {
}

export default class SummariseWebPart extends BaseClientSideWebPart<ISummariseWebPartProps> {

  
  public render(): void {

    const listItem: any = this.context.pageContext.listItem;
    const element: React.ReactElement<ISummariseProps> = React.createElement(
      Summarise,
      {
        spHttpClient: this.context.spHttpClient,
        aadHttpClientFactory: this.context.aadHttpClientFactory,
        msGraphClientFactory: this.context.msGraphClientFactory,
        pageItemId: listItem.id,
        pageId: listItem.uniqueId,
        siteId: this.context.pageContext.site.id.toString(),
        siteUrl: this.context.pageContext.site.absoluteUrl
      }
    );
    
    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {
    
    // If you want to use the services instead of hooks, you can use the following:
    // await azurefunctions.Init(this.context.aadHttpClientFactory, APP_ID);
    // await MicrosoftGraph.Init(this.context.msGraphClientFactory);

    return super.onInit();
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
