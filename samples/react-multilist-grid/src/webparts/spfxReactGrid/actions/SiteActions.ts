import {
    GOT_WEBS,
    GET_WEBS,
    GET_WEBSERROR,
    GET_LISTSFORWEB_SUCCESS,
    GET_LISTSFORWEB_ERROR,
    GET_FIELDSFORLIST_SUCCESS,
    GET_FIELDSFORLIST_ERROR
} from "../constants";
import "whatwg-fetch";
import * as utils from "../utils/utils";
import * as _ from "underscore";
import { Web as SPWeb } from "sp-pnp-js";
import { Site as SPSite } from "sp-pnp-js";
import { Web, WebList, WebListField } from "../model/Site";
/**
 * Action to get all the webs within a site.
 * This cant currently be done with rest, so this returns all the subsites of the rootweb instead.
 */
export function getWebsAction(dispatch: any, siteUrl: string): any {
    const site: SPSite = new SPSite(siteUrl);
    const payload = site.rootWeb.webs.orderBy("Title").get()
        .then((response) => {
            const data = _.map(response, (item: any) => {
                const web: Web = new Web(item.Id, item.Title, item.Url);
                return web;
            });
            console.log(data);
            const gotWebs = gotWebsAction(siteUrl, data);
            dispatch(gotWebs); // need to ewname this one to be digfferent from the omported ome
        })
        .catch((error) => {
            console.log(error);
            dispatch(getWebsErrorAction(error)); // need to ewname this one to be digfferent from the omported ome
        });
    const action = {
        type: GET_WEBS,
        payload: {
            promise: payload
        }
    };
    return action;
}
export function gotWebsAction(siteUrl, items) {
    return {
        type: GOT_WEBS,
        payload: {
            siteUrl: siteUrl,
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

export function getListsForWebAction(dispatch: any, webUrl: string): any {
    const web = new SPWeb(webUrl);

    const payload = web.lists.orderBy("Title").get()
        .then((response) => {

            const data = _.map(response, (item: any) => {
                return new WebList(item.Id, item.Title, item.Url, );
            });

            const gotListsForWeb = gotListsForWebAction(webUrl, data);
            dispatch(gotListsForWeb); // need to ewname this one to be digfferent from the omported ome
        })
        .catch((error) => {
            console.log(error);
            dispatch(getListsForWebActionError(error)); // need to ewname this one to be digfferent from the omported ome
        });
    const action = {
        type: GET_WEBS,
        payload: {
            promise: payload
        }
    };
    return action;
}
export function gotListsForWebAction(webUrl, lists) {
    return {
        type: GET_LISTSFORWEB_SUCCESS,
        payload: {
            webUrl: webUrl,
            lists: lists
        }
    };
}
export function getListsForWebActionError(error) {
    return {
        type: GET_LISTSFORWEB_ERROR,
        payload: {
            error: error
        }
    };
}
export function getFieldsForListAction(dispatch: any, webUrl: string, listId: string): any {
    const web = new SPWeb(webUrl);
    const payload = web.lists.getById(listId).fields.filter("Hidden eq false").orderBy("Title").get()
        .then((response) => {
            const data = _.map(response, (item: any) => {
                return new WebListField(item.id, new utils.ParsedSPField(item.InternalName, item.Title).toString(), item);
            });
            console.log(data);
            const gotWebs = gotFieldsForListAction(webUrl, listId, data);
            dispatch(gotWebs); // need to ewname this one to be digfferent from the omported ome
        })
        .catch((error) => {
            console.log(error);
            dispatch(getFieldsForListActionError(error, webUrl, listId)); // need to ewname this one to be digfferent from the omported ome
        });
    const action = {
        type: GET_WEBS,
        payload: {
            promise: payload
        }
    };
    return action;
}
export function gotFieldsForListAction(webUrl, listId, fields) {
    return {
        type: GET_FIELDSFORLIST_SUCCESS,
        payload: {
            webUrl: webUrl,
            listId: listId,
            fields: fields
        }
    };
}
export function getFieldsForListActionError(error, webUrl, listId) {
    return {
        type: GET_FIELDSFORLIST_ERROR,
        payload: {
            webUrl: webUrl,
            listId: listId,
        }
    };
}

