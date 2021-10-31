import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/views";
import { IItemAddResult } from "@pnp/sp/items";
import { IRatingNewItem } from "../models/IRatingNewItem";
// Class Services
export default class spService {

    constructor(private context: WebPartContext) {
        // Setup Context to PnPjs
        sp.setup({
            spfxContext: this.context
        });
        // Init
        this.onInit();
    }
    // OnInit Function
    private async onInit() {

    }

    public async _getListItems(listName: string) {
        const allItems: any[] = await sp.web.lists.getByTitle(listName).items.getAll();
        console.log(allItems);
        return allItems;
    }


    public getRatingListItems(listName: string): Promise<any[]> {
        let promise: Promise<any[]> = new Promise<any[]>(
            (resolve, reject) => {
                sp.web.lists
                    .getByTitle(listName)
                    .items
                    .getAll(4000)
                    .then((data: any[]) => {
                        resolve(data);
                    })
                    .catch((error: any) => {
                        reject(error);
                    });
            }
        );

        return promise;
    }



    public async _addRatingItemPnP(listName: string, RatingRequest: IRatingNewItem) {
        await sp.web.lists.getByTitle(listName).items.add(RatingRequest);
    }

    public _addRatingItem(listName: string, RatingRequest: IRatingNewItem): Promise<IItemAddResult> {
        let promise: Promise<IItemAddResult> = new Promise<IItemAddResult>(
            (resolve, reject) => {
                sp.web.lists
                    .getByTitle(listName)
                    .items.add(
                        RatingRequest
                    )
                    .then((iar: IItemAddResult) => {
                        resolve(iar);
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        );

        return promise;
    }

    public _updateRatingItem(listName: string, RatingRequest: IRatingNewItem, ExistingID: any): Promise<IItemAddResult> {
        let promise: Promise<IItemAddResult> = new Promise<IItemAddResult>(
            (resolve, reject) => {
                sp.web.lists
                    .getByTitle(listName)
                    .items.getById(ExistingID).update(
                        RatingRequest
                    )
                    .then((iar: IItemAddResult) => {
                        resolve(iar);
                    })
                    .catch(error => {
                        reject(error);
                    });
            }
        );

        return promise;
    }
    public async _createListwithColumns(listName: string, colListColumns: any[]) {

        let listExist = await this._checkList(listName);
        console.log("List exist: ", listExist);
        if (!listExist) {
            const listAddResult = await sp.web.lists.add(listName);
            const list = await listAddResult.list.get();

            const newList = await sp.web.lists.getByTitle(listName);
            const view = await newList.defaultView;

            //checking columns are added to the collection or not
            if (colListColumns.length > 0) {
                const batch = sp.web.createBatch();
                colListColumns.forEach(fieldName => {
                    if (fieldName == "Comments") {
                        newList.fields.inBatch(batch).addMultilineText(fieldName, 6);
                    }
                    else {
                        newList.fields.inBatch(batch).addText(fieldName, 255);
                    }
                });

                colListColumns.forEach(fieldName => {
                    view.fields.inBatch(batch).add(fieldName);

                });

                batch.execute().then(_result => {
                    console.log('List with columns created.');

                }).catch(error => {
                    console.log(error);
                });
                return "List with required columns created.";
            }
        }
        else {
            return "List alreay exist";
        }
    }

    public async _checkList(listName: string) {
        let filterList = `Title eq '${listName}'`;
        let boolResult: boolean = false;
        let getList = await sp.web.lists.filter(filterList).get();
        if (getList.length > 0) {
            return boolResult = true;
        }
        else {
            return boolResult;
        }
    }



}
