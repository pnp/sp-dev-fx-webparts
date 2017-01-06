
export enum LookupOptionStatus {
    fetching,
    fetched,
    error
}
export class LookupOption {
    constructor(public id: number, public value: string) { }
}
export class LookupOptions {
    public status: LookupOptionStatus;
    public lookupOption:Array<LookupOption>;
    constructor(
        /** Th eurl opf  the site that contains the lookup list  */
        public lookupSite: string,
        /** The id of the web  that contains the lookup list NOTY WORKINMG: Cannot get web by id */
        public lookupWebId: string,
        /** The id of the Liist   that contains the lookup info */
        public lookupListId: string,
        /** The Internal name of the field that is being looked up */
        public lookupField: string) {
        this.status = LookupOptionStatus.fetching;
        this.lookupOption= new Array<LookupOption>();
    }
}
