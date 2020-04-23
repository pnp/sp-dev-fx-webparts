import { ServiceScope } from '@microsoft/sp-core-library';

export interface IAdaptiveCardsImageGalleryProps {
  serviceScope: ServiceScope;
  imageGalleryName: string;
  imagesToDisplay: number;
}
