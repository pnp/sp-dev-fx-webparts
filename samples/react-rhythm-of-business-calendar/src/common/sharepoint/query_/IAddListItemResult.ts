import * as SPField from "../SPField";

export interface IAddListItemResult {
    readonly ID: string;
    readonly Title: SPField.Query_Text;
    readonly Created: SPField.Query_DateTime;
    readonly Modified: SPField.Query_DateTime;
    readonly ['odata.etag']: string;
}