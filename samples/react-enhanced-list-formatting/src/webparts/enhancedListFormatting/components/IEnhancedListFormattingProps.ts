import { DisplayMode } from '@microsoft/sp-core-library';
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IEnhancedListFormattingProps {
  css: string;
  acceptedDisclaimer?: boolean;
  displayMode: DisplayMode;
  context: WebPartContext;
  onAcceptDisclaimer: () => void;
}
