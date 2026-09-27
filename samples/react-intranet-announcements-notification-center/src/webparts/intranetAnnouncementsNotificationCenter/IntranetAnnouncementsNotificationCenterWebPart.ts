import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import * as strings from 'IntranetAnnouncementsNotificationCenterWebPartStrings';
import Center from './components/Center';

export interface ICenterProps { announcementListPaths: string; currentAudienceLabel: string; referenceDate: string; }
export default class IntranetAnnouncementsNotificationCenterWebPart extends BaseClientSideWebPart<ICenterProps> {
  public render(): void { ReactDom.render(React.createElement(Center, { context: this.context, ...this.properties }), this.domElement); }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration { return { pages: [{ header: { description: strings.PropertyPaneDescription }, groups: [{ groupName: strings.BasicGroupName, groupFields: [PropertyPaneTextField('announcementListPaths', { label: strings.AnnouncementListPathsFieldLabel, multiline: true }), PropertyPaneTextField('currentAudienceLabel', { label: strings.AudienceFieldLabel }), PropertyPaneTextField('referenceDate', { label: strings.ReferenceDateFieldLabel })] }] }] }; }
}
