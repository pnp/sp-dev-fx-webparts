import { combineReducers } from "redux";
import ListReducer from "./lists";
import listItemReducer from "./listItems";
import ColumnReducer from "./columns";
import WebReducer from "./web";
import { Log } from "@microsoft/sp-client-base";
<<<<<<< HEAD

const { routerReducer } = require('react-router-redux');
=======
import * as actionInit from "../actions/actionInit";
const { routerReducer } = require("react-router-redux");
>>>>>>> bf4f4696a2a9c477981adacd43f3e01195672b7e
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
    );
    return combinedReducers(state, action);// Need to pass in inital state and action to combinereducers?
}
