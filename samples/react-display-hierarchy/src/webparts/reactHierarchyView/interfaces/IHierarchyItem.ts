export interface IHierarchyItem {
    Title: string;
    Id: number;
    parent_id: number;
    Url?: string;
    Parent: any;
}

export class Item {
    private id: number;
    private title: string;
    private url: string;
    private parent_id?: number;

    constructor(id: number, title: string, url: string, parent_id?: number) {
        this.id = id;
        this.title = title;
        this.parent_id = parent_id;
        this.url = url;
    }
}