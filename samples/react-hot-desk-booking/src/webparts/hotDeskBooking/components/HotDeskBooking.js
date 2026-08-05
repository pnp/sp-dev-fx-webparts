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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
import React, { useState, useEffect, useCallback } from "react";
import { Pivot, PivotItem, Spinner, SpinnerSize, MessageBar, MessageBarType, Stack } from "@fluentui/react";
import ResourceCard from "./ResourceCard";
import MyBookings from "./MyBookings";
import { BookingService } from "../services/BookingService";
import styles from "./HotDeskBooking.module.scss";
var HotDeskBooking = function (props) {
    var _a = useState({
        resources: [],
        bookings: [],
        loading: true,
        error: null,
        selectedDate: new Date()
    }), state = _a[0], setState = _a[1];
    var bookingService = useState(function () {
        return new BookingService(props.context, props.resourcesListName, props.bookingsListName);
    })[0];
    useEffect(function () {
        var loadData = function () { return __awaiter(void 0, void 0, void 0, function () {
            var resources_1, myBookings_1, err_1, errMsg_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        setState(function (s) { return (__assign(__assign({}, s), { loading: true, error: null })); });
                        return [4 /*yield*/, bookingService.getResources()];
                    case 1:
                        resources_1 = _a.sent();
                        return [4 /*yield*/, bookingService.getMyBookings()];
                    case 2:
                        myBookings_1 = _a.sent();
                        setState(function (s) { return (__assign(__assign({}, s), { resources: resources_1, bookings: myBookings_1, loading: false })); });
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        errMsg_1 = err_1 instanceof Error ? err_1.message : "Failed to load data";
                        setState(function (s) { return (__assign(__assign({}, s), { loading: false, error: errMsg_1 })); });
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        loadData();
    }, [bookingService]);
    var handleBookingCreated = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var updated_1, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, bookingService.getMyBookings()];
                case 1:
                    updated_1 = _a.sent();
                    setState(function (s) { return (__assign(__assign({}, s), { bookings: updated_1 })); });
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.error("Error refreshing bookings:", err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [bookingService]);
    return (React.createElement("div", { className: styles.hotDeskBooking },
        React.createElement("h2", null, props.title || "Resource Booking"),
        state.error && (React.createElement(MessageBar, { messageBarType: MessageBarType.error, onDismiss: function () { return setState(function (s) { return (__assign(__assign({}, s), { error: null })); }); } }, state.error)),
        state.loading ? (React.createElement(Spinner, { size: SpinnerSize.large, label: "Loading resources..." })) : (React.createElement(Pivot, null,
            React.createElement(PivotItem, { headerText: "Browse & Book" },
                React.createElement(Stack, { tokens: { childrenGap: 16 }, className: styles.resourceGrid }, state.resources.length === 0 ? (React.createElement(MessageBar, { messageBarType: MessageBarType.warning }, "No resources found. Please contact your administrator.")) : (state.resources.map(function (resource) { return (React.createElement(ResourceCard, { key: resource.id, resource: resource, onBookingCreated: handleBookingCreated, bookingService: bookingService })); })))),
            React.createElement(PivotItem, { headerText: "My Bookings" },
                React.createElement(MyBookings, { bookings: state.bookings, bookingService: bookingService, onCancelled: handleBookingCreated }))))));
};
export default HotDeskBooking;
//# sourceMappingURL=HotDeskBooking.js.map