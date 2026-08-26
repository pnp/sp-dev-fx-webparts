import * as strings from "DynamicFormularGeneratorWebPartStrings";
import { FieldTypes } from "./FieldTypes";
import { ISPListField } from "./ISPListFields";
import { Text } from '@microsoft/sp-core-library';

export class ValidationFactory {
    public static RX_EMAIL: RegExp = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,20}|[0-9]{1,3})/;
    public static RX_URL: RegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    public static RX_TEL: RegExp = /^\+?[0-9\s\-().]{7,20}$/;
    public static RX_CredirCard: RegExp = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    public static RX_ZIP_DE: RegExp = /^[0-9]{5}$/;
    public static RX_ZIP_AT: RegExp = /^[0-9]{4}$/;
    public static RX_ZIP_CH: RegExp = /^[0-9]{4}$/;
    public static RX_ZIP_US: RegExp = /^[0-9]{5}(-[0-9]{4})?$/;
    public static RX_ZIP_UK: RegExp = /^([A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}|GIR 0AA)$/;
    public static RX_ZIP_FR: RegExp = /^[0-9]{5}$/;
    public static RX_ZIP_IT: RegExp = /^[0-9]{5}$/;

    public static ValidateFormData(formCtl: HTMLInputElement | HTMLTextAreaElement, field: ISPListField, newValue: string): string {
        const currentValue: string = formCtl === null ? newValue : formCtl.value;

        field.IsValid = false;

        if (field.Required && currentValue.length === 0) {
            return strings.VALMsgRequiredField;
        }

        // Browser specific validation
        if (formCtl !== null) {
            if (!formCtl.checkValidity()) {
                return strings.VALMsgInvalidFieldData;
            }
        }

        if (field.FieldTypeKind === FieldTypes.NUMBER || field.FieldTypeKind === FieldTypes.CURRENCY) {
            if (field.Decimals === 0) {
                const rx: RegExp = new RegExp("^-?[0-9]*$");
                if (!rx.test(currentValue)) {
                    return strings.VALMsgOnlyNumbersAllowed;
                }
            }
            else {
                const separtor: string = currentValue.indexOf(",") > 0 ? "," : ".";
                const temp = currentValue.split(separtor);
                if (temp.length > 1 && temp[1].length > field.Decimals) {
                    return Text.format(strings.VALMsgDecimalInvalid, field.Decimals);
                }
            }
            if (currentValue.length > 0) {
                const rawValue: number = field.Decimals === 0 ? parseInt(currentValue, 10) : parseFloat(currentValue);
                if (rawValue < field.MinimumValue || rawValue > field.MaximumValue)
                    return Text.format(strings.VALMsgvalueRangeOverflow, field.MinimumValue, field.MaximumValue);
            }
        }

        if (typeof field.AddionalRule !== "undefined" && field.AddionalRule !== null) {
            if (field.AddionalRule.Regex !== null) {
                const rx: RegExp = this.ResolveValidationPattern(field.AddionalRule.Regex);
                if (rx !== null && !rx.test(currentValue))
                    return field.AddionalRule.ErrorMsg.length > 0 ? field.AddionalRule.ErrorMsg : strings.VALMsgInvalidFieldData;
            }
        }

        field.IsValid = true;
        return ""; // TODO
    }

    private static ResolveValidationPattern(pattern: string): RegExp {
        if (pattern === "tel")
            return null;
        if (pattern === "email")
            return this.RX_EMAIL;
        if (pattern === "url")
            return this.RX_URL;
        if (pattern === "creditcard")
            return this.RX_CredirCard;
        if (pattern === "zip-de")
            return this.RX_ZIP_DE;
        if (pattern === "zip-at")
            return this.RX_ZIP_AT;
        if (pattern === "zip-ch")
            return this.RX_ZIP_CH;
        if (pattern === "zip-us")
            return this.RX_ZIP_US;
        if (pattern === "zip-uk")
            return this.RX_ZIP_UK;
        if (pattern === "zip-fr")
            return this.RX_ZIP_FR;
        if (pattern === "zip-it")
            return this.RX_ZIP_IT;
        return null;
    }
}