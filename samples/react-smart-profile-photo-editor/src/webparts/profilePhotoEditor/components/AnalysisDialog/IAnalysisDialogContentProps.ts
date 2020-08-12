import { AnalyzeImageInStreamResponse } from '@azure/cognitiveservices-computervision/esm/models';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IPhotoRequirements } from './IPhotoRequirements';


export interface IAnalysisDialogContentProps {
  imageUrl: string;
  azureKey: string;
  azureEndpoint: string;
  photoRequirements: IPhotoRequirements;

  /**
   * The web part context we'll need to call APIs
   */
  context: WebPartContext;

  blob: Blob;

  /**
   * The DOM element to attach the dialog to
   */
  domElement: any;

  /**
   * Dismiss handler
   */
  onDismiss: () => void;
}


