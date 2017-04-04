import ApiItem, { IApiItemOptions } from './ApiItem';
/**
 * This class is part of the ApiItem abstract syntax tree. It represents parameters of a function declaration
 */
declare class ApiParameter extends ApiItem {
    isOptional: boolean;
    type: string;
    /**
     * If there is a spread operator before the parameter declaration
     * Example: foo(...params: string[])
     */
    isSpread: boolean;
    constructor(options: IApiItemOptions, docComment?: string);
}
export default ApiParameter;
