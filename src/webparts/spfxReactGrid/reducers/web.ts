import {
    GOT_WEBS
} from "../constants";
import * as _ from "lodash";
import{ Web} from "../model/web";
import { fromJS } from "immutable";
const INITIAL_STATE: Array<Web> = [];
function webReducer(state: Array<Web> = INITIAL_STATE, action: any = { type: "" }): Array<Web> {
    switch (action.type) {
        case GOT_WEBS:
            return _.union(state, action.payload.webs);
        default:
            return state;
    }
}
export default webReducer;

