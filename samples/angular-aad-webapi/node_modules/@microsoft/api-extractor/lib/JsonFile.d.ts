export declare type ValidateErrorCallback = (errorDescription: string) => void;
/**
 * Utilities for reading/writing JSON files.
 */
export default class JsonFile {
    static validateSchema(jsonObject: Object, jsonSchemaObject: Object, errorCallback: ValidateErrorCallback): void;
    static loadJsonFile(jsonFilename: string): {};
    static saveJsonFile(jsonFilename: string, jsonData: {}): void;
    /**
     * Used to validate a data structure before writing.  Reports an error if there
     * are any undefined members.
     */
    private static _validateNoUndefinedMembers(json);
    private static _formatErrorDetails(errorDetails, indent, buffer);
    /**
     * Returns the same thing as targetString.replace(searchValue, replaceValue), except that
     * all matches are replaced, rather than just the first match.
     * @param targetString  The string to be modified
     * @param searchValue   The value to search for
     * @param replaceValue  The replacement text
     */
    private static _getAllReplaced(targetString, searchValue, replaceValue);
}
