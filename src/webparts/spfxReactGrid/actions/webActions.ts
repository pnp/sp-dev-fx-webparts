import {
    GOT_WEBS,
    GET_WEBS,
    GET_WEBSERROR
} from "../constants";
import "whatwg-fetch";
import pnp from "sp-pnp-js";
import { Web, WebList, WebListField } from "../model/Web";
export function getWebsAction(dispatch: any): any {
    let payload = pnp.sp.site.rootWeb.webs.expand('lists,lists/fields').get()
        .then((response) => {
            debugger;
            let data = _.map(response, function (item: any) {
                let web: Web = new Web(item.Id, item.Title, item.Url);
                for (let list of item.Lists) {
                    let webList: WebList = new WebList(list.Id, list.Title, list.Url);
                    for (let field of list.Fields) {
                        webList.fields.push(new WebListField(field.Id, field.Title, field.InternalName, field.TypeDisplayName));
                    }
                    web.lists.push(webList);
                }
                return web;
            });
            console.log(data);
            let gotWebs = gotWebsAction(data);
            dispatch(gotWebs); // need to ewname this one to be digfferent from the omported ome
        })
        .catch((error) => {
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

