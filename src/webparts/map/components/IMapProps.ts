
export type MarkerType = "Panel"|"Dialog"|"Url"|"None";



export type MarkerTypePanel = {
  headerText: string;
  content: string;  
};

export type MarkerTypeUrl = {
  url: string;
};

export type MarkerTypeDialog = {
  headerText: string;
  content?: string;
  url?: string;
};

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
  markerClickProps?: MarkerTypePanel|MarkerTypeUrl|MarkerTypeDialog;
}

export interface IMapProps {
  markerItems: IMarker[];
  markerCategories: IMarkerCategory[];
  onMarkerCollectionChanged?(markerItems: IMarker[]);
  onMarkerCategoriesChanged?(markerCategories: IMarkerCategory[]);
  isEditMode: boolean;
}


