import * as React from 'react';

import { Stack } from 'office-ui-fabric-react/lib/Stack';

import {
  FlightAirportOptions,
} from '../FlightAirportOptions/FlightAirportOptions';

export interface IFlightSelectorProps { }

export const FlightSelector: React.FunctionComponent<IFlightSelectorProps> = (
  props: React.PropsWithChildren<IFlightSelectorProps>
) => {

  return (
    <>
      <Stack  >
          <FlightAirportOptions />
      </Stack>
    </>
  );
};
