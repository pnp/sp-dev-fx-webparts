/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { MSGraphClientV3 } from "@microsoft/sp-http";
import { SPFx, spfi } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";

import "@pnp/graph/calendars";
import "@pnp/graph/users";
import "@pnp/graph/places";
import { IRoomSchedule } from "../interfaces/IRoom";

export interface IBookingEvent {
  id: string;
  subject: string;
  isCancelled?: boolean;
  start: { dateTime: string; timeZone: string };
  end: { dateTime: string; timeZone: string };
  location?: { displayName?: string; locationEmailAddress?: string };
  attendees?: { emailAddress?: { address?: string; name?: string } }[];
  webLink?: string;
  onlineMeeting?: { joinUrl?: string };
}

export interface IRoomBookingListItem {
  id: number;
  meetingId: string;
  status: "Booked" | "Available" | "Cancelled" | string;
  title: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  roomBooked: string;
  bookedBy: string;
  durationInMinutes: number;
}

export interface IRoomBookingListItemPayload {
  meetingId?: string;
  status: "Booked" | "Available" | "Cancelled" | string;
  title: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  roomBooked: string;
  durationInMinutes: number;
}

const getSP = (context: WebPartContext) => spfi().using(SPFx(context));

const buildListItemBody = (
  payload: IRoomBookingListItemPayload,
): Record<string, unknown> => ({
  MeetingId: payload.meetingId ?? "",
  Title: payload.title,
  Status: payload.status,
  BookingDate: payload.bookingDate,
  StartTime: payload.startTime,
  EndTime: payload.endTime,
  RoomBooked: payload.roomBooked,
  DurationInMinutes: payload.durationInMinutes,
});

const getAuthorLabel = (item: Record<string, unknown>): string => {
  const author = item.Author as
    | { EMail?: string; Email?: string; Title?: string }
    | undefined;

  return String(author?.Title ?? author?.EMail ?? author?.Email ?? "");
};

const mapListItem = (item: Record<string, unknown>): IRoomBookingListItem => ({
  id: Number(item.Id ?? 0),
  meetingId: String(item.MeetingId ?? ""),
  status: String(item.Status ?? ""),
  title: String(item.Title ?? ""),
  bookingDate: String(item.BookingDate ?? ""),
  startTime: String(item.StartTime ?? ""),
  endTime: String(item.EndTime ?? ""),
  roomBooked: String(item.RoomBooked ?? ""),
  bookedBy: getAuthorLabel(item),
  durationInMinutes: Number(item.DurationInMinutes ?? 0),
});

// Check availability of multiple rooms in one call using getSchedule

export const getRoomsAvailability = async (
  context: WebPartContext,
  roomEmails: string[],
  startLocalISO: string,
  endLocalISO: string,
  timeZone: string,
): Promise<IRoomSchedule[]> => {
  try {
    const client: MSGraphClientV3 =
      await context.msGraphClientFactory.getClient("3");
    const body = {
      schedules: roomEmails,
      startTime: { dateTime: startLocalISO, timeZone: timeZone },
      endTime: { dateTime: endLocalISO, timeZone: timeZone },
      availabilityViewInterval: 30,
    };
    // v1.0 is fine for getSchedule
    const response = await client
      .api("/me/calendar/getSchedule")
      .version("v1.0")
      .post(body);
    // response.value: [{ scheduleId, availabilityView, scheduleItems: [...] }, ...]
    return response.value;
  } catch (error) {
    console.error("Error getting rooms availability:", error);
    throw error;
  }
};

export const getRoomsViaPlaces = async (
  context: WebPartContext,
): Promise<any[]> => {
  try {
    const client: MSGraphClientV3 =
      await context.msGraphClientFactory.getClient("3");
    const response = await client
      .api("/places/microsoft.graph.room")
      .version("v1.0")
      .get();
    return response.value; // Array of room objects with detailed properties
  } catch (error) {
    console.error("Error fetching rooms via places endpoint:", error);
    throw error;
  }
};

// Book a room by creating an event in the user's calendar and adding the room as an attendee.

export const bookRoom = async (
  context: WebPartContext,
  params: {
    subject: string;
    roomEmail: string;
    startLocalISO: string;
    endLocalISO: string;
    timeZone: string;
    attendeeEmails?: string[];
    bodyPreview?: string;
  },
): Promise<any> => {
  const {
    subject,
    roomEmail,
    startLocalISO,
    endLocalISO,
    timeZone,
    attendeeEmails = [],
    bodyPreview = "",
  } = params;

  try {
    const client: MSGraphClientV3 =
      await context.msGraphClientFactory.getClient("3");

    const attendees = [
      // Add the room as a required attendee (resource mailbox)
      { type: "required", emailAddress: { address: roomEmail } },
      ...attendeeEmails.map((email) => ({
        type: "required" as const,
        emailAddress: { address: email },
      })),
    ];

    const eventBody = {
      subject,
      body: {
        contentType: "text",
        content: bodyPreview,
      },
      start: { dateTime: startLocalISO, timeZone: timeZone },
      end: { dateTime: endLocalISO, timeZone: timeZone },
      attendees,
      location: {
        displayName: roomEmail,
        locationEmailAddress: roomEmail,
      },
      allowNewTimeProposals: false,
      isOnlineMeeting: true,
      onlineMeetingProvider: "teamsForBusiness",
    };

    const created = await client
      .api("/me/events")
      .version("v1.0")
      .post(eventBody);
    return created;
  } catch (error) {
    console.error("Error booking room:", error);
    throw error;
  }
};

export const getMyBookings = async (
  context: WebPartContext,
  timeZone: string,
): Promise<IBookingEvent[]> => {
  try {
    const client: MSGraphClientV3 =
      await context.msGraphClientFactory.getClient("3");

    const response = await client
      .api("/me/events")
      .version("v1.0")
      .header("Prefer", `outlook.timezone="${timeZone}"`)
      .select(
        "id,subject,isCancelled,start,end,location,attendees,webLink,onlineMeeting,organizer,isOrganizer",
      )
      .orderby("start/dateTime")
      .filter("isOrganizer eq true")
      .top(200)
      .get();

    return (response.value ?? []) as IBookingEvent[];
  } catch (error) {
    console.error("Error fetching my bookings:", error);
    throw error;
  }
};

export const updateBooking = async (
  context: WebPartContext,
  params: {
    id: string;
    subject: string;
    startLocalISO: string;
    endLocalISO: string;
    timeZone: string;
    roomEmail?: string;
  },
): Promise<IBookingEvent> => {
  const { id, subject, startLocalISO, endLocalISO, timeZone, roomEmail } =
    params;

  try {
    const client: MSGraphClientV3 =
      await context.msGraphClientFactory.getClient("3");

    const patchBody: Record<string, unknown> = {
      subject,
      start: { dateTime: startLocalISO, timeZone },
      end: { dateTime: endLocalISO, timeZone },
    };

    if (roomEmail) {
      patchBody.attendees = [
        {
          type: "required",
          emailAddress: { address: roomEmail },
        },
      ];
      patchBody.location = {
        displayName: roomEmail,
        locationEmailAddress: roomEmail,
      };
    }

    const updated = await client
      .api(`/me/events/${id}`)
      .version("v1.0")
      .patch(patchBody);

    return updated as IBookingEvent;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

export const deleteBooking = async (
  context: WebPartContext,
  bookingId: string,
): Promise<void> => {
  try {
    const client: MSGraphClientV3 =
      await context.msGraphClientFactory.getClient("3");

    await client.api(`/me/events/${bookingId}`).version("v1.0").delete();
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};

/**
 * Gets all room booking records from the SharePoint list.
 */
export const getRoomBookingDetails = async (
  context: WebPartContext,
  listId: string,
): Promise<IRoomBookingListItem[]> => {
  try {
    const sp = getSP(context);
    const items = (await sp.web.lists
      .getById(listId)
      .items.select(
        "Id",
        "MeetingId",
        "Title",
        "Status",
        "BookingDate",
        "StartTime",
        "EndTime",
        "RoomBooked",
        "Author/Title",
        "Author/EMail",
        "DurationInMinutes",
      )
      .expand("Author")
      .orderBy("Id", false)
      .top(5000)()) as Array<Record<string, unknown>>;

    return items.map(mapListItem);
  } catch (error) {
    console.error("Error fetching room booking details list:", error);
    throw error;
  }
};

/**
 * Gets status choices from the SharePoint choice field.
 */
export const getRoomBookingStatusChoices = async (
  context: WebPartContext,
  listId: string,
): Promise<string[]> => {
  try {
    const sp = getSP(context);
    const field = (await sp.web.lists
      .getById(listId)
      .fields.getByInternalNameOrTitle("Status")
      .select("Choices")()) as {
      Choices?: string[];
    };

    return (field.Choices ?? []).filter((choice) => Boolean(choice?.trim()));
  } catch (error) {
    console.error("Error fetching status choices:", error);
    return [];
  }
};

/**
 * Creates a booking record in the SharePoint list.
 */
export const createRoomBookingDetail = async (
  context: WebPartContext,
  listId: string,
  payload: IRoomBookingListItemPayload,
): Promise<IRoomBookingListItem> => {
  try {
    const sp = getSP(context);
    const created = await sp.web.lists
      .getById(listId)
      .items.add(buildListItemBody(payload));

    return mapListItem(created as Record<string, unknown>);
  } catch (error) {
    console.error("Error creating room booking detail:", error);
    throw error;
  }
};

/**
 * Updates a booking record in the SharePoint list.
 */
export const updateRoomBookingDetail = async (
  context: WebPartContext,
  listId: string,
  itemId: number,
  payload: Partial<IRoomBookingListItemPayload>,
): Promise<void> => {
  try {
    const sp = getSP(context);
    const body: Record<string, unknown> = {};

    if (payload.meetingId !== undefined) body.MeetingId = payload.meetingId;
    if (payload.title !== undefined) body.Title = payload.title;
    if (payload.status !== undefined) body.Status = payload.status;
    if (payload.bookingDate !== undefined) {
      body.BookingDate = payload.bookingDate;
    }
    if (payload.startTime !== undefined) {
      body.StartTime = payload.startTime;
    }
    if (payload.endTime !== undefined) body.EndTime = payload.endTime;
    if (payload.roomBooked !== undefined) body.RoomBooked = payload.roomBooked;
    if (payload.durationInMinutes !== undefined) {
      body.DurationInMinutes = payload.durationInMinutes;
    }

    await sp.web.lists.getById(listId).items.getById(itemId).update(body);
  } catch (error) {
    console.error("Error updating room booking detail:", error);
    throw error;
  }
};

/**
 * Updates a booking row by matching MeetingId.
 */
export const updateRoomBookingDetailByMeetingId = async (
  context: WebPartContext,
  listId: string,
  meetingId: string,
  payload: Partial<IRoomBookingListItemPayload>,
): Promise<boolean> => {
  try {
    const sp = getSP(context);
    const escapedMeetingId = meetingId.replace(/'/g, "''");
    const matchingItems = (await sp.web.lists
      .getById(listId)
      .items.filter(`MeetingId eq '${escapedMeetingId}'`)
      .select("Id")
      .top(1)()) as Array<{ Id?: number }>;

    const itemId = Number(matchingItems[0]?.Id ?? 0);
    if (!itemId) {
      return false;
    }

    await updateRoomBookingDetail(context, listId, itemId, payload);
    return true;
  } catch (error) {
    console.error("Error updating room booking detail by MeetingId:", error);
    throw error;
  }
};

/**
 * Deletes a booking record from the SharePoint list.
 */
export const deleteRoomBookingDetail = async (
  context: WebPartContext,
  listId: string,
  itemId: number,
): Promise<void> => {
  try {
    const sp = getSP(context);
    await sp.web.lists.getById(listId).items.getById(itemId).delete();
  } catch (error) {
    console.error("Error deleting room booking detail:", error);
    throw error;
  }
};
