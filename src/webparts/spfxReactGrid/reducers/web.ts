import {
    GOT_WEBS
<<<<<<< HEAD
} from '../constants';
import * as _ from 'lodash';
import {Web} from '../model/web';
import { fromJS } from 'immutable';
const INITIAL_STATE = [];
function webReducer(state: Array<Web> = INITIAL_STATE, action: any = { type: '' }): Array<Web> {

=======
} from "../constants";
import * as _ from "lodash";
import Web from "../model/web";
import { fromJS } from "immutable";
const INITIAL_STATE: Array<Web> = [];
function webReducer(state: Array<Web> = INITIAL_STATE, action: any = { type: "" }): Array<Web> {
>>>>>>> bf4f4696a2a9c477981adacd43f3e01195672b7e
    switch (action.type) {
        case GOT_WEBS:
            return _.union(state, action.payload.webs);
        default:
            return state;
    }
}
export default webReducer;
