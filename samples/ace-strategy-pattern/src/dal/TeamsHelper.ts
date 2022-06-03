import { Guid } from "@microsoft/sp-core-library";
import { IHttpClient } from "./http/IHttpClient";

export interface ITeam{
    id: string;
    displayName: string;
}

export interface ITeamsChannel{
    id: string;
    displayName: string;
}

export class TeamsHelper{
    constructor(protected graphClient:IHttpClient){

    }
    public async getTeams():Promise<ITeam[]>{
        let response = await this.graphClient.get("https://graph.microsoft.com/v1.0/me/joinedTeams");
        if(response.ok){
            return (await response.json()).value;
        }
        else throw new Error("Error getting teams, " + response.statusText);
    }
    public async getTeamsChannels(teamId: string):Promise<ITeamsChannel[]>{
        let response = await this.graphClient.get(`https://graph.microsoft.com/v1.0/teams/${teamId}/channels`);
        if(response.ok){
            return (await response.json()).value;
        }
        else throw new Error("Error getting teams, " + response.statusText);
    }
    public async postNewsCard(newsCard: any, teamId: string, channelId: string){
        let attachmentId = Guid.newGuid().toString();
        let messageBody = {
            subject: newsCard.title,
            body:{
                contentType:"html",
                content: `<attachment id="${attachmentId}"></attachment>`
            },
            attachments:[{
                id: attachmentId,
                contentType: "application/vnd.microsoft.card.adaptive",
                contentUrl: null,
                content: JSON.stringify(newsCard)
            }]
        }
        return await this.graphClient.post(`https://graph.microsoft.com/v1.0/teams/${teamId}/channels/${channelId}/messages`, {
            body: JSON.stringify(messageBody)
        });
    }
}