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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
import { SPHttpClient } from '@microsoft/sp-http'; // Ensure correct import
import { navLinkBuilder } from './NavLinkBuilder';
var SPService = /** @class */ (function () {
    function SPService() {
    }
    /**
     * Returns the unique Anchor URL for a heading
     * @param headingValue The text value of the heading
     * @returns anchorUrl
     */
    SPService.GetAnchorUrl = function (headingValue) {
        var anchorUrl = "#".concat(headingValue
            .toLowerCase()
            .replace(/[{}|[\]<>#@"'^%`?;:/=~\\\s\s]/g, " ")
            .replace(/^(-|\s)*|(-|\s)*$/g, "")
            .replace(/'|\?|\\|\/| |&/g, "-")
            .replace(/-+/g, "-")
            .replace(/[+]/g, "%2B") // https://github.com/pnp/sp-dev-fx-webparts/issues/3686
            .substring(0, 128));
        var counter = 1;
        this.allUrls.forEach(function (url) {
            if (url === anchorUrl) {
                if (counter !== 1) {
                    anchorUrl = anchorUrl.slice(0, -((counter - 1).toString().length + 1)) + '-' + counter;
                }
                else {
                    anchorUrl += '-1';
                }
                counter++;
            }
        });
        return anchorUrl;
    };
    /**
     * Returns the Anchor Links for Nav element
     * @param context Web part context
     * @param isExpanded whether navigation links should be expanded by default
     * @returns anchorLinks
     */
    SPService.GetAnchorLinks = function (context, isExpanded) {
        var _a;
        if (isExpanded === void 0) { isExpanded = false; }
        return __awaiter(this, void 0, void 0, function () {
            var anchorLinks, currentPageRelativeUrl, currentPageSiteRelativeURl, currentPageUrl, encodedPageUrl, data, jsonData, canvasContent1JSON, canvasContent1, error_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        anchorLinks = [];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        currentPageRelativeUrl = context.pageContext.site.serverRequestPath;
                        currentPageSiteRelativeURl = context.pageContext.site.serverRelativeUrl;
                        currentPageUrl = currentPageRelativeUrl.replace("".concat(currentPageSiteRelativeURl, "/"), '');
                        encodedPageUrl = encodeURIComponent(currentPageUrl);
                        return [4 /*yield*/, context.spHttpClient.get("".concat(context.pageContext.web.absoluteUrl, "/_api/sitepages/pages?$select=CanvasContent1&$filter=Url eq '").concat(encodedPageUrl, "'"), SPHttpClient.configurations.v1)];
                    case 2:
                        data = _b.sent();
                        return [4 /*yield*/, data.json()];
                    case 3:
                        jsonData = _b.sent();
                        canvasContent1JSON = void 0;
                        try {
                            canvasContent1 = (_a = jsonData.value) === null || _a === void 0 ? void 0 : _a[0].CanvasContent1;
                            canvasContent1JSON = JSON.parse(canvasContent1);
                        }
                        catch (err) {
                            throw Error("Could not retrieve content: ".concat(err.message));
                        }
                        this.allUrls = [];
                        /* Traverse through all the Text web parts in the page */
                        canvasContent1JSON.map(function (webPart) {
                            if (webPart.zoneGroupMetadata && webPart.zoneGroupMetadata.type === 1) {
                                var headingIsEmpty = !webPart.zoneGroupMetadata.displayName;
                                var headingValue_1 = headingIsEmpty ? 'Empty Heading' : webPart.zoneGroupMetadata.displayName;
                                var anchorUrl = _this.GetAnchorUrl(headingValue_1);
                                _this.allUrls.push(anchorUrl);
                                // Limitation! This will break with headings containing the same name
                                if (anchorLinks.filter(function (x) { return x.name === headingValue_1; }).length === 0) {
                                    // Add link to nav element
                                    anchorLinks.push({ name: headingValue_1, key: anchorUrl, url: !headingIsEmpty && anchorUrl, links: [], isExpanded: webPart.zoneGroupMetadata.isExpanded });
                                }
                            }
                            if (webPart.innerHTML) {
                                var HTMLString = webPart.innerHTML;
                                var hasCollapsableHeader_1 = webPart.zoneGroupMetadata &&
                                    webPart.zoneGroupMetadata.type === 1 &&
                                    (anchorLinks.filter(function (x) { return x.name === webPart.zoneGroupMetadata.displayName; }).length === 1 ||
                                        !webPart.zoneGroupMetadata.displayName);
                                var htmlObject = document.createElement('div');
                                htmlObject.innerHTML = HTMLString;
                                var headers = htmlObject.querySelectorAll('h1, h2, h3, h4');
                                headers.forEach(function (header) {
                                    var headingValue = header.textContent;
                                    var headingOrder = parseInt(header.tagName.substring(1));
                                    // -2 because the text webpart heading 1 uses a h2 element
                                    headingOrder -= 2;
                                    if (hasCollapsableHeader_1) {
                                        headingOrder++;
                                    }
                                    var anchorUrl = _this.GetAnchorUrl(headingValue);
                                    _this.allUrls.push(anchorUrl);
                                    // Add link to nav element
                                    var newNavLink = { name: headingValue, key: anchorUrl, url: anchorUrl, links: [], isExpanded: isExpanded };
                                    navLinkBuilder.build(anchorLinks, newNavLink, headingOrder);
                                });
                            }
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, anchorLinks];
                }
            });
        });
    };
    /* Array to store all unique anchor URLs */
    SPService.allUrls = [];
    return SPService;
}());
export { SPService };
//# sourceMappingURL=SPService.js.map