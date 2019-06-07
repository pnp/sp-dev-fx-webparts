import { IVisit } from '../../model/IVisit';

export interface IVisitService {
    getGroupVisits (groupId?: string, groupEmail?: string) : Promise<IVisit[]>;
}