"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_core_library_1 = require("@microsoft/sp-core-library");
var React = require("react");
var ReactDom = require("react-dom");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var strings = require("mystrings");
var PhotopileWebPart_1 = require("./components/PhotopileWebPart");
var SPPicturesListService_1 = require("./SPPicturesListService");
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

//# sourceMappingURL=PhotopileWebPartWebPart.js.map
