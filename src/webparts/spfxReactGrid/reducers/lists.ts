import {
    ADD_LIST,
    REMOVE_LIST,
    ADD_LISTS

} from '../constants';
import * as _ from 'lodash';
import List from '../model/list';
import { fromJS } from 'immutable';

const INITIAL_STATE  = [new List('20u309-2324-234234-23423441', 'test list', 'http://adadsasd')];
// const INITIAL_STATE = fromJS({
//  lists: [],
// });

function listReducer(state: Array<List> = INITIAL_STATE, action: any = { type: '' }): Array<List> {
    switch (action.type) {

        case ADD_LIST:
            let newarray = _.clone(state);
            newarray.push(action.payload.list);
            return newarray;

        case REMOVE_LIST:
            let newArr = _.filter(state, function (o) { return o.id !== action.payload.list.id; });
            return newArr;

        case ADD_LISTS:
            return _.union(state, action.payload.lists);

        default:
            return state;
    }
}


export default listReducer;
