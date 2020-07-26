var SPTaskLib =
/******/ (function(modules) { // webpackBootstrap
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

/***/ "+01b":
/*!*************************************************************!*\
  !*** ./lib/SPTaskLib/Controls/HighlightedContentWebPart.js ***!
  \*************************************************************/
/*! exports provided: ContentRollupLayout, HighlightedContentWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentRollupLayout", function() { return ContentRollupLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HighlightedContentWebPart", function() { return HighlightedContentWebPart; });
/* harmony import */ var _Utilities_ClientFeatures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utilities/ClientFeatures */ "zTnS");
/* harmony import */ var _BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseCollectionWebPart */ "kQju");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _SPFlightUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SPFlightUtil */ "i6xm");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a, _b;





// !!!This should be consistent with the enum ContentRollupLayout in file:
// sp-client\webparts\sp-publishing-webparts\src\webparts\contentRollup\enums\ContentRollupLayout.ts
/**
 * @public
 */
var ContentRollupLayout;
(function (ContentRollupLayout) {
    ContentRollupLayout[ContentRollupLayout["Card"] = 1] = "Card";
    ContentRollupLayout[ContentRollupLayout["List"] = 2] = "List";
    ContentRollupLayout[ContentRollupLayout["Carousel"] = 3] = "Carousel";
    ContentRollupLayout[ContentRollupLayout["FilmStrip"] = 4] = "FilmStrip";
    ContentRollupLayout[ContentRollupLayout["Masonry"] = 5] = "Masonry";
    ContentRollupLayout[ContentRollupLayout["Custom"] = 999] = "Custom";
})(ContentRollupLayout || (ContentRollupLayout = {}));
// @todo: Masonry and Custom is not used yet, maybe need to add test code later
var LayoutNames = (_a = {},
    _a[ContentRollupLayout.Card] = 'ms-CardList',
    _a[ContentRollupLayout.List] = 'ms-DetailsList',
    _a[ContentRollupLayout.Carousel] = 'carouselContainer',
    _a[ContentRollupLayout.FilmStrip] = 'filmStrip',
    _a[ContentRollupLayout.Masonry] = 'masonryContainer',
    _a[ContentRollupLayout.Custom] = 'ms-CustomFieldHost',
    _a);
var LayoutSearchBy = (_b = {},
    _b[ContentRollupLayout.Card] = TAB.searchBy.className,
    _b[ContentRollupLayout.List] = TAB.searchBy.hasClassName,
    _b[ContentRollupLayout.Carousel] = TAB.searchBy.partialClassName,
    _b[ContentRollupLayout.FilmStrip] = TAB.searchBy.partialClassName,
    _b[ContentRollupLayout.Masonry] = TAB.searchBy.partialClassName,
    _b[ContentRollupLayout.Custom] = TAB.searchBy.className,
    _b);
/**
 * @public
 */
var HighlightedContentWebPart = /** @class */ (function (_super) {
    __extends(HighlightedContentWebPart, _super);
    function HighlightedContentWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_2__["WebpartType"].HighlightedContent, _BaseWebpart__WEBPACK_IMPORTED_MODULE_2__["WebpartType"].HighlightedContent.toString()) || this;
    }
    HighlightedContentWebPart._getLayoutQuery = function (id) {
        var query = LayoutNames[id];
        var isCarouselLiteEnabled = _SPFlightUtil__WEBPACK_IMPORTED_MODULE_3__["SPFlightUtil"].isEnabled(1171 /* WebpartsCarouselLiteLayout */) &&
            !_Utilities_ClientFeatures__WEBPACK_IMPORTED_MODULE_0__["ClientFeatures"].isKillSwitchEnabled('92b4b887-2ba2-4259-8a2b-1f5d7aeab16f');
        TAB.Log.AddTaskComment("WebpartsCarouselLiteLayoutAdoption is " + (isCarouselLiteEnabled ? 'on' : 'off'));
        if (isCarouselLiteEnabled) {
            switch (id) {
                case ContentRollupLayout.Carousel:
                    query = 'carouselOuterContainer';
                    break;
                case ContentRollupLayout.FilmStrip:
                    query = 'liteFilmStripContainer';
                    break;
            }
        }
        return query;
    };
    HighlightedContentWebPart._getPropertyPanyLayoutQuery = function (optionId) {
        return "[data-automation-id=\"PropertyPaneChoiceGroup-" + optionId + "\"]";
    };
    HighlightedContentWebPart.prototype.addWebPartToPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_4__["Canvas"].AddTaskCreateWebPart(_this);
        }), this._waitForLayout(ContentRollupLayout.Card));
    };
    // Wait for full PropertyPane display which can't be done by SPTaskLib.PropertyPane.AddTaskOpenPropertyPane().
    HighlightedContentWebPart.prototype.AddTaskOpenPropertyPane = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Open Property pane');
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_4__["Canvas"].SelectedWebpart.AddTaskClickConfigureButton();
        }), 
        // There is a delay before the property pane is actually opened. Wait until the layout pane shows.
        TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, HighlightedContentWebPart._getPropertyPanyLayoutQuery(ContentRollupLayout.Card)));
    };
    HighlightedContentWebPart.prototype.displayLayout = function (id) {
        this._displayLayout(id, this._waitForLayout(id));
    };
    HighlightedContentWebPart.prototype.switchToLayout = function (id) {
        return this._selectLayout(id);
    };
    HighlightedContentWebPart.prototype._waitForLayout = function (id) {
        var query = HighlightedContentWebPart._getLayoutQuery(id);
        TAB.Log.AddTaskComment("Looking for layout via " + query);
        return TAB.WaitForElementToExist(TAB.Win, LayoutSearchBy[id], query);
    };
    HighlightedContentWebPart.prototype._displayLayout = function (id, waiter) {
        TAB.AddTask(this._selectLayout(id), waiter);
    };
    HighlightedContentWebPart.prototype._selectLayout = function (optionId) {
        return TAB.MakeTask(function () {
            var dataAutoId = HighlightedContentWebPart._getPropertyPanyLayoutQuery(optionId);
            // use data-automation-id to identify the input element which is consistent with ContentRollupLayout.ts
            TAB.Log.AddTaskComment("Looking for input via " + dataAutoId);
            var input = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, dataAutoId);
            TAB.Log.AddTaskComment("Clicking on input");
            input.click();
        });
    };
    return HighlightedContentWebPart;
}(_BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_1__["BaseCollectionWebPart"]));



/***/ }),

/***/ "+rIA":
/*!*******************************************!*\
  !*** ./lib/SPTaskLib/MemoryTest/index.js ***!
  \*******************************************/
/*! exports provided: MemoryTestWebPartType, MemoryTestUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _MemoryTestUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MemoryTestUtil */ "Y4ae");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryTestWebPartType", function() { return _MemoryTestUtil__WEBPACK_IMPORTED_MODULE_0__["MemoryTestWebPartType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryTestUtils", function() { return _MemoryTestUtil__WEBPACK_IMPORTED_MODULE_0__["MemoryTestUtils"]; });




/***/ }),

/***/ "06bY":
/*!********************************************!*\
  !*** ./lib/SPTaskLib/TenantAdmin/index.js ***!
  \********************************************/
/*! exports provided: TenantAdminHomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _HomePage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HomePage */ "W/DA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TenantAdminHomePage", function() { return _HomePage__WEBPACK_IMPORTED_MODULE_0__["HomePage"]; });

// Rename "TenantAdmin.HomePage" to "TenantAdminHomePage" until api-extractor
// supports "import * as x from ..."

 // tslint:disable-line:export-name


/***/ }),

/***/ "0FqO":
/*!********************************************************!*\
  !*** ./lib/SPTaskLib/Controls/GroupMembershipPanel.js ***!
  \********************************************************/
/*! exports provided: GroupMembershipPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupMembershipPanel", function() { return GroupMembershipPanel; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");

/**
 * @public
 */
var GroupMembershipPanel = /** @class */ (function () {
    function GroupMembershipPanel() {
    }
    GroupMembershipPanel.prototype.AddTaskLaunchGroupMembershipPanelFromHeader = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Launch group membership panel from Group header');
        TAB.Log.AddTaskComment('Waiting for Group header');
        var groupHeader = undefined;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                groupHeader = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'SiteHeader');
                return Boolean(groupHeader);
            }
            catch (e) {
                return false;
            }
        }));
        // Wait for member count separately because it can take a few extra moments to appear
        TAB.Log.AddTaskComment('Waiting for member count to appear in group header');
        var memberCount = undefined;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                memberCount = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'MemberCountButton');
                return Boolean(memberCount);
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking the member count in the header');
            TAB.ClickElement(memberCount);
        }), TAB.MakeWaiter(function () {
            _this._root = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'GroupMembershipPanelContents');
            return Boolean(_this._root);
        }));
    };
    GroupMembershipPanel.prototype.WaitForGroupMemberPersonaCount = function () {
        return TAB.WaitForElementToExist(this._root, TAB.searchBy.customQuery, "[data-automationid='GroupMemberPersona']");
    };
    GroupMembershipPanel.prototype.getMemberCount = function () {
        return TAB.GetTextContent(_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._root, 'PanelNumberOfMembersText'));
    };
    GroupMembershipPanel.prototype.getAddMembersButtonText = function () {
        // same as in ODSP-next. VSO:381893 - for any future cleanup.
        return this._root.querySelector('[data-automationid=AddMembersButton] .ms-Button-label').textContent;
    };
    GroupMembershipPanel.prototype.getGroupMemberPersonaCount = function () {
        var groupMemberPersonas = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(this._root, 'GroupMemberPersona');
        return groupMemberPersonas.length;
    };
    GroupMembershipPanel.prototype.AddTaskSwitchToAddMembers = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Switch from the members list view to the add members experience');
        var addMembersView = undefined;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking the Add members button');
            TAB.AddTaskClickElement(_this._root, TAB.searchBy.customQuery, '[data-automationid="AddMembersButton"]', TAB.MakeWaiter(function () {
                addMembersView = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(_this._root, 'AddMembersView');
                return Boolean(addMembersView);
            }));
        }));
    };
    GroupMembershipPanel.prototype.getPeoplePicker = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._root, 'AddMembersPeoplePicker');
    };
    GroupMembershipPanel.prototype.getSaveButtonText = function () {
        return TAB.GetTextContent(_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._root, 'AddMembersSaveButton'));
    };
    GroupMembershipPanel.prototype.getCancelButtonText = function () {
        return TAB.GetTextContent(_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._root, 'AddMembersCancelButton'));
    };
    GroupMembershipPanel.prototype.AddTaskDismissPanel = function () {
        TAB.Log.AddTaskComment('Dismissing the panel');
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking the panel close button');
            // We just click this close button, but removed the waiter, because Phamton JS has issue with the waiter.
            TAB.AddTaskClickElement(TAB.Win.document.body, TAB.searchBy.partialClassName, 'ms-Panel-closeButton');
        }));
    };
    return GroupMembershipPanel;
}());



/***/ }),

/***/ "1A/J":
/*!******************************************!*\
  !*** ./lib/SPTaskLib/ListItemLibrary.js ***!
  \******************************************/
/*! exports provided: ListItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListItem", function() { return ListItem; });
/* harmony import */ var _CsomUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CsomUtil */ "UXDa");

/**
 * @public
 */
var ListItem = /** @class */ (function () {
    function ListItem() {
    }
    ListItem.AddCsomTaskGetListItemByUrl = function (siteUrl, serverRelativeUrl, listItemResult) {
        _CsomUtil__WEBPACK_IMPORTED_MODULE_0__["Csom"].AddTask(function () {
            var context = new SP.ClientContext(siteUrl);
            var site = context.get_site();
            var web = context.get_web();
            context.load(site);
            context.load(web);
            context.executeQueryAsync(function () {
                var file = web.getFileByServerRelativeUrl(serverRelativeUrl);
                context.load(file);
                context.executeQueryAsync(function () {
                    var listItem = file.get_listItemAllFields();
                    context.load(listItem);
                    context.executeQueryAsync(function () {
                        TAB.Log.Pass("Got list item for url: " + serverRelativeUrl);
                        listItemResult.uniqueId = listItem.get_item('UniqueId').toString();
                        listItemResult.webId = String(web.get_id());
                        listItemResult.siteId = String(site.get_id());
                    });
                });
            });
            return context;
        });
    };
    return ListItem;
}());



/***/ }),

/***/ "1AE4":
/*!*************************************************!*\
  !*** ./lib/SPTaskLib/Controls/FieldsWebPart.js ***!
  \*************************************************/
/*! exports provided: FieldsWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldsWebPart", function() { return FieldsWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * @public
 */
var FieldsWebPart = /** @class */ (function (_super) {
    __extends(FieldsWebPart, _super);
    function FieldsWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Fields, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Fields.toString()) || this;
    }
    FieldsWebPart.prototype.AddTaskAddWebPart = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Add Page Properties web part');
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        }), 
        // Expect the web part placeholder is rendered by default.
        TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='placeholderButton']"));
    };
    FieldsWebPart.prototype.AddTaskOpenPropertyPaneByPlaceholderButton = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Click "Add Properties" button in placeholder');
            var placeholderButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='placeholderButton']");
            TAB.ClickElement(placeholderButton);
        }), TAB.MakeWaiter(function () {
            try {
                return !!_Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].GetPropertyPane();
            }
            catch (e) {
                return false;
            }
        }));
    };
    FieldsWebPart.prototype.AddTaskAddNewFieldInPropertyPane = function () {
        var _this = this;
        var countBeforeAdded;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                return Boolean(_this.AddButton);
            }
            catch (error) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Add a new field to the web part by clicking +Add button in property pane.');
            countBeforeAdded =
                TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='field']").length;
            TAB.ClickElement(_this.AddButton);
        }), TAB.MakeWaiter(function () {
            var fields = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='field']");
            var countAfterAdded = fields.length;
            return countAfterAdded === countBeforeAdded + 1;
        }));
    };
    FieldsWebPart.prototype.AddTaskSelectFieldInPropertyPane = function (fieldIndex, fieldName) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Change the property selection at position of " + fieldIndex + " to be " + fieldName);
            var propertyPane = _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].GetPropertyPane();
            TAB.Log.Comment("Find and click dropdown at position " + fieldIndex);
            var dropdown = _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementsByDataAutomationId(propertyPane, 'fields-property-dropdown')[fieldIndex];
            TAB.ClickElement(dropdown);
            TAB.Log.Comment("Find and click the dropdown options " + fieldName);
            var dropdownCallout = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dropdown-callout');
            var dropdownOptions = [].slice.call(// Convert NodeList to Array
            TAB.GetElements(dropdownCallout, TAB.searchBy.hasClassName, 'ms-Dropdown-item'));
            var fieldDropdownOption = dropdownOptions
                .filter(function (element) { return element.textContent.indexOf(fieldName) > -1; })[0];
            TAB.ClickElement(fieldDropdownOption);
        }), this.WaitForFieldToExist());
    };
    FieldsWebPart.prototype.AddTaskRemoveFieldInPropertyPane = function (index) {
        var countBeforeRemoved;
        TAB.AddTask(TAB.MakeTask(function () {
            var fields = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='field']");
            countBeforeRemoved = fields.length;
            TAB.Log.Comment("Try to delete a field from existing " + countBeforeRemoved + " fields");
            var propertyPane = _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].GetPropertyPane();
            var removeButton = _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementsByDataAutomationId(propertyPane, 'fields-remove-button')[index];
            TAB.ClickElement(removeButton);
        }), TAB.MakeWaiter(function () {
            var fields = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='field']");
            var countAfterRemoved = fields.length;
            return countAfterRemoved === countBeforeRemoved - 1;
        }));
    };
    FieldsWebPart.prototype.WaitForFieldToExist = function () {
        return TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='fields']");
        });
    };
    FieldsWebPart.prototype.AddTaskWaitForFieldToUpdateToValue = function (fieldName, value) {
        var _this = this;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var valueUpdated = false;
            var fields = _this.GetFields();
            if (fields) {
                fields.forEach(function (field) {
                    var title = TAB.GetElement(field, TAB.searchBy.partialClassName, 'captionElement');
                    if (title.children[0]['placeholder'].indexOf(fieldName) > -1) { // tslint:disable-line:no-string-literal
                        if (field.textContent.indexOf(value) > -1) {
                            valueUpdated = true;
                        }
                    }
                });
            }
            return valueUpdated;
        }));
    };
    Object.defineProperty(FieldsWebPart.prototype, "AddButton", {
        get: function () {
            var propertyPane = _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].GetPropertyPane();
            return _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementByDataAutomationId(propertyPane, 'fields-add-button');
        },
        enumerable: true,
        configurable: true
    });
    // This returns divs containing both label and textfield
    FieldsWebPart.prototype.GetFields = function () {
        try {
            var fields = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='fields']");
            return fields;
        }
        catch (error) {
            return undefined;
        }
    };
    return FieldsWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "2JS8":
/*!**************************************!*\
  !*** ./lib/SPTaskLib/SiteLibrary.js ***!
  \**************************************/
/*! exports provided: Site */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Site", function() { return Site; });
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pages/TeamSitePage */ "UjPA");

/**
 * @public
 */
var Site = /** @class */ (function () {
    function Site() {
    }
    Site.AddTaskDeleteSiteCollection = function (siteUrl) {
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].AddTaskDeleteSite(siteUrl);
    };
    return Site;
}());



/***/ }),

/***/ "2ZRy":
/*!**********************************************!*\
  !*** ./lib/SPTaskLib/Controls/NewsDigest.js ***!
  \**********************************************/
/*! exports provided: NewsDigest */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsDigest", function() { return NewsDigest; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");



var NewsDigestAutomationId;
(function (NewsDigestAutomationId) {
    NewsDigestAutomationId["CreateNewsDigest"] = "createNewsDigest";
    NewsDigestAutomationId["ContinueNewsDigestCreation"] = "continueNewsDigestCreation";
    NewsDigestAutomationId["SendNewsDigestButton"] = "sendNewsDigestButton";
    NewsDigestAutomationId["ListNewsLayout"] = "listNewsLayout";
    NewsDigestAutomationId["CustomMessage"] = "customMessage";
    NewsDigestAutomationId["DigestNewsLayout"] = "digestNewsLayout";
    NewsDigestAutomationId["NewsItem"] = "newsItem";
    NewsDigestAutomationId["PeoplePicker"] = "peoplePicker";
})(NewsDigestAutomationId || (NewsDigestAutomationId = {}));
var NewsDigestClassName;
(function (NewsDigestClassName) {
    NewsDigestClassName["Checkbox"] = "ms-Checkbox";
    NewsDigestClassName["BasePickerInput"] = "ms-BasePicker-input";
    NewsDigestClassName["PeoplePickerPersonaContent"] = "ms-PeoplePicker-personaContent";
    NewsDigestClassName["PickerPersonaContainer"] = "ms-PickerPersona-container";
})(NewsDigestClassName || (NewsDigestClassName = {}));
var NewsPageURL = '_layouts/15/news.aspx';
/**
 * @public
 */
var NewsDigest = /** @class */ (function () {
    function NewsDigest() {
        this._numCheckedNewsArticles = 0;
    }
    NewsDigest.prototype.AddTaskClickCreateNewsDigestButton = function () {
        var _this = this;
        this._waitForElementToExist(NewsDigestAutomationId.CreateNewsDigest);
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking "Create News Digest" button');
            TAB.ClickElement(_this._getElementByDataAutomationId(NewsDigestAutomationId.CreateNewsDigest));
            TAB.Log.AddTaskComment('Waiting to navigate to News Digest creation page');
        }), this._waitForElementToExist(NewsDigestAutomationId.ContinueNewsDigestCreation));
    };
    NewsDigest.prototype.AddTaskSelectNewsForDigest = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting for news selection checkboxes');
        }), TAB.MakeWaiter(function () {
            var checkboxes = _this._getNewsCheckboxes();
            return Boolean(checkboxes && checkboxes.length);
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking news checkboxes');
            var checkboxes = _this._getNewsCheckboxes();
            TAB.ClickElement(checkboxes[0].getElementsByTagName('input')[0]);
            _this._numCheckedNewsArticles++;
        }), this._waitForElementToExistByClassName('is-checked'));
    };
    NewsDigest.prototype.AddTaskClickContinueWithNewsDigestButton = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking "Next" (Continue Create News Digest) button');
            TAB.ClickElement(_this._getElementByDataAutomationId(NewsDigestAutomationId.ContinueNewsDigestCreation));
            TAB.Log.AddTaskComment('Waiting to navigate to News Digest send page');
        }), TAB.MakeWaiter(function () {
            try {
                return _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].editMode;
            }
            catch (error) {
                return false;
            }
        }));
    };
    NewsDigest.prototype.AddTaskFillNewsDigestSendPage = function () {
        var _this = this;
        // Check number of news articles
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            TAB.Log.AddTaskComment('Checking number of selected news items');
            try {
                return _this._countSelectedNewsItems() && _this._countSelectedNewsItems() === _this._numCheckedNewsArticles;
            }
            catch (error) {
                return false;
            }
        }));
    };
    NewsDigest.prototype.AddTaskClickSendNewsDigestButton = function () {
        var _this = this;
        this._addTaskWaitForElementToExist(NewsDigestAutomationId.SendNewsDigestButton);
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking Send News Digest button');
            TAB.ClickElement(_this._getElementByDataAutomationId(NewsDigestAutomationId.SendNewsDigestButton));
            TAB.Log.AddTaskComment('Waiting to redirect back to News L2 page');
        }), TAB.AndWaiters(this._waitForPageToExist(NewsPageURL), this._waitForElementToExist(NewsDigestAutomationId.ListNewsLayout)));
    };
    NewsDigest.prototype.AddTaskAddPeople = function (name) {
        var _this = this;
        var addPersonInput;
        this._addTaskWaitForElementToExist(NewsDigestAutomationId.PeoplePicker);
        TAB.AddTask(TAB.MakeTask(function () {
            addPersonInput = _this.getPeoplePicker();
            TAB.Log.AddTaskComment('Inputting name for Person Picker');
            // input the people name
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(addPersonInput, name);
        }), this._waitForElementToExistByClassName(NewsDigestClassName.PeoplePickerPersonaContent));
        TAB.AddTask(TAB.MakeTask(function () {
            // press Enter to select the person
            TAB.Log.AddTaskComment('Selecting profile from Person Picker');
            TAB.FireKeyboardEvent(addPersonInput, 'keydown', _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["KeyCodes"].enter);
        }), this._waitForElementToExistByClassName(NewsDigestClassName.PickerPersonaContainer));
    };
    NewsDigest.prototype.getPeoplePicker = function () {
        var peoplePickerWrapper = this._getElementByDataAutomationId(NewsDigestAutomationId.PeoplePicker);
        return this._getElementByClassName(NewsDigestClassName.BasePickerInput, peoplePickerWrapper);
    };
    NewsDigest.prototype.AddTaskAddCustomMessage = function (text) {
        var _this = this;
        this._addTaskWaitForElementToExist(NewsDigestAutomationId.CustomMessage);
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Adding custom messsage');
            var textAreaElement = _this._getElementByDataAutomationId(NewsDigestAutomationId.CustomMessage);
            textAreaElement.value = text;
            TAB.FireChangeEvent(textAreaElement);
        }), this._waitForText(text));
    };
    NewsDigest.prototype._addTaskWaitForElementToExist = function (dataAutomationId) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Waiting for element " + dataAutomationId);
        }), this._waitForElementToExist(dataAutomationId));
    };
    NewsDigest.prototype._waitForElementToExistByClassName = function (className) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                return Boolean(_this._getElementByClassName(className));
            }
            catch (error) {
                return false;
            }
        });
    };
    NewsDigest.prototype._waitForElementToExist = function (dataAutomationId) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                return Boolean(_this._getElementByDataAutomationId(dataAutomationId));
            }
            catch (error) {
                return false;
            }
        });
    };
    NewsDigest.prototype._waitForPageToExist = function (pageUrl) {
        return TAB.MakeWaiter(function () {
            try {
                return TAB.Win.location.href.indexOf(pageUrl) > -1;
            }
            catch (error) {
                return false;
            }
        });
    };
    NewsDigest.prototype._waitForText = function (text) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            TAB.Log.Comment('Checking custom messsage');
            var textAreaElement = _this._getElementByDataAutomationId(NewsDigestAutomationId.CustomMessage);
            if (!textAreaElement) {
                return false;
            }
            return textAreaElement.value === text;
        });
    };
    NewsDigest.prototype._countSelectedNewsItems = function () {
        try {
            var digestNewsLayout = this._getElementByDataAutomationId(NewsDigestAutomationId.DigestNewsLayout);
            if (digestNewsLayout) {
                var newsItems = this._getElementsByDataAutomationId(NewsDigestAutomationId.NewsItem, digestNewsLayout);
                return newsItems.length;
            }
        }
        catch (e) {
            TAB.Log.Comment('Failed to locate selected news digest items');
            return undefined;
        }
    };
    NewsDigest.prototype._getNewsCheckboxes = function () {
        this._addTaskWaitForElementToExist(NewsDigestAutomationId.ListNewsLayout);
        try {
            var listNewsLayout = this._getElementByDataAutomationId(NewsDigestAutomationId.ListNewsLayout);
            if (listNewsLayout) {
                var checkBoxes = this._getElementsByClassName(NewsDigestClassName.Checkbox, listNewsLayout);
                return checkBoxes;
            }
        }
        catch (e) {
            TAB.Log.Comment('Failed to get Checkboxes on List NewsPage');
            return undefined;
        }
    };
    NewsDigest.prototype._getElementByDataAutomationId = function (dataAutomationId, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.GetElement(searchObj, TAB.searchBy.customQuery, "[data-automation-id=" + dataAutomationId + "]");
        }
        catch (e) {
            return undefined;
        }
    };
    NewsDigest.prototype._getElementsByDataAutomationId = function (dataAutomationId, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.GetElements(searchObj, TAB.searchBy.customQuery, "[data-automation-id=" + dataAutomationId + "]");
        }
        catch (e) {
            return undefined;
        }
    };
    NewsDigest.prototype._getElementByClassName = function (className, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.GetElement(searchObj, TAB.searchBy.hasClassName, className);
        }
        catch (e) {
            return undefined;
        }
    };
    NewsDigest.prototype._getElementsByClassName = function (className, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.GetElements(searchObj, TAB.searchBy.hasClassName, className);
        }
        catch (e) {
            return undefined;
        }
    };
    return NewsDigest;
}());



/***/ }),

/***/ "35UN":
/*!***********************************************!*\
  !*** ./lib/SPTaskLib/Controls/BaseWebpart.js ***!
  \***********************************************/
/*! exports provided: WebpartType, KeyCodes, FireKeyboardEvent, BaseWebpart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WebpartType", function() { return WebpartType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KeyCodes", function() { return KeyCodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FireKeyboardEvent", function() { return FireKeyboardEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseWebpart", function() { return BaseWebpart; });
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _PageUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PageUtil */ "jK1H");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Next */ "BJbA");




/**
 * @public
 */
var WebpartType;
(function (WebpartType) {
    // The value is the web part's entry ID. The `_0` suffix means it is the first entry of the web part manifest.
    WebpartType["RTE"] = "RTE";
    WebpartType["Image"] = "d1d91016-032f-456d-98a4-721247c305e8_0";
    WebpartType["Document"] = "b7dd04e1-19ce-4b24-9132-b60a1c2b910d_0";
    WebpartType["Link"] = "6410b3b6-d440-4663-8744-378976dc041e_0";
    WebpartType["ContentEmbed"] = "490d7c76-1824-45b2-9de3-676421c997fa_0";
    WebpartType["EmbeddedVideo"] = "275c0095-a77e-4f6d-a2a0-6a7626911518_0";
    WebpartType["Fields"] = "cf91cf5d-ac23-4a7a-9dbc-cd9ea2a4e859_0";
    WebpartType["HighlightedContent"] = "daf0b71c-6de8-4ef7-b511-faae7c388708_0";
    WebpartType["ImageGallery"] = "af8be689-990e-492a-81f7-ba3e4cd3ed9c_0";
    WebpartType["ListView"] = "f92bf067-bc19-489e-a556-7fe95f508720_0";
    WebpartType["ListViewDocLib"] = "f92bf067-bc19-489e-a556-7fe95f508720_1";
    WebpartType["People"] = "7f718435-ee4d-431c-bdbf-9c4ff326f46e_0";
    WebpartType["QuickLinks"] = "c70391ea-0b10-4ee9-b2b4-006d3fcad0cd_0";
    WebpartType["QuickChart"] = "91a50c94-865f-4f5c-8b4e-e49659e69772_0";
    WebpartType["Events"] = "20745d7d-8581-4a6c-bf26-68279bc123fc_0";
    WebpartType["Hero"] = "c4bd7b2f-7b6e-4599-8485-16504575f590_0";
    WebpartType["Connector"] = "893a257e-9c92-49bc-8a36-2f6bb058da34_0";
    WebpartType["RSSConnector"] = "893a257e-9c92-49bc-8a36-2f6bb058da34_1";
    WebpartType["Forms"] = "b19b3b9e-8d13-4fec-a93c-401a091c0707_0";
    WebpartType["News"] = "8c88f208-6c77-4bdb-86a0-0c47b4316588_0";
    WebpartType["YouTube"] = "544dd15b-cf3c-441b-96da-004d5a8cea1d_0";
    WebpartType["TitleRegion"] = "cbe7b0a9-3504-44dd-a3a3-0e5cacd07788";
    WebpartType["Unknown"] = "Unknown";
    WebpartType["YammerConversations"] = "cb3bfe97-a47f-47ca-bffb-bb9a5ff83d75_0";
    WebpartType["YammerHighlights"] = "31e9537e-f9dc-40a4-8834-0e3b7df418bc_0";
    WebpartType["Sites"] = "7cba020c-5ccb-42e8-b6fc-75b3149aba7b_0";
    WebpartType["BingMap"] = "e377ea37-9047-43b9-8cdb-a761be2f8e09_0";
    WebpartType["SiteActivity"] = "eb95c819-ab8f-4689-bd03-0c2d65d47b1f_0";
    WebpartType["Planner"] = "39c4c1c2-63fa-41be-8cc2-f6c0b49b253d_0";
    WebpartType["BingNews"] = "4067b8b5-a97c-40e4-9e34-b8172aa445d2_0";
    WebpartType["GroupCalendar"] = "6676088b-e28e-4a90-b9cb-d0d0303cd2eb_0";
    WebpartType["Twitter"] = "f6fdf4f8-4a24-437b-a127-32e66a5dd9b4_0";
    WebpartType["Weather"] = "868ac3c3-cad7-4bd6-9a1c-14dc5cc8e823_0";
    WebpartType["WorldClock"] = "81b57906-cbed-4bb1-9823-2e3314f46f28_0";
    WebpartType["Text2D"] = "e30ff702-e1a4-4e02-8c11-3cce0139727a_0";
    WebpartType["SPMRDocLib"] = "6ee6fe3d-ed5f-4c42-b663-b1df52a8ae3b_0";
    WebpartType["DynamicDataStaticConsumer"] = "e0d5a85a-e2ba-4433-8d83-f8d38b723d32_0";
})(WebpartType || (WebpartType = {}));
/**
 * @public
 */
var KeyCodes;
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
    KeyCodes[KeyCodes["shift"] = 16] = "shift";
    KeyCodes[KeyCodes["ctrl"] = 17] = "ctrl";
})(KeyCodes || (KeyCodes = {}));
/**
 * @public
 */
function FireKeyboardEvent(element, eventName, keyCode, option) {
    if (!element) {
        throw new Error('Null element passed to TAB.FireKeyboardEvent method!');
    }
    if (!eventName || !(eventName === 'keypress' || eventName === 'keydown' || eventName === 'keyup')) {
        throw new Error('You need to pass eventName argument as keyboard event: keypress or keydown or keyup');
    }
    TAB.Log.Verbose('Firing keyboard event ' + eventName + ' key=' + keyCode.toString());
    if (element.dispatchEvent) {
        var keyEvent = TAB.Win.document.createEvent('Events');
        keyEvent.initEvent(eventName, true, true);
        keyEvent.keyCode = keyCode;
        keyEvent.which = keyCode;
        if (option) {
            keyEvent[option] = true;
        }
        element.dispatchEvent(keyEvent);
    }
}
/**
 * @public
 */
var BaseWebpart = /** @class */ (function () {
    function BaseWebpart(type, entryId) {
        this._entryId = entryId;
        this.type = type;
    }
    Object.defineProperty(BaseWebpart.prototype, "entryId", {
        /**
         * The manifest entry ID of the web part.
         */
        get: function () {
            return this._entryId;
        },
        enumerable: true,
        configurable: true
    });
    BaseWebpart.prototype.addWebPartToPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].AddTaskCreateWebPart(_this);
        }), this._hasPlaceHolder ? this._waitForPlaceholder() : undefined);
    };
    BaseWebpart.prototype.SetWebpartRoot = function (root, isAddingFromToolbox) {
        if (isAddingFromToolbox === void 0) { isAddingFromToolbox = true; }
        this._root = root;
        this._configureButton = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(root, 'configureButton')[0];
        this._deleteButton = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(root, 'deleteButton')[0];
        if (isAddingFromToolbox && this._hasFilePicker) {
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].AddTaskCreateFilePicker();
        }
    };
    BaseWebpart.prototype.AddTaskClickFilePickerButton = function () {
        var _this = this;
        if (!this._hasFilePicker) {
            return;
        }
        TAB.AddTask(TAB.MakeTask(function () {
            var filePickerButton = TAB.GetElement(_this._placeholder, TAB.searchBy.tag, 'button');
            TAB.ClickElement(filePickerButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='sp-filepicker']"));
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].AddTaskCreateFilePicker();
    };
    BaseWebpart.prototype.AddTaskClickConfigureButton = function () {
        var _this = this;
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='configureButton']"));
        TAB.AddTask(TAB.MakeTask(function () {
            _this._configureButton = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, 'configureButton')[0];
            TAB.ClickElement(_this._configureButton);
        }), TAB.MakeWaiter(function () {
            try {
                return TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'showPane');
            }
            catch (error) {
                return false;
            }
        }));
    };
    BaseWebpart.prototype.IsWebpartReady = function () {
        if (this._hasFilePicker) {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='sp-filepicker']");
        }
        else {
            return true;
        }
    };
    BaseWebpart.prototype.AddTaskSetupNewPage = function (site) {
        if (site) {
            _PageUtil__WEBPACK_IMPORTED_MODULE_2__["PageUtil"].AddTaskCreatePageOnSite(site);
        }
        else {
            _PageUtil__WEBPACK_IMPORTED_MODULE_2__["PageUtil"].AddTaskCreateSitePage();
        }
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].AddTaskEditPage();
    };
    BaseWebpart.prototype.WaitForElementsByDataAutomationId = function (id, numberOfInstances) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            var root = _this._root || TAB.Win;
            try {
                var automationId = "[data-automation-id='" + id.toString() + "']";
                var elementCollection = TAB.GetElements(root, TAB.searchBy.customQuery, automationId);
                if (isNaN(numberOfInstances)) {
                    return elementCollection.length > 0;
                }
                else {
                    return elementCollection.length === numberOfInstances;
                }
            }
            catch (e) {
                return false;
            }
        });
    };
    BaseWebpart.prototype.ValidationMobileViewParameters = function (args, expectedArgs) {
        var parsedArgs = JSON.parse(args);
        if (!parsedArgs) {
            TAB.Log.AddTaskFail('No link interception arguments found');
        }
        if (this._type === WebpartType.People) {
            TAB.Log.Comment('Inside the people webpart callback handler!');
            if (parsedArgs.args.upn.indexOf(expectedArgs) === -1) {
                TAB.Log.AddTaskFail('User not found in link interception arguments');
            }
            else {
                TAB.Log.AddTaskPass('Task complete');
            }
        }
        else if (this._type === WebpartType.Document) {
            TAB.Log.Comment('Inside the DocumentEmbed webpart callback handler!');
            if (parsedArgs.baseUrl !== expectedArgs) {
                TAB.Log.AddTaskFail('baseUrl does not match');
            }
            else if (parsedArgs.key !== 'openDocument') {
                TAB.Log.AddTaskFail('args key is not correct');
            }
            else {
                TAB.Log.AddTaskPass('Task complete');
            }
        }
    };
    Object.defineProperty(BaseWebpart.prototype, "type", {
        set: function (webpartType) {
            this._type = webpartType;
            switch (webpartType) {
                case WebpartType.Image:
                case WebpartType.Document:
                    this.setProperties(true, true);
                    break;
                case WebpartType.EmbeddedVideo:
                case WebpartType.ContentEmbed:
                case WebpartType.ListView:
                case WebpartType.Forms:
                    this.setProperties(true, false);
                    break;
                case WebpartType.Unknown:
                case WebpartType.RTE:
                case WebpartType.Link:
                case WebpartType.HighlightedContent:
                case WebpartType.QuickLinks || WebpartType.Events:
                case WebpartType.BingMap:
                case WebpartType.DynamicDataStaticConsumer:
                    this.setProperties(false, false);
                    break;
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseWebpart.prototype._waitForPlaceholder = function () {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            TAB.Log.Comment('Placeholder should show when adding webpart to the page');
            try {
                return !!_this._placeholder;
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    Object.defineProperty(BaseWebpart.prototype, "_placeholder", {
        get: function () {
            try {
                var placeholder = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'Placeholder');
                return placeholder;
            }
            catch (e) {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    BaseWebpart.prototype.setProperties = function (hasPlaceholder, hasFilePicker) {
        this._hasPlaceHolder = hasPlaceholder;
        this._hasFilePicker = hasFilePicker;
    };
    return BaseWebpart;
}());



/***/ }),

/***/ "37hx":
/*!**********************************************!*\
  !*** ./lib/SPTaskLib/PerformancePageUtil.js ***!
  \**********************************************/
/*! exports provided: PerformancePageUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerformancePageUtil", function() { return PerformancePageUtil; });
/* harmony import */ var _PageUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PageUtil */ "jK1H");

var VROOM_META_CACHE_REGEX = /(\/thumbnails\/\d\/(.*?)\/content\/?\?(.*?)preferNoRedirect=(.*?)$)/i;
var VROOM_META_REGEX = /(\/thumbnails\/\d\/(.*?)\/content\/?(|(\?(.*?)))$)/i;
var META_REGEX = /(.svc.ms\/transform\/thumbnail\/?(|(\?(.*?)))$)/i;
var DOCVIZ_REGEX = /(\/_layouts\/15\/getpreview.ashx\/?(|(\?(.*?)))$)/i;
/**
 * @public
 */
var PerformancePageUtil = /** @class */ (function () {
    function PerformancePageUtil() {
    }
    /**
     * API to load a page for performance summary. Caller is responsible for creation of the page.
     * @param pageRelativeUrl - Relative Url of the page under test. e.g. /performance/BlankPage.aspx
     */
    PerformancePageUtil.AddtaskPageLoadPerformanceReport = function (pageRelativeUrl, noOfHits) {
        var _this = this;
        if (noOfHits === void 0) { noOfHits = 5; }
        if (!this._isSetupOkay) {
            TAB.Log.Warning('This environment is not pre configured for performance test, tests are skipped.');
            return;
        }
        var pageUrl = "" + TAB.Settings.Get('ProductServer') + pageRelativeUrl;
        this.isPullRequest = false;
        TAB.AddTask(TAB.MakeTask(function () {
            _this.performanceData[pageUrl] = [];
            var index;
            for (index = 0; index < noOfHits; index++) {
                var query = _this._getRandomQuery();
                var urlUnderTest = pageUrl.indexOf('?') === -1 ? pageUrl + "?" + query : pageUrl + "&" + query;
                _this._addtaskLoadUrlUnderTest(_this.performanceData[pageUrl], urlUnderTest, index, false, query);
            }
        }));
    };
    /**
     * API to compare given page performance for current change with last known state of master.
     * Caller is responsible for creation of the page under test.
     * @param euplApprovedNetworkCalls - List of JS expected to be loaded before EUPL. Any other JS before EUPL will cause test failure.
     * @param noOfHits - Number of times page will be loaded before compare result.
     */
    PerformancePageUtil.AddtaskLoadSitePageForPerfTest = function (pageRelativeUrl, euplApprovedNetworkCalls, noOfHits) {
        var _this = this;
        if (noOfHits === void 0) { noOfHits = 3; }
        if (!this._isSetupOkay) {
            TAB.Log.Warning('This environment is not pre configured for performance test, tests are skipped.');
            return;
        }
        var whitelistedNetworkCalls = [];
        if (euplApprovedNetworkCalls && euplApprovedNetworkCalls.indexOf('sp-pages-assembly') >= 0) {
            // When component versions changes, there is possiblity that loader might download individual js for version mismatch.
            // Whitelist explicitly all assembly component here to ensure test does not fails in those situations.
            whitelistedNetworkCalls = euplApprovedNetworkCalls.concat(this._pagesAssemblyComponents);
        }
        else {
            whitelistedNetworkCalls = euplApprovedNetworkCalls;
        }
        var azurePath = TAB.Settings.Get('AzurePath');
        this.isPullRequest = azurePath.indexOf('refs_pull_') >= 0;
        var pageUrl = pageRelativeUrl.indexOf('?') > -1
            ? "" + TAB.Settings.Get('ProductServer') + pageRelativeUrl + "&istabtest=true"
            : "" + TAB.Settings.Get('ProductServer') + pageRelativeUrl + "?istabtest=true";
        // Load the page for noOfHits time
        TAB.AddTask(TAB.MakeTask(function () {
            _this.performanceData[pageUrl] = [];
            _this.baselinePerformanceData[pageUrl] = [];
            var index;
            for (index = 0; index < noOfHits; index++) {
                if (_this.isPullRequest) {
                    var isBaseline = true;
                    TAB.Log.AddTaskPass("Iteration " + index + ": loading baseline");
                    _this._addTaskLoadSingleSitePage(pageUrl, index, isBaseline);
                    isBaseline = false;
                    TAB.Log.AddTaskPass("Iteration " + index + ": loading actual");
                    _this._addTaskLoadSingleSitePage(pageUrl, index, isBaseline);
                    TAB.Log.AddTaskPass("Iteration " + index + ": done loading baseline and actual");
                }
                else {
                    _this._addTaskLoadSingleSitePage(pageUrl, index, false);
                }
            }
        }));
        if (this.isPullRequest) {
            // Print summary of the performance compare with baseline
            TAB.AddTask(TAB.MakeTask(function () {
                // Compute Compare summary from very first iteration with cold cache
                var coldCacheBaseline = _this._computePagePerfSummary(_this.baselinePerformanceData[pageUrl], 0, 0);
                var coldCacheActual = _this._computePagePerfSummary(_this.performanceData[pageUrl], 0, 0);
                TAB.Log.Pass("SharePoint Server Version: " + _this.performanceData[pageUrl][0].perfData.SharePointServerVersion);
                TAB.Log.Pass("*****************  Cold Cache Comparision Summary for iteration 1 *******");
                _this._printComparisionSummary(coldCacheBaseline, coldCacheActual, true);
                _this._ensureNetowrkCallsAreApproved(coldCacheActual, whitelistedNetworkCalls, 0);
                if (noOfHits > 1) {
                    // Compute Compare summary from second iteration onwards using warmed cache
                    var lastIteration = _this.performanceData[pageUrl].length - 1;
                    var baseline = _this._computePagePerfSummary(_this.baselinePerformanceData[pageUrl], lastIteration);
                    var actual = _this._computePagePerfSummary(_this.performanceData[pageUrl], lastIteration);
                    TAB.Log.Pass("*****************  Warm Cache Comparision Summary for iteration " + (lastIteration + 1) + " *******");
                    _this._printComparisionSummary(baseline, actual);
                    _this._ensureNetowrkCallsAreApproved(actual, whitelistedNetworkCalls, lastIteration);
                }
            }));
        }
        else {
            // Print performance result
            TAB.AddTask(TAB.MakeTask(function () {
                // Compute Compare summary from very first iteration with cold cache
                var coldCacheActual = _this._computePagePerfSummary(_this.performanceData[pageUrl], 0, 0);
                TAB.Log.Pass("SharePoint Server Version: " + _this.performanceData[pageUrl][0].perfData.SharePointServerVersion);
                TAB.Log.Pass("*****************  Cold Cache Performance Summary for iteration 1 *******");
                _this._printPerformanceSummary(coldCacheActual, true);
                _this._ensureNetowrkCallsAreApproved(coldCacheActual, whitelistedNetworkCalls, 0);
                if (noOfHits > 1) {
                    var lastIteration = _this.performanceData[pageUrl].length - 1;
                    // Compute Compare summary from second iteration onwards using warmed cache
                    var actual = _this._computePagePerfSummary(_this.performanceData[pageUrl], lastIteration);
                    TAB.Log.Pass("*****************  Warm Cache Comparision Summary for iteration " + (lastIteration + 1) + " *******");
                    _this._printPerformanceSummary(actual);
                    _this._ensureNetowrkCallsAreApproved(actual, whitelistedNetworkCalls, lastIteration);
                }
            }));
        }
    };
    PerformancePageUtil._addTaskLoadSingleSitePage = function (pageUrl, index, isBaseline) {
        var query = this._getRandomQuery();
        var urlUnderTest = pageUrl.indexOf('?') > -1 ? pageUrl + "&" + query : pageUrl + "?" + query;
        var urlPerfData = isBaseline
            ? this.baselinePerformanceData[pageUrl]
            : this.performanceData[pageUrl];
        this._addtaskLoadUrlUnderTest(urlPerfData, urlUnderTest, index, isBaseline, query);
    };
    PerformancePageUtil._addtaskLoadUrlUnderTest = function (urlPerfData, urlUnderTest, index, isBaseLine, query) {
        var _this = this;
        var PageReadyOnInteractiveState = 'PageReadyOnInteractiveState';
        var oldPageReference = 'isOldPage';
        var options = {};
        if (isBaseLine) {
            options.loaderUrl = this.masterModuleLoader;
            options.manifestsFileUrl = this.masterManifestsUrl;
        }
        TAB[PageReadyOnInteractiveState] = true;
        TAB.Log.AddTaskComment("Iteration " + index + ": starting to load page:" + urlUnderTest);
        TAB.AddTask(TAB.MakeTask(function () { return _PageUtil__WEBPACK_IMPORTED_MODULE_0__["PageUtil"].SetDebugManifests(options); }));
        TAB.Log.AddTaskComment("spfx-debug=" + TAB.Win.window.sessionStorage.getItem('spfx-debug'));
        TAB.AddTask(TAB.MakeTask(function () { TAB.Win.document[oldPageReference] = true; }));
        TAB.AddTask(TAB.LoadPage(urlUnderTest));
        TAB.AddTask(undefined, TAB.MakeWaiter(function () { return TAB.Win.document[oldPageReference] !== true && _this._PageReady(); }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Win.document[oldPageReference] = true;
            TAB.Win.location.reload(true);
        }), TAB.MakeWaiter(function () {
            // Ensure we are on new page after reload and don't move early while still on old page.
            return (TAB.Win.document[oldPageReference] !== true && _this._PageReady());
        }));
        TAB.Log.AddTaskComment("Waiting for EUPL to complete for current iteration " + index);
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return (TAB.Win.window.location.href.indexOf(query) > -1 && _this._isEUPLComplete());
        }));
        TAB.Log.AddTaskComment("Collecting performance data for current iteration " + index);
        TAB.AddTask(TAB.MakeTask(function () {
            var logger = _this._getPerformanceLogger();
            var perfData;
            if (!logger) {
                TAB.Log.Warning("Failed to retrieve performance data for the page.");
            }
            else {
                perfData = logger.getPerformanceData && logger.getPerformanceData();
                if (!perfData) {
                    TAB.Log.Warning("Failed to retrieve EUPLBreakdown data for the page.");
                }
            }
            var testPerformanceData = {
                perfData: perfData,
                resourceTimings: TAB.Win.window.performance.getEntriesByType('resource')
            };
            urlPerfData[index] = testPerformanceData;
            if (testPerformanceData.perfData.EUPL) {
                TAB.Log.AddTaskComment((isBaseLine ? 'Baseline ' : 'Actual ') + " page EUPL: " + testPerformanceData.perfData.EUPL);
            }
            else {
                TAB.Log.Fail("EUPL is not computed for the " + (isBaseLine ? 'baseline ' : 'actual ') + "page: " + urlUnderTest);
            }
        }));
        TAB.Log.AddTaskComment("Waiting for performance data to be uploaded for iteration " + index);
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            // Wait for the EUPL data to be uploaded for measurement purpose
            return (_this._isPerfComplete());
        }));
        TAB.Log.AddTaskComment("Resetting page to neutral domain Url for current iteration " + index);
        TAB.AddTask(TAB.MakeTask(function () { TAB.Win.document[oldPageReference] = true; }));
        TAB.AddTask(TAB.LoadPage(TAB.NeutralDomainURL()), TAB.MakeWaiter(function () {
            return (TAB.Win.document[oldPageReference] !== true && _this._PageReady());
        }));
        TAB.AddTask(TAB.MakeTask(function () { return _PageUtil__WEBPACK_IMPORTED_MODULE_0__["PageUtil"].ResetDebugManifests(); }));
    };
    /**
      * Get EUPL for the current page
      * returns undefined when page is still loading
      * reutrns number when page load completed with EUPL set to non zero number
      * returns null when EUPL could not be set within defined time for timeout
      */
    PerformancePageUtil._getPerformanceLogger = function () {
        // tslint:disable-next-line:any
        var logger = TAB.Win.window[this.spModuleLoader]._bundledComponents[this.spTelemetryComponentId]._PerformanceLogger._logger;
        if (!logger) {
            TAB.Log.Warning("Performance logger is undefined when requesting performance data.");
        }
        return logger;
    };
    PerformancePageUtil._isEUPLComplete = function () {
        // tslint:disable-next-line:any
        var logger = TAB.Win.window[this.spModuleLoader] && TAB.Win.window[this.spModuleLoader]._bundledComponents[this.spTelemetryComponentId]._PerformanceLogger._logger;
        if (!logger) {
            TAB.Log.Warning("Performance logger is undefined when checking EUPL");
        }
        // tslint:disable-next-line:any
        if (logger && logger.getPerformanceData) {
            var performanceData = logger.getPerformanceData();
            if (performanceData && performanceData.RUMOneError) {
                TAB.Log.Fail("RUMOneError occurred: " + performanceData.RUMOneError);
                throw new Error(performanceData.RUMOneError);
            }
            // Wait until deferred Render has started to collect any perf regression by this time.
            return (performanceData
                ? performanceData.EUPL > 0 && TAB.Win.window.performance.getEntriesByName('renderDeferredStart', 'mark').length > 0
                : false);
        }
        else {
            return false;
        }
    };
    PerformancePageUtil._isPerfComplete = function () {
        // tslint:disable-next-line:any
        var logger = TAB.Win.window[this.spModuleLoader] && TAB.Win.window[this.spModuleLoader]._bundledComponents[this.spTelemetryComponentId]._PerformanceLogger._logger;
        if (!logger) {
            TAB.Log.Warning("Performance logger is undefined when checking Perf completele");
        }
        return logger && logger.dataState > 2; // State above 2 indicates either perf data upload, timeout or skipped.
    };
    /**
      * Ensure that all network calls started before deferred render are whitelisted.
      * If not that it makes TAB test to fail with error message.
      */
    PerformancePageUtil._ensureNetowrkCallsAreApproved = function (perfData, euplApprovedJs, iteration) {
        var _this = this;
        if (!euplApprovedJs || euplApprovedJs.length === 0) {
            return; // Whitelist check is not enabled
        }
        // Initialize EUPL approved info for each iteration as we manipulate count of network requests found.
        this._initEUPLApprovedInfo();
        var netowrkBeforeEUPL = perfData.resoureRequests.filter(function (request) {
            return request.entryType === 'resource'
                && !isNaN(request.startTime)
                && request.startTime < perfData.renderDeferredStart[iteration]
                && request.name.indexOf('browser.pipe.aria.microsoft.com') === -1 // telemetry
                && request.name.indexOf('completenesss.svc.ms/api/collection') === -1 // telemetry
                && request.name.indexOf('fabric/assets/icons/fabric-icons-') === -1 // fabric icons
                && request.name.indexOf('_api/SP.OAuth.Token/Acquire') === -1 // Acquire token for Media service
                && request.name.indexOf('/WsaUpload.ashx') === -1 // telemetry
                && request.name.indexOf('manifests.js') === -1
                && !request.name.match(META_REGEX) // Meta thumbnail
                && !request.name.match(DOCVIZ_REGEX) // getPreview thumbnail
                && !request.name.match(VROOM_META_CACHE_REGEX) // VROOM thumbnail with cache
                && !request.name.match(VROOM_META_REGEX); // VROOM thumbnail
        }).map(function (value) {
            var paths = value.name.split('?')[0].split('/');
            var resourceName = paths[paths.length - 1];
            resourceName = resourceName.split('_')[0]; // Drop Guid from the name
            var dotIndex = resourceName.indexOf('.');
            if (dotIndex >= 0 && dotIndex < 3 && (dotIndex + 1) < resourceName.length) {
                // Drop Chunk number prefix as it can keep changing over time e.g. 0.sp-client-telemetry-aria
                resourceName = resourceName.substring(dotIndex + 1);
            }
            var networkCall = { name: value.name, shortName: resourceName.replace('.js', '') };
            return networkCall;
        });
        netowrkBeforeEUPL.forEach(function (networkCall) {
            if (euplApprovedJs.indexOf(networkCall.shortName) < 0 &&
                !_this._isApprovedNetworkCall(networkCall.name)) {
                TAB.Log.Fail(networkCall.name + " network call started before deferred render. If you consider this as required before deferred render, get it reviewed with performance crew and add it into euplApprovedNetwork array.");
            }
        });
    };
    PerformancePageUtil._isApprovedNetworkCall = function (networkCall) {
        if (networkCall) {
            var networkCallLowerCase_1 = networkCall.toLowerCase();
            var match = this._approvedNetworkCallsByCount.filter(function (approvedInfo) {
                return networkCallLowerCase_1.indexOf(approvedInfo.networkName) >= 0;
            });
            if (match && match.length > 0) {
                if (match[0].maxAllowed > 0) {
                    match[0].maxAllowed--;
                    return true;
                }
                else {
                    TAB.Log.Warning("Exceeded maximum number of allowed network calls for : " + match[0].networkName);
                    return false;
                }
            }
        }
        return true;
    };
    PerformancePageUtil._printComparisionSummary = function (baseline, actual, singleIteration) {
        if (singleIteration === void 0) { singleIteration = false; }
        this._printCompareLine(baseline.euplPostHead, actual.euplPostHead, 'EUPL post head start');
        this._printCompareLine(baseline.renderTime, actual.renderTime, 'Page Render');
        this._printCompareLine(baseline.webPartLoadTime, actual.webPartLoadTime, 'loadWebPart API sync time');
        this._printCompareLine(baseline.pagesAssemblyLoad, actual.pagesAssemblyLoad, 'Pages assembly eval & exec');
        this._printCompareLine(baseline.appStartPostHead, actual.appStartPostHead, 'App start post head start');
        this._printCompareLine(baseline.pageComponentStart, actual.pageComponentStart, 'Start Page render post App Start');
        this._printCompareLine(baseline.pageComponentRender, actual.pageComponentRender, 'Page Component Mount');
        this._printCompareLine(baseline.canvasRender, actual.canvasRender, 'Canvas Render');
        this._printCompareLine(baseline.layoutRender75Percentile, actual.layoutRender75Percentile, 'Layout Render');
        this._printCompareLine(baseline.apiCalls, actual.apiCalls, 'API call Count');
        this._printCompareLine(baseline.cdnRequests, actual.cdnRequests, 'CDN Requests');
        this._printCompareLine(baseline.resoureRequests.length, actual.resoureRequests.length, 'Resources request before EUPL');
        this._printCompareLine(baseline.headStart, actual.headStart, 'Browser start rendering <head>');
        if (this._isRegressed(actual.resoureRequests.length, baseline.resoureRequests.length, 1)) {
            var nameBaselineIndex_1 = [];
            var azurePath_1 = TAB.Settings.Get('AzurePath') + '/';
            var baselinePath_1 = 'https://resourceseng.blob.core.windows.net/files/refs_heads_master/';
            baseline.resoureRequests.forEach(function (value, index, array) {
                if (value.name.indexOf(azurePath_1) >= 0) {
                    nameBaselineIndex_1[value.name.replace(azurePath_1, '')] = value;
                }
                else if (value.name.indexOf(baselinePath_1) >= 0) {
                    nameBaselineIndex_1[value.name.replace(baselinePath_1, '')] = value;
                }
                else {
                    nameBaselineIndex_1[value.name] = value;
                }
            });
            var nameActualIndex_1 = [];
            actual.resoureRequests.forEach(function (value, index, array) {
                nameActualIndex_1[value.name] = value;
                var name = value.name;
                if (name.indexOf(azurePath_1) >= 0) {
                    name = name.replace(azurePath_1, '');
                }
                else if (name.indexOf(baselinePath_1) >= 0) {
                    name = name.replace(baselinePath_1, '');
                }
                if (!nameBaselineIndex_1[name]) {
                    // this resource was not requested for base line
                    TAB.Log.Warning(" Request " + name + " initiated by " + value.initiatorType + " not found in baseline.");
                }
            });
        }
    };
    PerformancePageUtil._printCompareLine = function (baseline, actual, msg) {
        baseline = Math.round(baseline);
        actual = Math.round(actual);
        var change = actual - baseline;
        var message = msg + ": [delta:" + change + "] [baseline:" + baseline + "] vs [actual:" + actual + "]";
        change <= 0 ? TAB.Log.Pass(message) : TAB.Log.Warning(message);
    };
    PerformancePageUtil._printPerformanceSummary = function (actual, singleIteration) {
        if (singleIteration === void 0) { singleIteration = false; }
        if (!singleIteration) {
            TAB.Log.Pass("EUPL Post Head Start 75 percentile: [" + Math.round(actual.euplPostHead) + "]");
            TAB.Log.Pass("Render Time 75 percentile: [" + Math.round(actual.renderTime) + "]");
            TAB.Log.Pass("Maximum EUPL Post Head: [" + Math.round(actual.maxEUPLPostHead) + "]");
            TAB.Log.Pass("Minimum EUPL Post Head: [" + Math.round(actual.minEUPLPostHead) + "]");
        }
        else {
            TAB.Log.Pass("EUPL Post Head Start: [" + Math.round(actual.euplPostHead) + "]");
            TAB.Log.Pass("Render Time: [" + Math.round(actual.renderTime) + "]");
        }
        TAB.Log.Pass("$Pages assembly eval and execution Time: [" + Math.round(actual.pagesAssemblyLoad) + "]");
        TAB.Log.Pass("$AppStart since Head Start: [" + Math.round(actual.appStartPostHead) + "]");
        TAB.Log.Pass("$Start Page Component post App Start: [" + Math.round(actual.pageComponentStart) + "]");
        TAB.Log.Pass("$Render Page Component: [" + Math.round(actual.pageComponentRender) + "]");
        TAB.Log.Pass("$Render Canvas: [" + Math.round(actual.canvasRender) + "]");
        TAB.Log.Pass("loadWebPart API total sync time : [" + Math.round(actual.webPartLoadTime) + "]");
        TAB.Log.Pass("$Layout render: [" + Math.round(actual.layoutRender75Percentile) + "]");
        TAB.Log.Pass("$API Requests Count: [" + actual.apiCalls + "]");
        TAB.Log.Pass("$CDN Requests Count: [" + actual.cdnRequests + "]");
        TAB.Log.Pass("$Total resource requests Count: [" + actual.resoureRequests.length + "]");
        TAB.Log.Pass("$Head Start: [" + Math.round(actual.headStart) + "]");
    };
    PerformancePageUtil._isRegressed = function (actual, baseline, threshold) {
        if ((actual - baseline) > threshold) {
            return true;
        }
    };
    PerformancePageUtil._computePagePerfSummary = function (pagePerfData, startIndex, maxIndex) {
        if (startIndex === void 0) { startIndex = 0; }
        var perfSummary = {};
        perfSummary.EUPL = [];
        perfSummary.renderDeferredStart = [];
        var minEUPLPostHead = Date.now();
        var maxEUPLPostHead = 1 - Date.now();
        var renderPostPageStart = [];
        var moduleLoaderScript = [];
        var appStartAfterhead = [];
        // Time taken from AppStart to PageComponent.start
        var pageComponentStart = [];
        // Time taken between PageComponent.start to PageComponent.end
        var pageComponentRender = [];
        // Time taken between CanvasComponent.start to CanvasComponent.end
        var canvasRender = [];
        // Time taken between LayoutComponent.start to LayoutComponent.end
        var layoutRender = [];
        var headStart = [];
        var apiCalls = [];
        var cdnRequests = [];
        var resourcesCount = [];
        var webPartLoadTime = [];
        var headStartKey = 'headStart';
        var appStartKey = 'appStart';
        var moduleLoaderScriptStartKey = 'moduleLoaderScriptStart';
        var moduleLoaderScriptEndKey = 'moduleLoaderScriptEnd';
        var pageComponentStartKey = 'PageComponent.start';
        var pageComponentEndKey = 'PageComponent.end';
        var canvasComponentStartKey = 'CanvasComponent.start';
        var canvasComponentEndKey = 'CanvasComponent.end';
        var layoutComponentStartKey = 'LayoutComponent.start';
        var layoutComponentEndKey = 'LayoutComponent.end';
        var nameKey = 'name';
        var durationKey = 'duration';
        var startTimekey = 'startTime';
        var spPagesAssemblyKey = 'sp-pages-assembly';
        var renderDeferredStartKey = 'renderDeferredStart';
        var webPartLoadKey = 'spLoadWebPartTime';
        var euplsPostHead = [];
        var lastIndex = !isNaN(maxIndex) ? Math.min(pagePerfData.length - 1, maxIndex) : pagePerfData.length - 1;
        var resourceRequests = pagePerfData[lastIndex].resourceTimings
            .filter(function (expected) {
            return expected.startTime < pagePerfData[lastIndex].perfData[renderDeferredStartKey];
        });
        for (var index = startIndex; index <= lastIndex; index++) {
            var pagePerfDataIteration = pagePerfData[index];
            var eupl = pagePerfDataIteration.perfData.EUPL;
            perfSummary.EUPL[index] = eupl;
            perfSummary.renderDeferredStart[index] = pagePerfDataIteration.perfData[renderDeferredStartKey];
            var euplBreakdown = JSON.parse(pagePerfDataIteration.perfData.EUPLBreakdown);
            var headStartInstance = euplBreakdown[headStartKey];
            var appStartInstance = euplBreakdown[appStartKey];
            var webPartLoadInstance = pagePerfDataIteration.perfData[webPartLoadKey] || 0;
            var pageComponentStartInstance = euplBreakdown[pageComponentStartKey] - appStartInstance;
            var assemblyDownloadTime = 0;
            var assemblyDownloadStartTime = 0;
            if (pagePerfDataIteration.perfData.CDNRequestNames) {
                for (var cdnIndex = 0; cdnIndex < pagePerfDataIteration.perfData.CDNRequestNames.length; cdnIndex++) {
                    var cdnRequestData = pagePerfDataIteration.perfData.CDNRequestNames[cdnIndex];
                    if (cdnRequestData[nameKey] && !isNaN(cdnRequestData[durationKey])
                        && cdnRequestData[nameKey].indexOf(spPagesAssemblyKey) > 0) {
                        assemblyDownloadTime = cdnRequestData[durationKey];
                        assemblyDownloadStartTime = cdnRequestData[startTimekey];
                        break;
                    }
                }
            }
            resourcesCount.push(pagePerfDataIteration.resourceTimings.length);
            if (assemblyDownloadStartTime < headStartInstance) {
                // Browsers are smmart, triggering script download before script execution under <head>.
                assemblyDownloadTime = assemblyDownloadTime - (headStartInstance - assemblyDownloadStartTime);
                assemblyDownloadTime = Math.max(0, assemblyDownloadTime); // In rare case assembly download finished before head
            }
            // Off set the time spent during network for aspx page and loading assembly.
            var networkOffset = headStartInstance + assemblyDownloadTime;
            var appStartPostHead = appStartInstance - networkOffset;
            var euplPostHead = eupl - networkOffset;
            appStartAfterhead.push(appStartPostHead);
            headStart.push(headStartInstance);
            webPartLoadTime.push(webPartLoadInstance);
            pageComponentStart.push(pageComponentStartInstance);
            moduleLoaderScript.push(euplBreakdown[moduleLoaderScriptEndKey] - euplBreakdown[moduleLoaderScriptStartKey] - assemblyDownloadTime);
            pageComponentRender.push(euplBreakdown[pageComponentEndKey] - euplBreakdown[pageComponentStartKey]);
            canvasRender.push(euplBreakdown[canvasComponentEndKey] - euplBreakdown[canvasComponentStartKey]);
            layoutRender.push(euplBreakdown[layoutComponentEndKey] - euplBreakdown[layoutComponentStartKey]);
            renderPostPageStart.push(eupl - pageComponentStartInstance);
            euplsPostHead.push(euplPostHead);
            apiCalls.push(pagePerfDataIteration.perfData.APICallCount);
            cdnRequests.push(pagePerfDataIteration.perfData.CDNRequestCountTotal);
            if (euplPostHead < minEUPLPostHead) {
                minEUPLPostHead = euplPostHead;
            }
            if (euplPostHead > maxEUPLPostHead) {
                maxEUPLPostHead = euplPostHead;
            }
        }
        perfSummary.maxEUPLPostHead = maxEUPLPostHead;
        perfSummary.minEUPLPostHead = minEUPLPostHead;
        moduleLoaderScript.sort(function (a, b) { return a - b; });
        perfSummary.pagesAssemblyLoad = moduleLoaderScript[lastIndex - startIndex];
        appStartAfterhead.sort(function (a, b) { return a - b; });
        perfSummary.appStartPostHead = appStartAfterhead[lastIndex - startIndex];
        headStart.sort(function (a, b) { return a - b; });
        perfSummary.headStart = headStart[lastIndex - startIndex];
        webPartLoadTime.sort(function (a, b) { return a - b; });
        perfSummary.webPartLoadTime = webPartLoadTime[lastIndex - startIndex];
        pageComponentStart.sort(function (a, b) { return a - b; });
        perfSummary.pageComponentStart = pageComponentStart[lastIndex - startIndex];
        pageComponentRender.sort(function (a, b) { return a - b; });
        perfSummary.pageComponentRender = pageComponentRender[lastIndex - startIndex];
        canvasRender.sort(function (a, b) { return a - b; });
        perfSummary.canvasRender = canvasRender[lastIndex - startIndex];
        layoutRender.sort(function (a, b) { return a - b; });
        perfSummary.layoutRender75Percentile = layoutRender[lastIndex - startIndex];
        renderPostPageStart.sort(function (a, b) { return a - b; });
        perfSummary.renderTime = renderPostPageStart[lastIndex - startIndex];
        euplsPostHead.sort(function (a, b) { return a - b; });
        perfSummary.euplPostHead = euplsPostHead[lastIndex - startIndex];
        apiCalls.sort(function (a, b) { return a - b; });
        perfSummary.apiCalls = apiCalls[lastIndex - startIndex];
        cdnRequests.sort(function (a, b) { return a - b; });
        perfSummary.cdnRequests = cdnRequests[lastIndex - startIndex];
        perfSummary.resoureRequests = resourceRequests;
        return perfSummary;
    };
    PerformancePageUtil._PageReady = function () {
        return (TAB.Win.window.document.readyState === 'complete' || TAB.Win.window.document.readyState === 'interactive');
    };
    /**
      * Returns true for the environment where test pages are available for test
      */
    PerformancePageUtil._isSetupOkay = function () {
        return this.whiteListedEnvironments.indexOf(TAB.Settings.Get('ProductServer').toLowerCase()) >= 0;
    };
    PerformancePageUtil._getRandomQuery = function () {
        return "guid=" + Math.ceil(Math.random() * 1000000);
    };
    PerformancePageUtil._initEUPLApprovedInfo = function () {
        this._approvedNetworkCallsByCount = [
            { networkName: '/api/shellbootinfo/business/oneshell/', maxAllowed: 2 },
            { networkName: '/shellux/o365/versionless/', maxAllowed: 15 },
            { networkName: 'sp-suite-nav-search-common', maxAllowed: 2 },
            { networkName: '_api/contextinfo', maxAllowed: 2 },
            { networkName: 'search/configuration', maxAllowed: 1 } // VSO#710127: Requested by search
        ];
    };
    PerformancePageUtil.spModuleLoader = 'spModuleLoader';
    PerformancePageUtil.spTelemetryComponentId = '8217e442-8ed3-41fd-957d-b112e841286a';
    PerformancePageUtil.performanceData = {};
    PerformancePageUtil.baselinePerformanceData = {};
    // List of environments where pages are preconfigured for performance test
    PerformancePageUtil.whiteListedEnvironments = ['https://testtab.spoppe.com', 'https://a830edad9050849sherwintest.sharepoint.com', 'https://a830edad9050849testss01.sharepoint.com'];
    PerformancePageUtil.masterManifestsUrl = 'https://resourceseng.blob.core.windows.net/files/refs_heads_master/manifests.js';
    PerformancePageUtil.masterModuleLoader = 'https://resourceseng.blob.core.windows.net/files/refs_heads_master/sp-pages-assembly_default.js';
    PerformancePageUtil.isPullRequest = false;
    // All components in sp-pages-assembly.
    PerformancePageUtil._pagesAssemblyComponents = [
        'sp-core-library',
        'office-ui-fabric-react-bundle',
        'sp-diagnostics',
        'sp-load-themed-styles',
        'sp-telemetry',
        'sp-component-utilities',
        'sp-webpart-base',
        'sp-lodash-subset',
        'sp-loader',
        'odsp-utilities-bundle',
        'sp-page-context',
        'sp-http',
        'sp-canvas',
        'sp-application-base',
        'sp-a11y',
        'sp-suite-nav',
        'sp-webpart-shared',
        'i18n-utilities-bundle',
        'sp-safehtml',
        'oneshell',
        // 681598 to remove rte and deferred-component
        'sp-rte',
        'sp-deferred-component'
    ];
    return PerformancePageUtil;
}());



/***/ }),

/***/ "3eAX":
/*!*****************************************!*\
  !*** ./lib/SPTaskLib/Pages/HomeSite.js ***!
  \*****************************************/
/*! exports provided: HomeSite */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeSite", function() { return HomeSite; });
/* harmony import */ var _TeamSitePage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TeamSitePage */ "UjPA");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Next */ "BJbA");


/**
 * @public
 */
var HomeSite = /** @class */ (function () {
    function HomeSite() {
    }
    HomeSite.ensureHomeSiteConfigured = function (siteName) {
        var rootSiteUrl = TAB.Settings.Get('ProductServerSet').split(';')[0];
        var homeSiteGetUrl = rootSiteUrl + "/_api/SPHSite/Details";
        var homeSiteSetUrl = rootSiteUrl + "/_api/SP.SPHSite.SetSPHSite";
        var homeSiteUrl = rootSiteUrl + "/" + _TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].Path + "/" + siteName;
        var getResult = {};
        var setResult = {};
        _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].AddTaskSendGetRequest(rootSiteUrl, homeSiteGetUrl, getResult);
        var shouldConfigureHomeSite = false;
        TAB.AddTask(TAB.MakeTask(function () {
            if (!getResult.retVal || !getResult.retVal.Url) {
                shouldConfigureHomeSite = true;
            }
        }), undefined);
        TAB.AddTask(TAB.MakeTask(function () {
            if (shouldConfigureHomeSite) {
                _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].AddTaskSendPostRequest(rootSiteUrl, homeSiteSetUrl + "(siteUrl=@url)?@url='" + homeSiteUrl + "'", '', setResult);
            }
        }), undefined);
        // if we need to set home site, wait for API response
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return !shouldConfigureHomeSite || setResult !== {};
        }));
    };
    HomeSite.waitForSpHomeToRender = function (spHomeUrl) {
        var bodyElem;
        var spHomeWithQueryParam = spHomeUrl + "?source=homeSite"; // for when navigating via home site "My SharePoint" nav node
        return TAB.MakeWaiter(function () {
            if ((TAB.Win.location.href === spHomeUrl || TAB.Win.location.href === spHomeWithQueryParam)
                && !bodyElem
                && TAB.ElementExists(TAB.Win, TAB.searchBy.tag, 'body')) {
                bodyElem = TAB.GetElement(TAB.Win, TAB.searchBy.tag, 'body');
            }
            return bodyElem &&
                TAB.ElementExists(bodyElem, TAB.searchBy.customQuery, "[data-automation-id='SPH-HomePageView']");
        });
    };
    HomeSite.getHeaderNavNodes = function () {
        try {
            var horizontalNavEl = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-HorizontalNavItems');
            return TAB.GetElements(horizontalNavEl, TAB.searchBy.hasClassName, 'ms-HorizontalNavItem-link');
        }
        catch (error) {
            return [];
        }
    };
    HomeSite.verifyHeaderNavNodes = function () {
        return TAB.MakeWaiter(function () {
            var navigationNodes = HomeSite.getHeaderNavNodes();
            return navigationNodes.length >= 5
                && navigationNodes[0].innerText === 'Home'
                && navigationNodes[1].innerText === 'Documents'
                && navigationNodes[2].innerText === 'Pages'
                && navigationNodes[3].innerText === 'My SharePoint'
                && navigationNodes[4].innerText === 'Site contents';
        });
    };
    HomeSite.actionButtonsExistInHeader = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='CreateSiteSiteButton']")
            || TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='ShareSiteButton']")
            || TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='SiteHeaderFollowButton']");
    };
    HomeSite.homeSiteDataExists = function () {
        var win = TAB.Win.window;
        var cachedValue = win._spHomePageDataCache
            && win._spHomePageDataCache['SPHomeWeb:companyportal']
            && win._spHomePageDataCache['SPHomeWeb:companyportal'].cacheValue
            ? win._spHomePageDataCache['SPHomeWeb:companyportal'].cacheValue
            : undefined;
        var secondaryFlush = win._spHomeCompanyPortalHeaderContext;
        if (cachedValue) {
            var deSerializedContext = JSON.parse(cachedValue);
            return Boolean(deSerializedContext.siteUrl);
        }
        if (secondaryFlush) {
            return Boolean(secondaryFlush.siteUrl);
        }
        return false;
    };
    return HomeSite;
}());



/***/ }),

/***/ "4VGn":
/*!******************************************!*\
  !*** ./lib/SPTaskLib/MuiSettingsPage.js ***!
  \******************************************/
/*! exports provided: MuiSettingsPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MuiSettingsPage", function() { return MuiSettingsPage; });
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Next */ "BJbA");


/**
 * @public
 */
var MuiSettingsPage = /** @class */ (function () {
    function MuiSettingsPage() {
    }
    MuiSettingsPage.AddTaskCreateSite = function (siteName, result) {
        TAB.SetWaitTime(2 * 60 * 1000);
        var d = new Date();
        var uniqueSiteName = TAB.GetUniqueName('delete_' + siteName + '_' + d.getHours() + '_' + d.getMinutes() + '_');
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].AddTaskCreateCommSite(uniqueSiteName, result, _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["SiteDesignId"].BlankDesignId, 1036 /* French */);
        TAB.AddTask(TAB.MakeTask(function () {
            /* tslint:disable-next-line:no-string-literal */
            result.SiteUrl = result['retVal'].d.Create.SiteUrl;
            result.SiteName = uniqueSiteName;
        }));
    };
    MuiSettingsPage.AddTaskLoadSettingsPage = function (siteInfo, pageName) {
        TAB.AddTask(TAB.MakeTask(function () {
            var muiPageUrl = siteInfo.SiteUrl + "/_layouts/15/" + pageName + ".aspx";
            TAB.AddTask(TAB.LoadPage(muiPageUrl));
        }), TAB.MakeWaiter(function () {
            return TAB.Win.location.href.indexOf("/_layouts/15/" + pageName + ".aspx") > 0;
        }));
    };
    MuiSettingsPage.AddTaskTurnMultilingualOn = function () {
        TAB.AddTask(undefined, TAB.AndWaiters(
        /* tslint:disable-next-line:no-any */
        _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'multilingualSupportToggle'), TAB.MakeWaiter(function () {
            /* tslint:disable-next-line:no-any */
            var toggle = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win, 'multilingualSupportToggle');
            return !!toggle && !toggle.hasAttribute('disabled');
        })));
        TAB.AddTask(TAB.MakeTask(function () {
            /* tslint:disable-next-line:no-any */
            var toggle = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win, 'multilingualSupportToggle');
            if (toggle.attributes['aria-checked'].value === 'false') {
                toggle.click();
            }
        }), 
        /* tslint:disable-next-line:no-any */
        _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'MuiMLPLanguageList'));
    };
    MuiSettingsPage.GetAddLanguageElement = function () {
        /* tslint:disable-next-line:no-any */
        return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win, 'MuiAddLanguage');
    };
    MuiSettingsPage.GetMLPLanguageList = function () {
        /* tslint:disable-next-line:no-any */
        return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win, 'MuiMLPLanguageList');
    };
    MuiSettingsPage.GetMLPLanguageCount = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(MuiSettingsPage.GetMLPLanguageList(), 'DetailsRow').length;
    };
    MuiSettingsPage.WaitForLanguageCount = function (numLanguages) {
        return TAB.MakeWaiter(function () {
            return numLanguages === MuiSettingsPage.GetMLPLanguageCount();
        });
    };
    MuiSettingsPage.AddTaskAddLanguage = function (value) {
        var numLanguages = 0;
        TAB.AddTask(TAB.MakeTask(function () {
            numLanguages = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(MuiSettingsPage.GetMLPLanguageList(), 'DetailsRow').length;
            TAB.AddTask(TAB.MakeTask(function () {
                // First, we try to enter the pseudoloc version of the language
                MuiSettingsPage.enterLanguage(MuiSettingsPage.pseudolocLanguageName(value));
            }), 
            /* tslint:disable-next-line:no-any */
            _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'MuiAddLanguage'));
            TAB.AddTask(TAB.MakeTask(function () {
                // Try again with the English value (used in local TAB tests)
                // This depends on the fact that entering an invalid value in the dropdown currently just clears
                // input, with no prompt to click away
                MuiSettingsPage.enterLanguage(value);
            }), MuiSettingsPage.WaitForLanguageCount(numLanguages + 1));
        }), 
        /* tslint:disable-next-line:no-any */
        _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'MuiAddLanguage'));
    };
    MuiSettingsPage.AddTaskSaveSettingsPage = function () {
        TAB.AddTask(undefined, TAB.AndWaiters(
        /* tslint:disable-next-line:no-any */
        _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'MuiSaveButton'), TAB.MakeWaiter(function () {
            /* tslint:disable-next-line:no-any */
            var button = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win, 'MuiSaveButton');
            return !!button && !button.hasAttribute('disabled');
        })));
        TAB.AddTask(TAB.MakeTask(function () {
            /* tslint:disable-next-line:no-any */
            var button = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win, 'MuiSaveButton');
            button.click();
        }), 
        /* tslint:disable-next-line:no-any */
        _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'MuiSaveSuccess'));
    };
    MuiSettingsPage.enterLanguage = function (name) {
        var addLangInput = (TAB.GetElements(MuiSettingsPage.GetAddLanguageElement(), TAB.searchBy.tag, 'input')[0]);
        var focusEv = TAB.Win.document.createEvent('HTMLEvents');
        focusEv.initEvent('focus', true /*bubble*/, false /*cancelable*/);
        addLangInput.dispatchEvent(focusEv);
        addLangInput.value = name;
        var ev = TAB.Win.document.createEvent('HTMLEvents');
        ev.initEvent('input', true /*bubble*/, false /*cancelable*/);
        addLangInput.dispatchEvent(ev);
        // press Enter
        TAB.FireKeyboardEvent(addLangInput, 'keydown', 13);
    };
    MuiSettingsPage.pseudolocLanguageName = function (name) {
        switch (name) {
            case 'Malay':
                return '[!!--##Māľâƴ##--!!]';
            case 'Macedonian':
                return '[!!--##Măĉĕďŏŉĭåƞ##--!!]';
            case 'Vietnamese':
                return '[!!--##Vĩĕťŉǻmęşē##--!!]';
            case 'Arabic':
                return '[!!--##Äřäƅīĉ##--!!]';
            case 'Azerbaijani':
                return '[!!--##ÄźěřƃãįĴǻňı (Ŀąŧĩƞ)##--!!]';
            case 'Czech':
                return '[!!--##Ćżěĉĥ##--!!]';
            case 'Croatian':
                return '[!!--##Ĉřŏǻŧĩąň##--!!]';
            case 'Chinese (Simplified)':
                return '[!!--##Ċĥıņȇŝė (Šįmƥļıƒĭęđ)##--!!]';
            case 'Chinese (Traditional, Taiwan)':
                return '[!!--##Ċĥıŉęşę (Ŧŕäđĭťįőńâĺ, Ŧāįŵåņ)##--!!]';
            case 'Catalan':
                return '[!!--##Ċȃŧàŀâŋ##--!!]';
            case 'Danish':
                return '[!!--##Đáņīšħ##--!!]';
            case 'Dutch':
                return '[!!--##Đŭťċħ##--!!]';
            case 'English':
                return '[!!--##Ęŋģľįšħ##--!!]';
            case 'Estonian':
                return '[!!--##Ęŝŧōŉįáņ##--!!]';
            case 'German':
                return '[!!--##Ĝĕřmȃń##--!!]';
            case 'Galician':
                return '[!!--##Ğăľĩćįãň##--!!]';
            case 'Greek':
                return '[!!--##Ģŕėȅƙ##--!!]';
            case 'Hungarian':
                return '[!!--##Ĥųńģàŕıäň##--!!]';
            case 'Hebrew':
                return '[!!--##ĤȅƂřȇŵ##--!!]';
            case 'Hindi':
                return '[!!--##Ħĩŋďı##--!!]';
            case 'Irish':
                return '[!!--##Ĩŗĭšĥ##--!!]';
            case 'Italian':
                return '[!!--##Ĩŧåļıäń##--!!]';
            case 'Indonesian':
                return '[!!--##İńďơńēŝĭąń##--!!]';
            case 'Japanese':
                return '[!!--##ĵǻƥȁŋēšē##--!!]';
            case 'Korean':
                return '[!!--##Ķơŕėȃń##--!!]';
            case 'Lithuanian':
                return '[!!--##Ĺĭţħųȁńıąƞ##--!!]';
            case 'Latvian':
                return '[!!--##Ľăťvĭȁņ##--!!]';
            case 'Norwegian':
                return '[!!--##Ńőŕŵēġıáƞ##--!!]';
            case 'Russian':
                return '[!!--##Ŗŭśšıåņ##--!!]';
            case 'Romanian':
                return '[!!--##Řőmāňıâƞ##--!!]';
            case 'Swedish':
                return '[!!--##Ŝŵěďīšħ##--!!]';
            case 'Slovene':
                return '[!!--##Şĺōvĕƞē##--!!]';
            case 'Slovak':
                return '[!!--##Şļōvȃķ##--!!]';
            case 'Spanish':
                return '[!!--##Şƿáƞįśħ##--!!]';
            case 'Serbian (Latin)':
                return '[!!--##Šȇŕɓįȃƞ (Łǻŧıŉ)##--!!]';
            case 'Serbian (Cyrillic, Serbia)':
                return '[!!--##Šȇřƃıáň (Ćŗɏĭŀŀĩč, Šęŕƃĩą)##--!!]';
            case 'Turkish':
                return '[!!--##Ţūřĸışĥ##--!!]';
            case 'Thai':
                return '[!!--##Ŧħåĩ##--!!]';
            case 'Ukrainian':
                return '[!!--##Ūķřǻĩŋĭăŉ##--!!]';
            case 'Welsh':
                return '[!!--##Ŵȇľşĥ##--!!]';
            case 'Dari':
                return '[!!--##Ɗäřī##--!!]';
            case 'Finnish':
                return '[!!--##Ƒīŉŋĩŝħ##--!!]';
            case 'Kazakh':
                return '[!!--##Ƙąžãķħ##--!!]';
            case 'Polish':
                return '[!!--##Ƥōľĩŝĥ##--!!]';
            case 'Portugese (Portugal)':
                return '[!!--##Ƥőŕŧũğųĕşȅ (Ƥőŗţůğäľ)##--!!]';
            case 'Portugese (Brazil)':
                return '[!!--##Ƥơŗŧűğůěšȅ (ßŗåžĭŀ)##--!!]';
            case 'Bosnian':
                return '[!!--##Ƀōşńīãň##--!!]';
            case 'Bulgarian':
                return '[!!--##Ƀũĺġȃŕīãņ##--!!]';
            case 'Basque':
                return '[!!--##ʙãŝɋūȅ##--!!]';
            default:
                return name;
        }
    };
    return MuiSettingsPage;
}());



/***/ }),

/***/ "7fnt":
/*!************************************************!*\
  !*** ./lib/SPTaskLib/Controls/ImageWebpart.js ***!
  \************************************************/
/*! exports provided: ImageWebpart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageWebpart", function() { return ImageWebpart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
/* harmony import */ var _FilePicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FilePicker */ "8uLm");
/* harmony import */ var _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Pages/PropertyPane */ "M/CL");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






var IMAGE_EDIT_PREVIEW_AUTOMATION_ID = 'imageEditPreview';
/**
 * @public
 */
var ImageWebpart = /** @class */ (function (_super) {
    __extends(ImageWebpart, _super);
    function ImageWebpart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Image, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Image.toString()) || this;
    }
    ImageWebpart.prototype.IsWebpartUpdated = function () {
        return TAB.ElementExists(this._root, TAB.searchBy.tag, 'img');
    };
    ImageWebpart.prototype.AddTaskOpenFilePicker = function (filePicker) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            if (!_this._filePicker && _this._placeHolderButton) {
                TAB.Log.Comment('Clicking placeholder button to open File Picker for Image Web Part');
                TAB.ClickElement(_this._placeHolderButton);
            }
        }), _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].WaitForElementsByDataAutomationId(TAB.Win, _FilePicker__WEBPACK_IMPORTED_MODULE_4__["FILE_PICKER_AUTOMATION_ID"]));
        TAB.AddTask(TAB.MakeTask(function () {
            filePicker.SetRoot(_this._filePicker);
        }), filePicker.WaitForViewLoad(_FilePicker__WEBPACK_IMPORTED_MODULE_4__["FilePickerView"].Recent));
    };
    ImageWebpart.prototype.AddTaskOpenCrop = function () {
        var _this = this;
        TAB.AddTask(undefined, TAB.AndWaiters(this.WaitForElementsByDataAutomationId(IMAGE_EDIT_PREVIEW_AUTOMATION_ID, 1), this.WaitForElementsByDataAutomationId('localFilePreview', 0)));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking Image Edit Preview to open Image Cropper');
            TAB.ClickElement(_this._imageEditPreview);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(_this._root, TAB.searchBy.className, 'cropper-container cropper-bg');
        }));
    };
    ImageWebpart.prototype.AddTaskCheckCroppingResult = function (listName) {
        var _this = this;
        var imageRatio, imageAreaRatio;
        TAB.AddTask(TAB.MakeTask(function () {
            var image = TAB.GetElement(_this._imageEditPreview, TAB.searchBy.tag, 'img');
            imageRatio = image.clientWidth / image.clientHeight;
            imageAreaRatio = image.parentElement.clientWidth / (image.parentElement.clientHeight - 4 /*padding*/);
        }), TAB.MakeWaiter(function () {
            // either img or imageArea will have same aspect ratio as cropBox depending on service type
            return Math.round(_this._cropBoxRatio * 100) / 100 === Math.round(imageRatio * 100) / 100 ||
                Math.round(_this._cropBoxRatio * 100) / 100 === Math.round(imageAreaRatio * 100) / 100;
        }));
        this.AddTaskPushImageToDeleteArray(listName);
    };
    /**
     * For image that uploaded to SharePoint, we are maintaining a list of file name.
     * After tab tests finishes, those image need to be deleted to release space for future tests.
     * @param listName - the name of the list that containing all uploaded images
     */
    ImageWebpart.prototype.AddTaskPushImageToDeleteArray = function (listName) {
        var _this = this;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                return Boolean(_this.imageUrl);
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            if (TAB[listName]) {
                TAB[listName].push(_this.imageUrl);
            }
        }));
    };
    ImageWebpart.prototype.AddTaskCropImageByKeyboard = function (steps) {
        var _this = this;
        for (var i = 0; i < steps; i++) {
            TAB.AddTask(TAB.MakeTask(function () {
                // mouse down on the NW corner
                _this._cropBoxRatio = _this._cropperBox.clientWidth / _this._cropperBox.clientWidth;
                // Add some randomization to shift/ctrl + arrow Keys
                TAB.Log.Comment('Keydown on shift + left arrow to reduce cropper box size');
                Object(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["FireKeyboardEvent"])(_this._cropWrapper, 'keydown', _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["KeyCodes"].left, 'shiftKey');
            }), TAB.MakeWaiter(function () {
                // If crop reached the end of one dimension or the ratio has changed because of a crop action
                return _this._cropperBox.clientWidth === 0 || _this._cropperBox.clientWidth === 0 ||
                    _this._cropBoxRatio !== _this._cropperBox.clientWidth / _this._cropperBox.clientHeight;
            }));
        }
        TAB.AddTask(TAB.MakeTask(function () {
            // recalculate cropBox ratio
            _this._cropBoxRatio = _this._cropperBox.clientWidth / _this._cropperBox.clientHeight;
            // Add some randomization to shift/ctrl + arrow Keys
            TAB.Log.Comment('result image aspect ratio is ' + _this._cropBoxRatio);
        }), undefined);
    };
    ImageWebpart.prototype.AddTaskCloseCrop = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking Saving button to close cropper');
            var imageSaveButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(_this._root, 'imageSaveButton');
            TAB.ClickElement(imageSaveButton);
        }), this.WaitForElementsByDataAutomationId(IMAGE_EDIT_PREVIEW_AUTOMATION_ID, 1));
    };
    /**
     * Test image web part upload image. In Edge, it will use bing search instance. In other case, provided file and
     * file name will be uploaded.
     * @param filePicker - file picker tab test instance
     * @param file - file instance that been uploaded
     * @param listName - the name of the list that containing all uploaded images
     */
    ImageWebpart.prototype.AddTaskUploadImage = function (filePicker, file, listName) {
        if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
            TAB.Log.AddTaskComment('Using bing search file for testing in Edge');
            this.AddTaskUploadImageFromBingSearch(filePicker, listName);
        }
        else {
            filePicker.AddTaskUploadItem(file);
            this.AddTaskPushImageToDeleteArray(listName);
        }
    };
    ImageWebpart.prototype.AddTaskUploadImageFromBingSearch = function (filePicker, listName) {
        filePicker.AddTaskSelectView(_FilePicker__WEBPACK_IMPORTED_MODULE_4__["FilePickerView"].Search);
        filePicker.AddTaskOpenFile(0);
        this.AddTaskPushImageToDeleteArray(listName);
    };
    /**
     * Change image to another one using file picker bing search.
     * @param filePicker - file picker tab task instance
     * @param listName - the name of the list that containing all uploaded images
     */
    ImageWebpart.prototype.AddTaskChangeImageUseBingSearch = function (filePicker, listName) {
        var _this = this;
        var imageUrl;
        this.AddTaskClickConfigureButton();
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                return Boolean(_this._changeImageButton);
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            imageUrl = _this.imageUrl;
            TAB.ClickElement(_this._changeImageButton);
            TAB.Log.Comment('Click change image button');
        }), _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].WaitForElementsByDataAutomationId(TAB.Win, _FilePicker__WEBPACK_IMPORTED_MODULE_4__["FILE_PICKER_AUTOMATION_ID"]));
        TAB.AddTask(TAB.MakeTask(function () {
            filePicker.SetRoot(_this._filePicker);
            TAB.Log.Comment('Set file picker root');
        }), filePicker.WaitForViewLoad(_FilePicker__WEBPACK_IMPORTED_MODULE_4__["FilePickerView"].Recent));
        filePicker.AddTaskSelectView(_FilePicker__WEBPACK_IMPORTED_MODULE_4__["FilePickerView"].Search);
        filePicker.AddTaskOpenFile(0);
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Compare image URL');
        }), TAB.MakeWaiter(function () {
            try {
                return _this.imageUrl !== imageUrl;
            }
            catch (e) {
                return false;
            }
        }));
        this.AddTaskPushImageToDeleteArray(listName);
        _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_5__["PropertyPane"].AddTaskClosePropertyPane();
    };
    /**
     * Add specific link url to image web part.
     * @param linkUrl - Link Url to add
     */
    ImageWebpart.prototype.AddTaskAddLink = function (linkUrl) {
        var _this = this;
        this.AddTaskClickConfigureButton();
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                return Boolean(_this._linkInput);
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            var inputField = _this._linkInput;
            _ReactUtil__WEBPACK_IMPORTED_MODULE_3__["ReactUtil"].TriggerOnChange(inputField, linkUrl);
            TAB.Log.Comment('Add link Url to image property pane');
        }), TAB.MakeWaiter(function () {
            try {
                return _this._linkInput.value === linkUrl;
            }
            catch (e) {
                return false;
            }
        }));
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskSavePage();
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                var LinkHref = TAB.GetElement(_this._root, TAB.searchBy.tag, 'A').getAttribute('href');
                return LinkHref === linkUrl;
            }
            catch (e) {
                return false;
            }
        }));
    };
    /**
     * Upload a small width image and check whether 'add text over image' toggle button is disabled.
     * @param filePicker - tab test filepicker instance
     * @param file - image file that need to be uploaded
     * @param listName - Name of the list that would maintain the source of all uploaded image to be deleted after test complete.
     */
    ImageWebpart.prototype.AddTaskDisableTextOverlay = function (filePicker, file, listName) {
        // Edge browser does not support uploading specific file.
        if (navigator.userAgent.toLowerCase().indexOf('edge') === -1) {
            filePicker.AddTaskUploadItem(file);
            this.AddTaskCheckToggleDisabled(true /* isDisabled */);
            this.AddTaskPushImageToDeleteArray(listName);
        }
    };
    ImageWebpart.prototype.AddTaskCheckToggleDisabled = function (isDisabled) {
        var _this = this;
        this.AddTaskClickConfigureButton();
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                return _this._textOverlayToggle.disabled === isDisabled;
            }
            catch (e) {
                return false;
            }
        }));
        _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_5__["PropertyPane"].AddTaskClosePropertyPane();
    };
    ImageWebpart.prototype.AddTaskTurnOnTextOverlay = function () {
        var _this = this;
        this.AddTaskClickConfigureButton();
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                return Boolean(_this._textOverlayToggle);
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            if (_this._textOverlayToggle.disabled === true) {
                throw new Error('Toggle button is not enabled');
            }
            if (_this._textOverlayToggle.getAttribute('aria-pressed') === 'false') {
                TAB.ClickElement(_this._textOverlayToggle);
                TAB.Log.Comment('Enable add text over image toggle button');
            }
        }), TAB.MakeWaiter(function () {
            try {
                return Boolean(_this._overlayTextField);
            }
            catch (e) {
                return false;
            }
        }));
        _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_5__["PropertyPane"].AddTaskClosePropertyPane();
    };
    /**
     * Open setting for text overlay and add some text to web part. Page will be saved after the test.
     * @param text - string added to web part, its length should be less than 48.
     */
    ImageWebpart.prototype.AddTaskAddTextOverlay = function (text) {
        var _this = this;
        try {
            this.AddTaskTurnOnTextOverlay();
            TAB.AddTask(TAB.MakeTask(function () {
                var overlayTextField = _this._overlayTextField;
                _ReactUtil__WEBPACK_IMPORTED_MODULE_3__["ReactUtil"].TriggerOnChange(overlayTextField, text);
                TAB.Log.Comment("Change text over image to " + text);
            }), TAB.MakeWaiter(function () {
                try {
                    return _this._overlayTextField.value === text;
                }
                catch (e) {
                    return false;
                }
            }));
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskSavePage();
            TAB.AddTask(undefined, TAB.MakeWaiter(function () {
                try {
                    return _this._overlayTextField.textContent === text;
                }
                catch (e) {
                    return false;
                }
            }));
        }
        catch (e) {
            // Current image is too small to add text over it. Do nothing here.
            TAB.Log.Comment('Image size is too small to add text over image');
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskSavePage();
        }
    };
    Object.defineProperty(ImageWebpart.prototype, "imageUrl", {
        get: function () {
            return TAB.GetElement(this._imageEditPreview, TAB.searchBy.tag, 'img').getAttribute('data-sp-originalimgsrc');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageWebpart.prototype, "_placeHolderButton", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(this._root, 'placeholderButton');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageWebpart.prototype, "_cropperBox", {
        get: function () {
            return TAB.GetElement(this._root, TAB.searchBy.className, 'cropper-crop-box');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageWebpart.prototype, "_filePicker", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win, _FilePicker__WEBPACK_IMPORTED_MODULE_4__["FILE_PICKER_AUTOMATION_ID"]);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageWebpart.prototype, "_cropWrapper", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(this._root, 'imageCropWrapper');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageWebpart.prototype, "_imageEditPreview", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(this._root, IMAGE_EDIT_PREVIEW_AUTOMATION_ID);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageWebpart.prototype, "_propertyPane", {
        get: function () {
            return TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'showPane');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageWebpart.prototype, "_changeImageButton", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(this._propertyPane, 'change-image-button');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageWebpart.prototype, "_linkInput", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(this._propertyPane, 'image-link-input');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageWebpart.prototype, "_textOverlayToggle", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(this._propertyPane, 'text-over-image-toggle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageWebpart.prototype, "_overlayTextField", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(this._root, 'image-overlay-text');
        },
        enumerable: true,
        configurable: true
    });
    ImageWebpart.logoMS = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAAAuCAYAAABK69fpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTAwQkM2Mzk4NDBBMTFFNjhDQkVCOTdDMjE1NkM3RkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTAwQkM2Mzg4NDBBMTFFNjhDQkVCOTdDMjE1NkM3RkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMkM5MzFBNDcwQTExMUU2QUVERkExNDU3ODU1M0I3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMkM5MzFBNTcwQTExMUU2QUVERkExNDU3ODU1M0I3QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgQJy/MAAAxESURBVHja7FwNlFVVFT6PN8MMM8AIjPxomEyggCYgajIaguCkaC5AEocif9CIiLLyp9IMC9NgVRqrGpMSwcFSIs3URHERJoJCSlIgMQk0YCS/MjAww8zrbO/36rz99rnvzpt3Z6Z551trL5hz3z3n3HPO/t/3Rg6NL6lXIeCWXhfk0r99Ji05Hkb/IxojI8vK6lfbrk+fPl05OLQ2OrglcHBwDObg4BjMwcHBMZiDg2MwBwfHYA4ODr7IaW8PNOfliNryeKnqpM50u+vQXJRoGqlpmKZiTUc0HdT0hKa1Wclg+9/urWqqe6pOPf8vpjtYU39Nb4Mc2g6+oukWTSdZLL/sZLDDu4tU/ZE82+VZmko1NQgL9oymymYMPUTT7ZoaWXtU0wuafmm00QS/p+kLmvIhGedpmu3OdauDCiR+gLNiw7GsNRE75DSqSIeY7fJYTVdarp2u6TeajqY5NDFXueXaUcZgozV91fi7QNNdml7U9Cd3xlsVs1IwV1xAZieDpYCf5DlD0wWaVqTRbz9Nl/hcr2N/jxJ+E8H4jsFaD700fVFo365pIfwvcu7/xq53hWV0tqalmrZkK4OlkkrXpMlgE+EEB8V6S/tf3Ta0KiiYcSpre1fT5WxvOkAgfkLTJAjG09D+sslgLkyfiAlNZJQ4Y05t4j2/1/QQa7tf0x/cFrQqBoFxTDwpCD7ysztqukfTNE0DwUs13L93GiwRPTRN0fTjJtxThgBHU1CraYamRzSdrOmfmtZoirktaFU0Cm1vNMH0z3ofLAhI5T+ogkeKbhA2KYhlQJLuFbfcbZ7B6n32L2ZpdwwG7NB0GKZBHOdqGqqC5TnINLiIta1IEfDgdnwcMcsGSyhSXn6mGHtI972vaZem3QHHihkHpLumPvh/NZx5G05AMID+LcAB3K/pPU3/TmMPOmk6BX1SSuM4xv9XE/ujQENvzKsQ/dC89qCvVPvQgPE5cvFvlK1frkWQJvw+2xmMwucLNX3faKO81OSADEZBkW7G3xs1PRuAwegw/QSMorDBFJn6cgozcQhMy3OUV2XQjUnarZr+oulhTc8bG/5d3BMzJPUEHJA7NV2K/mJ4bko37GVjj0H7UAQCehjXDoExyZz6tabfBVg7YuqZCBQMZP1RXnAb5vINi9CI43xN12oarrxorulD12BemzUtUV4FBmfue5UXGazHGnDcrLwgVg5jsCjmzfv7oaZ9uB7Jdgaj518OM+90ZibehQ2yoQAba4LyaDsDjFuIyFS+0XYiGC1mOYxzNF3P7uGScxCIDtpKmLnERBTlupD9/sOafqqSUwbn4qDEQZryATBk1DJ2F2PscgQGvqbpHcvvidkpL/hRn7UdDJpvYbBiY006WvrpDCYgGg/rgnJcm4z9vwhCw4b4PIIgivVLUI/ZDNqYKhwIE30htfxwhUoM6RIzPi5EoWy2PmfeI5bfUtHXUmiu/IDPFROCKnys+5Scj6s17ieN+RIETjTg2BEw43ImtOIgbbHMh7lMHLOYzb2wJtN9mEvCGGj2YQHWPSPIdgaL4OBUCs7sZJ9DRe3Xsbb1MPMKMqxhf6a8yg8J+2CWvpXCjJI0xJU+QqcePs3DFiZR0E5kjm63XKcaywWGGRxftzkQYDwa9xLM6xWGeZonCCxqe0TwfePYjnnZtGdfCMJijFsYtomU7cjHAaV6wXFG+2iYBm8J9wwTDv2CEOY2zaJJKaw/D1piHzQOOffnKa9ANa8JwvN5+Ey1eN5SaI3bmKSP42n4GVW4pwD+z23wh0xcCC0zF3+XwFzlUbcvwWSsh6lbAu06Q2CwuN/GQRHZu5VXNH0EZu5H4GOOEZifinnvgKDsargGvEyK5v6MRRA9wMzHWqz/xv8yWPzrT2Hh3aVT0mbiiopFTb6nIT0tpiCtxzGHdaKFwa5h5to2I6iQKXTHAeDYAH9iG2vfgyAHMcDFKlhObTYOJT84A5Rcj0fpi88L7Tvg8y0TzM6bNP1c0wFNH1LJify16NcM1sTfLljErIhuYEaOF2Bx7BcE0ToEOD7Jrt2AQNObzN/iIG24yrJ+fDyKXK42+2x3JmLj3/Ue5qb1pbiVKvmVkc+o5MLOIjCYid8qL0ydSVwmmFLkt00VmEuxiN5TKnXRMh2a7wjtdZD4XVn7VkT0lM9hmyH4NKQtzjKEGWf8bsJYpkYwfdUyBGdMvAdm2W/powbz4vvTG9qam5+ShSMhT3AhItxFyFkwcn5DGAf9xlWzPhi8YuKSurQ7Wb7EfklFRknfRbxiQLWav+vEdEbbA0b5utHWDwf9Saa9TmaOeGUIS3ip0PaQRaOmgwU+Wk7ybxb6HOI4NkNQjWPtI8DQVNf3PvPLKPL4nPKitqnqQKWgDEVuq1PctxN7eBNrH4tgiQtyhGgimlikEstfSEhcbawTmU9T2D2vKnvxbrrIRbTNBDFDpmoV4/kuG3h+h3yyNQH7flVoiyfyqyzjlsLPIQYrhz8pYbBFEwfB60LbSWGfR1fsm4hNsOdNXG6YauT0f0xgykzjBJWYRI5r2OoM9d/oo41Iu3QRzMaDAfuWoopRo59vKa96RjK5Loa/RO/FfVYwvwqF5wgaPd0ltJ3iGKzlsUAl5l66woEmXMvs9G0qnAp4qWzqqErOZ4Wx95SczWnGWWmwPE8crykvT+b3ag5FJSkUP9dgziLBV2tUwcvLpJRLgWOwlgdJT/5C3VXKSypfleQKen5FphFRyeHpQhVyzgY4LvhmERW80r9TgN+QlUBpjtnKi/TZcKv6X9TwkEXzRZrxrNWOwVoeNYLjS5EwKisqZlL5FyHNoVbQBN1bwqRRXoHtQcF8C/qe3AChTSq2pagepQjoTfLPKS+cLoG+W9IT68EjlDkq+QVJG/oHNGcdg7UAHmXmGPlDl7H1WgVzJywmlzZ/Ugs8OwmOrUJ7WcDzJEU/1/ncQ5qJoqOUGpgnmHyUdD4N/98s3H9JwOcaK7S9FsLaxRyDpcY/lPfWsZ8ZsjjkOSwX2iiCWdoCwvNpoW1qAA1KTHiWwECvBJgThe+pGmSt8BwFhvnOQcUA56eY1wiBwSi9sroZa9QgCIMc7us5BrNLokofB3q7Cv/1/idUckEwmWqPQZsqi9P+aQRq8poxNvlIe1hbDwQeSnwO8YOCMHrU8FM/DvN7UAofkO9F3PeiMP47wprQ8w6z9EftVKWTKwiwjc30VQ8I/ucYznEO9kNGSd0hlms7Qx6ftCh9n+/brJ20yLNgNPrAShWk5lAwHh3iDSp4dE3CNuWVN32TtY/S9EeM/QYCFKdCg0xRyamFvczsy0OgiOZJCWIq8H0Tfh8l9amciadBdhhMRb+jOsj57DdngPkoxL8G8+8L5qJwfy/Bx71HNTttKqYIbgZf0ToNdAxmxxFosSGCRF3cQnOgV0rOVMnRS0I5qA5aI5cdoOaCXkQ8TzCtqJ7wVmONCnxMqFlM4zQamnYqiAIqlILoYumL8oxmDqsCQuRq9jti7pkgv3nR/t2hAn6ZNwWoOuR61kY5zDuxRnnORPTHYyo5okYSsqW+XUgH7zrllXDZ0FEwfzKR36mB9PcrYi7w8aemYf1MSLmoImgYqS8yw+cKphnVHv4qjXkdg4b5UYb25zkfRs1rlz5YLBbxS9h0FqSN3xqQGchfVahMYX5Jvk+h4LjzcqCuPgf9U8p7vSLI9+spqLBSJZZ8dREOepC9J9+JXiy9PeDYtfCxRsJf49inguUNyfSi98bGK/mt8sMwSamIN8i3JOuxJlSV4/fFsPyA+2n2e6NKrMhX7doH65jToKIRK4vRtykWMjNwb4pgB6n7pwyzJ1VBKkn8yaytSjhAk9jm7VX2ZC6Nez80Ah1ees+K6vK64x7SdFvge1HEbh07BMQgvdlz7Q+4pMehRYhhRiOYQS9h9oSgOYbno0O2WvnXLK5HH2fD9Ka3mvsY/WyEb0f+y6YAgagKBIOoxGo4668OPuKfsSarA/ily4Qgyusp7qE5U2piAnzUAUZgZkMkWnmg7VbT+8BWTd/wYgc1c/FYFcvv197N14hhcjWlZChTyDEOekMb6Ces/tId/4M9aXcmYjQaU+XnbM4G/zAG7XK8FZhLGWM3tJF+wuov3fEb26UPRss6vP9u5eDQFtD+GEzLjc6d69zOOjgGCw21bmMdHIM5ODgGc3BwcAzm4NAm8R8BBgAGrc+T79nGEQAAAABJRU5ErkJggg==';
    return ImageWebpart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "7on5":
/*!**************************************!*\
  !*** ./lib/SPTaskLib/ListLibrary.js ***!
  \**************************************/
/*! exports provided: List */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "List", function() { return List; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Next */ "BJbA");
/* harmony import */ var _CsomUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CsomUtil */ "UXDa");


/**
 * @public
 */
var List = /** @class */ (function () {
    function List(listName, subwebUrl) {
        if (subwebUrl) {
            this._subwebUrl = this._fixSubWebUrl(subwebUrl);
        }
        this.listName = listName;
        this.listItemsTitle = [];
    }
    // this API works with site collection i.e. sites/sitename
    List.addRestTaskDeleteItem2 = function (siteUrl, fileServerRelativeUrl) {
        var targetUrl = siteUrl + '/_api/web/GetFileByServerRelativePath(DecodedUrl=@a1)/recycle';
        targetUrl += '?@a1=' + '\'' + encodeURI(fileServerRelativeUrl) + '\'';
        var result = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendRestRequest(siteUrl, targetUrl, '', result);
        TAB.AddTask(TAB.MakeTask(function () {
            if (result.retVal && result.retVal.d && result.retVal.d.Recycle !== '00000000-0000-0000-0000-000000000000') {
                TAB.Log.Comment('Deleted item: ' + fileServerRelativeUrl + '.');
            }
            else {
                TAB.Log.Warning('Could not delete the item. Did the copy actually finish?');
            }
        }));
    };
    // this API works without site collection
    List.addRestTaskDeleteItem = function (siteUrl, webUrl, fileServerRelativeUrl) {
        var targetUrl = siteUrl + '/_api/SP.RemoteWeb(@remoteWeb)/GetFileByServerRelativeUrl(@url)/recycle';
        targetUrl += '?@remoteWeb=' + '\'' + encodeURI(webUrl) + '\'';
        targetUrl += '&@url=' + '\'' + encodeURI(fileServerRelativeUrl) + '\'';
        var result = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendRestRequest(siteUrl, targetUrl, '', result);
        TAB.AddTask(TAB.MakeTask(function () {
            if (result.retVal && result.retVal.d && result.retVal.d.Recycle !== '00000000-0000-0000-0000-000000000000') {
                TAB.Log.Comment('Deleted item: ' + fileServerRelativeUrl + '.');
            }
            else {
                TAB.Log.Warning('Could not delete the item. Did the copy actually finish?');
            }
        }));
    };
    List.addCsomTaskAddDocument = function (fileName, folder, siteUrl) {
        _CsomUtil__WEBPACK_IMPORTED_MODULE_1__["Csom"].AddTask(function () {
            var clientContext = siteUrl ? new SP.ClientContext(siteUrl) : SP.ClientContext.get_current();
            var oWebsite = clientContext.get_web();
            var oList = oWebsite.get_lists().getByTitle(folder);
            var fileCreateInfo = new SP.FileCreationInformation();
            fileCreateInfo.set_url(fileName);
            fileCreateInfo.set_content(new SP.Base64EncodedByteArray());
            fileCreateInfo.set_overwrite(true);
            var doc = oList.get_rootFolder().get_files().add(fileCreateInfo);
            clientContext.load(doc);
            clientContext.executeQueryAsync(function () {
                TAB.Log.Comment('Success uploading document ' + fileName);
            }, function () {
                TAB.Log.Fail('Error uploading document ' + fileName + arguments[1].get_message()); // tslint:disable-line:use-named-parameter
            });
            return clientContext;
        });
    };
    /**
     * @param filepath - Path to file including filename, e.g. '/Shared Documents/file.txt'
     */
    List.addCsomTaskDeleteDocument = function (filepath, siteUrl) {
        _CsomUtil__WEBPACK_IMPORTED_MODULE_1__["Csom"].AddTask(function () {
            var clientContext = siteUrl ? new SP.ClientContext(siteUrl) : SP.ClientContext.get_current();
            var oWebsite = clientContext.get_web();
            clientContext.load(oWebsite);
            clientContext.executeQueryAsync(function () {
                var fileUrl = oWebsite.get_serverRelativeUrl() + filepath;
                var file = oWebsite.getFileByServerRelativeUrl(fileUrl);
                clientContext.load(file);
                file.deleteObject();
                clientContext.executeQueryAsync(function () {
                    TAB.Log.Comment('Success deleting document ' + filepath);
                }, function () {
                    TAB.Log.Fail('Error deleting document ' + filepath + arguments[1].get_message()); // tslint:disable-line:use-named-parameter
                });
            });
            return clientContext;
        });
    };
    List.addCsomTaskEditDocumentTitle = function (id, newTitle) {
        _CsomUtil__WEBPACK_IMPORTED_MODULE_1__["Csom"].AddTask(function () {
            var clientContext = SP.ClientContext.get_current();
            var oWebsite = clientContext.get_web();
            var oList = oWebsite.get_lists().getByTitle('Documents');
            var doc = oList.getItemById(id);
            doc.set_item('Title', newTitle);
            doc.update();
            clientContext.load(doc);
            clientContext.executeQueryAsync(function () {
                TAB.Log.Comment('Success updating document title to ' + newTitle);
            }, function () {
                TAB.Log.Fail('Error updating document title to ' + newTitle);
            });
            return clientContext;
        });
    };
    List.prototype.addCsomTaskCreateList = function (params) {
        var _this = this;
        var numberOfItems = params.numberOfItems, additionalFields = params.additionalFields, fieldValues = params.fieldValues;
        var createList = function () {
            _this._initializeClientContext();
            var web = _this._clictx.get_web();
            var listCol = web.get_lists();
            var listCreateInfo = new SP.ListCreationInformation();
            listCreateInfo.set_title(_this.listName);
            listCreateInfo.set_templateType(SP.ListTemplateType.genericList);
            _this._listObj = listCol.add(listCreateInfo);
            _this._clictx.load(_this._listObj, 'Id', 'DefaultViewUrl', 'DefaultView');
            TAB.Log.Verbose("About to CreateList '" + _this.listName + "'");
            if (additionalFields) {
                TAB.Log.Verbose('About to add new fields');
                var fields = _this._listObj.get_fields();
                for (var _i = 0, additionalFields_1 = additionalFields; _i < additionalFields_1.length; _i++) {
                    var newField = additionalFields_1[_i];
                    var schemaXml = newField.ConstructXml();
                    TAB.Log.Verbose("Creating new field '" + newField.Name + "'");
                    fields.addFieldAsXml(schemaXml, true /*addToDefaultView*/, 16 /*SP.AddFieldOptions.prototype.addFieldToDefaultView*/);
                }
            }
            return _this._clictx;
        };
        var onSucceededCreateList = function () {
            TAB.Log.Comment("Created list named " + _this.listName + " successfully.");
        };
        var onFailedCreateList = function (sender, args) {
            _this._listObj = undefined;
            TAB.Log.Fail("Failed to create list: '" + _this.listName + "', error: " + args.get_message() + ", stack: " + args.get_stackTrace());
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_1__["Csom"].AddTask(createList, onSucceededCreateList, onFailedCreateList);
        if (numberOfItems) {
            if (additionalFields && additionalFields.length > 0) {
                var fieldNames = additionalFields.map(function (field) { return field.Name; });
                this.addCsomTaskCreateListItems(numberOfItems, fieldNames, fieldValues);
            }
            else {
                this.addCsomTaskCreateListItems(numberOfItems);
            }
        }
    };
    List.prototype.addCsomTaskCreateListItems = function (numberOfItems, fieldNames, fieldValues) {
        var _this = this;
        _CsomUtil__WEBPACK_IMPORTED_MODULE_1__["Csom"].AddTask(function () { return _this._createItemsInList(numberOfItems, fieldNames, fieldValues); }, this._onSucceededCreateItems, this._onFailedCreateItems);
    };
    List.prototype.addCsomTaskDelete = function () {
        var _this = this;
        var deleteList = function () {
            _this._listObj.deleteObject();
            return _this._clictx;
        };
        var onSucceededDeleteList = function () {
            _this._listObj = undefined;
            TAB.Log.Comment("Deleted List '" + _this.listName + "' successfully.");
        };
        var onFailedDeleteList = function (sender, args) {
            TAB.Log.Verbose("Failed to delete List '" + _this.listName + "', error: " + args.get_message());
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_1__["Csom"].AddTask(deleteList, onSucceededDeleteList, onFailedDeleteList);
    };
    /**
     * Load the given list. If loadResult is NOT provided, this will log a failure if the list
     * doesn't exist or there's some other error. If loadResult IS provided (for example if you
     * want to check if a list exists or not), it will be updated to reflect whether the list
     * exists and failures won't be logged.
     */
    List.prototype.addCsomTaskLoadList = function (loadResult) {
        var _this = this;
        var getList = function () {
            if (_this._subwebUrl) {
                _this._clictx = new SP.ClientContext(_this._subwebUrl);
            }
            else {
                _this._clictx = SP.ClientContext.get_current();
            }
            var web = _this._clictx.get_web();
            _this._listObj = web.get_lists().getByTitle(_this.listName);
            _this._clictx.load(_this._listObj, 'Id', 'DefaultViewUrl', 'DefaultView');
            _this._clictx.load(_this._listObj.get_rootFolder().get_folders()); // Also load folders in root folder
            TAB.Log.Verbose('About to get list: ' + _this.listName);
            return _this._clictx;
        };
        var onSucceededGetList = function () {
            TAB.Log.Comment("Retrieved list named " + _this.listName + " successfully.");
            if (loadResult) {
                loadResult.success = true;
            }
        };
        var onFailedGetList = function (sender, args) {
            if (loadResult) {
                loadResult.success = false;
            }
            else {
                TAB.Log.Fail('Failed to get list.' + args.get_message());
            }
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_1__["Csom"].AddTask(getList, onSucceededGetList, onFailedGetList);
    };
    List.prototype.addCsomTaskAddNewColumn = function (field) {
        var _this = this;
        var schemaXml = field.ConstructXml();
        var addNewField = function () {
            TAB.Log.Comment('Adding a new field ' + field.Name);
            var fields = _this._listObj.get_fields();
            fields.addFieldAsXml(schemaXml, true, 32 /* AddFieldCheckDisplayName */);
            return _this._clictx;
        };
        var onSucceededAddNewField = function () {
            TAB.Log.Comment('Successfully added field to list.');
        };
        // The addFieldAsXml call will fail if a column with the name of the given field already exists
        var onFailedAddNewField = function (sender, args) {
            TAB.Log.Comment('Did not add field to list. ' + args.get_message());
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_1__["Csom"].AddTask(addNewField, onSucceededAddNewField, onFailedAddNewField);
    };
    List.prototype._initializeClientContext = function () {
        if (!this._clictx) {
            if (this._subwebUrl) {
                this._clictx = new SP.ClientContext(this._subwebUrl);
            }
            else {
                this._clictx = SP.ClientContext.get_current();
            }
        }
    };
    List.prototype._createItemsInList = function (numItems, fieldNames, fieldValues) {
        TAB.Log.Verbose('About to create items in list');
        if (!this._listObj) {
            TAB.Log.Fail('List does not exist: Can\'t create items');
            return undefined;
        }
        if (fieldValues && fieldValues.length !== numItems) {
            TAB.Log.Fail('Provided field values doesn\'t match number of Items, can not create items');
            return undefined;
        }
        this._initializeClientContext();
        this._clictx.load(this._listObj);
        for (var i = 0; i < numItems; i++) {
            var fieldValue = fieldValues && fieldValues[i];
            this._addSingleItem(fieldNames, fieldValue);
        }
        return this._clictx;
    };
    List.prototype._addSingleItem = function (fieldNames, fieldValues) {
        var title = TAB.GetUniqueName('Test_Item');
        this.listItemsTitle.push(title);
        TAB.Log.Comment("Creating new list item with title '" + title + "'.");
        var ici = new SP.ListItemCreationInformation();
        var listItem = this._listObj.addItem(ici);
        listItem.set_item('Title', title);
        listItem.update();
        if (fieldNames && fieldValues && fieldNames.length === fieldValues.length) {
            var needUpdate = false;
            for (var i = 0; i < fieldNames.length; i++) {
                if (fieldValues[i]) {
                    listItem.set_item(fieldNames[i], fieldValues[i]);
                    needUpdate = true;
                }
            }
            if (needUpdate) {
                listItem.update();
            }
        }
    };
    List.prototype._onSucceededCreateItems = function () {
        TAB.Log.Verbose('Created items successfully.');
    };
    List.prototype._onFailedCreateItems = function (sender, args) {
        TAB.Log.Warning('Failed to create items: ' + args.get_message());
    };
    List.prototype._fixSubWebUrl = function (subWebUrl) {
        if (subWebUrl.indexOf('http') !== 0 && subWebUrl.indexOf('/') !== 0) {
            return '/' + subWebUrl;
        }
        return subWebUrl;
    };
    return List;
}());



/***/ }),

/***/ "8uLm":
/*!**********************************************!*\
  !*** ./lib/SPTaskLib/Controls/FilePicker.js ***!
  \**********************************************/
/*! exports provided: FILE_PICKER_AUTOMATION_ID, FilePickerView, FilePicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILE_PICKER_AUTOMATION_ID", function() { return FILE_PICKER_AUTOMATION_ID; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilePickerView", function() { return FilePickerView; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilePicker", function() { return FilePicker; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _Upload__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Upload */ "dAVj");




/**
 * @public
 */
var FILE_PICKER_AUTOMATION_ID = 'sp-filepicker';
/**
 * @public
 */
var FilePickerView;
(function (FilePickerView) {
    FilePickerView["Recent"] = "Recent";
    FilePickerView["OneDrive"] = "OneDrive";
    FilePickerView["Search"] = "WebSearch";
    FilePickerView["Site"] = "Site";
    FilePickerView["Local"] = "Upload";
    FilePickerView["Link"] = "FromALink";
})(FilePickerView || (FilePickerView = {}));
/**
 * @public
 */
var FilePicker = /** @class */ (function () {
    function FilePicker(root) {
        if (root) {
            this._root = root;
        }
    }
    FilePicker.prototype.SetRoot = function (root) {
        this._root = root;
    };
    FilePicker.prototype.AddTaskSelectView = function (selectedView) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var pickerViewTab = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(_this._root, "filePicker" + selectedView + "Tab");
            var pickerViewButton = TAB.GetElement(pickerViewTab, TAB.searchBy.tag, 'button');
            TAB.ClickElement(pickerViewButton);
        }), this.WaitForViewLoad(selectedView));
        if (selectedView === FilePickerView.Search) {
            TAB.Log.AddTaskComment('Search for background images.');
            TAB.AddTask(TAB.MakeTask(function () {
                // Input keyword in search box
                var searchField = TAB.GetElement(_this._selectedTab, TAB.searchBy.partialClassName, 'ms-SearchBox-field');
                _ReactUtil__WEBPACK_IMPORTED_MODULE_1__["ReactUtil"].TriggerOnChange(searchField, 'Backgrounds');
                // Press Enter
                TAB.FireKeyboardEvent(searchField, 'keydown', 13);
            }), TAB.MakeWaiter(function () {
                return !!_this._itemList;
            }));
        }
    };
    FilePicker.prototype.AddTaskSelectItem = function (index) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Select item');
            _this._selectedItem = _this._getItemsFromCurrentView(index);
            var el = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(_this._selectedItem, 'CheckCircle');
            TAB.ClickElement(el);
        }), this._waitForTileSelection(true));
    };
    FilePicker.prototype.AddTaskOpenFile = function (index) {
        var _this = this;
        this.AddTaskSelectItem(index);
        TAB.AddTask(
        /** @todo 284205 Add data-automation-id for related controls */
        TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Open File in Filepicker');
            TAB.ClickElement(_this._openButton);
        }), _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'sp-filepicker', 0));
    };
    FilePicker.prototype.AddTaskCancel = function () {
        var _this = this;
        // click cancel button
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.ClickElement(_this._cancelButton);
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].FilePicker = undefined;
        }), _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'sp-filepicker', 0));
    };
    FilePicker.prototype.AddTaskAddFromUrl = function (url) {
        var _this = this;
        this.AddTaskSelectView(FilePickerView.Link);
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Edit Link textarea in FilePicker');
            var linkTextField = TAB.GetElement(_this._root, TAB.searchBy.tag, 'textarea');
            linkTextField.value = url;
            var ev = TAB.Win.document.createEvent('HTMLEvents');
            ev.initEvent('input', true /*bubble*/, false /*cancelable*/);
            linkTextField.dispatchEvent(ev);
        }), TAB.MakeWaiter(function () {
            return !_this._openButton.disabled;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click Open Button');
            TAB.ClickElement(_this._openButton);
        }), TAB.MakeWaiter(function () {
            try {
                var filePicker = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(TAB.Win, 'sp-filepicker');
                if (filePicker.length === 0) {
                    _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].FilePicker = undefined;
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        }));
    };
    FilePicker.prototype.AddTaskUploadItem = function (fileInput) {
        var _this = this;
        var inputElement;
        // Find INPUT element
        TAB.AddTask(TAB.MakeTask(function () {
            var fileInputElements = TAB.GetElements(_this._root, TAB.searchBy.partialClassName, 'localTabInput');
            if (fileInputElements !== undefined && fileInputElements.length > 0) {
                inputElement = fileInputElements[0];
                TAB.Log.Comment('Found INPUT element for Upload command');
            }
        }));
        // Upload items and verify they got added
        TAB.AddTask(TAB.MakeTask(function () {
            if (!inputElement) {
                throw 'Failed to find INPUT element for Upload command';
            }
            try {
                if (fileInput instanceof File) {
                    Object(_Upload__WEBPACK_IMPORTED_MODULE_3__["setFileInput"])(inputElement, [fileInput]);
                }
                else {
                    var fileInputs = [fileInput];
                    Object(_Upload__WEBPACK_IMPORTED_MODULE_3__["upload"])(inputElement, fileInputs);
                }
            }
            catch (e) {
                TAB.Log.Fail('Error when trying to upload items - ' + e.message);
            }
        }), undefined);
        this.AddTaskSelectView(FilePickerView.Local);
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return !_this._openButton.disabled;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click Open Button');
            TAB.ClickElement(_this._openButton);
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].FilePicker = undefined;
        }), _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'sp-filepicker', 0));
    };
    FilePicker.prototype.WaitForViewLoad = function (selectedView) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                if (selectedView === FilePickerView.Recent || selectedView === FilePickerView.Site) {
                    return !!_this._itemList;
                }
                else if (selectedView === FilePickerView.Link) {
                    return TAB.ElementExists(_this._root, TAB.searchBy.tag, 'textarea');
                }
                else {
                    // @todo 'Site' tab does not have a tabHeader.
                    return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(_this._selectedTab, "filePicker" + selectedView + "Container");
                }
            }
            catch (e) {
                return false;
            }
        });
    };
    Object.defineProperty(FilePicker.prototype, "_itemList", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._selectedTab, 'DetailsList') ||
                _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._selectedTab, 'GridList') ||
                TAB.GetElements(this._selectedTab, TAB.searchBy.className, 'Placeholder-container')[0];
        },
        enumerable: true,
        configurable: true
    });
    FilePicker.prototype._getItemsFromCurrentView = function (index) {
        var list = this._itemList;
        var tiles;
        if (_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(list, 'ItemTile').length > 0) {
            tiles = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(list, 'ItemTile');
        }
        else if (_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(list, 'ListCell').length > 0) {
            tiles = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(list, 'ListCell');
        }
        else {
            TAB.Log.AddTaskDidNotRun('Selected item does not exist');
        }
        if (tiles.length > index) {
            return tiles[index];
        }
        else {
            TAB.Log.AddTaskDidNotRun('Selected item does not exist');
        }
    };
    FilePicker.prototype._waitForTileSelection = function (selection) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            var isBingTileSelected = !!_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(_this._selectedItem, 'bingTileSelected');
            var isSelected = TAB.HasCssClass(_this._selectedItem, 'is-selected') || isBingTileSelected;
            return ((selection && isSelected) || (!selection && !isSelected));
        });
    };
    Object.defineProperty(FilePicker.prototype, "_openButton", {
        get: function () {
            // Each tab has a group of open/cancel button, using SelectedTab as searchObj to select the correct one.
            // @todo change this to automation id
            return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._selectedTab, 'OKButton');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilePicker.prototype, "_cancelButton", {
        get: function () {
            // Each tab has a group of open/cancel button, using SelectedTab as searchObj to select the correct one.
            // @todo change this to automation id
            return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._selectedTab, 'cancelButton');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FilePicker.prototype, "_selectedTab", {
        get: function () {
            return TAB.GetElement(this._root, TAB.searchBy.partialClassName, 'selectedTab');
        },
        enumerable: true,
        configurable: true
    });
    return FilePicker;
}());



/***/ }),

/***/ "8vep":
/*!***********************************************************!*\
  !*** ./lib/SPTaskLib/MemoryTest/CanvasContentTemplate.js ***!
  \***********************************************************/
/*! exports provided: ResourcePath, CanvasContentTemplate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResourcePath", function() { return ResourcePath; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasContentTemplate", function() { return CanvasContentTemplate; });
var ResourcePath;
(function (ResourcePath) {
    ResourcePath["Image_16x16"] = "/MemoryTestLib/16x16.png";
    ResourcePath["Image_550x335"] = "/MemoryTestLib/550x335.jpg";
    ResourcePath["Image_1280x800"] = "/MemoryTestLib/1280x800.jpg";
    ResourcePath["Image_1920x1200"] = "/MemoryTestLib/1920x1200.jpg";
})(ResourcePath || (ResourcePath = {}));
var LINK_DATA_AUTOMATION_ID = 'memoryTestLink';
var CanvasContentTemplate = /** @class */ (function () {
    function CanvasContentTemplate() {
    }
    CanvasContentTemplate.GetLinkCanvasContent = function (linkToPageTitle) {
        return [
            this._generateSingleLinkContent(1, linkToPageTitle),
            {
                controlType: 0,
                pageSettingsSlice: {
                    isDefaultDescription: true,
                    isDefaultThumbnail: true
                }
            }
        ];
    };
    CanvasContentTemplate.GetImagesCanvasContent = function (linkToPageTitle) {
        return [
            this._generateSingleImageContent(1, ResourcePath.Image_16x16, 'b66e5850-7e04-42f2-9cf5-18ad3541a373'),
            this._generateSingleImageContent(2, ResourcePath.Image_550x335, '88cbfbea-71a2-4fc7-afc2-84b52f6bbffd'),
            this._generateSingleImageContent(3, ResourcePath.Image_1280x800, 'a839f19b-d317-4c09-876d-d20b6fcc9176'),
            this._generateSingleImageContent(4, ResourcePath.Image_1920x1200, '0bb66dda-cac3-4814-b10c-9d44e5f2d6e1'),
            this._generateSingleLinkContent(5, linkToPageTitle),
            {
                controlType: 0,
                pageSettingsSlice: {
                    isDefaultDescription: true,
                    isDefaultThumbnail: true
                }
            }
        ];
    };
    CanvasContentTemplate.getLinkElement = function () {
        return TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"" + LINK_DATA_AUTOMATION_ID + "\"]");
    };
    CanvasContentTemplate.isCanvasWithLinkLoaded = function () {
        var webparts = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"" + LINK_DATA_AUTOMATION_ID + "\"]");
        return webparts.length > 0;
    };
    CanvasContentTemplate.isCanvasWithImagesLoaded = function () {
        var webparts = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'imageFrame');
        return webparts.length === 4;
    };
    CanvasContentTemplate._generateSingleLinkContent = function (index, linkToPageTitle) {
        return {
            controlType: 4,
            id: 'd2ff80b5-471c-4477-8c3c-fd415dd6b695',
            position: {
                zoneIndex: 1,
                sectionIndex: 1,
                controlIndex: index,
                layoutIndex: 1
            },
            emphasis: {},
            addedFromPersistedData: true,
            innerHTML: "<p><a data-interception=\"on\" data-automation-id=\"" + LINK_DATA_AUTOMATION_ID + "\" href=\"/SitePages/" + linkToPageTitle + ".aspx\">" + linkToPageTitle + "</a></p>\n"
        };
    };
    CanvasContentTemplate._generateSingleImageContent = function (index, imgSrc, instanceId) {
        return {
            controlType: 3,
            id: instanceId,
            position: {
                zoneIndex: 1,
                sectionIndex: 1,
                controlIndex: index,
                layoutIndex: 1
            },
            webPartId: 'd1d91016-032f-456d-98a4-721247c305e8',
            webPartData: {
                id: 'd1d91016-032f-456d-98a4-721247c305e8',
                instanceId: instanceId,
                title: 'Image',
                description: 'Show an image on your page',
                serverProcessedContent: {
                    htmlStrings: {},
                    searchablePlainTexts: {
                        captionText: ''
                    },
                    imageSources: {
                        imageSource: imgSrc
                    },
                    links: {
                        linkUrl: ''
                    },
                    customMetadata: {
                        imageSource: {}
                    }
                },
                dataVersion: 1.8,
                properties: {}
            },
            emphasis: {},
            reservedHeight: 671,
            reservedWidth: 1180
        };
    };
    return CanvasContentTemplate;
}());



/***/ }),

/***/ "9JB+":
/*!***************************************************!*\
  !*** ./lib/SPTaskLib/Pages/PageTemplatesPanel.js ***!
  \***************************************************/
/*! exports provided: PageTemplatesPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageTemplatesPanel", function() { return PageTemplatesPanel; });
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _PageUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../PageUtil */ "jK1H");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _ListLibrary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ListLibrary */ "7on5");





/**
 * @public
 */
var PageTemplatesPanel = /** @class */ (function () {
    function PageTemplatesPanel() {
    }
    Object.defineProperty(PageTemplatesPanel, "SiteName", {
        get: function () {
            return 'PageTemplatesPanelSite';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PageTemplatesPanel, "LastTemplateDataAutomationID", {
        set: function (value) {
            PageTemplatesPanel._lastTemplateDataAutomationId = value;
        },
        enumerable: true,
        configurable: true
    });
    PageTemplatesPanel.AddTaskGoToSiteHomePage = function () {
        var siteUrl = TAB.Settings.Get('ProductServer') + ("/teams/" + PageTemplatesPanel.SiteName);
        TAB.AddTask(TAB.LoadPage(siteUrl), TAB.PageReady());
    };
    PageTemplatesPanel.AddTaskAddTemplateToSite = function (siteName, rteWebPart, pageNameAndDesc, urlArray, templateName) {
        TAB.Log.AddTaskComment('Attempting to create a page and save it as a template...');
        _PageUtil__WEBPACK_IMPORTED_MODULE_2__["PageUtil"].AddTaskCreatePageOnSite(siteName, 'teams');
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].AddTaskEditPage();
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].AddTaskAddPageTitle(pageNameAndDesc);
        _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(rteWebPart);
        // Wait for RTE to be available for editing otherwise test has high possibility to fail in CI.
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting for RTE webpart to appear');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='ControlZone']");
        }));
        // called here instead of in Canvas.AddTaskCreateWebPart so that it can be run in deterministic order
        _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskBindWebPart(rteWebPart, false);
        rteWebPart.AddTaskToAddTextInRTE(pageNameAndDesc + 'Body');
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].AddTaskPublishPage();
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].AddTaskOpenPostPublishPanel();
        PageTemplatesPanel.AddTaskCollectPageUrl(urlArray);
        PageTemplatesPanel.AddTaskSavePageAsTemplateFromPostPublish();
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].AddTaskAddPageTitle(templateName);
        PageTemplatesPanel.AddTaskSaveTemplate();
        PageTemplatesPanel.AddTaskCollectPageUrl(urlArray);
    };
    PageTemplatesPanel.AddTaskSavePageAsTemplateFromPostPublish = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Attempting to save published page as template');
            var savePageAsTemplateLink = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(PageTemplatesPanel.GetPromotePanel(), 'savePageAsTemplate');
            TAB.ClickElement(savePageAsTemplateLink);
            TAB.Log.AddTaskComment('Waiting for template save button');
        }), PageTemplatesPanel.WaitForTemplateSaveButton());
    };
    PageTemplatesPanel.AddTaskSaveTemplate = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Attempting to save created template');
            var saveTemplateButton = PageTemplatesPanel.GetTemplateSaveButton();
            TAB.ClickElement(saveTemplateButton);
            TAB.Log.AddTaskComment('Waiting for template edit button');
        }), PageTemplatesPanel.WaitForTemplateEditButton());
    };
    PageTemplatesPanel.AddTaskOpenPageTemplatesPanel = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting for Command Bar');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-CommandBar'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting for CommandBar +New');
        }), TAB.MakeWaiter(function () {
            return Boolean(PageTemplatesPanel.GetCommandBarNewButton());
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Attempting to click +New');
            var newButton = PageTemplatesPanel.GetCommandBarNewButton();
            TAB.ClickElement(newButton);
            var calloutField = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'ms-ContextualMenu-list');
            var startFromBlankPageButton = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(calloutField, 'ChooseFromTemplate');
            TAB.ClickElement(startFromBlankPageButton);
            TAB.Log.AddTaskComment('Waiting for submenu');
        }), TAB.MakeWaiter(function () {
            return PageTemplatesPanel.WaitForPageTemplatesPanel();
        }));
    };
    PageTemplatesPanel.AddTaskSelectTemplate = function (selectedPageTitle) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Selecting newly created template');
            var tilesList = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, 'template-picker-tiles-list')[0];
            var items = TAB.GetElements(tilesList, TAB.searchBy.hasClassName, 'ms-TilesList-grid');
            var item = items[items.length - 1];
            var clickableElement = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(item, "template-picker-item_" + selectedPageTitle);
            TAB.ClickElement(clickableElement);
            TAB.Log.AddTaskComment('Waiting for Create Page from template button');
        }), TAB.MakeWaiter(function () {
            var createButton = PageTemplatesPanel.GetCreatePageButton();
            if (createButton) {
                /* tslint:disable:no-null-keyword */
                return createButton.getAttribute('disabled') === null;
                /* tslint:enable:no-null-keyword */
            }
            return false;
        }));
    };
    PageTemplatesPanel.AddTaskCreatePageFromSelectedTemplate = function (pageTitle) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Creating page from Selected Template');
            TAB.ClickElement(PageTemplatesPanel.GetCreatePageButton());
            TAB.Log.AddTaskComment('Waiting for new page from selected template');
        }), PageTemplatesPanel.WaitForNewPage());
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].AddTaskAddPageTitle(pageTitle);
    };
    PageTemplatesPanel.AddTaskPublishPageAndCollectUrl = function (urlArray) {
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].AddTaskPublishPage();
        PageTemplatesPanel.AddTaskCollectPageUrl(urlArray);
    };
    PageTemplatesPanel.AddTaskCleanupTemplates = function (pageUrls) {
        var rootSiteUrl = TAB.Settings.Get('ProductServerSet').split(';')[0];
        pageUrls.forEach(function (url) {
            var pageUrl = url;
            pageUrl = pageUrl.substr(rootSiteUrl.length);
            _ListLibrary__WEBPACK_IMPORTED_MODULE_4__["List"].addRestTaskDeleteItem2(rootSiteUrl, pageUrl);
        });
    };
    PageTemplatesPanel.AddTaskCollectPageUrl = function (array) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Collecting page url for deletion');
            array.push(TAB.Win.location.href);
        }));
    };
    PageTemplatesPanel.GetPromotePanel = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-Panel-main')[0];
    };
    PageTemplatesPanel.GetTemplateSaveButton = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(PageTemplatesPanel.GetCommandBar(), 'pageCommandBarSaveTemplateButton');
    };
    PageTemplatesPanel.GetCommandBarNewButton = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(PageTemplatesPanel.GetCommandBar(), 'pageCommandBarNewButton');
    };
    PageTemplatesPanel.GetCreatePageButton = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, 'template-panel-create-button')[0];
    };
    PageTemplatesPanel.GetCommandBar = function () {
        // using check mark to decide if the page has been saved
        try {
            var commandBar = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'commandBarWrapper');
            return commandBar;
        }
        catch (e) {
            return undefined;
        }
    };
    PageTemplatesPanel.WaitForTemplateSaveButton = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='pageCommandBarSaveTemplateButton']");
    };
    PageTemplatesPanel.WaitForTemplateEditButton = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='pageCommandBarEditButton']");
    };
    PageTemplatesPanel.WaitForPageTemplatesPanel = function () {
        TAB.Log.AddTaskComment('Waiting for page template panel');
        return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='template-picker-item_" + PageTemplatesPanel._lastTemplateDataAutomationId + "']");
    };
    PageTemplatesPanel.WaitForNewPage = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='pageCommandBarPublishButton']");
    };
    PageTemplatesPanel._lastTemplateDataAutomationId = undefined;
    return PageTemplatesPanel;
}());



/***/ }),

/***/ "Aitv":
/*!***************************************************!*\
  !*** ./lib/SPTaskLib/Controls/ListViewWebpart.js ***!
  \***************************************************/
/*! exports provided: ListViewWebpart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListViewWebpart", function() { return ListViewWebpart; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ContextMenu */ "yis5");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * @public
 */
var ListViewWebpart = /** @class */ (function (_super) {
    __extends(ListViewWebpart, _super);
    function ListViewWebpart(isDocLibrary) {
        var _this = this;
        if (isDocLibrary) {
            _this = _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].ListViewDocLib, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].ListViewDocLib.toString()) || this;
        }
        else {
            _this = _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].ListView, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].ListView.toString()) || this;
        }
        return _this;
    }
    ListViewWebpart.prototype.GetRoot = function () {
        return this._root;
    };
    ListViewWebpart.prototype.AddTaskAddNewFolder = function (folderName) {
        var _this = this;
        var newButton;
        TAB.Log.AddTaskComment('Waiting for "New" commandbar button to appear');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var buttons = TAB.GetElements(_this._root, TAB.searchBy.hasClassName, 'ms-CommandBarItem-link');
            if (buttons && buttons.length > 0) {
                newButton = buttons[0]; // "New" button is first in CommandBar
                return true;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking "New" button');
            TAB.ClickElement(newButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu'));
        this._addTaskClickContextMenuItemByIndex('Folder', 0); // Folder is first item in "New" context menu
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Adding new folder');
            var dialog = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-main');
            var input = TAB.GetElement(dialog, TAB.searchBy.tag, 'input');
            input.focus();
            input.value = folderName;
            _ReactUtil__WEBPACK_IMPORTED_MODULE_3__["ReactUtil"].TriggerOnChange(input, folderName);
            var createButton = TAB.GetElement(dialog, TAB.searchBy.hasClassName, 'ms-Button--primary');
            TAB.ClickElement(createButton);
        }));
    };
    ListViewWebpart.prototype.AddTaskDeleteFirstItem = function () {
        var _this = this;
        var titleToDelete;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Selecting first item');
            var items = TAB.GetElements(_this._root, TAB.searchBy.className, 'ms-List-cell');
            var firstItem = items[0];
            titleToDelete = TAB.GetTextContent(TAB.GetElement(firstItem, TAB.searchBy.customQuery, "[data-automation-key=\"Title\"]"));
            var checkbox = TAB.GetElement(firstItem, TAB.searchBy.hasClassName, 'ms-DetailsRow-check');
            TAB.ClickElement(checkbox);
            TAB.Log.Comment('Clicking delete');
            var commandBar = TAB.GetElement(_this._root, TAB.searchBy.hasClassName, 'ms-CommandBar');
            // "Delete" button is second in CommandBar for custom lists
            var deleteButton = TAB.GetElements(commandBar, TAB.searchBy.hasClassName, 'ms-CommandBarItem-link')[1];
            TAB.ClickElement(deleteButton);
            TAB.Log.Comment('Confirming delete');
            var dialogActions = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-actions');
            var confirmDeleteBtn = TAB.GetElements(dialogActions, TAB.searchBy.tag, 'button')[0];
            TAB.ClickElement(confirmDeleteBtn);
        }));
        TAB.Log.AddTaskComment('Waiting for item to be removed from list');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var items = TAB.GetElements(_this._root, TAB.searchBy.className, 'ms-List-cell');
            var itemStillExists = false;
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item = items_1[_i];
                var currentTitle = TAB.GetTextContent(TAB.GetElement(item, TAB.searchBy.customQuery, "[data-automation-key=\"Title\"]"));
                if (currentTitle === titleToDelete) {
                    itemStillExists = true;
                    break;
                }
            }
            if (!itemStillExists) {
                TAB.Log.Pass('Item successfully deleted');
                return true;
            }
        }));
    };
    ListViewWebpart.prototype.AddTaskDeleteFolder = function (folderName) {
        var _this = this;
        var checkbox;
        TAB.Log.AddTaskComment('Waiting for target folder to render');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var items = TAB.GetElements(_this._root, TAB.searchBy.className, 'ms-List-cell');
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var item = items_2[_i];
                var name_1 = TAB.GetElement(item, TAB.searchBy.customQuery, '[data-automation-key="name"]');
                if (TAB.GetTextContent(name_1).indexOf(folderName) > -1) {
                    checkbox = TAB.GetElements(item, TAB.searchBy.customQuery, '[role="checkbox"]')[0];
                    return true;
                }
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Selecting folder');
            TAB.ClickElement(checkbox);
            TAB.Log.Comment('Clicking delete');
            var deleteButton = TAB.GetElement(_this._root, TAB.searchBy.customQuery, '[data-command-key="delete"]');
            TAB.ClickElement(deleteButton);
            TAB.Log.Comment('Confirming delete');
            var dialog = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-main');
            var confirmDelete = TAB.GetElement(dialog, TAB.searchBy.hasClassName, 'ms-Button--default');
            TAB.ClickElement(confirmDelete);
        }));
    };
    ListViewWebpart.prototype.AddTaskEditWebPartTitle = function (newTitle) {
        var _this = this;
        TAB.Log.AddTaskComment('Waiting for webpart title textarea to render');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return TAB.GetElements(_this._root, TAB.searchBy.tag, 'textarea').length > 0;
        }));
        TAB.Log.AddTaskComment('Editing webpart title');
        TAB.AddTask(TAB.MakeTask(function () {
            var titleInput = TAB.GetElements(_this._root, TAB.searchBy.tag, 'textarea')[0];
            titleInput.value = newTitle;
            _ReactUtil__WEBPACK_IMPORTED_MODULE_3__["ReactUtil"].TriggerOnChange(titleInput, newTitle);
        }));
    };
    ListViewWebpart.prototype.AddTaskFilter = function (columnName, filterValue) {
        this._addTaskClickColumnHeader(columnName);
        this._addTaskClickContextMenuItemByIndex('Filter by', 2); // "Filter by" is third item in column context menu
        TAB.Log.AddTaskComment('Waiting for filter pane to render');
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.className, 'FiltersPane-sectionContent'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Selecting filter by " + filterValue);
            var filterPane = TAB.GetElement(TAB.Win, TAB.searchBy.className, 'FiltersPane-sectionContent');
            var targetField = TAB.GetElement(filterPane, TAB.searchBy.customQuery, "[data-checked-value=\"" + filterValue + "\"]");
            var checkbox = TAB.GetElement(targetField, TAB.searchBy.tag, 'button');
            TAB.ClickElement(checkbox);
            TAB.Log.Comment('Clicking "Apply" filter');
            var filterButtons = TAB.GetElement(TAB.Win, TAB.searchBy.className, 'od-FilterSelect-buttons');
            var applyButton = TAB.GetElement(filterButtons, TAB.searchBy.customQuery, '[data-automationid="FilterSelect-Apply"]');
            TAB.ClickElement(applyButton);
        }));
    };
    ListViewWebpart.prototype.AddTaskGroupBy = function (columnName, expectedCount) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _this._addTaskClickColumnHeader(columnName);
            _this._addTaskClickContextMenuItemByIndex("Group by " + columnName, 3); // "Group by" is fourth item in column context menu
            TAB.Log.AddTaskComment('Waiting for list to be grouped');
            TAB.AddTask(undefined, TAB.WaitForElementToExist(_this._root, TAB.searchBy.customQuery, '[data-icon-name="GroupedDescending"]'));
            var groupCount = 0;
            TAB.Log.AddTaskComment('Verifying list groups');
            TAB.AddTask(undefined, TAB.MakeWaiter(function () {
                var items = TAB.GetElements(_this._root, TAB.searchBy.hasClassName, 'ms-GroupHeader-title');
                groupCount = items && items.length;
                return groupCount > 0;
            }));
            TAB.AddTask(TAB.MakeTask(function () {
                TAB.Log.VerifyEquals(expectedCount, groupCount, '`Correct number of groups displayed');
            }));
            TAB.Log.AddTaskComment('Ungrouping list');
            _this._addTaskClickColumnHeader(columnName);
            _this._addTaskClickContextMenuItemByIndex("Group by " + columnName, 3); // "Group by" is fourth item in column context menu
        }));
    };
    ListViewWebpart.prototype.AddTaskSelectItemByPosition = function (index) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Selecting item ' + index.toString());
            var items = TAB.GetElements(_this._root, TAB.searchBy.className, 'ms-List-cell');
            var item = items[index];
            var checkbox = TAB.GetElement(item, TAB.searchBy.hasClassName, 'ms-DetailsRow-check');
            TAB.ClickElement(checkbox);
        }));
    };
    /**
     * @param listName - Provide if a specific list should be selected
     * @param selectedDocLib - If specific list is not provided, this object is passed in to keep track of the selected list
     */
    ListViewWebpart.prototype.AddTaskSelectList = function (list, selectedDocLib) {
        var _this = this;
        TAB.Log.AddTaskComment('Selecting list for web part');
        TAB.AddTask(TAB.MakeTask(function () {
            var listElement;
            var listName = _this._getListName(list);
            if (listName) {
                listElement = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[title=\"" + listName + "\"]");
            }
            else { // if listName not provided, get all list items and select first one
                listElement = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='setupPanelItem']");
                var title = TAB.GetElement(listElement[0], TAB.searchBy.tag, 'div');
                selectedDocLib.name = TAB.GetTextContent(title); // Only need to keep track of selected doclib
            }
            if (listElement && listElement[0]) {
                TAB.ClickElement(listElement[0]);
            }
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-DetailsList'));
    };
    ListViewWebpart.prototype.AddTaskSortByColumn = function (columnName, sortBy, index, sortString) {
        var _this = this;
        this._addTaskClickColumnHeader(columnName);
        this._addTaskClickContextMenuItemByIndex(sortBy, index);
        TAB.Log.AddTaskComment('Waiting for items to be sorted');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var sorted = TAB.GetElements(_this._root, TAB.searchBy.customQuery, "[data-icon-name=\"" + sortString + "\"]");
            if (sorted && sorted[0]) {
                return true;
            }
        }));
    };
    ListViewWebpart.prototype.AddTaskVerifyBreadcrumb = function (root, folderName) {
        var _this = this;
        var breadcrumbItems;
        TAB.Log.AddTaskComment('Waiting for breadcrumb to appear');
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-DetailsList'));
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            breadcrumbItems = TAB.GetElements(_this._root, TAB.searchBy.hasClassName, 'ms-Breadcrumb-listItem');
            return breadcrumbItems && breadcrumbItems.length > 1;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            var expectedBreadcrumb = [root.name, folderName];
            var breadcrumbSuccess = true;
            for (var i = 0; i < expectedBreadcrumb.length; i++) {
                var actualText = TAB.GetTextContent(breadcrumbItems[i]);
                if (actualText.indexOf(expectedBreadcrumb[i]) === -1) {
                    breadcrumbSuccess = false;
                    break;
                }
            }
            TAB.Log.Verify(breadcrumbSuccess, 'Breadcrumb contains correct text: ' + expectedBreadcrumb.join(' > '));
            TAB.Log.Comment('Navigating back to library root');
            TAB.AddTask(TAB.MakeTask(function () {
                // Need to get breadcrumbItems again to ensure we are not use the staled elements.
                breadcrumbItems = TAB.GetElements(_this._root, TAB.searchBy.hasClassName, 'ms-Breadcrumb-listItem');
                var libraryRoot = TAB.GetElement(breadcrumbItems[0], TAB.searchBy.tag, 'button');
                TAB.ClickElement(libraryRoot);
            }), TAB.MakeWaiter(function () {
                // Wait until root title element is found.
                var rootTitle = TAB.GetElements(_this._root, TAB.searchBy.tag, 'textarea');
                return rootTitle && rootTitle.length > 0;
            }));
        }));
    };
    ListViewWebpart.prototype.AddTaskVerifyFilters = function (columnName, filters) {
        var _this = this;
        TAB.Log.AddTaskComment('Verify multi-filter to apply');
        TAB.AddTask(TAB.MakeTask(function () {
            var items = TAB.GetElements(_this._root, TAB.searchBy.className, 'ms-List-cell');
            var filterSuccess = true;
            for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                var item = items_3[_i];
                var value = TAB.GetTextContent(TAB.GetElement(item, TAB.searchBy.customQuery, "[data-automation-key=\"" + columnName + "\"]"));
                if (!_this._checkFilteredValue(filters, value)) {
                    filterSuccess = false;
                    break;
                }
            }
            TAB.Log.Verify(filterSuccess, 'Items successfully filtered');
        }));
    };
    ListViewWebpart.prototype.AddTaskWaitForFilteredView = function () {
        TAB.Log.AddTaskComment('Waiting for target filtered view shown instead of shimmer items ...');
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='FieldRender-DotDotDot']"));
    };
    ListViewWebpart.prototype.AddTaskVerifyFilter = function (columnName, filterValue) {
        var _this = this;
        TAB.Log.AddTaskComment('Waiting for filter to apply');
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[data-icon-name="Filter"]'));
        TAB.AddTask(TAB.MakeTask(function () {
            var items = TAB.GetElements(_this._root, TAB.searchBy.className, 'ms-List-cell');
            var filterSuccess = true;
            for (var _i = 0, items_4 = items; _i < items_4.length; _i++) {
                var item = items_4[_i];
                var value = TAB.GetTextContent(TAB.GetElement(item, TAB.searchBy.customQuery, "[data-automation-key=\"" + columnName + "\"]"));
                if (value !== filterValue) {
                    filterSuccess = false;
                    break;
                }
            }
            TAB.Log.Verify(filterSuccess, 'Items successfully filtered');
        }));
    };
    ListViewWebpart.prototype.AddTaskVerifyFolder = function (folderName) {
        var _this = this;
        var folder;
        TAB.Log.AddTaskComment('Waiting for new folder to appear');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var items = TAB.GetElements(_this._root, TAB.searchBy.customQuery, '[data-automationid="ListCell"]');
            for (var _i = 0, items_5 = items; _i < items_5.length; _i++) {
                var item = items_5[_i];
                var nameElements = TAB.GetElements(item, TAB.searchBy.customQuery, '[data-automationid="FieldRenderer-name"]');
                // skip the placeholder elements.
                if (!nameElements || nameElements.length < 1) {
                    continue;
                }
                var name_2 = nameElements[0];
                var success = name_2.innerText === folderName;
                if (success) {
                    folder = name_2;
                    TAB.Log.Pass("Successfully created new folder: " + folderName);
                }
                return success;
            }
        }));
        TAB.Log.AddTaskComment('Clicking folder');
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.ClickElement(folder);
        }));
    };
    ListViewWebpart.prototype.AddTaskVerifyFolderDeleted = function (folderName, result) {
        var _this = this;
        TAB.Log.AddTaskComment('Verifying deleted folder does not appear in list');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var items = TAB.GetElements(_this._root, TAB.searchBy.className, 'ms-List-cell');
            for (var _i = 0, items_6 = items; _i < items_6.length; _i++) {
                var item = items_6[_i];
                var name_3 = TAB.GetElement(item, TAB.searchBy.customQuery, '[data-automation-key="name"]');
                if (TAB.GetTextContent(name_3) === folderName) {
                    result.success = false;
                    return false;
                }
            }
            TAB.Log.Pass('Deleted folder does not appear in list');
            result.success = true;
            return true;
        }));
    };
    ListViewWebpart.prototype.AddTaskVerifyItemOrder = function (columnName, expectedValues) {
        var _this = this;
        TAB.Log.AddTaskComment('Waiting for fields to render');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var fields = TAB.GetElements(_this._root, TAB.searchBy.customQuery, "[data-automation-key=\"" + columnName + "\"]");
            return fields && fields.length > 0;
        }));
        TAB.Log.AddTaskComment('Verifying items are sorted correctly');
        TAB.AddTask(TAB.MakeTask(function () {
            var items = TAB.GetElements(_this._root, TAB.searchBy.className, 'ms-List-cell');
            if (items && items.length) {
                for (var i = 0; i < expectedValues.length; i++) {
                    var fields = TAB.GetElements(items[i], TAB.searchBy.customQuery, "[data-automation-key=\"" + columnName + "\"]");
                    if (fields && fields.length) {
                        var fieldValue = TAB.GetTextContent(fields[0]);
                        TAB.Log.VerifyEquals(fieldValue, expectedValues[i], 'Sorted item has correct value');
                    }
                }
            }
        }));
    };
    ListViewWebpart.prototype.AddTaskVerifySeeAllLink = function (list) {
        var _this = this;
        TAB.Log.AddTaskComment('Verifying "See all" link');
        TAB.AddTask(TAB.MakeTask(function () {
            var listName = _this._getListName(list);
            var expectedHref = '/Lists/' + listName;
            var link = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(_this._root, 'listViewWebPartSeeAll');
            TAB.Log.Verify(link.href.indexOf(expectedHref) > -1, '"See all" link is correct');
        }));
    };
    ListViewWebpart.prototype.AddTaskVerifyTitle = function (list) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var expectedText = _this._getListName(list);
            var header = TAB.GetElement(_this._root, TAB.searchBy.tag, 'textarea');
            var headerText = TAB.GetTextContent(header);
            TAB.Log.VerifyEquals(expectedText, headerText, 'ListViewWebpart title is correct');
        }));
    };
    ListViewWebpart.prototype.AddTaskVerifyUpdatedTitle = function (expectedTitle) {
        TAB.AddTask(TAB.MakeTask(function () {
            var webpartHeaders = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'captionElement');
            var foundTitle = false;
            for (var _i = 0, webpartHeaders_1 = webpartHeaders; _i < webpartHeaders_1.length; _i++) {
                var header = webpartHeaders_1[_i];
                var text = TAB.GetTextContent(header);
                if (text === expectedTitle) {
                    foundTitle = true;
                }
            }
            TAB.Log.Verify(foundTitle, 'Updated web part title found');
        }));
    };
    ListViewWebpart.prototype.IsWebpartUpdated = function () {
        return TAB.ElementExists(this._root, TAB.searchBy.tag, 'div');
    };
    ListViewWebpart.prototype.WaitForChoiceBox = function () {
        TAB.Log.AddTaskComment('Waiting for the list choice box to be populated ...');
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='setupPanelItem']"));
    };
    ListViewWebpart.prototype._addTaskClickColumnHeader = function (columnName) {
        var _this = this;
        TAB.Log.AddTaskComment('Clicking column header to open context menu');
        // Look for correct column and click until context menu opens
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var headers = TAB.GetElements(_this._root, TAB.searchBy.customQuery, '[data-automationid="ColumnsHeaderColumn"]');
            for (var _i = 0, headers_1 = headers; _i < headers_1.length; _i++) {
                var header = headers_1[_i];
                var headerText = TAB.GetTextContent(header);
                if (headerText.indexOf(columnName) > -1) {
                    var button = TAB.GetElement(header, TAB.searchBy.customQuery, '[role="button"]');
                    TAB.ClickElement(button);
                    break;
                }
            }
            return _ContextMenu__WEBPACK_IMPORTED_MODULE_2__["ContextMenu"].MenuAlreadyOpen();
        }));
    };
    ListViewWebpart.prototype._addTaskClickContextMenuItemByIndex = function (item, index) {
        TAB.Log.AddTaskComment("Clicking context menu item \"" + item + "\" at index " + index);
        TAB.AddTask(TAB.MakeTask(function () {
            var sortMenu = new _ContextMenu__WEBPACK_IMPORTED_MODULE_2__["ContextMenu"]();
            sortMenu.AddTaskClickItemByIndex(index);
        }));
    };
    ListViewWebpart.prototype._getListName = function (list) {
        return typeof list === 'string' ? list : (list && list.listName);
    };
    ListViewWebpart.prototype._checkFilteredValue = function (filters, value) {
        var foundMatch = false;
        for (var item in filters) {
            if (filters[item] === value) {
                foundMatch = true;
                break;
            }
        }
        return foundMatch;
    };
    return ListViewWebpart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["BaseWebpart"]));



/***/ }),

/***/ "BJbA":
/*!*******************************!*\
  !*** ./lib/SPTaskLib/Next.js ***!
  \*******************************/
/*! exports provided: Next */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Next", function() { return Next; });
/* harmony import */ var _CsomUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CsomUtil */ "UXDa");

/**
 * @public
 */
var Next = /** @class */ (function () {
    function Next() {
    }
    Next.GetElementByDataAutomationId = function (root, id) {
        var elementCollection = this.GetElementsByDataAutomationId(root, id);
        if (!elementCollection) {
            TAB.Log.Verbose("Element not found with data automation id '" + id + "'");
            return null;
        }
        var element = elementCollection[id] || elementCollection[0];
        if (!element) {
            TAB.Log.Verbose("Element not found with data automation id '" + id + "'");
            return null;
        }
        return element;
    };
    Next.GetElementsByDataAutomationId = function (root, id) {
        var automationId = "[data-automation-id='" + id + "']";
        var elementCollection = TAB.GetElements(root, TAB.searchBy.customQuery, automationId);
        if (elementCollection.length === 0) {
            automationId = "[data-automationid='" + id + "']";
            elementCollection = TAB.GetElements(root, TAB.searchBy.customQuery, automationId);
        }
        return elementCollection;
    };
    Next.WaitForElementsByDataAutomationId = function (root, id, numberOfInstances) {
        return TAB.MakeWaiter(function () {
            if (typeof root === 'function') {
                root = root();
            }
            if (!root) {
                root = TAB.Win;
            }
            try {
                var automationId = "[data-automation-id='" + id.toString() + "']";
                var elementCollection = TAB.GetElements(root, TAB.searchBy.customQuery, automationId);
                if (isNaN(numberOfInstances)) {
                    return elementCollection.length > 0;
                }
                else {
                    return elementCollection.length === numberOfInstances;
                }
            }
            catch (e) {
                return false;
            }
        });
    };
    /**
     * Fetches the request digest (canary) if needed, and makes a POST request to the
     * specified URL using that canary.
     *
     * @param serverUrl - The server URL
     * @param targetUrl - The target URL to send the POST request
     * @param postBody - Body to send in POST request
     * @param responseResult - Wrapper object for response from POST request
     */
    Next.AddTaskSendRestRequest = function (serverUrl, targetUrl, postBody, responseResult, fetchCanary, xHTTPMethod) {
        Next._addTaskSetUpCanaryData(serverUrl, fetchCanary);
        TAB.AddTask(TAB.MakeTask(function () {
            if (!Next.digestResult.success || typeof Next.digestResult.retVal !== 'string') {
                throw "AddTaskSendPost: The canary is invalid.";
            }
            else {
                var canary = Next.digestResult.retVal;
                TAB.AddTask(TAB.MakeTask(function () {
                    TAB.Log.Comment("SendPost: Creating XML http request to '" + targetUrl + "'.");
                    var xhr = new XMLHttpRequest();
                    xhr.open('POST', targetUrl, true);
                    xhr.setRequestHeader("x-requestdigest", canary);
                    xhr.setRequestHeader("Content-Type", "application/json;odata=verbose");
                    xhr.setRequestHeader("Accept", "application/json;odata=verbose");
                    if (xHTTPMethod) {
                        xhr.setRequestHeader('X-HTTP-Method', xHTTPMethod);
                        xhr.setRequestHeader('IF-MATCH', '*');
                    }
                    var OnSuccess = function () {
                        TAB.Log.Comment("SendPost: XHR returned successfully.");
                        responseResult.retVal = JSON.parse(xhr.responseText);
                        responseResult.success = true;
                        var correlationId = xhr.getResponseHeader('sprequestguid');
                        TAB.Log.Comment("Request correlation ID: " + correlationId);
                    };
                    TAB.AddAjaxTask(xhr, OnSuccess, postBody);
                }));
            }
        }));
    };
    Next.AddTaskSendGetRequest = function (serverUrl, targetUrl, responseResult) {
        Next._addTaskSetUpCanaryData(serverUrl);
        TAB.AddTask(TAB.MakeTask(function () {
            if (!Next.digestResult.success || typeof Next.digestResult.retVal !== 'string') {
                throw "AddTaskSendPost: The canary is invalid.";
            }
            else {
                var canary = Next.digestResult.retVal;
                TAB.AddTask(TAB.MakeTask(function () {
                    TAB.Log.Comment("Sending get request to '" + targetUrl + "'.");
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", targetUrl, true);
                    xhr.setRequestHeader("x-requestdigest", canary);
                    xhr.setRequestHeader("Content-Type", "application/json; odata.metadata=minimal");
                    xhr.setRequestHeader("Accept", "*/*, application/json; odata.metadata=minimal");
                    xhr.setRequestHeader("odata-version", "4.0");
                    var OnSuccess = function () {
                        TAB.Log.Comment("GET request returned successfully.");
                        responseResult.retVal = JSON.parse(xhr.responseText);
                        responseResult.success = true;
                        var correlationId = xhr.getResponseHeader('sprequestguid');
                        TAB.Log.Comment("Request correlation ID: " + correlationId);
                    };
                    Next._addTaskSendAjax(xhr, OnSuccess);
                }));
            }
        }));
    };
    Next.AddTaskSendPostRequest = function (serverUrl, targetUrl, postBody, responseResult, fetchCanary) {
        Next._addTaskSetUpCanaryData(serverUrl, fetchCanary);
        TAB.AddTask(TAB.MakeTask(function (serverUrl) {
            if (!Next.digestResult.success || typeof Next.digestResult.retVal !== 'string') {
                throw "AddTaskSendPost: The canary is invalid.";
            }
            else {
                var canary = Next.digestResult.retVal;
                TAB.AddTask(TAB.MakeTask(function () {
                    TAB.Log.Comment("SendPost: Creating XML http request to '" + targetUrl + "'.");
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", targetUrl, true);
                    xhr.setRequestHeader("x-requestdigest", canary);
                    xhr.setRequestHeader("Content-Type", "application/json; odata.metadata=minimal");
                    xhr.setRequestHeader("Accept", "*/*, application/json; odata.metadata=minimal");
                    xhr.setRequestHeader("odata-version", "4.0");
                    var OnSuccess = function () {
                        TAB.Log.Comment("SendPost: XHR returned successfully.");
                        if (xhr.responseText) {
                            responseResult.retVal = JSON.parse(xhr.responseText);
                        }
                        responseResult.success = true;
                        var correlationId = xhr.getResponseHeader('sprequestguid');
                        TAB.Log.Comment("Request correlation ID: " + correlationId);
                    };
                    Next._addTaskSendAjax(xhr, OnSuccess, postBody);
                }));
            }
        }));
    };
    Next.AddTaskSendGetRequestClassicPage = function (serverUrl, targetUrl, responseResult) {
        Next._addTaskSetUpCanaryData(serverUrl);
        TAB.AddTask(TAB.MakeTask(function () {
            if (!Next.digestResult.success || typeof Next.digestResult.retVal !== 'string') {
                throw new Error('AddTaskSendGePublishingPage: The canary is invalid.');
            }
            else {
                var canary = Next.digestResult.retVal;
                TAB.AddTask(TAB.MakeTask(function () {
                    var start;
                    var end;
                    if (performance)
                        start = performance.now();
                    TAB.Log.Comment("Sending get request to '" + targetUrl + "'.");
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", targetUrl, true);
                    xhr.setRequestHeader("x-requestdigest", canary);
                    xhr.setRequestHeader("Content-Type", "text/html; odata.metadata=minimal");
                    xhr.setRequestHeader("Accept", "*/*, text/html; odata.metadata=minimal");
                    xhr.setRequestHeader("odata-version", "4.0");
                    xhr.responseType = "document";
                    var OnSuccess = function () {
                        if (performance)
                            end = performance.now();
                        if (start && end) {
                            var totalTime = end - start;
                            if (totalTime < 6000) {
                                TAB.Log.Comment("Get request took " + totalTime + " ms which was under our 6000 ms goal");
                            }
                            else {
                                TAB.Log.Comment("Get request took " + totalTime + " ms which was over our 6000 ms goal");
                            }
                        }
                        TAB.Log.Comment("GET request returned successfully.");
                        responseResult.retVal = xhr.responseXML;
                        responseResult.success = true;
                        responseResult.correlationId = xhr.getResponseHeader('sprequestguid');
                    };
                    Next._addTaskSendAjax(xhr, OnSuccess);
                }));
            }
        }));
    };
    Next._addTaskSetUpCanaryData = function (serverUrl, fetchCanary) {
        TAB.AddTask(TAB.MakeTask(function () {
            if (!Next.digestResult || Next.digestResult.retVal === undefined || fetchCanary) {
                Next.digestResult = {};
                TAB.AddTask(TAB.MakeTask(function () {
                    var canaryXhr = new XMLHttpRequest();
                    var contexturl = serverUrl + "/_api/contextinfo";
                    TAB.Log.Comment("GetRequestDigest: Getting Form Digest Value from URL '" + contexturl + "'.");
                    canaryXhr.open("POST", contexturl, true);
                    canaryXhr.setRequestHeader("Content-Type", "application/json;odata=verbose");
                    canaryXhr.setRequestHeader("Accept", "application/json; odata = verbose");
                    TAB.AddAjaxTask(canaryXhr, function () {
                        TAB.Log.Comment("GetRequestDigest: Get Form Digest Value succeeded.");
                        var canaryData = JSON.parse(canaryXhr.responseText);
                        Next.digestResult.retVal = canaryData.d.GetContextWebInformation.FormDigestValue;
                        Next.digestResult.success = true;
                        var correlationId = canaryXhr.getResponseHeader('sprequestguid');
                        TAB.Log.Comment("Canary request correlation ID: " + correlationId);
                    });
                }));
            }
        }));
    };
    /**
     * Sending ajax call to server
     * TODO: replace with TAB.AddAjaxTask once Alexsp update the onedrive-buildtools-binaries with latest tab core
     */
    Next._addTaskSendAjax = function (xmlhttp, successCallback, postBody) {
        var _isDone = false;
        TAB.AddTask(TAB.MakeTask(function () {
            xmlhttp.onreadystatechange = function () {
                var args = arguments;
                if (xmlhttp.readyState == 4) {
                    _isDone = true;
                    if (Math.floor(xmlhttp.status / 100) == 2 && successCallback != null) // treat all 200s as success
                        successCallback.apply(xmlhttp, args);
                    else
                        TAB.Log.Warning("AjaxCallbackWrapper: AJAX call returned, but status not okay.");
                }
            };
            xmlhttp.onerror = function () {
                _isDone = true;
                TAB.Log.AddTaskWarning("_addTaskSendAjax failed");
            };
            xmlhttp.onabort = function () {
                _isDone = true;
                TAB.Log.AddTaskWarning("_addTaskSendAjax aborted");
            };
            xmlhttp.send(postBody);
        }), TAB.MakeWaiter(function () {
            return _isDone;
        }));
    };
    Next.addCsomTaskDoesWebExist = function (webUrl, result) {
        TAB.AddTask(TAB.MakeTask(function () {
            var cctx = null;
            var currentWeb = null;
            _CsomUtil__WEBPACK_IMPORTED_MODULE_0__["Csom"].AddTask(loadWeb, onLoadSuccess, onLoadFail);
            // CSOM to load the web object
            function loadWeb() {
                cctx = new SP.ClientContext(webUrl);
                currentWeb = cctx.get_web();
                cctx.load(currentWeb);
                return cctx;
            }
            function onLoadSuccess() {
                TAB.Log.Verbose("Found existing web at: " + webUrl);
                result.success = true;
                // It's the root site collection.
                if (currentWeb.get_serverRelativeUrl() === "/") {
                    result.success = false;
                }
            }
            function onLoadFail() {
                TAB.Log.Verbose("Count not find any existing web at: " + webUrl);
                result.success = false;
            }
        }));
    };
    Next.digestResult = {};
    return Next;
}());



/***/ }),

/***/ "BW9v":
/*!**********************************************!*\
  !*** ./lib/SPTaskLib/Controls/NewsFilter.js ***!
  \**********************************************/
/*! exports provided: NewsFilter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsFilter", function() { return NewsFilter; });
/* harmony import */ var _Utilities_ReactTriggerChange__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Utilities/ReactTriggerChange */ "dp3n");

var FilterDataAutomationId;
(function (FilterDataAutomationId) {
    FilterDataAutomationId["FilterDropDownBox"] = "queryFilterTypeDropDown";
    FilterDataAutomationId["FilterTextBox"] = "textQueryFilter";
    FilterDataAutomationId["FilterAddButton"] = "queryFilterAddButton";
    FilterDataAutomationId["FilterContainer"] = "queryFilterContainer";
    FilterDataAutomationId["FilterRemoveButton"] = "queryFilterRemoveButton";
    FilterDataAutomationId["FilterPropertyPaneApplyButton"] = "propertyPaneApplyButton";
    FilterDataAutomationId["DateTimeQueryFilter"] = "dateTimeQueryFilter";
    FilterDataAutomationId["PersonQueryFilter"] = "personQueryFilter";
    FilterDataAutomationId["PersonQueryFilterTypeTextField"] = "queryFilterTypeTextField";
    FilterDataAutomationId["FieldQueryFilterDropDown"] = "fieldQueryFilterDropDown";
    FilterDataAutomationId["FieldQueryFilterTextField"] = "fieldQueryFilterValueTextField";
    FilterDataAutomationId["FieldQueryFilterOperationDropDown"] = "fieldQueryFilterOperationDropdown";
})(FilterDataAutomationId || (FilterDataAutomationId = {}));
/**
 * @public
 */
var NewsFilter = /** @class */ (function () {
    function NewsFilter() {
    }
    NewsFilter.prototype.AddTaskCheckFilterOptionExists = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for filter container");
        }), this._waitForFilterElementToExist(FilterDataAutomationId.FilterContainer));
    };
    NewsFilter.prototype.AddTaskWaitForDropDownToExistById = function (dataAutomationId) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for Filter property pane " + dataAutomationId);
        }), this._waitForFilterElementToExist(dataAutomationId));
    };
    NewsFilter.prototype.AddTaskToOpenPropertyPaneDropDown = function (dataAutomationId, selectedValueIndex) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for Filter property pane " + dataAutomationId);
        }), this._waitForFilterElementToExist(dataAutomationId));
        TAB.AddTask(TAB.MakeTask(function () {
            var dropDown = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='" + dataAutomationId + "']");
            dropDown.focus();
            TAB.ClickElement(dropDown);
        }), TAB.MakeWaiter(function () {
            try {
                TAB.Log.Comment("Waiting for dropDown");
                var dropDown = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, NewsFilter.Dropdown_CallOutClassName);
                var buttons = TAB.GetElements(dropDown, TAB.searchBy.tag, NewsFilter.Dropdown_TagButton);
                return buttons.length > 0;
            }
            catch (error) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Clicking on dropDownCallout");
            var dropDownCallout = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, NewsFilter.Dropdown_CallOutClassName)[0];
            var button = TAB.GetElements(dropDownCallout, TAB.searchBy.tag, NewsFilter.Dropdown_TagButton)[selectedValueIndex];
            TAB.ClickElement(button);
        }), undefined);
    };
    NewsFilter.prototype.AddTaskFilterTitle = function (dataAutomationId, title) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var inputBox = _this._getPropertyPaneElementByDataAutomationId(dataAutomationId);
            inputBox.focus();
            inputBox.value = title;
            Object(_Utilities_ReactTriggerChange__WEBPACK_IMPORTED_MODULE_0__["ReactTriggerChange"])(inputBox);
        }), undefined);
    };
    NewsFilter.prototype.AddTaskClickAddFilterButton = function (filterIndex) {
        var _this = this;
        var addFilterDataAutomationId = FilterDataAutomationId.FilterAddButton + filterIndex;
        var removeButtonFilterDataAutomationId = FilterDataAutomationId.FilterRemoveButton + ++filterIndex;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for Filter Add button");
        }), this._waitForFilterElementToExist(addFilterDataAutomationId));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking Filter Add button');
            TAB.ClickElement(_this._getPropertyPaneElementByDataAutomationId(addFilterDataAutomationId));
        }), this._waitForFilterElementToExist(removeButtonFilterDataAutomationId));
    };
    NewsFilter.prototype.AddTaskClickRemoveFilterButton = function (filterIndex) {
        var _this = this;
        var removeFilterDataAutomationId = FilterDataAutomationId.FilterRemoveButton + filterIndex;
        var addFilterIndex = filterIndex === 0 ? filterIndex : filterIndex - 1;
        var addFilterDataAutomationId = FilterDataAutomationId.FilterAddButton + addFilterIndex;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for Filter Remove button");
        }), this._waitForFilterElementToExist(removeFilterDataAutomationId));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking Filter Remove button');
            TAB.ClickElement(_this._getPropertyPaneElementByDataAutomationId(removeFilterDataAutomationId));
        }), this._waitForFilterElementToExist(addFilterDataAutomationId));
    };
    NewsFilter.prototype.AddTaskClickApplyFilterButton = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for Filter Apply button");
        }), this._waitForApplyButtonToExist());
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking Filter Apply button');
            TAB.ClickElement(_this._getElementByDataAutomationId(FilterDataAutomationId.FilterPropertyPaneApplyButton));
        }), TAB.MakeWaiter(function () {
            TAB.Log.Comment('Waiting for Filtered news to render');
            return true /* VSO# 685821Todo: wait for filtered news rendering*/;
        }));
    };
    NewsFilter.prototype._waitForFilterElementToExist = function (dataAutomationId) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            return Boolean(_this._getPropertyPaneElementByDataAutomationId(dataAutomationId));
        });
    };
    NewsFilter.prototype._waitForApplyButtonToExist = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            return Boolean(_this._getElementByDataAutomationId(FilterDataAutomationId.FilterPropertyPaneApplyButton));
        });
    };
    NewsFilter.prototype._getPropertyPaneElementByDataAutomationId = function (dataAutomationId) {
        try {
            var propertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, "propertyPanePageContent");
            return TAB.GetElement(propertyPane, TAB.searchBy.customQuery, "[data-automation-id='" + dataAutomationId + "']");
        }
        catch (e) {
            return undefined;
        }
    };
    NewsFilter.prototype._getElementByDataAutomationId = function (dataAutomationId, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.GetElement(searchObj, TAB.searchBy.customQuery, "[data-automation-id='" + dataAutomationId + "']");
        }
        catch (e) {
            return undefined;
        }
    };
    NewsFilter.Dropdown_CallOutClassName = 'ms-Dropdown-callout';
    NewsFilter.Dropdown_TagButton = 'BUTTON';
    return NewsFilter;
}());



/***/ }),

/***/ "CPNt":
/*!**********************************************!*\
  !*** ./lib/SPTaskLib/Controls/CommandBar.js ***!
  \**********************************************/
/*! exports provided: CommandBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandBar", function() { return CommandBar; });
/* harmony import */ var _CommandBarItem__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CommandBarItem */ "SMhQ");
/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ContextMenu */ "yis5");
/* harmony import */ var _Utilities_ClientFeatures__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utilities/ClientFeatures */ "zTnS");



/**
 * @public
 */
var CommandBar = /** @class */ (function () {
    function CommandBar(params) {
        this.root = getRootElement({
            area: params.area,
            rootElement: params.rootElement || TAB.Win,
            isReact: CommandBar.isReact
        });
        this._getCommandItems();
    }
    Object.defineProperty(CommandBar, "isReact", {
        get: function () {
            if (this._isReact !== undefined) {
                return this._isReact;
            }
            // When flight ItemsViewInODSPNext is enabled,
            // commandBar should be in react version.
            if (_Utilities_ClientFeatures__WEBPACK_IMPORTED_MODULE_2__["ClientFeatures"].IsODBFeatureEnabled(851)) {
                this._isReact = true;
                return this._isReact;
            }
            // tslint:disable-next-line:no-any
            var spPageContextInfo = TAB.Win.window._spPageContextInfo;
            // The page hasn't loaded yet, so we can't make a flight check
            if (!spPageContextInfo) {
                return false;
            }
            var isOneDrive = spPageContextInfo.webTemplate === '21';
            // ODB uses UseReactCommandBar (802) and SPO uses UseReactCommandBarSP (858)
            this._isReact = _Utilities_ClientFeatures__WEBPACK_IMPORTED_MODULE_2__["ClientFeatures"].IsODBFeatureEnabled(isOneDrive ? 802 : 858);
            return this._isReact;
        },
        enumerable: true,
        configurable: true
    });
    CommandBar.WaitForCommandBar = function (params, container) {
        return TAB.MakeWaiter(function () {
            try {
                var root = container || TAB.Win;
                // This is just looking to make sure there is at least one commandbar in the DOM.
                // Ideally each usage of this method would specify exactly which commandbar it is waiting for instead.
                var className = CommandBar.isReact ? '.ms-CommandBar' : '.CommandBar';
                var results = TAB.GetElements(root, TAB.searchBy.customQuery, className);
                var element = results && results.length && results[0];
                if (element && params.waitForSelection) {
                    TAB.Log.Comment('CommandBar found. Waiting for selected item.');
                    var commandBar = new CommandBar({ area: 'root' });
                    var selected = commandBar.GetItem({ title: /[0-9]+ selected/ });
                    var newCommand = commandBar.GetItem({ title: 'New' });
                    return !!selected && !newCommand;
                }
                else if (element && params.waitForItems) {
                    var commandBar = new CommandBar({ area: params.area });
                    var commandsToWaitFor = typeof params.waitForItems === 'number' ? params.waitForItems : 1;
                    TAB.Log.Comment("CommandBar found. Waiting for " + commandsToWaitFor + " items to be present.");
                    return commandBar.GetItemCount(true) >= commandsToWaitFor;
                }
                return !!element;
            }
            catch (ex) {
                return false;
            }
        });
    };
    CommandBar.WaitForCommandBarItem = function (title) {
        return TAB.MakeWaiter(function () {
            try {
                var commandBar = new CommandBar({ area: 'root' });
                var commandInfo = typeof title === 'string' ? { title: title } : title;
                return !!commandBar.GetItem(commandInfo);
            }
            catch (ex) {
                return false;
            }
        });
    };
    CommandBar.AddItemVerificationTask = function (options) {
        TAB.Log.AddTaskComment('Verifying that items are present in the CommandBar.');
        TAB.AddTask(TAB.MakeTask(function () {
            var commandBar = new CommandBar({
                area: options.area,
                rootElement: options.rootElement
            });
            return commandBar._addItemVerificationTask(options);
        }));
    };
    CommandBar.prototype.GetItemByTitle = function (title, throwIfNotFound) {
        return getItem({
            items: this.commandBarItems,
            expected: { title: title },
            throwIfNotFound: throwIfNotFound
        });
    };
    CommandBar.prototype.GetItem = function (commandInfo, throwIfNotFound) {
        return getItem({
            items: this.commandBarItems,
            expected: commandInfo,
            throwIfNotFound: throwIfNotFound
        });
    };
    CommandBar.prototype.GetItemBySequence = function (sequence) {
        return this.commandBarItems[sequence];
    };
    CommandBar.prototype.GetItemCount = function (excludeOverFlow) {
        if (excludeOverFlow) {
            var command = this.GetOverflowMenu();
            if (command) {
                return this.commandBarItems.length - 1;
            }
        }
        return this.commandBarItems.length;
    };
    CommandBar.prototype.GetOverflowMenu = function () {
        for (var _i = 0, _a = this.commandBarItems; _i < _a.length; _i++) {
            var command = _a[_i];
            if (command.IsOverflow) {
                return command;
            }
        }
    };
    CommandBar.prototype.VerifyItems = function (expectedItems, requireExactMatch) {
        return verifyItems({
            actual: this.commandBarItems,
            expected: expectedItems,
            requireExactMatch: requireExactMatch
        });
    };
    CommandBar.prototype.VerifyItem = function (index, expectedItem) {
        return verifyItem(this.commandBarItems, index, expectedItem);
    };
    CommandBar.prototype.AddTaskEnsureCommandBarItem = function (title, resetRoot, rootParams) {
        var _this = this;
        var commandInfo = typeof title === 'string' ? { title: title } : title;
        TAB.Log.AddTaskComment("Ensuring item with title \"" + (commandInfo.title || commandInfo.iconClassName) + "\" is in the CommandBar.");
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            if (resetRoot && rootParams) {
                _this.root = getRootElement(rootParams);
            }
            _this._getCommandItems();
            return !!_this.GetItem(commandInfo);
        }));
    };
    /**
     * Click on an item, even if it's in the overflow menu,
     * then return a boolean indicating if the item was in an overflow menu.
     * WARNING: Command or overflow MUST be rendered before this method is called!
     *
     * @param title - Command title or info about the command
     */
    CommandBar.prototype.AddTaskEnsureClickCommandBarItem = function (title) {
        var commandInfo = typeof title === 'string' ? { title: title } : title;
        var itemToGet = this.GetItem(commandInfo);
        var itemToGetVisible = itemToGet && itemToGet.IsVisible;
        if (itemToGetVisible) {
            itemToGet.AddTaskClick();
            TAB.Log.AddTaskComment("Command \"" + (commandInfo.title || commandInfo.iconClassName) + "\" was clicked.");
        }
        else { // in overflow
            var overflow = this.GetOverflowMenu();
            TAB.Log.AddTaskComment("Command \"" + (commandInfo.title || commandInfo.iconClassName) + "\" is not visible in the CommandBar. Clicking overflow command.");
            if (overflow) {
                overflow.AddTaskOpenContextMenu();
                TAB.AddTask(TAB.MakeTask(function () {
                    (new _ContextMenu__WEBPACK_IMPORTED_MODULE_1__["ContextMenu"](false /*isSubMenu*/)).AddTaskClickItem(commandInfo);
                }));
                TAB.Log.AddTaskComment("Command \"" + (commandInfo.title || commandInfo.iconClassName) + "\" was clicked from the overflow menu.");
            }
            else {
                TAB.Log.AddTaskFail("Command \"" + (commandInfo.title || commandInfo.iconClassName) + "\" not found, and overflow command not found.");
                throw "Command \"" + (commandInfo.title || commandInfo.iconClassName) + "\" not found, and overflow command not found";
            }
        }
        return !itemToGetVisible;
    };
    CommandBar.prototype._getCommandItems = function () {
        var className = CommandBar.isReact ? 'ms-Button--commandBar' : 'CommandBarItem';
        var commandElements = TAB.GetElements(this.root, TAB.searchBy.hasClassName, className);
        this.commandBarItems = Array.prototype.map.call(commandElements, function (elem) { return new _CommandBarItem__WEBPACK_IMPORTED_MODULE_0__["CommandBarItem"](elem); });
    };
    CommandBar.prototype._addItemVerificationTask = function (options) {
        var _this = this;
        // tslint:disable-next-line:no-any
        var overflowItems = [];
        var hasOverFlow = false;
        if (options.checkOverflow) {
            TAB.Log.Comment('CommandBar item verification requests checking overflow menu.');
            TAB.AddTask(TAB.MakeTask(function () {
                var overflow = _this.GetOverflowMenu();
                if (overflow) {
                    TAB.Log.Comment('CommandBar has an overflow menu. Opening the context menu.');
                    hasOverFlow = true;
                    overflow.AddTaskOpenContextMenu();
                }
            }));
            TAB.AddTask(TAB.MakeTask(function () {
                if (hasOverFlow) {
                    var overflowMenu = new _ContextMenu__WEBPACK_IMPORTED_MODULE_1__["ContextMenu"](false /*isSubMenu*/);
                    overflowItems = overflowMenu.GetItems();
                }
            }));
        }
        else {
            TAB.Log.Comment('CommandBar item verification requests ignoring overflow menu.');
        }
        TAB.AddTask(TAB.MakeTask(function () {
            var items = _this.commandBarItems.filter(function (item) { return !item.IsOverflow; }).concat(overflowItems);
            return verifyItems({
                actual: items,
                expected: options.expectedItems,
                requireExactMatch: options.requireExactMatch
            });
        }));
    };
    return CommandBar;
}());

function getRootElement(params) {
    // There will sometimes be more than one .ms-CommandBar in the DOM because of one used for measurement
    switch (params.area) {
        case 'root':
            var className = params.isReact ? '.ms-ResizeGroup>.ms-CommandBar' : '.CommandBar';
            return TAB.GetElement(params.rootElement, TAB.searchBy.customQuery, className);
        case 'primary':
            if (params.isReact) {
                var primary = TAB.GetElements(params.rootElement, TAB.searchBy.hasClassName, 'ms-CommandBar-primaryCommand');
                return (primary && primary.length) ? primary[0] : undefined;
            }
            return TAB.GetElement(params.rootElement, TAB.searchBy.hasClassName, 'CommandBar-mainArea');
        case 'secondary':
            if (params.isReact) {
                var secondary = TAB.GetElements(params.rootElement, TAB.searchBy.customQuery, '.ms-ResizeGroup>.ms-CommandBar .ms-OverflowSet');
                return (secondary && secondary.length > 1) ? secondary[1] : undefined;
            }
            return TAB.GetElement(params.rootElement, TAB.searchBy.hasClassName, 'CommandBar-sideArea');
    }
}
function verifyItems(params) {
    for (var i = 0; i < params.expected.length; i++) {
        // tslint:disable-next-line:no-any
        var expectedItem = params.expected[i];
        if (params.requireExactMatch) {
            verifyItem(params.actual, i, expectedItem);
        }
        else {
            // tslint:disable-next-line:no-any
            var item = getItem({ items: params.actual, expected: expectedItem });
            if (item) {
                TAB.Log.Pass("Verified expected command bar item \"" + expectedItem.title + "\"");
            }
            else if (expectedItem.isOptional && expectedItem.isOptional()) {
                TAB.Log.Warning("Did not find optional command bar item \"" + expectedItem.title + "\"");
            }
            else {
                throw "Did not find command bar item \"" + expectedItem.title + "\"";
            }
        }
    }
}
function getItem(params) {
    var _a = params.expected, title = _a.title, iconClassName = _a.iconClassName;
    for (var _i = 0, _b = params.items; _i < _b.length; _i++) {
        var item = _b[_i];
        if (title && isNameMatch(item.Title, title)) {
            if (iconClassName && item.IconClassName) {
                if (item.IconClassName.indexOf(iconClassName) >= 0) {
                    return item; // item matched expected title and icon
                }
                continue; // item matched expected title but not icon
            }
            return item; // item matched expected title and there was no icon to match
        }
        else if (!title) {
            if (!iconClassName || !item.IconClassName) {
                continue; // There wasn't a title to test, so we at least need an icon to test
            }
            if (item.IconClassName.indexOf(iconClassName) >= 0) {
                return item; // There wasn't a title to test, but the item did match the given icon
            }
        }
    }
    if (params.throwIfNotFound) {
        throw 'Command bar item not found: ' + (title || iconClassName);
    }
    return undefined;
}
function isNameMatch(actual, expected) {
    if (typeof expected === 'string') {
        if (expected.toUpperCase() === actual.toUpperCase()) {
            return true;
        }
    }
    else if (expected && !expected.test(actual)) {
        return true;
    }
    return false;
}
function verifyItem(items, index, expected) {
    var actual = items[index];
    if (!actual) {
        TAB.Log.Fail("Menu item \"" + expected.title + "\" not found at index " + index);
        return;
    }
    var itemTitle = actual.Title;
    if (typeof expected.title === 'string') {
        TAB.Log.VerifyEquals(itemTitle.toUpperCase(), expected.title.toUpperCase(), "Verified expected command bar item " + expected.title);
    }
    else {
        TAB.Log.Verify(expected.title.test(itemTitle), "Verified expected command bar item matching regex " + expected.title);
    }
}


/***/ }),

/***/ "Ckxo":
/*!*************************************!*\
  !*** ./lib/SPTaskLib/WebLibrary.js ***!
  \*************************************/
/*! exports provided: Web */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Web", function() { return Web; });
/* harmony import */ var _CsomUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CsomUtil */ "UXDa");

/**
 * @public
 */
var Web = /** @class */ (function () {
    function Web() {
    }
    Web.addCsomTaskGetCurrentUserFromWeb = function (userResult) {
        var currentUser;
        var retrieveWebUser = function () {
            var context = SP.ClientContext.get_current();
            var web = context.get_web();
            currentUser = web.get_currentUser();
            context.load(currentUser);
            return context;
        };
        var onRetriveUserSuccess = function () {
            userResult.loginName = currentUser.get_loginName();
            userResult.title = currentUser.get_title();
            userResult.email = currentUser.get_email();
            userResult.isSiteAdmin = currentUser.get_isSiteAdmin();
        };
        var onRetrieveUserFailed = function () {
            TAB.Log.AddTaskFail('Failed to get current web user');
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_0__["Csom"].AddTask(retrieveWebUser, onRetriveUserSuccess, onRetrieveUserFailed);
    };
    Web.addCsomTaskGetUserFromWeb = function (loginName, userResult) {
        var user;
        var retrieveWebUser = function () {
            var context = SP.ClientContext.get_current();
            var web = context.get_web();
            user = web.ensureUser(loginName);
            context.load(user);
            return context;
        };
        var onRetriveUserSuccess = function () {
            userResult.loginName = user.get_loginName();
            userResult.title = user.get_title();
            userResult.email = user.get_email();
            userResult.isSiteAdmin = user.get_isSiteAdmin();
        };
        var onRetrieveUserFailed = function () {
            TAB.Log.AddTaskFail("Failed to get web user with login name: " + loginName);
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_0__["Csom"].AddTask(retrieveWebUser, onRetriveUserSuccess, onRetrieveUserFailed);
    };
    Web.addCsomTaskCheckReadOnly = function (serverUrl, result) {
        var spSite;
        var GetSPSite = function () {
            var context = new SP.ClientContext(serverUrl);
            spSite = context.get_site();
            context.load(spSite);
            return context;
        };
        var OnFailedGetSPSite = function () {
            TAB.Log.Fail('Failed to get site.');
        };
        var OnSuccessGetSPSite = function () {
            TAB.Log.Comment('Got site.');
            result.readOnly = !!spSite.get_readOnly();
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_0__["Csom"].AddTask(GetSPSite, OnSuccessGetSPSite, OnFailedGetSPSite);
    };
    /**
     * Runs CSOM in the context of the test stub to unfollow a web.
     */
    Web.AddCsomUnfollowWeb = function (url, logFailure) {
        if (logFailure === void 0) { logFailure = false; }
        Web.addCsomTaskSetFollowStatus(url, false /*toFollow*/);
    };
    Web.addCsomTaskSetFollowStatus = function (url, toFollow, logFailure) {
        if (logFailure === void 0) { logFailure = false; }
        var followResult;
        var SetFollowStatus = function () {
            var context = SP.ClientContext.get_current();
            var profile = SP.UserProfiles.ProfileLoader.getProfileLoader(context).getUserProfile();
            var fc = profile.get_followedContent();
            if (toFollow) {
                followResult = fc.follow(url, undefined /*FollowedItemData*/);
            }
            else {
                fc.stopFollowing(url);
            }
            return context;
        };
        var OnFailedSetFollowStatus = function (sender, args) {
            var msg = "Failed to " + (toFollow ? 'follow' : 'unfollow') + " web at url: " + url + ", errorCode: " + args.get_errorCode() + ", errorMsg: " + args.get_message();
            if (logFailure) {
                TAB.Log.Fail(msg);
            }
            else {
                TAB.Log.Comment(msg);
            }
        };
        var OnSuccessSetFollowStatus = function () {
            if (toFollow) {
                var msg = 'Successfully followed web at url: ' + url;
                if (Boolean(followResult)) {
                    var resultType = followResult.get_resultType();
                    switch (resultType) {
                        case SP.UserProfiles.FollowResultType.followed:
                        case SP.UserProfiles.FollowResultType.refollowed:
                            // default msg
                            break;
                        case SP.UserProfiles.FollowResultType.hitFollowLimit:
                            msg = "Failed to followed web at url: " + url + ", hit follow limit";
                            break;
                        default:
                            msg = "Failed to followed web at url: " + url + ", unknown error";
                    }
                }
                TAB.Log.Comment(msg);
            }
            else {
                TAB.Log.Comment('Successfully unfollowed web at url: ' + url);
            }
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_0__["Csom"].AddTask(SetFollowStatus, OnSuccessSetFollowStatus, OnFailedSetFollowStatus);
    };
    return Web;
}());



/***/ }),

/***/ "DM7Z":
/*!*******************************************************!*\
  !*** ./lib/SPTaskLib/Controls/SitePermissionPanel.js ***!
  \*******************************************************/
/*! exports provided: SitePermissionPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SitePermissionPanel", function() { return SitePermissionPanel; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");

/**
 * @public
 */
var SitePermissionPanel = /** @class */ (function () {
    function SitePermissionPanel() {
    }
    Object.defineProperty(SitePermissionPanel.prototype, "RootElement", {
        get: function () {
            return this._rootElement;
        },
        enumerable: true,
        configurable: true
    });
    SitePermissionPanel.WaitForPanel = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-SitePermPanel');
    };
    SitePermissionPanel.prototype.AddTaskLaunchSitePermissionPanelFromSuiteNav = function () {
        TAB.Log.AddTaskComment('Launching site permission panel...');
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.id, 'O365_NavHeader'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.AddTaskClickElement(TAB.Win, TAB.searchBy.id, 'O365_MainLink_Settings', TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'o365cs-nav-contextMenu'));
            TAB.AddTaskClickElement(TAB.Win, TAB.searchBy.id, 'O365_SubLink_SUITENAV_SITE_PERMISSIONS', SitePermissionPanel.WaitForPanel());
        }));
        this.SetRootElementForPanel();
    };
    SitePermissionPanel.prototype.AddTaskVerifyPersona = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Verifying persona...');
        TAB.AddTask(TAB.MakeTask(function () {
            var sitePermBodys = _this.GetSitePermissionBodys();
            if (sitePermBodys && sitePermBodys.length > 0) {
                var persona_1 = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(sitePermBodys[0], 'SitePermissionsPersona');
                // If the persona is not opened, click site permission body button to open persona,
                // if it's already open, click site permission body button to close it.
                if (!persona_1) {
                    TAB.AddTaskClickElement(sitePermBodys[0], TAB.searchBy.customQuery, '[data-automationid="SitePermissionsBodyButton"]', TAB.WaitForElementToExist(sitePermBodys[0], TAB.searchBy.customQuery, '[data-automationid="SitePermissionsPersona"]'));
                    persona_1 = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(sitePermBodys[0], 'SitePermissionsPersona');
                    TAB.Log.Verify(Boolean(persona_1), 'The persona was verified.');
                }
                else {
                    TAB.AddTaskClickElement(sitePermBodys[0], TAB.searchBy.customQuery, '[data-automationid="SitePermissionsBodyButton"]', TAB.MakeWaiter(function () {
                        persona_1 = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(sitePermBodys[0], 'SitePermissionsPersona');
                        return Boolean(!persona_1);
                    }));
                    TAB.Log.Pass('The persona was verified.');
                }
            }
            else {
                TAB.Log.AddTaskFail('Failed to get sitePermBody.');
            }
        }));
    };
    SitePermissionPanel.prototype.AddTaskLaunchSitePermissionPanelDirectly = function () {
        TAB.Log.AddTaskComment('Launching site permission panel...');
        var sitePermPanelLaunchFunction = undefined;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            sitePermPanelLaunchFunction = TAB.Win.window['_spLaunchSitePermissions']; // tslint:disable-line:no-string-literal
            return Boolean(sitePermPanelLaunchFunction);
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            sitePermPanelLaunchFunction();
        }), SitePermissionPanel.WaitForPanel());
        this.SetRootElementForPanel();
    };
    SitePermissionPanel.prototype.WaitForSitePermissionBody = function () {
        return TAB.WaitForElementToExist(this._rootElement, TAB.searchBy.customQuery, '[data-automationid="SitePermissionsBody"]');
    };
    SitePermissionPanel.prototype.GetSitePermissionBodyItemButtons = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(this._rootElement, 'SitePermissionsBodyButton');
    };
    SitePermissionPanel.prototype.GetContextMenuItems = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu-item');
    };
    SitePermissionPanel.prototype.ClickInviteButton = function () {
        TAB.AddTaskClickElement(this._rootElement, TAB.searchBy.customQuery, '[data-automationid="SitePermissionsPanelInviteButton"]', TAB.MakeWaiter(function () {
            var contextMenuItems = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu');
            return Boolean(contextMenuItems.length !== 0);
        }));
    };
    SitePermissionPanel.prototype.DismissContextMenu = function () {
        TAB.AddTaskClickElement(TAB.Win, TAB.searchBy.tag, 'body', TAB.MakeWaiter(function () {
            var contextMenu = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu');
            return Boolean(contextMenu.length === 0);
        }));
    };
    SitePermissionPanel.prototype.GetSitePermissionBodys = function (rootElement) {
        if (rootElement === void 0) { rootElement = this._rootElement; }
        return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(rootElement, 'SitePermissionsBody');
    };
    SitePermissionPanel.prototype.AddTaskDismissSitePermissionPanel = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Dismiss site permission panel...');
        TAB.AddTask(TAB.MakeTask(function () {
            // We just click this close button, but removed the waiter, because Phamton JS has issue with the waiter.
            TAB.AddTaskClickElement(_this._rootElement, TAB.searchBy.hasClassName, 'ms-Panel-closeButton');
            TAB.Log.Pass('Site permission panel was dismissed.');
        }));
    };
    SitePermissionPanel.prototype.GetElementTextContent = function (targetDataAutomationId, targetClassName) {
        if (!targetDataAutomationId && !targetClassName) {
            return undefined;
        }
        var targetElement = targetDataAutomationId ?
            _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._rootElement, targetDataAutomationId) :
            TAB.GetElement(this._rootElement, TAB.searchBy.hasClassName, targetClassName);
        return TAB.GetTextContent(targetElement);
    };
    SitePermissionPanel.prototype.SetRootElementForPanel = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _this._rootElement = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-SitePermPanel');
            TAB.Log.Pass('Site permission panel was successfully launched.');
        }));
    };
    return SitePermissionPanel;
}());



/***/ }),

/***/ "EfLR":
/*!**************************************************************!*\
  !*** ./lib/SPTaskLib/Controls/DynamicDataConsumerWebPart.js ***!
  \**************************************************************/
/*! exports provided: DynamicDataConsumerWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DynamicDataConsumerWebPart", function() { return DynamicDataConsumerWebPart; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/PropertyPane */ "M/CL");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * @public
 */
var DynamicDataConsumerWebPart = /** @class */ (function (_super) {
    __extends(DynamicDataConsumerWebPart, _super);
    function DynamicDataConsumerWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_3__["WebpartType"].DynamicDataStaticConsumer, _BaseWebpart__WEBPACK_IMPORTED_MODULE_3__["WebpartType"].DynamicDataStaticConsumer.toString()) || this;
    }
    DynamicDataConsumerWebPart.prototype.AddTaskSetDynamicDataSource = function (sourceValue) {
        TAB.Log.AddTaskComment('Adding dynamic data web part to the page.');
        this.addWebPartToPage();
        TAB.Log.AddTaskComment('Setting up dynamic data web part through the property pane.');
        _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_1__["PropertyPane"].AddTaskOpenPropertyPane();
        TAB.AddTask(undefined, this.WaitForDynamicDataPropertyPane());
        TAB.Log.AddTaskComment('Property pane for the dynamic data web part open.');
        TAB.AddTask(TAB.MakeTask(function () {
            var propertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            var sourceInput = TAB.GetElement(propertyPane, TAB.searchBy.tag, 'input'); // tslint:disable-line:max-line-length
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(sourceInput, sourceValue);
        }), this.WaitForDynamicDataRendering());
        TAB.Log.AddTaskComment('Closing property pane for the dynamic data web part.');
        _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_1__["PropertyPane"].AddTaskClosePropertyPane();
    };
    DynamicDataConsumerWebPart.prototype.WaitForDynamicDataPropertyPane = function () {
        return TAB.MakeWaiter(function () {
            var propertyPane = TAB.GetElements(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            if (!!propertyPane && !!propertyPane[0]) {
                var sourceInput = TAB.GetElements(propertyPane[0], TAB.searchBy.tag, 'input'); // tslint:disable-line:max-line-length
                return !!sourceInput && !!sourceInput[0];
            }
            return false;
        });
    };
    DynamicDataConsumerWebPart.prototype.WaitForDynamicDataRendering = function () {
        var _this = this;
        return TAB.AndWaiters(_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'dynamicDataValue'), TAB.MakeWaiter(function () {
            return !!_this.GetDynamicDataValue();
        }));
    };
    DynamicDataConsumerWebPart.prototype.GetDynamicDataValue = function () {
        var element = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win, 'dynamicDataValue'); // tslint:disable-line:max-line-length no-any
        return element ? element.textContent : undefined;
    };
    return DynamicDataConsumerWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_3__["BaseWebpart"]));



/***/ }),

/***/ "FRLz":
/*!***********************************************!*\
  !*** ./lib/SPTaskLib/Utilities/PageAnchor.js ***!
  \***********************************************/
/*! exports provided: PageAnchor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageAnchor", function() { return PageAnchor; });
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Controls_RTEWebPart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Controls/RTEWebPart */ "mXly");


/**
 * @public
 */
var PageAnchor = /** @class */ (function () {
    function PageAnchor() {
    }
    PageAnchor.addTaskAddHeadingTextToPage = function (text, ariaLevel) {
        TAB.MakeTask(function () {
            TAB.Log.Comment("Create text web part and insert h" + ariaLevel + " text inside.");
            var rteWebPart = new _Controls_RTEWebPart__WEBPACK_IMPORTED_MODULE_1__["RTEWebPart"]();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].AddTaskCreateWebPart(rteWebPart);
            rteWebPart.AddTaskToAddTextInRTE(text);
            rteWebPart.AddTaskToSelectTextInRTE(0, text.length);
            rteWebPart.AddTaskToClickOnFormattingBarButton("h" + ariaLevel + "-button", "h" + ariaLevel);
        }).WaitFor(undefined);
    };
    PageAnchor.addTaskTestClickAnchorsOfAllHeadings = function () {
        TAB.MakeTask(function () {
            TAB.Log.Comment("Click anchors of all headings on page and check if they are scrolled into view.");
            var anchoredHeadings = PageAnchor.getHeadingElements();
            anchoredHeadings.forEach(function (heading) {
                PageAnchor.addTaskClickAnchorIconOfHeading(heading);
            });
        }).WaitFor(undefined);
    };
    PageAnchor.addTaskClickAnchorIconOfHeading = function (headingElement) {
        TAB.MakeTask(function () {
            TAB.Log.Comment('Test clicking anchored element.');
            var anchorElement = TAB.GetElement(headingElement, TAB.searchBy.tag, 'a[data-sp-anchor-id]');
            if (!anchorElement) {
                throw 'No anchor icon is generated inside the heading element.';
            }
            TAB.ClickElement(anchorElement);
        })
            .WaitFor(PageAnchor._inViewPort());
    };
    PageAnchor.addTaskScrollPageDownBy = function (amountInPixel) {
        TAB.MakeTask(function () {
            TAB.Log.Comment("Scroll page body down by " + amountInPixel + " pixels.");
            var scrollableBody = PageAnchor._getPageScrollableBody();
            if (!scrollableBody) {
                throw 'Fail to get scrollable page body.';
            }
            scrollableBody.scrollBy(0, amountInPixel);
        });
    };
    PageAnchor.anchorFromPageUrlInViewPort = function () {
        return TAB.MakeWaiter(function () {
            var pageUrl = TAB.Win.location.href;
            var fragmentIndex = pageUrl.indexOf('#');
            if (!fragmentIndex) {
                return false;
            }
            var fragment = decodeURIComponent(pageUrl.substring(fragmentIndex + 1));
            try {
                var anchoredHeading = PageAnchor._getAnchorByAnchorId(fragment).parentElement;
                return PageAnchor._isElementInViewPort(anchoredHeading);
            }
            catch (error) {
                return false;
            }
        });
    };
    PageAnchor.anchorsReady = function (count) {
        return TAB.MakeWaiter(function () {
            var anchorElements = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[data-sp-anchor-id]');
            return anchorElements.length === count;
        });
    };
    PageAnchor.getHeadingElements = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="textBox"] h2, [data-automation-id="textBox"] h3, [data-automation-id="textBox"] h4');
    };
    PageAnchor._inViewPort = function () {
        return TAB.MakeWaiter(function () {
            var anchorId = TAB.Win.window.location.href.split('#')[1];
            var elements = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-sp-anchor-id=\"" + anchorId + "\"]");
            if (elements.length === 0) {
                return false;
            }
            return PageAnchor._isElementInViewPort(elements[0].parentElement);
        });
    };
    PageAnchor._getAnchorByAnchorId = function (anchorId) {
        try {
            return TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-sp-anchor-id = \"" + anchorId + "\"]");
        }
        catch (error) {
            return undefined;
        }
    };
    PageAnchor._isElementInViewPort = function (element) {
        var scrollableParent = PageAnchor._getPageScrollableBody();
        if (!scrollableParent) {
            return false;
        }
        var elementRect = element.getBoundingClientRect();
        var parentRect = scrollableParent.getBoundingClientRect();
        var belowTopOfScroll = elementRect.top >= parentRect.top;
        var aboveBottomOfScroll = elementRect.top < (parentRect.top + parentRect.height);
        return belowTopOfScroll && aboveBottomOfScroll;
    };
    PageAnchor._getPageScrollableBody = function () {
        try {
            return TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-is-scrollable = "true"]');
        }
        catch (error) {
            return undefined;
        }
    };
    return PageAnchor;
}());



/***/ }),

/***/ "FSRG":
/*!***************************************!*\
  !*** ./lib/SPTaskLib/GroupLibrary.js ***!
  \***************************************/
/*! exports provided: Group */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return Group; });
/* harmony import */ var _CsomUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CsomUtil */ "UXDa");
/* harmony import */ var _WebLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WebLibrary */ "Ckxo");
/* harmony import */ var _PageUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PageUtil */ "jK1H");



/**
 * @public
 */
var Group = /** @class */ (function () {
    function Group() {
    }
    /**
     * Creates a Group site
     * Ported from SPORel //depot/devmainoverride/sporel/sptasklib/Browser/Libraries/groupslibrary.jss
     */
    Group.AddCsomTaskCreateGroup = function (serverUrl, groupAlias, groupDisplayName, handler, groupDescription, groupPictureUrl, groupMemberIds, groupOwnersIds, isPublic, ignoreCommitFailure) {
        var group;
        var createGroup = function () {
            var clientContext = new SP.ClientContext(serverUrl);
            var session = new SP.Directory.DirectorySession(clientContext);
            group = session.createGroup();
            group.set_alias(groupAlias);
            group.set_principalName(groupAlias);
            group.set_displayName(groupDisplayName);
            // Because isPublic is a boolean, check for undefined and undefined explicitly
            if (typeof (isPublic) !== 'undefined' && isPublic !== undefined) {
                group.set_isPublic(isPublic);
            }
            if (groupDescription) {
                group.set_description(groupDescription);
            }
            if (groupMemberIds) {
                for (var i = 0; i < groupMemberIds.length; i++) {
                    group.get_members().add(groupMemberIds[i].get_value());
                }
            }
            if (groupOwnersIds) {
                for (var i = 0; i < groupOwnersIds.length; i++) {
                    group.get_owners().add(groupOwnersIds[i].get_value());
                }
            }
            group.commit(true);
            clientContext.load(group);
            clientContext.load(group.get_members());
            clientContext.load(group.get_owners());
            return clientContext;
        };
        var onSucceededCreateGroup = function () {
            if (group && group.get_alias() === groupAlias) {
                TAB.Log.Comment("Group with the alias: " + groupAlias + " is created.");
                handler(group);
            }
            else {
                TAB.Log.Fail('Group creation via CSOM failed.');
            }
        };
        var onFailedCreateGroup = function (sender, args) {
            TAB.Log.Fail("Group creation via CSOM failed: " + args.get_message());
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_0__["Csom"].AddTask(createGroup, onSucceededCreateGroup, onFailedCreateGroup);
    };
    /**
     * Checks for the existence of a group with the given alias and sets result.groupExists to true or false accordingly.
     * Ported with modifications from SPORel //depot/devmainoverride/sporel/sptasklib/Browser/Libraries/groupslibrary.jss
     */
    Group.AddCsomTaskVerifyGroupCreated = function (serverUrl, groupAlias, result) {
        var exists;
        var verifyGroupExists = function () {
            var clientContext = new SP.ClientContext(serverUrl);
            var session = new SP.Directory.DirectorySession(clientContext);
            exists = session.groupExists('Alias', groupAlias);
            return clientContext;
        };
        var onSuccessVerifyGroupExists = function () {
            if (exists.get_value()) {
                TAB.Log.Comment("Group with the name: " + groupAlias + " exists");
                result.groupExists = true;
            }
            else {
                TAB.Log.Comment("Group with the name: " + groupAlias + " does not exist");
                result.groupExists = false;
            }
        };
        var onFailureVerifyGroupExists = function (sender, args) {
            TAB.Log.Comment("VerifyGroupExists: Cannot verify group exists using CSOM: " + args.get_message());
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_0__["Csom"].AddTask(verifyGroupExists, onSuccessVerifyGroupExists, onFailureVerifyGroupExists);
    };
    Group.AddCsomTaskRemoveGroup = function (serverUrl, groupId) {
        var removeGroup = function () {
            var clientContext = new SP.ClientContext(serverUrl);
            var session = new SP.Directory.DirectorySession(clientContext);
            session.removeGroup(groupId);
            return clientContext;
        };
        var onSucceededRemoveGroup = function () {
            TAB.Log.Comment("Successfully removed group with Id: " + groupId);
        };
        var onFailedRemoveGroup = function (sender, args) {
            TAB.Log.Fail("Failed to remove group with Id: " + groupId + ": " + args.get_message() + ", stack: " + args.get_stackTrace());
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_0__["Csom"].AddTask(removeGroup, onSucceededRemoveGroup, onFailedRemoveGroup);
    };
    Group.AddCsomTaskGetUserIds = function (userLoginNames, callback, failedCallback) {
        var userIds = new Array(userLoginNames.length);
        var getUserIds = function () {
            var clientContext = new SP.ClientContext(TAB.Settings.Get('ProductServer'));
            var session = new SP.Directory.DirectorySession(clientContext);
            for (var i = 0; i < userLoginNames.length; i++) {
                userIds[i] = session.getUserId('PrincipalName', userLoginNames[i]);
            }
            return clientContext;
        };
        var onSuccessGetUserIds = function () {
            for (var i = 0; i < userIds.length; i++) {
                TAB.Log.Verify(userIds[i] !== undefined && userIds[i].get_value() !== undefined && SP.Guid.get_empty().toString('B') !== (userIds[i].get_value().toString('B')), 'Verifying valid user id is found for user: ' + userLoginNames[i]);
            }
            callback(userIds);
        };
        var onFailureGetUserIds = function (sender, args) {
            if (!failedCallback) {
                TAB.Log.Fail('GetUserIds: Cannot get user ids using CSOM: ' + args.get_message());
            }
            else {
                failedCallback();
            }
        };
        _CsomUtil__WEBPACK_IMPORTED_MODULE_0__["Csom"].AddTask(getUserIds, onSuccessGetUserIds, onFailureGetUserIds);
    };
    Group.TestGroupSetup = function (groupCreationParams) {
        var _this = this;
        // Check if the test group site exists. If not, create it. Otherwise, use the existing site.
        TAB.Log.AddTaskComment("Checking if the test group with alias '" + groupCreationParams.groupAlias + "' exists.");
        var groupExistsResult = {
            groupExists: undefined
        };
        Group.AddCsomTaskVerifyGroupCreated(groupCreationParams.serverUrl, groupCreationParams.groupAlias, groupExistsResult);
        TAB.AddTask(TAB.MakeTask(function () {
            if (groupExistsResult.groupExists || groupExistsResult.groupExists === undefined) {
                // If the group was confirmed to exist or the verification failed to determine existence, assume the group exists.
                // Unfortunately, AddCsomTaskVerifyGroupCreated can be flaky, but the most likely case is that the group exists.
                // groupExistsResult.groupExists will be true if group exists, false if group does not exist, undefined if failed to determine.
                TAB.Log.AddTaskComment("Using existing test group with alias '" + groupCreationParams.groupAlias + "'.");
                _this._addTaskUseExistingTestGroup(groupCreationParams);
            }
            else {
                // Provisioning a new group site can take awhile, so increase the timeout if we need to do that, and the group is only created
                // in the first test run while in a new environment.
                TAB.SetWaitTime(2 * 60 * 1000); // 2 minute timeout
                TAB.Log.AddTaskComment("Creating test group with alias '" + groupCreationParams.groupAlias + "'.");
                _this._addTaskCreateNewTestGroup(groupCreationParams);
            }
        }));
    };
    /**
     * This method checks AAD service availability thougth a simple csom call AddCsomTaskGetUserIds, if the user ids is obtained,
     * then AAD service available, otherwise, it's not available.
     * @param result - AAD service validation result, which contains isAADServiceAvailable and userIds.
     */
    Group.AddCsomTaskCheckAADServiceAvailability = function (result) {
        var userResult = {};
        var getUserIdsCallBack = function (foundMemberIds) {
            result.isAADServiceAvailable = true;
            result.userIds = foundMemberIds;
            TAB.Log.Pass('AAD Service is available.');
        };
        var getUserIdsFailedCallback = function () {
            result.isAADServiceAvailable = false;
            TAB.Log.AddTaskComment('AAD Service is not available.');
        };
        TAB.AddTask(TAB.MakeTask(function () {
            _WebLibrary__WEBPACK_IMPORTED_MODULE_1__["Web"].addCsomTaskGetCurrentUserFromWeb(userResult);
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            Group.AddCsomTaskGetUserIds([userResult.loginName], getUserIdsCallBack, getUserIdsFailedCallback);
        }));
    };
    Group._addTaskCreateNewTestGroup = function (groupCreationParams) {
        _PageUtil__WEBPACK_IMPORTED_MODULE_2__["PageUtil"].SetDebugManifests();
        var group = undefined;
        var groupSiteURL = undefined;
        var createGroupHandler = function (createdGroup) {
            group = createdGroup;
        };
        TAB.AddTask(TAB.MakeTask(function () {
            Group.AddCsomTaskCreateGroup(groupCreationParams.serverUrl, groupCreationParams.groupAlias, groupCreationParams.groupDisplayName, createGroupHandler, undefined, undefined, groupCreationParams.userIds);
        }));
        // Wait for group site to finish provisioning
        // Group id will return immediately, but site URL should not be made available until group site is ready
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                groupSiteURL = group.get_siteUrl();
                return Boolean(groupSiteURL);
            }
            catch (e) {
                return false;
            }
        }));
        // Navigate to the new group
        // Put this inside a task so groupSiteURL is not evaluated too soon
        TAB.AddTask(TAB.LoadPage(groupSiteURL), TAB.PageReady());
    };
    Group._addTaskUseExistingTestGroup = function (groupCreationParams) {
        _PageUtil__WEBPACK_IMPORTED_MODULE_2__["PageUtil"].SetDebugManifests();
        var groupUrl = groupCreationParams.serverUrl + "/sites/" + groupCreationParams.groupAlias;
        TAB.AddTask(TAB.LoadPage(groupUrl), TAB.PageReady());
    };
    return Group;
}());



/***/ }),

/***/ "H50h":
/*!******************************************!*\
  !*** ./lib/SPTaskLib/Utilities/index.js ***!
  \******************************************/
/*! exports provided: ClientFeatures, PageAnchor, ReactTriggerChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ClientFeatures__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ClientFeatures */ "zTnS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClientFeatures", function() { return _ClientFeatures__WEBPACK_IMPORTED_MODULE_0__["ClientFeatures"]; });

/* harmony import */ var _PageAnchor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageAnchor */ "FRLz");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageAnchor", function() { return _PageAnchor__WEBPACK_IMPORTED_MODULE_1__["PageAnchor"]; });

/* harmony import */ var _ReactTriggerChange__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReactTriggerChange */ "dp3n");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReactTriggerChange", function() { return _ReactTriggerChange__WEBPACK_IMPORTED_MODULE_2__["ReactTriggerChange"]; });






/***/ }),

/***/ "HRpY":
/*!**************************************************!*\
  !*** ./lib/SPTaskLib/Controls/TwitterWebPart.js ***!
  \**************************************************/
/*! exports provided: TwitterWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TwitterWebPart", function() { return TwitterWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var TwitterWebPart = /** @class */ (function (_super) {
    __extends(TwitterWebPart, _super);
    function TwitterWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Twitter, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Twitter.toString()) || this;
    }
    TwitterWebPart.prototype.AddTaskAddWebPartOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(TAB.MakeWaiter(function () { return (TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'twitterWidget') &&
            TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="twitter-term-field"]')); }));
    };
    TwitterWebPart.prototype.AddTaskChangeTermToInvalidValue = function () {
        var _this = this;
        TAB.MakeTask(function () {
            // todo: remove setTimeout when this bug:https://onedrive.visualstudio.com/SPPPlat/_workitems/edit/669027 is resolved
            // use setTimeout to wait for property pane reRender complete
            // as propertypane will reRender unnecessarily for several times
            setTimeout(function () {
                var termTextArea = _this._getTwitterPropertyPaneTextAreaByIndex(0);
                _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(termTextArea, 'abcd');
            }, 3000);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="invalidTweetSource"]'));
    };
    TwitterWebPart.prototype.AddTaskChangeTermToProfileValue = function (profileName) {
        var _this = this;
        TAB.MakeTask(function () {
            var termTextArea = _this._getTwitterPropertyPaneTextAreaByIndex(0);
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(termTextArea, '@' + profileName);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[data-widget-id="profile:' + profileName + '"]'));
    };
    TwitterWebPart.prototype.AddTaskChangeMaxTweetsNumberToInvalidValue = function () {
        var _this = this;
        TAB.MakeTask(function () {
            // todo: remove setTimeout when this bug:https://onedrive.visualstudio.com/SPPPlat/_workitems/edit/669027 is resolved
            // use setTimeout to wait for property pane reRender complete
            // as propertypane will reRender unnecessarily for several times
            setTimeout(function () {
                var numbetTextArea = _this._getTwitterPropertyPaneTextAreaByIndex(5);
                _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(numbetTextArea, '-1');
            }, 3000);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="error-message"]'));
    };
    TwitterWebPart.prototype._getTwitterPropertyPaneTextAreaByIndex = function (index) {
        var twitterPropertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class^="spPropertyPaneContainer"]');
        var twitterPropertyPaneGroupField = TAB.GetElements(twitterPropertyPane, TAB.searchBy.customQuery, '[class*="propertyPaneGroupField"]')[index];
        var twitterPropertyPaneTextArea = TAB.GetElements(twitterPropertyPaneGroupField, TAB.searchBy.partialClassName, 'ms-TextField-field')[1];
        return twitterPropertyPaneTextArea;
    };
    return TwitterWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "HZDx":
/*!*******************************************************!*\
  !*** ./lib/SPTaskLib/Controls/SiteActivityWebPart.js ***!
  \*******************************************************/
/*! exports provided: SiteActivityWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SiteActivityWebPart", function() { return SiteActivityWebPart; });
/* harmony import */ var _BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseCollectionWebPart */ "kQju");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * @public
 */
var SiteActivityWebPart = /** @class */ (function (_super) {
    __extends(SiteActivityWebPart, _super);
    function SiteActivityWebPart() {
        var _this = _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].SiteActivity, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].SiteActivity.toString()) || this;
        _this.SEE_ALL = 'See all';
        return _this;
    }
    SiteActivityWebPart.prototype.AddTaskBindActivityWebPart = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Waiting for siteActivity class to exist');
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'siteActivity'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Looking for Activity web part');
            var webParts = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ControlZone');
            for (var _i = 0, webParts_1 = webParts; _i < webParts_1.length; _i++) {
                var webPart = webParts_1[_i];
                var header = TAB.GetElement(webPart, TAB.searchBy.partialClassName, 'webPartHeader');
                var headerText = TAB.GetTextContent(header);
                if (headerText.indexOf('Activity') > -1) {
                    _this._activityWebPart = webPart;
                    TAB.Log.Comment('Activity web part found');
                    break;
                }
            }
            if (!_this._activityWebPart) {
                TAB.Log.Fail('Could not find Activity web part');
            }
        }));
    };
    SiteActivityWebPart.prototype.AddTaskBindSeeAllActivity = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Finding webPartCointainer in "See all" page');
            var webParts = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'webPartContainer');
            if (webParts.length === 1) {
                TAB.Log.Pass('Only Activity web part is displayed on "See all" page');
                _this._seeAllActivityWebPart = webParts[0];
            }
            else {
                TAB.Log.Fail('More than one web part found on "See all" page');
            }
        }));
    };
    SiteActivityWebPart.prototype.AddTaskFindSeeAllLink = function (result) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Looking for "See all" link');
            var links = TAB.GetElements(_this._activityWebPart, TAB.searchBy.tag, 'a');
            if (links && links.length > 0) {
                var linkText = TAB.GetTextContent(links[0]);
                if (linkText === _this.SEE_ALL) {
                    result.success = true;
                    _this._seeAllLink = links[0];
                    TAB.Log.Pass("\"" + _this.SEE_ALL + "\" link found");
                }
            }
        }));
    };
    SiteActivityWebPart.prototype.AddTaskLoadSeeAllPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Navigating to "See all" page');
            TAB.AddTask(TAB.LoadPage(_this._seeAllLink.href), TAB.PageReady());
        }));
        TAB.Log.AddTaskComment("Waiting for 'ms-List-cell' and 'webPartContainer' classes to exist");
        TAB.AddTask(undefined, TAB.AndWaiters(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.className, 'ms-List-cell'), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'webPartContainer')));
    };
    SiteActivityWebPart.prototype.AddTaskVerifyNoSeeAllLink = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var text = TAB.GetTextContent(_this._seeAllActivityWebPart);
            TAB.Log.Verify(text.indexOf(_this.SEE_ALL) === -1, '"See all" page does not contain "See all" link');
        }));
    };
    SiteActivityWebPart.prototype.AddTaskVerifyRecentActivity = function (filename, siteUrl) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Verifying recent activity');
            var cards = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-DocumentCardTile-titleArea');
            var doc;
            for (var _i = 0, cards_1 = cards; _i < cards_1.length; _i++) {
                var card = cards_1[_i];
                if (TAB.GetTextContent(card).indexOf(filename) > -1) {
                    doc = card;
                    break;
                }
            }
            if (doc) {
                _this._verifyRecentActivityText(doc, filename, siteUrl);
            }
            else {
                TAB.Log.Fail('Recently uploaded document not found');
            }
        }));
    };
    SiteActivityWebPart.prototype.AddTaskWaitForSeeAll = function () {
        TAB.Log.AddTaskComment('Waiting for "See all" link to appear');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var webParts = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ControlZone');
            for (var _i = 0, webParts_2 = webParts; _i < webParts_2.length; _i++) {
                var webPart = webParts_2[_i];
                var header = TAB.GetElements(webPart, TAB.searchBy.partialClassName, 'webPartHeader');
                if (header.length > 0) {
                    var headerText = TAB.GetTextContent(header[0]);
                    if (headerText.indexOf('See all') > -1) {
                        return true;
                    }
                }
            }
        }));
    };
    SiteActivityWebPart.prototype._verifyRecentActivityText = function (doc, docName, siteUrl) {
        TAB.Log.Pass('Recently edited document found');
        var link = TAB.GetElement(doc, TAB.searchBy.tag, 'a');
        var href = decodeURI(link.getAttribute('href'));
        var expectedHref = siteUrl + '/Shared Documents';
        TAB.Log.VerifyEquals(href, expectedHref, 'Activity card contains link to Shared Documents');
        var titleElement = TAB.GetElement(doc, TAB.searchBy.hasClassName, 'ms-DocumentCardTitle');
        var title = titleElement.getAttribute('title');
        TAB.Log.VerifyEquals(title, docName, 'Activity card has correct title for recently edited doc');
    };
    return SiteActivityWebPart;
}(_BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__["BaseCollectionWebPart"]));



/***/ }),

/***/ "IfeM":
/*!************************************!*\
  !*** ./lib/SPTaskLib/SpaceUtil.js ***!
  \************************************/
/*! exports provided: areVectorsEqual, SpaceUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areVectorsEqual", function() { return areVectorsEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpaceUtil", function() { return SpaceUtil; });
/* harmony import */ var _SPFlightUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SPFlightUtil */ "i6xm");
/* harmony import */ var _PageUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PageUtil */ "jK1H");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Next */ "BJbA");
/**
 * @copyright Microsoft Corporation. All rights reserved.
 *
 */



/**
 * @public
 */
function areVectorsEqual(a, b, precision) {
    if (precision === void 0) { precision = 0.001; }
    return Math.abs(a.x - b.x) < precision
        && Math.abs(a.y - b.y) < precision
        && Math.abs(a.z - b.z) < precision;
}
/**
 * @public
 */
var SpaceUtil = /** @class */ (function () {
    function SpaceUtil() {
    }
    /**
     * Executes a series of tasks to create a test site with the given name and navigates to it.
     *
     * This method also validates if the site already exists, and if so method will only navigate to the
     * existing site.
     * @param siteName - Website name to use
     * @param serverUrl - Server URL where the test is executing
     */
    SpaceUtil.CreateTestSite = function (siteName, serverUrl) {
        var _this = this;
        TAB.Log.AddTaskComment("Attempting to load site " + siteName + " on server " + serverUrl);
        var pageUrl = serverUrl + '/sites/' + siteName + '/SitePages/Home.aspx';
        TAB.AddTask(TAB.LoadPage(pageUrl), this._elementExistsOrTimeoutWaiter(this.newButton));
        TAB.AddTask(TAB.MakeTask(function () {
            if (_this._elementExists(_this.newButton)) {
                TAB.Log.AddTaskComment('Site loaded. Checking if Spaces enabled.');
                _this._addTaskClickNewButton(); // open the new item dropdown to see if new space button is there
                TAB.AddTask(TAB.MakeTask(function () {
                    if (!_this._elementExists(_this.newSpaceButton)) {
                        TAB.Log.AddTaskComment('Spaces feature is not enabled.');
                        _this._enableSpacesFeatureAndReload();
                    }
                    else {
                        TAB.Log.AddTaskComment('Spaces feature is enabled.');
                        _this._addTaskClickElement(_this.newButton); // close the dropdown
                    }
                }));
            }
            else if (!_PageUtil__WEBPACK_IMPORTED_MODULE_1__["PageUtil"].IsSPPageReady()) {
                TAB.Log.AddTaskComment('Site does not exist. Attempting to create.');
                _PageUtil__WEBPACK_IMPORTED_MODULE_1__["PageUtil"].AddTaskCreateSetupCommunicationSite(serverUrl, siteName);
                _this._enableSpacesFeatureAndReload();
            }
            else {
                TAB.Log.AddTaskDidNotRun('New item dropdown does not exist.');
            }
        }));
    };
    /**
     * Executes a series of steps to create a space with the given name.
     *
     * If this method terminates successfully, the Scene and AutomationRegistry fields of this
     * class will be populated.
     * @param spaceName - Name to use for space creation
     */
    SpaceUtil.CreateSpace = function (spaceName) {
        var _this = this;
        this._addTaskClickNewButton();
        TAB.AddTask(TAB.MakeTask(function () {
            if (!_this._elementExists(_this.newSpaceButton)) {
                var spmFlightId = 48;
                if (_SPFlightUtil__WEBPACK_IMPORTED_MODULE_0__["SPFlightUtil"].isEnabled(spmFlightId)) {
                    TAB.Log.AddTaskFail('New space button not found - Test Failed.');
                }
                else {
                    TAB.Log.AddTaskComment('Space button does not exist, and account is not in SPMR flight. Test Passed.');
                    TAB.Log.AddTaskDidNotRun('User not in flight - exiting test');
                }
            }
        }));
        this._addTaskClickElement(this.newSpaceButton, this._waitForElement(this.createSpaceFinishButton));
        this._addTaskEnterText(this.spaceNameTextField, spaceName, 100);
        this._addTaskClickElement(this.createSpaceFinishButton, TAB.AndWaiters(this._waitForElement(this.pagePublishButton), this._waitForSceneLoad()));
    };
    /**
     * Executes a series of steps to add a web part to an existing scene
     *
     * This method assumes that the test is currently on a Space and the
     * page is in Edit mode.
     * @param type - the type of web part to add
     * @param verifyPredicate - an optional predicate to verify that the web part was added
     */
    SpaceUtil.AddWebPart = function (type, verifyPredicate) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            if (!_this.AutomationRegistry) {
                TAB.Log.AddTaskFail('Cannot add web part - automation registry does not exist.');
            }
        }));
        this._addTaskClickAddWebPartButton();
        this._addTaskClickWebPartInToolbox(type);
        this._addTaskAddWebPartOnCanvas(verifyPredicate);
    };
    /**
     * Uses the transform bar to configure a webpart's transform.
     *
     * This method assumes that the webpart is currently selected.
     * @param transform - the fields of the webpart transform
     */
    SpaceUtil.SetWebPartTransform = function (transform, expectScaleInput) {
        var _this = this;
        if (expectScaleInput === void 0) { expectScaleInput = true; }
        TAB.AddTask(TAB.MakeTask(function () {
            var transformXZRotation = _SPFlightUtil__WEBPACK_IMPORTED_MODULE_0__["SPFlightUtil"].isEnabled(1348);
            var expectedInputs = (transformXZRotation ? 6 : 4) + (expectScaleInput ? 1 : 0);
            var transformBar = TAB.GetElement(TAB.Win.document, TAB.searchBy.id, 'TransformBar');
            var transformInputs = TAB.GetElements(transformBar, TAB.searchBy.partialClassName, _this.transformInputClassName);
            if (transformInputs.length === expectedInputs) {
                if (transform.angle !== undefined) {
                    TAB.Log.AddTaskComment("Setting angle transform to " + transform.angle);
                    _this._addTaskEnterText(transformInputs[0], transform.angle.toString());
                }
                if (transform.distance !== undefined) {
                    TAB.Log.AddTaskComment("Setting distance transform to " + transform.distance);
                    _this._addTaskEnterText(transformInputs[1], transform.distance.toString());
                }
                if (transform.height !== undefined) {
                    TAB.Log.AddTaskComment("Setting height transform to " + transform.height);
                    _this._addTaskEnterText(transformInputs[2], transform.height.toString());
                }
                if (transform.scale !== undefined) {
                    TAB.Log.AddTaskComment("Setting scale transform to " + transform.scale);
                    _this._addTaskEnterText(transformInputs[transformInputs.length - 1], transform.scale.toString());
                }
                if (transform.rotationY !== undefined) {
                    TAB.Log.AddTaskComment("Setting Y rotation transform to " + transform.rotationY);
                    var inputFieldIndex = transformXZRotation ? 4 : 3;
                    _this._addTaskEnterText(transformInputs[inputFieldIndex], transform.rotationY.toString());
                }
                if (transformXZRotation) {
                    if (transform.rotationX !== undefined) {
                        TAB.Log.AddTaskComment("Setting X rotation transform to " + transform.rotationX);
                        _this._addTaskEnterText(transformInputs[3], transform.rotationX.toString());
                    }
                    if (transform.rotationZ !== undefined) {
                        TAB.Log.AddTaskComment("Setting Z rotation transform to " + transform.rotationZ);
                        _this._addTaskEnterText(transformInputs[5], transform.rotationZ.toString());
                    }
                }
                else if (transform.rotationX || transform.rotationZ) {
                    TAB.Log.AddTaskWarning('X and Z rotation requested but flight is not enabled.');
                }
            }
            else {
                TAB.Log.AddTaskFail("Found " + transformInputs.length + " spin buttons. Expected " + expectedInputs + " in transform bar");
            }
        }));
    };
    SpaceUtil.ClickPublish = function () {
        this._addTaskClickElement(this.pagePublishButton, this._waitForElement(this.pageEditButton));
    };
    SpaceUtil.ReloadSpace = function () {
        TAB.AddTask(TAB.ReloadPage(), TAB.AndWaiters(this._waitForElement(this.pageEditButton), this._waitForSceneLoad()));
    };
    /**
     * Creates a Waiter that completes after a fixed timeout.
     * @param timeout - the time in milliseconds to wait
     */
    SpaceUtil.TimedWait = function (timeout) {
        var startTime;
        return TAB.MakeWaiter(function () {
            if (!startTime) {
                startTime = Date.now();
            }
            return Date.now() - startTime > timeout;
        });
    };
    SpaceUtil._enableSpacesFeatureAndReload = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Invoking API to enable Spaces feature.');
        TAB.AddTask(TAB.MakeTask(function () {
            var siteUrl = TAB.Win.location.href;
            if (siteUrl.endsWith('.aspx')) {
                siteUrl = siteUrl.slice(0, siteUrl.lastIndexOf('/SitePages/'));
            }
            var contextInfoRequest = new XMLHttpRequest();
            contextInfoRequest.open('POST', siteUrl + '/_api/contextinfo', false);
            contextInfoRequest.setRequestHeader('Content-Type', 'application/json;odata=verbose');
            contextInfoRequest.setRequestHeader('Accept', 'application/json; odata = verbose');
            contextInfoRequest.send();
            // tslint:disable-next-line:no-any
            var responseData = JSON.parse(contextInfoRequest.responseText);
            var formDigestValue = responseData.d.GetContextWebInformation.FormDigestValue;
            var xhr = new XMLHttpRequest();
            xhr.open('POST', siteUrl + "/_api/web/features/add(guid'2AC9C540-6DB4-4155-892C-3273957F1926')", false);
            xhr.setRequestHeader('x-requestdigest', formDigestValue);
            xhr.setRequestHeader('Content-Type', 'application/json; odata.metadata=minimal');
            xhr.setRequestHeader('Accept', '*/*, application/json; odata.metadata=minimal');
            xhr.setRequestHeader('odata-version', '4.0');
            xhr.send();
            // tslint:disable-next-line:no-any
            var response = JSON.parse(xhr.responseText);
            if (response.error) {
                if (response.error.code.endsWith('DuplicateNameException')) {
                    TAB.Log.AddTaskComment('Spaces feature already activated - commencing test.');
                }
                else { // Service failed to activate feature
                    TAB.Log.AddTaskDidNotRun('Unable to activate SharePoint Spaces feature - could not run Spaces tab test');
                }
            }
            else {
                TAB.Log.AddTaskComment('Activated SharePoint Spaces feature. Reloading.');
                TAB.AddTask(TAB.ReloadPage(), _this._waitForElement(_this.newButton));
            }
        }));
    };
    SpaceUtil._addTaskClickNewButton = function () {
        var newSpaceButtonWaitMax = 10000; // 10 seconds
        this._addTaskClickElement(this.newButton, this._elementExistsOrTimeoutWaiter(this.newSpaceButton, newSpaceButtonWaitMax));
    };
    SpaceUtil._elementExistsOrTimeoutWaiter = function (dataAutomationId, timeout) {
        if (timeout === void 0) { timeout = 20000; }
        return TAB.OrWaiters(this._waitForElement(dataAutomationId), this.TimedWait(timeout));
    };
    SpaceUtil._addTaskEnterText = function (inputOrQuery, text, delay) {
        var _this = this;
        if (delay === void 0) { delay = 2000; }
        TAB.AddTask(TAB.MakeTask(function () {
            var input = (typeof inputOrQuery === 'string'
                ? _this._getElement(inputOrQuery)
                : inputOrQuery);
            TAB.AddTask(TAB.MakeTask(function () {
                var focusEv = TAB.Win.document.createEvent('HTMLEvents');
                focusEv.initEvent('focus', true /*bubble*/, false /*cancelable*/);
                input.dispatchEvent(focusEv);
            }), _this.TimedWait(delay));
            TAB.AddTask(TAB.MakeTask(function () {
                input.value = text;
            }), _this.TimedWait(delay));
            TAB.AddTask(TAB.MakeTask(function () {
                var ev = TAB.Win.document.createEvent('HTMLEvents');
                ev.initEvent('input', true /*bubble*/, false /*cancelable*/);
                input.dispatchEvent(ev);
            }), _this.TimedWait(delay));
            TAB.AddTask(TAB.MakeTask(function () {
                // press Enter
                TAB.FireKeyboardEvent(input, 'keydown', 13);
            }), _this.TimedWait(delay));
            TAB.AddTask(TAB.MakeTask(function () {
                var blurEv = TAB.Win.document.createEvent('HTMLEvents');
                blurEv.initEvent('blur', true /*bubble*/, false /*cancelable*/);
                input.dispatchEvent(blurEv);
            }), _this.TimedWait(delay));
        }));
    };
    SpaceUtil._waitForSceneLoad = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            // tslint:disable-next-line:no-any
            var window = TAB.Win.window;
            if (window && window.BABYLON && window.BABYLON.Engine) {
                var scene = window.BABYLON.Engine.LastCreatedScene;
                if (scene
                    && scene.meshes
                    && scene.meshes.length > 0
                    && scene.__automationRegistry__
                    && scene.__automationRegistry__.exists('plusClick')) {
                    TAB.Log.Comment('Context found - Total Meshes: ' + scene.meshes.length);
                    _this.Scene = scene;
                    _this.AutomationRegistry = scene.__automationRegistry__;
                    return true;
                }
            }
            return false;
        });
    };
    SpaceUtil._addTaskClickAddWebPartButton = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Clicking add button');
        TAB.AddTask(TAB.MakeTask(function () {
            _this.AutomationRegistry.execute('plusClick');
        }), this._waitForElement(this.webPartToolbox));
    };
    SpaceUtil._addTaskClickWebPartInToolbox = function (type) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var textWebPartButtons = [];
            TAB.Log.AddTaskComment('Waiting for web part button.');
            TAB.AddTask(undefined, TAB.MakeWaiter(function () {
                textWebPartButtons = _this._getElements(type);
                if (textWebPartButtons.length === 1) {
                    return true;
                }
                else if (textWebPartButtons.length > 1) {
                    TAB.Log.AddTaskFail('Duplicate web parts found - test failed.');
                }
                return false;
            }));
            TAB.AddTask(TAB.MakeTask(function () {
                TAB.Log.Comment('Clicking web part button.');
                TAB.ClickElement(textWebPartButtons[0]);
                TAB.Log.Comment('Button clicked!');
            }));
        }));
    };
    SpaceUtil._addTaskAddWebPartOnCanvas = function (waitPredicate) {
        var _this = this;
        var waiter = waitPredicate ? waitPredicate : function () { return true; };
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Starting drag action');
            _this.AutomationRegistry.execute('dragStart');
            TAB.Log.Comment('Continuing drag');
            _this.AutomationRegistry.execute('drag');
            TAB.Log.Comment('Ending drag');
            _this.AutomationRegistry.execute('dragEnd');
            TAB.Log.Comment('Placement complete');
        }), TAB.MakeWaiter(waiter));
    };
    SpaceUtil._elementExists = function (dataAutomationId) {
        return this._getElement(dataAutomationId) !== undefined;
    };
    SpaceUtil._getElement = function (dataAutomationId) {
        return _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, dataAutomationId) || undefined;
    };
    SpaceUtil._getElements = function (dataAutomationId) {
        return _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementsByDataAutomationId(TAB.Win.document.body, dataAutomationId);
    };
    SpaceUtil._addTaskClickElement = function (dataAutomationId, waiter) {
        var _this = this;
        return TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Verbose("Looking for '" + dataAutomationId + "' element to click.");
            var element = _this._getElement(dataAutomationId);
            if (element) {
                TAB.Log.Verbose("Clicking '" + dataAutomationId + "'.");
                TAB.ClickElement(element);
                TAB.Log.Verbose("Clicked '" + dataAutomationId + "'.");
            }
            else {
                TAB.Log.AddTaskFail("Did not find '" + dataAutomationId + "' to click.");
            }
        }), waiter);
    };
    SpaceUtil._waitForElement = function (dataAutomationId) {
        return _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].WaitForElementsByDataAutomationId(TAB.Win.window, dataAutomationId);
    };
    SpaceUtil.newButton = 'pageCommandBarNewButton';
    SpaceUtil.newSpaceButton = 'NewSpaceInHome';
    SpaceUtil.createSpaceFinishButton = 'createSpaceFinishButton';
    SpaceUtil.spaceNameTextField = 'spaceNameField';
    SpaceUtil.pagePublishButton = 'pageCommandBarPublishButton';
    SpaceUtil.pageEditButton = 'pageCommandBarEditButton';
    SpaceUtil.webPartToolbox = 'toolbox-callout';
    SpaceUtil.transformInputClassName = 'ms-spinButton-input';
    return SpaceUtil;
}());



/***/ }),

/***/ "Ilgg":
/*!***************************************************!*\
  !*** ./lib/SPTaskLib/Controls/BingNewsWebPart.js ***!
  \***************************************************/
/*! exports provided: BingNewsWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BingNewsWebPart", function() { return BingNewsWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var BingNewsWebPart = /** @class */ (function (_super) {
    __extends(BingNewsWebPart, _super);
    function BingNewsWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].BingNews, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].BingNews.toString()) || this;
    }
    BingNewsWebPart.prototype.AddTaskAddWebPartOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _this._addTaskAssertWebPartNotExist();
            _this.AddTaskSetupNewPage();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[class^=\"BingNewsWebPartTitle\"]"));
    };
    BingNewsWebPart.prototype.AddTaskSearchNewsByEmptyCompanyAndEmptyTopic = function () {
        var _this = this;
        TAB.MakeTask(function () {
            var companyTextArea = _this._getBingNewsPropertyPaneTextAreaByIndex(0);
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(companyTextArea, '');
            var topicTextArea = _this._getBingNewsPropertyPaneTextAreaByIndex(1);
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(topicTextArea, '');
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'BingNewsEmptyCard'));
    };
    BingNewsWebPart.prototype.AddTaskSearchNewsByTopic = function () {
        var _this = this;
        TAB.MakeTask(function () {
            var companyTextArea = _this._getBingNewsPropertyPaneTextAreaByIndex(0);
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(companyTextArea, '');
            var topicTextArea = _this._getBingNewsPropertyPaneTextAreaByIndex(1);
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(topicTextArea, 'xBox');
        }).WaitFor(TAB.MakeWaiter(function () {
            var newsItems = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automationid=\"ListCell\"]");
            return newsItems && newsItems.length > 1;
        }));
    };
    BingNewsWebPart.prototype.AddTaskOpenBingNewsPropertyPane = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].SelectedWebpart.AddTaskClickConfigureButton();
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'propertyPaneGroupContent'));
    };
    BingNewsWebPart.prototype._addTaskAssertWebPartNotExist = function () {
        TAB.MakeTask(function () {
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class^="BingNewsWebPartTitle"]')) {
                throw 'Bing News web part should not exist.';
            }
        })
            .WaitFor(undefined);
    };
    BingNewsWebPart.prototype._getBingNewsPropertyPaneTextAreaByIndex = function (index) {
        var bingNewsPropertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class^="spPropertyPaneContainer"]');
        var bingNewsPropertyPaneGroupField = TAB.GetElements(bingNewsPropertyPane, TAB.searchBy.customQuery, '[class*="propertyPaneGroupField"]')[index];
        var bingNewsPropertyPaneTextArea = TAB.GetElements(bingNewsPropertyPaneGroupField, TAB.searchBy.partialClassName, 'ms-TextField-field')[1];
        return bingNewsPropertyPaneTextArea;
    };
    return BingNewsWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "Is2z":
/*!*******************************************************!*\
  !*** ./lib/SPTaskLib/Controls/RSSConnectorWebPart.js ***!
  \*******************************************************/
/*! exports provided: RSSConnectorWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RSSConnectorWebPart", function() { return RSSConnectorWebPart; });
/* harmony import */ var _ConnectorWebPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ConnectorWebPart */ "sQpn");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * @public
 */
var RSSConnectorWebPart = /** @class */ (function (_super) {
    __extends(RSSConnectorWebPart, _super);
    function RSSConnectorWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].RSSConnector, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].RSSConnector.toString()) || this;
    }
    return RSSConnectorWebPart;
}(_ConnectorWebPart__WEBPACK_IMPORTED_MODULE_0__["ConnectorWebPart"]));



/***/ }),

/***/ "JWtQ":
/*!**************************************!*\
  !*** ./lib/SPTaskLib/Pages/index.js ***!
  \**************************************/
/*! exports provided: HintType, Canvas, CanvasToolbox, ClassicPage, Comments, CommentsMention, Footer, HomeSite, SPHome, MegaMenu, OrganizationSiteDesign, PageSettingsPanel, PageTemplatesPanel, PromotePage, PropertyPane, Router, SocialBar, SiteDesignId, TeamSitePage, UndoRedo, Workbench, PublishingPageMonitoring */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ "mmJW");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HintType", function() { return _Canvas__WEBPACK_IMPORTED_MODULE_0__["HintType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"]; });

/* harmony import */ var _CanvasToolbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasToolbox */ "bl+Y");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasToolbox", function() { return _CanvasToolbox__WEBPACK_IMPORTED_MODULE_1__["CanvasToolbox"]; });

/* harmony import */ var _ClassicPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ClassicPage */ "x05h");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassicPage", function() { return _ClassicPage__WEBPACK_IMPORTED_MODULE_2__["ClassicPage"]; });

/* harmony import */ var _Comments__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Comments */ "tJmU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Comments", function() { return _Comments__WEBPACK_IMPORTED_MODULE_3__["Comments"]; });

/* harmony import */ var _CommentsMention__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CommentsMention */ "iWcL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CommentsMention", function() { return _CommentsMention__WEBPACK_IMPORTED_MODULE_4__["CommentsMention"]; });

/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Footer */ "Ogso");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return _Footer__WEBPACK_IMPORTED_MODULE_5__["Footer"]; });

/* harmony import */ var _HomeSite__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./HomeSite */ "3eAX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeSite", function() { return _HomeSite__WEBPACK_IMPORTED_MODULE_6__["HomeSite"]; });

/* harmony import */ var _SPHome__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SPHome */ "xxVG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPHome", function() { return _SPHome__WEBPACK_IMPORTED_MODULE_7__["SPHome"]; });

/* harmony import */ var _MegaMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./MegaMenu */ "mcqG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MegaMenu", function() { return _MegaMenu__WEBPACK_IMPORTED_MODULE_8__["MegaMenu"]; });

/* harmony import */ var _OrganizationSiteDesign__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./OrganizationSiteDesign */ "igXS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrganizationSiteDesign", function() { return _OrganizationSiteDesign__WEBPACK_IMPORTED_MODULE_9__["OrganizationSiteDesign"]; });

/* harmony import */ var _PageSettingsPanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./PageSettingsPanel */ "YfnZ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageSettingsPanel", function() { return _PageSettingsPanel__WEBPACK_IMPORTED_MODULE_10__["PageSettingsPanel"]; });

/* harmony import */ var _PageTemplatesPanel__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./PageTemplatesPanel */ "9JB+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageTemplatesPanel", function() { return _PageTemplatesPanel__WEBPACK_IMPORTED_MODULE_11__["PageTemplatesPanel"]; });

/* harmony import */ var _PromotePage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./PromotePage */ "ldKH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PromotePage", function() { return _PromotePage__WEBPACK_IMPORTED_MODULE_12__["PromotePage"]; });

/* harmony import */ var _PropertyPane__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./PropertyPane */ "M/CL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPane", function() { return _PropertyPane__WEBPACK_IMPORTED_MODULE_13__["PropertyPane"]; });

/* harmony import */ var _Router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Router */ "QcF0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return _Router__WEBPACK_IMPORTED_MODULE_14__["Router"]; });

/* harmony import */ var _SocialBar__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./SocialBar */ "yZcd");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocialBar", function() { return _SocialBar__WEBPACK_IMPORTED_MODULE_15__["SocialBar"]; });

/* harmony import */ var _TeamSitePage__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./TeamSitePage */ "UjPA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SiteDesignId", function() { return _TeamSitePage__WEBPACK_IMPORTED_MODULE_16__["SiteDesignId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeamSitePage", function() { return _TeamSitePage__WEBPACK_IMPORTED_MODULE_16__["TeamSitePage"]; });

/* harmony import */ var _UndoRedo__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./UndoRedo */ "Nthi");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UndoRedo", function() { return _UndoRedo__WEBPACK_IMPORTED_MODULE_17__["UndoRedo"]; });

/* harmony import */ var _Workbench__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./Workbench */ "jj/V");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Workbench", function() { return _Workbench__WEBPACK_IMPORTED_MODULE_18__["Workbench"]; });

/* harmony import */ var _PublishingPageMonitoring__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./PublishingPageMonitoring */ "cVxD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PublishingPageMonitoring", function() { return _PublishingPageMonitoring__WEBPACK_IMPORTED_MODULE_19__["PublishingPageMonitoring"]; });























/***/ }),

/***/ "JmdK":
/*!***************************************************!*\
  !*** ./lib/SPTaskLib/Controls/CreateSitePanel.js ***!
  \***************************************************/
/*! exports provided: CreateSitePanelForm, CreateSiteTemplateOption, GroupPrivacyOption, DesignPackageOption, CreateSitePanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateSitePanelForm", function() { return CreateSitePanelForm; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateSiteTemplateOption", function() { return CreateSiteTemplateOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupPrivacyOption", function() { return GroupPrivacyOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DesignPackageOption", function() { return DesignPackageOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateSitePanel", function() { return CreateSitePanel; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _Utilities_ClientFeatures__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utilities/ClientFeatures */ "zTnS");


/**
 * @public
 */
var CreateSitePanelForm;
(function (CreateSitePanelForm) {
    CreateSitePanelForm[CreateSitePanelForm["ChooseTemplate"] = 0] = "ChooseTemplate";
    CreateSitePanelForm[CreateSitePanelForm["CreateSite"] = 1] = "CreateSite";
    CreateSitePanelForm[CreateSitePanelForm["AddMember"] = 2] = "AddMember";
})(CreateSitePanelForm || (CreateSitePanelForm = {}));
/**
 * @public
 */
var CreateSiteTemplateOption;
(function (CreateSiteTemplateOption) {
    CreateSiteTemplateOption[CreateSiteTemplateOption["TeamSite"] = 0] = "TeamSite";
    CreateSiteTemplateOption[CreateSiteTemplateOption["Publishing"] = 1] = "Publishing";
})(CreateSiteTemplateOption || (CreateSiteTemplateOption = {}));
/**
 * @public
 */
var GroupPrivacyOption;
(function (GroupPrivacyOption) {
    GroupPrivacyOption[GroupPrivacyOption["Public"] = 0] = "Public";
    GroupPrivacyOption[GroupPrivacyOption["Private"] = 1] = "Private";
})(GroupPrivacyOption || (GroupPrivacyOption = {}));
/**
 * @public
 */
var DesignPackageOption;
(function (DesignPackageOption) {
    DesignPackageOption[DesignPackageOption["Topic"] = 0] = "Topic";
    DesignPackageOption[DesignPackageOption["Showcase"] = 1] = "Showcase";
    DesignPackageOption[DesignPackageOption["Blank"] = 2] = "Blank";
})(DesignPackageOption || (DesignPackageOption = {}));
var ChooseTemplateForm = /** @class */ (function () {
    function ChooseTemplateForm(panelRoot) {
        this.rootElement = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(panelRoot, 'chooseTemplateForm');
        if (this.rootElement) {
            this.templateOptions = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(this.rootElement, 'siteTemplateOption');
        }
    }
    ChooseTemplateForm.prototype.AddTaskVerifyForm = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Verify(Boolean(_this.rootElement), 'Site template option form is displayed');
            TAB.Log.Verify((_this.templateOptions.length === 2), 'Found two create site templates');
            TAB.Log.Verify(Boolean(_this.templateOptions[CreateSiteTemplateOption.TeamSite]), 'Found Team Site template option');
            TAB.Log.Verify(Boolean(_this.templateOptions[CreateSiteTemplateOption.Publishing]), 'Found Publishing template option');
        }));
    };
    ChooseTemplateForm.prototype.AddTaskChooseTemplate = function (templateOption) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _this.templateOptions[templateOption].click();
        }));
    };
    return ChooseTemplateForm;
}());
var CreateSiteForm = /** @class */ (function () {
    function CreateSiteForm(panelRoot, siteTemplate) {
        var _this = this;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                _this.panelRoot = panelRoot;
                _this.rootElement = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(panelRoot, 'createForm');
                _this.siteTemplate = siteTemplate;
                if (_this.rootElement) {
                    _this.getFormContent();
                }
                return true;
            }
            catch (e) {
                return false;
            }
        }));
    }
    CreateSiteForm.prototype.AddTaskVerifyForm = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Verify(Boolean(_this.rootElement), 'Create Site form is displayed');
            TAB.Log.Verify(Boolean(_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(_this.rootElement, 'createForm-title')), 'Create Site form title found');
            TAB.Log.Verify(Boolean(_this.groupNameField), 'Group Name field found');
            TAB.Log.Verify(Boolean(_this.groupDescriptionField), 'Group Description field found');
            TAB.Log.Verify(Boolean(_this.createButton), 'Create button found');
            TAB.Log.Verify((_this.createButton.getAttribute('disabled') === ''), 'Create button is disabled');
            if (_this.siteTemplate === CreateSiteTemplateOption.Publishing) {
                TAB.Log.Verify(Boolean(_this.designPackageField), 'Design Package field found');
            }
        }));
    };
    CreateSiteForm.prototype.AddTaskCreateSite = function (param, template) {
        var _this = this;
        TAB.Log.AddTaskComment('Choose design package');
        this.AddTaskSelectDesign(param);
        TAB.Log.AddTaskComment('Enter value for group name and description');
        TAB.AddTask(TAB.MakeTask(function () {
            if (param.name) {
                _this.setTextFieldValue(_this.groupNameField, param.name);
            }
            if (param.description) {
                _this.setTextAreaFieldValue(_this.groupDescriptionField, param.description);
            }
        }));
        TAB.Log.AddTaskComment('Wait for additional fields');
        TAB.AddTask(undefined, this.waitForDetailFields());
        if (this.siteTemplate === CreateSiteTemplateOption.TeamSite) {
            TAB.AddTask(TAB.MakeTask(function () {
                _this.selectPrivatePolicy();
            }));
        }
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var siteUrl = TAB.GetElements(_this.siteUrlField, TAB.searchBy.className, 'od-GroupCreate-siteUrlDiv');
            if (siteUrl && siteUrl.length) {
                param.siteUrl = TAB.GetTextContent(siteUrl[0]);
            }
            else {
                param.siteUrl = TAB.GetTextContent(_this.siteUrlField);
            }
            return Boolean(param.siteUrl);
        }));
        TAB.Log.AddTaskComment('Wait for create button to enable');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            _this.createButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(_this.rootElement, 'createForm-createButton');
            if (_this.createButton) {
                /* tslint:disable:no-null-keyword */
                return (_this.createButton.getAttribute('disabled') === null);
                /* tslint:enable:no-null-keyword */
            }
            return false;
        }));
        TAB.Log.AddTaskComment('Click on Create button to create group');
        TAB.AddTask(TAB.MakeTask(function () {
            _this.createButton.click();
        }), template === CreateSiteTemplateOption.Publishing ? this._waitForPageLoaded() : undefined);
    };
    CreateSiteForm.prototype.AddTaskSelectDesign = function (param) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _this.selectDesign(param);
        }));
    };
    CreateSiteForm.prototype._waitForPageLoaded = function () {
        var waiter = TAB.MakeWaiter(function () {
            var elements = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'SPPageChrome');
            return Boolean(elements.length > 0);
        });
        return waiter;
    };
    CreateSiteForm.prototype.getFormContent = function () {
        this.groupNameField = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this.rootElement, 'createForm-groupName');
        this.groupDescriptionField = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this.rootElement, 'createForm-description');
        this.createButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this.rootElement, 'createForm-createButton');
        if (this.siteTemplate === CreateSiteTemplateOption.Publishing) {
            this.designPackageField = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this.panelRoot, 'ms-designPackageSelector-choiceDropdown');
        }
    };
    CreateSiteForm.prototype.getGroupDetailFields = function () {
        this.groupAliasField = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this.rootElement, 'createForm-groupAlias');
        this.siteUrlField = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this.rootElement, 'createForm-siteUrl');
        if (this.siteTemplate === CreateSiteTemplateOption.TeamSite) {
            this.privacyField = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this.rootElement, 'createForm-privacy');
        }
    };
    CreateSiteForm.prototype.waitForDetailFields = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            _this.getGroupDetailFields();
            return Boolean(_this.groupAliasField) && Boolean(_this.siteUrlField) &&
                (_this.siteTemplate === CreateSiteTemplateOption.Publishing || Boolean(_this.privacyField));
        });
    };
    CreateSiteForm.prototype.setTextFieldValue = function (formField, value) {
        var inputElement = TAB.GetElement(formField, TAB.searchBy.tag, 'input');
        inputElement.value = value;
        TAB.FireChangeEvent(inputElement);
    };
    CreateSiteForm.prototype.setTextAreaFieldValue = function (formField, value) {
        var textAreaElement = TAB.GetElement(formField, TAB.searchBy.tag, 'textarea');
        textAreaElement.value = value;
        TAB.FireChangeEvent(textAreaElement);
    };
    CreateSiteForm.prototype.selectPrivatePolicy = function () {
        if (!_Utilities_ClientFeatures__WEBPACK_IMPORTED_MODULE_1__["ClientFeatures"].isKillSwitchEnabled('9bbc6ebe-ed86-4521-a784-cac83ac4d265')) {
            var newPrivacyField = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'od-Group-privacyDropdown');
            newPrivacyField.value = 'Private - only members can access this site';
            TAB.FireChangeEvent(newPrivacyField);
        }
        else {
            var privacyField = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'od-DropdownFormField-select');
            privacyField[0].value = 'Private - only members can access this site';
            TAB.FireChangeEvent(privacyField);
        }
    };
    CreateSiteForm.prototype.selectDesign = function (param) {
        if (param.designPackage === undefined) {
            return;
        }
        var designField = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(TAB.Win, 'ms-designPackageSelector-choiceDropdown')[0];
        TAB.ClickElement(designField);
        var calloutField = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Callout-main');
        var buttons = TAB.GetElements(calloutField, TAB.searchBy.hasClassName, 'ms-Button--command');
        // buttons[option].click();
        if (param.designPackage === DesignPackageOption.Topic) {
            TAB.ClickElement(buttons[0]);
        }
        else if (param.designPackage === DesignPackageOption.Showcase) {
            TAB.ClickElement(buttons[1]);
        }
        else if (param.designPackage === DesignPackageOption.Blank) {
            TAB.ClickElement(buttons[2]);
        }
    };
    return CreateSiteForm;
}());
var AddMemberForm = /** @class */ (function () {
    function AddMemberForm(panelRoot) {
        this.rootElement = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(panelRoot, 'addMemberForm');
        this.getFormContent();
    }
    AddMemberForm.prototype.AddTaskVerifyForm = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Verify(Boolean(_this.rootElement), 'Add member form is displayed');
            TAB.Log.Verify(Boolean(_this.addOwnerField), 'Add Owner dropdown found');
            TAB.Log.Verify(Boolean(_this.addMemberField), 'Add Member dropdown found');
        }));
    };
    AddMemberForm.prototype.WaitForDoneButton = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            _this.doneButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(_this.rootElement, 'addMemberForm-doneButton');
            if (_this.doneButton) {
                /* tslint:disable:no-null-keyword */
                if (_this.doneButton.getAttribute('disabled') === null) {
                    /* tslint:enable:no-null-keyword */
                    TAB.Log.Comment('Done button enabled, group created successfully');
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        });
    };
    AddMemberForm.prototype.AddTaskClickDone = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _this.doneButton.click();
        }));
    };
    AddMemberForm.prototype.getFormContent = function () {
        this.addOwnerField = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this.rootElement, 'addMemberForm-addOwner');
        this.addMemberField = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this.rootElement, 'addMemberForm-addMember');
    };
    return AddMemberForm;
}());
/**
 * @public
 */
var CreateSitePanel = /** @class */ (function () {
    function CreateSitePanel(inPage, SPHomePanel) {
        if (inPage) {
            this.rootElement = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'od-GroupCreate');
        }
        else {
            this.rootElement = CreateSitePanel.getPanelRootElement(SPHomePanel);
        }
    }
    CreateSitePanel.WaitForPanel = function (SPHomePanel) {
        return TAB.MakeWaiter(function () {
            return Boolean(CreateSitePanel.getPanelRootElement(SPHomePanel));
        });
    };
    CreateSitePanel.getPanelRootElement = function (SPHomePanel) {
        var iFrameDialog = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'Create-site-panel-iframe-container');
        if (iFrameDialog) {
            var iFrameContainer = TAB.GetElement(iFrameDialog, TAB.searchBy.tag, 'iframe');
            if (iFrameContainer) {
                return TAB.GetElements(iFrameContainer.contentDocument, TAB.searchBy.hasClassName, 'od-GroupCreate')[0];
            }
        }
        return undefined;
    };
    CreateSitePanel.prototype.AddTaskVerifyForm = function (formType, siteTemplate) {
        switch (formType) {
            case CreateSitePanelForm.ChooseTemplate:
                this.addTaskVerifyChooseTemplateForm();
                break;
            case CreateSitePanelForm.CreateSite:
                this.addTaskVerifyCreateSiteForm(siteTemplate);
                break;
            case CreateSitePanelForm.AddMember:
                this.addTaskVerifyAddMemberForm();
                break;
        }
    };
    CreateSitePanel.prototype.AddTaskChooseTemplate = function (templateOption) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            if (_this.chooseTemplateForm) {
                _this.chooseTemplateForm.AddTaskChooseTemplate(templateOption);
            }
        }));
    };
    CreateSitePanel.prototype.AddTaskCreateSite = function (createSiteParam, template) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            if (_this.createSiteForm) {
                _this.createSiteForm.AddTaskCreateSite(createSiteParam, template);
            }
        }));
    };
    CreateSitePanel.prototype.AddTaskFinish = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.AddTask(undefined, _this.addMemberForm.WaitForDoneButton());
            _this.addMemberForm.AddTaskClickDone();
        }));
    };
    CreateSitePanel.prototype.addTaskVerifyChooseTemplateForm = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Verifying Template Picker form');
        TAB.AddTask(TAB.MakeTask(function () {
            _this.chooseTemplateForm = new ChooseTemplateForm(_this.rootElement);
            _this.chooseTemplateForm.AddTaskVerifyForm();
        }));
    };
    CreateSitePanel.prototype.addTaskVerifyCreateSiteForm = function (siteTemplate) {
        var _this = this;
        TAB.Log.AddTaskComment('Verifying Create Site form');
        TAB.AddTask(TAB.MakeTask(function () {
            _this.createSiteForm = new CreateSiteForm(_this.rootElement, siteTemplate);
            _this.createSiteForm.AddTaskVerifyForm();
        }));
    };
    CreateSitePanel.prototype.addTaskVerifyAddMemberForm = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Verifying Add Member form');
        TAB.AddTask(TAB.MakeTask(function () {
            _this.addMemberForm = new AddMemberForm(_this.rootElement);
            _this.addMemberForm.AddTaskVerifyForm();
        }));
    };
    return CreateSitePanel;
}());



/***/ }),

/***/ "KBAH":
/*!*************************************************!*\
  !*** ./lib/SPTaskLib/Controls/EventsWebPart.js ***!
  \*************************************************/
/*! exports provided: EventsWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventsWebPart", function() { return EventsWebPart; });
/* harmony import */ var _BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseCollectionWebPart */ "kQju");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _EventPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EventPage */ "lIY2");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






/**
 * @public
 */
var EventsWebPart = /** @class */ (function (_super) {
    __extends(EventsWebPart, _super);
    function EventsWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].Events, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].Events.toString()) || this;
    }
    EventsWebPart.prototype.AddTaskAddWebPartOnTeamSitePage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _this.AddTaskSetupNewPage();
            _this._addTaskAssertWebPartNotExist();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"].AddTaskCreateWebPart(_this);
        }), this._waitForWebPartToExist());
    };
    EventsWebPart.prototype.AddTaskAddEvent = function (title) {
        var _this = this;
        var eventPage;
        TAB.MakeTask(function () {
            TAB.Log.Comment('Events web part starts creating an new event.');
            _this.AddTaskCreateEmptyEvent(function (instance) { return eventPage = instance; });
        })
            .WaitFor(TAB.MakeWaiter(function () { return eventPage !== undefined; }));
        TAB.MakeTask(function () {
            eventPage.AddTaskInputEventTitle(title);
            eventPage.AddTaskInputEventLink('http://example.net');
            eventPage.AddTaskInputLocation('Jiangsu, Suzhou');
            eventPage.AddTaskInputEventDate();
            eventPage.AddTaskSaveEvent();
            eventPage.AddTaskNavigateBack(true /* ensure event item */);
        }).WaitFor(undefined);
    };
    EventsWebPart.prototype.AddTaskEditFirstEvent = function (title) {
        var _this = this;
        var eventPage;
        TAB.MakeTask(function () {
            TAB.Log.Comment('Event page starts editing the first event.');
            _this.AddTaskNavigateToFirstEvent(function (instance) { return eventPage = instance; });
        })
            .WaitFor(TAB.MakeWaiter(function () { return eventPage !== undefined; }));
        TAB.MakeTask(function () {
            eventPage.AddTaskEditEvent();
            eventPage.AddTaskInputEventTitle(title);
            eventPage.AddTaskInputEventLink('http://newLink.net');
            eventPage.AddTaskInputLocation('Jiangsu, Suzhou');
            eventPage.AddTaskInputEventDate();
            eventPage.AddTaskSaveEvent();
            eventPage.AddTaskNavigateBack(true /* ensure event item*/);
        }).WaitFor(undefined);
    };
    EventsWebPart.prototype.AddTaskDeleteFirstEvent = function () {
        var _this = this;
        var eventPage;
        TAB.MakeTask(function () {
            TAB.Log.Comment('Event page starts deleting the first event.');
            _this.AddTaskNavigateToFirstEvent(function (instance) { return eventPage = instance; });
        })
            .WaitFor(TAB.MakeWaiter(function () { return eventPage !== undefined; }));
        TAB.MakeTask(function () {
            eventPage.AddTaskDeleteEvent();
            eventPage.AddTaskNavigateBack(true /* ensure event item*/);
        }).WaitFor(undefined);
    };
    EventsWebPart.prototype.AddTaskCreateEmptyEvent = function (ref) {
        var _this = this;
        var eventPage;
        TAB.AddTask(TAB.MakeTask(function () {
            _this._sitePageUrl = _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_4__["TeamSitePage"].PageUrl || TAB.Win.location.href;
            eventPage = new _EventPage__WEBPACK_IMPORTED_MODULE_5__["EventPage"](_this._sitePageUrl);
            ref(eventPage);
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            var addEvent = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'eventsAddButton');
            TAB.ClickElement(addEvent);
        }), TAB.MakeWaiter(function () {
            return eventPage.InEditMode;
        }));
    };
    EventsWebPart.prototype.AddTaskNavigateToFirstEvent = function (ref) {
        var _this = this;
        var eventPage;
        TAB.AddTask(TAB.MakeTask(function () {
            _this._sitePageUrl = _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_4__["TeamSitePage"].PageUrl || TAB.Win.location.href;
            eventPage = new _EventPage__WEBPACK_IMPORTED_MODULE_5__["EventPage"](_this._sitePageUrl);
            var firstEventElement;
            var eventElement = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'boxIsMultipleDays');
            if (eventElement && eventElement.length > 1) {
                firstEventElement = eventElement[0];
            }
            else {
                firstEventElement = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'boxIsSingleDay')[0];
            }
            TAB.ClickElement(firstEventElement);
        }), TAB.MakeWaiter(function () { return eventPage.InReadMode; }));
        TAB.AddTask(TAB.MakeTask(function () { ref(eventPage); }));
    };
    EventsWebPart.prototype.GetEventItemCount = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="event-card-title"]').length;
    };
    EventsWebPart.prototype.AddTaskAssertHasEvent = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            if (_this.GetEventItemCount() === 0) {
                throw 'No event item shown in event web part.';
            }
        }));
    };
    EventsWebPart.prototype._waitForWebPartToExist = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            return _this._isEventsWebPartExist();
        });
    };
    EventsWebPart.prototype._addTaskAssertWebPartNotExist = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Assert Events web part not exist');
            if (_this._isEventsWebPartExist()) {
                throw 'Events web part should not exist.';
            }
        }), undefined);
    };
    EventsWebPart.prototype._isEventsWebPartExist = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'boxIsMultipleDays')
            || TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'boxIsSingleDay')
            || TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'emptyStatePreviewContainer');
    };
    return EventsWebPart;
}(_BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__["BaseCollectionWebPart"]));



/***/ }),

/***/ "Lp+w":
/*!********************************************************!*\
  !*** ./lib/SPTaskLib/Controls/DocumentEmbedWebpart.js ***!
  \********************************************************/
/*! exports provided: DocumentEmbedWebpart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DocumentEmbedWebpart", function() { return DocumentEmbedWebpart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var DocumentEmbedWebpart = /** @class */ (function (_super) {
    __extends(DocumentEmbedWebpart, _super);
    function DocumentEmbedWebpart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Document, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Document.toString()) || this;
    }
    DocumentEmbedWebpart.prototype.AddTaskAddOnExistingTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(this.WaitForWebPartToExist());
    };
    DocumentEmbedWebpart.prototype.AddTaskAddWebPartOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _this.AddTaskSetupNewPage();
            _this.AddTaskAssertWebPartNotExist();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(this.WaitForWebPartToExist());
    };
    DocumentEmbedWebpart.prototype.AddTaskUploadFile = function (fileInput) {
        TAB.AddTask(undefined /* task */, this.WaitForFilePickerToExist());
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskCreateFilePicker();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Upload file');
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].FilePicker.AddTaskUploadItem(fileInput);
        }), this._waitForNewAddedItemToExist());
    };
    DocumentEmbedWebpart.prototype.AddTaskOpenFile = function (fileUrl) {
        TAB.AddTask(undefined /* task */, this.WaitForFilePickerToExist());
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskCreateFilePicker();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Upload file');
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].FilePicker.AddTaskAddFromUrl(fileUrl);
        }), this._waitForNewAddedItemToExist());
    };
    DocumentEmbedWebpart.prototype.WaitForWebPartToExist = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, DocumentEmbedWebpart.documentWebPartName);
    };
    DocumentEmbedWebpart.prototype.WaitForFilePickerToExist = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'filePicker');
    };
    DocumentEmbedWebpart.prototype.WaitForFilePickerToClose = function () {
        return TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'filePicker');
        });
    };
    DocumentEmbedWebpart.prototype.AddTaskClickDocument = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking on the document');
            var elements = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, DocumentEmbedWebpart.documentWebPartName);
            var imageArea = TAB.GetElements(elements[0], TAB.searchBy.partialClassName, 'ms-Image');
            TAB.ClickElement(imageArea[0]);
        }));
    };
    DocumentEmbedWebpart.prototype.AddTaskAssertWebPartNotExist = function () {
        TAB.MakeTask(function () {
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, DocumentEmbedWebpart.documentWebPartName)) {
                throw 'Document web part should not exist.';
            }
        })
            .WaitFor(undefined);
    };
    DocumentEmbedWebpart.prototype._waitForNewAddedItemToExist = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            return _this._newAddedItemExistsNewWebpart() || _this._newAddedItemExistsOldWebpart();
        });
    };
    DocumentEmbedWebpart.prototype._newAddedItemExistsNewWebpart = function () {
        var elements = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-sp-feature-tag='DocumentEmbedWebPart web part (File viewer)']");
        return elements.length > 0;
    };
    DocumentEmbedWebpart.prototype._newAddedItemExistsOldWebpart = function () {
        var elements = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-DocumentCard');
        return elements.length > 0;
    };
    DocumentEmbedWebpart.documentWebPartName = 'DocumentEmbed';
    return DocumentEmbedWebpart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "M/CL":
/*!*********************************************!*\
  !*** ./lib/SPTaskLib/Pages/PropertyPane.js ***!
  \*********************************************/
/*! exports provided: PropertyPane */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyPane", function() { return PropertyPane; });
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ "mmJW");

/**
 * @public
 */
var PropertyPane = /** @class */ (function () {
    function PropertyPane() {
    }
    PropertyPane.AddTaskOpenPropertyPane = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Open Property pane');
            _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].SelectedWebpart.AddTaskClickConfigureButton();
        }), 
        // There is a delay before the property pane is actually opened.
        TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'showPane'));
    };
    PropertyPane.AddTaskVerifyEmptyPropertyPane = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verify Empty Property Pane');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='noConfigurationPropertyPane']");
        }));
    };
    PropertyPane.AddTaskVerifyNonEmptyPropertyPane = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verify Non-Empty Property Pane');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'propertyPanePageContent');
        }));
    };
    PropertyPane.AddTaskClickChangeButton = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click Change button');
            var propertyPaneContainer = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            var changeButton = TAB.GetElements(propertyPaneContainer, TAB.searchBy.customQuery, "[data-automation-id='changePath']")[0];
            TAB.ClickElement(changeButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='sp-filepicker']"));
    };
    PropertyPane.AddTaskClosePropertyPane = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Close Property Pane');
            var propertyPaneContainer = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            var closePropertyPaneButton = TAB.GetElements(propertyPaneContainer, TAB.searchBy.partialClassName, 'propertyPaneClose');
            TAB.ClickElement(closePropertyPaneButton[0]);
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'showPane');
        }));
    };
    PropertyPane.AddTaskToggleDynamicFilter = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('ClickToggleOn Dynamic Filtering');
            var propertyPaneContainer = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            var toggleButton = TAB.GetElements(propertyPaneContainer, TAB.searchBy.customQuery, "[data-automation-id='dynamicFilterToggle']")[0];
            TAB.ClickElement(toggleButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='DynamicDataWidgetSource']"));
    };
    PropertyPane.AddTaskSetDynamicDataWidgetSource = function (sourceList) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Set Dynamic data source list');
            var propertyPaneContainer = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            var srcDropdownParent = TAB.GetElements(propertyPaneContainer, TAB.searchBy.customQuery, "[data-automation-id='DynamicDataWidgetSource']")[0];
            var dropdown = TAB.GetElements(srcDropdownParent, TAB.searchBy.hasClassName, 'ms-Dropdown-title')[0];
            TAB.ClickElement(dropdown);
            var callout = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dropdown-callout')[0];
            var menuItems = TAB.GetElements(callout, TAB.searchBy.hasClassName, 'ms-Dropdown-item');
            for (var i = 0; i < menuItems.length; i++) {
                if (menuItems[i].title === sourceList) {
                    TAB.ClickElement(menuItems[i]);
                }
            }
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='DynamicDataWidgetEntryDropdown']"));
    };
    PropertyPane.AddTaskSetDropdownByAutomationId = function (propVal, dropdownAutomationId) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Set Dynamic data target Filtering field');
            var propertyPaneContainer = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            var dropdownParent = TAB.GetElements(propertyPaneContainer, TAB.searchBy.customQuery, "[data-automation-id=\"" + dropdownAutomationId + "\"]")[0];
            var dropdown = TAB.GetElements(dropdownParent, TAB.searchBy.hasClassName, 'ms-Dropdown-title')[0];
            TAB.ClickElement(dropdown);
            var callout = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dropdown-callout')[0];
            var menuItems = TAB.GetElements(callout, TAB.searchBy.hasClassName, 'ms-Dropdown-item');
            for (var i = 0; i < menuItems.length; i++) {
                if (menuItems[i].title === propVal) {
                    TAB.ClickElement(menuItems[i]);
                    break;
                }
            }
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='propertyPaneApplyButton']"));
    };
    PropertyPane.AddTaskClickApplyButton = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click Apply button');
            var propertyPaneContainer = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            var applyButton = TAB.GetElements(propertyPaneContainer, TAB.searchBy.customQuery, "[data-automation-id='propertyPaneApplyButton']")[0];
            TAB.ClickElement(applyButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='DynamicDataWidgetSource']"));
    };
    return PropertyPane;
}());



/***/ }),

/***/ "MKab":
/*!********************************************************!*\
  !*** ./lib/SPTaskLib/Controls/GroupCalendarWebPart.js ***!
  \********************************************************/
/*! exports provided: GroupCalendarWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupCalendarWebPart", function() { return GroupCalendarWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * @public
 */
var GroupCalendarWebPart = /** @class */ (function (_super) {
    __extends(GroupCalendarWebPart, _super);
    function GroupCalendarWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].GroupCalendar, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].GroupCalendar.toString()) || this;
    }
    GroupCalendarWebPart.prototype.AddTaskAddWebPartOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _this._addTaskAssertWebPartNotExist();
            _this.AddTaskSetupNewPage();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(this._waitForWebPartToExist());
    };
    GroupCalendarWebPart.prototype.AddTaskOpenPropertyPane = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var addGroupCalendarBtn = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="placeholderButton"]');
            addGroupCalendarBtn.click();
        }), TAB.MakeWaiter(function () {
            var propertyPane = _this._propertyPane;
            if (!propertyPane) {
                return false;
            }
            return !TAB.ElementExists(propertyPane, TAB.searchBy.customQuery, '[aria-disabled="true"]');
        }));
    };
    GroupCalendarWebPart.prototype.AddTaskSelectGroupAndCheckEventItem = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var dropDownElement = TAB.GetElement(_this._propertyPane, TAB.searchBy.partialClassName, 'ms-Dropdown-title');
            dropDownElement.click();
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'ms-Callout-container'));
        TAB.AddTask(TAB.MakeTask(function () {
            var groupsContainers = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-Callout-container');
            var visibilityGroupContainer;
            groupsContainers.forEach(function (container) {
                if (!visibilityGroupContainer && (!container.style || container.style.visibility !== 'hidden')) {
                    visibilityGroupContainer = container;
                }
            });
            var groupsBtn = TAB.GetElements(visibilityGroupContainer, TAB.searchBy.customQuery, '[type="button"]');
            if (groupsBtn.length > 0) {
                groupsBtn[0].click();
            }
            else {
                TAB.Log.Comment('Add group failed, no group found.');
            }
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'syncButtonDesktop'));
    };
    Object.defineProperty(GroupCalendarWebPart.prototype, "_propertyPane", {
        get: function () {
            if (!TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'propertyPaneGroupContent')) {
                return undefined;
            }
            return TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'propertyPaneGroupContent');
        },
        enumerable: true,
        configurable: true
    });
    GroupCalendarWebPart.prototype._addTaskAssertWebPartNotExist = function () {
        TAB.MakeTask(function () {
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.className, 'Placeholder-container')) {
                throw 'Group Calendar web part should not exist.';
            }
        })
            .WaitFor(undefined);
    };
    GroupCalendarWebPart.prototype._waitForWebPartToExist = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.className, 'Placeholder-container');
    };
    return GroupCalendarWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "N935":
/*!********************************************!*\
  !*** ./lib/SPTaskLib/Controls/NewsLink.js ***!
  \********************************************/
/*! exports provided: NewsLink */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsLink", function() { return NewsLink; });
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _FilePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./FilePicker */ "8uLm");



// data automation ids
var NEWSLINK_COMPONENT = 'newslink-component';
var NEWSLINK_DESCRIPTION = 'newslink-description';
var NEWSLINK_LINK = 'newslink-link';
var NEWSLINK_POSTBUTTON = 'newslink-post-button';
var NEWSLINK_THUMBNAIL = 'newslink-thumbnail';
var NEWSLINK_TITLE = 'newslink-title';
var NEWSLINK_URL = 'newslink-url';
var NEWSLINK_CHANGE_BUTTON = 'newslink-change-button';
/**
 * @public
 */
var NewsLink = /** @class */ (function () {
    function NewsLink() {
    }
    NewsLink.prototype.EnterNewsLinkUrl = function (link) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _this._parentElement = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, NEWSLINK_COMPONENT);
            var linkInput = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(_this._parentElement, NEWSLINK_URL);
            TAB.Log.Comment("Input link " + link + ". If the TAB test times out on this waiter, then the preview image isn't available");
            _this._makeEntry(linkInput, NEWSLINK_URL, link);
        }), TAB.MakeWaiter(function () {
            // Waiting for image preview without the placeholder image and waiting for title and description inputs
            try {
                return (Boolean(_this.GetImagePreview()) &&
                    Boolean(_Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(_this._parentElement, NEWSLINK_TITLE)) &&
                    Boolean(_Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(_this._parentElement, NEWSLINK_DESCRIPTION)) &&
                    Boolean(_Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(_this._parentElement, NEWSLINK_LINK)));
            }
            catch (error) {
                return false;
            }
        }));
    };
    NewsLink.prototype.EnterTitle = function (title) {
        this._addTaskMakeEntry(NEWSLINK_TITLE, title);
    };
    NewsLink.prototype.VerifyTitle = function (title) {
        this._addTaskCheckEntry(NEWSLINK_TITLE, title);
    };
    NewsLink.prototype.VerifyDescription = function (description) {
        this._addTaskCheckEntry(NEWSLINK_DESCRIPTION, description);
    };
    NewsLink.prototype.EnterDescription = function (description) {
        this._addTaskMakeEntry(NEWSLINK_DESCRIPTION, description);
    };
    NewsLink.prototype.AddTaskOpenFilePicker = function (filePicker) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            if (_this._newsLinkChangeButton) {
                TAB.ClickElement(_this._newsLinkChangeButton);
                TAB.Log.Comment('Opened File Picker for News Link');
            }
        }), _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'sp-filepicker'));
        TAB.AddTask(TAB.MakeTask(function () {
            filePicker.SetRoot(_this._filePicker);
        }), filePicker.WaitForViewLoad(_FilePicker__WEBPACK_IMPORTED_MODULE_2__["FilePickerView"].Recent));
    };
    // Return image element only if the preview is not the placeholder image.
    NewsLink.prototype.GetImagePreview = function () {
        var img = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(this._parentElement, NEWSLINK_THUMBNAIL);
        if (img) {
            var src = img.src;
            // Placeholder image is in the format of photo_{guid}.png; guid is 32 chars
            if (!src || (src.indexOf('photo_') === 0 && src.length === 42 && src.indexOf('.png') === 38)) {
                // detected no image or a placeholder image, so the thumbnail for the page was not set
                return undefined;
            }
            else {
                // detected a non-placeholder image
                return img;
            }
        }
        else {
            return undefined;
        }
    };
    NewsLink.prototype.Post = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var postButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(_this._parentElement, NEWSLINK_POSTBUTTON);
            TAB.Log.Comment("Post news link and confirm the news post is displayed in the news web part");
            postButton.click();
        }), TAB.MakeWaiter(function () {
            return true;
        }));
    };
    NewsLink.prototype.ClickDetailsLink = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var linkButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(_this._parentElement, NEWSLINK_LINK);
            TAB.Log.Comment("Save news link and navigate to the details page for additional editing");
            linkButton.click();
        }), TAB.MakeWaiter(function () {
            try {
                return _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].editMode &&
                    Boolean(_Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, NEWSLINK_CHANGE_BUTTON));
            }
            catch (error) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            _this._parentElement = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, NEWSLINK_COMPONENT);
        }), undefined);
    };
    Object.defineProperty(NewsLink.prototype, "_newsLinkChangeButton", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(this._parentElement, NEWSLINK_CHANGE_BUTTON);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewsLink.prototype, "_filePicker", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win, 'sp-filepicker');
        },
        enumerable: true,
        configurable: true
    });
    NewsLink.prototype._makeEntry = function (input, dataAutomationId, text) {
        var focusEv = TAB.Win.document.createEvent('HTMLEvents');
        focusEv.initEvent('focus', true /*bubble*/, false /*cancelable*/);
        input.dispatchEvent(focusEv);
        input.value = text;
        var ev = TAB.Win.document.createEvent('HTMLEvents');
        ev.initEvent('input', true /*bubble*/, false /*cancelable*/);
        input.dispatchEvent(ev);
        // press Enter
        TAB.FireKeyboardEvent(input, 'keydown', 13);
        var blurEv = TAB.Win.document.createEvent('HTMLEvents');
        blurEv.initEvent('blur', true /*bubble*/, false /*cancelable*/);
        input.dispatchEvent(blurEv);
    };
    NewsLink.prototype._addTaskCheckEntry = function (dataAutomationId, text) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("getting " + dataAutomationId);
            var input = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(_this._parentElement, dataAutomationId);
            TAB.Log.Comment("found " + dataAutomationId + ": " + Boolean(input));
            if (!input) {
                throw new Error("did not find element for " + dataAutomationId + " data automation id");
            }
            if (input.value !== text) {
                throw new Error("did not find " + text + " for " + dataAutomationId + " data automation id");
            }
            TAB.Log.Comment("found " + text + " for " + dataAutomationId + " data automation id");
        }), TAB.MakeWaiter(function () {
            return true;
        }));
    };
    NewsLink.prototype._addTaskMakeEntry = function (dataAutomationId, text) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("getting " + dataAutomationId);
            var input = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(_this._parentElement, dataAutomationId);
            TAB.Log.Comment("found " + dataAutomationId + ": " + Boolean(input));
            if (!input) {
                throw new Error("did not find element for " + dataAutomationId + " data automation id");
            }
            _this._makeEntry(input, dataAutomationId, text);
        }), TAB.MakeWaiter(function () {
            return true;
        }));
    };
    return NewsLink;
}());



/***/ }),

/***/ "Nthi":
/*!*****************************************!*\
  !*** ./lib/SPTaskLib/Pages/UndoRedo.js ***!
  \*****************************************/
/*! exports provided: UndoRedo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UndoRedo", function() { return UndoRedo; });
/* harmony import */ var _TeamSitePage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TeamSitePage */ "UjPA");

/**
 * @public
 */
var UndoRedo = /** @class */ (function () {
    function UndoRedo() {
    }
    UndoRedo.AddTaskUndo = function (count) {
        if (count === void 0) { count = 1; }
        while (count--) {
            UndoRedo._addTaskClickUndoButton();
            UndoRedo.AddTaskWaitForMinUndoTime();
        }
    };
    UndoRedo.AddTaskRedo = function (count) {
        if (count === void 0) { count = 1; }
        while (count--) {
            UndoRedo._addTaskClickRedoButton();
            UndoRedo.AddTaskWaitForMinUndoTime();
        }
    };
    UndoRedo.AddTaskWaitForMinUndoTime = function () {
        var startTimeInMs;
        TAB.AddTask(TAB.MakeTask(function () {
            startTimeInMs = new Date().getTime();
        }), TAB.MakeWaiter(function () {
            return new Date().getTime() - startTimeInMs >= 1000;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            // Dispatching an event to mock user action.
            var mockEvent = document.createEvent('MouseEvents');
            mockEvent.initEvent('mousedown', true, true);
            TAB.Win.document.dispatchEvent(mockEvent);
        }));
    };
    UndoRedo.AddTaskVerifyUndoStack = function (undoable) {
        UndoRedo._addTaskVerifyUndoOrRedoButtonState(undoable /* enabled */, "Undo" /* Undo */);
    };
    UndoRedo.AddTaskVerifyRedoStack = function (redoable) {
        UndoRedo._addTaskVerifyUndoOrRedoButtonState(redoable /* enabled */, "Redo" /* Redo */);
    };
    UndoRedo._addTaskClickUndoButton = function () {
        UndoRedo._addTaskVerifyUndoOrRedoButtonState(true /* enabled */, "Undo" /* Undo */);
        TAB.AddTask(TAB.MakeTask(function () {
            var undoMenu = UndoRedo._undoMenu;
            TAB.Log.Comment('Click undo button');
            undoMenu.click();
        }));
    };
    UndoRedo._addTaskClickRedoButton = function () {
        UndoRedo._addTaskVerifyUndoOrRedoButtonState(true /* enabled */, "Redo" /* Redo */);
        TAB.AddTask(TAB.MakeTask(function () {
            var redoMenu = UndoRedo._redoMenu;
            TAB.Log.Comment('Click redo button');
            redoMenu.click();
        }));
    };
    UndoRedo._addTaskVerifyUndoOrRedoButtonState = function (enabled, action) {
        var shouldOpenSplitMenu = false;
        UndoRedo.AddTaskWaitForMinUndoTime();
        TAB.AddTask(TAB.MakeTask(function () {
            try {
                if (UndoRedo._undoMenu && UndoRedo._redoMenu) {
                    TAB.Log.Comment('Undo redo sub menu already open');
                    return;
                }
            }
            catch (error) {
                TAB.Log.Comment('Undo redo sub menu not found, go find and click split button');
            }
            TAB.AddTask(TAB.MakeTask(function () {
                var root = UndoRedo._undoButtonRoot;
                TAB.Log.AddTaskComment('Checking if the whole Undo split button is visible on command bar, if not click the ellipsis');
                if (!root) {
                    var ellipsisButton = TAB.GetElement(_TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].GetCommandBar(), TAB.searchBy.hasClassName, 'ms-CommandBar-overflowButton');
                    TAB.ClickElement(ellipsisButton);
                }
            }), TAB.MakeWaiter(function () {
                try {
                    return Boolean(UndoRedo._undoButtonRoot);
                }
                catch (error) {
                    return false;
                }
            }));
            TAB.AddTask(TAB.MakeTask(function () {
                var splitButton = UndoRedo._undoSplitButton;
                if (UndoRedo._isButtonDisabled(splitButton) && !enabled) {
                    TAB.Log.AddTaskPass('Expected: split button is disabled');
                }
                else if (UndoRedo._isButtonDisabled(splitButton) && enabled) {
                    TAB.Log.AddTaskFail("Split button is disabled while expecting " + action + " to be enabled");
                }
                else {
                    TAB.Log.Comment('Click on split button to toggle split button menu');
                    shouldOpenSplitMenu = true;
                    splitButton.click();
                }
            }));
        }), TAB.MakeWaiter(function () {
            try {
                return !shouldOpenSplitMenu || (UndoRedo._undoMenu && UndoRedo._redoMenu);
            }
            catch (error) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            if (shouldOpenSplitMenu) {
                var menu = action === "Undo" /* Undo */ ? UndoRedo._undoMenu : UndoRedo._redoMenu;
                var buttonState = UndoRedo._isButtonDisabled(menu) ? 'disabled' : 'enabled';
                var expectedButtonState = enabled ? 'enabled' : 'disabled';
                if (buttonState === expectedButtonState) {
                    TAB.Log.Pass(action + " button is " + buttonState + " as expected");
                }
                else {
                    TAB.Log.Fail(action + " button is " + buttonState + ". However it is expected to be " + expectedButtonState);
                }
            }
        }));
    };
    Object.defineProperty(UndoRedo, "_undoMenu", {
        get: function () {
            return TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='" + UndoRedo.UNDO_SUB_MENU_AUTOMATION_ID + "']");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UndoRedo, "_redoMenu", {
        get: function () {
            return TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='" + UndoRedo.REDO_SUB_MENU_AUTOMATION_ID + "']");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UndoRedo, "_undoSplitButton", {
        get: function () {
            var root = UndoRedo._undoButtonRoot;
            var buttons = TAB.GetElements(root, TAB.searchBy.tag, 'button');
            if (!buttons || buttons.length !== 2) {
                TAB.Log.Fail('Failed to get split button due to unexpected split button DOM structure');
            }
            // Getting split button by second button inside split button DOM because there isn't a way yet to pass customized props
            // to the split button.
            return buttons[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UndoRedo, "_undoButtonRoot", {
        get: function () {
            return TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='" + UndoRedo.UNDO_BUTTON_ROOT_AUTOMATION_ID + "']")[0];
        },
        enumerable: true,
        configurable: true
    });
    UndoRedo._isButtonDisabled = function (button) {
        return button.classList.contains('is-disabled') || button['aria-disabled'];
    };
    UndoRedo.UNDO_BUTTON_ROOT_AUTOMATION_ID = 'undo-redo-split-button';
    UndoRedo.UNDO_SUB_MENU_AUTOMATION_ID = 'undo-menu';
    UndoRedo.REDO_SUB_MENU_AUTOMATION_ID = 'redo-menu';
    return UndoRedo;
}());



/***/ }),

/***/ "Ogso":
/*!***************************************!*\
  !*** ./lib/SPTaskLib/Pages/Footer.js ***!
  \***************************************/
/*! exports provided: Footer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return Footer; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");

/**
 * @public
 */
var Footer = /** @class */ (function () {
    function Footer() {
    }
    Footer.AddTaskSetFooterVisibility = function (visible) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment((visible ? 'Enabling' : 'Disabling') + " Footer");
            TAB.Log.AddTaskComment('Launch change the look panel');
            Footer._addTaskWaitOnSettingsGear(); // Wait for settings & CTL panel code to be loaded with suite nav
            Footer._addTaskLaunchFooterCTLPanel();
            // click on the footer section
            TAB.AddTask(TAB.MakeTask(function () {
                TAB.Log.AddTaskComment('Click footer panel');
                Footer._ctlElem = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'sp-ChangeTheLookPanel');
                var footerElem = TAB.GetElement(Footer._ctlElem, TAB.searchBy.customQuery, '[data-chrome-type="Footer"]');
                TAB.ClickElement(footerElem);
            }), TAB.MakeWaiter(function () {
                return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'sp-ChangeTheLookPanel-footerProperty');
            }));
            // ensure footer visibility button is pressed
            TAB.AddTask(TAB.MakeTask(function () {
                TAB.Log.AddTaskComment('Click footer visibility');
                var visibilityToggle = TAB.GetElements(Footer._ctlElem, TAB.searchBy.hasClassName, 'ms-Toggle-background')[0];
                if (visibilityToggle.attributes['aria-checked'].value !== visible) {
                    TAB.ClickElement(visibilityToggle);
                }
            }));
            Footer._addTaskSaveCloseCTLPanel();
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='SimpleFooter']") === visible;
        }));
    };
    Footer.AddTaskGetFooterLinks = function (siteUrl, footerResult) {
        TAB.Log.AddTaskComment('Getting footer links');
        var targetUrl = siteUrl + "/_api/navigation/MenuState?menuNodeKey='3a94b35f-030b-468e-80e3-b75ee84ae0ad'";
        var result = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendGetRequest(siteUrl, targetUrl, result);
        TAB.AddTask(TAB.MakeTask(function () {
            if (result && result.success && result.retVal) {
                footerResult.MenuState = result.retVal;
            }
            else {
                TAB.Log.AddTaskFail('Failed to fetch footer links');
            }
        }));
    };
    Footer.AddTaskAddFooterLinks = function (name, url, siteUrl) {
        var result = {};
        Footer.AddTaskGetFooterLinks(siteUrl, result);
        TAB.Log.AddTaskComment("Adding footer node " + name);
        TAB.AddTask(TAB.MakeTask(function () {
            var links = result.MenuState && result.MenuState.Nodes;
            TAB.Log.AddTaskComment('First deleting existing footer links');
            if (links && links.length > 0) {
                links.forEach(function (link) { return link.IsDeleted = true; });
            }
            else {
                links = [];
            }
            var newLink = {
                NodeType: 0,
                Title: name,
                SimpleUrl: url,
                FriendlyUrlSegment: ''
            };
            links.unshift(newLink);
            var postContent = {
                menuState: {
                    SPWebPrefix: result.MenuState && result.MenuState.SPWebPrefix,
                    StartingNodeTitle: '3a94b35f-030b-468e-80e3-b75ee84ae0ad',
                    Version: new Date().toTimeString(),
                    Nodes: links
                }
            };
            TAB.Log.AddTaskComment('Then adding new footer link');
            Footer._updateFooterContent(postContent, siteUrl);
            Footer._addTaskReloadFooter();
        }));
    };
    Footer.AddTaskDeleteAllFooterLinks = function (siteUrl) {
        var result = {};
        Footer.AddTaskGetFooterLinks(siteUrl, result);
        TAB.Log.AddTaskComment('Deleting existing footer links');
        TAB.AddTask(TAB.MakeTask(function () {
            var links = result.MenuState && result.MenuState.Nodes;
            TAB.Log.AddTaskComment('Delete existing footer links');
            if (links && links.length > 0) {
                links.forEach(function (link) { return link.IsDeleted = true; });
                var postContent = {
                    menuState: {
                        SPWebPrefix: result.MenuState && result.MenuState.SPWebPrefix,
                        StartingNodeTitle: '3a94b35f-030b-468e-80e3-b75ee84ae0ad',
                        Version: new Date().toTimeString(),
                        Nodes: links
                    }
                };
                Footer._updateFooterContent(postContent, siteUrl);
                Footer._addTaskReloadFooter();
            }
        }));
    };
    Footer.AddTaskVerifyNameField = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Making sure the name input exists on the pane');
        }), TAB.MakeWaiter(function () {
            var ctlPanel = Footer._getCTLPanel();
            return TAB.ElementExists(ctlPanel, TAB.searchBy.partialClassName, 'ms-TextField-field');
        }));
    };
    Footer.AddTaskVerifyFooterAtBottomOfPage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Checking that the footer is at the bottom of the page');
        }), TAB.MakeWaiter(function () {
            var windowHeight = TAB.Win.window.innerHeight;
            var footerElem = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automationid="SimpleFooter"]');
            var rect = footerElem.getBoundingClientRect();
            return rect.bottom === windowHeight;
        }));
    };
    Footer.AddTaskOpenFooterSectionCTL = function () {
        Footer._addTaskLaunchFooterCTLPanel();
        Footer._addTaskClickFooterSectionCtl();
    };
    Footer.AddTaskCloseCTLPanel = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Close CTL');
            var ctlPanel = Footer._getCTLPanel();
            try {
                var closeButton = TAB.GetElement(ctlPanel, TAB.searchBy.hasClassName, 'ms-Panel-closeButton');
                TAB.ClickElement(closeButton);
            }
            catch (e) {
                TAB.Log.AddTaskComment('Could not find the close button for the CTL. This probably means the panel is already closed.');
            }
        }));
    };
    Footer.AddTaskReloadPage = function () {
        Footer._addTaskReloadFooter();
    };
    Footer.AddTaskDeleteFooterLinkUI = function (index) {
        TAB.Log.AddTaskComment('Deleting footer link at index: ' + index);
        // Click edit link
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking edit link in the footer');
            var editLinkDiv = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='SimpleFooter-edit']");
            var editLinkButton = TAB.GetElement(editLinkDiv, TAB.searchBy.tag, 'button');
            TAB.ClickElement(editLinkButton);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.className, 'ms-EditNav');
        }));
        // Click ... next to first item
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking edit menu for the item');
            var editNavButtons = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-EditNav-linkButton');
            TAB.ClickElement(editNavButtons[index]);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'ms-EditNav_contextMenu');
        }));
        // Click delete on contextual menu
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking the remove button');
            var contextualMenu = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'ms-EditNav_contextMenu');
            var buttons = TAB.GetElements(contextualMenu, TAB.searchBy.tag, 'button');
            var lastElemIndex = buttons.length - 1;
            var removeButton = buttons[lastElemIndex];
            TAB.ClickElement(removeButton);
        }), TAB.MakeWaiter(function () {
            var saveButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='EditNav-SaveButton']");
            return !saveButton.classList.contains('is-disabled');
        }));
        // Click save in edit nav panel
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking save button on edit nav panel');
            var saveButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='EditNav-SaveButton']");
            TAB.ClickElement(saveButton);
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.className, 'ms-EditNav');
        }));
    };
    Footer._addTaskClickFooterSectionCtl = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click footer panel');
            var ctlElem = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'sp-ChangeTheLookPanel');
            var footerElem = TAB.GetElement(ctlElem, TAB.searchBy.customQuery, '[data-chrome-type="Footer"]');
            TAB.ClickElement(footerElem);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'sp-ChangeTheLookPanel-footerProperty');
        }));
    };
    Footer._getCTLPanel = function () {
        try {
            var ctlPanel = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'sp-ChangeTheLookPanel')[0];
            return ctlPanel;
        }
        catch (error) {
            return undefined;
        }
    };
    Footer._updateFooterContent = function (footerContent, siteUrl) {
        var targetUrl = siteUrl + '/_api/navigation/SaveMenuState';
        var result = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendPostRequest(siteUrl, targetUrl, JSON.stringify(footerContent), result, true /* fetchCanary */);
    };
    Footer._addTaskLaunchFooterCTLPanel = function () {
        var launchCTLFunction;
        TAB.AddTask(TAB.MakeTask(function () {
            // tslint:disable-next-line:no-string-literal no-unused-expression
            launchCTLFunction = TAB.Win.window['_spLaunchChangeTheLookPanel'];
            if (launchCTLFunction) {
                launchCTLFunction();
            }
            else {
                TAB.Log.Comment("Can't find _spLaunchChangeTheLookPanel");
            }
        }), TAB.MakeWaiter(function () {
            if (launchCTLFunction) {
                return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-chrome-type="Footer"]');
            }
            else {
                // tslint:disable-next-line:no-string-literal no-unused-expression
                launchCTLFunction = TAB.Win.window['_spLaunchChangeTheLookPanel'];
                if (launchCTLFunction) {
                    launchCTLFunction();
                }
                return false;
            }
        }));
    };
    Footer._addTaskSaveCloseCTLPanel = function () {
        // click to save change
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click save footer change');
            var saveButton = TAB.GetElement(Footer._ctlElem, TAB.searchBy.customQuery, '[data-automationid="changethelookpanel-savebutton"]');
            TAB.ClickElement(saveButton);
        }));
        // click to close CTL
        Footer.AddTaskCloseCTLPanel();
    };
    Footer._addTaskReloadFooter = function () {
        TAB.AddTask(TAB.ReloadPage(), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automationid="SimpleFooter"]');
        }));
    };
    Footer._addTaskWaitOnSettingsGear = function () {
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[title="Settings"]');
        }));
    };
    return Footer;
}());



/***/ }),

/***/ "PGxG":
/*!********************************************************!*\
  !*** ./lib/SPTaskLib/Controls/EmbeddedVideoWebPart.js ***!
  \********************************************************/
/*! exports provided: EmbeddedVideoWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmbeddedVideoWebPart", function() { return EmbeddedVideoWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var EmbeddedVideoWebPart = /** @class */ (function (_super) {
    __extends(EmbeddedVideoWebPart, _super);
    function EmbeddedVideoWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].EmbeddedVideo, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].EmbeddedVideo.toString()) || this;
    }
    EmbeddedVideoWebPart.prototype.AddTaskAddWebPartOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _this.AddTaskAssertWebPartNotExist();
            _this.AddTaskSetupNewPage();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="o365video-source-input"]'));
    };
    EmbeddedVideoWebPart.prototype.AddTaskAssertWebPartNotExist = function () {
        TAB.MakeTask(function () {
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class^="HTMLEmbed"]')) {
                throw 'Embedded video web part should not exist.';
            }
        })
            .WaitFor(undefined);
    };
    EmbeddedVideoWebPart.prototype.AddTaskTryInputEmbedCode = function (embedCode, shouldBeRenderSuccessful) {
        TAB.AddTask(TAB.MakeTask(function () {
            var inputEmbedCodeArea = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="o365video-source-input"]');
            // input url
            inputEmbedCodeArea.focus();
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(inputEmbedCodeArea, embedCode);
        }), shouldBeRenderSuccessful
            ? this.WaitForElementWithClassToExist('embedCode')
            : this.WaitForElementWithClassToExist('ms-TextField-errorMessage'));
    };
    EmbeddedVideoWebPart.prototype.PropertyPaneExisits = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class^="spPropertyPaneContainer"]');
    };
    EmbeddedVideoWebPart.prototype.WaitForElementWithClassToExist = function (className) {
        // The className is the first class, or the second one. See https://stackoverflow.com/a/8588532/1436671
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[class^=\"" + className + "\"], [class*=\" " + className + "\"]");
    };
    return EmbeddedVideoWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "QcF0":
/*!***************************************!*\
  !*** ./lib/SPTaskLib/Pages/Router.js ***!
  \***************************************/
/*! exports provided: Router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/**
 * @public
 */
var Router = /** @class */ (function () {
    function Router() {
    }
    // In Hybrid mobile view, this mocks callback for native app.
    Router.AddTaskToEmulateNativeAppCallback = function (webpart, expectedArgs) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Setting the web view callback handler');
            TAB.Win.window[Router.Callbackhandler] = {
                postMessage: function (args) {
                    if (!args) {
                        TAB.Log.AddTaskFail('args should not be undefined');
                    }
                    webpart.ValidationMobileViewParameters(args, expectedArgs);
                }
            };
        }), Router.WaitForCallbackHandler());
    };
    Router.WaitForCallbackHandler = function () {
        var callbackHandler = undefined;
        return TAB.MakeWaiter(function () {
            callbackHandler = TAB.Win.window[Router.Callbackhandler];
            return Boolean(callbackHandler);
        });
    };
    Router.Callbackhandler = '__callbackHandler';
    return Router;
}());



/***/ }),

/***/ "Qf+y":
/*!************************************!*\
  !*** ./lib/SPTaskLib/ReactUtil.js ***!
  \************************************/
/*! exports provided: ReactUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactUtil", function() { return ReactUtil; });
/* tslint:disable */
/**
 * @public
 */
var ReactUtil = /** @class */ (function () {
    function ReactUtil() {
    }
    // Refer to https://github.com/vitalyq/react-trigger-change
    // Ihis method is to trigger onChange event for React components. It doesn't cover all the element type and browsers.
    // If you found it doesn't work for your element, please add your triggering logic here. Thanks!
    ReactUtil.TriggerOnChange = function (element, value) {
        element.focus();
        var focusEvent = TAB.Win.document.createEvent('HTMLEvents');
        focusEvent.initEvent('focus', true, false);
        element.dispatchEvent(focusEvent);
        element.value = value;
        // For React >= 15.6.0
        var initialValue = element.value;
        var descriptor = Object.getOwnPropertyDescriptor(element, 'value');
        element.value = initialValue + ' ';
        if (descriptor && descriptor.configurable) {
            delete element['value'];
        }
        element.value = initialValue;
        if (TAB.browserIs.ie) {
            // This is a non-standard event just for IE
            var propertyChangeEvent = TAB.Win.document.createEvent('HTMLEvents'); // tslint:disable-line:no-any
            propertyChangeEvent.initEvent('propertychange', true, false);
            propertyChangeEvent.propertyName = 'value';
            element.dispatchEvent(propertyChangeEvent);
        }
        else {
            var inputEvent = TAB.Win.document.createEvent('HTMLEvents');
            inputEvent.initEvent('input', true, false);
            element.dispatchEvent(inputEvent);
        }
    };
    return ReactUtil;
}());



/***/ }),

/***/ "R7tR":
/*!***************************************************************!*\
  !*** ./lib/SPTaskLib/Controls/ListViewWebparWithItemsView.js ***!
  \***************************************************************/
/*! exports provided: ListViewWebparWithItemsView */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListViewWebparWithItemsView", function() { return ListViewWebparWithItemsView; });
/* harmony import */ var _ListViewWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ListViewWebpart */ "Aitv");
/* harmony import */ var _CommandBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommandBar */ "CPNt");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var ListViewWebparWithItemsView = /** @class */ (function (_super) {
    __extends(ListViewWebparWithItemsView, _super);
    function ListViewWebparWithItemsView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListViewWebparWithItemsView.prototype.AddTaskDeleteFolder = function (folderName) {
        var _this = this;
        var checkbox;
        TAB.Log.AddTaskComment('Waiting for target folder to render');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                var items = TAB.GetElements(_this._root, TAB.searchBy.customQuery, '[data-automationid="ListCell"]');
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    var name_1 = _this._getTitleElement(item);
                    if (TAB.GetTextContent(name_1).indexOf(folderName) > -1) {
                        checkbox = TAB.GetElement(item, TAB.searchBy.customQuery, '[data-automationid="DetailsRowCheck"]');
                        return true;
                    }
                }
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Selecting folder');
            TAB.ClickElement(checkbox);
        }));
        TAB.AddTask(undefined, _CommandBar__WEBPACK_IMPORTED_MODULE_1__["CommandBar"].WaitForCommandBar({ area: 'primary', waitForItems: true }));
        // Delete the selected folder
        TAB.AddTask(this._getClickDeleteCommandTask());
    };
    ListViewWebparWithItemsView.prototype.AddTaskVerifyFolderDeleted = function (folderName, result) {
        var _this = this;
        TAB.Log.AddTaskComment('Verifying deleted folder does not appear in list');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                var items = TAB.GetElements(_this._root, TAB.searchBy.customQuery, '[data-automationid="ListCell"]');
                for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                    var item = items_2[_i];
                    var nameElements = TAB.GetElements(item, TAB.searchBy.customQuery, '[data-automationid="FieldRenderer-name"]');
                    // skip the placeholder elements.
                    if (!nameElements || nameElements.length < 1) {
                        continue;
                    }
                    var name_2 = nameElements[0];
                    if (TAB.GetTextContent(name_2) === folderName) {
                        result.success = false;
                        return false;
                    }
                }
                TAB.Log.Pass('Deleted folder does not appear in list');
                result.success = true;
                return true;
            }
            catch (e) {
                return false;
            }
        }));
    };
    ListViewWebparWithItemsView.prototype.AddTaskDeleteFirstItem = function () {
        var _this = this;
        var titleToDelete;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Selecting first item');
            var items = TAB.GetElements(_this._root, TAB.searchBy.customQuery, '[data-automationid="ListCell"]');
            var firstItem = items[0];
            titleToDelete = TAB.GetTextContent(_this._getTitleElement(firstItem));
            var checkbox = TAB.GetElement(firstItem, TAB.searchBy.customQuery, '[data-automationid="DetailsRowCheck"]');
            TAB.ClickElement(checkbox);
        }));
        TAB.AddTask(undefined, _CommandBar__WEBPACK_IMPORTED_MODULE_1__["CommandBar"].WaitForCommandBar({ area: 'primary', waitForItems: true }));
        // Delete the selected item
        TAB.AddTask(this._getClickDeleteCommandTask());
        TAB.Log.AddTaskComment('Waiting for item to be removed from list');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                var items = TAB.GetElements(_this._root, TAB.searchBy.customQuery, '[data-automationid="ListCell"]');
                var itemStillExists = false;
                for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                    var item = items_3[_i];
                    var titleElement = _this._getTitleElement(item);
                    if (!titleElement) {
                        // Items are shimmer items.
                        return false;
                    }
                    var currentTitle = TAB.GetTextContent(titleElement);
                    if (currentTitle === titleToDelete) {
                        itemStillExists = true;
                        break;
                    }
                }
                if (!itemStillExists) {
                    TAB.Log.Pass('Item successfully deleted');
                    return true;
                }
            }
            catch (e) {
                return false;
            }
        }));
    };
    ListViewWebparWithItemsView.prototype.AddTaskFilter = function (columnName, filterValue) {
        this._addTaskClickColumnHeader(columnName);
        this._addTaskClickContextMenuItemByIndex('Filter by', 2); // "Filter by" is third item in column context menu
        TAB.Log.AddTaskComment('Waiting for filter pane to render');
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-Panel-content'));
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[data-automationid="CheckboxGroup"]'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Selecting filter by " + filterValue);
            var filterPane = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Panel-content');
            var targetField = TAB.GetElement(filterPane, TAB.searchBy.customQuery, "[data-checked-label=\"" + filterValue + "\"]");
            var checkbox = TAB.GetElement(targetField, TAB.searchBy.tag, 'input');
            TAB.ClickElement(checkbox);
            TAB.Log.Comment('Clicking "Apply" filter');
            var applyButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automationid="FilterPanel-Apply"]');
            TAB.ClickElement(applyButton);
        }));
    };
    ListViewWebparWithItemsView.prototype.AddTaskAddNewFolder = function (folderName) {
        var _this = this;
        var commandBar;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting for CommandBar');
            TAB.AddTask(undefined, _CommandBar__WEBPACK_IMPORTED_MODULE_1__["CommandBar"].WaitForCommandBar({ area: 'primary' }, _this._root));
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting for "New" button');
            commandBar = new _CommandBar__WEBPACK_IMPORTED_MODULE_1__["CommandBar"]({ area: 'primary', rootElement: _this._root });
            commandBar.AddTaskEnsureCommandBarItem({ iconClassName: 'CalculatorAddition', automationId: 'newCommand', title: undefined }, true, // Reset root because command bar loads async
            { area: 'primary', rootElement: _this._root, isReact: _CommandBar__WEBPACK_IMPORTED_MODULE_1__["CommandBar"].isReact });
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking "New" button');
            commandBar.AddTaskEnsureClickCommandBarItem({ iconClassName: 'CalculatorAddition', automationId: 'newCommand', title: undefined });
        }));
        this._addTaskClickContextMenuItemByIndex('Folder', 0); // Folder is first item in "New" context menu
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Adding new folder');
            var dialog = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-main');
            var input = TAB.GetElement(dialog, TAB.searchBy.tag, 'input');
            input.focus();
            input.value = folderName;
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(input, folderName);
            var createButton = TAB.GetElement(dialog, TAB.searchBy.hasClassName, 'ms-Button--primary');
            TAB.ClickElement(createButton);
        }));
    };
    ListViewWebparWithItemsView.prototype._getTitleElement = function (item) {
        try {
            var elements = TAB.GetElements(item, TAB.searchBy.customQuery, "[data-automationid=\"FieldRenderer-name\"]");
            if (!elements || elements.length === 0) {
                elements = TAB.GetElements(item, TAB.searchBy.customQuery, "[data-automationid=\"FieldRenderer-title\"]");
            }
            return elements[0];
        }
        catch (e) {
            return undefined;
        }
    };
    ListViewWebparWithItemsView.prototype._getClickDeleteCommandTask = function () {
        var _this = this;
        return TAB.MakeTask(function () {
            var commandBar = new _CommandBar__WEBPACK_IMPORTED_MODULE_1__["CommandBar"]({ area: 'primary', rootElement: _this._root });
            commandBar.AddTaskEnsureClickCommandBarItem({ title: undefined, iconClassName: 'delete', automationId: 'deleteCommand' });
            TAB.Log.AddTaskComment('Waiting for confirm delete dialog');
            TAB.AddTask(undefined, TAB.MakeWaiter(function () {
                try {
                    var dialog = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-actions');
                    if (dialog && dialog.length) {
                        return true;
                    }
                }
                catch (e) {
                    return false;
                }
            }));
            TAB.AddTask(TAB.MakeTask(function () {
                TAB.Log.Comment('Confirming delete');
                var dialogActions = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-actions');
                var confirmDeleteBtn = TAB.GetElements(dialogActions, TAB.searchBy.tag, 'button')[0];
                TAB.ClickElement(confirmDeleteBtn);
            }));
        });
    };
    return ListViewWebparWithItemsView;
}(_ListViewWebpart__WEBPACK_IMPORTED_MODULE_0__["ListViewWebpart"]));



/***/ }),

/***/ "S6R0":
/*!************************************************!*\
  !*** ./lib/SPTaskLib/Controls/FormsWebPart.js ***!
  \************************************************/
/*! exports provided: FormsWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FormsWebPart", function() { return FormsWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var FormsWebPart = /** @class */ (function (_super) {
    __extends(FormsWebPart, _super);
    function FormsWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Forms, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Forms.toString()) || this;
    }
    FormsWebPart.prototype.addWebPartToPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Add forms web part');
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        }), this.waitForFormsLayout());
    };
    FormsWebPart.prototype.deleteWebPartToPage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Delete forms web part');
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskDeleteZone(0);
        }));
    };
    FormsWebPart.prototype.waitForFormsLayout = function () {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                TAB.Log.AddTaskComment('Verify Forms placeholder layout');
                var elements = _this._placeHolderButtons;
                return elements.length === 2;
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    FormsWebPart.prototype.addTaskOpenCreateFormsPropertyPane = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click create new form button');
            TAB.ClickElement(_this._placeHolderButtons[0]);
        }), this._waitForEditPaneOpen());
    };
    FormsWebPart.prototype.addTaskOpenEmbedFormsPropertyPane = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click embed existing form button');
            TAB.ClickElement(_this._placeHolderButtons[1]);
        }), this._waitForEditPaneOpen());
    };
    FormsWebPart.prototype.addTaskEmbedForms = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Embed existing forms');
            if (_this._urlTextBox) {
                var formsUrl = 'https://forms.office.com/Pages/DesignPage.aspx#FormId=zCCya5GPbkGcbObiBv4OLsGPLFdgjeFKi_LeApIS1sFUOUNLV0JBWFQyVkZQOTQzU0k5TU03TktUNi4u';
                _this._urlTextBox.focus();
                _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(_this._urlTextBox, formsUrl);
            }
        }), this._waitForUrlFilled());
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click OK button to embed forms');
            if (_this._propertyPaneOKButton) {
                TAB.ClickElement(_this._propertyPaneOKButton);
            }
        }), this._waitForEmbedForms());
    };
    FormsWebPart.prototype.waitForCreateFormsPropertyPaneLayout = function () {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                TAB.Log.AddTaskComment('Wait for create new form property pane');
                var textBox = TAB.GetElement(_this._propertyPane, TAB.searchBy.customQuery, "[type='text']");
                var link = TAB.GetElement(_this._propertyPane, TAB.searchBy.tag, 'a');
                var createButton = TAB.GetElement(_this._propertyPane, TAB.searchBy.customQuery, "[type='button']");
                return textBox && link && createButton;
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    FormsWebPart.prototype.waitForEmbedFormsPropertyPaneLayout = function () {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                TAB.Log.AddTaskComment('Wait for embed existing form property pane');
                var links = TAB.GetElements(_this._propertyPane, TAB.searchBy.tag, 'a');
                var radioButtons = TAB.GetElements(_this._propertyPane, TAB.searchBy.customQuery, "[type='radio']");
                return _this._urlTextBox &&
                    _this._propertyPaneOKButton &&
                    links.length === 2 &&
                    radioButtons.length === 2;
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    Object.defineProperty(FormsWebPart.prototype, "_placeHolder", {
        get: function () {
            TAB.Log.AddTaskComment('Get placeholder');
            return TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='forms-webpart-container']");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormsWebPart.prototype, "_placeHolderButtons", {
        get: function () {
            TAB.Log.AddTaskComment('Get placeholder buttons');
            return TAB.GetElements(this._placeHolder, TAB.searchBy.customQuery, "[type='button']");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormsWebPart.prototype, "_propertyPane", {
        get: function () {
            TAB.Log.AddTaskComment('Get property pane');
            return TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'propertyPanePageContent');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormsWebPart.prototype, "_propertyPaneOKButton", {
        get: function () {
            TAB.Log.AddTaskComment('Get property pane OK button');
            return TAB.GetElement(this._propertyPane, TAB.searchBy.customQuery, "[type='button']");
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormsWebPart.prototype, "_urlTextBox", {
        get: function () {
            TAB.Log.AddTaskComment('Get web address text box');
            return TAB.GetElement(this._propertyPane, TAB.searchBy.tag, 'textarea');
        },
        enumerable: true,
        configurable: true
    });
    FormsWebPart.prototype._waitForEditPaneOpen = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Verify edit pane is open');
        var waiter = TAB.MakeWaiter(function () {
            try {
                return !!_this._propertyPane;
            }
            catch (e) {
                TAB.Log.Comment('Failure in open edit pane: ' + e.message);
                return false;
            }
        });
        return waiter;
    };
    FormsWebPart.prototype._waitForUrlFilled = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Verify forms url is filled');
        var waiter = TAB.MakeWaiter(function () {
            try {
                return !!TAB.GetTextContent(_this._urlTextBox);
            }
            catch (e) {
                TAB.Log.Comment('Failure in insert url: ' + e.message);
                return false;
            }
        });
        return waiter;
    };
    FormsWebPart.prototype._waitForEmbedForms = function () {
        TAB.Log.AddTaskComment('Verify form is embeded');
        var waiter = TAB.MakeWaiter(function () {
            try {
                var formsIframe = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[aria-label='For TAB test']");
                return !!formsIframe;
            }
            catch (e) {
                TAB.Log.Comment('Failure in embed forms: ' + e.message);
                return false;
            }
        });
        return waiter;
    };
    return FormsWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "SMhQ":
/*!**************************************************!*\
  !*** ./lib/SPTaskLib/Controls/CommandBarItem.js ***!
  \**************************************************/
/*! exports provided: CommandBarItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommandBarItem", function() { return CommandBarItem; });
/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ContextMenu */ "yis5");
/* harmony import */ var _CommandBar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CommandBar */ "CPNt");


/**
 * @public
*/
var CommandBarItem = /** @class */ (function () {
    function CommandBarItem(root) {
        this.title = '';
        this.root = root;
        var isReact = _CommandBar__WEBPACK_IMPORTED_MODULE_1__["CommandBar"].isReact;
        var iconElement = this._getIconElement(this.root, isReact);
        if (iconElement) {
            this.iconClassName = iconElement.getAttribute('data-icon-name');
            if (this.iconClassName === 'More') {
                this.isOverflow = true;
                return;
            }
        }
        var textClass = isReact ? 'ms-Button-label' : 'CommandBarItem-commandText';
        var textContainer = TAB.GetElements(this.root, TAB.searchBy.hasClassName, textClass);
        if (textContainer && textContainer.length) {
            this.title = TAB.GetTextContent(textContainer[0]);
        }
        if (this.root.style.display !== 'none') {
            this.isVisible = true;
        }
    }
    Object.defineProperty(CommandBarItem.prototype, "Title", {
        get: function () {
            return this.title;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandBarItem.prototype, "IconClassName", {
        get: function () {
            return this.iconClassName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandBarItem.prototype, "IsOverflow", {
        get: function () {
            return this.isOverflow;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommandBarItem.prototype, "IsVisible", {
        get: function () {
            return this.isVisible;
        },
        enumerable: true,
        configurable: true
    });
    CommandBarItem.prototype.AddTaskOpenContextMenu = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            if (!_ContextMenu__WEBPACK_IMPORTED_MODULE_0__["ContextMenu"].MenuAlreadyOpen()) {
                TAB.Log.AddTaskComment('CommandBarItem: Context menu is not open. Opening it.');
                // add waiter for context menu item
                if (_CommandBar__WEBPACK_IMPORTED_MODULE_1__["CommandBar"].isReact) {
                    TAB.Log.AddTaskComment('Clicking React CommandBar context menu');
                    TAB.ClickElement(_this.root);
                    TAB.AddTask(undefined, _ContextMenu__WEBPACK_IMPORTED_MODULE_0__["ContextMenu"].WaitForOpen());
                }
                else {
                    TAB.Log.AddTaskComment('Clicking Knockout CommandBar context menu');
                    TAB.AddTaskClickElement(_this.root, TAB.searchBy.hasClassName, 'CommandBarItem-link', _ContextMenu__WEBPACK_IMPORTED_MODULE_0__["ContextMenu"].WaitForOpen());
                }
            }
            else {
                TAB.Log.AddTaskComment('CommandBarItem: Context menu is already open.');
            }
        }));
    };
    CommandBarItem.prototype.AddTaskClick = function () {
        if (_CommandBar__WEBPACK_IMPORTED_MODULE_1__["CommandBar"].isReact) {
            TAB.Log.AddTaskComment("Clicking React CommandBar item \"" + this.Title + "\"");
            TAB.ClickElement(this.root);
        }
        else {
            TAB.Log.AddTaskComment("Clicking Knockout CommandBar item \"" + this.Title + "\"");
            TAB.AddTaskClickElement(this.root, TAB.searchBy.hasClassName, 'CommandBarItem-link');
        }
    };
    CommandBarItem.prototype._getIconElement = function (root, isReact) {
        if (isReact) {
            var primary = TAB.GetElements(root, TAB.searchBy.hasClassName, 'ms-Button-icon')[0];
            return primary || TAB.GetElements(root, TAB.searchBy.hasClassName, 'ms-Button-menuIcon')[0];
        }
        else {
            return TAB.GetElements(root, TAB.searchBy.hasClassName, 'ms-Icon')[0];
        }
    };
    return CommandBarItem;
}());



/***/ }),

/***/ "TwX4":
/*!***********************************************!*\
  !*** ./lib/SPTaskLib/Controls/NewsWebPart.js ***!
  \***********************************************/
/*! exports provided: NewsWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsWebPart", function() { return NewsWebPart; });
/* harmony import */ var _BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseCollectionWebPart */ "kQju");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _RTEWebPart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RTEWebPart */ "mXly");
/* harmony import */ var _TitleRegion__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TitleRegion */ "e5Kj");
/* harmony import */ var _Upload__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Upload */ "dAVj");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var NewsWebpartId;
(function (NewsWebpartId) {
    NewsWebpartId["CarouselNewsLayout"] = "CarouselNewsLayout";
    NewsWebpartId["FeaturedNewsLayout"] = "featuredNewsLayout";
    NewsWebpartId["GridNewsLayout"] = "gridNewsLayout";
    NewsWebpartId["HeroNewsLayout"] = "Tiles";
    NewsWebpartId["HubNewsLayout"] = "hubNewsLayout";
    NewsWebpartId["ListNewsLayout"] = "listNewsLayout";
    NewsWebpartId["RecommendedSite"] = "PropertyPaneChoiceGroup-4";
    NewsWebpartId["SelectSite"] = "PropertyPaneChoiceGroup-3";
    NewsWebpartId["ThisSite"] = "PropertyPaneChoiceGroup-1";
    NewsWebpartId["PropertyPaneCarouselNewsLayout"] = "PropertyPaneChoiceGroup-Carousel";
    NewsWebpartId["PropertyPaneFeaturedNewsLayout"] = "PropertyPaneChoiceGroup-FeaturedNews";
    NewsWebpartId["PropertyPaneGridNewsLayout"] = "PropertyPaneChoiceGroup-GridNews";
    NewsWebpartId["PropertyPaneHeroNewsLayout"] = "PropertyPaneChoiceGroup-Hero";
    NewsWebpartId["PropertyPaneHubNewsLayout"] = "PropertyPaneChoiceGroup-NewsHub";
    NewsWebpartId["PropertyPaneListNewsLayout"] = "PropertyPaneChoiceGroup-ListNews";
})(NewsWebpartId || (NewsWebpartId = {}));
var ElementAutomationId;
(function (ElementAutomationId) {
    ElementAutomationId["AddButton"] = "newsAddButton";
    ElementAutomationId["Description"] = "newsItemDescription";
    ElementAutomationId["Item"] = "newsItem";
    ElementAutomationId["LinkOption"] = "newsLinkOption";
    ElementAutomationId["LinkUrl"] = "newslink-url";
    ElementAutomationId["PostOption"] = "newsPostOption";
    ElementAutomationId["SeeAll"] = "newsSeeAllLink";
    ElementAutomationId["TemplateCreateButton"] = "template-panel-create-button";
    ElementAutomationId["Title"] = "newsItemTitle";
    ElementAutomationId["WebPart"] = "ControlZone";
})(ElementAutomationId || (ElementAutomationId = {}));
var ElementClassName;
(function (ElementClassName) {
    ElementClassName["ControlZone"] = "ControlZone--selected";
    ElementClassName["MSMainPanel"] = "ms-Panel-main";
})(ElementClassName || (ElementClassName = {}));
/**
 * @public
 */
var NewsWebPart = /** @class */ (function (_super) {
    __extends(NewsWebPart, _super);
    function NewsWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].News, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].News.toString()) || this;
    }
    NewsWebPart.AddTaskWaitTimer = function () {
        var startTimeInMs;
        TAB.AddTask(TAB.MakeTask(function () {
            startTimeInMs = new Date().getTime();
        }), TAB.MakeWaiter(function () {
            return new Date().getTime() - startTimeInMs >= 3000;
        }));
    };
    NewsWebPart._byAutoId = function (id) {
        return "[data-automation-id='" + id + "']";
    };
    NewsWebPart.prototype.AddTaskAddWebPartOnNewTeamSitePage = function (useExistingPage, site, title) {
        if (useExistingPage) {
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].AddTaskEditPage();
        }
        else {
            this.AddTaskSetupNewPage(site);
            var pageTitle = title || TAB.GetUniqueName('News Test Page');
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].AddTaskAddPageTitle(pageTitle);
        }
        _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"].AddTaskCreateWebPart(this);
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting for news webpart to render on page');
        }), this.WaitForWebPartEmptyStateToExist());
    };
    NewsWebPart.prototype.AddTaskAddWebpartOnPage = function (publishPage) {
        publishPage = (typeof publishPage !== 'undefined') ? publishPage : true;
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].AddTaskEditPage();
        _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"].AddTaskCreateWebPart(this, {
            skipWebPartBind: true
        });
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Waiting for news webpart to render on page');
        }), this.WaitForWebPartEmptyStateToExist());
        if (publishPage) {
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].AddTaskPublishPage(true);
        }
    };
    NewsWebPart.prototype.AddTaskClickAddButton = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for add button. If the TAB test times out on this waiter,\n        then the button either isn't on the page or it is not clickable.");
        }), TAB.MakeWaiter(function () {
            try {
                return _this.GetAddButton(true);
            }
            catch (error) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking news webpart add button');
            TAB.ClickElement(_this.GetAddButton(true));
        }), TAB.MakeWaiter(function () {
            try {
                TAB.Log.Comment('Waiting for news post menu');
                return _this._hasElementWithAutoId(ElementAutomationId.PostOption);
            }
            catch (error) {
                return false;
            }
        }));
    };
    NewsWebPart.prototype.AddTaskClickNewsPostOption = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for the \"News post\" menu option. If the TAB test times out on this waiter,\n        then the news post option either isn't on the page or it is not clickable.");
        }), TAB.MakeWaiter(function () {
            try {
                TAB.Log.Comment('Waiting for news post menu to click');
                return Boolean(_this.GetNewsPostOption());
            }
            catch (error) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking news post option');
            TAB.ClickElement(_this.GetNewsPostOption());
        }), TAB.MakeWaiter(function () {
            try {
                TAB.Log.Comment('Waiting to navigate to page template panel');
                return _this._hasElementByClassName(ElementClassName.MSMainPanel);
            }
            catch (error) {
                return false;
            }
        }));
    };
    NewsWebPart.prototype.AddTaskClickNewsLinkOption = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for the \"News link\" menu option. If the TAB test times out on this waiter,\n        then the news link option either isn't on the page or it is not clickable.");
        }), TAB.MakeWaiter(function () {
            return Boolean(_this.GetNewsLinkOption());
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking news link option');
            TAB.ClickElement(_this.GetNewsLinkOption());
        }), TAB.MakeWaiter(function () {
            return Boolean(_this.GetNewsLinkUrlInput());
        }));
    };
    NewsWebPart.prototype.AddTaskSelectStubFromBlankPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Waiting to click on create page button');
        }), TAB.MakeWaiter(function () {
            try {
                var propertyPane = _this._getMainPanel();
                if (!propertyPane) {
                    return false;
                }
                return _this._hasElementWithAutoId(ElementAutomationId.TemplateCreateButton, propertyPane);
            }
            catch (error) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            var propertyPane = _this._getMainPanel();
            if (!propertyPane) {
                return undefined;
            }
            TAB.ClickElement(_this._getElementByAutoId(ElementAutomationId.TemplateCreateButton, propertyPane));
        }), TAB.MakeWaiter(function () {
            try {
                return !_this._hasElementByClassName(ElementClassName.MSMainPanel);
            }
            catch (error) {
                return false;
            }
        }));
    };
    NewsWebPart.prototype.AddTaskCreateNewsArticle = function (title, description, titleImageUpload) {
        var _this = this;
        var textWebPart = new _RTEWebPart__WEBPACK_IMPORTED_MODULE_4__["RTEWebPart"]();
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].AddTaskAddPageTitle(title);
        if (titleImageUpload) {
            this.AddTaskUploadTitleImage();
        }
        if (description) {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"].AddTaskCreateWebPart(textWebPart, {
                skipWebPartBind: true
            });
            TAB.AddTask(TAB.MakeTask(function () {
                TAB.Log.Comment('Waiting for RTE webpart to appear');
            }), TAB.MakeWaiter(function () {
                return _this._hasElementWithAutoId(ElementAutomationId.WebPart);
            }));
            // called here instead of in Canvas.AddTaskCreateWebPart so that it can be run in deterministic order
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"].AddTaskBindWebPart(textWebPart, false /* isAddingFromToolbox */);
            textWebPart.AddTaskToAddTextInRTE(description);
        }
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].AddTaskPublishPage(true, true);
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Waiting for news article to render');
        }), this._waitForNewsArticleToRender(title, description, titleImageUpload));
    };
    NewsWebPart.prototype.AddTaskClickSeeAllLink = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Waiting for see-all link');
        }), TAB.MakeWaiter(function () {
            return Boolean(_this.GetSeeAllLinks()[0]);
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking news see-all link');
            TAB.ClickElement(_this.GetSeeAllLinks()[0]);
        }), TAB.MakeWaiter(function () {
            TAB.Log.Comment('Waiting to redirect to news L2 page');
            return TAB.Win.location.href.indexOf('_layouts/15/news.aspx') > -1
                && _this._hasLayout(NewsWebpartId.ListNewsLayout);
        }));
    };
    NewsWebPart.prototype.AddTaskSetFeaturedNewsLayout = function () {
        this.AddTaskSetNewsChoiceGroupConfig(NewsWebpartId.PropertyPaneFeaturedNewsLayout, NewsWebpartId.FeaturedNewsLayout);
    };
    NewsWebPart.prototype.AddTaskSetListNewsLayout = function () {
        this.AddTaskSetNewsChoiceGroupConfig(NewsWebpartId.PropertyPaneListNewsLayout, NewsWebpartId.ListNewsLayout);
    };
    NewsWebPart.prototype.AddTaskSetGridNewsLayout = function () {
        this.AddTaskSetNewsChoiceGroupConfig(NewsWebpartId.PropertyPaneGridNewsLayout, NewsWebpartId.GridNewsLayout);
    };
    NewsWebPart.prototype.AddTaskSetHubNewsLayout = function () {
        this.AddTaskSetNewsChoiceGroupConfig(NewsWebpartId.PropertyPaneHubNewsLayout, NewsWebpartId.HubNewsLayout);
    };
    NewsWebPart.prototype.AddTaskSetHeroNewsLayout = function () {
        this.AddTaskSetNewsChoiceGroupConfig(NewsWebpartId.PropertyPaneHeroNewsLayout, NewsWebpartId.HeroNewsLayout, NewsWebpartId.CarouselNewsLayout);
    };
    NewsWebPart.prototype.AddTaskSetCarouselNewsLayout = function () {
        this.AddTaskSetNewsChoiceGroupConfig(NewsWebpartId.PropertyPaneCarouselNewsLayout, NewsWebpartId.CarouselNewsLayout);
    };
    NewsWebPart.prototype.AddTaskSetThisSite = function () {
        this.AddTaskSetNewsChoiceGroupConfig(NewsWebpartId.ThisSite, NewsWebpartId.ThisSite);
    };
    NewsWebPart.prototype.AddTaskSetSelectSite = function () {
        this.AddTaskSetSitePicker(NewsWebpartId.SelectSite);
    };
    NewsWebPart.prototype.AddTaskSetRecommendedSite = function () {
        this.AddTaskSetNewsChoiceGroupConfig(NewsWebpartId.RecommendedSite, NewsWebpartId.GridNewsLayout);
    };
    NewsWebPart.prototype.WaitForWebPartEmptyStateToExist = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                return _this._hasLayout(NewsWebpartId.FeaturedNewsLayout)
                    || _this._hasLayout(NewsWebpartId.ListNewsLayout)
                    || _this._hasLayout(NewsWebpartId.GridNewsLayout)
                    || _this._hasLayout(NewsWebpartId.HubNewsLayout)
                    || _this._hasLayout(NewsWebpartId.CarouselNewsLayout)
                    || _this._hasLayout(NewsWebpartId.HeroNewsLayout);
            }
            catch (error) {
                return false;
            }
        });
    };
    NewsWebPart.prototype.GetAddButton = function (verboseLogging) {
        if (verboseLogging === void 0) { verboseLogging = false; }
        return this._getClickableButton(ElementAutomationId.AddButton, 'add button', verboseLogging);
    };
    NewsWebPart.prototype.GetNewsPostOption = function () {
        return this._getElementByAutoId(ElementAutomationId.PostOption);
    };
    NewsWebPart.prototype.GetNewsLinkOption = function () {
        return this._getElementByAutoId(ElementAutomationId.LinkOption);
    };
    NewsWebPart.prototype.GetNewsLinkUrlInput = function () {
        return this._getElementByAutoId(ElementAutomationId.LinkUrl);
    };
    NewsWebPart.prototype.GetSeeAllLink = function () {
        return this._getElementByAutoId(ElementAutomationId.SeeAll);
    };
    NewsWebPart.prototype.GetSeeAllLinks = function () {
        return this._getAllByAutoId(ElementAutomationId.SeeAll);
    };
    NewsWebPart.prototype.AddTaskValidateNewsItem = function (title) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            return;
        }), TAB.MakeWaiter(function () {
            // find all news titles
            var elements = _this._getAllByAutoId(ElementAutomationId.Title, TAB.Win.document.body);
            // find the news post with a matching title (.filter not available in the returned object)
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].textContent === title) {
                    // signal done if a match was found
                    return true;
                }
            }
            return false;
        }));
    };
    NewsWebPart.prototype.AddTaskValidateNewsItemsByAuthor = function (author) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            return;
        }), TAB.MakeWaiter(function () {
            var selectedWebpart = _this._getElementsByClassName(ElementClassName.ControlZone);
            if (!selectedWebpart || !selectedWebpart[0]) {
                return false;
            }
            var elements = TAB.GetElements(selectedWebpart[0], TAB.searchBy.partialClassName, "authorDate");
            // find the news post with a matching author
            for (var i = 0; i < elements.length; i++) {
                if (elements[i].getElementsByTagName('span') && elements[i].getElementsByTagName('span')[0]) {
                    var spanAuthor = elements[i].getElementsByTagName('span')[0];
                    if (spanAuthor.innerHTML.toLocaleLowerCase().search(author.toLocaleLowerCase()) === -1) {
                        return false;
                    }
                }
            }
            return true;
        }));
    };
    NewsWebPart.prototype.AddTaskValidateOneNewsItemRendered = function (title) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            return;
        }), TAB.MakeWaiter(function () {
            var webparts = _this._getAllByAutoId(ElementAutomationId.WebPart);
            if (!webparts || !webparts[0]) {
                return false;
            }
            var elements = _this._getAllByAutoId(ElementAutomationId.Title, webparts[0]);
            return elements.length === 1 && elements[0].textContent === title;
        }));
    };
    NewsWebPart.prototype._getMainPanel = function () {
        return this._getElementByClassName(ElementClassName.MSMainPanel);
    };
    /**
     * return element with specified class name in specified scope
     * @param className - className attribute value
     * @param searchObj - container to search within, or full window if not specified
     */
    NewsWebPart.prototype._getElementByClassName = function (className, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        return TAB.GetElement(searchObj, TAB.searchBy.hasClassName, className);
    };
    /**
     * return elements with specified class name in specified scope
     * @param className - className attribute value
     * @param searchObj - container to search within, or full window if not specified
     */
    NewsWebPart.prototype._getElementsByClassName = function (className, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        return TAB.GetElements(searchObj, TAB.searchBy.hasClassName, className);
    };
    /**
     * return elements with specified class name in specified scope
     * @param className - className attribute value
     * @param searchObj - container to search within, or full window if not specified
     */
    NewsWebPart.prototype._hasElementByClassName = function (className, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        return TAB.ElementExists(searchObj, TAB.searchBy.hasClassName, className);
    };
    NewsWebPart.prototype._hasLayout = function (layout) {
        return this._hasElementWithAutoId(layout);
    };
    /**
     * Checks if theres any elements with specified automation id in specified scope
     * @param dataAutomationId - data-automation-id attribute value
     * @param searchObj - container to search within, or full window if not specified
     */
    NewsWebPart.prototype._hasElementWithAutoId = function (dataAutomationId, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.ElementExists(searchObj, TAB.searchBy.customQuery, NewsWebPart._byAutoId(dataAutomationId));
        }
        catch (e) {
            return false;
        }
    };
    /**
     * Returns a single element with data automation id in specified scope
     * @param dataAutomationId - data-automation-id attribute value
     * @param searchObj - container to search within, or full window if not specified
     */
    NewsWebPart.prototype._getElementByAutoId = function (dataAutomationId, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.GetElement(searchObj, TAB.searchBy.customQuery, NewsWebPart._byAutoId(dataAutomationId));
        }
        catch (e) {
            return undefined;
        }
    };
    /**
     * Returns an array of elements with provided automation id in specified scope
     * @param dataAutomationId - data-automation-id attribute value
     * @param searchObj - container to search within, or full window if not specified
     */
    NewsWebPart.prototype._getAllByAutoId = function (dataAutomationId, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.GetElements(searchObj, TAB.searchBy.customQuery, NewsWebPart._byAutoId(dataAutomationId));
        }
        catch (e) {
            return undefined;
        }
    };
    NewsWebPart.prototype._getClickableButton = function (dataAutomationId, clickableElementNameForComment, verboseLogging) {
        if (verboseLogging === void 0) { verboseLogging = false; }
        try {
            var addBtn = this._getElementByAutoId(dataAutomationId);
            if (addBtn && addBtn.attributes['data-is-focusable'].value === 'true' && addBtn.tagName === 'BUTTON') {
                return addBtn;
            }
            else if (verboseLogging) {
                if (!addBtn) {
                    TAB.Log.Comment("Cannot find the " + clickableElementNameForComment + ".");
                }
                else {
                    TAB.Log.Comment("Found the " + clickableElementNameForComment + ", but it is not clickable.");
                }
            }
        }
        catch (e) {
            return undefined;
        }
        return undefined;
    };
    NewsWebPart.prototype._waitForNewsArticleToRender = function (articleTitle, description, titleImageUpload) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var newsItems = _this._getAllByAutoId(ElementAutomationId.Item);
                var articleFound = false;
                for (var _i = 0, newsItems_1 = newsItems; _i < newsItems_1.length; _i++) {
                    var item = newsItems_1[_i];
                    var titleFound = _this._hasElementWithAutoId(ElementAutomationId.Title, item) &&
                        TAB.GetTextContent(_this._getElementByAutoId(ElementAutomationId.Title, item)) === articleTitle;
                    var textFound = true;
                    var maxDescriptionChars = 20;
                    if (description) {
                        textFound = _this._hasElementWithAutoId(ElementAutomationId.Description, item) &&
                            TAB.GetTextContent(_this._getElementByAutoId(ElementAutomationId.Description, item)).substr(0, maxDescriptionChars) === description.substr(0, maxDescriptionChars);
                    }
                    var thumbNailFound = true;
                    if (titleImageUpload) {
                        thumbNailFound = TAB.ElementExists(item, TAB.searchBy.tag, 'img') &&
                            TAB.ElementExists(item, TAB.searchBy.customQuery, "[title=\"" + articleTitle + "\"]");
                    }
                    articleFound = articleFound || (titleFound && textFound && thumbNailFound);
                }
                return articleFound;
            }
            catch (e) {
                return undefined;
            }
        });
    };
    NewsWebPart.prototype.AddTaskUploadTitleImage = function () {
        var titleRegionWebpart = _TitleRegion__WEBPACK_IMPORTED_MODULE_5__["TitleRegion"].GetTitleRegionWebPart();
        /* tslint:disable-next-line:max-line-length */
        var fileMimeString = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAAAuCAYAAABK69fpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QTAwQkM2Mzk4NDBBMTFFNjhDQkVCOTdDMjE1NkM3RkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QTAwQkM2Mzg4NDBBMTFFNjhDQkVCOTdDMjE1NkM3RkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUuNSAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBMkM5MzFBNDcwQTExMUU2QUVERkExNDU3ODU1M0I3QiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBMkM5MzFBNTcwQTExMUU2QUVERkExNDU3ODU1M0I3QiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgQJy/MAAAxESURBVHja7FwNlFVVFT6PN8MMM8AIjPxomEyggCYgajIaguCkaC5AEocif9CIiLLyp9IMC9NgVRqrGpMSwcFSIs3URHERJoJCSlIgMQk0YCS/MjAww8zrbO/36rz99rnvzpt3Z6Z551trL5hz3z3n3HPO/t/3Rg6NL6lXIeCWXhfk0r99Ji05Hkb/IxojI8vK6lfbrk+fPl05OLQ2OrglcHBwDObg4BjMwcHBMZiDg2MwBwfHYA4ODr7IaW8PNOfliNryeKnqpM50u+vQXJRoGqlpmKZiTUc0HdT0hKa1Wclg+9/urWqqe6pOPf8vpjtYU39Nb4Mc2g6+oukWTSdZLL/sZLDDu4tU/ZE82+VZmko1NQgL9oymymYMPUTT7ZoaWXtU0wuafmm00QS/p+kLmvIhGedpmu3OdauDCiR+gLNiw7GsNRE75DSqSIeY7fJYTVdarp2u6TeajqY5NDFXueXaUcZgozV91fi7QNNdml7U9Cd3xlsVs1IwV1xAZieDpYCf5DlD0wWaVqTRbz9Nl/hcr2N/jxJ+E8H4jsFaD700fVFo365pIfwvcu7/xq53hWV0tqalmrZkK4OlkkrXpMlgE+EEB8V6S/tf3Ta0KiiYcSpre1fT5WxvOkAgfkLTJAjG09D+sslgLkyfiAlNZJQ4Y05t4j2/1/QQa7tf0x/cFrQqBoFxTDwpCD7ysztqukfTNE0DwUs13L93GiwRPTRN0fTjJtxThgBHU1CraYamRzSdrOmfmtZoirktaFU0Cm1vNMH0z3ofLAhI5T+ogkeKbhA2KYhlQJLuFbfcbZ7B6n32L2ZpdwwG7NB0GKZBHOdqGqqC5TnINLiIta1IEfDgdnwcMcsGSyhSXn6mGHtI972vaZem3QHHihkHpLumPvh/NZx5G05AMID+LcAB3K/pPU3/TmMPOmk6BX1SSuM4xv9XE/ujQENvzKsQ/dC89qCvVPvQgPE5cvFvlK1frkWQJvw+2xmMwucLNX3faKO81OSADEZBkW7G3xs1PRuAwegw/QSMorDBFJn6cgozcQhMy3OUV2XQjUnarZr+oulhTc8bG/5d3BMzJPUEHJA7NV2K/mJ4bko37GVjj0H7UAQCehjXDoExyZz6tabfBVg7YuqZCBQMZP1RXnAb5vINi9CI43xN12oarrxorulD12BemzUtUV4FBmfue5UXGazHGnDcrLwgVg5jsCjmzfv7oaZ9uB7Jdgaj518OM+90ZibehQ2yoQAba4LyaDsDjFuIyFS+0XYiGC1mOYxzNF3P7uGScxCIDtpKmLnERBTlupD9/sOafqqSUwbn4qDEQZryATBk1DJ2F2PscgQGvqbpHcvvidkpL/hRn7UdDJpvYbBiY006WvrpDCYgGg/rgnJcm4z9vwhCw4b4PIIgivVLUI/ZDNqYKhwIE30htfxwhUoM6RIzPi5EoWy2PmfeI5bfUtHXUmiu/IDPFROCKnys+5Scj6s17ieN+RIETjTg2BEw43ImtOIgbbHMh7lMHLOYzb2wJtN9mEvCGGj2YQHWPSPIdgaL4OBUCs7sZJ9DRe3Xsbb1MPMKMqxhf6a8yg8J+2CWvpXCjJI0xJU+QqcePs3DFiZR0E5kjm63XKcaywWGGRxftzkQYDwa9xLM6xWGeZonCCxqe0TwfePYjnnZtGdfCMJijFsYtomU7cjHAaV6wXFG+2iYBm8J9wwTDv2CEOY2zaJJKaw/D1piHzQOOffnKa9ANa8JwvN5+Ey1eN5SaI3bmKSP42n4GVW4pwD+z23wh0xcCC0zF3+XwFzlUbcvwWSsh6lbAu06Q2CwuN/GQRHZu5VXNH0EZu5H4GOOEZifinnvgKDsargGvEyK5v6MRRA9wMzHWqz/xv8yWPzrT2Hh3aVT0mbiiopFTb6nIT0tpiCtxzGHdaKFwa5h5to2I6iQKXTHAeDYAH9iG2vfgyAHMcDFKlhObTYOJT84A5Rcj0fpi88L7Tvg8y0TzM6bNP1c0wFNH1LJify16NcM1sTfLljErIhuYEaOF2Bx7BcE0ToEOD7Jrt2AQNObzN/iIG24yrJ+fDyKXK42+2x3JmLj3/Ue5qb1pbiVKvmVkc+o5MLOIjCYid8qL0ydSVwmmFLkt00VmEuxiN5TKnXRMh2a7wjtdZD4XVn7VkT0lM9hmyH4NKQtzjKEGWf8bsJYpkYwfdUyBGdMvAdm2W/powbz4vvTG9qam5+ShSMhT3AhItxFyFkwcn5DGAf9xlWzPhi8YuKSurQ7Wb7EfklFRknfRbxiQLWav+vEdEbbA0b5utHWDwf9Saa9TmaOeGUIS3ip0PaQRaOmgwU+Wk7ybxb6HOI4NkNQjWPtI8DQVNf3PvPLKPL4nPKitqnqQKWgDEVuq1PctxN7eBNrH4tgiQtyhGgimlikEstfSEhcbawTmU9T2D2vKnvxbrrIRbTNBDFDpmoV4/kuG3h+h3yyNQH7flVoiyfyqyzjlsLPIQYrhz8pYbBFEwfB60LbSWGfR1fsm4hNsOdNXG6YauT0f0xgykzjBJWYRI5r2OoM9d/oo41Iu3QRzMaDAfuWoopRo59vKa96RjK5Loa/RO/FfVYwvwqF5wgaPd0ltJ3iGKzlsUAl5l66woEmXMvs9G0qnAp4qWzqqErOZ4Wx95SczWnGWWmwPE8crykvT+b3ag5FJSkUP9dgziLBV2tUwcvLpJRLgWOwlgdJT/5C3VXKSypfleQKen5FphFRyeHpQhVyzgY4LvhmERW80r9TgN+QlUBpjtnKi/TZcKv6X9TwkEXzRZrxrNWOwVoeNYLjS5EwKisqZlL5FyHNoVbQBN1bwqRRXoHtQcF8C/qe3AChTSq2pagepQjoTfLPKS+cLoG+W9IT68EjlDkq+QVJG/oHNGcdg7UAHmXmGPlDl7H1WgVzJywmlzZ/Ugs8OwmOrUJ7WcDzJEU/1/ncQ5qJoqOUGpgnmHyUdD4N/98s3H9JwOcaK7S9FsLaxRyDpcY/lPfWsZ8ZsjjkOSwX2iiCWdoCwvNpoW1qAA1KTHiWwECvBJgThe+pGmSt8BwFhvnOQcUA56eY1wiBwSi9sroZa9QgCIMc7us5BrNLokofB3q7Cv/1/idUckEwmWqPQZsqi9P+aQRq8poxNvlIe1hbDwQeSnwO8YOCMHrU8FM/DvN7UAofkO9F3PeiMP47wprQ8w6z9EftVKWTKwiwjc30VQ8I/ucYznEO9kNGSd0hlms7Qx6ftCh9n+/brJ20yLNgNPrAShWk5lAwHh3iDSp4dE3CNuWVN32TtY/S9EeM/QYCFKdCg0xRyamFvczsy0OgiOZJCWIq8H0Tfh8l9amciadBdhhMRb+jOsj57DdngPkoxL8G8+8L5qJwfy/Bx71HNTttKqYIbgZf0ToNdAxmxxFosSGCRF3cQnOgV0rOVMnRS0I5qA5aI5cdoOaCXkQ8TzCtqJ7wVmONCnxMqFlM4zQamnYqiAIqlILoYumL8oxmDqsCQuRq9jti7pkgv3nR/t2hAn6ZNwWoOuR61kY5zDuxRnnORPTHYyo5okYSsqW+XUgH7zrllXDZ0FEwfzKR36mB9PcrYi7w8aemYf1MSLmoImgYqS8yw+cKphnVHv4qjXkdg4b5UYb25zkfRs1rlz5YLBbxS9h0FqSN3xqQGchfVahMYX5Jvk+h4LjzcqCuPgf9U8p7vSLI9+spqLBSJZZ8dREOepC9J9+JXiy9PeDYtfCxRsJf49inguUNyfSi98bGK/mt8sMwSamIN8i3JOuxJlSV4/fFsPyA+2n2e6NKrMhX7doH65jToKIRK4vRtykWMjNwb4pgB6n7pwyzJ1VBKkn8yaytSjhAk9jm7VX2ZC6Nez80Ah1ees+K6vK64x7SdFvge1HEbh07BMQgvdlz7Q+4pMehRYhhRiOYQS9h9oSgOYbno0O2WvnXLK5HH2fD9Ka3mvsY/WyEb0f+y6YAgagKBIOoxGo4668OPuKfsSarA/ily4Qgyusp7qE5U2piAnzUAUZgZkMkWnmg7VbT+8BWTd/wYgc1c/FYFcvv197N14hhcjWlZChTyDEOekMb6Ces/tId/4M9aXcmYjQaU+XnbM4G/zAG7XK8FZhLGWM3tJF+wuov3fEb26UPRss6vP9u5eDQFtD+GEzLjc6d69zOOjgGCw21bmMdHIM5ODgGc3BwcAzm4NAm8R8BBgAGrc+T79nGEQAAAABJRU5ErkJggg==';
        TAB.Log.AddTaskComment('Picking Custom Title Image');
        var filePicker = titleRegionWebpart.AddTaskOpenFilePicker();
        var fileInput = Object(_Upload__WEBPACK_IMPORTED_MODULE_6__["dataURItoFile"])(fileMimeString, 'test_file.png');
        filePicker.AddTaskUploadItem(fileInput);
        TAB.Log.AddTaskPass('Picking Custom Title Image Success');
    };
    NewsWebPart.prototype.AddTaskSetNewsChoiceGroupConfig = function (buttonId, renderedElementId, altRenderElementId) {
        var _this = this;
        TAB.Log.AddTaskComment("Waiting for layout button: " + buttonId);
        TAB.AddTask(undefined, this._waitForLayoutButton(buttonId));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.ClickElement(_this._getLayoutButton(buttonId));
        }), TAB.MakeWaiter(function () {
            try {
                TAB.Log.Comment("Waiting for " + renderedElementId + " or " + altRenderElementId + " to render");
                return (_this._hasElementWithAutoId(renderedElementId) ||
                    (altRenderElementId &&
                        _this._hasElementWithAutoId(altRenderElementId)));
            }
            catch (error) {
                return false;
            }
        }));
    };
    NewsWebPart.prototype.AddTaskSetSitePicker = function (buttonId) {
        var _this = this;
        TAB.Log.AddTaskComment("Waiting for layout button: " + buttonId);
        TAB.AddTask(undefined, this._waitForLayoutButton(buttonId));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.ClickElement(_this._getLayoutButton(buttonId));
        }), TAB.MakeWaiter(function () {
            return Boolean(_this._getLayoutButton('sitesPicker'));
        }));
    };
    NewsWebPart.prototype._getLayoutButton = function (buttonId) {
        try {
            var propertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, "propertyPanePageContent");
            if (!propertyPane) {
                return undefined;
            }
            return this._getElementByAutoId(buttonId, propertyPane);
        }
        catch (e) {
            return undefined;
        }
    };
    NewsWebPart.prototype._waitForLayoutButton = function (buttonId) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                return Boolean(_this._getLayoutButton(buttonId));
            }
            catch (error) {
                return false;
            }
        });
    };
    return NewsWebPart;
}(_BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__["BaseCollectionWebPart"]));



/***/ }),

/***/ "UXDa":
/*!***********************************!*\
  !*** ./lib/SPTaskLib/CsomUtil.js ***!
  \***********************************/
/*! exports provided: Csom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Csom", function() { return Csom; });
/* tslint:disable */
/**
 * @public
 */
var Csom = /** @class */ (function () {
    function Csom() {
    }
    /**
     * Adds a CSOM call to the TAB task queue with the correct waiter.
     * The context object returned by getContextObject should be ready for an
     * immediate call to executeQueryAsync(onSuccess, onError).
     * If getContextObject returns null, the task will be cancelled.
     */
    Csom.AddTask = function (getContextObject, onSuccess, onError) {
        var successFunction = typeof onSuccess === 'object' ? onSuccess && onSuccess.call : onSuccess;
        var errorFunction = typeof onError === 'object' ? onError && onError.call : onError;
        var wrapper = new TabCallbackWrapper(successFunction, errorFunction);
        var executeQuery = function () {
            return TAB.MakeTask(function () {
                var clictx = getContextObject();
                if (clictx) {
                    clictx.executeQueryAsync(wrapper.success.bind(wrapper), wrapper.error.bind(wrapper));
                }
                else {
                    wrapper.cancel();
                }
            });
        };
        TAB.AddTask(executeQuery(), wrapper.waiter());
    };
    return Csom;
}());

/**
 * Use TabCallbackWrapper to wrap callbacks you want to hand to potentially
 * asynchronous methods. Then use the wrapper object's Success and Error
 * methods instead of your asynch callbacks, and use the Waiter with AddTask.
 */
var TabCallbackWrapper = /** @class */ (function () {
    function TabCallbackWrapper(onSuccess, onError) {
        this._isDone = false;
        this._isError = false;
        this._onSuccess = onSuccess || (function () { return undefined; });
        this._onError = onError || (function () { return undefined; });
    }
    TabCallbackWrapper.prototype.success = function () {
        this._isDone = true;
        try {
            this._onSuccess.apply(null, arguments);
        }
        catch (e) {
            // Log the error.
            TAB.Log.Comment("Failure in CSOM success callback: " + e.message);
        }
    };
    TabCallbackWrapper.prototype.error = function () {
        this._isDone = true;
        this._isError = true;
        try {
            this._onError.apply(null, arguments);
        }
        catch (e) {
            // Log the error.
            TAB.Log.Comment("Failure in CSOM error callback: " + e.message);
        }
    };
    TabCallbackWrapper.prototype.waiter = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            if (_this._isError) {
                // throw an exception
            }
            return _this._isDone;
        });
    };
    TabCallbackWrapper.prototype.cancel = function () {
        this._isDone = true;
        this._isError = false;
    };
    return TabCallbackWrapper;
}());


/***/ }),

/***/ "UcNL":
/*!************************************************!*\
  !*** ./lib/SPTaskLib/Controls/LayoutOption.js ***!
  \************************************************/
/*! exports provided: LayoutOption */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutOption", function() { return LayoutOption; });
/**
 * @public
 */
var LayoutOption;
(function (LayoutOption) {
    LayoutOption[LayoutOption["Tiles"] = 0] = "Tiles";
    LayoutOption[LayoutOption["Layers"] = 1] = "Layers";
})(LayoutOption || (LayoutOption = {}));


/***/ }),

/***/ "UjPA":
/*!*********************************************!*\
  !*** ./lib/SPTaskLib/Pages/TeamSitePage.js ***!
  \*********************************************/
/*! exports provided: SiteDesignId, TeamSitePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SiteDesignId", function() { return SiteDesignId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamSitePage", function() { return TeamSitePage; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Controls/CreateSitePanel */ "JmdK");
/* harmony import */ var _ListLibrary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ListLibrary */ "7on5");
/* harmony import */ var _Controls_FilePicker__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Controls/FilePicker */ "8uLm");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Controls_SitePermissionPanel__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Controls/SitePermissionPanel */ "DM7Z");
/* harmony import */ var _PageUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../PageUtil */ "jK1H");
/* harmony import */ var _Controls_LayoutOption__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Controls/LayoutOption */ "UcNL");
/* harmony import */ var _Pages_PageSettingsPanel__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Pages/PageSettingsPanel */ "YfnZ");










/**
 * @public
 */
var SiteDesignId;
(function (SiteDesignId) {
    SiteDesignId["PortfolioDesignID"] = "6142d2a0-63a5-4ba0-aede-d9fefca2c767";
    SiteDesignId["BlankDesignId"] = "f6cc5403-0d63-442e-96c0-285923709ffc";
    SiteDesignId["CompanyPortalDesignPackageId"] = "fbf8ec01-846c-44c4-b17b-8fe1e4e5adae";
    SiteDesignId["ODSPWebCommunicationSite"] = "00000000-0000-0000-0000-000000000000";
})(SiteDesignId || (SiteDesignId = {}));
/**
 * @public
 */
var TeamSitePage = /** @class */ (function () {
    function TeamSitePage() {
    }
    TeamSitePage.PageReady = function (expectedTitle) {
        var waiter = TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'ms-CommandBar');
        if (TeamSitePage.editMode) {
            waiter = TAB.AndWaiters(waiter, _Pages_Canvas__WEBPACK_IMPORTED_MODULE_4__["Canvas"].WaitForWebPartToolboxButton());
        }
        return waiter;
    };
    TeamSitePage.AddTaskEditPage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            if (TeamSitePage.editMode) {
                TAB.Log.Comment('Page is in Edit Mode already');
            }
            else {
                TAB.Log.AddTaskComment('Edit Page');
                var editButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarEditButton');
                TAB.ClickElement(editButton);
            }
        }), TAB.AndWaiters(TAB.MakeWaiter(function () {
            return TeamSitePage.editMode;
        }), _Pages_Canvas__WEBPACK_IMPORTED_MODULE_4__["Canvas"].WaitForWebPartToolboxButton()));
    };
    TeamSitePage.AddTaskInvokeSharePanel = function (sitePermissionPanel) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('waiting for share button to be loaded');
        }), TAB.MakeWaiter(function () {
            TAB.Log.Comment('getting shareSiteButton');
            var shareSiteButton = TeamSitePage.GetShareSiteButton();
            TAB.Log.Comment("shareSiteButton is " + shareSiteButton);
            return !!shareSiteButton;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.ClickElement(TeamSitePage.GetShareSiteButton());
        }), _Controls_SitePermissionPanel__WEBPACK_IMPORTED_MODULE_5__["SitePermissionPanel"].WaitForPanel());
        sitePermissionPanel.SetRootElementForPanel();
    };
    TeamSitePage.AddTaskLoadSitePage = function (pageRelativeUrl) {
        _PageUtil__WEBPACK_IMPORTED_MODULE_6__["PageUtil"].SetDebugManifests();
        var pageUrl = "" + TAB.Settings.Get('ProductServer') + pageRelativeUrl;
        TAB.AddTask(TAB.LoadPage(pageUrl), TAB.PageReady());
    };
    TeamSitePage.AddTaskSavePage = function (homePage) {
        if (homePage === void 0) { homePage = false; }
        TAB.Log.AddTaskComment('Start to save page');
        TAB.AddTask(TAB.MakeTask(function () {
            var ellipsisButton = TAB.GetElements(TeamSitePage.GetCommandBar(), TAB.searchBy.hasClassName, 'ms-CommandBar-overflowButton')[0];
            if (ellipsisButton) {
                TAB.Log.Comment('Find the ellipsis button, click on it');
                TAB.ClickElement(ellipsisButton);
            }
            else {
                TAB.Log.Comment('Not find the ellipsis button');
            }
        }), TAB.MakeWaiter(function () { return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'pageCommandBarSaveButton'); }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Click on the save button');
            var saveButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'pageCommandBarSaveButton');
            TAB.ClickElement(saveButton);
        }), homePage ? TeamSitePage.WaitForHomeViewModeTransition() : TeamSitePage.WaitForViewModeTransition());
        TAB.Log.AddTaskPass('Success to save page');
    };
    TeamSitePage.AddTaskPublishPage = function (homePage, isNewsPage) {
        if (homePage === void 0) { homePage = false; }
        if (isNewsPage === void 0) { isNewsPage = false; }
        TAB.AddTask(TAB.MakeTask(function () {
            var publishButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarPublishButton');
            TAB.ClickElement(publishButton);
        }), homePage ? TeamSitePage.WaitForHomeViewModeTransition() : TeamSitePage.WaitForViewModeTransition());
        if (!isNewsPage) {
            TeamSitePage.AddTaskDismissPostPublishPanelIfExists();
        }
    };
    TeamSitePage.AddTaskClickSubmitPageOnCommandBar = function () {
        TAB.Log.AddTaskComment('Task to Click on Submit button from command bar');
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click on Submit button');
            var submitButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarSubmitButton');
            TAB.ClickElement(submitButton);
        }), TeamSitePage.WaitForViewModeTransition());
        TeamSitePage.AddTaskSubmitFromOOBPanel();
    };
    TeamSitePage.AddTaskClickApprovePageOnCommandBar = function () {
        TAB.Log.AddTaskComment('Task to Click on Approve button from command bar');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            TAB.Log.AddTaskComment('Waiting for Approve Button');
            return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarReviewButton') !== undefined;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking on Approve Button');
            var reviewButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarReviewButton');
            TAB.ClickElement(reviewButton);
        }));
        TeamSitePage.AddTaskApproveFromOOBPanel();
    };
    TeamSitePage.AddTaskClickRejectPageOnCommandBar = function () {
        TAB.Log.AddTaskComment('Task to Click on Reject button from command bar');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            TAB.Log.AddTaskComment('Waiting for Reject Button');
            return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarReviewButton') !== undefined;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking on Reject Button');
            var reviewButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarReviewButton');
            TAB.ClickElement(reviewButton);
        }));
        TeamSitePage.AddTaskRejectFromOOBPanel();
    };
    TeamSitePage.AddTaskSubmitFromOOBPanel = function () {
        var actionButton = undefined;
        TeamSitePage.AddTaskToWaitForCommentsTextOnPanel();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting on Submit Button');
            actionButton = TeamSitePage.GetActionButtonFromOOBPanel('submit');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='submit_button']"));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking on Submit button from OOB panel');
            TAB.ClickElement(actionButton);
        }), TAB.MakeWaiter(function () {
            TAB.Log.AddTaskComment('Waiting for status to change to pending');
            return TeamSitePage.hasExpectedStatusChangeHappened('Pending');
        }));
    };
    TeamSitePage.AddTaskApproveFromOOBPanel = function () {
        var actionButton = undefined;
        TeamSitePage.AddTaskToWaitForCommentsTextOnPanel();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting on Approve Button');
            actionButton = TeamSitePage.GetActionButtonFromOOBPanel('approve');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='approve_button']"));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking on Approve button from OOB panel');
            TAB.ClickElement(actionButton);
        }), TAB.MakeWaiter(function () {
            TAB.Log.AddTaskComment('Waiting for status to change to approved');
            return TeamSitePage.hasExpectedStatusChangeHappened('Published');
        }));
    };
    TeamSitePage.AddTaskRejectFromOOBPanel = function () {
        var actionButton = undefined;
        TeamSitePage.AddTaskToWaitForCommentsTextOnPanel();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting on Reject Button');
            actionButton = TeamSitePage.GetActionButtonFromOOBPanel('reject');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='reject_button']"));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking on Reject button from OOB panel');
            TAB.ClickElement(actionButton);
        }), TAB.MakeWaiter(function () {
            TAB.Log.AddTaskComment('Waiting for status to change to rejeced');
            return TeamSitePage.hasExpectedStatusChangeHappened('Rejected');
        }));
    };
    TeamSitePage.GetActionButtonFromOOBPanel = function (action) {
        switch (action) {
            case 'submit':
                return TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='submit_button']");
            case 'approve':
                return TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='approve_button']");
            case 'reject':
                return TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='reject_button']");
        }
    };
    TeamSitePage.AddTaskDiscardChange = function (homePage) {
        if (homePage === void 0) { homePage = false; }
        TAB.AddTask(TAB.MakeTask(function () {
            var discardButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'discardButton');
            TAB.ClickElement(discardButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='yesButton']"));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click yes on Discard Change dialog');
            var confirmButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(TAB.Win, 'yesButton')[0];
            if (confirmButton) {
                TAB.ClickElement(confirmButton);
            }
            else {
                TAB.Log.Warning('Yes dialog button not found to click on.');
            }
        }), homePage ? TeamSitePage.WaitForHomeViewModeTransition() : TeamSitePage.WaitForViewModeTransition());
    };
    TeamSitePage.WaitForViewModeTransition = function () {
        return TAB.AndWaiters(TAB.MakeWaiter(function () {
            if (!TeamSitePage.editMode) {
                return true;
            }
        }), TeamSitePage.WaitForPageRename());
    };
    TeamSitePage.WaitForHomeViewModeTransition = function () {
        return TAB.MakeWaiter(function () {
            if (!TeamSitePage.editMode) {
                return true;
            }
        });
    };
    TeamSitePage.AddTaskCreateNewPageStubFromBlankPage = function () {
        // Wait for the new button to exist
        TeamSitePage.AddTaskWaitForNewbutton();
        TAB.AddTask(TAB.MakeTask(function () {
            var newButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarNewButton');
            TAB.ClickElement(newButton);
            var calloutField = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'ms-ContextualMenu-list');
            var startFromBlankPageButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(calloutField, 'ChooseFromTemplate');
            TAB.ClickElement(startFromBlankPageButton);
        }), TAB.MakeWaiter(function () {
            return TeamSitePage.isNewStubCreated;
        }));
    };
    TeamSitePage.AddTaskClickNewInCommandBar = function () {
        // Wait for the new button to exist
        TeamSitePage.AddTaskWaitForNewbutton();
        TAB.AddTask(TAB.MakeTask(function () {
            var newButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarNewButton');
            TAB.ClickElement(newButton);
            var calloutField = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu-list');
            var pageButton = TAB.GetElements(calloutField, TAB.searchBy.hasClassName, 'ms-ContextualMenu-link');
            TAB.ClickElement(pageButton[2]);
        }), TAB.MakeWaiter(function () {
            var dialog = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-Modal')[0];
            return Boolean(dialog);
        }));
        TeamSitePage.AddTaskClickCreateInTemplateDialog();
    };
    TeamSitePage.AddTaskWaitForNewbutton = function () {
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            var commandBar = TeamSitePage.GetCommandBar();
            if (commandBar) {
                return !!_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(commandBar, 'pageCommandBarNewButton');
            }
            else {
                return false;
            }
        }));
    };
    TeamSitePage.AddTaskCreateNewsPage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            var newButton = TeamSitePage.GetNewsAddButton();
            TAB.ClickElement(newButton);
        }), TAB.MakeWaiter(function () {
            return TeamSitePage.isNewStubCreated;
        }));
    };
    TeamSitePage.AddTaskOpenFilePicker = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Open Filepicker');
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_4__["Canvas"].SelectedWebpart.AddTaskClickFilePickerButton();
        }), TeamSitePage.FilePicker.WaitForViewLoad(_Controls_FilePicker__WEBPACK_IMPORTED_MODULE_3__["FilePickerView"].Recent));
    };
    /**
     * Opens command bar 'New' contextual menu menu
     */
    TeamSitePage.AddTaskOpenNewContexualMenu = function () {
        // Wait for the new button to exist
        TeamSitePage.AddTaskWaitForNewbutton();
        TAB.AddTask(TAB.MakeTask(function () {
            var newButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarNewButton');
            TAB.ClickElement(newButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-Callout'));
    };
    /**
     * Creates a new 'Plan' page
     */
    TeamSitePage.AddTaskCreatePlanPage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            var planButton = TeamSitePage.GetNewPlanButton();
            TAB.ClickElement(planButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-Panel-contentInner'));
    };
    TeamSitePage.AddTaskCreateFilePicker = function () {
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='sp-filepicker']"));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Create Filepicker');
            TeamSitePage.FilePicker = new _Controls_FilePicker__WEBPACK_IMPORTED_MODULE_3__["FilePicker"](_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win, 'sp-filepicker'));
        }));
    };
    TeamSitePage.GetPageHeader = function () {
        try {
            var pageHeader = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win, 'pageHeader');
            return pageHeader;
        }
        catch (e) {
            return undefined;
        }
    };
    TeamSitePage.WaitForPageHeader = function () {
        return TAB.MakeWaiter(function () {
            var pageHeader = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win, 'pageHeader');
            if (pageHeader) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    TeamSitePage.AddTaskAddPageTitle = function (value) {
        TAB.AddTask(undefined, TeamSitePage.WaitForPageHeader());
        TAB.AddTask(undefined, TeamSitePage.WaitForTitleRegion());
        TAB.AddTask(TAB.MakeTask(function () {
            var titleText = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetPageHeader(), 'pageTitleInput');
            var focusEv = TAB.Win.document.createEvent('HTMLEvents');
            focusEv.initEvent('focus', true /*bubble*/, false /*cancelable*/);
            titleText.dispatchEvent(focusEv);
            titleText.value = value;
            var ev = TAB.Win.document.createEvent('HTMLEvents');
            ev.initEvent('input', true /*bubble*/, false /*cancelable*/);
            titleText.dispatchEvent(ev);
            // press Enter
            TAB.FireKeyboardEvent(titleText, 'keydown', 13);
            var blurEv = TAB.Win.document.createEvent('HTMLEvents');
            blurEv.initEvent('blur', true /*bubble*/, false /*cancelable*/);
            titleText.dispatchEvent(blurEv);
            TeamSitePage.Title = value;
        }), TeamSitePage.WaitForPageTitleNotEmpty());
    };
    TeamSitePage.AddTaskCancelFilePicker = function () {
        // click cancel button
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Cancel Filepicker');
            TeamSitePage.FilePicker.AddTaskCancel();
        }), undefined);
    };
    TeamSitePage.WaitForPageSave = function () {
        return TAB.MakeWaiter(function () {
            var statusBar = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'pageCommandBarStatus');
            var savedIcon = 'CheckMark';
            var pageSaved = !TeamSitePage.editMode ||
                statusBar.getAttribute('data-automation-icon') === savedIcon;
            if (pageSaved) {
                TAB.Log.Comment('Page has been saved');
            }
            return pageSaved;
        });
    };
    TeamSitePage.WaitForPageTitleNotEmpty = function () {
        return TAB.MakeWaiter(function () {
            var titleText = TeamSitePage.GetPageTitleElement();
            return (titleText.value !== undefined || titleText.value !== '');
        });
    };
    TeamSitePage.WaitForTitleRegion = function () {
        return TAB.MakeWaiter(function () {
            var titleText = TeamSitePage.GetPageTitleElement();
            if (titleText) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    TeamSitePage.AddTaskOpenPostPublishPanel = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            var ellipsisButton = TAB.GetElements(TeamSitePage.GetCommandBar(), TAB.searchBy.hasClassName, 'ms-CommandBar-overflowButton')[0];
            if (ellipsisButton) {
                TAB.ClickElement(ellipsisButton);
            }
            var promoteButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetCommandBar(), 'promoteButton');
            TAB.ClickElement(promoteButton);
        }), TeamSitePage.WaitForPostPublishPanel());
    };
    TeamSitePage.AddTaskOpenPageSettingsPanel = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Checking if button is visible, if not click the ellipsis');
            var pageSettingsPanelButton = TeamSitePage.GetPageSettingsCommandBarButton();
            if (!pageSettingsPanelButton) {
                var ellipsisButton = TAB.GetElements(TeamSitePage.GetCommandBar(), TAB.searchBy.hasClassName, 'ms-CommandBar-overflowButton')[0];
                if (ellipsisButton) {
                    TAB.ClickElement(ellipsisButton);
                }
            }
        }), TeamSitePage.WaitForPageSettingsCommandBarButton());
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Open the page settings panel');
            var pageSettingsPanelButton = TeamSitePage.GetPageSettingsCommandBarButton();
            TAB.ClickElement(pageSettingsPanelButton);
        }));
        _Pages_PageSettingsPanel__WEBPACK_IMPORTED_MODULE_8__["PageSettingsPanel"].AddTaskWaitForPageSettingsPanel();
    };
    TeamSitePage.AddTaskDismissPostPublishPanel = function () {
        TAB.AddTask(undefined, TeamSitePage.WaitForPostPublishPanel());
        TAB.AddTask(TAB.MakeTask(function () {
            var closeButton = TeamSitePage.GetCloseButtonForPostPublishPanel();
            TAB.ClickElement(closeButton);
        }), TAB.MakeWaiter(function () {
            return TeamSitePage.WaitForPostPublishPanelNotVisible();
        }));
    };
    TeamSitePage.AddTaskDismissPostPublishPanelIfExists = function () {
        TAB.AddTask(undefined, TeamSitePage.WaitForPublishedBanner());
        TAB.AddTask(undefined, TeamSitePage.WaitForPostPublishPanelUntilBannerDisappears());
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waited for page published banner, dismissing post publish panel if it exists.');
            if (TeamSitePage.PostPublishPanelExists()) {
                TAB.Log.AddTaskComment('Post publish panel exists, dismissing panel.');
                var closeButton = TeamSitePage.GetCloseButtonForPostPublishPanel();
                TAB.ClickElement(closeButton);
            }
            else {
                TAB.Log.AddTaskComment('Post publish panel does not exist, not dismissing.');
            }
        }), TAB.MakeWaiter(function () {
            return TeamSitePage.WaitForPostPublishPanelNotVisible();
        }));
    };
    Object.defineProperty(TeamSitePage, "editMode", {
        get: function () {
            return TAB.Win.location.search.indexOf('Mode=Edit') > -1;
        },
        enumerable: true,
        configurable: true
    });
    TeamSitePage.AddRestTaskDeletePage2 = function (siteName, path) {
        if (siteName === void 0) { siteName = undefined; }
        if (path === void 0) { path = 'sites'; }
        var pageUrl = TeamSitePage.PageUrl;
        if (pageUrl) {
            pageUrl = pageUrl.split('?', 1)[0];
            var rootSiteUrl = TAB.Settings.Get('ProductServerSet').split(';')[0];
            pageUrl = pageUrl.substr(rootSiteUrl.length);
            rootSiteUrl += "/" + path + "/" + siteName;
            _ListLibrary__WEBPACK_IMPORTED_MODULE_2__["List"].addRestTaskDeleteItem2(rootSiteUrl, pageUrl);
        }
    };
    TeamSitePage.AddRestTaskDeletePageByPageName = function (siteName, pageUrl, path) {
        var rootSiteUrl = TAB.Settings.Get('ProductServerSet').split(';')[0];
        path = path || TeamSitePage.Path;
        rootSiteUrl += "/" + path + "/" + siteName;
        pageUrl = rootSiteUrl + "/" + pageUrl;
        _ListLibrary__WEBPACK_IMPORTED_MODULE_2__["List"].addRestTaskDeleteItem(rootSiteUrl, rootSiteUrl, pageUrl);
    };
    TeamSitePage.AddRestTaskDeletePage = function () {
        // TeamSitePage.PageUrl is undefined unless the page name is saved.
        var pageUrl = TeamSitePage.PageUrl || TAB.Win.location.href;
        pageUrl = pageUrl.split('?', 1)[0];
        var rootSiteUrl = TAB.Settings.Get('ProductServerSet').split(';')[0];
        pageUrl = pageUrl.substr(rootSiteUrl.length);
        _ListLibrary__WEBPACK_IMPORTED_MODULE_2__["List"].addRestTaskDeleteItem(rootSiteUrl, rootSiteUrl, pageUrl);
    };
    TeamSitePage.AddRestTaskDeleteImages = function (urls) {
        var rootSiteUrl = TAB.Settings.Get('ProductServerSet').split(';')[0];
        urls.forEach(function (imageUrl) {
            _ListLibrary__WEBPACK_IMPORTED_MODULE_2__["List"].addRestTaskDeleteItem(rootSiteUrl, rootSiteUrl, imageUrl);
            TAB.Log.AddTaskComment('Deleted ' + imageUrl);
        });
    };
    TeamSitePage.AddRestTaskDeleteImagesOnSite = function (siteName, urls) {
        if (!siteName) {
            TeamSitePage.AddRestTaskDeleteImages(urls);
        }
        else {
            urls.forEach(function (imageUrl) {
                var rootSiteUrl = TAB.Settings.Get('ProductServerSet').split(';')[0];
                var currentSiteUrl = rootSiteUrl + "/sites/" + siteName;
                _ListLibrary__WEBPACK_IMPORTED_MODULE_2__["List"].addRestTaskDeleteItem(currentSiteUrl, currentSiteUrl, imageUrl);
                TAB.Log.AddTaskComment('Deleted ' + imageUrl);
            });
        }
    };
    TeamSitePage.AddTaskDeleteNavigationLink = function (siteUrl, navResult, linkTitle) {
        TAB.Log.AddTaskComment('Getting nav links');
        var targetUrl = siteUrl + "/_api/navigation/MenuState";
        var result = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendGetRequest(siteUrl, targetUrl, result);
        TAB.AddTask(TAB.MakeTask(function () {
            if (result && result.success && result.retVal) {
                navResult.MenuState = result.retVal;
                var links_1 = navResult.MenuState && navResult.MenuState.Nodes;
                if (links_1) {
                    TAB.Log.AddTaskComment('Finding nav link with the title: ' + linkTitle + ' to delete.');
                    links_1.forEach(function (link) {
                        if (link.Title.indexOf(linkTitle) > -1) {
                            TAB.Log.AddTaskComment('Found the link to delete, marking it for deletion.');
                            TeamSitePage.SetLinkAsDeleted(link);
                            // Send the post request to update the nav
                            var postTargetUrl = siteUrl + '/_api/navigation/SaveMenuState';
                            var postContent = {
                                menuState: {
                                    SPWebPrefix: navResult.MenuState && navResult.MenuState.SPWebPrefix,
                                    StartingNodeKey: '1025',
                                    Version: new Date().toTimeString(),
                                    Nodes: links_1
                                }
                            };
                            var postResult = {};
                            _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendPostRequest(siteUrl, postTargetUrl, JSON.stringify(postContent), postResult, true /** fetchCanary */);
                        }
                    });
                }
            }
            else {
                TAB.Log.AddTaskFail('Failed to fetch nav links');
            }
        }));
    };
    TeamSitePage.SetLinkAsDeleted = function (link) {
        link.IsDeleted = true;
        if (link.Nodes) {
            link.Nodes.forEach(function (node) { return TeamSitePage.SetLinkAsDeleted(node); });
        }
    };
    TeamSitePage.GetPropertyPane = function () {
        return TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'propertyPanePageContent');
    };
    TeamSitePage.AddTaskVerifySiteHeader = function (expectedSiteTitle) {
        TAB.Log.AddTaskComment('Waiting for Site header...');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                var siteHeader = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='SiteHeader']");
                var currentUrl = TAB.Win.location.href;
                if (currentUrl && currentUrl.indexOf('error.aspx') !== -1) {
                    TAB.Log.Fail('Navigated to error page: ' + currentUrl);
                    // return true to end waiter.
                    return true;
                }
                return siteHeader.length > 0;
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verify information in Site header');
            var siteHeader = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='SiteHeader']");
            var siteTitle = TAB.GetTextContent(_Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(siteHeader, 'SiteHeaderTitle'));
            TAB.Log.Verify(siteTitle === expectedSiteTitle, 'Verifying the display name of the group. Expected: [' + expectedSiteTitle + '], Actual: [' + siteTitle + ']');
        }));
    };
    TeamSitePage.AddTaskCreationCommunicationSite = function (createSiteParams) {
        TAB.Log.AddTaskComment('Verifying Create Communication Site Panel');
        var createSitePanel = new _Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_1__["CreateSitePanel"](true /*inPage*/, false /*SPHomePanel*/);
        var template = _Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_1__["CreateSiteTemplateOption"].Publishing;
        createSitePanel.AddTaskVerifyForm(_Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_1__["CreateSitePanelForm"].ChooseTemplate, undefined);
        createSitePanel.AddTaskChooseTemplate(template);
        createSitePanel.AddTaskVerifyForm(_Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_1__["CreateSitePanelForm"].CreateSite, template);
        createSitePanel.AddTaskCreateSite(createSiteParams, template);
    };
    TeamSitePage.AddTaskCreateTeamSite = function (createSiteParams) {
        TAB.Log.AddTaskComment('Verifying Create Team Site Panel');
        var createSitePanel = new _Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_1__["CreateSitePanel"](true /*inPage*/, false /*SPHomePanel*/);
        var template = _Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_1__["CreateSiteTemplateOption"].TeamSite;
        createSitePanel.AddTaskVerifyForm(_Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_1__["CreateSitePanelForm"].ChooseTemplate, undefined);
        createSitePanel.AddTaskChooseTemplate(template);
        createSitePanel.AddTaskVerifyForm(_Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_1__["CreateSitePanelForm"].CreateSite, template);
        createSitePanel.AddTaskCreateSite(createSiteParams, template);
        createSitePanel.AddTaskVerifyForm(_Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_1__["CreateSitePanelForm"].AddMember, undefined);
        createSitePanel.AddTaskFinish();
        TAB.AddTask(undefined, TAB.MakeWaiter(function () { return _PageUtil__WEBPACK_IMPORTED_MODULE_6__["PageUtil"].CheckPageLoaded(); }));
    };
    TeamSitePage.EnsureNewsTestSiteExists = function (siteUrl) {
        var result = {};
        var testPage1 = 'DoNotDeleteNews1';
        var testPage2 = 'DoNotDeleteNews2';
        var testPage3 = 'DoNotDeleteNews3';
        var testPage4 = 'DoNotDeleteNews4';
        var testPage5 = 'DoNotDeleteNews5';
        var promotedState = 2; // News post
        var publishPage = true;
        var jsonContent = {};
        TAB.AddTask(TAB.MakeTask(function () {
            TeamSitePage.EnsureCommSiteExists(siteUrl, result);
            _PageUtil__WEBPACK_IMPORTED_MODULE_6__["PageUtil"].EnsurePageExist(testPage1, siteUrl, jsonContent, jsonContent, publishPage, promotedState);
            _PageUtil__WEBPACK_IMPORTED_MODULE_6__["PageUtil"].EnsurePageExist(testPage2, siteUrl, jsonContent, jsonContent, publishPage, promotedState);
            _PageUtil__WEBPACK_IMPORTED_MODULE_6__["PageUtil"].EnsurePageExist(testPage3, siteUrl, jsonContent, jsonContent, publishPage, promotedState);
            _PageUtil__WEBPACK_IMPORTED_MODULE_6__["PageUtil"].EnsurePageExist(testPage4, siteUrl, jsonContent, jsonContent, publishPage, promotedState);
            _PageUtil__WEBPACK_IMPORTED_MODULE_6__["PageUtil"].EnsurePageExist(testPage5, siteUrl, jsonContent, jsonContent, publishPage, promotedState);
        }));
    };
    TeamSitePage.AddTaskCreateCommSite = function (siteName, result, designID, lcid) {
        if (undefined !== lcid) {
            TeamSitePage.CreateCommSite(siteName, result, true /*failIfExists*/, designID, lcid);
        }
        else {
            TeamSitePage.CreateCommSite(siteName, result, true /*failIfExists*/, designID);
        }
    };
    TeamSitePage.EnsureCommSiteExists = function (siteName, result, designID) {
        TeamSitePage.CreateCommSite(siteName, result, false /*failIfExists*/, designID);
    };
    TeamSitePage.AddTaskDeleteSite = function (siteUrl) {
        if (!siteUrl) {
            TAB.Log.Fail('Tries to delete root site collection: ' + siteUrl);
            return;
        }
        // Make sure this doesn't accidently delete root site collection
        var trimmedUrl = siteUrl.trim().toLowerCase();
        var domainIndex = trimmedUrl.lastIndexOf('.sharepoint.com');
        if (domainIndex !== -1 &&
            (trimmedUrl.length === domainIndex + 15 || trimmedUrl.length === domainIndex + 16)) {
            TAB.Log.Fail('Tries to delete root site collection: ' + siteUrl);
            return;
        }
        TAB.Log.AddTaskComment('Deleting communication site at the following URL: ' + siteUrl);
        var targetUrl = siteUrl + '/_api/site/id';
        var result = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendRestRequest(siteUrl, targetUrl, '', result);
        TAB.AddTask(TAB.MakeTask(function () {
            if (result.retVal && result.retVal.d && result.retVal.d.Id) {
                targetUrl = siteUrl + '/_api/SPSiteManager/Delete';
                var siteId = { 'siteId': result.retVal.d.Id };
                var body = JSON.stringify(siteId);
                result = {};
                _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendRestRequest(siteUrl, targetUrl, body, result, true /** fetchCanary */);
            }
        }));
    };
    TeamSitePage.AddTaskValidateHeroOOB = function (layout, expectedItemCount) {
        TAB.AddTask(undefined, TeamSitePage._CheckHeroOOBItems(layout, expectedItemCount));
    };
    TeamSitePage.WaitForPostPublishPanel = function () {
        return TAB.MakeWaiter(function () {
            return TeamSitePage.PostPublishPanelExists();
        });
    };
    TeamSitePage.PostPublishPanelExists = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'managePagePanelContainer');
    };
    TeamSitePage.WaitForPageSettingsCommandBarButton = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='pageSettingsButton']");
    };
    TeamSitePage.PageSettingsPanelExists = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-icon=\"pageSettingsPanel\"]");
    };
    TeamSitePage.AddTaskClearConfirmUnsavedChanges = function () {
        TAB.Log.AddTaskComment('Clear window.confirm');
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Win.window.confirm = function () {
                return true;
            };
        }));
    };
    TeamSitePage.GetPageTitleElement = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TeamSitePage.GetPageHeader(), 'pageTitleInput');
    };
    TeamSitePage.GetCommandBar = function () {
        // using check mark to decide if the page has been saved
        try {
            var commandBar = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'commandBarWrapper');
            return commandBar;
        }
        catch (e) {
            return undefined;
        }
    };
    TeamSitePage.CreateCommSite = function (siteName, result, failIfExists, designID, lcid) {
        if (lcid === void 0) { lcid = 1033; }
        var rootSiteUrl = TAB.Settings.Get('ProductServerSet').split(';')[0];
        var siteUrl = rootSiteUrl + "/" + TeamSitePage.Path + "/" + siteName;
        var webExistResult = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].addCsomTaskDoesWebExist(siteUrl, webExistResult);
        TAB.AddTask(TAB.MakeTask(function () {
            if (webExistResult.success) {
                TAB.Log.AddTaskComment("Found the test site \"" + siteUrl + "\".");
                if (failIfExists) {
                    TAB.Log.AddTaskFail('Could not create SPSite since another already exists at this URL');
                }
                else {
                    TAB.AddTask(TAB.LoadPage(siteUrl), TAB.PageReady());
                }
            }
            else {
                TAB.Log.AddTaskComment('Test site not found, attempting to create one ..');
                var body = {
                    request: {
                        __metadata: {
                            type: 'Microsoft.SharePoint.Portal.SPSiteCreationRequest'
                        },
                        WebTemplate: 'SITEPAGEPUBLISHING#0',
                        Title: siteName,
                        Url: "" + siteUrl,
                        Description: '',
                        Classification: '',
                        Lcid: lcid,
                        ShareByEmailEnabled: false,
                        WebTemplateExtensionId: '00000000-0000-0000-0000-000000000000',
                        HubSiteId: '00000000-0000-0000-0000-000000000000',
                        SiteDesignId: designID
                    }
                };
                _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendRestRequest(rootSiteUrl, rootSiteUrl + '/_api/SPSiteManager/Create', JSON.stringify(body), result);
                TAB.AddTask(TAB.MakeTask(function () {
                    if (result.retVal && result.retVal.d && result.retVal.d.Create.SiteUrl) {
                        TAB.Log.AddTaskPass("Site creation succeeded " + result.retVal.d.Create.SiteUrl);
                        TAB.AddTask(TAB.LoadPage(result.retVal.d.Create.SiteUrl), TAB.PageReady());
                    }
                    else {
                        TAB.Log.AddTaskFail('Could not create sp site.');
                    }
                }));
            }
        }));
    };
    TeamSitePage.AddTaskToWaitForCommentsTextOnPanel = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waiting for the comment text box to show up on content approval panel');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='content-approval-comments']"));
    };
    TeamSitePage.PublishedBannerIsVisible = function () {
        var bannerElement = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'pageStatusNotifier');
        var classList = bannerElement.classList.toString();
        return classList.indexOf('isVisible') !== -1;
    };
    TeamSitePage.GetShareSiteButton = function () {
        /* todo: Use a data-automation-id: This id has been added in odsp-shared-react. This bug is to track making the change once it is consumed in sp-client
        https://onedrive.visualstudio.com/WEX!/_workitems/edit/469819 */
        var shareSiteButton = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='ShareSiteButton']");
        return shareSiteButton[0];
    };
    TeamSitePage.WaitForPageRename = function () {
        return TAB.MakeWaiter(function () {
            /* bug 357411 - Use URL once, it is available to be used in TAB */
            var url = TAB.Win.location.href;
            var normalizedUrl = url.toLowerCase();
            var extensionStart = normalizedUrl.indexOf('.aspx');
            var filenameStart = normalizedUrl.indexOf('sitepages') + 'SitePages'.length + 1;
            var filename = normalizedUrl.substring(filenameStart, extensionStart);
            TAB.Log.Comment('this is the file' + filename);
            if (filename.indexOf(TeamSitePage.Title.toLowerCase()) > -1) {
                TeamSitePage.PageUrl = url.toString();
                return true;
            }
            else {
                return false;
            }
        });
    };
    TeamSitePage.WaitForPublishedBanner = function () {
        return TAB.MakeWaiter(function () {
            return TeamSitePage.PublishedBannerIsVisible();
        });
    };
    TeamSitePage.WaitForPostPublishPanelUntilBannerDisappears = function () {
        return TAB.MakeWaiter(function () {
            return TeamSitePage.PostPublishPanelExists() || !TeamSitePage.PublishedBannerIsVisible();
        });
    };
    TeamSitePage.WaitForPostPublishPanelNotVisible = function () {
        return TAB.MakeWaiter(function () {
            return !TeamSitePage.PostPublishPanelExists();
        });
    };
    TeamSitePage.isNewStubCreated = function () {
        return TAB.Win.location.search.indexOf('newpage') > -1;
    };
    TeamSitePage.GetPostPublishPanel = function () {
        try {
            var postPublishPanel = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Panel-main');
            return postPublishPanel;
        }
        catch (error) {
            return undefined;
        }
    };
    TeamSitePage.GetCloseButtonForPostPublishPanel = function () {
        try {
            var panel = TeamSitePage.GetPostPublishPanel();
            var closeButton = TAB.GetElement(panel, TAB.searchBy.hasClassName, 'ms-Panel-closeButton');
            return closeButton;
        }
        catch (e) {
            return undefined;
        }
    };
    TeamSitePage.GetNewsAddButton = function () {
        try {
            var newsWrapper = TAB.GetElement(TAB.Win, TAB.searchBy.className, 'ControlZone-control');
            var addButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(newsWrapper, 'AddNews');
            return addButton;
        }
        catch (e) {
            return undefined;
        }
    };
    TeamSitePage.GetPageSettingsCommandBarButton = function () {
        try {
            var pageSettingsButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'pageSettingsButton');
            return pageSettingsButton;
        }
        catch (e) {
            return undefined;
        }
    };
    /**
    * Returns a 'Plan' button element from a new contextual menu from the command bar
    */
    TeamSitePage.GetNewPlanButton = function () {
        try {
            var addButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'CommandBarNewPlanButton');
            return addButton;
        }
        catch (e) {
            return undefined;
        }
    };
    TeamSitePage._CheckHeroOOBItems = function (layout, expectedItemCount) {
        var tag = undefined;
        if (layout === _Controls_LayoutOption__WEBPACK_IMPORTED_MODULE_7__["LayoutOption"].Tiles) {
            tag = 'Tiles';
        }
        else {
            tag = 'Layers';
        }
        var waiter = TAB.MakeWaiter(function () {
            try {
                // check if it is tile layout
                var heroLayoutElements = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='" + tag + "']");
                // check if there are 5 items
                var heroElements = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='HeroPatternElement']");
                if (heroElements !== undefined && heroLayoutElements[0] !== undefined) {
                    return (heroElements.length === expectedItemCount);
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    TeamSitePage.AddTaskClickCreateInTemplateDialog = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            var dialog = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-Modal')[0];
            var chooseFromTemplate = TAB.GetElements(dialog, TAB.searchBy.hasClassName, 'ms-ChoiceField-labelWrapper')[2];
            TAB.ClickElement(chooseFromTemplate);
            var createButton = TAB.GetElements(dialog, TAB.searchBy.hasClassName, 'ms-Button--primary');
            TAB.ClickElement(createButton[0]);
        }), TAB.MakeWaiter(function () {
            return TeamSitePage.isNewStubCreated;
        }));
    };
    TeamSitePage.hasExpectedStatusChangeHappened = function (status) {
        var pageStatusElements = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='pageCommandBarStatus']");
        // In fabric-react@6, there is an intermediate status with two command bar in the page.
        if (pageStatusElements.length === 1) {
            return pageStatusElements[0].getAttribute('data-automation-text').lastIndexOf(status) > -1;
        }
    };
    TeamSitePage.Path = 'teams';
    return TeamSitePage;
}());



/***/ }),

/***/ "Vi7M":
/*!************************************************!*\
  !*** ./lib/SPTaskLib/Controls/SitesWebPart.js ***!
  \************************************************/
/*! exports provided: SitesWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SitesWebPart", function() { return SitesWebPart; });
/* harmony import */ var _BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseCollectionWebPart */ "kQju");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





/**
 * @public
 */
var SitesWebPart = /** @class */ (function (_super) {
    __extends(SitesWebPart, _super);
    function SitesWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].Sites, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].Sites.toString()) || this;
    }
    SitesWebPart.prototype.AddTaskAddWebPartOnTeamSitePage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Add Sites webpart');
            _this.AddTaskSetupNewPage();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"].AddTaskCreateWebPart(_this);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'emptyStateCard'));
    };
    SitesWebPart.prototype.AddTaskAddSiteByTitle = function (title) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Open property pane');
            _this.AddTaskClickConfigureButton();
        }), _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'sitesPicker'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Get the search box of sites picker in property pane');
            var sitesPicker = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'sitesPicker');
            var searchBox = TAB.GetElement(sitesPicker, TAB.searchBy.leadingId, 'SearchBox');
            TAB.Log.Comment('Input the title in search box');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_4__["ReactUtil"].TriggerOnChange(searchBox, title);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'itemInfo'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Get the search results');
            var searchResults = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'sitesPickerList');
            var sitesPickerItems = TAB.GetElements(searchResults, TAB.searchBy.tag, 'button');
            TAB.Log.Comment('Add the first site in search results');
            TAB.ClickElement(sitesPickerItems[0]);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='" + SitesWebPart.siteCardId + "']") &&
                TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'actionBar');
        }));
    };
    SitesWebPart.prototype.AddTaskDeleteSiteCardByIndex = function (index) {
        var siteCardToDelete;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Get the site card to delete');
            siteCardToDelete = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, SitesWebPart.siteCardId)[index];
            if (siteCardToDelete) {
                TAB.Log.Comment('Click the delete button');
                var deleteButton = TAB.GetElement(siteCardToDelete, TAB.searchBy.partialClassName, 'removeButton');
                TAB.ClickElement(deleteButton);
            }
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-main'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Click the Yes button on confirm dialog');
            var confirmDialog = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-main');
            var yesButton = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(confirmDialog, 'yesButton');
            TAB.ClickElement(yesButton);
        }), TAB.MakeWaiter(function () { return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, SitesWebPart.siteCardId)[index] !== siteCardToDelete; }));
    };
    SitesWebPart.prototype.AddTaskGoToSeeAllPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Wait for See all link showing');
        }), TAB.MakeWaiter(function () {
            var seeAllLink = _this.GetSeeAllLink();
            return Boolean(seeAllLink) && seeAllLink.href.indexOf('pagestub') > -1;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Click the See all link');
            TAB.ClickElement(_this.GetSeeAllLink());
        }), TAB.MakeWaiter(function () {
            return TAB.Win.location.href.indexOf('_layouts/15/Sites.aspx') > -1
                && TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='" + SitesWebPart.siteCardId + "']");
        }));
    };
    Object.defineProperty(SitesWebPart.prototype, "ShouldHaveSeeAllLink", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    SitesWebPart.siteCardId = 'siteCard';
    return SitesWebPart;
}(_BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__["BaseCollectionWebPart"]));



/***/ }),

/***/ "W/DA":
/*!***********************************************!*\
  !*** ./lib/SPTaskLib/TenantAdmin/HomePage.js ***!
  \***********************************************/
/*! exports provided: HomePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePage", function() { return HomePage; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");

var PAGE_KEYS = [
    'siteManagement',
    'recycleBin',
    'sharing',
    'accessControl',
    'settings',
    'geoLocations',
    'webApiPermissionManagement',
    'migrationCenter',
    'classicFeatures'
];
/**
 * @public
 */
var HomePage = /** @class */ (function () {
    function HomePage() {
    }
    HomePage.AddTaskLoadHomePage = function () {
        var adminPageUrl = TAB.Settings.Get('ProductServer') + '/_layouts/15/online/AdminHome.aspx#/home';
        TAB.AddTask(TAB.LoadPage(adminPageUrl), HomePage.PageReady('home'));
    };
    HomePage.PageReady = function (key) {
        var waiter = TAB.AndWaiters(TAB.PageReady(), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-page-key='" + key + "']"));
        return waiter;
    };
    // TODO: We should use data-automation-id instead of href. Please refer bug #377123 on VSO.
    HomePage.AddTaskNavigatePages = function () {
        TAB.Log.AddTaskComment('Begin to navigate to each page.');
        var liList = this.GetNavItems();
        var pageHref = undefined;
        var _loop_1 = function (i) {
            var tagA = TAB.GetElements(liList[i], TAB.searchBy.tag, 'a');
            if (tagA.length !== 1) {
                return "continue";
            }
            pageHref = tagA[0].getAttribute('href');
            if (!pageHref) {
                return "continue";
            }
            var pageKey = HomePage.GetPageKeyByPageHref(pageHref);
            if (PAGE_KEYS.indexOf(pageKey) !== -1) {
                TAB.AddTask(TAB.MakeTask(function () {
                    TAB.ClickElement(tagA[0]);
                }), HomePage.PageReady(pageKey));
            }
        };
        for (var i = 1; i < liList.length; i++) {
            _loop_1(i);
        }
        TAB.Log.AddTaskComment('Finish navigating to each page.');
    };
    HomePage.GetNavItems = function () {
        var navItem = HomePage._getNavItemsElement();
        var liList = TAB.GetElements(navItem, TAB.searchBy.tag, 'li');
        return liList;
    };
    HomePage.GetPageKeyByPageHref = function (href) {
        return href.substr(2);
    };
    HomePage._getNavItemsElement = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.documentElement, 'navItems');
    };
    return HomePage;
}());



/***/ }),

/***/ "WS4A":
/*!******************************************************!*\
  !*** ./lib/SPTaskLib/Controls/LinkPreviewWebpart.js ***!
  \******************************************************/
/*! exports provided: LinkPreviewWebpart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinkPreviewWebpart", function() { return LinkPreviewWebpart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var LinkPreviewWebpart = /** @class */ (function (_super) {
    __extends(LinkPreviewWebpart, _super);
    function LinkPreviewWebpart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Link, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Link.toString()) || this;
    }
    LinkPreviewWebpart.prototype.AddTaskAddWebPartOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _this.AddTaskAssertWebPartNotExist();
            _this.AddTaskSetupNewPage();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(this.WaitForWebPartToExist());
    };
    LinkPreviewWebpart.prototype.AddTaskAssertWebPartNotExist = function () {
        TAB.MakeTask(function () {
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class^="inputContainer"]')) {
                throw 'Link Preview web part should not exist.';
            }
        })
            .WaitFor(undefined);
    };
    LinkPreviewWebpart.prototype.WaitForWebPartToExist = function () {
        return this.WaitForElementWithClassToExist('inputContainer');
    };
    LinkPreviewWebpart.prototype.AddTaskTryInputUrl = function (url, shouldBeFound) {
        TAB.AddTask(TAB.MakeTask(function () {
            var inputContainerDiv = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class^="inputContainer"]');
            var addUrlInput = TAB.GetElement(inputContainerDiv, TAB.searchBy.leadingId, 'TextField');
            // input url
            addUrlInput.focus();
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(addUrlInput, url);
        }), shouldBeFound
            ? this.WaitForElementWithClassToExist('embedContainer') && this.WaitForElementWithClassToExist('metadataTitle')
            : this.WaitForElementWithClassToExist('previewRenderFailureErrorMessage'));
    };
    LinkPreviewWebpart.prototype.AddTaskDeleteInputControl = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            var inputContainerDiv = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class^="inputContainer"]');
            var deleteButton = TAB.GetElement(inputContainerDiv, TAB.searchBy.customQuery, '[type="button"]');
            // click delete button
            TAB.ClickElement(deleteButton);
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class^="inputContainer"]');
        }));
    };
    LinkPreviewWebpart.prototype.AddTaskEditPreviewContent = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            var previewContentDiv = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class^="embedContainer"]');
            var editButton = TAB.GetElement(previewContentDiv, TAB.searchBy.customQuery, '[type="button"]');
            // click edit button
            TAB.ClickElement(editButton);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class^="inputContainer"]');
        }));
    };
    LinkPreviewWebpart.prototype.AddTaskDeletePreviewContent = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            var previewContentDiv = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class^="embedContainer"]');
            var deleteButton = TAB.GetElement(previewContentDiv, TAB.searchBy.customQuery, '[type="button"]');
            // click delete button
            TAB.ClickElement(deleteButton);
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class^="embedContainer"]');
        }));
    };
    LinkPreviewWebpart.prototype.UrlInputExists = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class^="inputContainer"]');
    };
    LinkPreviewWebpart.prototype.WaitForElementWithClassToExist = function (className) {
        // The className is the first class, or the second one. See https://stackoverflow.com/a/8588532/1436671
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[class^=\"" + className + "\"], [class*=\" " + className + "\"]");
    };
    return LinkPreviewWebpart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "XK4g":
/*!************************************************!*\
  !*** ./lib/SPTaskLib/Controls/EmbedWebPart.js ***!
  \************************************************/
/*! exports provided: EmbedWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmbedWebPart", function() { return EmbedWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * @public
 */
var EmbedWebPart = /** @class */ (function (_super) {
    __extends(EmbedWebPart, _super);
    function EmbedWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].ContentEmbed, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].ContentEmbed.toString()) || this;
    }
    EmbedWebPart.prototype.AddTaskAddWebPartOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _this.AddTaskAssertWebPartNotExist();
            _this.AddTaskSetupNewPage();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="embed-code-input"]'));
    };
    EmbedWebPart.prototype.AddTaskAssertWebPartNotExist = function () {
        TAB.MakeTask(function () {
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class^="HTMLEmbed"]')) {
                throw 'Embed web part should not exist.';
            }
        })
            .WaitFor(undefined);
    };
    EmbedWebPart.prototype.AddTaskTryInputEmbedCode = function (embedCode, shouldBeRenderSuccessful) {
        TAB.AddTask(TAB.MakeTask(function () {
            if (!embedCode) {
                embedCode = _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].PageUrl || TAB.Win.location.href;
            }
            var inputEmbedCodeArea = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="embed-code-input"]');
            // input url
            inputEmbedCodeArea.focus();
            _ReactUtil__WEBPACK_IMPORTED_MODULE_3__["ReactUtil"].TriggerOnChange(inputEmbedCodeArea, embedCode);
        }), shouldBeRenderSuccessful
            ? this.WaitForElementWithClassToExist('embedCode')
            : this.WaitForElementWithClassToExist('ms-TextField-errorMessage'));
    };
    EmbedWebPart.prototype.PropertyPaneExisits = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class^="spPropertyPaneContainer"]');
    };
    EmbedWebPart.prototype.WaitForElementWithClassToExist = function (className) {
        // The className is the first class, or the second one. See https://stackoverflow.com/a/8588532/1436671
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[class^=\"" + className + "\"], [class*=\" " + className + "\"]");
    };
    return EmbedWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "XvS+":
/*!********************************************************!*\
  !*** ./lib/SPTaskLib/Controls/SiteInformationPanel.js ***!
  \********************************************************/
/*! exports provided: SiteInformationPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SiteInformationPanel", function() { return SiteInformationPanel; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");

/**
 * @public
 */
var SiteInformationPanel = /** @class */ (function () {
    function SiteInformationPanel() {
    }
    SiteInformationPanel.WaitForPanel = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-SiteSettingsPanel');
    };
    SiteInformationPanel.prototype.AddTaskLaunchSiteInformationPanelFromSuiteNav = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Launching site information panel...');
        TAB.AddTask(undefined, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.id, 'O365_NavHeader'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.AddTaskClickElement(TAB.Win, TAB.searchBy.id, 'O365_MainLink_Settings', TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'o365cs-nav-contextMenu'));
            TAB.AddTaskClickElement(TAB.Win, TAB.searchBy.id, 'O365_SubLink_SUITENAV_SITE_INFORMATION', SiteInformationPanel.WaitForPanel());
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            _this._rootElement = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-SiteSettingsPanel');
            TAB.Log.Pass('Site information panel was successfully launched.');
        }));
    };
    SiteInformationPanel.prototype.AddTaskLaunchSiteInformationPanelDirectly = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Launching site information panel...');
        var siteInfoPanelLaunchFunction = undefined;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            siteInfoPanelLaunchFunction = TAB.Win.window['_spLaunchSiteSettings']; // tslint:disable-line:no-string-literal
            return Boolean(siteInfoPanelLaunchFunction);
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            siteInfoPanelLaunchFunction();
        }), SiteInformationPanel.WaitForPanel());
        TAB.AddTask(TAB.MakeTask(function () {
            _this._rootElement = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-SiteSettingsPanel');
            TAB.Log.Pass('Site information panel was successfully launched.');
        }));
    };
    SiteInformationPanel.prototype.WaitForSiteLogo = function () {
        return TAB.WaitForElementToExist(this._rootElement, TAB.searchBy.customQuery, '[data-automationid="SiteSettingsPanelSiteLogo"]');
    };
    SiteInformationPanel.prototype.WaitForSiteInfo = function () {
        return TAB.WaitForElementToExist(this._rootElement, TAB.searchBy.customQuery, '[data-automationid="SiteSettingsPanelSiteInfo"]');
    };
    SiteInformationPanel.prototype.GetSiteInfoPanelLabels = function () {
        return TAB.GetElements(this._rootElement, TAB.searchBy.hasClassName, 'ms-Label');
    };
    SiteInformationPanel.prototype.GetNameTextField = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._rootElement, 'SiteSettingsPanelNameText');
    };
    SiteInformationPanel.prototype.GetDescriptionTextField = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._rootElement, 'SiteSettingsPanelDescriptionText');
    };
    SiteInformationPanel.prototype.GetDropdownItems = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dropdown-item');
    };
    SiteInformationPanel.prototype.OpenPrivacySettingDropdown = function () {
        TAB.AddTaskClickElement(this._rootElement, TAB.searchBy.hasClassName, 'ms-SiteSettingsPanel-PrivacyDropdown', TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dropdown-item'));
    };
    SiteInformationPanel.prototype.OpenClassificationDropdown = function () {
        TAB.AddTaskClickElement(this._rootElement, TAB.searchBy.hasClassName, 'ms-SiteSettingsPanel-ClassificationDropdown', TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dropdown-item'));
    };
    // Dismiss dropdown menu by click header text.
    SiteInformationPanel.prototype.DismissDropdownMenu = function () {
        TAB.AddTaskClickElement(this._rootElement, TAB.searchBy.hasClassName, 'ms-Panel-headerText', TAB.MakeWaiter(function () {
            var dropdown = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dropdown-item');
            return Boolean(dropdown.length === 0);
        }));
    };
    SiteInformationPanel.prototype.AddTaskDismissSiteInformationPanel = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Dismiss site information panel...');
        TAB.AddTask(TAB.MakeTask(function () {
            // We just click this close button, but removed the waiter, because Phamton JS has issue with the waiter.
            TAB.AddTaskClickElement(_this._rootElement, TAB.searchBy.hasClassName, 'ms-Panel-closeButton');
            TAB.Log.Pass('Site information panel was dismissed.');
        }));
    };
    SiteInformationPanel.prototype.DoesElementExist = function (targetDataAutomationId, targetClassName) {
        if (!targetDataAutomationId && !targetClassName) {
            return false;
        }
        var targetElement = targetDataAutomationId ?
            _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementsByDataAutomationId(this._rootElement, targetDataAutomationId) :
            TAB.GetElements(this._rootElement, TAB.searchBy.hasClassName, targetClassName);
        return Boolean(targetElement && targetElement.length > 0);
    };
    SiteInformationPanel.prototype.GetElementTextContent = function (targetDataAutomationId, targetClassName) {
        if (!targetDataAutomationId && !targetClassName) {
            return undefined;
        }
        var targetElement = targetDataAutomationId ?
            _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(this._rootElement, targetDataAutomationId) :
            TAB.GetElement(this._rootElement, TAB.searchBy.hasClassName, targetClassName);
        return TAB.GetTextContent(targetElement);
    };
    return SiteInformationPanel;
}());



/***/ }),

/***/ "Y4ae":
/*!****************************************************!*\
  !*** ./lib/SPTaskLib/MemoryTest/MemoryTestUtil.js ***!
  \****************************************************/
/*! exports provided: MemoryTestWebPartType, MemoryTestUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryTestWebPartType", function() { return MemoryTestWebPartType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MemoryTestUtils", function() { return MemoryTestUtils; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _CanvasContentTemplate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./CanvasContentTemplate */ "8vep");


/**
 * @public
 */
var MemoryTestWebPartType;
(function (MemoryTestWebPartType) {
    MemoryTestWebPartType["Blank"] = "Blank";
    MemoryTestWebPartType["Image"] = "Image";
})(MemoryTestWebPartType || (MemoryTestWebPartType = {}));
var MEMORY_TEST_PAGE_SUFFIX = '-32511d91c213';
/**
 * @public
 */
var MemoryTestUtils = /** @class */ (function () {
    function MemoryTestUtils() {
    }
    MemoryTestUtils.AddTaskEnsureWebPartPageWithLink = function (siteUrl, webPartType, linkToWebPartType) {
        TAB.Log.AddTaskComment("Ensure " + webPartType + " page existing.");
        var createPageUrl = siteUrl + "/_api/sitepages/pages";
        var canvasContent = MemoryTestUtils._getCanvasContentTemplate(webPartType, linkToWebPartType);
        var pageContent = {
            PageLayoutType: 'Article',
            Title: MemoryTestUtils._getWebPartPageTitle(webPartType),
            Name: MemoryTestUtils._getWebPartPageTitle(webPartType) + ".aspx",
            CanvasContent1: JSON.stringify(canvasContent)
        };
        var result = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendPostRequest(siteUrl, createPageUrl, JSON.stringify(pageContent), result);
        TAB.AddTask(TAB.MakeTask(function () {
            if (result && result.success && result.retVal) {
                TAB.Log.AddTaskComment("Web part Page " + webPartType + " created successfully.");
            }
            else {
                TAB.Log.AddTaskComment("Web part Page " + webPartType + " already exists. If you want to create a new one, delete it first.");
            }
        }));
    };
    MemoryTestUtils.AddTaskClickLinkToLoadPage = function (linkToWebPartType) {
        var linkToPageTitle = MemoryTestUtils._getWebPartPageTitle(linkToWebPartType);
        TAB.Log.AddTaskComment("click " + linkToPageTitle + " to load the page");
        TAB.AddTask(TAB.MakeTask(function () {
            var link = _CanvasContentTemplate__WEBPACK_IMPORTED_MODULE_1__["CanvasContentTemplate"].getLinkElement();
            TAB.ClickElement(link);
        }), MemoryTestUtils._waitForWebPartPageToLoad(linkToWebPartType));
    };
    MemoryTestUtils.AddTaskLoadPage = function (siteUrl, webPartType) {
        var linkToPageTitle = MemoryTestUtils._getWebPartPageTitle(webPartType);
        TAB.Log.AddTaskComment("Load " + linkToPageTitle + " Page");
        TAB.AddTask(TAB.LoadPage(siteUrl + ("/sitepages/" + linkToPageTitle + ".aspx")), MemoryTestUtils._waitForWebPartPageToLoad(webPartType));
    };
    MemoryTestUtils.AddTaskWaitForSeconds = function (sec) {
        TAB.Log.AddTaskComment("wait for " + sec + " second(s).");
        var done = false;
        TAB.AddTask(TAB.MakeTask(function () { return setTimeout(function () { return done = true; }, sec * 1000); }), TAB.MakeWaiter(function () { return done; }));
    };
    MemoryTestUtils._waitForWebPartPageToLoad = function (webPartType) {
        return TAB.MakeWaiter(function () {
            switch (webPartType) {
                case MemoryTestWebPartType.Blank:
                    return _CanvasContentTemplate__WEBPACK_IMPORTED_MODULE_1__["CanvasContentTemplate"].isCanvasWithLinkLoaded();
                case MemoryTestWebPartType.Image:
                    return _CanvasContentTemplate__WEBPACK_IMPORTED_MODULE_1__["CanvasContentTemplate"].isCanvasWithImagesLoaded() && _CanvasContentTemplate__WEBPACK_IMPORTED_MODULE_1__["CanvasContentTemplate"].isCanvasWithLinkLoaded();
                default:
                    throw new Error("Web part " + webPartType + " is not supported for memory test.");
            }
        });
    };
    MemoryTestUtils._getWebPartPageTitle = function (webPartType) {
        return "" + webPartType + MEMORY_TEST_PAGE_SUFFIX;
    };
    MemoryTestUtils._getCanvasContentTemplate = function (webPartType, linkToWebPartType) {
        switch (webPartType) {
            case MemoryTestWebPartType.Blank:
                return _CanvasContentTemplate__WEBPACK_IMPORTED_MODULE_1__["CanvasContentTemplate"].GetLinkCanvasContent(MemoryTestUtils._getWebPartPageTitle(linkToWebPartType));
            case MemoryTestWebPartType.Image:
                return _CanvasContentTemplate__WEBPACK_IMPORTED_MODULE_1__["CanvasContentTemplate"].GetImagesCanvasContent(MemoryTestUtils._getWebPartPageTitle(linkToWebPartType));
            default:
                throw new Error("Webpart page " + webPartType + " is not supported for memory test.");
        }
    };
    return MemoryTestUtils;
}());



/***/ }),

/***/ "YfnZ":
/*!**************************************************!*\
  !*** ./lib/SPTaskLib/Pages/PageSettingsPanel.js ***!
  \**************************************************/
/*! exports provided: PageSettingsPanel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageSettingsPanel", function() { return PageSettingsPanel; });
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
/* harmony import */ var _Controls_FilePicker__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Controls/FilePicker */ "8uLm");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Next */ "BJbA");




var DESCRIPTION_PROPERTY_NAME = 'Description';
/**
 * @public
 */
var PageSettingsPanel = /** @class */ (function () {
    function PageSettingsPanel() {
    }
    PageSettingsPanel.AddTaskWaitForPageSettingsPanel = function () {
        TAB.AddTask(undefined, PageSettingsPanel.WaitForReactClientFormLoaded());
    };
    PageSettingsPanel.AddTaskEditProperty = function (propertyName, newValue) {
        if (propertyName === DESCRIPTION_PROPERTY_NAME) {
            this._addTaskEditPropertyCustomControls(propertyName, newValue);
        }
        else {
            this._addTaskEditPropertyReactClientForm(propertyName, newValue);
        }
    };
    PageSettingsPanel.AddTaskAssertIsDefaultDescription = function (value) {
        _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].AddRestTaskGetCanvasContentJson();
        TAB.AddTask(TAB.MakeTask(function () {
            var pageSettingsSlice = PageSettingsPanel._getPageSettingsSliceFromCanvasContent();
            if (pageSettingsSlice.isDefaultDescription === value) {
                TAB.Log.AddTaskPass("Flag value correct - isDefaultDescription: " + value);
            }
            else {
                TAB.Log.AddTaskFail("Wrong value of flag isDefaultDescription.\nExpected " + value + ". Actual " + pageSettingsSlice.isDefaultDescription);
            }
        }));
    };
    PageSettingsPanel.AddTaskAssertIsDefaultThumbnail = function (value) {
        _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].AddRestTaskGetCanvasContentJson();
        TAB.AddTask(TAB.MakeTask(function () {
            var pageSettingsSlice = PageSettingsPanel._getPageSettingsSliceFromCanvasContent();
            if (pageSettingsSlice.isDefaultThumbnail === value) {
                TAB.Log.AddTaskPass("Flag value correct - isDefaultThumbnail: " + value);
            }
            else {
                TAB.Log.AddTaskFail("Wrong value of flag isDefaultThumbnail.\nExpected: " + value + ". Actual: " + pageSettingsSlice.isDefaultThumbnail);
            }
        }));
    };
    PageSettingsPanel.AddTaskVerifyImageRenderedByImageInfo = function (imageInfo) {
        TAB.AddTask(TAB.MakeTask(function () {
            var image = PageSettingsPanel._getThumbnailElement();
            var src = image.src;
            if (PageSettingsPanel.doesSourceContainGuid(src, imageInfo.siteId) &&
                PageSettingsPanel.doesSourceContainGuid(src, imageInfo.webId) &&
                PageSettingsPanel.doesSourceContainGuid(src, imageInfo.uniqueId)) {
                TAB.Log.Pass('Thumbnail is rendering the specified image correctly');
            }
            else {
                TAB.Log.Fail("Thumbnail is rendering some other image. Expected item to have\nsite id: " + imageInfo.siteId + ", web id: " + imageInfo.webId + " unique id: " + imageInfo.uniqueId + "\nActual rendered image url is: " + src);
            }
        }));
    };
    PageSettingsPanel.AddTaskUploadImageFromBingSearch = function (filePicker, listName) {
        PageSettingsPanel._addTaskOpenFilePickerToChangeThumbnail();
        filePicker.AddTaskSelectView(_Controls_FilePicker__WEBPACK_IMPORTED_MODULE_2__["FilePickerView"].Search);
        filePicker.AddTaskOpenFile(1); // Select image other than Image web part uploaded.
        TAB.Log.AddTaskComment("Wait until upload complete and thubmnail changed. Current URL");
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                return Boolean(PageSettingsPanel._imageUrl);
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            if (TAB[listName]) {
                TAB[listName].push(PageSettingsPanel._imageUrl);
            }
        }));
    };
    PageSettingsPanel.WaitForReactClientFormLoaded = function () {
        return TAB.MakeWaiter(function () {
            try {
                var propertiesWrapper = PageSettingsPanel.GetPageSettingsPanelProperties();
                return propertiesWrapper && (TAB.ElementExists(propertiesWrapper, TAB.searchBy.className, 'ReactClientForm') ||
                    TAB.ElementExists(propertiesWrapper, TAB.searchBy.customQuery, "[data-automation-id=\"pageSettings-noFields\"]") // No fields
                );
            }
            catch (_a) {
                return false;
            }
        });
    };
    PageSettingsPanel.getDescriptionValue = function () {
        var description = PageSettingsPanel.GetDescriptionField();
        var value = description.value;
        TAB.Log.AddTaskComment("Description value: " + value);
        return value;
    };
    PageSettingsPanel.GetPageSettingsPanelProperties = function () {
        try {
            var panel = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='pageSettingsPanel-properties']");
            return panel;
        }
        catch (e) {
            return undefined;
        }
    };
    PageSettingsPanel.GetReactClientFormFields = function () {
        try {
            var fields = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ReactFieldEditor');
            return fields;
        }
        catch (e) {
            return undefined;
        }
    };
    PageSettingsPanel.GetDescriptionField = function () {
        TAB.Log.AddTaskComment('Looking for description field from PageSettingsPanel');
        var description = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'PageSettingsDescription');
        if (!description) {
            TAB.Log.AddTaskFail('Description field not present');
            throw new Error();
        }
        else {
            return description;
        }
    };
    PageSettingsPanel.PageSettingsPanelExists = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='pageSettingsPanel']");
    };
    PageSettingsPanel._addTaskEditPropertyReactClientForm = function (propertyName, newValue) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Task edit property " + propertyName + " to value " + newValue);
            var properties = [].slice.call(PageSettingsPanel.GetReactClientFormFields());
            var textFieldToEdit = properties.filter(function (element) { return element.textContent.indexOf(propertyName) > -1; })[0];
            var readableField = textFieldToEdit.querySelector('.ReactFieldEditor-placeHolder');
            TAB.Log.AddTaskComment('Click on field to switch it to edit mode');
            var clickEvent = TAB.Win.document.createEvent('HTMLEvents');
            clickEvent.initEvent('click', true, false);
            readableField.dispatchEvent(clickEvent);
            TAB.Log.AddTaskComment('Update the value');
            var editableField = TAB.GetElement(PageSettingsPanel.GetPageSettingsPanelProperties(), [TAB.searchBy.tag, TAB.searchBy.hasClassName], ['input', 'ms-TextField-field']);
            editableField.value = newValue;
            _ReactUtil__WEBPACK_IMPORTED_MODULE_1__["ReactUtil"].TriggerOnChange(editableField, newValue);
            TAB.FireKeyboardEvent(editableField, 'keydown', 13 /*Enter*/);
            textFieldToEdit.blur();
        }), undefined);
    };
    PageSettingsPanel._addTaskEditPropertyCustomControls = function (propertyName, newValue) {
        TAB.AddTask(TAB.MakeTask(function () {
            if (propertyName === DESCRIPTION_PROPERTY_NAME) {
                var description = PageSettingsPanel.GetDescriptionField();
                var focusEv = TAB.Win.document.createEvent('HTMLEvents');
                focusEv.initEvent('focus', true /*bubble*/, false /*cancelable*/);
                description.dispatchEvent(focusEv);
                description.value = newValue;
                var ev = TAB.Win.document.createEvent('HTMLEvents');
                ev.initEvent('input', true /*bubble*/, false /*cancelable*/);
                description.dispatchEvent(ev);
                // press Enter
                TAB.FireKeyboardEvent(description, 'keydown', 13);
                var blurEv = TAB.Win.document.createEvent('HTMLEvents');
                blurEv.initEvent('blur', true /*bubble*/, false /*cancelable*/);
                description.dispatchEvent(blurEv);
            }
            else {
                TAB.Log.AddTaskFail('Unsupported property name requested to change');
            }
        }), TAB.MakeWaiter(function () {
            return PageSettingsPanel.getDescriptionValue() === newValue;
        }));
    };
    PageSettingsPanel._addTaskOpenFilePickerToChangeThumbnail = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            var changeThumbnailButton = PageSettingsPanel._getChangeThumbnailButton();
            TAB.Log.Comment('Click change thumbnail button to trigger file picker');
            changeThumbnailButton.click();
        }), TAB.MakeWaiter(function () {
            try {
                return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win, _Controls_FilePicker__WEBPACK_IMPORTED_MODULE_2__["FILE_PICKER_AUTOMATION_ID"]);
            }
            catch (error) {
                return false;
            }
        }));
    };
    PageSettingsPanel._getPageSettingsSliceFromCanvasContent = function () {
        var metadata = _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].CanvasContentJson
            .filter(function (canvasControl) { return canvasControl.controlType === 0; })[0];
        if (!metadata || !metadata.pageSettingsSlice) {
            TAB.Log.AddTaskFail('Metadata control is missing from canvas content, make sure flight MakeContentShine is enabled');
        }
        else {
            return metadata.pageSettingsSlice;
        }
    };
    PageSettingsPanel._getChangeThumbnailButton = function () {
        TAB.Log.AddTaskComment('Looking for change thumbnail button from PageSettingsPanel');
        var button = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='changeThumbnailButton']");
        if (!button) {
            TAB.Log.AddTaskFail('Change thumbnail button not present');
            throw new Error();
        }
        else {
            return button;
        }
    };
    PageSettingsPanel._getThumbnailElement = function () {
        TAB.Log.AddTaskComment('Looking for thumbnail field from PageSettingsPanel');
        var image = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='PageDetailsThumbnail']");
        if (!image) {
            TAB.Log.AddTaskFail('Thumbnail field not present');
            throw new Error();
        }
        else {
            return image;
        }
    };
    Object.defineProperty(PageSettingsPanel, "_imageUrl", {
        get: function () {
            return PageSettingsPanel._getThumbnailElement().getAttribute('data-sp-originalimgsrc');
        },
        enumerable: true,
        configurable: true
    });
    PageSettingsPanel.doesSourceContainGuid = function (src, guid) {
        // Preview URL might be with or without dashes '-'.
        return src.indexOf(guid) !== -1 || src.indexOf(guid.replace(/-/g, '')) !== -1;
    };
    return PageSettingsPanel;
}());



/***/ }),

/***/ "bl+Y":
/*!**********************************************!*\
  !*** ./lib/SPTaskLib/Pages/CanvasToolbox.js ***!
  \**********************************************/
/*! exports provided: CanvasToolbox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasToolbox", function() { return CanvasToolbox; });
/* harmony import */ var _Canvas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas */ "mmJW");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");



/**
 * @public
 */
var CanvasToolbox = /** @class */ (function () {
    function CanvasToolbox() {
    }
    Object.defineProperty(CanvasToolbox, "canvasLargeToolboxBodyAutomationId", {
        get: function () {
            return 'spPageCanvasLargeToolboxBody';
        },
        enumerable: true,
        configurable: true
    });
    CanvasToolbox.AddTaskOpenToolbox = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].AddTaskOpenToolbox(_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].rootCanvasElement, _Canvas__WEBPACK_IMPORTED_MODULE_0__["HintType"].WebPartHint);
        }));
    };
    CanvasToolbox.AddTaskExpandToolbox = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.ClickElement(CanvasToolbox._toolboxFarButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-item-size='large']"));
    };
    CanvasToolbox.AddTaskAddControlFromLargeToolbox = function (webpart) {
        var numberOfControlsBefore = NaN;
        TAB.AddTask(TAB.MakeTask(function () {
            numberOfControlsBefore = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].rootCanvasElement, _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].CanvasControlId).length;
            TAB.Log.AddTaskComment('Add webpart from large toolbox');
            var toolboxItem = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(CanvasToolbox._pageCanvasLargeToolboxBody, webpart.entryId);
            TAB.ClickElement(toolboxItem);
        }), TAB.MakeWaiter(function () {
            var numberOfControls = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].rootCanvasElement, _Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].CanvasControlId).length;
            return numberOfControls === numberOfControlsBefore + 1;
        }));
    };
    CanvasToolbox.AddTaskSearchByKeyword = function (keyword, assert) {
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            TAB.Log.Comment('Wait for search box to show up');
            try {
                return !!CanvasToolbox._searchBoxInput;
            }
            catch (err) {
                return false;
            }
        }));
        TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Search by keyword in toolbox. keyword=" + keyword);
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(CanvasToolbox._searchBoxInput, keyword);
        })
            .WaitFor(TAB.MakeWaiter(function () { return assert(CanvasToolbox._toolboxItemCount); }));
    };
    // Web part title and description are localized so we should use the automation ID to get
    // the web part element and then get the web part title for searching.
    CanvasToolbox.AddTaskSearchWebPart = function (webpart, assert) {
        TAB.Log.AddTaskComment('Reset user input in search box');
        TAB.MakeTask(function () {
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(CanvasToolbox._searchBoxInput, '');
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"" + webpart.entryId + "\"]"));
        TAB.Log.AddTaskComment('Search webpart in toolbox');
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Get the web part title and search it');
            // There might be multiple same web parts in the large toolbox view so we use GetElements.
            var webpartEntry = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"" + webpart.entryId + "\"]")[0];
            var webpartTitle = TAB.GetElement(webpartEntry, TAB.searchBy.partialClassName, 'title_');
            var keyword = TAB.GetTextContent(webpartTitle);
            if (keyword && keyword[keyword.length - 1] === '…') {
                // We remove the ellipsis added by LessText.
                keyword = keyword.slice(0, keyword.length - 1);
            }
            CanvasToolbox.AddTaskSearchByKeyword(keyword, assert);
        }));
    };
    CanvasToolbox.AddTaskAssertWebPartExists = function (webpart) {
        TAB.AddTask(TAB.MakeTask(function () {
            if (!TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"" + webpart.entryId + "\"]")) {
                throw new Error('Assert web part exits fail');
            }
        }));
    };
    Object.defineProperty(CanvasToolbox, "_toolboxItemCount", {
        get: function () {
            return TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[data-item-size]').length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasToolbox, "_toolboxFarButton", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(_Canvas__WEBPACK_IMPORTED_MODULE_0__["Canvas"].toolboxElement, 'toolbox-farButton');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasToolbox, "_searchBoxInput", {
        get: function () {
            return TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-SearchBox-field');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CanvasToolbox, "_pageCanvasLargeToolboxBody", {
        get: function () {
            try {
                return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(TAB.Win, CanvasToolbox.canvasLargeToolboxBodyAutomationId)[0];
            }
            catch (e) {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    return CanvasToolbox;
}());



/***/ }),

/***/ "cVxD":
/*!*********************************************************!*\
  !*** ./lib/SPTaskLib/Pages/PublishingPageMonitoring.js ***!
  \*********************************************************/
/*! exports provided: PublishingPageMonitoring */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PublishingPageMonitoring", function() { return PublishingPageMonitoring; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");

var navNodeText = 'TestPage';
/**
 * @public
 */
var PublishingPageMonitoring = /** @class */ (function () {
    function PublishingPageMonitoring() {
    }
    PublishingPageMonitoring.MonitorClassicPublishingPage = function (options) {
        var _this = this;
        var result = {};
        var siteUrl = options.siteUrl, targetUrl = options.targetUrl, managedNavigation = options.managedNavigation;
        try {
            _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendGetRequestClassicPage(siteUrl, targetUrl, result);
        }
        catch (e) {
            TAB.Log.Comment("Get Request Failed: " + e);
        }
        TAB.AddTask(TAB.MakeTask(function () {
            if (result && result.success) {
                TAB.Log.AddTaskComment("Publishing page returns 200. Correlation id is " + result.correlationId);
                if (_this.CheckNavNodes(result, managedNavigation)) {
                    TAB.Log.AddTaskComment("Publishing Page contains the correct text \"" + navNodeText + "\" in the top nav and quick launch");
                }
                else {
                    TAB.Log.AddTaskComment('Publishing Page does not contain the correct nav nodes');
                }
            }
            else {
                TAB.Log.AddTaskComment('Publishing Page does not return 200');
            }
        }));
    };
    PublishingPageMonitoring.CheckNavNodes = function (result, managedNavigation) {
        var topNavId = 'DeltaTopNavigation';
        var quickLaunchId = 'QuickLaunchNavigation';
        var navNodeTextClassname = 'menu-item-text';
        var topNav = TAB.GetElement(result.retVal, TAB.searchBy.id, topNavId);
        var quickLaunch = TAB.GetElement(result.retVal, TAB.searchBy.partialId, quickLaunchId);
        var topNavElems = TAB.GetElements(topNav, TAB.searchBy.partialClassName, navNodeTextClassname);
        var quickLaunchElems = TAB.GetElements(quickLaunch, TAB.searchBy.partialClassName, navNodeTextClassname);
        if (!topNavElems || topNavElems.length < 1 || !quickLaunchElems || quickLaunchElems.length < 1) {
            return false;
        }
        // Managed Nav contains the first page as the first top nav and quicklaunch node
        if (managedNavigation && topNavElems[0].textContent.search(navNodeText) > -1 && quickLaunchElems[0].textContent.search(navNodeText) > -1) {
            return true;
        }
        // Structured Nav contains the site name as the first top nav node and the first page as the second node
        if (!managedNavigation && topNavElems[1].textContent.search(navNodeText) > -1 && quickLaunchElems[0].textContent.search(navNodeText) > -1) {
            return true;
        }
        return false;
    };
    return PublishingPageMonitoring;
}());



/***/ }),

/***/ "dAVj":
/*!******************************************!*\
  !*** ./lib/SPTaskLib/Controls/Upload.js ***!
  \******************************************/
/*! exports provided: upload, dataURItoFile, setFileInput */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "upload", function() { return upload; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dataURItoFile", function() { return dataURItoFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFileInput", function() { return setFileInput; });
/**
 * @public
 */
function upload(inputElement, fileInputs) {
    var files = [];
    var size = 0;
    for (var _i = 0, fileInputs_1 = fileInputs; _i < fileInputs_1.length; _i++) {
        var fileInput = fileInputs_1[_i];
        var file = new Blob(['Hello World!'], {
            type: 'text/plain'
        });
        file.name = fileInput.name;
        files.push(file);
        size += file.size;
        TAB.Log.Comment("Attached file '" + fileInput.name + "' to input element.");
    }
    inputElement.test_files = files;
    TAB.FireChangeEvent(inputElement);
    TAB.Log.Comment('Fired change event to start uploading.');
    return {
        names: files.map(function (file) { return file.name; }),
        size: size
    };
}
/**
 * @public
 */
function dataURItoFile(dataURI, fileName) {
    var dataURIComponents = dataURI.split(',');
    var byteString = atob(dataURIComponents[1]);
    var mimeString = dataURIComponents[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new File([ab], fileName, { type: mimeString });
}
/**
 * @public
 */
function setFileInput(inputElement, fileInputs) {
    inputElement.test_files = fileInputs;
    TAB.FireChangeEvent(inputElement);
}


/***/ }),

/***/ "dp3n":
/*!*******************************************************!*\
  !*** ./lib/SPTaskLib/Utilities/ReactTriggerChange.js ***!
  \*******************************************************/
/*! exports provided: ReactTriggerChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReactTriggerChange", function() { return ReactTriggerChange; });
// This is mostly a drop of https://github.com/vitalyq/react-trigger-change at 1.0.2
// (because importing dependencies properly within TAB is difficult)
// This has been used in odsp-next for React trigger change events. Importing this
// to sp-client for the same purpose.
/* tslint:disable */
/**
 * Trigger React's synthetic change events on input, textarea and select elements.
 *
 * WARNING!!! As of writing, this has only been tested in odsp-next for text fields in Chrome.
 * To use it with other field types or browsers, additional work may be needed.
 * (example: the section guarded by TAB.BrowserIs.ie was originally run in all browsers)
 *
 * @public
 */
function ReactTriggerChange(node) {
    var supportedInputTypes = {
        color: true,
        date: true,
        datetime: true,
        'datetime-local': true,
        email: true,
        month: true,
        number: true,
        password: true,
        range: true,
        search: true,
        tel: true,
        text: true,
        time: true,
        url: true,
        week: true
    };
    var nodeName = node.nodeName.toLowerCase();
    var type = node.type;
    var event;
    var descriptor;
    var initialValue;
    var initialChecked;
    var initialCheckedRadio;
    // Do not try to delete non-configurable properties.
    // Value and checked properties on DOM elements are non-configurable in PhantomJS.
    function deletePropertySafe(elem, prop) {
        var desc = Object.getOwnPropertyDescriptor(elem, prop);
        if (desc && desc.configurable) {
            delete elem[prop];
        }
    }
    // In IE10 propertychange is not dispatched on range input if invalid
    // value is set.
    function changeRangeValue(range) {
        var initMin = range.min;
        var initMax = range.max;
        var initStep = range.step;
        var initVal = Number(range.value);
        range.min = initVal;
        range.max = initVal + 1;
        range.step = 1;
        range.value = initVal + 1;
        deletePropertySafe(range, 'value');
        range.min = initMin;
        range.max = initMax;
        range.step = initStep;
        range.value = initVal;
    }
    function getCheckedRadio(radio) {
        var name = radio.name;
        var radios;
        var i;
        if (name) {
            radios = TAB.Win.document.querySelectorAll('input[type="radio"][name="' + name + '"]');
            for (i = 0; i < radios.length; i += 1) {
                if (radios[i].checked) {
                    return radios[i] !== radio ? radios[i] : null;
                }
            }
        }
        return null;
    }
    function preventChecking(e) {
        e.preventDefault();
        if (!initialChecked) {
            e.target.checked = false;
        }
        if (initialCheckedRadio) {
            initialCheckedRadio.checked = true;
        }
    }
    if (nodeName === 'select' || (nodeName === 'input' && type === 'file')) {
        // IE9-IE11, non-IE
        // Dispatch change.
        event = TAB.Win.document.createEvent('HTMLEvents');
        event.initEvent('change', true, false);
        node.dispatchEvent(event);
    }
    else if ((nodeName === 'input' && supportedInputTypes[type]) || nodeName === 'textarea') {
        //
        // !!! NOTE !!!
        // react-trigger-change runs this next section in all browsers, but it seemed to break
        // text field updates in Chrome (hasn't been tested in IE as of writing)
        //
        if (TAB.browserIs.ie) {
            // React 0.14: IE9
            // React 15: IE9-IE11
            // React 16: IE9
            // Dispatch focus.
            // React 16
            // Cache artificial value property descriptor.
            // Property doesn't exist in React <16, descriptor is undefined.
            descriptor = Object.getOwnPropertyDescriptor(node, 'value');
            event = TAB.Win.document.createEvent('UIEvents');
            event.initEvent('focus', false, false);
            node.dispatchEvent(event);
            // React 0.14: IE9
            // React 15: IE9-IE11
            // React 16
            // In IE9-10 imperative change of node value triggers propertychange event.
            // Update inputValueTracking cached value.
            // Remove artificial value property.
            // Restore initial value to trigger event with it.
            if (type === 'range') {
                changeRangeValue(node);
            }
            else {
                initialValue = node.value;
                node.value = initialValue + '#';
                deletePropertySafe(node, 'value');
                node.value = initialValue;
            }
            // React 15: IE11
            // For unknown reason React 15 added listener for propertychange with addEventListener.
            // This doesn't work, propertychange events are deprecated in IE11,
            // but allows us to dispatch fake propertychange which is handled by IE11.
            event = TAB.Win.document.createEvent('HTMLEvents');
            event.initEvent('propertychange', false, false);
            event.propertyName = 'value';
            node.dispatchEvent(event);
        }
        // React 0.14: IE10-IE11, non-IE
        // React 15: non-IE
        // React 16: IE10-IE11, non-IE
        event = TAB.Win.document.createEvent('HTMLEvents');
        event.initEvent('input', true, false);
        node.dispatchEvent(event);
        // React 16
        // Restore artificial value property descriptor.
        if (descriptor) {
            Object.defineProperty(node, 'value', descriptor);
        }
    }
    else if (nodeName === 'input') {
        var input = node;
        if (type === 'checkbox') {
            // Invert inputValueTracking cached value.
            input.checked = !input.checked;
            // Dispatch click.
            // Click event inverts checked value.
            event = TAB.Win.document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            input.dispatchEvent(event);
        }
        else if (type === 'radio') {
            // Cache initial checked value.
            initialChecked = input.checked;
            // Find and cache initially checked radio in the group.
            initialCheckedRadio = getCheckedRadio(input);
            // React 16
            // Cache property descriptor.
            // Invert inputValueTracking cached value.
            // Remove artificial checked property.
            // Restore initial value, otherwise preventDefault will eventually revert the value.
            descriptor = Object.getOwnPropertyDescriptor(input, 'checked');
            input.checked = !initialChecked;
            deletePropertySafe(input, 'checked');
            input.checked = initialChecked;
            // Prevent toggling during event capturing phase.
            // Set checked value to false if initialChecked is false,
            // otherwise next listeners will see true.
            // Restore initially checked radio in the group.
            /* tslint:disable:ban-native-functions */
            input.addEventListener('click', preventChecking, true);
            /* tslint:enable:ban-native-functions */
            // Dispatch click.
            // Click event inverts checked value.
            event = TAB.Win.document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            input.dispatchEvent(event);
            // Remove listener to stop further change prevention.
            input.removeEventListener('click', preventChecking, true);
            // React 16
            // Restore artificial checked property descriptor.
            if (descriptor) {
                Object.defineProperty(input, 'checked', descriptor);
            }
        }
    }
}
/* tslint:enable */


/***/ }),

/***/ "e5Kj":
/*!***********************************************!*\
  !*** ./lib/SPTaskLib/Controls/TitleRegion.js ***!
  \***********************************************/
/*! exports provided: TitleRegion */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TitleRegion", function() { return TitleRegion; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _FilePicker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./FilePicker */ "8uLm");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





/**
 * @public
 */
var TitleRegion = /** @class */ (function (_super) {
    __extends(TitleRegion, _super);
    function TitleRegion() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].TitleRegion, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].TitleRegion.toString()) || this;
    }
    TitleRegion.GetTitleRegionWebPart = function () {
        TAB.AddTask(undefined, _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].WaitForTitleRegion());
        return new TitleRegion();
    };
    Object.defineProperty(TitleRegion.prototype, "_root", {
        get: function () {
            return _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].GetPageHeader();
        },
        enumerable: true,
        configurable: true
    });
    TitleRegion.prototype.AddTaskSwitchToLayout = function (layout) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Switch to title region " + layout + " layout");
            var layoutGroupRadio = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, "PropertyPaneChoiceGroup-" + layout)[0];
            if (layoutGroupRadio) {
                TAB.ClickElement(layoutGroupRadio);
            }
            else {
                TAB.Log.Fail("Fail to switch to " + layout + " layout in Title Region");
            }
        }), this.WaitForLayoutIsSelected(layout));
    };
    TitleRegion.prototype.AddTaskRemovePageAuthor = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Remove the page author");
            var authorByline = TAB.GetElement(_this._root, TAB.searchBy.partialClassName, 'authorByline');
            var deleteAuthorButton = TAB.GetElement(authorByline, TAB.searchBy.partialClassName, 'deleteButton');
            deleteAuthorButton.click();
        }), TAB.MakeWaiter(function () {
            try {
                return _this._authorInput;
            }
            catch (_a) {
                return false;
            }
        }));
    };
    TitleRegion.prototype.AddTaskAddPageAuthor = function (user) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Input " + user + " as page author");
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(_this._authorInput, user);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-PeoplePicker-personaContent'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Press enter to select the person');
            TAB.FireKeyboardEvent(_this._authorInput, 'keydown', _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["KeyCodes"].enter);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'authorByline') &&
            TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'personaDetails'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Ensure person is added successfully');
        }), TAB.MakeWaiter(function () {
            var authorByline = TAB.GetElement(_this._root, TAB.searchBy.partialClassName, 'authorByline');
            var authorDetails = TAB.GetElement(authorByline, TAB.searchBy.partialClassName, 'personaDetails');
            return authorDetails.textContent.indexOf(user) !== -1;
        }));
    };
    TitleRegion.prototype.AddTaskResetImage = function () {
        var _this = this;
        // Click on the reset button and verify that there is a background image but no focal point
        TAB.AddTask(TAB.MakeTask(function () {
            var resetButton = _this._getTitleToolbarElementById('titleToolbarResetButton');
            if (resetButton) {
                TAB.ClickElement(resetButton);
            }
            else {
                TAB.Log.Fail('Failure in resetting image for Title Region');
            }
        }), TAB.MakeWaiter(function () {
            return !_this._toolbarFocalPointButton && _this._backgroundImage;
        }));
    };
    TitleRegion.prototype.AddTaskOpenFilePicker = function () {
        var _this = this;
        var filePicker = new _FilePicker__WEBPACK_IMPORTED_MODULE_4__["FilePicker"]();
        TAB.AddTask(TAB.MakeTask(function () {
            if (_this._toolbarEditButton) {
                TAB.ClickElement(_this._toolbarEditButton);
                TAB.Log.Comment('Opened File Picker for Title Region');
            }
        }), _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'sp-filepicker'));
        TAB.AddTask(TAB.MakeTask(function () {
            filePicker.SetRoot(_this._filePicker);
        }), filePicker.WaitForViewLoad(_FilePicker__WEBPACK_IMPORTED_MODULE_4__["FilePickerView"].Recent));
        return filePicker;
    };
    TitleRegion.prototype.AddTaskMoveFocalPoint = function (offsetX, offsetY) {
        var _this = this;
        // Make sure uploading is finished
        TAB.AddTask(undefined, this.WaitForElementsByDataAutomationId('localFilePreview', 0));
        // FireMouseEvent is not allowed in Edge due to initMouseEvent deprecation
        // Fix required in TABCore VSO#405141
        if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
            TAB.Log.AddTaskWarning('Fire mouse event is not permitted in Edge.');
            return;
        }
        TAB.Log.AddTaskComment("Move focal point to offset (" + offsetX + ", " + offsetY + ")");
        TAB.AddTask(TAB.MakeTask(function () {
            if (_this._toolbarFocalPointButton) {
                TAB.ClickElement(_this._toolbarFocalPointButton);
                TAB.Log.Comment('Opened Focal Point Setting for Title Region');
            }
            else if (_this._focalFrame) {
                TAB.Log.Comment('Already in Focal Point Setting');
            }
            else {
                TAB.Log.Fail('Focal Point Setting Button Not Found');
            }
        }), this.WaitForElementsByDataAutomationId('focalFrameIsSetting'));
        TAB.Log.AddTaskComment('MouseMove to a new position');
        TAB.AddTask(TAB.MakeTask(function () {
            var pos = _this._focalCircle.getBoundingClientRect();
            var newX = pos.left + pos.width / 2;
            var newY = pos.top + pos.height / 2;
            TAB.FireMouseEvent(_this._focalFrame, TAB.mouseEvent.mouseDown, new TAB.MouseEventData(newX, newY));
        }), this.WaitForElementsByDataAutomationId('focalFrameIsDragging'));
        TAB.Log.AddTaskComment('MouseDown on the center of the focal point setting handle');
        TAB.AddTask(TAB.MakeTask(function () {
            var framePos = _this._focalFrame.getBoundingClientRect();
            var targetX = framePos.left + framePos.width * offsetX / 100;
            var targetY = framePos.top + framePos.height * offsetY / 100;
            TAB.Log.Comment("Mouse focal circle position to (" + targetX + ", " + targetY + ")");
            TAB.FireMouseEvent(_this._focalFrame, TAB.mouseEvent.mouseMove, new TAB.MouseEventData(targetX, targetY));
        }), TAB.MakeWaiter(function () {
            var framePos = _this._focalFrame.getBoundingClientRect();
            var targetX = framePos.left + framePos.width * offsetX / 100;
            var targetY = framePos.top + framePos.height * offsetY / 100;
            TAB.Log.Comment("Expect focal circle position to (" + targetX + ", " + targetY + ")");
            var circlePos = _this._focalCircle.getBoundingClientRect();
            var newX = circlePos.left + circlePos.width / 2;
            var newY = circlePos.top + circlePos.height / 2;
            TAB.Log.Comment("Actual focal circle position to (" + newX + ", " + newY + ")");
            var result = Math.abs(targetX - newX) < 5 && Math.abs(targetY - newY) < 5;
            return result;
        }));
        TAB.Log.AddTaskComment('MouseUp to finish focal point setting');
        TAB.AddTask(TAB.MakeTask(function () {
            var circlePos = _this._focalCircle.getBoundingClientRect();
            var targetX = circlePos.left + circlePos.width / 2;
            var targetY = circlePos.top + circlePos.height / 2;
            TAB.FireMouseEvent(_this._focalFrame, TAB.mouseEvent.mouseUp, new TAB.MouseEventData(targetX, targetY));
        }), this.WaitForElementsByDataAutomationId('focalFrameIsSetting', 0));
    };
    TitleRegion.prototype.AddTaskInputTopicHeader = function (inputTopicHeaderText) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var propertyPane = TAB.GetElements(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer')[0];
            var topicHeaderFieldGroup = TAB.GetElements(propertyPane, TAB.searchBy.partialClassName, 'ms-TextField-fieldGroup')[0];
            var inputHeading = TAB.GetElement(topicHeaderFieldGroup, TAB.searchBy.tag, 'input');
            inputHeading.focus();
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(inputHeading, inputTopicHeaderText);
            _this._turnOnToggle(TAB.GetElements(propertyPane, TAB.searchBy.partialClassName, 'ms-Toggle-innerContainer')[0]);
        }), TAB.MakeWaiter(function () {
            return _this._topicHeaderText === inputTopicHeaderText.toUpperCase();
        }));
    };
    TitleRegion.prototype.AddTaskPublishDate = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var propertyPane = TAB.GetElements(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer')[0];
            _this._turnOnToggle(TAB.GetElements(propertyPane, TAB.searchBy.partialClassName, 'ms-Toggle-innerContainer')[1]);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(_this._root, TAB.searchBy.partialClassName, 'publishDate');
        }));
    };
    TitleRegion.prototype.AddTaskCenterAlignment = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var centerAlignmentInput = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, 'PropertyPaneChoiceGroup-Center')[0];
            centerAlignmentInput.click();
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(_this._root, TAB.searchBy.partialClassName, 'center');
        }));
    };
    TitleRegion.prototype.AddTaskOpenPropertyPane = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            if (_Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'PropertyPaneChoiceGroup-NoImage')) {
                // The property pane has open, do nothing.
                return;
            }
            var togglePropertyPaneButton = _this._getTitleToolbarElementById('titleToolbarTogglePropertyPaneButton');
            if (togglePropertyPaneButton) {
                TAB.ClickElement(togglePropertyPaneButton);
            }
            else {
                TAB.Log.Fail('Failure at toggling property pane for Title Region');
            }
        }), _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'PropertyPaneChoiceGroup-NoImage'));
    };
    TitleRegion.prototype.WaitForLayoutIsSelected = function (layout) {
        return TAB.MakeWaiter(function () {
            var layoutGroupRadio = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, "PropertyPaneChoiceGroup-" + layout)[0];
            return layoutGroupRadio.checked;
        });
    };
    TitleRegion.prototype._getTitleToolbarElementById = function (dataAutomationId) {
        try {
            return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(this._root, dataAutomationId);
        }
        catch (e) {
            return undefined;
        }
    };
    Object.defineProperty(TitleRegion.prototype, "_focalFrame", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(this._root, 'focalFrameIsDragging') ||
                _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(this._root, 'focalFrameIsSetting') ||
                _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(this._root, 'titleRegionFocalFrame');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleRegion.prototype, "_focalCircle", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(this._root, 'titleRegionFocalCircle');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleRegion.prototype, "_toolbarEditButton", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(this._root, 'titleToolbarEditButton');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleRegion.prototype, "_toolbarFocalPointButton", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(this._root, 'titleToolbarFocalPointButton');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleRegion.prototype, "_backgroundImage", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(this._root, 'titleRegionBackgroundImage');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleRegion.prototype, "_filePicker", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win, 'sp-filepicker');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleRegion.prototype, "_topicHeaderText", {
        get: function () {
            var topicHeaderContainers = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'topicHeader');
            if (!topicHeaderContainers || topicHeaderContainers.length <= 0) {
                return '';
            }
            var topicHeader = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(topicHeaderContainers[0], 'topicHeaderText');
            return topicHeader.innerText;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TitleRegion.prototype, "_authorInput", {
        get: function () {
            var authorByline = TAB.GetElement(this._root, TAB.searchBy.partialClassName, 'authorByline');
            var authorInput = TAB.GetElement(authorByline, TAB.searchBy.partialClassName, 'pickerInput');
            return authorInput;
        },
        enumerable: true,
        configurable: true
    });
    TitleRegion.prototype._turnOnToggle = function (toggleContainer) {
        var toggle = TAB.GetElements(toggleContainer, TAB.searchBy.tag, 'button')[0];
        if (toggle.attributes['aria-checked'].value === 'false') {
            toggle.click();
        }
    };
    return TitleRegion;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "fWKq":
/*!*****************************************************!*\
  !*** ./lib/SPTaskLib/Controls/QuickChartWebPart.js ***!
  \*****************************************************/
/*! exports provided: QuickChartWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickChartWebPart", function() { return QuickChartWebPart; });
/* harmony import */ var _BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseCollectionWebPart */ "kQju");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


/**
 * @public
 */
var QuickChartWebPart = /** @class */ (function (_super) {
    __extends(QuickChartWebPart, _super);
    function QuickChartWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].QuickChart, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].QuickChart.toString()) || this;
    }
    return QuickChartWebPart;
}(_BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__["BaseCollectionWebPart"]));



/***/ }),

/***/ "fWaU":
/*!***********************************************!*\
  !*** ./lib/SPTaskLib/Controls/HeroWebPart.js ***!
  \***********************************************/
/*! exports provided: HeroWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeroWebPart", function() { return HeroWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Pages/PropertyPane */ "M/CL");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var ChoiceGroup;
(function (ChoiceGroup) {
    ChoiceGroup[ChoiceGroup["Tiles"] = 0] = "Tiles";
    ChoiceGroup[ChoiceGroup["Layers"] = 1] = "Layers";
    ChoiceGroup[ChoiceGroup["OnePiece"] = 2] = "OnePiece";
    ChoiceGroup[ChoiceGroup["TwoPieces"] = 3] = "TwoPieces";
    ChoiceGroup[ChoiceGroup["ThreePieces"] = 4] = "ThreePieces";
    ChoiceGroup[ChoiceGroup["FourPieces"] = 5] = "FourPieces";
    ChoiceGroup[ChoiceGroup["FivePieces"] = 6] = "FivePieces";
})(ChoiceGroup || (ChoiceGroup = {}));
/**
 * @public
 */
var HeroWebPart = /** @class */ (function (_super) {
    __extends(HeroWebPart, _super);
    function HeroWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Hero, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Hero.toString()) || this;
    }
    HeroWebPart.prototype.addWebPartToPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        }), this.waitForTilesLayout());
    };
    HeroWebPart.prototype.deleteWebPartToPage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskDeleteZone(0);
        }));
    };
    HeroWebPart.prototype.waitForLayersLayout = function () {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                var elements = TAB.GetElements(_this._root, TAB.searchBy.customQuery, "[data-automation-id='Layers']");
                return elements.length > 0;
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    HeroWebPart.prototype.waitForTilesLayout = function () {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                var elements = TAB.GetElements(_this._root, TAB.searchBy.customQuery, "[data-automation-id='Tiles']");
                return elements.length > 0;
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    HeroWebPart.prototype.waitForOnePiecePlaceholderLayout = function () {
        this._displayLayout(ChoiceGroup.OnePiece, this._getPlaceholdWaiter(1));
    };
    HeroWebPart.prototype.waitForTwoPiecesPlaceholderLayout = function () {
        this._displayLayout(ChoiceGroup.TwoPieces, this._getPlaceholdWaiter(2));
    };
    HeroWebPart.prototype.waitForThreePiecesPlaceholderLayout = function () {
        this._displayLayout(ChoiceGroup.ThreePieces, this._getPlaceholdWaiter(3));
    };
    HeroWebPart.prototype.waitForFourPiecesPlaceholderLayout = function () {
        this._displayLayout(ChoiceGroup.FourPieces, this._getPlaceholdWaiter(4));
    };
    HeroWebPart.prototype.waitForFivePiecesPlaceholderLayout = function () {
        this._displayLayout(ChoiceGroup.FivePieces, this._getPlaceholdWaiter(5));
    };
    HeroWebPart.prototype.SwitchToTilesLayout = function () {
        this._displayLayout(ChoiceGroup.Tiles, this.waitForTilesLayout());
    };
    HeroWebPart.prototype.SwitchToLayersLayout = function () {
        this._displayLayout(ChoiceGroup.Layers, this.waitForLayersLayout());
    };
    HeroWebPart.prototype.switchToTilesLayout = function () {
        return this._selectLayoutOption(ChoiceGroup.Tiles);
    };
    HeroWebPart.prototype.switchToLayersLayout = function () {
        return this._selectLayoutOption(ChoiceGroup.Layers);
    };
    HeroWebPart.prototype.AddTaskAddHeroItemFromUploading = function (fileInput) {
        this._addTaskOpenFilePickerForAddItem(0);
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskCreateFilePicker();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Add compact item from uploading');
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].FilePicker.AddTaskUploadItem(fileInput);
        }), this._waitForNewAddedItemToExist());
    };
    HeroWebPart.prototype.AddTaskUpdatePathFromUploading = function (url) {
        _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_3__["PropertyPane"].AddTaskClickChangeButton();
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskCreateFilePicker();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Add compact item from uploading');
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].FilePicker.AddTaskAddFromUrl(url);
        }), this._waitForPathUpdated(url));
    };
    HeroWebPart.prototype.AddTaskAddHeroItemFromUrl = function (url) {
        this._addTaskOpenFilePickerForAddItem(0);
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskCreateFilePicker();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Add hero item for ' + url);
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].FilePicker.AddTaskAddFromUrl(url);
        }), this._waitForNewAddedItemToExist());
    };
    HeroWebPart.prototype.AddTaskOpenItemEditPropertyPane = function (index, url) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click edit button');
            var inputs = TAB.GetElements(_this._root, TAB.searchBy.customQuery, "[data-automation-id='edit-button']");
            TAB.ClickElement(inputs[index]);
        }), this._waitForPropertyPaneAndLinkExist(url));
    };
    HeroWebPart.prototype.AddTaskAddTitleInPropertyPane = function (value) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var titleTextField = TAB.GetElements(_this._propertyPane, TAB.searchBy.partialClassName, 'ms-TextField-field')[1];
            var focusEv = TAB.Win.document.createEvent('HTMLEvents');
            focusEv.initEvent('focus', true /*bubble*/, false /*cancelable*/);
            titleTextField.dispatchEvent(focusEv);
            titleTextField.value = value;
            var ev = TAB.Win.document.createEvent('HTMLEvents');
            ev.initEvent('input', true /*bubble*/, false /*cancelable*/);
            titleTextField.dispatchEvent(ev);
        }), TAB.MakeWaiter(function () {
            var titleTextField = TAB.GetElements(_this._propertyPane, TAB.searchBy.partialClassName, 'ms-TextField-field')[1];
            var showTitleToggle = TAB.GetElements(_this._propertyPane, TAB.searchBy.partialClassName, 'ms-Toggle-background')[0];
            return (titleTextField.value === value && showTitleToggle.attributes['aria-checked'].value === 'true');
        }));
    };
    HeroWebPart.prototype.AddTaskValidateItemProperties = function (index, title, shouldHaveCallToAction) {
        if (!shouldHaveCallToAction) {
            TAB.AddTask(undefined, this._waitForItemTitleExist(index, title));
            TAB.Log.AddTaskComment('Toggle showtile the property pane');
            this.AddTaskCheckTitleToggle(0);
        }
        else {
            TAB.AddTask(undefined, TAB.AndWaiters(this._waitForItemTitleExist(index, title), this._waitForItemCallToActionExist(index)));
            TAB.Log.AddTaskComment('Toggle showtile the property pane');
            this.AddTaskCheckTitleToggle(0);
            TAB.Log.AddTaskComment('Toggle calltoaction the property pane');
            this.AddTaskCheckCallToActionToggle(0);
        }
    };
    HeroWebPart.prototype.AddTaskCheckTitleToggle = function (index) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var inputs = TAB.GetElements(_this._propertyPane, TAB.searchBy.partialClassName, 'ms-Toggle-background');
            TAB.ClickElement(inputs[0]);
        }), this._waitForItemTitleDisappear(index));
    };
    HeroWebPart.prototype.AddTaskCheckCallToActionToggle = function (index) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            // this is options
            var option = TAB.GetElements(_this._propertyPane, TAB.searchBy.customQuery, '[data-automation-state="collapsed"]')[1];
            if (option !== undefined) {
                TAB.ClickElement(option);
            }
            var inputs = TAB.GetElements(_this._propertyPane, TAB.searchBy.partialClassName, 'ms-Toggle-background');
            TAB.ClickElement(inputs[1]);
        }), this._waitForItemCallToActionDisappear(index));
    };
    HeroWebPart.prototype._displayLayout = function (id, waiter) {
        var _this = this;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                var inputs = TAB.GetElements(_this._propertyPane, TAB.searchBy.customQuery, 'input[type="radio"]');
                if (inputs && inputs.length > 0) {
                    return true;
                }
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(this._selectLayoutOption(id), waiter);
    };
    HeroWebPart.prototype._addTaskOpenFilePickerForAddItem = function (index) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click select button');
            var elements = _this._getPlaceholdElements();
            TAB.ClickElement(elements[index]);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='sp-filepicker']"));
    };
    HeroWebPart.prototype._getPlaceholdWaiter = function (elementCount) {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                var elements = _this._getPlaceholdElements();
                return Boolean(elements.length === elementCount);
            }
            catch (error) {
                return false;
            }
        });
        return waiter;
    };
    HeroWebPart.prototype._selectLayoutOption = function (optionId) {
        var _this = this;
        return TAB.MakeTask(function () {
            var inputs = TAB.GetElements(_this._propertyPane, TAB.searchBy.customQuery, 'input[type="radio"]');
            inputs[optionId].click();
        });
    };
    HeroWebPart.prototype._waitForNewAddedItemToExist = function () {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            var elements = TAB.GetElements(_this._root, TAB.searchBy.customQuery, "[data-automation-id='HeroImage']");
            return Boolean(elements.length > 0);
        });
        return waiter;
    };
    HeroWebPart.prototype._waitForPathUpdated = function (url) {
        var rootSiteUrl = TAB.Settings.Get('ProductServerSet').split(';')[0];
        url = url.substr(rootSiteUrl.length);
        return this._waitForLinkExist(url);
    };
    HeroWebPart.prototype._waitForPropertyPaneAndLinkExist = function (url) {
        var _this = this;
        var waiter1 = TAB.MakeWaiter(function () {
            try {
                return Boolean(_this._propertyPane);
            }
            catch (e) {
                return false;
            }
        });
        return TAB.AndWaiters(waiter1, this._waitForLinkExist(url));
    };
    HeroWebPart.prototype._waitForLinkExist = function (url) {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                var element = TAB.GetElement(_this._propertyPane, TAB.searchBy.partialClassName, 'ms-Link');
                return (element.getAttribute('href').search(url) !== -1 && element.getAttribute('target') === '_blank');
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    HeroWebPart.prototype._getPlaceholdElements = function () {
        var placeholdElements = TAB.GetElements(this._root, TAB.searchBy.customQuery, "[data-automation-id='placeholder-add']");
        if (placeholdElements) {
            return placeholdElements;
        }
        else {
            return undefined;
        }
    };
    HeroWebPart.prototype._getHeroElement = function (index) {
        var heroElements = TAB.GetElements(this.firstHeroTileRoot, TAB.searchBy.customQuery, "[data-automation-id='HeroPatternElement']");
        if (heroElements) {
            return heroElements[index];
        }
        else {
            return undefined;
        }
    };
    HeroWebPart.prototype._getHeroTitleElement = function (heroElement) {
        try {
            var element = TAB.GetElement(heroElement, TAB.searchBy.customQuery, "[data-automation-id='HeroTitle']");
            if (element) {
                return element;
            }
            else {
                return undefined;
            }
        }
        catch (e) {
            return undefined;
        }
    };
    HeroWebPart.prototype._getHeroCallToActionElement = function (heroElement) {
        try {
            var element = TAB.GetElement(heroElement, TAB.searchBy.customQuery, "[data-automation-id='HeroCallToAction']");
            if (element) {
                return element;
            }
            else {
                return undefined;
            }
        }
        catch (e) {
            return undefined;
        }
    };
    HeroWebPart.prototype._waitForItemTitleExist = function (index, title) {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                var heroElement = _this._getHeroElement(index);
                if (heroElement) {
                    var element = _this._getHeroTitleElement(heroElement);
                    if (element) {
                        return (element.innerText === title);
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    HeroWebPart.prototype._waitForItemTitleDisappear = function (index) {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                var heroElement = _this._getHeroElement(index);
                if (heroElement) {
                    var element = _this._getHeroTitleElement(heroElement);
                    return (element === undefined);
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    HeroWebPart.prototype._waitForItemCallToActionExist = function (index) {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                var heroElement = _this._getHeroElement(index);
                if (heroElement) {
                    return !!_this._getHeroCallToActionElement(heroElement);
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    HeroWebPart.prototype._waitForItemCallToActionDisappear = function (index) {
        var _this = this;
        var waiter = TAB.MakeWaiter(function () {
            try {
                var heroElement = _this._getHeroElement(index);
                if (heroElement) {
                    var element = _this._getHeroCallToActionElement(heroElement);
                    return (element === undefined);
                }
                else {
                    return false;
                }
            }
            catch (e) {
                return false;
            }
        });
        return waiter;
    };
    Object.defineProperty(HeroWebPart.prototype, "_propertyPane", {
        get: function () {
            return TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'showPane');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeroWebPart.prototype, "firstHeroTileRoot", {
        get: function () {
            var elements = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='Tiles']");
            if (elements) {
                return elements[0];
            }
            else {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    return HeroWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "hfq8":
/*!*****************************************!*\
  !*** ./lib/SPTaskLib/Controls/Field.js ***!
  \*****************************************/
/*! exports provided: FieldType, Field */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FieldType", function() { return FieldType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return Field; });
/**
 * @public
 */
var FieldType;
(function (FieldType) {
    FieldType[FieldType["Text"] = 0] = "Text";
    FieldType[FieldType["Number"] = 1] = "Number";
    FieldType[FieldType["DateTime"] = 2] = "DateTime";
    FieldType[FieldType["Choice"] = 3] = "Choice";
    FieldType[FieldType["User"] = 4] = "User";
    FieldType[FieldType["File"] = 5] = "File";
})(FieldType || (FieldType = {}));
/**
 * @public
 */
var Field = /** @class */ (function () {
    function Field(fieldName, fieldDescription, fieldType, isRequired, isHidden, dateTimeFormat, dateTimeDisplayFormat) {
        if (fieldType === void 0) { fieldType = FieldType.Text; }
        if (isRequired === void 0) { isRequired = false; }
        if (isHidden === void 0) { isHidden = false; }
        this._name = fieldName;
        this._description = fieldDescription;
        this._type = fieldType;
        this._isRequired = isRequired;
        this._isHidden = isHidden;
        this._dateTimeFormat = dateTimeFormat;
        this._dateTimeDisplayFormat = dateTimeDisplayFormat;
    }
    Object.defineProperty(Field.prototype, "Name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "Description", {
        get: function () {
            return this._description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Field.prototype, "Type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Field.prototype.ConstructXml = function () {
        var typeName = FieldType[this._type];
        var schemaXml = '<Field Type="' + typeName +
            '" Name="' + this._name +
            '" DisplayName="' + this._name +
            '" Required="' + String(this._isRequired).toUpperCase() +
            '" Hidden="' + String(this._isHidden).toUpperCase() +
            '" Description="' + this._description + '"';
        // Additional parameters for different types
        if (this._type === FieldType.DateTime) {
            if (Boolean(this._dateTimeFormat)) {
                schemaXml = schemaXml + ' Format="' + this._dateTimeFormat + '"';
            }
            if (Boolean(this._dateTimeDisplayFormat)) {
                schemaXml = schemaXml + ' FriendlyDisplayFormat="' + this._dateTimeDisplayFormat + '"';
            }
        }
        // Closing Field tag.
        schemaXml = schemaXml + '/>';
        return schemaXml;
    };
    return Field;
}());



/***/ }),

/***/ "i6xm":
/*!***************************************!*\
  !*** ./lib/SPTaskLib/SPFlightUtil.js ***!
  \***************************************/
/*! exports provided: SPFlightUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPFlightUtil", function() { return SPFlightUtil; });
/**
 * @public
 */
var SPFlightUtil = /** @class */ (function () {
    function SPFlightUtil() {
    }
    /**
     * This function will determine if a flight is enabled in the global list.
     * @param expFeatureId - The ExpFeature Id of the flight
     */
    SPFlightUtil.isEnabled = function (expFeatureId) {
        return TAB.Win.window[this.spModuleLoader]
            ._bundledComponents[this.spCoreLibraryComponentId]
            ._SPFlight.isEnabled(expFeatureId);
    };
    SPFlightUtil.spModuleLoader = 'spModuleLoader';
    SPFlightUtil.spCoreLibraryComponentId = '7263c7d0-1d6a-45ec-8d85-d4d1d234171b';
    return SPFlightUtil;
}());



/***/ }),

/***/ "iDSo":
/*!*****************************************!*\
  !*** ./lib/SPTaskLib/Controls/index.js ***!
  \*****************************************/
/*! exports provided: BaseCollectionWebPart, WebpartType, KeyCodes, FireKeyboardEvent, BaseWebpart, BingMapWebpart, BingNewsWebPart, Carousel, CommandBar, CommandBarItem, ConnectorWebPart, ContextMenu, CreateSitePanelForm, CreateSiteTemplateOption, GroupPrivacyOption, DesignPackageOption, CreateSitePanel, DocumentEmbedWebpart, DynamicDataConsumerWebPart, EmbedWebPart, EmbeddedVideoWebPart, EventPage, EventsWebPart, FieldType, Field, FieldsWebPart, FILE_PICKER_AUTOMATION_ID, FilePickerView, FilePicker, FormsWebPart, GroupCalendarWebPart, GroupMembershipPanel, HeroWebPart, ContentRollupLayout, HighlightedContentWebPart, Layout, ImageSourceType, ImageGalleryWebPart, ImageWebpart, LayoutOption, LinkPreviewWebpart, ListViewWebparWithItemsView, ListViewWebpart, NewsDigest, NewsFilter, NewsLink, NewsPinning, NewsWebPart, PeopleCardLayout, PeopleWebpart, PlannerWebpart, QuickChartWebPart, QuickLinksLayoutId, QuickLinksWebPart, RSSConnectorWebPart, RTELinkDialogOperation, RTEWebPart, SendByEmailDialog, SiteActivityWebPart, SiteInformationPanel, SitePermissionPanel, SitesWebPart, TeamsTabPicker, TitleRegion, TwitterWebPart, upload, dataURItoFile, setFileInput, WeatherWebPart, WorldClockWebPart, YammerConversations, YammerHighlights, YouTubeEmbed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseCollectionWebPart */ "kQju");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseCollectionWebPart", function() { return _BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__["BaseCollectionWebPart"]; });

/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebpartType", function() { return _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeyCodes", function() { return _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["KeyCodes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FireKeyboardEvent", function() { return _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["FireKeyboardEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseWebpart", function() { return _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["BaseWebpart"]; });

/* harmony import */ var _BingMapWebpart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BingMapWebpart */ "mutv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BingMapWebpart", function() { return _BingMapWebpart__WEBPACK_IMPORTED_MODULE_2__["BingMapWebpart"]; });

/* harmony import */ var _BingNewsWebPart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./BingNewsWebPart */ "Ilgg");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BingNewsWebPart", function() { return _BingNewsWebPart__WEBPACK_IMPORTED_MODULE_3__["BingNewsWebPart"]; });

/* harmony import */ var _Carousel__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Carousel */ "iRE7");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Carousel", function() { return _Carousel__WEBPACK_IMPORTED_MODULE_4__["Carousel"]; });

/* harmony import */ var _CommandBar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CommandBar */ "CPNt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CommandBar", function() { return _CommandBar__WEBPACK_IMPORTED_MODULE_5__["CommandBar"]; });

/* harmony import */ var _CommandBarItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CommandBarItem */ "SMhQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CommandBarItem", function() { return _CommandBarItem__WEBPACK_IMPORTED_MODULE_6__["CommandBarItem"]; });

/* harmony import */ var _ConnectorWebPart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ConnectorWebPart */ "sQpn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConnectorWebPart", function() { return _ConnectorWebPart__WEBPACK_IMPORTED_MODULE_7__["ConnectorWebPart"]; });

/* harmony import */ var _ContextMenu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ContextMenu */ "yis5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContextMenu", function() { return _ContextMenu__WEBPACK_IMPORTED_MODULE_8__["ContextMenu"]; });

/* harmony import */ var _CreateSitePanel__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CreateSitePanel */ "JmdK");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateSitePanelForm", function() { return _CreateSitePanel__WEBPACK_IMPORTED_MODULE_9__["CreateSitePanelForm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateSiteTemplateOption", function() { return _CreateSitePanel__WEBPACK_IMPORTED_MODULE_9__["CreateSiteTemplateOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupPrivacyOption", function() { return _CreateSitePanel__WEBPACK_IMPORTED_MODULE_9__["GroupPrivacyOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DesignPackageOption", function() { return _CreateSitePanel__WEBPACK_IMPORTED_MODULE_9__["DesignPackageOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateSitePanel", function() { return _CreateSitePanel__WEBPACK_IMPORTED_MODULE_9__["CreateSitePanel"]; });

/* harmony import */ var _DocumentEmbedWebpart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DocumentEmbedWebpart */ "Lp+w");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocumentEmbedWebpart", function() { return _DocumentEmbedWebpart__WEBPACK_IMPORTED_MODULE_10__["DocumentEmbedWebpart"]; });

/* harmony import */ var _DynamicDataConsumerWebPart__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./DynamicDataConsumerWebPart */ "EfLR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DynamicDataConsumerWebPart", function() { return _DynamicDataConsumerWebPart__WEBPACK_IMPORTED_MODULE_11__["DynamicDataConsumerWebPart"]; });

/* harmony import */ var _EmbedWebPart__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./EmbedWebPart */ "XK4g");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmbedWebPart", function() { return _EmbedWebPart__WEBPACK_IMPORTED_MODULE_12__["EmbedWebPart"]; });

/* harmony import */ var _EmbeddedVideoWebPart__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./EmbeddedVideoWebPart */ "PGxG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmbeddedVideoWebPart", function() { return _EmbeddedVideoWebPart__WEBPACK_IMPORTED_MODULE_13__["EmbeddedVideoWebPart"]; });

/* harmony import */ var _EventPage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./EventPage */ "lIY2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventPage", function() { return _EventPage__WEBPACK_IMPORTED_MODULE_14__["EventPage"]; });

/* harmony import */ var _EventsWebPart__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./EventsWebPart */ "KBAH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventsWebPart", function() { return _EventsWebPart__WEBPACK_IMPORTED_MODULE_15__["EventsWebPart"]; });

/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Field */ "hfq8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldType", function() { return _Field__WEBPACK_IMPORTED_MODULE_16__["FieldType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return _Field__WEBPACK_IMPORTED_MODULE_16__["Field"]; });

/* harmony import */ var _FieldsWebPart__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./FieldsWebPart */ "1AE4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldsWebPart", function() { return _FieldsWebPart__WEBPACK_IMPORTED_MODULE_17__["FieldsWebPart"]; });

/* harmony import */ var _FilePicker__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./FilePicker */ "8uLm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FILE_PICKER_AUTOMATION_ID", function() { return _FilePicker__WEBPACK_IMPORTED_MODULE_18__["FILE_PICKER_AUTOMATION_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilePickerView", function() { return _FilePicker__WEBPACK_IMPORTED_MODULE_18__["FilePickerView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilePicker", function() { return _FilePicker__WEBPACK_IMPORTED_MODULE_18__["FilePicker"]; });

/* harmony import */ var _FormsWebPart__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./FormsWebPart */ "S6R0");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormsWebPart", function() { return _FormsWebPart__WEBPACK_IMPORTED_MODULE_19__["FormsWebPart"]; });

/* harmony import */ var _GroupCalendarWebPart__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./GroupCalendarWebPart */ "MKab");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupCalendarWebPart", function() { return _GroupCalendarWebPart__WEBPACK_IMPORTED_MODULE_20__["GroupCalendarWebPart"]; });

/* harmony import */ var _GroupMembershipPanel__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./GroupMembershipPanel */ "0FqO");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupMembershipPanel", function() { return _GroupMembershipPanel__WEBPACK_IMPORTED_MODULE_21__["GroupMembershipPanel"]; });

/* harmony import */ var _HeroWebPart__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./HeroWebPart */ "fWaU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeroWebPart", function() { return _HeroWebPart__WEBPACK_IMPORTED_MODULE_22__["HeroWebPart"]; });

/* harmony import */ var _HighlightedContentWebPart__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./HighlightedContentWebPart */ "+01b");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContentRollupLayout", function() { return _HighlightedContentWebPart__WEBPACK_IMPORTED_MODULE_23__["ContentRollupLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighlightedContentWebPart", function() { return _HighlightedContentWebPart__WEBPACK_IMPORTED_MODULE_23__["HighlightedContentWebPart"]; });

/* harmony import */ var _ImageGalleryWebPart__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./ImageGalleryWebPart */ "pMbQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return _ImageGalleryWebPart__WEBPACK_IMPORTED_MODULE_24__["Layout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageSourceType", function() { return _ImageGalleryWebPart__WEBPACK_IMPORTED_MODULE_24__["ImageSourceType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageGalleryWebPart", function() { return _ImageGalleryWebPart__WEBPACK_IMPORTED_MODULE_24__["ImageGalleryWebPart"]; });

/* harmony import */ var _ImageWebpart__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./ImageWebpart */ "7fnt");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageWebpart", function() { return _ImageWebpart__WEBPACK_IMPORTED_MODULE_25__["ImageWebpart"]; });

/* harmony import */ var _LayoutOption__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./LayoutOption */ "UcNL");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutOption", function() { return _LayoutOption__WEBPACK_IMPORTED_MODULE_26__["LayoutOption"]; });

/* harmony import */ var _LinkPreviewWebpart__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./LinkPreviewWebpart */ "WS4A");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinkPreviewWebpart", function() { return _LinkPreviewWebpart__WEBPACK_IMPORTED_MODULE_27__["LinkPreviewWebpart"]; });

/* harmony import */ var _ListViewWebparWithItemsView__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./ListViewWebparWithItemsView */ "R7tR");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListViewWebparWithItemsView", function() { return _ListViewWebparWithItemsView__WEBPACK_IMPORTED_MODULE_28__["ListViewWebparWithItemsView"]; });

/* harmony import */ var _ListViewWebpart__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./ListViewWebpart */ "Aitv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListViewWebpart", function() { return _ListViewWebpart__WEBPACK_IMPORTED_MODULE_29__["ListViewWebpart"]; });

/* harmony import */ var _NewsDigest__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./NewsDigest */ "2ZRy");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsDigest", function() { return _NewsDigest__WEBPACK_IMPORTED_MODULE_30__["NewsDigest"]; });

/* harmony import */ var _NewsFilter__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./NewsFilter */ "BW9v");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsFilter", function() { return _NewsFilter__WEBPACK_IMPORTED_MODULE_31__["NewsFilter"]; });

/* harmony import */ var _NewsLink__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./NewsLink */ "N935");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsLink", function() { return _NewsLink__WEBPACK_IMPORTED_MODULE_32__["NewsLink"]; });

/* harmony import */ var _NewsPinning__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./NewsPinning */ "zI0m");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsPinning", function() { return _NewsPinning__WEBPACK_IMPORTED_MODULE_33__["NewsPinning"]; });

/* harmony import */ var _NewsWebPart__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./NewsWebPart */ "TwX4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsWebPart", function() { return _NewsWebPart__WEBPACK_IMPORTED_MODULE_34__["NewsWebPart"]; });

/* harmony import */ var _PeopleWebpart__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./PeopleWebpart */ "ymC6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PeopleCardLayout", function() { return _PeopleWebpart__WEBPACK_IMPORTED_MODULE_35__["PeopleCardLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PeopleWebpart", function() { return _PeopleWebpart__WEBPACK_IMPORTED_MODULE_35__["PeopleWebpart"]; });

/* harmony import */ var _PlannerWebpart__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./PlannerWebpart */ "m/ZX");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlannerWebpart", function() { return _PlannerWebpart__WEBPACK_IMPORTED_MODULE_36__["PlannerWebpart"]; });

/* harmony import */ var _QuickChartWebPart__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./QuickChartWebPart */ "fWKq");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuickChartWebPart", function() { return _QuickChartWebPart__WEBPACK_IMPORTED_MODULE_37__["QuickChartWebPart"]; });

/* harmony import */ var _QuickLinksWebPart__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./QuickLinksWebPart */ "qC36");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuickLinksLayoutId", function() { return _QuickLinksWebPart__WEBPACK_IMPORTED_MODULE_38__["QuickLinksLayoutId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuickLinksWebPart", function() { return _QuickLinksWebPart__WEBPACK_IMPORTED_MODULE_38__["QuickLinksWebPart"]; });

/* harmony import */ var _RSSConnectorWebPart__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./RSSConnectorWebPart */ "Is2z");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RSSConnectorWebPart", function() { return _RSSConnectorWebPart__WEBPACK_IMPORTED_MODULE_39__["RSSConnectorWebPart"]; });

/* harmony import */ var _RTEWebPart__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./RTEWebPart */ "mXly");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RTELinkDialogOperation", function() { return _RTEWebPart__WEBPACK_IMPORTED_MODULE_40__["RTELinkDialogOperation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RTEWebPart", function() { return _RTEWebPart__WEBPACK_IMPORTED_MODULE_40__["RTEWebPart"]; });

/* harmony import */ var _SendByEmailDialog__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./SendByEmailDialog */ "milH");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SendByEmailDialog", function() { return _SendByEmailDialog__WEBPACK_IMPORTED_MODULE_41__["SendByEmailDialog"]; });

/* harmony import */ var _SiteActivityWebPart__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./SiteActivityWebPart */ "HZDx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SiteActivityWebPart", function() { return _SiteActivityWebPart__WEBPACK_IMPORTED_MODULE_42__["SiteActivityWebPart"]; });

/* harmony import */ var _SiteInformationPanel__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./SiteInformationPanel */ "XvS+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SiteInformationPanel", function() { return _SiteInformationPanel__WEBPACK_IMPORTED_MODULE_43__["SiteInformationPanel"]; });

/* harmony import */ var _SitePermissionPanel__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./SitePermissionPanel */ "DM7Z");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SitePermissionPanel", function() { return _SitePermissionPanel__WEBPACK_IMPORTED_MODULE_44__["SitePermissionPanel"]; });

/* harmony import */ var _SitesWebPart__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./SitesWebPart */ "Vi7M");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SitesWebPart", function() { return _SitesWebPart__WEBPACK_IMPORTED_MODULE_45__["SitesWebPart"]; });

/* harmony import */ var _TeamsTabPicker__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./TeamsTabPicker */ "pWCE");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeamsTabPicker", function() { return _TeamsTabPicker__WEBPACK_IMPORTED_MODULE_46__["TeamsTabPicker"]; });

/* harmony import */ var _TitleRegion__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./TitleRegion */ "e5Kj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TitleRegion", function() { return _TitleRegion__WEBPACK_IMPORTED_MODULE_47__["TitleRegion"]; });

/* harmony import */ var _TwitterWebPart__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./TwitterWebPart */ "HRpY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TwitterWebPart", function() { return _TwitterWebPart__WEBPACK_IMPORTED_MODULE_48__["TwitterWebPart"]; });

/* harmony import */ var _Upload__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./Upload */ "dAVj");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "upload", function() { return _Upload__WEBPACK_IMPORTED_MODULE_49__["upload"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dataURItoFile", function() { return _Upload__WEBPACK_IMPORTED_MODULE_49__["dataURItoFile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setFileInput", function() { return _Upload__WEBPACK_IMPORTED_MODULE_49__["setFileInput"]; });

/* harmony import */ var _WeatherWebPart__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./WeatherWebPart */ "ueW2");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WeatherWebPart", function() { return _WeatherWebPart__WEBPACK_IMPORTED_MODULE_50__["WeatherWebPart"]; });

/* harmony import */ var _WorldClockWebPart__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./WorldClockWebPart */ "qmer");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WorldClockWebPart", function() { return _WorldClockWebPart__WEBPACK_IMPORTED_MODULE_51__["WorldClockWebPart"]; });

/* harmony import */ var _YammerConversations__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./YammerConversations */ "m98m");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "YammerConversations", function() { return _YammerConversations__WEBPACK_IMPORTED_MODULE_52__["YammerConversations"]; });

/* harmony import */ var _YammerHighlights__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./YammerHighlights */ "umcD");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "YammerHighlights", function() { return _YammerHighlights__WEBPACK_IMPORTED_MODULE_53__["YammerHighlights"]; });

/* harmony import */ var _YouTubeEmbed__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./YouTubeEmbed */ "mgJ4");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "YouTubeEmbed", function() { return _YouTubeEmbed__WEBPACK_IMPORTED_MODULE_54__["YouTubeEmbed"]; });


























































/***/ }),

/***/ "iRE7":
/*!********************************************!*\
  !*** ./lib/SPTaskLib/Controls/Carousel.js ***!
  \********************************************/
/*! exports provided: Carousel */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Carousel", function() { return Carousel; });
/**
 * @public
 */
var Carousel = /** @class */ (function () {
    function Carousel() {
    }
    Carousel.carouselValidation = function (region, carouselDataAutomationId) {
        var _this = this;
        var carouselOuterContainer;
        TAB.Log.AddTaskComment('Checking if Carousel outer container exists');
        TAB.AddTask(TAB.MakeTask(function () {
            carouselOuterContainer = TAB.GetElement(region, TAB.searchBy.customQuery, "[data-automation-id='" + carouselDataAutomationId + "']");
        }));
        var carouselItemsContainer;
        TAB.Log.AddTaskComment('Checking if Carousel items container exists');
        TAB.AddTask(TAB.MakeTask(function () {
            carouselItemsContainer = TAB.GetElement(carouselOuterContainer, TAB.searchBy.customQuery, "[data-automation-id='SP-carouselItemsContainer']");
        }));
        var carouselItems;
        TAB.Log.AddTaskComment('Checking how many Carousel items exist');
        TAB.AddTask(TAB.MakeTask(function () {
            carouselItems = TAB.GetElements(carouselItemsContainer, TAB.searchBy.customQuery, "[data-automation-id='SP-carouselItem']");
            if (carouselItems.length !== 1) {
                TAB.Log.AddTaskComment('More than one Carousel item exists');
                _this.checkDotsAndArrows(carouselItems.length, carouselOuterContainer, region, carouselDataAutomationId);
            }
            else {
                TAB.Log.Pass('Only one carousel item exists. Do not check for arrows and dots.');
            }
        }));
        TAB.Log.AddTaskPass('Carousel Test Complete');
    };
    Carousel.checkDotsAndArrows = function (carouselItemsLength, carouselOuterContainer, region, carouselDataAutomationId) {
        TAB.Log.AddTaskComment('Checking if a Carousel dot exists for each carousel item');
        TAB.AddTask(TAB.MakeTask(function () {
            for (var i = 0; i < carouselItemsLength; i++) {
                var carouselDot = void 0;
                carouselDot = TAB.GetElement(region, TAB.searchBy.customQuery, "[data-automation-id='" + carouselDataAutomationId + "-carouselDot-" + i + "']");
                if (!carouselDot) {
                    TAB.Log.Fail("Carousel dot no." + (i + 1) + " not found for corresponding item container");
                }
            }
        }));
        TAB.Log.AddTaskComment('Checking if Carousel arrows are being loaded');
        TAB.AddTask(TAB.MakeTask(function () {
            if (TAB.ElementExists(carouselOuterContainer, TAB.searchBy.customQuery, "[data-automation-id='SP-carouselArrowLeft']") &&
                TAB.GetElement(carouselOuterContainer, TAB.searchBy.customQuery, "[data-automation-id='SP-carouselArrowRight']")) {
                TAB.Log.Pass('All elements of the carousel exist.');
            }
            else {
                TAB.Log.Fail('Left or/and right arrow of carousel does not exist.');
            }
        }));
    };
    return Carousel;
}());



/***/ }),

/***/ "iWcL":
/*!************************************************!*\
  !*** ./lib/SPTaskLib/Pages/CommentsMention.js ***!
  \************************************************/
/*! exports provided: CommentsMention */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CommentsMention", function() { return CommentsMention; });
/* harmony import */ var _Controls_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Controls/BaseWebpart */ "35UN");
/* harmony import */ var _Comments__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Comments */ "tJmU");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Next */ "BJbA");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var CommentsMention = /** @class */ (function (_super) {
    __extends(CommentsMention, _super);
    function CommentsMention() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommentsMention.AddTaskPostCommentsWithMentions = function (text, mentionedUsers) {
        TAB.Win.window.localStorage.setItem('DismissedMentionCoachmark', '1');
        CommentsMention._addTaskChangeCommentText(text);
        mentionedUsers.forEach(function (mention) {
            CommentsMention._addTaskCreateMention(mention);
        });
        TAB.Log.AddTaskComment('Posting the comment by clicking the post button');
        TAB.AddTask(TAB.MakeTask(function () {
            var postButton = CommentsMention._postButtonElement;
            TAB.ClickElement(postButton);
        }), TAB.MakeWaiter(function () {
            return TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="comment-more-button"]').length === 1;
        }));
        TAB.Log.AddTaskPass('Comment posted');
    };
    CommentsMention._getClickableSuggestion = function (i) {
        var suggestion = TAB.GetElement(TAB.Win.document.body, TAB.searchBy.id, CommentsMention.SUGGESTION_ID + i.toString());
        return TAB.GetElement(suggestion, TAB.searchBy.tag, 'button');
    };
    Object.defineProperty(CommentsMention, "_inputElement", {
        get: function () {
            return TAB.GetElement(TAB.Win, TAB.searchBy.id, _Comments__WEBPACK_IMPORTED_MODULE_1__["Comments"].COMMENT_INPUT);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentsMention, "_postButtonElement", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, _Comments__WEBPACK_IMPORTED_MODULE_1__["Comments"].COMMENT_POST);
        },
        enumerable: true,
        configurable: true
    });
    CommentsMention._addTaskChangeCommentText = function (text) {
        TAB.Log.AddTaskComment('Adding Comment with content: ' + text);
        TAB.AddTask(TAB.MakeTask(function () {
            var input = CommentsMention._inputElement;
            TAB.ClickElement(input);
            if (TAB.Win.document.activeElement !== input) {
                input.focus();
            }
            TAB.SetTextContent(input, text);
            TAB.Log.Comment('Fire Keyup to trigger @Mention module deferred loading');
            TAB.FireKeyboardEvent(input, 'keyup', _Controls_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["KeyCodes"].right);
        }), TAB.MakeWaiter(function () {
            return CommentsMention._inputElement.innerText === text;
        }));
        TAB.Log.AddTaskPass('Comment content changed to: ' + text);
    };
    Object.defineProperty(CommentsMention, "_suggestionCount", {
        get: function () {
            return TAB.GetElements(TAB.Win.document.body, TAB.searchBy.partialId, CommentsMention.SUGGESTION_ID).length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommentsMention, "_searchButton", {
        get: function () {
            return TAB.GetElements(TAB.Win.document.body, TAB.searchBy.partialClassName, 'ms-SearchMore-button')[0];
        },
        enumerable: true,
        configurable: true
    });
    CommentsMention._addTaskCreateMention = function (personName) {
        var _this = this;
        TAB.Log.Comment('Adding mention in comment: ' + personName);
        TAB.AddTask(TAB.MakeTask(function () {
            var input = CommentsMention._inputElement;
            input.innerHTML += ' @' + personName;
            var pos = input.lastChild.textContent.length;
            TAB.Win.document.getSelection().collapse(input.lastChild, pos);
            TAB.Log.Comment('Fire Keyup to trigger @Mention fire query to show picker');
            TAB.FireKeyboardEvent(input, 'keyup', _Controls_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["KeyCodes"].right);
        }), TAB.MakeWaiter(function () {
            return _this._suggestionCount > 0 || _this._searchButton;
        }));
        TAB.Log.Comment('Click Search More button to ensure results for: ' + personName);
        TAB.AddTask(TAB.MakeTask(function () {
            if (_this._suggestionCount === 0 && _this._searchButton) {
                TAB.ClickElement(_this._searchButton);
                _this._isSearch = true;
            }
            else {
                _this._isSearch = false;
            }
        }), TAB.MakeWaiter(function () {
            return _this._suggestionCount > 0;
        }));
        TAB.Log.AddTaskComment('Adding mention in comment: ' + personName);
        TAB.AddTask(TAB.MakeTask(function () {
            var input = CommentsMention._inputElement;
            TAB.Log.Comment('Fire Keydown/Keyup to trigger mention anchor transformation');
            if (_this._isSearch) {
                // if SearchMore has been used, need to press up to go back to suggestions
                TAB.FireKeyboardEvent(input, 'keydown', _Controls_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["KeyCodes"].up);
            }
            TAB.Log.Comment('Click on the first available suggestion for ' + personName);
            TAB.ClickElement(_this._getClickableSuggestion(0));
        }), TAB.MakeWaiter(function () {
            return CommentsMention._inputElement.getElementsByTagName('a').length === CommentsMention._totalMention + 1
                && _this._suggestionCount === 0;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            CommentsMention._totalMention += 1;
        }), undefined);
        TAB.Log.AddTaskPass(personName + ' mentioned in comment');
    };
    CommentsMention._totalMention = 0;
    CommentsMention._isSearch = false;
    CommentsMention.SUGGESTION_ID = 'sug-';
    return CommentsMention;
}(_Comments__WEBPACK_IMPORTED_MODULE_1__["Comments"]));



/***/ }),

/***/ "igXS":
/*!*******************************************************!*\
  !*** ./lib/SPTaskLib/Pages/OrganizationSiteDesign.js ***!
  \*******************************************************/
/*! exports provided: OrganizationSiteDesign */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrganizationSiteDesign", function() { return OrganizationSiteDesign; });
/**
 * @public
 */
var OrganizationSiteDesign = /** @class */ (function () {
    function OrganizationSiteDesign() {
    }
    OrganizationSiteDesign.AddTaskVerifyVerticalSection = function () {
        var verticalSectionEl;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying vertical section');
        }), TAB.MakeWaiter(function () {
            verticalSectionEl = TAB.GetElement(TAB.Win, TAB.searchBy.className, 'CanvasVerticalSection');
            return Boolean(verticalSectionEl);
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying My News web part');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(verticalSectionEl, TAB.searchBy.customQuery, "[data-automation-id='featuredNewsLayout']") ||
                TAB.ElementExists(verticalSectionEl, TAB.searchBy.customQuery, "[data-automation-id='FeaturedNews-no-results']");
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying My Frequent Sites web part');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(verticalSectionEl, TAB.searchBy.customQuery, "[data-sp-feature-instance-id='3e6aa4d3-59a4-490b-b8c9-08fd7271e3e9']");
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying My Recent Documents web part');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(verticalSectionEl, TAB.searchBy.customQuery, "[data-sp-feature-instance-id='8815c073-87a5-4fc5-9362-d47eac1cfdd8']");
        }));
    };
    OrganizationSiteDesign.AddTaskVerifyOOBNewsWebPart = function () {
        var carouselNewsEl;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying main news carousel web part');
        }), TAB.MakeWaiter(function () {
            carouselNewsEl = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='CarouselNewsLayout']");
            return carouselNewsEl.length > 0;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying carousel image');
        }), TAB.MakeWaiter(function () {
            var carouselImgEl = TAB.GetElements(carouselNewsEl[0], TAB.searchBy.tag, 'img');
            var imgSrcCheck = false;
            if (carouselImgEl.length > 0) {
                carouselImgEl.forEach(function (img) {
                    imgSrcCheck = imgSrcCheck || img.src.toLowerCase().indexOf('newscarousel') > -1;
                });
            }
            return imgSrcCheck;
        }));
    };
    OrganizationSiteDesign.AddTaskVerifyEventsWebPart = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying Events web part');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-sp-feature-instance-id='f188d583-d8e7-4298-9ab2-a1b482d26bd2']");
        }));
    };
    OrganizationSiteDesign.AddTaskVerifyQuickLinksWebPart = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying Quick Links web part');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-sp-feature-instance-id='06f72ac5-a588-409d-bc05-1f498007cb21']");
        }));
    };
    OrganizationSiteDesign.AddTaskVerifyStreamWebPart = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying Stream web part');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-sp-feature-instance-id='234588ea-f353-448b-ad77-e89d6201c03f']");
        }));
    };
    OrganizationSiteDesign.AddTaskVerifyTwitterWebPart = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying Twitter web part');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-sp-feature-instance-id='d8e106d3-81cd-493a-87f4-a63b5b17f381']");
        }));
    };
    OrganizationSiteDesign.AddTaskVerifyYammerWebPart = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Verifying Yammer web part');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-sp-feature-instance-id='a1783704-4592-4637-96d5-c8eefa3b9900']");
        }));
    };
    return OrganizationSiteDesign;
}());



/***/ }),

/***/ "iw6+":
/*!****************************************!*\
  !*** ./lib/SPTaskLib/ExtensionUtil.js ***!
  \****************************************/
/*! exports provided: ExtensionUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExtensionUtil", function() { return ExtensionUtil; });
/* harmony import */ var _Controls_Field__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controls/Field */ "hfq8");
/* harmony import */ var _ListLibrary__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ListLibrary */ "7on5");


/**
 * @public
 */
var ExtensionUtil = /** @class */ (function () {
    function ExtensionUtil() {
    }
    /**
     * Loads a list, and if it doesn't exist, it creates it.
     * It sets up the list with a few sample data:
     * Field "Percent" (number), with items with values 10, 50 and 80
     * Field "Rating" (number), with items with values 50, 50 and 50
     * Field "Description" (text), with three occurrences of 'default text'
     *
     * @param listName - Name for the list.
     * @returns List object for the newly created list.
     */
    ExtensionUtil.loadList = function (listName) {
        var listFields = [
            new _Controls_Field__WEBPACK_IMPORTED_MODULE_0__["Field"]('Percent', 'A simple number field.', _Controls_Field__WEBPACK_IMPORTED_MODULE_0__["FieldType"].Number, false /*IsRequired*/, false /*IsHidden*/),
            new _Controls_Field__WEBPACK_IMPORTED_MODULE_0__["Field"]('Rating', 'A simple number field.', _Controls_Field__WEBPACK_IMPORTED_MODULE_0__["FieldType"].Number, false /*IsRequired*/, false /*IsHidden*/),
            new _Controls_Field__WEBPACK_IMPORTED_MODULE_0__["Field"]('Description', 'A simple text field.', _Controls_Field__WEBPACK_IMPORTED_MODULE_0__["FieldType"].Text, false /*IsRequired*/, false /*IsHidden*/)
        ];
        var listFieldInternalValues = [
            [10, 50, 'default text'],
            [50, 50, 'default text'],
            [80, 100, 'default text']
        ];
        var loadList = { success: false };
        var list = new _ListLibrary__WEBPACK_IMPORTED_MODULE_1__["List"](listName);
        // Adds a task with the correct waiter to try to load the list.
        // Existence will be reflected on the 'success'
        // property of the 'ISuccessResult' interface.
        list.addCsomTaskLoadList(loadList);
        // If the list does not exist then create it
        TAB.AddTask(TAB.MakeTask(function () {
            if (!loadList.success) {
                TAB.Log.Comment('Creating list \'' + listName + '\'');
                list.addCsomTaskCreateList({
                    numberOfItems: listFieldInternalValues.length,
                    additionalFields: listFields,
                    fieldValues: listFieldInternalValues
                });
            }
        }));
        return list;
    };
    /**
     * Ensures that a div element was appended to the documents html body.
     *
     * @param commandItem - an item on the command bar that is registered by the customActions
     * URL parameter.
     * @param dataAutomationId - the query string that uniquely identifies the div that should
     * be added to the page after clicking the command item.
     */
    ExtensionUtil.testCommandBarItem = function (commandItem, dataAutomationId) {
        // Ensure div is not present before clicking the commandItem
        TAB.Log.AddTaskComment('Validating div has not been added before clicking the Command Item.');
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"" + dataAutomationId + "\"]");
        }));
        // Ensure div is present upon clicking the Command Item
        TAB.Log.AddTaskComment('Validating div is added to HTML after clicking the Command Item.');
        commandItem.AddTaskClick();
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"" + dataAutomationId + "\"]");
        }));
    };
    /**
     * Ensures a dialog is present upon clicking the 'commandItem', verifies the text
     * in the dialog matches 'expectedCommandText', and lastly ensures the dialog from the
     * 'commandItem' can be dismissed.
     * @param commandItem - an item on the command bar that is registered by the customActions
     * URL parameter.
     * @param expectedCommandText - the text that is expected to appear in the dialog
     * when the commandItem is clicked.
     */
    ExtensionUtil.testDialogCommandBarItem = function (commandItem, expectedCommandText) {
        // Ensure dialog is present upon clicking Command Item
        TAB.Log.AddTaskComment('Clicking Command Item and waiting for the dialog to appear.');
        commandItem.AddTaskClick();
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-content');
        }));
        // Ensure dialog's inner content is correct for the Command Item
        TAB.Log.AddTaskComment('Validating contents of the dialog.');
        TAB.AddTask(TAB.MakeTask(function () {
            var dialogContent = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-content');
            if (!(dialogContent.innerText.trim() === expectedCommandText)) {
                TAB.Log.AddTaskFail("Command Item One inner context expected to be '" + expectedCommandText + "'.");
            }
        }));
        // Dismiss Dialog
        TAB.Log.AddTaskComment('Dismissing dialog.');
        TAB.AddTask(TAB.MakeTask(function () {
            var dialogActions = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-action');
            for (var _i = 0, dialogActions_1 = dialogActions; _i < dialogActions_1.length; _i++) {
                var dialogAction = dialogActions_1[_i];
                if (dialogAction.innerText.trim() === 'OK') {
                    var okButton = TAB.GetElement(dialogAction, TAB.searchBy.hasClassName, 'ms-Button');
                    TAB.ClickElement(okButton);
                }
            }
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-header');
        }));
    };
    return ExtensionUtil;
}());



/***/ }),

/***/ "jK1H":
/*!***********************************!*\
  !*** ./lib/SPTaskLib/PageUtil.js ***!
  \***********************************/
/*! exports provided: PageUtil */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageUtil", function() { return PageUtil; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Next */ "BJbA");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Controls/CreateSitePanel */ "JmdK");



/**
 * @public
 */
var PageUtil = /** @class */ (function () {
    function PageUtil() {
    }
    PageUtil.AddTaskCreateClassicPage = function () {
        PageUtil.pageCreateAttempts += 1;
        PageUtil.generatedPageName = "testpage" + PageUtil.pageNumber.toString() + ".aspx";
        var clientContext = new SP.ClientContext(TAB.Settings.Get('ProductServer') + "/sites/testPublishingPage3");
        var web = clientContext.get_web();
        var pageLayoutItem;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Starting Get Page Layout and Add Page");
            PageUtil.isPageCreateTaskFinished = false;
            PageUtil.GetPageLayout(web, clientContext).then(function (value) {
                pageLayoutItem = value;
                PageUtil.addPublishingPage(PageUtil.generatedPageName, clientContext, web, pageLayoutItem).then(function () {
                    PageUtil.createdPage = true;
                    PageUtil.isPageCreateTaskFinished = true;
                }).catch(function (message) {
                    TAB.Log.AddTaskComment("Create Classic Page failed: " + message);
                    // If the page create failed because the page already exists, try a different name and retry.
                    if (message.indexOf("A file with the name Pages/" + PageUtil.generatedPageName + " already exists.") > -1) {
                        // If we have already tried a fixed number of times, fail the test.
                        if (PageUtil.pageCreateAttempts > 30) {
                            TAB.Log.AddTaskFail('Publishing Page could not be created after 30 attempts.' +
                                'It might be because existing pages are not removed properly.');
                            PageUtil.generatedPageName = undefined;
                            PageUtil.isPageCreateTaskFinished = true;
                            return;
                        }
                        PageUtil.pageNumber += 1;
                        TAB.Log.AddTaskComment("Attempting to create page by appending counter: \"" + PageUtil.pageNumber + "\", to the name.");
                        // Set the flag to true in order to allow the next 'recursively' called task to run
                        PageUtil.isPageCreateTaskFinished = true;
                        PageUtil.AddTaskCreateClassicPage();
                    }
                    else {
                        // Classic Page creation failed for unknown reason, end the test.
                        PageUtil.generatedPageName = undefined;
                        PageUtil.isPageCreateTaskFinished = true;
                    }
                });
            }).catch(function (message) {
                TAB.Log.AddTaskWarning("Get Page Layout failed: " + message);
            });
        }), TAB.MakeWaiter(function () {
            return PageUtil.isPageCreateTaskFinished;
        }));
    };
    /**
     * A function to delete the classic page that was created with the name 'PageUtil.generatedPageName'.
     * The caller of this function should ensure a page was created by checking the 'PageUtil.createdPage'
     * flag variable before calling this function.
     */
    PageUtil.AddTaskDeleteClassicPage = function () {
        if (!PageUtil.generatedPageName) {
            return;
        }
        var clientContext = new SP.ClientContext(TAB.Settings.Get('ProductServer') + "/sites/testPublishingPage3");
        var web = clientContext.get_web();
        var pagesFile = web.getFileByServerRelativeUrl("/sites/testPublishingPage3/Pages/" + PageUtil.generatedPageName);
        pagesFile.deleteObject();
        var isTaskFinished = false;
        TAB.AddTask(TAB.CloseWindow(TAB.Win));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Deleting Page");
            PageUtil.executeQueryAsync(clientContext).then(function () {
                isTaskFinished = true;
            }).catch(function (message) {
                // If you can’t delete the page, it might be affecting future tests.
                TAB.Log.AddTaskWarning("Error deleting publishing page: " + message);
                isTaskFinished = true;
            });
        }), TAB.MakeWaiter(function () {
            return isTaskFinished;
        }));
    };
    /**
     * A function to delete the given server relative folder url on the speficied server url
     */
    PageUtil.AddTaskDeleteFolder = function (siteUrl, serverRelativeFolderUrl) {
        var clientContext = new SP.ClientContext(siteUrl);
        var web = clientContext.get_web();
        var folder = web.getFolderByServerRelativeUrl(serverRelativeFolderUrl);
        folder.deleteObject();
        var isTaskFinished = false;
        TAB.AddTask(TAB.CloseWindow(TAB.Win));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Deleting Folder");
            PageUtil.executeQueryAsync(clientContext).then(function () {
                isTaskFinished = true;
            }).catch(function (message) {
                // If you can’t delete the folder, it might be affecting future tests.
                TAB.Log.AddTaskWarning("Error deleting folder: " + message);
                isTaskFinished = true;
            });
        }), TAB.MakeWaiter(function () {
            return isTaskFinished;
        }));
    };
    /**
     * Add task to create site page using CreateSitePage wizard.
     * @param shouldCreateNewsPage - If true news page will be created instead.
     * @param siteName - Name of the test site
     * @param path - Default to sites for backward compatibility
     */
    PageUtil.AddTaskCreateSitePage = function (shouldCreateNewsPage, siteName, path) {
        path = path || 'sites';
        var prefix = siteName
            ? TAB.Settings.Get('ProductServer') + "/" + path + "/" + siteName
            : TAB.Settings.Get('ProductServer');
        var newPageUrl = undefined;
        newPageUrl = shouldCreateNewsPage
            ? prefix + '/_layouts/15/news.aspx'
            : prefix + '/_layouts/15/CreateSitePage.aspx';
        PageUtil.disableFirstRunDialog();
        TAB.AddTask(TAB.LoadPage(newPageUrl), TAB.PageReady());
    };
    PageUtil.AddTaskCreatePageOnSite = function (siteName, path) {
        if (path === void 0) { path = 'sites'; }
        PageUtil.SetDebugManifests();
        PageUtil.disableFirstRunDialog();
        var newPageUrl = TAB.Settings.Get('ProductServer') + ("/" + path + "/" + siteName + "/_layouts/15/CreateSitePage.aspx");
        TAB.AddTask(TAB.LoadPage(newPageUrl), TAB.PageReady());
    };
    PageUtil.AddTaskLoadCommunicationPage = function (siteName, ifLoadPage) {
        if (ifLoadPage === void 0) { ifLoadPage = true; }
        TAB.Log.AddTaskComment('Loading existing home page.');
        var newPageUrl = TAB.Settings.Get('ProductServer') + ("/sites/" + siteName + "/SitePages/Home.aspx");
        TAB.AddTask(TAB.LoadPage(newPageUrl), TAB.PageReady());
    };
    PageUtil.AddTaskDismissWelcomeDialogIfExists = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Waited for Welcome dialog if it exists.');
            if (PageUtil.WelcomeDialogExists()) {
                TAB.Log.AddTaskComment('Welcome dialog exists, dismissing dialog.');
                var closeButton = PageUtil.getCloseButtonForWelcomeDialog();
                TAB.ClickElement(closeButton);
            }
            else {
                TAB.Log.AddTaskComment('Welcome dialog does not exist, not dismissing.');
            }
        }), TAB.MakeWaiter(function () {
            return PageUtil.waitForWelcomeDialogNotVisible();
        }));
    };
    PageUtil.WelcomeDialogExists = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'FirstRunDialogMain');
    };
    PageUtil.AddTaskCreateSetupCommunicationSite = function (serverUrl, siteUrl) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.SetWaitTime(2 * 60 * 1000);
            TAB.Log.Comment('Navigating to Create Site page');
            var pageUrl = serverUrl + '/_layouts/15/creategroup.aspx';
            TAB.AddTask(TAB.LoadPage(pageUrl), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'od-GroupCreate'));
            var createSiteParams;
            createSiteParams = {
                name: siteUrl,
                description: name + '-description',
                designPackage: _Controls_CreateSitePanel__WEBPACK_IMPORTED_MODULE_2__["DesignPackageOption"].Blank
            };
            TAB.AddTask(TAB.MakeTask(function () {
                _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].AddTaskCreationCommunicationSite(createSiteParams);
                _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].AddTaskVerifySiteHeader(createSiteParams.name);
            }));
        }));
    };
    PageUtil.AddTaskLoadClassicPage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Loading newly created page.');
            var azurePath = TAB.Settings.Get('AzurePath');
            var loaderUrl = azurePath + "/sp-classic-page-assembly_default.js";
            var path = "/sites/testPublishingPage3/Pages/" + PageUtil.generatedPageName;
            PageUtil.SetDebugManifests({ loaderUrl: loaderUrl });
            TAB.AddTask(TAB.LoadPage(path), TAB.PageReady());
        }));
    };
    PageUtil.AddTaskLoadPage = function (url) {
        TAB.Log.AddTaskComment('Loading existing page.');
        var newPageUrl = TAB.Settings.Get('ProductServer') + url;
        TAB.AddTask(TAB.LoadPage(newPageUrl), TAB.PageReady());
    };
    PageUtil.CheckPageLoaded = function () {
        try {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'SPPageChrome');
        }
        catch (error) {
            return false;
        }
    };
    PageUtil.SetDebugManifests = function (options) {
        if (!options) {
            options = {};
        }
        PageUtil.disableFirstRunDialog();
        if (!PageUtil.debugManifestRequired) {
            return;
        }
        var azurePath = TAB.Settings.Get('AzurePath');
        if (azurePath) {
            if (options.loaderUrl === undefined) {
                options.loaderUrl = azurePath + "/sp-pages-assembly_default.js";
            }
            if (options.manifestsFileUrl === undefined) {
                options.manifestsFileUrl = azurePath + "/manifests.js";
            }
            TAB.Win.window.sessionStorage.setItem('spfx-debug', JSON.stringify({
                loaderUrl: options.loaderUrl,
                manifestsFileUrl: options.manifestsFileUrl,
                testMode: true
            }));
            PageUtil.debugManifestsHaveBeenSet = true;
        }
    };
    PageUtil.ResetDebugManifests = function () {
        TAB.Win.window.sessionStorage.removeItem('spfx-debug');
        PageUtil.debugManifestsHaveBeenSet = false;
    };
    PageUtil.ReloadPageInMobileView = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Reloading the page with the WebView parameter');
            TAB.Win.location.href += (TAB.Win.location.href.indexOf('?') === -1 ? '?' : '&') + "env=MobileWebView";
            TAB.ReloadPage();
        }), TAB.PageReady());
    };
    PageUtil.LoadTestPage = function () {
        PageUtil.SetDebugManifests();
        var newPageURl = TAB.Settings.Get('ProductServerSet').split(';')[0] + '/SitePages/NewPage.aspx';
        TAB.AddTask(TAB.LoadPage(newPageURl), TAB.PageReady());
    };
    PageUtil.AddTaskCreateWorkbench = function () {
        var path = '/_layouts/15/workbench.aspx';
        var spQueryParams = {
            noredir: true
        };
        var newPageUrl = PageUtil.CreatePageUrl(path, spQueryParams);
        /* Load the create new page url */
        TAB.AddTask(TAB.LoadPage(newPageUrl), TAB.PageReady());
        PageUtil.AddTaskValidateAutomationIdExists('toolboxHint-webPart');
    };
    /**
     * Utility function that waits for the existence of an element with data-automation-id
     * that matches the given parameter.
     * @param dataAutomationID - the text that is provided on the element after 'data-automation-id='. For example,
     * if we have 'data-automation-id = WebPartContent' then we would pass 'WebPartContent' as the parameter.
     */
    PageUtil.AddTaskValidateAutomationIdExists = function (dataAutomationID) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Validating data-automation-id " + dataAutomationID + " exists.");
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='" + dataAutomationID + "']");
        }));
    };
    PageUtil.SPPageReady = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            return _this.IsSPPageReady();
        });
    };
    PageUtil.IsSPPageReady = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'SuiteNavPlaceHolder');
    };
    /**
     * Boots the preload.aspx page to warm up SP-Pages app.
     */
    PageUtil.AddTaskPreloadPagesApp = function () {
        var preloadPageUrl = TAB.Settings.Get('ProductServer') + '/_layouts/15/preload.aspx';
        TAB.AddTask(TAB.LoadPage(preloadPageUrl), TAB.PageReady());
    };
    /**
     * A utility function for loading a page to test Sharepoint Extensions.
     *
     * @param path - the arguments that follow the ProductServerSet. i.e. if the url is:
     * 'https://testtab.spoppe.com/_layouts/15/viewlsts.aspx?view=14&size=24' then the path is
     * '/_layouts/15/viewlsts.aspx'.
     * @param params - url paramters (do not include the '?' character). I.e. if your desired url
     * is: 'https://testtab.spoppe.com/_layouts/15/viewlsts.aspx?view=14&size=24', then params value is
     * 'view=14&size=24'. The 'loadSPFX' and 'customActions' param will be appended for you.
     * @param customActions - a lookup object for SharePoint extensions. Please see
     * {@link https://dev.office.com/sharepoint/docs/spfx/extensions/overview-extensions | Overview Extensions}
     * for more info.
     */
    PageUtil.CreatePageUrl = function (path, spQueryParams) {
        var pageUrl = TAB.Settings.Get('ProductServerSet').split(';')[0] + ("" + path);
        var queryParamsString = PageUtil.getQueryParamsString(spQueryParams);
        if (queryParamsString) {
            pageUrl += "?" + queryParamsString;
        }
        return pageUrl;
    };
    PageUtil.GetPageUrl = function () {
        return TAB.Win.location.href;
    };
    PageUtil.AddTaskReloadPageWithQueryParams = function (spQueryParams) {
        TAB.AddTask(TAB.MakeTask(function () {
            var pageUrl = PageUtil.GetPageUrl();
            var queryParamsString = PageUtil.getQueryParamsString(spQueryParams);
            if (queryParamsString) {
                var existingQueryParamIndex = pageUrl.indexOf('?');
                pageUrl = existingQueryParamIndex > -1 ? pageUrl + ("&" + queryParamsString) : pageUrl + ("?" + queryParamsString);
                TAB.AddTask(TAB.LoadPage(pageUrl), TAB.PageReady());
            }
        }));
    };
    PageUtil.removeExtension = function (inputString) {
        var lastSlashIndex = inputString.lastIndexOf('/');
        var rawTitle = lastSlashIndex === -1 ?
            inputString : inputString.substring(lastSlashIndex + 1);
        var lastDotIndex = rawTitle.lastIndexOf('.');
        return lastDotIndex === -1 ? rawTitle : rawTitle.substring(0, lastDotIndex);
    };
    /**
     * Ensure page exist on site using REST API. New page will be created if does not exist already.
     * @param pageTitle - Title of the page to be ensured.
     * @param siteName  - Name of the site hosting site page.
     * @param jsonCanvasContent - Optional Canvas content if you don't want blank page if new page created.
     * @param jsonLayoutContents - Optional LayoutWebpartsContent if you don't want default title region.
     * @param publishPage - Optional set to true for publishing a page
     * @param promotedState - Optional set to 2 for News post, default is 1
     * @param path  - Optional path of the site, default is TeamSitePage.Path
     */
    PageUtil.EnsurePageExist = function (pageTitle, siteName, jsonCanvasContent, jsonLayoutContents, publishPage, promotedState, path) {
        path = path || _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].Path;
        promotedState = isNaN(promotedState) ? 1 : promotedState;
        var siteUrl = TAB.Settings.Get('ProductServer') + "/" + path + "/" + siteName;
        var testPageUrl = siteUrl + "/SitePages/" + pageTitle + ".aspx";
        TAB.Log.AddTaskComment("Ensure Site Page " + testPageUrl + " exist, if not create new one.");
        var result = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendGetRequest(siteUrl, testPageUrl + '?as=json', result);
        TAB.AddTask(TAB.MakeTask(function () {
            if (result && result.success && result.retVal) {
                TAB.Log.AddTaskComment("Ensured Site page already exist: " + testPageUrl);
            }
            else {
                TAB.Log.Comment("Site page  " + testPageUrl + " does not exist, lets create new one.");
                PageUtil.AddCreatePageTask(pageTitle, siteName, jsonCanvasContent, jsonLayoutContents, path, promotedState, publishPage);
                TAB.Log.AddTaskComment("New Page created: " + testPageUrl);
            }
        }));
    };
    /**
     * It will try to create a new page with provided page title using REST API.
     * The URL of the page will be also based on pageTitle. If page already exist this will end up in no-op.
     *
     * @param pageTitle - unique title of the page. Ensure page with same Name does not already exist.
     * @param siteName - Site under which page to be created.
     * @param jsonCanvasContent - Optional Canvas content if you don't want blank page.
     * @param jsonLayoutContents - Optional LayoutWebpartsContent if you don't want default title region.
     * @param path - Path of the site. It is often teams or sites, default is as defined at TeamSitePage.Path
     * @param promotedState - Optional set to 2 for News post
     * @param publishPage - Optional set to true for publishing a page
     */
    PageUtil.AddCreatePageTask = function (pageTitle, siteName, jsonCanvasContent, jsonLayoutContents, path, promotedState, publishPage) {
        path = path || _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].Path;
        var siteUrl = TAB.Settings.Get('ProductServer') + "/" + path + "/" + siteName;
        var apiPathCreatePage = siteUrl + "/_api/sitepages/pages";
        var result = {};
        var content = {
            PageLayoutType: 'Article',
            PromotedState: promotedState || 1,
            Title: pageTitle,
            Name: pageTitle + '.aspx',
            CanvasContent1: JSON.stringify(jsonCanvasContent)
        };
        if (jsonLayoutContents) {
            content.LayoutWebpartsContent = JSON.stringify(jsonLayoutContents);
        }
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendPostRequest(siteUrl, apiPathCreatePage, JSON.stringify(content), result);
        TAB.AddTask(TAB.MakeTask(function () {
            if (result && result.success && result.retVal) {
                TAB.Log.AddTaskComment("Site Page " + pageTitle + " created successfully.");
                if (publishPage) {
                    var apiPathPublishPage = siteUrl + "/_api/sitepages/pages(" + result.retVal.Id + ")/publish";
                    _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendPostRequest(siteUrl, apiPathPublishPage, JSON.stringify(content), result);
                }
            }
            else {
                TAB.Log.Warning("Site page  " + pageTitle + " could not be created. Most probably it already exists. See Response: " + (result && result.retVal));
            }
        }));
    };
    PageUtil.disableFirstRunDialog = function () {
        var localStorage = TAB.Win.window.localStorage;
        if (localStorage) {
            TAB.Log.AddTaskComment('Disabling First Run Experience for pages.');
            localStorage.setItem('FirstRunExperieneceSharePointPageAuthoring', 'false');
            localStorage.setItem('FirstRunSharePointSaveForLaterTeachingBubble', 'false');
            localStorage.setItem('FirstRunSharePointContentBarAnalyticsPanel', 'false');
        }
    };
    PageUtil.getQueryParamsString = function (spQueryParams) {
        var queryParams = [];
        if (spQueryParams.params) {
            queryParams.push(spQueryParams.params);
        }
        if (spQueryParams.loadSPFX) {
            queryParams.push("loadSPFX=true");
        }
        if (spQueryParams.noredir) {
            queryParams.push("noredir=true");
        }
        if (spQueryParams.debug) {
            queryParams.push("debug=true");
        }
        if (spQueryParams.customActions) {
            queryParams.push("customActions=" + spQueryParams.customActions);
        }
        if (spQueryParams.fieldCustomizers) {
            queryParams.push("fieldCustomizers=" + spQueryParams.fieldCustomizers);
        }
        if (spQueryParams.debugFlights) {
            // Positive flights are returned as "<flightNumber>"
            // Negative flights are returned as "!<flightNumber>"
            var flights = spQueryParams.debugFlights
                .map(function (flight) { return flight > 0 ? "" + flight : "!" + Math.abs(flight); })
                .join(',');
            queryParams.push("debugFlights=" + flights);
        }
        // Help catch various encoding issues that could break the experience by forcing
        // pseudo locale
        queryParams.push("market=qps-ploc");
        var queryParamsString = queryParams.join('&');
        return queryParamsString;
    };
    PageUtil.addPublishingPage = function (customPageName, clientContext, web, pageLayoutItem) {
        var newPublishingPage = SP.Publishing.PublishingWeb.getPublishingWeb(clientContext, web);
        var pageInfo = new SP.Publishing.PublishingPageInformation();
        pageInfo.set_name(customPageName);
        pageInfo.set_pageLayoutListItem(pageLayoutItem);
        var newPage = newPublishingPage.addPublishingPage(pageInfo);
        // Load the new page object to the client context
        clientContext.load(newPage);
        return new Promise(function (resolve, reject) {
            clientContext.executeQueryAsync(function () {
                resolve();
            }, function (sender, args) {
                reject(args.get_message());
            });
        });
    };
    PageUtil.GetPageLayout = function (web, clientContext) {
        return new Promise(function (resolveGetPageLayout, rejectGetPageLayout) {
            // Resolve or reject in the callback function
            var oList = web.get_lists().getByTitle('Master Page Gallery');
            // Get the page layout by ID using which we will create a publishing page
            var pageLayoutitem = oList.getItemById(539);
            // Load the client context and execute the batch
            clientContext.load(web);
            clientContext.load(pageLayoutitem);
            clientContext.executeQueryAsync(function () {
                resolveGetPageLayout(pageLayoutitem);
            }, function (sender, args) {
                rejectGetPageLayout("" + args.get_message());
            });
        });
    };
    PageUtil.executeQueryAsync = function (clientContext) {
        return new Promise(function (resolve, reject) {
            clientContext.executeQueryAsync(function () {
                resolve();
            }, function (sender, args) {
                reject(args.get_message());
            });
        });
    };
    PageUtil.waitForWelcomeDialogNotVisible = function () {
        return TAB.MakeWaiter(function () {
            return !PageUtil.WelcomeDialogExists();
        });
    };
    PageUtil.getCloseButtonForWelcomeDialog = function () {
        try {
            var closeButton = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'FirstRunCloseButton');
            return closeButton;
        }
        catch (e) {
            return undefined;
        }
    };
    /*
    * To enable scenarios executed as Active monitor to run
    * on real code instead of debug links
    */
    PageUtil.debugManifestRequired = true;
    /**
     * A random number between 1 and 100.
     * We want to use an unused page name when creating certain
     * types of pages. This number is appended to the page name.
     */
    PageUtil.pageNumber = Math.floor((Math.random() * 100) + 1);
    /**
     * Page creation attempts.
     */
    PageUtil.pageCreateAttempts = 0;
    /**
     * A flag for REST calls to create a page.
     * Often the 'create' and 'delete' occur in the test setup
     * and test teardown which run independently of one
     * another success. if the page is not successfully created in
     * the 'create' function then we don't want to bother trying to
     * delete the page in the 'delete' function.
     */
    PageUtil.createdPage = true;
    /**
     * A flag to keep track of the AddTaskCreateClassicPage status. Since
     * we call AddTaskCreateClassicPage recursively if we try to create a page
     * that already exists, we need a flag variable that is outside of the scope
     * of an individual task. We need this behavior as we need to reset the status
     * of the flag inside the task definition.
     */
    PageUtil.isPageCreateTaskFinished = false;
    return PageUtil;
}());



/***/ }),

/***/ "jj/V":
/*!******************************************!*\
  !*** ./lib/SPTaskLib/Pages/Workbench.js ***!
  \******************************************/
/*! exports provided: Workbench */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Workbench", function() { return Workbench; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _PageUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../PageUtil */ "jK1H");


/**
 * @public
 */
var Workbench = /** @class */ (function () {
    function Workbench() {
    }
    Workbench.PageReady = function (expectedTitle) {
        return TAB.AndWaiters(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.id, 'workbenchPageContent'), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='toolboxHint-webPart']"));
    };
    /**
     * Clicks the "Ok" button on the warning dialog that appears when
     * 'gulp serve' is not running.
     */
    Workbench.AddTaskClearWarningDialog = function () {
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='GulpServeWarningOkButton']");
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clear warning dialog');
            var confirmButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win, 'GulpServeWarningOkButton');
            TAB.ClickElement(confirmButton);
        }));
    };
    Workbench.AddTaskSavePage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            var saveButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(Workbench.GetCommandBar(), 'pageCommandBarSaveButton');
            TAB.ClickElement(saveButton);
        }), TAB.MakeWaiter(function () {
            Workbench.PageUrl = _PageUtil__WEBPACK_IMPORTED_MODULE_1__["PageUtil"].GetPageUrl();
            return !Workbench.editMode;
        }));
    };
    Object.defineProperty(Workbench, "editMode", {
        get: function () {
            return TAB.Win.location.search.indexOf('Mode=Edit') > -1;
        },
        enumerable: true,
        configurable: true
    });
    Workbench.GetCommandBar = function () {
        // using check mark to decide if the page has been saved
        try {
            var commandBar = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'workbenchCommandBar');
            return commandBar;
        }
        catch (e) {
            return undefined;
        }
    };
    Workbench.Webparts = [];
    return Workbench;
}());



/***/ }),

/***/ "kQju":
/*!*********************************************************!*\
  !*** ./lib/SPTaskLib/Controls/BaseCollectionWebPart.js ***!
  \*********************************************************/
/*! exports provided: BaseCollectionWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BaseCollectionWebPart", function() { return BaseCollectionWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

/**
 * @public
 */
var BaseCollectionWebPart = /** @class */ (function (_super) {
    __extends(BaseCollectionWebPart, _super);
    function BaseCollectionWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Get +Add button element on BaseCollectionWebPart if exists. Otherwise it will return undefined.
     */
    BaseCollectionWebPart.prototype.GetAddButton = function () {
        try {
            if (this.ShouldHaveAddButton) {
                return TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'add_');
            }
            else {
                return undefined;
            }
        }
        catch (e) {
            return undefined;
        }
    };
    /**
     * Get 'see all' link element on BaseCollectionWebPart if exists. Otherwise it will return undefined.
     */
    BaseCollectionWebPart.prototype.GetSeeAllLink = function () {
        try {
            if (this.ShouldHaveSeeAllLink) {
                return TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'seeAll_');
            }
            else {
                return undefined;
            }
        }
        catch (e) {
            return undefined;
        }
    };
    Object.defineProperty(BaseCollectionWebPart.prototype, "ShouldHaveAddButton", {
        /**
         * Whether web part has an add button for adding a new item. It is a setting for BaseCollectionWebPart.
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseCollectionWebPart.prototype, "ShouldHaveSeeAllLink", {
        /**
         * Whether web part has a 'see all' link. It is a setting for BaseCollectionWebPart.
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    return BaseCollectionWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "lIY2":
/*!*********************************************!*\
  !*** ./lib/SPTaskLib/Controls/EventPage.js ***!
  \*********************************************/
/*! exports provided: EventPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EventPage", function() { return EventPage; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");


/**
 * @public
 */
var EventPage = /** @class */ (function () {
    function EventPage(previousPageUrl) {
        this._previousPageUrl = previousPageUrl;
    }
    EventPage.prototype.AddTaskInputEventTitle = function (title) {
        var titleInput = undefined;
        var shouldCheckTitle = false;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Event page inputs event title.');
            titleInput = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="pageTitleInput"]');
            var focusEv = TAB.Win.document.createEvent('HTMLEvents');
            focusEv.initEvent('focus', true /*bubble*/, false /*cancelable*/);
            titleInput.dispatchEvent(focusEv);
            titleInput.value = title;
            var ev = TAB.Win.document.createEvent('HTMLEvents');
            ev.initEvent('input', true /*bubble*/, false /*cancelable*/);
            titleInput.dispatchEvent(ev);
            // It's work around for avoid event tab failure caused by an regression bug,
            // we should remove it when we solve the regression bug, use VSO#SOX#TASK#753616 to track.
            // The work around is to defer check title value 2000ms.
            setTimeout(function () {
                // press Enter
                TAB.FireKeyboardEvent(titleInput, 'keydown', 13);
                var blurEv = TAB.Win.document.createEvent('HTMLEvents');
                blurEv.initEvent('blur', true /*bubble*/, false /*cancelable*/);
                titleInput.dispatchEvent(blurEv);
                shouldCheckTitle = true;
            }, 2000);
        }), TAB.MakeWaiter(function () { return (titleInput && titleInput.value === title && shouldCheckTitle); }));
    };
    EventPage.prototype.AddTaskInputEventLink = function (link) {
        var addressInput = undefined;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Event page inputs event link.');
            addressInput =
                _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'eventPageEditableLinkInput');
            addressInput.focus();
            _ReactUtil__WEBPACK_IMPORTED_MODULE_1__["ReactUtil"].TriggerOnChange(addressInput, link);
        }), TAB.MakeWaiter(function () { return (addressInput && addressInput.value !== '' && addressInput.value !== undefined); }));
    };
    EventPage.prototype.AddTaskInputLocation = function (locationValue) {
        var locationInput;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Event page inputs event location.');
            var locationTextContainer = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'locationTextField')[0];
            locationInput = TAB.GetElement(locationTextContainer, TAB.searchBy.hasClassName, 'ms-TextField-field');
            locationInput.focus();
            _ReactUtil__WEBPACK_IMPORTED_MODULE_1__["ReactUtil"].TriggerOnChange(locationInput, locationValue);
        }), TAB.MakeWaiter(function () { return (locationInput && locationInput.value !== '' && locationInput.value !== undefined); }));
    };
    EventPage.prototype.AddTaskInputEventDate = function () {
        var startAtInput;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Event page inputs event date.');
            var startDatePicker = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-DatePicker')[0];
            startAtInput = TAB.GetElement(startDatePicker, TAB.searchBy.hasClassName, 'ms-TextField-field');
            TAB.ClickElement(startAtInput);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'ms-DatePicker-callout'));
        TAB.AddTask(TAB.MakeTask(function () {
            var dateCollection = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-DatePicker-day');
            var startAtDate = dateCollection[dateCollection.length - 1];
            TAB.ClickElement(startAtDate);
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'ms-DatePicker-callout');
        }));
        var endAtInput;
        TAB.AddTask(TAB.MakeTask(function () {
            var endDatePicker = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-DatePicker')[1];
            endAtInput = TAB.GetElement(endDatePicker, TAB.searchBy.hasClassName, 'ms-TextField-field');
            TAB.ClickElement(endAtInput);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'ms-DatePicker-callout'));
        TAB.AddTask(TAB.MakeTask(function () {
            var dateCollection = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-DatePicker-day');
            var endAtDate = dateCollection[dateCollection.length - 1];
            TAB.ClickElement(endAtDate);
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'ms-DatePicker-callout')
                && !TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'ms-MessageBar--error');
        }));
    };
    EventPage.prototype.AddTaskSaveEvent = function () {
        var _this = this;
        TAB.AddTask(undefined, // do nothing
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'eventPageSaveButton'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Event page saves event.');
            var saveButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="eventPageSaveButton"]');
            TAB.ClickElement(saveButton);
        }), TAB.MakeWaiter(function () { return _this.InReadMode; }));
    };
    EventPage.prototype.AddTaskEditEvent = function () {
        var _this = this;
        TAB.AddTask(undefined, // do nothing
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'eventPageEditButton'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Event page starts editing.');
            var editButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="eventPageEditButton"]');
            TAB.ClickElement(editButton);
        }), TAB.MakeWaiter(function () { return _this.InEditMode; }));
    };
    EventPage.prototype.AddTaskDeleteEvent = function () {
        TAB.AddTask(undefined, // do nothing
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'eventPageDeleteButton'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Event page deletes current event.');
            var deleteBtn = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="eventPageDeleteButton"]');
            TAB.ClickElement(deleteBtn);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="yesButton"]');
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            var yesBtn = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="yesButton"]');
            TAB.ClickElement(yesBtn);
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="eventPageDeleteButton"]');
        }));
    };
    EventPage.prototype.AddTaskNavigateBack = function (ensureEventItem) {
        var _this = this;
        if (ensureEventItem === void 0) { ensureEventItem = false; }
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Event page navigates back to previous web-part-hosting site page.');
            TAB.LoadPage(_this._previousPageUrl).WaitFor(TAB.PageReady());
        }), TAB.MakeWaiter(function () {
            return (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="pageCommandBarPublishButton"]')
                || TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="pageCommandBarEditButton"]'))
                && TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="event-card-title"]');
        }));
    };
    Object.defineProperty(EventPage.prototype, "InEditMode", {
        get: function () {
            return (TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'autoSuggestionContainer')
                && TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="pageTitleInput"]')
                && TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="eventPageSaveButton"]')
                && !TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-ProgressIndicator'));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EventPage.prototype, "InReadMode", {
        get: function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'seeAllEvents')
                && !TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-dialogMainOverride')
                && TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="eventPageEditButton"]');
        },
        enumerable: true,
        configurable: true
    });
    return EventPage;
}());



/***/ }),

/***/ "ldKH":
/*!********************************************!*\
  !*** ./lib/SPTaskLib/Pages/PromotePage.js ***!
  \********************************************/
/*! exports provided: PromotePage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PromotePage", function() { return PromotePage; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");

/**
 * @public
 */
var PromotePage = /** @class */ (function () {
    function PromotePage() {
    }
    PromotePage.AddTaskWaitForManagePagePanel = function () {
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return PromotePage.GetAddToNavButton();
        }));
    };
    PromotePage.AddTaskClickAddToNav = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Adding page to the nav');
            var addToNavButton = PromotePage.GetAddToNavButton();
            TAB.ClickElement(addToNavButton);
        }), TAB.MakeWaiter(function () {
            var addToNavButton = PromotePage.GetAddToNavButton();
            return addToNavButton.classList.contains('is-disabled');
        }));
    };
    PromotePage.AddTaskPostAsNews = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Posting page as news');
            var postToNewsButton = PromotePage.GetPostToNewsButton();
            TAB.ClickElement(postToNewsButton);
        }), TAB.MakeWaiter(function () {
            var postToNewsButton = PromotePage.GetPostToNewsButton();
            return postToNewsButton.classList.contains('is-disabled');
        }));
    };
    PromotePage.AddTaskSendEmail = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Opening the send by email dialog');
            var emailButton = PromotePage.GetEmailButton();
            TAB.ClickElement(emailButton);
        }), PromotePage.WaitForEmailDialog());
    };
    PromotePage.AddTaskCloseEmailDialog = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            var cancelEmailButton = PromotePage.GetCancelEmailButton();
            TAB.ClickElement(cancelEmailButton);
        }), TAB.MakeWaiter(function () {
            var emailDialog = PromotePage.GetEmailDialog();
            return !emailDialog;
        }));
    };
    PromotePage.AddTaskCheckCopyLink = function () {
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            TAB.Log.AddTaskComment('Verifying the copy link is same as window');
            var windowUrl = (TAB.Win.window.location.href).split('?')[0];
            var textField = PromotePage.GetUrltextField();
            return windowUrl === textField.innerHTML.split('?')[0];
        }));
    };
    PromotePage.AddTaskCheckLinkAddedToNav = function (pageTitle) {
        TAB.AddTask(TAB.MakeTask(function () {
            var navLinks = PromotePage.GetHorizontalNavLinks();
            for (var _i = 0, navLinks_1 = navLinks; _i < navLinks_1.length; _i++) {
                var link = navLinks_1[_i];
                if (link.title === pageTitle) {
                    return true;
                }
            }
            var overflowButton = PromotePage.GetOverflowButton();
            if (overflowButton) {
                overflowButton.click();
            }
        }), PromotePage.WaitForAddedToNav(pageTitle));
    };
    PromotePage.WaitForAddedToNav = function (pageTitle) {
        return TAB.MakeWaiter(function () {
            // If contextual menu is open, check overflow links
            var contextualMenuCallout = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-ContextualMenu-Callout');
            if (contextualMenuCallout.length > 0) {
                var overFlowLinks = PromotePage.GetOverflowLinks();
                for (var _i = 0, overFlowLinks_1 = overFlowLinks; _i < overFlowLinks_1.length; _i++) {
                    var link = overFlowLinks_1[_i];
                    if (link.innerText === pageTitle) {
                        return true;
                    }
                }
            }
            // Check regular links
            var navLinks = PromotePage.GetHorizontalNavLinks();
            for (var _a = 0, navLinks_2 = navLinks; _a < navLinks_2.length; _a++) {
                var link = navLinks_2[_a];
                if (link.title === pageTitle) {
                    return true;
                }
            }
            var overflowButton = PromotePage.GetOverflowButton();
            if (overflowButton) {
                overflowButton.click();
            }
            return false;
        });
    };
    PromotePage.WaitForEmailDialog = function () {
        return TAB.MakeWaiter(function () {
            return PromotePage.GetEmailDialog();
        });
    };
    PromotePage.GetEmailDialog = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-Dialog-main')[0];
    };
    PromotePage.GetManagePagePanel = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-Panel-main')[0];
    };
    PromotePage.GetHorizontalNavLinks = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-HorizontalNavItem-link');
    };
    PromotePage.GetOverflowButton = function () {
        try {
            var overflowElement = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='HorizontalNav-overflow']");
            var overflowButton = TAB.GetElement(overflowElement, TAB.searchBy.tag, 'button');
            return overflowButton;
        }
        catch (e) {
            return undefined;
        }
    };
    PromotePage.GetOverflowLinks = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-ContextualMenu-item');
    };
    PromotePage.GetCancelEmailButton = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-Dialog-button--close')[0];
    };
    PromotePage.GetAddToNavButton = function () {
        try {
            var addToNavButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(PromotePage.GetManagePagePanel(), 'promoteAddToNav');
            return addToNavButton;
        }
        catch (e) {
            return undefined;
        }
    };
    PromotePage.GetPostToNewsButton = function () {
        try {
            var postToNewsButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(PromotePage.GetManagePagePanel(), 'promotePostToNews');
            return postToNewsButton;
        }
        catch (e) {
            return undefined;
        }
    };
    PromotePage.GetEmailButton = function () {
        try {
            var emailButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(PromotePage.GetManagePagePanel(), 'promoteEmail');
            return emailButton;
        }
        catch (e) {
            return undefined;
        }
    };
    PromotePage.GetUrltextField = function () {
        try {
            var textField = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(PromotePage.GetManagePagePanel(), 'promoteUrlTextField');
            return textField;
        }
        catch (error) {
            return undefined;
        }
    };
    return PromotePage;
}());



/***/ }),

/***/ "m/ZX":
/*!**************************************************!*\
  !*** ./lib/SPTaskLib/Controls/PlannerWebpart.js ***!
  \**************************************************/
/*! exports provided: PlannerWebpart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlannerWebpart", function() { return PlannerWebpart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * @public
 */
var PlannerWebpart = /** @class */ (function (_super) {
    __extends(PlannerWebpart, _super);
    function PlannerWebpart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Planner, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Planner.toString()) || this;
    }
    /**
     * Checks if AAD service is available
     */
    PlannerWebpart.prototype.isAADServiceAvailable = function (aadServiceValidationResult) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Making sure AAD service is available');
            if (!aadServiceValidationResult.isAADServiceAvailable) {
                TAB.Log.DidNotRun('ADD Service is not available');
                return false;
            }
        }));
        return true;
    };
    /**
     * Add a page, switch to an edit mode and wait until property pane is open.
     */
    PlannerWebpart.prototype.addEditPage = function (pageTitle) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Adding a page, switch to an edit more and wait until property pane is open');
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskEditPage();
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskAddPageTitle(pageTitle);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='toolboxHint-webPart']"));
    };
    /**
     * Add Webpart to the page
     */
    PlannerWebpart.prototype.addWebPartToPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Adding webpart to a page.');
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        }));
    };
    /**
     * Click on the 'Add a new plan' button
     */
    PlannerWebpart.prototype.clickAddPlanButton = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Clicking on the '+ Add a new plan' button.");
            var addPlanButton = TAB.GetElements(_this._getPropertyPane(), TAB.searchBy.tag, 'BUTTON')[1];
            TAB.ClickElement(addPlanButton);
        }), TAB.WaitForElementToExist(_Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].GetPropertyPane(), TAB.searchBy.tag, 'INPUT'));
    };
    /**
     * Enter a new plan name to the input property pane text-field.
     */
    PlannerWebpart.prototype.addPlan = function (name) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Making sure PropertyPane is Open');
        }), TAB.AndWaiters(this._createWaiterForPropertyPaneContainer(), TAB.WaitForElementToExist(_Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].GetPropertyPane(), TAB.searchBy.tag, 'INPUT')));
        // Enter the plan name
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Entering a new plan name to an input-field: ' + name);
            var inputForPlan = TAB.GetElements(_this._getPropertyPane(), TAB.searchBy.tag, 'INPUT')[0];
            _ReactUtil__WEBPACK_IMPORTED_MODULE_3__["ReactUtil"].TriggerOnChange(inputForPlan, name);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'planTaskboardPage'));
    };
    /**
     * Click on create plan button
     */
    PlannerWebpart.prototype.clickPlanCreateButton = function () {
        var _this = this;
        this._waitForPlanNameTextField();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Clicking on 'Create' button");
            var createButton = TAB.GetElement(_this._getPropertyPane(), TAB.searchBy.hasClassName, 'ms-Button');
            TAB.ClickElement(createButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'taskBoardView'));
    };
    /**
     * Creates a new task
     * @param taskName - Name for a new task
     */
    PlannerWebpart.prototype.createTask = function (taskName) {
        this._waitForAddNewbutton();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Clicking on '+' button in the Planner task board to add a new task");
            var planTaskBoard = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'planTaskboardPage');
            // Add a task to first bucket
            var plusButton = TAB.GetElements(planTaskBoard, TAB.searchBy.hasClassName, 'addButton')[0];
            TAB.ClickElement(plusButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'addControlContainer'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Enter a task name: ' + taskName);
            var planTaskBoard = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'planTaskboardPage');
            var addControlContainer = TAB.GetElement(planTaskBoard, TAB.searchBy.hasClassName, 'addControlContainer');
            var inputElementForTask = TAB.GetElements(addControlContainer, TAB.searchBy.tag, 'INPUT')[0];
            _ReactUtil__WEBPACK_IMPORTED_MODULE_3__["ReactUtil"].TriggerOnChange(inputElementForTask, taskName);
            TAB.Log.Comment("Click on 'Add Task' button");
            var addTaskButton = TAB.GetElement(addControlContainer, TAB.searchBy.hasClassName, 'addTaskButton');
            TAB.ClickElement(addTaskButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'taskCard'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Dismiss add task card');
            var addControlContainer = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'addControlContainer');
            var closeAddTaskCard = TAB.GetElement(addControlContainer, TAB.searchBy.hasClassName, 'closeAddTaskCard');
            TAB.ClickElement(closeAddTaskCard);
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'addControlContainer');
        }));
    };
    /**
     * Open task details
     * @param taskName - Name of a task
     */
    PlannerWebpart.prototype.openTaskDetails = function (taskName) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Opening task: ' + taskName);
            var planTaskBoard = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'planTaskboardPage');
            var taskCards = TAB.GetElements(planTaskBoard, TAB.searchBy.hasClassName, 'taskBoardCard');
            // Open the task that was created by this test run.
            for (var _i = 0, taskCards_1 = taskCards; _i < taskCards_1.length; _i++) {
                var card = taskCards_1[_i];
                var taskCard = TAB.GetElement(card, TAB.searchBy.hasClassName, 'title');
                if (taskCard && taskCard.textContent === taskName) {
                    TAB.ClickElement(taskCard);
                    break;
                }
            }
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'taskDetailsEditor'));
    };
    /**
     * Renames task title
     */
    PlannerWebpart.prototype.renameTaskTitle = function (newTaskName) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Changing task title in task details dialog');
            var taskDetailsEditor = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'taskDetailsEditor');
            var title = TAB.GetElement(taskDetailsEditor, TAB.searchBy.hasClassName, 'title');
            var input = TAB.GetElement(title, TAB.searchBy.tag, 'input');
            TAB.Log.Comment('Before: ' + input.value);
            _ReactUtil__WEBPACK_IMPORTED_MODULE_3__["ReactUtil"].TriggerOnChange(input, newTaskName);
            TAB.ClickElement(TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-header'));
        }), TAB.MakeWaiter(function () {
            var taskDetailsEditor2 = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'taskDetailsEditor');
            var title2 = TAB.GetElement(taskDetailsEditor2, TAB.searchBy.hasClassName, 'title');
            var input2 = TAB.GetElement(title2, TAB.searchBy.tag, 'input');
            TAB.Log.Comment('After: ' + input2.value);
            return input2.value === newTaskName;
        }));
    };
    /**
     * Dismiss task details dialog
     */
    PlannerWebpart.prototype.closeTaskDetails = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Closing task details');
            var plannerAppDialog = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'plannerAppDialog');
            var topButton = TAB.GetElement(plannerAppDialog, TAB.searchBy.hasClassName, 'ms-Dialog-topButton');
            var button = TAB.GetElements(topButton, TAB.searchBy.tag, 'button')[1];
            TAB.ClickElement(button);
        }), TAB.MakeWaiter(function () {
            TAB.Log.Comment('Making sure task details editor is dismissed');
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'taskDetailsEditor');
        }));
    };
    /**
     * Open the progress dropdown
     */
    PlannerWebpart.prototype.openProgress = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Opening progress dropdown');
            var dropdownTuple = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'dropdownTuple')[1];
            var dropDown = TAB.GetElement(dropdownTuple, TAB.searchBy.hasClassName, 'taskProgress');
            TAB.ClickElement(dropDown);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-Callout-main'));
    };
    /**
     * Change the state of the task
     */
    PlannerWebpart.prototype.changeProgress = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Changing the task status to in-progress');
            var callout = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Callout-main');
            var inProgress = TAB.GetElements(callout, TAB.searchBy.tag, 'button');
            // 0: Not started, 1: In Progress, 2: Complete
            TAB.ClickElement(inProgress[1]);
        }), TAB.MakeWaiter(function () {
            TAB.Log.Comment('Making sure callout is dismissed');
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-Callout-main');
        }));
    };
    /**
     * Deletes a task
     */
    PlannerWebpart.prototype.deleteTask = function (taskName, deleteAll) {
        var _this = this;
        if (deleteAll === void 0) { deleteAll = false; }
        TAB.AddTask(TAB.MakeTask(function () {
            var planTaskBoard = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'planTaskboardPage');
            var taskCards = TAB.GetElements(planTaskBoard, TAB.searchBy.hasClassName, 'taskBoardCard');
            // Delete a task that was created by this test run.
            for (var i = taskCards.length - 1; i >= 0; --i) {
                var taskTitle = TAB.GetElement(taskCards[i], TAB.searchBy.hasClassName, 'title');
                if (taskTitle) {
                    if (deleteAll) {
                        _this._openContextMenuOnTaskCard(taskCards[i]);
                        _this._clickDeleteBtnInContextMenuOnTaskCard(taskTitle.textContent);
                    }
                    else {
                        // Delete ONLY the task that was created by this test instance
                        if (taskTitle.textContent === taskName) {
                            _this._openContextMenuOnTaskCard(taskCards[i]);
                            _this._clickDeleteBtnInContextMenuOnTaskCard(taskTitle.textContent);
                            break;
                        }
                    }
                }
            }
        }), TAB.MakeWaiter(function () {
            var planTaskBoard = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'planTaskboardPage');
            var taskCards = TAB.GetElements(planTaskBoard, TAB.searchBy.hasClassName, 'taskBoardCard');
            // Making sure deleted task doesn't exist in the taskboard.
            for (var _i = 0, taskCards_2 = taskCards; _i < taskCards_2.length; _i++) {
                var card = taskCards_2[_i];
                var taskCard = TAB.GetElement(card, TAB.searchBy.hasClassName, 'title');
                if (taskCard && taskCard.textContent === taskName) {
                    TAB.Log.Comment('Deleted task found. Not good. Should have been deleted by the cleanup task.');
                    return false;
                }
            }
            TAB.Log.Comment('Deleted task not found. Which is good. It means cleanup task did its job and deleted the task.');
            return true;
        }));
    };
    /**
     * Returns the total number of tasks
     */
    PlannerWebpart.prototype.getTasksCount = function () {
        var planTaskBoard = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'planTaskboardPage');
        return TAB.GetElements(planTaskBoard, TAB.searchBy.hasClassName, 'taskBoardCard').length;
    };
    /**
     * Wait until plan board is loaded in the page
     */
    PlannerWebpart.prototype.waitForPlanTaskboardPage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Making sure planTaskboardPage exists");
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'planTaskboardPage'));
    };
    /**
     * Open contextual menu from a task card
     */
    PlannerWebpart.prototype._openContextMenuOnTaskCard = function (card) {
        TAB.AddTask(TAB.MakeTask(function () {
            var taskTitle = TAB.GetElement(card, TAB.searchBy.hasClassName, 'title');
            TAB.Log.Comment("Trying to click on 'more' section on : " + taskTitle.textContent);
            if (card) {
                var rightSection = TAB.GetElement(card, TAB.searchBy.hasClassName, 'otherCommands');
                if (rightSection) {
                    TAB.ClickElement(rightSection);
                }
            }
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu-Callout'));
    };
    /**
     * Click on the delete button in Contexual menu on task card
     */
    PlannerWebpart.prototype._clickDeleteBtnInContextMenuOnTaskCard = function (taskName) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Waiting for a contextual menu callout');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu-Callout'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Deleting: ' + taskName);
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu-Callout')) {
                TAB.Log.Comment("Clicking on 'Delete' button in taskCard context menu");
                var contextualMenu = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu-list');
                var deleteButton = TAB.GetElements(contextualMenu, TAB.searchBy.tag, 'BUTTON')[2];
                if (deleteButton) {
                    TAB.ClickElement(deleteButton);
                    TAB.Log.Comment('Deleted: ' + taskName);
                }
            }
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu-Callout');
        }));
    };
    /**
     * Wait for a text-field to enter the plan name
     */
    PlannerWebpart.prototype._waitForPlanNameTextField = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Waiting for text-field to exist to enter a plan name');
        }), TAB.WaitForElementToExist(_Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].GetPropertyPane(), TAB.searchBy.tag, 'INPUT'));
    };
    /**
     * Wait for add new task button
     */
    PlannerWebpart.prototype._waitForAddNewbutton = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Waiting for a add new plan button');
        }), TAB.MakeWaiter(function () {
            var planTaskBoard = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'planTaskboardPage');
            return TAB.ElementExists(planTaskBoard, TAB.searchBy.hasClassName, 'addButton');
        }));
    };
    /**
     * Wait for the property pane
     */
    PlannerWebpart.prototype._createWaiterForPropertyPaneContainer = function () {
        return TAB.MakeWaiter(function () {
            TAB.Log.Comment('Making sure PropertyPane is open.');
            return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
        });
    };
    /**
     * Get the property pane
     */
    PlannerWebpart.prototype._getPropertyPane = function () {
        try {
            var propertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            return propertyPane;
        }
        catch (e) {
            TAB.Log.Comment('PropertyPane is closed.');
            return undefined;
        }
    };
    return PlannerWebpart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "m98m":
/*!*******************************************************!*\
  !*** ./lib/SPTaskLib/Controls/YammerConversations.js ***!
  \*******************************************************/
/*! exports provided: YammerConversations */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YammerConversations", function() { return YammerConversations; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Next */ "BJbA");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var YammerConversations = /** @class */ (function (_super) {
    __extends(YammerConversations, _super);
    function YammerConversations() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].YammerConversations, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].YammerConversations.toString()) || this;
    }
    YammerConversations.prototype.AddWebPartToPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        }), TAB.AndWaiters(this._waitForPlaceholder(), this._waitForOpenPropertyPane()));
    };
    YammerConversations.prototype.AddTaskClickFeedTypeDropdown = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var feedTypeDropdown = _this._feedTypeDropdown;
            if (!feedTypeDropdown) {
                throw 'Feed type dropdown not found';
            }
            TAB.ClickElement(feedTypeDropdown);
        }), this._waitForFeedTypeOptionHome());
    };
    YammerConversations.prototype.AddTaskClickHomeFeedType = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var home = _this._feedTypeOptionHome;
            if (!home) {
                throw 'Home feed type option not found';
            }
            TAB.ClickElement(home);
        }));
    };
    YammerConversations.prototype.AddTaskAddHomeFeed = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var feedTypeDropdown = _this._feedTypeDropdown;
            if (!feedTypeDropdown) {
                throw 'Feed type dropdown not found';
            }
            _this.AddTaskClickFeedTypeDropdown();
            _this.AddTaskClickHomeFeedType();
        }));
    };
    YammerConversations.prototype.CheckForWebpartContent = function () {
        TAB.AddTask(undefined, TAB.OrWaiters(this._waitForPlaceholderFetchError(), this._waitForFeedHeader()));
    };
    YammerConversations.prototype._waitForOpenPropertyPane = function () {
        TAB.Log.Comment('Property pane should open if there is no feed configured');
        return TAB.AndWaiters(TAB.AndWaiters(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'showPane'), this._waitForFeedTypeDropdown()), this._waitForFeedIdPicker());
    };
    YammerConversations.prototype._propertyPane = function () {
        return TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'showPane');
    };
    YammerConversations.prototype._waitForFeedHeader = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var el = _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementByDataAutomationId(_this._root, 'yammer_feed');
                if (el) {
                    TAB.Log.Comment('Feed header found');
                }
                return !!el;
            }
            catch (ex) {
                return false;
            }
        });
    };
    YammerConversations.prototype._waitForPlaceholderFetchError = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            var el = _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementByDataAutomationId(_this._root, 'placeholderContainerFetchError');
            if (el) {
                TAB.Log.DidNotRun('data-automation-id placeholderContainerFetchError found');
            }
            return !!el;
        });
    };
    YammerConversations.prototype._waitForFeedTypeDropdown = function () {
        var _this = this;
        TAB.Log.Comment('Wait for feed type dropdown to exist');
        return TAB.MakeWaiter(function () {
            try {
                var el = _this._feedTypeDropdown;
                if (el) {
                    TAB.Log.Comment('Feed type dropdown found');
                }
                return !!el;
            }
            catch (ex) {
                return false;
            }
        });
    };
    YammerConversations.prototype._waitForFeedTypeOptionHome = function () {
        var _this = this;
        TAB.Log.Comment('Wait for feed type option "Home" to exist');
        return TAB.MakeWaiter(function () {
            try {
                var el = _this._feedTypeOptionHome;
                if (el) {
                    TAB.Log.Comment('Feed type option "Home" found');
                }
                return !!el;
            }
            catch (ex) {
                return false;
            }
        });
    };
    YammerConversations.prototype._waitForFeedIdPicker = function () {
        var _this = this;
        TAB.Log.Comment('Wait for feed id picker to exist');
        return TAB.MakeWaiter(function () {
            var el = _this._feedIdPicker;
            if (el) {
                TAB.Log.Comment('Feed id picker found');
            }
            return !!el;
        });
    };
    Object.defineProperty(YammerConversations.prototype, "_feedTypeDropdown", {
        get: function () {
            TAB.Log.Comment('Getting feed type dropdown element');
            var feedTypeDropdown = _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementByDataAutomationId(this._propertyPane(), 'yammer_feedTypeDropdown');
            var clickableFeedTypeDropdown = TAB.GetElement(feedTypeDropdown, TAB.searchBy.customQuery, 'div[data-is-focusable="true"]');
            if (clickableFeedTypeDropdown) {
                TAB.Log.Comment('Found feed type dropdown');
            }
            return clickableFeedTypeDropdown;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YammerConversations.prototype, "_feedIdPicker", {
        get: function () {
            TAB.Log.Comment('Getting feed id picker element');
            var feedIdPicker = _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementByDataAutomationId(this._propertyPane(), 'yammer_feedIdPicker');
            if (feedIdPicker) {
                TAB.Log.Comment('Found feed id picker');
            }
            return feedIdPicker;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YammerConversations.prototype, "_feedTypeOptionHome", {
        get: function () {
            TAB.Log.Comment('Getting feed type options list element');
            var feedTypeOptionsList = _Next__WEBPACK_IMPORTED_MODULE_2__["Next"].GetElementsByDataAutomationId(TAB.Win, 'yammer_feedTypeOption');
            if (!feedTypeOptionsList || feedTypeOptionsList.length <= 1) {
                throw 'Feed type options list not found, or "Home" not found';
            }
            TAB.Log.Comment('Feed type "Home" option found');
            return feedTypeOptionsList[4];
        },
        enumerable: true,
        configurable: true
    });
    return YammerConversations;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "mXly":
/*!**********************************************!*\
  !*** ./lib/SPTaskLib/Controls/RTEWebPart.js ***!
  \**********************************************/
/*! exports provided: RTELinkDialogOperation, RTEWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RTELinkDialogOperation", function() { return RTELinkDialogOperation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RTEWebPart", function() { return RTEWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _Utilities_ReactTriggerChange__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utilities/ReactTriggerChange */ "dp3n");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Next */ "BJbA");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * @public
 */
var RTELinkDialogOperation;
(function (RTELinkDialogOperation) {
    RTELinkDialogOperation[RTELinkDialogOperation["Save"] = 0] = "Save";
    RTELinkDialogOperation[RTELinkDialogOperation["Cancel"] = 1] = "Cancel";
})(RTELinkDialogOperation || (RTELinkDialogOperation = {}));
/**
 * @public
 */
var RTEWebPart = /** @class */ (function (_super) {
    __extends(RTEWebPart, _super);
    function RTEWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].RTE, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].RTE.toString()) || this;
    }
    RTEWebPart.prototype.AddTaskToClickOnFormattingBarButton = function (automationId, htmlRegex) {
        var _this = this;
        TAB.Log.AddTaskComment("Clicking on the formatting bar button '" + automationId + "'");
        TAB.AddTask(TAB.MakeTask(function () {
            _this._clickOnElement(_this._toolbar, automationId);
        }), this._waitForAppliedFormat(htmlRegex));
    };
    RTEWebPart.prototype.AddTaskToClickOnPropertyPaneButton = function (automationId, htmlRegex) {
        var _this = this;
        TAB.Log.AddTaskComment("Clicking on the property pane button '" + automationId + "'");
        TAB.AddTask(TAB.MakeTask(function () {
            _this._clickOnElement(_this._propertyPane, automationId);
        }), this._waitForAppliedFormat(htmlRegex));
    };
    RTEWebPart.prototype.AddTaskToClickOnColorPicker = function (buttonAutomationId, colorPickerAutomationId, cssClass) {
        var _this = this;
        TAB.Log.AddTaskComment("Clicking on the property pane button '" + buttonAutomationId + "'");
        TAB.AddTask(TAB.MakeTask(function () {
            _this._clickOnElement(_this._propertyPane, buttonAutomationId);
        }), this._waitForColorPickerButton(colorPickerAutomationId));
        TAB.AddTask(TAB.MakeTask(function () {
            var colors = _this._colorItem(colorPickerAutomationId);
            TAB.ClickElement(colors[0]);
        }), this._waitForCssClass(cssClass));
    };
    RTEWebPart.prototype.AddTaskToClickOnTableOperationsButton = function (automationId, tagName, numberOfTableTags, shouldSelectTable) {
        var _this = this;
        TAB.Log.AddTaskComment("Clicking on the property pane button '" + automationId + "'");
        if (shouldSelectTable) {
            this.AddTaskToSelectTableInRTE(automationId);
        }
        TAB.AddTask(TAB.MakeTask(function () {
            _this._clickOnElement(_this._propertyPane, automationId);
        }), this._waitForTableFormat(tagName, numberOfTableTags));
    };
    RTEWebPart.prototype.AddTaskToClickOnTableStyleButton = function (automationId, className) {
        var _this = this;
        TAB.Log.AddTaskComment("Clicking on the property pane button '" + automationId + "'");
        TAB.AddTask(TAB.MakeTask(function () {
            _this._clickOnElement(_this._propertyPane, automationId);
        }), this._waitForTableStyle(className));
    };
    RTEWebPart.prototype.AddTaskToOpenPropertyPaneDropDown = function (index, dropDownLabel, selectedValueIndex, htmlRegex, cssClass) {
        TAB.Log.AddTaskComment("Clicking on the property pane drop down '" + dropDownLabel + "'");
        TAB.AddTask(TAB.MakeTask(function () {
            var container = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            var dropDown = TAB.GetElements(container, TAB.searchBy.partialClassName, 'ms-Dropdown dropdown')[index];
            dropDown.focus();
            TAB.ClickElement(dropDown);
        }), this._waitForPropertyPaneDropDown());
        TAB.AddTask(TAB.MakeTask(function () {
            var dropDownCallout = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'ms-Dropdown-callout');
            var button = TAB.GetElements(dropDownCallout, TAB.searchBy.tag, 'BUTTON')[selectedValueIndex];
            TAB.Log.Comment('Click on drop down option');
            TAB.ClickElement(button);
        }), TAB.OrWaiters(this._waitForAppliedFormat(htmlRegex), this._waitForCssClass(cssClass)));
    };
    RTEWebPart.prototype.AddTaskToClickOnMoreButton = function () {
        var _this = this;
        TAB.Log.AddTaskComment("Clicking on more formatting bar button");
        TAB.AddTask(TAB.MakeTask(function () {
            _this._clickOnElement(_this._toolbar, 'more-button');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'showPane'));
    };
    RTEWebPart.prototype.AddTaskToClickOnFormattingBarButtonWithStyle = function (automationId, style) {
        var _this = this;
        TAB.Log.AddTaskComment("Clicking on the formatting bar button '" + automationId + "'");
        TAB.AddTask(TAB.MakeTask(function () {
            _this._clickOnElement(_this._toolbar, automationId);
        }), this._waitForAppliedStyle(style));
    };
    RTEWebPart.prototype.AddTaskToClickOnRTE = function () {
        var _this = this;
        TAB.Log.AddTaskComment("Clicking inside RTE '" + RTEWebPart.RTE + "'");
        TAB.AddTask(TAB.MakeTask(function () {
            _this._clickOnElement(_this._root, RTEWebPart.RTE);
        }), TAB.AndWaiters(this._waitForElementWithCustomQuery(RTEWebPart.CKEditorSelector, this._root), this._waitForFormattingBar()));
    };
    RTEWebPart.prototype.AddTaskToSelectTableInRTE = function (tableFormatButtonId) {
        var _this = this;
        TAB.Log.AddTaskComment("Selecting table'" + RTEWebPart.RTE + "'");
        TAB.AddTask(TAB.MakeTask(function () {
            _this._clickOnElement(_this._root, RTEWebPart.RTE);
            var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
            var sel = TAB.Win.window.getSelection();
            var range = TAB.Win.document.createRange();
            var startNode = rte.getElementsByTagName('td')[0];
            startNode.textContent = 'this is some text';
            range.selectNode(startNode);
            sel.removeAllRanges();
            sel.addRange(range);
        }), this._waitForSelection());
        TAB.AddTask(TAB.MakeTask(function () {
            _this.AddTaskToClickOnPropertyPaneButton('bold-propertyPaneButton', 'strong');
        }), this._waitForTableFormatButtons(tableFormatButtonId));
    };
    RTEWebPart.prototype.AddTaskToSelectTextInRTE = function (startIndex, endIndex) {
        var _this = this;
        TAB.Log.AddTaskComment("Selecting text'" + RTEWebPart.RTE + "'");
        TAB.AddTask(TAB.MakeTask(function () {
            _this._clickOnElement(_this._root, RTEWebPart.RTE);
            var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
            var sel = TAB.Win.window.getSelection();
            var range = TAB.Win.document.createRange();
            var startNode = rte.firstChild;
            range.selectNodeContents(startNode);
            range.setStart(startNode, startIndex);
            range.setEnd(startNode, endIndex);
            sel.removeAllRanges();
            sel.addRange(range);
        }), this._waitForSelection());
    };
    RTEWebPart.prototype.AddTaskToAddTextInRTE = function (text) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Waiting for RTE webpart to finish rendering in edit mode');
        }), this._waitForTextInRTE());
        this.AddTaskToClickOnRTE();
        TAB.AddTask(TAB.MakeTask(function () {
            var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
            TAB.SetTextContent(rte, text);
            // Setting textContent programmatically won't fire change event of CKEditor.
            // While user typing can file the event successfully.
            TAB.Log.Comment('Fire change events to make sure text content got serialized');
            var ckeditorInstances = TAB.Win.window.CKEDITOR.instances;
            Object.keys(ckeditorInstances).forEach(function (key) {
                try {
                    ckeditorInstances[key].fire('change');
                    TAB.Log.Comment('Change event fired');
                }
                catch (error) {
                    TAB.Log.Comment('There might be some instances left on previous pages, but we do not want to fail'
                        + ' the tab test since we will check the serialized data');
                    TAB.Log.Comment("Error Message: " + error.message);
                }
            });
        }), TAB.AndWaiters(this._waitForText(text, RTEWebPart.RTE), _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].WaitForPageSave()));
    };
    RTEWebPart.prototype.AddTaskToCreateLink = function (operation, text, displayText, buttonAutomationId, isPropertyPaneButton) {
        var _this = this;
        var actionButtonAutomationId;
        var LinkTextFieldAutomationId;
        var displayTextFieldAutomationId;
        actionButtonAutomationId = "pagePicker" + RTELinkDialogOperation[operation] + "Button";
        LinkTextFieldAutomationId = 'pagePickerUrlTextField';
        displayTextFieldAutomationId = 'pagePickerTitleTextField';
        TAB.Log.AddTaskComment("Creating a link by clicking on '" + buttonAutomationId + "' and click on '" + actionButtonAutomationId + "'");
        TAB.AddTask(TAB.MakeTask(function () {
            if (!isPropertyPaneButton) {
                _this._clickOnElement(_this._toolbar, buttonAutomationId);
            }
            else {
                _this._clickOnElement(_this._propertyPane, buttonAutomationId);
            }
        }), TAB.AndWaiters(this._waitForElement(actionButtonAutomationId), this._waitForElement(LinkTextFieldAutomationId)));
        TAB.AddTask(TAB.MakeTask(function () {
            var textField = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, LinkTextFieldAutomationId)[0];
            textField.focus();
            textField.value = text;
            Object(_Utilities_ReactTriggerChange__WEBPACK_IMPORTED_MODULE_2__["ReactTriggerChange"])(textField);
            var displayTextField = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, displayTextFieldAutomationId)[0];
            displayTextField.value = displayText;
            var element = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, actionButtonAutomationId)[0];
            TAB.ClickElement(element);
        }), this._waitForDialogToClose(actionButtonAutomationId));
    };
    RTEWebPart.prototype.ensureContentSaved = function (expectedInnerHTML, shouldRemoveWhiteSpace) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
                var innerHTML = shouldRemoveWhiteSpace ? rte.innerHTML.replace(/\s/g, '') : rte.innerHTML.trim();
                return innerHTML === expectedInnerHTML;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype.AddTaskPasteTextInRTE = function (pastedData, expectedData) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
            var dataTransfer = new TAB.Win.window.DataTransfer;
            var pasteEvent = new TAB.Win.window.ClipboardEvent('paste', { clipboardData: dataTransfer });
            pasteEvent.clipboardData.setData('text/html', pastedData);
            var mockData = {
                dataValue: pastedData,
                type: 'html',
                method: 'paste',
                dataTransfer: dataTransfer
            };
            Object.defineProperty(pasteEvent.constructor.prototype, 'data', { value: mockData });
            rte.dispatchEvent(pasteEvent);
        }), TAB.MakeWaiter(function () {
            try {
                var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
                return rte.innerHTML === expectedData;
            }
            catch (e) {
                return false;
            }
        }));
    };
    RTEWebPart.prototype.AddTaskAddLinkUsingInlinePagePicker = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Opening page picker");
            var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
            TAB.ClickElement(rte);
            TAB.FireKeyboardEvent(rte, 'keyup', 219 /** KeyCode for Open Bracket */);
        }), this._waitForInLinePagePicker());
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Pressing enter on an inline page picker suggestion");
            var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
            TAB.FireKeyboardEvent(rte, 'keydown', 13 /** KeyCode for Enter */);
        }), TAB.MakeWaiter(function () {
            try {
                var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
                return TAB.GetElements(rte, TAB.searchBy.customQuery, "a[data-sprte-link]");
            }
            catch (error) {
                return false;
            }
        }));
    };
    Object.defineProperty(RTEWebPart.prototype, "_toolbar", {
        get: function () {
            try {
                return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(this._root, RTEWebPart.FormattingBar)[0];
            }
            catch (e) {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    RTEWebPart.prototype._colorItem = function (colorPickerAutomationId) {
        try {
            var colorPicker = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, colorPickerAutomationId)[0];
            var colorPickerItem = colorPicker.getElementsByTagName('td')[0];
            var colors = colorPickerItem.getElementsByTagName('button');
            return colors;
        }
        catch (e) {
            return undefined;
        }
    };
    Object.defineProperty(RTEWebPart.prototype, "_propertyPane", {
        get: function () {
            try {
                return TAB.GetElement(TAB.Win, TAB.searchBy.id, RTEWebPart.PropertyPane);
            }
            catch (e) {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    RTEWebPart.prototype._waitForInLinePagePicker = function () {
        return TAB.MakeWaiter(function () {
            try {
                return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, RTEWebPart.InLinePagePicker).length;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForTextInRTE = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                return TAB.ElementExists(_this._root, TAB.searchBy.hasClassName, 'cke_editable');
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForDialogToClose = function (button) {
        return TAB.MakeWaiter(function () {
            try {
                var elem = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, button).length;
                return elem === 0;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForAppliedFormat = function (value) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
                return rte.innerHTML.indexOf(value) >= 0 || rte.innerHTML === value;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForAppliedStyle = function (style) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
                var styleQuery = "[style='" + style + "']";
                var styleElement = TAB.GetElements(rte, TAB.searchBy.customQuery, styleQuery).length;
                return styleElement > 0;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForColorPickerButton = function (colorPickerAutomationId) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var colors = _this._colorItem(colorPickerAutomationId);
                return colors && colors.length > 0;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForPropertyPaneDropDown = function () {
        return TAB.MakeWaiter(function () {
            try {
                var dropDown = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'ms-Dropdown-callout');
                var buttons = TAB.GetElements(dropDown, TAB.searchBy.tag, 'BUTTON');
                return buttons.length > 0;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForTableFormat = function (tagName, numberOfTableTags) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
                return rte.getElementsByTagName(tagName).length === numberOfTableTags;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForFormattingBar = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var elem = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.FormattingBar).length;
                return elem > 0;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForSelection = function () {
        return TAB.MakeWaiter(function () {
            try {
                var sel = TAB.Win.window.getSelection();
                return sel.rangeCount > 0;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForElement = function (automationId) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var customQuery = "[data-automation-id='" + automationId + "']";
                return Boolean(_this._getElementsByCustomQuery(customQuery));
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForElementWithCustomQuery = function (customQuery, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        return TAB.MakeWaiter(function () {
            try {
                return TAB.GetElements(searchObj, TAB.searchBy.customQuery, customQuery);
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._getElementsByCustomQuery = function (customQuery, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.GetElements(searchObj, TAB.searchBy.customQuery, customQuery);
        }
        catch (e) {
            return undefined;
        }
    };
    RTEWebPart.prototype._waitForText = function (text, automationId) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, automationId)[0];
                return rte.innerHTML === text;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForTableFormatButtons = function (id) {
        return TAB.MakeWaiter(function () {
            try {
                var elements = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(TAB.Win, id);
                return elements.length > 0;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForCssClass = function (cssClass) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
                var styleQuery = "[class='" + cssClass + "']";
                var styleElement = TAB.GetElements(rte, TAB.searchBy.customQuery, styleQuery).length;
                return styleElement > 0;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._waitForTableStyle = function (cssClass) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            try {
                var rte = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(_this._root, RTEWebPart.RTE)[0];
                var table = rte.getElementsByTagName('table')[0];
                return table.className.indexOf(cssClass) !== -1 ||
                    table.parentElement.className.indexOf(cssClass) !== -1;
            }
            catch (error) {
                return false;
            }
        });
    };
    RTEWebPart.prototype._clickOnElement = function (root, automationId) {
        try {
            var element = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(root, automationId)[0];
            TAB.ClickElement(element);
        }
        catch (error) {
            /* No action required */
        }
    };
    RTEWebPart.RTE = 'textBox';
    RTEWebPart.FormattingBar = 'toolbar';
    RTEWebPart.PropertyPane = 'spPropertyPaneContainer';
    RTEWebPart.CKEditorSelector = 'div.cke_editable.cke_editable_inline.cke_contents_ltr.cke_show_borders';
    RTEWebPart.InLinePagePicker = 'inLinePagePicker';
    return RTEWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "mcqG":
/*!*****************************************!*\
  !*** ./lib/SPTaskLib/Pages/MegaMenu.js ***!
  \*****************************************/
/*! exports provided: MegaMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MegaMenu", function() { return MegaMenu; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _TeamSitePage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TeamSitePage */ "UjPA");


/**
 * @public
 */
var MegaMenu = /** @class */ (function () {
    function MegaMenu() {
    }
    MegaMenu.AddTaskLaunchChangeTheLookPanel = function () {
        TAB.Log.AddTaskComment('Launching ChangeTheLookPanel...');
        MegaMenu.AddTaskWaitForSettingsMenuIcon();
        MegaMenu.AddTaskOpenSettingsMenu();
        MegaMenu.AddTaskReopenSettingsMenuIfNeeded();
        TAB.AddTask(TAB.MakeTask(function () {
            // 2 different settings menu options while the new settings menu rolls out
            if (MegaMenu.FlexSettingsMenuOpen()) {
                TAB.Log.AddTaskComment('AddTaskLaunchChangeTheLookPanel: Flex menu is open');
                var linksSection = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'O365_Settings_navbardatalinks');
                var links = TAB.GetElements(linksSection, TAB.searchBy.tag, 'a');
                var ctlLink_1 = undefined;
                links.forEach(function (link) {
                    if (link.href.indexOf('_spLaunchChangeTheLookPanel') !== -1) {
                        ctlLink_1 = link;
                    }
                });
                TAB.ClickElement(ctlLink_1);
            }
            else {
                TAB.Log.AddTaskComment('AddTaskLaunchChangeTheLookPanel: Flex menu is not open');
                var changeTheLookButton = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'O365_SubLink_CHANGE_THE_LOOK');
                TAB.ClickElement(changeTheLookButton);
            }
        }), MegaMenu.WaitForCTLPanel());
        TAB.Log.AddTaskPass('ChangeTheLookPanel was successfully launched.');
    };
    MegaMenu.AddTaskEnableMegaMenu = function () {
        MegaMenu.AddTaskLaunchChangeTheLookPanel();
        MegaMenu.AddTaskOpenNavigationOptions();
        MegaMenu.AddTaskClickMegaMenuOption();
        MegaMenu.AddTaskClickCTLPanelApplyButton();
        MegaMenu.AddTaskCloseChangeTheLookPanel();
        MegaMenu.AddTaskCloseSettingsPanel();
    };
    MegaMenu.AddTaskEnableCascadingMenu = function () {
        MegaMenu.AddTaskLaunchChangeTheLookPanel();
        MegaMenu.AddTaskOpenNavigationOptions();
        MegaMenu.AddTaskClickCascadingMenuOption();
        MegaMenu.AddTaskClickCTLPanelApplyButton();
        MegaMenu.AddTaskCloseChangeTheLookPanel();
        MegaMenu.AddTaskCloseSettingsPanel();
    };
    MegaMenu.AddTaskOpenNavigationOptions = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Expanding navigation options');
            TAB.ClickElement(MegaMenu.getNavigationHeaderButton());
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-ChoiceFieldGroup');
        }));
    };
    MegaMenu.AddTaskClickMegaMenuOption = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking on the mega menu option');
            var megaMenuOption = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-ChoiceField')[0];
            var button = TAB.GetElement(megaMenuOption, TAB.searchBy.tag, 'input');
            TAB.ClickElement(button);
        }), undefined);
    };
    MegaMenu.AddTaskClickCascadingMenuOption = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking on the cascading menu option');
            var cascadingMenuOption = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-ChoiceField')[1];
            var button = TAB.GetElement(cascadingMenuOption, TAB.searchBy.tag, 'input');
            TAB.ClickElement(button);
        }), undefined);
    };
    MegaMenu.AddTaskClickCTLPanelApplyButton = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking the apply button on the change the look panel');
            var ctlApplyButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='changethelookpanel-savebutton']");
            TAB.ClickElement(ctlApplyButton);
        }), undefined);
    };
    MegaMenu.AddTaskCloseChangeTheLookPanel = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Closing change the look panel');
            TAB.ClickElement(MegaMenu.getPanelCloseButton());
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'sp-ChangeTheLookPanel-section');
        }));
    };
    MegaMenu.AddTaskCloseSettingsPanel = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            if (MegaMenu.FlexSettingsMenuOpen()) {
                var closeButton = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'flexPaneCloseButton');
                TAB.ClickElement(closeButton);
            }
        }), TAB.MakeWaiter(function () {
            return !MegaMenu.FlexSettingsMenuOpen();
        }));
    };
    MegaMenu.AddTaskOpenMegaMenu = function (navNodeIndex) {
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.className, 'ms-HorizontalNavItems');
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Hovering over a nav item to expand the mega menu');
            var navItem = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-HorizontalNavItem-link')[navNodeIndex];
            var eventObj = TAB.Win.document.createEvent('Events');
            eventObj.initEvent('mouseover', true, false);
            navItem.dispatchEvent(eventObj);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-MegaMenu-Callout');
        }));
    };
    MegaMenu.AddTaskOpenCascadingMenu = function (navNodeIndex) {
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.className, 'ms-HorizontalNavItems');
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Hovering over a nav item to expand the cascading menu');
            var navItem = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-HorizontalNavItem-link')[navNodeIndex];
            var eventObj = TAB.Win.document.createEvent('Events');
            eventObj.initEvent('mouseover', true, false);
            navItem.dispatchEvent(eventObj);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu-list');
        }));
    };
    MegaMenu.AddTaskGetNavigationLinks = function (siteUrl, navResult) {
        TAB.Log.AddTaskComment('Getting nav links');
        var targetUrl = siteUrl + "/_api/navigation/MenuState";
        var result = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendGetRequest(siteUrl, targetUrl, result);
        TAB.AddTask(TAB.MakeTask(function () {
            if (result && result.success && result.retVal) {
                navResult.MenuState = result.retVal;
            }
            else {
                TAB.Log.AddTaskFail('Failed to fetch nav links');
            }
        }));
    };
    MegaMenu.AddTaskAddNavLinks = function (siteUrl, newLink) {
        var result = {};
        MegaMenu.AddTaskGetNavigationLinks(siteUrl, result);
        TAB.Log.AddTaskComment("Adding new nav node(s)");
        TAB.AddTask(TAB.MakeTask(function () {
            var links = result.MenuState && result.MenuState.Nodes;
            TAB.Log.AddTaskComment('First deleting existing nodes');
            if (links && links.length > 0) {
                links.forEach(function (link) { return _TeamSitePage__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"].SetLinkAsDeleted(link); });
            }
            else {
                links = [];
            }
            links.unshift(newLink);
            var postContent = {
                menuState: {
                    SPWebPrefix: result.MenuState && result.MenuState.SPWebPrefix,
                    StartingNodeKey: '1025',
                    Version: new Date().toTimeString(),
                    Nodes: links
                }
            };
            TAB.Log.AddTaskComment('Then adding new nav link');
            MegaMenu._updateNavigationContent(postContent, siteUrl);
            MegaMenu._addTaskReloadPage();
        }));
    };
    MegaMenu.WaitForCTLPanel = function () {
        return TAB.MakeWaiter(function () {
            var sections = MegaMenu.getChangeTheLookPanelSections();
            return sections.length > 0;
        });
    };
    MegaMenu.AddTaskWaitForSettingsMenuIcon = function () {
        TAB.AddTask(undefined, MegaMenu.WaitForSettingsMenuIcon());
    };
    MegaMenu.WaitForSettingsMenuIcon = function () {
        return TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'O365_MainLink_Settings');
        });
    };
    MegaMenu.AddTaskOpenSettingsMenu = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking on the settings panel icon button');
            var settingsButton = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'O365_MainLink_Settings');
            TAB.ClickElement(settingsButton);
        }), MegaMenu.WaitForSettingsMenuOpen());
    };
    MegaMenu.AddTaskReopenSettingsMenuIfNeeded = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Checking whether links are loaded');
            if (!MegaMenu._settingsPanelLinksLoaded()) {
                TAB.Log.AddTaskComment('Links are not loaded. Closing and reopening the panel.');
                MegaMenu.AddTaskCloseSettingsPanel();
                MegaMenu.AddTaskOpenSettingsMenu();
            }
        }));
    };
    MegaMenu.WaitForSettingsMenuOpen = function () {
        return TAB.MakeWaiter(function () {
            return MegaMenu.FlexSettingsMenuOpen() || MegaMenu.ContextSettingsMenuOpen();
        });
    };
    // Old settings menu
    MegaMenu.ContextSettingsMenuOpen = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'o365cs-nav-contextMenu');
    };
    // New settings menu
    MegaMenu.FlexSettingsMenuOpen = function () {
        return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'O365fpcontainerid');
    };
    MegaMenu._settingsPanelLinksLoaded = function () {
        var pane = undefined;
        if (MegaMenu.FlexSettingsMenuOpen()) {
            TAB.Log.AddTaskComment('Check if links loaded: Flex menu is open');
            var flexPane = TAB.GetElements(TAB.Win, TAB.searchBy.id, 'O365fpcontainerid');
            if (flexPane.length > 0) {
                pane = flexPane[0];
            }
        }
        else {
            TAB.Log.AddTaskComment('Check if links loaded: Flex menu is not open');
            var contextPane = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'o365cs-nav-contextMenu');
            if (contextPane.length > 0) {
                pane = contextPane[0];
            }
        }
        if (!pane) {
            return false;
        }
        var links = TAB.GetElements(pane, TAB.searchBy.tag, 'a');
        if (links.length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    MegaMenu._addTaskReloadPage = function () {
        TAB.AddTask(TAB.ReloadPage(), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'O365_MainLink_Settings');
        }));
    };
    MegaMenu._updateNavigationContent = function (navContent, siteUrl) {
        var targetUrl = siteUrl + '/_api/navigation/SaveMenuState';
        var result = {};
        _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].AddTaskSendPostRequest(siteUrl, targetUrl, JSON.stringify(navContent), result, true /** fetchCanary */);
    };
    MegaMenu.getChangeTheLookPanelSections = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'sp-ChangeTheLookPanel-section');
    };
    MegaMenu.getNavigationHeaderButton = function () {
        var panelSections = MegaMenu.getChangeTheLookPanelSections();
        return panelSections[2];
    };
    MegaMenu.getPanelCloseButton = function () {
        try {
            var closeButton = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Panel-closeButton');
            return closeButton;
        }
        catch (error) {
            return undefined;
        }
    };
    return MegaMenu;
}());



/***/ }),

/***/ "mgJ4":
/*!************************************************!*\
  !*** ./lib/SPTaskLib/Controls/YouTubeEmbed.js ***!
  \************************************************/
/*! exports provided: YouTubeEmbed */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YouTubeEmbed", function() { return YouTubeEmbed; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var YouTubeEmbed = /** @class */ (function (_super) {
    __extends(YouTubeEmbed, _super);
    // Create a new YouTube web part.
    function YouTubeEmbed() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].YouTube, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].YouTube.toString()) || this;
    }
    /**
     * Add embed code to the embedCode property pane text field.
     * If video should exist (shouldBeFound), check if embedCode is rendered ('realWebPart' & 'embedCode').
     * Otherwise (!shouldBeFound), check if error message rendered ('errorMessage').
     */
    YouTubeEmbed.prototype.AddTaskTryEmbedCode = function (embedCode, shouldBeFound) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var propertyPane = _this._getPropertyPane();
            var embedCodeTextArea = TAB.GetElement(propertyPane, TAB.searchBy.tag, 'textarea');
            // input url
            embedCodeTextArea.focus();
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(embedCodeTextArea, embedCode);
        }), shouldBeFound
            ? this._waitForVideoToRender()
            : this._waitForErrorMessageToRender());
    };
    /**
     * Wrapper to find some element with class that contains the specified className
     */
    YouTubeEmbed.prototype.WaitForElementWithClassToExist = function (className) {
        // The className is the first class, or the second one. See https://stackoverflow.com/a/8588532/1436671
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[class^=\"" + className + "\"], [class*=\" " + className + "\"]");
    };
    /**
     * Wait until webpart is created (PlaceHolder exists).
     */
    YouTubeEmbed.prototype.WaitForWebPartToExist = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'realWebPart');
    };
    /**
     * Add BaseWebpart to page.
     */
    YouTubeEmbed.prototype.addWebPartToPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        }), this.WaitForWebPartToExist());
        TAB.Log.Comment('Web part added');
    };
    /**
     * Focus on PropertyPane.
     */
    YouTubeEmbed.prototype._getPropertyPane = function () {
        try {
            var propertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'spPropertyPaneContainer');
            return propertyPane;
        }
        catch (e) {
            TAB.Log.Comment('PropertyPane is closed.');
            return undefined;
        }
    };
    YouTubeEmbed.prototype._waitForVideoToRender = function () {
        return this.WaitForElementWithClassToExist('realWebPart') && this.WaitForElementWithClassToExist('embedCode');
    };
    YouTubeEmbed.prototype._waitForErrorMessageToRender = function () {
        return this.WaitForElementWithClassToExist('errorMessage');
    };
    return YouTubeEmbed;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "milH":
/*!*****************************************************!*\
  !*** ./lib/SPTaskLib/Controls/SendByEmailDialog.js ***!
  \*****************************************************/
/*! exports provided: SendByEmailDialog */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendByEmailDialog", function() { return SendByEmailDialog; });
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");



/**
 * @public
 */
var SendByEmailDialog = /** @class */ (function () {
    function SendByEmailDialog() {
    }
    SendByEmailDialog.prototype.AddTaskOpenDialog = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Get the Send by email button');
            var shareButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'shareButton');
            TAB.Log.Comment('Click the Send by email button');
            TAB.ClickElement(shareButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'sharePageByEmail'));
    };
    SendByEmailDialog.prototype.AddTaskAddRecipient = function (name) {
        var peoplePicker;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Input the people name in people picker: " + name);
            peoplePicker = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'sendByEmailDialogPeoplePicker');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_1__["ReactUtil"].TriggerOnChange(peoplePicker, name);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-PeoplePicker-personaContent'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment(' press Enter to select the person');
            TAB.FireKeyboardEvent(peoplePicker, 'keydown', _BaseWebpart__WEBPACK_IMPORTED_MODULE_2__["KeyCodes"].enter);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-PickerPersona-container'));
    };
    SendByEmailDialog.prototype.AddTaskInputMessage = function (message) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Input the message: " + message);
            var messageInput = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'sendByEmailDialogTextField');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_1__["ReactUtil"].TriggerOnChange(messageInput, message);
        }));
    };
    SendByEmailDialog.prototype.AddTaskClickSendButton = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Get the Send button');
            var sendButton = _Next__WEBPACK_IMPORTED_MODULE_0__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'sendByEmailDialogSendButton');
            TAB.Log.Comment('Click the Send button');
            TAB.ClickElement(sendButton);
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'sharePageByEmail');
        }));
    };
    return SendByEmailDialog;
}());



/***/ }),

/***/ "mmJW":
/*!***************************************!*\
  !*** ./lib/SPTaskLib/Pages/Canvas.js ***!
  \***************************************/
/*! exports provided: HintType, Canvas */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HintType", function() { return HintType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return Canvas; });
/* harmony import */ var _TeamSitePage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TeamSitePage */ "UjPA");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _SPFlightUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../SPFlightUtil */ "i6xm");



/**
 * @public
 */
var HintType;
(function (HintType) {
    HintType[HintType["SectionHint"] = 0] = "SectionHint";
    HintType[HintType["WebPartHint"] = 1] = "WebPartHint";
})(HintType || (HintType = {}));
/**
 * @public
 */
var Canvas = /** @class */ (function () {
    function Canvas() {
    }
    Object.defineProperty(Canvas, "toolboxElement", {
        get: function () {
            try {
                return TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"" + Canvas.ToolboxId + "\"]");
            }
            catch (er) {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Canvas, "rootCanvasElement", {
        get: function () {
            try {
                return TAB.GetElement(TAB.Win, TAB.searchBy.className, Canvas.CanvasContentClassName);
            }
            catch (er) {
                return undefined;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Add a web part to canvas.
     * @param webpart - The web part being added to canvas
     * @param options - The options for adding the web part. {@link ICanvasCreateWebPartOptions}
     */
    Canvas.AddTaskCreateWebPart = function (webpart, options) {
        if (options === void 0) { options = {}; }
        var toolboxItemAutomationId = webpart.entryId;
        var zoneIndex = options.zoneIndex || 0;
        var sectionIndex = options.sectionIndex || 0;
        var controlIndex = options.controlIndex || 0;
        var layoutIndex = options.layoutIndex;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                // Wait for a complete edit mode transition.
                return !!Canvas._getSections(layoutIndex, zoneIndex)[sectionIndex];
            }
            catch (er) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            Canvas.AddTaskOpenToolbox(Canvas._getSections(layoutIndex, zoneIndex)[sectionIndex], HintType.WebPartHint, controlIndex);
            // find the web part icon, click on it and wait for +1 web parts show up
            Canvas.AddTaskAddControlFromToolbox('Add Webpart', // comment
            toolboxItemAutomationId, Canvas.CanvasControlId);
            if (!Boolean(options.skipWebPartBind)) {
                Canvas.AddTaskBindWebPart(webpart, true /* isAddingFromToolbox */);
            }
        }));
    };
    /**
     * Add a new zone to the canvas
     * @param layoutName - The name of the layout of the new zone.
     * @param zoneIndex - The index of the zone after it's being added to the canvas.
     * @param isAddDisabled - Whether the zone is disabled. Some tests might click on disabled button intentionally to test the disabling works.
     */
    Canvas.AddTaskCreateZone = function (layoutName, zoneIndex, isAddDisabled) {
        if (zoneIndex === void 0) { zoneIndex = 0; }
        if (isAddDisabled === void 0) { isAddDisabled = false; }
        TAB.AddTask(TAB.MakeTask(function () {
            var sectionToolboxItem = layoutName + 'ToolboxItem';
            Canvas.AddTaskOpenToolbox(Canvas.rootCanvasElement, HintType.SectionHint, zoneIndex);
            // find the section, click on it and wait for +1 sections show up
            Canvas.AddTaskAddControlFromToolbox('Add Section', sectionToolboxItem, Canvas.CanvasZoneId, isAddDisabled);
        }));
    };
    Canvas.AddTaskAddControlFromToolbox = function (comment, automationId, controlType, isAddDisabled) {
        // Wait for the item to show-up since opening toolbox is an async flow.
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                return !!_Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(Canvas.toolboxElement, automationId);
            }
            catch (error) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            var numberOfControlsBefore = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, controlType).length;
            TAB.AddTask(TAB.MakeTask(function () {
                TAB.Log.Comment(comment);
                var toolboxItem = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(Canvas.toolboxElement, automationId);
                TAB.ClickElement(toolboxItem);
            }), Canvas.WaitForNumberOfControls(Canvas.rootCanvasElement, isAddDisabled ? numberOfControlsBefore : numberOfControlsBefore + 1, controlType));
        }));
    };
    /**
     * Open toolbox by clicking the toolbox hint button.
     * @param rootElement - The element where to search for the toolbox hints.
     * @param hintType - The type of the hint button to look for
     * @param index - The index of the button to be clicked
     */
    Canvas.AddTaskOpenToolbox = function (rootElement, hintType, index) {
        if (index === void 0) { index = 0; }
        // Wait for toolbox button to present.
        TAB.AddTask(undefined, Canvas.WaitForWebPartToolboxButton());
        // find the toolbox plus button and click on it
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Open Toolbox');
            var toolboxHintButton = Canvas._getToolBoxHintButtons(rootElement, hintType)[index];
            TAB.ClickElement(toolboxHintButton);
        }));
    };
    Canvas.AddTaskOpenZonePropertyPane = function (zoneIndex) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Open zone property pane');
            var zones = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasZoneId);
            var zoneToolBar = TAB.GetElement(zones[zoneIndex], TAB.searchBy.partialClassName, 'CanvasZoneToolbar');
            var configureButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(zoneToolBar, 'configureButton')[0];
            TAB.ClickElement(configureButton);
        }, TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'showPane')));
    };
    Canvas.AddTaskDeleteZone = function (zoneIndex) {
        if (zoneIndex === void 0) { zoneIndex = 0; }
        TAB.AddTask(TAB.MakeTask(function () {
            if (_SPFlightUtil__WEBPACK_IMPORTED_MODULE_2__["SPFlightUtil"].isEnabled(1457 /*WexModernUndoRedo*/)) {
                var numberOfZonesBefore = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasZoneId).length;
                TAB.AddTask(TAB.MakeTask(function () {
                    TAB.Log.Comment('Click delete button on zone toolbar');
                    var zones = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasZoneId);
                    var zoneToolBar = TAB.GetElement(zones[zoneIndex], TAB.searchBy.partialClassName, 'CanvasZoneToolbar');
                    var deleteButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(zoneToolBar, 'deleteButton')[0];
                    TAB.ClickElement(deleteButton);
                }), Canvas.WaitForNumberOfControls(Canvas.rootCanvasElement, numberOfZonesBefore - 1, Canvas.CanvasZoneId));
            }
            else {
                var numberOfZonesBefore = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasZoneId).length;
                TAB.AddTask(TAB.MakeTask(function () {
                    TAB.Log.Comment('Open delete zone confirmation dialog');
                    var zones = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasZoneId);
                    var zoneToolBar = TAB.GetElement(zones[zoneIndex], TAB.searchBy.partialClassName, 'CanvasZoneToolbar');
                    var deleteButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(zoneToolBar, 'deleteButton')[0];
                    TAB.ClickElement(deleteButton);
                }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='yesButton']"));
                TAB.AddTask(TAB.MakeTask(function () {
                    TAB.Log.Comment('Deleting zone');
                    var confirmButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(TAB.Win, 'yesButton')[0];
                    TAB.ClickElement(confirmButton);
                }), TAB.AndWaiters(Canvas.WaitForNumberOfControls(Canvas.rootCanvasElement, numberOfZonesBefore - 1, Canvas.CanvasZoneId), _TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].WaitForPageSave()));
            }
        }));
    };
    Canvas.AddTaskDeleteWebPart = function (layoutIndex, zoneIndex, sectionIndex, controlIndex) {
        if (layoutIndex === void 0) { layoutIndex = 0; }
        if (zoneIndex === void 0) { zoneIndex = 0; }
        if (sectionIndex === void 0) { sectionIndex = 0; }
        if (controlIndex === void 0) { controlIndex = 0; }
        TAB.AddTask(TAB.MakeTask(function () {
            if (_SPFlightUtil__WEBPACK_IMPORTED_MODULE_2__["SPFlightUtil"].isEnabled(1457 /*WexModernUndoRedo*/)) {
                var numberOfZonesBefore = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasControlId).length;
                TAB.AddTask(TAB.MakeTask(function () {
                    TAB.Log.Comment('Open delete button on web part toolbar');
                    var canvasControl = Canvas.getControlFromIndex(layoutIndex, zoneIndex, sectionIndex, controlIndex);
                    var webPartToolbar = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(canvasControl, 'canvas-control-toolbar');
                    var deleteButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(webPartToolbar, 'deleteButton');
                    TAB.ClickElement(deleteButton);
                }), Canvas.WaitForNumberOfControls(Canvas.rootCanvasElement, numberOfZonesBefore - 1, Canvas.CanvasControlId));
            }
            else {
                var numberOfZonesBefore = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasControlId).length;
                TAB.AddTask(TAB.MakeTask(function () {
                    TAB.Log.Comment('Open delete web part confirmation dialog');
                    var canvasControl = Canvas.getControlFromIndex(layoutIndex, zoneIndex, sectionIndex, controlIndex);
                    var webPartToolbar = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(canvasControl, 'canvas-control-toolbar');
                    var deleteButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(webPartToolbar, 'deleteButton');
                    TAB.ClickElement(deleteButton);
                }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='yesButton']"));
                TAB.AddTask(TAB.MakeTask(function () {
                    TAB.Log.Comment('Deleting zone');
                    var confirmButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(TAB.Win, 'yesButton')[0];
                    TAB.ClickElement(confirmButton);
                }), TAB.AndWaiters(Canvas.WaitForNumberOfControls(Canvas.rootCanvasElement, numberOfZonesBefore - 1, Canvas.CanvasControlId), _TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].WaitForPageSave()));
            }
        }));
    };
    Canvas.WaitForWebPartToolboxButton = function () {
        return TAB.MakeWaiter(function () {
            var toolboxHintButton = Canvas._getToolBoxHintButtons(Canvas.rootCanvasElement, HintType.WebPartHint);
            return toolboxHintButton.length > 0;
        });
    };
    Canvas.WaitForNumberOfControls = function (rootElement, numberOfControlsExpected, controlDataAutomationId) {
        return TAB.MakeWaiter(function () {
            var numberOfControls = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(rootElement, controlDataAutomationId).length;
            return numberOfControls === numberOfControlsExpected;
        });
    };
    Canvas.AddTaskBindWebPart = function (webpart, isAddingFromToolbox) {
        // find the newest added webpart and bind here! Create FilePicker Object if needed
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Bind webpart control');
            var root = Canvas._getSelectedWebpartRoot();
            webpart.SetWebpartRoot(root, isAddingFromToolbox);
            Canvas.SelectedWebpart = webpart;
        }), TAB.MakeWaiter(function () {
            try {
                return !isAddingFromToolbox || Canvas.SelectedWebpart.IsWebpartReady();
            }
            catch (error) {
                return false;
            }
        }));
    };
    Canvas.AddTaskChangeZoneLayout = function (zoneIndex, layoutOptionIndex, expectedSections) {
        var zones = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasZoneId);
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Change zone layout');
            var choiceGroupElements = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-ChoiceField-input');
            TAB.ClickElement(choiceGroupElements[layoutOptionIndex]);
        }, Canvas.WaitForNumberOfControls(zones[zoneIndex], expectedSections, Canvas.CanvasSessionId)));
    };
    Canvas.AddTaskReduceZone = function (zoneIndex, sectionIndex, expectedSections, expectedWebParts) {
        var sections = Canvas._getSections(0, zoneIndex);
        TAB.AddTask(TAB.MakeTask(function () {
            Canvas.AddTaskChangeZoneLayout(zoneIndex, sectionIndex, expectedSections);
        }, Canvas.WaitForNumberOfControls(sections[0], expectedWebParts, Canvas.CanvasSessionId)));
    };
    /**
     * Validate the number of zones, sections and controls in canvas.
     * @param expectedNumberOfZones - The expected number of zones within canvas.
     * @param expectedNumberOfSectionsPerZone - The expected number of sections in each zone following the order of zones.
     * @param expectedNumberOfControlsPerSection - The expected number of controls in each section following the order of all sections in canvas.
     */
    Canvas.AddTaskCanvasContentValidate = function (expectedNumberOfZones, expectedNumberOfSectionsPerZone, expectedNumberOfControlsPerSection) {
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                var allZones = [].slice.call(Canvas._getZones()); // Convert NodeList to Array
                // Excluding empty placeholder zone.
                allZones.pop();
                if (allZones.length !== expectedNumberOfZones) {
                    return false;
                }
                var areAllZonesHaveExpectedNumberOfSections = allZones.every(function (zone, index) {
                    var sections = Canvas._getSections(0, index);
                    return sections.length === expectedNumberOfSectionsPerZone[index];
                });
                if (!areAllZonesHaveExpectedNumberOfSections) {
                    return false;
                }
                var allSections = [].slice.call(Canvas._getSections()); // Convert NodeList to Array
                // Excluding empty placeholder section.
                allSections.pop();
                var areAllSectionsHaveExpectedNumberOfControls = allSections.every(function (section, index) {
                    var controls = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(section, Canvas.CanvasControlId);
                    return controls.length === expectedNumberOfControlsPerSection[index];
                });
                return areAllSectionsHaveExpectedNumberOfControls;
            }
            catch (error) {
                return false;
            }
        }));
    };
    Canvas.AddRestTaskGetCanvasContentJson = function (siteName) {
        TAB.AddTask(TAB.MakeTask(function () {
            var siteUrl = siteName
                ? TAB.Settings.Get('ProductServer') + ("/sites/" + siteName)
                : TAB.Settings.Get('ProductServer');
            var targetUrl = _TeamSitePage__WEBPACK_IMPORTED_MODULE_0__["TeamSitePage"].PageUrl + "?as=json";
            var result = {};
            TAB.Log.Comment('Sending page "?as=json" request to get JSON data of the page.');
            TAB.Log.Comment("Site URL: {" + siteUrl + "}. Page URL: {" + targetUrl + "}");
            _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].AddTaskSendRestRequest(siteUrl, targetUrl, '', result);
            TAB.AddTask(TAB.MakeTask(function () {
                if (result.retVal) {
                    TAB.Log.Comment('Valid response received');
                    Canvas.CanvasContentJson = JSON.parse(result.retVal.page.Content.CanvasContent1);
                }
                else {
                    TAB.Log.AddTaskFail('Failed retrieving CanvasContent1 of current page');
                }
            }));
        }));
    };
    Canvas.AddTaskDropImageFromExternalSources = function () {
        var _this = this;
        // FireMouseEvent is not allowed in Edge due to initMouseEvent deprecation
        // Fix required in TABCore VSO#405141
        if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
            TAB.Log.AddTaskWarning('Fire mouse event is not permitted in Edge.');
            return;
        }
        var blobFileKey = 'dropImageFromExternalSource';
        var dropZoneElementIndex = 'dropZoneControl';
        var imageName = 'logo.jpg';
        var file = TAB[blobFileKey];
        var dragOverX;
        var dragOverY;
        // Create blob image to be dropped
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Create Image Blob');
            Canvas.createBlobFromUrl(blobFileKey, 'https://c.s-microsoft.com/en-us/CMSImages/Microsoft-logo_rgb_gray.jpg?version=1BC84E2E-14C4-6323-7909-D43A63EDAA93', imageName, 'image/jpeg');
        }), TAB.MakeWaiter(function () {
            try {
                file = TAB[blobFileKey];
                return file !== null;
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            // Get a handle on the dragZone used to drop image
            var rteControl = Canvas.getControlFromIndex(0, 0, 0, 0);
            var rect = rteControl.getBoundingClientRect();
            dragOverX = Math.round(rect.left + rteControl.clientWidth / 5);
            dragOverY = Math.round(rect.top + rteControl.clientHeight / 5);
            TAB.Log.Comment('Firing DragOver event');
            _this.triggerDragOverDropZoneEvent(rteControl, file, dragOverX, dragOverY, dropZoneElementIndex);
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            var dragZoneControl = TAB[dropZoneElementIndex];
            TAB.Log.Comment('Firing Drop event');
            _this.dropFileFromExternalSourceOnElement(dragZoneControl, file, dragOverX, dragOverY);
        }), TAB.MakeWaiter(function () {
            try {
                var newImageWebPart = void 0;
                var isImagePresent = false;
                newImageWebPart = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'imageFrame')[0];
                if (newImageWebPart !== undefined) {
                    if (Canvas._getImageUrl(newImageWebPart).indexOf(imageName) > 0) {
                        isImagePresent = true;
                    }
                }
                return isImagePresent;
            }
            catch (e) {
                return false;
            }
        }));
    };
    /**
     * Drag and drop a web part to another position
     * @param dragIndices - The position of the control being dragged formatted as [zoneIndex, sectionIndex, controlIndex, layoutIndex].
     * @param dropIndices - The position of the control after being dropped formatted as [zoneIndex, sectionIndex, controlIndex, layoutIndex].
     * @param dragElementDataAutomationId - The data automation id of the element inside the drag item, used to whether the action succeeds.
     */
    Canvas.AddTaskDragAndDropWebPart = function (dragIndices, dropIndices, dragElementDataAutomationId) {
        Canvas._addTaskDragAndDropCore(function () {
            var dragItem = Canvas.getControlFromIndex(dragIndices[0], dragIndices[1], dragIndices[2], dragIndices[3]);
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(dragItem, 'moveButton');
        }, function () { return Canvas.getControlFromIndex(dragIndices[0], dragIndices[1], dragIndices[2], dragIndices[3]); }, // dragItem
        function () { return Canvas.getControlFromIndex(dropIndices[0], dropIndices[1], dropIndices[2], dropIndices[3]); }, // dropItem
        function () {
            return dropIndices[3] === Canvas._getControls(dropIndices[0], dropIndices[1], dropIndices[2]).length || // Drop after last item
                // or drop will change the position of the dropped item.
                (dragIndices[0] === dropIndices[0] && dragIndices[1] === dropIndices[1] && dragIndices[2] === dropIndices[2] && dragIndices[3] < dropIndices[3]);
        }, dragElementDataAutomationId);
    };
    /**
     * Drag and drop a web part to another position
     * @param dragIndex - The index of the zone being dragged.
     * @param dropIndex - The index of the zone after being dropped.
     * @param dragElementDataAutomationId - The data automation id of the element inside the drag item, used to whether the action succeeds.
     */
    Canvas.AddTaskDragAndDropZone = function (dragIndex, dropIndex, dragElementDataAutomationId) {
        Canvas._addTaskDragAndDropCore(function () {
            var dragItem = Canvas._getZones()[dragIndex];
            return TAB.GetElement(dragItem, TAB.searchBy.customQuery, "[data-drag-handle='ZoneHandle']");
        }, function () { return Canvas._getZones()[dragIndex]; }, // dragItem
        function () { return Canvas._getZones()[dropIndex]; }, // dropItem
        function () { return dropIndex === Canvas._getZones().length || dragIndex < dropIndex; }, dragElementDataAutomationId);
    };
    Canvas.AddTaskChangeEmphasis = function (emphasis, zoneIndex) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Change zone emphasis');
            var buttonElements = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(TAB.Win, emphasis + "BackgroundColorButton");
            TAB.ClickElement(buttonElements[0]);
        }), this.getEmphasisWaiter(zoneIndex));
    };
    Canvas.getEmphasisWaiter = function (zoneId) {
        return TAB.MakeWaiter(function () {
            try {
                var zones = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasZoneId);
                return zones[zoneId].parentElement.classList.contains('CanvasZoneContainerEmphasis');
            }
            catch (e) {
                return undefined;
            }
        });
    };
    Canvas.WaitForPropertyPaneChoiceGroupButtons = function () {
        return TAB.MakeWaiter(function () {
            try {
                var choiceGroupElements = TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'ms-ChoiceField-input');
                return choiceGroupElements && choiceGroupElements.length > 0;
            }
            catch (e) {
                return undefined;
            }
        });
    };
    Canvas.getControlFromIndex = function (layoutIndex, zoneIndex, sectionIndex, controlIndex) {
        var controls = Canvas._getControls(layoutIndex, zoneIndex, sectionIndex);
        return controls[controlIndex];
    };
    /**
     * The core logic of drag and drop elements implemented by DragZone.
     * @param getDragHandle - Callback to get the drag handler of the drag item. E.g. move button
     * @param getDragItem - Callback to get the item being dragged
     * @param getDropItem - Callback to get the item being dropped
     * @param getShouldDropAfter - Whether should drop after the drop item. It's true when dropping after the last item,
     *  or in the case where the position of dropped item will be changed after the action.
     *  E.g. drag [0, 0, 0, 0] to [0, 0, 1, 0] is actually dragging first item AFTER the second item.
     * @param dragElementDataAutomationId - The data automation id of the element inside the drag item, used to whether the action succeeds.
     */
    Canvas._addTaskDragAndDropCore = function (getDragHandle, getDragItem, getDropItem, getShouldDropAfter, dragElementDataAutomationId) {
        // FireMouseEvent is not allowed in Edge due to initMouseEvent deprecation
        // Fix required in TABCore VSO#405141
        if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
            TAB.Log.AddTaskWarning('Fire mouse event is not permitted in Edge.');
            return;
        }
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Click on drag item to make sure toolbar shows');
            var dragItem = getDragItem();
            dragItem.click();
        }));
        var moveButton, dropItem;
        var itemOffset, targetItemOffset;
        var dropX, dropY;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Dragging element that contains an element with dataAutomationId " + dragElementDataAutomationId);
            moveButton = getDragHandle();
            dropItem = getDropItem();
            itemOffset = TAB.GetElementOffset(moveButton);
            targetItemOffset = TAB.GetElementOffset(dropItem);
            var dragX = Math.round(itemOffset.left + moveButton.clientWidth / 2);
            var dragY = Math.round(itemOffset.top + moveButton.clientHeight / 2);
            TAB.FireMouseEvent(moveButton, TAB.mouseEvent.mouseDown, new TAB.MouseEventData(dragX, dragY));
        }));
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                dropItem = getDropItem();
                targetItemOffset = TAB.GetElementOffset(dropItem);
                dropX = Math.round(targetItemOffset.left + dropItem.clientWidth / 2);
                dropY = getShouldDropAfter()
                    ? Math.round(targetItemOffset.top) + dropItem.clientHeight * 3 / 4
                    : Math.round(targetItemOffset.top) + dropItem.clientHeight / 4;
                TAB.FireMouseEvent(moveButton, TAB.mouseEvent.mouseMove, new TAB.MouseEventData(dropX, dropY));
                // Wait the drop mark.
                return !!TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'dropLocation');
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () { return TAB.FireMouseEvent(moveButton, TAB.mouseEvent.mouseUp, new TAB.MouseEventData(dropX, dropY)); }), undefined);
        TAB.MakeWaiter(function () {
            try {
                var droppedControl = getDropItem();
                var droppedWebPart = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(droppedControl, dragElementDataAutomationId);
                return !!droppedWebPart;
            }
            catch (e) {
                return false;
            }
        });
    };
    Canvas._getToolBoxHintButtons = function (rootElement, hintType) {
        try {
            var dataAutomationId = hintType === HintType.WebPartHint ? 'toolboxHint-webPart' : 'toolboxHint-zone';
            var tooBoxHintButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(rootElement, dataAutomationId);
            return tooBoxHintButton;
        }
        catch (e) {
            return [];
        }
    };
    Canvas._getSelectedWebpartRoot = function () {
        try {
            var selectedWebpart = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ControlZone--selected');
            return selectedWebpart;
        }
        catch (e) {
            return undefined;
        }
    };
    Canvas._getLayouts = function () {
        return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasLayoutId);
    };
    /**
     * Get all canvas zones in the canvas.
     */
    Canvas._getZones = function (layoutIndex) {
        var rootElement = Canvas.rootCanvasElement;
        if (layoutIndex) {
            var canvasLayout = Canvas._getLayouts()[layoutIndex];
            rootElement = canvasLayout;
        }
        return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(rootElement, Canvas.CanvasZoneId);
    };
    /**
     * Get all sections in the given canvas zone.
     * It returns all sections in the canvas if zoneIndex is undefined.
     *
     * @param zoneIndex - The index of the zone where to get the sections.
     */
    Canvas._getSections = function (layoutIndex, zoneIndex) {
        var zones = Canvas._getZones(layoutIndex);
        if (zoneIndex === undefined) {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasSessionId);
        }
        else {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(zones[zoneIndex], Canvas.CanvasSessionId);
        }
    };
    /**
     * Get all controls in the given section.
     * It returns all controls in the zone if sectionIndex is undefined.
     * It returns all controls in the canvas if zoneIndex is undefined.
     *
     * @param zoneIndex - The index of the zone where to get the controls. When undefined, all controls within canvas are returned
     * @param sectionIndex - The index of the section where to get the controls. When undefined, all controls within given zone are returned.
     */
    Canvas._getControls = function (layoutIndex, zoneIndex, sectionIndex) {
        if (zoneIndex === undefined) {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(Canvas.rootCanvasElement, Canvas.CanvasControlId);
        }
        else if (sectionIndex === undefined) {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(this._getZones(layoutIndex)[zoneIndex], Canvas.CanvasControlId);
        }
        else {
            return _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(this._getSections(layoutIndex, zoneIndex)[sectionIndex], Canvas.CanvasControlId);
        }
    };
    Canvas.createBlobFromUrl = function (blobFileKey, // Result will be saved on TAB[blobFileKey].
    url, filename, fileType) {
        // Create a XMLHttpRequest to transform the image from URL to array of data
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';
        // Ensure the request finishes
        TAB.AddTask(TAB.MakeTask(function () {
            xhr.send();
        }), TAB.MakeWaiter(function () {
            try {
                return xhr.response !== null;
            }
            catch (e) {
                return false;
            }
        }));
        // Construct the Blob from the array of data
        TAB.AddTask(TAB.MakeTask(function () {
            var parts = [new Uint8Array(xhr.response)];
            var propertyBag = {
                type: fileType
            };
            TAB.Log.AddTaskPass('Blob created');
            // File needs to be saved to TAB global variable since it is
            // generated in async fashion. This can be accessed from any TAB test
            // with the same key.
            TAB[blobFileKey] = new TAB.Win.window.File(parts, filename, propertyBag);
        }), TAB.MakeWaiter(function () {
            try {
                return TAB[blobFileKey] !== null;
            }
            catch (e) {
                return false;
            }
        }));
    };
    Canvas.triggerDragOverDropZoneEvent = function (element, file, dragOverX, dragOverY, dropZoneElementIndex) {
        TAB.AddTask(TAB.MakeTask(function () {
            // Create event
            var event = TAB.Win.document.createEvent('DragEvent');
            event.initMouseEvent('dragover', true /* bubble */, true /* cancelable */, TAB.Win.window, 1, /* detailArg */ 1, 1, dragOverX, dragOverY, /* coordinates */ false, false, false, false, /* modifier keys */ 0, /* left */ element /* relatedTarget */);
            // Add file to dataTransfer of event
            event = Canvas.createFileDataTransferForEvent(event, file);
            // Trigger the event
            TAB.Log.Comment('dispatch dragOver event');
            element.dispatchEvent(event);
        }), TAB.MakeWaiter(function () {
            try {
                // Wait till the mark of drop place is changed.
                TAB[dropZoneElementIndex] = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'dropLocation');
                return TAB[dropZoneElementIndex] !== undefined;
            }
            catch (e) {
                return false;
            }
        }));
    };
    Canvas.dropFileFromExternalSourceOnElement = function (element, file, dragOverX, dragOverY) {
        if (element.dispatchEvent) {
            // Create event
            var event_1 = TAB.Win.document.createEvent('DragEvent');
            event_1.initMouseEvent('drop', true /* bubble */, true /* cancelable */, TAB.Win.window, 1, /* detailArg */ 1, 1, dragOverX, dragOverY, /* coordinates */ false, false, false, false, /* modifier keys */ 0, /* left */ element /* relatedTarget */);
            // Add file to dataTransfer of event
            event_1 = Canvas.createFileDataTransferForEvent(event_1, file);
            // Trigger the event
            TAB.Log.Comment('dispatch drop event');
            element.dispatchEvent(event_1);
        }
    };
    Canvas.createFileDataTransferForEvent = function (event, file) {
        // Create dataTransfer
        var dataTransfer = new TAB.Win.window.DataTransfer;
        var mockDataTransfer = {
            dropEffect: 'all',
            effectAllowed: 'all',
            files: [file],
            items: dataTransfer.items,
            types: ['Files'],
            getData: function () { return file; }
        };
        TAB.Log.Comment('Append File to the event');
        // dataTransfer can only be assigned forcibly
        Object.defineProperty(event.constructor.prototype, 'dataTransfer', { value: mockDataTransfer });
        event.dataTransfer.items.add(file);
        return event;
    };
    Canvas._getImageUrl = function (image) {
        return TAB.GetElement(image, TAB.searchBy.tag, 'img').getAttribute('data-sp-originalimgsrc');
    };
    Canvas.Webparts = [];
    Canvas.CanvasContentClassName = 'CanvasComponent';
    Canvas.CanvasZoneId = 'CanvasZone';
    Canvas.CanvasSessionId = 'CanvasSection';
    Canvas.CanvasControlId = 'ControlZone';
    Canvas.CanvasLayoutId = 'CanvasLayout';
    Canvas.ToolboxId = 'toolbox-callout';
    return Canvas;
}());



/***/ }),

/***/ "mutv":
/*!**************************************************!*\
  !*** ./lib/SPTaskLib/Controls/BingMapWebpart.js ***!
  \**************************************************/
/*! exports provided: BingMapWebpart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BingMapWebpart", function() { return BingMapWebpart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var BingMapWebpart = /** @class */ (function (_super) {
    __extends(BingMapWebpart, _super);
    function BingMapWebpart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].BingMap, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].BingMap.toString()) || this;
    }
    BingMapWebpart.prototype.AddTaskAddOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _this.AddTaskSetupNewPage();
            _this.AddTaskAssertWebPartNotExist();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class*="bingMapWrapper"]');
        }));
    };
    BingMapWebpart.prototype.AddTaskInputAddress = function (address) {
        TAB.MakeTask(function () {
            var addressInput = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[id*="searchBoxContainer"] input');
            TAB.Log.AddTaskComment('Input address.');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(addressInput, address);
        })
            .WaitFor(undefined);
    };
    BingMapWebpart.prototype.AddTaskTriggerSearch = function () {
        TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Search address.');
            var searchButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[id*="searchBoxContainer"] button');
            searchButton.click();
        })
            .WaitFor(TAB.MakeWaiter(function () { return (TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'virtualPushPin') &&
            TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class*="propertyPanePageContent"] [class*="ms-Toggle"]')); }));
    };
    BingMapWebpart.prototype.AddTaskSetPushPinLabel = function (label) {
        TAB.MakeTask(function () {
            var labelInput = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class*="propertyPaneGroupContent"] input');
            TAB.Log.AddTaskComment('Set push pin label.');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(labelInput, label);
        })
            .WaitFor(undefined);
    };
    BingMapWebpart.prototype.AddTaskAssertPushPinLabel = function (label) {
        TAB.MakeTask(function () {
            var labelHeader = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="bingMapPushPinTitle"]');
            if (labelHeader.innerText !== label) {
                throw new Error("Assert pushpin label fail. Expected: " + label + "; actual: " + labelHeader.innerText + ";");
            }
        })
            .WaitFor(undefined);
    };
    BingMapWebpart.prototype.AddTaskAssertWebPartNotExist = function () {
        TAB.MakeTask(function () {
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.leadingId, 'searchBoxContainer')) {
                throw 'Bing Map web part should not exist.';
            }
        })
            .WaitFor(undefined);
    };
    return BingMapWebpart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "mwqp":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! exports provided: TenantAdminHomePage, Cookies, Csom, ExtensionUtil, Group, ListItem, List, Next, PageUtil, MuiSettingsPage, areVectorsEqual, SpaceUtil, PerformancePageUtil, ReactUtil, SPFlightUtil, Site, Web, BaseCollectionWebPart, WebpartType, KeyCodes, FireKeyboardEvent, BaseWebpart, BingMapWebpart, BingNewsWebPart, Carousel, CommandBar, CommandBarItem, ConnectorWebPart, ContextMenu, CreateSitePanelForm, CreateSiteTemplateOption, GroupPrivacyOption, DesignPackageOption, CreateSitePanel, DocumentEmbedWebpart, DynamicDataConsumerWebPart, EmbedWebPart, EmbeddedVideoWebPart, EventPage, EventsWebPart, FieldType, Field, FieldsWebPart, FILE_PICKER_AUTOMATION_ID, FilePickerView, FilePicker, FormsWebPart, GroupCalendarWebPart, GroupMembershipPanel, HeroWebPart, ContentRollupLayout, HighlightedContentWebPart, Layout, ImageSourceType, ImageGalleryWebPart, ImageWebpart, LayoutOption, LinkPreviewWebpart, ListViewWebparWithItemsView, ListViewWebpart, NewsDigest, NewsFilter, NewsLink, NewsPinning, NewsWebPart, PeopleCardLayout, PeopleWebpart, PlannerWebpart, QuickChartWebPart, QuickLinksLayoutId, QuickLinksWebPart, RSSConnectorWebPart, RTELinkDialogOperation, RTEWebPart, SendByEmailDialog, SiteActivityWebPart, SiteInformationPanel, SitePermissionPanel, SitesWebPart, TeamsTabPicker, TitleRegion, TwitterWebPart, upload, dataURItoFile, setFileInput, WeatherWebPart, WorldClockWebPart, YammerConversations, YammerHighlights, YouTubeEmbed, HintType, Canvas, CanvasToolbox, ClassicPage, Comments, CommentsMention, Footer, HomeSite, SPHome, MegaMenu, OrganizationSiteDesign, PageSettingsPanel, PageTemplatesPanel, PromotePage, PropertyPane, Router, SocialBar, SiteDesignId, TeamSitePage, UndoRedo, Workbench, PublishingPageMonitoring, ClientFeatures, PageAnchor, ReactTriggerChange, MemoryTestWebPartType, MemoryTestUtils */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SPTaskLib/Controls */ "iDSo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseCollectionWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["BaseCollectionWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WebpartType", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["WebpartType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "KeyCodes", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["KeyCodes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FireKeyboardEvent", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["FireKeyboardEvent"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BaseWebpart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BingMapWebpart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["BingMapWebpart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BingNewsWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["BingNewsWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Carousel", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["Carousel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CommandBar", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["CommandBar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CommandBarItem", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["CommandBarItem"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ConnectorWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["ConnectorWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContextMenu", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["ContextMenu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateSitePanelForm", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["CreateSitePanelForm"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateSiteTemplateOption", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["CreateSiteTemplateOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupPrivacyOption", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["GroupPrivacyOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DesignPackageOption", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["DesignPackageOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CreateSitePanel", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["CreateSitePanel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DocumentEmbedWebpart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["DocumentEmbedWebpart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DynamicDataConsumerWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["DynamicDataConsumerWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmbedWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["EmbedWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EmbeddedVideoWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["EmbeddedVideoWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventPage", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["EventPage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EventsWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["EventsWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldType", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["FieldType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Field", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["Field"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FieldsWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["FieldsWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FILE_PICKER_AUTOMATION_ID", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["FILE_PICKER_AUTOMATION_ID"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilePickerView", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["FilePickerView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FilePicker", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["FilePicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "FormsWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["FormsWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupCalendarWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["GroupCalendarWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GroupMembershipPanel", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["GroupMembershipPanel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeroWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["HeroWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContentRollupLayout", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["ContentRollupLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HighlightedContentWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["HighlightedContentWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["Layout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageSourceType", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["ImageSourceType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageGalleryWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["ImageGalleryWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ImageWebpart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["ImageWebpart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LayoutOption", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["LayoutOption"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "LinkPreviewWebpart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["LinkPreviewWebpart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListViewWebparWithItemsView", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["ListViewWebparWithItemsView"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListViewWebpart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["ListViewWebpart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsDigest", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["NewsDigest"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsFilter", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["NewsFilter"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsLink", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["NewsLink"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsPinning", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["NewsPinning"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NewsWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["NewsWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PeopleCardLayout", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["PeopleCardLayout"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PeopleWebpart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["PeopleWebpart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PlannerWebpart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["PlannerWebpart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuickChartWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["QuickChartWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuickLinksLayoutId", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["QuickLinksLayoutId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "QuickLinksWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["QuickLinksWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RSSConnectorWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["RSSConnectorWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RTELinkDialogOperation", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["RTELinkDialogOperation"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RTEWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["RTEWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SendByEmailDialog", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["SendByEmailDialog"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SiteActivityWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["SiteActivityWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SiteInformationPanel", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["SiteInformationPanel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SitePermissionPanel", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["SitePermissionPanel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SitesWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["SitesWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeamsTabPicker", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["TeamsTabPicker"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TitleRegion", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["TitleRegion"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TwitterWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["TwitterWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "upload", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["upload"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "dataURItoFile", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["dataURItoFile"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setFileInput", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["setFileInput"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WeatherWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["WeatherWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "WorldClockWebPart", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["WorldClockWebPart"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "YammerConversations", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["YammerConversations"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "YammerHighlights", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["YammerHighlights"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "YouTubeEmbed", function() { return _SPTaskLib_Controls__WEBPACK_IMPORTED_MODULE_0__["YouTubeEmbed"]; });

/* harmony import */ var _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SPTaskLib/Pages */ "JWtQ");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HintType", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["HintType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Canvas", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["Canvas"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CanvasToolbox", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["CanvasToolbox"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClassicPage", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["ClassicPage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Comments", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["Comments"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CommentsMention", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["CommentsMention"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Footer", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["Footer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HomeSite", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["HomeSite"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPHome", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["SPHome"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MegaMenu", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["MegaMenu"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "OrganizationSiteDesign", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["OrganizationSiteDesign"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageSettingsPanel", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["PageSettingsPanel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageTemplatesPanel", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["PageTemplatesPanel"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PromotePage", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["PromotePage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PropertyPane", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["PropertyPane"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["Router"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SocialBar", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["SocialBar"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SiteDesignId", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["SiteDesignId"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TeamSitePage", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["TeamSitePage"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "UndoRedo", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["UndoRedo"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Workbench", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["Workbench"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PublishingPageMonitoring", function() { return _SPTaskLib_Pages__WEBPACK_IMPORTED_MODULE_1__["PublishingPageMonitoring"]; });

/* harmony import */ var _SPTaskLib_Utilities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SPTaskLib/Utilities */ "H50h");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ClientFeatures", function() { return _SPTaskLib_Utilities__WEBPACK_IMPORTED_MODULE_2__["ClientFeatures"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageAnchor", function() { return _SPTaskLib_Utilities__WEBPACK_IMPORTED_MODULE_2__["PageAnchor"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReactTriggerChange", function() { return _SPTaskLib_Utilities__WEBPACK_IMPORTED_MODULE_2__["ReactTriggerChange"]; });

/* harmony import */ var _SPTaskLib_TenantAdmin__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SPTaskLib/TenantAdmin */ "06bY");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TenantAdminHomePage", function() { return _SPTaskLib_TenantAdmin__WEBPACK_IMPORTED_MODULE_3__["TenantAdminHomePage"]; });

/* harmony import */ var _SPTaskLib_MemoryTest__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SPTaskLib/MemoryTest */ "+rIA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryTestWebPartType", function() { return _SPTaskLib_MemoryTest__WEBPACK_IMPORTED_MODULE_4__["MemoryTestWebPartType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MemoryTestUtils", function() { return _SPTaskLib_MemoryTest__WEBPACK_IMPORTED_MODULE_4__["MemoryTestUtils"]; });

/* harmony import */ var _SPTaskLib_CookieUtil__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SPTaskLib/CookieUtil */ "rWka");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cookies", function() { return _SPTaskLib_CookieUtil__WEBPACK_IMPORTED_MODULE_5__["Cookies"]; });

/* harmony import */ var _SPTaskLib_CsomUtil__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SPTaskLib/CsomUtil */ "UXDa");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Csom", function() { return _SPTaskLib_CsomUtil__WEBPACK_IMPORTED_MODULE_6__["Csom"]; });

/* harmony import */ var _SPTaskLib_ExtensionUtil__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SPTaskLib/ExtensionUtil */ "iw6+");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ExtensionUtil", function() { return _SPTaskLib_ExtensionUtil__WEBPACK_IMPORTED_MODULE_7__["ExtensionUtil"]; });

/* harmony import */ var _SPTaskLib_GroupLibrary__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SPTaskLib/GroupLibrary */ "FSRG");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return _SPTaskLib_GroupLibrary__WEBPACK_IMPORTED_MODULE_8__["Group"]; });

/* harmony import */ var _SPTaskLib_ListItemLibrary__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SPTaskLib/ListItemLibrary */ "1A/J");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ListItem", function() { return _SPTaskLib_ListItemLibrary__WEBPACK_IMPORTED_MODULE_9__["ListItem"]; });

/* harmony import */ var _SPTaskLib_ListLibrary__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SPTaskLib/ListLibrary */ "7on5");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "List", function() { return _SPTaskLib_ListLibrary__WEBPACK_IMPORTED_MODULE_10__["List"]; });

/* harmony import */ var _SPTaskLib_Next__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./SPTaskLib/Next */ "BJbA");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Next", function() { return _SPTaskLib_Next__WEBPACK_IMPORTED_MODULE_11__["Next"]; });

/* harmony import */ var _SPTaskLib_PageUtil__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./SPTaskLib/PageUtil */ "jK1H");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PageUtil", function() { return _SPTaskLib_PageUtil__WEBPACK_IMPORTED_MODULE_12__["PageUtil"]; });

/* harmony import */ var _SPTaskLib_MuiSettingsPage__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./SPTaskLib/MuiSettingsPage */ "4VGn");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MuiSettingsPage", function() { return _SPTaskLib_MuiSettingsPage__WEBPACK_IMPORTED_MODULE_13__["MuiSettingsPage"]; });

/* harmony import */ var _SPTaskLib_SpaceUtil__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./SPTaskLib/SpaceUtil */ "IfeM");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "areVectorsEqual", function() { return _SPTaskLib_SpaceUtil__WEBPACK_IMPORTED_MODULE_14__["areVectorsEqual"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SpaceUtil", function() { return _SPTaskLib_SpaceUtil__WEBPACK_IMPORTED_MODULE_14__["SpaceUtil"]; });

/* harmony import */ var _SPTaskLib_PerformancePageUtil__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./SPTaskLib/PerformancePageUtil */ "37hx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PerformancePageUtil", function() { return _SPTaskLib_PerformancePageUtil__WEBPACK_IMPORTED_MODULE_15__["PerformancePageUtil"]; });

/* harmony import */ var _SPTaskLib_ReactUtil__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./SPTaskLib/ReactUtil */ "Qf+y");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ReactUtil", function() { return _SPTaskLib_ReactUtil__WEBPACK_IMPORTED_MODULE_16__["ReactUtil"]; });

/* harmony import */ var _SPTaskLib_SPFlightUtil__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./SPTaskLib/SPFlightUtil */ "i6xm");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SPFlightUtil", function() { return _SPTaskLib_SPFlightUtil__WEBPACK_IMPORTED_MODULE_17__["SPFlightUtil"]; });

/* harmony import */ var _SPTaskLib_SiteLibrary__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./SPTaskLib/SiteLibrary */ "2JS8");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Site", function() { return _SPTaskLib_SiteLibrary__WEBPACK_IMPORTED_MODULE_18__["Site"]; });

/* harmony import */ var _SPTaskLib_WebLibrary__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./SPTaskLib/WebLibrary */ "Ckxo");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Web", function() { return _SPTaskLib_WebLibrary__WEBPACK_IMPORTED_MODULE_19__["Web"]; });

/// <reference path="./typings/tsd.d.ts" />






















/***/ }),

/***/ "pMbQ":
/*!*******************************************************!*\
  !*** ./lib/SPTaskLib/Controls/ImageGalleryWebPart.js ***!
  \*******************************************************/
/*! exports provided: Layout, ImageSourceType, ImageGalleryWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Layout", function() { return Layout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageSourceType", function() { return ImageSourceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImageGalleryWebPart", function() { return ImageGalleryWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





/**
 * @public
 */
var Layout;
(function (Layout) {
    Layout[Layout["Carousel"] = 1] = "Carousel";
    Layout[Layout["Grid"] = 2] = "Grid";
    Layout[Layout["Masonry"] = 3] = "Masonry";
    Layout[Layout["Brick"] = 4] = "Brick";
})(Layout || (Layout = {}));
/**
 * @public
 */
var ImageSourceType;
(function (ImageSourceType) {
    ImageSourceType[ImageSourceType["Curated"] = 1] = "Curated";
    ImageSourceType[ImageSourceType["Dynamic"] = 2] = "Dynamic";
})(ImageSourceType || (ImageSourceType = {}));
/**
 * @public
 */
var ImageGalleryWebPart = /** @class */ (function (_super) {
    __extends(ImageGalleryWebPart, _super);
    function ImageGalleryWebPart() {
        var _this = _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].ImageGallery, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].ImageGallery.toString()) || this;
        _this._imageSourceType = ImageSourceType.Curated;
        _this._layout = Layout.Grid;
        return _this;
    }
    ImageGalleryWebPart._fireMouseEvent = function (type, elem, centerX, centerY) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);
        elem.dispatchEvent(evt);
    };
    Object.defineProperty(ImageGalleryWebPart.prototype, "isCuratedMode", {
        get: function () {
            return this._imageSourceType === ImageSourceType.Curated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ImageGalleryWebPart.prototype, "isDynamicMode", {
        get: function () {
            return this._imageSourceType === ImageSourceType.Dynamic;
        },
        enumerable: true,
        configurable: true
    });
    ImageGalleryWebPart.prototype.AddTaskAddWebPart = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Add ImageGallery web part');
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        }), this._waitForWebPartAndPropertyPaneExist());
    };
    ImageGalleryWebPart.prototype.AddTaskEditItemByIndex = function (index) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var imageItem = _this._getItemByIndex(index);
            var editButton = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(imageItem, 'edit-button');
            if (editButton) {
                TAB.Log.AddTaskPass("Edit button found for item at position " + index);
                TAB.Log.AddTaskComment('click edit button on item');
                TAB.ClickElement(editButton);
            }
            else {
                TAB.Log.AddTaskFail("Edit button not found for item at position " + index);
            }
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, "propertyPanePageContent"));
    };
    /**
     * Click on an image item to launch lightbox.
     * @param index - The position of the item.
     */
    ImageGalleryWebPart.prototype.AddTaskOpenImageLightboxByIndex = function (index) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var clickItem = _this._getItemByIndex(index);
            TAB.Log.AddTaskComment("click item at position " + index);
            TAB.ClickElement(clickItem);
        }), TAB.MakeWaiter(function () {
            try {
                return Boolean(_this._getLightbox(true /* allowFail */));
            }
            catch (e) {
                return false;
            }
        }));
    };
    /**
     * When image lightbox is opened, assert the title to be expected value.
     * @param title - The title of the item that should be shown in lightbox.
     */
    ImageGalleryWebPart.prototype.AddTaskAssertTitleInLightbox = function (title) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            try {
                var lightbox = _this._getLightbox(false /* allowFail */);
                TAB.Log.AddTaskComment('Try to find the title element in image lightbox');
                var titleElement = TAB.GetElement(lightbox, TAB.searchBy.partialClassName, 'title');
                if (titleElement.textContent === title) {
                    TAB.Log.AddTaskPass('Found correct title in image lightbox');
                }
                else {
                    TAB.Log.AddTaskFail("Title in image light box is not expected. Expected: " + title + ". Actual: " + titleElement.textContent);
                }
            }
            catch (e) {
                TAB.Log.AddTaskFail(e);
            }
        }));
    };
    ImageGalleryWebPart.prototype.AddTaskDismissImageLightbox = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Try to find the close button in lightbox');
            var lightbox = _this._getLightbox(false /* allowFail */);
            var closeButton = TAB.GetElement(lightbox, TAB.searchBy.hasClassName, 'ms-PanelAction-close');
            if (closeButton) {
                TAB.Log.AddTaskComment('Click close button to close the lightbox');
                TAB.ClickElement(closeButton);
            }
            else {
                TAB.Log.AddTaskFail('Close button not found');
            }
        }), TAB.MakeWaiter(function () {
            try {
                return !_this._getLightbox(true /* allowFail */);
            }
            catch (e) {
                return false;
            }
        }));
    };
    ImageGalleryWebPart.prototype.AddTaskUpdateTitleInPropertyPane = function (title) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Change title of image gallery item');
            var propertyPane = _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].GetPropertyPane();
            var inputForTitle = TAB.GetElements(propertyPane, TAB.searchBy.tag, 'INPUT')[0];
            _ReactUtil__WEBPACK_IMPORTED_MODULE_4__["ReactUtil"].TriggerOnChange(inputForTitle, title);
        }));
    };
    ImageGalleryWebPart.prototype.AddTaskChangeLayout = function (layout) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Change layout of image gallery');
            var propertyPane = _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].GetPropertyPane();
            var choiceInputs = TAB.GetElements(propertyPane, TAB.searchBy.customQuery, "[data-automation-id=\"PropertyPaneChoiceGroup-" + layout + "\"]");
            // In the property pane of image gallery web part, there are two choices groups. And in each group
            // the keys of the options are same which will lead to same automation-id. Because the layout choice
            // group is the last one, so always use the last one.
            TAB.ClickElement(choiceInputs[choiceInputs.length - 1]);
        }));
    };
    /**
     * Delete an image by given index.
     * @param index - The index of the image item.
     */
    ImageGalleryWebPart.prototype.AddTaskDeleteItemByIndex = function (index) {
        var _this = this;
        var deletedItemUrl;
        var confirmDialog;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("get item at position " + index);
            var items = _this.GetImageElements();
            var deleteItem = items[index];
            deletedItemUrl = _this.GetImageUrlByIndex(index);
            TAB.Log.AddTaskComment("delete item at position " + index);
            if (deleteItem) {
                var deleteButton = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(deleteItem, 'delete-button');
                TAB.ClickElement(deleteButton);
            }
            else {
                TAB.Log.AddTaskFail('Delete button not found');
            }
        }), TAB.MakeWaiter(function () {
            try {
                TAB.Log.AddTaskComment('Try to find the delete confirmation dialog');
                confirmDialog = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-main');
                return confirmDialog !== undefined;
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('click yes button (remove button) on confirm dialog');
            var yesButton = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(confirmDialog, 'yes-button');
            if (!yesButton) {
                TAB.Log.AddTaskFail('Yes button not found');
            }
            TAB.ClickElement(yesButton);
        }), TAB.MakeWaiter(function () { return _this.GetImageUrlByIndex(index) !== deletedItemUrl; }));
    };
    /**
     * Drag and drop image elements.
     * @param dragIndex - The index of the drag source element.
     * @param dropIndex - The index of the drop target element;
     */
    ImageGalleryWebPart.prototype.AddTaskDragAndDropItem = function (dragIndex, dropIndex) {
        var _this = this;
        if (this._layout === Layout.Carousel ||
            this._layout === Layout.Masonry ||
            this._layout === Layout.Brick) {
            throw new Error("Drag and drop feature is not available for '" + Layout[this._layout] + "' layout");
        }
        if (this._imageSourceType === ImageSourceType.Dynamic) {
            throw new Error('Drag and drop feature is not available for dynamic (document library) mode');
        }
        // FireMouseEvent is not allowed in Edge due to initMouseEvent deprecation
        // Fix required in TABCore VSO#405141
        if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
            TAB.Log.AddTaskWarning('Skipping test: Fire mouse event is not permitted in Edge.');
            return;
        }
        var item;
        var targetElement;
        var itemOffset, targetItemOffset;
        var dropX, dropY;
        var dragElementSrc, dropElementSrc;
        TAB.AddTask(TAB.MakeTask(function () {
            item = _this.GetImageElements()[dragIndex];
            targetElement = _this.GetImageElements()[dropIndex];
            dragElementSrc = _this.GetImageUrlByIndex(dragIndex);
            dropElementSrc = _this.GetImageUrlByIndex(dropIndex);
            itemOffset = TAB.GetElementOffset(item);
            targetItemOffset = TAB.GetElementOffset(targetElement);
            var dragX = Math.round(itemOffset.left + item.clientWidth / 2);
            var dragY = Math.round(itemOffset.top + item.clientHeight / 2);
            dropX = Math.round(targetItemOffset.left + item.clientWidth) - 1;
            dropY = Math.round(targetItemOffset.top + item.clientHeight) - 1;
            // TAB framework doesn't provide drag* mouse events.
            // But here we need drag events to simulate HTML5 drag and drop.
            // It's inspired by https://ghostinspector.com/blog/simulate-drag-and-drop-javascript-casperjs/
            TAB.Log.AddTaskComment('Mouse over dragged element and mousedown');
            ImageGalleryWebPart._fireMouseEvent('mousemove', item, dragX, dragY);
            ImageGalleryWebPart._fireMouseEvent('mouseenter', item, dragX, dragY);
            ImageGalleryWebPart._fireMouseEvent('mouseover', item, dragX, dragY);
            ImageGalleryWebPart._fireMouseEvent('mousedown', item, dragX, dragY);
            TAB.Log.AddTaskComment('Start dragging process over to drop target');
            ImageGalleryWebPart._fireMouseEvent('dragstart', item, dragX, dragY);
            ImageGalleryWebPart._fireMouseEvent('drag', item, dragX, dragY);
            ImageGalleryWebPart._fireMouseEvent('mousemove', item, dragX, dragY);
            ImageGalleryWebPart._fireMouseEvent('drag', item, dropX, dropY);
            ImageGalleryWebPart._fireMouseEvent('mousemove', targetElement, dropX, dropY);
        }), TAB.MakeWaiter(function () {
            try {
                TAB.Log.AddTaskComment('Trigger dragging process on top of drop target');
                ImageGalleryWebPart._fireMouseEvent('mouseenter', targetElement, dropX, dropY);
                ImageGalleryWebPart._fireMouseEvent('dragenter', targetElement, dropX, dropY);
                ImageGalleryWebPart._fireMouseEvent('mouseover', targetElement, dropX, dropY);
                ImageGalleryWebPart._fireMouseEvent('dragover', targetElement, dropX, dropY);
                var draggingElementSrc = _this.GetImageUrlByIndex(dropIndex);
                return dragElementSrc === draggingElementSrc;
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Release dragged element on top of drop target');
            ImageGalleryWebPart._fireMouseEvent('drop', targetElement, dropX, dropY);
            ImageGalleryWebPart._fireMouseEvent('dragend', item, dropX, dropY);
            ImageGalleryWebPart._fireMouseEvent('mouseup', item, dropX, dropY);
        }), TAB.MakeWaiter(function () {
            return _this.GetImageUrlByIndex(dropIndex) === dragElementSrc &&
                _this.GetImageUrlByIndex(dropIndex - 1) === dropElementSrc;
        }));
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskSavePage();
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskPublishPage();
        TAB.MakeWaiter(function () {
            return _this.GetImageUrlByIndex(dropIndex) === dragElementSrc &&
                _this.GetImageUrlByIndex(dropIndex - 1) === dropElementSrc;
        }).Wait();
    };
    /**
     * Get image HTML elements. If there is no item, an empty array will be returned.
     */
    ImageGalleryWebPart.prototype.GetImageElements = function () {
        switch (this._layout) {
            case Layout.Grid:
                return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementsByDataAutomationId(this._root, 'image-item');
            default:
                throw new Error("Test is not implemented for " + Layout[this._layout] + " layout");
        }
    };
    /**
     * Return the src url of one image by index.
     * @param index - The index of the image.
     */
    ImageGalleryWebPart.prototype.GetImageUrlByIndex = function (index) {
        var items = this.GetImageElements();
        if (items.length > index) {
            var element = TAB.GetElement(items[index], TAB.searchBy.tag, 'img');
            return element ? element.src : undefined;
        }
        else {
            TAB.Log.Warning('ImageGallery does not have item with index = ' + index);
            return undefined;
        }
    };
    ImageGalleryWebPart.prototype.AddTaskAddImagesFromUploading = function (fileInput) {
        var _this = this;
        this._addTaskOpenFilePickerForAddItem();
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].AddTaskCreateFilePicker();
        var itemCount;
        TAB.AddTask(TAB.MakeTask(function () {
            itemCount = _this.GetImageElements().length;
            TAB.Log.AddTaskComment('Add image item from uploading');
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_2__["TeamSitePage"].FilePicker.AddTaskUploadItem(fileInput);
        }), TAB.MakeWaiter(function () {
            return _this.GetImageElements().length === itemCount + 1;
        }));
    };
    /**
     * Find the lightbox component.
     * @param allowFail - Whether a fail task will be added if lightbox not found. In some cases,
     *  we don't want to fail the test because it's expected that lightbox is not found.
     *  e.g. In a TAB waiter or asserting lightbox is closed when click on close button.
     */
    ImageGalleryWebPart.prototype._getLightbox = function (allowFail) {
        var lightbox;
        try {
            TAB.Log.AddTaskComment('Try to find image lightbox');
            lightbox = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'lightBoxPanel');
            TAB.Log.AddTaskPass('Found Image lightbox');
        }
        catch (e) {
            if (!allowFail) {
                TAB.Log.AddTaskFail(e);
            }
        }
        return lightbox;
    };
    ImageGalleryWebPart.prototype._getItemByIndex = function (index) {
        TAB.Log.AddTaskComment("Try to get item at position " + index);
        var imageItem = this.GetImageElements()[index];
        if (imageItem) {
            TAB.Log.AddTaskPass("Image item found at position " + index);
        }
        else {
            TAB.Log.AddTaskFail("Image item at position " + index + " not found");
        }
        return imageItem;
    };
    ImageGalleryWebPart.prototype._addTaskOpenFilePickerForAddItem = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click +Add button');
            TAB.ClickElement(_this._getAddButton());
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='sp-filepicker']"));
    };
    /**
     * Get "+Add" button element on web part if exists. Otherwise it will return undefined.
     */
    ImageGalleryWebPart.prototype._getAddButton = function () {
        try {
            if (this.isCuratedMode) {
                return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(this._root, 'addImages-button');
            }
            else {
                return undefined;
            }
        }
        catch (e) {
            return undefined;
        }
    };
    ImageGalleryWebPart.prototype._waitForWebPartAndPropertyPaneExist = function () {
        return TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'imageGallery')
                && TAB.ElementExists(TAB.Win, TAB.searchBy.partialClassName, 'propertyPanePageContent');
        });
    };
    return ImageGalleryWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "pWCE":
/*!**************************************************!*\
  !*** ./lib/SPTaskLib/Controls/TeamsTabPicker.js ***!
  \**************************************************/
/*! exports provided: TeamsTabPicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeamsTabPicker", function() { return TeamsTabPicker; });
/**
 * Provides tasks to use when testing the Teams tab picker page.
 * The Teams tab picker page shows the pages and lists on a site which users may choose to display inside a Teams tab.
 * You can view this page by appending /_layouts/15/teamstabconfiguration.aspx to the site URL.
 *
 * @public
 */
var TeamsTabPicker = /** @class */ (function () {
    function TeamsTabPicker() {
    }
    /** Navigate to the Teams tab picker page */
    TeamsTabPicker.AddTaskGoToTeamsTabPickerPage = function (serverUrl, groupAlias) {
        var pageUrl = serverUrl + "/sites/" + groupAlias + "/_layouts/15/teamstabconfiguration.aspx";
        TAB.Log.AddTaskComment('Navigating to Teams tab picker page for site ' + pageUrl);
        TAB.AddTask(TAB.LoadPage(pageUrl), TAB.PageReady());
    };
    /** Verify that the pivot control appears */
    TeamsTabPicker.AddTaskVerifyPivots = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Ensuring pivots appear');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='PagesAndListsPivots']"));
    };
    /** Verify that the pages pivot item appears */
    TeamsTabPicker.AddTaskVerifyPagesPivotItem = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Ensuring pages pivot item appears');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.id, 'pagesPivotItem'));
    };
    /** Verify that the lists pivot item appears */
    TeamsTabPicker.AddTaskVerifyListsPivotItem = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Ensuring lists pivot item appears');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.id, 'listsPivotItem'));
    };
    /** Verify that the list of available pages appears */
    TeamsTabPicker.AddTaskVerifyPagesList = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Ensuring list of available pages appears');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='PagesList']"));
    };
    /** Click the lists pivot and verify that the list of available lists appears */
    TeamsTabPicker.AddTaskVerifyListsList = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Ensuring list of available lists appears');
            TeamsTabPicker._addTaskClickListsPivot();
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automationid='ListsList']"));
    };
    TeamsTabPicker._addTaskClickListsPivot = function () {
        TAB.Log.AddTaskComment('Obtaining the Lists pivot element');
        var listsPivot = undefined;
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                listsPivot = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'listsPivotItem');
                return Boolean(listsPivot);
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking the Lists pivot');
            TAB.ClickElement(listsPivot);
        }), undefined);
    };
    return TeamsTabPicker;
}());



/***/ }),

/***/ "qC36":
/*!*****************************************************!*\
  !*** ./lib/SPTaskLib/Controls/QuickLinksWebPart.js ***!
  \*****************************************************/
/*! exports provided: QuickLinksLayoutId, QuickLinksWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickLinksLayoutId", function() { return QuickLinksLayoutId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuickLinksWebPart", function() { return QuickLinksWebPart; });
/* harmony import */ var _BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseCollectionWebPart */ "kQju");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Pages/TeamSitePage */ "UjPA");
/* harmony import */ var _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Pages/PropertyPane */ "M/CL");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Next */ "BJbA");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






/**
 * Layout id for QuickLinks Web part.
 * The value of each layout indicates the order in property pane.
 *
 * @public
 */
var QuickLinksLayoutId;
(function (QuickLinksLayoutId) {
    QuickLinksLayoutId[QuickLinksLayoutId["Compact"] = 0] = "Compact";
    QuickLinksLayoutId[QuickLinksLayoutId["FilmStrip"] = 1] = "FilmStrip";
})(QuickLinksLayoutId || (QuickLinksLayoutId = {}));
/**
 * @public
 */
var QuickLinksWebPart = /** @class */ (function (_super) {
    __extends(QuickLinksWebPart, _super);
    function QuickLinksWebPart() {
        var _this = _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].QuickLinks, _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].QuickLinks.toString()) || this;
        _this._layoutType = QuickLinksLayoutId.Compact;
        return _this;
    }
    QuickLinksWebPart.prototype.AddTaskAddWebPartOnTeamSitePage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Add Quick Links Web Part');
            _this.AddTaskSetupNewPage();
            _this._addTaskAssertWebPartNotExist();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"].AddTaskCreateWebPart(_this);
        }), this._waitForWebPartEmptyStateToExist());
    };
    QuickLinksWebPart.prototype.AddTaskAddCompactItemFromUrl = function (url) {
        var _this = this;
        this._addTaskOpenFilePickerForAddItem();
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].AddTaskCreateFilePicker();
        var itemCount;
        TAB.AddTask(TAB.MakeTask(function () {
            itemCount = _this.GetQuickLinks().length;
            TAB.Log.AddTaskComment('Add compact item for ' + url);
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].FilePicker.AddTaskAddFromUrl(url);
        }), TAB.MakeWaiter(function () {
            return _this.GetQuickLinks().length === itemCount + 1;
        }));
    };
    QuickLinksWebPart.prototype.AddTaskChangeLayout = function (layout) {
        var _this = this;
        this.AddTaskClickConfigureButton();
        var layoutChoices = [];
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Change layout to ' + (layout === QuickLinksLayoutId.Compact ? 'Compact' : 'FilmStrip'));
            var propertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, "propertyPanePageContent");
            layoutChoices = TAB.GetElements(propertyPane, TAB.searchBy.hasClassName, 'ms-ChoiceField');
            var layoutInput = TAB.GetElement(layoutChoices[layout], TAB.searchBy.tag, 'INPUT');
            TAB.ClickElement(layoutInput);
        }), TAB.MakeWaiter(function () {
            try {
                var layoutLabel = TAB.GetElement(layoutChoices[layout], TAB.searchBy.tag, 'LABEL');
                var isLayoutChecked = TAB.HasCssClass(layoutLabel, 'is-checked');
                if (isLayoutChecked) {
                    _this._layoutType = layout;
                }
                return isLayoutChecked;
            }
            catch (e) {
                return false;
            }
        }));
        _Pages_PropertyPane__WEBPACK_IMPORTED_MODULE_4__["PropertyPane"].AddTaskClosePropertyPane();
    };
    QuickLinksWebPart.prototype.AddTaskDeleteItemByIndex = function (index) {
        var _this = this;
        var deleteItemTitle;
        var confirmDialog;
        TAB.AddTask(TAB.MakeTask(function () {
            var items = _this.GetQuickLinks();
            var deleteItem = items[index];
            deleteItemTitle = _this.GetItemTitleByIndex(index);
            TAB.Log.AddTaskComment('delete item ' + deleteItemTitle);
            if (deleteItem) {
                var deleteButton = _Next__WEBPACK_IMPORTED_MODULE_5__["Next"].GetElementByDataAutomationId(deleteItem, 'delete-button');
                TAB.ClickElement(deleteButton);
            }
        }), TAB.MakeWaiter(function () {
            try {
                confirmDialog = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dialog-main');
                return confirmDialog !== undefined;
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('click yes button on confirm dialog');
            var yesButton = _Next__WEBPACK_IMPORTED_MODULE_5__["Next"].GetElementByDataAutomationId(confirmDialog, 'yesButton');
            TAB.ClickElement(yesButton);
        }), TAB.MakeWaiter(function () { return _this.GetItemTitleByIndex(index) !== deleteItemTitle; }));
    };
    QuickLinksWebPart.prototype.AddTaskDragAndDropItem = function (dragIndex, dropIndex) {
        var _this = this;
        if (this._layoutType === QuickLinksLayoutId.FilmStrip) {
            return;
        }
        // FireMouseEvent is not allowed in Edge due to initMouseEvent deprecation
        // Fix required in TABCore VSO#405141
        if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
            TAB.Log.AddTaskWarning('Fire mouse event is not permitted in Edge.');
            return;
        }
        var item, dragMark;
        var itemOffset, targetItemOffset;
        var dropX, dropY;
        var dragElementTitle, dropElementTitle;
        var shiftPixel = 10;
        TAB.AddTask(TAB.MakeTask(function () {
            item = _this.GetQuickLinks()[dragIndex];
            dragElementTitle = _this.GetItemTitleByIndex(dragIndex);
            dropElementTitle = _this.GetItemTitleByIndex(dropIndex);
            itemOffset = TAB.GetElementOffset(item);
            targetItemOffset = TAB.GetElementOffset(_this.GetQuickLinks()[dropIndex]);
            var dragX = Math.round(itemOffset.left + item.clientWidth / 2);
            var dragY = Math.round(itemOffset.top + item.clientHeight / 2);
            TAB.FireMouseEvent(item, TAB.mouseEvent.mouseDown, new TAB.MouseEventData(dragX, dragY));
        }), TAB.MakeWaiter(function () {
            // Store the dragMark for compare with dropMark.
            dragMark = TAB.GetElements(_this._root, TAB.searchBy.partialClassName, 'dropLocation')[0];
            return dragMark !== undefined;
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            dropX = Math.round(targetItemOffset.left + item.clientWidth / 2) + shiftPixel;
            dropY = Math.round(targetItemOffset.top + item.clientHeight / 2);
            TAB.FireMouseEvent(item, TAB.mouseEvent.mouseMove, new TAB.MouseEventData(dropX, dropY));
        }), TAB.MakeWaiter(function () {
            try {
                // Wait till the mark of drop place is changed.
                var dropMark = TAB.GetElement(_this._root, TAB.searchBy.partialClassName, 'dropLocation');
                return dropMark !== dragMark;
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () { return TAB.FireMouseEvent(item, TAB.mouseEvent.mouseUp, new TAB.MouseEventData(dropX, dropY)); }), undefined);
        // Wait for item to swap position.
        TAB.MakeWaiter(function () {
            return _this.GetItemTitleByIndex(dropIndex) === dragElementTitle
                && _this.GetItemTitleByIndex(dropIndex - 1) === dropElementTitle;
        }).Wait();
    };
    QuickLinksWebPart.prototype.AddTaskOpenPropertyPaneForItem = function (index) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('click edit button on item');
            var quickLink = _this.GetQuickLinks()[index];
            if (quickLink) {
                var editButton = _Next__WEBPACK_IMPORTED_MODULE_5__["Next"].GetElementByDataAutomationId(quickLink, 'edit-button');
                TAB.ClickElement(editButton);
            }
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, "propertyPanePageContent"));
    };
    /**
     * Get quick links list items. If there is no item, it will return an empty array.
     */
    QuickLinksWebPart.prototype.GetQuickLinks = function () {
        if (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='empty-state-card']")) {
            return [];
        }
        else {
            return this._layoutType === QuickLinksLayoutId.Compact
                ? TAB.GetElements(this._root, TAB.searchBy.customQuery, "[data-automation-id='compact-card']")
                : TAB.GetElements(this._root, TAB.searchBy.customQuery, "[data-automation-id='tile-card']");
        }
    };
    /**
     * Return the title of one quick link by index. Will return empty string if fail to get title.
     * @param index - index of item in quick links
     */
    QuickLinksWebPart.prototype.GetItemTitleByIndex = function (index) {
        var items = this.GetQuickLinks();
        if (items.length > index) {
            var element = _Next__WEBPACK_IMPORTED_MODULE_5__["Next"].GetElementByDataAutomationId(items[index], 'less-text');
            return element ? TAB.GetTextContent(element) : '';
        }
        else {
            TAB.Log.Warning('QuickLinks does not have item with index = ' + index);
            return '';
        }
    };
    QuickLinksWebPart.prototype.AddTaskAddCompactItemFromUploading = function (fileInput) {
        var _this = this;
        this._addTaskOpenFilePickerForAddItem();
        _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].AddTaskCreateFilePicker();
        var itemCount;
        TAB.AddTask(TAB.MakeTask(function () {
            itemCount = _this.GetQuickLinks().length;
            TAB.Log.AddTaskComment('Add compact item from uploading');
            _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].FilePicker.AddTaskUploadItem(fileInput);
        }), TAB.MakeWaiter(function () {
            return _this.GetQuickLinks().length === itemCount + 1;
        }));
    };
    Object.defineProperty(QuickLinksWebPart.prototype, "ShouldHaveAddButton", {
        get: function () {
            return _Pages_TeamSitePage__WEBPACK_IMPORTED_MODULE_3__["TeamSitePage"].editMode;
        },
        enumerable: true,
        configurable: true
    });
    QuickLinksWebPart.prototype._waitForWebPartEmptyStateToExist = function () {
        return TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='empty-state-card']");
        });
    };
    QuickLinksWebPart.prototype._addTaskOpenFilePickerForAddItem = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click +Add button');
            TAB.ClickElement(_this.GetAddButton());
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='sp-filepicker']"));
    };
    QuickLinksWebPart.prototype._addTaskAssertWebPartNotExist = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Assert Quick Links web part not exist');
            var isExist = _this._layoutType
                ? TAB.ElementExists(_this._root, TAB.searchBy.customQuery, "[data-automation-id='compact-card']")
                : TAB.ElementExists(_this._root, TAB.searchBy.customQuery, "[data-automation-id='tile-card']");
            if (isExist) {
                throw 'QuickLinks web part should not exist.';
            }
        }), undefined);
    };
    return QuickLinksWebPart;
}(_BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__["BaseCollectionWebPart"]));



/***/ }),

/***/ "qmer":
/*!*****************************************************!*\
  !*** ./lib/SPTaskLib/Controls/WorldClockWebPart.js ***!
  \*****************************************************/
/*! exports provided: WorldClockWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WorldClockWebPart", function() { return WorldClockWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var WorldClockDateFormat;
(function (WorldClockDateFormat) {
    WorldClockDateFormat["monthSpaceDayCommaYear"] = "mmm dd, yyyy";
    WorldClockDateFormat["monthSlashDaySlashYear"] = "mm/dd/yyyy";
    WorldClockDateFormat["daySlashMonthSlashYear"] = "dd/mm/yyyy";
    WorldClockDateFormat["yearSlashMonthSlashDay"] = "yyyy/mm/dd";
})(WorldClockDateFormat || (WorldClockDateFormat = {}));
var WorldClockTimeFormat;
(function (WorldClockTimeFormat) {
    WorldClockTimeFormat["time12"] = "hm";
    WorldClockTimeFormat["time24"] = "Hm";
})(WorldClockTimeFormat || (WorldClockTimeFormat = {}));
/**
 * @public
 */
var WorldClockWebPart = /** @class */ (function (_super) {
    __extends(WorldClockWebPart, _super);
    function WorldClockWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].WorldClock, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].WorldClock.toString()) || this;
    }
    WorldClockWebPart.prototype.AddTaskAddOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _this.AddTaskSetupNewPage();
            _this._addTaskAssertWebPartNotExist();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="clockCard"]'));
    };
    WorldClockWebPart.prototype.AddTaskTryAddClockCard = function (locationName, shouldHaveSuggestions) {
        var _this = this;
        var clockCardLength;
        TAB.MakeTask(function () {
            var locationInput = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class*="clockCardPlaceholderWrapper"] input');
            TAB.Log.AddTaskComment('Add the clock of ' + locationName + ' .');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_3__["ReactUtil"].TriggerOnChange(locationInput, locationName);
        })
            .WaitFor(shouldHaveSuggestions
            ? TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="ms-Suggestions-container"]')
            : TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="ms-Suggestions-none"]'));
        if (!shouldHaveSuggestions) {
            return;
        }
        TAB.MakeTask(function () {
            clockCardLength = _this._getClockCardLength();
            var suggestionsContainer = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Suggestions-container');
            var firstSuggestionItem = TAB.GetElements(suggestionsContainer, TAB.searchBy.hasClassName, 'ms-Suggestions-item')[0];
            var itemButton = TAB.GetElement(firstSuggestionItem, TAB.searchBy.hasClassName, 'ms-Suggestions-itemButton');
            TAB.Log.AddTaskComment('Click the first item in suggestion list');
            TAB.ClickElement(itemButton);
        })
            .WaitFor(TAB.MakeWaiter(function () {
            return _this._getClockCardLength() === clockCardLength + 1;
        }));
    };
    WorldClockWebPart.prototype.AddTaskOpenWorldClockWebPartPropertyPane = function () {
        var _this = this;
        TAB.Log.AddTaskComment('Open World Clock web part property pane');
        TAB.AddTask(TAB.MakeTask(function () {
            _this.AddTaskClickConfigureButton();
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="propertyPaneGroupField"] button'));
    };
    WorldClockWebPart.prototype.AddTaskChangeDateAndTimeFormat = function () {
        var _this = this;
        TAB.MakeTask(function () {
            var propertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'propertyPanePageContent');
            var toggleButtons = TAB.GetElements(propertyPane, TAB.searchBy.customQuery, '[class^="ms-Toggle"] button');
            var dateAndTimeFormatButton = toggleButtons[0];
            TAB.Log.AddTaskComment('Click toggle button to show date and time format choice group');
            TAB.ClickElement(dateAndTimeFormatButton);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-ChoiceFieldGroup'));
        Object.keys(WorldClockDateFormat).forEach(function (key) { return _this._addTaskSwitchToFormat(WorldClockDateFormat[key]); });
        Object.keys(WorldClockTimeFormat).forEach(function (key) { return _this._addTaskSwitchToFormat(WorldClockTimeFormat[key]); });
    };
    WorldClockWebPart.prototype.AddTaskOpenClockCardPropertyPane = function (index) {
        TAB.MakeTask(function () {
            var editButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(TAB.Win.document.body, 'clock-card-edit-button')[index];
            TAB.ClickElement(editButton);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="propertyPaneGroupField"] button'));
    };
    WorldClockWebPart.prototype.AddTaskChangeLocationDisplayName = function (index, locationName) {
        var _this = this;
        this._enableCustomizeDisplayNameAndTimeZone();
        TAB.MakeTask(function () {
            var displayLocationInput = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'world-clock-customize-location-input');
            TAB.Log.AddTaskComment('Set display location value to ' + locationName + ' .');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_3__["ReactUtil"].TriggerOnChange(displayLocationInput, locationName);
        })
            .WaitFor(TAB.MakeWaiter(function () {
            var clockCard = _this._getClockCardByIndex(index);
            return clockCard.textContent.search(locationName) !== -1;
        }));
    };
    WorldClockWebPart.prototype.AddTaskChangeTimeZone = function (index) {
        this._enableCustomizeDisplayNameAndTimeZone();
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click time zone dropdown to show all time zones');
            var propertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'propertyPanePageContent');
            var timeZoneDropDown = TAB.GetElement(propertyPane, TAB.searchBy.hasClassName, 'ms-Dropdown');
            TAB.ClickElement(timeZoneDropDown);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dropdown-callout'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Set time zone to number " + index + " of the dropdown");
            var timeZoneButtonsContainer = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dropdown-callout');
            var timeZoneButtons = TAB.GetElements(timeZoneButtonsContainer, TAB.searchBy.customQuery, '[type="button"]');
            TAB.ClickElement(timeZoneButtons[index]);
        })
            .WaitFor(TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-Dropdown-callout');
        })));
    };
    WorldClockWebPart.prototype.AddTaskDeleteClockCard = function () {
        var _this = this;
        var clockCardLength;
        TAB.MakeTask(function () {
            clockCardLength = _this._getClockCardLength();
            var deleteButton = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementsByDataAutomationId(TAB.Win.document.body, 'clock-card-delete-button');
            TAB.Log.AddTaskComment('Delete one clock card of current list');
            TAB.ClickElement(deleteButton[0]);
        })
            .WaitFor(TAB.MakeWaiter(function () {
            return _this._getClockCardLength() === clockCardLength - 1;
        }));
    };
    WorldClockWebPart.prototype._addTaskSwitchToFormat = function (format) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Switch to format " + format);
            var formatGroupRadio = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, "PropertyPaneChoiceGroup-" + format);
            if (formatGroupRadio) {
                TAB.ClickElement(formatGroupRadio);
            }
            else {
                TAB.Log.Fail("Fail to switch to " + format + " format in World Clock");
            }
        }), this._waitForDateFormatIsSelected(format));
    };
    WorldClockWebPart.prototype._waitForDateFormatIsSelected = function (format) {
        return TAB.MakeWaiter(function () {
            var formatGroupRadio = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, "PropertyPaneChoiceGroup-" + format);
            return formatGroupRadio.checked;
        });
    };
    WorldClockWebPart.prototype._getClockCardLength = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[class*="clockCardWrapper"]').length;
    };
    WorldClockWebPart.prototype._getClockCardByIndex = function (index) {
        return TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[class*="clockCardWrapper"]')[index];
    };
    WorldClockWebPart.prototype._addTaskAssertWebPartNotExist = function () {
        TAB.MakeTask(function () {
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class*="clockCard"]')) {
                throw 'WorldClock web part should not exist.';
            }
        })
            .WaitFor(undefined);
    };
    WorldClockWebPart.prototype._enableCustomizeDisplayNameAndTimeZone = function () {
        var _this = this;
        TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Click toggle button to enable customize display location name and time zone');
            var propertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'propertyPanePageContent');
            _this._turnOnToggle(TAB.GetElements(propertyPane, TAB.searchBy.hasClassName, 'ms-Toggle-innerContainer')[0]);
        })
            .WaitFor(TAB.MakeWaiter(function () {
            var locationInput = _Next__WEBPACK_IMPORTED_MODULE_1__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'world-clock-customize-location-input');
            var propertyPane = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'propertyPanePageContent');
            var timeZoneDropDownContainer = TAB.GetElement(propertyPane, TAB.searchBy.hasClassName, 'ms-Dropdown-container');
            return locationInput && timeZoneDropDownContainer;
        }));
    };
    WorldClockWebPart.prototype._turnOnToggle = function (toggleContainer) {
        var toggle = TAB.GetElements(toggleContainer, TAB.searchBy.tag, 'button')[0];
        if (toggle.attributes['aria-checked'].value === 'false') {
            toggle.click();
        }
    };
    return WorldClockWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "rWka":
/*!*************************************!*\
  !*** ./lib/SPTaskLib/CookieUtil.js ***!
  \*************************************/
/*! exports provided: Cookies */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Cookies", function() { return Cookies; });
/* tslint:disable */
/**
 * @public
 */
var Cookies = /** @class */ (function () {
    function Cookies() {
    }
    Cookies.setRedirectCookie = function (serverURL, target) {
        var d = new Date();
        d.setTime(d.getTime() + 1 * (24 * 60 * 60 * 1000));
        TAB.Win.document.cookie = "srr=" + target + ";" + Cookies.getCookieDomain(serverURL) + "expires=" + d.toUTCString() + ";path=/";
    };
    Cookies.getCookieDomain = function (serverURL) {
        var url = serverURL;
        if (url !== null) {
            var pos = url.indexOf("://");
            if (pos !== -1) {
                url = url.substr(pos + 3);
                pos = url.indexOf("/");
                if (pos !== -1) {
                    url = url.substr(0, pos);
                }
                pos = url.indexOf(".");
                if (pos !== -1) {
                    url = url.substr(pos);
                    return "domain=" + url + ";";
                }
                return "";
            }
        }
        return "domain=.spoppe.com;";
    };
    return Cookies;
}());



/***/ }),

/***/ "sQpn":
/*!****************************************************!*\
  !*** ./lib/SPTaskLib/Controls/ConnectorWebPart.js ***!
  \****************************************************/
/*! exports provided: ConnectorWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectorWebPart", function() { return ConnectorWebPart; });
/* harmony import */ var _BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseCollectionWebPart */ "kQju");
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var CLOSE_BUTTON_QUERY = "[data-automation-id='ConnectorConfigurationPanelCloseButton']";
var IFRAME_QUERY = "[data-automation-id='ConnectorConfigurationIFrame']";
var PANEL_RENDERED_QUERY = "[data-automation-id='ConfigurationPanelRendered']";
/**
 * @public
 */
var ConnectorWebPart = /** @class */ (function (_super) {
    __extends(ConnectorWebPart, _super);
    // Use overrides to allow a derived class to implement an specific type of connector web part, e.g., RSSConnector
    function ConnectorWebPart(type, entryId) {
        if (type === void 0) { type = _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].Connector; }
        if (entryId === void 0) { entryId = _BaseWebpart__WEBPACK_IMPORTED_MODULE_1__["WebpartType"].Connector.toString(); }
        return _super.call(this, type, entryId) || this;
    }
    ConnectorWebPart.prototype.addWebPartToPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_2__["Canvas"].AddTaskCreateWebPart(_this);
        }), 
        // The data automation id is present if the connector configuration page renders.
        TAB.MakeWaiter(function () {
            TAB.Log.Comment('Waiting for notification that the connector configuration UI rendered in an iFrame');
            return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, PANEL_RENDERED_QUERY);
        }));
    };
    ConnectorWebPart.prototype.closeConfigurationPanel = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Find panel close button element');
            var panelCloseButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, CLOSE_BUTTON_QUERY);
            TAB.Log.Comment('Click panel close button');
            panelCloseButton.click();
        }), undefined);
    };
    ConnectorWebPart.prototype.readConfigurationPageUrl = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Find connector configuration iFrame element');
            var iFrame = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, IFRAME_QUERY);
            TAB.Log.Comment('Extract configuration URL');
            var pageUrl = iFrame.src.replace('&SSO=true', '');
            TAB.Log.Comment("page url: " + pageUrl);
        }), undefined);
    };
    return ConnectorWebPart;
}(_BaseCollectionWebPart__WEBPACK_IMPORTED_MODULE_0__["BaseCollectionWebPart"]));



/***/ }),

/***/ "tJmU":
/*!*****************************************!*\
  !*** ./lib/SPTaskLib/Pages/Comments.js ***!
  \*****************************************/
/*! exports provided: Comments */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Comments", function() { return Comments; });
/* harmony import */ var _Controls_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Controls/BaseWebpart */ "35UN");

/**
 * @public
 */
var Comments = /** @class */ (function () {
    function Comments() {
    }
    Comments.AddTaskAddComment = function (text) {
        var numberOfComments = 0;
        this._getNumberOfComments()
            .then(function (commentNumber) { return numberOfComments = commentNumber; })
            .catch(function (error) { return TAB.Log.AddTaskComment("Error getting number of comments: " + error); });
        TAB.AddTask(this._postCommentTask("[id=\"" + Comments.COMMENT_INPUT + "\"]", "[data-automation-id=\"" + Comments.COMMENT_POST + "\"]", text), this._waitForNumberOfComments(function () { return numberOfComments + 1; }));
    };
    Comments.AddTaskAddReply = function (text) {
        var numberOfComments = 0;
        this._getNumberOfComments()
            .then(function (commentNumber) { return numberOfComments = commentNumber; })
            .catch(function (error) { return TAB.Log.AddTaskComment("Error getting number of comments: " + error); });
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking reply button');
            var replyButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="comment-reply-button"]');
            TAB.ClickElement(replyButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.leadingId, 'sp-comment-input-reply-'));
        TAB.AddTask(this._postCommentTask('[id^="sp-comment-input-reply-"]', '[data-automation-id^="sp-comment-reply-post-"]', text), this._waitForNumberOfComments(function () { return numberOfComments + 1; }));
    };
    Comments.AddTaskCommentsNotVisible = function () {
        TAB.MakeTask(function () {
            TAB.Log.Comment("Ensuring comments aren't visible before publish");
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'sp-comments')) {
                throw 'Comments component should not be visible';
            }
        });
    };
    Comments.AddTaskCommentsVisible = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Ensuring comments section is visible after publish');
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.id, 'sp-comments'));
    };
    Comments.AddTaskDeleteAReply = function () {
        var numberOfComments = 0;
        this._getNumberOfComments()
            .then(function (commentNumber) { return numberOfComments = commentNumber; })
            .catch(function (error) { return TAB.Log.AddTaskComment("Error getting number of comments: " + error); });
        TAB.Log.AddTaskComment('Deleting a reply');
        this._deleteCommentFlow('[data-automation-id="sp-comment-block-reply"] [data-automation-id="comment-more-button"]');
        TAB.AddTask(undefined, this._waitForNumberOfComments(function () { return numberOfComments - 1; }));
    };
    Comments.AddTaskDeleteRootComment = function () {
        TAB.Log.AddTaskComment('Deleting root comment');
        this._deleteCommentFlow('[data-automation-id="sp-comment-block-root"] [data-automation-id="comment-more-button"]');
        TAB.AddTask(undefined, this._waitForNumberOfComments(function () { return 0; }));
    };
    Comments._deleteCommentFlow = function (moreButtonSelector) {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking on more button');
            var moreButton = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, moreButtonSelector)[0];
            TAB.ClickElement(moreButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu-container'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking on delete option');
            var deleteOption = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="comment-delete-button"]');
            TAB.ClickElement(deleteOption);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '.ms-Dialog.is-open'));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking yes on the delete dialog');
            var yesOption = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="yesButton"]');
            TAB.ClickElement(yesOption);
        }), undefined);
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Waiting for root comment input to receive focus');
        }), TAB.MakeWaiter(function () {
            return TAB.Win.document.activeElement && TAB.Win.document.activeElement.id === Comments.COMMENT_INPUT;
        }));
    };
    Comments._getNumberOfComments = function () {
        return new Promise(function (resolve) {
            TAB.AddTask(TAB.MakeTask(function () {
                resolve(TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="comment-more-button"]').length);
            }));
        });
    };
    Comments._postCommentTask = function (inputSelector, buttonSelector, text) {
        return TAB.MakeTask(function () {
            TAB.Log.Comment('Adding comment');
            var input = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, inputSelector);
            var postButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, buttonSelector);
            TAB.ClickElement(input);
            TAB.SetTextContent(input, text);
            TAB.FireKeyboardEvent(input, 'keyup', _Controls_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["KeyCodes"].space);
            TAB.ClickElement(postButton);
        });
    };
    Comments._waitForNumberOfComments = function (numberToWaitFor) {
        return TAB.MakeWaiter(function () {
            return numberToWaitFor() === TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="comment-more-button"]').length;
        });
    };
    Comments.COMMENT_INPUT = 'sp-comment-input';
    Comments.COMMENT_POST = 'sp-comment-post';
    return Comments;
}());



/***/ }),

/***/ "ueW2":
/*!**************************************************!*\
  !*** ./lib/SPTaskLib/Controls/WeatherWebPart.js ***!
  \**************************************************/
/*! exports provided: WeatherWebPart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WeatherWebPart", function() { return WeatherWebPart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



/**
 * @public
 */
var WeatherWebPart = /** @class */ (function (_super) {
    __extends(WeatherWebPart, _super);
    function WeatherWebPart() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Weather, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].Weather.toString()) || this;
    }
    WeatherWebPart.prototype.AddTaskAddOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _this.AddTaskSetupNewPage();
            _this._addTaskAssertWebPartNotExist();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="weatherCard"]'));
    };
    WeatherWebPart.prototype.AddTaskInputLocation = function (address) {
        TAB.MakeTask(function () {
            var locationInput = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class*="weatherCard"] input');
            TAB.Log.AddTaskComment('Set Location value to ' + address + ' .');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(locationInput, address);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="ms-List-surface"]'));
    };
    WeatherWebPart.prototype.AddTaskClickSuggestedLocation = function () {
        TAB.MakeTask(function () {
            var listPage = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'ms-List-page');
            var firstCell = TAB.GetElements(listPage, TAB.searchBy.partialClassName, 'ms-List-cell')[0];
            var firstSuggestionItem = TAB.GetElement(firstCell, TAB.searchBy.partialClassName, 'suggestionItem');
            TAB.Log.AddTaskComment('Click the first item in suggestion list');
            TAB.ClickElement(firstSuggestionItem);
        })
            .WaitFor(
        // to verify weather info shows properly in weather card
        TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="details"] [class*="ms-Link"]'));
    };
    WeatherWebPart.prototype.AddTaskTryAddWeather = function (locationName, shouldHaveSuggestions) {
        var _this = this;
        var weatherCardLength;
        TAB.MakeTask(function () {
            var locationInput = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class*="weatherCardPlaceholder"] input');
            TAB.Log.AddTaskComment('Add the weather of ' + locationName + ' .');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(locationInput, locationName);
        })
            .WaitFor(shouldHaveSuggestions
            ? TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="ms-Suggestions-container"]')
            : TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="ms-Suggestions-none"]'));
        if (!shouldHaveSuggestions) {
            return;
        }
        TAB.MakeTask(function () {
            weatherCardLength = _this._getWeatherCardLength();
            var suggestionsContainer = TAB.GetElement(TAB.Win, TAB.searchBy.partialClassName, 'ms-Suggestions-container');
            var firstSuggestionItem = TAB.GetElements(suggestionsContainer, TAB.searchBy.partialClassName, 'ms-Suggestions-item')[0];
            var itemButton = TAB.GetElement(firstSuggestionItem, TAB.searchBy.partialClassName, 'ms-Suggestions-itemButton');
            TAB.Log.AddTaskComment('Click the first item in suggestion list');
            TAB.ClickElement(itemButton);
        })
            .WaitFor(TAB.MakeWaiter(function () {
            return _this._getWeatherCardLength() === weatherCardLength + 1;
        }));
    };
    WeatherWebPart.prototype.AddTaskChangeDisplayLocationName = function (index, customizedLocationName) {
        var _this = this;
        TAB.MakeTask(function () {
            var editButton = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"weather-card-edit-button\"]")[index];
            TAB.ClickElement(editButton);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[class*="propertyPaneGroupField"] button'));
        TAB.MakeTask(function () {
            var toggleButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[class*="propertyPaneGroupField"] button');
            TAB.Log.AddTaskComment('Click toggle button to enable customize display location name');
            TAB.ClickElement(toggleButton);
        })
            .WaitFor(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"weather-customize-location-input\"]"));
        TAB.MakeTask(function () {
            var displayLocationInput = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"weather-customize-location-input\"]");
            TAB.Log.AddTaskComment('Set display location value to ' + customizedLocationName + ' .');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(displayLocationInput, customizedLocationName);
        })
            .WaitFor(TAB.MakeWaiter(function () {
            var weatherCard = _this._getWeatherCardByIndex(index);
            return weatherCard.textContent.search(customizedLocationName) !== -1;
        }));
    };
    WeatherWebPart.prototype.AddTaskDeleteWeatherCard = function () {
        var _this = this;
        var weatherCardLength;
        TAB.MakeTask(function () {
            weatherCardLength = _this._getWeatherCardLength();
            var deleteButton = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id=\"weather-card-delete-button\"]");
            TAB.Log.AddTaskComment('Delete one weather card of current list');
            TAB.ClickElement(deleteButton[0]);
        })
            .WaitFor(TAB.MakeWaiter(function () {
            return _this._getWeatherCardLength() === weatherCardLength - 1;
        }));
    };
    WeatherWebPart.prototype._getWeatherCardLength = function () {
        return TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[class*="weatherCardWrapper"]').length;
    };
    WeatherWebPart.prototype._getWeatherCardByIndex = function (index) {
        return TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[class*="weatherCardWrapper"]')[index];
    };
    WeatherWebPart.prototype._addTaskAssertWebPartNotExist = function () {
        TAB.MakeTask(function () {
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[class*="weatherCard"]')) {
                throw 'Weather web part should not exist.';
            }
        })
            .WaitFor(undefined);
    };
    return WeatherWebPart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "umcD":
/*!****************************************************!*\
  !*** ./lib/SPTaskLib/Controls/YammerHighlights.js ***!
  \****************************************************/
/*! exports provided: YammerHighlights */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "YammerHighlights", function() { return YammerHighlights; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Next */ "BJbA");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




/**
 * @public
 */
var YammerHighlights = /** @class */ (function (_super) {
    __extends(YammerHighlights, _super);
    function YammerHighlights() {
        return _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].YammerHighlights, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].YammerHighlights.toString()) || this;
    }
    YammerHighlights.prototype.AddTaskAddWebPartToPage = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        }), TAB.AndWaiters(TAB.AndWaiters(this._waitForPlaceholder(), this._waitForOpenPropertyPane()), this._waitForGroupSearchField()));
    };
    YammerHighlights.prototype.AddTaskAddYammerGroup = function (url) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(_this._groupSearchField, url);
        }));
    };
    YammerHighlights.prototype.AddTaskSearchForYammerGroup = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Searching for Yammer group');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(_this._groupSearchField.getElementsByTagName('input')[0], 'Used For Tab Tests Do Not Delete');
        }), this._waitForGroupSearchResults());
    };
    YammerHighlights.prototype.AddTaskSelectYammerGroup = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Selecting Yammer group');
            var results = _this._groupSearchResults;
            var noResults = _this._groupSearchNoResults;
            if (noResults) {
                TAB.Log.Comment('No groups found');
                _this._failedToSearch = true;
            }
            else if (results && results.length) {
                TAB.Log.Comment('Group found');
                TAB.ClickElement(results[0]);
            }
            else {
                TAB.Log.DidNotRun('No groups found and no search error');
            }
        }), TAB.OrWaiters(TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialId, 'selectedItemPersona'), _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'groupSearchFail')));
    };
    YammerHighlights.prototype.CheckForWebpartContent = function () {
        TAB.AddTask(undefined, TAB.OrWaiters(TAB.OrWaiters(this._waitForEmptyContainerWhenSearchFails(), this._waitForPlaceholderFetchError()), this._waitForCardContainer()));
    };
    YammerHighlights.prototype._waitForOpenPropertyPane = function () {
        return TAB.MakeWaiter(function () {
            TAB.Log.Comment('Property pane should open if there is no group added');
            return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, 'showPane');
        });
    };
    YammerHighlights.prototype._waitForCardContainer = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            var el = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(_this._root, 'cardContainer');
            if (el) {
                TAB.Log.Comment('data-automation-id cardContainer found');
            }
            return !!el;
        });
    };
    YammerHighlights.prototype._waitForPlaceholderFetchError = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            var el = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(_this._root, 'placeholderContainerFetchError');
            if (el) {
                TAB.Log.DidNotRun('data-automation-id placeholderContainerFetchError found');
            }
            return !!el;
        });
    };
    YammerHighlights.prototype._waitForEmptyContainerWhenSearchFails = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            if (!_this._failedToSearch) {
                return false;
            }
            var cardContainer = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(_this._root, 'cardContainer');
            var errorContainer = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(_this._root, 'placeholderContainerFetchError');
            if (!cardContainer && !errorContainer) {
                TAB.Log.DidNotRun('empty container found');
            }
            return !cardContainer && !errorContainer && _this._failedToSearch;
        });
    };
    YammerHighlights.prototype._waitForGroupSearchField = function () {
        var _this = this;
        return TAB.MakeWaiter(function () { return _this._groupSearchField; });
    };
    YammerHighlights.prototype._waitForGroupSearchResults = function () {
        var _this = this;
        return TAB.MakeWaiter(function () {
            var el = _this._groupSearchResults;
            if (el) {
                TAB.Log.Comment('Found group search results');
            }
            return !!el;
        });
    };
    Object.defineProperty(YammerHighlights.prototype, "_groupSearchField", {
        get: function () {
            TAB.Log.Comment('Getting property pane group url search field');
            return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win, 'groupSelector');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YammerHighlights.prototype, "_groupSearchResults", {
        get: function () {
            return TAB.GetElements(TAB.Win, TAB.searchBy.partialClassName, 'groupSearchSuggestionItem');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(YammerHighlights.prototype, "_groupSearchNoResults", {
        get: function () {
            return _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win, 'groupSearchFail');
        },
        enumerable: true,
        configurable: true
    });
    return YammerHighlights;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "x05h":
/*!********************************************!*\
  !*** ./lib/SPTaskLib/Pages/ClassicPage.js ***!
  \********************************************/
/*! exports provided: ClassicPage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassicPage", function() { return ClassicPage; });
/**
 * @public
 */
var ClassicPage = /** @class */ (function () {
    function ClassicPage() {
    }
    ClassicPage.PageReady = function () {
        var waiter = TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'Ribbon.WikiPageTab-title');
        });
        return waiter;
    };
    ClassicPage.AddTaskClickPageTabButton = function () {
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'Ribbon.WikiPageTab-title');
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Open Page Ribbon');
            var pageTabButton = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'Ribbon.WikiPageTab-title');
            TAB.ClickElement(pageTabButton.children[0]);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'Ribbon.WikiPageTab');
        }));
    };
    ClassicPage.AddTaskClickEditRibbonButton = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking Edit');
            var pageTabButton = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'Ribbon.WikiPageTab.EditAndCheckout.SaveEdit-SelectedItem');
            TAB.ClickElement(pageTabButton);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-webpart-zone');
        }));
    };
    ClassicPage.AddTaskClickAddWebPartZone = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Clicking Add a Web Part in Header Zone');
            var addWebPartButtons = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-WPAddButton');
            TAB.ClickElement(addWebPartButtons[0]);
        }), TAB.AndWaiters(TAB.MakeWaiter(function () {
            TAB.Log.AddTaskComment('Waiting for Web Part Add Panel');
            return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'WebPartAdderUpdatePanelContainer');
        }), TAB.MakeWaiter(function () {
            TAB.Log.AddTaskComment('Waiting for Web Part Add Panel to be visible');
            var webPartAddContainer = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'WebPartAdderUpdatePanelContainer');
            return TAB.GetStyleAttribute(webPartAddContainer, 'display') !== 'none';
        })));
    };
    ClassicPage.AddTaskAddWebPartByCategory = function (category, webPartName) {
        TAB.AddTask(undefined, TAB.AndWaiters(TAB.MakeWaiter(function () {
            // Waiting for Web Part Categories
            return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-wpadder-categories');
        }), TAB.MakeWaiter(function () {
            // Waiting Web Part Categories to be populated
            var categories = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-wpadder-categories');
            return categories.children.length > 0;
        })));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment("Adding webpart \"" + webPartName + "\" from category \"" + category + "\"");
            // Look for the category user input
            var categoriesList = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-wpadder-categories');
            var categoryFound;
            for (var index = 0; index < categoriesList.children.length; index++) {
                if (categoriesList.children.item(index).title === category) {
                    categoryFound = categoriesList.children.item(index);
                }
            }
            if (!categoryFound) {
                throw new Error("WebPart catagory \"" + category + "\" was not found");
            }
            TAB.ClickElement(categoryFound);
            // Look for webPartName user input
            var webPartsListColumns = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-wpadder-items');
            var webPartsList;
            var webPartFound;
            for (var webPartColumn = 0; webPartColumn < webPartsListColumns.length; webPartColumn++) {
                webPartsList = webPartsListColumns[webPartColumn];
                for (var index = 0; index < webPartsList.children.length; index++) {
                    if (webPartsList.children.item(index).title === webPartName) {
                        webPartFound = webPartsList.children.item(index);
                        break;
                    }
                }
            }
            if (!webPartFound) {
                throw new Error("WebPart name \"" + webPartName + "\" was not found");
            }
            TAB.ClickElement(webPartFound);
            // Click 'Add'
            var webPartButtonArea = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-wpadder-buttonArea');
            TAB.ClickElement(webPartButtonArea.children.item(0));
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.hasClassName, 'ms-webpartzone-cell');
        }));
    };
    ClassicPage.AddTaskSavePage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.AddTaskComment('Saving Page');
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'Ribbon.EditingTools.CPEditTab.EditAndCheckout.SaveEdit-SelectedItem');
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            // click the save button
            var saveButton = TAB.GetElement(TAB.Win, TAB.searchBy.id, 'Ribbon.EditingTools.CPEditTab.EditAndCheckout.SaveEdit-SelectedItem');
            TAB.ClickElement(saveButton);
        }), TAB.MakeWaiter(function () {
            return TAB.ElementExists(TAB.Win, TAB.searchBy.id, 'MSOZoneCell_WebPartWPQ2');
        }));
    };
    return ClassicPage;
}());



/***/ }),

/***/ "xxVG":
/*!***************************************!*\
  !*** ./lib/SPTaskLib/Pages/SPHome.js ***!
  \***************************************/
/*! exports provided: SPHome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SPHome", function() { return SPHome; });
/**
 * @public
 */
var SPHome = /** @class */ (function () {
    function SPHome() {
    }
    SPHome.loadSPHome = function (serverURL) {
        var spHomeUrl = serverURL + "/_layouts/15/sharepoint.aspx";
        TAB.AddTask(TAB.LoadPage(spHomeUrl), TAB.MakeWaiter(function () {
            return TAB.Win.location.href === spHomeUrl && TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='SPH-HomePageView']");
        }));
    };
    SPHome.handleFRE = function () {
        TAB.Log.AddTaskComment('Checking for existence of FRE and closing it.');
        TAB.AddTask(TAB.MakeTask(function () {
            if ((TAB.Win.window._spHomePageContext.experienceState & SPHome._SharePointHomeRefreshFirstRun) !== 0) { // tslint:disable-line:no-bitwise
                var closeButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, "[data-automation-id='FRE-closebutton']");
                TAB.ClickElement(closeButton);
            }
        }));
    };
    SPHome.findAndClickButton = function (region, buttonId) {
        var queryString = "[data-automation-id='" + buttonId + "']";
        TAB.Log.AddTaskComment("Checking if the " + buttonId + " button exists.");
        TAB.AddTask(undefined, TAB.MakeWaiter(function () {
            try {
                return (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, queryString));
            }
            catch (e) {
                return false;
            }
        }));
        var buttonElement;
        TAB.Log.AddTaskComment("Clicking on the " + buttonId + " button.");
        TAB.AddTask(TAB.MakeTask(function () {
            buttonElement = TAB.GetElement(region, TAB.searchBy.customQuery, queryString);
            TAB.ClickElement(buttonElement);
        }));
    };
    SPHome._SharePointHomeRefreshFirstRun = 1 << 5; // tslint:disable-line:no-bitwise
    return SPHome;
}());



/***/ }),

/***/ "yZcd":
/*!******************************************!*\
  !*** ./lib/SPTaskLib/Pages/SocialBar.js ***!
  \******************************************/
/*! exports provided: SocialBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SocialBar", function() { return SocialBar; });
/**
 * @public
 */
var SocialBar = /** @class */ (function () {
    function SocialBar() {
    }
    SocialBar.AddTaskCloseLikesPanel = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Closing the social bar panel');
            var closeButton = TAB.GetElement(TAB.Win, TAB.searchBy.hasClassName, 'ms-Panel-closeButton');
            TAB.ClickElement(closeButton);
        }), TAB.MakeWaiter(function () {
            var panels = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-Panel');
            return panels.length === 0;
        }));
    };
    SocialBar.AddTaskLikePage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Liking a page');
            var likeButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="sp-socialbar-likebutton"]');
            TAB.ClickElement(likeButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="sp-socialbar-likebutton"] [data-icon-name="LikeSolid"]'));
    };
    SocialBar.AddTaskOpenLikesPanel = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Opening social bar panel');
            var likedByMessage = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="sp-socialbar-likedbymessage"]');
            TAB.ClickElement(likedByMessage);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-Panel'));
    };
    SocialBar.AddTaskSocialBarNotVisible = function () {
        TAB.MakeTask(function () {
            TAB.Log.Comment("Ensuring social bar isn't visible before publish");
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="sp-socialbar"]')) {
                TAB.Log.Fail('SocialBar component should not be visible');
            }
        });
    };
    SocialBar.AddTaskUnlikePage = function () {
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Unliking a page');
            var likeButton = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="sp-socialbar-likebutton"]');
            TAB.ClickElement(likeButton);
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="sp-socialbar-likebutton"] [data-icon-name="Like"]'));
    };
    return SocialBar;
}());



/***/ }),

/***/ "yis5":
/*!***********************************************!*\
  !*** ./lib/SPTaskLib/Controls/ContextMenu.js ***!
  \***********************************************/
/*! exports provided: ContextMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextMenu", function() { return ContextMenu; });
/**
 * @public
 */
var ContextMenu = /** @class */ (function () {
    function ContextMenu(isSubMenu) {
        this.items = [];
        this.root = isSubMenu
            ? TAB.GetElements(TAB.Win, [TAB.searchBy.hasClassName, TAB.searchBy.hasClassName], ['ms-ContextualMenu', 'is-open'])[1]
            : TAB.GetElement(TAB.Win, [TAB.searchBy.hasClassName, TAB.searchBy.hasClassName], ['ms-ContextualMenu', 'is-open']);
        this._getItems();
    }
    ContextMenu.WaitForOpen = function () {
        TAB.Log.AddTaskComment('Waiting for context menu to open.');
        return TAB.MakeWaiter(function () {
            return ContextMenu.MenuAlreadyOpen();
        });
    };
    ContextMenu.WaitForSubMenuOpen = function () {
        TAB.Log.AddTaskComment('Waiting for context sub-menu to open.');
        return TAB.MakeWaiter(function () {
            return ContextMenu.MenuAlreadyOpen(true /*isSubMenu*/);
        });
    };
    ContextMenu.WaitForClose = function () {
        return TAB.MakeWaiter(function () {
            return !ContextMenu.MenuAlreadyOpen();
        });
    };
    ContextMenu.AddTaskDismissContextMenu = function () {
        TAB.Log.AddTaskComment('Dismissing context menu.');
        TAB.AddTaskClickElement(TAB.Win, TAB.searchBy.hasClassName, 'Files', TAB.MakeWaiter(function () {
            var contextMenu = TAB.GetElements(TAB.Win, TAB.searchBy.hasClassName, 'ms-ContextualMenu');
            return contextMenu.length === 0;
        }));
    };
    ContextMenu.MenuAlreadyOpen = function (isSubMenu) {
        try {
            var contextMenu = new ContextMenu(isSubMenu);
            return contextMenu.IsOpen();
        }
        catch (e) {
            return false;
        }
    };
    ContextMenu.VerifyContextualMenuItems = function (expectedItems, requireExactMatch) {
        if (requireExactMatch === void 0) { requireExactMatch = true; }
        var contextMenu = new ContextMenu();
        contextMenu.VerifyItems(expectedItems, requireExactMatch);
    };
    ContextMenu.prototype.IsOpen = function () {
        // Keep waiting if the contextMenu shows 'Loading...'.
        if (this.items[0] && TAB.GetTextContent(this.items[0]) === 'Loading...') {
            return false;
        }
        return true;
    };
    ContextMenu.prototype.GetItemCount = function () {
        return this.items.length;
    };
    ContextMenu.prototype.GetItemBySequence = function (sequence) {
        return this.items[sequence];
    };
    ContextMenu.prototype.VerifyItems = function (expectedItems, requireExactMatch) {
        if (requireExactMatch && expectedItems.length !== this.items.length) {
            throw "Found " + this.items.length + " context menu items but expected " + expectedItems.length;
        }
        for (var i = 0; i < expectedItems.length; i++) {
            var expectedItem = expectedItems[i];
            if (requireExactMatch) {
                this.VerifyItem(i, expectedItem);
            }
            else {
                var item = this.GetItem(expectedItem);
                if (item) {
                    TAB.Log.Pass("Verified expected context menu item \"" + expectedItem.title + "\"");
                }
                else if (expectedItem.isOptional && expectedItem.isOptional()) {
                    TAB.Log.Warning("Did not find optional context menu item \"" + expectedItem.title + "\"");
                }
                else {
                    throw "Did not find context menu item \"" + expectedItem.title + "\"";
                }
            }
        }
    };
    ContextMenu.prototype.VerifyItem = function (index, expectedItem) {
        var contextMenuItem = this.items[index];
        if (!contextMenuItem) {
            throw "No menu item found at index " + index;
        }
        var expectedTitle = expectedItem.title;
        var itemTitle = TAB.GetTextContent(contextMenuItem);
        // Trim icon characters (unless the expected text has icons)
        if (typeof expectedTitle === 'string' && (!expectedTitle || expectedTitle.charCodeAt(0) < 128)) {
            while (itemTitle.charCodeAt(0) > 127) {
                itemTitle = itemTitle.slice(1);
            }
        }
        if (typeof expectedTitle === 'string') {
            TAB.Log.VerifyEquals(itemTitle.toUpperCase(), expectedTitle.toUpperCase(), "Verified expected context menu item " + expectedTitle);
        }
        else {
            TAB.Log.Verify(expectedTitle.test(itemTitle), "Verified expected context menu item matching regex " + expectedTitle);
        }
    };
    ContextMenu.prototype.AddTaskClickItem = function (title) {
        var _this = this;
        var commandInfo = typeof title === 'string' ? { title: title } : title;
        TAB.Log.AddTaskComment("Clicking context menu for item with title \"" + commandInfo.title + "\" or with automationId \"" + commandInfo.automationId + "\".");
        TAB.AddTask(TAB.MakeTask(function () {
            var menuItem = _this.GetItem(title);
            TAB.ClickElement(menuItem);
        }));
    };
    ContextMenu.prototype.AddTaskClickItemByIndex = function (index) {
        var _this = this;
        TAB.Log.AddTaskComment("Clicking context menu for item in index \"" + index + "\".");
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.ClickElement(_this.items[index]);
        }));
    };
    ContextMenu.prototype.GetItem = function (title) {
        this._getItems();
        var elementClass = 'ms-ContextualMenu-itemText';
        var expectedTitle = typeof title === 'object' ? title.title : title;
        var expectedAutomationId = typeof title === 'object' ? title.automationId : undefined;
        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
            var item = _a[_i];
            var itemTitleSpan = TAB.GetElement(item, TAB.searchBy.hasClassName, elementClass);
            var itemTitle = TAB.GetTextContent(itemTitleSpan);
            var itemAutomationId = item.getAttribute('data-automationid');
            if ((typeof expectedTitle === 'string' && itemTitle.toUpperCase() === expectedTitle.toUpperCase())
                || (typeof expectedTitle === 'object' && expectedTitle.test(itemTitle))) {
                return item;
            }
            else if (!expectedTitle) {
                if (!expectedAutomationId || !itemAutomationId) {
                    continue; // There wasn't a title to test, use automationId to test.
                }
                if (expectedAutomationId === itemAutomationId) {
                    return item; // There wasn't a title to test, but the item did match the given automationId
                }
            }
        }
        return undefined;
    };
    ContextMenu.prototype.GetItems = function () {
        var items = this._getItems();
        var wrapperItems = [];
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var itemTitleSpan = TAB.GetElement(item, TAB.searchBy.hasClassName, 'ms-ContextualMenu-itemText');
            var itemTitle = TAB.GetTextContent(itemTitleSpan);
            var iconElement = TAB.GetElements(item, TAB.searchBy.hasClassName, 'ms-Icon')[0];
            var iconClassName = iconElement ? iconElement.getAttribute('data-icon-name') : '';
            wrapperItems.push({
                Title: itemTitle,
                IconClassName: iconClassName
            });
        }
        return wrapperItems;
    };
    ContextMenu.prototype._getItems = function () {
        var elementText = 'ms-ContextualMenu-link';
        this.items = TAB.GetElements(this.root, TAB.searchBy.hasClassName, elementText);
        return this.items;
    };
    return ContextMenu;
}());



/***/ }),

/***/ "ymC6":
/*!*************************************************!*\
  !*** ./lib/SPTaskLib/Controls/PeopleWebpart.js ***!
  \*************************************************/
/*! exports provided: PeopleCardLayout, PeopleWebpart */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeopleCardLayout", function() { return PeopleCardLayout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PeopleWebpart", function() { return PeopleWebpart; });
/* harmony import */ var _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseWebpart */ "35UN");
/* harmony import */ var _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Pages/Canvas */ "mmJW");
/* harmony import */ var _ReactUtil__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ReactUtil */ "Qf+y");
/* harmony import */ var _Next__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Next */ "BJbA");
/* harmony import */ var _Utilities_ClientFeatures__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Utilities/ClientFeatures */ "zTnS");
/* harmony import */ var _WebLibrary__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../WebLibrary */ "Ckxo");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();






/**
 * @public
 */
var PeopleCardLayout;
(function (PeopleCardLayout) {
    PeopleCardLayout[PeopleCardLayout["Compact"] = 0] = "Compact";
    PeopleCardLayout[PeopleCardLayout["Large"] = 1] = "Large";
})(PeopleCardLayout || (PeopleCardLayout = {}));
/**
 * @public
 */
var PeopleWebpart = /** @class */ (function (_super) {
    __extends(PeopleWebpart, _super);
    function PeopleWebpart() {
        var _this = _super.call(this, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].People, _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["WebpartType"].People.toString()) || this;
        _this.PersonImageAreaId = 'ms-Persona-imageArea';
        _this._persons = [];
        return _this;
    }
    PeopleWebpart.prototype.AddTaskAddOnTeamSitePage = function () {
        var _this = this;
        TAB.MakeTask(function () {
            _this.AddTaskSetupNewPage();
            _this.AddTaskAssertWebPartNotExist();
            _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].AddTaskCreateWebPart(_this);
        })
            .WaitFor(this.WaitForWebPartToExist());
    };
    PeopleWebpart.prototype.WaitForWebPartToExist = function () {
        return TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, this._constructQuery('[id^="people-searcher-id"]'));
    };
    PeopleWebpart.prototype.AddTaskTryAddPeople = function (name, shouldBeFound) {
        var _this = this;
        var addPersonInput;
        var userResult = {};
        if (shouldBeFound) {
            TAB.AddTask(TAB.MakeTask(function () {
                _WebLibrary__WEBPACK_IMPORTED_MODULE_5__["Web"].addCsomTaskGetUserFromWeb(name, userResult);
            }), TAB.MakeWaiter(function () {
                if (userResult.title !== undefined) {
                    // Store person full name to ensure the person is added successfully
                    _this._persons.push({
                        name: name,
                        title: userResult.title // `userResult.title` equals to person full name which is displayed on the people card
                    });
                    return true;
                }
            }));
        }
        TAB.AddTask(TAB.MakeTask(function () {
            addPersonInput = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, _this._constructQuery('[id^="people-searcher-id"]'));
            // input the people name
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(addPersonInput, name);
        }), shouldBeFound
            ? TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-PeoplePicker-personaContent')
            : TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.hasClassName, 'ms-Suggestions-none'));
        if (!shouldBeFound) {
            return;
        }
        TAB.AddTask(TAB.MakeTask(function () {
            // press Enter to select the person
            TAB.FireKeyboardEvent(addPersonInput, 'keydown', _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["KeyCodes"].enter);
        }), TAB.MakeWaiter(function () {
            var allPeopleCards = _this.GetPeopleCards();
            var targetPeopleCard = _this.GetPeopleCard(name);
            // The new people card added is always in the last position
            return allPeopleCards.indexOf(targetPeopleCard) === allPeopleCards.length - 1;
        }));
    };
    PeopleWebpart.prototype.AddTaskDeletePeople = function (name) {
        var _this = this;
        var targetPeopleCard;
        TAB.AddTask(TAB.MakeTask(function () {
            targetPeopleCard = _this.GetPeopleCard(name);
            var deleteButton = TAB.GetElement(targetPeopleCard, TAB.searchBy.partialClassName, 'deleteButton');
            // click delete button
            TAB.ClickElement(deleteButton);
            _this._persons = _this._persons.filter(function (person) { return person.name !== name; });
        }), TAB.MakeWaiter(function () {
            var allPeopleCards = _this.GetPeopleCards();
            return allPeopleCards.indexOf(targetPeopleCard) === -1;
        }));
    };
    PeopleWebpart.prototype.GetPeopleCards = function () {
        if (_Utilities_ClientFeatures__WEBPACK_IMPORTED_MODULE_4__["ClientFeatures"].isKillSwitchEnabled('28be23da-d13c-4996-8926-a876bc8c7547')) {
            var peopleList = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, this._constructQuery('[class*="peopleList"]'));
            var peopleCards = Array.prototype.slice.call(TAB.GetElements(peopleList, TAB.searchBy.partialClassName, 'peopleCard'));
            return peopleCards;
        }
        else {
            var peopleCards = Array.prototype.slice.call(TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, '[data-automation-id="people-card"]'));
            return peopleCards;
        }
    };
    PeopleWebpart.prototype.GetPeopleCard = function (name) {
        var peopleCards = this.GetPeopleCards();
        var person = this._persons.filter(function (personInfo) { return personInfo.name === name; })[0];
        if (person && person.title) {
            for (var i = 0; i < peopleCards.length; i++) {
                if (peopleCards[i].textContent.search(new RegExp(person.title, 'i')) !== -1) {
                    return peopleCards[i];
                }
            }
        }
        return undefined;
    };
    PeopleWebpart.prototype.AddTaskOpenLivePersonaCard = function (name, shouldHover) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            var peopleCard = _this.GetPeopleCard(name);
            var imageArea = TAB.GetElement(peopleCard, TAB.searchBy.hasClassName, _this.PersonImageAreaId);
            if (shouldHover) {
                // hover on the image of people card
                var mousemoveEvent = TAB.Win.document.createEvent('HTMLEvents');
                mousemoveEvent.initEvent('mousemove', true /*bubble*/, false /*cancelable*/);
                imageArea.dispatchEvent(mousemoveEvent);
            }
            else {
                TAB.ClickElement(imageArea);
            }
        }), 
        // wait for the live persona card to expand
        TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, '[data-log-name="UserInfoBlock"]'));
    };
    PeopleWebpart.prototype.AddTaskClickPeopleCard = function (name) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking on the people card (no waiter)');
            var peopleCard = _this.GetPeopleCard(name);
            var imageArea = TAB.GetElement(peopleCard, TAB.searchBy.hasClassName, _this.PersonImageAreaId);
            TAB.ClickElement(imageArea);
        }));
    };
    PeopleWebpart.prototype.AddTaskCloseLivePersonaCard = function (shouldPressEsc) {
        TAB.AddTask(TAB.MakeTask(function () {
            if (shouldPressEsc) {
                var cardElement = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, '[data-log-region="LivePersonaCard"]');
                TAB.FireKeyboardEvent(cardElement, 'keydown', _BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["KeyCodes"].escape);
            }
            else {
                // Click outside of live persona card.
                TAB.ClickElement(TAB.Win.document.body);
            }
        }), TAB.MakeWaiter(function () {
            return !TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, '[data-log-region="LivePersonaCard"]');
        }));
    };
    PeopleWebpart.prototype.AddTaskChangePeopleCardLayout = function (layout) {
        var _this = this;
        TAB.Log.AddTaskComment('Open property pane');
        TAB.AddTask(TAB.MakeTask(function () {
            _this.AddTaskClickConfigureButton();
        }), 
        // There will be animation when opening the property pane
        // @todo: VSO #389757 - Change this to use data-automation-id values once available from Property Pane
        TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.customQuery, "[class^=\"propertyPaneChoiceGroup\"] input[type=\"radio\"]"));
        TAB.Log.AddTaskComment('Click the layout choice radio button');
        var layoutClassName = PeopleCardLayout[layout][0].toLowerCase() + PeopleCardLayout[layout].slice(1) + "Layout";
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Get the layout choice group in property pane');
            var layoutChoiceGroup = TAB.GetElements(TAB.Win, TAB.searchBy.customQuery, "[class*=\"propertyPaneChoiceGroup\"] input[type=\"radio\"]");
            layoutChoiceGroup[layout].click();
        }), TAB.WaitForElementToExist(TAB.Win, TAB.searchBy.partialClassName, layoutClassName));
    };
    PeopleWebpart.prototype.AddTaskEditPeopleLink = function (name, url, title) {
        var _this = this;
        TAB.Log.AddTaskComment('Open page picker');
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Get the people card and click the link button');
            var peopleCard = _this.GetPeopleCard(name);
            var peopleLinkEditButton = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(peopleCard, 'peopleLinkEditButton');
            TAB.ClickElement(peopleLinkEditButton);
        }), _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].WaitForElementsByDataAutomationId(TAB.Win, 'pagePickerUrlTextField'));
        TAB.Log.AddTaskComment('Add the link with URL and title');
        TAB.AddTask(TAB.MakeTask(function () {
            var urlTextField = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'pagePickerUrlTextField');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(urlTextField, url);
            var titleTextField = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'pagePickerTitleTextField');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(titleTextField, title);
            TAB.Log.Comment('Save the URL and title');
            var saveButton = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(TAB.Win.document.body, 'pagePickerSaveButton');
            TAB.ClickElement(saveButton);
        }), TAB.MakeWaiter(function () {
            var peopleLink = TAB.GetElement(TAB.Win, TAB.searchBy.customQuery, _this._constructQuery('[data-automation-id="peopleLinkEditButton"]'));
            return peopleLink && peopleLink.textContent === title;
        }));
    };
    PeopleWebpart.prototype.AddTaskEditPeopleDescription = function (name, description) {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Get the people card and edit the description');
            var peopleCard = _this.GetPeopleCard(name);
            var descriptionTextField = _Next__WEBPACK_IMPORTED_MODULE_3__["Next"].GetElementByDataAutomationId(peopleCard, 'peopleDescriptionTextField');
            _ReactUtil__WEBPACK_IMPORTED_MODULE_2__["ReactUtil"].TriggerOnChange(descriptionTextField, description);
        }));
    };
    PeopleWebpart.prototype.AddTaskAssertWebPartNotExist = function () {
        var _this = this;
        TAB.MakeTask(function () {
            if (TAB.ElementExists(TAB.Win, TAB.searchBy.customQuery, _this._constructQuery('[id^="people-searcher-id"]'))) {
                throw 'People web part should not exist.';
            }
        })
            .WaitFor(undefined);
    };
    /**
     * Constructs a query string which limit the query scope down to the page content part.
     * Page content part may be the canvas of a site page, or the event page content of event page.
     * todo: VSO#576400, the ideal solution is web part base should support querying inside web part instance level.
     * @param query - the original query.
     */
    PeopleWebpart.prototype._constructQuery = function (query) {
        return "." + _Pages_Canvas__WEBPACK_IMPORTED_MODULE_1__["Canvas"].CanvasContentClassName + " " + query + ", [class*=\"eventPageContent\"] " + query;
    };
    PeopleWebpart.IndexInToolbox = 26;
    return PeopleWebpart;
}(_BaseWebpart__WEBPACK_IMPORTED_MODULE_0__["BaseWebpart"]));



/***/ }),

/***/ "zI0m":
/*!***********************************************!*\
  !*** ./lib/SPTaskLib/Controls/NewsPinning.js ***!
  \***********************************************/
/*! exports provided: NewsPinning */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsPinning", function() { return NewsPinning; });
var PinningDataAutomationId;
(function (PinningDataAutomationId) {
    PinningDataAutomationId["PinningPanel"] = "pinningNewsPanel";
    PinningDataAutomationId["AddPinningButton"] = "pinningNewsButton";
    PinningDataAutomationId["PinningList"] = "pinnedList";
    PinningDataAutomationId["RecentList"] = "recentList";
})(PinningDataAutomationId || (PinningDataAutomationId = {}));
var PinningClassName;
(function (PinningClassName) {
    PinningClassName["PinningPanelCloseButton"] = "ms-Panel-closeButton";
    PinningClassName["PinningNewsSearchBox"] = "ms-pinningNewsSearchBox";
    PinningClassName["PinningPanelAvoidDrag"] = "avoidDragPanel";
})(PinningClassName || (PinningClassName = {}));
/**
 * @public
 */
var NewsPinning = /** @class */ (function () {
    function NewsPinning() {
    }
    NewsPinning._fireMouseEvent = function (type, elem, centerX, centerY) {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);
        elem.dispatchEvent(evt);
    };
    NewsPinning.prototype.GetRecentNewsTitleByDataAutomationId = function (dataAutomationId) {
        var item = this._getPinningPanelElement(dataAutomationId);
        var element = TAB.GetElement(item, TAB.searchBy.tag, 'a');
        return element ? element.innerText : undefined;
    };
    NewsPinning.prototype.GetPinnedNewsTitleByDataAutomationId = function (dataAutomationId, dragOnPanel) {
        var item = dragOnPanel
            ? this._getPinningPanelElement(dataAutomationId)
            : this._getElementByDataAutomationId(dataAutomationId);
        return item ? item.innerText.trimEnd().trimStart() : undefined;
    };
    NewsPinning.prototype.AddTaskDeleteNews = function (automationId, dragOnPanel) {
        var _this = this;
        var title;
        TAB.AddTask(TAB.MakeTask(function () {
            title = _this.GetPinnedNewsTitleByDataAutomationId(automationId, dragOnPanel);
            TAB.Log.AddTaskComment('Clicking delete pinned news button');
            dragOnPanel
                ? TAB.ClickElement(_this._getPinningPanelElement(automationId + "_removeIcon"))
                : TAB.ClickElement(_this._getElementByDataAutomationId(automationId + "_removeIcon"));
        }), TAB.MakeWaiter(function () {
            TAB.Log.AddTaskComment('Waiting for pinning news delete');
            return _this.GetPinnedNewsTitleByDataAutomationId(automationId, dragOnPanel) !== title;
        }));
    };
    NewsPinning.prototype.AddTaskTimer = function (times) {
        var _this = this;
        var timeElapsed = 0;
        TAB.AddTask(undefined, TAB.AndWaiters(TAB.MakeWaiter(function () {
            while (timeElapsed < times) {
                timeElapsed++;
            }
            return true;
        }), TAB.MakeWaiter(function () {
            return !Boolean(_this._getElementByClassName(PinningClassName.PinningPanelAvoidDrag));
        })));
    };
    /*
      * This method takes care of drag and drop on the pinning panel and property pane pinning list.
      * dragWithInList: rearrange element with in the list
      * dragOnPanel: rearrange list on pinning panel
    */
    NewsPinning.prototype.AddTaskDragAndDropItem = function (dropStartAutomationId, dropEndAutomationId, droppingAutomationId, dragWithInList, dragOnPanel) {
        var _this = this;
        // FireMouseEvent is not allowed in Edge due to initMouseEvent deprecation
        // Fix required in TABCore VSO#405141
        if (navigator.userAgent.toLowerCase().indexOf('edge') > -1) {
            TAB.Log.AddTaskWarning('Skipping test: Fire mouse event is not permitted in Edge.');
            return;
        }
        var item;
        var targetElement;
        var itemOffset, targetItemOffset;
        var dropX, dropY;
        var dragElementTitle;
        TAB.Log.AddTaskComment('starting drag and drop');
        TAB.AddTask(TAB.MakeTask(function () {
            item = dragOnPanel
                ? _this._getPinningPanelElement(dropStartAutomationId)
                : _this._getElementByDataAutomationId(dropStartAutomationId);
            targetElement = dragOnPanel
                ? _this._getPinningPanelElement(dropEndAutomationId)
                : _this._getElementByDataAutomationId(dropEndAutomationId);
            itemOffset = TAB.GetElementOffset(item);
            targetItemOffset = TAB.GetElementOffset(targetElement);
            dragElementTitle = dragWithInList
                ? _this.GetPinnedNewsTitleByDataAutomationId(dropStartAutomationId, dragOnPanel)
                : _this.GetRecentNewsTitleByDataAutomationId(dropStartAutomationId);
            TAB.Log.Comment('Drag element title ' + dragElementTitle);
            var dragX = Math.round(itemOffset.left + item.clientWidth / 2);
            var dragY = Math.round(itemOffset.top + item.clientHeight / 2);
            dropX = Math.round(targetItemOffset.left + item.clientWidth / 2);
            dropY = Math.round(targetItemOffset.top + item.clientHeight / 2);
            // TAB framework doesn't provide drag* mouse events.
            // But here we need drag events to simulate HTML5 drag and drop.
            // It's inspired by https://ghostinspector.com/blog/simulate-drag-and-drop-javascript-casperjs/
            TAB.Log.Comment('Mouse over dragged element and mousedown');
            NewsPinning._fireMouseEvent('mousemove', item, dragX, dragY);
            NewsPinning._fireMouseEvent('mouseenter', item, dragX, dragY);
            NewsPinning._fireMouseEvent('mouseover', item, dragX, dragY);
            NewsPinning._fireMouseEvent('mousedown', item, dragX, dragY);
            TAB.Log.Comment('Start dragging process over to drop target');
            NewsPinning._fireMouseEvent('dragstart', item, dragX, dragY);
            NewsPinning._fireMouseEvent('drag', item, dragX, dragY);
            NewsPinning._fireMouseEvent('mousemove', item, dragX, dragY);
            NewsPinning._fireMouseEvent('drag', item, dropX, dropY);
            NewsPinning._fireMouseEvent('mousemove', targetElement, dropX, dropY);
        }), TAB.MakeWaiter(function () {
            try {
                TAB.Log.Comment('Trigger dragging process under drop target');
                NewsPinning._fireMouseEvent('mouseenter', targetElement, dropX, dropY);
                NewsPinning._fireMouseEvent('dragenter', targetElement, dropX, dropY);
                NewsPinning._fireMouseEvent('mouseover', targetElement, dropX, dropY);
                NewsPinning._fireMouseEvent('dragover', targetElement, dropX, dropY);
                return true;
            }
            catch (e) {
                return false;
            }
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Release dragged element under drop target');
            NewsPinning._fireMouseEvent('drop', targetElement, dropX, dropY);
            NewsPinning._fireMouseEvent('dragend', item, dropX, dropY);
            NewsPinning._fireMouseEvent('mouseup', item, dropX, dropY);
        }), TAB.MakeWaiter(function () {
            try {
                TAB.Log.Comment('Waiting for drop element to render');
                return _this.GetPinnedNewsTitleByDataAutomationId(droppingAutomationId, dragOnPanel) === dragElementTitle;
            }
            catch (error) {
                return false;
            }
        }));
    };
    NewsPinning.prototype.AddTaskClickAddPinningNews = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for add button");
        }), TAB.MakeWaiter(function () {
            return Boolean(_this._getElementByDataAutomationId(PinningDataAutomationId.AddPinningButton));
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking pinning add button');
            TAB.ClickElement(_this._getElementByDataAutomationId(PinningDataAutomationId.AddPinningButton));
        }), TAB.MakeWaiter(function () {
            TAB.Log.Comment('Waiting for pinning panel');
            return Boolean(_this._getElementByDataAutomationId(PinningDataAutomationId.PinningPanel));
        }));
    };
    NewsPinning.prototype.AddTaskClickClosePinningPanel = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for panel close button");
        }), TAB.MakeWaiter(function () {
            return Boolean(_this._getElementByClassName(PinningClassName.PinningPanelCloseButton));
        }));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking pinning panel close button');
            TAB.ClickElement(_this._getElementByClassName(PinningClassName.PinningPanelCloseButton));
        }), TAB.MakeWaiter(function () {
            TAB.Log.Comment('Waiting for property pane add button');
            return Boolean(_this._getElementByDataAutomationId(PinningDataAutomationId.AddPinningButton));
        }));
    };
    NewsPinning.prototype.AddTaskCheckPinnedListRenders = function () {
        var _this = this;
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment("Waiting for pinned list");
        }), TAB.MakeWaiter(function () {
            return Boolean(_this._getElementByDataAutomationId(PinningDataAutomationId.PinningList));
        }));
    };
    NewsPinning.prototype.AddTaskCheckPanelPinnedListRenders = function () {
        TAB.AddTask(undefined, this._waitForPinningPanelElement(PinningDataAutomationId.PinningList));
    };
    // ToDo:
    //  Check deleted item is added to recent list
    //  Check the dragged element is not in the recent list
    NewsPinning.prototype.AddTaskCheckPanelRecentListRenders = function () {
        TAB.AddTask(undefined, this._waitForPinningPanelElement(PinningDataAutomationId.RecentList));
    };
    // ToDo:
    // check the news article is rendered in the recent list
    // Drag and drop flow
    NewsPinning.prototype.AddTaskCheckPanelSearchBoxRenders = function () {
        var _this = this;
        var searchNews = 'test';
        TAB.AddTask(undefined, this._waitForPinningPanelElementByClassName(PinningClassName.PinningNewsSearchBox));
        TAB.AddTask(TAB.MakeTask(function () {
            TAB.Log.Comment('Clicking inside search box');
            var searchBox = _this._getPinningPanelElementByClassName(PinningClassName.PinningNewsSearchBox);
            var inputBox = _this._getElementByClassName('ms-SearchBox-field', searchBox);
            _this._makeEntry(inputBox, searchNews);
        }), this._waitForPinningPanelElement(PinningDataAutomationId.RecentList));
    };
    NewsPinning.prototype._makeEntry = function (input, text) {
        var focusEv = TAB.Win.document.createEvent('HTMLEvents');
        focusEv.initEvent('focus', true /*bubble*/, false /*cancelable*/);
        input.dispatchEvent(focusEv);
        input.value = text;
        var ev = TAB.Win.document.createEvent('HTMLEvents');
        ev.initEvent('input', true /*bubble*/, false /*cancelable*/);
        input.dispatchEvent(ev);
        // press Enter
        TAB.FireKeyboardEvent(input, 'keydown', 13);
        var blurEv = TAB.Win.document.createEvent('HTMLEvents');
        blurEv.initEvent('blur', true /*bubble*/, false /*cancelable*/);
        input.dispatchEvent(blurEv);
    };
    NewsPinning.prototype._waitForPinningPanelElementByClassName = function (elementClassName) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            return Boolean(_this._getPinningPanelElementByClassName(elementClassName));
        });
    };
    NewsPinning.prototype._getPinningPanelElementByClassName = function (elementClassName) {
        try {
            var pinningPanel = this._getElementByDataAutomationId(PinningDataAutomationId.PinningPanel);
            return TAB.GetElement(pinningPanel, TAB.searchBy.partialClassName, elementClassName);
        }
        catch (e) {
            return undefined;
        }
    };
    NewsPinning.prototype._waitForPinningPanelElement = function (elementId) {
        var _this = this;
        return TAB.MakeWaiter(function () {
            return Boolean(_this._getPinningPanelElement(elementId));
        });
    };
    NewsPinning.prototype._getPinningPanelElement = function (elementId) {
        try {
            var pinningPanel = this._getElementByDataAutomationId(PinningDataAutomationId.PinningPanel);
            return TAB.GetElement(pinningPanel, TAB.searchBy.customQuery, "[data-automation-id=" + elementId + "]");
        }
        catch (e) {
            return undefined;
        }
    };
    NewsPinning.prototype._getElementByDataAutomationId = function (dataAutomationId, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.GetElement(searchObj, TAB.searchBy.customQuery, "[data-automation-id='" + dataAutomationId + "']");
        }
        catch (e) {
            return undefined;
        }
    };
    NewsPinning.prototype._getElementByClassName = function (className, searchObj) {
        if (searchObj === void 0) { searchObj = TAB.Win; }
        try {
            return TAB.GetElement(searchObj, TAB.searchBy.partialClassName, className);
        }
        catch (e) {
            return undefined;
        }
    };
    return NewsPinning;
}());



/***/ }),

/***/ "zTnS":
/*!***************************************************!*\
  !*** ./lib/SPTaskLib/Utilities/ClientFeatures.js ***!
  \***************************************************/
/*! exports provided: ClientFeatures */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClientFeatures", function() { return ClientFeatures; });
// tslint:disable
/**
 * This is in SP-Client because there is code in the TAB Tasklib (CommandBar related) that is copied from odsp-next.
 * This code will *only* work in odsp-next applications, not in SPFx application (as it doesn't have the global
 * "_spPageContextInfo").
 * Don't use this in test for sp-client codebase.
 *
 * @public
 */
var ClientFeatures = /** @class */ (function () {
    function ClientFeatures() {
    }
    ClientFeatures.IsODBFeatureEnabled = function (feature, fallback) {
        var result = fallback || false;
        var pageContext = TAB.Win.window._spPageContextInfo;
        var Flighting = TAB.Win.window.Flighting; // Old SharePoint pages use this.
        if (pageContext) {
            if (!pageContext.ExpFeatures && Flighting && Flighting.ExpFeatures) {
                pageContext.ExpFeatures = Flighting.ExpFeatures;
            }
            if (pageContext.ExpFeatures && feature > 0) {
                var elem = Math.floor(feature / 32);
                var mask = 1 << (feature % 32);
                result = elem < pageContext.ExpFeatures.length &&
                    (pageContext.ExpFeatures[elem] & mask) !== 0;
            }
        }
        // additionally check if there is an override
        var overrides = TAB.Win.window.sessionStorage.getItem(ClientFeatures.KEY_FEATURE_OVERRIDE_STORE);
        if (overrides) {
            var overridesObj = JSON.parse(overrides);
            if (overridesObj.hasOwnProperty(feature)) {
                result = Boolean(overridesObj[feature]);
            }
        }
        return result;
    };
    ClientFeatures.isKillSwitchEnabled = function (killSwitchId) {
        var pageContext = TAB.Win.window._spPageContextInfo;
        return !!(pageContext && pageContext.killSwitches && pageContext.killSwitches[killSwitchId]);
    };
    ClientFeatures.IsTeamSiteSupportPound = function () {
        var pageContext = TAB.Win.window._spPageContextInfo;
        return pageContext && pageContext.supportPoundStorePath && pageContext.supportPercentStorePath;
    };
    ClientFeatures.SetOverrideFeature = function (featureId, isEnabled) {
        var overridesStr = TAB.Win.window.sessionStorage.getItem(ClientFeatures.KEY_FEATURE_OVERRIDE_STORE);
        var overrides = overridesStr && JSON.parse(overridesStr) || {};
        overrides[featureId] = isEnabled; // No matter already existed, set to the target enable status
        TAB.Win.window.sessionStorage.setItem(ClientFeatures.KEY_FEATURE_OVERRIDE_STORE, JSON.stringify(overrides));
    };
    ClientFeatures.KEY_FEATURE_OVERRIDE_STORE = 'FeatureOverridesstore';
    return ClientFeatures;
}());

// tslint:enable


/***/ })

/******/ });
//# sourceMappingURL=sp-tab-tasklib.js.map