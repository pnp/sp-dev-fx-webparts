"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var PnpJsCrudWithBatch_module_scss_1 = require("./PnpJsCrudWithBatch.module.scss");
var strings = require("pnpJsCrudWithBatchStrings");
var pnp = require("sp-pnp-js");
var PnpJsCrudWithBatchWebPart = (function (_super) {
    __extends(PnpJsCrudWithBatchWebPart, _super);
    function PnpJsCrudWithBatchWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PnpJsCrudWithBatchWebPart.prototype.onInit = function () {
        return new Promise(function (resolve, reject) {
            pnp.setup({
                headers: {
                    'Accept': 'application/json;odata=nometadata'
                }
            });
            resolve();
        });
    };
    PnpJsCrudWithBatchWebPart.prototype.render = function () {
        this.domElement.innerHTML = "\n  <div class=\"" + PnpJsCrudWithBatch_module_scss_1.default.spPnPJsCrud + "\">\n    <div class=\"" + PnpJsCrudWithBatch_module_scss_1.default.container + "\">\n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + PnpJsCrudWithBatch_module_scss_1.default.row + "\">\n        <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <span class=\"ms-font-xl ms-fontColor-white\">\n            Sample SharePoint CRUD operations using the SP PnP JS library\n          </span>\n        </div>\n      </div>\n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + PnpJsCrudWithBatch_module_scss_1.default.row + "\">\n        <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <button class=\"" + PnpJsCrudWithBatch_module_scss_1.default.button + " create-Button\">\n            <span class=\"" + PnpJsCrudWithBatch_module_scss_1.default.label + "\">Create item</span>\n          </button>          \n        </div>\n      </div>\n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + PnpJsCrudWithBatch_module_scss_1.default.row + "\">\n        <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <button class=\"" + PnpJsCrudWithBatch_module_scss_1.default.button + " readall-Button\">\n            <span class=\"" + PnpJsCrudWithBatch_module_scss_1.default.label + "\">Read all items</span>\n          </button>\n        </div>\n      </div>\n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + PnpJsCrudWithBatch_module_scss_1.default.row + "\">\n        <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <button class=\"" + PnpJsCrudWithBatch_module_scss_1.default.button + " update-Button\">\n            <span class=\"" + PnpJsCrudWithBatch_module_scss_1.default.label + "\">Update latest items</span>\n          </button>\n          <button class=\"" + PnpJsCrudWithBatch_module_scss_1.default.button + " delete-Button\">\n            <span class=\"" + PnpJsCrudWithBatch_module_scss_1.default.label + "\">Delete item</span>\n          </button>\n        </div>\n      </div>\n      <div class=\"ms-Grid-row ms-bgColor-themeDark ms-fontColor-white " + PnpJsCrudWithBatch_module_scss_1.default.row + "\">\n        <div class=\"ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1\">\n          <div class=\"status\"></div>\n          <ul class=\"items\"><ul>\n        </div>\n      </div>\n    </div>\n  </div>\n    ";
        this.updateStatus(this.listNotConfigured() ? 'Please configure list in Web Part properties' : 'Ready');
        this.setButtonsState();
        this.setButtonsEventHandlers();
    };
    PnpJsCrudWithBatchWebPart.prototype.setButtonsState = function () {
        var buttons = this.domElement.querySelectorAll("button." + PnpJsCrudWithBatch_module_scss_1.default.button);
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
    PnpJsCrudWithBatchWebPart.prototype.setButtonsEventHandlers = function () {
        var webPart = this;
        this.domElement.querySelector('button.create-Button').addEventListener('click', function () { webPart.createItem(); });
        this.domElement.querySelector('button.readall-Button').addEventListener('click', function () { webPart.readItems(); });
        this.domElement.querySelector('button.update-Button').addEventListener('click', function () { webPart.updateItem(); });
        this.domElement.querySelector('button.delete-Button').addEventListener('click', function () { webPart.deleteItem(); });
    };
    Object.defineProperty(PnpJsCrudWithBatchWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    PnpJsCrudWithBatchWebPart.prototype.getPropertyPaneConfiguration = function () {
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
    PnpJsCrudWithBatchWebPart.prototype.listNotConfigured = function () {
        return this.properties.listName === undefined ||
            this.properties.listName === null ||
            this.properties.listName.length === 0;
    };
    PnpJsCrudWithBatchWebPart.prototype.createItem = function () {
        var _this = this;
        this.updateStatus('Creating item...');
        pnp.sp.web.lists.getByTitle(this.properties.listName).getListItemEntityTypeFullName().then(function (entityTypeFullName) {
            var batch = pnp.sp.web.createBatch();
            var list = pnp.sp.web.lists.getByTitle(_this.properties.listName);
            //todo - associate with a slider/dropdown/textbox to set number of items
            for (var i = 0; i < 5; i++) {
                list.items.inBatch(batch).add({ Title: "Batch add " + i }, entityTypeFullName).then(function (d) { return console.log(d); });
            }
            batch.execute().then(function (d) {
                _this.updateStatus("Items successfully created via batch");
            }).catch(function (error) {
                _this.updateStatus("Error occured while creating items: " + error);
            });
        });
    };
    PnpJsCrudWithBatchWebPart.prototype.getLatestItemId = function () {
        var _this = this;
        //todo - associate with a slider/dropdown/textbox to set number of items
        return new Promise(function (resolve, reject) {
            pnp.sp.web.lists.getByTitle(_this.properties.listName)
                .items.orderBy('Id', false).top(5).select('Id').get()
                .then(function (items) {
                if (items.length === 0) {
                    resolve(null);
                }
                else {
                    resolve(items);
                }
            }, function (error) {
                reject(error);
            });
        });
    };
    PnpJsCrudWithBatchWebPart.prototype.readItems = function () {
        var _this = this;
        this.updateStatus('Loading all items...');
        var batch = pnp.sp.web.createBatch();
        pnp.sp.web.lists.getByTitle(this.properties.listName).items.select('Title', 'Id').inBatch(batch).get()
            .then(function (items) {
            _this.updateStatus("Successfully loaded " + items.length + " items", items);
        }, function (error) {
            _this.updateStatus('Loading all items failed with error: ' + error);
        });
        batch.execute().then(function () {
            console.log("All is done!");
        });
    };
    PnpJsCrudWithBatchWebPart.prototype.updateItem = function () {
        var _this = this;
        this.updateStatus('Updating latest items...');
        this.getLatestItemId().then(function (items) {
            console.log(items);
            if (items == null) {
                //throw new Error('No items found in the list'); 
                _this.updateStatus('No items found in the list ');
            }
            else {
                var batch_1 = pnp.sp.web.createBatch();
                var list_1 = pnp.sp.web.lists.getByTitle(_this.properties.listName);
                items.forEach(function (element) {
                    list_1.items.getById(element.Id).inBatch(batch_1).update({ Title: "Updated from batch" }).then(function (d) { return console.log(d); });
                });
                batch_1.execute().then(function (d) {
                    var stringOfId = '';
                    items.forEach(function (element) {
                        stringOfId += element.Id + ',';
                    });
                    _this.updateStatus("Item with IDs: " + stringOfId + " successfully updated");
                }).catch(function (error) {
                    _this.updateStatus('Loading latest items failed with error ' + error);
                });
            }
        });
    };
    PnpJsCrudWithBatchWebPart.prototype.deleteItem = function () {
        var _this = this;
        if (!window.confirm('Are you sure you want to delete the latest item?')) {
            return;
        }
        this.updateStatus('Loading latest items...');
        var latestItemId = undefined;
        var etag = undefined;
        this.getLatestItemId().then(function (items) {
            console.log(items);
            if (items == null) {
                //throw new Error('No items found in the list');  
                _this.updateStatus('No items found in the list ');
            }
            else {
                var batch_2 = pnp.sp.web.createBatch();
                var list_2 = pnp.sp.web.lists.getByTitle(_this.properties.listName);
                items.forEach(function (element) {
                    list_2.items.getById(element.Id).inBatch(batch_2).delete().then(function (d) { return console.log(d); });
                });
                batch_2.execute().then(function (d) {
                    var stringOfId = '';
                    items.forEach(function (element) {
                        stringOfId += element.Id + ',';
                    });
                    _this.updateStatus("Item with IDs: " + stringOfId + " successfully deleted");
                }).catch(function (error) {
                    _this.updateStatus('Error deleting item ' + error);
                });
            }
        });
    };
    PnpJsCrudWithBatchWebPart.prototype.updateStatus = function (status, items) {
        if (items === void 0) { items = []; }
        this.domElement.querySelector('.status').innerHTML = status;
        this.updateItemsHtml(items);
    };
    PnpJsCrudWithBatchWebPart.prototype.updateItemsHtml = function (items) {
        var itemsHtml = [];
        for (var i = 0; i < items.length; i++) {
            itemsHtml.push("<li>" + items[i].Title + " (" + items[i].Id + ")</li>");
        }
        this.domElement.querySelector('.items').innerHTML = itemsHtml.join('');
    };
    return PnpJsCrudWithBatchWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PnpJsCrudWithBatchWebPart;

//# sourceMappingURL=PnpJsCrudWithBatchWebPart.js.map
