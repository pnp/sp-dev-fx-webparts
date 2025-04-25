/* eslint-disable @typescript-eslint/no-explicit-any */

import { IGalleryImages } from './IGalleryImages';

export interface ImageGalleryState {
  images: IGalleryImages[];
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
  teamsTheme: string;
  showLithbox: boolean;
  photoIndex: number;
  isloadingCarousel:boolean;
  carouselImages: any[];
  lithboxMedia?: any[];
  isPlaying:boolean;
  autoplay: boolean;

}
