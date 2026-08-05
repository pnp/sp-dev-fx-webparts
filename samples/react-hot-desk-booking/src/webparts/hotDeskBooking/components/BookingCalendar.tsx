import * as React from "react";
import { Callout, DirectionalHint, IconButton, Link, Text } from "@fluentui/react";
import { IBooking } from "../models/IBooking";
import styles from "./HotDeskBooking.module.scss";

interface Props {
  bookings: IBooking[];
  onCancelled: (booking: IBooking) => Promise<void>;
}

interface IDayCell {
  date: Date;
  inCurrentMonth: boolean;
}

const dayHeaders = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const getStartOfDay = (date: Date): Date => {
  const value = new Date(date);
  value.setHours(0, 0, 0, 0);
  return value;
};

const getDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
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

const getMonthGrid = (viewMonth: Date): IDayCell[] => {
  const firstDay = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1);
  const firstDayIndexMonday = (firstDay.getDay() + 6) % 7;
  const firstGridDate = new Date(firstDay);
  firstGridDate.setDate(firstDay.getDate() - firstDayIndexMonday);

  const days: IDayCell[] = [];
  for (let i = 0; i < 42; i++) {
    const cellDate = new Date(firstGridDate);
    cellDate.setDate(firstGridDate.getDate() + i);
    days.push({
      date: cellDate,
      inCurrentMonth: cellDate.getMonth() === viewMonth.getMonth()
    });
  }

  return days;
};

const BookingCalendar: React.FC<Props> = ({ bookings, onCancelled }) => {
  const [viewMonth, setViewMonth] = React.useState<Date>(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [selectedDateKey, setSelectedDateKey] = React.useState<string | null>(null);
  const [calloutTarget, setCalloutTarget] = React.useState<HTMLElement | null>(null);

  const monthFormatter = React.useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        month: "long",
        year: "numeric"
      }),
    []
  );

  const bookingsByDay = React.useMemo(() => {
    const grouped = new Map<string, IBooking[]>();
    bookings.forEach((booking) => {
      const bookingDate = getStartOfDay(new Date(booking.bookingDate));
      if (
        bookingDate.getMonth() !== viewMonth.getMonth() ||
        bookingDate.getFullYear() !== viewMonth.getFullYear()
      ) {
        return;
      }

      const key = getDateKey(bookingDate);
      const current = grouped.get(key) || [];
      current.push(booking);
      grouped.set(key, current);
    });

    return grouped;
  }, [bookings, viewMonth]);

  const selectedDayBookings = selectedDateKey ? bookingsByDay.get(selectedDateKey) || [] : [];
  const todayKey = getDateKey(getStartOfDay(new Date()));
  const days = React.useMemo(() => getMonthGrid(viewMonth), [viewMonth]);

  const openDayCallout = (date: Date, target: HTMLElement): void => {
    const key = getDateKey(date);
    if ((bookingsByDay.get(key) || []).length === 0) {
      return;
    }

    setSelectedDateKey(key);
    setCalloutTarget(target);
  };

  const closeCallout = (): void => {
    setSelectedDateKey(null);
    setCalloutTarget(null);
  };

  const shiftMonth = (delta: number): void => {
    setViewMonth((current) => new Date(current.getFullYear(), current.getMonth() + delta, 1));
    closeCallout();
  };

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarHeader}>
        <IconButton iconProps={{ iconName: "ChevronLeft" }} onClick={() => shiftMonth(-1)} ariaLabel="Previous month" />
        <Text className={styles.calendarMonthLabel}>{monthFormatter.format(viewMonth)}</Text>
        <IconButton iconProps={{ iconName: "ChevronRight" }} onClick={() => shiftMonth(1)} ariaLabel="Next month" />
      </div>

      <div className={styles.calendarGrid}>
        {dayHeaders.map((day) => (
          <div key={day} className={styles.calendarDayHeader}>
            {day}
          </div>
        ))}

        {days.map((day) => {
          const dayKey = getDateKey(day.date);
          const dayBookings = bookingsByDay.get(dayKey) || [];
          const extraCount = dayBookings.length > 3 ? dayBookings.length - 3 : 0;
          const isToday = dayKey === todayKey;

          return (
            <button
              key={dayKey}
              type="button"
              className={`${styles.calendarDayCell} ${day.inCurrentMonth ? "" : styles.calendarOutsideMonth} ${
                isToday ? styles.calendarToday : ""
              }`.trim()}
              onClick={(event) => openDayCallout(day.date, event.currentTarget)}
            >
              <span className={styles.calendarDayNumber}>{day.date.getDate()}</span>
              <div className={styles.calendarDots}>
                {dayBookings.slice(0, 3).map((booking) => (
                  <span
                    key={booking.id}
                    className={styles.calendarDot}
                    style={{ backgroundColor: getResourceColor(booking.resource?.resourceType || "") }}
                  />
                ))}
                {extraCount > 0 && <span className={styles.calendarMore}>+{extraCount} more</span>}
              </div>
            </button>
          );
        })}
      </div>

      {calloutTarget && selectedDateKey && (
        <Callout target={calloutTarget} onDismiss={closeCallout} directionalHint={DirectionalHint.bottomCenter} className={styles.calendarCallout}>
          <div className={styles.calendarCalloutContent}>
            {selectedDayBookings.map((booking) => (
              <div key={booking.id} className={styles.calendarBookingItem}>
                <Text className={styles.calendarBookingTitle}>{booking.resource?.title || "Unknown"}</Text>
                <Text variant="small">{booking.notes ? booking.notes.slice(0, 80) : "No notes"}</Text>
                <Link
                  disabled={getStartOfDay(new Date(booking.bookingDate)).getTime() < getStartOfDay(new Date()).getTime()}
                  onClick={() => {
                    void onCancelled(booking);
                    closeCallout();
                  }}
                >
                  Cancel
                </Link>
              </div>
            ))}
          </div>
        </Callout>
      )}
    </div>
  );
};

export default BookingCalendar;
