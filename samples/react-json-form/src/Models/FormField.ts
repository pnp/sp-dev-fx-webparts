export enum FieldType {
    Text = "Text",
    MultilineText = "MultilineText",
    Number = "Number",
    Boolean = "Boolean",
    Choice = "Choice",
    MultiChoice = "MultiChoice",
    FieldGroup = "FieldGroup",
    PlaceHolder = "PlaceHolder",
    Label = "Label",
    Conditional = "Conditional",
    Header = "Header"
}

export interface IField {
    Id: string;
    DisplayName?: string;
    Type: FieldType;
}

export interface IChoiceField extends IField {
    Options: string[]
}

export interface IConditionalField extends IField {
    LookupFieldId: string;
    MatchValue: string | number | boolean;
    Field: IField;
}

export enum GroupDirection {
    Vertical,
    Horizontal
}

export interface IGroupField extends IField {
    Fields: (IField | IChoiceField | IGroupField | IConditionalField)[]
    Direction: GroupDirection;
}

export interface IForm {
    Title: string;
    Fields: (IField | IChoiceField | IGroupField | IConditionalField)[];
}