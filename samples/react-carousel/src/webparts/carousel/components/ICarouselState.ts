import * as React from 'react';

export interface ICarouselState {
  carouselImages: React.ReactElement<HTMLElement>[];
  isLoading: boolean;
  errorMessage: string;
  hasError: boolean;
  teamsTheme: string;
  photoIndex: number;
  loadingImage: boolean;
}
