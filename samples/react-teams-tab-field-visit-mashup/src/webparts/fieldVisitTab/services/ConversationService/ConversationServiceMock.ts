import { IConversationService } from './IConversationService';

export default class ConversationServiceMock implements IConversationService {

    public createChatThread(content: string, contentType: string) {

        console.log(`New chat thread: ${content}`);
        return new Promise<void>((resolve) => {
            resolve();
        });
    }


}