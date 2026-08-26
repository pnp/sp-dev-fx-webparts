import { IApplicationContext } from '@spteck/react-controls-v2';
import { Theme } from '@fluentui/react-components';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { DisplayMode } from '@microsoft/sp-core-library';
import { EventFeedLayout, IEventFeedWebPartProps } from './IEventFeedWebPartProps';

export interface IEventFeedWebPartRootProps extends IEventFeedWebPartProps {
  context: IApplicationContext;
  spfxContext: BaseComponentContext;
  theme: Theme;
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  layout: EventFeedLayout;
  height: string;
  marqueeDirection: 'vertical' | 'horizontal';
  maxEvents: number;
  refreshIntervalMinutes: number;
  headlineLines: number;
  descriptionLines: number;
  allowDrag: boolean;
  showDescription: boolean;
  showMeta: boolean;
  showLocation: boolean;
  showOrganizer: boolean;
  showFilters: boolean;
  displayMode: DisplayMode;
  onConfigure: () => void;
}
