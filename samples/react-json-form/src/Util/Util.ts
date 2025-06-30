import { FieldType, IConditionalField, IField, IGroupField } from "../Models/FormField";

export const generateGuid: () => string = () => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

export const NewField: () => IField = () => ({ Id: generateGuid(), Type: FieldType.PlaceHolder } as IField)


const UNSUPPORTED_LOOKUP_FIELDTYPES: FieldType[] = [FieldType.PlaceHolder, FieldType.MultiChoice, FieldType.PlaceHolder, FieldType.Label];

export const GetLookupFields: (Fields: IField[]) => IField[] = (Fields: IField[]) => {
    const arr: IField[] = [];

    for (const field of Fields) {
        if (field.Type === FieldType.FieldGroup) {
            arr.push(...GetLookupFields((field as IGroupField).Fields))
        } else if (field.Type === FieldType.Conditional) {
            if ((field as IConditionalField).Field.Type === FieldType.FieldGroup) {
                arr.push(...GetLookupFields(((field as IConditionalField).Field as IGroupField).Fields))
            } else {
                arr.push((field as IConditionalField).Field);
            }
        } else {
            arr.push(field);
        }
    }

    return arr.filter(x => x.DisplayName !== null && !UNSUPPORTED_LOOKUP_FIELDTYPES.some(bannedType => bannedType === x.Type));
}
