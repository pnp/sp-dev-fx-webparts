export interface ISearchResultType {
    condition: ISearchResulTypeCondition;
    templateContent: string;
}

export enum ResultTypeOperator {
    Equal,
    LessThan,
    GreaterThan,
    LessOrEqual,
    GreaterOrEqual
}

export interface ISearchResulTypeCondition {
    property: string;
    operator: ResultTypeOperator;
    value: string;
}

export enum ResultTypeEditOption {
    External,
    Inline
}