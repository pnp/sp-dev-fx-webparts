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
  DialogType
} from "@fluentui/react";
import { IBooking } from "../models/IBooking";
import { BookingService } from "../services/BookingService";
import styles from "./HotDeskBooking.module.scss";

interface Props {
  bookings: IBooking[];
  bookingService: BookingService;
  onCancelled: () => Promise<void>;
}

const MyBookings: React.FC<Props> = ({ bookings, bookingService, onCancelled }) => {
  const [selectedBooking, setSelectedBooking] = React.useState<IBooking | null>(null);
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);

  const isFuture = (date: Date) => new Date(date) > new Date();

  const handleCancel = async () => {
    if (!selectedBooking) return;

    setDeleting(true);
    try {
      await bookingService.cancelBooking(selectedBooking.id);
      await onCancelled();
      setShowConfirm(false);
      setSelectedBooking(null);
    } finally {
      setDeleting(false);
    }
  };

  const columns: IColumn[] = [
    {
      key: "resource",
      name: "Resource",
      fieldName: "title",
      minWidth: 150,
      maxWidth: 200,
      onRender: (item: IBooking) => item.resource?.title || "Unknown"
    },
    {
      key: "date",
      name: "Date",
      minWidth: 100,
      onRender: (item: IBooking) => new Date(item.bookingDate).toLocaleDateString()
    },
    {
      key: "notes",
      name: "Notes",
      minWidth: 200,
      fieldName: "notes"
    },
    {
      key: "action",
      name: "Action",
      minWidth: 80,
      onRender: (item: IBooking) =>
        isFuture(item.bookingDate) ? (
          <DefaultButton
            text="Cancel"
            onClick={() => {
              setSelectedBooking(item);
              setShowConfirm(true);
            }}
          />
        ) : null
    }
  ];

  if (bookings.length === 0) {
    return (
      <MessageBar messageBarType={MessageBarType.info}>
        You have no bookings yet.
      </MessageBar>
    );
  }

  return (
    <>
      <DetailsList
        items={bookings}
        columns={columns}
        layoutMode={DetailsListLayoutMode.justified}
        selectionMode={SelectionMode.none}
      />

      <Dialog
        hidden={!showConfirm}
        onDismiss={() => setShowConfirm(false)}
        dialogContentProps={{
          type: DialogType.normal,
          title: "Cancel Booking",
          subText: "Are you sure you want to cancel this booking?"
        }}
      >
        <Stack.Item>
          <DefaultButton
            text="Cancel Booking"
            onClick={handleCancel}
            disabled={deleting}
          />
          <DefaultButton
            text="Keep Booking"
            onClick={() => setShowConfirm(false)}
            disabled={deleting}
          />
        </Stack.Item>
      </Dialog>
    </>
  );
};

export default MyBookings;
