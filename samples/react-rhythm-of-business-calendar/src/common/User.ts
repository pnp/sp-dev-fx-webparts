import { first } from 'lodash';
import { Recipient, User as IUserType } from "@microsoft/microsoft-graph-types";
import { SPUser } from "@microsoft/sp-page-context";
import { IPrincipalInfo } from "@pnp/sp";
import { ISiteUserInfo } from "@pnp/sp/site-users/types";

export class User {
    public static TitleAscComparer = (a: User, b: User) => a.title?.localeCompare(b.title);

    public static equal(user1: User, user2: User): boolean {
        if (user1 && user2)
            return (user1.id > 0 && user2.id > 0 && user1.id === user2.id)
                || (user1.login && user2.login && user1.login === user2.login)
                || (user1.email && user2.email && user1.email === user2.email);
        else
            return false;
    }

    public static except(users1: User[], users2: User[]): User[] {
        return users1.filter(om => !users2.some(m => User.equal(om, m)));
    }

    public static fromPrincipalInfo(info: IPrincipalInfo): User {
        const { PrincipalId, DisplayName, Email, LoginName } = info;
        return new User(PrincipalId, DisplayName, Email, LoginName);
    }

    public static fromSiteUserInfo(result: ISiteUserInfo): User {
        const { Id, Title, Email, LoginName } = result;
        return new User(Id, Title, Email, LoginName);
    }

    public static fromSPUser(spuser: SPUser): User {
        const { displayName, email, loginName } = spuser;
        return new User(0, displayName, email, loginName);
    }

    public static fromGraphUser(user: IUserType): User {
        const { displayName, mail, userPrincipalName } = user;
        return new User(0, displayName, mail, userPrincipalName);
    }

    public static fromRecipient(recipient: Recipient): User {
        const { emailAddress: { name, address } } = recipient || { emailAddress: {} };
        return new User(0, name, address, '');
    }

    private _id: number;
    public get id(): number { return this._id; }

    private _login: string;
    public get login(): string { return this._login; }

    private _picture: string;
    public get picture(): string { return this._picture; }

    constructor(
        id: number,
        public readonly title: string,
        public readonly email: string,
        login: string,
        picture?: string) {

        this._id = id;
        this._login = login;
        this._picture = picture || `/_layouts/15/userphoto.aspx?size=S&username=${email}`;
    }

    public updateId(id: number) {
        this._id = id;
    }

    public updateLogin(login: string) {
        this._login = login;
    }

    public updatePicture(url: string) {
        this._picture = url;
    }

    public alias(): string {
        let alias = (this.login || this.email).toLocaleLowerCase();

        const atIndex = alias.indexOf('@');
        alias = atIndex > 0 ? alias.slice(0, atIndex) : alias;

        const pipeIndex = alias.lastIndexOf('|');
        alias = pipeIndex > 0 ? alias.slice(pipeIndex + 1) : alias;

        return alias;
    }

    public titleWithoutOrganisation(): string {
        return first((this.title || '').split('('))?.trim();
    }
}