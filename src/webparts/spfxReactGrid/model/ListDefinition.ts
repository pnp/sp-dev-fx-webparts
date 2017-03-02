// for eac of the columns to be displayed, which field in this list should we use
import { Guid } from '@microsoft/sp-client-base';
export class ColumnReference {
    public constructor(
        public columnDefinitionId: string, // the guid of the columnDefinition that this column refers to.
        //public internalName: string, // the internalName of the column in the list of columns
        /** The field in this list to display in that column (stored as 'internalname#;displayname')*/
        public name: string, // the field in this list to display in that column (stored as 'internalname#;displayname')

    ) { }

}
export default class ListDefinition {
    public columnReferences: Array<ColumnReference>;
    public guid: string;// the id of the list we are pointing to id#;name
    public constructor(
        public id: string,// the id of the list we are pointing to id#;name
        /** the web the list is contained in. Stored as webUrl#;Title */
        public webLookup: string,
        /** the list to be disoplayed. Stored as listid#;Title */
        public listLookup: string,
        /** the url of the site holding the list. (only used during setup) */
        public siteUrl: string,
        /** the url of the list. (not used. to be deleted) */
        public url: string) {
        this.columnReferences = new Array<ColumnReference>();
        this.guid = Guid.newGuid().toString();

    }


}
