import { IActivity } from './IActivity';

export interface ITrendingDocument {
  id: string;
  title: string;
  url: string;
  previewImageUrl: string;
  extension: string;
  activity: IActivity;
}