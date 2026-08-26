import * as React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
  IColumn,
  Stack,
  MessageBar,
  MessageBarType,
  DefaultButton,
  Dialog,
  DialogType,
  DialogFooter,
  IconButton,
  IDetailsRowProps,
  DetailsRow,
  Text
} from "@fluentui/react";
import { IBooking } from "../models/IBooking";
import { BookingService } from "../services/BookingService";
import BookingCalendar from "./BookingCalendar";
import styles from "./HotDeskBooking.module.scss";

interface Props {
  bookings: IBooking[];
  bookingService: BookingService;
  onCancelled: () => Promise<void>;
}

type ViewMode = "list" | "calendar";

const getStartOfDay = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

const getResourceColor = (resourceType: string): string => {
  const normalized = (resourceType || "").trim().toLowerCase();

  if (normalized === "hot desk") {
    return "var(--color-hotdesk)";
  }

  if (normalized === "parking") {
    return "var(--color-parking)";
  }

  if (normalized === "locker") {
    return "var(--color-locker)";
  }

  if (normalized === "meeting room") {
    return "var(--color-meetingroom)";
  }

  return "var(--color-other)";
};

const MyBookings: React.FC<Props> = ({ bookings, bookingService, onCancelled }) => {
  const [selectedBooking, setSelectedBooking] = React.useState<IBooking | null>(null);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<ViewMode>("list");

  const today = getStartOfDay(new Date());

  const isUpcoming = React.useCallback(
    (date: Date): boolean => getStartOfDay(new Date(date)).getTime() >= today.getTime(),
    [today]
  );

  const cancelBooking = React.useCallback(
    async (booking: IBooking): Promise<void> => {
      setDeleting(true);
      try {
        await bookingService.cancelBooking(booking.id);
        await onCancelled();
      } finally {
        setDeleting(false);
      }
    },
    [bookingService, onCancelled]
  );

  const requestCancel = React.useCallback((booking: IBooking): void => {
    setSelectedBooking(booking);
    setShowConfirm(true);
  }, []);

  const handleCancel = async (): Promise<void> => {
    if (!selectedBooking) {
      return;
    }

    await cancelBooking(selectedBooking);
    setShowConfirm(false);
    setSelectedBooking(null);
  };

  const columns: IColumn[] = [
    {
      key: "resource",
      name: "Resource",
      fieldName: "title",
      minWidth: 180,
      maxWidth: 220,
      onRender: (item: IBooking): JSX.Element => (
        <span className={styles.resourceCell}>
          <span
            className={styles.resourceDot}
            style={{ backgroundColor: getResourceColor(item.resource?.resourceType || "") }}
          />
          <span>{item.resource?.title || "Unknown"}</span>
        </span>
      )
    },
    {
      key: "date",
      name: "Date",
      minWidth: 120,
      onRender: (item: IBooking): string => new Date(item.bookingDate).toLocaleDateString()
    },
    {
      key: "status",
      name: "Status",
      minWidth: 90,
      onRender: (item: IBooking): JSX.Element => (
        <span className={`${styles.statusBadge} ${isUpcoming(item.bookingDate) ? styles.statusUpcoming : styles.statusPast}`}>
          {isUpcoming(item.bookingDate) ? "Upcoming" : "Past"}
        </span>
      )
    },
    {
      key: "notes",
      name: "Notes",
      minWidth: 220,
      fieldName: "notes"
    },
    {
      key: "action",
      name: "Action",
      minWidth: 100,
      onRender: (item: IBooking): JSX.Element | null =>
        isUpcoming(item.bookingDate) ? (
          <DefaultButton text="Cancel" className={styles.cancelButton} onClick={() => requestCancel(item)} />
        ) : null
    }
  ];

  const onRenderRow = (props?: IDetailsRowProps): JSX.Element | null => {
    if (!props) {
      return null;
    }

    const item = props.item as IBooking;
    const className = `${props.className || ""} ${isUpcoming(item.bookingDate) ? "" : styles.pastBookingRow}`.trim();
    return <DetailsRow {...props} className={className} />;
  };

  if (bookings.length === 0) {
    return <MessageBar messageBarType={MessageBarType.info}>You have no bookings yet.</MessageBar>;
  }

  return (
    <>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="center" className={styles.viewToggleRow}>
        <Text variant="mediumPlus">View</Text>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <IconButton
            iconProps={{ iconName: "BulletedList" }}
            title="List view"
            ariaLabel="List view"
            className={`${styles.viewToggleButton} ${viewMode === "list" ? styles.viewToggleButtonSelected : ""}`}
            onClick={() => setViewMode("list")}
          />
          <IconButton
            iconProps={{ iconName: "Calendar" }}
            title="Calendar view"
            ariaLabel="Calendar view"
            className={`${styles.viewToggleButton} ${viewMode === "calendar" ? styles.viewToggleButtonSelected : ""}`}
            onClick={() => setViewMode("calendar")}
          />
        </Stack>
      </Stack>

      {viewMode === "list" ? (
        <DetailsList
          items={bookings}
          columns={columns}
          layoutMode={DetailsListLayoutMode.justified}
          selectionMode={SelectionMode.none}
          onRenderRow={onRenderRow}
        />
      ) : (
        <BookingCalendar bookings={bookings} onCancelled={cancelBooking} />
      )}

      <Dialog
        hidden={!showConfirm}
        onDismiss={() => setShowConfirm(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Cancel Booking",
          subText: "Are you sure you want to cancel this booking?"
        }}
      >
        <DialogFooter>
          <DefaultButton text="Cancel Booking" onClick={handleCancel} disabled={deleting} />
          <DefaultButton text="Keep Booking" onClick={() => setShowConfirm(false)} disabled={deleting} />
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default MyBookings;
