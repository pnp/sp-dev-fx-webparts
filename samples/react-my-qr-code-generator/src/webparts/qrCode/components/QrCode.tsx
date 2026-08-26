import * as React from 'react';
import styles from './QrCode.module.scss';
import { IQrCodeProps } from './IQrCodeProps';
import * as QRCode from 'qrcode';
import { 
  PrimaryButton, 
  DefaultButton,
  IconButton,
  Stack, 
  Text, 
  Pivot,
  PivotItem,
  TooltipHost,
  IStackTokens,
  CommandBarButton,
  Label,
  MessageBar,
  IDropdownOption,
  IColor,
  Icon,
  Toggle
} from '@fluentui/react';
import { saveAs } from 'file-saver';
import { 
  QRContentType, 
  IWiFiData, 
  IVCardData, 
  IEmailData, 
  ISMSData, 
  IPhoneData, 
  ITeamsMeetingData,
  IMeetingRoomData,
  ICalendarEventData,
  IQRHistory 
} from '../types/QRTypes';
import { QRContentGenerator } from '../utils/QRContentGenerator';
import { GraphService } from '../services/GraphService';
import { FilePicker, IFilePickerResult } from '@pnp/spfx-controls-react/lib/FilePicker';
import { SaveToListDialog } from './SaveToListDialog';
import { SPService } from '../services/SPService';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { IQRStyleOptions, IQRFrameOptions, DEFAULT_STYLE_OPTIONS, DEFAULT_FRAME_OPTIONS } from '../types/QRStyleTypes';
import { Card } from './Card';
import { PhoneMockup } from './PhoneMockup';
import { QRContentForm } from './QRContentForm';
import { QRStyleControls } from './QRStyleControls';
import { CustomQRCode } from './CustomQRCode';

import * as strings from 'QrCodeWebPartStrings';

const stackTokens: IStackTokens = { childrenGap: 15 };
const horizontalStackTokens: IStackTokens = { childrenGap: 10 };

interface IQrCodeState {
  contentType: QRContentType;
  qrText: string;
  qrSize: number;
  foregroundColor: string;
  backgroundColor: string;
  errorLevel: 'L' | 'M' | 'Q' | 'H';
  logoUrl: string;
  includeMargin: boolean;
  useCurrentPage: boolean;
  
  wifiData: IWiFiData;
  vcardData: IVCardData;
  emailData: IEmailData;
  smsData: ISMSData;
  phoneData: IPhoneData;
  teamsMeetingData: ITeamsMeetingData;
  meetingRoomData: IMeetingRoomData;
  calendarEventData: ICalendarEventData;
  
  styleOptions: IQRStyleOptions;
  frameOptions: IQRFrameOptions;
  showPhoneMockup: boolean;
  
  showSaveDialog: boolean;
  graphService: GraphService | undefined;
  spService: SPService | undefined;
  
  isDragging: boolean;
  
  // History
  history: IQRHistory[];
}

export default class QrCode extends React.Component<IQrCodeProps, IQrCodeState> {
  private _qrCodeRef = React.createRef<HTMLDivElement>();

  constructor(props: IQrCodeProps) {
    super(props);
    
    const savedHistory = localStorage.getItem('qr-history');
    const history: IQRHistory[] = savedHistory ? JSON.parse(savedHistory) : [];
    
    let graphService: GraphService | undefined;
    if (this.props.context) {
      this.props.context.msGraphClientFactory.getClient('3').then(client => {
        graphService = new GraphService(client);
        this.setState({ graphService });
      }).catch(() => {
        console.warn('Graph client initialization failed');
      });
    }

    const spService = new SPService(this.props.context);
    
    this.state = {
      contentType: QRContentType.URL,
      qrText: props.text || 'https://sharepoint.com',
      qrSize: props.size || 256,
      foregroundColor: props.foregroundColor || '#000000',
      backgroundColor: props.backgroundColor || '#FFFFFF',
      errorLevel: props.errorCorrectionLevel || 'M',
      logoUrl: props.logoUrl || '',
      includeMargin: props.includeMargin !== undefined ? props.includeMargin : true,
      useCurrentPage: false,
      wifiData: { ssid: '', password: '', encryption: 'WPA', hidden: false },
      vcardData: { firstName: '', lastName: '', mobile: '', phone: '', email: '', company: '', jobTitle: '', street: '', city: '', zip: '', country: '', website: '' },
      emailData: { email: '', subject: '', body: '' },
      smsData: { phone: '', message: '' },
      phoneData: { phone: '' },
      teamsMeetingData: { subject: '', startTime: new Date(), endTime: new Date(), joinUrl: '' },
      meetingRoomData: { roomName: '', roomEmail: '' },
      calendarEventData: { title: '', startTime: new Date(), endTime: new Date(), location: '', description: '', allDay: false },
      styleOptions: DEFAULT_STYLE_OPTIONS,
      frameOptions: DEFAULT_FRAME_OPTIONS,
      showPhoneMockup: true,
      showSaveDialog: false,
      graphService: undefined, // Will be set by the promise above
      spService,
      isDragging: false,
      history
    };
  }

  public render(): React.ReactElement<IQrCodeProps> {
    return (
      <section className={styles.qrCode}>
        <Stack tokens={stackTokens}>
          <WebPartTitle 
            displayMode={this.props.displayMode}
            title={this.props.title}
            updateProperty={this.props.updateProperty}
          />
          
          {this._renderQuickActions()}
          
          <Pivot aria-label="QR Code Generator Tabs">
            <PivotItem headerText="Generate" itemIcon="QRCode">
              {this._renderGenerateTab()}
            </PivotItem>
            <PivotItem headerText="History" itemIcon="History" itemCount={this.state.history.length}>
              {this._renderHistoryTab()}
            </PivotItem>
          </Pivot>

          <SaveToListDialog
            isOpen={this.state.showSaveDialog}
            onSave={this._handleSaveToList}
            onDismiss={() => this.setState({ showSaveDialog: false })}
          />
        </Stack>
      </section>
    );
  }

  private _renderGenerateTab(): JSX.Element {
    return (
      <Stack horizontal tokens={horizontalStackTokens} className={styles.generateTab}>
        <Stack tokens={stackTokens} className={styles.panel}>
          <Card title={strings.ContentSettingsTitle}>
            {this._renderContentForm()}
          </Card>
          
          <Card title={strings.AppearanceTitle}>
            {this._renderCustomizationControls()}
          </Card>
        </Stack>

        <Stack tokens={stackTokens} horizontalAlign="center" className={styles.previewPanel}>
          <Card title={strings.LivePreviewTitle}>
            {this._renderPreview()}
          </Card>
        </Stack>
      </Stack>
    );
  }

  private _renderCustomizationControls(): JSX.Element {
    const { qrSize, errorLevel, logoUrl, includeMargin, foregroundColor, backgroundColor, styleOptions, frameOptions } = this.state;

    return (
      <QRStyleControls
        qrSize={qrSize}
        errorLevel={errorLevel}
        logoUrl={logoUrl}
        includeMargin={includeMargin}
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
        styleOptions={styleOptions}
        frameOptions={frameOptions}
        onSizeChange={this._onSizeChange}
        onErrorLevelChange={this._onErrorLevelChange}
        onLogoUrlChange={this._onLogoUrlChange}
        onIncludeMarginChange={this._onIncludeMarginChange}
        onForegroundColorChange={this._onForegroundColorChange}
        onBackgroundColorChange={this._onBackgroundColorChange}
        onStyleOptionsChange={(options) => this.setState({ styleOptions: options })}
        onFrameOptionsChange={(options) => this.setState({ frameOptions: options })}
      />
    );
  }

  private _renderPreview(): JSX.Element {
    const { foregroundColor, backgroundColor, errorLevel, logoUrl, includeMargin, showPhoneMockup, styleOptions, frameOptions } = this.state;
    const finalQrText = this._getFinalQRText();

    const qrCodeElement = (
      <Stack horizontalAlign="center" verticalAlign="center" className={styles.previewContainer}>
        <div ref={this._qrCodeRef} className={styles.qrCodeWrapper}>
          <CustomQRCode
            value={finalQrText}
            size={showPhoneMockup ? 200 : 256}
            fgColor={foregroundColor}
            bgColor={backgroundColor}
            errorLevel={errorLevel}
            includeMargin={includeMargin}
            logoUrl={logoUrl}
            styleOptions={styleOptions}
            frameOptions={frameOptions}
          />
        </div>
        <Text variant="small" className={styles.qrText}>
          {finalQrText.length > 50 ? finalQrText.substring(0, 50) + '...' : finalQrText}
        </Text>
      </Stack>
    );

    return (
      <Stack tokens={stackTokens} horizontalAlign="center">
        <Toggle 
          label={strings.ShowPhoneMockupLabel}
          checked={showPhoneMockup} 
          onChange={(_, checked) => this.setState({ showPhoneMockup: !!checked })}
          className={styles.phoneMockupToggle}
        />
        
        {showPhoneMockup ? (
          <PhoneMockup>
            {qrCodeElement}
          </PhoneMockup>
        ) : (
          <div className={styles.noPhoneMockup}>
            {qrCodeElement}
          </div>
        )}

        <Stack horizontal tokens={{ childrenGap: 10 }} wrap horizontalAlign="center" className={styles.actionButtons}>
          <TooltipHost content={strings.DownloadPNGTooltip}>
            <PrimaryButton text={strings.DownloadPNGButton} onClick={this._downloadPNG} iconProps={{ iconName: 'Download' }} />
          </TooltipHost>
          
          <TooltipHost content={strings.DownloadSVGTooltip}>
            <DefaultButton text={strings.DownloadSVGButton} onClick={this._downloadSVG} iconProps={{ iconName: 'Download' }} />
          </TooltipHost>

          {this.state.graphService && (
            <TooltipHost content={strings.SaveToSharePointTooltip}>
              <DefaultButton text={strings.SaveToSharePointButton} onClick={() => this.setState({ showSaveDialog: true })} iconProps={{ iconName: 'SharePointLogo' }} />
            </TooltipHost>
          )}
          
          <TooltipHost content={strings.CopyTooltip}>
            <DefaultButton text={strings.CopyButton} onClick={this._copyToClipboard} iconProps={{ iconName: 'Copy' }} />
          </TooltipHost>
          
          <TooltipHost content={strings.PrintTooltip}>
            <DefaultButton text={strings.PrintButton} onClick={this._printQRCode} iconProps={{ iconName: 'Print' }} />
          </TooltipHost>
          
          <TooltipHost content={strings.ResetTooltip}>
            <DefaultButton text={strings.ResetButton} onClick={this._resetToDefaults} iconProps={{ iconName: 'Refresh' }} />
          </TooltipHost>
        </Stack>
      </Stack>
    );
  }

  private _renderHistoryTab(): JSX.Element {
    const { history } = this.state;

    if (history.length === 0) {
      return (
        <MessageBar>
          {strings.NoHistoryMessage}
        </MessageBar>
      );
    }

    return (
      <Stack tokens={stackTokens}>
        <Text variant="large">{strings.RecentHistoryTitle}</Text>
        {history.slice(0, 10).map((item, index) => (
          <Stack
            key={item.id}
            horizontal
            tokens={{ childrenGap: 10 }}
            className={styles.historyItem}
            onClick={() => this._loadFromHistory(item)}
          >
            <Stack.Item>
              <div className={styles.historyIconContainer}>
                <Icon iconName={this._getIconForType(item.type)} />
              </div>
            </Stack.Item>
            <Stack.Item grow>
              <Stack>
                <Text variant="medium" className={styles.historyItemName}>{item.name}</Text>
                <Text variant="small" className={styles.historyItemDate}>{new Date(item.timestamp).toLocaleString()}</Text>
                <Text variant="small" className={styles.historyItemContent}>
                  {item.content.length > 60 ? item.content.substring(0, 60) + '...' : item.content}
                </Text>
              </Stack>
            </Stack.Item>
            <IconButton
              iconProps={{ iconName: 'Delete' }}
              title={strings.DeleteTooltip}
              className={styles.deleteButton}
              onClick={(e) => { e.stopPropagation(); this._deleteHistoryItem(item.id); }}
            />
          </Stack>
        ))}
      </Stack>
    );
  }

  private _getIconForType(type: QRContentType): string {
    switch (type) {
      case QRContentType.URL: return 'Link';
      case QRContentType.WiFi: return 'WifiEthernet';
      case QRContentType.VCard: return 'Contact';
      case QRContentType.Email: return 'Mail';
      case QRContentType.SMS: return 'Message';
      case QRContentType.Phone: return 'Phone';
      case QRContentType.TeamsMeeting: return 'TeamsLogo';
      case QRContentType.MeetingRoom: return 'Room';
      case QRContentType.CalendarEvent: return 'Event';
      default: return 'QRCode';
    }
  }

  private _renderQuickActions(): JSX.Element {
    const templates = [
      { type: QRContentType.URL, icon: 'Link', label: 'URL' },
      { type: QRContentType.WiFi, icon: 'WifiEthernet', label: 'WiFi' },
      { type: QRContentType.VCard, icon: 'Contact', label: 'Contact' },
      { type: QRContentType.Email, icon: 'Mail', label: 'Email' },
      { type: QRContentType.SMS, icon: 'Message', label: 'SMS' },
      { type: QRContentType.Phone, icon: 'Phone', label: 'Phone' },
      { type: QRContentType.TeamsMeeting, icon: 'TeamsLogo', label: 'Teams' },
      { type: QRContentType.MeetingRoom, icon: 'Room', label: 'Room' },
      { type: QRContentType.CalendarEvent, icon: 'Event', label: 'Event' },
    ];

    return (
      <Stack horizontal tokens={{ childrenGap: 8 }} wrap>
        <Label>{strings.QuickActionsLabel}</Label>
        {templates.map(template => (
          <TooltipHost key={template.type} content={strings.CreateQRCodeTooltip.replace('{0}', template.label)}>
            <CommandBarButton
              iconProps={{ iconName: template.icon }}
              text={template.label}
              onClick={() => this.setState({ contentType: template.type })}
              checked={this.state.contentType === template.type}
            />
          </TooltipHost>
        ))}
      </Stack>
    );
  }

  private _renderContentForm(): JSX.Element {
    const { 
      contentType, qrText, useCurrentPage, 
      wifiData, vcardData, emailData, smsData, phoneData,
      teamsMeetingData, meetingRoomData, calendarEventData 
    } = this.state;

    return (
      <>
        <QRContentForm
          contentType={contentType}
          qrText={qrText}
          useCurrentPage={useCurrentPage}
          wifiData={wifiData}
          vcardData={vcardData}
          emailData={emailData}
          smsData={smsData}
          phoneData={phoneData}
          teamsMeetingData={teamsMeetingData}
          meetingRoomData={meetingRoomData}
          calendarEventData={calendarEventData}
          onTextChange={this._onTextChange}
          onUseCurrentPageChange={this._onUseCurrentPageChange}
          onWiFiDataChange={(data) => this.setState({ wifiData: data })}
          onVCardDataChange={(data) => this.setState({ vcardData: data })}
          onEmailDataChange={(data) => this.setState({ emailData: data })}
          onSMSDataChange={(data) => this.setState({ smsData: data })}
          onPhoneDataChange={(data) => this.setState({ phoneData: data })}
          onTeamsMeetingDataChange={(data) => this.setState({ teamsMeetingData: data })}
          onMeetingRoomDataChange={(data) => this.setState({ meetingRoomData: data })}
          onCalendarEventDataChange={(data) => this.setState({ calendarEventData: data })}
        />
        
        {contentType === QRContentType.URL && this.state.graphService && (
          <Stack>
            <FilePicker
              accepts={[".jpg", ".png", ".jpeg", ".svg", ".pdf", ".docx", ".xlsx", ".pptx", ".txt"]}
              buttonLabel={strings.BrowseSharePointButton}
              buttonIcon="SharePointLogo"
              onSave={(filePickerResult: IFilePickerResult[]) => {
                if (filePickerResult && filePickerResult.length > 0) {
                  this.setState({ qrText: filePickerResult[0].fileAbsoluteUrl });
                }
              }}
              context={this.props.context}
              onCancel={() => {}}
              hideWebSearchTab={true}
              hideOrganisationalAssetTab={true}
              hideRecentTab={false}
              hideSiteFilesTab={false}
              hideLocalUploadTab={true}
              hideLinkUploadTab={true}
            />
          </Stack>
        )}
      </>
    );
  }

  private _getFinalQRText(): string {
    const { 
      contentType, qrText, useCurrentPage, 
      wifiData, vcardData, emailData, smsData, phoneData,
      teamsMeetingData, meetingRoomData, calendarEventData 
    } = this.state;
    const { currentPageUrl } = this.props;

    if (useCurrentPage) return currentPageUrl;

    switch (contentType) {
      case QRContentType.WiFi:
        return QRContentGenerator.generateWiFi(wifiData);
      case QRContentType.VCard:
        return QRContentGenerator.generateVCard(vcardData);
      case QRContentType.Email:
        return QRContentGenerator.generateEmail(emailData);
      case QRContentType.SMS:
        return QRContentGenerator.generateSMS(smsData);
      case QRContentType.Phone:
        return QRContentGenerator.generatePhone(phoneData);
      case QRContentType.TeamsMeeting:
        return QRContentGenerator.generateTeamsMeeting(teamsMeetingData);
      case QRContentType.MeetingRoom:
        return QRContentGenerator.generateMeetingRoom(meetingRoomData);
      case QRContentType.CalendarEvent:
        return QRContentGenerator.generateCalendarEvent(calendarEventData);
      default:
        return qrText;
    }
  }

  private _saveToHistory(): void {
    const { contentType, history } = this.state;
    const content = this._getFinalQRText();
    
    const newItem: IQRHistory = {
      id: Date.now().toString(),
      type: contentType,
      content,
      timestamp: new Date().toISOString(),
      name: QRContentGenerator.getContentTypeName(contentType)
    };

    const updatedHistory = [newItem, ...history].slice(0, 50);
    this.setState({ history: updatedHistory });
    localStorage.setItem('qr-history', JSON.stringify(updatedHistory, (key, value) => {
      if (key === 'timestamp') return new Date(value).toISOString();
      return value;
    }));
  }

  private _loadFromHistory(item: IQRHistory): void {
    this.setState({
      contentType: item.type,
      qrText: item.content
    });
  }

  private _deleteHistoryItem(id: string): void {
    const updatedHistory = this.state.history.filter(item => item.id !== id);
    this.setState({ history: updatedHistory });
    localStorage.setItem('qr-history', JSON.stringify(updatedHistory));
  }

  private _onTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    this.setState({ qrText: newValue || '' });
  }

  private _onSizeChange = (value: number): void => {
    this.setState({ qrSize: value });
  }

  private _onErrorLevelChange = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
    if (option) {
      this.setState({ errorLevel: option.key as 'L' | 'M' | 'Q' | 'H' });
    }
  }

  private _onForegroundColorChange = (_ev: React.SyntheticEvent<HTMLElement>, color: IColor): void => {
    this.setState({ foregroundColor: '#' + color.hex });
  }

  private _onBackgroundColorChange = (_ev: React.SyntheticEvent<HTMLElement>, color: IColor): void => {
    this.setState({ backgroundColor: '#' + color.hex });
  }

  private _onLogoUrlChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
    this.setState({ logoUrl: newValue || '' });
  }

  private _onIncludeMarginChange = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ includeMargin: checked || false });
  }

  private _onUseCurrentPageChange = (ev: React.MouseEvent<HTMLElement>, checked?: boolean): void => {
    this.setState({ useCurrentPage: checked || false });
  }

  private _resetToDefaults = (): void => {
    this.setState({
      contentType: QRContentType.URL,
      qrText: 'https://sharepoint.com',
      qrSize: 256,
      foregroundColor: '#000000',
      backgroundColor: '#FFFFFF',
      errorLevel: 'M',
      logoUrl: '',
      includeMargin: true,
      useCurrentPage: false
    });
  }

  private _getQRCodeBlob = (): Blob | null => {
    const canvas = this._qrCodeRef.current?.querySelector('canvas');
    if (canvas) {
      const dataURL = canvas.toDataURL('image/png');
      const byteString = atob(dataURL.split(',')[1]);
      const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    }
    return null;
  }

  private _handleSaveToList = async (title: string, description: string): Promise<void> => {
    try {
      const blob = this._getQRCodeBlob();
      if (!blob || !this.state.spService) return;

      const fileName = `qr-code-${Date.now()}.png`;
      await this.state.spService.saveQRCode(title, description, blob, fileName);

      const message = strings.SaveSuccessMessage.replace('{0}', title);
      alert(message);
      
      this._saveToHistory();
      this.setState({ showSaveDialog: false });
    } catch (error) {
      console.error('Error saving to SharePoint:', error);
      alert(strings.SaveErrorMessage);
      this.setState({ showSaveDialog: false });
    }
  };

  private _downloadPNG = (): void => {
    const canvas = this._qrCodeRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, 'qrcode.png');
          this._saveToHistory();
        }
      });
    }
  }

  private _downloadSVG = async (): Promise<void> => {
    try {
      const content = this._getFinalQRText();
      const svgString = await QRCode.toString(content, {
        type: 'svg',
        width: this.state.qrSize,
        color: {
          dark: this.state.foregroundColor,
          light: this.state.backgroundColor
        },
        errorCorrectionLevel: this.state.errorLevel,
        margin: this.state.includeMargin ? 4 : 0
      });
      
      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      saveAs(blob, 'qrcode.svg');
      this._saveToHistory();
    } catch (error) {
      console.error('Error generating SVG:', error);
    }
  }

  private _copyToClipboard = async (): Promise<void> => {
    const canvas = this._qrCodeRef.current?.querySelector('canvas');
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          try {
            const item = new ClipboardItem({ 'image/png': blob });
            navigator.clipboard.write([item]).then(() => {
              alert(strings.CopySuccessMessage);
            }).catch(err => {
              console.error('Could not copy text: ', err);
              alert(strings.CopyErrorMessage);
            });
          } catch (error) {
            console.error('Error copying to clipboard:', error);
          }
        }
      });
    }
  }

  private _printQRCode = (): void => {
    const canvas = this._qrCodeRef.current?.querySelector('canvas');
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head><title>Print QR Code</title></head>
            <body style="text-align: center; padding: 20px;">
              <img src="${dataUrl}" style="max-width: 100%;" />
              <script>window.print(); window.close();</script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  }


  public componentDidMount(): void {
    document.addEventListener('keydown', this._handleKeyboardShortcuts);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('keydown', this._handleKeyboardShortcuts);
  }

  private _handleKeyboardShortcuts = (e: KeyboardEvent): void => {
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 's') {
        e.preventDefault();
        this._downloadPNG();
      } else if (e.key === 'r') {
        e.preventDefault();
        this._resetToDefaults();
      }
    }
  }
}
