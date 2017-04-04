import { IApiItemOptions } from './ApiItem';
import ApiMember from './ApiMember';
/**
 * This class is part of the ApiItem abstract syntax tree. It represents properties of classes or interfaces
 * (It does not represent member methods)
 */
declare class ApiProperty extends ApiMember {
    type: string;
    isStatic: boolean;
    isReadOnly: boolean;
    constructor(options: IApiItemOptions);
    getDeclarationLine(): string;
}
export default ApiProperty;
