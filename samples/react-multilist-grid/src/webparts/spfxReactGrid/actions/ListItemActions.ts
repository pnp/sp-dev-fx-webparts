import {
    ADD_LISTITEM,
    ADD_LISTITEMS,
    REMOVE_LISTITEM,
    GET_LISTITEMS,
    GOT_LISTITEMS,
    GET_LISTITEMSERROR,

    GOT_LISTITEM,
    GET_LISTITEMERROR,
    CLEAR_LISTITEMS,
    SAVE_LISTITEM,//save locally
    UNDO_LISTITEMCHANGES,
    UPDATE_LISTITEM,//save to sharepoint
    UPDATE_LISTITEM_ERROR,
    UPDATE_LISTITEM_SUCCESS,
    ADDED_NEW_ITEM_TO_SHAREPOINT,
    REMOVE_LISTITEM_SUCCESS,
    REMOVE_LISTITEM_ERROR


} from "../constants";
import "whatwg-fetch";
import * as utils from "../utils/utils";
import * as _ from "lodash";
import { Web, TypedHash } from "sp-pnp-js";
import ListItem from "../model/ListItem";
import GridRowStatus from "../Model/GridRowStatus";
import { Log } from "@microsoft/sp-core-library";
import ListDefinition from "../model/ListDefinition";
import ColumnDefinition from "../model/ColumnDefinition";
export function clearListItems() {
    return {
        type: CLEAR_LISTITEMS,
        payload: {
        }
    };
}
export function addListItem(listItem: ListItem) {
    return {
        type: ADD_LISTITEM,
        payload: {
            listItem: listItem
        }
    };
}
export function removeListItem(dispatch: any, listItem: ListItem, listDefinition: ListDefinition): any {
    const weburl = utils.ParseSPField(listDefinition.webLookup).id;
    const listid = utils.ParseSPField(listDefinition.listLookup).id;
    const web = new Web(weburl);
    switch (listItem.__metadata__GridRowStatus) {
        case GridRowStatus.toBeDeleted:
            web.lists.getById(listid).items.getById(listItem.ID).recycle()
                .then((response) => {
                    // shouwld have an option to rfresh here in cas of calculated columns

                    const gotListItems = removeListItemSuccessAction(listItem);
                    dispatch(gotListItems); // need to ewname this one to be digfferent from the omported ome
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(removeListItemErrorAction(error)); // need to ewname this one to be digfferent from the omported ome
                });
            return {
                type: REMOVE_LISTITEM,
                payload: {
                    listItem: listItem
                }
            };
        default:
            Log.warn("ListItemContainer", "Invalid GrodrowStatus in update ListiteRender-- " + listItem.__metadata__GridRowStatus.toString());
    }
}
export function removeListItemSuccessAction(listItem) {

    return {
        type: REMOVE_LISTITEM_SUCCESS,
        payload: {
            listItem: listItem
        }
    };
}
export function removeListItemErrorAction(listItem) {

    return {
        type: REMOVE_LISTITEM_ERROR,
        payload: {
            listItem: listItem
        }
    };
}
export function addListItems(listItems: ListItem[]) {
    return {
        type: ADD_LISTITEMS,
        payload: {
            listItems: listItems
        }
    };
}
export function listDefinitionIsValid(listDefinition: ListDefinition): boolean {
    if (listDefinition.webLookup === null) {
        return false;
    }
    if (listDefinition.listLookup === null) {
        return false;
    }
    if (listDefinition.columnReferences === null) {
        return false;
    }

    return true;
}
/**
 * Action to update a listitem in sharepoint
 */
export function updateListItemAction(dispatch: any, listDefinition: ListDefinition, listItem: ListItem): any {

    const weburl = utils.ParseSPField(listDefinition.webLookup).id;
    const listid = utils.ParseSPField(listDefinition.listLookup).id;
    const web = new Web(weburl);
    let typedHash: TypedHash<string | number | boolean> = {};
    for (const columnRef of listDefinition.columnReferences) {
        let fieldName = utils.ParseSPField(columnRef.name).id;
        switch (columnRef.fieldDefinition.TypeAsString) {
            case "Counter": // do not send ID to shareppoint as a data field
                break;

            case "Lookup":
                if (listItem[fieldName]) {// field may not be set
                    typedHash[fieldName + "Id"] = listItem[fieldName].Id;
                }
                break;
            case "User":

                if (listItem[fieldName]) {// field may not be set
                    typedHash[fieldName + "Id"] = listItem[fieldName].Id;
                }
                break;

            default:
                typedHash[fieldName] = listItem[fieldName];
        }
    }
    switch (listItem.__metadata__GridRowStatus) {
        case GridRowStatus.modified:
        case GridRowStatus.pristine:// if user cjust chnage the listedef

            const promise = web.lists.getById(listid).items.getById(listItem.ID).update(typedHash, listItem["odata.etag"])
                .then((response) => {

                    getListItem(listDefinition, listItem.ID)
                        .then((r) => {

                            // srfresh here in cas of calculated columns
                            r.__metadata__ListDefinitionId = listDefinition.guid; // save my listdef, so i can get the columnReferences later
                            r.__metadata__GridRowStatus = GridRowStatus.pristine; // save my listdef, so i can get the columnReferences later
                            const gotListItems = updateListItemSuccessAction(r);
                            dispatch(gotListItems); // need to ewname this one to be digfferent from the omported ome
                        });
                })
                .catch((error) => {
                    console.log(error);
                    dispatch(updateListItemErrorAction(error)); // need to ewname this one to be digfferent from the omported ome
                });
            const action = {
                type: UPDATE_LISTITEM,
                payload: {
                    promise: promise
                }
            };
            return action;
        case GridRowStatus.new:
            const mewpromise = web.lists.getById(listid).items.add(typedHash)
                .then((response) => {//

                    const itemId = response.data.Id;
                    getListItem(listDefinition, itemId)
                        .then((r) => {
                            /**
                                  * data recived after adding an item is NOT the same as we recive from a get
                                  * need to fetch item and wap it in
                                  */
                            r.__metadata__ListDefinitionId = listDefinition.guid; // save my listdef, so i can get the columnReferences later
                            r.__metadata__GridRowStatus = GridRowStatus.pristine; // save my listdef, so i can get the columnReferences later
                            const actiom = addedNewItemInSharepouint(r, listItem);
                            dispatch(actiom); // need to ewname this one to be digfferent from the omported ome
                        })
                        .catch((error) => {
                            console.log(error);
                            dispatch(updateListItemErrorAction(error)); // need to ewname this one to be digfferent from the omported ome
                        });

                });
            return {
                type: UPDATE_LISTITEM,
                payload: {
                    promise: mewpromise
                }
            };
        default:
            return; // action called on item with ibalid state
    }
}
export function updateListItemErrorAction(error) {
    return {
        type: UPDATE_LISTITEM_ERROR,
        payload: {
            error: error
        }
    };
}
/**
 * called after an item was added to the local cache, updated, then sent to sharepoint.
 * We need to replace our local copy, with the real valuse that we got back from sharepoint
 */
export function addedNewItemInSharepouint(listItem, localCopy) {
    return {
        type: ADDED_NEW_ITEM_TO_SHAREPOINT,
        payload: {
            listItem: listItem,
            localCopy: localCopy
        }
    };
}
export function updateListItemSuccessAction(listItem) {

    return {
        type: UPDATE_LISTITEM_SUCCESS,
        payload: {
            listItem: listItem
        }
    };
}
export function getListItem(listDefinition: ListDefinition, itemId: number): Promise<any> {



    let fieldnames = new Array<string>();
    let expands = new Array<string>();

    for (const columnreference of listDefinition.columnReferences) {
        switch (columnreference.fieldDefinition.TypeAsString) {
            case "Lookup":
                expands.push(columnreference.fieldDefinition.InternalName);
                fieldnames.push(columnreference.fieldDefinition.InternalName + "/" + columnreference.fieldDefinition.LookupField);
                fieldnames.push(columnreference.fieldDefinition.InternalName + "/Id");
                break;
            case "User":
                // url is ?$select=Author/Name,Author/Title&$expand=Author/Id
                expands.push(columnreference.fieldDefinition.InternalName + "/Id");
                fieldnames.push(columnreference.fieldDefinition.InternalName + "/Title");
                fieldnames.push(columnreference.fieldDefinition.InternalName + "/Id");
                fieldnames.push(columnreference.fieldDefinition.InternalName + "/Name");
                break;
            default:

                const internalName = utils.ParseSPField(columnreference.name).id;
                fieldnames.push(internalName); // need to split
        }
    }

    const weburl = utils.ParseSPField(listDefinition.webLookup).id;
    const listid = utils.ParseSPField(listDefinition.listLookup).id;

    const web = new Web(weburl);

    let promise: Promise<any> = web.lists.getById(listid).items.getById(itemId).select(fieldnames.concat("GUID").concat("Id").join(",")).expand(expands.join(",")).get();

    return promise;
}
export function getListItemErrorAction(error) {
    return {
        type: GET_LISTITEMERROR,
        payload: {
            error: error
        }
    };

}
export function gotListItemAction(item) {
    return {
        type: GOT_LISTITEM,
        payload: {
            item: item
        }
    };
}
export function getListItemsAction(dispatch: any, listDefinitions: Array<ListDefinition>, columnDefinitions: Array<ColumnDefinition>): any {
    dispatch(clearListItems());
     const promises: Array<Promise<any>> = new Array<Promise<any>>();
    for (const listDefinition of listDefinitions) {
        if (!listDefinitionIsValid(listDefinition)) {
            break;
        }
        let fieldnames = new Array<string>();
        let expands = new Array<string>();

        for (const columnreference of listDefinition.columnReferences) {
            switch (columnreference.fieldDefinition.TypeAsString) {
                case "Lookup":
                    expands.push(columnreference.fieldDefinition.InternalName);
                    fieldnames.push(columnreference.fieldDefinition.InternalName + "/" + columnreference.fieldDefinition.LookupField);
                    fieldnames.push(columnreference.fieldDefinition.InternalName + "/Id");
                    break;
                case "User":
                    // url is ?$select=Author/Name,Author/Title&$expand=Author/Id
                    expands.push(columnreference.fieldDefinition.InternalName + "/Id");
                    fieldnames.push(columnreference.fieldDefinition.InternalName + "/Title");
                    fieldnames.push(columnreference.fieldDefinition.InternalName + "/Id");
                    fieldnames.push(columnreference.fieldDefinition.InternalName + "/Name");
                    break;
                default:

                    const internalName = utils.ParseSPField(columnreference.name).id;
                    fieldnames.push(internalName); // need to split
            }
        }

        const weburl = utils.ParseSPField(listDefinition.webLookup).id;
        const listid = utils.ParseSPField(listDefinition.listLookup).id;

        const web = new Web(weburl);

        const promise = web.lists.getById(listid).items.select(fieldnames.concat("GUID").concat("Id").join(",")).expand(expands.join(",")).get()
            .then((response) => {

                const data = _.map(response, (item: any) => {
                    item.__metadata__ListDefinitionId = listDefinition.guid; // save my listdef, so i can get the columnReferences later
                    item.__metadata__GridRowStatus = GridRowStatus.pristine;
                    return item;
                });
                console.log(data);
                const gotListItems = gotListItemsAction(data,listDefinitions,columnDefinitions);
                dispatch(gotListItems); // need to ewname this one to be digfferent from the omported ome
            })
            .catch((error) => {
                console.log(error);
                dispatch(getListItemsErrorAction(error)); // need to ewname this one to be digfferent from the omported ome
            });
        promises.push(promise);


    }
    const action = {
        type: GET_LISTITEMS,
        payload: {
            promise: Promise.all(promises)
        }
    };

    return action;
}
export function getListItemsErrorAction(error) {
    return {
        type: GET_LISTITEMSERROR,
        payload: {
            error: error
        }
    };

}
export function gotListItemsAction(items: Array<ListItem>, listDefinitions: Array<ListDefinition>, columnDefinitions: Array<ColumnDefinition>) {
    return {
        type: GOT_LISTITEMS,
        payload: {
            items: items,
            listDefinitions: listDefinitions,
            columnDefinitions: columnDefinitions
        }
    };
}
export function saveListItemAction(listItem: ListItem) {
    const action = {
        type: SAVE_LISTITEM,
        payload: {
            listItem
        }
    };
    return action;
}
export function undoListItemChangesAction(listItem: ListItem) {
    const action = {
        type: UNDO_LISTITEMCHANGES,
        payload: {
            listItem
        }
    };
    return action;
}
