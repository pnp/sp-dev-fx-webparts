import { atom } from 'jotai';

import { IFlights } from '../../models/IFlights';

export const flightsState = atom<IFlights>({} as IFlights);
