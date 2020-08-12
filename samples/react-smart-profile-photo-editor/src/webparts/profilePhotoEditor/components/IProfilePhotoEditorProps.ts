import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IProfilePhotoEditorProps {
  instructions: string;
  context: WebPartContext;
  requirePortrait: boolean;
  allowClipart: boolean;
  allowLinedrawing: boolean;
  allowRacy: boolean;
  allowAdult: boolean;
  allowGory: boolean;
  forbiddenKeywords: string;
  azureVisionEndpoint: string;
  azureVisionKey: string;
  displayMode: DisplayMode;
}


