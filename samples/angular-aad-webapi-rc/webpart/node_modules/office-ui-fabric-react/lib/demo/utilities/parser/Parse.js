"use strict";
var index_1 = require('../../components/index');
var InterfaceParserHelper_1 = require('./InterfaceParserHelper');
var EnumParserHelper_1 = require('./EnumParserHelper');
/**
 * Given some valid, well linted Typescript source code, extracts exported interfaces and enums.
 *
 * Note: requires that the closing '}' of interfaces and enums is the first char on its own line.
 *       It should otherwise be reasonably robust to handle various commenting or even code layout
 *       styles within the interface or enum.
 *
 * To specify default values for interfaces, use the JSDoc @default or @defaultvalue markup.
 * The rest of the line after @default will be captured as the default value.
 *
 * @export
 * @param {string} source Valid, reasonably well linted Typescript source code.
 * @param {string} [propsInterfaceOrEnumName] Name of an interface or enum if you only want to parse said interface or enum.
 * @returns {Array<IProperty>} An array of properties.
 */
function parse(source, propsInterfaceOrEnumName) {
    var props = [];
    var regex = null;
    var parseInfo;
    var propertyNameSuffix = function (type) { return type === 'interface' ? ' interface' : ' enum'; };
    var propertyType = function (type) { return type === 'interface' ? index_1.PropertyType.interface : index_1.PropertyType.enum; };
    if (propsInterfaceOrEnumName) {
        regex = new RegExp("export (interface|enum) " + propsInterfaceOrEnumName + "(?: extends .*?)? \\{(.*[\\r\\n]*)*?\\}");
        var regexResult = regex.exec(source);
        if (regexResult && regexResult.length > 0) {
            parseInfo = _parseEnumOrInterface(regexResult);
            return [{
                    name: propsInterfaceOrEnumName,
                    propertyName: propsInterfaceOrEnumName + propertyNameSuffix(regexResult[1]),
                    propertyType: propertyType(regexResult[1]),
                    property: parseInfo
                }];
        }
    }
    else {
        regex = new RegExp("export (interface|enum) (\\S*?)(?: extends .*?)? \\{(.*[\\r\\n]*)*?\\}", 'g');
        var regexResult = void 0;
        var results = [];
        while ((regexResult = regex.exec(source)) !== null) {
            parseInfo = _parseEnumOrInterface(regexResult);
            results.push({
                name: regexResult[2],
                propertyName: regexResult[2] + propertyNameSuffix(regexResult[1]),
                propertyType: propertyType(regexResult[1]),
                property: parseInfo
            });
        }
        return results;
    }
    return props;
}
exports.parse = parse;
function _parseEnumOrInterface(regexResult) {
    var parseInfo;
    if (regexResult[1] === 'interface') {
        var parser = new InterfaceParserHelper_1.InterfaceParserHelper(regexResult[0]);
        parseInfo = parser.parse();
        parser = null;
    }
    else {
        var parser = new EnumParserHelper_1.EnumParserHelper(regexResult[0]);
        parseInfo = parser.parse();
        parser = null;
    }
    return parseInfo;
}

//# sourceMappingURL=Parse.js.map
