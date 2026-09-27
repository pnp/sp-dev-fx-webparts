import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration, PropertyPaneTextField } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import plannerConfig from '../../config/capacity-planner.config.json';
import { ResourceCapacityPlanner } from './components/ResourceCapacityPlanner';
import { SharePointGetOnlyClient } from './services/SharePointGetOnlyClient';

export interface IResourceCapacityPlannerWebPartProps { description: string; }

export default class ResourceCapacityPlannerWebPart extends BaseClientSideWebPart<IResourceCapacityPlannerWebPartProps> {
  public render(): void {
    const element = React.createElement(ResourceCapacityPlanner, {
      client: new SharePointGetOnlyClient(this.context.spHttpClient),
      pageUrl: this.context.pageContext.web.absoluteUrl,
      config: plannerConfig
    });
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
  protected get dataVersion(): Version { return Version.parse('1.0'); }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return { pages: [{ header: { description: 'Resource capacity planner' }, groups: [{ groupName: 'About', groupFields: [PropertyPaneTextField('description', { label: 'Description' })] }] }] };
  }
}
