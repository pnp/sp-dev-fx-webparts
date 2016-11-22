
import {
    ADD_LIST,
    ADD_LISTS,
    REMOVE_LIST,
    ADD_LISTITEM,
    ADD_LISTITEMS,
    REMOVE_LISTITEM,
    GET_LISTITEMS,
    GOT_LISTITEMS,
    GET_LISTITEMSERROR

} from '../constants';
import 'whatwg-fetch';
import {Promise} from "es6-promise";
import List from '../model/List';
import ListItem from '../model/ListItem';

export function addList(list: List) {
    debugger;
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
export function addLists(lists: List[]) {
    return {
        type: ADD_LISTS,
        payload: {
            lists: lists
        }
    };
}
export function addListItem(listItem: ListItem) {
    debugger;
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

    let headers = new Headers();
    //    { 'Accept': 'application/json;odata=verbose' ,
    //     'Cache-Control': 'no-cache' }
    //    );    let headers = new Headers(
headers.append('Accept', 'application/json;odata=verbose')
    let options = {
        headers: headers,
        credentials: 'same-origin'
    };
    let payload: Promise<any> = fetch('http://services.odata.org/TripPinRESTierService/People', {method: 'GET', headers: headers,mode: 'no-cors'})
        .then((response) => {
            debugger;
            let data = response.json();
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
