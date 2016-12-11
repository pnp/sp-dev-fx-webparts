// for eac of the columns to be displayed, which field in this list should we use
import { Guid } from '@microsoft/sp-client-base';
export class ColumnReference {
    public constructor(
        public columnId: string, // the id of the column in the list of columns
        public fieldName: string, // the field in this list to display in that column
        public type: string, // the type of field (text, datatime , note)
    ) { }

}
export default class ListDefinition {
    public columnReferences: Array<ColumnReference>;
    public guid: string;// the id of the list we are pointing to id#;name
    public constructor(
        public id: string,// the id of the list we are pointing to id#;name
        public webLookup: string,
        public listLookup: string,
        public siteUrl: string,
        public url: string) {
        this.columnReferences = new Array<ColumnReference>();
        this.guid = Guid.newGuid().toString();

    }


}
