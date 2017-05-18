import {
    GET_LOOKUPOPTIONS,
    GET_LOOKUPOPTIONS_SUCCESS,
    GET_LOOKUPOPTIONS_ERROR,
} from "../constants";
import "whatwg-fetch";
import * as _ from "underscore";
import { Web } from "sp-pnp-js";
import { LookupOptions, LookupOption, LookupOptionStatus } from "../model/LookupOptions";
export function getLookupOptionAction(dispatch: any, lookupSite: string, lookupWebId: string, lookupListId: string, lookupField: string): any {

    let lookupOptions = new LookupOptions(lookupSite, lookupWebId, lookupListId, lookupField);
    // first add the empty header record to the store, then issue a request to get the details

    const web = new Web(lookupWebId);
    let fields = ["Id"];
    fields.push(lookupField);

    const promise = web.lists.getById(lookupListId).items.select(fields.join(",")).get()
        .then((response) => {

            const data: LookupOption[] = _.map(response, (item: any) => {
                return new LookupOption(item.Id, item[lookupField]);
            });
            lookupOptions.lookupOption = data;
            lookupOptions.status=LookupOptionStatus.fetched;
            const gotLookupOptions = gotLookupOptionAction(lookupOptions);

            dispatch(gotLookupOptions); // need to ewname this one to be digfferent from the omported ome
        })
        .catch((error) => {
            console.log(error);

            lookupOptions.status = LookupOptionStatus.error;
            dispatch(getLookupOptionErrorAction(error, lookupOptions)); // need to ewname this one to be digfferent from the omported ome
        });
    const action = {
        type: GET_LOOKUPOPTIONS,
        payload: {
            promise: promise,
            lookupOptions: lookupOptions
        }
    };
    return action;
}
function getLookupOptionErrorAction(error, lookupOptions: LookupOptions) {

    return {
        type: GET_LOOKUPOPTIONS_ERROR,
        payload: {
            error: error,
            lookupOptions: LookupOption
        }
    };
}
function gotLookupOptionAction(lookupOptions: LookupOptions) {

    return {
        type: GET_LOOKUPOPTIONS_SUCCESS,
        payload: {
            lookupOptions: lookupOptions
        }
    };
}
