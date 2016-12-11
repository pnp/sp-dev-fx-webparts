import {
    GOT_WEBS
} from "../constants";
import * as _ from "lodash";
import { Site } from "../model/Site";
const INITIAL_STATE: Array<Site> = [];
function siteReducer(state: Array<Site> = INITIAL_STATE, action: any = { type: "" }): Array<Site> {
    debugger;
    switch (action.type) {
        case GOT_WEBS:
            let site: Site = new Site(action.payload.siteUrl);
            site.webs = action.payload.webs;
            return _.union(state, new Array<Site>(site));
        default:
            return state;
    }
}
export default siteReducer;

