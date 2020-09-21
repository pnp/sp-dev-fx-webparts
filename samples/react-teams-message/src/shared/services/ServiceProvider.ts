import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClient } from "@microsoft/sp-http";

export class ServiceProvider {
  public _graphClient: MSGraphClient;
  private spcontext: WebPartContext;
  public constructor(spcontext: WebPartContext) {
    this.spcontext = spcontext;
  }

  public getmyTeams = async (): Promise<[]> => {
    this._graphClient = await this.spcontext.msGraphClientFactory.getClient(); //TODO

    let myTeams: [] = [];
    try {
      const teamsResponse = await this._graphClient.api('me/joinedTeams').version('v1.0').get();
      myTeams = teamsResponse.value as [];
    } catch (error) {
      console.log('Unable to get teams', error);
    }
    return myTeams;
  }

  public getChannel = async (teamID): Promise<[]> => {
    this._graphClient = await this.spcontext.msGraphClientFactory.getClient(); //TODO

    let myTeams: [] = [];
    try {
      const teamsResponse = await this._graphClient.api('teams/' + teamID + '/channels').version('v1.0').get();
      myTeams = teamsResponse.value as [];
    } catch (error) {
      console.log('unable to get channels', error);
    }
    return myTeams;
  }

  public sendMessage = async (teamId, channelId, message): Promise<[]> => {
    this._graphClient = await this.spcontext.msGraphClientFactory.getClient();
    try {
      // https://graph.microsoft.com/beta/teams/{team-id}/channels/{channel-id}/messages
      var content = {
        "body": {
          "content": message
        }
      };
      const messageResponse = await this._graphClient.api('/teams/' + teamId + '/channels/' + channelId + "/messages/")
        .version("beta").post(content);
      return messageResponse;

    } catch (error) {
      console.log('Unable to send message', error);
      return null;
    }

  }
}