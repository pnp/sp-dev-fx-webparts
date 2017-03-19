"use strict";
/*
  Retreive the route URL for a page in a group from the the AppState
*/
function getPageRouteFromState(appstate, groupName, pageName) {
    var route = '';
    appstate.examplePages.map(function (pageValue) {
        if (groupName === pageValue.name) {
            pageValue.links.map(function (linkValue) {
                if (linkValue.name === pageName) {
                    route = linkValue.url;
                }
            });
        }
    });
    return route;
}
exports.getPageRouteFromState = getPageRouteFromState;

//# sourceMappingURL=pageroute.js.map
