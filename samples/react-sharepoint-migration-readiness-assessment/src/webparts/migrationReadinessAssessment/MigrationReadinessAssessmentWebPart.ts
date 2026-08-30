import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import Assessment from './components/Assessment';
import { AssessmentProps, Source } from './services/assessment';

export interface Props { sources: Source[]; referenceDate: string; maxPathLength: number; staleDays: number; largeFileBytes: number; }
export default class MigrationReadinessAssessmentWebPart extends BaseClientSideWebPart<Props> {
  public render(): void { const element: React.ReactElement<AssessmentProps> = React.createElement(Assessment, { client: this.context.spHttpClient, webUrl: this.context.pageContext.web.absoluteUrl, ...this.properties }); ReactDom.render(element, this.domElement); }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration { return { pages: [{ header: { description: 'Read-only assessment configuration' }, groups: [{ groupName: 'Sources', groupFields: [PropertyPaneTextField('sources', { label: 'Sources JSON (list/library paths)' })] }] }] }; }
}
