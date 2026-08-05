import * as React from "react";
import { IResource } from "../models/IResource";
import { BookingService } from "../services/BookingService";
interface Props {
    isOpen: boolean;
    resource: IResource;
    onDismiss: () => void;
    onSubmitted: () => Promise<void>;
    bookingService: BookingService;
}
declare const BookingForm: React.FC<Props>;
export default BookingForm;
//# sourceMappingURL=BookingForm.d.ts.map