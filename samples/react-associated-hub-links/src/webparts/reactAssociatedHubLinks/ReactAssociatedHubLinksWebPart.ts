import '../../../assets/dist/tailwind.css';
import '@pnp/sp/search';
import '@pnp/sp/webs';
import '@pnp/sp/sites';

import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPFI, spfi, SPFx } from '@pnp/sp';

import {
  IReactAssociatedHubLinksProps, ReactAssociatedHubLinks
} from './components/ReactAssociatedHubLinks';
import { ILink } from './utils/ILink';
import { SearchResults } from '@pnp/sp/search';

export interface IReactAssociatedHubLinksWebPartProps {
  description: string;
}

export default class ReactAssociatedHubLinksWebPart extends BaseClientSideWebPart<IReactAssociatedHubLinksWebPartProps> {
  private _sp: SPFI;

  public async render(): Promise<void> {
    const links = await this.getAssociatedSitesLinks();
    const element: React.ReactElement<IReactAssociatedHubLinksProps> =
      React.createElement(ReactAssociatedHubLinks, {
        links,
      });

    ReactDom.render(element, this.domElement);
  }

  protected async getAssociatedSitesLinks() {
    const site = await this._sp.site();
    const searchResults: SearchResults = await this._sp.search(
      `DepartmentId=${site.Id} contentclass:sts_site -SiteId:${site.Id}`
    );
    const associatedSitesLinks: ILink[] =
      searchResults.PrimarySearchResults.map((result) => ({
        title: result.Title,
        url: result.Path,
        logoUrl: result.SiteLogo
      } as ILink));
    return associatedSitesLinks;
  }

  protected async onInit(): Promise<void> {
    await super.onInit();
    this._sp = spfi().using(SPFx(this.context));
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [],
        },
      ],
    };
  }
}
