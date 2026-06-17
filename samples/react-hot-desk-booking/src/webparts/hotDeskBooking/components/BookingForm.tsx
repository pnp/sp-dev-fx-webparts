import * as React from "react";
import {
  Dialog,
  DialogType,
  DialogFooter,
  PrimaryButton,
  DefaultButton,
  DatePicker,
  TextField,
  MessageBar,
  MessageBarType,
  Spinner
} from "@fluentui/react";
import { IResource } from "../models/IResource";
import { BookingService } from "../services/BookingService";

interface Props {
  isOpen: boolean;
  resource: IResource;
  onDismiss: () => void;
  onSubmitted: () => Promise<void>;
  bookingService: BookingService;
}

const BookingForm: React.FC<Props> = ({
  isOpen,
  resource,
  onDismiss,
  onSubmitted,
  bookingService
}) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [notes, setNotes] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async () => {
    if (!date) {
      setError("Please select a date");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await bookingService.addBooking(resource, date, notes);
      await onSubmitted();
      onDismiss();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Booking failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      hidden={!isOpen}
      onDismiss={onDismiss}
      dialogContentProps={{
        type: DialogType.normal,
        title: `Book: ${resource.title}`
      }}
    >
      {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}

      <DatePicker
        label="Booking Date"
        value={date || undefined}
        onSelectDate={setDate}
        minDate={new Date()}
      />

      <TextField
        label="Notes (Optional)"
        multiline
        rows={3}
        value={notes}
        onChange={(_, v) => setNotes(v || "")}
      />

      <DialogFooter>
        <PrimaryButton
          text="Book"
          onClick={handleSubmit}
          disabled={loading}
        />
        <DefaultButton text="Cancel" onClick={onDismiss} disabled={loading} />
      </DialogFooter>

      {loading && <Spinner label="Creating booking..." />}
    </Dialog>
  );
};

export default BookingForm;
