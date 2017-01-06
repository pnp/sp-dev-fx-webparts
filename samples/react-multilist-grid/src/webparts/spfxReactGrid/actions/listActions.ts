
import {
    ADD_LIST,
    SAVE_LIST,
    ADD_LISTS,
    REMOVE_LIST,REMOVE_ALLLISTS

} from "../constants";
import "whatwg-fetch";
import ListDefinition from "../model/ListDefinition";
export function addList(list: ListDefinition) {
    return {
        type: ADD_LIST,
        payload: {
            list: list
        }
    };
}
export function removeList(list: ListDefinition) {
    return {
        type: REMOVE_LIST,
        payload: {
            list: list
        }
    };
}
export function removeAllLists() {
    return {
        type: REMOVE_ALLLISTS,
        payload: {

        }
    };
}
export function saveList(list: ListDefinition) {
    const action = {
        type: SAVE_LIST,
        payload: {
            list
        }
    };
    return action;
}
export function addLists(lists: ListDefinition[]) {
    return {
        type: ADD_LISTS,
        payload: {
            lists: lists
        }
    };
}

