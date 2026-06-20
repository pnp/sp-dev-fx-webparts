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
  Spinner,
  Icon,
  Text
} from "@fluentui/react";
import { IResource } from "../models/IResource";
import { BookingService } from "../services/BookingService";
import styles from "./HotDeskBooking.module.scss";

interface Props {
  isOpen: boolean;
  resource: IResource;
  onDismiss: () => void;
  onSubmitted: () => Promise<void>;
  bookingService: BookingService;
}

interface ITypeMeta {
  colorVar: string;
  iconName: string;
}

const getResourceMeta = (resourceType: string): ITypeMeta => {
  const normalized = (resourceType || "").trim().toLowerCase();

  if (normalized === "hot desk") {
    return { colorVar: "--color-hotdesk", iconName: "ThisPC" };
  }

  if (normalized === "parking") {
    return { colorVar: "--color-parking", iconName: "Car" };
  }

  if (normalized === "locker") {
    return { colorVar: "--color-locker", iconName: "Lock" };
  }

  if (normalized === "meeting room") {
    return { colorVar: "--color-meetingroom", iconName: "Home" };
  }

  return { colorVar: "--color-other", iconName: "Org" };
};

const BookingForm: React.FC<Props> = ({ isOpen, resource, onDismiss, onSubmitted, bookingService }) => {
  const [date, setDate] = React.useState<Date | null>(null);
  const [notes, setNotes] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [checkingConflict, setCheckingConflict] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [hasConflict, setHasConflict] = React.useState(false);
  const conflictRequestRef = React.useRef(0);
  const typeMeta = getResourceMeta(resource.resourceType);

  const checkConflict = React.useCallback(
    async (selectedDate: Date | null): Promise<void> => {
      if (!selectedDate) {
        setHasConflict(false);
        return;
      }

      const requestId = conflictRequestRef.current + 1;
      conflictRequestRef.current = requestId;

      setCheckingConflict(true);
      try {
        const conflictExists = await bookingService.checkConflict(resource, selectedDate);
        if (conflictRequestRef.current === requestId) {
          setHasConflict(conflictExists);
        }
      } catch (err) {
        console.error("Conflict check failed", err);
      } finally {
        if (conflictRequestRef.current === requestId) {
          setCheckingConflict(false);
        }
      }
    },
    [bookingService, resource]
  );

  const handleSubmit = async (): Promise<void> => {
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
      <div className={styles.dialogHeaderStrip} style={{ backgroundColor: `var(${typeMeta.colorVar})` }}>
        <Icon iconName={typeMeta.iconName} className={styles.dialogHeaderIcon} />
        <Text className={styles.dialogHeaderType}>{resource.resourceType || "Other"}</Text>
      </div>

      {error && <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>}

      {hasConflict && (
        <MessageBar messageBarType={MessageBarType.warning}>
          This resource appears to be booked on this date. You can still submit, but booking may fail.
        </MessageBar>
      )}

      <DatePicker
        label="Booking Date"
        value={date || undefined}
        onSelectDate={(selectedDate) => {
          const nextDate = selectedDate || null;
          setDate(nextDate);
          setError(null);
          void checkConflict(nextDate);
        }}
        minDate={new Date()}
      />

      {checkingConflict && <Spinner label="Checking availability..." />}

      <TextField
        label="Notes (Optional)"
        multiline
        rows={3}
        value={notes}
        onChange={(_, v) => setNotes(v || "")}
      />

      <DialogFooter>
        <PrimaryButton text="Book" onClick={handleSubmit} disabled={loading} />
        <DefaultButton text="Cancel" onClick={onDismiss} disabled={loading} />
      </DialogFooter>

      {loading && <Spinner label="Creating booking..." />}
    </Dialog>
  );
};

export default BookingForm;
