import { BaseParser } from './BaseParser';
import { IInterfaceProperty } from '../../components/index';
/**
 * Helper Parser that parses interfaces.
 */
export declare class InterfaceParserHelper extends BaseParser {
    private _state;
    /**
     * @constructor
     * Helper Parser that parses interfaces.
     */
    constructor(str: string);
    parse(): Array<IInterfaceProperty>;
}
