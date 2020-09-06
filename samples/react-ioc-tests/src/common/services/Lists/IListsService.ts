export interface IList {
    Title: string;
    DefaultViewUrl: string;
}

export default interface IListsService {
    GetLists(): Promise<IList[]>;
}