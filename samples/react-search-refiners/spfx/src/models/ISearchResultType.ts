export interface ISearchResultType {
    property: string;
    operator: ResultTypeOperator;
    value: string;
    inlineTemplateContent: string;
    externalTemplateUrl: string;
}

export enum ResultTypeOperator {
    Equal = 'eq',
    LessThan = 'lt',
    GreaterThan = 'gt',
    LessOrEqual = 'lte',
    GreaterOrEqual = 'gte',
    Contains = 'contains',
    StartsWith = 'startsWith',
    NotNull = 'if',
}