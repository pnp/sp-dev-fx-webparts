export interface ISortFieldConfiguration {
    sortField: string;
    sortDirection: ISortFieldDirection;
}

export enum ISortFieldDirection {
    Ascending = 1,
    Descending= 2    
}