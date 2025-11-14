var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { SPHttpClient } from '@microsoft/sp-http';
import * as strings from 'DynamicFormularGeneratorWebPartStrings';
import { FieldTypes } from './FieldTypes';
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.parseDateTime = function (rawDate) {
        var dateParser = /(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})/;
        var match = rawDate.match(dateParser);
        if (match !== null)
            return new Date(parseInt(match[3]), // year
            parseInt(match[2]) - 1, // monthIndex
            parseInt(match[1]), // day
            parseInt(match[4]), // hours
            parseInt(match[5]), // minutes
            parseInt(match[6]) //seconds
            );
        dateParser = /(\d{2})\.(\d{2})\.(\d{4})/;
        match = rawDate.match(dateParser);
        if (match !== null)
            return new Date(parseInt(match[3]), parseInt(match[2]) - 1, parseInt(match[1]));
        return null;
    };
    // https://learn.microsoft.com/en-us/graph/api/user-sendmail?view=graph-rest-1.0&tabs=javascript
    // https://learn.microsoft.com/en-us/graph/api/message-send?view=graph-rest-1.0&tabs=http
    // https://learn.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis
    Helper.sendEMail = function (receiver, bccReceiver, subject, body, siteUrl, wpCtx) {
        return __awaiter(this, void 0, void 0, function () {
            var sendMail, graphCtx;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sendMail = {
                            message: {
                                subject: subject,
                                body: {
                                    contentType: 'html',
                                    content: body
                                },
                                toRecipients: [
                                    {
                                        emailAddress: {
                                            address: receiver
                                        }
                                    }
                                ],
                                ccRecipients: (typeof bccReceiver !== "undefined" && bccReceiver !== null && bccReceiver.length > 0) ? [
                                    {
                                        emailAddress: {
                                            address: bccReceiver
                                        }
                                    }
                                ] : []
                            },
                            saveToSentItems: 'false'
                        };
                        return [4 /*yield*/, wpCtx.msGraphClientFactory.getClient('3')];
                    case 1:
                        graphCtx = _a.sent();
                        return [4 /*yield*/, graphCtx.api("/users/".concat(wpCtx.pageContext.user.loginName, "/sendMail")).post(sendMail)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // see: https://support.microsoft.com/en-us/office/retirement-of-the-sharepoint-sendemail-api-b35bbab1-7d09-455f-8737-c2de63fe0821
    Helper.sendEMailRetired = function (receiver, subject, body, siteUrl, httpCtx) {
        return __awaiter(this, void 0, void 0, function () {
            var reqOptions, resultInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reqOptions = {
                            headers: {
                                "Accept": "application/json;odata=verbose",
                                "Content-Type": "application/json;odata=verbose",
                                "odata-version": "3.0"
                            },
                            body: JSON.stringify({
                                'properties': {
                                    '__metadata': {
                                        'type': 'SP.Utilities.EmailProperties'
                                    },
                                    'To': { 'results': [receiver] },
                                    'Body': body,
                                    'Subject': subject
                                }
                            })
                        };
                        return [4 /*yield*/, httpCtx.post("".concat(siteUrl, "/_api/SP.Utilities.Utility.SendEmail"), SPHttpClient.configurations.v1, reqOptions)];
                    case 1:
                        resultInfo = _a.sent();
                        return [4 /*yield*/, resultInfo.json()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Helper.GetViewFields = function (viewXML) {
        var temp = viewXML.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(temp, "text/xml");
        var tempFields = [];
        xmlDoc.getElementsByTagName("ViewFields")[0].childNodes.forEach(function (node, index) {
            if (node.getAttribute("Name").indexOf("_x003a_") === -1)
                tempFields.push(node.getAttribute("Name"));
        });
        return tempFields;
    };
    Helper.GetFieldValueAsString = function (field) {
        if (field.FormValue !== null) {
            if (field.FieldTypeKind === FieldTypes.BOOLEAN) {
                if (field.FormValue)
                    return strings.LabelYES;
                else
                    return strings.LabelNO;
            }
            if (field.FieldTypeKind === FieldTypes.MULTICHOICE) {
                field.FormValue.toString();
            }
            if (field.FieldTypeKind === FieldTypes.URLORIMAGE) {
                return "".concat(field.FormValue.Url, " / ").concat(field.FormValue.Description);
            }
            if (field.FieldTypeKind === FieldTypes.LOOKUP) {
                return "".concat(field.FormValue.Title, " ").concat(field.FormValue.Details);
            }
            if (field.FieldTypeKind === FieldTypes.DATETIME) {
                var result = Helper.parseDateTime(field.FormValue.toString());
                if (result !== null)
                    return result.toISOString();
            }
            return field.FormValue.toString();
        }
        return "";
    };
    return Helper;
}());
export { Helper };
//# sourceMappingURL=Helper.js.map