import * as strings from "DynamicFormularGeneratorWebPartStrings";
import { FieldTypes } from "./FieldTypes";
import { Text } from '@microsoft/sp-core-library';
var ValidationFactory = /** @class */ (function () {
    function ValidationFactory() {
    }
    ValidationFactory.ValidateFormData = function (formCtl, field, newValue) {
        var currentValue = formCtl === null ? newValue : formCtl.value;
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
                var rx = new RegExp("^-?[0-9]*$");
                if (!rx.test(currentValue)) {
                    return strings.VALMsgOnlyNumbersAllowed;
                }
            }
            else {
                var separtor = currentValue.indexOf(",") > 0 ? "," : ".";
                var temp = currentValue.split(separtor);
                if (temp.length > 1 && temp[1].length > field.Decimals) {
                    return Text.format(strings.VALMsgDecimalInvalid, field.Decimals);
                }
            }
            if (currentValue.length > 0) {
                var rawValue = field.Decimals === 0 ? parseInt(currentValue, 10) : parseFloat(currentValue);
                if (rawValue < field.MinimumValue || rawValue > field.MaximumValue)
                    return Text.format(strings.VALMsgvalueRangeOverflow, field.MinimumValue, field.MaximumValue);
            }
        }
        if (typeof field.AddionalRule !== "undefined" && field.AddionalRule !== null) {
            if (field.AddionalRule.Regex !== null) {
                var rx = this.ResolveValidationPattern(field.AddionalRule.Regex);
                if (rx !== null && !rx.test(currentValue))
                    return field.AddionalRule.ErrorMsg.length > 0 ? field.AddionalRule.ErrorMsg : strings.VALMsgInvalidFieldData;
            }
        }
        field.IsValid = true;
        return ""; // TODO
    };
    ValidationFactory.ResolveValidationPattern = function (pattern) {
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
    };
    ValidationFactory.RX_EMAIL = /([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,20}|[0-9]{1,3})/;
    ValidationFactory.RX_URL = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    ValidationFactory.RX_TEL = /^\+?[0-9\s\-().]{7,20}$/;
    ValidationFactory.RX_CredirCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
    ValidationFactory.RX_ZIP_DE = /^[0-9]{5}$/;
    ValidationFactory.RX_ZIP_AT = /^[0-9]{4}$/;
    ValidationFactory.RX_ZIP_CH = /^[0-9]{4}$/;
    ValidationFactory.RX_ZIP_US = /^[0-9]{5}(-[0-9]{4})?$/;
    ValidationFactory.RX_ZIP_UK = /^([A-Z]{1,2}[0-9R][0-9A-Z]? [0-9][A-Z]{2}|GIR 0AA)$/;
    ValidationFactory.RX_ZIP_FR = /^[0-9]{5}$/;
    ValidationFactory.RX_ZIP_IT = /^[0-9]{5}$/;
    return ValidationFactory;
}());
export { ValidationFactory };
//# sourceMappingURL=ValidationFactory.js.map