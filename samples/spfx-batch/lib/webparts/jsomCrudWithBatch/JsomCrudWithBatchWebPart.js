"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var JsomCrudWithBatch_module_scss_1 = require("./JsomCrudWithBatch.module.scss");
var strings = require("jsomCrudWithBatchStrings");
require('sp-init');
require('microsoft-ajax');
require('sp-runtime');
require('sharepoint');
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

//# sourceMappingURL=JsomCrudWithBatchWebPart.js.map
