export interface IValidGroupNameResponse {
    AliasErrorDetails: IErrorDetails;
    DisplayNameErrorDetails: IErrorDetails;
    ErrorCode: string; //eg: "Request_UnprocessableEntity";
    ErrorMessage: string; //eg: "The values provided contain one or more validation errors.",
    IsValidName: boolean;
}

interface IErrorDetails {
    BlockedWord: string | undefined;
    Prefix: string | undefined;
    Suffix: string | undefined;
    ValidationErrorCode: string; //eg: "PropertyConflict",
    ValidationErrorMessage: string; //eg: "Another object with the same value for property mailNickname already exists.",
    ValidationPropertyName: string; //eg: "alias"
}

export interface IGroupNameAvailability {
    aliasAvailable: boolean;
    aliasErrorMessage?: string;
    siteNameAvailable: boolean;
    siteNameErrorMessage?: string;
}

export interface ISiteListItem {
    URL: { Url: string, Description: string };
    GroupMailbox: string;
    Title: string;
}