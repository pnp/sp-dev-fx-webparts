import ListItem from "../Model/ListItem";
import * as _ from "lodash";
import {
    ADD_LISTITEM,
    REMOVE_LISTITEM_SUCCESS,
    GOT_LISTITEMS,
    SAVE_LISTITEM,
    UNDO_LISTITEMCHANGES,
    UPDATE_LISTITEM_SUCCESS,
    ADDED_NEW_ITEM_TO_SHAREPOINT,
    CLEAR_LISTITEMS
} from "../constants";
const INITIAL_STATE = [];
/**
 * deletes the originalvalues of a listitem, after itt has been saved to sharepoint,. This in effec disables the undo button,
 */
function updateListItemSuccess(state: Array<ListItem>, action: { payload: { listItem: ListItem } }) {
    let newState = _.cloneDeep(state);
    let index = _.findIndex(newState, { GUID: action.payload.listItem.GUID });
    // if (newState[index].__metadata__OriginalValues) {
    //     delete newState[index].__metadata__OriginalValues;
    // }
    newState[index] = action.payload.listItem;
    return newState;
}
/**
 * reverts a listimes values to thos originally retrived from sharepoint
 */
function undoListItemChanges(state: Array<ListItem>, action: { payload: { listItem: ListItem } }) {
    let newarray3 = _.cloneDeep(state);
    let index = _.findIndex(newarray3, { GUID: action.payload.listItem.GUID });
    if (newarray3[index].__metadata__OriginalValues) {
        newarray3[index] = newarray3[index].__metadata__OriginalValues;
    }
    return newarray3;
}
/**
 * Adds a new listitem to the store
 */
function addListItem(state: Array<ListItem>, action: { payload: { listItem: ListItem } }) {
    let newarray = _.cloneDeep(state);
    newarray.unshift(action.payload.listItem);
    return newarray;
}
/**
 * removes a listitem from the store
 */
function removeListItem(state: Array<ListItem>, action: { payload: { listItem: ListItem } }) {
    // REMOVES ITEM FROM STORE. Called after item is deleted from sharepoint
    let newArr = _.filter(state, (o) => { return o.GUID !== action.payload.listItem.GUID; });
    return newArr;

}
/**
 * After adding a new item to the store, updatiing it, then sending to SP ,
 *  we need to replace the local copy with the values we fot back from sharepoint
 */
function relpaceItemInStore(state: Array<ListItem>, action: { payload: { listItem: ListItem, localCopy: ListItem } }) {
    let newState = _.cloneDeep(state);
    const idx = _.findIndex(newState, { GUID: action.payload.localCopy.GUID });
    newState[idx] = action.payload.listItem;
    return newState;
}
/**
 * updates a Listitem in the store
 */
function saveListItem(state: Array<ListItem>, action: { payload: { listItem: ListItem } }) {
    let newarray2 = _.cloneDeep(state);
    let item = newarray2.find(i => i.GUID === action.payload.listItem.GUID);
    item = action.payload.listItem;

    if (!item.__metadata__OriginalValues) {
        item.__metadata__OriginalValues = state.find(i => i.GUID === action.payload.listItem.GUID);
    }
    return newarray2;
}

function listItemReducer(state = INITIAL_STATE, action: any = { type: "" }) {
    switch (action.type) {
        case ADD_LISTITEM:
            return addListItem(state, action);
        case REMOVE_LISTITEM_SUCCESS:
            return removeListItem(state, action);
        case SAVE_LISTITEM:
            return saveListItem(state, action);
        case UPDATE_LISTITEM_SUCCESS:
            return updateListItemSuccess(state, action);
        case ADDED_NEW_ITEM_TO_SHAREPOINT:
            return relpaceItemInStore(state, action);
        case UNDO_LISTITEMCHANGES:
            return undoListItemChanges(state, action);
        case GOT_LISTITEMS:
            return _.union(state, action.payload.items);
        case CLEAR_LISTITEMS:
            return [];
        default:
            return state;
    }
}
export default listItemReducer;
