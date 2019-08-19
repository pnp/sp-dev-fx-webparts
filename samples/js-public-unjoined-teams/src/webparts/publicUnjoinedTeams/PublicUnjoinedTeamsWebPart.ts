import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { difference, find } from '@microsoft/sp-lodash-subset';
import { MSGraphClient } from '@microsoft/sp-http';

import styles from './PublicUnjoinedTeamsWebPart.module.scss';
import * as strings from 'PublicUnjoinedTeamsWebPartStrings';

export interface IPublicUnjoinedTeamsWebPartProps {
  title: string;
}

export default class PublicUnjoinedTeamsWebPart extends BaseClientSideWebPart<IPublicUnjoinedTeamsWebPartProps> {

  public async render(): Promise<any> {
    var unjoinedTeams = await this.getUnjoinedTeams();

    this.domElement.innerHTML = `
      <div class="${ styles.publicUnjoinedTeams }">
        <div class="${styles.title}">
          ${this.properties.title}
        </div>
        <div id="container" class="${styles.container}">
          <!-- content gets appended here -->
        </div>
      </div>`;

    await this.renderTeams(unjoinedTeams);
  }

  protected async getUnjoinedTeams(): Promise<any> {
    var joinedTeamIds:Array<string> = (await this.graphGet(`https://graph.microsoft.com/beta/me/joinedTeams`)).value.map(x => x.id);
    var allTeams= (await this.graphGet(`https://graph.microsoft.com/beta/groups?$filter=resourceProvisioningOptions/Any(x:x eq 'Team')&$top=999`)).value;

    var publicTeamIds:Array<string> = allTeams.filter(team => team.visibility === 'Public').map(x => x.id);
    var missingTeamIds:Array<string> = difference(publicTeamIds, joinedTeamIds);

    let missingTeams = JSON.parse('{"value": []}');

    missingTeamIds.forEach(teamId => {
      var team = find(allTeams, {'id': teamId});
      missingTeams['value'].push(team);
    });

    return missingTeams.value;
  }

  protected async renderTeams(teamsToShow)  {
    const container: Element = this.domElement.querySelector('#container');
    var userId:string =  (await this.graphGet("me")).id;

    for (var team of teamsToShow)
    {
      var row:HTMLDivElement = document.createElement("div");
      row.className = styles.row;
      container.appendChild(row);

      var button:HTMLButtonElement = document.createElement("button");
      button.id = team.id;
      button.innerHTML = "Join";
      button.onclick = (e:Event) => this.addMember(e.srcElement, userId);
      row.appendChild(button);

      var span:HTMLSpanElement = document.createElement("span");
      span.innerHTML = ` ${team.displayName}`;
      row.appendChild(span);   
    }
  }

  protected addMember(source:Element, userId:string) {
    var button:HTMLButtonElement = <HTMLButtonElement>source;
    button.disabled = true;
    button.innerText = "Joined!";
    
    var body:string = `{"@odata.id": "https://graph.microsoft.com/v1.0/directoryObjects/${userId}"}`;
    this.graphPost(`https://graph.microsoft.com/v1.0/groups/${button.id}/members/$ref`, body);
  }

  protected async graphGet(url: string, value?:Array<string>) {
    return await this.callGraph(url, "GET");
  }

  protected async graphPost(url: string, body:string) {
    return await this.callGraph(url, "POST", body);
  }

  protected async callGraph(url: string, method:string, body?:string): Promise<any> {
    const graphClient:MSGraphClient = await this.context.msGraphClientFactory.getClient();

    var response;
    if (method.toUpperCase() == "GET") {
      response = await graphClient.api(url).get();
    }
    if (method.toUpperCase() == "POST") {
      response = await graphClient.api(url).post(body);
    }

    return response;
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
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
