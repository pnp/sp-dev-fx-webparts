/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "../out";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var msFlowError_1 = __webpack_require__(1);
	var approvalCenterWidget_1 = __webpack_require__(2);
	var flowsWidget_1 = __webpack_require__(41);
	var flowsRuntimeWidget_1 = __webpack_require__(42);
	var flowCreationWidget_1 = __webpack_require__(43);
	var templatesWidget_1 = __webpack_require__(44);
	var widget_1 = __webpack_require__(3);
	var MsFlowSdk = (function () {
	    function MsFlowSdk(sdkOption) {
	        this.sdkOption = sdkOption;
	        // validate options
	        if (!this.sdkOption) {
	            throw new msFlowError_1.MsFlowError('Sdk options are required');
	        }
	        if (this.sdkOption.hostName && typeof this.sdkOption.hostName !== 'string') {
	            throw new msFlowError_1.MsFlowError('The host name can only be of type string');
	        }
	        // default value
	        this.sdkOption.hostName = this.sdkOption.hostName || 'https://flow.microsoft.com';
	        this.sdkOption.locale = this.sdkOption.locale || 'en-us';
	    }
	    MsFlowSdk.prototype.renderWidget = function (widgetType, widgetOption) {
	        var widget;
	        switch (widgetType) {
	            case approvalCenterWidget_1.ApprovalCenterWidget.widgetType:
	                widget = new approvalCenterWidget_1.ApprovalCenterWidget(widgetOption, this.sdkOption);
	                break;
	            case flowsRuntimeWidget_1.FlowsRuntimeWidget.widgetType:
	                widget = new flowsRuntimeWidget_1.FlowsRuntimeWidget(widgetOption, this.sdkOption);
	                break;
	            case flowsWidget_1.FlowsWidget.widgetType:
	                widget = new flowsWidget_1.FlowsWidget(widgetOption, this.sdkOption);
	                break;
	            case flowCreationWidget_1.FlowCreationWidget.widgetType:
	                widget = new flowCreationWidget_1.FlowCreationWidget(widgetOption, this.sdkOption);
	                break;
	            case templatesWidget_1.TemplatesWidget.widgetType:
	                widget = new templatesWidget_1.TemplatesWidget(widgetOption, this.sdkOption);
	                break;
	            default:
	                break;
	        }
	        if (!widget) {
	            throw new msFlowError_1.MsFlowError('please provide a valid supported widget type.');
	        }
	        return widget;
	    };
	    return MsFlowSdk;
	}());
	exports.MsFlowSdk = MsFlowSdk;
	/* tslint:disable: no-any */
	window.MsFlowSdk = MsFlowSdk;
	window.WidgetTypes = widget_1.WidgetTypes;
	window.OAuthHandlers = widget_1.OAuthHandlers;
	window.WellKnownHostIds = widget_1.WellKnownHostIds;
	if (window.msFlowSdkLoaded) {
	    window.msFlowSdkLoaded();
	}
	/* tslint:enable: no-any */


/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var MsFlowError = (function (_super) {
	    __extends(MsFlowError, _super);
	    function MsFlowError(message) {
	        _super.call(this, MsFlowError.errorName + ": message");
	        this.message = message;
	        this.name = MsFlowError.errorName;
	    }
	    MsFlowError.errorName = 'MsFlowSdk';
	    return MsFlowError;
	}(Error));
	exports.MsFlowError = MsFlowError;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var widget_1 = __webpack_require__(3);
	var ApprovalCenterWidget = (function (_super) {
	    __extends(ApprovalCenterWidget, _super);
	    function ApprovalCenterWidget(widgetOption, sdkOption) {
	        _super.call(this, widgetOption, sdkOption);
	        this.widgetOption = widgetOption;
	        this.sdkOption = sdkOption;
	    }
	    ApprovalCenterWidget.prototype.getWidgetType = function () {
	        return ApprovalCenterWidget.widgetType;
	    };
	    ApprovalCenterWidget.widgetType = widget_1.WidgetTypes.approvalCenter;
	    return ApprovalCenterWidget;
	}(widget_1.Widget));
	exports.ApprovalCenterWidget = ApprovalCenterWidget;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var SdkHelper = __webpack_require__(4);
	var msFlowError_1 = __webpack_require__(1);
	var utils_1 = __webpack_require__(5);
	var string_1 = __webpack_require__(17);
	var rpc_standalone_1 = __webpack_require__(35);
	var config_1 = __webpack_require__(36);
	var EnvironmentHelper = __webpack_require__(37);
	var RegionalUrlHelper = __webpack_require__(40);
	var SdkSettings_1 = __webpack_require__(38);
	exports.WidgetTypes = {
	    approvalCenter: 'approvalCenter',
	    flowCreation: 'flowCreation',
	    flowsRuntime: 'flowsRuntime',
	    flows: 'flows',
	    templates: 'templates'
	};
	exports.WellKnownHostIds = {
	    DYNAMICS_CRM: 'DynCRM',
	    DYNAMICS_NAV: 'DynNAV',
	    EXCEL: 'Excel',
	    IOT: 'IOT',
	    LOGICAPPS: 'LogicApps',
	    OUTLOOKWEB: 'OWA',
	    POWERAPPS: 'PowerApps',
	    SHAREPOINT: 'SPO',
	    STAFFHUB: 'StaffHub',
	    TEAMS: 'Teams',
	    TREASURY: 'Treasury',
	    WIDGETTEST: 'WidgetTest',
	    UNSPECIFIED: 'Unknown',
	};
	exports.ErrorCodes = {
	    UnlistenedEventCalled: 'UnlistenedEventCalled',
	    InvalidRpcEvent: 'InvalidRpcEvent'
	};
	exports.WidgetHostAction = {
	    FLOW_CREATION_FAILED: 'FLOW_CREATION_FAILED',
	    FLOW_CREATION_SUCCEEDED: 'FLOW_CREATION_SUCCEEDED',
	    GET_ACCESS_TOKEN: 'GET_ACCESS_TOKEN',
	    GET_IMPLICIT_DATA: 'GET_IMPLICIT_DATA',
	    GET_STRINGS: 'GET_STRINGS',
	    SIDE_PANE_VISIBILITY_SET: 'SIDE_PANE_VISIBILITY_SET',
	    LAUNCH_OAUTH_POPUP: 'LAUNCH_OAUTH_POPUP',
	    ON_ADD_CONNECTION_CLICKED: 'ON_ADD_CONNECTION_CLICKED',
	    ON_DELETE_CUSTOM_API_CLICKED: 'ON_DELETE_CUSTOMAPI_CLICKED',
	    RUN_FLOW_CANCEL_BUTTON_CLICKED: 'RUN_FLOW_CANCEL_BUTTON_CLICKED',
	    RUN_FLOW_DONE_BUTTON_CLICKED: 'RUN_FLOW_DONE_BUTTON_CLICKED',
	    RUN_FLOW_STARTED: 'RUN_FLOW_STARTED',
	    RUN_FLOW_COMPLETED: 'RUN_FLOW_COMPLETED',
	    TEMPLATE_LOAD_FAILED: 'TEMPLATE_LOAD_FAILED',
	    WIDGET_CLOSE: 'WIDGET_CLOSE',
	    WIDGET_READY: 'WIDGET_READY',
	    WIDGET_RENDERED: 'WIDGET_RENDERED',
	    RECEIVED_APPROVAL_STATUS_CHANGED: 'RECEIVED_APPROVAL_STATUS_CHANGED',
	    SENT_APPROVAL_STATUS_CHANGED: 'SENT_APPROVAL_STATUS_CHANGED',
	};
	var PathAliasToPath = {
	    myFlows: '/manage{environment}/flows',
	    sharedFlows: '/manage{environment}/flows/shared',
	    receivedApprovals: '/manage{environment}/approvals/received',
	    sentApprovals: '/manage{environment}/approvals/sent',
	    flowCreation: '/manage{environment}/templates/flowCreation',
	    flowsRuntime: '/manage{environment}/flow/run',
	    templates: '/templates'
	};
	exports.PathAliasesByWidgetType = {
	    flows: ['myFlows', 'sharedFlows'],
	    approvalCenter: ['receivedApprovals', 'sentApprovals'],
	    flowCreation: ['flowCreation'],
	    flowsRuntime: ['flowsRuntime'],
	    templates: ['templates']
	};
	exports.OAuthHandlers = {
	    oAuth: 'oAuth',
	    teamsOAuth: 'teamsOAuth',
	    widgetOAuth: 'widgetOAuth'
	};
	var SidePaneVisibilitySetName = 'SIDE_PANE_VISIBILITY_SET';
	var GetAccessTokenMethodName = 'GET_ACCESS_TOKEN';
	var Widget = (function () {
	    function Widget(widgetOption, sdkOption) {
	        this.widgetOption = widgetOption;
	        this.sdkOption = sdkOption;
	        /* tslint:disable: no-any */
	        this.callbacks = {};
	        this.notifyCallback = 'NOTIFY';
	        this.widgetReady = false;
	        if (!this.widgetOption) {
	            throw new msFlowError_1.MsFlowError('Widget requires a widget option.');
	        }
	        if (!this.sdkOption) {
	            throw new msFlowError_1.MsFlowError('Widget requires a sdk option.');
	        }
	        if (this.widgetOption.oAuthHandler &&
	            !string_1.equalsIgnoreCase(this.widgetOption.oAuthHandler, exports.OAuthHandlers.oAuth) &&
	            !string_1.equalsIgnoreCase(this.widgetOption.oAuthHandler, exports.OAuthHandlers.teamsOAuth) &&
	            !string_1.equalsIgnoreCase(this.widgetOption.oAuthHandler, exports.OAuthHandlers.widgetOAuth)) {
	            throw new msFlowError_1.MsFlowError('Invalid OAuth handler specified: ' + this.widgetOption.oAuthHandler);
	        }
	        if (!this.sdkOption.hostName || this.sdkOption.hostName.length < 1) {
	            throw new msFlowError_1.MsFlowError('hostName is required in sdk option.');
	        }
	        if (typeof this.sdkOption.hostName === 'string' && this.sdkOption.hostName.charAt(this.sdkOption.hostName.length - 1) === '/') {
	            this.sdkOption.hostName = this.sdkOption.hostName.substring(0, this.sdkOption.hostName.length - 1);
	        }
	        // If no hostId specified, attempt to derive one from the location
	        if (string_1.isNullOrUndefined(this.sdkOption.hostId)) {
	            this.sdkOption.hostId = this.deriveHostId(document.location);
	        }
	        // validate option
	        if (string_1.isString(this.widgetOption.container)) {
	            this.widgetOption.container = document.getElementById(this.widgetOption.container);
	        }
	        if (!this.widgetOption.container) {
	            throw new msFlowError_1.MsFlowError('Widget requires a container element.');
	        }
	        if (string_1.isNullOrUndefined(this.widgetOption.widgetId)) {
	            this.widgetOption.widgetId = utils_1.uuid();
	        }
	        // allow test domain in debug mode
	        if (widgetOption.debugMode) {
	            Widget.allowedDomains.push(SdkSettings_1.SdkSettings.portalTestDomain);
	        }
	        if (!this.widgetOption.enableRegionalPortal) {
	            this.initializeIframe(this.widgetOption.environmentId, this.sdkOption.hostName);
	        }
	    }
	    /* tslint:disable: no-any */
	    Widget.prototype.notify = function (methodName, actionData) {
	        /* tslint:enable: no-any */
	        var _this = this;
	        if (!this.widgetReady) {
	            return Promise.reject({ code: 'WidgetNotReady', message: 'Notify() called before widget has fired WIDGET_READY' });
	        }
	        /* tslint:disable: no-any */
	        return new Promise(function (resolve, reject) {
	            /* tslint:enable: no-any */
	            var param = _this.createRequestParam();
	            var requestMessage = {
	                actionName: methodName,
	                actionData: actionData
	            };
	            param.data = requestMessage;
	            _this.rpcClient.call(_this.notifyCallback, [param])
	                .then(function (result) {
	                if (result && result.data) {
	                    resolve(result.data);
	                }
	                else {
	                    resolve(null);
	                }
	            })
	                .catch(function (error) {
	                if (error && error.innerException) {
	                    if (error.innerException.data) {
	                        error = error.innerException.data;
	                    }
	                    else {
	                        error = { code: 'UnknownError', message: error.innerException.message };
	                    }
	                }
	                reject(error);
	            });
	        });
	    };
	    /* tslint:disable: no-any */
	    Widget.prototype.listen = function (methodName, callback) {
	        if (!this.callbacks[methodName]) {
	            /* tslint:enable: no-any */
	            this.callbacks[methodName] = callback;
	            if (string_1.equalsIgnoreCase(methodName, GetAccessTokenMethodName) && this.widgetOption.enableRegionalPortal) {
	                this.onGetAccessTokenCallbackAdded();
	            }
	        }
	    };
	    Widget.prototype.dispose = function () {
	        if (this.iframe) {
	            this.widgetOption.container.removeChild(this.iframe);
	            SdkHelper.removeEventListener('message', this.onReceivedMessageHandler);
	        }
	    };
	    Widget.prototype.onGetAccessTokenCallbackAdded = function () {
	        var _this = this;
	        // get access token
	        var callback = this.callbacks[GetAccessTokenMethodName];
	        var authResource = SdkSettings_1.SdkSettings.authResource;
	        if ((string_1.stringIncludes(this.sdkOption.hostName, SdkSettings_1.SdkSettings.govPortalDomain, 0))) {
	            authResource = SdkSettings_1.SdkSettings.govAuthResource;
	        }
	        if (callback) {
	            var requestParam = {
	                data: {
	                    resource: authResource
	                },
	                callInfo: {
	                    widgetId: this.widgetOption.widgetId
	                }
	            };
	            var doneCallback = function (errorResult, successResult) {
	                var accessToken = successResult.token;
	                _this.lookupRegionalPortalUrlAndInitializeIframe(accessToken);
	            };
	            try {
	                callback(requestParam, doneCallback);
	            }
	            catch (e) {
	                throw new Error('failed to get access token');
	            }
	        }
	    };
	    Widget.prototype.lookupRegionalPortalUrlAndInitializeIframe = function (accessToken) {
	        var _this = this;
	        EnvironmentHelper.getEnvironmentInfo(this.sdkOption.hostName, this.widgetOption.environmentId, accessToken)
	            .then(function (environmentInfo) {
	            var regionalPortalUrl = RegionalUrlHelper.getRegionalPortalUrl(environmentInfo.location, _this.sdkOption.hostName);
	            _this.initializeIframe(environmentInfo.name, regionalPortalUrl);
	        })
	            .catch(function (error) {
	            // Fallback to initialization using widget options
	            _this.regionalPortalInitFailed = true;
	            _this.initializeIframe(_this.widgetOption.environmentId, _this.sdkOption.hostName);
	        });
	    };
	    Widget.prototype.initializeIframe = function (environmentName, hostName) {
	        this.sdkOption.hostName = hostName;
	        // update environment only if not passed by the host
	        this.widgetOption.environmentId = this.widgetOption.environmentId || environmentName;
	        this.url = this.constructUrl();
	        this.renderIframe();
	        this.rpcClient = new rpc_standalone_1.Rpc({
	            signature: this.widgetOption.widgetId,
	            targetOrigin: '*',
	            rpcMessageHandler: new rpc_standalone_1.WindowPostMessageRpcHandler({
	                /* tslint:disable: no-any */
	                targetWindow: this.iframe.contentWindow
	            })
	        });
	    };
	    Widget.prototype.createRequestParam = function () {
	        var callInfo = {
	            widgetId: this.widgetOption.widgetId
	        };
	        return {
	            callInfo: callInfo
	        };
	    };
	    Widget.prototype.renderIframe = function () {
	        var _this = this;
	        this.iframe = document.createElement('iframe');
	        this.iframe.setAttribute('src', this.url);
	        this.iframe.setAttribute('id', this.widgetOption.widgetId);
	        this.iframe.setAttribute('name', 'widgetIFrame');
	        this.iframe.setAttribute('tabIndex', '0');
	        this.iframe.setAttribute('allow', 'geolocation');
	        if (this.widgetOption.iframeTitle) {
	            this.iframe.setAttribute('title', this.widgetOption.iframeTitle);
	        }
	        var container = this.widgetOption.container;
	        this.iframe.scrolling = container.getAttribute('data-mswidget-scrolling') || 'yes';
	        container.appendChild(this.iframe);
	        this.onReceivedMessageHandler = function (event) { return _this.onMessageReceived(event); };
	        SdkHelper.addEventListener('message', this.onReceivedMessageHandler, true);
	        this.listen(SidePaneVisibilitySetName, function (event) {
	            _this.iframe.scrolling = event.data && event.data['visible'] ? 'no' : 'auto';
	        });
	    };
	    Widget.prototype.onMessageReceived = function (event) {
	        if (!this.isValidRpcEvent(event)) {
	            var errorObj = {
	                name: exports.ErrorCodes.InvalidRpcEvent,
	                message: 'Widget dropping received message because its RPC event is invalid, event originated from ' + event.origin
	            };
	            if (this.widgetOption.errorHandler) {
	                this.widgetOption.errorHandler(errorObj);
	            }
	            if (this.widgetOption.debugMode) {
	                console.warn(errorObj);
	            }
	            return;
	        }
	        if (!event.data.method) {
	            return;
	        }
	        switch (event.data.method) {
	            case '__PING__':
	                this.rpcAckHandler(event);
	                break;
	            default:
	                this.invokeCallbackHandler(event.data.method, event);
	                break;
	        }
	    };
	    Widget.prototype.isValidRpcEvent = function (event) {
	        var iframeHostName = string_1.endsWithIgnoreCase(event.origin, '/') ? event.origin.replace('/', '') : event.origin;
	        return string_1.equalsIgnoreCase(event.data.signature, this.widgetOption.widgetId) && Widget.allowedDomains.some(function (domain) { return string_1.endsWithIgnoreCase(iframeHostName, domain); });
	    };
	    Widget.prototype.rpcAckHandler = function (event) {
	        var response = {
	            id: event.data.id,
	            signature: event.data.signature,
	            result: '__PONG__',
	            error: null,
	        };
	        event.source.postMessage(response, event.origin);
	    };
	    Widget.prototype.invokeCallbackHandler = function (methodName, event) {
	        var requestParam;
	        if (event && event.data && event.data.params && event.data.params.length > 0) {
	            requestParam = event.data.params[0];
	        }
	        // If handling WIDGET_READY, mark the widget as ready prior
	        // to making any callback to the host
	        if (methodName === exports.WidgetHostAction.WIDGET_READY) {
	            this.setIsReady();
	        }
	        var callback = this.callbacks[methodName];
	        var response = {
	            id: event.data.id,
	            signature: event.data.signature,
	        };
	        if (callback) {
	            var doneCallback = function (errorResult, successResult) {
	                response.result = successResult;
	                response.error = errorResult;
	                event.source.postMessage(response, event.origin);
	            };
	            try {
	                callback(requestParam, doneCallback);
	            }
	            catch (e) {
	                // if client throw an error
	                response.error = e;
	                event.source.postMessage(response, event.origin);
	            }
	        }
	        else {
	            // the host is not listening for this event so we must throw an error to allow widget's promise to complete
	            response.error = {
	                value: {
	                    name: exports.ErrorCodes.UnlistenedEventCalled,
	                    message: "Event '" + methodName + "' is not being listened for by the host"
	                }
	            };
	            event.source.postMessage(response, event.origin);
	        }
	    };
	    Widget.prototype.constructUrl = function () {
	        return ("" + this.constructBaseUrl() + this.getWidgetPath() + this.constructWidgetQueryString())
	            .replace('{environment}', !this.widgetOption.environmentId ? '' : "/environments/" + this.widgetOption.environmentId);
	    };
	    Widget.prototype.setIsReady = function () {
	        this.widgetReady = true;
	    };
	    /* tslint:disable: no-any */
	    Widget.prototype.getRpcClient = function () {
	        /* tslint:enable: no-any */
	        return this.rpcClient;
	    };
	    Widget.prototype.constructBaseUrl = function () {
	        if (typeof this.sdkOption.hostName === 'string') {
	            return this.sdkOption.hostName + "/" + this.sdkOption.locale + "/widgets";
	        }
	        else {
	            return this.sdkOption.hostName[0] + "/" + this.sdkOption.locale + "/widgets";
	        }
	    };
	    Widget.prototype.constructBaseQueryString = function () {
	        var queryString = ("?widgetId=" + this.widgetOption.widgetId) +
	            ("&sdkVersion=" + config_1.config.version) +
	            ("&widgetType=" + this.getWidgetType()) +
	            "&utm_medium=widget" +
	            ("&utm_source=" + this.sdkOption.hostId);
	        if (this.widgetOption.campaign) {
	            queryString += "&utm_campaign=" + this.widgetOption.campaign;
	        }
	        if (this.widgetOption.visibleHideKeys) {
	            queryString += "&visibleHideKeys=" + this.widgetOption.visibleHideKeys;
	        }
	        if (!!this.widgetOption.environmentId) {
	            queryString += "&environment=" + this.widgetOption.environmentId;
	        }
	        if (!!this.widgetOption.solutionId) {
	            queryString += "&solutionId=" + this.widgetOption.solutionId;
	        }
	        // only put the switch into the query string if the user explicitly specified it, thus deferring to flow portal
	        // (server or client) on the decision of what the default should be if it was not specified
	        if (!string_1.isNullOrUndefined(this.widgetOption.enableOnBehalfOfTokens)) {
	            queryString += "&enableOnBehalfOfTokens=" + this.widgetOption.enableOnBehalfOfTokens;
	        }
	        if (!string_1.isNullOrUndefined(this.widgetOption.groupId)) {
	            queryString += "&groupId=" + this.widgetOption.groupId;
	        }
	        if (!string_1.isNullOrUndefined(this.widgetOption.enableRegionalPortal)) {
	            queryString += "&enableRegionalPortal=" + this.widgetOption.enableRegionalPortal;
	        }
	        if (!string_1.isNullOrUndefined(this.widgetOption.enableWidgetV2)) {
	            queryString += "&enableWidgetV2=" + this.widgetOption.enableWidgetV2;
	        }
	        if (string_1.isNullOrUndefined(this.widgetOption.oAuthHandler)) {
	            this.widgetOption.oAuthHandler = exports.OAuthHandlers.oAuth;
	        }
	        queryString += "&oAuthHandler=" + this.widgetOption.oAuthHandler;
	        return queryString;
	    };
	    Widget.prototype.constructHideTabsQueryParam = function (hideTabsWidgetOption) {
	        // if the caller did not specify this value we are intentionally setting it false in order to provide the client
	        // with a guarantee that the default value remain constant unless they take on a new version of jssdk
	        return (hideTabsWidgetOption === true)
	            ? "&hideTabs=" + hideTabsWidgetOption
	            : "&hideTabs=false";
	    };
	    Widget.prototype.constructWidgetQueryString = function () {
	        var queryString = this.constructBaseQueryString();
	        if (this.widgetOption.widgetStyleSettings) {
	            queryString += this.getDynamicParamsUrl(this.widgetOption.widgetStyleSettings);
	        }
	        if (this.widgetOption.flowsSettings) {
	            if (this.widgetOption.flowsSettings.createFromBlankTemplateId) {
	                queryString += "&defaultTemplate=" + this.widgetOption.flowsSettings.createFromBlankTemplateId;
	            }
	            if (this.widgetOption.flowsSettings.flowsFilter) {
	                var encodedFlowsFilter = "&encodedFlowsFilter=" + encodeURIComponent(btoa(this.widgetOption.flowsSettings.flowsFilter));
	                queryString += encodedFlowsFilter;
	            }
	            queryString += this.constructHideTabsQueryParam(this.widgetOption.flowsSettings.hideTabs);
	            if (this.widgetOption.flowsSettings.isMini) {
	                queryString += "&isMini=true";
	            }
	            if (this.widgetOption.flowsSettings.hideFlowCreation) {
	                queryString += "&hideFlowCreation=true";
	            }
	            if (this.widgetOption.flowsSettings.enableBusinessProcessFlow) {
	                queryString += "&enableBusinessProcessFlow=true";
	            }
	        }
	        if (this.widgetOption.approvalCenterSettings) {
	            queryString += this.constructHideTabsQueryParam(this.widgetOption.approvalCenterSettings.hideTabs);
	            if (this.widgetOption.approvalCenterSettings.approvalsFilter) {
	                var encodedApprovalsFilter = "&approvalsFilter=" + encodeURIComponent(this.widgetOption.approvalCenterSettings.approvalsFilter);
	                queryString += encodedApprovalsFilter;
	            }
	            if (this.widgetOption.approvalCenterSettings.autoNavigateToDetails) {
	                queryString += "&autoNavigateToDetails=true";
	            }
	            if (this.widgetOption.approvalCenterSettings.hideInfoPaneCloseButton) {
	                queryString += "&hideInfoPaneCloseButton=true";
	            }
	            if (this.widgetOption.approvalCenterSettings.hideFlowCreation) {
	                queryString += "&hideFlowCreation=true";
	            }
	            if (this.widgetOption.approvalCenterSettings.showSimpleEmptyPage) {
	                queryString += "&showSimpleEmptyPage=true";
	            }
	            if (this.widgetOption.approvalCenterSettings.hideLink) {
	                queryString += "&hideLink=true";
	            }
	            if (this.widgetOption.approvalCenterSettings.showApprovalHistory) {
	                queryString += "&showApprovalHistory=true";
	            }
	        }
	        if (this.widgetOption.templatesSettings) {
	            if (this.widgetOption.templatesSettings.defaultParams) {
	                queryString += this.getDynamicParamsUrl(this.widgetOption.templatesSettings.defaultParams);
	            }
	            ;
	            if (this.widgetOption.templatesSettings.destination) {
	                queryString += "&destination=" + this.widgetOption.templatesSettings.destination;
	            }
	            if (this.widgetOption.templatesSettings.templateCategory) {
	                queryString += "&category=" + this.widgetOption.templatesSettings.templateCategory;
	            }
	            if (this.widgetOption.templatesSettings.metadataSortProperty) {
	                queryString += "&metadataSortProperty=" + this.widgetOption.templatesSettings.metadataSortProperty;
	            }
	            if (this.widgetOption.templatesSettings.pageSize) {
	                queryString += "&pageSize=" + this.widgetOption.templatesSettings.pageSize;
	            }
	            if (this.widgetOption.templatesSettings.useServerSideProvisioning) {
	                queryString += "&useServerSideProvisioning=" + this.widgetOption.templatesSettings.useServerSideProvisioning;
	            }
	            if (this.widgetOption.templatesSettings.searchTerm) {
	                queryString += "&q=" + this.widgetOption.templatesSettings.searchTerm;
	            }
	            if (this.widgetOption.templatesSettings.showGoBack) {
	                queryString += "&showGoBack=true";
	            }
	            if (this.widgetOption.templatesSettings.enableWidgetCloseOnFlowSave) {
	                queryString += "&enableWidgetCloseOnFlowSave=" + this.widgetOption.templatesSettings.enableWidgetCloseOnFlowSave;
	            }
	            if (this.widgetOption.templatesSettings.enableDietDesigner) {
	                queryString += "&enableDietDesigner=" + this.widgetOption.templatesSettings.enableDietDesigner;
	            }
	            if (this.widgetOption.templatesSettings.allowCustomFlowName) {
	                queryString += "&allowCustomFlowName=" + this.widgetOption.templatesSettings.allowCustomFlowName;
	            }
	            if (this.widgetOption.templatesSettings.showCreateFromBlank) {
	                queryString += "&showCreateFromBlank=true";
	            }
	            if (this.widgetOption.templatesSettings.showHiddenTemplates) {
	                queryString += "&showHiddenTemplates=true";
	            }
	            if (this.widgetOption.templatesSettings.oneClickCategory) {
	                queryString += "&oneClickCategory=" + this.widgetOption.templatesSettings.oneClickCategory;
	            }
	        }
	        if (this.widgetOption.runtimeSettings) {
	            queryString += this.getDynamicParamsUrl(this.widgetOption.runtimeSettings);
	        }
	        queryString += "&pathAlias=" + this.getWidgetPathAlias();
	        if (this.regionalPortalInitFailed) {
	            queryString += '&regionalPortalInitFailed=true';
	        }
	        if (this.widgetOption.historyDisabled) {
	            queryString += '&historyDisabled=true';
	        }
	        /** This must always be true going forward. Need the flag to allow the widget to decide whether or not to call
	         *  events which may or may not be listened for by the host. Without this branching logic on the widget side,
	         *  the widget would hang for hosts which are not listening for the optional event and are using an old sdk version.
	         */
	        queryString += '&allowOptionalEvents=true';
	        return queryString;
	    };
	    Widget.prototype.getWidgetPathAlias = function () {
	        var widgetTab;
	        switch (this.getWidgetType()) {
	            case exports.WidgetTypes.flows:
	                widgetTab = this.widgetOption.flowsSettings ? this.widgetOption.flowsSettings.tab : null;
	                break;
	            case exports.WidgetTypes.approvalCenter:
	                widgetTab = this.widgetOption.approvalCenterSettings ? this.widgetOption.approvalCenterSettings.tab : null;
	                break;
	            default:
	                break;
	        }
	        // note widget type has already been validated, so if tabPathsForType comes back null it is a bug in our code for which it is appropriate to null ref
	        var pathAliases = exports.PathAliasesByWidgetType[this.getWidgetType()];
	        if (widgetTab && pathAliases.indexOf(widgetTab) === -1) {
	            throw new msFlowError_1.MsFlowError("Please provide a valid widget tab identifier for the specified widget type. "
	                + ("Widget type '" + this.getWidgetType() + "' does not support tab '" + widgetTab + "'. Supported tabs for ")
	                + ("this widget type are: '" + JSON.stringify(pathAliases) + "'."));
	        }
	        return !widgetTab ? pathAliases[0] : widgetTab;
	    };
	    Widget.prototype.getWidgetPath = function () {
	        return PathAliasToPath[this.getWidgetPathAlias()];
	    };
	    /* tslint:disable: no-any */
	    Widget.prototype.getDynamicParamsUrl = function (dynamicParams) {
	        /* tslint:enable: no-any */
	        var dynamicParamsUrl = '';
	        if (Object.keys(dynamicParams).length > 0) {
	            try {
	                dynamicParamsUrl = '&' + Object.keys(dynamicParams).map(function (k) {
	                    return encodeURIComponent(k) + '=' + encodeURIComponent(dynamicParams[k]);
	                }).join('&');
	            }
	            catch (e) {
	                throw new Error('Failed to create url params out of dynamic params data. Exception: ' + e);
	            }
	        }
	        return dynamicParamsUrl;
	    };
	    Widget.prototype.deriveHostId = function (location) {
	        if (string_1.isNullOrUndefined(location) ||
	            string_1.isNullOrUndefined(location.pathname) ||
	            string_1.isNullOrUndefined(location.hostname)) {
	            return exports.WellKnownHostIds.UNSPECIFIED;
	        }
	        var pathname = location.pathname.toLowerCase();
	        var hostname = location.hostname.toLowerCase();
	        var crmRegex = /crm[\d]+\.dynamics.com/;
	        if (string_1.endsWithIgnoreCase(hostname, '.powerapps.com')) {
	            return exports.WellKnownHostIds.POWERAPPS;
	        }
	        else if (string_1.endsWithIgnoreCase(hostname, '.sharepoint.com') || string_1.endsWithIgnoreCase(hostname, '.sharepoint-df.com') || string_1.endsWithIgnoreCase(hostname, 'msft.spoppe.com')) {
	            return exports.WellKnownHostIds.SHAREPOINT;
	        }
	        else if (string_1.endsWithIgnoreCase(hostname, '.financials.dynamics.com')) {
	            return exports.WellKnownHostIds.DYNAMICS_NAV;
	        }
	        else if (string_1.endsWithIgnoreCase(hostname, '.crm.dynamics.com') || string_1.endsWithIgnoreCase(hostname, 'crmdynint.com') || crmRegex.exec(hostname)) {
	            return exports.WellKnownHostIds.DYNAMICS_CRM;
	        }
	        else if (string_1.endsWithIgnoreCase(hostname, 'outlook.office.com') || string_1.endsWithIgnoreCase(hostname, 'outlook-sdf.office.com')) {
	            return exports.WellKnownHostIds.OUTLOOKWEB;
	        }
	        else if (string_1.endsWithIgnoreCase(hostname, '.flow.microsoft.com') || string_1.endsWithIgnoreCase(hostname, 'dev.azure-flows.net')) {
	            return exports.WellKnownHostIds.WIDGETTEST;
	        }
	        else if (string_1.endsWithIgnoreCase(hostname, '.hosting.portal.azure.net')) {
	            return exports.WellKnownHostIds.LOGICAPPS;
	        }
	        else if (string_1.endsWithIgnoreCase(hostname, '.azureiotcentral-dev.com') || string_1.endsWithIgnoreCase(hostname, 'azureiotcentral.com')) {
	            return exports.WellKnownHostIds.IOT;
	        }
	        else if (string_1.endsWithIgnoreCase(hostname, 'staffhub.office.com') || string_1.endsWithIgnoreCase(hostname, 'staffhub.ms')) {
	            return exports.WellKnownHostIds.STAFFHUB;
	        }
	        else if (string_1.endsWithIgnoreCase(hostname, 'bankadmin.azurewebsites.net') ||
	            string_1.endsWithIgnoreCase(hostname, 'maui-uat.azurewebsites.net') ||
	            string_1.endsWithIgnoreCase(hostname, 'maui-int.azurewebsites.net')) {
	            return exports.WellKnownHostIds.TREASURY;
	        }
	        else if (pathname.indexOf('widgethosts/teams') >= 0) {
	            return exports.WellKnownHostIds.TEAMS;
	        }
	        else if (pathname.indexOf('widgethosts/excel') >= 0) {
	            return exports.WellKnownHostIds.EXCEL;
	        }
	        return exports.WellKnownHostIds.UNSPECIFIED;
	    };
	    Widget.widgetPrefix = 'msflowsdk';
	    Widget.allowedDomains = [SdkSettings_1.SdkSettings.portalDomain, SdkSettings_1.SdkSettings.govPortalDomain];
	    return Widget;
	}());
	exports.Widget = Widget;


/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	function addEventListener(eventName, callback, capture) {
	    if (window.addEventListener) {
	        window.addEventListener(eventName, callback, capture);
	    }
	    else {
	        // to support other browser
	        /* tslint:disable: no-any */
	        window.attachEvent(eventName, callback);
	    }
	}
	exports.addEventListener = addEventListener;
	function removeEventListener(eventName, callback, capture) {
	    if (window.removeEventListener) {
	        window.removeEventListener(eventName, callback, capture);
	    }
	    else {
	        // to support other browser
	        /* tslint:disable: no-any */
	        window.detactEvent(eventName, callback);
	    }
	}
	exports.removeEventListener = removeEventListener;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	var date = __webpack_require__(6);
	exports.date = date;
	var json = __webpack_require__(9);
	exports.json = json;
	var object = __webpack_require__(12);
	exports.object = object;
	var string = __webpack_require__(17);
	exports.string = string;
	var url = __webpack_require__(25);
	exports.url = url;
	__export(__webpack_require__(33));
	__export(__webpack_require__(34));
	//# sourceMappingURL=index.js.map

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(7));
	__export(__webpack_require__(8));
	//# sourceMappingURL=index.js.map

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Get ISO formatted date time string for the given timestamp
	 * @arg timestamp {Date} - Date object for the given timestamp
	 * @return {string} - Formatted value for the fiven timestamp
	 */
	function toISOString(timestamp) {
	    var result = '';
	    if (timestamp.hasOwnProperty('toISOString')) {
	        result = timestamp.toISOString();
	    }
	    else {
	        var year = timestamp.getUTCFullYear(), month = format(timestamp.getUTCMonth() + 1, 2), day = format(timestamp.getUTCDate(), 2), hours = format(timestamp.getUTCHours(), 2), minutes = format(timestamp.getUTCMinutes(), 2), seconds = format(timestamp.getUTCSeconds(), 2), milliseconds = format(timestamp.getUTCMilliseconds(), 3);
	        result = year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds + "." + milliseconds + "Z";
	    }
	    return result;
	}
	exports.toISOString = toISOString;
	/**
	 * Pads the current month/date/hours/minutes/seconds/milliseconds with 0s
	 * @arg value {number} - the current value for month/date/time
	 * @arg length {number} - the required length of the month/date/time string
	 * @return {string} - Formatted month/date/time according to the length specified
	 */
	function format(value, length) {
	    var formattedValue = "" + value, currentLength = formattedValue.length;
	    for (var i = currentLength; i < length; i++) {
	        formattedValue = "0" + formattedValue;
	    }
	    return formattedValue;
	}
	//# sourceMappingURL=toISOString.js.map

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	function getDate(value) {
	    if (!value) {
	        return null;
	    }
	    return new Date(value);
	}
	exports.getDate = getDate;
	//# sourceMappingURL=getDate.js.map

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(10));
	__export(__webpack_require__(11));
	//# sourceMappingURL=index.js.map

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	function prettyStringify(obj, tabs) {
	    var existingValues = [];
	    var circularDependencyResolver = function (key, value) {
	        if (value !== null && typeof value === 'object') {
	            if (existingValues.indexOf(value) >= 0) {
	                return;
	            }
	            existingValues.push(value);
	        }
	        return value;
	    };
	    return obj ? JSON.stringify(obj, circularDependencyResolver, tabs ? '\t' : 4) : '';
	}
	exports.prettyStringify = prettyStringify;
	//# sourceMappingURL=prettyStringify.js.map

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var object_1 = __webpack_require__(12);
	function stableStringify(obj) {
	    if (object_1.isObject(obj)) {
	        if (typeof obj.toJSON === 'function') {
	            obj = obj.toJSON();
	        }
	        var keyValuePairs = [];
	        for (var key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                keyValuePairs.push({ key: key, value: obj[key] });
	            }
	        }
	        keyValuePairs.sort(function (keyValuePair, otherKeyValuePair) {
	            return keyValuePair.key < otherKeyValuePair.key ? -1 : 1;
	        });
	        var keyValuePairsAsJsonStrings = keyValuePairs.map(function (keyValuePair) {
	            return ("\"" + keyValuePair.key + "\":") + stableStringify(keyValuePair.value);
	        });
	        return '{' + keyValuePairsAsJsonStrings.join(',') + '}';
	    }
	    if (Array.isArray(obj)) {
	        if (typeof obj.toJSON === 'function') {
	            obj = obj.toJSON();
	        }
	        var arrayValuesAsJsonStrings = obj.map(function (value) {
	            return stableStringify(value);
	        });
	        return '[' + arrayValuesAsJsonStrings.join(',') + ']';
	    }
	    return JSON.stringify(obj);
	}
	exports.stableStringify = stableStringify;
	//# sourceMappingURL=stableStringify.js.map

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(13));
	__export(__webpack_require__(14));
	__export(__webpack_require__(15));
	__export(__webpack_require__(16));
	//# sourceMappingURL=index.js.map

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	function forEach(obj, callback, thisArg) {
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            callback.call(thisArg, { key: key, value: obj[key] });
	        }
	    }
	}
	exports.forEach = forEach;
	//# sourceMappingURL=forEach.js.map

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";
	/* tslint:disable: no-any */
	function getEnumValue(e, key) {
	    /* tslint:enable: no-any */
	    return e[key];
	}
	exports.getEnumValue = getEnumValue;
	//# sourceMappingURL=getEnumValue.js.map

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	function isObject(value) {
	    return !!(value && typeof value === 'object' && !(value instanceof Date) && !(value instanceof RegExp) && !Array.isArray(value));
	}
	exports.isObject = isObject;
	//# sourceMappingURL=isObject.js.map

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var forEach_1 = __webpack_require__(13);
	function map(obj, callback, thisArg) {
	    var result = [];
	    forEach_1.forEach(obj, function (kvp) {
	        var mappedValue = callback.call(thisArg, kvp);
	        if (mappedValue !== null && mappedValue !== undefined) {
	            result.push(mappedValue);
	        }
	    });
	    return result;
	}
	exports.map = map;
	//# sourceMappingURL=map.js.map

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(18));
	__export(__webpack_require__(19));
	__export(__webpack_require__(20));
	__export(__webpack_require__(21));
	__export(__webpack_require__(22));
	__export(__webpack_require__(23));
	__export(__webpack_require__(24));
	//# sourceMappingURL=index.js.map

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	function equalsIgnoreCase(str, otherStr) {
	    str = ('' + str).toUpperCase();
	    otherStr = ('' + otherStr).toUpperCase();
	    return str === otherStr;
	}
	exports.equalsIgnoreCase = equalsIgnoreCase;
	//# sourceMappingURL=equalsIgnoreCase.js.map

/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	function format() {
	    var args = Array.prototype.slice.apply(arguments);
	    var formatTemplate = args[0] || '';
	    var params = args.slice(1);
	    var namedFormatRegex = /\{[a-zA-Z$_\d]*\}/g;
	    var numberedFormatRegex = /\{(\d+)\}/g;
	    var formatted;
	    var matched = false;
	    // Match named params
	    if (params && params.length === 1 && params[0] && typeof params[0] === 'object') {
	        var namedParams_1 = params[0];
	        formatted = formatTemplate.replace(namedFormatRegex, function (match) {
	            var name = match.substring(1, match.length - 1);
	            if (namedParams_1.hasOwnProperty(name)) {
	                matched = true;
	                return namedParams_1[name];
	            }
	            else {
	                return match;
	            }
	        });
	    }
	    // Match numbered params
	    if (!matched) {
	        formatted = formatTemplate.replace(numberedFormatRegex, function (match, num) {
	            return args[num] !== undefined ? args[num] : match;
	        });
	    }
	    return formatted;
	}
	exports.format = format;
	//# sourceMappingURL=format.js.map

/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Returns true if a value is null or undefined.
	 * @arg value {any} - The value to check if null or undefined.
	 * @return {boolean} - True if the value is null or undefined.
	 */
	/* tslint:disable: no-any */
	function isNullOrUndefined(value) {
	    /* tslint:enable: no-any */
	    return value === null || value === undefined;
	}
	exports.isNullOrUndefined = isNullOrUndefined;
	//# sourceMappingURL=isNullOrUndefined.js.map

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var equalsIgnoreCase_1 = __webpack_require__(18);
	function startsWithIgnoreCase(value, prefixString) {
	    var result, testString = "" + value;
	    if (testString && prefixString) {
	        result = equalsIgnoreCase_1.equalsIgnoreCase(testString.substring(0, prefixString.length), prefixString);
	    }
	    return result;
	}
	exports.startsWithIgnoreCase = startsWithIgnoreCase;
	//# sourceMappingURL=startsWithIgnoreCase.js.map

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var equalsIgnoreCase_1 = __webpack_require__(18);
	function endsWithIgnoreCase(value, suffixString) {
	    var result, testString = "" + value;
	    if (testString && suffixString) {
	        result = equalsIgnoreCase_1.equalsIgnoreCase(testString.substr(testString.length - suffixString.length), suffixString);
	    }
	    return result;
	}
	exports.endsWithIgnoreCase = endsWithIgnoreCase;
	//# sourceMappingURL=endsWithIgnoreCase.js.map

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	/* tslint:disable: no-any */
	function isString(s) {
	    /* tslint:enable: no-any */
	    return typeof s === 'string' || s instanceof String;
	}
	exports.isString = isString;
	//# sourceMappingURL=isString.js.map

/***/ },
/* 24 */
/***/ function(module, exports) {

	"use strict";
	function stringIncludes(subjectString, searchString, position) {
	    if (typeof position === 'undefined') {
	        position = 0;
	    }
	    return String.prototype.indexOf.call(subjectString, searchString, position) >= 0;
	}
	exports.stringIncludes = stringIncludes;
	;
	//# sourceMappingURL=stringIncludes.js.map

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(26));
	__export(__webpack_require__(27));
	__export(__webpack_require__(28));
	__export(__webpack_require__(29));
	__export(__webpack_require__(30));
	__export(__webpack_require__(31));
	__export(__webpack_require__(32));
	//# sourceMappingURL=index.js.map

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var startsWithIgnoreCase_1 = __webpack_require__(21);
	var endsWithIgnoreCase_1 = __webpack_require__(22);
	function concatParts(firstHalf, secondHalf) {
	    if (endsWithIgnoreCase_1.endsWithIgnoreCase(firstHalf, '/') && startsWithIgnoreCase_1.startsWithIgnoreCase(secondHalf, '/')) {
	        return firstHalf.substring(0, firstHalf.length - 1) + secondHalf;
	    }
	    if (!endsWithIgnoreCase_1.endsWithIgnoreCase(firstHalf, '/') && !startsWithIgnoreCase_1.startsWithIgnoreCase(secondHalf, '/')) {
	        return firstHalf + '/' + secondHalf;
	    }
	    return firstHalf + secondHalf;
	}
	exports.concatParts = concatParts;
	//# sourceMappingURL=concatParts.js.map

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var object_1 = __webpack_require__(12);
	function formatDottedUrl(urlBase, urlPath, params, data) {
	    var formatter = new DottedUrlFormatter(urlBase, urlPath);
	    return formatter.format(params, data);
	}
	exports.formatDottedUrl = formatDottedUrl;
	var DottedUrlFormatter = (function () {
	    function DottedUrlFormatter(urlBase, urlPath) {
	        this._dottedUrlTemplate = [urlBase, urlPath].join('/');
	    }
	    DottedUrlFormatter.prototype.format = function (params, data) {
	        var _this = this;
	        // Ensure arguments are set
	        params = params || {};
	        data = data || {};
	        // Replace all instances of :paramName with the matching value from params and keep track of which params
	        // have been matched.
	        var matchedParams = {};
	        var url = this._dottedUrlTemplate.replace(/:(\w+?)(\W|$)/g, function (match, paramName, tail) {
	            if (!params[paramName]) {
	                return '' + tail;
	            }
	            var val = params[paramName];
	            // If the value is a string that starts with '@', look up the value from the the request body (data).
	            if (typeof val === 'string' && val[0] === '@') {
	                val = _this._lookupDottedPath(data || {}, val);
	            }
	            // If the value is a function, evaluate it
	            if (angular.isFunction(val)) {
	                val = val();
	            }
	            matchedParams[paramName] = val;
	            return val + tail;
	        });
	        // For all params that weren't matched above, put them in the query string
	        var queryStringParams = {};
	        object_1.forEach(params, function (kvp) {
	            if (!matchedParams[kvp.key]) {
	                queryStringParams[kvp.key] = angular.isFunction(kvp.value) ? kvp.value() : kvp.value;
	            }
	        });
	        // Remove duplicate /'s in url
	        url = url.split('://').map(function (urlPart) { return urlPart.replace(/[\/]{2,}/g, '/'); }).join('://');
	        // Generate the final URI
	        url = this._encodeUri(url);
	        var queryString = this._getQueryString(queryStringParams);
	        if (queryString) {
	            url = url + (/\?/.test(url) ? '&' : '?') + queryString;
	        }
	        return url;
	    };
	    DottedUrlFormatter.prototype._lookupDottedPath = function (obj, path) {
	        try {
	            return '' + (path || '').split('.').reduce(function (prev, key) { return prev[key]; }, obj);
	        }
	        catch (err) {
	            return '';
	        }
	    };
	    DottedUrlFormatter.prototype._getQueryString = function (queryStringParams) {
	        var _this = this;
	        var pieces = object_1.map(queryStringParams, function (kvp) {
	            var key = _this._camelCaseToHypens(kvp.key);
	            return _this._encodeQueryStringComponent(key) + '=' + _this._encodeQueryStringComponent(kvp.value);
	        });
	        return pieces.join('&');
	    };
	    DottedUrlFormatter.prototype._camelCaseToHypens = function (str) {
	        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	    };
	    DottedUrlFormatter.prototype._encodeUri = function (val) {
	        // As per angular-resource.js, we use an encoding scheme that is less strict than default.
	        return encodeURI(val)
	            .replace(/%26/gi, '&')
	            .replace(/%3D/gi, '=')
	            .replace(/%2B/gi, '+')
	            .replace(/%40/gi, '@')
	            .replace(/%3A/gi, ':')
	            .replace(/%24/g, '$')
	            .replace(/%2C/gi, ',');
	    };
	    DottedUrlFormatter.prototype._encodeQueryStringComponent = function (val) {
	        // As per angular-resource.js, we use an encoding scheme that is less strict than default.
	        return encodeURIComponent(val)
	            .replace(/%40/gi, '@')
	            .replace(/%3A/gi, ':')
	            .replace(/%24/g, '$')
	            .replace(/%2C/gi, ',');
	    };
	    return DottedUrlFormatter;
	}());
	//# sourceMappingURL=formatDottedUrl.js.map

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var startsWithIgnoreCase_1 = __webpack_require__(21);
	function isHttpUrl(str) {
	    return startsWithIgnoreCase_1.startsWithIgnoreCase(str, 'http://');
	}
	exports.isHttpUrl = isHttpUrl;
	function isHttpsUrl(str) {
	    return startsWithIgnoreCase_1.startsWithIgnoreCase(str, 'https://');
	}
	exports.isHttpsUrl = isHttpsUrl;
	function isAbsoluteUrl(str) {
	    return isHttpsUrl(str) || isHttpUrl(str);
	}
	exports.isAbsoluteUrl = isAbsoluteUrl;
	//# sourceMappingURL=isUrl.js.map

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var queryString_1 = __webpack_require__(30);
	var startsWithIgnoreCase_1 = __webpack_require__(21);
	/**
	 * Parses a URI.
	 * @param The URI as a string
	 * @returns A URI object
	 */
	function parseUri(uri) {
	    var parser = document.createElement('a');
	    parser.href = uri;
	    // IE Bug: parser.pathname is not prefixed with a '/'
	    var path = parser.pathname || '';
	    if (!startsWithIgnoreCase_1.startsWithIgnoreCase(path, '/')) {
	        path = '/' + path;
	    }
	    return {
	        raw: uri,
	        protocol: parser.protocol ? parser.protocol.replace(/:/g, '') : '',
	        host: parser.host || '',
	        hostname: parser.hostname || '',
	        port: parser.port ? Number(parser.port) : undefined,
	        path: path,
	        parameters: queryString_1.parseQueryString(parser.search || ''),
	        hash: decodeURIComponent(parser.hash || '')
	    };
	}
	exports.parseUri = parseUri;
	//# sourceMappingURL=parseUri.js.map

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var startsWithIgnoreCase_1 = __webpack_require__(21);
	/**
	 * Parses a query string into an dictionary of key value pairs.
	 * @param The query string
	 * @returns A dictionary of key value pairs
	 */
	function parseQueryString(queryString) {
	    var obj = {};
	    if (!queryString) {
	        return obj;
	    }
	    if (startsWithIgnoreCase_1.startsWithIgnoreCase(queryString, '?')) {
	        queryString = queryString.substring(1);
	    }
	    queryString.split('&').forEach(function (keyValueString) {
	        var _a = keyValueString.split('='), key = _a[0], value = _a[1];
	        obj[decodeURIComponent(key || '')] = decodeURIComponent(value || '');
	    });
	    return obj;
	}
	exports.parseQueryString = parseQueryString;
	/**
	 * Creates a query string from the specified dictionary of key value pairs
	 * @param The query string parameters
	 * @returns A query string
	 */
	function createQueryString(queryStringParameters) {
	    return Object.keys(queryStringParameters || {})
	        .map(function (key) {
	        var encodedKey = encodeURIComponent(key);
	        var encodedValue = encodeURIComponent(queryStringParameters[key]);
	        return encodedKey + "=" + encodedValue;
	    })
	        .join('&');
	}
	exports.createQueryString = createQueryString;
	//# sourceMappingURL=queryString.js.map

/***/ },
/* 31 */
/***/ function(module, exports) {

	"use strict";
	function stripLeadingSlashes(str) {
	    return str.replace(/^\/+/, '');
	}
	exports.stripLeadingSlashes = stripLeadingSlashes;
	//# sourceMappingURL=stripLeadingSlashes.js.map

/***/ },
/* 32 */
/***/ function(module, exports) {

	"use strict";
	function stripTrailingSlashes(str) {
	    return str.replace(/\/+$/, '');
	}
	exports.stripTrailingSlashes = stripTrailingSlashes;
	//# sourceMappingURL=stripTrailingSlashes.js.map

/***/ },
/* 33 */
/***/ function(module, exports) {

	"use strict";
	var Lazy = (function () {
	    function Lazy(func) {
	        /* tslint:enable: no-any */
	        this.initialized = false;
	        this.func = func;
	    }
	    Object.defineProperty(Lazy.prototype, "value", {
	        get: function () {
	            if (this.initialized) {
	                if (this.cachedError) {
	                    throw this.cachedError;
	                }
	                else {
	                    return this.cachedValue;
	                }
	            }
	            else {
	                try {
	                    this.cachedValue = this.func();
	                    return this.cachedValue;
	                }
	                catch (e) {
	                    this.cachedError = e;
	                    throw e;
	                }
	                finally {
	                    this.initialized = true;
	                }
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Lazy.prototype, "isValueCreated", {
	        get: function () {
	            return this.initialized;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Lazy;
	}());
	exports.Lazy = Lazy;
	//# sourceMappingURL=lazy.js.map

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	var lookup = [];
	for (var i = 0; i < 256; i++) {
	    lookup[i] = (i < 16 ? '0' : '') + (i).toString(16);
	}
	function uuid() {
	    var random0 = Math.random() * 0xffffffff | 0;
	    var random1 = Math.random() * 0xffffffff | 0;
	    var random2 = Math.random() * 0xffffffff | 0;
	    var random3 = Math.random() * 0xffffffff | 0;
	    var segment0 = lookup[random0 & 0xff] + lookup[random0 >> 8 & 0xff] + lookup[random0 >> 16 & 0xff] + lookup[random0 >> 24 & 0xff];
	    var segment1 = lookup[random1 & 0xff] + lookup[random1 >> 8 & 0xff] + '-' + lookup[random1 >> 16 & 0x0f | 0x40] + lookup[random1 >> 24 & 0xff];
	    var segment2 = lookup[random2 & 0x3f | 0x80] + lookup[random2 >> 8 & 0xff] + '-' + lookup[random2 >> 16 & 0xff] + lookup[random2 >> 24 & 0xff];
	    var segment3 = lookup[random3 & 0xff] + lookup[random3 >> 8 & 0xff] + lookup[random3 >> 16 & 0xff] + lookup[random3 >> 24 & 0xff];
	    return segment0 + "-" + segment1 + "-" + segment2 + "-" + segment3;
	}
	exports.uuid = uuid;
	//# sourceMappingURL=uuid.js.map

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports, __webpack_require__) {
	
		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/// <reference path="../../typings/es6-promise/es6-promise.d.ts" />
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(2)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, exception_1, guid_1) {
		    'use strict';
		    var PING = '__PING__';
		    var PONG = '__PONG__';
		    function defer() {
		        'use strict';
		        /* tslint:disable: no-any */
		        var deferred = {};
		        /* tslint:enable: no-any */
		        deferred.promise = new Promise(function (resolve, reject) {
		            deferred.resolve = resolve;
		            deferred.reject = reject;
		        });
		        return deferred;
		    }
		    var Rpc = (function () {
		        function Rpc(rpcOptions) {
		            var _this = this;
		            /* tslint:disable: no-any */
		            this._deferredResponses = {};
		            /* tslint:enable: no-any */
		            this._rpcMethods = {};
		            this._ready = false;
		            this._queuedRequestMessages = [];
		            this._onRpcMessageRecieved = function (message) {
		                if (!message || message.signature !== _this._rpcOptions.signature) {
		                    return;
		                }
		                var rpcRequestMessage = message;
		                if (rpcRequestMessage.method) {
		                    _this._onRpcRequestMessageReceived(rpcRequestMessage);
		                }
		                else {
		                    _this._onRpcResponseMessageReceived(message);
		                }
		            };
		            this._onRpcRequestMessageReceived = function (rpcRequestMessage) {
		                var rpcMethod = _this._rpcMethods[rpcRequestMessage.method];
		                if (!rpcMethod) {
		                    return;
		                }
		                var rpcResponseMessage = {
		                    signature: rpcRequestMessage.signature,
		                    id: rpcRequestMessage.id,
		                    error: null
		                };
		                try {
		                    var result = rpcMethod.apply(_this, rpcRequestMessage.params);
		                    // NOTE: rather then checking if result is a Promise or not,
		                    // always use Promise.resolve(result) so that if the result is a Promise,
		                    // 'then/catch callback' will only be called after the result promise is completed.
		                    _this._rpcOptions.Promise.resolve(result)
		                        .then(function (result) {
		                        rpcResponseMessage.result = result;
		                        _this._rpcOptions.rpcMessageHandler.postMessage(rpcResponseMessage, _this._rpcOptions.targetOrigin);
		                    })
		                        .catch(function (ex) {
		                        rpcResponseMessage.error = _this._serializeError(ex);
		                        _this._rpcOptions.rpcMessageHandler.postMessage(rpcResponseMessage, _this._rpcOptions.targetOrigin);
		                    });
		                }
		                catch (ex) {
		                    // propagate the error correctly to the caller incase there was a synchronous error thrown by the rpcMethod implementation
		                    rpcResponseMessage.error = _this._serializeError(ex);
		                    _this._rpcOptions.rpcMessageHandler.postMessage(rpcResponseMessage, _this._rpcOptions.targetOrigin);
		                }
		            };
		            this._onRpcResponseMessageReceived = function (rpcResponseMessage) {
		                var deferred = _this._deferredResponses[rpcResponseMessage.id];
		                if (deferred) {
		                    if (rpcResponseMessage.error) {
		                        deferred.reject(_this._deserializeError(rpcResponseMessage.error));
		                    }
		                    else {
		                        deferred.resolve(rpcResponseMessage.result);
		                    }
		                    delete _this._deferredResponses[rpcResponseMessage.id];
		                }
		            };
		            if (!rpcOptions) {
		                throw new Error('rpcOptions required');
		            }
		            if (!rpcOptions.Promise) {
		                rpcOptions.Promise = {
		                    defer: defer,
		                    /* tslint:disable: no-any */
		                    resolve: function (value) { return Promise.resolve(value); },
		                    reject: function (value) { return Promise.reject(value); }
		                };
		            }
		            this._rpcOptions = rpcOptions;
		            this._rpcOptions.rpcMessageHandler.addListener(this._onRpcMessageRecieved);
		            this.register(PING, this._onPing);
		        }
		        Rpc.prototype.ack = function () {
		            // only iframe (child) calls this method
		            var _this = this;
		            // unregister ping since we are not the shell
		            this.unregister(PING);
		            return this.call(PING)
		                .then(function (message) {
		                if (message === PONG) {
		                    // shell notified that the shell is ready
		                    _this._ready = true;
		                    _this._processQueue();
		                }
		                else {
		                    return Promise.reject(new Error('Invalid PONG message' + message));
		                }
		            })
		                .catch(function (ex) {
		                // ping failed
		                _this.register(PING, _this._onPing);
		                console.error('PING failed to receive PONG message', ex);
		                return Promise.reject(ex);
		            });
		        };
		        /* tslint:disable: no-any */
		        Rpc.prototype.call = function (method, params) {
		            var id = guid_1.default(), rpcRequestMessage = {
		                signature: this._rpcOptions.signature,
		                id: id,
		                method: this._normalizeMethodName(method),
		                params: params
		            };
		            var deferred = this._rpcOptions.Promise.defer();
		            this._deferredResponses[id] = deferred;
		            if (this._ready || method === PING) {
		                this._call(rpcRequestMessage);
		            }
		            else {
		                this._queuedRequestMessages.push(rpcRequestMessage);
		            }
		            return deferred.promise;
		        };
		        /* tslint:disable: no-any */
		        Rpc.prototype.register = function (method, func) {
		            var normalizedMethod = this._normalizeMethodName(method);
		            if (this._rpcMethods[normalizedMethod]) {
		                throw new Error("Rpc method with name '" + method + "' already registered.");
		            }
		            this._rpcMethods[normalizedMethod] = func;
		        };
		        Rpc.prototype.unregister = function (method) {
		            var normalizedMethod = this._normalizeMethodName(method);
		            if (!this._rpcMethods[normalizedMethod]) {
		                throw new Error("Rpc method with name " + method + " failed to unregister. Method not found");
		            }
		            delete this._rpcMethods[normalizedMethod];
		        };
		        Rpc.prototype.dispose = function () {
		            var _this = this;
		            this._rpcMethods = {};
		            Object.keys(this._deferredResponses).forEach(function (key) { return _this._deferredResponses[key].reject(new Error('rpc disposed')); });
		            this._deferredResponses = {};
		            this._rpcOptions.rpcMessageHandler.removeListener(this._onRpcMessageRecieved);
		        };
		        Rpc.prototype._call = function (rpcRequestMessage) {
		            try {
		                this._rpcOptions.rpcMessageHandler.postMessage(rpcRequestMessage, this._rpcOptions.targetOrigin);
		            }
		            catch (ex) {
		                this._deferredResponses[rpcRequestMessage.id].reject(ex);
		                delete this._deferredResponses[rpcRequestMessage.id];
		            }
		        };
		        Rpc.prototype._onPing = function () {
		            // iframe notified the shell that iframe is ready
		            this.unregister(PING);
		            this._ready = true;
		            this._processQueue();
		            return PONG;
		        };
		        Rpc.prototype._processQueue = function () {
		            var _this = this;
		            this._queuedRequestMessages.forEach(function (rpcRequestMessage) { return _this._call(rpcRequestMessage); });
		            this._queuedRequestMessages = [];
		        };
		        Rpc.prototype._normalizeMethodName = function (method) {
		            return method.toUpperCase();
		        };
		        Rpc.prototype._serializeError = function (ex) {
		            if (ex instanceof Error) {
		                var value_1 = {
		                    name: ex.name,
		                    message: ex.message,
		                    _stack: ex.stack
		                };
		                Object.keys(ex).forEach(function (key) {
		                    value_1[key] = ex[key];
		                });
		                return {
		                    value: value_1
		                };
		            }
		            else {
		                return {
		                    value: ex
		                };
		            }
		        };
		        Rpc.prototype._deserializeError = function (error) {
		            return new exception_1.RpcException('ReceiverFailed', 'Receiver failed', exception_1.convertToException(error.value));
		        };
		        return Rpc;
		    }());
		    exports.Rpc = Rpc;
		    var WindowPostMessageRpcHandler = (function () {
		        function WindowPostMessageRpcHandler(options) {
		            /* tslint:disable: no-any */
		            this._listeners = {};
		            if (!options) {
		                throw new Error('options required');
		            }
		            if (!options.targetWindow) {
		                throw new Error('targetWindow required');
		            }
		            options.sourceWindow = options.sourceWindow || window;
		            options.messageSerializer = options.messageSerializer || (function (rpcMessage) { return rpcMessage; });
		            options.messageDeserializer = options.messageDeserializer || (function (data) { return data; });
		            this._options = options;
		        }
		        WindowPostMessageRpcHandler.prototype.postMessage = function (rpcMessage, targetOrigin) {
		            this._options.targetWindow.postMessage(this._options.messageSerializer(rpcMessage), targetOrigin);
		        };
		        WindowPostMessageRpcHandler.prototype.addListener = function (listener) {
		            var _this = this;
		            /* tslint:disable: no-any */
		            if (this._listeners[listener]) {
		                console.error('duplicate rpc listener added');
		            }
		            this._listeners[listener] = function (e) {
		                var data = _this._options.messageDeserializer(e.data);
		                /* tslint:enable: no-any */
		                if (!data) {
		                    return;
		                }
		                else if (data.method) {
		                    listener({
		                        signature: data.signature,
		                        id: data.id,
		                        method: data.method,
		                        params: data.params
		                    });
		                }
		                else {
		                    listener({
		                        signature: data.signature,
		                        id: data.id,
		                        result: data.result,
		                        error: data.error
		                    });
		                }
		            };
		            /* tslint:disable: no-any */
		            this._options.sourceWindow.addEventListener('message', this._listeners[listener]);
		            /* tslint:enable: no-any */
		        };
		        WindowPostMessageRpcHandler.prototype.removeListener = function (listener) {
		            /* tslint:disable: no-any */
		            this._options.sourceWindow.removeEventListener('message', this._listeners[listener]);
		            delete this._listeners[listener];
		            /* tslint:enable: no-any */
		        };
		        return WindowPostMessageRpcHandler;
		    }());
		    exports.WindowPostMessageRpcHandler = WindowPostMessageRpcHandler;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		//# sourceMappingURL=rpc.js.map
	
	/***/ },
	/* 1 */
	/***/ function(module, exports, __webpack_require__) {
	
		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __extends = (this && this.__extends) || function (d, b) {
		    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
		    function __() { this.constructor = d; }
		    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
		};
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
		    'use strict';
		    /* tslint:disable: no-any */
		    var Exception = (function () {
		        function Exception(type, code, message, data, innerException) {
		            if (data === void 0) { data = null; }
		            if (innerException === void 0) { innerException = null; }
		            var error = data && data instanceof Error ? data : new Error(message);
		            if (!type) {
		                throw new ArgumentException('Type cannot be empty for exception');
		            }
		            this._type = type;
		            if (!code) {
		                throw new ArgumentException('Code cannot be empty for exception');
		            }
		            this._code = code;
		            if (!message) {
		                throw new ArgumentException('Message cannot be empty for exception');
		            }
		            this._message = message;
		            this._data = data;
		            this._stackTrace = error.stack;
		            this._innerException = innerException;
		        }
		        Object.defineProperty(Exception.prototype, "type", {
		            get: function () {
		                return this._type;
		            },
		            enumerable: true,
		            configurable: true
		        });
		        Object.defineProperty(Exception.prototype, "code", {
		            get: function () {
		                return this._code;
		            },
		            enumerable: true,
		            configurable: true
		        });
		        Object.defineProperty(Exception.prototype, "stackTrace", {
		            get: function () {
		                return this._stackTrace;
		            },
		            enumerable: true,
		            configurable: true
		        });
		        Object.defineProperty(Exception.prototype, "message", {
		            get: function () {
		                return this._message;
		            },
		            enumerable: true,
		            configurable: true
		        });
		        Object.defineProperty(Exception.prototype, "data", {
		            get: function () {
		                return this._data;
		            },
		            enumerable: true,
		            configurable: true
		        });
		        Object.defineProperty(Exception.prototype, "innerException", {
		            get: function () {
		                return this._innerException;
		            },
		            enumerable: true,
		            configurable: true
		        });
		        return Exception;
		    }());
		    exports.Exception = Exception;
		    var UnknownException = (function (_super) {
		        __extends(UnknownException, _super);
		        function UnknownException(data) {
		            return _super.call(this, 'UnknownException', 'UnknownException', 'Unknown error.', data) || this;
		        }
		        return UnknownException;
		    }(Exception));
		    exports.UnknownException = UnknownException;
		    var RpcException = (function (_super) {
		        __extends(RpcException, _super);
		        function RpcException(code, message, innerException) {
		            if (innerException === void 0) { innerException = null; }
		            return _super.call(this, 'RpcException', code, message, null, innerException) || this;
		        }
		        return RpcException;
		    }(Exception));
		    exports.RpcException = RpcException;
		    var ArgumentException = (function (_super) {
		        __extends(ArgumentException, _super);
		        function ArgumentException(message) {
		            return _super.call(this, 'ArgumentException', 'ArgumentException', message, null, null) || this;
		        }
		        return ArgumentException;
		    }(Exception));
		    exports.ArgumentException = ArgumentException;
		    function convertToException(error) {
		        'use strict';
		        if (error instanceof Error || (error.name && error.message && !error.hasOwnProperty('_stackTrace'))) {
		            return new Exception('ErrorException', 'Error', error.message, error);
		        }
		        else if (error.type && error.code && error.message && error.hasOwnProperty('_stackTrace')) {
		            return error;
		        }
		        else {
		            return new UnknownException(error);
		        }
		    }
		    exports.convertToException = convertToException;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		//# sourceMappingURL=exception.js.map
	
	/***/ },
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports) {
		    'use strict';
		    var hexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
		    var separator = '-';
		    /**
		     * Returns a GUID such as xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.
		     *
		     * @return New GUID.
		     */
		    function guid() {
		        'use strict';
		        // c.f. rfc4122 (UUID version 4 = xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx)
		        var oct = '', tmp;
		        for (var a = 0; a < 4; a++) {
		            tmp = (4294967296 * Math.random()) | 0;
		            oct += hexValues[tmp & 0xF]
		                + hexValues[tmp >> 4 & 0xF]
		                + hexValues[tmp >> 8 & 0xF]
		                + hexValues[tmp >> 12 & 0xF]
		                + hexValues[tmp >> 16 & 0xF]
		                + hexValues[tmp >> 20 & 0xF]
		                + hexValues[tmp >> 24 & 0xF]
		                + hexValues[tmp >> 28 & 0xF];
		        }
		        // 'Set the two most significant bits (bits 6 and 7) of the clock_seq_hi_and_reserved to zero and one, respectively'
		        var clockSequenceHi = hexValues[8 + (Math.random() * 4) | 0];
		        return oct.substr(0, 8) + separator + oct.substr(9, 4) + separator + '4' + oct.substr(13, 3) + separator + clockSequenceHi + oct.substr(16, 3) + separator + oct.substr(19, 12);
		    }
		    Object.defineProperty(exports, "__esModule", { value: true });
		    exports.default = guid;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		//# sourceMappingURL=guid.js.map
	
	/***/ }
	/******/ ])}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));;
	//# sourceMappingURL=rpc.standalone.js.map

/***/ },
/* 36 */
/***/ function(module, exports) {

	"use strict";
	exports.config = {
	    version: '1.1'
	};


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var SdkSettings_1 = __webpack_require__(38);
	var string_1 = __webpack_require__(17);
	var httpHelper_1 = __webpack_require__(39);
	function getEnvironmentUrl(hostName, environmentName) {
	    if (string_1.isNullOrUndefined(environmentName) || environmentName.trim() === '') {
	        environmentName = '~default';
	    }
	    var apiVersion = SdkSettings_1.SdkSettings.apiVersion;
	    var flowApiUrl = SdkSettings_1.SdkSettings.apiUrl;
	    // ignore host case
	    hostName = hostName.toLowerCase();
	    if (hostName && (string_1.stringIncludes(hostName, SdkSettings_1.SdkSettings.tip1PortalDomain, 0) || string_1.stringIncludes(hostName, SdkSettings_1.SdkSettings.portalTestDomain, 0))) {
	        apiVersion = SdkSettings_1.SdkSettings.tip1ApiVersion;
	        flowApiUrl = SdkSettings_1.SdkSettings.tip1ApiUrl;
	    }
	    if (hostName && (string_1.stringIncludes(hostName, SdkSettings_1.SdkSettings.govPortalDomain, 0))) {
	        flowApiUrl = SdkSettings_1.SdkSettings.govApiUrl;
	    }
	    return flowApiUrl + "/providers/" + SdkSettings_1.SdkSettings.providerName + "/environments/" + environmentName + "?api-version=" + apiVersion;
	}
	exports.getEnvironmentUrl = getEnvironmentUrl;
	function getEnvironmentInfo(hostName, environmentName, accessToken) {
	    var enviromentUrl = getEnvironmentUrl(hostName, environmentName);
	    return httpHelper_1.getJson(enviromentUrl, accessToken)
	        .then(function (result) {
	        return { name: result.name, location: result.location };
	    });
	}
	exports.getEnvironmentInfo = getEnvironmentInfo;


/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	exports.SdkSettings = {
	    authResource: 'https://management.core.windows.net/',
	    govAuthResource: 'https://gov.service.flow.microsoft.us/',
	    apiVersion: '2016-11-01',
	    portalDomain: 'flow.microsoft.com',
	    providerName: 'microsoft.processsimple',
	    apiUrl: 'https://api.flow.microsoft.com',
	    govApiUrl: 'https://gov.api.flow.microsoft.us',
	    tip1ApiUrl: 'https://tip1.api.flow.microsoft.com',
	    tip1ApiVersion: '2016-11-01-beta',
	    tip1PortalDomain: 'tip1.flow.microsoft.com',
	    portalTestDomain: 'flows.azure-test.net',
	    govPortalDomain: 'flow.microsoft.us'
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	"use strict";
	/* tslint:disable: no-any */
	function getJson(url, accessToken) {
	    /* tslint:enable: no-any */
	    return new Promise(function (resolve, reject) {
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', url);
	        xhr.onload = function () {
	            if (this.status >= 200 && this.status < 300) {
	                try {
	                    resolve(JSON.parse(xhr.responseText));
	                }
	                catch (e) {
	                    reject({
	                        status: this.status,
	                        statusText: e
	                    });
	                }
	            }
	            else {
	                reject({
	                    status: this.status,
	                    statusText: xhr.statusText
	                });
	            }
	        };
	        xhr.onerror = function () {
	            reject({
	                status: this.status,
	                statusText: xhr.statusText
	            });
	        };
	        xhr.open('GET', url);
	        xhr.setRequestHeader('Accept', 'application/json');
	        xhr.setRequestHeader('Authorization', "Bearer " + accessToken);
	        xhr.send();
	    });
	}
	exports.getJson = getJson;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var string_1 = __webpack_require__(17);
	var SdkSettings_1 = __webpack_require__(38);
	function getHostNamePrefixFromGeoLocation(location) {
	    if (!location) {
	        return null;
	    }
	    var lowerCaseLocation = location.toLowerCase();
	    switch (lowerCaseLocation) {
	        case 'unitedstatesfirstrelease':
	            return 'preview';
	        case 'unitedstates':
	            return 'us';
	        case 'unitedkingdom':
	            return 'uk';
	        case 'europe':
	            return 'emea';
	        case 'usgov':
	            return 'gov';
	        default:
	            return lowerCaseLocation;
	    }
	}
	exports.getHostNamePrefixFromGeoLocation = getHostNamePrefixFromGeoLocation;
	function getRegionalPortalUrl(environmentLocation, originalHostUrl) {
	    if (string_1.isNullOrUndefined(environmentLocation) || environmentLocation.trim() === '') {
	        return originalHostUrl;
	    }
	    var hostNamePrefix = getHostNamePrefixFromGeoLocation(environmentLocation);
	    var portalDomain;
	    // ignore case
	    originalHostUrl = originalHostUrl.toLowerCase();
	    if (string_1.stringIncludes(originalHostUrl, SdkSettings_1.SdkSettings.portalTestDomain, 0)) {
	        portalDomain = SdkSettings_1.SdkSettings.portalTestDomain;
	    }
	    else if (string_1.stringIncludes(originalHostUrl, SdkSettings_1.SdkSettings.tip1PortalDomain, 0)) {
	        portalDomain = SdkSettings_1.SdkSettings.tip1PortalDomain;
	    }
	    else if (string_1.stringIncludes(originalHostUrl, SdkSettings_1.SdkSettings.govPortalDomain, 0)) {
	        portalDomain = SdkSettings_1.SdkSettings.govPortalDomain;
	    }
	    else {
	        portalDomain = SdkSettings_1.SdkSettings.portalDomain;
	    }
	    return "https://" + hostNamePrefix + "." + portalDomain;
	}
	exports.getRegionalPortalUrl = getRegionalPortalUrl;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var widget_1 = __webpack_require__(3);
	var FlowsWidget = (function (_super) {
	    __extends(FlowsWidget, _super);
	    function FlowsWidget(widgetOption, sdkOption) {
	        _super.call(this, widgetOption, sdkOption);
	        this.widgetOption = widgetOption;
	        this.sdkOption = sdkOption;
	    }
	    FlowsWidget.prototype.getWidgetType = function () {
	        return FlowsWidget.widgetType;
	    };
	    FlowsWidget.widgetType = widget_1.WidgetTypes.flows;
	    return FlowsWidget;
	}(widget_1.Widget));
	exports.FlowsWidget = FlowsWidget;


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var widget_1 = __webpack_require__(3);
	var FlowsRuntimeWidget = (function (_super) {
	    __extends(FlowsRuntimeWidget, _super);
	    function FlowsRuntimeWidget(widgetOption, sdkOption) {
	        _super.call(this, widgetOption, sdkOption);
	        this.widgetOption = widgetOption;
	        this.sdkOption = sdkOption;
	    }
	    FlowsRuntimeWidget.prototype.getWidgetType = function () {
	        return FlowsRuntimeWidget.widgetType;
	    };
	    FlowsRuntimeWidget.widgetType = widget_1.WidgetTypes.flowsRuntime;
	    return FlowsRuntimeWidget;
	}(widget_1.Widget));
	exports.FlowsRuntimeWidget = FlowsRuntimeWidget;


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var widget_1 = __webpack_require__(3);
	var FlowCreationWidget = (function (_super) {
	    __extends(FlowCreationWidget, _super);
	    function FlowCreationWidget(widgetOption, sdkOption) {
	        _super.call(this, widgetOption, sdkOption);
	        this.widgetOption = widgetOption;
	        this.sdkOption = sdkOption;
	    }
	    FlowCreationWidget.prototype.getWidgetType = function () {
	        return FlowCreationWidget.widgetType;
	    };
	    FlowCreationWidget.widgetType = widget_1.WidgetTypes.flowCreation;
	    return FlowCreationWidget;
	}(widget_1.Widget));
	exports.FlowCreationWidget = FlowCreationWidget;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var widget_1 = __webpack_require__(3);
	var TemplatesWidget = (function (_super) {
	    __extends(TemplatesWidget, _super);
	    function TemplatesWidget(widgetOption, sdkOption) {
	        _super.call(this, widgetOption, sdkOption);
	        this.widgetOption = widgetOption;
	        this.sdkOption = sdkOption;
	    }
	    TemplatesWidget.prototype.getWidgetType = function () {
	        return TemplatesWidget.widgetType;
	    };
	    TemplatesWidget.widgetType = widget_1.WidgetTypes.templates;
	    return TemplatesWidget;
	}(widget_1.Widget));
	exports.TemplatesWidget = TemplatesWidget;


/***/ }
/******/ ]);
//# sourceMappingURL=msflowsdk.js.map