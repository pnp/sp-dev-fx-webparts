import { NewsFeedLayout } from '@spteck/react-controls-v2';
import { ISelectedSite } from './ISelectedSite';

export type DataSourceMode = 'all' | 'org' | 'selected';

export interface INewsFeedWebPartProps {
  layout: NewsFeedLayout;
  height: string;
  marqueeDirection: 'vertical' | 'horizontal';
  dataSourceMode: DataSourceMode;
  selectedSites: ISelectedSite[];
  maxNews: number;
  refreshIntervalMinutes: number;
  headlineLines: number;
  bodyLines: number;
  allowDrag: boolean;
  showAuthorDate: boolean;
  showViewsLikes: boolean;
  showComments: boolean;
  showShare: boolean;
}
