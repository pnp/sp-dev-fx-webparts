define("fd5fa211-ef67-4b5b-9f0d-6117a93e44af_0.0.1", ["@microsoft/sp-core-library","react","react-dom","@microsoft/sp-webpart-base","mystrings","@microsoft/sp-http","photopileModule","jquery","jqueryui"], function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_24__, __WEBPACK_EXTERNAL_MODULE_25__, __WEBPACK_EXTERNAL_MODULE_26__) { return /******/ (function(modules) { // webpackBootstrap
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

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var sp_core_library_1 = __webpack_require__(1);
	var React = __webpack_require__(2);
	var ReactDom = __webpack_require__(3);
	var sp_webpart_base_1 = __webpack_require__(4);
	var strings = __webpack_require__(5);
	var PhotopileWebPart_1 = __webpack_require__(6);
	var SPPicturesListService_1 = __webpack_require__(21);
	/**
	 * @class
	 * Defines the Photopile client side web part
	 */
	var PhotopileWebPartWebPart = (function (_super) {
	    __extends(PhotopileWebPartWebPart, _super);
	    /**
	     * @function
	     * Web Part constructor
	     */
	    function PhotopileWebPartWebPart(context) {
	        var _this = _super.call(this) || this;
	        /**
	       * @var
	       * Stores the list of SharePoint Pictures library found in the current SP web
	       */
	        _this.listsDropdownOptions = [];
	        return _this;
	    }
	    /**
	     * @function
	     * Function called when the web part is inialized
	     */
	    PhotopileWebPartWebPart.prototype.onInit = function () {
	        var _this = this;
	        //Init the PicturesListService to get the picture libs
	        var picturesListService = new SPPicturesListService_1.SPPicturesListService(this.properties, this.context);
	        //Request the libs
	        picturesListService.getPictureLibs()
	            .then(function (response) {
	            //Store the result as list of dropdown options
	            _this.listsDropdownOptions = response.value.map(function (list) {
	                return {
	                    key: list.Id,
	                    text: list.Title
	                };
	            });
	        });
	        return Promise.resolve();
	    };
	    /**
	     * @function
	     * Renders the web part
	     */
	    PhotopileWebPartWebPart.prototype.render = function () {
	        //Constructs the react element code to JSX
	        var element = React.createElement(PhotopileWebPart_1.default, {
	            listName: this.properties.listName,
	            orderBy: this.properties.orderBy,
	            orderByAsc: this.properties.orderByAsc,
	            count: this.properties.count,
	            numLayers: this.properties.numLayers,
	            thumbOverlap: this.properties.thumbOverlap,
	            thumbRotation: this.properties.thumbRotation,
	            thumbBorderWidth: this.properties.thumbBorderWidth,
	            thumbBorderColor: this.properties.thumbBorderColor,
	            thumbBorderHover: this.properties.thumbBorderHover,
	            draggable: this.properties.draggable,
	            fadeDuration: this.properties.fadeDuration,
	            pickupDuration: this.properties.pickupDuration,
	            photoZIndex: this.properties.photoZIndex,
	            photoBorder: this.properties.photoBorder,
	            photoBorderColor: this.properties.photoBorderColor,
	            showInfo: this.properties.showInfo,
	            autoplayGallery: this.properties.autoplayGallery,
	            autoplaySpeed: this.properties.autoplaySpeed,
	            context: this.context
	        });
	        //Render the dom
	        ReactDom.render(element, this.domElement);
	    };
	    Object.defineProperty(PhotopileWebPartWebPart.prototype, "disableReactivePropertyChanges", {
	        /**
	         * @function
	         * Prevent from changing the pane properties on typing
	         */
	        get: function () {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PhotopileWebPartWebPart.prototype, "dataVersion", {
	        /**
	         * @function
	         * Gets the web part properties panel settings
	         */
	        get: function () {
	            return sp_core_library_1.Version.parse('1.0');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PhotopileWebPartWebPart.prototype.getPropertyPaneConfiguration = function () {
	        return {
	            pages: [
	                {
	                    header: {
	                        description: strings.PropertyPaneDescription
	                    },
	                    //Display the web part properties as accordion
	                    displayGroupsAsAccordion: true,
	                    groups: [
	                        {
	                            groupName: strings.PictureLibraryGroupName,
	                            groupFields: [
	                                sp_webpart_base_1.PropertyPaneDropdown('listName', {
	                                    label: strings.PictureLibraryFieldLabel,
	                                    options: this.listsDropdownOptions
	                                }),
	                                sp_webpart_base_1.PropertyPaneDropdown('orderBy', {
	                                    label: strings.OrderByFieldLabel,
	                                    options: [
	                                        { key: 'ID', text: strings.OrderByChoiceLabelId },
	                                        { key: 'Title', text: strings.OrderByChoiceLabelTitle },
	                                        { key: 'Created', text: strings.OrderByChoiceLabelCreated },
	                                        { key: 'Modified', text: strings.OrderByChoiceLabelModified },
	                                        { key: 'ImageWidth', text: strings.OrderByChoiceLabelImageWidth },
	                                        { key: 'ImageHeight', text: strings.OrderByChoiceLabelImageHeight }
	                                    ]
	                                }),
	                                sp_webpart_base_1.PropertyPaneDropdown('orderByAsc', {
	                                    label: strings.OrderByAscFieldLabel,
	                                    options: [
	                                        { key: 'asc', text: strings.OrderByAscChoiceLabel },
	                                        { key: 'desc', text: strings.OrderByDescChoiceLabel }
	                                    ]
	                                }),
	                                sp_webpart_base_1.PropertyPaneSlider('count', {
	                                    label: strings.PictureLibraryCountLabel,
	                                    min: 1,
	                                    max: 100,
	                                    step: 1,
	                                    showValue: true
	                                })
	                            ]
	                        },
	                        {
	                            groupName: strings.ThumbnailsGroupName,
	                            groupFields: [
	                                sp_webpart_base_1.PropertyPaneSlider('numLayers', {
	                                    label: strings.NumLayersFieldLabel,
	                                    min: 1,
	                                    max: 20,
	                                    step: 1,
	                                    showValue: true
	                                }),
	                                sp_webpart_base_1.PropertyPaneSlider('thumbOverlap', {
	                                    label: strings.ThumbOverlabFieldLabel,
	                                    min: 1,
	                                    max: 130,
	                                    step: 1,
	                                    showValue: true
	                                }),
	                                sp_webpart_base_1.PropertyPaneSlider('thumbRotation', {
	                                    label: strings.ThumbRotationFieldLabel,
	                                    min: 0,
	                                    max: 360,
	                                    step: 1,
	                                    showValue: true
	                                }),
	                                sp_webpart_base_1.PropertyPaneSlider('thumbBorderWidth', {
	                                    label: strings.ThumbBorderWidthFieldLabel,
	                                    min: 0,
	                                    max: 50,
	                                    step: 1,
	                                    showValue: true
	                                }),
	                                sp_webpart_base_1.PropertyPaneTextField('thumbBorderColor', {
	                                    label: strings.ThumbBorderColorFieldLabel
	                                }),
	                                sp_webpart_base_1.PropertyPaneTextField('thumbBorderHover', {
	                                    label: strings.ThumbBorderHoverFieldLabel
	                                }),
	                                sp_webpart_base_1.PropertyPaneToggle('draggable', {
	                                    label: strings.DraggableFieldLabel
	                                })
	                            ]
	                        },
	                        {
	                            groupName: strings.PhotoContainerGroupName,
	                            groupFields: [
	                                sp_webpart_base_1.PropertyPaneSlider('fadeDuration', {
	                                    label: strings.FadeDurationFieldLabel,
	                                    min: 0,
	                                    max: 5000,
	                                    step: 100,
	                                    showValue: true
	                                }),
	                                sp_webpart_base_1.PropertyPaneSlider('pickupDuration', {
	                                    label: strings.PickupDurationFieldLabel,
	                                    min: 0,
	                                    max: 5000,
	                                    step: 100,
	                                    showValue: true
	                                }),
	                                sp_webpart_base_1.PropertyPaneSlider('photoZIndex', {
	                                    label: strings.PhotoZIndexFieldLabel,
	                                    min: 1,
	                                    max: 1000,
	                                    step: 1,
	                                    showValue: true
	                                }),
	                                sp_webpart_base_1.PropertyPaneSlider('photoBorder', {
	                                    label: strings.PhotoBorderFieldLabel,
	                                    min: 0,
	                                    max: 50,
	                                    step: 1,
	                                    showValue: true
	                                }),
	                                sp_webpart_base_1.PropertyPaneTextField('photoBorderColor', {
	                                    label: strings.PhotoBorderColorFieldLabel
	                                }),
	                                sp_webpart_base_1.PropertyPaneToggle('showInfo', {
	                                    label: strings.ShowInfoFieldLabel
	                                })
	                            ]
	                        },
	                        {
	                            groupName: strings.AutoplayGroupName,
	                            groupFields: [
	                                sp_webpart_base_1.PropertyPaneToggle('autoplayGallery', {
	                                    label: strings.AutoplayGalleryFieldLabel
	                                }),
	                                sp_webpart_base_1.PropertyPaneSlider('autoplaySpeed', {
	                                    label: strings.AutoplaySpeedFieldLabel,
	                                    min: 0,
	                                    max: 5000,
	                                    step: 100,
	                                    showValue: true
	                                })
	                            ]
	                        }
	                    ]
	                }
	            ]
	        };
	    };
	    return PhotopileWebPartWebPart;
	}(sp_webpart_base_1.BaseClientSideWebPart));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PhotopileWebPartWebPart;



/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	/**
	 * @file
	 * Photopile Web Part React JSX component.
	 *
	 * Contains JSX code to render the web part with HTML templates.
	 *
	 * Author: Olivier Carpentier
	 */
	var React = __webpack_require__(2);
	var Spinner_1 = __webpack_require__(7);
	var strings = __webpack_require__(5);
	var PhotopileWebPart_module_scss_1 = __webpack_require__(16);
	var SPPicturesListService_1 = __webpack_require__(21);
	var photopile = __webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(24);
	/**
	 * @class
	 * Defines Photopile web part class.
	 */
	var PhotopileWebPart = (function (_super) {
	    __extends(PhotopileWebPart, _super);
	    /**
	     * @function
	     * Photopile web part contructor.
	     */
	    function PhotopileWebPart(props, context) {
	        var _this = _super.call(this, props, context) || this;
	        //Save the context
	        _this.myPageContext = props.context;
	        //Init the component state
	        _this.state = {
	            results: [],
	            loaded: false
	        };
	        return _this;
	    }
	    ;
	    /**
	     * @function
	     * JSX Element render method
	     */
	    PhotopileWebPart.prototype.render = function () {
	        if (this.props.listName == null || this.props.listName == '') {
	            //Display select a list message
	            return (React.createElement("div", { className: "ms-MessageBar" },
	                React.createElement("div", { className: "ms-MessageBar-content" },
	                    React.createElement("div", { className: "ms-MessageBar-icon" },
	                        React.createElement("i", { className: "ms-Icon ms-Icon--infoCircle" })),
	                    React.createElement("div", { className: "ms-MessageBar-text" }, strings.ErrorSelectList))));
	        }
	        else {
	            if (this.state.loaded == false) {
	                //Display the loading spinner with the Office UI Fabric Spinner control
	                return (React.createElement("div", { className: PhotopileWebPart_module_scss_1.default.photopileWebPart },
	                    React.createElement("div", { className: PhotopileWebPart_module_scss_1.default.workingOnItSpinner },
	                        React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.normal }),
	                        React.createElement("div", { className: PhotopileWebPart_module_scss_1.default.loadingLabel },
	                            React.createElement("label", { className: "ms-Label" },
	                                " ",
	                                strings.Loading)))));
	            }
	            else if (this.state.results.length == 0) {
	                //Display message no items
	                return (React.createElement("div", { className: "ms-MessageBar ms-MessageBar--error" },
	                    React.createElement("div", { className: "ms-MessageBar-content" },
	                        React.createElement("div", { className: "ms-MessageBar-icon" },
	                            React.createElement("i", { className: "ms-Icon ms-Icon--xCircle" })),
	                        React.createElement("div", { className: "ms-MessageBar-text" }, strings.ErrorNoItems))));
	            }
	            else {
	                //Display the items list
	                return (React.createElement("div", { className: 'photopile-wrapper' },
	                    React.createElement("ul", { className: 'photopile' }, this.state.results.map(function (object, i) {
	                        //Select the best Alt text with title, description or file's name
	                        var altText = object.Title;
	                        if (altText == null || altText == '')
	                            altText = object.Description;
	                        if (altText == null || altText == '')
	                            altText = object.File.Name;
	                        //Render the item
	                        return (React.createElement("li", null,
	                            React.createElement("a", { href: object.File.ServerRelativeUrl },
	                                React.createElement("img", { src: object.File.ThumbnailServerUrl, alt: altText, width: "133", height: "100" }))));
	                    }))));
	            }
	        }
	    };
	    /**
	     * @function
	     * Function called when the component did mount
	     */
	    PhotopileWebPart.prototype.componentDidMount = function () {
	        var _this = this;
	        if (this.props.listName != null && this.props.listName != '') {
	            //Init the Picture list service
	            var picturesListService = new SPPicturesListService_1.SPPicturesListService(this.props, this.myPageContext);
	            //Load the list of pictures from the current lib
	            picturesListService.getPictures(this.props.listName)
	                .then(function (response) {
	                //Modify the component state with the json result
	                _this.setState({ results: response.value, loaded: true });
	            });
	        }
	    };
	    /**
	     * @function
	     * Function called when the web part properties has changed
	     */
	    PhotopileWebPart.prototype.componentWillReceiveProps = function (nextProps) {
	        var _this = this;
	        //Define the state with empty results
	        this.setState({ results: [], loaded: false });
	        if (nextProps.listName != null && nextProps.listName != '') {
	            //Init the Picture list service
	            var picturesListService = new SPPicturesListService_1.SPPicturesListService(nextProps, this.myPageContext);
	            //Load the list of pictures from the current lib
	            picturesListService.getPictures(nextProps.listName)
	                .then(function (response) {
	                //Modify the component state with the json result
	                _this.setState({ results: response.value, loaded: true });
	            });
	        }
	    };
	    /**
	     * @function
	     * Function called when the component has been rendered (ie HTML code is ready)
	     */
	    PhotopileWebPart.prototype.componentDidUpdate = function (prevProps, prevState) {
	        if (this.state.loaded) {
	            //Init photopile options
	            photopile.setNumLayers(this.props.numLayers);
	            photopile.setThumbOverlap(this.props.thumbOverlap);
	            photopile.setThumbRotation(this.props.thumbRotation);
	            photopile.setThumbBorderWidth(this.props.thumbBorderWidth);
	            photopile.setThumbBorderColor(this.props.thumbBorderColor);
	            photopile.setThumbBorderHover(this.props.thumbBorderHover);
	            photopile.setDraggable(this.props.draggable);
	            photopile.setFadeDuration(this.props.fadeDuration);
	            photopile.setPickupDuration(this.props.pickupDuration);
	            photopile.setPhotoZIndex(this.props.photoZIndex);
	            photopile.setPhotoBorder(this.props.photoBorder);
	            photopile.setPhotoBorderColor(this.props.photoBorderColor);
	            photopile.setShowInfo(this.props.showInfo);
	            photopile.setAutoplayGallery(this.props.autoplayGallery);
	            photopile.setAutoplaySpeed(this.props.autoplaySpeed);
	            //Init photopile
	            photopile.scatter();
	        }
	    };
	    return PhotopileWebPart;
	}(React.Component));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = PhotopileWebPart;



/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(8));
	


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__export(__webpack_require__(9));
	__export(__webpack_require__(10));
	


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Spinner_Props_1 = __webpack_require__(10);
	var rtl_1 = __webpack_require__(11);
	var css_1 = __webpack_require__(13);
	__webpack_require__(14);
	var CIRCLE_COUNT = 8;
	var PARENT_SIZE_LARGE = 28;
	var PARENT_SIZE_NORMAL = 20;
	var OFFSET_SIZE_LARGE = 0.179;
	var OFFSET_SIZE_NORMAL = 0.2;
	var Spinner = (function (_super) {
	    __extends(Spinner, _super);
	    function Spinner() {
	        _super.apply(this, arguments);
	    }
	    Spinner.prototype.render = function () {
	        var _a = this.props, type = _a.type, label = _a.label, className = _a.className;
	        var isRTL = rtl_1.getRTL();
	        var parentSize = type === Spinner_Props_1.SpinnerType.large ? PARENT_SIZE_LARGE : PARENT_SIZE_NORMAL;
	        var offsetSize = type === Spinner_Props_1.SpinnerType.large ? OFFSET_SIZE_LARGE : OFFSET_SIZE_NORMAL;
	        var offset = parentSize * offsetSize;
	        var step = (2 * Math.PI) / CIRCLE_COUNT;
	        var angle = 0;
	        var i = CIRCLE_COUNT;
	        var radius = (parentSize - offset) * 0.5;
	        var circleObjects = [];
	        while (i--) {
	            var x = Math.round(parentSize * 0.5 + radius * Math.cos(angle)) - offset * 0.5;
	            var y = Math.round(parentSize * 0.5 + radius * Math.sin(angle)) - offset * 0.5;
	            var size = offset + 'px';
	            var style = { left: !isRTL ? x : 'auto', right: !isRTL ? 'auto' : x, top: y, width: size, height: size };
	            angle += step;
	            circleObjects.push(React.createElement("div", {className: 'ms-Spinner-circle', key: i, style: style}));
	        }
	        return (React.createElement("div", {className: css_1.css('ms-Spinner', className, {
	            'ms-Spinner--large': type === Spinner_Props_1.SpinnerType.large
	        })}, label && (React.createElement("div", {className: 'ms-Spinner-label', role: 'alert'}, label)), circleObjects));
	    };
	    Spinner.defaultProps = {
	        type: Spinner_Props_1.SpinnerType.normal
	    };
	    return Spinner;
	}(React.Component));
	exports.Spinner = Spinner;
	


/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	(function (SpinnerType) {
	    SpinnerType[SpinnerType["normal"] = 0] = "normal";
	    SpinnerType[SpinnerType["large"] = 1] = "large";
	})(exports.SpinnerType || (exports.SpinnerType = {}));
	var SpinnerType = exports.SpinnerType;
	


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var KeyCodes_1 = __webpack_require__(12);
	var _isRTL;
	/**
	 * Gets the rtl state of the page (returns true if in rtl.)
	 */
	function getRTL() {
	    if (_isRTL === undefined) {
	        _isRTL = document.documentElement.getAttribute('dir') === 'rtl';
	    }
	    return _isRTL;
	}
	exports.getRTL = getRTL;
	/**
	 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
	 */
	function setRTL(isRTL) {
	    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
	    _isRTL = isRTL;
	}
	exports.setRTL = setRTL;
	/**
	 * Returns the given key, but flips right/left arrows if necessary.
	 */
	function getRTLSafeKeyCode(key) {
	    if (getRTL()) {
	        if (key === KeyCodes_1.KeyCodes.left) {
	            key = KeyCodes_1.KeyCodes.right;
	        }
	        else if (key === KeyCodes_1.KeyCodes.right) {
	            key = KeyCodes_1.KeyCodes.left;
	        }
	    }
	    return key;
	}
	exports.getRTLSafeKeyCode = getRTLSafeKeyCode;
	


/***/ },
/* 12 */
/***/ function(module, exports) {

	"use strict";
	(function (KeyCodes) {
	    KeyCodes[KeyCodes["a"] = 65] = "a";
	    KeyCodes[KeyCodes["backspace"] = 8] = "backspace";
	    KeyCodes[KeyCodes["comma"] = 188] = "comma";
	    KeyCodes[KeyCodes["del"] = 46] = "del";
	    KeyCodes[KeyCodes["down"] = 40] = "down";
	    KeyCodes[KeyCodes["end"] = 35] = "end";
	    KeyCodes[KeyCodes["enter"] = 13] = "enter";
	    KeyCodes[KeyCodes["escape"] = 27] = "escape";
	    KeyCodes[KeyCodes["home"] = 36] = "home";
	    KeyCodes[KeyCodes["left"] = 37] = "left";
	    KeyCodes[KeyCodes["pageDown"] = 34] = "pageDown";
	    KeyCodes[KeyCodes["pageUp"] = 33] = "pageUp";
	    KeyCodes[KeyCodes["right"] = 39] = "right";
	    KeyCodes[KeyCodes["semicolon"] = 186] = "semicolon";
	    KeyCodes[KeyCodes["space"] = 32] = "space";
	    KeyCodes[KeyCodes["tab"] = 9] = "tab";
	    KeyCodes[KeyCodes["up"] = 38] = "up";
	})(exports.KeyCodes || (exports.KeyCodes = {}));
	var KeyCodes = exports.KeyCodes;
	


/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";
	function css() {
	    var args = [];
	    for (var _i = 0; _i < arguments.length; _i++) {
	        args[_i - 0] = arguments[_i];
	    }
	    var classes = [];
	    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
	        var arg = args_1[_a];
	        if (arg) {
	            if (typeof arg === 'string') {
	                classes.push(arg);
	            }
	            else {
	                for (var key in arg) {
	                    if (arg[key]) {
	                        classes.push(key);
	                    }
	                }
	            }
	        }
	    }
	    return classes.join(' ');
	}
	exports.css = css;
	


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var load_themed_styles_1 = __webpack_require__(15);
	load_themed_styles_1.loadStyles('.ms-Spinner{position:relative;height:20px}.ms-Spinner.ms-Spinner--large{height:28px}.ms-Spinner.ms-Spinner--large .ms-Spinner-label{left:34px;top:6px}.ms-Spinner-circle{position:absolute;border-radius:100px;background-color:#0078d7;opacity:0}@media screen and (-ms-high-contrast:active){.ms-Spinner-circle{background-color:#fff}}@media screen and (-ms-high-contrast:black-on-white){.ms-Spinner-circle{background-color:#000}}.ms-Spinner-label{position:relative;color:#333;font-family:"Segoe UI Regular WestEuropean","Segoe UI",Tahoma,Arial,sans-serif;font-size:12px;font-weight:400;color:#0078d7;left:28px;top:2px}[dir=ltr] .ms-Spinner.ms-Spinner--large .ms-Spinner-label{left:34px}[dir=rtl] .ms-Spinner.ms-Spinner--large .ms-Spinner-label{right:34px}[dir=ltr] .ms-Spinner-label{left:28px}[dir=rtl] .ms-Spinner-label{right:28px}@-webkit-keyframes pulse{0%{opacity:1}100%{opacity:0}}@keyframes pulse{0%{opacity:1}100%{opacity:0}}.ms-Spinner-circle{position:absolute;border-radius:100px;background-color:#0078d7;opacity:0;-webkit-animation-name:pulse;animation-name:pulse;-webkit-animation-duration:750ms;animation-duration:750ms;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite;-webkit-animation-timing-function:linear;animation-timing-function:linear}.ms-Spinner-circle:nth-child(1){opacity:.875;-webkit-animation-delay:.093s;animation-delay:.093s}.ms-Spinner-circle:nth-child(2){opacity:.75;-webkit-animation-delay:.187s;animation-delay:.187s}.ms-Spinner-circle:nth-child(3){opacity:.625;-webkit-animation-delay:.281s;animation-delay:.281s}.ms-Spinner-circle:nth-child(4){opacity:.5;-webkit-animation-delay:375ms;animation-delay:375ms}.ms-Spinner-circle:nth-child(5){opacity:.375;-webkit-animation-delay:.468s;animation-delay:.468s}.ms-Spinner-circle:nth-child(6){opacity:.25;-webkit-animation-delay:.562s;animation-delay:.562s}.ms-Spinner-circle:nth-child(7){opacity:.125;-webkit-animation-delay:.656s;animation-delay:.656s}');
	


/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";
	;
	;
	// IE needs to inject styles using cssText. However, we need to evaluate this lazily, so this
	// value will initialize as undefined, and later will be set once on first loadStyles injection.
	var _injectStylesWithCssText;
	// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
	// load-themed-styles hosted on the page.
	var _root = (typeof window === 'undefined') ? {} : window;
	var _themeState = _root.__themeState__ = _root.__themeState__ || {
	    theme: null,
	    lastStyleElement: null,
	    registeredStyles: []
	};
	/**
	 * Matches theming tokens. For example, "[theme: themeSlotName, default: #FFF]" (including the quotes).
	 */
	/* tslint:disable: max-line-length */
	var _themeTokenRegex = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g;
	/* tslint:enable: max-line-length */
	/** Maximum style text length, for supporting IE style restrictions. */
	var MAX_STYLE_CONTENT_SIZE = 10000;
	/**
	 * Loads a set of style text. If it is registered too early, we will register it when the window.load
	 * event is fired.
	 * @param {string | ThemableArray} styles Themable style text to register.
	 */
	function loadStyles(styles) {
	    var styleParts = Array.isArray(styles) ? styles : splitStyles(styles);
	    if (_injectStylesWithCssText === undefined) {
	        _injectStylesWithCssText = shouldUseCssText();
	    }
	    applyThemableStyles(styleParts);
	}
	exports.loadStyles = loadStyles;
	/**
	 * Loads a set of style text. If it is registered too early, we will register it when the window.load event
	 * is fired.
	 * @param {string} styleText Style to register.
	 * @param {IStyleRecord} styleRecord Existing style record to re-apply.
	 */
	function applyThemableStyles(styles, styleRecord) {
	    _injectStylesWithCssText ?
	        registerStylesIE(styles, styleRecord) :
	        registerStyles(styles, styleRecord);
	}
	/**
	 * Registers a set theme tokens to find and replace. If styles were already registered, they will be
	 * replaced.
	 * @param {any} theme JSON object of theme tokens to values.
	 */
	function loadTheme(theme) {
	    _themeState.theme = theme;
	    // reload styles.
	    reloadStyles();
	}
	exports.loadTheme = loadTheme;
	/**
	 * Reloads styles.
	 * @param {any} theme JSON object of theme tokens to values.
	 */
	function reloadStyles() {
	    if (_themeState.theme) {
	        for (var _i = 0, _a = _themeState.registeredStyles; _i < _a.length; _i++) {
	            var styleRecord = _a[_i];
	            applyThemableStyles(styleRecord.themableStyle, styleRecord);
	        }
	    }
	}
	/**
	 * Find theme tokens and replaces them with provided theme values.
	 * @param {string} styles Tokenized styles to fix.
	 */
	function detokenize(styles) {
	    if (styles) {
	        styles = resolveThemableArray(splitStyles(styles));
	    }
	    return styles;
	}
	exports.detokenize = detokenize;
	/**
	 * Resolves ThemingInstruction objects in an array and joins the result into a string.
	 * @param {ThemableArray} splitStyleArray ThemableArray to resolve and join.
	 */
	function resolveThemableArray(splitStyleArray) {
	    var theme = _themeState.theme;
	    var resolvedCss;
	    if (splitStyleArray) {
	        // Resolve the array of theming instructions to an array of strings.
	        // Then join the array to produce the final CSS string.
	        var resolvedArray = splitStyleArray.map(function (currentValue) {
	            var themeSlot = currentValue.theme;
	            if (themeSlot != null) {
	                // A theming annotation. Resolve it.
	                var themedValue = theme ? theme[themeSlot] : null;
	                var defaultValue = currentValue.defaultValue;
	                // Warn to console if we hit an unthemed value even when themes are provided.
	                // Allow the themedValue to be null to explicitly request the default value.
	                if (theme && !themedValue && console && !(themeSlot in theme)) {
	                    /* tslint:disable: max-line-length */
	                    console.warn("Theming value not provided for \"" + themeSlot + "\". Falling back to \"" + (defaultValue || 'inherit') + "\".");
	                }
	                return themedValue || defaultValue || 'inherit';
	            }
	            else {
	                // A non-themable string. Preserve it.
	                return currentValue.rawString;
	            }
	        });
	        resolvedCss = resolvedArray.join('');
	    }
	    return resolvedCss;
	}
	/**
	 * Split tokenized CSS into an array of strings and theme specification objects
	 * @param {string} styles Tokenized styles to split.
	 */
	function splitStyles(styles) {
	    var result = [];
	    if (styles) {
	        var pos = 0; // Current position in styles.
	        var tokenMatch = void 0;
	        while (tokenMatch = _themeTokenRegex.exec(styles)) {
	            var matchIndex = tokenMatch.index;
	            if (matchIndex > pos) {
	                result.push({
	                    rawString: styles.substring(pos, matchIndex)
	                });
	            }
	            result.push({
	                theme: tokenMatch[1],
	                defaultValue: tokenMatch[2] // May be undefined
	            });
	            // index of the first character after the current match
	            pos = _themeTokenRegex.lastIndex;
	        }
	        // Push the rest of the string after the last match.
	        result.push({
	            rawString: styles.substring(pos)
	        });
	    }
	    return result;
	}
	exports.splitStyles = splitStyles;
	/**
	 * Registers a set of style text. If it is registered too early, we will register it when the
	 * window.load event is fired.
	 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
	 * @param {IStyleRecord} styleRecord May specify a style Element to update.
	 */
	function registerStyles(styleArray, styleRecord) {
	    var head = document.getElementsByTagName('head')[0];
	    var styleElement = document.createElement('style');
	    styleElement.type = 'text/css';
	    styleElement.appendChild(document.createTextNode(resolveThemableArray(styleArray)));
	    if (styleRecord) {
	        head.replaceChild(styleElement, styleRecord.styleElement);
	        styleRecord.styleElement = styleElement;
	    }
	    else {
	        head.appendChild(styleElement);
	    }
	    if (!styleRecord) {
	        _themeState.registeredStyles.push({
	            styleElement: styleElement,
	            themableStyle: styleArray
	        });
	    }
	}
	/**
	 * Registers a set of style text, for IE 9 and below, which has a ~30 style element limit so we need
	 * to register slightly differently.
	 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
	 * @param {IStyleRecord} styleRecord May specify a style Element to update.
	 */
	function registerStylesIE(styleArray, styleRecord) {
	    var head = document.getElementsByTagName('head')[0];
	    var lastStyleElement = _themeState.lastStyleElement, registeredStyles = _themeState.registeredStyles;
	    var stylesheet = lastStyleElement ? lastStyleElement.styleSheet : null;
	    var lastStyleContent = stylesheet ? stylesheet.cssText : '';
	    var lastRegisteredStyle = registeredStyles[registeredStyles.length - 1];
	    var resolvedStyleText = resolveThemableArray(styleArray);
	    if (!lastStyleElement || (lastStyleContent.length + resolvedStyleText.length) > MAX_STYLE_CONTENT_SIZE) {
	        lastStyleElement = document.createElement('style');
	        lastStyleElement.type = 'text/css';
	        if (styleRecord) {
	            head.replaceChild(lastStyleElement, styleRecord.styleElement);
	            styleRecord.styleElement = lastStyleElement;
	        }
	        else {
	            head.appendChild(lastStyleElement);
	        }
	        if (!styleRecord) {
	            lastRegisteredStyle = {
	                styleElement: lastStyleElement,
	                themableStyle: styleArray
	            };
	            registeredStyles.push(lastRegisteredStyle);
	        }
	    }
	    lastStyleElement.styleSheet.cssText += detokenize(resolvedStyleText);
	    Array.prototype.push.apply(lastRegisteredStyle.themableStyle, styleArray); // concat in-place
	    // Preserve the theme state.
	    _themeState.lastStyleElement = lastStyleElement;
	}
	/**
	 * Checks to see if styleSheet exists as a property off of a style element.
	 * This will determine if style registration should be done via cssText (<= IE9) or not
	 */
	function shouldUseCssText() {
	    var useCSSText = false;
	    if (typeof document !== 'undefined') {
	        var emptyStyle = document.createElement('style');
	        emptyStyle.type = 'text/css';
	        useCSSText = !!emptyStyle.styleSheet;
	    }
	    return useCSSText;
	}
	


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* tslint:disable */
	__webpack_require__(17);
	var styles = {
	    photopileWebPart: 'photopileWebPart_44ab54de',
	    workingOnItSpinner: 'workingOnItSpinner_44ab54de',
	    loadingLabel: 'loadingLabel_44ab54de',
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = styles;
	/* tslint:enable */ 
	


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var content = __webpack_require__(18);
	var loader = __webpack_require__(20);
	
	if(typeof content === "string") content = [[module.id, content]];
	
	// add the styles to the DOM
	for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1]);
	
	if(content.locals) module.exports = content.locals;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports
	
	
	// module
	exports.push([module.id, ".photopileWebPart_44ab54de .workingOnItSpinner_44ab54de{display:block;top:0;bottom:0;margin:auto;height:33.33333%;line-height:1.5em;padding:20px 20px}.photopileWebPart_44ab54de .loadingLabel_44ab54de{position:relative;top:-25px;left:35px}", ""]);
	
	// exports


/***/ },
/* 19 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * An IThemingInstruction can specify a rawString to be preserved or a theme slot and a default value
	 * to use if that slot is not specified by the theme.
	 */
	"use strict";
	// IE needs to inject styles using cssText. However, we need to evaluate this lazily, so this
	// value will initialize as undefined, and later will be set once on first loadStyles injection.
	var _injectStylesWithCssText;
	// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
	// load-themed-styles hosted on the page.
	var _root = (typeof window === 'undefined') ? global : window; // tslint:disable-line:no-any
	var _themeState = _root.__themeState__ = _root.__themeState__ || {
	    theme: undefined,
	    lastStyleElement: undefined,
	    registeredStyles: []
	};
	/**
	 * Matches theming tokens. For example, "[theme: themeSlotName, default: #FFF]" (including the quotes).
	 */
	/* tslint:disable: max-line-length */
	var _themeTokenRegex = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g;
	/* tslint:enable: max-line-length */
	/** Maximum style text length, for supporting IE style restrictions. */
	var MAX_STYLE_CONTENT_SIZE = 10000;
	/**
	 * Loads a set of style text. If it is registered too early, we will register it when the window.load
	 * event is fired.
	 * @param {string | ThemableArray} styles Themable style text to register.
	 */
	function loadStyles(styles) {
	    var styleParts = Array.isArray(styles) ? styles : splitStyles(styles);
	    if (_injectStylesWithCssText === undefined) {
	        _injectStylesWithCssText = shouldUseCssText();
	    }
	    applyThemableStyles(styleParts);
	}
	exports.loadStyles = loadStyles;
	/**
	 * Allows for customizable loadStyles logic. e.g. for server side rendering application
	 * @param {(styles: string) => void} a loadStyles callback that gets called when styles are loaded or reloaded
	 */
	function configureLoadStyles(callback) {
	    _themeState.loadStyles = callback;
	}
	exports.configureLoadStyles = configureLoadStyles;
	/**
	 * Loads a set of style text. If it is registered too early, we will register it when the window.load event
	 * is fired.
	 * @param {string} styleText Style to register.
	 * @param {IStyleRecord} styleRecord Existing style record to re-apply.
	 */
	function applyThemableStyles(stylesArray, styleRecord) {
	    if (_themeState.loadStyles) {
	        var styles = resolveThemableArray(stylesArray);
	        _themeState.loadStyles(styles);
	    }
	    else {
	        _injectStylesWithCssText ?
	            registerStylesIE(stylesArray, styleRecord) :
	            registerStyles(stylesArray, styleRecord);
	    }
	}
	/**
	 * Registers a set theme tokens to find and replace. If styles were already registered, they will be
	 * replaced.
	 * @param {theme} theme JSON object of theme tokens to values.
	 */
	function loadTheme(theme) {
	    _themeState.theme = theme;
	    // reload styles.
	    reloadStyles();
	}
	exports.loadTheme = loadTheme;
	/**
	 * Reloads styles.
	 */
	function reloadStyles() {
	    if (_themeState.theme) {
	        for (var _i = 0, _a = _themeState.registeredStyles; _i < _a.length; _i++) {
	            var styleRecord = _a[_i];
	            applyThemableStyles(styleRecord.themableStyle, styleRecord);
	        }
	    }
	}
	/**
	 * Find theme tokens and replaces them with provided theme values.
	 * @param {string} styles Tokenized styles to fix.
	 */
	function detokenize(styles) {
	    if (styles) {
	        styles = resolveThemableArray(splitStyles(styles));
	    }
	    return styles;
	}
	exports.detokenize = detokenize;
	/**
	 * Resolves ThemingInstruction objects in an array and joins the result into a string.
	 * @param {ThemableArray} splitStyleArray ThemableArray to resolve and join.
	 */
	function resolveThemableArray(splitStyleArray) {
	    var theme = _themeState.theme;
	    var resolvedCss;
	    if (splitStyleArray) {
	        // Resolve the array of theming instructions to an array of strings.
	        // Then join the array to produce the final CSS string.
	        var resolvedArray = splitStyleArray.map(function (currentValue) {
	            var themeSlot = currentValue.theme;
	            if (themeSlot) {
	                // A theming annotation. Resolve it.
	                var themedValue = theme ? theme[themeSlot] : undefined;
	                var defaultValue = currentValue.defaultValue;
	                // Warn to console if we hit an unthemed value even when themes are provided.
	                // Allow the themedValue to be undefined to explicitly request the default value.
	                if (theme && !themedValue && console && !(themeSlot in theme)) {
	                    /* tslint:disable: max-line-length */
	                    console.warn("Theming value not provided for \"" + themeSlot + "\". Falling back to \"" + (defaultValue || 'inherit') + "\".");
	                }
	                return themedValue || defaultValue || 'inherit';
	            }
	            else {
	                // A non-themable string. Preserve it.
	                return currentValue.rawString;
	            }
	        });
	        resolvedCss = resolvedArray.join('');
	    }
	    return resolvedCss;
	}
	/**
	 * Split tokenized CSS into an array of strings and theme specification objects
	 * @param {string} styles Tokenized styles to split.
	 */
	function splitStyles(styles) {
	    var result = [];
	    if (styles) {
	        var pos = 0; // Current position in styles.
	        var tokenMatch = void 0;
	        while (tokenMatch = _themeTokenRegex.exec(styles)) {
	            var matchIndex = tokenMatch.index;
	            if (matchIndex > pos) {
	                result.push({
	                    rawString: styles.substring(pos, matchIndex)
	                });
	            }
	            result.push({
	                theme: tokenMatch[1],
	                defaultValue: tokenMatch[2] // May be undefined
	            });
	            // index of the first character after the current match
	            pos = _themeTokenRegex.lastIndex;
	        }
	        // Push the rest of the string after the last match.
	        result.push({
	            rawString: styles.substring(pos)
	        });
	    }
	    return result;
	}
	exports.splitStyles = splitStyles;
	/**
	 * Registers a set of style text. If it is registered too early, we will register it when the
	 * window.load event is fired.
	 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
	 * @param {IStyleRecord} styleRecord May specify a style Element to update.
	 */
	function registerStyles(styleArray, styleRecord) {
	    var head = document.getElementsByTagName('head')[0];
	    var styleElement = document.createElement('style');
	    styleElement.type = 'text/css';
	    styleElement.appendChild(document.createTextNode(resolveThemableArray(styleArray)));
	    if (styleRecord) {
	        head.replaceChild(styleElement, styleRecord.styleElement);
	        styleRecord.styleElement = styleElement;
	    }
	    else {
	        head.appendChild(styleElement);
	    }
	    if (!styleRecord) {
	        _themeState.registeredStyles.push({
	            styleElement: styleElement,
	            themableStyle: styleArray
	        });
	    }
	}
	/**
	 * Registers a set of style text, for IE 9 and below, which has a ~30 style element limit so we need
	 * to register slightly differently.
	 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
	 * @param {IStyleRecord} styleRecord May specify a style Element to update.
	 */
	function registerStylesIE(styleArray, styleRecord) {
	    var head = document.getElementsByTagName('head')[0];
	    var lastStyleElement = _themeState.lastStyleElement, registeredStyles = _themeState.registeredStyles;
	    var stylesheet = lastStyleElement ? lastStyleElement.styleSheet : undefined;
	    var lastStyleContent = stylesheet ? stylesheet.cssText : '';
	    var lastRegisteredStyle = registeredStyles[registeredStyles.length - 1];
	    var resolvedStyleText = resolveThemableArray(styleArray);
	    if (!lastStyleElement || (lastStyleContent.length + resolvedStyleText.length) > MAX_STYLE_CONTENT_SIZE) {
	        lastStyleElement = document.createElement('style');
	        lastStyleElement.type = 'text/css';
	        if (styleRecord) {
	            head.replaceChild(lastStyleElement, styleRecord.styleElement);
	            styleRecord.styleElement = lastStyleElement;
	        }
	        else {
	            head.appendChild(lastStyleElement);
	        }
	        if (!styleRecord) {
	            lastRegisteredStyle = {
	                styleElement: lastStyleElement,
	                themableStyle: styleArray
	            };
	            registeredStyles.push(lastRegisteredStyle);
	        }
	    }
	    lastStyleElement.styleSheet.cssText += detokenize(resolvedStyleText);
	    Array.prototype.push.apply(lastRegisteredStyle.themableStyle, styleArray); // concat in-place
	    // Preserve the theme state.
	    _themeState.lastStyleElement = lastStyleElement;
	}
	/**
	 * Checks to see if styleSheet exists as a property off of a style element.
	 * This will determine if style registration should be done via cssText (<= IE9) or not
	 */
	function shouldUseCssText() {
	    var useCSSText = false;
	    if (typeof document !== 'undefined') {
	        var emptyStyle = document.createElement('style');
	        emptyStyle.type = 'text/css';
	        useCSSText = !!emptyStyle.styleSheet;
	    }
	    return useCSSText;
	}
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sp_http_1 = __webpack_require__(22);
	var sp_core_library_1 = __webpack_require__(1);
	var MockHttpClient_1 = __webpack_require__(23);
	/**
	 * @class
	 * Service implementation to get list & list items from current SharePoint site
	 */
	var SPPicturesListService = (function () {
	    /**
	     * @function
	     * Service constructor
	     */
	    function SPPicturesListService(_props, pageContext) {
	        this.props = _props;
	        this.context = pageContext;
	    }
	    /**
	     * @function
	     * Gets the list of picture libs in the current SharePoint site
	     */
	    SPPicturesListService.prototype.getPictureLibs = function () {
	        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
	            //If the running environment is local, load the data from the mock
	            return this.getPictureLibsFromMock();
	        }
	        else {
	            //If the running environment is SharePoint, request the lists REST service
	            //Gets only the list with BaseTemplate = 109 (picture libs)
	            return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/lists?$select=Title,id,BaseTemplate&$filter=BaseTemplate%20eq%20109", sp_http_1.SPHttpClient.configurations.v1)
	                .then(function (response) {
	                return response.json();
	            });
	        }
	    };
	    /**
	     * @function
	     * Returns 3 fake SharePoint lists for the Mock mode
	     */
	    SPPicturesListService.prototype.getPictureLibsFromMock = function () {
	        return MockHttpClient_1.default.getLists(this.context.pageContext.web.absoluteUrl).then(function () {
	            var listData = {
	                value: [
	                    { Title: 'Mock List One', Id: '1', BaseTemplate: '109' },
	                    { Title: 'Mock List Two', Id: '2', BaseTemplate: '109' },
	                    { Title: 'Mock List Three', Id: '3', BaseTemplate: '109' }
	                ]
	            };
	            return listData;
	        });
	    };
	    /**
	     * @function
	     * Gets the pictures from a SharePoint list
	     */
	    SPPicturesListService.prototype.getPictures = function (libId) {
	        var _this = this;
	        if (sp_core_library_1.Environment.type === sp_core_library_1.EnvironmentType.Local) {
	            //If the running environment is local, load the data from the mock
	            return this.getPicturesFromMock(libId);
	        }
	        else {
	            //If the running environment is SharePoint, request the items REST service
	            //Builds the request to get only some fields, order the items & limit the number of items
	            //TODO: optimize the request to not include folders and get only items
	            var restUrl = this.context.pageContext.web.absoluteUrl;
	            restUrl += "/_api/Web/Lists(guid'";
	            restUrl += this.props.listName;
	            restUrl += "')/items?$expand=File&$select=Title,Description,id,File,FileSystemObjectType&$orderby=";
	            restUrl += this.props.orderBy;
	            restUrl += "%20";
	            restUrl += this.props.orderByAsc;
	            restUrl += "&$top=";
	            restUrl += this.props.count;
	            //Request the SharePoint web service
	            return this.context.spHttpClient.get(restUrl, sp_http_1.SPHttpClient.configurations.v1).then(function (response) {
	                return response.json().then(function (responseFormated) {
	                    var formatedResponse = { value: [] };
	                    //Fetchs the Json response to construct the final items list
	                    responseFormated.value.map(function (object, i) {
	                        //Tests if the result is a file and not a folder
	                        if (object['FileSystemObjectType'] == '0') {
	                            var spListItem = {
	                                'ID': object["ID"],
	                                'Title': object['Title'],
	                                'Description': object['Description'],
	                                'File': {
	                                    'Name': object['File']['Name'],
	                                    'ServerRelativeUrl': object['File']['ServerRelativeUrl']
	                                }
	                            };
	                            //Creates the thumbnail item url from the Picture path
	                            spListItem.File.ThumbnailServerUrl = _this.getThumbnailUrl(spListItem.File.ServerRelativeUrl, spListItem.File.Name);
	                            formatedResponse.value.push(spListItem);
	                        }
	                    });
	                    return formatedResponse;
	                });
	            });
	        }
	    };
	    /**
	     * @function
	     * Gets the thumbnail picture url from the Picture name.
	     * In SharePoint pictures libs, the thumbnail url is formated as for example '/_t/10_jpg.jpg'
	     */
	    SPPicturesListService.prototype.getThumbnailUrl = function (pictureUrl, pictureName) {
	        if (pictureUrl == null || pictureUrl == '')
	            return '';
	        var thumbUrl = '';
	        thumbUrl = pictureUrl.replace(pictureName, '');
	        thumbUrl += "_t/";
	        thumbUrl += pictureName.replace(".", "_");
	        thumbUrl += ".jpg";
	        return thumbUrl;
	    };
	    /**
	     * @function
	     * Gets the pictures list from the mock. This function will return a
	     * different list of pics for the lib 1 & 2, and an empty list for the third.
	     */
	    SPPicturesListService.prototype.getPicturesFromMock = function (libId) {
	        return MockHttpClient_1.default.getListsItems(this.context.pageContext.web.absoluteUrl).then(function () {
	            var listData = { value: [] };
	            if (libId == '1') {
	                listData = {
	                    value: [
	                        {
	                            "ID": "1", "Title": "Barton Dam, Ann Arbor, Michigan", "Description": "",
	                            "File": {
	                                "Name": "01.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/01.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/01.jpg"
	                            }
	                        },
	                        {
	                            "ID": "2", "Title": "Building Atlanta, Georgia", "Description": "",
	                            "File": {
	                                "Name": "02.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/02.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/02.jpg"
	                            }
	                        },
	                        {
	                            "ID": "3", "Title": "Nice day for a swim", "Description": "",
	                            "File": {
	                                "Name": "03.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/03.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/03.jpg"
	                            }
	                        },
	                        {
	                            "ID": "4", "Title": "The plants that never die", "Description": "",
	                            "File": {
	                                "Name": "04.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/04.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/04.jpg"
	                            }
	                        },
	                        {
	                            "ID": "5", "Title": "Downtown Atlanta, Georgia", "Description": "",
	                            "File": {
	                                "Name": "05.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/05.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/05.jpg"
	                            }
	                        },
	                        {
	                            "ID": "6", "Title": "Atlanta traffic", "Description": "",
	                            "File": {
	                                "Name": "06.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/06.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/06.jpg"
	                            }
	                        },
	                        {
	                            "ID": "7", "Title": "A pathetic dog", "Description": "",
	                            "File": {
	                                "Name": "07.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/07.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/07.jpg"
	                            }
	                        },
	                        {
	                            "ID": "8", "Title": "Two happy dogs", "Description": "",
	                            "File": {
	                                "Name": "08.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/08.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/08.jpg"
	                            }
	                        },
	                        {
	                            "ID": "9", "Title": "Antigua, Guatemala", "Description": "",
	                            "File": {
	                                "Name": "09.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/09.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/09.jpg"
	                            }
	                        },
	                        {
	                            "ID": "10", "Title": "Iximche, Guatemala", "Description": "",
	                            "File": {
	                                "Name": "10.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/10.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/10.jpg"
	                            }
	                        }
	                    ]
	                };
	            }
	            else if (libId == '2') {
	                listData = {
	                    value: [
	                        {
	                            "ID": "11", "Title": "Barton Dam, Ann Arbor, Michigan", "Description": "",
	                            "File": {
	                                "Name": "11.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/11.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/11.jpg"
	                            }
	                        },
	                        {
	                            "ID": "12", "Title": "Building Atlanta, Georgia", "Description": "",
	                            "File": {
	                                "Name": "12.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/12.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/12.jpg"
	                            }
	                        },
	                        {
	                            "ID": "13", "Title": "Nice day for a swim", "Description": "",
	                            "File": {
	                                "Name": "13.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/13.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/13.jpg"
	                            }
	                        },
	                        {
	                            "ID": "14", "Title": "The plants that never die", "Description": "",
	                            "File": {
	                                "Name": "14.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/14.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/14.jpg"
	                            }
	                        },
	                        {
	                            "ID": "15", "Title": "Downtown Atlanta, Georgia", "Description": "",
	                            "File": {
	                                "Name": "15.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/15.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/15.jpg"
	                            }
	                        },
	                        {
	                            "ID": "16", "Title": "Atlanta traffic", "Description": "",
	                            "File": {
	                                "Name": "16.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/16.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/16.jpg"
	                            }
	                        },
	                        {
	                            "ID": "17", "Title": "A pathetic dog", "Description": "",
	                            "File": {
	                                "Name": "17.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/17.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/17.jpg"
	                            }
	                        },
	                        {
	                            "ID": "18", "Title": "Two happy dogs", "Description": "",
	                            "File": {
	                                "Name": "18.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/18.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/18.jpg"
	                            }
	                        },
	                        {
	                            "ID": "19", "Title": "Antigua, Guatemala", "Description": "",
	                            "File": {
	                                "Name": "19.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/19.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/19.jpg"
	                            }
	                        },
	                        {
	                            "ID": "20", "Title": "Iximche, Guatemala", "Description": "",
	                            "File": {
	                                "Name": "20.jpg",
	                                "ServerRelativeUrl": "../src/webparts/photopileWebPart/images/fullsize/20.jpg",
	                                "ThumbnailServerUrl": "../src/webparts/photopileWebPart/images/thumbs/20.jpg"
	                            }
	                        }
	                    ]
	                };
	            }
	            return listData;
	        });
	    };
	    return SPPicturesListService;
	}());
	exports.SPPicturesListService = SPPicturesListService;
	


/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ },
/* 23 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * @class
	 * Defines a http client to request mock data to use the web part with the local workbench
	 */
	var MockHttpClient = (function () {
	    function MockHttpClient() {
	    }
	    /**
	     * @function
	     * Mock get SharePoint list request
	     */
	    MockHttpClient.getLists = function (restUrl, options) {
	        return new Promise(function (resolve) {
	            resolve(MockHttpClient._lists);
	        });
	    };
	    /**
	     * @function
	     * Mock get SharePoint list items request
	     */
	    MockHttpClient.getListsItems = function (restUrl, options) {
	        return new Promise(function (resolve) {
	            resolve(MockHttpClient._items);
	        });
	    };
	    return MockHttpClient;
	}());
	/**
	 * @var
	 * Mock SharePoint list sample
	 */
	MockHttpClient._lists = [{ Title: 'Mock List', Id: '1', BaseTemplate: '109' }];
	/**
	 * @var
	 * Mock SharePoint list item sample
	 */
	MockHttpClient._items = [
	    { "ID": "1", "Title": "Pic 1", "Description": "", "File": { "Name": "1.jpg", "ServerRelativeUrl": "/Images/1.jpg" } }
	];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MockHttpClient;



/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_24__;

/***/ },
/* 25 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_25__;

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_26__;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* tslint:disable */
	__webpack_require__(28);
	/* tslint:enable */ 
	


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var content = __webpack_require__(29);
	var loader = __webpack_require__(20);
	
	if(typeof content === "string") content = [[module.id, content]];
	
	// add the styles to the DOM
	for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1]);
	
	if(content.locals) module.exports = content.locals;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(19)();
	// imports
	
	
	// module
	exports.push([module.id, "@media (max-width:320px){ul.photopile li a{max-width:85px}}@media (min-width:321px) and (max-width:568px){ul.photopile li a{max-width:100px}}@media (min-width:569px) and (max-width:768px){ul.photopile li a{max-width:115px}}@media (min-width:769px) and (max-width:1024px){ul.photopile li a{max-width:125px}}@media (min-width:1025px){ul.photopile li a{max-width:150px}}div#photopile-nav-next,div#photopile-nav-next:hover,div#photopile-nav-prev,div#photopile-nav-prev:hover{background-image:url(//photopilewebpart.blob.core.windows.net/photopile-web-part/nav-sprites.png)}ul.photopile{display:none}ul.photopile{position:relative;display:inline-block;width:100%;margin:0;padding:0;list-style:none}ul.photopile li{display:inline-block;position:relative;margin:2px;padding:0;-webkit-backface-visibility:hidden}ul.photopile li a{display:block;padding:2px;outline:0;text-decoration:none;border:1px solid #6F6F6F;box-shadow:0 0 20px #3D3D3D}ul.photopile li.photopile-active-thumbnail a:hover,ul.photopile li.photopile-active-thumbnail:hover{cursor:default}ul.photopile li a img{display:block;margin:0;padding:0;border:1px solid #6F6F6F;width:100%;height:auto;box-sizing:border-box}div#photopile-active-image-container{border:1px solid #6F6F6F;box-shadow:0 20px 80px #000;box-sizing:border-box}div#photopile-active-image-container img{margin:0 auto;height:auto}div#photopile-active-image-info{position:relative;width:100%;background:rgba(0,0,0,.3)}div#photopile-active-image-info p{color:#fff;font-size:12px;margin:0;padding:3px 8px}div#photopile-nav-next,div#photopile-nav-prev{opacity:0;position:absolute;top:50%;width:30px;height:40px;margin-top:-20px;cursor:pointer}div#photopile-nav-next{right:0;margin-right:-35px;background-position:-50px 0}div#photopile-nav-next:hover{background-position:-50px -50px}div#photopile-nav-prev{left:0;right:0;margin-left:-35px;background-position:0 0}div#photopile-nav-prev:hover{background-position:0 -50px}", ""]);
	
	// exports


/***/ }
/******/ ])});;
//# sourceMappingURL=photopile-web-part.bundle.js.map