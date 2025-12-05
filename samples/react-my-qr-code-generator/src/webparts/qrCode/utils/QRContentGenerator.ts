import { 
  QRContentType, 
  IWiFiData, 
  IVCardData, 
  IEmailData, 
  ISMSData, 
  IPhoneData,
  ITeamsMeetingData,
  IMeetingRoomData,
  ICalendarEventData
} from '../types/QRTypes';
import { ICalendarUtils } from './ICalendarUtils';

export class QRContentGenerator {
  /**
   * Generate WiFi QR code content
   */
  public static generateWiFi(data: IWiFiData): string {
    const { ssid, password, encryption, hidden } = data;
    const hiddenFlag = hidden ? 'H:true' : '';
    return `WIFI:T:${encryption};S:${ssid};P:${password};${hiddenFlag};`;
  }

  /**
   * Generate VCard QR code content
   */
  public static generateVCard(data: IVCardData): string {
    const lines: string[] = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${data.firstName} ${data.lastName}`,
      `N:${data.lastName};${data.firstName};;;`,
    ];

    if (data.company) lines.push(`ORG:${data.company}`);
    if (data.jobTitle) lines.push(`TITLE:${data.jobTitle}`);
    if (data.mobile) lines.push(`TEL;TYPE=CELL:${data.mobile}`);
    if (data.phone) lines.push(`TEL;TYPE=WORK:${data.phone}`);
    if (data.email) lines.push(`EMAIL:${data.email}`);
    if (data.website) lines.push(`URL:${data.website}`);
    
    if (data.street || data.city || data.zip || data.country) {
      lines.push(`ADR:;;${data.street};${data.city};;${data.zip};${data.country}`);
    }

    lines.push('END:VCARD');
    return lines.join('\n');
  }

  /**
   * Generate Email QR code content
   */
  public static generateEmail(data: IEmailData): string {
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(data.body);
    return `mailto:${data.email}?subject=${subject}&body=${body}`;
  }

  /**
   * Generate SMS QR code content
   */
  public static generateSMS(data: ISMSData): string {
    return `SMSTO:${data.phone}:${data.message}`;
  }

  /**
   * Generate Phone QR code content
   */
  public static generatePhone(data: IPhoneData): string {
    return `tel:${data.phone}`;
  }

  /**
   * Generate Teams Meeting QR code content
   */
  public static generateTeamsMeeting(data: ITeamsMeetingData): string {
    return ICalendarUtils.generateTeamsMeetingICS(data);
  }

  /**
   * Generate Meeting Room QR code content
   */
  public static generateMeetingRoom(data: IMeetingRoomData): string {
    return ICalendarUtils.generateRoomVCard(data);
  }

  /**
   * Generate Calendar Event QR code content
   */
  public static generateCalendarEvent(data: ICalendarEventData): string {
    return ICalendarUtils.generateEventICS(data);
  }

  /**
   * Get display name for content type
   */
  public static getContentTypeName(type: QRContentType): string {
    const names: Record<QRContentType, string> = {
      [QRContentType.URL]: 'URL/Link',
      [QRContentType.Text]: 'Plain Text',
      [QRContentType.WiFi]: 'WiFi Network',
      [QRContentType.VCard]: 'Contact Card',
      [QRContentType.Email]: 'Email',
      [QRContentType.SMS]: 'SMS Message',
      [QRContentType.Phone]: 'Phone Number',
      [QRContentType.TeamsMeeting]: 'Teams Meeting',
      [QRContentType.MeetingRoom]: 'Meeting Room',
      [QRContentType.CalendarEvent]: 'Calendar Event',
      [QRContentType.CurrentPage]: 'Current Page'
    };
    return names[type];
  }
}
