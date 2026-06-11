import { IApplicationContext, NewsFeedLayout } from '@spteck/react-controls-v2';
import { Theme } from '@fluentui/react-components';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { DataSourceMode, INewsFeedWebPartProps } from './INewsFeedWebPartProps';
import { ISelectedSite } from './ISelectedSite';

export interface INewsFeedWebPartRootProps extends INewsFeedWebPartProps {
  context: IApplicationContext;
  spfxContext: BaseComponentContext;
  theme: Theme;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
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
  displayMode: DisplayMode;
  onConfigure: () => void;
}
