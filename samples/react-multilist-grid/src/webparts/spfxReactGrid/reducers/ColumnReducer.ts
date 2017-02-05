import ColumnDefinition from "../Model/ColumnDefinition";
import * as _ from "lodash";
import {
    ADD_COLUMN,
    ADD_COLUMNS,
    REMOVE_COLUMN,
    SAVE_COLUMN, REMOVE_ALLCOLUMNS,
    MOVE_COLUMN_UP,
    MOVE_COLUMN_DOWN
} from "../constants";

export function moveColumnUp(state: Array<ColumnDefinition>, action) {
    let newstate = _.clone(state);

    const index = _.findIndex<ColumnDefinition>(newstate, c => c.guid === action.payload.column.guid);
    newstate[index] = newstate.splice(index - 1, 1, newstate[index])[0];
    return newstate;
}
export function moveColumnDown(state: Array<ColumnDefinition>, action) {
    let newstate = _.clone(state);

    let index = _.findIndex<ColumnDefinition>(newstate, c => c.guid === action.payload.column.guid);
    newstate[index] = newstate.splice(index+1, 1, newstate[index])[0];
    return newstate;
}
const INITIAL_STATE = new Array<ColumnDefinition>();
function listItemReducer(state = INITIAL_STATE, action: any = { type: "" }) {

    switch (action.type) {
        case MOVE_COLUMN_UP:
            return moveColumnUp(state, action);
        case MOVE_COLUMN_DOWN:
            return moveColumnDown(state, action);
        case ADD_COLUMN:
            let newarray = _.clone(state);
            newarray.push(action.payload.column);
            return newarray;
        case SAVE_COLUMN:

            let newarray2 = _.clone(state);
            let item = _.find(newarray2,item => item.guid === action.payload.column.guid);
            item = action.payload.column;
            return newarray2;
        case REMOVE_COLUMN:
            let newArr = _.filter(state, (o) => { return o.guid !== action.payload.column.guid; });
            return newArr;
        case REMOVE_ALLCOLUMNS:

            return [];
        case ADD_COLUMNS:
            return _.union(state, action.payload.columns);
        default:

            return state;
    }
}
export default listItemReducer;
