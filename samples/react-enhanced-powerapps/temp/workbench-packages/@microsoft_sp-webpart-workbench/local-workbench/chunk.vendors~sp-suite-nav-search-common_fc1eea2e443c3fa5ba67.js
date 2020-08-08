(window["webpackJsonpf8a8ad94_4cf3_4a19_a76b_1cec9da00219_0_1_0"] = window["webpackJsonpf8a8ad94_4cf3_4a19_a76b_1cec9da00219_0_1_0"] || []).push([["vendors~sp-suite-nav-search-common"],{

/***/ "AFEp":
/*!******************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/fetchAcquireToken.js ***!
  \******************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch */ "KZPZ");
/* harmony import */ var _withCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./withCache */ "JcTZ");
/* harmony import */ var _withMonitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./withMonitor */ "LB0u");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



var approvedResources = [
    "https://substrate.office.com",
    "https://loki.delve.office.com",
    "https://www.bing.com",
    "https://outlook.office365.com/search"
];
/* harmony default export */ __webpack_exports__["default"] = (Object(_withMonitor__WEBPACK_IMPORTED_MODULE_2__["default"])({
    monitorName: "prefetchAcquireToken",
    additionalSuccessPropsExtractor: function (xhr) {
        var responseText = xhr && xhr.responseText && JSON.parse(xhr.responseText);
        return __assign({}, (responseText && {
            resource: approvedResources.indexOf(responseText.resource) !== -1
                ? responseText.resource
                : "",
            expires_on: responseText.expires_on
        }));
    }
}, Object(_withCache__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a) {
    var digest = _a.digest, portalUrl = _a.portalUrl, resourceUrl = _a.resourceUrl, useSTI = _a.useSTI;
    var body = {
        resource: resourceUrl
    };
    if (useSTI) {
        body["tokenType"] = "STI";
    }
    return Object(_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])({
        url: portalUrl + "/_api/SP.OAuth.Token/Acquire",
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Odata-Version": "4.0",
            Accept: "application/json;odata.metadata=minimal",
            "X-RequestDigest": digest
        },
        body: JSON.stringify(body),
        timeoutMs: 7000
    }).then(function (xhr) {
        return {
            xhr: xhr,
            tokenAttemptCount: -1,
            tokenFetchDuration: -1,
            cacheItemType: null
        };
    });
})({
    cacheId: "psst",
    cacheVersion: "0",
    cacheItemLifetime: 1000 * 60 * 5,
    cacheKeyExtractor: function (options) { return ({ resource: options.resourceUrl }); }
})));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hBY3F1aXJlVG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmV0Y2hBY3F1aXJlVG9rZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxJQUFNLGlCQUFpQixHQUFHO0lBQ3hCLDhCQUE4QjtJQUM5QiwrQkFBK0I7SUFDL0Isc0JBQXNCO0lBQ3RCLHNDQUFzQztDQUN2QyxDQUFDO0FBRUYsZUFBZSxXQUFXLENBQ3hCO0lBQ0UsV0FBVyxFQUFFLHNCQUFzQjtJQUNuQywrQkFBK0IsRUFBRSxVQUFBLEdBQUc7UUFDbEMsSUFBTSxZQUFZLEdBQ2hCLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzFELG9CQUNLLENBQUMsWUFBWSxJQUFJO1lBQ2xCLFFBQVEsRUFDTixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDckQsQ0FBQyxDQUFDLFlBQVksQ0FBQyxRQUFRO2dCQUN2QixDQUFDLENBQUMsRUFBRTtZQUNSLFVBQVUsRUFBRSxZQUFZLENBQUMsVUFBVTtTQUNwQyxDQUFDLEVBQ0Y7SUFDSixDQUFDO0NBQ0YsRUFDRCxTQUFTLENBQ1AsVUFBQyxFQUFxRTtRQUFuRSxrQkFBTSxFQUFFLHdCQUFTLEVBQUUsNEJBQVcsRUFBRSxrQkFBTTtJQUN2QyxJQUFNLElBQUksR0FBNkM7UUFDckQsUUFBUSxFQUFFLFdBQVc7S0FDdEIsQ0FBQztJQUNGLElBQUksTUFBTSxFQUFFO1FBQ1YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztLQUMzQjtJQUNELE9BQU8sS0FBSyxDQUFDO1FBQ1gsR0FBRyxFQUFLLFNBQVMsaUNBQThCO1FBQy9DLE1BQU0sRUFBRSxNQUFNO1FBQ2QsT0FBTyxFQUFFO1lBQ1AsY0FBYyxFQUFFLGlDQUFpQztZQUNqRCxlQUFlLEVBQUUsS0FBSztZQUN0QixNQUFNLEVBQUUseUNBQXlDO1lBQ2pELGlCQUFpQixFQUFFLE1BQU07U0FDMUI7UUFDRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDMUIsU0FBUyxFQUFFLElBQUk7S0FDaEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUc7UUFDVCxPQUFPO1lBQ0wsR0FBRyxLQUFBO1lBQ0gsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1lBQ3JCLGtCQUFrQixFQUFFLENBQUMsQ0FBQztZQUN0QixhQUFhLEVBQUUsSUFBSTtTQUNwQixDQUFDO0lBQ0osQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQ0YsQ0FBQztJQUNBLE9BQU8sRUFBRSxNQUFNO0lBQ2YsWUFBWSxFQUFFLEdBQUc7SUFDakIsaUJBQWlCLEVBQUUsSUFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDO0lBQ2hDLGlCQUFpQixFQUFFLFVBQUEsT0FBTyxJQUFJLE9BQUEsQ0FBQyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBbkMsQ0FBbUM7Q0FDbEUsQ0FBQyxDQUNILENBQUMifQ==

/***/ }),

/***/ "Am70":
/*!**********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/Base64Url.js ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: decode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "decode", function() { return decode; });
// Copied from Oslo code and updated with base64url support
// General base64 util based on this repo https://github.com/mathiasbynens/base64
// If you want to modify/change this code, consider this package instead - https://www.npmjs.com/package/atob
// This is just used for browsers <= IE9, for normal browsers use btoa and atob
var TABLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
/**
 * `decode` is designed to be fully compatible with `atob` as described in the
 * HTML Standard. http://whatwg.org/html/webappapis.html#dom-windowbase64-atob
 */
function decode(input) {
    input = input.trim();
    var length = input.length;
    if (length % 4 === 0) {
        input = input.replace(/==?$/, "");
        length = input.length;
    }
    if (length % 4 === 1 || /[^\-_a-zA-Z0-9]/.test(input)) {
        error("Invalid character: the string to be decoded is not correctly encoded.");
    }
    var bitCounter = 0;
    var bitStorage = 0;
    var buffer;
    var output = "";
    var position = -1;
    while (++position < length) {
        buffer = TABLE.indexOf(input.charAt(position));
        // tslint:disable-next-line:no-bitwise
        bitStorage = bitCounter % 4 ? bitStorage * 64 + buffer : buffer;
        // Unless this is the first of a group of 4 characters…
        // tslint:disable-next-line:no-bitwise
        if (bitCounter++ % 4) {
            // …convert the first 8 bits to a single ASCII character.
            output += String.fromCharCode(
            // tslint:disable-next-line:no-bitwise
            0xff & (bitStorage >> ((-2 * bitCounter) & 6)));
        }
    }
    return output;
}
function error(message) {
    var error = new Error(message);
    error.name = "InvalidCharacterError";
    throw new Error(message);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZTY0VXJsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0Jhc2U2NFVybC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwyREFBMkQ7QUFDM0QsaUZBQWlGO0FBQ2pGLDZHQUE2RztBQUU3RywrRUFBK0U7QUFDL0UsSUFBTSxLQUFLLEdBQ1Qsa0VBQWtFLENBQUM7QUFFckU7OztHQUdHO0FBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FBQyxLQUFhO0lBQ2xDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDckIsSUFBSSxNQUFNLEdBQVcsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUVsQyxJQUFJLE1BQU0sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNsQyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztLQUN2QjtJQUNELElBQUksTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3JELEtBQUssQ0FDSCx1RUFBdUUsQ0FDeEUsQ0FBQztLQUNIO0lBQ0QsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztJQUNuQixJQUFJLE1BQWMsQ0FBQztJQUNuQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDaEIsSUFBSSxRQUFRLEdBQVcsQ0FBQyxDQUFDLENBQUM7SUFDMUIsT0FBTyxFQUFFLFFBQVEsR0FBRyxNQUFNLEVBQUU7UUFDMUIsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRS9DLHNDQUFzQztRQUN0QyxVQUFVLEdBQUcsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxHQUFHLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUVoRSx1REFBdUQ7UUFDdkQsc0NBQXNDO1FBQ3RDLElBQUksVUFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ3BCLHlEQUF5RDtZQUN6RCxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVk7WUFDM0Isc0NBQXNDO1lBQ3RDLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FDL0MsQ0FBQztTQUNIO0tBQ0Y7SUFDRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBRUQsU0FBUyxLQUFLLENBQUMsT0FBZTtJQUM1QixJQUFNLEtBQUssR0FBVSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUN4QyxLQUFLLENBQUMsSUFBSSxHQUFHLHVCQUF1QixDQUFDO0lBQ3JDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0IsQ0FBQyJ9

/***/ }),

/***/ "Ir3s":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/fetchSharePointDigest.js ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch */ "KZPZ");
/* harmony import */ var _withCache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./withCache */ "JcTZ");
/* harmony import */ var _withMonitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./withMonitor */ "LB0u");



/* harmony default export */ __webpack_exports__["default"] = (function (_a) {
    var endpoint = _a.endpoint, forceDigestRefresh = _a.forceDigestRefresh;
    return Object(_withMonitor__WEBPACK_IMPORTED_MODULE_2__["default"])({
        monitorName: "prefetchSharepointDigest"
    }, Object(_withCache__WEBPACK_IMPORTED_MODULE_1__["default"])(function (_a) {
        var endpoint = _a.endpoint;
        return Object(_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])({
            url: endpoint + "/_api/contextinfo",
            method: "POST",
            headers: {
                Accept: "application/json;odata=verbose",
                "Content-Type": "application/json;odata=verbose"
            },
            timeoutMs: 5000
        }).then(function (xhr) {
            return {
                xhr: xhr,
                tokenAttemptCount: -1,
                tokenFetchDuration: -1
            };
        });
    })({
        cacheId: "pspd",
        cacheVersion: "0",
        // 30 min timeout value gotten from
        // sts/stsom/Administration/SPCanary.cs
        // Subtract 10 seconds to keep digest current
        cacheItemLifetime: 30 * 60 * 1000 - 10000,
        cacheKeyExtractor: function (options) { return ({
            url: options.endpoint + "/_api/contextinfo"
        }); },
        forceRefresh: forceDigestRefresh
    }))({ endpoint: endpoint, forceDigestRefresh: forceDigestRefresh });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hTaGFyZVBvaW50RGlnZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ZldGNoU2hhcmVQb2ludERpZ2VzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxTQUFTLE1BQU0sYUFBYSxDQUFDO0FBQ3BDLE9BQU8sV0FBVyxNQUFNLGVBQWUsQ0FBQztBQUV4QyxnQkFBZSxVQUFDLEVBR2dCO1FBRjlCLHNCQUFRLEVBQ1IsMENBQWtCO0lBRWxCLE9BQUEsV0FBVyxDQUNUO1FBQ0UsV0FBVyxFQUFFLDBCQUEwQjtLQUN4QyxFQUNELFNBQVMsQ0FBQyxVQUFDLEVBQTJDO1lBQXpDLHNCQUFRO1FBQ25CLE9BQUEsS0FBSyxDQUFDO1lBQ0osR0FBRyxFQUFLLFFBQVEsc0JBQW1CO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxnQ0FBZ0M7Z0JBQ3hDLGNBQWMsRUFBRSxnQ0FBZ0M7YUFDakQ7WUFDRCxTQUFTLEVBQUUsSUFBSTtTQUNoQixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsR0FBRztZQUNULE9BQU87Z0JBQ0wsR0FBRyxLQUFBO2dCQUNILGlCQUFpQixFQUFFLENBQUMsQ0FBQztnQkFDckIsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO2FBQ3ZCLENBQUM7UUFDSixDQUFDLENBQUM7SUFkRixDQWNFLENBQ0gsQ0FBQztRQUNBLE9BQU8sRUFBRSxNQUFNO1FBQ2YsWUFBWSxFQUFFLEdBQUc7UUFDakIsbUNBQW1DO1FBQ25DLHVDQUF1QztRQUN2Qyw2Q0FBNkM7UUFDN0MsaUJBQWlCLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsS0FBSztRQUN6QyxpQkFBaUIsRUFBRSxVQUFDLE9BQXNDLElBQUssT0FBQSxDQUFDO1lBQzlELEdBQUcsRUFBSyxPQUFPLENBQUMsUUFBUSxzQkFBbUI7U0FDNUMsQ0FBQyxFQUY2RCxDQUU3RDtRQUNGLFlBQVksRUFBRSxrQkFBa0I7S0FDakMsQ0FBQyxDQUNILENBQUMsRUFBRSxRQUFRLFVBQUEsRUFBRSxrQkFBa0Isb0JBQUEsRUFBRSxDQUFDO0FBaENuQyxDQWdDbUMsRUFBQyJ9

/***/ }),

/***/ "JcTZ":
/*!**********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/withCache.js ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return withCache; });
/* harmony import */ var _promiseCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./promiseCache */ "Xqy8");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "rzB3");


function withCache(promiseFactory) {
    return function withCacheOptions(cacheOptions) {
        return function cachedPromise(options) {
            var cacheKey = cacheOptions.cacheKeyExtractor(options) || {};
            var forceRefresh = cacheOptions.forceRefresh && cacheOptions.forceRefresh();
            return ((!forceRefresh &&
                Object(_promiseCache__WEBPACK_IMPORTED_MODULE_0__["getPromise"])(cacheOptions.cacheId, cacheOptions.cacheVersion, Object(_state__WEBPACK_IMPORTED_MODULE_1__["puid"])(), cacheKey)) ||
                Object(_promiseCache__WEBPACK_IMPORTED_MODULE_0__["savePromise"])(cacheOptions, Object(_state__WEBPACK_IMPORTED_MODULE_1__["puid"])(), promiseFactory(options), cacheKey));
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aENhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dpdGhDYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFtQixXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRSxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBSS9CLE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUMvQixjQUEwQztJQUkxQyxPQUFPLFNBQVMsZ0JBQWdCLENBQzlCLFlBQThCO1FBRTlCLE9BQU8sU0FBUyxhQUFhLENBQUMsT0FBVTtZQUN0QyxJQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9ELElBQU0sWUFBWSxHQUNoQixZQUFZLENBQUMsWUFBWSxJQUFJLFlBQVksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUUzRCxPQUFPLENBQ0wsQ0FBQyxDQUFDLFlBQVk7Z0JBQ1osVUFBVSxDQUNSLFlBQVksQ0FBQyxPQUFPLEVBQ3BCLFlBQVksQ0FBQyxZQUFZLEVBQ3pCLElBQUksRUFBRSxFQUNOLFFBQVEsQ0FDVCxDQUFDO2dCQUNKLFdBQVcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLEVBQUUsY0FBYyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUNyRSxDQUFDO1FBQ0osQ0FBQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO0FBQ0osQ0FBQyJ9

/***/ }),

/***/ "KZPZ":
/*!******************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/fetch.js ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return fetch; });
/* harmony import */ var _statusOk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statusOk */ "udrx");

function fetch(options) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open(options.method, options.url, true);
        if (options.timeoutMs) {
            xhr.timeout = options.timeoutMs;
        }
        var headers = options.headers || {};
        Object.keys(headers).map(function (key) {
            xhr.setRequestHeader(key, headers[key]);
        });
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (Object(_statusOk__WEBPACK_IMPORTED_MODULE_0__["default"])(xhr.status)) {
                    resolve(xhr);
                }
                else {
                    reject(xhr);
                }
            }
        };
        xhr.onerror = function () {
            reject(xhr);
        };
        xhr.ontimeout = function () {
            reject(xhr);
        };
        var body = options.body || null;
        xhr.send(body);
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmV0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sWUFBWSxDQUFDO0FBVWxDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsS0FBSyxDQUFDLE9BQXNCO0lBQ2xELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNqQyxJQUFNLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTVDLElBQUksT0FBTyxDQUFDLFNBQVMsRUFBRTtZQUNyQixHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUM7U0FDakM7UUFFRCxJQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLEdBQUc7WUFDMUIsR0FBRyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxNQUFNLEdBQUc7WUFDWCxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZDtxQkFBTTtvQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ2I7YUFDRjtRQUNILENBQUMsQ0FBQztRQUVGLEdBQUcsQ0FBQyxPQUFPLEdBQUc7WUFDWixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDZCxDQUFDLENBQUM7UUFFRixHQUFHLENBQUMsU0FBUyxHQUFHO1lBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsQ0FBQyxDQUFDO1FBRUYsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7UUFDbEMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMifQ==

/***/ }),

/***/ "LB0u":
/*!************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/withMonitor.js ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return withMonitor; });
/* harmony import */ var _headerUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./headerUtils */ "t6xg");
/* harmony import */ var _withBasicMonitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./withBasicMonitor */ "pogW");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var defaultMonitorType = "prefetch_request";
function withMonitor(_a, promiseFactory) {
    var monitorName = _a.monitorName, _b = _a.monitorType, monitorType = _b === void 0 ? defaultMonitorType : _b, additionalSuccessPropsExtractor = _a.additionalSuccessPropsExtractor;
    return Object(_withBasicMonitor__WEBPACK_IMPORTED_MODULE_1__["default"])({
        monitorName: monitorName,
        monitorType: monitorType,
        successPropExtractor: function (_a) {
            var xhr = _a.xhr, tokenAttemptCount = _a.tokenAttemptCount, tokenFetchDuration = _a.tokenFetchDuration, cacheItemResolved = _a.cacheItemResolved, cacheItemType = _a.cacheItemType;
            return __assign({}, getResponseHeaders(xhr), (tokenAttemptCount
                ? {
                    tokenAttemptCount: tokenAttemptCount,
                    tokenFetchDuration: Math.round(tokenFetchDuration)
                }
                : {}), { cacheItemResolved: cacheItemResolved,
                cacheItemType: cacheItemType }, ((additionalSuccessPropsExtractor &&
                additionalSuccessPropsExtractor(xhr)) ||
                {}));
        },
        failurePropExtractor: function (error) {
            return __assign({}, getResponseHeaders(error), { errorCode: error.status });
        }
    }, function (options) {
        return typeof options === "undefined"
            ? Promise.reject("undefined options")
            : promiseFactory(options);
    });
}
function getResponseHeaders(xhr) {
    if (!xhr || !xhr.getAllResponseHeaders) {
        return {};
    }
    var xhrHeaders = Object(_headerUtils__WEBPACK_IMPORTED_MODULE_0__["getNamedHeadersFromXhr"])(xhr, [
        _headerUtils__WEBPACK_IMPORTED_MODULE_0__["spRequestDurationHeader"],
        _headerUtils__WEBPACK_IMPORTED_MODULE_0__["spClientServiceRequestDurationHeader"],
        _headerUtils__WEBPACK_IMPORTED_MODULE_0__["sharePointCorrelationHeader"]
    ]);
    // Map the request duration header back to the existing logged name
    // 'sprequestduration'.
    var headers = {};
    headers[_headerUtils__WEBPACK_IMPORTED_MODULE_0__["sharePointCorrelationHeader"]] =
        xhrHeaders[_headerUtils__WEBPACK_IMPORTED_MODULE_0__["sharePointCorrelationHeader"]];
    headers[_headerUtils__WEBPACK_IMPORTED_MODULE_0__["spRequestDurationHeader"]] =
        xhrHeaders[_headerUtils__WEBPACK_IMPORTED_MODULE_0__["spRequestDurationHeader"]] ||
            xhrHeaders[_headerUtils__WEBPACK_IMPORTED_MODULE_0__["spClientServiceRequestDurationHeader"]] ||
            undefined;
    return headers;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aE1vbml0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd2l0aE1vbml0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQ0wsc0JBQXNCLEVBQ3RCLDJCQUEyQixFQUMzQixvQ0FBb0MsRUFDcEMsdUJBQXVCLEVBQ3hCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sZ0JBQWdCLE1BQU0sb0JBQW9CLENBQUM7QUFJbEQsSUFBTSxrQkFBa0IsR0FBZ0Isa0JBQWtCLENBQUM7QUFFM0QsTUFBTSxDQUFDLE9BQU8sVUFBVSxXQUFXLENBQ2pDLEVBSWtCLEVBQ2xCLGNBQTBDO1FBSnhDLDRCQUFXLEVBQ1gsbUJBQWdDLEVBQWhDLHFEQUFnQyxFQUNoQyxvRUFBK0I7SUFJakMsT0FBTyxnQkFBZ0IsQ0FDckI7UUFDRSxXQUFXLGFBQUE7UUFDWCxXQUFXLGFBQUE7UUFDWCxvQkFBb0IsRUFBcEIsVUFBcUIsRUFNcEI7Z0JBTEMsWUFBRyxFQUNILHdDQUFpQixFQUNqQiwwQ0FBa0IsRUFDbEIsd0NBQWlCLEVBQ2pCLGdDQUFhO1lBRWIsb0JBQ0ssa0JBQWtCLENBQUMsR0FBRyxDQUFDLEVBQ3ZCLENBQUMsaUJBQWlCO2dCQUNuQixDQUFDLENBQUM7b0JBQ0UsaUJBQWlCLG1CQUFBO29CQUNqQixrQkFBa0IsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDO2lCQUNuRDtnQkFDSCxDQUFDLENBQUMsRUFBRSxDQUFDLElBQ1AsaUJBQWlCLG1CQUFBO2dCQUNqQixhQUFhLGVBQUEsSUFDVixDQUFDLENBQUMsK0JBQStCO2dCQUNsQywrQkFBK0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsRUFBRSxDQUFDLEVBQ0w7UUFDSixDQUFDO1FBRUQsb0JBQW9CLEVBQXBCLFVBQXFCLEtBQUs7WUFDeEIsb0JBQ0ssa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQzVCLFNBQVMsRUFBRSxLQUFLLENBQUMsTUFBTSxJQUN2QjtRQUNKLENBQUM7S0FDRixFQUVELFVBQUEsT0FBTztRQUNMLE9BQUEsT0FBTyxPQUFPLEtBQUssV0FBVztZQUM1QixDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztZQUNyQyxDQUFDLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQztJQUYzQixDQUUyQixDQUM5QixDQUFDO0FBQ0osQ0FBQztBQThCRCxTQUFTLGtCQUFrQixDQUN6QixHQUEwQjtJQUUxQixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFO1FBQ3RDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxJQUFNLFVBQVUsR0FBOEIsc0JBQXNCLENBQUMsR0FBRyxFQUFFO1FBQ3hFLHVCQUF1QjtRQUN2QixvQ0FBb0M7UUFDcEMsMkJBQTJCO0tBQzVCLENBQUMsQ0FBQztJQUVILG1FQUFtRTtJQUNuRSx1QkFBdUI7SUFDdkIsSUFBTSxPQUFPLEdBQTBDLEVBQUUsQ0FBQztJQUMxRCxPQUFPLENBQUMsMkJBQTJCLENBQUM7UUFDbEMsVUFBVSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDMUMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO1FBQzlCLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQztZQUNuQyxVQUFVLENBQUMsb0NBQW9DLENBQUM7WUFDaEQsU0FBUyxDQUFDO0lBRVosT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyJ9

/***/ }),

/***/ "RN4B":
/*!************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/withRefresh.js ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: withRefresh, startQos */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withRefresh", function() { return withRefresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startQos", function() { return startQos; });
/* harmony import */ var _msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @msfast/search-dispatcher/lib/dispatcher */ "bpGp");
/* harmony import */ var _tokenDetail__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tokenDetail */ "S2wq");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


function withRefresh(apiName, tokenProvider) {
    // initialize to an invalid token
    var latestAuthTokenDetails = null;
    var isRefreshActive = false;
    var refreshedTokenPromise;
    var getRefreshedToken = function () {
        if (!isRefreshActive) {
            // if there isn't already an active refresh request, create one
            isRefreshActive = true;
            refreshedTokenPromise = tokenProvider({ attempt: 1 })
                .then(function (token) {
                latestAuthTokenDetails = Object(_tokenDetail__WEBPACK_IMPORTED_MODULE_1__["toTokenDetail"])(token);
                isRefreshActive = false;
                return token;
            })
                .catch(function (error) {
                isRefreshActive = false;
                throw error;
            });
        }
        return refreshedTokenPromise;
    };
    return function (tokenProviderSpec, logProperties, shouldLog) {
        if (shouldLog === void 0) { shouldLog = true; }
        var stopQos = shouldLog
            ? startQos(apiName + "_withRefresh")
            : startQosNoop();
        if (!tokenProvider) {
            stopQos("FAILURE", __assign({ cacheItemResolved: false, tokenProviderNull: true }, logProperties));
            return Promise.reject("token provider is null");
        }
        if (!latestAuthTokenDetails ||
            !Object(_tokenDetail__WEBPACK_IMPORTED_MODULE_1__["isValid"])(latestAuthTokenDetails) ||
            tokenProviderSpec.attempt > 0) {
            // if the token we have is invalid, we need to fetch a new one.
            // likewise if this is a second attempt, whatever is cached must not work
            return getRefreshedToken()
                .then(function (token) {
                stopQos("SUCCESS", __assign({ cacheItemResolved: false, expires: latestAuthTokenDetails &&
                        new Date(latestAuthTokenDetails.expEpoch), didRefresh: true }, logProperties));
                return token;
            })
                .catch(function (error) {
                stopQos("FAILURE", __assign({ cacheItemResolved: false, tokenProviderNull: false }, logProperties));
                throw error.reason || error;
            });
        }
        var shouldBackgroundRefreshToken = Object(_tokenDetail__WEBPACK_IMPORTED_MODULE_1__["isApproachingExpiration"])(latestAuthTokenDetails);
        if (shouldBackgroundRefreshToken) {
            // the token will be expiring soon so begin a new background fetch,
            // but we will still return the value we have
            getRefreshedToken();
        }
        stopQos("SUCCESS", __assign({ cacheItemResolved: true, expires: latestAuthTokenDetails && new Date(latestAuthTokenDetails.expEpoch), backgroundRefresh: shouldBackgroundRefreshToken }, logProperties));
        return Promise.resolve(latestAuthTokenDetails.token);
    };
}
function startQosNoop() {
    return function () {
        return;
    };
}
/**
 * Dispatches a QOSSTART event, returning a function which will dispatch a
 * corresponding QOSSTOP event.
 */
function startQos(nameDetail) {
    var eventName = "generic_qos";
    var startTime = performance.now();
    var d = Object(_msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__["getDispatcher"])();
    d.dispatch({
        name: eventName,
        nameDetail: nameDetail,
        timestamp: startTime,
        eventType: "QOSSTART"
    });
    return function (result, properties, error) {
        var endTime = performance.now();
        d.dispatch({
            name: eventName,
            nameDetail: nameDetail,
            startTimestamp: startTime,
            totalTime: endTime - startTime,
            eventType: "QOSSTOP",
            result: result,
            properties: { customLogProps: JSON.stringify(properties) },
            error: error
        });
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aFJlZnJlc2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd2l0aFJlZnJlc2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFPekUsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixPQUFPLEVBRVAsYUFBYSxFQUNkLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE1BQU0sVUFBVSxXQUFXLENBQ3pCLE9BQWUsRUFDZixhQUE0QjtJQU01QixpQ0FBaUM7SUFDakMsSUFBSSxzQkFBc0IsR0FBeUIsSUFBSSxDQUFDO0lBQ3hELElBQUksZUFBZSxHQUFZLEtBQUssQ0FBQztJQUNyQyxJQUFJLHFCQUFzQyxDQUFDO0lBRTNDLElBQU0saUJBQWlCLEdBQUc7UUFDeEIsSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUNwQiwrREFBK0Q7WUFDL0QsZUFBZSxHQUFHLElBQUksQ0FBQztZQUV2QixxQkFBcUIsR0FBRyxhQUFhLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2xELElBQUksQ0FBQyxVQUFBLEtBQUs7Z0JBQ1Qsc0JBQXNCLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUM5QyxlQUFlLEdBQUcsS0FBSyxDQUFDO2dCQUN4QixPQUFPLEtBQUssQ0FBQztZQUNmLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQSxLQUFLO2dCQUNWLGVBQWUsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLE1BQU0sS0FBSyxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUVELE9BQU8scUJBQXFCLENBQUM7SUFDL0IsQ0FBQyxDQUFDO0lBRUYsT0FBTyxVQUNMLGlCQUFxQyxFQUNyQyxhQUE2QixFQUM3QixTQUF5QjtRQUF6QiwwQkFBQSxFQUFBLGdCQUF5QjtRQUV6QixJQUFNLE9BQU8sR0FBRyxTQUFTO1lBQ3ZCLENBQUMsQ0FB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

/***/ }),

/***/ "S2wq":
/*!************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/tokenDetail.js ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: toTokenDetail, isApproachingExpiration, isValid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toTokenDetail", function() { return toTokenDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isApproachingExpiration", function() { return isApproachingExpiration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValid", function() { return isValid; });
/* harmony import */ var _Base64Url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base64Url */ "Am70");

function toTokenDetail(token) {
    var expEpoch = Number.MAX_VALUE;
    var userPuid;
    var tokenizedJwtToken = token && token.split(".");
    if (tokenizedJwtToken && tokenizedJwtToken.length === 3) {
        var payload = JSON.parse(Object(_Base64Url__WEBPACK_IMPORTED_MODULE_0__["decode"])(tokenizedJwtToken[1]));
        if (payload && payload.exp) {
            expEpoch = payload.exp * 1000;
        }
        if (payload && payload.puid) {
            userPuid = payload.puid;
        }
    }
    return { token: token, expEpoch: expEpoch, userPuid: userPuid };
}
function isApproachingExpiration(tokenDetails) {
    if (!isValid(tokenDetails)) {
        return false;
    }
    var TOKEN_LIFETIME_APPROACHING_EXPIRATION_BUFFER = 4 * 60 * 1000; /* 4m */
    return (Date.now() >
        tokenDetails.expEpoch - TOKEN_LIFETIME_APPROACHING_EXPIRATION_BUFFER);
}
function isValid(tokenDetails) {
    var TOKEN_LIFETIME_BUFFER = 2 * 60 * 1000; /* 2m */
    // Deem token invalid if token does not exist,
    // it has expired or if it is very close to expiring
    if (!tokenDetails) {
        return false;
    }
    var isNearlyExpired = tokenDetails.expEpoch - Date.now() < TOKEN_LIFETIME_BUFFER;
    return !isNearlyExpired;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5EZXRhaWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdG9rZW5EZXRhaWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGFBQWEsQ0FBQztBQVFyQyxNQUFNLFVBQVUsYUFBYSxDQUFDLEtBQWE7SUFDekMsSUFBSSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQztJQUNoQyxJQUFJLFFBQVEsQ0FBQztJQUNiLElBQU0saUJBQWlCLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEQsSUFBSSxpQkFBaUIsSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3ZELElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6RCxJQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO1lBQzFCLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztTQUMvQjtRQUVELElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFDM0IsUUFBUSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDekI7S0FDRjtJQUNELE9BQU8sRUFBRSxLQUFLLE9BQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxRQUFRLFVBQUEsRUFBRSxDQUFDO0FBQ3ZDLENBQUM7QUFFRCxNQUFNLFVBQVUsdUJBQXVCLENBQUMsWUFBMkI7SUFDakUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUMxQixPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsSUFBTSw0Q0FBNEMsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVE7SUFDNUUsT0FBTyxDQUNMLElBQUksQ0FBQyxHQUFHLEVBQUU7UUFDVixZQUFZLENBQUMsUUFBUSxHQUFHLDRDQUE0QyxDQUNyRSxDQUFDO0FBQ0osQ0FBQztBQUVELE1BQU0sVUFBVSxPQUFPLENBQUMsWUFBMkI7SUFDakQsSUFBTSxxQkFBcUIsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLFFBQVE7SUFFckQsOENBQThDO0lBQzlDLG9EQUFvRDtJQUNwRCxJQUFJLENBQUMsWUFBWSxFQUFFO1FBQ2pCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxJQUFNLGVBQWUsR0FDbkIsWUFBWSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcscUJBQXFCLENBQUM7SUFDN0QsT0FBTyxDQUFDLGVBQWUsQ0FBQztBQUMxQixDQUFDIn0=

/***/ }),

/***/ "Xqy8":
/*!*************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/promiseCache.js ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: getPromise, getOrCreateCache, getCache, setCache, getPromotedStorageCacheItems, savePromise, setCacheItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPromise", function() { return getPromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getOrCreateCache", function() { return getOrCreateCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCache", function() { return getCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCache", function() { return setCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPromotedStorageCacheItems", function() { return getPromotedStorageCacheItems; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "savePromise", function() { return savePromise; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCacheItem", function() { return setCacheItem; });
/* harmony import */ var _serializeKey__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serializeKey */ "pMsu");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "rzB3");
/* harmony import */ var _storageCache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./storageCache */ "anYl");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};



/**
 * Gets a Promise from the cache, potentially loading data from storage.
 *
 * @param cacheId A unique identifier for the cache.
 * @param cacheVersion The version of the cache.
 * @param cacheItemKey A unique identifier for the cache item.
 */
function getPromise(cacheId, cacheVersion, puid, cacheItemKey) {
    if (cacheItemKey === void 0) { cacheItemKey = {}; }
    var serializedKey = Object(_serializeKey__WEBPACK_IMPORTED_MODULE_0__["default"])(cacheItemKey);
    var item = getOrCreateCache(cacheId, cacheVersion, puid).cacheItems[serializedKey];
    if (item) {
        if (Date.now() < item.expiryTime) {
            var cacheItemResolved_1 = item.cacheItemResolved;
            return item.value.then(function (v) { return (__assign({}, v, { cacheItemType: item.cacheItemType, cacheItemResolved: cacheItemResolved_1 })); });
        }
        else {
            removePromise(cacheId, serializedKey);
        }
    }
    return null;
}
var getOrCreateCache = function getOrCreateCache(cacheId, cacheVersion, puid) {
    Object(_storageCache__WEBPACK_IMPORTED_MODULE_2__["assertPuid"])(puid);
    var cache = getCache(cacheId);
    if (cache && cache.puid !== puid) {
        cache = null;
    }
    return (cache ||
        setCache(cacheId, {
            puid: puid,
            cacheItems: getPromotedStorageCacheItems(cacheId, cacheVersion, puid) || {}
        }));
};
var getCache = function getCache(cacheId) {
    return Object(_state__WEBPACK_IMPORTED_MODULE_1__["cache"])().caches[cacheId];
};
var setCache = function setCache(cacheId, newCache) {
    return (Object(_state__WEBPACK_IMPORTED_MODULE_1__["cache"])().caches[cacheId] = newCache);
};
function getPromotedStorageCacheItems(cacheId, cacheVersion, puid) {
    var storageCache = Object(_storageCache__WEBPACK_IMPORTED_MODULE_2__["getCache"])(cacheId, cacheVersion, puid);
    if (!storageCache) {
        return null;
    }
    var cacheItems = storageCache.cacheItems;
    var emptyCache = {};
    return Object.keys(cacheItems).reduce(function (cache, cacheItemKey) { return ((cache[cacheItemKey] = {
        value: Promise.resolve({
            xhr: {
                responseText: cacheItems[cacheItemKey].value,
                status: cacheItems[cacheItemKey].status || 0
            }
        }),
        expiryTime: cacheItems[cacheItemKey].expiryTime,
        cacheItemType: "storage",
        cacheItemResolved: true
    }),
        cache); }, emptyCache);
}
function removePromise(id, serializedKey) {
    if (!Object(_state__WEBPACK_IMPORTED_MODULE_1__["cache"])().caches[id]) {
        return null;
    }
    return (Object(_state__WEBPACK_IMPORTED_MODULE_1__["cache"])().caches[id].cacheItems[serializedKey] = null);
}
/**
 * Adds a Promise into an in-memory cache. The value produced by the Promise
 * is propagated into storage. The Promise is removed from the cache if it
 * rejects. After the given refresh interval has elapsed, the Promise and
 * storage cache items are invalidated.
 *
 * @param cacheId A unique identifier for the cache type, upon which versioning
 * is enforced.
 * @param cacheVersion The version of the cache type. If a cache access is
 * performed on the id with a different version, the cache entries for that
 * type are invalidated
 * @param cacheItemLifeTime Represents the number of milliseconds since the
 * save was initiated to when the cache entry should be invalidated.
 * @param cacheItemValue The Promise to cache.
 * @param cacheItemKey A unique identifier for the cache item, only one item is
 * cached for a given id + key pair.
 */
function savePromise(_a, puid, cacheItemValue, cacheItemKey) {
    var cacheId = _a.cacheId, cacheVersion = _a.cacheVersion, cacheItemLifetime = _a.cacheItemLifetime;
    if (cacheItemKey === void 0) { cacheItemKey = {}; }
    Object(_storageCache__WEBPACK_IMPORTED_MODULE_2__["assertPuid"])(puid);
    var serializedKey = Object(_serializeKey__WEBPACK_IMPORTED_MODULE_0__["default"])(cacheItemKey);
    var cacheItems = getOrCreateCache(cacheId, cacheVersion, puid).cacheItems;
    var cacheItem = setCacheItem(cacheItems, serializedKey, {
        value: cacheItemValue,
        expiryTime: Date.now() + cacheItemLifetime,
        cacheItemType: "memory",
        cacheItemResolved: false
    });
    return cacheItemValue.then(function (wrappedXhr) { return (setCacheItem(cacheItems, serializedKey, __assign({}, cacheItem, { cacheItemResolved: true })),
        Object(_storageCache__WEBPACK_IMPORTED_MODULE_2__["saveValue"])(cacheId, cacheVersion, puid, serializedKey, wrappedXhr.xhr.responseText, cacheItem.expiryTime, wrappedXhr.xhr.status), __assign({}, wrappedXhr, { cacheItemResolved: false, cacheItemType: null })); }, function (e) {
        removePromise(cacheId, serializedKey); // Don't cache a rejected promise.
        throw e;
    });
}
var setCacheItem = function setCacheItem(cacheItems, serializedKey, cacheItem) {
    return (cacheItems[serializedKey] = cacheItem);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvbWlzZUNhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3Byb21pc2VDYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLE9BQU8sWUFBWSxNQUFNLGdCQUFnQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxLQUFLLEVBQXFDLE1BQU0sU0FBUyxDQUFDO0FBQ25FLE9BQU8sRUFDTCxVQUFVLEVBQ1YsUUFBUSxJQUFJLGVBQWUsRUFDM0IsU0FBUyxFQUNWLE1BQU0sZ0JBQWdCLENBQUM7QUFLeEI7Ozs7OztHQU1HO0FBQ0gsTUFBTSxVQUFVLFVBQVUsQ0FDeEIsT0FBZSxFQUNmLFlBQW9CLEVBQ3BCLElBQVksRUFDWixZQUEyQjtJQUEzQiw2QkFBQSxFQUFBLGlCQUEyQjtJQUUzQixJQUFNLGFBQWEsR0FBRyxZQUFZLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDakQsSUFBTSxJQUFJLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQ25FLGFBQWEsQ0FDZCxDQUFDO0lBRUYsSUFBSSxJQUFJLEVBQUU7UUFDUixJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2hDLElBQU0sbUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO1lBQ2pELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxjQUN0QixDQUFTLElBQ2IsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQ2pDLGlCQUFpQixxQkFBQSxJQUNqQixFQUowQixDQUkxQixDQUFDLENBQUM7U0FDTDthQUFNO1lBQ0wsYUFBYSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztTQUN2QztLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDO0FBT0QsTUFBTSxDQUFDLElBQU0sZ0JB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

/***/ }),

/***/ "anYl":
/*!*************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/storageCache.js ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: getCache, getStorage, saveValue, assertPuid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCache", function() { return getCache; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStorage", function() { return getStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "saveValue", function() { return saveValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assertPuid", function() { return assertPuid; });
/* harmony import */ var _msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @msfast/search-dispatcher/lib/dispatcher */ "bpGp");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "rzB3");


var errorName = "StorageCache";
var storageReadErrorEventEmitted = false;
var storageWriteErrorEventEmitted = false;
var invalidPuidErrorEventEmitted = false;
function getCache(cacheId, cacheVersion, puid) {
    assertPuid(puid);
    var cache;
    var storage = getStorage();
    try {
        var item = storage.getItem(cacheId);
        if (!item) {
            return null;
        }
        cache = JSON.parse(item);
    }
    catch (_a) {
        !storageReadErrorEventEmitted &&
            Object(_msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__["getDispatcher"])().dispatch({
                eventType: "ERROR",
                name: errorName,
                detail: "Failed to read from storage."
            });
        storageReadErrorEventEmitted = true;
        return null;
    }
    if (!cache) {
        return null;
    }
    if (cache.cacheVersion !== cacheVersion) {
        storage.removeItem(cacheId);
        return null;
    }
    if (!cache.puid || cache.puid !== puid) {
        storage.removeItem(cacheId);
        invalidPuidErrorEventEmitted = true;
        !invalidPuidErrorEventEmitted &&
            Object(_msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__["getDispatcher"])().dispatch({
                eventType: "ERROR",
                name: errorName,
                detail: "Invalid puid detected."
            });
        return null;
    }
    return cache;
}
var storage;
var getStorage = function getStorage() {
    return (storage ||
        (storage = {
            getItem: function (key) {
                return sessionStorage.getItem(createKey(key));
            },
            removeItem: function (key) {
                return sessionStorage.removeItem(createKey(key));
            },
            setItem: function (key, value) {
                return sessionStorage.setItem(createKey(key), value);
            }
        }));
};
function createKey(postFix) {
    return "mssearchux-cache-" + postFix;
}
function saveValue(cacheId, cacheVersion, puid, serializedKey, value, expiryTime, status) {
    assertPuid(puid);
    var cache = getCache(cacheId, cacheVersion, puid) || {
        cacheCreationTime: Date.now(),
        cacheVersion: cacheVersion,
        puid: puid,
        cacheItems: {}
    };
    cache.cacheItems[serializedKey] = { value: value, expiryTime: expiryTime, status: status };
    try {
        getStorage().setItem(cacheId, JSON.stringify(cache));
    }
    catch (_a) {
        !storageWriteErrorEventEmitted &&
            Object(_msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__["getDispatcher"])().dispatch({
                eventType: "ERROR",
                name: errorName,
                nameDetail: cacheId,
                detail: "Failed to write to session storage."
            });
        storageWriteErrorEventEmitted = true;
    }
}
function assertPuid(puid) {
    !puid && Object(_state__WEBPACK_IMPORTED_MODULE_1__["thr"])("Puid not set.");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZUNhY2hlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0b3JhZ2VDYWNoZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFDekUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUU5QixJQUFNLFNBQVMsR0FBRyxjQUFjLENBQUM7QUFDakMsSUFBSSw0QkFBNEIsR0FBRyxLQUFLLENBQUM7QUFDekMsSUFBSSw2QkFBNkIsR0FBRyxLQUFLLENBQUM7QUFDMUMsSUFBSSw0QkFBNEIsR0FBRyxLQUFLLENBQUM7QUFFekMsTUFBTSxVQUFVLFFBQVEsQ0FDdEIsT0FBZSxFQUNmLFlBQW9CLEVBQ3BCLElBQVk7SUFFWixVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakIsSUFBSSxLQUFvQixDQUFDO0lBQ3pCLElBQU0sT0FBTyxHQUFpQixVQUFVLEVBQUUsQ0FBQztJQUMzQyxJQUFJO1FBQ0YsSUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ1QsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFCO0lBQUMsV0FBTTtRQUNOLENBQUMsNEJBQTRCO1lBQzNCLGFBQWEsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDdkIsU0FBUyxFQUFFLE9BQU87Z0JBQ2xCLElBQUksRUFBRSxTQUFTO2dCQUNmLE1BQU0sRUFBRSw4QkFBOEI7YUFDdkMsQ0FBQyxDQUFDO1FBRUwsNEJBQTRCLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUksS0FBSyxDQUFDLFlBQVksS0FBSyxZQUFZLEVBQUU7UUFDdkMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1QixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUU7UUFDdEMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM1Qiw0QkFBNEIsR0FBRyxJQUFJLENBQUM7UUFDcEMsQ0FBQyw0QkFBNEI7WUFDM0IsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUN2QixTQUFTLEVBQUUsT0FBTztnQkFDbEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsTUFBTSxFQUFFLHdCQUF3QjthQUNqQyxDQUFDLENBQUM7UUFFTCxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBZUQsSUFBSSxPQUFxQixDQUFDO0FBRTFCLE1BQU0sQ0FBQyxJQUFNLFVBQVUsR0FBRyxTQUFTLFVBQVU7SUFDM0MsT0FBTyxDQUNMLE9BQU87UUFDUCxDQUFDLE9BQU8sR0FBRztZQUNULE9BQU8sRUFBUCxVQUFRLEdBQVc7Z0JBQ2pCLE9BQU8sY0FBYyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoRCxDQUFDO1lBRUQsVUFBVSxFQUFWLFVBQVcsR0FBVztnQkFDcEIsT0FBTyxjQUFjLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ25ELENBQUM7WUFFRCxPQUFPLEVBQVAsVUFBUSxHQUFXLEVBQUUsS0FBYTtnQkFDaEMsT0FBTyxjQUFjLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RCxDQUFDO1NBQ0YsQ0FBQyxDQUNILENBQUM7QUFDSixDQUFDLENBQUM7QUFJRixTQUFTLFNBQVMsQ0FBQyxPQUFlO0lBQ2hDLE9BQU8sc0JBQW9CLE9BQVMsQ0FBQztBQUN2QyxDQUFDO0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FDdkIsT0FBZSxFQUNmLFlBQW9CLEVBQ3BCLElBQVksRUFDWixhQUFxQixFQUNyQixLQUFhLEVBQ2IsVUFBa0IsRUFDbEIsTUFBYztJQUVkLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixJQUFNLEtBQUssR0FBa0IsUUFBUSxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUk7UUFDcEUsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUM3QixZQUFZLGNBQUE7UUFDWixJQUFJLE1BQUE7UUFDSixVQUFVLEVBQUUsRUFBRTtLQUNmLENBQUM7SUFFRixLQUFLLENBQUMsVUFBVSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsS0FBSyxPQUFBLEVBQUUsVUFBVSxZQUFBLEVBQUUsTUFBTSxRQUFBLEVBQUUsQ0FBQztJQUNoRSxJQUFJO1FBQ0YsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7S0FDdEQ7SUFBQyxXQUFNO1FBQ04sQ0FBQyw2QkFBNkI7WUFDNUIsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDO2dCQUN2QixTQUFTLEVBQUUsT0FBTztnQkFDbEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLE1BQU0sRUFBRSxxQ0FBcUM7YUFDOUMsQ0FBQyxDQUFDO1FBRUwsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO0tBQ3RDO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxVQUFVLENBQUMsSUFBWTtJQUNyQyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDaEMsQ0FBQyJ9

/***/ }),

/***/ "biao":
/*!**********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/withToken.js ***!
  \**********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return withToken; });
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
function withToken(promiseFactory) {
    return function (options) {
        var startTime = performance.now();
        return callWithAttempt(0, startTime, options, promiseFactory).catch(function (xhr) {
            return isAuthFailure(xhr)
                ? callWithAttempt(1, startTime, options, promiseFactory).catch(function (xhr) {
                    return failWithDetails(xhr, 2, performance.now() - startTime);
                })
                : Promise.reject(xhr);
        });
    };
}
function isAuthFailure(xhr) {
    return xhr ? xhr.status === 401 || xhr.status === 0 : false;
}
function callWithAttempt(attempt, startTime, options, promiseFactory) {
    if (!options.token && !options.tokenProvider) {
        return Promise.reject(new Error("Token or token provider must be specified."));
    }
    var tokenFetchDuration = -1;
    return options.token
        ? promiseFactory(__assign({}, options, { token: options.token })).then(function (xhr) { return ({
            tokenAttemptCount: 0,
            tokenFetchDuration: 0,
            xhr: xhr
        }); })
        : options
            .tokenProvider({ attempt: attempt })
            .then(function (token) { return ((tokenFetchDuration = performance.now() - startTime),
            promiseFactory(__assign({}, options, { token: token }))); })
            .then(function (xhr) { return ({
            tokenAttemptCount: attempt + 1,
            tokenFetchDuration: tokenFetchDuration,
            xhr: xhr
        }); });
}
function failWithDetails(xhr, tokenAttemptCount, tokenFetchDuration) {
    if (isAuthFailure(xhr)) {
        var error = xhr;
        error.tokenAttemptCount = tokenAttemptCount;
        error.tokenFetchDuration = tokenFetchDuration;
        throw error;
    }
    throw xhr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aFRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3dpdGhUb2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQWVBLE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUMvQixjQUFpQztJQUlqQyxPQUFPLFVBQ0wsT0FBK0I7UUFFL0IsSUFBTSxTQUFTLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ3BDLE9BQU8sZUFBZSxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUc7WUFDckUsT0FBQSxhQUFhLENBQUMsR0FBRyxDQUFDO2dCQUNoQixDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFBLEdBQUc7b0JBQzlELE9BQUEsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztnQkFBdEQsQ0FBc0QsQ0FDdkQ7Z0JBQ0gsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBSnZCLENBSXVCLENBQ2pCLENBQUM7SUFDWCxDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsR0FBbUI7SUFDeEMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDOUQsQ0FBQztBQWFELFNBQVMsZUFBZSxDQUN0QixPQUFlLEVBQ2YsU0FBaUIsRUFDakIsT0FBK0IsRUFDL0IsY0FBaUM7SUFFakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFO1FBQzVDLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FDbkIsSUFBSSxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FDeEQsQ0FBQztLQUNIO0lBQ0QsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM1QixPQUFPLE9BQU8sQ0FBQyxLQUFLO1FBQ2xCLENBQUMsQ0FBQyxjQUFjLGNBQU8sT0FBZSxJQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFHLENBQUMsSUFBSSxDQUNoRSxVQUFBLEdBQUcsSUFBSSxPQUFBLENBQUM7WUFDTixpQkFBaUIsRUFBRSxDQUFDO1lBQ3BCLGtCQUFrQixFQUFFLENBQUM7WUFDckIsR0FBRyxLQUFBO1NBQ0osQ0FBQyxFQUpLLENBSUwsQ0FDSDtRQUNILENBQUMsQ0FBQyxPQUFPO2FBQ0osYUFBYSxDQUFDLEVBQUUsT0FBTyxTQUFBLEVBQUUsQ0FBQzthQUMxQixJQUFJLENBQ0gsVUFBQSxLQUFLLElBQUksT0FBQSxDQUNQLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLFNBQVMsQ0FBQztZQUNwRCxjQUFjLGNBQU8sT0FBZSxJQUFFLEtBQUssT0FBQSxJQUFHLENBQy9DLEVBSFEsQ0FHUixDQUNGO2FBRUEsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQUEsQ0FBQztZQUNaLGlCQUFpQixFQUFFLE9BQU8sR0FBRyxDQUFDO1lBQzlCLGtCQUFrQixvQkFBQTtZQUNsQixHQUFHLEtBQUE7U0FDSixDQUFDLEVBSlcsQ0FJWCxDQUFDLENBQUM7QUFDWixDQUFDO0FBZUQsU0FBUyxlQUFlLENBQ3RCLEdBQW1CLEVBQ25CLGlCQUF5QixFQUN6QixrQkFBMEI7SUFFMUIsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdEIsSUFBTSxLQUFLLEdBR1AsR0FBRyxDQUFDO1FBQ1IsS0FBSyxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO1FBQzVDLEtBQUssQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM5QyxNQUFNLEtBQUssQ0FBQztLQUNiO0lBRUQsTUFBTSxHQUFHLENBQUM7QUFDWixDQUFDIn0=

/***/ }),

/***/ "i+Tk":
/*!************************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/fetchSharePointDigestv2.js ***!
  \************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetch */ "KZPZ");
/* harmony import */ var _fetcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetcher */ "lcbe");
var __assign = (undefined && undefined.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};


var name = "fetchSharepointDigest";
var hasOverrideDigestBeenUsed = false;
/* harmony default export */ __webpack_exports__["default"] = (Object(_fetcher__WEBPACK_IMPORTED_MODULE_1__["default"])(function fetchSharePointDigest(_a) {
    var endpoint = _a.endpoint, token = _a.token, overrideDigest = _a.overrideDigest;
    if (overrideDigest && !hasOverrideDigestBeenUsed) {
        hasOverrideDigestBeenUsed = true;
        return new Promise(function (resolve) {
            // tslint:disable-next-line:no-object-literal-type-assertion
            var digestResponse = {
                responseText: JSON.stringify({
                    d: { GetContextWebInformation: { FormDigestValue: overrideDigest } }
                })
            };
            resolve(digestResponse);
        });
    }
    else {
        return Object(_fetch__WEBPACK_IMPORTED_MODULE_0__["default"])({
            url: endpoint + "/_api/contextinfo",
            method: "POST",
            headers: __assign({ Accept: "application/json;odata=verbose", "Content-Type": "application/json;odata=verbose" }, (token ? { Authorization: "Bearer " + token } : {})),
            timeoutMs: 5000
        });
    }
}, {
    monitorName: name,
    cacheId: name,
    cacheVersion: "0",
    // 30 min timeout value gotten from
    // sts/stsom/Administration/SPCanary.cs
    // Subtract 10 seconds to keep digest current
    cacheItemLifetime: 30 * 60 * 1000 - 10000,
    cacheKeyExtractor: function (options) { return ({
        url: options.endpoint
    }); }
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hTaGFyZVBvaW50RGlnZXN0djIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZmV0Y2hTaGFyZVBvaW50RGlnZXN0djIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUssTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxPQUEwQixNQUFNLFdBQVcsQ0FBQztBQUVuRCxJQUFNLElBQUksR0FBVyx1QkFBdUIsQ0FBQztBQUM3QyxJQUFJLHlCQUF5QixHQUFZLEtBQUssQ0FBQztBQUUvQyxlQUFlLE9BQU8sQ0FDcEIsU0FBUyxxQkFBcUIsQ0FBQyxFQUlHO1FBSGhDLHNCQUFRLEVBQ1IsZ0JBQUssRUFDTCxrQ0FBYztJQUVkLElBQUksY0FBYyxJQUFJLENBQUMseUJBQXlCLEVBQUU7UUFDaEQseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBQSxPQUFPO1lBQ3hCLDREQUE0RDtZQUM1RCxJQUFNLGNBQWMsR0FBbUI7Z0JBQ3JDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUMzQixDQUFDLEVBQUUsRUFBRSx3QkFBd0IsRUFBRSxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsRUFBRTtpQkFDckUsQ0FBQzthQUNlLENBQUM7WUFDcEIsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQyxDQUFDO0tBQ0o7U0FBTTtRQUNMLE9BQU8sS0FBSyxDQUFDO1lBQ1gsR0FBRyxFQUFLLFFBQVEsc0JBQW1CO1lBQ25DLE1BQU0sRUFBRSxNQUFNO1lBQ2QsT0FBTyxhQUNMLE1BQU0sRUFBRSxnQ0FBZ0MsRUFDeEMsY0FBYyxFQUFFLGdDQUFnQyxJQUM3QyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxhQUFhLEVBQUUsWUFBVSxLQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQ3ZEO1lBQ0QsU0FBUyxFQUFFLElBQUk7U0FDaEIsQ0FBQyxDQUFDO0tBQ0o7QUFDSCxDQUFDLEVBQ0Q7SUFDRSxXQUFXLEVBQUUsSUFBSTtJQUNqQixPQUFPLEVBQUUsSUFBSTtJQUNiLFlBQVksRUFBRSxHQUFHO0lBQ2pCLG1DQUFtQztJQUNuQyx1Q0FBdUM7SUFDdkMsNkNBQTZDO0lBQzdDLGlCQUFpQixFQUFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxHQUFHLEtBQUs7SUFDekMsaUJBQWlCLEVBQUUsVUFBQyxPQUF3QyxJQUFLLE9BQUEsQ0FBQztRQUNoRSxHQUFHLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDdEIsQ0FBQyxFQUYrRCxDQUUvRDtDQUNILENBQ0YsQ0FBQyJ9

/***/ }),

/***/ "lcbe":
/*!********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/fetcher.js ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return fetcher; });
/* harmony import */ var _withCache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./withCache */ "JcTZ");
/* harmony import */ var _withMonitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./withMonitor */ "LB0u");
/* harmony import */ var _withToken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./withToken */ "biao");



function fetcher(fetch, options) {
    return Object(_withMonitor__WEBPACK_IMPORTED_MODULE_1__["default"])(options, Object(_withCache__WEBPACK_IMPORTED_MODULE_0__["default"])(Object(_withToken__WEBPACK_IMPORTED_MODULE_2__["default"])(fetch))(options));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9mZXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sU0FBNkMsTUFBTSxhQUFhLENBQUM7QUFDeEUsT0FBTyxXQUFnQyxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLFNBSU4sTUFBTSxhQUFhLENBQUM7QUFFckIsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQzdCLEtBQThDLEVBQzlDLE9BQTJDO0lBSTNDLE9BQU8sV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUNwRSxDQUFDIn0=

/***/ }),

/***/ "pMsu":
/*!*************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/serializeKey.js ***!
  \*************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return serializeKey; });
function serializeKey(key) {
    if (!isObject(key)) {
        throw new Error("Key argument must be an object.");
    }
    var propKeys = Object.keys(key).sort();
    var numPropKeys = propKeys.length;
    var keyParts = [];
    for (var i = 0; i < numPropKeys; i++) {
        var propKey = propKeys[i];
        var val = key[propKey];
        if (val !== undefined && !isObject(val) && !isFunc(val)) {
            keyParts.push(propKey + ":" + val);
        }
    }
    return keyParts.join(",");
}
function isObject(x) {
    return typeof x === "object" && x !== null;
}
function isFunc(func) {
    return typeof func === "function";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplS2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlcmlhbGl6ZUtleS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLENBQUMsT0FBTyxVQUFVLFlBQVksQ0FBQyxHQUFhO0lBQ2hELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ3BEO0lBQ0QsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QyxJQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO0lBQ3BDLElBQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3BDLElBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QixJQUFNLEdBQUcsR0FBYSxHQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFM0MsSUFBSSxHQUFHLEtBQUssU0FBUyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNwQztLQUNGO0lBQ0QsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxDQUFVO0lBQzFCLE9BQU8sT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUM7QUFDN0MsQ0FBQztBQUVELFNBQVMsTUFBTSxDQUFDLElBQWE7SUFDM0IsT0FBTyxPQUFPLElBQUksS0FBSyxVQUFVLENBQUM7QUFDcEMsQ0FBQyJ9

/***/ }),

/***/ "pogW":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/withBasicMonitor.js ***!
  \*****************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return withBasicMonitor; });
/* harmony import */ var _msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @msfast/search-dispatcher/lib/dispatcher */ "bpGp");

function withBasicMonitor(_a, promiseFactory) {
    var monitorType = _a.monitorType, monitorName = _a.monitorName, monitorOnce = _a.monitorOnce, successPropExtractor = _a.successPropExtractor, failurePropExtractor = _a.failurePropExtractor;
    var invoked = false;
    return function monitor(options) {
        if (monitorOnce && invoked) {
            return promiseFactory(options);
        }
        invoked = true;
        var timestamp = Math.round(performance.now());
        var dispatcher = Object(_msfast_search_dispatcher_lib_dispatcher__WEBPACK_IMPORTED_MODULE_0__["getDispatcher"])();
        dispatcher.dispatch({
            eventType: "QOSSTART",
            name: monitorType,
            nameDetail: monitorName,
            timestamp: timestamp
        });
        function stopEvent(result, properties) {
            dispatcher.dispatch({
                eventType: "QOSSTOP",
                name: monitorType,
                result: result,
                nameDetail: monitorName,
                startTimestamp: timestamp,
                totalTime: Math.round(performance.now()) - timestamp,
                properties: properties
            });
        }
        var res;
        try {
            res = promiseFactory(options);
        }
        catch (e) {
            stopEvent("FAILURE", { promiseFactoryFailed: true });
            return Promise.reject(e);
        }
        return res.then(function (response) { return (stopEvent("SUCCESS", tryExtract(response, successPropExtractor, {
            successExtractorFailed: true
        })),
            response); }, function (error) { return (stopEvent("FAILURE", tryExtract(error, failurePropExtractor, {
            failureExtractorFailed: true
        })),
            Promise.reject(error)); });
    };
}
var tryExtract = function (res, extractor, defaultRes) {
    try {
        return (extractor || defaultExtractor)(res);
    }
    catch (_a) {
        return defaultRes;
    }
};
var defaultExtractor = function () { return ({}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aEJhc2ljTW9uaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93aXRoQmFzaWNNb25pdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxhQUFhLEVBRWQsTUFBTSwwQ0FBMEMsQ0FBQztBQW1CbEQsTUFBTSxDQUFDLE9BQU8sVUFBVSxnQkFBZ0IsQ0FDdEMsRUFNcUIsRUFDckIsY0FBMkM7UUFOekMsNEJBQVcsRUFDWCw0QkFBVyxFQUNYLDRCQUFXLEVBQ1gsOENBQW9CLEVBQ3BCLDhDQUFvQjtJQUl0QixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDcEIsT0FBTyxTQUFTLE9BQU8sQ0FBQyxPQUFXO1FBQ2pDLElBQUksV0FBVyxJQUFJLE9BQU8sRUFBRTtZQUMxQixPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUNoQztRQUVELE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDZixJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELElBQU0sVUFBVSxHQUEwQixhQUFhLEVBQUUsQ0FBQztRQUMxRCxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLElBQUksRUFBRSxXQUFXO1lBQ2pCLFVBQVUsRUFBRSxXQUFXO1lBQ3ZCLFNBQVMsV0FBQTtTQUNWLENBQUMsQ0FBQztRQUVILFNBQVMsU0FBUyxDQUFDLE1BQXNCLEVBQUUsVUFBZTtZQUN4RCxVQUFVLENBQUMsUUFBUSxDQUFDO2dCQUNsQixTQUFTLEVBQUUsU0FBUztnQkFDcEIsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLE1BQU0sUUFBQTtnQkFDTixVQUFVLEVBQUUsV0FBVztnQkFDdkIsY0FBYyxFQUFFLFNBQVM7Z0JBQ3pCLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLFNBQVM7Z0JBQ3BELFVBQVUsWUFBQTthQUNYLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxJQUFJLEdBQTJCLENBQUM7UUFDaEMsSUFBSTtZQUNGLEdBQUcsR0FBRyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0I7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLFNBQVMsQ0FBQyxTQUFTLEVBQUUsRUFBRSxvQkFBb0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQ3JELE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUMxQjtRQUVELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FDYixVQUFDLFFBQVcsSUFBSyxPQUFBLENBQ2YsU0FBUyxDQUNQLFNBQVMsRUFDVCxVQUFVLENBQUMsUUFBUSxFQUFFLG9CQUFvQixFQUFFO1lBQ3pDLHNCQUFzQixFQUFFLElBQUk7U0FDN0IsQ0FBQyxDQUNIO1lBQ0QsUUFBUSxDQUNULEVBUmdCLENBUWhCLEVBRUQsVUFBQyxLQUFVLElBQUssT0FBQSxDQUNkLFNBQVMsQ0FDUCxTQUFTLEVBQ1QsVUFBVSxDQUFDLEtBQUssRUFBRSxvQkFBb0IsRUFBRTtZQUN0QyxzQkFBc0IsRUFBRSxJQUFJO1NBQzdCLENBQUMsQ0FDSDtZQUNELE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQ3RCLEVBUmUsQ0FRZixDQUNGLENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBRUQsSUFBTSxVQUFVLEdBQUcsVUFDakIsR0FBTyxFQUNQLFNBQXlDLEVBQ3pDLFVBQWM7SUFFZCxJQUFJO1FBQ0YsT0FBTyxDQUFDLFNBQVMsSUFBSSxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzdDO0lBQUMsV0FBTTtRQUNOLE9BQU8sVUFBVSxDQUFDO0tBQ25CO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsSUFBTSxnQkFBZ0IsR0FBRyxjQUFNLE9BQUEsQ0FBQyxFQUFFLENBQUMsRUFBSixDQUFJLENBQUMifQ==

/***/ }),

/***/ "rzB3":
/*!******************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/state.js ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: BUILD_VERSION, init, thr, puid, cache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "init", function() { return init; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "thr", function() { return thr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "puid", function() { return puid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cache", function() { return cache; });
/* harmony import */ var _version__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./version */ "u+2X");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BUILD_VERSION", function() { return _version__WEBPACK_IMPORTED_MODULE_0__["BUILD_VERSION"]; });



var state;
/**
 * Initializes the prefetch library with the specified state.
 *
 * @param initialState The initial state of the prefetch library.
 */
function init(initialState) {
    (state && thr("Can not set initial state more than once.")) ||
        (initialState.cache.participants.push(_version__WEBPACK_IMPORTED_MODULE_0__["BUILD_VERSION"]),
            (state = initialState));
}
/**
 * Throws an error with the specified message.
 *
 * @param msg The error message.
 */
function thr(msg) {
    throw new Error(msg);
}
var puid = getter("puid");
var cache = getter("cache");
function getter(prop) {
    return function () {
        return (state && state[prop]) || thr("Trying to get " + prop + " before it is set.");
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUcxQyxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUM7QUFFekIsSUFBSSxLQUF1QyxDQUFDO0FBRTVDOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsSUFBSSxDQUFDLFlBQWtDO0lBQ3JELENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO1FBQ3pELENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUNwRCxDQUFDLEtBQUssR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFFRDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLEdBQUcsQ0FBQyxHQUFXO0lBQzdCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUVELE1BQU0sQ0FBQyxJQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkMsTUFBTSxDQUFDLElBQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUVyQyxTQUFTLE1BQU0sQ0FDYixJQUFPO0lBRVAsT0FBTztRQUNMLE9BQUEsQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLG1CQUFpQixJQUFJLHVCQUFvQixDQUFDO0lBQXhFLENBQXdFLENBQUM7QUFDN0UsQ0FBQyJ9

/***/ }),

/***/ "t6xg":
/*!************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/headerUtils.js ***!
  \************************************************************************************************************************************************************************************/
/*! exports provided: spRequestDurationHeader, spClientServiceRequestDurationHeader, sharePointCorrelationHeader, getNamedHeadersFromXhr, getRequestDurationFromXhr, getRequestDurationFromHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spRequestDurationHeader", function() { return spRequestDurationHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "spClientServiceRequestDurationHeader", function() { return spClientServiceRequestDurationHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sharePointCorrelationHeader", function() { return sharePointCorrelationHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNamedHeadersFromXhr", function() { return getNamedHeadersFromXhr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRequestDurationFromXhr", function() { return getRequestDurationFromXhr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRequestDurationFromHeaders", function() { return getRequestDurationFromHeaders; });
var spRequestDurationHeader = "sprequestduration";
var spClientServiceRequestDurationHeader = "spclientservicerequestduration";
var sharePointCorrelationHeader = "sprequestguid";
function getNamedHeadersFromXhr(xhr, headers) {
    var matchedHeaders = {};
    if (xhr.getAllResponseHeaders) {
        var responseHeaders_1 = xhr.getAllResponseHeaders();
        headers.forEach(function (header) {
            if (xhr.getResponseHeader && responseHeaders_1.indexOf(header) !== -1) {
                matchedHeaders[header] = xhr.getResponseHeader(header) || "";
            }
        });
    }
    return matchedHeaders;
}
function getRequestDurationFromXhr(xhr) {
    var headers = getNamedHeadersFromXhr(xhr, [
        spRequestDurationHeader,
        spClientServiceRequestDurationHeader
    ]);
    return (headers[spRequestDurationHeader] ||
        headers[spClientServiceRequestDurationHeader] ||
        undefined);
}
function getRequestDurationFromHeaders(headers) {
    return (headers[spRequestDurationHeader] ||
        headers[spClientServiceRequestDurationHeader] ||
        "");
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyVXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaGVhZGVyVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBR0EsTUFBTSxDQUFDLElBQU0sdUJBQXVCLEdBQUcsbUJBQW1CLENBQUM7QUFDM0QsTUFBTSxDQUFDLElBQU0sb0NBQW9DLEdBQy9DLGdDQUFnQyxDQUFDO0FBQ25DLE1BQU0sQ0FBQyxJQUFNLDJCQUEyQixHQUFHLGVBQWUsQ0FBQztBQUUzRCxNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLEdBQTRCLEVBQzVCLE9BQWlCO0lBRWpCLElBQU0sY0FBYyxHQUEyQixFQUFFLENBQUM7SUFDbEQsSUFBSSxHQUFHLENBQUMscUJBQXFCLEVBQUU7UUFDN0IsSUFBTSxpQkFBZSxHQUFHLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBQ3BELE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNO1lBQ3BCLElBQUksR0FBRyxDQUFDLGlCQUFpQixJQUFJLGlCQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUNuRSxjQUFjLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUM5RDtRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxPQUFPLGNBQWMsQ0FBQztBQUN4QixDQUFDO0FBRUQsTUFBTSxVQUFVLHlCQUF5QixDQUN2QyxHQUE0QjtJQUU1QixJQUFNLE9BQU8sR0FBRyxzQkFBc0IsQ0FBQyxHQUFHLEVBQUU7UUFDMUMsdUJBQXVCO1FBQ3ZCLG9DQUFvQztLQUNyQyxDQUFDLENBQUM7SUFDSCxPQUFPLENBQ0wsT0FBTyxDQUFDLHVCQUF1QixDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQztRQUM3QyxTQUFTLENBQ1YsQ0FBQztBQUNKLENBQUM7QUFFRCxNQUFNLFVBQVUsNkJBQTZCLENBQUMsT0FFN0M7SUFDQyxPQUFPLENBQ0wsT0FBTyxDQUFDLHVCQUF1QixDQUFDO1FBQ2hDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQztRQUM3QyxFQUFFLENBQ0gsQ0FBQztBQUNKLENBQUMifQ==

/***/ }),

/***/ "tAJN":
/*!********************************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/withPeriodicRefresh.js ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: withPeriodicRefresh */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withPeriodicRefresh", function() { return withPeriodicRefresh; });
/* harmony import */ var _withRefresh__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./withRefresh */ "RN4B");

var defaultRefreshInterval = 5 * 60 * 1000; // 5 minutes
function withPeriodicRefresh(apiName, tokenProvider, refreshIntervalMs) {
    // initialize to an invalid token
    var lastUserInvocation;
    var periodicRefreshId;
    var invocationCounter = 0;
    var refreshTokenProvider = Object(_withRefresh__WEBPACK_IMPORTED_MODULE_0__["withRefresh"])(apiName, tokenProvider);
    return function (tokenProviderSpec) {
        invocationCounter++;
        // If this is the first time this provider fetches a token, register a
        // periodic job to refresh the token at the specified interval
        if (!periodicRefreshId) {
            periodicRefreshId = window.setInterval(function () {
                invocationCounter++;
                var logProperties = {
                    invokedByPeriodicRefresh: true,
                    invocationCounter: invocationCounter
                };
                refreshTokenProvider({ attempt: 0 }, logProperties, false);
                // Stop periodic refresh after one day if user have not interacted
                // with search session in that period.
                var oneDayInMs = 24 * 60 * 60 * 1000;
                if (Date.now() - lastUserInvocation > oneDayInMs) {
                    window.clearInterval(periodicRefreshId);
                    periodicRefreshId = undefined;
                }
            }, refreshIntervalMs || defaultRefreshInterval);
        }
        lastUserInvocation = Date.now();
        var logProperties = {
            invokedByPeriodicRefresh: false,
            invocationCounter: invocationCounter
        };
        return refreshTokenProvider(tokenProviderSpec, logProperties, true);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l0aFBlcmlvZGljUmVmcmVzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93aXRoUGVyaW9kaWNSZWZyZXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFNUMsSUFBTSxzQkFBc0IsR0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLFlBQVk7QUFFbEUsTUFBTSxVQUFVLG1CQUFtQixDQUNqQyxPQUFlLEVBQ2YsYUFBNEIsRUFDNUIsaUJBQTBCO0lBRTFCLGlDQUFpQztJQUNqQyxJQUFJLGtCQUEwQixDQUFDO0lBQy9CLElBQUksaUJBQXFDLENBQUM7SUFDMUMsSUFBSSxpQkFBaUIsR0FBRyxDQUFDLENBQUM7SUFFMUIsSUFBTSxvQkFBb0IsR0FBRyxXQUFXLENBQUMsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBRWpFLE9BQU8sVUFBQyxpQkFBcUM7UUFDM0MsaUJBQWlCLEVBQUUsQ0FBQztRQUNwQixzRUFBc0U7UUFDdEUsOERBQThEO1FBQzlELElBQUksQ0FBQyxpQkFBaUIsRUFBRTtZQUN0QixpQkFBaUIsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO2dCQUNyQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUNwQixJQUFNLGFBQWEsR0FBRztvQkFDcEIsd0JBQXdCLEVBQUUsSUFBSTtvQkFDOUIsaUJBQWlCLG1CQUFBO2lCQUNsQixDQUFDO2dCQUVGLG9CQUFvQixDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFFM0Qsa0VBQWtFO2dCQUNsRSxzQ0FBc0M7Z0JBQ3RDLElBQU0sVUFBVSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDdkMsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsa0JBQWtCLEdBQUcsVUFBVSxFQUFFO29CQUNoRCxNQUFNLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7b0JBQ3hDLGlCQUFpQixHQUFHLFNBQVMsQ0FBQztpQkFDL0I7WUFDSCxDQUFDLEVBQUUsaUJBQWlCLElBQUksc0JBQXNCLENBQUMsQ0FBQztTQUNqRDtRQUVELGtCQUFrQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQyxJQUFNLGFBQWEsR0FBRztZQUNwQix3QkFBd0IsRUFBRSxLQUFLO1lBQy9CLGlCQUFpQixtQkFBQTtTQUNsQixDQUFDO1FBQ0YsT0FBTyxvQkFBb0IsQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEUsQ0FBQyxDQUFDO0FBQ0osQ0FBQyJ9

/***/ }),

/***/ "u+2X":
/*!********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/version.js ***!
  \********************************************************************************************************************************************************************************/
/*! exports provided: BUILD_VERSION */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BUILD_VERSION", function() { return BUILD_VERSION; });
var BUILD_VERSION = "1.20191105.6.3";
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy92ZXJzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxJQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyJ9

/***/ }),

/***/ "udrx":
/*!*********************************************************************************************************************************************************************************!*\
  !*** /Users/runner/work/1/s/common/temp/node_modules/.onedrive.pkgs.visualstudio.com/@msfast/search-prefetch/20191105.6.3/node_modules/@msfast/search-prefetch/lib/statusOk.js ***!
  \*********************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return statusOk; });
function statusOk(status) {
    return (status >= 200 && status <= 300) || status === 0;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdHVzT2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhdHVzT2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sVUFBVSxRQUFRLENBQUMsTUFBYztJQUM3QyxPQUFPLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksTUFBTSxLQUFLLENBQUMsQ0FBQztBQUMxRCxDQUFDIn0=

/***/ })

}]);
//# sourceMappingURL=chunk.vendors~sp-suite-nav-search-common_fc1eea2e443c3fa5ba67.js.map