import { DisplayFormat, FieldType } from "./FieldTypes";
import { IField } from "./IField";
import { IFieldChange } from "./IVersion";

export interface IFieldLookupValue {
    LookupId: number;
    LookupValue: string;
}

export interface IFieldUserValue extends IFieldLookupValue {
    Email: string;
}

export interface IFieldUrlValue {
    Description: string;
    Url: string;
}

export interface ITaxonomyFieldValue {
    Label: string
    TermGuid: string
    WssId: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GetChanges: (field: IField, version: any, prevVersion: any) => IFieldChange = (field: IField, version: any, prevVersion: any) => {
    switch (field.TypeAsString) {
        case FieldType.Text:
        case FieldType.Note:
        case FieldType.Integer:
        case FieldType.Number:
        case FieldType.Choice:
            if (version[field.StaticName] !== prevVersion[field.StaticName]) {
                return {
                    FieldName: field.Title,
                    FieldInternalName: field.StaticName,
                    OldValue: prevVersion[field.StaticName],
                    NewValue: version[field.StaticName],
                    FieldType: field.TypeAsString
                };
            }
            break;
        case FieldType.Lookup:
        case FieldType.User:
            if ((version[field.StaticName] as IFieldLookupValue)?.LookupId !== (prevVersion[field.StaticName] as IFieldLookupValue)?.LookupId) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const link = new URL(window.location.protocol + "//" + window.location.host + (<any>window)._spPageContextInfo.siteServerRelativeUrl);
                link.pathname += "/_layouts/15/listform.aspx";
                link.searchParams.append("PageType", "4");
                link.searchParams.append("ListId", field.LookupList);
                link.searchParams.append("ID", (version[field.StaticName] as IFieldLookupValue)?.LookupId.toString());
                link.searchParams.append("RootFolder", "*");

                return {
                    FieldName: field.Title,
                    FieldInternalName: field.StaticName,
                    OldValue: (prevVersion[field.StaticName] as IFieldLookupValue)?.LookupValue,
                    NewValue: (version[field.StaticName] as IFieldLookupValue)?.LookupValue,
                    FieldType: field.TypeAsString,
                    Data: version[field.StaticName],
                    Link: link.toString()
                };
            }
            break;
        case FieldType.DateTime:
            if (new Date(version[field.StaticName]).toLocaleString() !== new Date(prevVersion[field.StaticName]).toLocaleString()) {
                if (field.DisplayFormat === DisplayFormat.DateOnly) {
                    return {
                        FieldName: field.Title,
                        FieldInternalName: field.StaticName,
                        OldValue: new Date(prevVersion[field.StaticName]).toLocaleDateString(),
                        NewValue: new Date(version[field.StaticName]).toLocaleDateString(),
                        FieldType: field.TypeAsString
                    };
                } else {
                    return {
                        FieldName: field.Title,
                        FieldInternalName: field.StaticName,
                        OldValue: new Date(prevVersion[field.StaticName]).toLocaleString(),
                        NewValue: new Date(version[field.StaticName]).toLocaleString(),
                        FieldType: field.TypeAsString
                    };
                }
            }
            break;
        case FieldType.UserMulti:
        case FieldType.LookupMulti:
            if (JSON.stringify(version[field.StaticName]) !== JSON.stringify(prevVersion[field.StaticName])) {
                return {
                    FieldName: field.Title,
                    FieldInternalName: field.StaticName,
                    OldValue: (prevVersion[field.StaticName] as IFieldLookupValue[])?.map(x => x.LookupValue).join("\n"),
                    NewValue: (version[field.StaticName] as IFieldLookupValue[])?.map(x => x.LookupValue).join("\n"),
                    FieldType: field.TypeAsString,
                    Data: version[field.StaticName]
                };
            }
            break;
        case FieldType.MultiChoice:
            if (JSON.stringify(version[field.StaticName]) !== JSON.stringify(prevVersion[field.StaticName])) {
                return {
                    FieldName: field.Title,
                    FieldInternalName: field.StaticName,
                    OldValue: (prevVersion[field.StaticName] as string[])?.join("\n"),
                    NewValue: (version[field.StaticName] as string[])?.join("\n"),
                    FieldType: field.TypeAsString,
                    Data: version[field.StaticName]
                };
            }
            break;
        case FieldType.URL: {
            const BeforeUrlString = `${(prevVersion[field.StaticName] as IFieldUrlValue)?.Description} (${(prevVersion[field.StaticName] as IFieldUrlValue)?.Url})`;
            const NewUrlString = `${(version[field.StaticName] as IFieldUrlValue).Description} (${(version[field.StaticName] as IFieldUrlValue).Url})`;
            if (BeforeUrlString !== NewUrlString) {
                return {
                    FieldName: field.Title,
                    FieldInternalName: field.StaticName,
                    OldValue: BeforeUrlString,
                    NewValue: NewUrlString,
                    FieldType: field.TypeAsString,
                    Data: version[field.StaticName]
                };
            }
            break;
        }
        case FieldType.Boolean:
            if (version[field.StaticName] !== prevVersion[field.StaticName]) {
                return {
                    FieldName: field.Title,
                    FieldInternalName: field.StaticName,
                    OldValue: prevVersion[field.StaticName] ? "Yes" : "No",
                    NewValue: version[field.StaticName] ? "Yes" : "No",
                    FieldType: field.TypeAsString
                };
            }
            break;
        case FieldType.Taxonomy:
            if (JSON.stringify(version[field.StaticName]) !== JSON.stringify(prevVersion[field.StaticName])) {
                return {
                    FieldName: field.Title,
                    FieldInternalName: field.StaticName,
                    OldValue: (prevVersion[field.StaticName] as ITaxonomyFieldValue)?.Label,
                    NewValue: (version[field.StaticName] as ITaxonomyFieldValue)?.Label,
                    FieldType: field.TypeAsString,
                    Data: version[field.StaticName]
                };
            }
            break;
        case FieldType.TaxonomyMulti:
            if (JSON.stringify(version[field.StaticName]) !== JSON.stringify(prevVersion[field.StaticName])) {
                return {
                    FieldName: field.Title,
                    FieldInternalName: field.StaticName,
                    OldValue: (prevVersion[field.StaticName] as ITaxonomyFieldValue[])?.map(x => x.Label).join("\n"),
                    NewValue: (version[field.StaticName] as ITaxonomyFieldValue[])?.map(x => x.Label).join("\n"),
                    FieldType: field.TypeAsString,
                    Data: version[field.StaticName]
                };
            }
            break;
    }
}