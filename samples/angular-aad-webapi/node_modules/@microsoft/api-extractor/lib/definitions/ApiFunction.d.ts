import ApiItem, { IApiItemOptions } from './ApiItem';
import ApiParameter from './ApiParameter';
/**
  * This class is part of the ApiItem abstract syntax tree. It represents functions that are directly
  * defined inside a package and are not member of classes, interfaces, or nested type literal expressions
  *
  * @see ApiMethod for functions that are members of classes, interfaces, or nested type literal expressions
  */
declare class ApiFunction extends ApiItem {
    returnType: string;
    params: ApiParameter[];
    constructor(options: IApiItemOptions);
    /**
     * Returns a text string such as "someName?: SomeTypeName;", or in the case of a type
     * literal expression, returns a text string such as "someName?:".
     */
    getDeclarationLine(): string;
}
export default ApiFunction;
