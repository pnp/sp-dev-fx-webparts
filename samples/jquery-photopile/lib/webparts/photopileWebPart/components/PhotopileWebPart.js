"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * @file
 * Photopile Web Part React JSX component.
 *
 * Contains JSX code to render the web part with HTML templates.
 *
 * Author: Olivier Carpentier
 */
var React = require("react");
var Spinner_1 = require("office-ui-fabric-react/lib/Spinner");
var strings = require("mystrings");
var PhotopileWebPart_module_scss_1 = require("../PhotopileWebPart.module.scss");
var SPPicturesListService_1 = require("../SPPicturesListService");
var photopile = require("photopileModule");
require('jquery');
require('jqueryui');
require('../css/photopile.scss');
require('photopileModule');
/**
 * @class
 * Defines Photopile web part class.
 */
var PhotopileWebPart = (function (_super) {
    __extends(PhotopileWebPart, _super);
    /**
     * @function
     * Photopile web part contructor.
     */
    function PhotopileWebPart(props, context) {
        var _this = _super.call(this, props, context) || this;
        //Save the context
        _this.myPageContext = props.context;
        //Init the component state
        _this.state = {
            results: [],
            loaded: false
        };
        return _this;
    }
    ;
    /**
     * @function
     * JSX Element render method
     */
    PhotopileWebPart.prototype.render = function () {
        if (this.props.listName == null || this.props.listName == '') {
            //Display select a list message
            return (React.createElement("div", { className: "ms-MessageBar" },
                React.createElement("div", { className: "ms-MessageBar-content" },
                    React.createElement("div", { className: "ms-MessageBar-icon" },
                        React.createElement("i", { className: "ms-Icon ms-Icon--infoCircle" })),
                    React.createElement("div", { className: "ms-MessageBar-text" }, strings.ErrorSelectList))));
        }
        else {
            if (this.state.loaded == false) {
                //Display the loading spinner with the Office UI Fabric Spinner control
                return (React.createElement("div", { className: PhotopileWebPart_module_scss_1.default.photopileWebPart },
                    React.createElement("div", { className: PhotopileWebPart_module_scss_1.default.workingOnItSpinner },
                        React.createElement(Spinner_1.Spinner, { type: Spinner_1.SpinnerType.normal }),
                        React.createElement("div", { className: PhotopileWebPart_module_scss_1.default.loadingLabel },
                            React.createElement("label", { className: "ms-Label" },
                                " ",
                                strings.Loading)))));
            }
            else if (this.state.results.length == 0) {
                //Display message no items
                return (React.createElement("div", { className: "ms-MessageBar ms-MessageBar--error" },
                    React.createElement("div", { className: "ms-MessageBar-content" },
                        React.createElement("div", { className: "ms-MessageBar-icon" },
                            React.createElement("i", { className: "ms-Icon ms-Icon--xCircle" })),
                        React.createElement("div", { className: "ms-MessageBar-text" }, strings.ErrorNoItems))));
            }
            else {
                //Display the items list
                return (React.createElement("div", { className: 'photopile-wrapper' },
                    React.createElement("ul", { className: 'photopile' }, this.state.results.map(function (object, i) {
                        //Select the best Alt text with title, description or file's name
                        var altText = object.Title;
                        if (altText == null || altText == '')
                            altText = object.Description;
                        if (altText == null || altText == '')
                            altText = object.File.Name;
                        //Render the item
                        return (React.createElement("li", null,
                            React.createElement("a", { href: object.File.ServerRelativeUrl },
                                React.createElement("img", { src: object.File.ThumbnailServerUrl, alt: altText, width: "133", height: "100" }))));
                    }))));
            }
        }
    };
    /**
     * @function
     * Function called when the component did mount
     */
    PhotopileWebPart.prototype.componentDidMount = function () {
        var _this = this;
        if (this.props.listName != null && this.props.listName != '') {
            //Init the Picture list service
            var picturesListService = new SPPicturesListService_1.SPPicturesListService(this.props, this.myPageContext);
            //Load the list of pictures from the current lib
            picturesListService.getPictures(this.props.listName)
                .then(function (response) {
                //Modify the component state with the json result
                _this.setState({ results: response.value, loaded: true });
            });
        }
    };
    /**
     * @function
     * Function called when the web part properties has changed
     */
    PhotopileWebPart.prototype.componentWillReceiveProps = function (nextProps) {
        var _this = this;
        //Define the state with empty results
        this.setState({ results: [], loaded: false });
        if (nextProps.listName != null && nextProps.listName != '') {
            //Init the Picture list service
            var picturesListService = new SPPicturesListService_1.SPPicturesListService(nextProps, this.myPageContext);
            //Load the list of pictures from the current lib
            picturesListService.getPictures(nextProps.listName)
                .then(function (response) {
                //Modify the component state with the json result
                _this.setState({ results: response.value, loaded: true });
            });
        }
    };
    /**
     * @function
     * Function called when the component has been rendered (ie HTML code is ready)
     */
    PhotopileWebPart.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.state.loaded) {
            //Init photopile options
            photopile.setNumLayers(this.props.numLayers);
            photopile.setThumbOverlap(this.props.thumbOverlap);
            photopile.setThumbRotation(this.props.thumbRotation);
            photopile.setThumbBorderWidth(this.props.thumbBorderWidth);
            photopile.setThumbBorderColor(this.props.thumbBorderColor);
            photopile.setThumbBorderHover(this.props.thumbBorderHover);
            photopile.setDraggable(this.props.draggable);
            photopile.setFadeDuration(this.props.fadeDuration);
            photopile.setPickupDuration(this.props.pickupDuration);
            photopile.setPhotoZIndex(this.props.photoZIndex);
            photopile.setPhotoBorder(this.props.photoBorder);
            photopile.setPhotoBorderColor(this.props.photoBorderColor);
            photopile.setShowInfo(this.props.showInfo);
            photopile.setAutoplayGallery(this.props.autoplayGallery);
            photopile.setAutoplaySpeed(this.props.autoplaySpeed);
            //Init photopile
            photopile.scatter();
        }
    };
    return PhotopileWebPart;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PhotopileWebPart;

//# sourceMappingURL=PhotopileWebPart.js.map
