import { IActivity } from '../../model/IActivity';

// US only for now
export interface IActivityService {
    getDocuments (customerId: string):
        Promise<IActivity[]>;
}