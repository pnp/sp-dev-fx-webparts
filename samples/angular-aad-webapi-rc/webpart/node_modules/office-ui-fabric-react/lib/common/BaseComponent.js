"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var Async_1 = require('../utilities/Async/Async');
var EventGroup_1 = require('../utilities/eventGroup/EventGroup');
var BaseComponent = (function (_super) {
    __extends(BaseComponent, _super);
    /**
     * BaseComponent constructor
     * @param {P} props The props for the component.
     * @param {Object} deprecatedProps The map of deprecated prop names to new names, where the key is the old name and the
     * value is the new name. If a prop is removed rather than renamed, leave the value undefined.
     */
    function BaseComponent(props, deprecatedProps) {
        _super.call(this, props);
        if (deprecatedProps) {
            for (var propName in deprecatedProps) {
                if (propName in props) {
                    _warnDeprecation(this, propName, deprecatedProps[propName]);
                }
            }
        }
        _makeAllSafe(this, BaseComponent.prototype, [
            'componentWillMount',
            'componentDidMount',
            'shouldComponentUpdate',
            'componentWillUpdate',
            'componentWillReceiveProps',
            'render',
            'componentDidUpdate',
            'componentWillUnmount'
        ]);
    }
    /** If we have disposables, dispose them automatically on unmount. */
    BaseComponent.prototype.componentWillUnmount = function () {
        if (this.__disposables) {
            for (var i = 0, len = this._disposables.length; i < len; i++) {
                var disposable = this.__disposables[i];
                if (disposable.dispose) {
                    disposable.dispose();
                }
            }
            this.__disposables = null;
        }
    };
    Object.defineProperty(BaseComponent.prototype, "className", {
        /** Gets the object's class name. */
        get: function () {
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec((this).constructor.toString());
            return (results && results.length > 1) ? results[1] : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_disposables", {
        /** Allows subclasses to push things to this._disposables to be auto disposed. */
        get: function () {
            if (!this.__disposables) {
                this.__disposables = [];
            }
            return this.__disposables;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_async", {
        /**
         * Gets the async instance associated with the component, created on demand. The async instance gives
         * subclasses a way to execute setTimeout/setInterval async calls safely, where the callbacks
         * will be cleared/ignored automatically after unmounting. The helpers within the async object also
         * preserve the this pointer so that you don't need to "bind" the callbacks.
         */
        get: function () {
            if (!this.__async) {
                this.__async = new Async_1.Async(this);
                this._disposables.push(this.__async);
            }
            return this.__async;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseComponent.prototype, "_events", {
        /**
         * Gets the event group instance assocaited with the component, created on demand. The event instance
         * provides on/off methods for listening to DOM (or regular javascript object) events. The event callbacks
         * will be automatically disconnected after unmounting. The helpers within the events object also
         * preserve the this reference so that you don't need to "bind" the callbacks.
         */
        get: function () {
            if (!this.__events) {
                this.__events = new EventGroup_1.EventGroup(this);
                this._disposables.push(this.__events);
            }
            return this.__events;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Helper to return a memoized ref resolver function.
     * @params refName Name of the member to assign the ref to.
     *
     * @examples
     * class Foo extends BaseComponent<...> {
     *   private _root: HTMLElement;
     *
     *   public render() {
     *     return <div ref={ this._resolveRef('_root') } />
     *   }
     * }
     */
    BaseComponent.prototype._resolveRef = function (refName) {
        var _this = this;
        if (!this.__resolves) {
            this.__resolves = {};
        }
        if (!this.__resolves[refName]) {
            this.__resolves[refName] = function (ref) { return _this[refName] = ref; };
        }
        return this.__resolves[refName];
    };
    return BaseComponent;
}(React.Component));
exports.BaseComponent = BaseComponent;
/**
 * Helper to override a given method with a wrapper method that can try/catch the original, but also
 * ensures that the BaseComponent's methods are called before the subclass's. This ensures that
 * componentWillUnmount in the base is called and that things in the _disposables array are disposed.
 */
function _makeAllSafe(obj, prototype, methodNames) {
    for (var i = 0, len = methodNames.length; i < len; i++) {
        _makeSafe(obj, prototype, methodNames[i]);
    }
}
function _makeSafe(obj, prototype, methodName) {
    var classMethod = obj[methodName];
    var prototypeMethod = prototype[methodName];
    if (classMethod || prototypeMethod) {
        obj[methodName] = function () {
            var retVal;
            try {
                if (prototypeMethod) {
                    retVal = prototypeMethod.apply(this, arguments);
                }
                if (classMethod) {
                    retVal = classMethod.apply(this, arguments);
                }
            }
            catch (e) {
                var errorMessage = "Exception in " + obj.className + "." + methodName + "(): " + (typeof e === 'string' ? e : e.stack);
                if (BaseComponent.onError) {
                    BaseComponent.onError(errorMessage, e);
                }
            }
            return retVal;
        };
    }
}
function _warnDeprecation(obj, propertyName, newPropertyName) {
    if (console && console.warn) {
        var deprecationMessage = obj.className + " property '" + propertyName + "' was used but has been deprecated.";
        if (newPropertyName) {
            deprecationMessage += " Use '" + newPropertyName + "' instead.";
        }
        console.warn(deprecationMessage);
    }
}
BaseComponent.onError = function (errorMessage) {
    console.error(errorMessage);
    throw errorMessage;
};

//# sourceMappingURL=BaseComponent.js.map
