import ApiItem, { IApiItemOptions } from './ApiItem';
/**
 * This class is part of the ApiItem abstract syntax tree. It represents a TypeScript enum value.
 * The parent container will always be an ApiEnum instance.
 */
export default class ApiEnumValue extends ApiItem {
    constructor(options: IApiItemOptions);
    /**
     * Returns a text string such as "MyValue = 123,"
     */
    getDeclarationLine(): string;
}
