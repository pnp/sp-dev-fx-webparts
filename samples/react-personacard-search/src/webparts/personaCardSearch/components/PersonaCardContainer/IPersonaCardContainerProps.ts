import { IPerson,ISearchService } from '../../index';

export interface IPersonaCardContainerProps{
    searchService: ISearchService;   
    maxResultsCount: number; 
    getPropertiesForUsers: (userLoginNames: string[]) => Promise<IPerson[]>;
}