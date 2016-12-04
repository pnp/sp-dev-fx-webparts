// for eac of the columns to be displayed, which field in this list should we use
import { Guid } from '@microsoft/sp-client-base';
export class ColumnMapping {
    public constructor(
        public columnId: string, // the id of the column in the list of columns
        public fieldName: string, // the field in this list to display in that column
        public type: string, // the type of field (text, datatime , note)
    ) { }

}
export default class ListRef {
    public columnMapping: ColumnMapping[];
    public guid: string;// the id of the list we are pointing to id#;name
    public constructor(
        public id: string,// the id of the list we are pointing to id#;name
        public web: string,
        public title: string,
        public url: string) {
        this.columnMapping = new Array<ColumnMapping>();
        this.guid = Guid.newGuid().toString();

    }


}
