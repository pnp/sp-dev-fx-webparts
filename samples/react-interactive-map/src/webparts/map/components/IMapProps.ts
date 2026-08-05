import { Guid } from '@microsoft/sp-core-library';
import { IMapPlugins } from '../MapWebPart';

export type MarkerType = "Panel"|"Dialog"|"Url"|"None";

export interface IMarkerClickProps {
  url: IMarkerUrlProperties;
  content: IMarkerContentProperties;
}

export interface IMarkerUrlProperties {
  href: string;
  target: '_self'|'_blank'|'embedded';
}

export interface IMarkerContentProperties {
  headerText: string;
  html: string;
}

export interface IMarkerIcon {
  markerColor: string;
  iconName: string;
  iconColor: string;
}

export interface IMarkerCategory {
  id: string;
  name: string;
  popuptext?: string;
  iconProperties: IMarkerIcon;
}

export interface IMarker {
  id: string;
  longitude: number;
  latitude: number;
  type: MarkerType;
  categoryId: string;
  iconProperties?: IMarkerIcon;
  popuptext?: string;
  markerClickProps?: IMarkerClickProps;
}

export interface IMapProps {
  markerItems: IMarker[];
  markerCategories: IMarkerCategory[];
  isEditMode: boolean;
  zoom?: number;
  center?: [number, number];
  maxZoom?: number;
  minZoom?: number;
  title?: string;
  height: number;
  dragging: boolean;
  scrollWheelZoom: boolean;
  plugins: IMapPlugins;
  tileLayerUrl: string;
  tileLayerAttribution: string;
  showPopUp: boolean;
  /** When true (and markers exist), the live map frames all markers on load instead of the start view. */
  fitToMarkers: boolean;


  onMarkerCollectionChanged(markerItems: IMarker[]): void;
  onMarkerCategoriesChanged(markerCategories: IMarkerCategory[]): void;
  onStartViewSet(zoomLevel: number, lat: number, lng: number): void;
  onTitleUpdate?: (value: string) => void;
}

export const emptyMarkerItem: IMarker = {
  id: Guid.empty.toString(),
  latitude: 0,
  longitude: 0,
  type: "Panel",
  markerClickProps: {
    url: { href: "", target: '_blank' },
    content: { html: '', headerText: ''  }
  },
  categoryId: Guid.empty.toString(),
  iconProperties: {
    markerColor: "#000000",
    iconName: "FullCircleMask",
    iconColor: "#ffffff"
  },
  popuptext: undefined
};
