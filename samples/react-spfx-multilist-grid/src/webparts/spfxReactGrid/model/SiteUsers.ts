
export enum SiteUsersStatus {
    fetching,
    fetched,
    error
}
export class SiteUser {
    /** The integer id for the user within a site */
    public id: number;
    /** The display name for the user */
    public value: string;
    /** The loginID for a user, userd when moving items from one site to annother*/
    public loginName: string;
    constructor(id: number, value: string,loginName:string) {
        this.id=id;
        this.value=value;
        this.loginName=loginName;
    }
}
export class SiteUsers {
    public status: SiteUsersStatus;
    public siteUser: Array<SiteUser>;
    constructor(
        /** Th eurl opf  the site that contains the lookup list  */
        public siteUrl: string,

    ) {
        this.status = SiteUsersStatus.fetching;
        this.siteUser = new Array<SiteUser>();
    }
}
