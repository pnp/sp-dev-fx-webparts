define("7f929b71-ebc5-475a-addc-d54e2195f940_0.0.1", ["@microsoft/sp-core-library","@microsoft/sp-webpart-base","weatherStrings","jquery","simpleWeather"], function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__) { return /******/ (function(modules) { // webpackBootstrap
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
	var Weather_module_scss_1 = __webpack_require__(3);
	var strings = __webpack_require__(8);
	var $ = __webpack_require__(9);
	__webpack_require__(10);
	var WeatherWebPart = (function (_super) {
	    __extends(WeatherWebPart, _super);
	    function WeatherWebPart() {
	        return _super.call(this) || this;
	    }
	    WeatherWebPart.prototype.render = function () {
	        if (this.renderedOnce === false) {
	            this.domElement.innerHTML = "<div class=\"" + Weather_module_scss_1.default.weather + "\"></div>";
	        }
	        this.renderContents();
	    };
	    WeatherWebPart.prototype.renderContents = function () {
	        this.container = $("." + Weather_module_scss_1.default.weather, this.domElement);
	        var location = this.properties.location;
	        if (!location || location.length === 0) {
	            this.container.html('<p>Please specify a location</p>');
	            return;
	        }
	        var webPart = this;
	        $.simpleWeather({
	            location: location,
	            woeid: '',
	            unit: 'c',
	            success: function (weather) {
	                var html = "<h2><i class=\"icon" + weather.code + "\"></i> " + weather.temp + "&deg;" + weather.units.temp + "</h2>\n           <ul><li>" + weather.city + " " + weather.region + "</li></ul>";
	                webPart.container.html(html)
	                    .removeAttr('style')
	                    .css('background', "url('http://loremflickr.com/500/139/" + location + "')");
	            },
	            error: function (error) {
	                webPart.container.html("<p>" + error.message + "</p>").removeAttr('style');
	            }
	        });
	    };
	    Object.defineProperty(WeatherWebPart.prototype, "dataVersion", {
	        get: function () {
	            return sp_core_library_1.Version.parse('1.0');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    WeatherWebPart.prototype.getPropertyPaneConfiguration = function () {
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
	                                sp_webpart_base_1.PropertyPaneTextField('location', {
	                                    label: strings.LocationFieldLabel
	                                })
	                            ]
	                        }
	                    ]
	                }
	            ]
	        };
	    };
	    Object.defineProperty(WeatherWebPart.prototype, "disableReactivePropertyChanges", {
	        get: function () {
	            return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return WeatherWebPart;
	}(sp_webpart_base_1.BaseClientSideWebPart));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = WeatherWebPart;



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
	    weather: 'weather_28ce34dd',
	    currently: 'currently_28ce34dd',
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
	exports.push([module.id, "@font-face{font-family:weather;src:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/artill_clean_icons-webfont.eot);src:url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/artill_clean_icons-webfont.eot?#iefix) format(\"embedded-opentype\"),url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/artill_clean_icons-webfont.woff) format(\"woff\"),url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/artill_clean_icons-webfont.ttf) format(\"truetype\"),url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/93/artill_clean_icons-webfont.svg#artill_clean_weather_iconsRg) format(\"svg\");font-weight:400;font-style:normal}.weather_28ce34dd{width:500px;margin:0 auto;text-align:center;text-transform:uppercase}.weather_28ce34dd i{color:#fff;font-family:weather;font-size:100px;font-weight:400;font-style:normal;line-height:1}.weather_28ce34dd i[class=icon0]:before{content:\":\"}.weather_28ce34dd i[class=icon1]:before{content:\"p\"}.weather_28ce34dd i[class=icon2]:before{content:\"S\"}.weather_28ce34dd i[class=icon3]:before{content:\"Q\"}.weather_28ce34dd i[class=icon4]:before{content:\"S\"}.weather_28ce34dd i[class=icon5]:before{content:\"W\"}.weather_28ce34dd i[class=icon6]:before{content:\"W\"}.weather_28ce34dd i[class=icon7]:before{content:\"W\"}.weather_28ce34dd i[class=icon8]:before{content:\"W\"}.weather_28ce34dd i[class=icon9]:before{content:\"I\"}.weather_28ce34dd i[class=icon10]:before{content:\"W\"}.weather_28ce34dd i[class=icon11]:before{content:\"I\"}.weather_28ce34dd i[class=icon12]:before{content:\"I\"}.weather_28ce34dd i[class=icon13]:before{content:\"I\"}.weather_28ce34dd i[class=icon14]:before{content:\"I\"}.weather_28ce34dd i[class=icon15]:before{content:\"W\"}.weather_28ce34dd i[class=icon16]:before{content:\"I\"}.weather_28ce34dd i[class=icon17]:before{content:\"W\"}.weather_28ce34dd i[class=icon18]:before{content:\"U\"}.weather_28ce34dd i[class=icon19]:before{content:\"Z\"}.weather_28ce34dd i[class=icon20]:before{content:\"Z\"}.weather_28ce34dd i[class=icon21]:before{content:\"Z\"}.weather_28ce34dd i[class=icon22]:before{content:\"Z\"}.weather_28ce34dd i[class=icon23]:before{content:\"Z\"}.weather_28ce34dd i[class=icon24]:before{content:\"E\"}.weather_28ce34dd i[class=icon25]:before{content:\"E\"}.weather_28ce34dd i[class=icon26]:before{content:\"3\"}.weather_28ce34dd i[class=icon27]:before{content:\"a\"}.weather_28ce34dd i[class=icon28]:before{content:\"A\"}.weather_28ce34dd i[class=icon29]:before{content:\"a\"}.weather_28ce34dd i[class=icon30]:before{content:\"A\"}.weather_28ce34dd i[class=icon31]:before{content:\"6\"}.weather_28ce34dd i[class=icon32]:before{content:\"1\"}.weather_28ce34dd i[class=icon33]:before{content:\"6\"}.weather_28ce34dd i[class=icon34]:before{content:\"1\"}.weather_28ce34dd i[class=icon35]:before{content:\"W\"}.weather_28ce34dd i[class=icon36]:before{content:\"1\"}.weather_28ce34dd i[class=icon37]:before{content:\"S\"}.weather_28ce34dd i[class=icon38]:before{content:\"S\"}.weather_28ce34dd i[class=icon39]:before{content:\"S\"}.weather_28ce34dd i[class=icon40]:before{content:\"M\"}.weather_28ce34dd i[class=icon41]:before{content:\"W\"}.weather_28ce34dd i[class=icon42]:before{content:\"I\"}.weather_28ce34dd i[class=icon43]:before{content:\"W\"}.weather_28ce34dd i[class=icon44]:before{content:\"a\"}.weather_28ce34dd i[class=icon45]:before{content:\"S\"}.weather_28ce34dd i[class=icon46]:before{content:\"U\"}.weather_28ce34dd i[class=icon47]:before{content:\"S\"}.weather_28ce34dd h2{margin:-10px 0 0 0;color:#fff;font-size:75px;font-weight:300;text-align:center;text-shadow:0 1px 3px rgba(0,0,0,.15)}.weather_28ce34dd ul{margin:0;padding:0}.weather_28ce34dd li{background:#fff;background:rgba(255,255,255,.9);padding:10px;margin-top:-25px;display:inline-block;border-radius:5px}.weather_28ce34dd .currently_28ce34dd{margin:0 20px}", ""]);
	
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

/***/ }
/******/ ])});;
//# sourceMappingURL=weather.bundle.js.map