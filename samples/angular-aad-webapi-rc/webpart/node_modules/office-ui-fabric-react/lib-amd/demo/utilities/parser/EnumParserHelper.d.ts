import { BaseParser } from './BaseParser';
import { IEnumProperty } from '../../components/index';
/**
 * Helper Parser that parses enums.
 */
export declare class EnumParserHelper extends BaseParser {
    private _state;
    /**
     * @constructor
     * Helper Parser that parses enums.
     */
    constructor(str: string);
    parse(): Array<IEnumProperty>;
}
