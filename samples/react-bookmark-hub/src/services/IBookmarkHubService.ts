import { IAppData } from "./models/IAppData";
import { IBookmark } from "./models/IBookmark";

export interface IBookmarkHubService {
    getAllBookmarks(): Promise<IBookmark[]>;
    getAppData(): Promise<IAppData>;
    saveAppData(appData: IAppData): Promise<void>;
    getMergedBookmarks(): Promise<{ backendBookmarks: IBookmark[], appData: IAppData }>;
}