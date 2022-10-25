import { IHttpClient } from "./http/IHttpClient";

export interface INews {
    author: string;
    description: string;
    listID: string;
    listItemID: string;
    path: string;
    pictureThumbnailURL: string;
    spWebUrl: string;
    title: string;
    uniqueId: string;
    firstPublishedDateOWSDATE: string;
}

export class NewsProvider {
    protected baseQuery = "ContentTypeId:0x0101009D1CB255DA76424F860D91F20E6C4118* AND PromotedState:2";
    public static readonly baseMaxResults = 32;
    protected readonly selectedField = ["Title", "Description", "PictureThumbnailURL", "Path", "UniqueId", "SPWebUrl", "ListItemID", "ListID", "Author", "FirstPublishedDateOWSDATE"];

    constructor(protected graphClient: IHttpClient, public maxResults?: number, public query?: string) {
        this.query = query || this.baseQuery;
        this.maxResults = maxResults || NewsProvider.baseMaxResults;
    }
    public pollData(lastPoll: Date): Promise<any[]> {
        return this.getData();
    }
    public getDataById(id: any): Promise<any> {
        return;
    }
    public async getData(): Promise<INews[]> {
        try {
            let searchResults = await this.graphClient.post("https://graph.microsoft.com/v1.0/search/query", {
                body: JSON.stringify({
                    "requests": [
                        {
                            "entityTypes": [
                                "listItem"
                            ],
                            "query": {
                                "queryString": `${this.query}`
                            },
                            "fields": this.selectedField
                        }
                    ]
                })
            });
            if (searchResults.ok) {
                let results = await searchResults.json();

                return this.parseNews(results.value[0].hitsContainers[0].hits.map(hit => hit.resource.fields));
            }
        }
        catch (err) {
            throw err;
        }
    }

    protected parseNews(news: any): INews[] {
        return news.sort((a: INews, b: INews) => {
            return a.firstPublishedDateOWSDATE < b.firstPublishedDateOWSDATE
                ? 1
                : a.firstPublishedDateOWSDATE === b.firstPublishedDateOWSDATE
                    ? 0
                    : -1;
        });
    }
}