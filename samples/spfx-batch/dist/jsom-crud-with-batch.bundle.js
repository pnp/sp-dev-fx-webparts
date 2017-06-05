define("9353071d-4fd2-4149-ac5c-0b4f849d2c28_0.0.1", ["@microsoft/sp-core-library","@microsoft/sp-webpart-base","jsomCrudWithBatchStrings","sp-init","microsoft-ajax","sp-runtime","sharepoint"], function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__) { return /******/ (function(modules) { // webpackBootstrap
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
	var sp_webpart_base_1 = __webpack_require__(2);
	var JsomCrudWithBatch_module_scss_1 = __webpack_require__(3);
	var strings = __webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	var JsomCrudWithBatchWebPart = (function (_super) {
	    __extends(JsomCrudWithBatchWebPart, _super);
	    function JsomCrudWithBatchWebPart() {
	        var _this = _super !== null && _super.apply(this, arguments) || this;
	        _this.webpartTitle = "";
	        return _this;
	    }
	    JsomCrudWithBatchWebPart.prototype.render = function () {
	        this.domElement.innerHTML = "\n  <div class=\"" + JsomCrudWithBatch_module_scss_1.default.spPnPJsCrud + "\">\n    <div class=\"" + JsomCrudWithBatch_module_scss_1.default.container + "\">\n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + JsomCrudWithBatch_module_scss_1.default.row + "\">\n        <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <span class=\"ms-font-xl ms-fontColor-white\">\n            Sample SharePoint CRUD operations using the SP JSOM library\n          </span>\n        </div>\n      </div>\n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + JsomCrudWithBatch_module_scss_1.default.row + "\">\n        <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <button class=\"" + JsomCrudWithBatch_module_scss_1.default.button + " create-Button\">\n            <span class=\"" + JsomCrudWithBatch_module_scss_1.default.label + "\">Create item</span>\n          </button>          \n        </div>\n      </div>\n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + JsomCrudWithBatch_module_scss_1.default.row + "\">\n        <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <button class=\"" + JsomCrudWithBatch_module_scss_1.default.button + " readall-Button\">\n            <span class=\"" + JsomCrudWithBatch_module_scss_1.default.label + "\">Read all items</span>\n          </button>\n        </div>\n      </div>\n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + JsomCrudWithBatch_module_scss_1.default.row + "\">\n        <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <button class=\"" + JsomCrudWithBatch_module_scss_1.default.button + " update-Button\">\n            <span class=\"" + JsomCrudWithBatch_module_scss_1.default.label + "\">Update latest items</span>\n          </button>\n          <button class=\"" + JsomCrudWithBatch_module_scss_1.default.button + " delete-Button\">\n            <span class=\"" + JsomCrudWithBatch_module_scss_1.default.label + "\">Delete item</span>\n          </button>\n        </div>\n      </div>\n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + JsomCrudWithBatch_module_scss_1.default.row + "\">\n        <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <div class=\"status\"></div>\n          <ul class=\"items\"><ul>\n        </div>\n      </div>\n    </div>\n  </div>\n    ";
	        this.updateStatus(this.listNotConfigured() ? 'Please configure list in Web Part properties' : 'Ready');
	        this.setButtonsState();
	        this.setButtonsEventHandlers();
	    };
	    JsomCrudWithBatchWebPart.prototype.setButtonsState = function () {
	        var buttons = this.domElement.querySelectorAll("button." + JsomCrudWithBatch_module_scss_1.default.button);
	        var listNotConfigured = this.listNotConfigured();
	        for (var i = 0; i < buttons.length; i++) {
	            var button = buttons.item(i);
	            if (listNotConfigured) {
	                button.setAttribute('disabled', 'disabled');
	            }
	            else {
	                button.removeAttribute('disabled');
	            }
	        }
	    };
	    JsomCrudWithBatchWebPart.prototype.listNotConfigured = function () {
	        return this.properties.listName === undefined ||
	            this.properties.listName === null ||
	            this.properties.listName.length === 0;
	    };
	    JsomCrudWithBatchWebPart.prototype.setButtonsEventHandlers = function () {
	        var webPart = this;
	        this.domElement.querySelector('button.create-Button').addEventListener('click', function () { webPart.createItem(); });
	        this.domElement.querySelector('button.readall-Button').addEventListener('click', function () { webPart.readItems(); });
	        this.domElement.querySelector('button.update-Button').addEventListener('click', function () { webPart.updateItem(); });
	        this.domElement.querySelector('button.delete-Button').addEventListener('click', function () { webPart.deleteItem(); });
	    };
	    JsomCrudWithBatchWebPart.prototype.updateStatus = function (status, items) {
	        if (items === void 0) { items = []; }
	        this.domElement.querySelector('.status').innerHTML = status;
	        this.updateItemsHtml(items);
	    };
	    JsomCrudWithBatchWebPart.prototype.updateItemsHtml = function (items) {
	        var itemsHtml = [];
	        for (var i = 0; i < items.length; i++) {
	            itemsHtml.push("<li>" + items[i].Title + " (" + items[i].Id + ")</li>");
	        }
	        this.domElement.querySelector('.items').innerHTML = itemsHtml.join('');
	    };
	    JsomCrudWithBatchWebPart.prototype.readItems = function () {
	        this.updateStatus('Loading all items...');
	        var context = new SP.ClientContext(this.context.pageContext.web.absoluteUrl);
	        var list = context.get_web().get_lists().getByTitle(this.properties.listName);
	        var camlQuery = SP.CamlQuery.createAllItemsQuery();
	        var collTermListItem = list.getItems(camlQuery);
	        var listItems = [];
	        context.load(list);
	        context.load(collTermListItem, 'Include(Title,Id)');
	        var beforeCallback = this;
	        context.executeQueryAsync(function name(sender, args) {
	            var listItemInfo = '';
	            var listItemEnumerator = collTermListItem.getEnumerator();
	            while (listItemEnumerator.moveNext()) {
	                var oListItem = listItemEnumerator.get_current();
	                //listItemInfo = oListItem.get_item('Title') + '\n';
	                listItems.push({
	                    Title: oListItem.get_item('Title'),
	                    Id: oListItem.get_id()
	                });
	            }
	            console.log(listItems);
	            beforeCallback.updateStatus("Successfully loaded " + listItems.length + " items", listItems);
	        }, function (sender, args) {
	            console.log(args.get_message());
	            beforeCallback.updateStatus("Error occured: " + args.get_message());
	        });
	    };
	    JsomCrudWithBatchWebPart.prototype.createItem = function () {
	        this.updateStatus('Creating item...');
	        var itemArray = [];
	        var context = new SP.ClientContext(this.context.pageContext.web.absoluteUrl);
	        var list = context.get_web().get_lists().getByTitle(this.properties.listName);
	        var beforeCallback = this;
	        for (var i = 0; i < 5; i++) {
	            var itemCreateInfo = new SP.ListItemCreationInformation();
	            var oListItem = list.addItem(itemCreateInfo);
	            oListItem.set_item('Title', 'Batch add ' + i);
	            oListItem.update();
	            itemArray[i] = oListItem;
	            context.load(itemArray[i]);
	        }
	        context.executeQueryAsync(function () {
	            beforeCallback.updateStatus("Items successfully created via batch");
	        }, function (args) {
	            beforeCallback.updateStatus("Error occured while creating items: " + args.get_message() + " \n " + args.get_stackTrace());
	        });
	    };
	    JsomCrudWithBatchWebPart.prototype.getLatestItemId = function (successCallback, errorCallback) {
	        //todo - associate with a slider/dropdown/textbox to set number of items
	        var context = new SP.ClientContext(this.context.pageContext.web.absoluteUrl);
	        var list = context.get_web().get_lists().getByTitle(this.properties.listName);
	        var camlQuery = SP.CamlQuery.createAllItemsQuery();
	        camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="ID" Ascending="False"/></OrderBy></Where></Query><RowLimit>5</RowLimit></View>');
	        var collTermListItem = list.getItems(camlQuery);
	        var listItems = [];
	        context.load(list);
	        context.load(collTermListItem, 'Include(Id)');
	        var beforeCallback = this;
	        context.executeQueryAsync(function name(sender, args) {
	            var listItemInfo = '';
	            var listItemEnumerator = collTermListItem.getEnumerator();
	            while (listItemEnumerator.moveNext()) {
	                var oListItem = listItemEnumerator.get_current();
	                listItems.push({
	                    Id: oListItem.get_id()
	                });
	            }
	            successCallback(listItems);
	        }, function (sender, args) {
	            errorCallback(args.get_message());
	        });
	    };
	    JsomCrudWithBatchWebPart.prototype.updateItem = function () {
	        var webUrl = this.context.pageContext.web.absoluteUrl;
	        var listName = this.properties.listName;
	        this.updateStatus('Updating latest items...');
	        var beforeCallback = this;
	        this.getLatestItemId(function (data) {
	            var itemArray = [];
	            var context = new SP.ClientContext(webUrl);
	            var list = context.get_web().get_lists().getByTitle(listName);
	            for (var i = 0; i < data.length; i++) {
	                var oListItem = list.getItemById(data[i].Id);
	                oListItem.set_item('Title', 'Updated from batch ' + i);
	                oListItem.update();
	                itemArray[i] = oListItem;
	                context.load(itemArray[i]);
	            }
	            context.executeQueryAsync(function () {
	                var stringOfId = '';
	                data.forEach(function (element) {
	                    stringOfId += element.Id + ',';
	                });
	                beforeCallback.updateStatus("Item with IDs: " + stringOfId + " successfully updated");
	            }, function (args) {
	                beforeCallback.updateStatus("Error occured while updating items: " + args.get_message() + " \n " + args.get_stackTrace());
	            });
	        }, function (data) {
	            console.log(data);
	        });
	    };
	    JsomCrudWithBatchWebPart.prototype.deleteItem = function () {
	        if (!window.confirm('Are you sure you want to delete the latest item?')) {
	            return;
	        }
	        var webUrl = this.context.pageContext.web.absoluteUrl;
	        var listName = this.properties.listName;
	        this.updateStatus('Deleting latest items...');
	        var beforeCallback = this;
	        this.getLatestItemId(function (data) {
	            var itemArray = [];
	            var context = new SP.ClientContext(webUrl);
	            var list = context.get_web().get_lists().getByTitle(listName);
	            for (var i = 0; i < data.length; i++) {
	                var oListItem = list.getItemById(data[i].Id);
	                oListItem.deleteObject();
	            }
	            context.executeQueryAsync(function () {
	                var stringOfId = '';
	                data.forEach(function (element) {
	                    stringOfId += element.Id + ',';
	                });
	                beforeCallback.updateStatus("Item with IDs: " + stringOfId + " successfully deleted");
	            }, function (args) {
	                beforeCallback.updateStatus("Error occured while deleting items: " + args.get_message() + " \n " + args.get_stackTrace());
	            });
	        }, function (data) {
	            console.log(data);
	        });
	    };
	    Object.defineProperty(JsomCrudWithBatchWebPart.prototype, "dataVersion", {
	        get: function () {
	            return sp_core_library_1.Version.parse('1.0');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    JsomCrudWithBatchWebPart.prototype.getPropertyPaneConfiguration = function () {
	        return {
	            pages: [
	                {
	                    header: {
	                        description: strings.PropertyPaneDescription
	                    },
	                    groups: [
	                        {
	                            groupName: strings.DataGroupName,
	                            groupFields: [
	                                sp_webpart_base_1.PropertyPaneTextField('listName', {
	                                    label: strings.ListNameFieldLabel
	                                })
	                            ]
	                        }
	                    ]
	                }
	            ]
	        };
	    };
	    return JsomCrudWithBatchWebPart;
	}(sp_webpart_base_1.BaseClientSideWebPart));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = JsomCrudWithBatchWebPart;



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
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* tslint:disable */
	__webpack_require__(4);
	var styles = {
	    spPnPJsCrud: 'spPnPJsCrud_429c17ca',
	    container: 'container_429c17ca',
	    row: 'row_429c17ca',
	    listItem: 'listItem_429c17ca',
	    button: 'button_429c17ca',
	    label: 'label_429c17ca',
	    disabled: 'disabled_429c17ca',
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = styles;
	/* tslint:enable */ 
	


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var content = __webpack_require__(5);
	var loader = __webpack_require__(7);
	
	if(typeof content === "string") content = [[module.id, content]];
	
	// add the styles to the DOM
	for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1]);
	
	if(content.locals) module.exports = content.locals;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports
	
	
	// module
	exports.push([module.id, ".spPnPJsCrud_429c17ca .container_429c17ca{max-width:700px;margin:0 auto;box-shadow:0 2px 4px 0 rgba(0,0,0,.2),0 25px 50px 0 rgba(0,0,0,.1)}.spPnPJsCrud_429c17ca .row_429c17ca{padding:20px}.spPnPJsCrud_429c17ca .listItem_429c17ca{max-width:715px;margin:5px auto 5px auto;box-shadow:0 0 4px 0 rgba(0,0,0,.2),0 25px 50px 0 rgba(0,0,0,.1)}.spPnPJsCrud_429c17ca .button_429c17ca{text-decoration:none;height:32px;min-width:80px;background-color:#0078d7;border-color:#0078d7;outline:transparent;position:relative;font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;border-width:0;text-align:center;cursor:pointer;display:inline-block;padding:0 16px}.spPnPJsCrud_429c17ca .button_429c17ca .label_429c17ca{font-weight:600;font-size:14px;height:32px;line-height:32px;margin:0 4px;vertical-align:top;display:inline-block;color:#fff}.spPnPJsCrud_429c17ca .button_429c17ca.disabled_429c17ca,.spPnPJsCrud_429c17ca .button_429c17ca:disabled{background-color:#f4f4f4;border-color:#f4f4f4;cursor:default;pointer-events:none}.spPnPJsCrud_429c17ca .button_429c17ca.disabled_429c17ca .label_429c17ca,.spPnPJsCrud_429c17ca .button_429c17ca:disabled .label_429c17ca{color:#a6a6a6}", ""]);
	
	// exports


/***/ },
/* 6 */
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
/* 7 */
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
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ }
/******/ ])});;
//# sourceMappingURL=jsom-crud-with-batch.bundle.js.map