(window["webpackJsonp_4df9bb86_ab0a_4aab_ab5f_48bf167048fb_1_11_0"] = window["webpackJsonp_4df9bb86_ab0a_4aab_ab5f_48bf167048fb_1_11_0"] || []).push([["sp-navigation-datastore"],{

/***/ "oPyX":
/*!**********************************************!*\
  !*** ./lib/navigator/NavigationDataStore.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @microsoft/sp-diagnostics */ "ut3N");
/* harmony import */ var _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @microsoft/sp-core-library */ "UWqr");
/* harmony import */ var _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @microsoft/sp-lodash-subset */ "Pk8u");
/* harmony import */ var _microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__);
// Copyright (c) Microsoft. All rights reserved.



var fetchAppDataQosScenarioName = 'NavigationDataStore.fetchAppData';
/**
 * Navigation Data Store that stores navigation data items while enforcing
 * constraints to ensure optimal use of resources
 *
 * @internal
 */
var NavigationDataStore = /** @class */ (function () {
    function NavigationDataStore(id, buildIdKey, buildId, executor, validator, refreshThresholdMs, maxStoreSize) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(id, 'id');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(executor, 'executor');
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNotNullOrUndefined(validator, 'validator');
        this._id = id;
        this._executor = executor;
        this._dataValidator = validator;
        this._refreshThreshold = refreshThresholdMs || NavigationDataStore.refreshThresholdMs;
        this._maxStoreSize = maxStoreSize || NavigationDataStore.maxStoreSize;
        var storeItems = NavigationDataStore._initStore(id, this._maxStoreSize, buildIdKey, buildId);
        this._buildMinHeap(storeItems);
    }
    NavigationDataStore._leftChild = function (index) {
        return 2 * index + 1;
    };
    NavigationDataStore._rightChild = function (index) {
        return 2 * index + 2;
    };
    NavigationDataStore._parent = function (index) {
        return Math.floor((index - 1) / 2);
    };
    NavigationDataStore._swap = function (items, leftIdx, rightIdx) {
        var temp = items[rightIdx];
        items[rightIdx] = items[leftIdx];
        items[leftIdx] = temp;
    };
    NavigationDataStore._initStore = function (id, maxSize, buildIdKey, buildId) {
        var items = [];
        try {
            var cacheBuildId = sessionStorage.getItem(buildIdKey);
            if (buildId !== cacheBuildId) {
                sessionStorage.removeItem(id);
                sessionStorage.setItem(buildIdKey, buildId);
                return [];
            }
            var serializedEntry = sessionStorage.getItem(id);
            if (serializedEntry && serializedEntry.length > 0) {
                var entries = JSON.parse(serializedEntry);
                if (Array.isArray(entries) && entries.length > 0) {
                    items = entries;
                    if (items.length > maxSize) {
                        items.splice(maxSize);
                    }
                }
            }
        }
        catch (e) {
            // Ignore and return an empty store
        }
        return items;
    };
    NavigationDataStore._updateStore = function (id, items) {
        try {
            sessionStorage.setItem(id, JSON.stringify(items));
        }
        catch (e) {
            // Ignore and return an empty cache
        }
    };
    NavigationDataStore._generatePreloadHeaders = function (props) {
        var headers = new Headers();
        if (props && props.isPrefetchRequest) {
            headers.append('X-RequestPrefetchLink', '1');
        }
        return headers;
    };
    NavigationDataStore._generatePrefetchHeaders = function (props) {
        var headers = new Headers();
        headers.append('X-RequestPrefetchData', '1');
        if (props && props.isPrefetchRequest) {
            headers.append('X-RequestPrefetchLink', '1');
        }
        return headers;
    };
    Object.defineProperty(NavigationDataStore, "_canAddOrUpdateCacheEntry", {
        get: function () {
            return !_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["_SPKillSwitch"].isActivated(_microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Guid"].parse('8fdffc7e-e431-4ab9-b961-5cbb6e028453'), '04/12/2019', 'Create entry on prefetch.');
        },
        enumerable: true,
        configurable: true
    });
    NavigationDataStore._normalizeUrl = function (url) {
        return url && url.toLowerCase();
    };
    Object.defineProperty(NavigationDataStore.prototype, "id", {
        /**
         * Gets the Store Id
         */
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavigationDataStore.prototype, "items", {
        /**
         * Gets all the store items
         */
        get: function () {
            return this._store.items;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Gets the item associated with a key.
     *
     * @remarks
     * If the Item exists in the store and is still valid then returns from the store,
     * else relies on the executor to fetch the item from the store and upserts it accordingly
     *
     * @param url - The url corresponding to the item
     * @param props - Optional Navigation property bag
     *
     * @returns The Promise associated with the navigation data response.
     */
    NavigationDataStore.prototype.getData = function (url, props) {
        _microsoft_sp_core_library__WEBPACK_IMPORTED_MODULE_1__["Validate"].isNonemptyString(url, 'url');
        var cachedItem = undefined;
        var cachedItemIdx = -1;
        if (props && props.enableCache) {
            var cachedEntry = this._findItem(url);
            cachedItem = cachedEntry.item;
            cachedItemIdx = cachedEntry.index;
            if (cachedItem && cachedItem.fetchedTime) {
                var threshold = Date.now() - this._refreshThreshold;
                var hasExpired = cachedItem.fetchedTime <= threshold;
                if (!hasExpired) {
                    if (!props.isPrefetchRequest) {
                        cachedItem.accessedTime = Date.now();
                        this._heapify(cachedItemIdx);
                        NavigationDataStore._updateStore(this._id, this._store.items);
                    }
                    var preloadedDataPromise = Promise.resolve(Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(cachedItem.preloadedData));
                    var prefetchedDataPromise = props.enableDataPrefetch ?
                        Promise.resolve(cachedItem.prefetchedData ? Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(cachedItem.prefetchedData) : undefined) :
                        undefined;
                    return Promise.resolve({
                        preloadedData: preloadedDataPromise,
                        prefetchedData: prefetchedDataPromise
                    });
                }
            }
        }
        return this._fetchData(url, props, cachedItem, cachedItemIdx);
    };
    /**
     * Removes an item associated with a given key
     * @param url - The URL
     */
    NavigationDataStore.prototype.remove = function (url) {
        var cachedEntry = this._findItem(url);
        if (cachedEntry.index > -1) {
            this._store.items.splice(cachedEntry.index, 1);
            this._buildMinHeap(this._store.items);
            NavigationDataStore._updateStore(this._id, this._store.items);
        }
    };
    NavigationDataStore.prototype._addOrUpdateCacheEntry = function (url, data, // tslint:disable-line:no-any
    isNavData, cachedEntry) {
        if (cachedEntry && cachedEntry.item) {
            if (isNavData) {
                cachedEntry.item.fetchedTime = Date.now();
                cachedEntry.item.accessedTime = cachedEntry.item.fetchedTime;
                cachedEntry.item.preloadedData = data;
                this._heapify(cachedEntry.index);
            }
            else {
                cachedEntry.item.prefetchedData = data;
            }
        }
        else {
            var entry = this._findItem(url);
            if (entry.item) {
                if (isNavData) {
                    entry.item.preloadedData = data;
                }
                else {
                    entry.item.prefetchedData = data;
                }
            }
            else {
                var curTime = Date.now();
                var storeItem = {
                    accessedTime: curTime,
                    fetchedTime: curTime,
                    url: url
                };
                if (isNavData) {
                    storeItem.preloadedData = data;
                }
                else {
                    storeItem.prefetchedData = data;
                }
                this._insert(storeItem);
            }
        }
        NavigationDataStore._updateStore(this._id, this._store.items);
    };
    NavigationDataStore.prototype._fetchData = function (url, props, cachedItem, cachedItemIdx) {
        var _this = this;
        var preloadedDataPromise = this._executor(url, NavigationDataStore._generatePreloadHeaders(props))
            .then(function (navData) {
            _this._dataValidator(navData);
            if (props && props.enableCache) {
                if (NavigationDataStore._canAddOrUpdateCacheEntry) {
                    var entry = cachedItem ? {
                        item: cachedItem,
                        index: cachedItemIdx
                    } : undefined;
                    _this._addOrUpdateCacheEntry(url, navData, true, entry);
                }
                else {
                    if (cachedItem) {
                        cachedItem.fetchedTime = Date.now();
                        cachedItem.accessedTime = cachedItem.fetchedTime;
                        cachedItem.preloadedData = navData;
                        _this._heapify(cachedItemIdx);
                    }
                    else {
                        var curTime = Date.now();
                        var storeItem = {
                            preloadedData: navData,
                            accessedTime: curTime,
                            fetchedTime: curTime,
                            url: url
                        };
                        var canInsert = !_this._findItem(url).item;
                        if (canInsert) {
                            _this._insert(storeItem);
                        }
                    }
                    NavigationDataStore._updateStore(_this._id, _this._store.items);
                }
            }
            return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(navData);
        });
        var prefetchedDataPromise = undefined; // tslint:disable-line:no-any
        if (props && props.enableDataPrefetch) {
            var qosMonitor_1 = new _microsoft_sp_diagnostics__WEBPACK_IMPORTED_MODULE_0__["_QosMonitor"](fetchAppDataQosScenarioName);
            prefetchedDataPromise =
                // tslint:disable-next-line:no-any
                this._executor(url, NavigationDataStore._generatePrefetchHeaders(props)).then(function (appData) {
                    if (NavigationDataStore._canAddOrUpdateCacheEntry) {
                        var entry = cachedItem ? {
                            item: cachedItem,
                            index: cachedItemIdx
                        } : undefined;
                        _this._addOrUpdateCacheEntry(url, appData, false, entry);
                    }
                    else {
                        var storeEntry = props && props.enableCache ?
                            _this._findItem(url) :
                            undefined;
                        if (storeEntry && storeEntry.item) {
                            storeEntry.item.prefetchedData = appData;
                            NavigationDataStore._updateStore(_this._id, _this._store.items);
                        }
                    }
                    qosMonitor_1.writeSuccess();
                    return Object(_microsoft_sp_lodash_subset__WEBPACK_IMPORTED_MODULE_2__["cloneDeep"])(appData);
                }).catch(function (e) {
                    qosMonitor_1.writeUnexpectedFailure(e);
                    throw e;
                });
        }
        return Promise.resolve({
            preloadedData: preloadedDataPromise,
            prefetchedData: prefetchedDataPromise
        });
    };
    NavigationDataStore.prototype._heapify = function (index) {
        var leftIdx = NavigationDataStore._leftChild(index);
        var rightIdx = NavigationDataStore._rightChild(index);
        var smallestIdx = undefined;
        if (leftIdx < this._store.size &&
            this._store.items[leftIdx].accessedTime < this._store.items[index].accessedTime) {
            smallestIdx = leftIdx;
        }
        else {
            smallestIdx = index;
        }
        if (rightIdx < this._store.size &&
            this._store.items[rightIdx].accessedTime < this._store.items[smallestIdx].accessedTime) {
            smallestIdx = rightIdx;
        }
        if (smallestIdx !== index) {
            NavigationDataStore._swap(this._store.items, index, smallestIdx);
            this._heapify(smallestIdx);
        }
    };
    NavigationDataStore.prototype._extractMin = function () {
        if (this._store.size < 1) {
            return undefined;
        }
        var minItem = this._store.items[0];
        this._store.items[0] = this._store.items[this._store.size - 1];
        this._store.size -= 1;
        this._heapify(0);
        this._store.items.splice(this._store.size);
        return minItem;
    };
    NavigationDataStore.prototype._reduceKey = function (index, item) {
        this._store.items[index] = item;
        while (index >= 0 && this._store.items[NavigationDataStore._parent(index)] < this._store.items[index]) {
            NavigationDataStore._swap(this._store.items, index, NavigationDataStore._parent(index));
            index = NavigationDataStore._parent(index);
        }
    };
    NavigationDataStore.prototype._insert = function (item) {
        if (this._store.size === this._maxStoreSize) {
            this._extractMin();
        }
        this._store.size += 1;
        this._reduceKey(this._store.size - 1, item);
    };
    NavigationDataStore.prototype._buildMinHeap = function (items) {
        this._store = {
            items: items,
            size: items.length
        };
        for (var idx = Math.floor(this._store.size / 2); idx >= 0; idx--) {
            this._heapify(idx);
        }
    };
    NavigationDataStore.prototype._findItem = function (url) {
        var cachedItem = undefined;
        var cachedItemIdx = -1;
        for (cachedItemIdx = 0; cachedItemIdx < this._store.size; cachedItemIdx++) {
            var item = this._store.items[cachedItemIdx];
            if (item && NavigationDataStore._normalizeUrl(item.url) === NavigationDataStore._normalizeUrl(url)) {
                cachedItem = item;
                break;
            }
        }
        return {
            item: cachedItem,
            index: cachedItemIdx
        };
    };
    NavigationDataStore.refreshThresholdMs = 10 * 60 * 1000; // 10 mins
    NavigationDataStore.maxStoreSize = 15;
    return NavigationDataStore;
}());
/* harmony default export */ __webpack_exports__["default"] = (NavigationDataStore);


/***/ })

}]);
//# sourceMappingURL=chunk.sp-navigation-datastore_9d74795ecd8739b0a79f.js.map