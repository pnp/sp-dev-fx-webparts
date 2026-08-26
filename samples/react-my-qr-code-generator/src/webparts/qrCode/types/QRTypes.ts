export enum QRContentType {
  URL = 'url',
  Text = 'text',
  WiFi = 'wifi',
  VCard = 'vcard',
  Email = 'email',
  SMS = 'sms',
  Phone = 'phone',
  TeamsMeeting = 'teamsMeeting',
  MeetingRoom = 'meetingRoom',
  CalendarEvent = 'calendarEvent',
  CurrentPage = 'currentPage'
}

export interface IWiFiData {
  ssid: string;
  password?: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden: boolean;
}

export interface IVCardData {
  firstName: string;
  lastName: string;
  mobile: string;
  phone: string;
  email: string;
  company: string;
  jobTitle: string;
  street: string;
  city: string;
  zip: string;
  country: string;
  website: string;
}

export interface IEmailData {
  email: string;
  subject: string;
  body: string;
}

export interface ISMSData {
  phone: string;
  message: string;
}

export interface IPhoneData {
  phone: string;
}

export interface ITeamsMeetingData {
  subject: string;
  startTime: Date;
  endTime: Date;
  joinUrl: string;
  description?: string;
}

export interface IMeetingRoomData {
  roomName: string;
  roomEmail: string;
  capacity?: number;
  location?: string;
  equipment?: string;
}

export interface ICalendarEventData {
  title: string;
  startTime: Date;
  endTime: Date;
  location: string;
  description: string;
  allDay: boolean;
}

export interface IQRHistory {
  id: string;
  timestamp: string;
  type: QRContentType;
  content: string;
  name: string;
}

export interface IQRTemplate {
  id: string;
  name: string;
  icon: string;
  type: QRContentType;
  description: string;
}
