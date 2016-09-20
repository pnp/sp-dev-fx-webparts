import { IActivity } from './IActivity';

export interface ITrendingDocument {
  id: string;
  title: string;
  url: string;
  webUrl?: string;
  webTitle?: string;
  previewImageUrl: string;
  extension: string;
  activity: IActivity;
}