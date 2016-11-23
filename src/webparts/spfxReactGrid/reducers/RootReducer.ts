import { createStore, combineReducers, Reducer, Action, Store } from "redux";
import ListReducer from "./lists";
import listItemReducer from "./listItems";
import { Log } from "@microsoft/sp-client-base";
import * as actionInit from "../actions/actionInit";
const { routerReducer } = require('react-router-redux');
//export interface state
export function RootReducer(state, action) {
    Log.verbose("RootReducer", "In RootReducer of RootReducer");

    let combinedReducers = combineReducers(
        {
            items: listItemReducer,
            lists: ListReducer,
             routing: routerReducer
        }
    )
    return combinedReducers(state, action);// Need to pass in inital state and action to combinereducers?

}
