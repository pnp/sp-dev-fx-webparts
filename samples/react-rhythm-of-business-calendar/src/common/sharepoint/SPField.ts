import { first } from "lodash";
import moment, { Moment } from "moment-timezone";
import { ITimeZone } from '../services';
import { Entity } from "../Entity";
import { User } from "../User";
import { parseFloatOrDefault, parseIntOrDefault, PropsOfType } from '../Utils';
import { ILookupResult, ITaxonomyResult, IUserInfoResult, IThumbnailResult } from "./query_";
import { TaxonomyTermEntity } from "./TaxonomyTermEntity";
import { UpdateHyperlink, UpdateMultiChoice, UpdateMultiLookup, UpdateTaxonomy } from "./update";
import { ListItemRating } from "./ListItemRating";
import { ITitleFieldDefinition, ITextFieldDefinition, INumberFieldDefinition, IBooleanFieldDefinition, ITaxonomyFieldDefinition, IDateTimeFieldDefinition, IHyperlinkFieldDefinition, IUserFieldDefinition, AllowedIntegerFieldNames } from "./schema";
import { Guid } from "@microsoft/sp-core-library";

const BooleanDescriminator = Symbol("Boolean Descriminator");
const ChoiceDescriminator = Symbol("Choice Descriminator");
const ChoiceMultiDescriminator = Symbol("ChoiceMulti Descriminator");
const CurrencyDescriminator = Symbol("Currency Descriminator");
const DateTimeDescriminator = Symbol("DateTime Descriminator");
const LookupDescriminator = Symbol("Lookup Descriminator");
const LookupMultiDescriminator = Symbol("LookupMulti Descriminator");
const NumberDescriminator = Symbol("Number Descriminator");
const TextDescriminator = Symbol("Text Descriminator");
const TextMultiDescriminator = Symbol("TextMulti Descriminator");
const UserDescriminator = Symbol("User Descriminator");
const UserMultiDescriminator = Symbol("UserMulti Descriminator");
const HyperlinkDescriminator = Symbol("Hyperlink Descriminator");
const ThumbnailDescriminator = Symbol("Thumbnail Descriminator");
const TaxonomyDescriminator = Symbol("Taxonomy Descriminator");
const TaxonomyMultiDescriminator = Symbol("TaxonomyMulti Descriminator");
const GuidDescriminator = Symbol("Guid Descriminator");
const IntegerDescriminator = Symbol("Integer Descriminator");
const RecurrenceDescriminator = Symbol("Recurrence Descriminator");

const sharepointDateTimeFormat = 'M/D/YYYY h:mm A';

export type Query_Boolean = string & { [BooleanDescriminator]: never; };
export type Query_Choice = string & { [ChoiceDescriminator]: never; };
export type Query_ChoiceMulti = string[] & { [ChoiceMultiDescriminator]: never; };
export type Query_Currency = string & { [CurrencyDescriminator]: never; };
export type Query_DateTime = string & { [DateTimeDescriminator]: never; };
export type Query_Lookup = (ILookupResult & { [LookupDescriminator]: never; })[];
export type Query_LookupMulti = (ILookupResult & { [LookupMultiDescriminator]: never; })[];
export type Query_Number = string & { [NumberDescriminator]: never; };
export type Query_Text = string & { [TextDescriminator]: never; };
export type Query_TextMultiLine = string & { [TextMultiDescriminator]: never; };
export type Query_User = (IUserInfoResult & { [UserDescriminator]: never; })[];
export type Query_UserMulti = (IUserInfoResult & { [UserMultiDescriminator]: never; })[];
export type Query_Hyperlink = string & { [HyperlinkDescriminator]: never; };
export type Query_Thumbnail = IThumbnailResult & { [ThumbnailDescriminator]: never; };
export type Query_Taxonomy = ITaxonomyResult & { [TaxonomyDescriminator]: never; };
export type Query_TaxonomyMulti = (ITaxonomyResult & { [TaxonomyMultiDescriminator]: never; })[];
export type Query_Guid = (string & { [GuidDescriminator]: never; })[];
export type Query_Integer = (string & { [IntegerDescriminator]: never; })[];
export type Query_Recurrence = (string & { [RecurrenceDescriminator]: never; })[];

export type Update_Boolean = boolean;
export type Update_Choice = string;
export type Update_ChoiceMulti = UpdateMultiChoice;
export type Update_Currency = number;
export type Update_DateTime = string;
export type Update_LookupId = number;
export type Update_LookupIdMulti = UpdateMultiLookup;
export type Update_Number = number;
export type Update_Text = string;
export type Update_TextMultiLine = string;
export type Update_UserId = number;
export type Update_UserIdMulti = UpdateMultiLookup;
export type Update_Hyperlink = UpdateHyperlink;
// export type Update_Thumbnail = string;
export type Update_Taxonomy = UpdateTaxonomy;
export type Update_TaxonomyMulti = string;
export type Update_Guid = string;
export type Update_Integer = number;
export type Update_Recurrence = boolean;

const toUserCore = ({ id, title, email, sip, picture }: IUserInfoResult): User => {
    return new User(parseInt(id), title, email, sip, picture);
};

export const toUser = (result: Query_User): User => {
    return first((result || []).map(toUserCore));
};

export const toUsers = (results: Query_UserMulti): User[] => {
    return (results || []).map(toUserCore);
};

export const fromUser = (user: User): Update_UserId => {
    return user?.id || null;
};

export const fromUsers = (users: User[]): Update_UserIdMulti => {
    return new UpdateMultiLookup(users.map(u => u.id));
};

export const fromDateTime = <T>(row: T, fieldName: PropsOfType<T, Query_DateTime>, { momentId }: ITimeZone): Moment => {
    const value: string = (row as any)[`${String(fieldName)}.`];
    return value ? moment.tz(value, [moment.ISO_8601, sharepointDateTimeFormat], momentId) : null;
};

export const toDateTime = (dateTime: Moment, { momentId }: ITimeZone): Update_DateTime => {
    return dateTime ? dateTime.tz(momentId, true).toISOString() : null;
};

export const toDateOnly = (dateTime: Moment): Update_DateTime => {
    return dateTime ? dateTime.format('MM-DD-YYYY') : null;
};

export const fromYesNo = <T>(row: T, fieldName: PropsOfType<T, Query_Boolean>, defaultValue: boolean = false): boolean => {
    const value: string = (row as any)[`${String(fieldName)}.value`];
    switch (value) {
        case "0": return false;
        case "1": return true;
        default: return defaultValue;
    }
};

export const fromInteger = <T>(row: T, fieldName: PropsOfType<T, Query_Integer> & AllowedIntegerFieldNames): number => {
    const value: string = (row as any)[fieldName];
    return parseIntOrDefault(value, undefined, 10);
};

export const fromInt = <T>(row: T, fieldName: PropsOfType<T, Query_Number>, defaultValue: number = Number.NaN, radix: number = 10): number => {
    const value: string = (row as any)[`${String(fieldName)}.`];
    return parseIntOrDefault(value, defaultValue, radix);
};

export const fromFloat = <T>(row: T, fieldName: PropsOfType<T, Query_Number>, defaultValue: number = Number.NaN): number => {
    const value: string = (row as any)[`${String(fieldName)}.`];
    return parseFloatOrDefault(value, defaultValue);
};

export const fromCurrency = <T>(row: T, fieldName: PropsOfType<T, Query_Currency>, defaultValue: number = Number.NaN): number => {
    const value: string = (row as any)[`${String(fieldName)}.`];
    return parseFloatOrDefault(value, defaultValue);
};

export const fromGuid = <T>(row: T, fieldName: PropsOfType<T, Query_Guid>): Guid => {
    const value: string = (row as any)[fieldName];
    return Guid.tryParse(value);
};

export const fromRecurrence = <T>(row: T, fieldName: PropsOfType<T, Query_Recurrence> & "fRecurrence"): boolean => {
    const value: string = (row as any)[fieldName];
    switch (value) {
        case "0": return false;
        case "1": return true;
        default: return false;
    }
};

export const tofRecurrence = (recurrence: boolean): Update_Recurrence => {
    return recurrence;
};

export const toLookupMulti = <T extends Entity<any>>(entities: ReadonlyArray<T>): Update_LookupIdMulti => {
    return new UpdateMultiLookup(entities.map(e => e.id));
};

export const lookupHasValue = (value: Query_Lookup | Query_LookupMulti) => {
    return value && value.length > 0 && value[0].lookupId > 0 && !!value[0].lookupValue;
};

export const fromLookup = <T>(value: Query_Lookup, lookup: ReadonlyMap<number, T>) => {
    return lookupHasValue(value) ? lookup.get(first(value).lookupId) : null;
};

export const fromLookupMulti = <T>(values: Query_LookupMulti, lookup: ReadonlyMap<number, T>) => {
    return lookupHasValue(values) ? values.map(value => lookup.get(value.lookupId)) : [];
};

export const fromLookupAsync = async <T>(value: Query_Lookup, lookup: (id: number) => T | Promise<T>) => {
    return lookupHasValue(value) ? await lookup(value[0].lookupId) : null;
};

export const fromLookupMultiAsync = async <T>(values: Query_LookupMulti, lookup: (id: number) => T | Promise<T>) => {
    return lookupHasValue(values) ? await Promise.all(values.map(value => lookup(value.lookupId))) : [];
};

export const toTaxonomy = <T extends TaxonomyTermEntity<any, T>>(term: T): Update_Taxonomy => {
    return term ? new UpdateTaxonomy(term.label, term.termId.toString()) : null;
};

export const toTaxonomyMulti = <T extends TaxonomyTermEntity<any, T>>(terms: readonly T[]): Update_TaxonomyMulti => {
    return (terms || []).map(term => `-1;#${term.label}|${term.termId.toString()}`).join(';#');
};

export const fromTaxonomy = <T extends TaxonomyTermEntity<any, T>>(value: Query_Taxonomy, lookup: ReadonlyMap<string, T>) => {
    return lookup.get(value?.TermID || value?.TermGuid);
};

export const fromTaxonomyMulti = <T extends TaxonomyTermEntity<any, T>>(values: Query_TaxonomyMulti, lookup: ReadonlyMap<string, T>) => {
    return (values || []).map(value => lookup.get(value.TermID)).filter(Boolean);
};

export const fromTaxonomyAsync = async <T extends TaxonomyTermEntity<any, T>>(value: Query_Taxonomy, lookup: (guid: string) => T | Promise<T>) => {
    return lookup(value?.TermID);
};

export const fromTaxonomyMultiAsync = async <T extends TaxonomyTermEntity<any, T>>(values: Query_TaxonomyMulti, lookup: (guid: string) => T | Promise<T>) => {
    return Promise.all((values || []).map(value => lookup(value.TermID)));
};

export const fromThumbnail = (value: Query_Thumbnail): string => {
    return value?.serverRelativeUrl;
};

export const toRating = (entity: ListItemRating, row: { RatedBy: Query_UserMulti, Ratings: Query_Text }): void => {
    entity.ratedBy = toUsers(row.RatedBy);
    entity.ratings = (row.Ratings || '').split(',').filter(Boolean).map(r => parseInt(r, 10));
};

export const Form = {
    Title: (field: ITitleFieldDefinition, value: string) => {
        return { FieldName: field.name, FieldValue: value };
    },
    Text: (field: ITextFieldDefinition, value: string) => {
        return { FieldName: field.name, FieldValue: value };
    },
    Number: (field: INumberFieldDefinition, value: number) => {
        return { FieldName: field.name, FieldValue: value?.toString() || '' };
    },
    Boolean: (field: IBooleanFieldDefinition, value: boolean) => {
        return { FieldName: field.name, FieldValue: value ? '1' : '2' };
    },
    User: (field: IUserFieldDefinition, value: User) => {
        return { FieldName: field.name, FieldValue: value ? JSON.stringify([{ Key: value.login }]) : '' };
    },
    UserMulti: (field: IUserFieldDefinition, value: User[]) => {
        return { FieldName: field.name, FieldValue: value.length > 0 ? "[" + value.map(user => `{ "Key": "${user.login}" }`).join(',') + "]" : '' };
    },
    Date: (field: IDateTimeFieldDefinition, value: Moment) => {
        return { FieldName: field.name, FieldValue: value ? value.format('MM/DD/YYYY') : '' };
    },
    DateTime: (field: IDateTimeFieldDefinition, value: Moment) => {
        return { FieldName: field.name, FieldValue: value ? value.format('MM/DD/YYYY HH:MM A') : '' };
    },
    Hyperlink: (field: IHyperlinkFieldDefinition, value: string) => {
        return { FieldName: field.name, FieldValue: value?.toString() || '' };
    },
    SingleMMD: <T extends TaxonomyTermEntity<any, T>>(field: ITaxonomyFieldDefinition, value: T) => {
        return { FieldName: field.name, FieldValue: value ? `${value.label}|${value.termId.toString()};` : '' };
    },
    MultiMMD: <T extends TaxonomyTermEntity<any, T>>(field: ITaxonomyFieldDefinition, value: T[]) => {
        return { FieldName: field.name, FieldValue: value?.map(term => `${term.label}|${term.termId.toString()}`).join(';') || '' };
    },
    FileLeafRef: (value: string) => {
        return { FieldName: 'FileLeafRef', FieldValue: value };
    }
};