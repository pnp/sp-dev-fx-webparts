import { IUnifiedCalendar } from '@spteck/m365-hooks';

export type EventFeedLayout = 'agenda' | 'grid' | 'list' | 'filmstrip' | 'marquee' | 'carousel' | 'feature' | 'masonry' | 'compactList';

export interface IEventFeedWebPartProps {
  title: string;
  layout: EventFeedLayout;
  height: string;
  marqueeDirection: 'vertical' | 'horizontal';
  selectedCalendars: IUnifiedCalendar[];
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
}
