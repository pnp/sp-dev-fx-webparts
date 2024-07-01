export interface ISPHierarchyItem {
    Title: string;
    Id: number;
    parent_id: number;
    Url?: string;
    Parent: any;
}

export class HierarchyItem {
    id: number;
    title: string;
    url: string;
    parent_id?: number;
    children?: HierarchyItem[];

    constructor(id: number, title: string, url: string, parent_id?: number) {
        this.id = id;
        this.title = title;
        this.parent_id = parent_id;
        this.url = url;
    }
}