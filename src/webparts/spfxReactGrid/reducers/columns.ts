import ColumnRef from "../Model/Column";
import * as _ from "lodash";
import {
    ADD_COLUMN,
    ADD_COLUMNS,
    REMOVE_COLUMN,
    SAVE_COLUMN
} from "../constants";
import { Log } from "@microsoft/sp-client-base";
const INITIAL_STATE = new Array<ColumnRef>();
function listItemReducer(state = INITIAL_STATE, action: any = { type: "" }) {
    Log.verbose("listItemReducer", "In listItemReducer of listItemReducer ActionType is " + action.type);
      switch (action.type) {
        case ADD_COLUMN:
            let newarray = _.clone(state);
            newarray.push(action.payload.column);
            return newarray;
        case SAVE_COLUMN:

            let newarray2 = _.clone(state);
            let item = newarray2.find(item => item.guid === action.payload.column.guid);
            item = action.payload.column;
            return newarray2;
        case REMOVE_COLUMN:
            let newArr = _.filter(state,  (o)=> { return o.guid !== action.payload.column.guid; });
            return newArr;
        case ADD_COLUMNS:
            return _.union(state, action.payload.columns);
        default:
            Log.verbose("listItemReducer", " listItemReducer returning default  " + state);
            return state;
    }
}
export default listItemReducer;
