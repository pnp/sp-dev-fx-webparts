import { createStore, combineReducers, Reducer, Action, Store } from "redux";
import ListReducer from "./lists";
import ListItemReducer from "./listItems";
import { Log } from "@microsoft/sp-client-base";

export function RootReducer(state, action) {
    Log.verbose("RootReducer", "In RootReducer of RootReducer");
    return combineReducers(
        { items: ListItemReducer }
    );

}
