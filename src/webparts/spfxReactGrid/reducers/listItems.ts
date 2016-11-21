import ListItem from "../Model/ListItem";
import * as _ from "lodash";
import { Action } from "../actions/Action";
import { Log } from "@microsoft/sp-client-base";
const INITIAL_STATE = new Array<ListItem>();
function listItemReducer(state = INITIAL_STATE, action: Action<any>) {
    Log.verbose("listItemReducer", "In listItemReducer of listItemReducer ActionType is " + action.type);
    switch (action.type) {
        case "@@redux/INIT":
            let item: ListItem = new ListItem();
            item.title = "russell";
            let newone: ListItem[] = new Array<ListItem>();
            newone.push(item);
            let result = _.union(state, newone);
            Log.verbose("listItemReducer", " listItemReducer returning " + result);

            return result;
        // return INITIAL_STATE;
        default:

            Log.verbose("listItemReducer", " listItemReducer returning default  " + INITIAL_STATE);
            return INITIAL_STATE;
    }
}
export default listItemReducer;
