//import { PrincipalType } from '../PropertyFieldPeoplePicker';
//import { IPropertyFieldGroupOrPerson } from './../propertyFields/peoplePicker/IPropertyFieldPeoplePicker';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

/**
 * Service interface definition
 */

export interface ISPPeopleSearchService {

    /**
     * Search People from a query
     */
    searchPeople(ctx: IWebPartContext, query: string, principleType: any[], siteUrl?: string): Promise<Array<any>>;
    resolvePeople(ctx: IWebPartContext, query: string, siteUrl?: string): Promise<any>;
}