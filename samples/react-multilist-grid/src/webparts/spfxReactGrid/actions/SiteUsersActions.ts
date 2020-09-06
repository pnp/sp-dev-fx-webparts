import {
    GET_SITE_USERS,
    GET_SITE_USERS_ERROR,
    GET_SITE_USERS_SUCCESS
} from "../constants";
import "whatwg-fetch";
import { Site } from "sp-pnp-js";
import * as _ from "underscore";
import { SiteUser, SiteUsers, SiteUsersStatus } from "../model/SiteUsers";
export function getSiteUsersAction(dispatch: any, siteUrl: string): any {
    let siteUsers = new SiteUsers(siteUrl);
    // first add the empty header record to the store, then issue a request to get the details
    const site = new Site(siteUrl);
    const promise = site.rootWeb.siteUsers.get()
        .then((response) => {
            const data: SiteUser[] = _.map(response, (item: any) => {
                return new SiteUser(item.Id, item.Title, item.LoginName);
            });
            siteUsers.siteUser = data;
            siteUsers.status = SiteUsersStatus.fetched;
            const action = gotSiteUsers(siteUsers);
            dispatch(action);
        })
        .catch((error) => {
            console.log(error);
            siteUsers.status = SiteUsersStatus.error;
            dispatch(getSiteUsersErrorAction(error, siteUsers)); // need to ewname this one to be digfferent from the omported ome
        });
    const action = {
        type: GET_SITE_USERS,
        payload: {
            promise: promise,
            siteUsers: siteUsers
        }
    };
    return action;
}
function getSiteUsersErrorAction(error, siteUsers: SiteUsers) {

    return {
        type: GET_SITE_USERS_ERROR,
        payload: {
            error: error,
            siteUsers: siteUsers
        }
    };
}
function gotSiteUsers(siteUsers: SiteUsers) {

    return {
        type: GET_SITE_USERS_SUCCESS,
        payload: {
            siteUsers: siteUsers
        }
    };
}
