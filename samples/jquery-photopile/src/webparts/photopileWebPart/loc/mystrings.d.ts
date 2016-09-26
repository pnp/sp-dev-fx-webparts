/**
 * @file
 * Photopile Web Part String ressources definitions
 *
 * Author: Olivier Carpentier
 */
declare interface IStrings {
  //Generic labels
  PropertyPaneDescription: string;
  ErrorSelectList: string;
  ErrorNoItems: string;
  Loading: string;

  //Web part properties group names
  PictureLibraryGroupName: string;
  ThumbnailsGroupName: string;
  PhotoContainerGroupName: string;
  AutoplayGroupName: string;

  //Library labels
  PictureLibraryFieldLabel: string;
  OrderByFieldLabel: string;
  OrderByChoiceLabelId: string;
  OrderByChoiceLabelTitle: string;
  OrderByChoiceLabelCreated: string;
  OrderByChoiceLabelModified: string;
  OrderByChoiceLabelImageWidth: string;
  OrderByChoiceLabelImageHeight: string;
  OrderByAscFieldLabel: string;
  OrderByAscChoiceLabel: string;
  OrderByDescChoiceLabel: string;
  PictureLibraryCountLabel: string;

  //Thumbnails accordion labels
  NumLayersFieldLabel: string;
  ThumbOverlabFieldLabel: string;
  ThumbRotationFieldLabel: string;
  ThumbBorderWidthFieldLabel: string;
  ThumbBorderColorFieldLabel: string;
  ThumbBorderHoverFieldLabel: string;
  DraggableFieldLabel: string;

  //Photo container accordion labels
  FadeDurationFieldLabel: string;
  PickupDurationFieldLabel: string;
  PhotoZIndexFieldLabel: string;
  PhotoBorderFieldLabel: string;
  PhotoBorderColorFieldLabel: string;
  ShowInfoFieldLabel: string;

  //Auoplay accordion labels
  AutoplayGalleryFieldLabel: string;
  AutoplaySpeedFieldLabel: string;
}

declare module 'mystrings' {
  const strings: IStrings;
  export = strings;
}
