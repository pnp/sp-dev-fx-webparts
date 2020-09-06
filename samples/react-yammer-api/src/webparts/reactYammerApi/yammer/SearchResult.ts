/**
 * Yammer search result.
 */
export class SearchResult {
    public id: number;
    public url: string;
    public text: string;

    /**
     * Factory from json to result object.
     */
    public static create(jsonData: any): SearchResult {
        return {
            id: jsonData.id,
            url: jsonData.web_url,
            text: jsonData.body.plain,
        } as SearchResult;
    }
}