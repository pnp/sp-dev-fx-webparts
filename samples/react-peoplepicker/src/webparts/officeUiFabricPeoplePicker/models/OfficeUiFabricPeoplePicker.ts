import { IPersonaProps, IPersona } from "office-ui-fabric-react";

export interface IOfficeUiFabricPeoplePickerState {
    currentPicker?: number | string;
    delayResults?: boolean;
    selectedItems: any[];
}
export interface IPeopleSearchProps {
    JobTitle: string;
    PictureURL: string;
    PreferredName: string;
}

export interface IUserEntityData {
    IsAltSecIdPresent: string;
    ObjectId: string;
    Title: string;
    Email: string;
    MobilePhone: string;
    OtherMails: string;
    Department: string;
}

export interface IClientPeoplePickerSearchUser {
    Key: string;
    Description: string;
    DisplayText: string;
    EntityType: string;
    ProviderDisplayName: string;
    ProviderName: string;
    IsResolved: boolean;
    EntityData: IUserEntityData;
    MultipleMatches: any[];
}

export interface IEnsureUser {
    Email: string;
    Id: number;
    IsEmailAuthenticationGuestUser: boolean;
    IsHiddenInUI: boolean;
    IsShareByEmailGuestUser: boolean;
    IsSiteAdmin: boolean;
    LoginName: string;
    PrincipalType: number;
    Title: string;
    UserId: {
        NameId: string;
        NameIdIssuer: string;
    };
}

export interface IEnsurableSharePointUser
    extends IClientPeoplePickerSearchUser, IEnsureUser {}

export class SharePointUserPersona  implements IPersona {
    private _user:IEnsurableSharePointUser;
    public get User(): IEnsurableSharePointUser {
        return this._user;
    }

    public set User(user: IEnsurableSharePointUser) {
        this._user = user;
        this.primaryText = user.Title;
        this.secondaryText = user.EntityData.Title;
        this.tertiaryText = user.EntityData.Department;
        this.imageShouldFadeIn = true;
        this.imageUrl = `/_layouts/15/userphoto.aspx?size=S&accountname=${this.User.Key.substr(this.User.Key.lastIndexOf('|') + 1)}`;
    }

    constructor (user: IEnsurableSharePointUser) {
        this.User = user;
    }

    public primaryText: string;
    public secondaryText: string;
    public tertiaryText: string;
    public imageUrl: string;
    public imageShouldFadeIn: boolean;
}
