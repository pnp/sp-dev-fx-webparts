import {
    ADD_LISTITEM,
    ADD_LISTITEMS,
    REMOVE_LISTITEM,
    GET_LISTITEMS,
    GOT_LISTITEMS,
    GET_LISTITEMSERROR

} from "../constants";
import "whatwg-fetch";
import { Promise } from "es6-promise";
import * as utils from "../utils/utils";
import pnp from "sp-pnp-js";
import ListItem from "../model/ListItem";
import ListDefinition from "../model/ListDefinition";
export function addListItem(listItem: ListItem) {
    return {
        type: ADD_LISTITEM,
        payload: {
            listItem: listItem
        }
    };
}
export function removeListItem(listItem: ListItem) {
    return {
        type: REMOVE_LISTITEM,
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
export function getListItemsAction(dispatch: any, listDefinitions: Array<ListDefinition>): any {
    let promises: Array<Promise<any>> = new Array<Promise<any>>();
    for (let listDefinition of listDefinitions) {
        let fieldnames = new Array<string>();
        for (let columnreference of listDefinition.columnReferences) {
            let internalName = utils.ParseSPField(columnreference.name).id;
            fieldnames.push(internalName); // need to split
        }
        let webid = utils.ParseSPField(listDefinition.webLookup).id;
        let listid = utils.ParseSPField(listDefinition.listLookup).id;
        debugger;
        const promise = pnp.sp.web.webs[webid].lists.getById(listid).items.select(fieldnames.join(",")).get()
            .then((response) => {
                const data = _.map(response, (item: any) => {
                    return new ListItem(item.Id, item.Title, item.GUID);
                });
                console.log(data);
                const gotListItems = gotListItemsAction(data);
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
export function gotListItemsAction(items) {
    return {
        type: GOT_LISTITEMS,
        payload: {
            items: items
        }
    };
}
