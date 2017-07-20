
import SystemStatus from "../Model/SystemStatus";
const defaultStatus: SystemStatus = {
    currentAction: "",
    fetchStatus: ""
};
import * as _ from "lodash";
import { Log } from "@microsoft/sp-core-library";
export default function SystemStatusReducer(state: SystemStatus = defaultStatus, action: any = { type: "" }) {
    /**
     *
     *
     * DO NOT UNCOMMENTS
     *     CAUSING INFINITE LOOP
     *
     *
     *
     *
     */
    const newstate = _.clone(state);
    if (action.type.startsWith("App/")) {

        newstate.currentAction = action.type;
    }
    if (action.type.endsWith("_ERROR")) {
        Log.info("SystemStatusReducer", "canged sfetch Status to action.payload.error.message");
        newstate.fetchStatus = action.payload.error.message;
    }
    return newstate;
    //return state;
}

