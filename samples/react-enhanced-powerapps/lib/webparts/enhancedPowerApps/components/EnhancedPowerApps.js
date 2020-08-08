var __extends = (this && this.__extends) || (function () {
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
import * as React from 'react';
import styles from './EnhancedPowerApps.module.scss';
import * as strings from 'EnhancedPowerAppsWebPartStrings';
/**
 * We use the placeholder to tell people they haven't configured the web part yet
 * */
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
var EnhancedPowerApps = /** @class */ (function (_super) {
    __extends(EnhancedPowerApps, _super);
    function EnhancedPowerApps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EnhancedPowerApps.prototype.render = function () {
        var _a = this.props, dynamicProp = _a.dynamicProp, themeVariant = _a.themeVariant, themeValues = _a.themeValues, appWebLink = _a.appWebLink, useDynamicProp = _a.useDynamicProp, dynamicPropName = _a.dynamicPropName, locale = _a.locale, border = _a.border, height = _a.height, width = _a.width;
        var needConfiguration = !appWebLink;
        var semanticColors = themeVariant.semanticColors;
        var dynamicPropValue = useDynamicProp && dynamicProp !== undefined ? "&" + encodeURIComponent(dynamicPropName) + "=" + encodeURIComponent(dynamicProp) : '';
        // We can take an app id or a full link. We'll assume (for now) that people are passing a valid app URL
        // would LOVE to find an API to retrieve list of valid apps
        var appUrl = appWebLink && appWebLink.indexOf('https://') != 0 ? "https://apps.powerapps.com/play/" + appWebLink : appWebLink;
        // Build the portion of the URL where we're passing theme colors
        var themeParams = "";
        if (themeValues && themeValues.length > 0) {
            themeValues.forEach(function (themeValue) {
                try {
                    var themeColor = semanticColors[themeValue];
                    themeParams = themeParams + ("&" + themeValue + "=" + encodeURIComponent(themeColor));
                }
                catch (e) {
                    console.log(e);
                }
            });
        }
        // Build the frame url
        var frameUrl = appUrl + "?source=SPClient-EnhancedPowerAppsWebPart&amp;locale=" + locale + "&amp;enableOnBehalfOf=true&amp;authMode=onbehalfof&amp;hideNavBar=true&amp;" + dynamicPropValue + themeParams + "&locale=" + locale;
        console.log("URL", frameUrl);
        return (React.createElement("div", { className: styles.enhancedPowerApps, style: { height: height + "px" } },
            needConfiguration &&
                React.createElement(Placeholder, { iconName: 'PowerApps', iconText: strings.PlaceholderIconText, description: strings.PlaceholderDescription, buttonLabel: strings.PlaceholderButtonLabel, onConfigure: this.props.onConfigure }),
            !needConfiguration &&
                React.createElement(React.Fragment, null, this.props.appWebLink &&
                    React.createElement("iframe", { src: frameUrl, scrolling: "no", allow: "geolocation *; microphone *; camera *; fullscreen *;", sandbox: "allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts allow-forms allow-orientation-lock allow-downloads", width: this.props.width, height: height, frameBorder: border ? "1" : "0" }))));
    };
    return EnhancedPowerApps;
}(React.Component));
export default EnhancedPowerApps;
//# sourceMappingURL=EnhancedPowerApps.js.map