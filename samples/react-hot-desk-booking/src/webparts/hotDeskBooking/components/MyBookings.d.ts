import * as React from "react";
import { IBooking } from "../models/IBooking";
import { BookingService } from "../services/BookingService";
interface Props {
    bookings: IBooking[];
    bookingService: BookingService;
    onCancelled: () => Promise<void>;
}
declare const MyBookings: React.FC<Props>;
export default MyBookings;
//# sourceMappingURL=MyBookings.d.ts.map