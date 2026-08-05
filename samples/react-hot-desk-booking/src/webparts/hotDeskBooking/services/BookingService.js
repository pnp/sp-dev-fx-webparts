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
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
var BookingService = /** @class */ (function () {
    function BookingService(context, resourcesListName, bookingsListName) {
        if (resourcesListName === void 0) { resourcesListName = "HotDeskResources"; }
        if (bookingsListName === void 0) { bookingsListName = "HotDeskBookings"; }
        this.context = context;
        this.resourcesListName = resourcesListName;
        this.bookingsListName = bookingsListName;
    }
    BookingService.prototype.getResources = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle(this.resourcesListName)
                                .items.select("ID", "Title", "ResourceType", "Location", "Description", "IsActive")
                                .filter("IsActive eq true")
                                .get()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, items.map(function (item) { return ({
                                id: item.ID.toString(),
                                title: item.Title,
                                resourceType: item.ResourceType || "",
                                location: item.Location || "",
                                description: item.Description || "",
                                isActive: item.IsActive
                            }); })];
                    case 2:
                        error_1 = _a.sent();
                        console.error("Error fetching resources:", error_1);
                        throw error_1;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.getMyBookings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var userId, items, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        userId = this.context.pageContext.legacyPageContext.userId;
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle(this.bookingsListName)
                                .items.select("ID", "Title", "BookingDate", "Notes", "Resource/ID", "Resource/Title", "Resource/ResourceType", "Resource/Location")
                                .expand("Resource")
                                .filter("BookedById eq ${userId}")
                                .orderBy("BookingDate", false)
                                .get()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, items.map(function (item) { return ({
                                id: item.ID.toString(),
                                title: item.Title,
                                resource: item.Resource
                                    ? {
                                        id: item.Resource.ID.toString(),
                                        title: item.Resource.Title,
                                        resourceType: item.Resource.ResourceType,
                                        location: item.Resource.Location,
                                        description: "",
                                        isActive: true
                                    }
                                    : null,
                                bookingDate: new Date(item.BookingDate),
                                bookedBy: "",
                                notes: item.Notes || ""
                            }); })];
                    case 2:
                        error_2 = _a.sent();
                        console.error("Error fetching bookings:", error_2);
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.checkConflict = function (resource, date) {
        return __awaiter(this, void 0, void 0, function () {
            var dateStr, items, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dateStr = date.toISOString().split("T")[0];
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle(this.bookingsListName)
                                .items.select("ID")
                                .filter("ResourceId eq ${resource.id} and BookingDate eq datetime'${dateStr}'")
                                .get()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, items.length > 0];
                    case 2:
                        error_3 = _a.sent();
                        console.error("Error checking conflict:", error_3);
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.addBooking = function (resource, date, notes) {
        return __awaiter(this, void 0, void 0, function () {
            var hasConflict, dateStr, title, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.checkConflict(resource, date)];
                    case 1:
                        hasConflict = _a.sent();
                        if (hasConflict) {
                            throw new Error("This resource is already booked for the selected date.");
                        }
                        dateStr = date.toISOString().split("T")[0];
                        title = "${resource.title} \u2013 ${dateStr}";
                        return [4 /*yield*/, sp.web.lists.getByTitle(this.bookingsListName).items.add({
                                Title: title,
                                BookingDate: date,
                                Notes: notes,
                                ResourceId: resource.id
                            })];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_4 = _a.sent();
                        console.error("Error adding booking:", error_4);
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.cancelBooking = function (bookingId) {
        return __awaiter(this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle(this.bookingsListName)
                                .items.getById(parseInt(bookingId, 10))
                                .delete()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error("Error cancelling booking:", error_5);
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BookingService.prototype.getBookingsForDate = function (date) {
        return __awaiter(this, void 0, void 0, function () {
            var dateStr, items, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        dateStr = date.toISOString().split("T")[0];
                        return [4 /*yield*/, sp.web.lists
                                .getByTitle(this.bookingsListName)
                                .items.select("ID", "Title", "BookingDate", "Notes", "Resource/ID", "Resource/Title")
                                .expand("Resource")
                                .filter("BookingDate eq datetime'${dateStr}'")
                                .get()];
                    case 1:
                        items = _a.sent();
                        return [2 /*return*/, items.map(function (item) { return ({
                                id: item.ID.toString(),
                                title: item.Title,
                                resource: item.Resource
                                    ? {
                                        id: item.Resource.ID.toString(),
                                        title: item.Resource.Title,
                                        resourceType: "",
                                        location: "",
                                        description: "",
                                        isActive: true
                                    }
                                    : null,
                                bookingDate: new Date(item.BookingDate),
                                bookedBy: "",
                                notes: item.Notes || ""
                            }); })];
                    case 2:
                        error_6 = _a.sent();
                        console.error("Error fetching bookings for date:", error_6);
                        throw error_6;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return BookingService;
}());
export { BookingService };
//# sourceMappingURL=BookingService.js.map