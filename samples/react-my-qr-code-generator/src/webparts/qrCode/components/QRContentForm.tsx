import * as React from 'react';
import { Stack, TextField, Toggle, Dropdown, IDropdownOption, TooltipHost, IStackTokens, DatePicker } from '@fluentui/react';
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
import * as strings from 'QrCodeWebPartStrings';

const stackTokens: IStackTokens = { childrenGap: 15 };

export interface IQRContentFormProps {
  contentType: QRContentType;
  qrText: string;
  useCurrentPage: boolean;
  wifiData: IWiFiData;
  vcardData: IVCardData;
  emailData: IEmailData;
  smsData: ISMSData;
  phoneData: IPhoneData;
  teamsMeetingData: ITeamsMeetingData;
  meetingRoomData: IMeetingRoomData;
  calendarEventData: ICalendarEventData;
  onTextChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  onUseCurrentPageChange: (ev: React.MouseEvent<HTMLElement>, checked?: boolean) => void;
  onWiFiDataChange: (data: IWiFiData) => void;
  onVCardDataChange: (data: IVCardData) => void;
  onEmailDataChange: (data: IEmailData) => void;
  onSMSDataChange: (data: ISMSData) => void;
  onPhoneDataChange: (data: IPhoneData) => void;
  onTeamsMeetingDataChange: (data: ITeamsMeetingData) => void;
  onMeetingRoomDataChange: (data: IMeetingRoomData) => void;
  onCalendarEventDataChange: (data: ICalendarEventData) => void;
}

const TextForm: React.FunctionComponent<IQRContentFormProps> = ({ qrText, useCurrentPage, onTextChange, onUseCurrentPageChange }) => (
  <Stack tokens={stackTokens}>
    <TooltipHost content={strings.UseCurrentPageTooltip}>
      <Toggle
        label={strings.UseCurrentPageLabel}
        checked={useCurrentPage}
        onChange={onUseCurrentPageChange}
      />
    </TooltipHost>

    <TooltipHost content={strings.TextOrUrlTooltip}>
      <TextField
        label={strings.TextOrUrlLabel}
        multiline
        rows={3}
        value={qrText}
        onChange={onTextChange}
        disabled={useCurrentPage}
        placeholder={strings.TextOrUrlPlaceholder}
      />
    </TooltipHost>
  </Stack>
);

const WiFiForm: React.FunctionComponent<IQRContentFormProps> = ({ wifiData, onWiFiDataChange }) => {
  const encryptionOptions: IDropdownOption[] = [
    { key: 'WPA', text: strings.EncryptionWPA },
    { key: 'WEP', text: strings.EncryptionWEP },
    { key: 'nopass', text: strings.EncryptionNone }
  ];

  return (
    <Stack tokens={stackTokens}>
      <TextField
        label={strings.NetworkNameLabel}
        value={wifiData.ssid}
        onChange={(_, value) => onWiFiDataChange({ ...wifiData, ssid: value || '' })}
        required
      />
      
      <TextField
        label={strings.PasswordLabel}
        type="password"
        value={wifiData.password}
        onChange={(_, value) => onWiFiDataChange({ ...wifiData, password: value || '' })}
        disabled={wifiData.encryption === 'nopass'}
      />
      
      <Dropdown
        label={strings.EncryptionLabel}
        selectedKey={wifiData.encryption}
        options={encryptionOptions}
        onChange={(_, option) => onWiFiDataChange({ ...wifiData, encryption: option?.key as 'WPA' | 'WEP' | 'nopass' })}
      />
      
      <Toggle
        label={strings.HiddenNetworkLabel}
        checked={wifiData.hidden}
        onChange={(_, checked) => onWiFiDataChange({ ...wifiData, hidden: !!checked })}
      />
    </Stack>
  );
};

const VCardForm: React.FunctionComponent<IQRContentFormProps> = ({ vcardData, onVCardDataChange }) => (
  <Stack tokens={stackTokens}>
    <Stack horizontal tokens={{ childrenGap: 10 }}>
      <TextField
        label={strings.FirstNameLabel}
        value={vcardData.firstName}
        onChange={(_, value) => onVCardDataChange({ ...vcardData, firstName: value || '' })}
        styles={{ root: { flex: 1 } }}
      />
      <TextField
        label={strings.LastNameLabel}
        value={vcardData.lastName}
        onChange={(_, value) => onVCardDataChange({ ...vcardData, lastName: value || '' })}
        styles={{ root: { flex: 1 } }}
      />
    </Stack>
    
    <TextField
      label={strings.OrganizationLabel}
      value={vcardData.company}
      onChange={(_, value) => onVCardDataChange({ ...vcardData, company: value || '' })}
    />
    
    <TextField
      label={strings.TitleLabel}
      value={vcardData.jobTitle}
      onChange={(_, value) => onVCardDataChange({ ...vcardData, jobTitle: value || '' })}
    />
    
    <TextField
      label={strings.PhoneLabel}
      value={vcardData.phone}
      onChange={(_, value) => onVCardDataChange({ ...vcardData, phone: value || '' })}
    />
    
    <TextField
      label={strings.EmailLabel}
      type="email"
      value={vcardData.email}
      onChange={(_, value) => onVCardDataChange({ ...vcardData, email: value || '' })}
    />
    
    <TextField
      label={strings.WebsiteLabel}
      value={vcardData.website}
      onChange={(_, value) => onVCardDataChange({ ...vcardData, website: value || '' })}
    />
  </Stack>
);

const EmailForm: React.FunctionComponent<IQRContentFormProps> = ({ emailData, onEmailDataChange }) => (
  <Stack tokens={stackTokens}>
    <TextField
      label={strings.ToLabel}
      type="email"
      value={emailData.email}
      onChange={(_, value) => onEmailDataChange({ ...emailData, email: value || '' })}
      required
    />
    
    <TextField
      label={strings.SubjectLabel}
      value={emailData.subject}
      onChange={(_, value) => onEmailDataChange({ ...emailData, subject: value || '' })}
    />
    
    <TextField
      label={strings.BodyLabel}
      multiline
      rows={4}
      value={emailData.body}
      onChange={(_, value) => onEmailDataChange({ ...emailData, body: value || '' })}
    />
  </Stack>
);

const SMSForm: React.FunctionComponent<IQRContentFormProps> = ({ smsData, onSMSDataChange }) => (
  <Stack tokens={stackTokens}>
    <TextField
      label={strings.PhoneNumberLabel}
      value={smsData.phone}
      onChange={(_, value) => onSMSDataChange({ ...smsData, phone: value || '' })}
      required
    />
    
    <TextField
      label={strings.MessageLabel}
      multiline
      rows={4}
      value={smsData.message}
      onChange={(_, value) => onSMSDataChange({ ...smsData, message: value || '' })}
    />
  </Stack>
);

const PhoneForm: React.FunctionComponent<IQRContentFormProps> = ({ phoneData, onPhoneDataChange }) => (
  <Stack tokens={stackTokens}>
    <TextField
      label={strings.PhoneNumberLabel}
      value={phoneData.phone}
      onChange={(_, value) => onPhoneDataChange({ ...phoneData, phone: value || '' })}
      placeholder={strings.PhonePlaceholder}
      required
    />
  </Stack>
);

const TeamsMeetingForm: React.FunctionComponent<IQRContentFormProps> = ({ teamsMeetingData, onTeamsMeetingDataChange }) => (
  <Stack tokens={stackTokens}>
    <TextField
      label="Meeting Subject"
      value={teamsMeetingData.subject}
      onChange={(_, value) => onTeamsMeetingDataChange({ ...teamsMeetingData, subject: value || '' })}
      required
    />
    <DatePicker
      label="Start Date"
      value={teamsMeetingData.startTime}
      onSelectDate={(date) => date && onTeamsMeetingDataChange({ ...teamsMeetingData, startTime: date })}
    />
    <DatePicker
      label="End Date"
      value={teamsMeetingData.endTime}
      onSelectDate={(date) => date && onTeamsMeetingDataChange({ ...teamsMeetingData, endTime: date })}
    />
    <TextField
      label="Join URL"
      multiline
      rows={3}
      value={teamsMeetingData.joinUrl}
      onChange={(_, value) => onTeamsMeetingDataChange({ ...teamsMeetingData, joinUrl: value || '' })}
      required
      placeholder="https://teams.microsoft.com/..."
    />
    <TextField
      label="Description"
      multiline
      rows={3}
      value={teamsMeetingData.description}
      onChange={(_, value) => onTeamsMeetingDataChange({ ...teamsMeetingData, description: value || '' })}
    />
  </Stack>
);

const MeetingRoomForm: React.FunctionComponent<IQRContentFormProps> = ({ meetingRoomData, onMeetingRoomDataChange }) => (
  <Stack tokens={stackTokens}>
    <TextField
      label="Room Name"
      value={meetingRoomData.roomName}
      onChange={(_, value) => onMeetingRoomDataChange({ ...meetingRoomData, roomName: value || '' })}
      required
    />
    <TextField
      label="Room Email"
      value={meetingRoomData.roomEmail}
      onChange={(_, value) => onMeetingRoomDataChange({ ...meetingRoomData, roomEmail: value || '' })}
      required
      placeholder="room@contoso.com"
    />
    <TextField
      label="Location/Building"
      value={meetingRoomData.location}
      onChange={(_, value) => onMeetingRoomDataChange({ ...meetingRoomData, location: value || '' })}
    />
    <TextField
      label="Capacity"
      type="number"
      value={meetingRoomData.capacity?.toString()}
      onChange={(_, value) => onMeetingRoomDataChange({ ...meetingRoomData, capacity: parseInt(value || '0') })}
    />
    <TextField
      label="Equipment"
      multiline
      rows={2}
      value={meetingRoomData.equipment}
      onChange={(_, value) => onMeetingRoomDataChange({ ...meetingRoomData, equipment: value || '' })}
      placeholder="TV, Whiteboard, etc."
    />
  </Stack>
);

const CalendarEventForm: React.FunctionComponent<IQRContentFormProps> = ({ calendarEventData, onCalendarEventDataChange }) => (
  <Stack tokens={stackTokens}>
    <TextField
      label="Event Title"
      value={calendarEventData.title}
      onChange={(_, value) => onCalendarEventDataChange({ ...calendarEventData, title: value || '' })}
      required
    />
    <DatePicker
      label="Start Date"
      value={calendarEventData.startTime}
      onSelectDate={(date) => date && onCalendarEventDataChange({ ...calendarEventData, startTime: date })}
    />
    <DatePicker
      label="End Date"
      value={calendarEventData.endTime}
      onSelectDate={(date) => date && onCalendarEventDataChange({ ...calendarEventData, endTime: date })}
    />
    <TextField
      label="Location"
      value={calendarEventData.location}
      onChange={(_, value) => onCalendarEventDataChange({ ...calendarEventData, location: value || '' })}
    />
    <TextField
      label="Description"
      multiline
      rows={3}
      value={calendarEventData.description}
      onChange={(_, value) => onCalendarEventDataChange({ ...calendarEventData, description: value || '' })}
    />
  </Stack>
);

export const QRContentForm: React.FunctionComponent<IQRContentFormProps> = (props) => {
  const { contentType } = props;

  switch (contentType) {
    case QRContentType.WiFi:
      return <WiFiForm {...props} />;
    case QRContentType.VCard:
      return <VCardForm {...props} />;
    case QRContentType.Email:
      return <EmailForm {...props} />;
    case QRContentType.SMS:
      return <SMSForm {...props} />;
    case QRContentType.Phone:
      return <PhoneForm {...props} />;
    case QRContentType.TeamsMeeting:
      return <TeamsMeetingForm {...props} />;
    case QRContentType.MeetingRoom:
      return <MeetingRoomForm {...props} />;
    case QRContentType.CalendarEvent:
      return <CalendarEventForm {...props} />;
    default:
      return <TextForm {...props} />;
  }
};
