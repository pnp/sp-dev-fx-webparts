import { DisplayFormat, FieldType } from "./FieldTypes"

export interface IField {
    "odata.type": string
    "odata.id": string
    "odata.editLink": string
    AutoIndexed: boolean
    CanBeDeleted: boolean
    ClientSideComponentId: string
    // ClientSideComponentProperties: any
    // ClientValidationFormula: any
    // ClientValidationMessage: any
    // CustomFormatter: any
    // DefaultFormula: any
    // DefaultValue: any
    Description: string
    Direction: string
    EnforceUniqueValues: boolean
    EntityPropertyName: string
    Filterable: boolean
    FromBaseType: boolean
    Group: string
    Hidden: boolean
    Id: string
    Indexed: boolean
    IndexStatus: number
    InternalName: string
    IsModern: boolean
    JSLink?: string
    PinnedToFiltersPane: boolean
    ReadOnlyField: boolean
    Required: boolean
    SchemaXml: string
    Scope: string
    Sealed: boolean
    ShowInFiltersPane: number
    Sortable: boolean
    StaticName: string
    Title: string
    FieldTypeKind: number
    TypeAsString: FieldType
    TypeDisplayName: string
    TypeShortDescription: string
    // ValidationFormula: any
    // ValidationMessage: any
    EnableLookup?: boolean
    MaxLength?: number
    CommaSeparator?: boolean
    // CustomUnitName: any
    CustomUnitOnRight?: boolean
    DisplayFormat?: DisplayFormat
    MaximumValue?: number
    MinimumValue?: number
    ShowAsPercentage?: boolean
    // Unit: any
    AllowMultipleValues?: boolean
    DependentLookupInternalNames?: string[]
    IsDependentLookup?: boolean
    IsRelationship?: boolean
    LookupField?: string
    LookupList?: string
    LookupWebId?: string
    PrimaryFieldId?: string
    RelationshipDeleteBehavior?: number
    UnlimitedLengthInDocumentLibrary?: boolean
}