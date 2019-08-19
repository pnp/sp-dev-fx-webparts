import { combineReducers } from "redux";
import ListReducer from "./ListReducer";
import listItemReducer from "./listItemReducer";
import ColumnReducer from "./ColumnReducer";
import PageContextReducer from "./PageContextReducer";
import LookupOptionsReducer from "./LookupOptionsReducer";
import SiteReducer from "./SiteReducer";
import SiteUserReducer from "./SiteUsersReducer";
import SystemStatus from "./SystemStatus";
export function RootReducer(state, action) {
    const combinedReducers = combineReducers(
        {
            items: listItemReducer,
            lists: ListReducer,
            columns: ColumnReducer,
            sites: SiteReducer,
            pageContext: PageContextReducer,
            systemStatus:SystemStatus,
            lookupOptions:LookupOptionsReducer,
            siteUsers:SiteUserReducer
        }
    );
    return combinedReducers(state, action);
}

