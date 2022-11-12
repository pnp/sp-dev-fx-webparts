import { atom } from 'recoil';

import { IFlights } from '../../models/IFlights';

export const flightsState = atom<IFlights>({
  key: "flightsListState",
  default:  {departures: [], arrivals: []},
});
