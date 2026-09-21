import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import DocumentLifecycleVersionReview from './components/DocumentLifecycleVersionReview';
import * as strings from 'DocumentLifecycleVersionReviewWebPartStrings';

export interface IDocumentLifecycleVersionReviewWebPartProps { sourcesJson: string; referenceDate: string; }

export default class DocumentLifecycleVersionReviewWebPart extends BaseClientSideWebPart<IDocumentLifecycleVersionReviewWebPartProps> {
  public render(): void {
    ReactDom.render(React.createElement(DocumentLifecycleVersionReview, { context: this.context, sourcesJson: this.properties.sourcesJson || '[]', referenceDate: this.properties.referenceDate }), this.domElement);
  }
  protected get dataVersion(): Version { return Version.parse('1.0'); }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return { pages: [{ header: { description: strings.PropertyPaneDescription }, groups: [{ groupName: 'Review configuration', groupFields: [PropertyPaneTextField('sourcesJson', { label: strings.ConfigurationLabel, multiline: true, rows: 8 }), PropertyPaneTextField('referenceDate', { label: strings.ReferenceDateLabel, placeholder: '2026-08-30T00:00:00Z' })] }] }] };
  }
}
