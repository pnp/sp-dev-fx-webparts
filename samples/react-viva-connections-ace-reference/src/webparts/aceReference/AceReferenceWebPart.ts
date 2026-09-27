import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import AceReference from './components/AceReference';
import { IAceReferenceWebPartProps } from './types/IAceReferenceWebPartProps';
import { parseCards } from './utils/normalizeCards';
import * as strings from 'AceReferenceWebPartStrings';

export default class AceReferenceWebPart extends BaseClientSideWebPart<IAceReferenceWebPartProps> {
  public render(): void { ReactDom.render(React.createElement(AceReference, { title: this.properties.title || 'Viva Connections reference', cards: parseCards(this.properties.cardsJson || '[]') }), this.domElement); }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration { return { pages: [{ header: { description: strings.PropertyPaneDescription }, groups: [{ groupName: 'Display', groupFields: [PropertyPaneTextField('title', { label: strings.TitleFieldLabel }), PropertyPaneTextField('cardsJson', { label: strings.CardsFieldLabel, description: strings.CardsFieldDescription, multiline: true, rows: 12 })] }] }] }; }
}
