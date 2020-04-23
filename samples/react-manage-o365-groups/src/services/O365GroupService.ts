import { MSGraphClient, SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions, HttpClientResponse, HttpClient, IHttpClientOptions } from "@microsoft/sp-http";
import * as MicrosoftGraph from "@microsoft/microsoft-graph-types";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IGroup, IGroupCollection, ITeamChannel } from "../models";
import { GraphRequest } from "@microsoft/microsoft-graph-client";
import { Group } from "@microsoft/microsoft-graph-types";

export class O365GroupService {
  public context: WebPartContext;

  public setup(context: WebPartContext): void {
    this.context = context;
  }

  public getGroups(): Promise<IGroup[]> {
    return new Promise<IGroup[]>((resolve, reject) => {
      try {
        // Prepare the output array
        var o365groups: Array<IGroup> = new Array<IGroup>();

        this.context.msGraphClientFactory
          .getClient()
          .then((client: MSGraphClient) => {
            client
              .api("/groups?$filter=groupTypes/any(c:c eq 'Unified')")
              .get((error: any, groups: IGroupCollection, rawResponse: any) => {
                // Map the response to the output array
                groups.value.map((item: any) => {
                  o365groups.push({
                    id: item.id,
                    displayName: item.displayName,
                    description: item.description,
                    visibility: item.visibility,
                    teamsConnected: item.resourceProvisioningOptions.indexOf("Team") > -1 ? true : false
                  });
                });

                resolve(o365groups);
              });
          });
      } catch (error) {
        console.error(error);
      }
    });
  }

  public getMyMemberGroups(): Promise<IGroup[]> {
    return new Promise<IGroup[]>((resolve, reject) => {
      try {
        // Prepare the output array
        var o365groups: Array<IGroup> = new Array<IGroup>();

        this.context.msGraphClientFactory
          .getClient()
          .then((client: MSGraphClient) => {
            client
              .api("/me/memberOf/$/microsoft.graph.group?$filter=groupTypes/any(a:a eq 'unified')")
              .get((error: any, groups: IGroupCollection, rawResponse: any) => {
                // Map the response to the output array
                groups.value.map((item: any) => {
                  o365groups.push({
                    id: item.id,
                    displayName: item.displayName,
                    description: item.description,
                    visibility: item.visibility
                  });
                });

                resolve(o365groups);
              });
          });
      } catch (error) {
        console.error(error);
      }
    });
  }

  public getMyOwnerGroups(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        // Prepare the output array
        var o365groups: Array<IGroup> = new Array<IGroup>();

        this.context.msGraphClientFactory
          .getClient()
          .then((client: MSGraphClient) => {
            client
              .api("/me/ownedObjects/$/microsoft.graph.group")
              .get((error: any, groups: any, rawResponse: any) => {
                // Map the response to the output array
                groups.value.map((item: any) => {
                  o365groups.push({
                    id: item.id,
                    displayName: item.displayName,
                    description: item.description,
                    visibility: item.visibility
                  });
                });

                resolve(o365groups);
              });
          });
      } catch (error) {
        console.error(error);
      }
    });
  }

  public addMember(groupId: string): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      this.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
          client
            .api(`/groups/${groupId}/members/$ref`)
            .post(`{ "@odata.id": "https://graph.microsoft.com/v1.0/users/${this.context.pageContext.user.loginName}" }`)
            .then((addMemberResponse) => {
              if (addMemberResponse == undefined) {
                resolve();
              }
              else {
                throw new Error(`Error occured while joining the Group`);
              }
            });
        });
    });
  }

  public getUserId(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        this.context.msGraphClientFactory
          .getClient()
          .then((client: MSGraphClient) => {
            client
              .api(`/me/id`)
              .get((error: any, userId: any, rawResponse: any) => {
                resolve(userId.value);
              });
          });
      }
      catch (error) {
        console.error(error);
      }
    });
  }

  public removeMember(groupId: string): Promise<any> {
    return new Promise<void>((resolve, reject) => {
      this.getUserId().then(userId => {
        this.context.msGraphClientFactory
          .getClient()
          .then((client: MSGraphClient) => {
            client
              .api(`/groups/${groupId}/members/${userId}/$ref`)
              .delete((error: any, response: any, rawResponse: any) => {
                if (rawResponse.status === 204) {
                  resolve(response);
                }
                else {
                  throw new Error(`Error occured while leaving the Group`);
                }
              });
          });
      });
    });
  }

  public requestToJoinPrivateGroup(flowUrl: string, groupId: string, groupName: string, groupUrl: string): Promise<any> {

    const body: string = JSON.stringify({
      'groupId': groupId,
      'groupName': groupName,
      'groupUrl': groupUrl,
      'requestorName': this.context.pageContext.user.displayName,
      'requestorEmail': this.context.pageContext.user.email
    });

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-type', 'application/json');

    const httpClientOptions: IHttpClientOptions = {
      body: body,
      headers: requestHeaders
    };

    return this.context.httpClient.post(
      flowUrl,
      HttpClient.configurations.v1,
      httpClientOptions)
      .then((response: HttpClientResponse): Promise<HttpClientResponse> => {
        return response.json();
      });
  }

  public getGroupLink(groups: IGroup): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.context.msGraphClientFactory
          .getClient()
          .then((client: MSGraphClient) => {
            client
              .api(`/groups/${groups.id}/sites/root/weburl`)
              .get((error: any, group: any, rawResponse: any) => {
                resolve(group);
              });
          });
      } catch (error) {
        console.error(error);
      }
    });
  }

  public getGroupThumbnail(groups: IGroup): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      try {
        this.context.msGraphClientFactory
          .getClient()
          .then((client: MSGraphClient) => {
            client
              .api(`/groups/${groups.id}/photos/48x48/$value`)
              .responseType('blob')
              .get((error: any, group: any, rawResponse: any) => {
                resolve(window.URL.createObjectURL(group));
              });
          });
      } catch (error) {
        console.error(error);
      }
    });
  }

  public createGroup(groupName: string, groupDescription: string, groupVisibility: string, groupOwners: string[], groupMembers: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const groupRequest: Group = {
        displayName: groupName,
        description: groupDescription,
        groupTypes: [
          "Unified"
        ],
        mailEnabled: true,
        mailNickname: groupName.replace(/\s/g, ""),
        securityEnabled: false,
        visibility: groupVisibility
      };

      if (groupOwners && groupOwners.length) {
        groupRequest['owners@odata.bind'] = groupOwners.map(owner => {
          return `https://graph.microsoft.com/v1.0/users/${owner}`;
        });
      }

      if (groupMembers && groupMembers.length) {
        groupRequest['members@odata.bind'] = groupMembers.map(member => {
          return `https://graph.microsoft.com/v1.0/users/${member}`;
        });
      }

      this.context.msGraphClientFactory
        .getClient()
        .then((client: MSGraphClient) => {
          client
            .api("/groups")
            .post(groupRequest)
            .then((groupResponse) => {
              console.log(groupResponse);
              resolve();
            });
        });
    });
  }

  public getTeamChannels = async (teamId): Promise<ITeamChannel[]> => {
    return new Promise<ITeamChannel[]>((resolve, reject) => {
      try {
        this.context.msGraphClientFactory
          .getClient()
          .then((client: MSGraphClient) => {
            client
              .api(`teams/${teamId}/channels`)
              .get((error: any, channelsResponse: any, rawResponse: any) => {
                // // Prepare the output array
                // var teamChannels: Array<ITeamChannel> = new Array<ITeamChannel>();

                // // Map the response to the output array
                // channelsResponse.value.map((item: any) => {
                //   teamChannels.push({
                //     id: item.id,
                //     displayName: item.displayName,
                //     description: item.description,
                //     webUrl: item.webUrl
                //   });
                // });

                resolve(channelsResponse.value);
              });
          });
      } catch (error) {
        console.log('Error getting channels for team ' + teamId, error);
      }
    });
  }
}

const GroupService = new O365GroupService();
export default GroupService;