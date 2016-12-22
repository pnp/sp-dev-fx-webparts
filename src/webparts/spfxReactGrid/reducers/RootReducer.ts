import {  combineReducers } from "redux";
import ListReducer from "./ListReducer";
import listItemReducer from "./listItemReducer";
import ColumnReducer from "./ColumnReducer";
import SiteReducer from "./SiteReducer";
import { Log } from "@microsoft/sp-client-base";
const { routerReducer } = require("react-router-redux");
export function RootReducer(state, action) {
    Log.verbose("RootReducer", "In RootReducer of RootReducer");
    const combinedReducers = combineReducers(
        {
            items: listItemReducer,
            lists: ListReducer,
            columns: ColumnReducer,
            sites: SiteReducer,
            routing: routerReducer
        }
    );
    return combinedReducers(state, action);// Need to pass in inital state and action to combinereducers?
}

