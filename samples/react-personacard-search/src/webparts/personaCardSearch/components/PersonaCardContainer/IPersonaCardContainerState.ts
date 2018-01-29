import { 
    IPerson,
    ISearchResults
} from '../../index';

export interface IPersonaCardContainerState{
    results?: ISearchResults;   
    query?:string;
    currentPage?: number;
    errorMessage?: string;
    hasError?: boolean;
    areResultsLoading?: boolean;      
    maxResultsCount?:number; 
    users?:IPerson[]; 
}