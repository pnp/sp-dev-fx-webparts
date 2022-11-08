import { isFunction } from "lodash";
import { Text } from "@microsoft/sp-core-library";
import { Entity } from './Entity';

import * as cstrings from "CommonStrings";

type ValOrFunc<E, T> = T | ((entity: E) => T);

export class ValidationRule<E extends Entity<any, any>> {
    constructor(
        public readonly validate: (enitity: E) => boolean,
        public readonly failMessage: ValOrFunc<E, string>
    ) { }

    protected static eval<E extends Entity<any, any>, T>(entity: E, input: T | ((entity: E) => T)): T {
        return isFunction(input) ? input(entity) : input;
    }
}

export class RequiredValidationRule<E extends Entity<any, any>> extends ValidationRule<E> {
    constructor(
        field: (entity: E) => string | object,
        failMessage: string = cstrings.Validation.Required
    ) {
        super((e: E) => RequiredValidationRule.hasValue(field(e)), failMessage);
    }

    public static hasValue(val: any): boolean {
        if (typeof val === "string") {
            return !RequiredValidationRule._isBlank(val);
        } else if (Array.isArray(val)) {
            return val.length > 0;
        } else if (typeof val?.isValid === "function") {
            return val.isValid();
        } else {
            return !!val;
        }
    }

    private static _isBlank(val: string): boolean {
        return (!val || /^\s*$/.test(val));
    }
}

export class MinValueValidationRule<E extends Entity<any, any>> extends ValidationRule<E> {
    constructor(
        field: (entity: E) => number | undefined,
        minValue: ValOrFunc<E, number>,
        failMessage: string = cstrings.Validation.MinimumValue
    ) {
        super((e: E) => this._valueOrGreater(field(e), ValidationRule.eval(e, minValue)), e => Text.format(failMessage, ValidationRule.eval(e, minValue)));
    }

    private _valueOrGreater(val: number | undefined, minValue: number): boolean {
        return (!val && val !== 0) || val >= minValue;
    }
}

export class MaxValueValidationRule<E extends Entity<any, any>> extends ValidationRule<E> {
    constructor(
        field: (entity: E) => number | undefined,
        maxValue: ValOrFunc<E, number>,
        failMessage: string = cstrings.Validation.MaximumValue
    ) {
        super(e => this._valueOrLess(field(e), ValidationRule.eval(e, maxValue)), e => Text.format(failMessage, ValidationRule.eval(e, maxValue)));
    }

    private _valueOrLess(val: number | undefined, maxValue: number): boolean {
        return (!val && val !== 0) || val <= maxValue;
    }
}

export class RangeValueValidationRule<E extends Entity<any, any>> extends ValidationRule<E> {
    constructor(
        field: (entity: E) => number | undefined,
        minValue: ValOrFunc<E, number>,
        maxValue: ValOrFunc<E, number>,
        failMessage: string = cstrings.Validation.RangeValue
    ) {
        super(e => this._isBetween(field(e), ValidationRule.eval(e, minValue), ValidationRule.eval(e, maxValue)), e => Text.format(failMessage, ValidationRule.eval(e, minValue), ValidationRule.eval(e, maxValue)));
    }

    private _isBetween(val: number | undefined, minValue: number, maxValue: number): boolean {
        return (!val && val !== 0) || (val >= minValue && val <= maxValue);
    }
}

export class MaxLengthValidationRule<E extends Entity<any, any>> extends ValidationRule<E> {
    constructor(
        field: (entity: E) => string,
        maxLength: ValOrFunc<E, number>,
        failMessage: string = cstrings.Validation.MaximumLength
    ) {
        super((e: E) => field(e)?.length <= ValidationRule.eval(e, maxLength), e => Text.format(failMessage, ValidationRule.eval(e, maxLength)));
    }
}

export class MaxItemsValidationRule<E extends Entity<any, any>> extends ValidationRule<E> {
    constructor(
        field: (entity: E) => ReadonlyArray<any>,
        maxItems: ValOrFunc<E, number>,
        failMessage: string = cstrings.Validation.MaximumItems
    ) {
        super((e: E) => field(e)?.length <= ValidationRule.eval(e, maxItems), e => Text.format(failMessage, ValidationRule.eval(e, maxItems)));
    }
}

export class UrlValidationRule<E extends Entity<any, any>> extends ValidationRule<E> {
    constructor(
        field: (entity: E) => string,
        failMessage: string = cstrings.Validation.Url
    ) {
        super((e: E) => this._isUrl(field(e)), failMessage);
    }

    private _isUrl(val: any): boolean {
        const regexp = /^(((https|http|ftp):\/\/)(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?)?$/i;
        return !val || regexp.test(val);
    }
}

export class EmailValidationRule<E extends Entity<any, any>> extends ValidationRule<E> {
    constructor(
        field: (entity: E) => string,
        failMessage: string = cstrings.Validation.Email
    ) {
        super((e: E) => this._isEmailAddress(field(e)), failMessage);
    }

    private _isEmailAddress(val: any): boolean {
        const regexp = /^[a-z0-9_\-.+]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*$/i;
        return !val || regexp.test(val);
    }
}

export class PhoneValidationRule<E extends Entity<any, any>> extends ValidationRule<E> {
    constructor(
        field: (entity: E) => string,
        failMessage: string = cstrings.Validation.Phone
    ) {
        super((e: E) => this._isPhoneNumber(field(e)), failMessage);
    }

    private _isPhoneNumber(val: any): boolean {
        const regexp = /^[0-9]{10}$/i;
        return !val || regexp.test(val);
    }
}