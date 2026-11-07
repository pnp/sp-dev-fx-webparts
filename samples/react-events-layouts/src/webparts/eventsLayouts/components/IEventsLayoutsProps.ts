import { Theme } from '@fluentui/react-components';
import { DateRangeKey, IDisplayOptions, IEventSource, LayoutType } from '../models';
import { EventService } from '../services/EventService';

export interface IEventsLayoutsProps {
  title: string;
  layout: LayoutType;
  sources: IEventSource[];
  dateRange: DateRangeKey;
  maxEvents: number;
  height: number;
  autoplay: boolean;
  showDateFilter: boolean;
  seeAllUrl: string;
  display: IDisplayOptions;
  theme: Theme;
  dir: 'ltr' | 'rtl';
  /** BCP 47 tag including calendar / numbering extensions. */
  locale: string;
  service: EventService;
  /** Opens the property pane; only provided in edit mode. */
  onConfigure?: () => void;
}
