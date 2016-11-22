import { createStore, Store } from "redux";
import listItemReducer from "../reducers/listItems";
import { RootReducer } from "../reducers/rootReducer";
import ListItem from "../model/ListItem"
import { Log } from "@microsoft/sp-client-base";


export default function ConfigureStore() {
    Log.verbose("ConfigureStore", "In ConfigureStore of ConfigureStore");

    let store = createStore(RootReducer);
       return store;
}
