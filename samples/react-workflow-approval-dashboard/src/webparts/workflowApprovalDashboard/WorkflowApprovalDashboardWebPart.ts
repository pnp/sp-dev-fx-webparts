import * as React from 'react';
import * as ReactDom from 'react-dom';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { DashboardConfig } from './models';
import { SharePointWorkflowService } from '../../services/SharePointWorkflowService';
import { WorkflowApprovalDashboard } from './WorkflowApprovalDashboard';
import localConfig from '../../config/dashboard-config.json';
import { validateConfig } from '../../services/parser';

export default class WorkflowApprovalDashboardWebPart extends BaseClientSideWebPart<{}> {
  public render(): void {
    let config: DashboardConfig;
    try { config = validateConfig(localConfig); }
    catch (error) { this.domElement.textContent = error instanceof Error ? error.message : 'Invalid dashboard configuration.'; return; }
    const element = React.createElement(WorkflowApprovalDashboard, { config, service: new SharePointWorkflowService(this.context.spHttpClient, this.context.pageContext.web.absoluteUrl, () => new Date(), SPHttpClient.configurations.v1) });
    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void { ReactDom.unmountComponentAtNode(this.domElement); }
}
