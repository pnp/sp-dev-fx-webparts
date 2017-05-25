"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var Weather_module_scss_1 = require("./Weather.module.scss");
var strings = require("weatherStrings");
var $ = require("jquery");
require('simpleWeather');
var WeatherWebPart = (function (_super) {
    __extends(WeatherWebPart, _super);
    function WeatherWebPart() {
        return _super.call(this) || this;
    }
    WeatherWebPart.prototype.render = function () {
        if (this.renderedOnce === false) {
            this.domElement.innerHTML = "<div class=\"" + Weather_module_scss_1.default.weather + "\"></div>";
        }
        this.renderContents();
    };
    WeatherWebPart.prototype.renderContents = function () {
        this.container = $("." + Weather_module_scss_1.default.weather, this.domElement);
        var location = this.properties.location;
        if (!location || location.length === 0) {
            this.container.html('<p>Please specify a location</p>');
            return;
        }
        var webPart = this;
        $.simpleWeather({
            location: location,
            woeid: '',
            unit: 'c',
            success: function (weather) {
                var html = "<h2><i class=\"icon" + weather.code + "\"></i> " + weather.temp + "&deg;" + weather.units.temp + "</h2>\n           <ul><li>" + weather.city + " " + weather.region + "</li></ul>";
                webPart.container.html(html)
                    .removeAttr('style')
                    .css('background', "url('http://loremflickr.com/500/139/" + location + "')");
            },
            error: function (error) {
                webPart.container.html("<p>" + error.message + "</p>").removeAttr('style');
            }
        });
    };
    Object.defineProperty(WeatherWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    WeatherWebPart.prototype.getPropertyPaneConfiguration = function () {
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
                                sp_webpart_base_1.PropertyPaneTextField('location', {
                                    label: strings.LocationFieldLabel
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    Object.defineProperty(WeatherWebPart.prototype, "disableReactivePropertyChanges", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    return WeatherWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = WeatherWebPart;

//# sourceMappingURL=WeatherWebPart.js.map
