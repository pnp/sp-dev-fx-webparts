import { createStore, combineReducers, Reducer, Action, Store } from "redux";
import ListReducer from "./lists";
import listItemReducer from "./listItems";
import ColumnReducer from "./columns";
import WebReducer from "./web";
import { Log } from "@microsoft/sp-client-base";
import * as actionInit from "../actions/actionInit";
const { routerReducer } = require('react-router-redux');
export function RootReducer(state, action) {
    Log.verbose("RootReducer", "In RootReducer of RootReducer");
    let combinedReducers = combineReducers(
        {
            items: listItemReducer,
            lists: ListReducer,
            columns: ColumnReducer,
            webs: WebReducer,
            routing: routerReducer
        }
    )
    return combinedReducers(state, action);// Need to pass in inital state and action to combinereducers?
}
