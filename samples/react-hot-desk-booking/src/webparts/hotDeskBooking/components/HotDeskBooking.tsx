import React, { useState, useEffect, useCallback } from "react";
import {
  Pivot,
  PivotItem,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Stack
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
  selectedDate: Date;
}

const HotDeskBooking: React.FC<IHotDeskBookingProps> = (props) => {
  const [state, setState] = useState<IState>({
    resources: [],
    bookings: [],
    loading: true,
    error: null,
    selectedDate: new Date()
  });

  const [bookingService] = useState(() =>
    new BookingService(props.context, props.resourcesListName, props.bookingsListName)
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        setState((s) => ({ ...s, loading: true, error: null }));
        const resources = await bookingService.getResources();
        const myBookings = await bookingService.getMyBookings();
        
        setState((s) => ({
          ...s,
          resources,
          bookings: myBookings,
          loading: false
        }));
      } catch (err) {
        const errMsg = err instanceof Error ? err.message : "Failed to load data";
        setState((s) => ({ ...s, loading: false, error: errMsg }));
      }
    };

    loadData();
  }, [bookingService]);

  const handleBookingCreated = useCallback(async () => {
    try {
      const updated = await bookingService.getMyBookings();
      setState((s) => ({ ...s, bookings: updated }));
    } catch (err) {
      console.error("Error refreshing bookings:", err);
    }
  }, [bookingService]);

  return (
    <div className={styles.hotDeskBooking}>
      <h2>{props.title || "Resource Booking"}</h2>

      {state.error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setState((s) => ({ ...s, error: null }))}>
          {state.error}
        </MessageBar>
      )}

      {state.loading ? (
        <Spinner size={SpinnerSize.large} label="Loading resources..." />
      ) : (
        <Pivot>
          <PivotItem headerText="Browse & Book">
            <Stack tokens={{ childrenGap: 16 }} className={styles.resourceGrid}>
              {state.resources.length === 0 ? (
                <MessageBar messageBarType={MessageBarType.warning}>
                  No resources found. Please contact your administrator.
                </MessageBar>
              ) : (
                state.resources.map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onBookingCreated={handleBookingCreated}
                    bookingService={bookingService}
                  />
                ))
              )}
            </Stack>
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
