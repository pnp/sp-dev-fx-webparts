import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from '@microsoft/sp-core-library';
export interface IFollowDocumentWebPartProps {
  title: string;
  context: WebPartContext;
  displayMode: DisplayMode;
  updateProperty: (value: string) => void;
}
export interface IGridItem {
  thumbnail: string;
  title: string;
  name: string;
  profileImageSrc: string;
  location: string;
  activity: string;
}
