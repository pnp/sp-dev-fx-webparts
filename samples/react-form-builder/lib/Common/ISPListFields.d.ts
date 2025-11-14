import { SPHttpClient } from '@microsoft/sp-http';
import { IRuleEntry } from './IRuleEntry';
import { LinkFieldValue } from './LinkFieldValue';
import { IRESTLookupDefinition } from './IRESTLookupDefinition';
import { RestLookupFieldValue } from './RestLookupFieldValue';
export interface ISPListFields {
    value: ISPListField[];
}
export type ChangedFormEvent = (sourceField: ISPListField, newValue: string | string[] | LinkFieldValue | boolean | ChoiceValue | Date | RestLookupFieldValue, validationError: string) => void;
export type LookupInfo = {
    DisplayName: string;
    List: string;
    WebId: string;
    ShowField: string;
    FieldRef: string;
    ReadOnly: boolean;
    ID: string;
    StaticName: string;
    Name: string;
    LookupChoices?: ChoiceValue[];
};
export type ChoiceValue = {
    Value: string;
    Title: string;
    Details: string;
};
export interface ISPListField {
    Title: string;
    Name: string;
    Id: string;
    ReadOnlyField: boolean;
    InternalName: string;
    StaticName: string;
    Description: string;
    Hidden: boolean;
    Required: boolean;
    SchemaXml: string;
    MaxLength: number;
    MaximumValue: number;
    MinimumValue: number;
    Decimals: number;
    FieldTypeKind: number;
    TypeDisplayName: string;
    TypeShortDescription: string;
    DefaultValue: string;
    IsDisabled: boolean;
    CurrencyLocaleId: number;
    CommaSeparator: boolean;
    Choices: string[];
    TypeAsString: string;
    FormValue: string | string[] | boolean | ChoiceValue | LinkFieldValue | Date | RestLookupFieldValue;
    IsUsedInForm: boolean;
    IsValid: boolean;
    ChoiceUI: string;
    LinkUI: string;
    IsRichTextAllowed: boolean;
    LookupField: LookupInfo;
    ChangedHandler: ChangedFormEvent;
    httpClient: SPHttpClient;
    SiteUrl: string;
    IsDependentLookup: boolean;
    DependentLookupInternalNames: string[];
    AddionalRule: IRuleEntry;
    RESTLookup: IRESTLookupDefinition;
}
//# sourceMappingURL=ISPListFields.d.ts.map