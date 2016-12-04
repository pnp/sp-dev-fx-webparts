import {
    ADD_LIST,
    REMOVE_LIST,
    ADD_LISTS,
    SAVE_LIST

} from "../constants";
import * as _ from "lodash";
import List from "../model/listRef";
import { fromJS } from "immutable";
const INITIAL_STATE = [];
function listReducer(state: Array<List> = INITIAL_STATE, action: any = { type: "" }): Array<List> {
    switch (action.type) {
        case ADD_LIST:
            let newarray = _.clone(state);
            newarray.push(action.payload.list);
            return newarray;
        case SAVE_LIST:
            let newarray2 = _.clone(state);
            let item = newarray2.find(item => item.guid === action.payload.list.guid)
            item = action.payload.list;
            return newarray2;
        case REMOVE_LIST:
            let newArr = _.filter(state, function (o) { return o.guid !== action.payload.list.guid; });
            return newArr;
        case ADD_LISTS:
            return _.union(state, action.payload.lists);
        default:
            return state;
    }
}
export default listReducer;
