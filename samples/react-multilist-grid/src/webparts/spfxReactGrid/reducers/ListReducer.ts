import {
    ADD_LIST,
    REMOVE_LIST,
    REMOVE_ALLLISTS,
    ADD_LISTS,
    SAVE_LIST,
    REMOVE_COLUMN // remove the dolumn from all lists


} from "../constants";
import * as _ from "lodash";
import ListDefinition from "../model/ListDefinition";
const INITIAL_STATE = [];
function listReducer(state: Array<ListDefinition> = INITIAL_STATE, action: any = { type: "" }): Array<ListDefinition> {
    switch (action.type) {
        case ADD_LIST:
            //https://spin.atomicobject.com/2016/09/27/typed-redux-reducers-typescript-2-0/
            let newarray = _.clone(state);
            newarray.push(action.payload.list);
            return newarray;
        case SAVE_LIST:
            let newarray2 = _.clone(state);
            let item =_.find( newarray2,item => item.guid === action.payload.list.guid);
            item = action.payload.list;
            return newarray2;
        case REMOVE_LIST:
            let newArr = _.filter(state, (o) => { return o.guid !== action.payload.list.guid; });
            return newArr;
        case REMOVE_ALLLISTS:
            return [];

        case ADD_LISTS:
            return _.union(state, action.payload.lists);
        case REMOVE_COLUMN:

            let listrefs = _.clone(state);
            for (const listref of listrefs) {
                for (let i = listref.columnReferences.length - 1; i >= 0; i--) {
                    if (listref.columnReferences[i].columnDefinitionId === action.payload.column.guid) {
                        listref.columnReferences.splice(i, 1);
                    }
                }
            }
            return listrefs;
        default:
            return state;
    }
}
export default listReducer;
