import ListItem from "../Model/ListItem";
import * as _ from "lodash";
import * as ActionAddListItem from "../actions/actionAddlistitem";
import { Action } from "../actions/Action";
import { Log } from "@microsoft/sp-client-base";
const INITIAL_STATE = new Array<ListItem>();
function listItemReducer(state = INITIAL_STATE, action: Action<any>) {
    Log.verbose("listItemReducer", "In listItemReducer of listItemReducer ActionType is " + action.type);
    let result: ListItem[];
    switch (action.type) {
        case ActionAddListItem.ACTION_ADDLISTITEM:

            result = _.clone(state);
            result.push(action.payload.listItem);
            Log.verbose("listItemReducer", " listItemReducer returning " + result);

            return result;
        // return INITIAL_STATE;
        case "@@redux/INIT":
            let item: ListItem = new ListItem();
            item.title = "russell";
            item.id = 0;
            let temp: ListItem[] = new Array<ListItem>();
            temp.push(item);
            item = new ListItem();
            item.title = "russell2";
            item.id = 99;
            temp.push(item);
            result = _.union(state, temp);
            Log.verbose("listItemReducer", " listItemReducer returning " + result);

            return result;
        // return INITIAL_STATE;
        default:

            Log.verbose("listItemReducer", " listItemReducer returning default  " + state);
            return state;
    }
}
export default listItemReducer;
