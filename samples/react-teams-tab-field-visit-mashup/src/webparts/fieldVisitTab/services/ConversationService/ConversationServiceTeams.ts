import { INewChatThread, ContentType } from '../../model/IConversation';
import { IConversationService } from '../../services/ConversationService/IConversationService';

import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ServiceScope } from '@microsoft/sp-core-library';
import { MSGraphClient } from '@microsoft/sp-http';

export default class ConversationServiceTeams implements IConversationService {

    private context: WebPartContext;
    private teamId: string;
    private channelId: string;

    constructor(context: WebPartContext, serviceScope: ServiceScope,
                teamId: string, channelId: string) {
        this.context = context;
        this.teamId = teamId;
        this.channelId = channelId;
    }

    public createChatThread(content: string, contentType: ContentType) {

        const result = new Promise<void>((resolve, reject) => {

            const postContent: INewChatThread =
            {
                rootMessage: {
                    body: {
                        content: content,
                        contentType: contentType
                    }
                }
            };

            this.context.msGraphClientFactory
            .getClient()
            .then((graphClient: MSGraphClient): void => {
                graphClient.api(`https://graph.microsoft.com/beta/teams/${this.teamId}/channels/${this.channelId}/chatThreads`)
                .post(postContent, ((err, res) => {
                    resolve();
                }));
            });
            

        });
        
        return result;
    }
}

