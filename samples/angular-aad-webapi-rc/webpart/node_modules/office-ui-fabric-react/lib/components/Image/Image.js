"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require('react');
var css_1 = require('../../utilities/css');
var properties_1 = require('../../utilities/properties');
var EventGroup_1 = require('../../utilities/eventGroup/EventGroup');
require('./Image.scss');
var Image_Props_1 = require('./Image.Props');
(function (CoverStyle) {
    CoverStyle[CoverStyle["landscape"] = 0] = "landscape";
    CoverStyle[CoverStyle["portrait"] = 1] = "portrait";
})(exports.CoverStyle || (exports.CoverStyle = {}));
var CoverStyle = exports.CoverStyle;
exports.CoverStyleMap = (_a = {},
    _a[CoverStyle.landscape] = 'ms-Image-image--landscape',
    _a[CoverStyle.portrait] = 'ms-Image-image--portrait',
    _a
);
exports.ImageFitMap = (_b = {},
    _b[Image_Props_1.ImageFit.center] = 'ms-Image-image--center',
    _b[Image_Props_1.ImageFit.contain] = 'ms-Image-image--contain',
    _b[Image_Props_1.ImageFit.cover] = 'ms-Image-image--cover',
    _b[Image_Props_1.ImageFit.none] = 'ms-Image-image--none',
    _b
);
(function (ImageLoadState) {
    ImageLoadState[ImageLoadState["notLoaded"] = 0] = "notLoaded";
    ImageLoadState[ImageLoadState["loaded"] = 1] = "loaded";
    ImageLoadState[ImageLoadState["error"] = 2] = "error";
    ImageLoadState[ImageLoadState["errorLoaded"] = 3] = "errorLoaded";
})(exports.ImageLoadState || (exports.ImageLoadState = {}));
var ImageLoadState = exports.ImageLoadState;
var Image = (function (_super) {
    __extends(Image, _super);
    function Image(props) {
        _super.call(this, props);
        this.state = {
            loadState: ImageLoadState.notLoaded
        };
        this._events = new EventGroup_1.EventGroup(this);
    }
    Image.prototype.componentDidMount = function () {
        var image = this.refs.image;
        if (!this._evaluateImage()) {
            this._events.on(image, 'load', this._evaluateImage);
            this._events.on(image, 'error', this._setError);
        }
    };
    Image.prototype.componentWillReceiveProps = function (nextProps) {
        if (this.state.loadState === ImageLoadState.loaded) {
            var nextHeight = nextProps.height, nextWidth = nextProps.width;
            var _a = this.props, height = _a.height, width = _a.width;
            if (height !== nextHeight || width !== nextWidth) {
                this._computeCoverStyle(nextProps);
            }
        }
    };
    Image.prototype.componentWillUnmount = function () {
        this._events.dispose();
    };
    Image.prototype.render = function () {
        var imageProps = properties_1.getNativeProps(this.props, properties_1.imageProperties, ['width', 'height']);
        var _a = this.props, src = _a.src, alt = _a.alt, width = _a.width, height = _a.height, shouldFadeIn = _a.shouldFadeIn, className = _a.className, imageFit = _a.imageFit, errorSrc = _a.errorSrc, role = _a.role;
        var loadState = this.state.loadState;
        var coverStyle = this._coverStyle;
        var loaded = loadState === ImageLoadState.loaded || loadState === ImageLoadState.errorLoaded;
        var srcToDisplay = (loadState === ImageLoadState.error || loadState === ImageLoadState.errorLoaded) ? errorSrc : src;
        // If image dimensions aren't specified, the natural size of the image is used.
        return (React.createElement("div", {className: css_1.css('ms-Image', className), style: { width: width, height: height }}, 
            React.createElement("img", __assign({}, imageProps, {className: css_1.css('ms-Image-image', (coverStyle !== undefined) && exports.CoverStyleMap[coverStyle], (imageFit !== undefined) && exports.ImageFitMap[imageFit], {
                'is-fadeIn': shouldFadeIn,
                'is-notLoaded': !loaded,
                'is-loaded': loaded,
                'ms-u-fadeIn400': loaded && shouldFadeIn,
                'is-error': loadState === ImageLoadState.error,
                'ms-Image-image--scaleWidth': (imageFit === undefined && !!width && !height),
                'ms-Image-image--scaleHeight': (imageFit === undefined && !width && !!height),
                'ms-Image-image--scaleWidthHeight': (imageFit === undefined && !!width && !!height),
            }), ref: 'image', src: srcToDisplay, alt: alt, role: role}))
        ));
    };
    Image.prototype._evaluateImage = function () {
        var src = this.props.src;
        var loadState = this.state.loadState;
        var image = this.refs.image;
        var isLoaded = (src && image.naturalWidth > 0 && image.naturalHeight > 0);
        this._computeCoverStyle(this.props);
        if (isLoaded && loadState !== ImageLoadState.loaded && loadState !== ImageLoadState.errorLoaded) {
            this._events.off();
            this.setState({
                loadState: loadState === ImageLoadState.error ? ImageLoadState.errorLoaded : ImageLoadState.loaded
            });
        }
        return isLoaded;
    };
    Image.prototype._computeCoverStyle = function (props) {
        var imageFit = props.imageFit;
        if (imageFit === Image_Props_1.ImageFit.cover || imageFit === Image_Props_1.ImageFit.contain) {
            var image = this.refs.image;
            if (image) {
                var width = props.width, height = props.height;
                var desiredRatio = width / height;
                var naturalRatio = image.naturalWidth / image.naturalHeight;
                if (naturalRatio > desiredRatio) {
                    this._coverStyle = CoverStyle.landscape;
                }
                else {
                    this._coverStyle = CoverStyle.portrait;
                }
            }
        }
    };
    Image.prototype._setError = function () {
        if (this.state.loadState !== ImageLoadState.error && this.state.loadState !== ImageLoadState.errorLoaded) {
            this.setState({
                loadState: ImageLoadState.error
            });
        }
    };
    Image.defaultProps = {
        shouldFadeIn: true
    };
    return Image;
}(React.Component));
exports.Image = Image;
var _a, _b;

//# sourceMappingURL=Image.js.map
