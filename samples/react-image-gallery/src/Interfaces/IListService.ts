
export interface IListService {
    getListItemsCount:(url:string)=>Promise<any>;
    readItems:(url:string)=>Promise<any>;
}
