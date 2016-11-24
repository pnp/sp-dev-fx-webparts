import Column from "../Model/Column";
import * as _ from "lodash";
import {
    ADD_COLUMN,
    REMOVE_COLUMN


} from "../constants";
import { Log } from "@microsoft/sp-client-base";
const columns = [{
    key: "id",
    name: "id",
    width: 80
},
{
    key: "title",
    name: "title",
    editable: true
}]
    ;
let INITIAL_STATE = new Array<Column>();
INITIAL_STATE.push(new Column("id", "id", "string",false));
INITIAL_STATE.push(new Column("title", "title", "string",true));
function listItemReducer(state = INITIAL_STATE, action: any = { type: "" }) {
    debugger;
    Log.verbose("listItemReducer", "In listItemReducer of listItemReducer ActionType is " + action.type);
    let result: Column[];
    switch (action.type) {
        case ADD_COLUMN:

            let newarray = _.clone(state);
            newarray.push(action.payload.column);
            return newarray;

        // return INITIAL_STATE;
        case REMOVE_COLUMN:
            let newArr = _.filter(state, function (o) { return o.key !== action.payload.column.key; });
            return newArr;


        default:

            Log.verbose("listItemReducer", " listItemReducer returning default  " + state);
            return state;
    }
}
export default listItemReducer;
