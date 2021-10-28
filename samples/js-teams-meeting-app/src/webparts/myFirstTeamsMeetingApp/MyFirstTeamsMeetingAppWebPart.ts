import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './MyFirstTeamsMeetingAppWebPart.module.scss';
import * as strings from 'MyFirstTeamsMeetingAppWebPartStrings';

export interface IMyFirstTeamsMeetingAppWebPartProps {
  description: string;
}

export default class MyFirstTeamsMeetingAppWebPart extends BaseClientSideWebPart<IMyFirstTeamsMeetingAppWebPartProps> {

  public render(): void {

    let title: string = 'ERR: not in Microsoft Teams';
    let subTitle: string = 'ERR: not in Microsoft Teams';

    if (this.context.sdks.microsoftTeams) {
      if (this.context.sdks.microsoftTeams.context.meetingId) {
        title = "Welcome to Microsoft Teams!";
        subTitle = "We are in the context of following meeting: " + this.context.sdks.microsoftTeams.context.meetingId;
      } else {
        title = "Welcome to Microsoft Teams!";
        subTitle = "We are in the context of following team: " + this.context.sdks.microsoftTeams.context.teamName;
      }
    }

    this.domElement.innerHTML = `
      <div class="${ styles.myFirstTeamsMeetingApp }">
        <div class="${ styles.container }">
          <div class="${ styles.row }">
            <div class="${ styles.column }">
              <span class="${ styles.title }">${title}</span>
              <p class="${ styles.subTitle }">${subTitle}</p>
            </div>
          </div>
        </div>
      </div>`;
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
