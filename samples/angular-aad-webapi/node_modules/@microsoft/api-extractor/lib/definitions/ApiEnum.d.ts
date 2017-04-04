import ApiItemContainer from './ApiItemContainer';
import { IApiItemOptions } from './ApiItem';
/**
 * This class is part of the ApiItem abstract syntax tree. It represents a TypeScript enum definition.
 * The individual enum values are represented using ApiEnumValue.
 */
export default class ApiEnum extends ApiItemContainer {
    constructor(options: IApiItemOptions);
}
