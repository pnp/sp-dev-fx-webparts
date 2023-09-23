import { atom } from 'jotai';

import { IAirlines } from '../../models/IAirlines';

export const airlineState = atom<IAirlines>({} as IAirlines);
