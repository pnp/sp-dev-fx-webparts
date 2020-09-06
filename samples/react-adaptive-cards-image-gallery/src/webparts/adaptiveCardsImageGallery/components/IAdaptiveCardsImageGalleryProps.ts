import { ServiceScope } from '@microsoft/sp-core-library';
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IAdaptiveCardsImageGalleryProps {
  context: WebPartContext;
  serviceScope: ServiceScope;
  imageGalleryName: string;
  imagesToDisplay: number;
}
