import { createStore, Store } from "redux";
import  listItemReducer  from "../reducers/listItems";
import  {RootReducer } from "../reducers/rootReducer";
import ListItem from "../model/ListItem"
import { Log } from "@microsoft/sp-client-base";

// function todos(state = [], action) {
//   switch (action.type) {
//     case 'ADD_TODO':
//       return state.concat([ action.text ])
//     default:
//       return state
//   }
// }
export default function ConfigureStore() {
   Log.verbose("ConfigureStore", "In ConfigureStore of ConfigureStore");
debugger;

    let store = createStore(listItemReducer);
    let xxx=store.getState();

       let store2 = createStore(RootReducer);
    let xxx2=store2.getState();
    return store;
}
