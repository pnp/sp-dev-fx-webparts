import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField, PropertyPaneLabel } from '@microsoft/sp-property-pane';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import PageGovernanceReview from './components/PageGovernanceReview';
import { IPageGovernanceReviewProps } from './components/IPageGovernanceReviewProps';

export interface IPageGovernanceReviewWebPartProps { sourcesJson: string; oldModifiedDays: number; referenceDate: string; staleReviewBefore: string; }
export default class PageGovernanceReviewWebPart extends BaseClientSideWebPart<IPageGovernanceReviewWebPartProps> {
  public render(): void { const props: IPageGovernanceReviewProps = { client: this.context.spHttpClient, webUrl: this.context.pageContext.web.absoluteUrl, sourcesJson: this.properties.sourcesJson || '[{"label":"Site Pages","path":"/SitePages"}]', oldModifiedDays: this.properties.oldModifiedDays || 180, referenceDate: this.properties.referenceDate || '', staleReviewBefore: this.properties.staleReviewBefore || '' }; ReactDom.render(React.createElement(FluentProvider, { theme: webLightTheme }, React.createElement(PageGovernanceReview, props)), this.domElement); }
  protected getPropertyPaneConfiguration(): any { return { pages: [{ header: { description: 'Read-only review settings' }, groups: [{ groupName: 'Sources and heuristics', groupFields: [PropertyPaneTextField('sourcesJson', { label: 'Sources JSON', multiline: true }), PropertyPaneTextField('oldModifiedDays', { label: 'Old modified threshold (days)' }), PropertyPaneTextField('referenceDate', { label: 'Reference date (ISO, optional)' }), PropertyPaneTextField('staleReviewBefore', { label: 'Stale review before (ISO, optional)' }), PropertyPaneLabel('scope', { text: 'Only HTTPS same-tenant/root-relative sources are accepted. Reads are bounded to 4 sources, 5 pages, 50 rows/page, and 200 rows/source.' })] }] }] }; }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }
}
