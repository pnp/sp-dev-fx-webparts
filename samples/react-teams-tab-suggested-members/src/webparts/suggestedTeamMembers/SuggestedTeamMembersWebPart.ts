import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SuggestedTeamMembersWebPartStrings';
import SuggestedTeamMembers from './components/SuggestedTeamMembers';
import { ISuggestedTeamMembersProps } from './components/ISuggestedTeamMembersProps';

export interface ISuggestedTeamMembersWebPartProps {
  description: string;
}

export default class SuggestedTeamMembersWebPart extends BaseClientSideWebPart<ISuggestedTeamMembersWebPartProps> {

  private _teamsContext: microsoftTeams.Context;

  protected onInit(): Promise<any> {
    let retVal: Promise<any> = Promise.resolve();
    if (this.context.microsoftTeams) {
      retVal = new Promise((resolve, reject) => {
        this.context.microsoftTeams.getContext(context => {
          this._teamsContext = context;
          resolve();
        });
      });
    }
    return retVal;
  }

  public render(): void {
    const element: React.ReactElement<ISuggestedTeamMembersProps > = React.createElement(
      SuggestedTeamMembers,
      {
        teamsContext: this._teamsContext,
        graphHttpClient: this.context.graphHttpClient,
        groupId: this.context.pageContext.site.group.id
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
