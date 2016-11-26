import ListItem from "../Model/ListItem";
import * as _ from "lodash";
import {
    ADD_LISTITEM,
    REMOVE_LISTITEM,
    ADD_LISTITEMS,
    GOT_LISTITEMS,
} from '../constants';
import { Log } from "@microsoft/sp-client-base";
const INITIAL_STATE = new Array<ListItem>();
function listItemReducer(state = INITIAL_STATE, action: any = { type: "" }) {
    Log.verbose("listItemReducer", "In listItemReducer of listItemReducer ActionType is " + action.type);
    let result: ListItem[];
    switch (action.type) {
        case ADD_LISTITEM:
            let newarray = _.clone(state);
            newarray.push(action.payload.listItem);
           return newarray;
        case REMOVE_LISTITEM:
            let newArr = _.filter(state, function (o) { return o.guid !== action.payload.listItem.guid; });
            return newArr;
        case ADD_LISTITEMS:
        case GOT_LISTITEMS:
            return _.union(state, action.payload.items);
        default:
            Log.verbose("listItemReducer", " listItemReducer returning default  " + state);
            return state;
    }
}
export default listItemReducer;
