import { ContentType } from '../../model/IConversation';

export interface IConversationService {

    createChatThread(content: string, contentType: ContentType):
        Promise<void>;
        
}
