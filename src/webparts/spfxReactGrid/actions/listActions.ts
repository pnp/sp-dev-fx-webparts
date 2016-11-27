
import {
    ADD_LIST,
    SAVE_LIST,
    ADD_LISTS,
    REMOVE_LIST,
    ADD_LISTITEM,
    ADD_LISTITEMS,
    REMOVE_LISTITEM,
    GET_LISTITEMS,
    GOT_LISTITEMS,
    GET_LISTITEMSERROR

} from "../constants";
import "whatwg-fetch";

import pnp from "sp-pnp-js";
import List from "../model/List";
import ListItem from "../model/ListItem";

export function addList(list: List) {

    return {
        type: ADD_LIST,
        payload: {
            list: list
        }
    };
}
export function removeList(list: List) {
    return {
        type: REMOVE_LIST,
        payload: {
            list: list
        }
    };
}
export function saveList(list: List) {
    return {
        type: SAVE_LIST,
        payload: {
            list: List
        }
    };
}
export function addLists(lists: List[]) {
    return {
        type: ADD_LISTS,
        payload: {
            lists: lists
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

export function getListItemsAction(dispatch: any): any {


    const payload = pnp.sp.web.lists.getByTitle('Tasks').items.get()
        .then((response) => {

            let data = _.map(response,function(item : any){
                return new ListItem(item.Id,item.Title,item.GUID);
            });
            console.log(data);
            let gotListItems = gotListItemsAction(data);
            dispatch(gotListItems); // need to ewname this one to be digfferent from the omported ome
        })
        .catch((error) => {

            console.log(error);
            dispatch(getListItemsErrorAction(error)); // need to ewname this one to be digfferent from the omported ome
        });
    let action = {
        type: GET_LISTITEMS,
        payload: {
            promise: payload
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
