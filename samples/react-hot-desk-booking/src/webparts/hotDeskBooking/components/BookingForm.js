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
import * as React from "react";
import { Dialog, DialogType, DialogFooter, PrimaryButton, DefaultButton, DatePicker, TextField, MessageBar, MessageBarType, Spinner } from "@fluentui/react";
var BookingForm = function (_a) {
    var isOpen = _a.isOpen, resource = _a.resource, onDismiss = _a.onDismiss, onSubmitted = _a.onSubmitted, bookingService = _a.bookingService;
    var _b = React.useState(null), date = _b[0], setDate = _b[1];
    var _c = React.useState(""), notes = _c[0], setNotes = _c[1];
    var _d = React.useState(false), loading = _d[0], setLoading = _d[1];
    var _e = React.useState(null), error = _e[0], setError = _e[1];
    var handleSubmit = function () { return __awaiter(void 0, void 0, void 0, function () {
        var err_1, msg;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!date) {
                        setError("Please select a date");
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setError(null);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, bookingService.addBooking(resource, date, notes)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, onSubmitted()];
                case 3:
                    _a.sent();
                    onDismiss();
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    msg = err_1 instanceof Error ? err_1.message : "Booking failed";
                    setError(msg);
                    return [3 /*break*/, 6];
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(Dialog, { hidden: !isOpen, onDismiss: onDismiss, dialogContentProps: {
            type: DialogType.normal,
            title: "Book: ".concat(resource.title)
        } },
        error && React.createElement(MessageBar, { messageBarType: MessageBarType.error }, error),
        React.createElement(DatePicker, { label: "Booking Date", value: date || undefined, onSelectDate: setDate, minDate: new Date() }),
        React.createElement(TextField, { label: "Notes (Optional)", multiline: true, rows: 3, value: notes, onChange: function (_, v) { return setNotes(v || ""); } }),
        React.createElement(DialogFooter, null,
            React.createElement(PrimaryButton, { text: "Book", onClick: handleSubmit, disabled: loading }),
            React.createElement(DefaultButton, { text: "Cancel", onClick: onDismiss, disabled: loading })),
        loading && React.createElement(Spinner, { label: "Creating booking..." })));
};
export default BookingForm;
//# sourceMappingURL=BookingForm.js.map