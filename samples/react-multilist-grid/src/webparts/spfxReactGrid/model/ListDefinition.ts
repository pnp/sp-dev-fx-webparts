// for eac of the columns to be displayed, which field in this list should we use
import { Guid } from '@microsoft/sp-core-library';

export class FieldDefinition {
    /** The type of field to dispay */
    public TypeAsString: string;
    /** The Internal Name of the firld */
    public InternalName: string;
    /** for Lookup Fields, the field iin the foreign list to be displayed*/
    public LookupField: string;
    /** for Lookup Fields, the Id of the web containing the foreign list*/
    public LookupWebId: string;
    /** for Lookup Fields, the Id of  the foreign list*/
    public LookupList: string;
        /** for Lookup Fields, the Id of  the foreign list*/
    public Choices: Array<string>;
        /** for Lookup Fields, the Id of  the foreign list*/
    public Required: boolean;
        /** for Date Fiels. Determines if it is Date Only EntityPropertyName === "DateOnly" */
    public EntityPropertyName: string;
}
export class ColumnReference {
    public constructor(
        /** Tghe ID of this ColmnReference */
        public columnDefinitionId: string,
        /** The field in the Sharepoint list. Stored as 'internalname#;displayname')*/
        public name: string,
        /** The FULL field Definistion from sharepoint.... need to shave tos donw a bit
         * the Definition of the field iin sharepoint.... Should narrrow trhis down later I need EntityPropertyName and TypeAsString. Required,lookup info. etc...*/
        public fieldDefinition: FieldDefinition

    ) { }

}
export default class ListDefinition {
    /** The columns in the Sharepoint list we ewant to edit*/
    public columnReferences: Array<ColumnReference>;
    /** The Guid of this list Definition. The id field is the id of the list in sharepoint. The guid is the ID of this listdefinition */
    public guid: string;
    public constructor(
        /** the id of the list we are pointing to in Sharepoint. Stored as id#;name  */
        public id: string,
        /** the web the list is contained in. Stored as webUrl#;Title */
        public webLookup: string,
        /** the list to be disoplayed. Stored as listid#;Title */
        public listLookup: string,
        /** the url of the site holding the list. (only used during setup) */
        public siteUrl: string,
        /** the url of the list. (not used. to be deleted) */
        public url: string,
        /** A name for the listDefinition. When users add a new item, they must select the list nby this name */
        public listDefTitle: string) {
        this.columnReferences = new Array<ColumnReference>();
        this.guid = Guid.newGuid().toString();

    }


}
