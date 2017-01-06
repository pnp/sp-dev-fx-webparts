//Webs is only needed when we ara ading a list, dont pupulate it until then

export class WebListField {
    public constructor(public id: string,
        /** the name of the field in the list stored as internalName#;name */
        public name: string,
        /** the Definition of the field iin sharepoint.... Should narrrow trhis down later I need EntityPropertyName and TypeAsString. lookup info. etc...*/
        public fieldDefinition:any,
       ) {
    }
}
export class WebList {
    /** An array of fieldss that are contained in the list */
    public fields: Array<WebListField>;
    /** Indicates if fieldss have been fetched for this list */
    public fieldsFetched;
    public constructor(
        public id: string,
        public title: string,
        public url: string) {
        this.fieldsFetched = false;
        this.fields = new Array<WebListField>();
    }
}


export class Web {
    /** An array of lists that are contained in the web */
    public lists: Array<WebList>;
    /** Indicates if lists have been fetched for this web */
    public listsFetched: boolean;
    public constructor(
        /** The ID of the SPWebObject as stored in Sharepoint. PRObably can be deleted */
        public id: string,
        /** The Title of the SPWebObject as stored in Sharepoint. for display puroses */
        public title: string,
        /** The Url the SPWeb*/
        public url: string) {
        this.listsFetched = false;
        this.lists = new Array<WebList>();
    }
}
export class Site {
    /** An array of webs, contains currently contains only webs under the rootweb. Need to change pnp to get allwebs */
    public webs: Array<Web>;
    public constructor(
        /** The url of a SiteCOllection we want to get data from */
        public url: string) {
        this.webs = new Array<Web>();
    }
}
