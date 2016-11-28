// for eac of the columns to be displayed, which field in this list should we use
export class ColumnMapping {
    public constructor(
        public columnId: string, // the id of the column in the list of columns
        public fieldName: string, // the field in this list to display in that column
        public type: string, // the type of field (text, datatime , note)
    ) { }

}
export default class List {
    public columnMapping: ColumnMapping[];
    public constructor(
        public id: string,
        public web: string,
        public title: string,
        public url: string) {
        this.columnMapping = new Array<ColumnMapping>();
    }


}
