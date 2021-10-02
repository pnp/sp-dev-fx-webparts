export interface IFieldInfo {
  DefaultFormula: string | null;
  DefaultValue: string | null;
  Description: string;
  Direction: string;
  EnforceUniqueValues: boolean;
  EntityPropertyName: string;
  FieldTypeKind: FieldTypes;
  Filterable: boolean;
  FromBaseType: boolean;
  Group: string;
  Hidden: boolean;
  Id: string;
  Indexed: boolean;
  IndexStatus: number;
  InternalName: string;
  JSLink: string;
  PinnedToFiltersPane: boolean;
  ReadOnlyField: boolean;
  Required: boolean;
  SchemaXml: string;
  Scope: string;
  Sealed: boolean;
  ShowInFiltersPane: number;
  Sortable: boolean;
  StaticName: string;
  Title: string;
  TypeAsString: string;
  TypeDisplayName: string;
  TypeShortDescription: string;
  ValidationFormula: string | null;
  ValidationMessage: string | null;
}
/**
 * Specifies the type of the field.
 */
 export enum FieldTypes {
  Invalid = 0,
  Integer = 1,
  Text = 2,
  Note = 3,
  DateTime = 4,
  Counter = 5,
  Choice = 6,
  Lookup = 7,
  Boolean = 8,
  Number = 9,
  Currency = 10,
  URL = 11,
  Computed = 12,
  Threading = 13,
  Guid = 14,
  MultiChoice = 15,
  GridChoice = 16,
  Calculated = 17,
  File = 18,
  Attachments = 19,
  User = 20,
  Recurrence = 21,
  CrossProjectLink = 22,
  ModStat = 23,
  Error = 24,
  ContentTypeId = 25,
  PageSeparator = 26,
  ThreadIndex = 27,
  WorkflowStatus = 28,
  AllDayEvent = 29,
  WorkflowEventType = 30,
}

export enum DateTimeFieldFormatType {
  DateOnly = 0,
  DateTime = 1,
}

export enum DateTimeFieldFriendlyFormatType {
  Unspecified = 0,
  Disabled = 1,
  Relative = 2,
}
