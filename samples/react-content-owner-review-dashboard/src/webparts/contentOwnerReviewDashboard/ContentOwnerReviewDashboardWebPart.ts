import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneSlider } from '@microsoft/sp-webpart-base';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import Dashboard, { IDashboardProps } from './components/Dashboard';

export interface IProps { sourcePaths: string; referenceDate: string; dueWithinDays: number; }
export default class ContentOwnerReviewDashboardWebPart extends BaseClientSideWebPart<IProps> {
  public render(): void { ReactDom.render(React.createElement(FluentProvider, { theme: webLightTheme }, React.createElement(Dashboard, { context: this.context, sourcePaths: this.properties.sourcePaths || '', referenceDate: this.properties.referenceDate || new Date().toISOString().slice(0, 10), dueWithinDays: this.properties.dueWithinDays || 30 } as IDashboardProps)), this.domElement); }
  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration { return { pages: [{ header: { description: 'Read-only dashboard settings' }, groups: [{ groupName: 'Sources and review policy', groupFields: [PropertyPaneTextField('sourcePaths', { label: 'List/library paths (one per line)' }), PropertyPaneTextField('referenceDate', { label: 'Reference date (YYYY-MM-DD)' }), PropertyPaneSlider('dueWithinDays', { label: 'Due threshold in days', min: 0, max: 365, value: 30, showValue: true })] }] }] }; }
}
