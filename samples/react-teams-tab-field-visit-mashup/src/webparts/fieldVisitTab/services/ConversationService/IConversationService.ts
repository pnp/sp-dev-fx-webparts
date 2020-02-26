export interface IConversationService {

    createChatThread(content: string, contentType: string):
        Promise<void>;
        
}
