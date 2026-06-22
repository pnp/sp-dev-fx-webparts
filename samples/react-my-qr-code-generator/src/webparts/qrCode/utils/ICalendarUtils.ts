import { ICalendarEventData, ITeamsMeetingData } from '../types/QRTypes';

export class ICalendarUtils {
  private static _formatDate(date: Date): string {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  }

  public static generateEventICS(event: ICalendarEventData): string {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SharePoint QR Code Generator//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@sharepoint-qr`,
      `DTSTAMP:${this._formatDate(new Date())}`,
      `DTSTART:${this._formatDate(event.startTime)}`,
      `DTEND:${this._formatDate(event.endTime)}`,
      `SUMMARY:${event.title}`,
      `LOCATION:${event.location}`,
      `DESCRIPTION:${event.description}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ];

    return lines.join('\n');
  }

  public static generateTeamsMeetingICS(meeting: ITeamsMeetingData): string {
    const lines = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//SharePoint QR Code Generator//EN',
      'BEGIN:VEVENT',
      `UID:${Date.now()}@sharepoint-qr`,
      `DTSTAMP:${this._formatDate(new Date())}`,
      `DTSTART:${this._formatDate(meeting.startTime)}`,
      `DTEND:${this._formatDate(meeting.endTime)}`,
      `SUMMARY:${meeting.subject}`,
      `DESCRIPTION:${meeting.description || ''}\\n\\nJoin Teams Meeting: ${meeting.joinUrl}`,
      `URL:${meeting.joinUrl}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ];

    return lines.join('\n');
  }

  public static generateRoomVCard(room: { roomName: string; roomEmail: string; capacity?: number; location?: string; equipment?: string }): string {
    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${room.roomName}`,
      `EMAIL:${room.roomEmail}`,
      `NOTE:Location: ${room.location || ''}\\nCapacity: ${room.capacity || ''}\\nEquipment: ${room.equipment || ''}`,
      `URL:mailto:${room.roomEmail}`,
      'END:VCARD'
    ];

    return lines.join('\n');
  }
}
