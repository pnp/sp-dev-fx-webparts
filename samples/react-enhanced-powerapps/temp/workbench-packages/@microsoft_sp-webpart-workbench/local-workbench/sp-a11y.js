define("05ed6956-59ad-4aa6-9e4e-b832c96ae87b_0.2.24", ["@microsoft/sp-core-library"], function(__WEBPACK_EXTERNAL_MODULE_UWqr__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "mwqp");
/******/ })
/************************************************************************/
/******/ ({

/***/ "2Niy":
/*!****************************************!*\
  !*** ./lib/a11yManager/A11yManager.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/DomTraversal */ "ozHI");
/* harmony import */ var _focus_Focus__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../focus/Focus */ "mz5I");
/* harmony import */ var _focus_FocusTransition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../focus/FocusTransition */ "nS4B");
/* harmony import */ var _keyboard_Keyboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../keyboard/Keyboard */ "kj+I");
/* harmony import */ var _screenReader_ScreenReader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../screenReader/ScreenReader */ "xzR5");
/* harmony import */ var _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./A11yAttribute */ "d4sw");






/**
 * Accessibility Manager class that can attach to a DOM Element and listens to keydown and focus events to managed
 * a11y related events and provides utilities to handle keyboard navigation and screen reader easily and reliably.
 *
 * @remarks
 *
 * Features:
 * - Hierarchical Naigation: Instead of depth-first tab order that is browsers default behavior, tab and shift tab
 *  will only navigate through focusable siblings. Pressing Enter takes the focus to the first focusable child
 *  and pressing Escape takes the focus to focusable parent. This is very useful when the HTML structure of the app
 *  represents a logical layout and order of the elements which is easily achievable using HTML5. This feature can
 *  be enabled for the whole managed tree using the configuration parameter useHierarchicalNavigation. If it is not
 *  enabled by configuration, it can be enabled using A11yAttribute of type NavigateByHierarchy.
 *  For more details refer to A11yAttributeType.NavigateByHierarchy
 *
 * - A11y Attributes: Specific data attributes can be added to the html mark up inside the managed tree to
 *  define some a11y-related behavior declaratively. These includes both keyboard navigation and screen reader
 *  utilities. For more details refer to A11yAttribute.
 *
 * - Focus Transition: There is no concept of focus transition in native JavaScript and it's difficult to track
 *  focus inside an application because any element on the page can claim focus by calling .focus() method.
 *  This sometimes leads to a chaotic state that makes focus management extremely difficult, makes the code
 *  fragile and makes debugging the code very cumbersome. By centralizing focus management and observing all
 *  focus transitions inside the managed tree, it is very easy to trace everything. A11yManager provides
 *  a number of focus management utilities to faciliate this. Developers should be restrained from using direct
 *  calls to the native .focus() and use the A11yManager for handling all focus transitions to get the full
 *  benefit of A11yManager.
 *
 * - Screen reader: Despite a lot of recent efforts, screen readers are not very standarized yet and there are
 *  no reliable APIs that guarantees how they will read and interact with your app. Aria tags are useful but not
 *  comperehensive and different screen readers interpret them in different ways. A11yManagers provides a few ways
 *  to alert the screen reader directly or hooking screen reader alerts to specific focus transitions.
 *
 * - Debug Mode: Because A11yManager has a good view of all focus transitions inside its managed tree, it can also
 *  provide insights on how the focus is transitioning or when the screen reader is being alerted. Using the debug
 *  mode through configuration can make the debugging in the console a lot easier.
 *
 * @public
 */
var A11yManager = /** @class */ (function () {
    function A11yManager(rootElement, config) {
        if (!rootElement) {
            // VSO #372695: Localize sp-a11y errors
            throw Error('Invalid root element for constructing A11yManager');
        }
        var count = A11yManager._instances.size;
        var id = "A11yManager" + count;
        this._handleKeyDown = this._handleKeyDown.bind(this);
        this._handleFocusIn = this._handleFocusIn.bind(this);
        this._handleFocusOut = this._handleFocusOut.bind(this);
        this._checkFocusTransition = this._checkFocusTransition.bind(this);
        this._onFocusTransition = this._onFocusTransition.bind(this);
        this._rootElement = rootElement;
        this._id = id;
        this._config = config || {};
        this._savedFocusMap = new Map();
        this._focusListeners = new Map();
        this._rootElement.addEventListener('keydown', this._handleKeyDown);
        this._rootElement.addEventListener('focusin', this._handleFocusIn);
        this._rootElement.addEventListener('focusout', this._handleFocusOut);
    }
    /**
     * Creates a new instance with the given element as its root element.
     * The given DOM element should not be managed by an existing A11yManager on the page.
     *
     * @param domElement - The DOM element to find or create an A11yManager for
     * @param config - The configuration of the new instance of A11yManager. Has no effect if an existing
     *  instance of A11yManager is returned.
     */
    A11yManager.create = function (domElement, config) {
        if (A11yManager._findInstanceForElement(domElement)) {
            // VSO #372695: Localize sp-a11y errors
            console.warn('Creating an A11yManager on an element already managed by a parent A11yManager is not supported' +
                ' and may result in unexpected behavior. Inseatd you should use getInsanceById to get the existing manager.');
        }
        var instance = new A11yManager(domElement, config);
        this._instances.set(instance.id, instance);
        return instance;
    };
    /**
     * Gets the A11yManager by the id passed in the configuration
     */
    A11yManager.getInstanceById = function (id) {
        return this._instances.get(id);
    };
    /**
     * Checks if a given element is managed by any A11yManager instance on the page
     */
    A11yManager.isElementManaged = function (domElement) {
        return !!this._findInstanceForElement(domElement);
    };
    /**
     * Gets the A11yManager for the given DOM element. Returns undefined if the element is not managed.
     */
    A11yManager._findInstanceForElement = function (domElement) {
        if (!domElement) {
            return undefined;
        }
        A11yManager._instances.forEach(function (manager) {
            if (manager.manages(domElement)) {
                return manager;
            }
        });
        return undefined;
    };
    Object.defineProperty(A11yManager.prototype, "_skipEventFlag", {
        get: function () {
            return this.prefix + 'skip-event';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A11yManager.prototype, "id", {
        /**
         * A11yManager instance unique id
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A11yManager.prototype, "root", {
        /**
         * The root element of the managed tree
         */
        get: function () {
            return this._rootElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A11yManager.prototype, "config", {
        /**
         * The configuration of the manager
         */
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A11yManager.prototype, "prefix", {
        /**
         * The prefix used by all data attributes managed by this manager
         */
        get: function () {
            return 'data-sp-a11y-';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set an event handler for when the focus goes inside and/or outside of the given element.
     * The event is fired only if the focus is entering the element (going from outside of the element to inside)
     * or in the opposite direction. If the focus stays within the element or outside it, the event is not fired.
     *
     * @param element - The element to attach the listener to
     * @param direction - The direction of the focus transition
     * @param handler - The event handler
     */
    A11yManager.prototype.addFocusListener = function (element, direction, handler) {
        var listener = {
            element: element,
            direction: direction,
            handler: handler,
            id: A11yManager._focusListenerIdCounter++
        };
        this._focusListeners.set(listener.id, listener);
        return listener.id;
    };
    /**
     * Removes the event handler added using addFocusListener
     *
     * @param element - The element to remove the listener from
     * @param direction - The direction of the listener to be removed
     */
    A11yManager.prototype.removeFocusListener = function (id) {
        if (this._focusListeners.has(id)) {
            this._focusListeners.delete(id);
        }
    };
    /**
     * Creates an A11yAttribute usable by elements managed by this instance of A11yManager
     */
    A11yManager.prototype.createA11yAttribute = function (type, params, value) {
        return new _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["default"](this.prefix, type, params, value);
    };
    /**
     * Sets the given attributes on the given DOM element
     */
    A11yManager.prototype.setA11yAttributesOnElement = function (attributes, element) {
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var attr = attributes_1[_i];
            attr.setOnElement(element);
        }
    };
    /**
     * Alerts the screen reader with the given message
     */
    A11yManager.prototype.alert = function (msg) {
        _screenReader_ScreenReader__WEBPACK_IMPORTED_MODULE_4__["default"].alert(this._id, msg, false);
        if (this.config.debug) {
            console.log(this._id + " A11y Log: Alerted '" + msg + "'");
        }
    };
    /**
     * Sets the focus on the first focusable child of the given element
     *
     * @returns true if there was an eligible element to set focus to
     */
    A11yManager.prototype.focusInside = function (element) {
        return _focus_Focus__WEBPACK_IMPORTED_MODULE_1__["default"].focusInside(element);
    };
    /**
     * Sets the focus on the element if it's focusable, otherwise on the first focusable child of the given element
     *
     * @returns true if there was an eligible element to set focus to
     */
    A11yManager.prototype.focusTo = function (element) {
        var done = _focus_Focus__WEBPACK_IMPORTED_MODULE_1__["default"].focusTo(element);
        return done;
    };
    /**
     * Sets the focus to or inside the element specified by its a11y id attribute value.
     *
     * @returns true if there was an eligible element to set focus to
     */
    A11yManager.prototype.focusById = function (id) {
        var nextElement = this.getElementByA11yId(id);
        return this.focusTo(nextElement);
    };
    /**
     * Sets the focus on the first focusable parent of the given element
     *
     * @returns true if there was an eligible element to set focus to
     */
    A11yManager.prototype.focusOutOf = function (element) {
        _focus_Focus__WEBPACK_IMPORTED_MODULE_1__["default"].focusOutOf(element, this._rootElement);
    };
    /**
     * Set the focus to element that was focused before the current active element
     */
    A11yManager.prototype.undoFocus = function () {
        return this.focusTo(this._lastActiveElement);
    };
    /**
     * Save the current active element with a given string key
     */
    A11yManager.prototype.saveActiveElementAs = function (key) {
        this._savedFocusMap.set(key, this._activeElement);
    };
    /**
     * Clear the saved active element from internal memory.
     *
     * @remarks
     * As a good practice, use this when you don't need the saved element anymore to free up memory.
     *
     * @param key - The string key used to save the active element
     */
    A11yManager.prototype.forgetSavedActiveElement = function (key) {
        this._savedFocusMap.delete(key);
    };
    /**
     * Save the last active element with a given string key
     */
    A11yManager.prototype.saveLastActiveElementAs = function (key) {
        this._savedFocusMap.set(key, this._lastActiveElement);
    };
    /**
     * Get the saved active element by its string key
     */
    A11yManager.prototype.getSavedActiveElement = function (key) {
        return this._savedFocusMap.get(key);
    };
    /**
     * Restore focus to a saved element by its key
     */
    A11yManager.prototype.restoreFocus = function (key) {
        return this.focusTo(this.getSavedActiveElement(key));
    };
    /**
     * If the focus is inside the managed tree
     */
    A11yManager.prototype.hasFocus = function () {
        return this.manages(document.activeElement);
    };
    /**
     * If the given element is inside the managed tree
     */
    A11yManager.prototype.manages = function (element) {
        return _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__["default"].contains(this.root, element);
    };
    /**
     * Mark an event object to be skipped by the manager. Since A11yManager only works with bubbled up events,
     * child components can use this method to mark an event to be skipped by the A11yManager. This is useful
     * where the event should bubble up to the browser without the manager taking any action on it.
     */
    A11yManager.prototype.skipEvent = function (e) {
        e[this._skipEventFlag] = true;
    };
    /**
     * Gets an element by its id A11yAttribute
     */
    A11yManager.prototype.getElementByA11yId = function (id, root) {
        if (!id) {
            return undefined;
        }
        root = root || this._rootElement;
        var idAttribute = _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["default"].getPrefix(this.prefix, _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["A11yAttributeType"].Id);
        return root.querySelector("[" + idAttribute + "='" + id + "']");
    };
    /**
     * Gets an element by its class A11yAttribute
     */
    A11yManager.prototype.getElementsByA11yClass = function (className, root) {
        if (!className) {
            return [];
        }
        root = root || this._rootElement;
        var classAttribute = _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["default"].getPrefix(this.prefix, _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["A11yAttributeType"].Class);
        var nodeList = root.querySelectorAll("[" + classAttribute + "='" + className + "']");
        // Convert nodelist to an array using slice method
        return Array.prototype.slice.call(nodeList);
    };
    A11yManager.prototype._getElementFocusListeners = function (element) {
        var listeners = [];
        this._focusListeners.forEach(function (fl) {
            if (fl.element === element) {
                listeners.push(fl);
            }
        });
        return listeners;
    };
    /**
     * If the element is marked to have the given keyCode skipped inside it
     */
    A11yManager.prototype._hasSkipKeyAttribute = function (keyCode, element) {
        var skipAttr = _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["default"].getAllFromElement(this.prefix, element)
            .filter(function (attr) { return attr.type === _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["A11yAttributeType"].SkipKeys; })[0];
        if (skipAttr && skipAttr.value) {
            if (skipAttr.value === 'all' ||
                skipAttr.value.split(',').filter(function (keyCodeStr) { return parseInt(keyCodeStr, 10) === keyCode; }).length > 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * If the keyCode should be skipped on the element. Considers all parents.
     */
    A11yManager.prototype._shouldSkipKey = function (keyCode, element) {
        var _this = this;
        var markedElement = _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__["default"].getFirstMatchingParent(element, function (e) { return _this._hasSkipKeyAttribute(keyCode, e); }, this._rootElement);
        return markedElement !== undefined;
    };
    /**
     * If the element is marked to have the given keyCode stopped inside it
     */
    A11yManager.prototype._hasStopKeyAttribute = function (keyCode, element) {
        var stopAttr = _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["default"].getAllFromElement(this.prefix, element)
            .filter(function (attr) { return attr.type === _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["A11yAttributeType"].StopKeys; })[0];
        if (stopAttr && stopAttr.value) {
            if (stopAttr.value === 'all' ||
                stopAttr.value.split(',').filter(function (keyCodeStr) { return parseInt(keyCodeStr, 10) === keyCode; }).length > 0) {
                return true;
            }
        }
        return false;
    };
    /**
     * If the keyCode should be skipped on the element. Considers all parents.
     */
    A11yManager.prototype._shouldStopKey = function (keyCode, element) {
        var _this = this;
        var markedElement = _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__["default"].getFirstMatchingParent(element, function (e) { return _this._hasStopKeyAttribute(keyCode, e); }, this._rootElement);
        return markedElement !== undefined;
    };
    /**
     * Checks if the event should be skipped by manager and bubble up to browser for default action
     */
    A11yManager.prototype._shouldSkipEvent = function (evt) {
        if (evt[this._skipEventFlag]) {
            return true;
        }
        else {
            return this._shouldSkipKey(evt.keyCode, evt.target);
        }
    };
    /**
     * Checks if the event should be prevented and stopped from propagation
     */
    A11yManager.prototype._shouldStopEvent = function (evt) {
        return this._shouldStopKey(evt.keyCode, evt.target);
    };
    A11yManager.prototype._getElementByNavigationOperator = function (operator, element) {
        switch (operator) {
            case 'next':
                return this._getNextElementByHierarchicalNavigation(element);
            case 'prev':
                return this._getPrevElementByHierarchicalNavigation(element);
            case 'outside':
                return this._getOutsideElementByHierarchicalNavigation(element);
            case 'inside':
                return this._getInsideElementByHierarchicalNavigation(element);
        }
        return undefined;
    };
    A11yManager.prototype._navigateByAttribute = function (evt) {
        var path = this._getElementPath(this._rootElement, evt.target);
        if (path) {
            // Take a path from the event target to the root element and look for navigation attibutes
            path = path.reverse();
            for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
                var elem = path_1[_i];
                // Check if there is a NavigateOnKey attribute on path element
                var navOnKeyAttrs = _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["default"].getFromElementByType(this.prefix, elem, _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["A11yAttributeType"].NavigateOnKey);
                for (var _a = 0, navOnKeyAttrs_1 = navOnKeyAttrs; _a < navOnKeyAttrs_1.length; _a++) {
                    var navAttr = navOnKeyAttrs_1[_a];
                    if (navAttr.value && navAttr.params) {
                        // Check if the key event key matches the attribute key specification
                        var keyCode = parseInt(navAttr.params[0], 10);
                        var alt = navAttr.params.indexOf('a') > 0;
                        var ctrl = navAttr.params.indexOf('c') > 0;
                        var shift = navAttr.params.indexOf('s') > 0;
                        if (_keyboard_Keyboard__WEBPACK_IMPORTED_MODULE_3__["default"].isKey(keyCode, evt, { alt: alt, ctrl: ctrl, shift: shift })) {
                            // Parse the attribute value and find the target of navigation
                            var value = navAttr.value.trim();
                            var token = value[0];
                            var selector = value.substr(1);
                            // Note: Id should be searched in the whole tree, but class should be searched in the marked up element
                            var nextElement = void 0;
                            switch (token) {
                                case '#':
                                    nextElement = this.getElementByA11yId(selector, this._rootElement);
                                    break;
                                case '.':
                                    var elems = this.getElementsByA11yClass(selector, elem);
                                    nextElement = elems && elems.length > 0 ? elems[0] : undefined;
                                    break;
                                case '$':
                                    nextElement = this._getElementByNavigationOperator(selector, elem);
                                    break;
                                default:
                                    nextElement = undefined;
                            }
                            return nextElement;
                        }
                    }
                }
                // Check if there is a NavigateByHierarchy attribute
                var hierNavAttrs = _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["default"].getFromElementByType(this.prefix, elem, _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["A11yAttributeType"].NavigateByHierarchy);
                if (hierNavAttrs && hierNavAttrs.length > 0) {
                    return this._navigateByHierarchicalNavigation(evt);
                }
            }
        }
        return undefined;
    };
    A11yManager.prototype._getElementPath = function (higher, lower) {
        return _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__["default"].getElementPath(higher, lower, this._rootElement);
    };
    /**
     * Returns the first parent that meets at least on of the following:
     *  - is a focusable element
     *  - has a NavigateByHierarchy attribute
     *  - is the manager's root element
     */
    A11yManager.prototype._getParent = function (element) {
        var _this = this;
        var result = _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__["default"].getFirstMatchingParent(element, function (it) {
            var hierAttr = _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["default"].getFromElementByType(_this.prefix, it, _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["A11yAttributeType"].NavigateByHierarchy)[0];
            return !!hierAttr || _focus_Focus__WEBPACK_IMPORTED_MODULE_1__["default"].isElementFocusable(it);
        }, this._rootElement, false);
        return result || this._rootElement;
    };
    /**
     * Returns the root element for hierarchical navigation. This can be the main root or an element
     * marked up with NavigateByHierarchy attribute.
     */
    A11yManager.prototype._getHierarchyRoot = function (element) {
        var _this = this;
        var result = _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__["default"].getFirstMatchingParent(element, function (it) {
            var hierAttr = _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["default"].getFromElementByType(_this.prefix, it, _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["A11yAttributeType"].NavigateByHierarchy)[0];
            return !!hierAttr;
        }, this._rootElement, false);
        return result || this._rootElement;
    };
    A11yManager.prototype._getSiblings = function (element) {
        var _this = this;
        var parent = this._getParent(element);
        var siblings = _focus_Focus__WEBPACK_IMPORTED_MODULE_1__["default"].getFocusableSiblings(element, parent);
        return siblings.filter(function (sib) {
            return parent === _this._getParent(sib);
        });
    };
    A11yManager.prototype._getChildren = function (element) {
        var _this = this;
        var children = _focus_Focus__WEBPACK_IMPORTED_MODULE_1__["default"].getFocusableChildren(element);
        return children.filter(function (child) {
            return element === _this._getParent(child);
        });
    };
    A11yManager.prototype._getNextElementByHierarchicalNavigation = function (element) {
        var siblings = this._getSiblings(element);
        return siblings.length > 0 ? siblings[0] : undefined;
    };
    A11yManager.prototype._getPrevElementByHierarchicalNavigation = function (element) {
        var siblings = this._getSiblings(element);
        return siblings.length > 0 ? siblings[siblings.length - 1] : undefined;
    };
    A11yManager.prototype._getInsideElementByHierarchicalNavigation = function (element) {
        return _focus_Focus__WEBPACK_IMPORTED_MODULE_1__["default"].getFirstFocusableChild(element);
    };
    A11yManager.prototype._getOutsideElementByHierarchicalNavigation = function (element) {
        var parent = _focus_Focus__WEBPACK_IMPORTED_MODULE_1__["default"].getFocusableParent(element, this._rootElement);
        if (parent !== this._rootElement || _focus_Focus__WEBPACK_IMPORTED_MODULE_1__["default"].isElementFocusable(this._rootElement)) {
            return parent;
        }
        else {
            // If the root element is the parent but it's not focusable, then there is no outside element
            return undefined;
        }
    };
    /**
     * @returns The next element to focus by Hierarchical Navigation.
     * If the focus should be handled by browser, return undefined.
     */
    A11yManager.prototype._navigateByHierarchicalNavigation = function (evt) {
        var elementToGo;
        var currentElement = evt.target;
        if (_keyboard_Keyboard__WEBPACK_IMPORTED_MODULE_3__["default"].isTab(evt)) {
            var topChildren = this._getChildren(this._getHierarchyRoot(currentElement));
            if (topChildren.length && currentElement !== topChildren[topChildren.length - 1]) {
                elementToGo = this._getNextElementByHierarchicalNavigation(currentElement);
            }
            else {
                // If this is the last focusable child of the root, we need to let go of the focus
                // Since the next focus might be outside of our managed tree, we just set the focus
                // to the last focusable element of our tree and let the browser handle the event.
                // Note: In Hierarchical Navigation, the first focusable child is also the first focusable descendent
                // But the last focusable child may not be the last focusable descendent
                var descendents = _focus_Focus__WEBPACK_IMPORTED_MODULE_1__["default"].getFocusableDescendants(this._rootElement);
                if (descendents.length > 0) {
                    descendents[descendents.length - 1].focus();
                }
            }
        }
        else if (_keyboard_Keyboard__WEBPACK_IMPORTED_MODULE_3__["default"].isShiftTab(evt)) {
            // If this is the first focusable child of the root, we need to let go of the focus
            // Since the previous focus might be outside of our managed tree, we just set the focus
            // to the first focusable element of our tree and let the browser handle the event.
            var firstChild = this._getChildren(this._rootElement)[0];
            if (currentElement !== firstChild) {
                elementToGo = this._getPrevElementByHierarchicalNavigation(currentElement);
            }
        }
        else if (_keyboard_Keyboard__WEBPACK_IMPORTED_MODULE_3__["default"].isEnter(evt)) {
            elementToGo = this._getInsideElementByHierarchicalNavigation(currentElement);
        }
        else if (_keyboard_Keyboard__WEBPACK_IMPORTED_MODULE_3__["default"].isEscape(evt)) {
            elementToGo = this._getOutsideElementByHierarchicalNavigation(currentElement);
        }
        return elementToGo;
    };
    A11yManager.prototype._handleKeyDown = function (evt) {
        if (this._shouldStopEvent(evt)) {
            evt.preventDefault();
            evt.stopPropagation();
            return;
        }
        if (this._shouldSkipEvent(evt)) {
            return;
        }
        // Give priority to attribute specification if exists, otherwise use Hierarchical Navigation
        var elementToGo = this._navigateByAttribute(evt);
        if (!elementToGo && this.config.useHierarchicalNavigation) {
            elementToGo = this._navigateByHierarchicalNavigation(evt);
        }
        if (elementToGo) {
            this.focusTo(elementToGo);
            evt.preventDefault();
            evt.stopPropagation();
        }
    };
    A11yManager.prototype._handleFocusIn = function (evt) {
        this._lastFocusInEvent = evt;
        this._activeElement = evt.target;
        this._checkFocusTransition();
    };
    A11yManager.prototype._handleFocusOut = function (evt) {
        this._lastFocusInEvent = undefined;
        this._lastFocusOutEvent = evt;
        if (this._lastActiveElement !== evt.target) {
            this._lastActiveElement = evt.target;
        }
        // To capture focus losses we need to have this check
        this._focusDetectionTimer = window.setTimeout(this._checkFocusTransition, A11yManager._focusDetectionDelay);
    };
    A11yManager.prototype._checkFocusTransition = function () {
        window.clearTimeout(this._focusDetectionTimer);
        if (this._lastFocusInEvent || this._lastFocusOutEvent) {
            this._onFocusTransition(this._lastFocusOutEvent ? this._lastFocusOutEvent.target : undefined, this._lastFocusInEvent ? this._lastFocusInEvent.target : undefined);
        }
        this._lastFocusInEvent = undefined;
        this._lastFocusOutEvent = undefined;
    };
    A11yManager.prototype._onFocusTransition = function (src, dest) {
        var _this = this;
        if (!src && !dest) {
            return;
        }
        var transition = new _focus_FocusTransition__WEBPACK_IMPORTED_MODULE_2__["default"](src, dest, this.root);
        if (this.config.debug) {
            console.log(this.id + " A11y Log: Focus transition:");
            console.log({
                from: transition.src || 'external element',
                to: transition.dest || 'external element'
            });
        }
        var messages = [];
        transition.forEachElementInPath(function (element, isOutward) {
            // Message aggregator
            var attr = _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["default"].getFromElementByType(_this.prefix, element, isOutward ? _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["A11yAttributeType"].AlertOnFocusOut : _A11yAttribute__WEBPACK_IMPORTED_MODULE_5__["A11yAttributeType"].AlertOnFocusIn)[0];
            if (attr && attr.value) {
                messages.push(attr.value);
            }
            var elementFocusListeners = _this._getElementFocusListeners(element);
            for (var _i = 0, elementFocusListeners_1 = elementFocusListeners; _i < elementFocusListeners_1.length; _i++) {
                var listener = elementFocusListeners_1[_i];
                if ((listener.direction === 'outward' && isOutward) ||
                    (listener.direction === 'inward' && !isOutward)) {
                    var handler = listener.handler;
                    if (handler) {
                        handler(transition);
                    }
                }
            }
        });
        if (messages && messages.length > 0) {
            var msg = messages.join(' ');
            this.alert(msg);
        }
    };
    /**
     * Focus detection delay is the time that we wait after a focusout event to see a focusin event and pair them
     * as a focus transition. If the timer expires, the destination is considered to be an external element.
     * The value is experminental and should be tested across browsers. Initially it's tested using the demo of
     * sp-a11y project on supported browsers.
     *
     * @privateRemarks
     * If there is any need to change this value or make it environment-dependent, document the reason
     * and testing methodology.
     */
    A11yManager._focusDetectionDelay = 50;
    A11yManager._focusListenerIdCounter = 0;
    A11yManager._instances = new Map();
    return A11yManager;
}());
/* harmony default export */ __webpack_exports__["default"] = (A11yManager);


/***/ }),

/***/ "UWqr":
/*!*********************************************!*\
  !*** external "@microsoft/sp-core-library" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_UWqr__;

/***/ }),

/***/ "d4sw":
/*!******************************************!*\
  !*** ./lib/a11yManager/A11yAttribute.js ***!
  \******************************************/
/*! exports provided: A11yAttributeType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "A11yAttributeType", function() { return A11yAttributeType; });
/* harmony import */ var _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/DomTraversal */ "ozHI");

/**
 * Enum for types of A11yAttributes
 *
 * @public
 */
var A11yAttributeType;
(function (A11yAttributeType) {
    /**
     * This attribute is used to identify the element. The value should be unique in the managed tree.
     *
     * @remarks
     * The value of this attribute can be used to reference this element in other utilites that A11yManager provides.
     *
     * Params: None
     *
     * Value Format: string containing alphanumerical characters, dashes and underscores
     *
     * Example: `<button data-sp-a11y-id="button1">Button</button>`
     */
    A11yAttributeType[A11yAttributeType["Id"] = 0] = "Id";
    /**
     * This attribute is used to specify a class for the element.
     *
     * @remarks
     * Class is useful to define rules for repeating patterns.  The value of this attribute can be used to reference
     * this element in other utilities that A11yManager provides.
     *
     * Params: None
     *
     * Value Format: string containing alphanumerical characters, dashes and underscores (multiple classes NOT supported)
     *
     * Example: `<button data-sp-a11y-class="button">Button</button>`
     */
    A11yAttributeType[A11yAttributeType["Class"] = 1] = "Class";
    /**
     * This attribute is used to define a message to be read to screen reader whenever the focus transition is
     * going inside the marked up element.
     *
     * @remarks
     * While this is not an alternative to aria-label, it's very useful for marking containers that are not focusable
     * themselves. For example, to alert the user that they have entered a menu, panel, etc.
     *
     * Params: None
     *
     * Value Format: string
     *
     * Example: `<div data-sp-a11y-alertonfocusin="You entered the menu.">...</div>`
     */
    A11yAttributeType[A11yAttributeType["AlertOnFocusIn"] = 2] = "AlertOnFocusIn";
    /**
     * This attribute is used to define a message to be read to screen reader whenever the focus transition is
     * going outside of the marked up element.
     *
     * @remarks
     * Params: None
     *
     * Value Format: string
     *
     * Example: `<div data-sp-a11y-alertonfocusout="You exited the menu.">...</div>`
     */
    A11yAttributeType[A11yAttributeType["AlertOnFocusOut"] = 3] = "AlertOnFocusOut";
    /**
     * Any keydown event originated in the marked up element or its children will be skipped by the manager and
     * will be let to propagate.
     *
     * @remarks
     * Params: None
     *
     * Value Format: comma separated integer key codes or 'all'
     *
     * Example: `<div data-sp-a11y-skipkeys="65,66,67">'a', 'b', 'c' key strokes are skipped here.</div>`
     *
     * Example: `<div data-sp-a11y-skipkeys="all">All key strokes are skipped here.</div>`
     */
    A11yAttributeType[A11yAttributeType["SkipKeys"] = 4] = "SkipKeys";
    /**
     * Any keydown event originated in the marked up element or its children will be stopped by the manager.
     * This means that they will not be handled by the manager and will not let to propagate either.
     *
     * @remarks
     * Params: None
     *
     * Value Format: comma separated integer key codes or 'all'
     *
     * Example: `<div data-sp-a11y-stopkeys="65,66,67">'a', 'b', 'c' key strokes are stopped here.</div>`
     *
     * Example: `<div data-sp-a11y-stopkeys="all">All key strokes are stopped here.</div>`
     */
    A11yAttributeType[A11yAttributeType["StopKeys"] = 5] = "StopKeys";
    /**
     * If the key stroke specified by the params is detected on the element, the focus will go to the element specified
     * by the attribute value which is a selector. The selector can use target element's a11y id or a11y class or
     * one of the provided navigation operators ($next, $prev, $inside, $outside).
     *
     * @remarks
     *
     * Params: `<keyCode>-<a?>-<c?>-<s?>`
     *
     * Value Format: The selector for target element using Id or Class.
     *
     *  Selector can use one of the following formats:
     *
     *  - Id selector: '#' character followed by target element's a11y id e.g. '#menubutton1' (similar to css)
     *    Id selector matches the first element with matching a11y id in the whole managed tree.
     *
     *  - Class selector: '.' character followed by target element's a11y class e.g. '.menubutton' (similar to css)
     *    Class selector matches the first element with matching a11y class inside the markedup element.
     *
     *  - Navigation operator: $next, $prev, $inside, and $outside
     *    Respectively, they target the next focusable sibling, previous focusable sibling,
     *    first focusable child, and focusable parent
     *
     * Example:
     *
     * ```
     * <div data-sp-a11y-id="propertypane">...</div>
     * <div id='app'
     *    data-sp-a11y-navigateonkey-80-a='#propertypane'><!-- Alt+P takes focus to PropertyPane -->
     *    <!-- Alt+F10 inside web part takes focus to web part toolbar -->
     *    <!-- Ctrl+Up inside web part takes focus to previous web part -->
     *    <!-- Ctrl+Down inside web part takes focus to next web part -->
     *    <div class='webpart'
     *      data-sp-a11y-navigateonkey-121-a='.toolbar'
     *      data-sp-a11y-navigateonkey-38-c='$prev'
     *      data-sp-a11y-navigateonkey-40-c='$next'
     *    >
     *      <div data-sp-class='toolbar'>Web part 1 toolbar</div>
     *      <div>Web part 1 content</div>
     *    </div>
     *    <div class='webpart'
     *      data-sp-a11y-navigateonkey-121-a='.toolbar'
     *      data-sp-a11y-navigateonkey-38-c='$prev'
     *      data-sp-a11y-navigateonkey-40-c='$next'
     *    >
     *      <div data-sp-class='toolbar'>Web part 2 toolbar</div>
     *      <div>Web part 2 content</div>
     *    </div>
     * </div>
     * ```
     */
    A11yAttributeType[A11yAttributeType["NavigateOnKey"] = 6] = "NavigateOnKey";
    /**
     * Navigate by hierarchy
     *
     * @remarks
     *
     * Params: None
     *
     * Value Format: None (The value does not matter)
     *
     * Example:
     *
     * `<div data-sp-a11y-navigatebyhierarchy="1">... Use Tab/Shift+Tab/Enter/Escape to navigate here ...</div>`
     *
     * Uses Hierarchical Navigation inside the marked up element. For more information about Hierarchical Navigation
     * refer to A11yManager. It has no effect if Hierarchical Navigation is already enabled by an ancestor.
     */
    A11yAttributeType[A11yAttributeType["NavigateByHierarchy"] = 7] = "NavigateByHierarchy";
})(A11yAttributeType || (A11yAttributeType = {}));
/**
 * This class represents a data structure for attributes that we use to markup HTML elements to declaratively define
 * a11y-related behaviors.
 *
 * @remarks
 *
 * The attributes name format is as follows: `<appPrefix>-<attributeType>-<params?>`
 *
 * appPrefix is a string provided by A11yManager to make the attributes unique to the manager e.g. data-sp-a11y
 * attributeType is a string identifier for the attribute type e.g. navigateonkey
 * params is an optional set of strings separated by dash that represent the parameters of the attribute e.g. 27-c-a
 *
 * Example: Pressing Ctrl+Alt+Escape inside menu element should set focus to Button1 element
 *
 * ```
 * <div data-sp-a11y-id='menu' data-sp-a11y-navigateonkey-27-c-a='#button1'>...</div>
 * <button data-sp-a11y-id='button1'>Button1</button>
 * ```
 *
 * The corresponding A11yAttribute instance would have the following property values:
 *
 * appPrefix: `'data-sp-a11y-'`
 *
 * type: `NAVIGATION_ON_KEY`
 *
 * params: `['27', 'c', 'a']`
 *
 * value: `'button1'`
 *
 * @public
 */
var A11yAttribute = /** @class */ (function () {
    function A11yAttribute(appPrefix, type, params, value) {
        this._appPrefix = appPrefix;
        this._type = type;
        this._params = params;
        this._value = value;
    }
    /**
     * Get the attribute prefix for a given attribute type
     */
    A11yAttribute.getPrefix = function (appPrefix, type) {
        return appPrefix + A11yAttribute._getTypeString(type);
    };
    /**
     * Get all a11y attributes from an element
     */
    A11yAttribute.getAllFromElement = function (appPrefix, element) {
        var result = [];
        // This gets all the A11yAttributeType enum values
        var types = Object.keys(A11yAttributeType).map(function (k) { return A11yAttributeType[k]; }).filter(function (v) { return typeof v === 'number'; });
        for (var _i = 0, types_1 = types; _i < types_1.length; _i++) {
            var type = types_1[_i];
            for (var i = 0; i < element.attributes.length; i++) {
                var attrName = element.attributes[i].name;
                // If the prefix for this type matched, get the params and value
                var prefix = A11yAttribute.getPrefix(appPrefix, type);
                if (attrName.substring(0, prefix.length) === prefix) {
                    var params = attrName[prefix.length] === '-' ? attrName.substr(prefix.length + 1).split('-') : undefined;
                    var value = element.getAttribute(attrName);
                    result.push(new A11yAttribute(appPrefix, type, params, value));
                }
            }
        }
        return result;
    };
    /**
     * Get the a11y attribute of a given type from the element
     */
    A11yAttribute.getFromElementByType = function (appPrefix, element, type) {
        return A11yAttribute.getAllFromElement(appPrefix, element).filter(function (a) { return a.type === type; });
    };
    /**
     * Get the a11y attribute of a given type from the element or its lowest parent that has the attribute.
     */
    A11yAttribute.getFromElementOrParentsByType = function (appPrefix, element, root, type) {
        var attr;
        _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__["default"].getFirstMatchingParent(element, function (p) {
            attr = A11yAttribute.getAllFromElement(appPrefix, p).filter(function (a) { return a.type === type; })[0];
            return !!attr;
        }, root, true);
        return attr || undefined;
    };
    A11yAttribute._getTypeString = function (type) {
        switch (type) {
            case A11yAttributeType.Id: return 'id';
            case A11yAttributeType.Class: return 'class';
            case A11yAttributeType.SkipKeys: return 'skipkeys';
            case A11yAttributeType.StopKeys: return 'stopkeys';
            case A11yAttributeType.AlertOnFocusIn: return 'alertonfocusin';
            case A11yAttributeType.AlertOnFocusOut: return 'alertonfocusout';
            case A11yAttributeType.NavigateOnKey: return 'navigateonkey';
            case A11yAttributeType.NavigateByHierarchy: return 'navigatebyhierarchy';
            default: throw new Error("Undefined string for attribute type: " + type);
        }
    };
    Object.defineProperty(A11yAttribute.prototype, "name", {
        /**
         * The attribute name that should be set on the element
         *
         * @remarks
         * The format of the name is `<prefix>-<type>-<param1>-<param2>-...`
         *
         * For example: `data-sp-a11y-nextfocusonkey-9`
         */
        get: function () {
            var name = this.prefix;
            if (this._params && this._params.length > 0) {
                var params = this._params.join('-');
                name += "-" + params;
            }
            return name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A11yAttribute.prototype, "prefix", {
        /**
         * The attribute prefix (The name without parameters)
         */
        get: function () {
            return A11yAttribute.getPrefix(this._appPrefix, this._type);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A11yAttribute.prototype, "value", {
        /**
         * The attribute value
         */
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A11yAttribute.prototype, "type", {
        /**
         * The attribute type
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(A11yAttribute.prototype, "params", {
        /**
         * The attribute parameters extracted from its name
         *
         * Example: `data-sp-a11y-type-p1-p2-p3 => ['p1','p2','p3']`
         */
        get: function () {
            return this._params;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Set the attribute (name and value) on the given HTML element
     */
    A11yAttribute.prototype.setOnElement = function (element) {
        element.setAttribute(this.name, this.value);
    };
    return A11yAttribute;
}());
/* harmony default export */ __webpack_exports__["default"] = (A11yAttribute);


/***/ }),

/***/ "kj+I":
/*!**********************************!*\
  !*** ./lib/keyboard/Keyboard.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__);

var MAC_PLATFORM_IDENTIFIER = 'MacIntel';
/**
 * Utility methods that help working with keyboard events
 *
 * @public
 */
var Keyboard = /** @class */ (function () {
    function Keyboard() {
    }
    /**
     * Checks if a keyboard event key code is for Escape key
     */
    Keyboard.isEscape = function (e) {
        return Keyboard.isKey(27, e);
    };
    /**
     * Checks if a keyboard event key code is for Enter key
     */
    Keyboard.isEnter = function (e) {
        return Keyboard.isKey(13, e);
    };
    /**
     * Checks if a keyboard event key code is for Shift+Tab combination
     */
    Keyboard.isShiftTab = function (e) {
        return Keyboard.isKey(9, e, { shift: true });
    };
    /**
     * Checks if a keyboard event key code is for Tab key
     */
    Keyboard.isTab = function (e) {
        return Keyboard.isKey(9, e);
    };
    /**
     * Checks if a keyboard event key code matches a specific key with a given combination of Ctrl, Alt, Shift.
     *
     * @param keyCode - The key code to be checked
     * @param event - The keyboard event to be matched
     * @param allowedCtrlKeys - A combination of ctrl, alt, shift. The modifier check is always enforced by this
     *  method. If this paramater or a any members of it is undefined, it will default to false. This method does NOT
     *  provide a way to do a check regardless of modifier keys.
     */
    Keyboard.isKey = function (keyCode, event, allowedModifiers) {
        var isMac = navigator.platform === MAC_PLATFORM_IDENTIFIER;
        // Use '!' to explicitly convert to boolean before comparison
        if (!(allowedModifiers && allowedModifiers.alt) !== !event.altKey) {
            return false;
        }
        if (!Keyboard._isMacCommandKeyFixKillSwitchActivated()) {
            var isCtrlAllowed = Boolean(allowedModifiers && allowedModifiers.ctrl);
            var isCtrlPressed = Boolean((!isMac && event.ctrlKey && !event.metaKey) ||
                (isMac && event.metaKey && !event.ctrlKey));
            if (isCtrlAllowed !== isCtrlPressed) {
                return false;
            }
        }
        else if (!(allowedModifiers && allowedModifiers.ctrl) !== !event.ctrlKey) {
            return false;
        }
        if (!(allowedModifiers && allowedModifiers.shift) !== !event.shiftKey) {
            return false;
        }
        return event.keyCode === keyCode;
    };
    Keyboard._isMacCommandKeyFixKillSwitchActivated = function () {
        return _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_0__["Guid"].parse('f6b52ecc-766e-4953-b35e-4e2bd99c255c'), '04/19/2019', 'Map ctrl key to command key in Mac');
    };
    return Keyboard;
}());
/* harmony default export */ __webpack_exports__["default"] = (Keyboard);


/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: Focus, Keyboard, ScreenReader, A11yManager, A11yAttribute, A11yAttributeType, FocusTransition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _focus_Focus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./focus/Focus */ "mz5I");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Focus", function() { return _focus_Focus__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _keyboard_Keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard/Keyboard */ "kj+I");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Keyboard", function() { return _keyboard_Keyboard__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _screenReader_ScreenReader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./screenReader/ScreenReader */ "xzR5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ScreenReader", function() { return _screenReader_ScreenReader__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _a11yManager_A11yManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./a11yManager/A11yManager */ "2Niy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "A11yManager", function() { return _a11yManager_A11yManager__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _a11yManager_A11yAttribute__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./a11yManager/A11yAttribute */ "d4sw");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "A11yAttribute", function() { return _a11yManager_A11yAttribute__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "A11yAttributeType", function() { return _a11yManager_A11yAttribute__WEBPACK_IMPORTED_MODULE_4__["A11yAttributeType"]; });

/* harmony import */ var _focus_FocusTransition__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./focus/FocusTransition */ "nS4B");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FocusTransition", function() { return _focus_FocusTransition__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/**
 * SharePoint Framework support for accessibility features such as keyboard navigation and screen reader
 *
 * @packagedocumentation
 */








/***/ }),

/***/ "mz5I":
/*!****************************!*\
  !*** ./lib/focus/Focus.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/DomTraversal */ "ozHI");

/**
 * Utility methods that help with finding focusable elements in a DOM tree and navigating the focus between elements.
 * All the methods use the concept of 'Focusable Sub-Tree' defined as follows:
 * For any given DOM tree, the Focusable Sub-Tree is the sub-tree of DOM elements that are focusable except the root.
 * A focusable element is an element that browsers can set the focus to. For more details refer to the
 * documentations for isElementFocusable method.
 *
 * @public
 */
var Focus = /** @class */ (function () {
    function Focus() {
    }
    /**
     * Checks if an element is independently (regardless of its children) focusable.
     * A DOM element is focusable if it meets all these requirements:
     * - Its hidden property (element.hidden) returns false.
     * - Its offsetParent property (element.offsetParent) returns true. This ensures that a non-fixed element
     *    is not hidden, but it doesn't work for fixed elements.
     * - In its computed style, 'display' !== 'none' and 'visibility' !== 'hidden'. This ensures the element is visible.
     * - The tabindex attribute value is not negative. (Not checked if ignoreTabIndex input parameter is true)
     * - It meets at least one of these conditions:
     *    1. <button>, <input>, <select> or <textarea> element that is not disabled
     *    2. <a> element with non-empty href attribute
     *    3. contenteditable attribute set to true
     *
     * Special case for compliance with office-ui-fabric-react: office-ui-fabric-react uses data-is-focusable attribute
     * for all elements that could be focusable inside a FocusZone and uses tabindex=0 to set the focus currently
     * focused element and all other elements that that are not currently focused have tabindex=-1. This can hide those
     * actually focusable elements from a standard search (because their tabindex is -1), therefore the ignoreTabIndex
     * input parameter is provided to make sure those elements are discoverable. In case you have office-ui-fabric-react
     * controls in your application, you may want to use this parameter depending on your scenario. Otherwise, you can
     * ignore the ignoreTabIndex parameter.
     */
    Focus.isElementFocusable = function (elem, ignoreTabIndex) {
        if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
        if (elem
            && !elem.hidden
            && elem.offsetParent
            && window.getComputedStyle(elem).display !== 'none'
            && window.getComputedStyle(elem).visibility !== 'hidden') {
            var tagName = elem.tagName.toLowerCase();
            var hasTabIndex = elem.hasAttribute('tabindex');
            var tabindex = parseInt(elem.getAttribute('tabindex'), 10);
            if (!ignoreTabIndex && hasTabIndex && tabindex < 0) {
                return false;
            }
            if (tagName === 'a' && !!elem.href ||
                elem.isContentEditable) {
                return true;
            }
            if ((tagName === 'button' ||
                tagName === 'input' ||
                tagName === 'select' ||
                tagName === 'textarea') && !elem.disabled) {
                return true;
            }
            /**
             * There are few cases like office-ui-fabric-react's dropdown control, which do not
             * use the conventional HTML elements to create dropdown. Instead they are using a
             * data attribute 'is-focusable' and making it focusable. Hence to respect those elements
             * added this check. Check this only when the 'ignoreTabIndex' is true, this is because when
             * user doesn't want to ignore tabindexes then tabindex will get preference over this attribute.
             */
            if (ignoreTabIndex && elem.getAttribute('data-is-focusable') === 'true') {
                return true;
            }
            if (!ignoreTabIndex && hasTabIndex && tabindex > -1) {
                return true;
            }
        }
        return false;
    };
    /**
     * Gets all the immediate children of the given element's Focusable Sub-Tree. The order is the same as
     * the default tab order of the elements.
     */
    Focus.getFocusableChildren = function (element, ignoreTabIndex) {
        if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
        var children = [];
        var nodes = Focus._queryFocusableSelector(element);
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (Focus.isElementFocusable(node) && Focus.getFocusableParent(node, element) === element) {
                children.push(node);
            }
        }
        // Sort list to bring up the elements with non-zero tabindex
        // Using insertion sort to ensure stabe sorting
        for (var i = 0; i < children.length; i++) {
            var iTabIndex = parseInt(children[i].getAttribute('tabindex') || '0', 10);
            if (iTabIndex > 0) {
                var e = children.splice(i, 1)[0];
                for (var j = 0; j < i; j++) {
                    var jTabIndex = parseInt(children[j].getAttribute('tabindex') || '0', 10);
                    if (jTabIndex === 0 || iTabIndex < jTabIndex) {
                        children.splice(j, 0, e);
                        break;
                    }
                }
            }
        }
        return children;
    };
    /**
     * Gets the first focusable parent of a given element. The root parameter can be provided to scope the
     * search inside a given tree, otherwise the root defaults document body.
     *
     * @returns The focusable parent if it exists, otherwise the root
     *
     * @remarks The input element itself does not need to be focusable.
     */
    Focus.getFocusableParent = function (element, root) {
        root = root || document.body;
        var parent = _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__["default"].getFirstMatchingParent(element, this.isElementFocusable, root, false);
        return parent || root;
    };
    /**
     * Gets the first focusable child of a given element. The return value is equivalent of the first element
     * of getFocusableChildren, but this method is more performant.
     */
    Focus.getFirstFocusableChild = function (elem, ignoreTabIndex) {
        if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
        var nodes = Focus._queryFocusableSelector(elem);
        for (var i = 0; i < nodes.length; i++) {
            var node = nodes[i];
            if (Focus.isElementFocusable(node, ignoreTabIndex)) {
                return node;
            }
        }
        return undefined;
    };
    /**
     * Gets all the descendants of the given element's Focusable Sub-Tree. The order is the same as
     * the default tab order of the elements.
     */
    Focus.getFocusableDescendants = function (element, ignoreTabIndex, descendants) {
        if (ignoreTabIndex === void 0) { ignoreTabIndex = false; }
        if (!descendants) {
            descendants = [];
        }
        else {
            descendants.push(element);
        }
        var children = Focus.getFocusableChildren(element);
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
            var child = children_1[_i];
            descendants.concat(Focus.getFocusableDescendants(child, ignoreTabIndex, descendants));
        }
        return descendants;
    };
    /**
     * Gets all the siblings of the given element inside the given root's Focusable Sub-Tree. The order is the
     * same as the default tab order of the elements. The root defaults to document body.
     *
     * @remarks The siblings are calculated by finding the parent and then returning its focusable children.
     * Therefore, the input element itself does not need to be a focusable element.
     */
    Focus.getFocusableSiblings = function (element, root) {
        root = root || document.body;
        var parent = Focus.getFocusableParent(element, root);
        if (parent) {
            var children = Focus.getFocusableChildren(parent);
            // Remove input element and start the list from its next sibling
            var siblings = [];
            var insertPointer = 0;
            for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
                var child = children_2[_i];
                if (child !== element) {
                    siblings.splice(insertPointer++, 0, child);
                }
                else {
                    insertPointer = 0;
                }
            }
            return siblings;
        }
        return [];
    };
    /**
     * Gets the next focusable sibling of the given element (assuming circular navigation)
     */
    Focus.getNextFocusableSibling = function (element, root) {
        root = root || document.body;
        var siblings = Focus.getFocusableSiblings(element, root);
        return siblings[0];
    };
    /**
     * Gets the previous focusable sibling of the given element (assuming circular navigation)
     */
    Focus.getPrevFocusableSibling = function (element, root) {
        root = root || document.body;
        var siblings = Focus.getFocusableSiblings(element, root);
        return siblings[siblings.length - 1];
    };
    /**
     * Navigates focus inside the element by setting focus on its first child in its Focusable Sub-Tree
     *
     * @returns true if the element has a focusable child
     */
    Focus.focusInside = function (element) {
        if (!element) {
            return false;
        }
        var children = Focus.getFocusableChildren(element);
        if (children.length) {
            children[0].focus();
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Navigates focus to the element. If the element is not focusable, tries setting the focus inside the element
     *
     * @returns true if the element is focusable or has a focusable child
     */
    Focus.focusTo = function (element) {
        if (Focus.isElementFocusable(element)) {
            element.focus();
            return true;
        }
        else {
            return Focus.focusInside(element);
        }
    };
    /**
     * Navigates focus to the first focusable parent of the element. topElement parameter can be used to scope the
     *  parent search to a specific DOM tree. topElement defaults to document body.
     *
     * @returns true if a focusable parent is found
     */
    Focus.focusOutOf = function (element, root) {
        root = root || document.body;
        var parent = Focus.getFocusableParent(element, root);
        if (parent && parent !== root) {
            parent.focus();
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Checks if the given element has the focus
     *
     * @param element - the element to check
     * @param checkChildren - if the children of the given element should be also checked
     */
    Focus.hasFocus = function (element, checkChildren) {
        if (checkChildren === void 0) { checkChildren = false; }
        if (document.activeElement === element) {
            return true;
        }
        if (checkChildren && _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__["default"].contains(element, document.activeElement)) {
            return true;
        }
        return false;
    };
    Focus._queryFocusableSelector = function (element) {
        var selector = 'button,input,textarea,select,a[href]:not([href=\'\']),\
    [tabindex],[contenteditable=\'true\'], [data-is-focusable=\'true\']';
        return element.querySelectorAll(selector);
    };
    return Focus;
}());
/* harmony default export */ __webpack_exports__["default"] = (Focus);


/***/ }),

/***/ "nS4B":
/*!**************************************!*\
  !*** ./lib/focus/FocusTransition.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/DomTraversal */ "ozHI");

/**
 * A class to model focus transition and provides useful APIs to deal with a focus transition.
 *
 * @public
 */
var FocusTransition = /** @class */ (function () {
    function FocusTransition(src, dest, root) {
        this._src = src;
        this._dest = dest;
        this._root = root || document.body;
    }
    Object.defineProperty(FocusTransition.prototype, "src", {
        get: function () {
            return this._src;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTransition.prototype, "dest", {
        get: function () {
            return this._dest;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FocusTransition.prototype, "root", {
        get: function () {
            return this._root;
        },
        enumerable: true,
        configurable: true
    });
    FocusTransition.prototype.forEachElementInPath = function (callback) {
        _dom_DomTraversal__WEBPACK_IMPORTED_MODULE_0__["default"].forEachElementInPath(this._src, this._dest, callback, this._root);
    };
    return FocusTransition;
}());
/* harmony default export */ __webpack_exports__["default"] = (FocusTransition);


/***/ }),

/***/ "ozHI":
/*!*********************************!*\
  !*** ./lib/dom/DomTraversal.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Utility methods that help with exploring elements in a DOM tree
 *
 * @public
 */
var DomTraversal = /** @class */ (function () {
    function DomTraversal() {
    }
    /**
     * Checks if the given parent element contains the given child element
     *
     * @param parent - The parent element
     * @param child  - The child element to be checked
     */
    DomTraversal.contains = function (parent, child) {
        // tslint:disable-next-line:no-bitwise
        return (child.compareDocumentPosition(parent) & Node.DOCUMENT_POSITION_CONTAINS) !== 0;
    };
    /**
     * Gets the path from a parent element in the DOM tree to its child.
     *
     * @param parent - The parent element that the path starts with
     * @param child - The child element that the path ends with
     * @param root - The root element of the DOM tree to scope the search tree
     *
     * @returns Array of elements containing all elements in the path including the parent as first element and
     *  the child as last element. Undefined if the path does not exist.
     */
    DomTraversal.getElementPath = function (parent, child, root) {
        root = root || document.body;
        var path = [];
        var pathElem = child;
        while (pathElem) {
            path.unshift(pathElem);
            if (pathElem === parent || pathElem === root || pathElem === document.body) {
                break;
            }
            pathElem = pathElem.parentElement;
        }
        return path[0] === parent ? path : undefined;
    };
    /**
     * Gets the lowest common ancestor element of two elements in the DOM tree
     */
    DomTraversal.getLowestCommonAncestor = function (element1, element2, root) {
        root = root || document.body;
        var path1 = DomTraversal.getElementPath(root, element1);
        var path2 = DomTraversal.getElementPath(root, element2);
        if (path1 && path2 && path1[0] === path2[0]) {
            for (var i = 1; i < path1.length; i++) {
                if (path1[i] !== path2[i]) {
                    return path1[i - 1];
                }
            }
        }
        return undefined;
    };
    /**
     * Returns the first ancestor of the given element for which the matcher callback returns true.
     */
    DomTraversal.getFirstMatchingParent = function (element, matcher, root, includeSelf) {
        if (includeSelf === void 0) { includeSelf = true; }
        root = root || document.body;
        if (!includeSelf && element) {
            element = element.parentElement;
        }
        while (element && element !== document.body) {
            if (matcher(element)) {
                return element;
            }
            if (element === root) {
                break;
            }
            element = element.parentElement;
        }
        return undefined;
    };
    DomTraversal.forEachElementInPath = function (src, dest, callback, root) {
        root = root || document.body;
        var outwardPath;
        var inwardPath;
        if (!src && dest) {
            // Getting focus from external element
            inwardPath = DomTraversal.getElementPath(root, dest);
        }
        else if (src && !dest) {
            // Losing focus to external element
            outwardPath = DomTraversal.getElementPath(root, src);
        }
        else if (src && dest) {
            // Going from parent to child?
            inwardPath = DomTraversal.getElementPath(src, dest);
            if (!inwardPath) {
                // Going from child to parent?
                outwardPath = DomTraversal.getElementPath(dest, src);
            }
            if (!inwardPath && !outwardPath) {
                // Going from one branch to another branch
                var lca = DomTraversal.getLowestCommonAncestor(src, dest, root);
                outwardPath = DomTraversal.getElementPath(lca, src);
                inwardPath = DomTraversal.getElementPath(lca, dest);
            }
        }
        // Remove the lca because the lca itself is not a part of the path
        if (inwardPath) {
            inwardPath.shift();
        }
        if (outwardPath) {
            outwardPath.shift();
        }
        outwardPath = outwardPath ? outwardPath.reverse() : undefined;
        if (outwardPath) {
            for (var _i = 0, outwardPath_1 = outwardPath; _i < outwardPath_1.length; _i++) {
                var elem = outwardPath_1[_i];
                callback(elem, true);
            }
        }
        if (inwardPath) {
            for (var _a = 0, inwardPath_1 = inwardPath; _a < inwardPath_1.length; _a++) {
                var elem = inwardPath_1[_a];
                callback(elem, false);
            }
        }
    };
    return DomTraversal;
}());
/* harmony default export */ __webpack_exports__["default"] = (DomTraversal);


/***/ }),

/***/ "xzR5":
/*!******************************************!*\
  !*** ./lib/screenReader/ScreenReader.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Utility methods that help working with screen reader actions
 *
 * @public
 */
var ScreenReader = /** @class */ (function () {
    function ScreenReader() {
    }
    /**
     * Make screen reader read a message to the user. This is done by adding a new element to the document that has
     * 'role' attribute set to 'true'. It gets an id for the message to avoid cluttering the document with new elements.
     * If a message element with the given id has been already added, it will be cleaned up before adding a new element.
     * Therefore, an application usually needs just one unique id to pass to all invocations of this method.
     * The element is hidden by default, but this can be configured via isVisible parameter. Additionally, the caller can
     * pass a className to be added to the element.
     *
     * @param id - A string identifier passed by the caller. It should be unique per application.
     * @param message - The message to be read by the screen reader
     * @param isVisible - Whether the element added to the document should be visible. Defaults to false.
     * @param className - Optional className added to the
     */
    ScreenReader.alert = function (id, message, isVisible, className) {
        if (isVisible === void 0) { isVisible = false; }
        var divId = 'sp_a11y_alert_' + id;
        var oldAlert = document.querySelector('#' + divId);
        if (oldAlert) {
            document.body.removeChild(oldAlert);
        }
        var alertNode = document.createElement('p');
        if (!isVisible) {
            alertNode.setAttribute('style', ScreenReader._cssHidden);
        }
        if (className) {
            alertNode.classList.add(className);
        }
        alertNode.setAttribute('role', 'alert');
        alertNode.setAttribute('aria-live', 'assertive');
        alertNode.setAttribute('id', divId);
        var alertText = document.createTextNode(message);
        document.body.appendChild(alertNode);
        alertNode.appendChild(alertText);
    };
    ScreenReader._cssHidden = "position:absolute;text-indent:-9999px;\n    width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;border:0;";
    return ScreenReader;
}());
/* harmony default export */ __webpack_exports__["default"] = (ScreenReader);


/***/ })

/******/ })});;
//# sourceMappingURL=sp-a11y.js.map