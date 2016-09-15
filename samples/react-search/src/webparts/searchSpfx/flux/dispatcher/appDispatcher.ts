import * as flux from 'flux';
import {ISearchAction} from '../actions/ISearchAction';

const appDispatcher: flux.Dispatcher<ISearchAction> = new flux.Dispatcher();
export default appDispatcher;