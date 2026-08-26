import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IGalleryImages } from '../ImageGallery/IGalleryImages';
export interface IImageProps {
  image: IGalleryImages;
  context: WebPartContext;
  displayCaption: boolean;
}
