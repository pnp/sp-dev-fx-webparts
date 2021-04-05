import { MSGraphClientFactory } from '@microsoft/sp-http';

export interface IMSGraphInterface {
    getCurrentUserId(): Promise<any>;
    getUserId(userEmail: string): Promise<any>;
    createUsersChat(requesterId: string, birthdayPersonId: string): Promise<any>;
    sendMessage(chatId: string, chatMessage: string): Promise<any>;
}



export default async function  msGraphProvider(msGraphClientFactory: MSGraphClientFactory): Promise<IMSGraphInterface> {
    const msGraphClient = await msGraphClientFactory.getClient();

    //GET https://graph.microsoft.com/beta/users/{id}
    const getUserId = async (userEmail: string) => {
    
        let resultGraph = await msGraphClient.api(`/users/${userEmail}`).get();
        return resultGraph.id;
    };

    const getCurrentUserId = async () => {
        let resultGraph = await msGraphClient.api(`me`).get();
        return resultGraph.id;
    };

    //     POST https://graph.microsoft.com/beta/chats
    // Content-Type: application/json

    // {
    //   "chatType": "oneOnOne",
    //   "members": [
    //     {
    //       "@odata.type": "#microsoft.graph.aadUserConversationMember",
    //       "roles": ["owner"],
    //       "user@odata.bind": "https://graph.microsoft.com/beta/users('8b081ef6-4792-4def-b2c9-c363a1bf41d5')"
    //     },
    //     {
    //       "@odata.type": "#microsoft.graph.aadUserConversationMember",
    //       "roles": ["owner"],
    //       "user@odata.bind": "https://graph.microsoft.com/beta/users('82af01c5-f7cc-4a2e-a728-3a5df21afd9d')"
    //     }
    //   ]
    // }
    const createUsersChat = async (requesterId: string, birthdayPersonId: string) => {
        let body: any = {
            "chatType": "oneOnOne",
            "members": [
                {
                    "@odata.type": "#microsoft.graph.aadUserConversationMember",
                    "roles": ["owner"],
                    "user@odata.bind": `https://graph.microsoft.com/beta/users('${requesterId}')`
                },
                {
                    "@odata.type": "#microsoft.graph.aadUserConversationMember",
                    "roles": ["owner"],
                    "user@odata.bind": `https://graph.microsoft.com/beta/users('${birthdayPersonId}')`
                }
            ]
        };
        let resultGraph = await msGraphClient.api(`chats`).version("beta").post(body);
        return resultGraph.id;
    };

    // POST https://graph.microsoft.com/beta/chats/{id}/messages
    // Content-type: application/json

    // {
    //   "body": {
    //     "content": "Hello World"
    //   }
    // }
    const sendMessage = async (chatId: string, chatMessage: string) => {
        let body = {
            "body": {
                "content": chatMessage
            }
        };
        let resultGraph = await msGraphClient.api(`chats/${chatId}/messages`).version("beta").post(body);
        return resultGraph;
    };

    return {
        getUserId,
        sendMessage,
        createUsersChat,
        getCurrentUserId
    };
}