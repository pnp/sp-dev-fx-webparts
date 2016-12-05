import ColumnRef from "../Model/Column";
import * as _ from "lodash";
import {
    ADD_COLUMN,
    REMOVE_COLUMN
} from "../constants";
import { Log } from "@microsoft/sp-client-base";
let INITIAL_STATE = new Array<ColumnRef>();
INITIAL_STATE.push(new ColumnRef("id", "id",false));
INITIAL_STATE.push(new ColumnRef("title", "title",true));
function listItemReducer(state = INITIAL_STATE, action: any = { type: "" }) {
    Log.verbose("listItemReducer", "In listItemReducer of listItemReducer ActionType is " + action.type);
    let result: ColumnRef[];
    switch (action.type) {
        case ADD_COLUMN:
            let newarray = _.clone(state);
            newarray.push(action.payload.column);
            return newarray;
        case REMOVE_COLUMN:
            let newArr = _.filter(state, function (o) { return o.guid !== action.payload.column.guid; });
            return newArr;
        default:
            Log.verbose("listItemReducer", " listItemReducer returning default  " + state);
            return state;
    }
}
export default listItemReducer;
