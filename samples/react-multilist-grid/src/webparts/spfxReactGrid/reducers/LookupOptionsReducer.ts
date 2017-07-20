import {  LookupOptions } from "../Model/LookupOptions";
import { Log } from "@microsoft/sp-core-library";
import * as _ from "lodash";
import {
    GET_LOOKUPOPTIONS,
    GET_LOOKUPOPTIONS_SUCCESS,
    GET_LOOKUPOPTIONS_ERROR
} from "../constants";

function getLookupOptions(state: Array<LookupOptions>, action) {

    let newstate = _.clone(state);
    newstate.push(action.payload.lookupOptions);
    Log.info("getLookupOptions", "Added Header Record");
    return newstate;
}
function updateLookupOption(state: Array<LookupOptions>, action: { payload: { lookupOptions: LookupOptions } }) {

    let newstate = _.clone(state);
    let index = _.findIndex<LookupOptions>(newstate, x =>
        (x.lookupField === action.payload.lookupOptions.lookupField) &&
        (x.lookupListId === action.payload.lookupOptions.lookupListId) &&
        (x.lookupSite === action.payload.lookupOptions.lookupSite) &&
        (x.lookupWebId === action.payload.lookupOptions.lookupWebId));
    if (index !== -1) {
        newstate[index] = action.payload.lookupOptions;
    }
    else {
        newstate.push(action.payload.lookupOptions);
    }
    Log.info("getLookupOptions", "Updated Header Record");
    return newstate;
}
const INITIAL_STATE = [];

function lookupOptionReducer(state = INITIAL_STATE, action: any = { type: "" }) {

    switch (action.type) {
        case GET_LOOKUPOPTIONS:
            Log.verbose("getLookupOptions", "In getLookupOptions GET_LOOKUPOPTIONS listItemReducer ActionType is " + action.type);
            return getLookupOptions(state, action);
        case GET_LOOKUPOPTIONS_SUCCESS:
            Log.verbose("getLookupOptions", "In getLookupOptions GET_LOOKUPOPTIONS_SUCCESSof listItemReducer ActionType is " + action.type);
            return updateLookupOption(state, action);
        case GET_LOOKUPOPTIONS_ERROR:
            /** The ActionCreator has set the state to error , so i just update the item */
            Log.verbose("getLookupOptions", "In getLookupOptions GET_LOOKUPOPTIONS_ERRORof listItemReducer ActionType is " + action.type);
            return updateLookupOption(state, action);

        default:
            return state;
    }
}
export default lookupOptionReducer;
