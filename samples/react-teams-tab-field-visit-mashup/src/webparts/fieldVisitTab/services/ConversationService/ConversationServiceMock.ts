import { IConversationService } from './IConversationService';
import { ContentType } from '../../model/IConversation';

export default class ConversationServiceMock implements IConversationService {

    public createChatThread(content: string, contentType: ContentType) {

        console.log(`New chat thread: ${content}`);
        return new Promise<void>((resolve) => {
            resolve();
        });
    }


}