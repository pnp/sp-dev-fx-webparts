/* eslint-disable @rushstack/no-new-null */
export interface IRoom {
  id: string;
  placeId: string;
  displayName: string;
  phone: string;
  parentId: string | null;
  tags: string[];
  isWheelChairAccessible: boolean;
  label: string | null;
  emailAddress: string;
  nickname: string;
  building: string | null;
  floorNumber: number | null;
  floorLabel: string | null;
  bookingType: "standard";
  audioDeviceName: string | null;
  videoDeviceName: string | null;
  displayDeviceName: string | null;
  capacity: number;
  teamsEnabledState: "disabled";
  address: unknown | null;
  geoCoordinates: unknown | null;
}

export interface IScheduleItem {
  start: { dateTime: string };
  end: { dateTime: string };
}

export interface IRoomSchedule {
  scheduleId: string;
  scheduleItems: IScheduleItem[];
}

export interface IMyBooking {
  id: string;
  subject: string;
  start: Date;
  end: Date;
  roomEmail?: string;
  roomName?: string;
  webLink?: string;
  joinUrl?: string;
}
