import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import { ITeamsMessage } from "../model/ITeamsMessage";

export interface IGraphService {
    spcontext: WebPartContext;
    IntializeGraphClient: () => Promise<void>;
    getMessages: (teamsId: string, channelId: string) => Promise<ITeamsMessage>;
    getNextData: (nextURL: string) => Promise<ITeamsMessage>;
    getMessagesReplies: (teamsId: string, channelId: string, messageId: string) => Promise<ITeamsMessage>;
}

export class GraphService implements IGraphService {
    private _graphClient: MSGraphClientV3;
    public spcontext: WebPartContext;
    public constructor(spcontext: WebPartContext) {
        this.spcontext = spcontext;
    }

    public IntializeGraphClient = async (): Promise<void> => {
        this._graphClient = await this.spcontext.msGraphClientFactory.getClient("3"); //TODO
    }

    public getMessages = async (teamsId: string, channelId: string): Promise<ITeamsMessage> => {
        let messageResponse = [];
        try {
            messageResponse = await this._graphClient.api('teams/' + teamsId + '/channels/' + channelId + '/messages').top(45).version('v1.0').get();
        } catch (error) {
            console.log('Unable to get teams', error);
        }
        return messageResponse;
    }

    public getNextData = async (nextURL: string): Promise<ITeamsMessage> => {
        let messageResponse = [];
        try {
            messageResponse = await this._graphClient.api(nextURL).top(45).version('v1.0').get();
        } catch (error) {
            console.log('Unable to get teams', error);
        }
        return messageResponse;
    }

    public getMessagesReplies = async (teamsId: string, channelId: string,messageId: string): Promise<ITeamsMessage> => {
        let repliesResponse = [];
        try {
            repliesResponse = await this._graphClient.api('teams/' + teamsId + '/channels/' + channelId + '/messages/' + messageId + '/replies').top(45).version('v1.0').get();
        } catch (error) {
            console.log('Unable to get teams', error);
        }
        return repliesResponse;
        }
}