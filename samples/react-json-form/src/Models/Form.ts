import { IChoiceField, IConditionalField, IField, IGroupField } from "./FormField";

export interface IForm {
    Title: string;
    Fields: (IField | IChoiceField | IGroupField | IConditionalField)[];
}