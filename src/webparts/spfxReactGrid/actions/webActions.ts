import {
    GOT_WEBS,
    GET_WEBS,
    GET_WEBSERROR

} from "../constants";
import "whatwg-fetch";
import pnp from "sp-pnp-js";
import Web from "../model/Web";
export function getWebsAction(dispatch: any): any {
    debugger;
    let payload = pnp.sp.site.rootWeb.webs.get()
        .then((response) => {
            debugger;
            let data = _.map(response, function (item: any) {
                return new Web(item.Id, item.Title, item.Url);
            });
            console.log(data);
            let gotWebs = gotWebsAction(data);
            dispatch(gotWebs); // need to ewname this one to be digfferent from the omported ome
        })
        .catch((error) => {
            debugger;
            console.log(error);
            dispatch(getWebsErrorAction(error)); // need to ewname this one to be digfferent from the omported ome
        });
    let action = {
        type: GET_WEBS,
        payload: {
            promise: payload
        }
    };
    return action;

}
export function gotWebsAction(items) {
    return {
        type: GOT_WEBS,
        payload: {
            webs: items
        }
    };
}
export function getWebsErrorAction(error) {
    return {
        type: GET_WEBSERROR,
        payload: {
            error: error
        }
    };
}

