import { IHttpClient } from "./http/IHttpClient";
import { INews } from "./NewsProvider";

export interface IComment{
    text: string;
    author: {
        email: string;
        name: string;
    }
}

export class SocialInfoHelper {
    constructor(protected spHttpClient: IHttpClient) {

    }
    public async likeNews(news: INews): Promise<void> {
        await this.spHttpClient.post(`${news.spWebUrl}/_api/web/lists('${news.listID}')/GetItemById(${news.listItemID})/like`, { body: "{}" });
    }
    public async commentNews(news: INews, comment: string): Promise<void> {
        await this.spHttpClient.post(`${news.spWebUrl}/_api/web/lists('${news.listID}')/GetItemById(${news.listItemID})/GetComments`, { 
            body: JSON.stringify({
                text: comment
            })
        });
    }
    public async loadComments(news: INews): Promise<IComment[]> {
        let response = await this.spHttpClient.get(`${news.spWebUrl}/_api/web/lists('${news.listID}')/GetItemById(${news.listItemID})/GetComments`);
        return (await response.json()).value;
    }
}