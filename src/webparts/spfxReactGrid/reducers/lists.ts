import List from "../Model/List";
import { Action } from "../actions/Action";
const INITIAL_STATE = new Array<List>();
function ListReducer(state = INITIAL_STATE, action: Action<any>) {
    debugger;
    switch (action.type) {
        case "@@redux/INIT":
            return INITIAL_STATE;
        default:
            return state;
    }
}
export default ListReducer;

