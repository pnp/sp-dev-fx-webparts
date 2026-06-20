import * as React from "react";
import { Stack, Text, PrimaryButton, Icon, DefaultButton } from "@fluentui/react";
import { IResource } from "../models/IResource";
import { BookingService } from "../services/BookingService";
import BookingForm from "./BookingForm";
import styles from "./HotDeskBooking.module.scss";

interface Props {
  resource: IResource;
  isBooked: boolean;
  bookingId?: string;
  isUnavailable: boolean;
  onBookingCreated: () => Promise<void>;
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

const ResourceCard: React.FC<Props> = ({
  resource,
  isBooked,
  bookingId,
  isUnavailable,
  onBookingCreated,
  bookingService
}) => {
  const [showForm, setShowForm] = React.useState(false);
  const [unbooking, setUnbooking] = React.useState(false);
  const typeMeta = getResourceMeta(resource.resourceType);

  const handleUnbook = React.useCallback(async (): Promise<void> => {
    if (!bookingId || unbooking) {
      return;
    }

    setUnbooking(true);
    try {
      await bookingService.cancelBooking(bookingId);
      await onBookingCreated();
    } finally {
      setUnbooking(false);
    }
  }, [bookingId, bookingService, onBookingCreated, unbooking]);

  return (
    <>
      <div className={styles.resourceCard}>
        <div className={styles.cardHeaderStrip} style={{ backgroundColor: `var(${typeMeta.colorVar})` }}>
          <Icon iconName={typeMeta.iconName} className={styles.cardTypeIcon} />
        </div>

        <div className={styles.resourceCardContent}>
          <Stack tokens={{ childrenGap: 12 }}>
            <Stack horizontal horizontalAlign="space-between">
              <Text variant="large" className={styles.resourceTitle}>
                {resource.title}
              </Text>
              {resource.resourceType && <span className={styles.resourceType}>{resource.resourceType}</span>}
            </Stack>

            {resource.location && (
              <Text variant="small">
                <strong>Location:</strong> {resource.location}
              </Text>
            )}

            {resource.description && <Text variant="small">{resource.description}</Text>}

            <Stack horizontal tokens={{ childrenGap: 8 }}>
              {isBooked ? (
                <Stack tokens={{ childrenGap: 8 }}>
                  <span className={styles.bookedBadge}>Already Booked</span>
                  <DefaultButton
                    text={unbooking ? "Unbooking..." : "Unbook"}
                    className={styles.cancelButton}
                    onClick={() => {
                      void handleUnbook();
                    }}
                    disabled={!bookingId || unbooking}
                  />
                </Stack>
              ) : !isUnavailable ? (
                <PrimaryButton text="Book" onClick={() => setShowForm(true)} className={styles.bookButton} />
              ) : null}
            </Stack>
          </Stack>
        </div>

        {isUnavailable && (
          <div className={styles.unavailableOverlay}>
            <Icon iconName="Lock" className={styles.unavailableIcon} />
            <Text variant="mediumPlus" className={styles.unavailableText}>
              Unavailable
            </Text>
          </div>
        )}
      </div>

      {showForm && (
        <BookingForm
          isOpen={showForm}
          resource={resource}
          onDismiss={() => setShowForm(false)}
          onSubmitted={onBookingCreated}
          bookingService={bookingService}
        />
      )}
    </>
  );
};

export default ResourceCard;
