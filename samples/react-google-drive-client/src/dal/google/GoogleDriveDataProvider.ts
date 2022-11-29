import { IPagedDataProvider } from "mgwdev-m365-helpers/lib/dal/dataProviders";
import { IHttpClient } from "mgwdev-m365-helpers/lib/dal/http/IHttpClient";

export interface IGoogleFile{
    id: string;
    kind: string;
    mimeType: string;
    name: string;
    owners: {
        displayName: string;
        email: string;
        photoLink: string;
    }[];
    webLink: string;
    thumbnailLink: string;
    createdTime: string;
    iconLink: string;
}

export class GoogleDriveDataProvider implements IPagedDataProvider<IGoogleFile>{
    protected query: string = "";
    protected nextPageToken?: string;
    protected currentPageIndex: number = 0;
    public pageSize: number = 25;
    protected order: string = "id";
    protected fields = "id,kind,mimeType,name,owners,webViewLink,thumbnailLink,createdTime,iconLink";
    constructor(protected httpClient: IHttpClient){

    }
    public getQuery(): string {
        return this.query;
    }
    public setOrder(orderBy: string, orderDir: "ASC" | "DESC") {
        this.order = orderBy;
    }
    public allItemsCount: number = 10;
    public getCurrentPage(): number {
        return this.currentPageIndex;
    }
    public setQuery(query: string): void {
        this.query = encodeURIComponent(`fullText contains '${query}'`);
    }
    public async getData(): Promise<IGoogleFile[]> {
        let response = await this.httpClient.get(`https://www.googleapis.com/drive/v3/files?q=${this.query}&fields=files(${this.fields})&pageSize=${this.pageSize}`);
        let responseJson = await response.json();
        this.nextPageToken = responseJson.nextPageToken;
        return responseJson.files;
    }
    public async getNextPage(): Promise<IGoogleFile[]> {
        throw new Error("Method not implemented.");
    }
    public async getPreviousPage(): Promise<IGoogleFile[]> {
        throw new Error("Method not implemented.");
    }
    public getCurrentPageIndex(): number {
        return this.currentPageIndex;
    }
    public getPageSize(): number {
        return this.pageSize;
    }
    public isPreviousPageAvailable(): boolean {
        return this.currentPageIndex > 0;
    }
    public isNextPageAvailable(): boolean {
        return !!this.nextPageToken;
    }
    
}