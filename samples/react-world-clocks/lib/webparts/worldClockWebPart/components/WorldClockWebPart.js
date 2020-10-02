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
import * as React from "react";
import styles from "./WorldClockWebPart.module.scss";
import AnalogClock from "react-analog-clock";
import Clock from "react-live-clock";
import moment from "moment";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
var WorldClockWebPart = /** @class */ (function (_super) {
    __extends(WorldClockWebPart, _super);
    function WorldClockWebPart(props, state) {
        var _this = _super.call(this, props) || this;
        _this.clocks = [];
        _this.TitleText = "";
        _this.state = { clocks: [] };
        return _this;
    }
    WorldClockWebPart.prototype.componentDidMount = function () {
        var _this = this;
        var dayTheme = {
            background: "#ededed",
            border: "#222222",
            center: "#222222",
            seconds: "transparent",
            minutes: "#000",
            hour: "#000",
            tick: "#000",
            smallTickWidth: 1,
            largeTickWidth: 1,
            secondHandWidth: 1,
            minuteHandWidth: 1,
            hourHandWidth: 1,
        };
        var eveningTheme = {
            background: "#A9A9A9",
            border: "#868181",
            center: "#DCDCDC",
            seconds: "transparent",
            minutes: "#000000",
            hour: "#000000",
            tick: "#000000",
            smallTickWidth: 1,
            largeTickWidth: 1,
            secondHandWidth: 1,
            minuteHandWidth: 1,
            hourHandWidth: 1,
        };
        var nightTheme = {
            background: "#2e2e2e",
            border: "#868181",
            center: "#acabab",
            seconds: "transparent",
            minutes: "#acabab",
            hour: "#acabab",
            tick: "#acabab",
            smallTickWidth: 1,
            largeTickWidth: 1,
            secondHandWidth: 1,
            minuteHandWidth: 1,
            hourHandWidth: 1,
        };
        var WIDTH = 100;
        this.props.loadLocations().then(function (options) {
            console.log(options);
            for (var i = 0; i < options.length; i++) {
                var myDate = new Date().setHours(new Date().getHours() +
                    new Date().getTimezoneOffset() / 60 +
                    Number(options[i].GMTValues));
                var TimeofDay = moment(myDate).format("hh:mm A");
                var selectedTheme = null;
                var time = new Date(myDate).getHours();
                {
                    var timeOfDayMessage = "";
                    if (time > 4 && time < 18) {
                        timeOfDayMessage = "is having a great day Today.";
                        selectedTheme = dayTheme;
                    }
                    else if (time >= 18 && time < 21) {
                        timeOfDayMessage = "is having a great evening right Now.";
                        selectedTheme = eveningTheme;
                    }
                    else {
                        timeOfDayMessage = "is all Good Night right now!";
                        selectedTheme = nightTheme;
                    }
                    _this.clocks.push(React.createElement("span", { className: styles.Clock, title: "Current Time in " +
                            options[i].Title +
                            " (GMT" +
                            options[i].GMTValues +
                            ") is " +
                            TimeofDay +
                            " and it " +
                            timeOfDayMessage },
                        React.createElement(AnalogClock
                        //theme={time > 6 && time < 18 ? dayTheme : nightTheme}
                        , { 
                            //theme={time > 6 && time < 18 ? dayTheme : nightTheme}
                            theme: selectedTheme, gmtOffset: options[i].GMTValues, showSmallTicks: false, width: WIDTH, interval: 1 }),
                        _this.props.ShowTime ? (React.createElement("p", { className: styles.ClockTitle, title: "Current Time in " +
                                options[i].Title +
                                " (GMT" +
                                options[i].GMTValues +
                                ") is " +
                                TimeofDay },
                            React.createElement(Clock, { date: myDate, format: "hh:mm:ss", interval: 1000, ticking: true }))) : (React.createElement("div", null)),
                        React.createElement("p", { className: styles.ClockTitle }, options[i].Title)));
                }
            }
            _this.setState({ clocks: _this.clocks });
        });
    };
    WorldClockWebPart.prototype.render = function () {
        var WIDTH = 250;
        var showTitle = this.props.showTitle;
        var listSelected = typeof this.props.selectedList !== "undefined" &&
            this.props.selectedList.length > 0;
        return (React.createElement("div", { className: styles.worldClockWebPart },
            !listSelected && (React.createElement(Placeholder, { iconName: "Clock", iconText: "Configure your web part", description: "Select the already imported Clocks list and choose other settings.", buttonLabel: "Choose a List", onConfigure: this.props.onConfigure })),
            showTitle && (React.createElement(WebPartTitle, { title: this.props.description, displayMode: this.props.displayMode, updateProperty: this.props.updateProperty })),
            React.createElement("div", { className: styles.container }, this.clocks)));
    };
    return WorldClockWebPart;
}(React.Component));
export default WorldClockWebPart;
//# sourceMappingURL=WorldClockWebPart.js.map