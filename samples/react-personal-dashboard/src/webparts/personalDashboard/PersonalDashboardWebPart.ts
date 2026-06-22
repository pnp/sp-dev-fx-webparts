import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import PersonalDashboard from './components/PersonalDashboard';
import { IPersonalDashboardProps } from './components/IPersonalDashboardProps';

export default class PersonalDashboardWebPart extends BaseClientSideWebPart<{}> {

  public render(): void {
    const element: React.ReactElement<IPersonalDashboardProps> = React.createElement(
      PersonalDashboard,
      {
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        serviceScope: this.context.serviceScope,
        siteUrl: this.context.pageContext.site.absoluteUrl
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
}
