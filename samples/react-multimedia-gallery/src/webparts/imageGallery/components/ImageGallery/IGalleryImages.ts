import { Image } from 'react-grid-gallery';

export interface IGalleryImages extends Image {
  imageUrl: string;
  ServerRelativeUrl: string;
  thumbnail:string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  caption: string;
  mediaType: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customOverlay: any;
}
