import * as SPField from "../SPField";

export interface IListItemResult {
    readonly ID: string;
    readonly Title: SPField.Query_Text;
    readonly Created: SPField.Query_DateTime;
    readonly Modified: SPField.Query_DateTime;
    readonly Author: SPField.Query_User;
    readonly Editor: SPField.Query_User;
    readonly UniqueId: string;
    readonly owshiddenversion: string;
}