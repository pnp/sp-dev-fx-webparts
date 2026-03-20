/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-lines */
/* eslint-disable no-void */
import * as React from "react";
import styles from "./SpFxRoomBooking.module.scss";
import type { ISpFxRoomBookingProps } from "./ISpFxRoomBookingProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  DefaultButton,
  DatePicker,
  IconButton,
  Pivot,
  PivotItem,
  PrimaryButton,
  SearchBox,
  TextField,
  TimePicker,
  Spinner,
  SpinnerSize,
} from "@fluentui/react";
import type { IComboBox } from "@fluentui/react";
import {
  createRoomBookingDetail,
  deleteBooking,
  deleteRoomBookingDetail,
  getRoomsAvailability,
  getMyBookings,
  getRoomBookingDetails,
  getRoomBookingStatusChoices,
  updateRoomBookingDetailByMeetingId,
  bookRoom,
  getRoomsViaPlaces,
  updateBooking,
  type IRoomBookingListItemPayload,
  type IBookingEvent,
  type IRoomBookingListItem,
} from "./services/PnpService";
import {
  IMyBooking,
  IRoom,
  IRoomSchedule,
  IScheduleItem,
} from "./interfaces/IRoom";
import { combineDateAndTime, formatLocalAsISO } from "./utils/DateTimeHelper";

interface ISpFxRoomBookingState {
  rooms: IRoom[];
  myBookings: IMyBooking[];
  adminBookings: IRoomBookingListItem[];

  selectedDate: Date | undefined;
  startTime: Date | undefined;
  endTime: Date | undefined;
  meetingTitle: string;

  availability: Record<string, "available" | "busy" | "unknown">;

  isSearching: boolean;
  isLoadingRooms: boolean;
  isLoadingBookings: boolean;
  isLoadingAdminBookings: boolean;
  hasSearched: boolean;
  activeTabKey: "book" | "myBookings" | "admin";
  isAdmin: boolean;
  adminSearchText: string;
  adminStatusFilter: string;
  adminStatusOptions: string[];
  adminDateFilter: Date | undefined;
  isKillSwitchRunning: boolean;
  bookingRoomEmail?: string;
  bookingActionId?: string;
  editingBookingId?: string;
  editMode?: BookingEditMode;
  editingRoomEmail?: string;
  editingRoomName?: string;
  editingOriginalStart?: Date;
  editingOriginalEnd?: Date;
  error?: string;
  endTimeError?: string;
  bookingListError?: string;
  adminListError?: string;
  success?: string;
  userTimeZone?: string;
  searchText: string;
}

type BookingEditMode = "changeDateTime" | "changeRoom";

type IBookingFormResetState = Pick<
  ISpFxRoomBookingState,
  | "selectedDate"
  | "startTime"
  | "endTime"
  | "meetingTitle"
  | "availability"
  | "hasSearched"
  | "bookingRoomEmail"
  | "bookingActionId"
  | "editingBookingId"
  | "editMode"
  | "editingRoomEmail"
  | "editingRoomName"
  | "editingOriginalStart"
  | "editingOriginalEnd"
  | "error"
  | "endTimeError"
  | "success"
  | "searchText"
>;

export default class SpFxRoomBooking extends React.Component<
  ISpFxRoomBookingProps,
  ISpFxRoomBookingState
> {
  private static readonly windowsToIanaTimeZoneMap: Record<string, string> = {
    "India Standard Time": "Asia/Kolkata",
  };

  private static readonly allStatusLabel = "All status";

  private static readonly enableDeveloperKillSwitch = true;

  constructor(props: ISpFxRoomBookingProps) {
    super(props);
    this.state = {
      rooms: [],
      myBookings: [],
      adminBookings: [],
      selectedDate: new Date(),
      startTime: undefined,
      endTime: undefined,
      meetingTitle: "Room Booking By " + this.props.userDisplayName,
      availability: {},
      isSearching: false,
      isLoadingRooms: true,
      isLoadingBookings: true,
      isLoadingAdminBookings: false,
      hasSearched: false,
      activeTabKey: "book",
      isAdmin: false,
      adminSearchText: "",
      adminStatusFilter: SpFxRoomBooking.allStatusLabel,
      adminStatusOptions: [SpFxRoomBooking.allStatusLabel],
      adminDateFilter: undefined,
      isKillSwitchRunning: false,
      searchText: "",
    };
  }

  async componentDidMount(): Promise<void> {
    try {
      // Fetch available rooms from Microsoft Graph Places API
      const roomsRaw = await getRoomsViaPlaces(this.props.context);
      let userTimeZone = "UTC";

      // Fetch user's timezone from mailbox settings
      try {
        const client =
          await this.props.context.msGraphClientFactory.getClient("3");
        const settings = await client
          .api("/me/mailboxSettings")
          .version("v1.0")
          .get();
        this.setState({
          userTimeZone: settings.timeZone || "UTC",
        });
        userTimeZone = settings.timeZone || "UTC";
      } catch (error) {
        console.error("Error fetching mailbox settings:", error);
        this.setState({ userTimeZone: "UTC" });
      }

      // Store rooms and mark loading as complete
      this.setState({
        rooms: roomsRaw,
        userTimeZone,
        isLoadingRooms: false,
      });

      await this.loadMyBookings(roomsRaw, userTimeZone);

      const currentUserEmail =
        this.props.context.pageContext.user.email?.trim().toLowerCase() ?? "";
      const configuredAdmins = this.getConfiguredAdminEmails();
      const isAdmin = configuredAdmins.indexOf(currentUserEmail) >= 0;
      this.setState({ isAdmin });

      if (isAdmin) {
        await this.loadAdminBookings();
      }
    } catch (error) {
      console.error("Error fetching rooms in componentDidMount:", error);
      this.setState({
        isLoadingRooms: false,
        isLoadingBookings: false,
        isLoadingAdminBookings: false,
        error: "Failed to load rooms. Please refresh the page.",
      });
    }
  }

  // ============================================================================
  // HELPER METHODS
  // ============================================================================

  private getConfiguredListId(): string {
    return this.props.listId?.trim() ?? "";
  }

  private getConfiguredAdminEmails(): string[] {
    const raw = this.props.adminEmails ?? "";
    const normalized = raw
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter((email) => Boolean(email));

    return Array.from(new Set(normalized));
  }

  /**
   * Compares two Date objects by time-of-day only (hours + minutes), ignoring the date portion.
   * Necessary because TimePicker always returns today's date in the Date object,
   * while state values may carry a different date (e.g. a future selected date).
   */
  private timeOfDayMinutes(d: Date): number {
    return d.getHours() * 60 + d.getMinutes();
  }

  /**
   * Finds a room attendee/location from an event by matching against known room emails.
   */
  private extractRoomFromBooking(
    event: IBookingEvent,
    roomEmailSet: Set<string>,
  ): { roomEmail?: string; roomName?: string } {
    const locationEmail = event.location?.locationEmailAddress?.toLowerCase();
    if (locationEmail && roomEmailSet.has(locationEmail)) {
      return {
        roomEmail: locationEmail,
        roomName: event.location?.displayName ?? locationEmail,
      };
    }

    const attendee = (event.attendees ?? []).find((a) => {
      const email = a.emailAddress?.address?.toLowerCase();
      return email ? roomEmailSet.has(email) : false;
    });

    return {
      roomEmail: attendee?.emailAddress?.address?.toLowerCase(),
      roomName: attendee?.emailAddress?.name,
    };
  }

  /**
   * Loads the current user's upcoming room bookings.
   */
  private loadMyBookings = async (
    roomsInput?: IRoom[],
    timeZoneInput?: string,
  ): Promise<void> => {
    const rooms = roomsInput ?? this.state.rooms;
    const userTimeZone = timeZoneInput ?? this.state.userTimeZone ?? "UTC";

    this.setState({ isLoadingBookings: true, bookingListError: undefined });

    try {
      const events = await getMyBookings(this.props.context, userTimeZone);
      const roomEmailSet = new Set(
        rooms
          .map((r) => r.emailAddress?.toLowerCase())
          .filter((mail): mail is string => Boolean(mail)),
      );

      const bookings: IMyBooking[] = events
        .filter((event) => {
          if (event.isCancelled) {
            return false;
          }

          const subject = event.subject?.trim() ?? "";
          return !/^cancelled?:/i.test(subject);
        })
        .map((event) => {
          const start = new Date(event.start?.dateTime);
          const end = new Date(event.end?.dateTime);
          if (isNaN(start.getTime()) || isNaN(end.getTime())) {
            return undefined;
          }

          const roomInfo = this.extractRoomFromBooking(event, roomEmailSet);
          if (!roomInfo.roomEmail) {
            return undefined;
          }

          return {
            id: event.id,
            subject: event.subject || "(No title)",
            start,
            end,
            roomEmail: roomInfo.roomEmail,
            roomName: roomInfo.roomName,
            webLink: event.webLink,
            joinUrl: event.onlineMeeting?.joinUrl,
          } as IMyBooking;
        })
        .filter((b): b is IMyBooking => Boolean(b))
        .filter((b) => b.end.getTime() >= Date.now())
        .sort((a, b) => a.start.getTime() - b.start.getTime());

      this.setState({
        myBookings: bookings,
        isLoadingBookings: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        isLoadingBookings: false,
        bookingListError: "Failed to load your bookings.",
      });
    }
  };

  /**
   * Loads all booking records from the SharePoint list for admins.
   */
  private loadAdminBookings = async (): Promise<void> => {
    const listId = this.getConfiguredListId();
    if (!listId) {
      this.setState({
        isLoadingAdminBookings: false,
        adminListError:
          "Configure the booking list id in web part properties to load admin data.",
      });
      return;
    }

    this.setState({ isLoadingAdminBookings: true, adminListError: undefined });

    try {
      const [adminBookings, choiceStatuses] = await Promise.all([
        getRoomBookingDetails(this.props.context, listId),
        getRoomBookingStatusChoices(this.props.context, listId),
      ]);

      const rowStatuses = adminBookings
        .map((item) => item.status?.trim())
        .filter((status): status is string => Boolean(status));
      const adminStatusOptions = [
        SpFxRoomBooking.allStatusLabel,
        ...Array.from(new Set([...choiceStatuses, ...rowStatuses])),
      ];

      this.setState({
        adminBookings,
        adminStatusOptions,
        isLoadingAdminBookings: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        isLoadingAdminBookings: false,
        adminListError: "Failed to load booking details from SharePoint list.",
      });
    }
  };

  /**
   * Converts SharePoint date string to a stable yyyy-mm-dd key.
   */
  private getDateKeyFromListDate(dateValue: string): string {
    if (!dateValue) {
      return "";
    }
    return dateValue.slice(0, 10);
  }

  /**
   * Converts a Date to yyyy-mm-dd using local date components.
   */
  private getDateKeyFromDate(date: Date): string {
    const pad2 = (value: number): string =>
      value < 10 ? `0${value}` : `${value}`;
    const y = date.getFullYear();
    const m = pad2(date.getMonth() + 1);
    const d = pad2(date.getDate());
    return `${y}-${m}-${d}`;
  }

  /**
   * Returns an Intl-compatible timezone for UI formatting.
   * Graph often returns Windows timezone IDs (for example: India Standard Time),
   * while Intl APIs require IANA timezone IDs.
   */
  private getDisplayTimeZone(timeZone?: string): string | undefined {
    if (!timeZone) {
      return undefined;
    }

    if (this.isIntlTimeZoneSupported(timeZone)) {
      return timeZone;
    }

    const mapped = SpFxRoomBooking.windowsToIanaTimeZoneMap[timeZone];
    if (mapped && this.isIntlTimeZoneSupported(mapped)) {
      return mapped;
    }

    return undefined;
  }

  private isIntlTimeZoneSupported(timeZone: string): boolean {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone }).format(new Date());
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Formats SharePoint date using the user's mailbox timezone while preserving date-only semantics.
   */
  private formatAdminBookingDate(dateValue: string): string {
    const dateKey = this.getDateKeyFromListDate(dateValue);
    if (!dateKey) {
      return "-";
    }

    const [yearStr, monthStr, dayStr] = dateKey.split("-");
    const year = Number(yearStr);
    const month = Number(monthStr);
    const day = Number(dayStr);

    if (!year || !month || !day) {
      return dateValue;
    }

    // Use noon UTC to avoid day shifts when formatting in other time zones.
    const stableDate = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "2-digit",
      year: "numeric",
    };

    const displayTimeZone = this.getDisplayTimeZone(this.state.userTimeZone);
    if (displayTimeZone) {
      options.timeZone = displayTimeZone;
    }

    return new Intl.DateTimeFormat("en-US", options).format(stableDate);
  }

  private onAdminSearchTextChange = (
    _event?: React.ChangeEvent<HTMLInputElement>,
    newValue?: string,
  ): void => {
    this.setState({ adminSearchText: newValue ?? "" });
  };

  private onAdminStatusFilterPillClick = (status: string): void => {
    this.setState({ adminStatusFilter: status });
  };

  private onAdminDateFilterChange = (date: Date | null | undefined): void => {
    this.setState({ adminDateFilter: date ?? undefined });
  };

  private onResetAdminFilters = (): void => {
    this.setState({
      adminSearchText: "",
      adminStatusFilter: SpFxRoomBooking.allStatusLabel,
      adminDateFilter: undefined,
    });
  };

  private onDeveloperKillSwitch = async (): Promise<void> => {
    const listId = this.getConfiguredListId();
    if (!listId) {
      this.setState({
        error:
          "Configure the booking list id in web part properties before running the kill switch.",
      });
      return;
    }

    const confirmed = window.confirm(
      "Developer kill switch will delete your visible room bookings and your corresponding SharePoint list rows. Continue?",
    );

    if (!confirmed) {
      return;
    }

    const myRoomBookings = this.state.myBookings.slice();
    const userEmail =
      this.props.context.pageContext.user.email?.trim().toLowerCase() ?? "";
    const userDisplayName =
      this.props.context.pageContext.user.displayName?.trim().toLowerCase() ??
      "";

    const bookingIdentityKeys = myRoomBookings.map((booking) => {
      const bookingDate = this.getDateKeyFromDate(booking.start);
      const startLabel = booking.start.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      const endLabel = booking.end.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      return `${booking.subject.trim().toLowerCase()}|${bookingDate}|${startLabel.toLowerCase()}|${endLabel.toLowerCase()}`;
    });

    this.setState({
      isKillSwitchRunning: true,
      error: undefined,
      success: undefined,
    });

    try {
      await Promise.all(
        myRoomBookings.map((booking) =>
          deleteBooking(this.props.context, booking.id),
        ),
      );

      const listItems = await getRoomBookingDetails(this.props.context, listId);
      const myListItems = listItems.filter((item) => {
        const bookedBy = item.bookedBy?.trim().toLowerCase() ?? "";

        const byUserMatch =
          (Boolean(userEmail) &&
            (bookedBy === userEmail || bookedBy.indexOf(userEmail) >= 0)) ||
          (Boolean(userDisplayName) && bookedBy === userDisplayName);

        const itemKey = `${item.title.trim().toLowerCase()}|${this.getDateKeyFromListDate(item.bookingDate)}|${item.startTime.trim().toLowerCase()}|${item.endTime.trim().toLowerCase()}`;

        return byUserMatch || bookingIdentityKeys.indexOf(itemKey) >= 0;
      });

      await Promise.all(
        myListItems.map((item) =>
          deleteRoomBookingDetail(this.props.context, listId, item.id),
        ),
      );

      await this.loadMyBookings();

      if (this.state.isAdmin) {
        await this.loadAdminBookings();
      }

      this.setState({
        success: `Developer cleanup complete. Deleted ${myRoomBookings.length} calendar bookings and ${myListItems.length} SharePoint rows.`,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        error: "Developer cleanup failed. Some items may have been deleted.",
      });
    } finally {
      this.setState({ isKillSwitchRunning: false });
    }
  };

  private onMeetingTitleChange = (
    _event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string,
  ): void => {
    this.setState({
      meetingTitle: newValue ?? "",
      success: undefined,
      error: undefined,
    });
  };

  private getDefaultBookingFormState(): IBookingFormResetState {
    return {
      selectedDate: new Date(),
      startTime: undefined,
      endTime: undefined,
      meetingTitle: "Room Booking",
      availability: {},
      hasSearched: false,
      bookingRoomEmail: undefined,
      bookingActionId: undefined,
      editingBookingId: undefined,
      editMode: undefined,
      editingRoomEmail: undefined,
      editingRoomName: undefined,
      editingOriginalStart: undefined,
      editingOriginalEnd: undefined,
      error: undefined,
      endTimeError: undefined,
      success: undefined,
      searchText: "",
    };
  }

  private onTabChange = (item?: PivotItem): void => {
    const key = item?.props.itemKey;
    if (key === "book" || key === "myBookings" || key === "admin") {
      if (key === "myBookings") {
        this.setState({
          activeTabKey: key,
          ...this.getDefaultBookingFormState(),
        });
      } else if (key === "admin") {
        this.setState({
          activeTabKey: key,
          ...this.getDefaultBookingFormState(),
        });
      } else {
        this.setState({ activeTabKey: key });
      }
    }
  };

  private startBookingEdit = (
    booking: IMyBooking,
    mode: BookingEditMode,
  ): void => {
    this.setState(
      {
        activeTabKey: "book",
        editingBookingId: booking.id,
        editMode: mode,
        meetingTitle: booking.subject,
        selectedDate: new Date(booking.start),
        startTime: new Date(booking.start),
        endTime: new Date(booking.end),
        editingRoomEmail: booking.roomEmail,
        editingRoomName: booking.roomName,
        editingOriginalStart: new Date(booking.start),
        editingOriginalEnd: new Date(booking.end),
        hasSearched: false,
        availability: {},
        searchText: "",
        bookingRoomEmail: undefined,
        bookingActionId: undefined,
        endTimeError: undefined,
        error: undefined,
        success: undefined,
      },
      () => {
        if (mode === "changeRoom") {
          void this.onSearchRooms();
        }
      },
    );
  };

  private onChangeDateTime = (booking: IMyBooking): void => {
    this.startBookingEdit(booking, "changeDateTime");
  };

  private onChangeRoom = (booking: IMyBooking): void => {
    this.startBookingEdit(booking, "changeRoom");
  };

  private onCancelEditBooking = (): void => {
    this.setState({
      ...this.getDefaultBookingFormState(),
    });
  };

  private refreshBookingsAfterMutation = async (): Promise<void> => {
    await this.loadMyBookings();

    if (this.state.isAdmin) {
      await this.loadAdminBookings();
    }
  };

  private buildListPayloadFromSelection(
    start: Date,
    end: Date,
    title: string,
    meetingId: string,
    roomBooked: string,
  ): IRoomBookingListItemPayload {
    return {
      meetingId,
      status: "Booked",
      title: title.trim() || "Room Booking",
      bookingDate: this.getDateKeyFromDate(start),
      startTime: start.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      endTime: end.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      roomBooked,
      durationInMinutes: Math.round((end.getTime() - start.getTime()) / 60000),
    };
  }

  private getRoomBookedValue(roomEmail: string): string {
    const room = this.state.rooms.find(
      (item) => item.emailAddress?.toLowerCase() === roomEmail.toLowerCase(),
    );

    return room?.displayName?.trim() || roomEmail;
  }

  private isSelfScheduleItem(scheduleId: string, item: IScheduleItem): boolean {
    const {
      editingRoomEmail,
      editingOriginalStart,
      editingOriginalEnd,
      editingBookingId,
    } = this.state;

    if (
      !editingBookingId ||
      !editingRoomEmail ||
      !editingOriginalStart ||
      !editingOriginalEnd
    ) {
      return false;
    }

    if (scheduleId.toLowerCase() !== editingRoomEmail.toLowerCase()) {
      return false;
    }

    const itemStart = Date.parse(item.start.dateTime + "Z");
    const itemEnd = Date.parse(item.end.dateTime + "Z");

    return (
      itemStart === editingOriginalStart.getTime() &&
      itemEnd === editingOriginalEnd.getTime()
    );
  }

  private loadAvailabilityForRange = async (
    roomEmails: string[],
    start: Date,
    end: Date,
  ): Promise<Record<string, "available" | "busy" | "unknown">> => {
    const schedules: IRoomSchedule[] = await getRoomsAvailability(
      this.props.context,
      roomEmails,
      formatLocalAsISO(start),
      formatLocalAsISO(end),
      this.state.userTimeZone ?? "UTC",
    );

    const availability: Record<string, "available" | "busy" | "unknown"> = {};
    const searchStartMs = start.getTime();
    const searchEndMs = end.getTime();

    schedules.forEach((sch: IRoomSchedule): void => {
      let isBusy = false;

      if (sch.scheduleItems && sch.scheduleItems.length > 0) {
        for (const item of sch.scheduleItems) {
          if (this.isSelfScheduleItem(sch.scheduleId, item)) {
            continue;
          }

          const itemStart = Date.parse(item.start.dateTime + "Z");
          const itemEnd = Date.parse(item.end.dateTime + "Z");
          const overlaps = !(
            itemEnd <= searchStartMs || itemStart >= searchEndMs
          );

          if (overlaps) {
            isBusy = true;
            break;
          }
        }
      }

      availability[sch.scheduleId.toLowerCase()] = isBusy
        ? "busy"
        : "available";
    });

    roomEmails.forEach((mail: string): void => {
      if (!availability[mail.toLowerCase()]) {
        availability[mail.toLowerCase()] = "unknown";
      }
    });

    return availability;
  };

  private onUpdateBooking = async (): Promise<void> => {
    const {
      selectedDate,
      startTime,
      endTime,
      editingBookingId,
      meetingTitle,
      editMode,
      editingRoomEmail,
      editingRoomName,
    } = this.state;

    if (!editingBookingId || editMode !== "changeDateTime") {
      return;
    }

    const validation = this.validateInputs();
    if (validation) {
      this.setState({ error: validation, success: undefined });
      return;
    }

    if (!selectedDate || !startTime || !endTime) {
      return;
    }

    const start = combineDateAndTime(selectedDate, startTime);
    const end = combineDateAndTime(selectedDate, endTime);

    this.setState({
      bookingActionId: editingBookingId,
      error: undefined,
      success: undefined,
    });

    try {
      if (editingRoomEmail) {
        const availability = await this.loadAvailabilityForRange(
          [editingRoomEmail],
          start,
          end,
        );
        const roomStatus = availability[editingRoomEmail.toLowerCase()];

        if (roomStatus !== "available") {
          this.setState({
            bookingActionId: undefined,
            availability,
            hasSearched: true,
            error:
              roomStatus === "busy"
                ? `${editingRoomName ?? editingRoomEmail} is not available for the selected date and time. Use Change room instead.`
                : `Couldn't verify availability for ${editingRoomName ?? editingRoomEmail}. Please try again.`,
          });
          return;
        }
      }

      await updateBooking(this.props.context, {
        id: editingBookingId,
        subject: meetingTitle.trim() || "Room Booking",
        startLocalISO: formatLocalAsISO(start),
        endLocalISO: formatLocalAsISO(end),
        timeZone: this.state.userTimeZone ?? "UTC",
      });

      try {
        const listId = this.getConfiguredListId();
        if (!listId) {
          throw new Error("Missing list id configuration.");
        }

        await updateRoomBookingDetailByMeetingId(
          this.props.context,
          listId,
          editingBookingId,
          this.buildListPayloadFromSelection(
            start,
            end,
            meetingTitle,
            editingBookingId,
            editingRoomName?.trim() || editingRoomEmail || "",
          ),
        );
      } catch (listSyncError) {
        console.error(
          "Failed to sync updated booking to SharePoint:",
          listSyncError,
        );
      }

      this.setState({
        ...this.getDefaultBookingFormState(),
        activeTabKey: "myBookings",
        success: "Booking updated successfully.",
      });

      await this.refreshBookingsAfterMutation();
    } catch (error) {
      console.error(error);
      this.setState({
        bookingActionId: undefined,
        error: "Failed to update booking.",
      });
    }
  };

  private onChangeRoomSelection = async (roomEmail: string): Promise<void> => {
    const {
      selectedDate,
      startTime,
      endTime,
      meetingTitle,
      editingBookingId,
      editMode,
    } = this.state;

    if (
      !selectedDate ||
      !startTime ||
      !endTime ||
      !editingBookingId ||
      editMode !== "changeRoom"
    ) {
      return;
    }

    const start = combineDateAndTime(selectedDate, startTime);
    const end = combineDateAndTime(selectedDate, endTime);

    this.setState({
      bookingActionId: editingBookingId,
      bookingRoomEmail: roomEmail,
      error: undefined,
      success: undefined,
    });

    try {
      await updateBooking(this.props.context, {
        id: editingBookingId,
        subject: meetingTitle.trim() || "Room Booking",
        startLocalISO: formatLocalAsISO(start),
        endLocalISO: formatLocalAsISO(end),
        timeZone: this.state.userTimeZone ?? "UTC",
        roomEmail,
      });

      try {
        const listId = this.getConfiguredListId();
        if (!listId) {
          throw new Error("Missing list id configuration.");
        }

        await updateRoomBookingDetailByMeetingId(
          this.props.context,
          listId,
          editingBookingId,
          this.buildListPayloadFromSelection(
            start,
            end,
            meetingTitle,
            editingBookingId,
            this.getRoomBookedValue(roomEmail),
          ),
        );
      } catch (listSyncError) {
        console.error(
          "Failed to sync room-changed booking to SharePoint:",
          listSyncError,
        );
      }

      this.setState({
        ...this.getDefaultBookingFormState(),
        activeTabKey: "myBookings",
        success: `Room changed to ${roomEmail}.`,
      });

      await this.refreshBookingsAfterMutation();
    } catch (error) {
      console.error(error);
      this.setState({
        bookingActionId: undefined,
        bookingRoomEmail: undefined,
        error: `Failed to change room to ${roomEmail}.`,
      });
    }
  };

  private onDeleteBooking = async (booking: IMyBooking): Promise<void> => {
    const confirmed = window.confirm(
      `Delete booking "${booking.subject}" scheduled on ${booking.start.toLocaleString()}?`,
    );
    if (!confirmed) {
      return;
    }

    this.setState({
      bookingActionId: booking.id,
      error: undefined,
      success: undefined,
    });

    try {
      await deleteBooking(this.props.context, booking.id);

      try {
        const listId = this.getConfiguredListId();
        if (!listId) {
          throw new Error("Missing list id configuration.");
        }

        await updateRoomBookingDetailByMeetingId(
          this.props.context,
          listId,
          booking.id,
          { status: "Cancelled" },
        );
      } catch (listSyncError) {
        console.error(
          "Failed to update SharePoint status after delete:",
          listSyncError,
        );
      }

      this.setState({
        bookingActionId: undefined,
        success: "Booking deleted successfully.",
      });

      await this.refreshBookingsAfterMutation();
    } catch (error) {
      console.error(error);
      this.setState({
        bookingActionId: undefined,
        error: "Failed to delete booking.",
      });
    }
  };

  /**
   * Checks if any required inputs (date, start time, or end time) are missing
   */
  private inputsMissing(): boolean {
    const { selectedDate, startTime, endTime } = this.state;
    return !selectedDate || !startTime || !endTime;
  }

  /**
   * Checks if a given date is today
   */
  private isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  }

  /**
   * Checks if a given datetime is in the past compared to now
   */
  private isPastDateTime(date: Date): boolean {
    return date.getTime() < new Date().getTime();
  }

  /**
   * Gets the valid time range for start time picker.
   * For today's date: starts from current hour (rounded up)
   * For future dates: starts from 9 AM
   */
  private getStartTimeRange(): { start: number; end: number } {
    const { selectedDate } = this.state;

    if (!selectedDate || !this.isToday(selectedDate)) {
      // Future date - show 9 AM to 9 PM
      return { start: 9, end: 21 };
    }

    // Today - show from current time onwards
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    // Round up to next hour if it's past :00
    const startHour = currentMinutes > 0 ? currentHour + 1 : currentHour;

    // Cap at 20 (since we want to allow at least 1 hour slots)
    const adjustedStart = Math.min(startHour, 20);

    return { start: adjustedStart, end: 21 };
  }

  /**
   * Gets the valid time range for end time picker based on selected start time.
   * End time must always be after start time, so range starts from next slot.
   */
  private getEndTimeRange(): { start: number; end: number } {
    const { startTime } = this.state;

    if (!startTime) {
      return { start: 9, end: 21 };
    }

    const hours = startTime.getHours();
    const minutes = startTime.getMinutes();

    // If :30 is selected, the next valid slot starts at the next full hour
    const nextHour = minutes >= 30 ? hours + 1 : hours;

    return {
      start: nextHour,
      end: 21,
    };
  }

  /**
   * Returns true when no valid end time slots exist for the selected start time.
   * This happens when start time is the last available slot (e.g. 8:30 PM or 9 PM).
   */
  private isEndTimeDisabled(): boolean {
    const { startTime } = this.state;
    if (!startTime) return true; // No start time selected yet
    const range = this.getEndTimeRange();
    // If nextHour equals or exceeds end of business hours, no slots remain
    return range.start >= range.end;
  }

  /**
   * Formats a booking's date and time into a single readable line:
   * "Mar 19, 2026  9:00 AM – 10:00 AM"
   * The date is shown once; start and end times follow on the same line.
   */
  private formatBookingTime(booking: IMyBooking): string {
    const dateStr = booking.start.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const startStr = booking.start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const endStr = booking.end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr}  ${startStr} – ${endStr}`;
  }

  /**
   * Formats a date-time range using one date and two times.
   */
  private formatDateTimeRange(start: Date, end: Date): string {
    const dateStr = start.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
    const startStr = start.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const endStr = end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${dateStr}  ${startStr} – ${endStr}`;
  }

  /**
   * Formats booking duration in minutes and hours when applicable.
   */
  private formatDurationLabel(totalMinutes: number): string {
    if (totalMinutes <= 30) {
      return `${totalMinutes} min`;
    }

    const hours = totalMinutes / 60;
    const hoursLabel = Number.isInteger(hours)
      ? `${hours} hr`
      : `${hours.toFixed(1)} hr`;

    return `${totalMinutes} min (${hoursLabel})`;
  }

  /**
   * Returns a human-friendly status label based on the booking start date:
   * "Today", "Tomorrow", or "Upcoming".
   */
  private getBookingStatusLabel(booking: IMyBooking): string {
    const today = new Date();
    const start = booking.start;
    if (
      start.getFullYear() === today.getFullYear() &&
      start.getMonth() === today.getMonth() &&
      start.getDate() === today.getDate()
    ) {
      return "Today";
    }
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    if (
      start.getFullYear() === tomorrow.getFullYear() &&
      start.getMonth() === tomorrow.getMonth() &&
      start.getDate() === tomorrow.getDate()
    ) {
      return "Tomorrow";
    }
    return "Upcoming";
  }

  /**
   * Validates all input values according to business rules:
   * - Date, start time, and end time must be selected
   * - If today: start time must be in the future (considering current system time)
   * - End time must be after start time
   * Returns error message if validation fails, null if all valid
   *
   * Timezone note: Times are validated in the user's local timezone (from mailbox settings)
   */
  private validateInputs(): string | null {
    const { selectedDate, startTime, endTime } = this.state;

    // Validations for required inputs
    if (!selectedDate) return "Please select a date.";
    if (!startTime) return "Please select a start time.";
    if (!endTime) return "Please select an end time.";

    // Combine date and time components to get full datetime objects
    const start = combineDateAndTime(selectedDate, startTime);
    const end = combineDateAndTime(selectedDate, endTime);

    // Requirement 2: If today's date is selected, start time must be greater than current system time
    if (this.isToday(selectedDate) && this.isPastDateTime(start)) {
      return "Start time must be in the future.";
    }

    // Requirement 4: End time must be greater than start time
    if (start >= end) {
      return "End time must be after start time.";
    }

    return null;
  }

  // ============================================================================
  // EVENT HANDLERS
  // ============================================================================

  /**
   * Handles search text input changes for filtering rooms by name, email, capacity, etc.
   */
  private onSearchTextChange = (
    _event?: React.ChangeEvent<HTMLInputElement>,
    newValue?: string,
  ): void => {
    this.setState({
      searchText: newValue ?? "",
    });
  };

  /**
   * Handles date picker changes.
   * Requirement 3: If a future date is selected, automatically set start time to 9 AM
   * and reset end time and availability results.
   */
  private onDateChange = (date: Date | null | undefined): void => {
    // Normalize null to undefined for consistency
    const normalizedDate = date ?? undefined;
    let newStartTime = this.state.startTime;

    // If a future date was selected and it's different from today, set 9 AM as default
    if (normalizedDate && !this.isToday(normalizedDate)) {
      const nineAM = new Date(normalizedDate);
      nineAM.setHours(9, 0, 0, 0);
      newStartTime = nineAM;
    }

    this.setState({
      selectedDate: normalizedDate,
      startTime: newStartTime,
      endTime: undefined,
      success: undefined,
      error: undefined,
      availability: {},
    });
  };

  /**
   * Handles start time picker changes.
   * Requirement 2: For today's date, ensures start time is in the future.
   * Requirement 4: Resets end time if it was before or equal to new start time.
   */
  private onStartTimeChange = (
    _ev: React.FormEvent<IComboBox>,
    time: Date,
  ): void => {
    const { selectedDate, endTime } = this.state;

    let newTime: Date | undefined = time;

    // If today's date is selected and the chosen time is in the past,
    // automatically bump up to the next available 45-minute slot in the future
    if (selectedDate && time && this.isToday(selectedDate)) {
      const combined = combineDateAndTime(selectedDate, time);
      if (this.isPastDateTime(combined)) {
        const now = new Date();
        // Round up to next 45-minute interval for better UX
        now.setMinutes(Math.ceil(now.getMinutes() / 45) * 45);
        now.setSeconds(0);
        newTime = now;
      }
    }

    // Reset endTime if it is no longer before the new start time (compare time-of-day only)
    let updatedEndTime = endTime;
    if (
      newTime &&
      endTime &&
      this.timeOfDayMinutes(endTime) <= this.timeOfDayMinutes(newTime)
    ) {
      updatedEndTime = undefined;
    }

    this.setState({
      startTime: newTime,
      endTime: updatedEndTime,
      endTimeError: undefined, // Clear any end time error when start time changes
      success: undefined,
      error: undefined,
      availability: {},
    });
  };

  /**
   * Handles end time picker changes.
   * End time must always be strictly after start time — shows an inline error if not.
   */
  private onEndTimeChange = (
    _ev: React.FormEvent<IComboBox>,
    time: Date,
  ): void => {
    const { startTime } = this.state;

    if (!time) {
      this.setState({ endTime: undefined, endTimeError: undefined });
      return;
    }

    // Show inline error if selected end time is not after start time (compare time-of-day only,
    // because TimePicker returns today's date while startTime may carry a future date)
    if (
      startTime &&
      this.timeOfDayMinutes(time) <= this.timeOfDayMinutes(startTime)
    ) {
      this.setState({
        endTimeError: "End time must be after start time.",
        endTime: undefined,
      });
      return;
    }

    this.setState({
      endTime: time,
      endTimeError: undefined,
      success: undefined,
      error: undefined,
      availability: {},
    });
  };

  /**
   * Searches for room availability on the selected date and time range.
   * Requirement 1: Shows loading indicator while fetching data.
   * Requirement 5: Uses user's timezone from mailbox settings.
   * Uses Microsoft Graph's getSchedule API to check multiple rooms efficiently.
   */
  private onSearchRooms = async (): Promise<void> => {
    // Validate all inputs first
    const validation = this.validateInputs();
    if (validation) {
      this.setState({ error: validation, success: undefined });
      return;
    }

    const {
      selectedDate,
      startTime,
      endTime,
      rooms,
      editMode,
      editingRoomEmail,
      editingRoomName,
    } = this.state;
    if (!selectedDate || !startTime || !endTime) return;

    // Combine date and time components to get full datetime objects
    const start = combineDateAndTime(selectedDate, startTime);
    const end = combineDateAndTime(selectedDate, endTime);

    // Requirement 1: Set loading state and clear previous messages
    this.setState({
      isSearching: true,
      error: undefined,
      success: undefined,
      hasSearched: true,
    });

    try {
      const roomEmails = (
        editMode === "changeDateTime" && editingRoomEmail
          ? [editingRoomEmail]
          : rooms
              .map((r) => r.emailAddress)
              .filter((email): email is string => Boolean(email))
      ).filter((email, index, all) => all.indexOf(email) === index);

      const availability = await this.loadAvailabilityForRange(
        roomEmails,
        start,
        end,
      );

      // Update state with availability results
      const lockedRoomStatus =
        editMode === "changeDateTime" && editingRoomEmail
          ? availability[editingRoomEmail.toLowerCase()]
          : undefined;

      this.setState({
        availability,
        isSearching: false,
        success:
          editMode === "changeRoom"
            ? "Choose a new available room below."
            : editMode === "changeDateTime"
              ? lockedRoomStatus === "available"
                ? `${editingRoomName ?? editingRoomEmail} is available for the selected time.`
                : undefined
              : "Availability updated.",
        error:
          editMode === "changeDateTime" && lockedRoomStatus === "busy"
            ? `${editingRoomName ?? editingRoomEmail} is not available for the selected date and time. Use Change room instead.`
            : undefined,
      });
    } catch (error: unknown) {
      // Type-safe error handling
      console.error(error);
      this.setState({
        isSearching: false,
        error: "Failed to fetch availability. Please try again.",
      });
    }
  };
  /**
   * Books a selected room for the selected date and time range.
   * Creates a calendar event via Microsoft Graph and marks the room as busy in local state.
   */
  private onBookRoom = async (roomEmail: string): Promise<void> => {
    if (this.state.editMode === "changeRoom") {
      await this.onChangeRoomSelection(roomEmail);
      return;
    }

    if (this.state.editMode === "changeDateTime") {
      return;
    }

    const { selectedDate, startTime, endTime, meetingTitle } = this.state;
    if (!selectedDate || !startTime || !endTime) return;

    // Combine date and time to get full datetime
    const start = combineDateAndTime(selectedDate, startTime);
    const end = combineDateAndTime(selectedDate, endTime);

    // Format times as ISO strings for Graph API
    const startLocalISO = formatLocalAsISO(start);
    const endLocalISO = formatLocalAsISO(end);

    // Set UI state to show booking is in progress
    this.setState({
      bookingRoomEmail: roomEmail,
      error: undefined,
      success: undefined,
    });

    try {
      // Call Graph API to create the event in calendar with room as attendee
      // Requirement 5: Pass user's timezone
      const createdMeeting = await bookRoom(this.props.context, {
        subject: meetingTitle.trim() || "Room Booking",
        roomEmail,
        startLocalISO,
        endLocalISO,
        attendeeEmails: [],
        bodyPreview: "Booked via SPFx Room Booking",
        timeZone: this.state.userTimeZone ?? "UTC",
      });

      const createdMeetingId = String(createdMeeting?.id ?? "");

      try {
        const listId = this.getConfiguredListId();
        if (!listId) {
          throw new Error("Missing list id configuration.");
        }

        await createRoomBookingDetail(
          this.props.context,
          listId,
          this.buildListPayloadFromSelection(
            start,
            end,
            meetingTitle,
            createdMeetingId,
            this.getRoomBookedValue(roomEmail),
          ),
        );
      } catch (listError) {
        console.error("Booked room but failed to sync list item:", listError);
        this.setState({
          bookingRoomEmail: undefined,
          error:
            "Room booked, but failed to add entry in 'Room Booking Details' list.",
        });
        await this.refreshBookingsAfterMutation();
        return;
      }

      // Update UI with success and mark room as busy
      this.setState((prev) => ({
        bookingRoomEmail: undefined,
        success: `Booked ${roomEmail} successfully.`,
        availability: {
          ...prev.availability,
          [roomEmail.toLowerCase()]: "busy",
        },
      }));

      await this.refreshBookingsAfterMutation();
    } catch (error: unknown) {
      // Type-safe error handling
      console.error(error);
      this.setState({
        bookingRoomEmail: undefined,
        error: `Failed to book ${roomEmail}.`,
      });
    }
  };

  public render(): React.ReactElement<ISpFxRoomBookingProps> {
    const { userDisplayName } = this.props;
    const {
      rooms,
      myBookings,
      adminBookings,
      selectedDate,
      startTime,
      endTime,
      meetingTitle,
      availability,
      isSearching,
      isLoadingRooms,
      isLoadingBookings,
      isLoadingAdminBookings,
      activeTabKey,
      isAdmin,
      adminSearchText,
      adminStatusFilter,
      adminStatusOptions,
      adminDateFilter,
      isKillSwitchRunning,
      bookingRoomEmail,
      bookingActionId,
      editingBookingId,
      editMode,
      editingRoomEmail,
      editingRoomName,
      error,
      endTimeError,
      bookingListError,
      adminListError,
      success,
      hasSearched,
      searchText,
    } = this.state;

    // End time picker is disabled when no valid slots exist after the selected start time
    const endTimeDisabled = this.isEndTimeDisabled();

    const missingInputs = this.inputsMissing();
    const canShowCards =
      hasSearched && !missingInputs && !error && !isSearching;
    const isChangeDateTimeMode = editMode === "changeDateTime";
    const isChangeRoomMode = editMode === "changeRoom";
    const isEditMode = Boolean(editMode);

    const filteredRooms = rooms.filter((room) => {
      if (!searchText.trim()) return true;

      const search = searchText.toLowerCase();

      return (
        room.displayName?.toLowerCase().includes(search) ||
        room.emailAddress?.toLowerCase().includes(search) ||
        String(room.capacity ?? "").includes(search) ||
        room.tags?.some((tag) => tag.toLowerCase().includes(search)) ||
        room.audioDeviceName?.toLowerCase().includes(search) ||
        room.videoDeviceName?.toLowerCase().includes(search) ||
        room.displayDeviceName?.toLowerCase().includes(search)
      );
    });

    const displayedRooms =
      isChangeDateTimeMode && editingRoomEmail
        ? filteredRooms.filter(
            (room) =>
              room.emailAddress?.toLowerCase() ===
              editingRoomEmail.toLowerCase(),
          )
        : filteredRooms;

    const filteredAdminBookings = adminBookings.filter((item) => {
      const search = adminSearchText.trim().toLowerCase();
      const statusMatch =
        adminStatusFilter === SpFxRoomBooking.allStatusLabel ||
        item.status === adminStatusFilter;
      const dateMatch =
        !adminDateFilter ||
        this.getDateKeyFromListDate(item.bookingDate) ===
          this.getDateKeyFromDate(adminDateFilter);

      const searchMatch =
        !search ||
        item.title.toLowerCase().includes(search) ||
        item.bookedBy.toLowerCase().includes(search);

      return statusMatch && dateMatch && searchMatch;
    });
    return (
      <section className={styles.spFxRoomBooking}>
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        </style>
        <h1>👋 Hi {escape(userDisplayName)}, Welcome to Room Booking</h1>

        <Pivot
          selectedKey={activeTabKey}
          onLinkClick={this.onTabChange}
          linkFormat="tabs"
        >
          <PivotItem headerText="Book a room" itemKey="book">
            {/* Main filter controls for date, time, and room search */}
            <div>
              {/* Date and time picker controls */}
              <div className={styles.filterBar}>
                <div className={styles.filterBarRow}>
                  <div className={styles.meetingNameField}>
                    <TextField
                      label="Meeting name"
                      value={meetingTitle}
                      onChange={this.onMeetingTitleChange}
                      placeholder="e.g. Team standup"
                      disabled={isChangeRoomMode}
                    />
                  </div>

                  <div className={styles.dateField}>
                    <DatePicker
                      label="Date"
                      value={selectedDate ?? undefined}
                      onSelectDate={this.onDateChange}
                      minDate={new Date()}
                      allowTextInput={false}
                      disabled={isChangeRoomMode}
                    />
                  </div>

                  <div className={styles.timeFieldCompact}>
                    <TimePicker
                      label="Start time"
                      allowFreeInput={false}
                      useHour12
                      increments={30}
                      value={startTime ?? undefined}
                      onChange={this.onStartTimeChange}
                      timeRange={this.getStartTimeRange()}
                      allowFreeform={false}
                      disabled={isChangeRoomMode}
                    />
                  </div>

                  <div className={styles.timeFieldCompact}>
                    <TimePicker
                      label="End time"
                      allowFreeInput={false}
                      useHour12
                      increments={30}
                      timeRange={this.getEndTimeRange()}
                      value={endTime ?? undefined}
                      onChange={this.onEndTimeChange}
                      allowFreeform={false}
                      disabled={endTimeDisabled || isChangeRoomMode}
                    />
                    {endTimeError && (
                      <div className={styles.endTimeError}>{endTimeError}</div>
                    )}
                  </div>

                  <div className={styles.searchButtonWrap}>
                    <PrimaryButton
                      text={
                        isChangeDateTimeMode
                          ? isSearching
                            ? "Checking..."
                            : "Check Availability"
                          : isSearching
                            ? "Searching..."
                            : "Search Room"
                      }
                      disabled={
                        isSearching || missingInputs || isChangeRoomMode
                      }
                      onClick={this.onSearchRooms}
                    />
                  </div>
                </div>
              </div>

              {/* Edit mode banner — shown when user updates an existing booking */}
              {editingBookingId && (
                <div className={styles.editBanner}>
                  <div className={styles.editBannerContent}>
                    <span className={styles.editModeTitle}>
                      {isChangeRoomMode ? "Change room" : "Change date-time"}
                    </span>
                    <span className={styles.editModeSubtext}>
                      {isChangeRoomMode
                        ? `Time locked to ${this.formatDateTimeRange(
                            combineDateAndTime(selectedDate!, startTime!),
                            combineDateAndTime(selectedDate!, endTime!),
                          )}. Pick a different room below.`
                        : `Room locked to ${editingRoomName ?? editingRoomEmail ?? "your current room"}. If it is unavailable for the new slot, use Change room instead.`}
                    </span>
                  </div>
                  <div className={styles.editBannerActions}>
                    {isChangeDateTimeMode && (
                      <PrimaryButton
                        text={
                          bookingActionId === editingBookingId
                            ? "Updating..."
                            : "Update Booking"
                        }
                        onClick={this.onUpdateBooking}
                        disabled={bookingActionId === editingBookingId}
                      />
                    )}
                    <DefaultButton
                      text="Cancel"
                      onClick={this.onCancelEditBooking}
                    />
                  </div>
                </div>
              )}
              {selectedDate && startTime && endTime && (
                <div style={{ marginTop: 8 }}>
                  Duration:{" "}
                  {this.formatDurationLabel(
                    Math.round(
                      (combineDateAndTime(selectedDate, endTime).getTime() -
                        combineDateAndTime(selectedDate, startTime).getTime()) /
                        60000,
                    ),
                  )}
                </div>
              )}

              {!isEditMode && (
                <SearchBox
                  placeholder="Search by room name, email, capacity, tags, devices..."
                  value={searchText}
                  onChange={this.onSearchTextChange}
                  styles={{ root: { maxWidth: 400, marginBottom: 16 } }}
                />
              )}

              {error && <div className={styles.error}>{error}</div>}
              {success && <div className={styles.success}>{success}</div>}
            </div>

            <div>
              <h2>Rooms</h2>

              {isLoadingRooms && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <Spinner
                    size={SpinnerSize.large}
                    label="Loading available rooms..."
                  />
                </div>
              )}

              {isSearching && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <Spinner
                    size={SpinnerSize.large}
                    label="Fetching room availability..."
                  />
                </div>
              )}

              {!hasSearched && (
                <div className={styles.placeholder}>
                  Start by selecting the date and time, then click{" "}
                  <b>
                    {isChangeDateTimeMode
                      ? "Check Availability"
                      : "Search Room"}
                  </b>
                  .
                </div>
              )}

              {hasSearched && missingInputs && (
                <div className={styles.placeholder}>
                  Please select the date and time
                </div>
              )}

              {canShowCards && (
                <div className={styles.roomsContainer}>
                  {displayedRooms.length > 0 &&
                    displayedRooms
                      .sort((a, b) =>
                        a.displayName.localeCompare(b.displayName),
                      )
                      .map((room) => {
                        const roomEmailLower = room.emailAddress?.toLowerCase();
                        const status =
                          availability[roomEmailLower ?? ""] ?? "unknown";
                        const isAvailable = status === "available";
                        const isBusy = status === "busy";
                        const isCurrentEditingRoom =
                          Boolean(editingRoomEmail) &&
                          roomEmailLower === editingRoomEmail?.toLowerCase();
                        const statusClass = isAvailable
                          ? styles.available
                          : isBusy
                            ? styles.busy
                            : styles.unknown;

                        return (
                          <div key={room.id} className={styles.roomCard}>
                            <div className={styles.cardHeader}>
                              <p className={styles.roomName}>
                                {room.displayName}
                              </p>
                              <div
                                className={`${styles.statusPill} ${statusClass}`}
                              >
                                {status}
                              </div>
                            </div>

                            <div className={styles.cardMeta}>
                              <span>👥 {room.capacity ?? "N/A"} seats</span>
                              {room.isWheelChairAccessible && (
                                <span>♿ Accessible</span>
                              )}
                              {isCurrentEditingRoom && isChangeRoomMode && (
                                <span>📍 Current room</span>
                              )}
                            </div>

                            {room.tags?.length > 0 && (
                              <div className={styles.tagContainer}>
                                {room.tags.map((tag, i) => (
                                  <span key={i} className={styles.tag}>
                                    {tag.trim()}
                                  </span>
                                ))}
                              </div>
                            )}

                            <div className={styles.deviceInfo}>
                              {room.audioDeviceName && (
                                <span>🎤 {room.audioDeviceName}</span>
                              )}
                              {room.videoDeviceName && (
                                <span>📷 {room.videoDeviceName}</span>
                              )}
                              {room.displayDeviceName && (
                                <span>🖥 {room.displayDeviceName}</span>
                              )}
                            </div>

                            {isChangeDateTimeMode && isCurrentEditingRoom && (
                              <div className={styles.roomEditHint}>
                                {status === "available"
                                  ? "This room is available for the selected date and time."
                                  : status === "busy"
                                    ? "This room is busy for the selected slot. Use Change room instead."
                                    : "Availability not checked yet for this room."}
                              </div>
                            )}

                            {!isChangeDateTimeMode && isAvailable && (
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                  marginTop: 8,
                                }}
                              >
                                <PrimaryButton
                                  text={
                                    isChangeRoomMode
                                      ? isCurrentEditingRoom
                                        ? "Current Room"
                                        : bookingRoomEmail === room.emailAddress
                                          ? "Changing..."
                                          : "Change Room"
                                      : "Book Room"
                                  }
                                  disabled={
                                    !!bookingRoomEmail ||
                                    (isChangeRoomMode && isCurrentEditingRoom)
                                  }
                                  onClick={() =>
                                    this.onBookRoom(room.emailAddress)
                                  }
                                />
                                {bookingRoomEmail === room.emailAddress && (
                                  <Spinner
                                    size={SpinnerSize.small}
                                    label="Booking..."
                                    labelPosition="right"
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                </div>
              )}
            </div>
          </PivotItem>

          <PivotItem headerText="My bookings" itemKey="myBookings">
            <div className={styles.myBookingsHeader}>
              <h2>My Bookings</h2>
              <div className={styles.headerActions}>
                <DefaultButton
                  text="Refresh"
                  onClick={() => void this.loadMyBookings()}
                />
                {SpFxRoomBooking.enableDeveloperKillSwitch && (
                  <DefaultButton
                    text={
                      isKillSwitchRunning
                        ? "Running cleanup..."
                        : "Dev Kill Switch"
                    }
                    onClick={() => void this.onDeveloperKillSwitch()}
                    disabled={isKillSwitchRunning}
                    className={styles.killSwitchButton}
                  />
                )}
              </div>
            </div>

            {bookingListError && (
              <div className={styles.error}>{bookingListError}</div>
            )}
            {error && <div className={styles.error}>{error}</div>}
            {success && <div className={styles.success}>{success}</div>}

            {isLoadingBookings && (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <Spinner
                  size={SpinnerSize.large}
                  label="Loading your bookings..."
                />
              </div>
            )}

            {!isLoadingBookings && myBookings.length === 0 && (
              <div className={styles.placeholder}>
                No upcoming room bookings found.
              </div>
            )}

            {!isLoadingBookings && myBookings.length > 0 && (
              <div className={styles.roomsContainer}>
                {myBookings.map((booking) => {
                  const statusLabel = this.getBookingStatusLabel(booking);
                  const statusClass =
                    statusLabel === "Today"
                      ? styles.statusToday
                      : statusLabel === "Tomorrow"
                        ? styles.statusTomorrow
                        : styles.statusUpcoming;
                  const meetingHref = booking.joinUrl ?? booking.webLink;

                  return (
                    <div
                      key={booking.id}
                      className={`${styles.roomCard} ${styles.bookingCardEntry} ${
                        bookingActionId === booking.id
                          ? styles.bookingCardDeleting
                          : ""
                      }`}
                    >
                      {/* Header: subject + status badge */}
                      <div className={styles.cardHeader}>
                        <p className={styles.roomName}>{booking.subject}</p>
                        <div className={`${styles.statusPill} ${statusClass}`}>
                          {statusLabel}
                        </div>
                      </div>

                      {/* Single date + time range line */}
                      <div className={styles.bookingTime}>
                        📅 {this.formatBookingTime(booking)}
                      </div>

                      {/* Room name */}
                      <div className={styles.cardMeta}>
                        <span>
                          🏢{" "}
                          {booking.roomName ??
                            booking.roomEmail ??
                            "Unknown room"}
                        </span>
                      </div>

                      {/* Meeting link */}
                      {meetingHref && (
                        <a
                          href={meetingHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.meetingLink}
                        >
                          {booking.joinUrl
                            ? "🔗 Join Meeting"
                            : "📩 View in Outlook"}
                        </a>
                      )}

                      {/* Actions */}
                      <div className={styles.actionRow}>
                        <PrimaryButton
                          text="Change date-time"
                          onClick={() => this.onChangeDateTime(booking)}
                        />
                        <DefaultButton
                          text="Change room"
                          onClick={() => this.onChangeRoom(booking)}
                        />
                        <IconButton
                          iconProps={{ iconName: "Delete" }}
                          title={
                            bookingActionId === booking.id
                              ? "Deleting booking..."
                              : "Delete booking"
                          }
                          ariaLabel="Delete booking"
                          className={styles.deleteIconButton}
                          onClick={() => void this.onDeleteBooking(booking)}
                          disabled={bookingActionId === booking.id}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </PivotItem>

          {isAdmin && (
            <PivotItem headerText="Admin" itemKey="admin">
              <div className={styles.myBookingsHeader}>
                <h2>All Bookings</h2>
                <DefaultButton
                  text="Refresh"
                  onClick={() => void this.loadAdminBookings()}
                />
              </div>

              <div className={styles.adminFilterBar}>
                <SearchBox
                  placeholder="Search by meeting name or booked by"
                  value={adminSearchText}
                  onChange={this.onAdminSearchTextChange}
                />
                <DatePicker
                  value={adminDateFilter}
                  onSelectDate={this.onAdminDateFilterChange}
                  allowTextInput={false}
                  placeholder="Booking date"
                />
                <DefaultButton
                  text="Reset filters"
                  onClick={this.onResetAdminFilters}
                />
              </div>

              <div className={styles.statusPillRow}>
                {adminStatusOptions.map((status) => {
                  const isSelected = status === adminStatusFilter;
                  return (
                    <button
                      key={status}
                      type="button"
                      className={`${styles.statusFilterPill} ${
                        isSelected ? styles.statusFilterPillActive : ""
                      }`}
                      onClick={() => this.onAdminStatusFilterPillClick(status)}
                    >
                      {status}
                    </button>
                  );
                })}
              </div>

              {adminListError && (
                <div className={styles.error}>{adminListError}</div>
              )}

              {isLoadingAdminBookings && (
                <div style={{ textAlign: "center", padding: "20px 0" }}>
                  <Spinner
                    size={SpinnerSize.large}
                    label="Loading all bookings..."
                  />
                </div>
              )}

              {!isLoadingAdminBookings &&
                filteredAdminBookings.length === 0 && (
                  <div className={styles.placeholder}>
                    No bookings match current filters.
                  </div>
                )}

              {!isLoadingAdminBookings && filteredAdminBookings.length > 0 && (
                <div className={styles.adminTableWrap}>
                  <div className={styles.adminTableHeader}>
                    <span>Meeting Name</span>
                    <span>Room Booked</span>
                    <span>Date</span>
                    <span>Meeting Time</span>
                    <span>Booked By</span>
                    <span>Status</span>
                  </div>

                  {filteredAdminBookings.map((item) => (
                    <div key={item.id} className={styles.adminTableRow}>
                      <span>{item.title || "-"}</span>
                      <span>{item.roomBooked || "-"}</span>
                      <span>
                        {this.formatAdminBookingDate(item.bookingDate)}
                      </span>
                      <span>
                        {item.startTime && item.endTime
                          ? `${item.startTime} - ${item.endTime}`
                          : item.startTime || item.endTime || "-"}
                      </span>
                      <span>{item.bookedBy || "-"}</span>
                      <span>
                        <span
                          className={`${styles.statusPill} ${
                            item.status === "Booked"
                              ? styles.available
                              : item.status === "Cancelled"
                                ? styles.busy
                                : styles.unknown
                          }`}
                        >
                          {item.status || "-"}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </PivotItem>
          )}
        </Pivot>
      </section>
    );
  }
}
