import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { spfi, SPFI } from '@pnp/sp';
import { SPFx } from '@pnp/sp';
import { RetentionRecordsReview } from '../../components/RetentionRecordsReview';
import { parseConfig } from '../../services/configuration';
import { SharePointInventoryService } from '../../services/SharePointInventoryService';
import defaultConfiguration from '../../assets/configuration.json';

export interface IRetentionRecordsReviewWebPartProps { description?: string; }

export default class RetentionRecordsReviewWebPart extends BaseClientSideWebPart<IRetentionRecordsReviewWebPartProps> {
  private sp!: SPFI;
  protected async onInit(): Promise<void> { await super.onInit(); this.sp = spfi().using(SPFx(this.context)); }
  public render(): void {
    let config = null; let configError: string | undefined;
    try { config = parseConfig(defaultConfiguration); } catch (error) { configError = error instanceof Error ? error.message : 'Invalid local configuration.'; }
    const element = React.createElement(RetentionRecordsReview, { config, configError, service: new SharePointInventoryService(this.sp, window.location.origin, siteUrl => spfi(siteUrl).using(SPFx(this.context))) });
    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }
}
