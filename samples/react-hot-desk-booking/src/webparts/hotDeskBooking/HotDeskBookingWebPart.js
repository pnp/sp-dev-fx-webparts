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
import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-webpart-base';
import { sp } from '@pnp/sp';
import { HotDeskBooking } from './components/HotDeskBooking';
import * as strings from 'HotDeskBookingWebPartStrings';
var HotDeskBookingWebPart = /** @class */ (function (_super) {
    __extends(HotDeskBookingWebPart, _super);
    function HotDeskBookingWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HotDeskBookingWebPart.prototype.onInit = function () {
        var _this = this;
        return _super.prototype.onInit.call(this).then(function () {
            sp.setup({ spfxContext: _this.context });
        });
    };
    HotDeskBookingWebPart.prototype.render = function () {
        var element = React.createElement(HotDeskBooking, {
            title: this.properties.title,
            resourcesListName: this.properties.resourcesListName || 'HotDeskResources',
            bookingsListName: this.properties.bookingsListName || 'HotDeskBookings',
            isAdminMode: this.properties.isAdminMode || false,
            defaultResourceType: this.properties.defaultResourceType || '',
            context: this.context
        });
        ReactDom.render(element, this.domElement);
    };
    HotDeskBookingWebPart.prototype.onDispose = function () {
        ReactDom.unmountComponentAtNode(this.domElement);
    };
    Object.defineProperty(HotDeskBookingWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0.0');
        },
        enumerable: false,
        configurable: true
    });
    HotDeskBookingWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: { description: strings.PropertyPaneDescription },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('title', { label: strings.TitleFieldLabel }),
                                PropertyPaneTextField('resourcesListName', { label: strings.ResourcesListNameFieldLabel }),
                                PropertyPaneTextField('bookingsListName', { label: strings.BookingsListNameFieldLabel }),
                                PropertyPaneTextField('defaultResourceType', { label: strings.DefaultResourceTypeFieldLabel }),
                                PropertyPaneToggle('isAdminMode', { label: strings.AdminModeFieldLabel })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return HotDeskBookingWebPart;
}(BaseClientSideWebPart));
export default HotDeskBookingWebPart;
//# sourceMappingURL=HotDeskBookingWebPart.js.map