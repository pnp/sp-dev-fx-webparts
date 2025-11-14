var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import styles from './DynamicFormularGenerator.module.scss';
import { SPHttpClient } from '@microsoft/sp-http';
import { FormControlFluentUI } from '../../../Common/FormControlFluentUI';
import { FieldTypes } from '../../../Common/FieldTypes';
import { Helper } from '../../../Common/Helper';
import { Button, Spinner } from '@fluentui/react-components';
import * as strings from 'DynamicFormularGeneratorWebPartStrings';
import { FlashSettings24Regular } from '@fluentui/react-icons';
var DynamicFormularGenerator = /** @class */ (function (_super) {
    __extends(DynamicFormularGenerator, _super);
    function DynamicFormularGenerator(props) {
        var _this = _super.call(this, props) || this;
        _this.availableFields = null;
        _this.currentViewXML = "";
        _this.currentListID = "";
        _this.parser = null;
        _this.attachmentCtl = null;
        _this.uploadFileList = {};
        _this.handleAttachment = function (eventData) {
            var fileInfo = eventData.target.files[0];
            if (_this.ValidateFileInput(fileInfo)) {
                alert(strings.ErrorInvalidFileType.replace("@FileType", _this.props.allowedUploadFileTypes));
                eventData.target.value = "";
            }
            else {
                _this.uploadFileList[eventData.target.id] = fileInfo;
            }
        };
        _this.saveFormData = function () {
            _this.setState({ isProcessing: true });
            var fieldToSave = {};
            _this.availableFields.value.filter(function (f) { return f.IsUsedInForm && typeof f.FormValue !== "undefined" && f.FormValue !== ""; }).forEach(function (formEntry, index) {
                if (formEntry.FieldTypeKind === FieldTypes.LOOKUP) {
                    fieldToSave[formEntry.InternalName + "Id"] = formEntry.FormValue.Value;
                }
                else
                    fieldToSave[formEntry.InternalName] = formEntry.FormValue;
                if (formEntry.RESTLookup !== undefined && formEntry.RESTLookup !== null) {
                    var lookupValue = formEntry.FormValue;
                    fieldToSave[formEntry.InternalName] = lookupValue.Display;
                    // check if addional value field exists
                    if (formEntry.RESTLookup.TargetValueListField.length > 0) {
                        var lookupValueField = _this.availableFields.value.filter(function (f) { return f.InternalName === formEntry.RESTLookup.TargetValueListField; })[0];
                        if (lookupValueField !== undefined && lookupValueField !== null) {
                            fieldToSave[formEntry.RESTLookup.TargetValueListField] = lookupValue.Value;
                        }
                    }
                }
                // override specific
                /*if (formEntry.FieldTypeKind === FieldTypes.BOOLEAN) {
                  fieldToSave[formEntry.InternalName]=formEntry.FormValue;
                }
                if (formEntry.FieldTypeKind === FieldTypes.CHOICE) {
                  fieldToSave[formEntry.InternalName]=formEntry.FormValue;
                }
                if (formEntry.FieldTypeKind === FieldTypes.MULTICHOICE) {
                  fieldToSave[formEntry.InternalName]=formEntry.FormValue;
                }*/
                if (formEntry.FieldTypeKind === FieldTypes.NUMBER) {
                    if (formEntry.Decimals === 0)
                        fieldToSave[formEntry.InternalName] = parseInt(formEntry.FormValue.toString(), 10);
                    else
                        fieldToSave[formEntry.InternalName] = parseFloat(formEntry.FormValue.toString());
                }
                if (formEntry.FieldTypeKind === FieldTypes.URLORIMAGE) {
                    fieldToSave[formEntry.InternalName] = formEntry.FormValue;
                }
                if (formEntry.FieldTypeKind === FieldTypes.DATETIME) {
                    try {
                        fieldToSave[formEntry.InternalName] = formEntry.FormValue.toISOString();
                    }
                    catch (error) {
                        console.error(error);
                    }
                }
            });
            // Datetime: http://blog.plataformatec.com.br/2014/11/how-to-serialize-date-and-datetime-without-losing-information/
            // https://learn.microsoft.com/en-us/previous-versions/office/sharepoint-visio/jj246742(v=office.15)
            // Content-Type: https://sharepoint.stackexchange.com/questions/187963/rest-add-list-item-of-custom-content-type
            if (_this.props.contentTypeID && _this.props.contentTypeID.length > 0 && _this.props.contentTypeID !== "0") {
                fieldToSave["ContentTypeId"] = _this.props.contentTypeID;
            }
            _this.props.httpClient.post("".concat(_this.props.siteURL, "/_api/web/lists/getbyid('").concat(_this.props.listID, "')/items"), SPHttpClient.configurations.v1, {
                headers: {
                    'Accept': 'application/json;odata=nometadata',
                    'Content-type': 'application/json;odata=nometadata',
                    'odata-version': ''
                },
                body: JSON.stringify(fieldToSave)
            })
                .then(function (x) {
                var test = x.json();
                return test;
            })
                .then(function (item) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            this.sendConfirmationMail(item);
                            this.setState({ isProcessing: false, isAlreadySent: true, isFormValid: false });
                            return [4 /*yield*/, this.uploadAttachments(item)];
                        case 1:
                            _a.sent();
                            alert(typeof this.props.successMessage !== "undefined" ? this.props.successMessage : strings.MSGConfirmationSubmitData);
                            return [2 /*return*/];
                    }
                });
            }); });
        };
        _this.printFormData = function () {
            var body = "<p><strong>".concat(strings.HEADPrintForm, "</strong></p><table>") + _this.availableFields.value.filter(function (f) { return f.IsUsedInForm && typeof f.FormValue !== "undefined"; }).map(function (entry) {
                return "<tr><td>".concat(entry.Title, "</td><td><strong>").concat(Helper.GetFieldValueAsString(entry), "</strong></td></tr>");
            }).join("") + "</table>";
            var wndPrint = window.open("about:blank", "_blank");
            wndPrint.document.write(body);
            wndPrint.document.close();
            wndPrint.focus();
            wndPrint.print();
        };
        _this.resetForm = function () {
            /*if (this.state.isProcessing)
              this.setState({
                "isProcessing": false
              });
            else
              this.setState({
                "isProcessing": true
              });*/
            _this.currentListID = null;
            _this.setState({ formFields: [], isProcessing: false, isFormValid: false, isAlreadySent: false });
        };
        _this._onConfigure = function () {
            _this.props.wpContext.propertyPane.open();
        };
        _this.state = {
            errorMessage: new Array(),
            isFormValid: false,
            isProcessing: false,
            isAlreadySent: false,
            formFields: []
        };
        _this.parser = new DOMParser();
        return _this;
    }
    DynamicFormularGenerator.prototype.getFieldSchemata = function (schemaXML) {
        var xmlDoc = this.parser.parseFromString(schemaXML, "text/xml");
        return xmlDoc.getElementsByTagName("Field")[0];
    };
    DynamicFormularGenerator.prototype.getAttributeValue = function (dom, attributeToRead) {
        if (typeof dom !== "undefined" && dom !== null)
            return dom.getAttribute(attributeToRead);
        return "";
    };
    DynamicFormularGenerator.prototype.qryFormFields = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, temp, parser, xmlDoc, tempFields_1;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!(this.validateConfiguration() && (this.props.viewXml !== this.currentViewXML || this.currentListID !== this.props.listID))) return [3 /*break*/, 2];
                        this.currentViewXML = this.props.viewXml;
                        this.currentListID = this.props.listID;
                        _a = this;
                        return [4 /*yield*/, this.qryListFields(this.props.listID)];
                    case 1:
                        _a.availableFields = _b.sent();
                        temp = this.props.viewXml.replace(/&apos;/g, "'").replace(/&quot;/g, '"').replace(/&gt;/g, '>').replace(/&lt;/g, '<').replace(/&amp;/g, '&');
                        parser = new DOMParser();
                        xmlDoc = parser.parseFromString(temp, "text/xml");
                        tempFields_1 = [];
                        xmlDoc.getElementsByTagName("ViewFields")[0].childNodes.forEach(function (node, index) {
                            var fieldInfo = _this.availableFields.value.filter(function (f) { return f.StaticName === node.getAttribute("Name"); })[0];
                            fieldInfo.IsValid = !fieldInfo.Required;
                            tempFields_1.push(node.getAttribute("Name"));
                        });
                        this.setState({ formFields: tempFields_1 });
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DynamicFormularGenerator.prototype.validateConfiguration = function () {
        return (typeof this.props.viewXml !== "undefined" && typeof this.props.listID !== "undefined");
    };
    DynamicFormularGenerator.prototype.qryListFields = function (listID) {
        var endpoint = "".concat(this.props.siteURL, "/_api/web/lists/getbyid('").concat(listID, "')/Fields");
        return this.props.httpClient.get(endpoint, SPHttpClient.configurations.v1)
            .then(function (response) {
            return response.json();
        });
    };
    DynamicFormularGenerator.prototype.getFieldMetaData = function (fieldInfo) {
        var fieldSchemata = this.getFieldSchemata(fieldInfo.SchemaXml);
        fieldInfo.Decimals = 0;
        if (fieldInfo.FieldTypeKind === FieldTypes.NUMBER) {
            fieldInfo.Decimals = parseInt(this.getAttributeValue(fieldSchemata, "Decimals"), 10);
            if (fieldInfo.DefaultValue === null)
                fieldInfo.DefaultValue = "0";
        }
        if (fieldInfo.FieldTypeKind === FieldTypes.CURRENCY) {
            fieldInfo.Decimals = 2;
            fieldInfo.CurrencyLocaleId = parseInt(this.getAttributeValue(fieldSchemata, "CurrencyLocaleId"), 10);
            fieldInfo.CommaSeparator = this.getAttributeValue(fieldSchemata, "CommaSeparator") === "true";
            if (fieldInfo.DefaultValue === null)
                fieldInfo.DefaultValue = "0";
        }
        if (fieldInfo.FieldTypeKind === FieldTypes.CHOICE || fieldInfo.FieldTypeKind === FieldTypes.MULTICHOICE) {
            if (typeof fieldInfo.Choices !== "undefined" && fieldInfo.Choices.length > 0) {
                fieldInfo.ChoiceUI = this.getAttributeValue(fieldSchemata, "Format");
            }
        }
        if (fieldInfo.FieldTypeKind === FieldTypes.NOTE) {
            fieldInfo.IsRichTextAllowed = this.getAttributeValue(fieldSchemata, "RichText") === "True";
        }
        if (fieldInfo.FieldTypeKind === FieldTypes.URLORIMAGE) {
            fieldInfo.LinkUI = this.getAttributeValue(fieldSchemata, "Format");
        }
        if (fieldInfo.FieldTypeKind === FieldTypes.LOOKUP) {
            fieldInfo.LookupField = {
                DisplayName: this.getAttributeValue(fieldSchemata, "DisplayName"),
                FieldRef: this.getAttributeValue(fieldSchemata, "FieldRef"),
                ID: this.getAttributeValue(fieldSchemata, "ID"),
                List: this.getAttributeValue(fieldSchemata, "List"),
                Name: this.getAttributeValue(fieldSchemata, "Name"),
                ReadOnly: this.getAttributeValue(fieldSchemata, "ReadOnly") === "TRUE",
                ShowField: this.getAttributeValue(fieldSchemata, "ShowField"),
                StaticName: this.getAttributeValue(fieldSchemata, "StaticName"),
                WebId: this.getAttributeValue(fieldSchemata, "WebId"),
                LookupChoices: new Array()
            };
        }
        return fieldInfo;
    };
    DynamicFormularGenerator.prototype.formComponentFactory = function (fieldStaticName) {
        var _this = this;
        if (this.availableFields !== null) {
            var fieldInfo_1 = this.availableFields.value.filter(function (f) { return f.StaticName === fieldStaticName; })[0];
            if (fieldInfo_1 === undefined)
                return null;
            if (fieldInfo_1.IsDependentLookup)
                return;
            if (!fieldInfo_1.IsUsedInForm) // only once
             {
                if (fieldInfo_1.FieldTypeKind === FieldTypes.LOOKUP
                    && !fieldInfo_1.IsDependentLookup
                    && fieldInfo_1.DependentLookupInternalNames !== null
                    && fieldInfo_1.DependentLookupInternalNames.length > 0) {
                    var lookupFieldInfo_1 = [];
                    fieldInfo_1.DependentLookupInternalNames.forEach(function (entry, index) {
                        var normalizeFieldName = entry.split("_x003a_");
                        lookupFieldInfo_1.push(normalizeFieldName[normalizeFieldName.length - 1]);
                    });
                    fieldInfo_1.DependentLookupInternalNames = lookupFieldInfo_1;
                }
                fieldInfo_1.IsUsedInForm = true;
                fieldInfo_1 = this.getFieldMetaData(fieldInfo_1);
                fieldInfo_1.httpClient = this.props.httpClient;
                fieldInfo_1.SiteUrl = this.props.siteURL;
                if (fieldInfo_1.DefaultValue !== null && fieldInfo_1.DefaultValue.length > 0) {
                    fieldInfo_1.FormValue = fieldInfo_1.DefaultValue;
                }
                if (fieldInfo_1.FieldTypeKind === FieldTypes.BOOLEAN) {
                    if (fieldInfo_1.FormValue === "1")
                        fieldInfo_1.FormValue = true;
                    else
                        fieldInfo_1.FormValue = false;
                }
                if (typeof this.props.RESTLookupDefinition !== "undefined" && this.props.RESTLookupDefinition !== null) {
                    fieldInfo_1.RESTLookup = this.props.RESTLookupDefinition.filter(function (x) { return x.SourceColumnInternalName === fieldInfo_1.StaticName; })[0];
                }
                if (typeof this.props.addionalFieldRules !== "undefined" && this.props.addionalFieldRules !== null) {
                    fieldInfo_1.AddionalRule = this.props.addionalFieldRules[fieldInfo_1.StaticName];
                }
                // new: ceck for specific default value - override in properties
                if (fieldInfo_1.AddionalRule !== undefined && fieldInfo_1.AddionalRule.DefaultValue.length > 0) {
                    fieldInfo_1.DefaultValue = fieldInfo_1.AddionalRule.DefaultValue;
                    fieldInfo_1.FormValue = fieldInfo_1.DefaultValue;
                }
            }
            return (React.createElement(React.Fragment, null, fieldInfo_1 &&
                React.createElement(FormControlFluentUI, __assign(__assign({}, fieldInfo_1), { IsDisabled: this.state.isProcessing || this.state.isAlreadySent, ChangedHandler: function (field, value, validationError) {
                        var fieldInfo = _this.availableFields.value.filter(function (f) { return f.StaticName === fieldStaticName; })[0];
                        fieldInfo.FormValue = value;
                        fieldInfo.IsValid = validationError.length === 0;
                        _this.ValidateCompleteForm();
                    }, key: fieldInfo_1.StaticName }))));
        }
        return (React.createElement("p", null, "ERROR"));
    };
    DynamicFormularGenerator.prototype.ValidateFileInput = function (fileInfo) {
        var parts = fileInfo.name.split(".");
        var extension = parts[parts.length - 1];
        return (this.props.allowedUploadFileTypes.indexOf(extension) === -1);
    };
    DynamicFormularGenerator.prototype.ValidateCompleteForm = function () {
        if (typeof this.props.allowedUploadFileTypes !== "undefined" && this.props.allowedUploadFileTypes.length > 0) {
            var key = void 0;
            for (key in this.uploadFileList) {
                if (this.ValidateFileInput(this.uploadFileList[key])) {
                    this.setState({ isFormValid: false });
                    return;
                }
            }
        }
        this.setState({
            isFormValid: this.availableFields.value.filter(function (f) { return f.IsUsedInForm && !f.IsValid; }).length === 0
        });
    };
    //https://medium.com/@ian.mundy/async-event-handlers-in-react-a1590ed24399
    DynamicFormularGenerator.prototype.getFileBuffer = function (file) {
        var reader = new FileReader();
        return new Promise(function (resolve, reject) {
            reader.onload = function (e) {
                resolve(e.target.result);
            };
            reader.onerror = function (e) {
                reject(e.target.error);
            };
            reader.readAsArrayBuffer(file);
        });
    };
    DynamicFormularGenerator.prototype.sendConfirmationMail = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var listFormInfo, resultInfo, displayFormInfo, editLink, body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.props.sendConfirmationEMail) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.props.httpClient.get("".concat(this.props.siteURL, "/_api/web/lists/getbyid('").concat(this.props.listID, "')/Forms?$select=ServerRelativeUrl"), SPHttpClient.configurations.v1)];
                    case 1:
                        listFormInfo = _a.sent();
                        return [4 /*yield*/, listFormInfo.json()];
                    case 2:
                        resultInfo = _a.sent();
                        displayFormInfo = resultInfo.value.filter(function (x) { return x.ServerRelativeUrl.indexOf('DispForm') !== -1; });
                        editLink = "";
                        if (this.props.addDataLinkInEMail && displayFormInfo.length > 0) {
                            editLink = "<br /><br /><a href=\"".concat(window.location.origin, "/").concat(displayFormInfo[0].ServerRelativeUrl, "?ID=").concat(item.Id, "\">").concat(strings.MAILLinkTodata, "</a><br />");
                        }
                        body = "<p><strong>".concat(this.props.emailLeadText, "</strong></p><table>") + this.availableFields.value.filter(function (f) { return f.IsUsedInForm && typeof f.FormValue !== "undefined"; }).map(function (entry) {
                            return "<tr><td>".concat(entry.Title, "</td><td><strong>").concat(Helper.GetFieldValueAsString(entry), "</strong></td></tr>");
                        }).join("") + "</table>" + editLink;
                        Helper.sendEMail(this.props.currentUserEMail, this.props.emailNotifyBCC, this.props.emailSubject, body, this.props.siteURL, this.props.wpContext);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DynamicFormularGenerator.prototype.uploadAttachments = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _i, key, fileObject, rawFileContent;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this.uploadFileList;
                        _b = [];
                        for (_c in _a)
                            _b.push(_c);
                        _i = 0;
                        _d.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        _c = _b[_i];
                        if (!(_c in _a)) return [3 /*break*/, 4];
                        key = _c;
                        fileObject = this.uploadFileList[key];
                        return [4 /*yield*/, this.getFileBuffer(fileObject)];
                    case 2:
                        rawFileContent = _d.sent();
                        return [4 /*yield*/, this.props.httpClient.post("".concat(this.props.siteURL, "/_api/web/lists/getbyid('").concat(this.props.listID, "')/items(").concat(item.Id, ")/AttachmentFiles/add(FileName='").concat(fileObject.name, "')"), SPHttpClient.configurations.v1, {
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-type': 'application/json'
                                },
                                body: rawFileContent
                            })];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    DynamicFormularGenerator.prototype.componentDidMount = function () {
        this.attachmentCtl = [];
        for (var i = 0; i < this.props.uploads; i++) {
            this.attachmentCtl.push(React.createElement("div", null,
                React.createElement("label", { htmlFor: "FormAttachment".concat(i) }, "".concat(i + 1, ". ").concat(strings.AttachmentIndexLabel)),
                React.createElement("input", { type: "file", onChange: this.handleAttachment, id: "FormAttachment".concat(i), name: "FormAttachment".concat(i), title: strings.AttachmentLabel })));
        }
    };
    DynamicFormularGenerator.prototype.render = function () {
        var _this = this;
        if (!this.validateConfiguration()) {
            return (React.createElement("div", { className: "".concat(styles.row, " ").concat(styles.configWrapper) },
                React.createElement("div", { className: styles.colSM4 },
                    React.createElement("img", { src: require('../../../assets/superherobuilder@200.png'), alt: "Super hero form builder" })),
                React.createElement("div", { className: "".concat(styles.colSM8, " ").concat(styles.cfgDetails) },
                    React.createElement(FlashSettings24Regular, null),
                    React.createElement("h2", null, strings.CFGHeader),
                    React.createElement("ul", null,
                        React.createElement("li", null, strings.CFGChooseList),
                        React.createElement("li", null, strings.CFGChooseView),
                        React.createElement("li", null, strings.ErrorMissingSiteText)),
                    React.createElement(Button, { onClick: this._onConfigure }, strings.CFGBTNConfigure))));
        }
        else {
            var currentDate = new Date();
            var rawFrom = null;
            var rawTo = null;
            if (this.props.validFrom !== undefined)
                rawFrom = this.props.validFrom.value instanceof Date ? this.props.validFrom.value : new Date(this.props.validFrom.value);
            if (this.props.validTo !== undefined)
                rawTo = this.props.validTo.value instanceof Date ? this.props.validTo.value : new Date(this.props.validTo.value);
            if (rawFrom !== null && rawFrom >= currentDate) {
                var msgNotPublished = this.props.msgFormNotPublished;
                if (msgNotPublished !== undefined && msgNotPublished === null && msgNotPublished.length > 0) {
                    msgNotPublished = msgNotPublished.replace("@Date", rawFrom.toLocaleDateString()).replace("@Time", rawFrom.toLocaleTimeString());
                }
                return (React.createElement("div", null,
                    msgNotPublished && React.createElement("h1", null, msgNotPublished),
                    React.createElement("img", { src: require('../../../assets/form-closed@800x600.png'), alt: msgNotPublished })));
            }
            if (rawTo !== null && rawTo < currentDate) {
                var msgNotPublished = this.props.msgFormExpired;
                if (msgNotPublished !== undefined && msgNotPublished === null && msgNotPublished.length > 0) {
                    msgNotPublished = msgNotPublished.replace("@Date", rawTo.toLocaleDateString()).replace("@Time", rawTo.toLocaleTimeString());
                }
                return (React.createElement("div", null,
                    msgNotPublished && React.createElement("h1", null, msgNotPublished),
                    React.createElement("img", { src: require('../../../assets/form-closed@800x600.png'), alt: msgNotPublished })));
            }
            this.qryFormFields();
            //ref={(el) => this.mainForm = el}
            return (React.createElement("form", { className: "".concat(styles.dynamicFormularGenerator) },
                this.state.isAlreadySent && React.createElement("h3", null, strings.MSGDataSendAlready),
                this.props.description.length > 0 && React.createElement("p", null, this.props.description),
                this.state && this.state.formFields && this.state.formFields.map(function (val) {
                    return _this.formComponentFactory(val);
                }),
                React.createElement("div", { className: styles.uploadArea }, this.props.uploads > 0 && this.attachmentCtl && this.attachmentCtl.map(function (fileCtl) {
                    return fileCtl;
                })),
                React.createElement("div", { className: styles.cmdWrapper },
                    this.state.isProcessing ? React.createElement(Spinner, { size: "extra-small", label: strings.MSGWaiting }) : React.createElement(React.Fragment, null),
                    React.createElement(Button, { id: "btnSaveFormData", name: "btnSaveFormData", className: styles.btnSave, disabled: !this.state.isFormValid || this.state.isProcessing, onClick: this.saveFormData }, strings.BTNSendFormData),
                    this.props.enablePrint && React.createElement(Button, { id: "btnPrintData", name: "btnPrintData", className: styles.btnPrint, disabled: !this.state.isAlreadySent, onClick: this.printFormData }, strings.BTNPrintFormData),
                    React.createElement(Button, { id: "btnFormReset", name: "btnFormReset", type: "reset", onClick: this.resetForm }, strings.BTNResetFormData))));
        }
    };
    return DynamicFormularGenerator;
}(React.Component));
export default DynamicFormularGenerator;
//# sourceMappingURL=DynamicFormularGenerator.js.map