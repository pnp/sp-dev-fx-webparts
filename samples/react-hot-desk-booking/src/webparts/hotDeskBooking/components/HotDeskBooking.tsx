import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Pivot,
  PivotItem,
  MessageBar,
  MessageBarType,
  DatePicker,
  DefaultButton,
  Stack,
  Text,
  Spinner,
  SpinnerSize,
  Shimmer,
  ShimmerElementsGroup,
  ShimmerElementType
} from "@fluentui/react";
import { IHotDeskBookingProps } from "./IHotDeskBookingProps";
import ResourceCard from "./ResourceCard";
import MyBookings from "./MyBookings";
import { BookingService } from "../services/BookingService";
import { IResource } from "../models/IResource";
import { IBooking } from "../models/IBooking";
import styles from "./HotDeskBooking.module.scss";

interface IState {
  resources: IResource[];
  bookings: IBooking[];
  loading: boolean;
  error: string | null;
}

const getStartOfDay = (date: Date): Date => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

const isSameDay = (left: Date, right: Date): boolean => {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
};

const HotDeskBooking: React.FC<IHotDeskBookingProps> = (props) => {
  const [state, setState] = useState<IState>({
    resources: [],
    bookings: [],
    loading: true,
    error: null
  });
  const [selectedDate, setSelectedDate] = useState<Date>(getStartOfDay(new Date()));
  const [takenResourceIds, setTakenResourceIds] = useState<Set<string>>(new Set());
  const [availabilityLoading, setAvailabilityLoading] = useState(false);

  const [bookingService] = useState(
    () => new BookingService(props.context, props.resourcesListName, props.bookingsListName)
  );

  const loadData = useCallback(async (): Promise<void> => {
    try {
      setState((s) => ({ ...s, loading: true, error: null }));
      const [resources, myBookings] = await Promise.all([
        bookingService.getResources(),
        bookingService.getMyBookings()
      ]);
      setState((s) => ({ ...s, resources, bookings: myBookings, loading: false }));
    } catch (err) {
      const errMsg = err instanceof Error ? err.message : "Failed to load data";
      setState((s) => ({ ...s, loading: false, error: errMsg }));
    }
  }, [bookingService]);

  const loadAvailability = useCallback(
    async (date: Date): Promise<void> => {
      try {
        setAvailabilityLoading(true);
        const bookingsOnDate = await bookingService.getBookingsForDate(date);
        const nextTakenIds = new Set<string>();
        bookingsOnDate.forEach((booking) => {
          if (booking.resource?.id) {
            nextTakenIds.add(booking.resource.id);
          }
        });
        setTakenResourceIds(nextTakenIds);
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Failed to load availability";
        setState((s) => ({ ...s, error: errMsg }));
      } finally {
        setAvailabilityLoading(false);
      }
    },
    [bookingService]
  );

  useEffect(() => {
    void loadData();
  }, [loadData]);

  useEffect(() => {
    void loadAvailability(selectedDate);
  }, [loadAvailability, selectedDate]);

  const handleBookingCreated = useCallback(async (): Promise<void> => {
    try {
      const [myBookings] = await Promise.all([bookingService.getMyBookings(), loadAvailability(selectedDate)]);
      setState((s) => ({ ...s, bookings: myBookings }));
    } catch (err) {
      console.error("Error refreshing bookings:", err);
    }
  }, [bookingService, loadAvailability, selectedDate]);

  const todayStart = getStartOfDay(new Date());

  const selectedDateBookingsByResource = useMemo(() => {
    const bookingMap = new Map<string, IBooking>();
    state.bookings
      .filter((booking) => {
        if (!booking.resource) {
          return false;
        }

        const bookingDay = getStartOfDay(new Date(booking.bookingDate));
        return bookingDay >= todayStart && isSameDay(bookingDay, selectedDate);
      })
      .forEach((booking) => {
        bookingMap.set(booking.resource!.id, booking);
      });

    return bookingMap;
  }, [selectedDate, state.bookings, todayStart]);

  const availableCount = useMemo(
    () =>
      state.resources.filter((resource) => {
        const isBooked = selectedDateBookingsByResource.has(resource.id);
        const isUnavailable = takenResourceIds.has(resource.id) && !isBooked;
        return !isUnavailable && !isBooked;
      }).length,
    [selectedDateBookingsByResource, state.resources, takenResourceIds]
  );

  const shimmerElements = (
    <ShimmerElementsGroup
      shimmerElements={[
        { type: ShimmerElementType.line, height: 16, width: "100%" },
        { type: ShimmerElementType.gap, height: 12 },
        { type: ShimmerElementType.line, height: 16, width: "70%" },
        { type: ShimmerElementType.gap, height: 8 },
        { type: ShimmerElementType.line, height: 14, width: "90%" },
        { type: ShimmerElementType.gap, height: 8 },
        { type: ShimmerElementType.line, height: 14, width: "80%" },
        { type: ShimmerElementType.gap, height: 12 },
        { type: ShimmerElementType.line, height: 32, width: "45%" }
      ]}
    />
  );

  return (
    <div className={styles.hotDeskBooking}>
      <div className={styles.webPartHeader}>
        <Text variant="xLarge" className={styles.webPartTitle}>
          {props.title || "Resource Booking"}
        </Text>
        <span className={styles.availabilityPill}>{availableCount} available</span>
      </div>

      {state.error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setState((s) => ({ ...s, error: null }))}>
          {state.error}
        </MessageBar>
      )}

      {state.loading ? (
        <div className={styles.resourceGrid}>
          {[0, 1, 2, 3].map((index) => (
            <div key={index} className={styles.loadingCard}>
              <Shimmer customElementsGroup={shimmerElements} />
            </div>
          ))}
        </div>
      ) : (
        <Pivot>
          <PivotItem headerText="Browse & Book">
            <div className={styles.dateFilterBar}>
              <DatePicker
                label="Showing availability for:"
                value={selectedDate}
                onSelectDate={(date) => {
                  if (date) {
                    setSelectedDate(getStartOfDay(date));
                  }
                }}
              />
              <Stack horizontal verticalAlign="end" tokens={{ childrenGap: 10 }}>
                <DefaultButton text="Today" onClick={() => setSelectedDate(getStartOfDay(new Date()))} />
                {availabilityLoading && <Spinner size={SpinnerSize.small} label="Updating..." />}
              </Stack>
            </div>

            <div className={styles.resourceGrid}>
              {state.resources.length === 0 ? (
                <MessageBar messageBarType={MessageBarType.warning}>
                  No resources found. Please contact your administrator.
                </MessageBar>
              ) : (
                state.resources.map((resource) => {
                  const bookingForSelectedDate = selectedDateBookingsByResource.get(resource.id);
                  const isBooked = Boolean(bookingForSelectedDate);
                  const isUnavailable = takenResourceIds.has(resource.id) && !isBooked;

                  return (
                    <ResourceCard
                      key={resource.id}
                      resource={resource}
                      isBooked={isBooked}
                      bookingId={bookingForSelectedDate?.id}
                      isUnavailable={isUnavailable}
                      onBookingCreated={handleBookingCreated}
                      bookingService={bookingService}
                    />
                  );
                })
              )}
            </div>
          </PivotItem>
          <PivotItem headerText="My Bookings">
            <MyBookings
              bookings={state.bookings}
              bookingService={bookingService}
              onCancelled={handleBookingCreated}
            />
          </PivotItem>
        </Pivot>
      )}
    </div>
  );
};

export default HotDeskBooking;
