import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IResource } from "../models/IResource";
import { IBooking } from "../models/IBooking";
export declare class BookingService {
    private resourcesListName;
    private bookingsListName;
    private context;
    constructor(context: WebPartContext, resourcesListName?: string, bookingsListName?: string);
    getResources(): Promise<IResource[]>;
    getMyBookings(): Promise<IBooking[]>;
    checkConflict(resource: IResource, date: Date): Promise<boolean>;
    addBooking(resource: IResource, date: Date, notes: string): Promise<void>;
    cancelBooking(bookingId: string): Promise<void>;
    getBookingsForDate(date: Date): Promise<IBooking[]>;
}
//# sourceMappingURL=BookingService.d.ts.map