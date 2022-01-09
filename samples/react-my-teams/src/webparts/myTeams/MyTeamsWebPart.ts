import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneToggle } from "@microsoft/sp-property-pane";
import * as strings from 'MyTeamsWebPartStrings';
import { MyTeams, IMyTeamsProps } from './components/myTeams';
import { MSGraphClient } from '@microsoft/sp-http';
import { TeamsService, ITeamsService } from '../../shared/services';

export interface IMyTeamsWebPartProps {
  openInClientApp: boolean;
}

export default class MyTeamsWebPart extends BaseClientSideWebPart<IMyTeamsWebPartProps> {

  private _graphClient: MSGraphClient;
  private _teamsService: ITeamsService;

  public async onInit(): Promise<void> {
    this._graphClient = await this.context.msGraphClientFactory.getClient();
    this._teamsService = new TeamsService(this._graphClient);

    return super.onInit();
  }

  public async render(): Promise<void> {
    const element: React.ReactElement<IMyTeamsProps> = React.createElement(
      MyTeams,
      {
        teamsService: this._teamsService,
        openInClientApp: this.properties.openInClientApp
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

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneToggle('openInClientApp', {
                  label: strings.OpenInClientAppFieldLabel,
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
