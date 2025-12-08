import { WebPartContext } from '@microsoft/sp-webpart-base';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IQrCodeProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  title: string;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;

  // QR Code Properties
  text?: string;
  size?: number;
  foregroundColor?: string;
  backgroundColor?: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
  logoUrl?: string;
  includeMargin?: boolean;
  filePickerResult?: IFilePickerResult;
  currentPageUrl: string;
  useCurrentPage?: boolean;
  context: WebPartContext;
}

export interface IFilePickerResult {
  fileAbsoluteUrl?: string;
  fileName?: string;
  fileNameWithoutExtension?: string;
  downloadFileContent?: () => Promise<File>;
}
