import * as React from "react";
import { IResource } from "../models/IResource";
import { BookingService } from "../services/BookingService";
interface Props {
    resource: IResource;
    onBookingCreated: () => Promise<void>;
    bookingService: BookingService;
}
declare const ResourceCard: React.FC<Props>;
export default ResourceCard;
//# sourceMappingURL=ResourceCard.d.ts.map