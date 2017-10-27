export interface ISearchResults {
    RelevantResults: ISearchResult[];
    RefinementResults: IRefinementResult[];
    TotalRows?: number;
}

export interface ISearchResult {
    [key: string]: string;
    IconSrc?: string;
}

export interface IRefinementResult {
    FilterName: string;
    Values: IRefinementValue[];
}

export interface IRefinementValue {
    RefinementCount: number;
    RefinementName: string;
    RefinementToken: string;
    RefinementValue: string;
} 

export interface IRefinementFilter {
    FilterName: string;
    Value: IRefinementValue;
}