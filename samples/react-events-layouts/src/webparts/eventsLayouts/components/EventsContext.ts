import * as React from 'react';
import { IDisplayOptions } from '../models';
import { createFormatter, IEventFormatter } from '../common/formatter';

export interface IEventsContext {
  formatter: IEventFormatter;
  display: IDisplayOptions;
  dir: 'ltr' | 'rtl';
}

/** Values every layout needs: locale-aware formatting, display switches and text direction. */
export const EventsContext: React.Context<IEventsContext> = React.createContext<IEventsContext>({
  formatter: createFormatter('en-US', 'All day'),
  display: {
    titleLines: 2,
    descriptionLines: 2,
    showDescription: true,
    showLocation: true,
    showOrganizer: false,
    showCategory: true,
    showImage: true
  },
  dir: 'ltr'
});

export const useEventsContext = (): IEventsContext => React.useContext(EventsContext);
