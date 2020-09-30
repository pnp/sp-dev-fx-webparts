import {IFaqProp} from './IFaqProp';
export interface IFaqServices {
    getFaq:(listName) => Promise<IFaqProp[]>;
}
