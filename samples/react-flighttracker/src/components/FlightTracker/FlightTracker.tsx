import * as React from 'react';

import { Provider } from 'jotai';

import {
  EnhancedThemeProvider,
} from '@pnp/spfx-controls-react/lib/EnhancedThemeProvider';

import { FlightTrackerControl } from './FlightTrackerControl';
import { IFlightTrackerProps } from './IFlightTrackerProps';

export const FlightTracker: React.FunctionComponent<IFlightTrackerProps> = (
  props: React.PropsWithChildren<IFlightTrackerProps>
) => {
  const { currentTheme } = props;
  return (
    <EnhancedThemeProvider context={props.context} theme={currentTheme}>
      <section>
        <Provider>
          <FlightTrackerControl {...props} />
        </Provider>
      </section>
    </EnhancedThemeProvider>
  );
};
