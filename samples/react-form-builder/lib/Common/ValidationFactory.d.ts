import { ISPListField } from "./ISPListFields";
export declare class ValidationFactory {
    static RX_EMAIL: RegExp;
    static RX_URL: RegExp;
    static RX_TEL: RegExp;
    static RX_CredirCard: RegExp;
    static RX_ZIP_DE: RegExp;
    static RX_ZIP_AT: RegExp;
    static RX_ZIP_CH: RegExp;
    static RX_ZIP_US: RegExp;
    static RX_ZIP_UK: RegExp;
    static RX_ZIP_FR: RegExp;
    static RX_ZIP_IT: RegExp;
    static ValidateFormData(formCtl: HTMLInputElement | HTMLTextAreaElement, field: ISPListField, newValue: string): string;
    private static ResolveValidationPattern;
}
//# sourceMappingURL=ValidationFactory.d.ts.map