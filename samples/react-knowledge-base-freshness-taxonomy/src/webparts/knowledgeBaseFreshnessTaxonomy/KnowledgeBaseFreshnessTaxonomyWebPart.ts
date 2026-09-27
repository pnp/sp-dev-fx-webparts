import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { PropertyPaneTextField } from '@microsoft/sp-property-pane';
import KnowledgeBase from './components/KnowledgeBase';
import { IKnowledgeBaseProps } from './components/IKnowledgeBaseProps';

export interface IKnowledgeBaseWebPartProps { sources: string; referenceDate: string; }
export default class KnowledgeBaseFreshnessTaxonomyWebPart extends BaseClientSideWebPart<IKnowledgeBaseWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IKnowledgeBaseProps> = React.createElement(KnowledgeBase, { context: this.context, sources: this.properties.sources, referenceDate: this.properties.referenceDate });
    ReactDom.render(element, this.domElement);
  }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }
  protected getPropertyPaneConfiguration() { return { pages: [{ header: { description: 'Configure read-only sources' }, groups: [{ groupFields: [PropertyPaneTextField('sources', { label: 'List or library paths (one per line; max 4)' }), PropertyPaneTextField('referenceDate', { label: 'Reference date (ISO, optional)' })] }] }] }; }
}
