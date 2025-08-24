import { spfi, SPFx, SPFI } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { WebPartContext } from "@microsoft/sp-webpart-base";



export interface IBookItem {
    Id: number;
    Number: number;
    BookAuthor: string;
    BookAbstract: string;
    Category: string;
    Price: string;
}

export class BooksService {
    private sp: SPFI;
    private listName = 'Books';

    constructor(context: WebPartContext) {
        this.sp = spfi().using(SPFx(context));
    }

    public async getBooks(): Promise<IBookItem[]> {
        try {
            const items: IBookItem[] = await this.sp.web.lists
                .getByTitle(this.listName)
                .items
                .select('Id', 'Number', 'BookAuthor', 'BookAbstract', 'Category', 'Price')();

            return items;
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    }



   
}
