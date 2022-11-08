import { Guid } from "@microsoft/sp-core-library";
import { ITypedHash } from "@pnp/common/collections";
import { DateTimeFieldFormatType } from "@pnp/sp/fields/types";
import { PermissionKind } from "@pnp/sp/security/types";
import { IUpgradeAction } from "./IUpgradeAction";

export enum RoleType {
    None = 0,
    Guest = 1,
    Reader = 2,
    Contributor = 3,
    WebDesigner = 4,
    Administrator = 5,
    Editor = 6,
    System = 7
}

export enum FieldType {
    Text,
    DateTime,
    Number,
    Image,
    Hyperlink,
    Picture,
    Boolean,
    Currency,
    Choice,
    Lookup,
    User,
    Calculated,
    Taxonomy,
    Thumbnail,
    AverageRating,
    Recurrence,
    Integer,
    Guid
}

export enum ListTemplateType {
    GenericList = 100,
    DocumentLibrary = 101,
    EventsList = 106,
    PictureLibrary = 109,
    UserInformation = 112
}

export enum RoleOperation {
    Add,
    Remove
}

export enum ReadAccess {
    ByAll = 1,
    ByAuthor = 2
}

export enum WriteAccess {
    ByAll = 1,
    ByAuthor = 2,
    None = 4
}

export enum DraftVisibilityType {
    /** Any user who can read items */
    Reader = 0,
    /** Only users who can edit items */
    Author = 1,
    /** Only users who can approve items (and the author of the item) */
    Approver = 2
}

export const InternalName = Symbol("InternalName");
export const ParentList = Symbol("ParentList");
interface ICommonFieldDefinition {
    type: FieldType;
    name: string;
    displayName?: string;
    description?: string;
    required?: boolean;
    hidden?: boolean;
    readonly?: boolean;
    indexed?: boolean;
    uniqueValues?: boolean;
    hideInDisplayForm?: boolean;
    hideInNewForm?: boolean;
    hideInEditForm?: boolean;
    default?: string;
    [InternalName]?: string;
    [ParentList]?: IListDefinition;
}

export interface IBooleanFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Boolean;
    default?: 'Yes' | 'No';
}

export interface ITitleFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Text;
    name: 'Title';
    maxLength?: number;
    multi?: false;
}

export interface ITextFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Text;
    multi?: boolean;
    richText?: boolean | 'enhanced';
    maxLength?: number;
    unlimitedLengthInDocumentLibrary?: boolean;
}

export interface IDateTimeFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.DateTime;
    dateTimeFormat: DateTimeFieldFormatType;
}

export interface INumberFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Number;
    min?: number;
    max?: number;
    // decimalPlaces?: number | 'automatic';
    showAsPercentage?: boolean;
}

export interface ICurrencyFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Currency;
    min?: number;
    max?: number;
    currencyLocaleId?: number;
    // decimalPlaces?: number | 'automatic';
}

interface ICommonCalculatedFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Calculated;
    formula: string;
}
export interface ICalculatedTextFieldDefinition extends ICommonCalculatedFieldDefinition {
    outputType: FieldType.Text;
}
export interface ICalculatedNumberFieldDefinition extends ICommonCalculatedFieldDefinition {
    outputType: FieldType.Number;
    // decimalPlaces?: number | 'automatic';
    showAsPercentage?: boolean;
}
export interface ICalculatedCurrencyFieldDefinition extends ICommonCalculatedFieldDefinition {
    outputType: FieldType.Currency;
    currencyLocaleId?: number;
    // decimalPlaces?: number | 'automatic';
}
export interface ICalculatedDateTimeFieldDefinition extends ICommonCalculatedFieldDefinition {
    outputType: FieldType.DateTime;
    dateFormat: DateTimeFieldFormatType;
}
export interface ICalculatedBooleanFieldDefinition extends ICommonCalculatedFieldDefinition {
    outputType: FieldType.Boolean;
}
type ICalculatedFieldDefinition = ICalculatedTextFieldDefinition | ICalculatedNumberFieldDefinition | ICalculatedCurrencyFieldDefinition | ICalculatedDateTimeFieldDefinition | ICalculatedBooleanFieldDefinition;

export interface IHyperlinkFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Hyperlink;
}

export interface IPictureFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Picture;
}

export interface IUserFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.User;
    multi?: boolean;
    userSelectionMode: "PeopleOnly" | "PeopleAndGroups";
}

export interface IChoiceFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Choice;
    multi?: boolean;
    choices: string[];
}

export const LookupListId = Symbol("LookupListId");
export interface ILookupFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Lookup;
    multi?: boolean;
    lookupListTitle: string;
    showField?: string;
    [LookupListId]?: Guid;
}

export const TermStoreId = Symbol("TermStoreId");
export const TermGroupId = Symbol("TermGroupId");
export const TermSetId = Symbol("TermSetId");
export const AnchorTermId = Symbol("AnchorTermId");
export const DefaultTerm = Symbol("DefaultTerm");
export interface ITaxonomyFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Taxonomy;
    multi?: boolean;
    termGroup: string | 'sitecollection';
    termSet: string;
    anchorTerm?: string;
    allowFillIn?: boolean;
    [TermStoreId]?: Guid;
    [TermGroupId]?: Guid;
    [TermSetId]?: Guid;
    [AnchorTermId]?: Guid;
    [DefaultTerm]?: string;
}

export interface IThumbnailFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Thumbnail;
}

export interface IAverageRatingFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.AverageRating;
}

export interface IRecurrenceFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Recurrence;
}

export interface IGuidFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Guid;
}

export type AllowedIntegerFieldNames = 'ID' | 'EventType' | 'MasterSeriesItemID' | 'Duration';
export interface IIntegerFieldDefinition extends ICommonFieldDefinition {
    type: FieldType.Integer;
    name: AllowedIntegerFieldNames;
}

export type IFieldDefinition = ITitleFieldDefinition | IBooleanFieldDefinition | ITextFieldDefinition | IDateTimeFieldDefinition | INumberFieldDefinition | ICurrencyFieldDefinition | ICalculatedFieldDefinition | IHyperlinkFieldDefinition | IPictureFieldDefinition | IUserFieldDefinition | IChoiceFieldDefinition | ILookupFieldDefinition | ITaxonomyFieldDefinition | IThumbnailFieldDefinition | IAverageRatingFieldDefinition | IRecurrenceFieldDefinition | IGuidFieldDefinition | IIntegerFieldDefinition;

export const viewFields = (...fields: (string | IFieldDefinition)[]) => {
    return fields.map(f => (f as IFieldDefinition).name || f as string);
};

export const includeStandardViewFields = (...fields: (string | IFieldDefinition)[]) => {
    return [
        "ID",
        "Title",
        ...viewFields(...fields),
        "Author",
        "Created",
        "Editor",
        "Modified"
    ];
};

export const includeStandardLibraryViewFields = (...fields: (string | IFieldDefinition)[]) => {
    return includeStandardViewFields(
        "DocIcon",
        "LinkFilename",
        ...fields
    );
};

export const ListDefinition = Symbol("ListDefinition");
export const ViewId = Symbol("ViewId");
export interface IViewDefinition {
    title: string;
    default?: boolean;
    rowLimit?: number;
    paged?: boolean;
    query?: string;
    fields: string[];
    [ListDefinition]?: IListDefinition;
    [ViewId]?: string;
}

export interface IPrepopulatedListItem extends ITypedHash<any> {
    Title?: string;
}

export interface IPermissionLevel {
    name: string;
    description: string;
    copyFrom?: RoleType;
    permissions: PermissionKind[];
}

export interface ISiteGroup {
    name: string;
    description?: string;
    allowMembersEditMembership?: boolean;
    allowRequestToJoinLeave?: boolean;
    autoAcceptRequestToJoinLeave?: boolean;
    onlyAllowMembersViewMembership?: boolean;
    requestToJoinLeaveEmailSetting?: string;
}

export interface IUserRole {
    operation: RoleOperation;
    roleType: RoleType | string;
    userType: "custom" | "ownerGroup" | "memberGroup" | "visitorGroup";
    customName?: string;
}

export interface IListPermissions {
    copyRoleAssignments: boolean;
    userRoles: IUserRole[];
}

export const ListId = Symbol("ListId");
export const ListItemEntityTypeFullName = Symbol("ListItemEntityTypeFullName");
export const CurrentChangeToken = Symbol("CurrentChangeToken");
export const ParentSchema = Symbol("ParentSchema");
export interface IListDefinition {
    title: string;
    description: string;
    template: ListTemplateType;
    readSecurity?: ReadAccess;
    writeSecurity?: WriteAccess;
    draftVersionVisibility?: DraftVisibilityType;
    siteFields?: IFieldDefinition[];
    fields: IFieldDefinition[];
    listItems?: IPrepopulatedListItem[];
    siteGroups?: ISiteGroup[];
    permissions?: IListPermissions;
    enableModeration?: boolean;
    enableVersioning?: boolean;
    enableMinorVersions?: boolean;
    majorVersionLimit?: number;
    majorWithMinorVersionsLimit?: number;
    ratingSettings?: 'Ratings' | 'Likes' | 'Off';
    views?: IViewDefinition[];
    dependencies?: IListDefinition[];
    [ListId]?: string;
    [ListItemEntityTypeFullName]?: string;
    [CurrentChangeToken]?: string;
    [ParentSchema]?: IElementDefinitions;
}

export interface IUpgrade {
    fromVersion: number;
    toVersion: number;
    actions: IUpgradeAction[];
}

export interface IElementDefinitions {
    version: number;
    permissionLevels?: IPermissionLevel[];
    siteGroups?: ISiteGroup[];
    siteFields?: IFieldDefinition[];
    lists?: IListDefinition[];
    upgrades?: IUpgrade[];
}

const AverageRatingSiteField: IAverageRatingFieldDefinition = {
    type: FieldType.AverageRating,
    name: 'AverageRating',
    displayName: 'Rating (0-5)'
};

const RatingsSiteField: ITextFieldDefinition = {
    type: FieldType.Text,
    name: 'Ratings',
    displayName: 'User Ratings',
    multi: true
};

const RatingCountSiteField: INumberFieldDefinition = {
    type: FieldType.Number,
    name: 'RatingCount',
    displayName: 'Number of Ratings'
};

const RatedBySiteField: IUserFieldDefinition = {
    type: FieldType.User,
    name: 'RatedBy',
    displayName: 'Rated By',
    userSelectionMode: 'PeopleOnly',
    multi: true
};

const LikesCountSiteField: INumberFieldDefinition = {
    type: FieldType.Number,
    name: 'LikesCount',
    displayName: 'Number of Likes'
};

const LikedBySiteField: IUserFieldDefinition = {
    type: FieldType.User,
    name: 'LikedBy',
    displayName: 'Liked By',
    userSelectionMode: 'PeopleOnly',
    multi: true
};

export const ReputationSiteFields = [
    AverageRatingSiteField,
    RatingCountSiteField,
    RatingsSiteField,
    RatedBySiteField,
    LikesCountSiteField,
    LikedBySiteField
];

export const buildLiveList = <T extends IListDefinition>(list: T): T => {
    list.views.forEach(view => {
        if (view[ListDefinition] && view[ListDefinition] !== list) throw Error(`View object instance '${view.title}' of list '${list?.title}' has already been used with another list.  Did you forget to use a function to create a new instance for each schema?`);
        view[ListDefinition] = list;
    });

    list.fields.forEach(field => {
        field.displayName = field.displayName || field.name;
        field[ParentList] = list;
    });

    return list;
};

export const buildLiveSchema = <T extends IElementDefinitions>(schema: T): T => {
    schema.lists.forEach(list => list[ParentSchema] = schema);
    schema.lists.forEach(buildLiveList);
    return schema;
};