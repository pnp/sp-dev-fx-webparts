import { atom } from 'recoil';

import { IAirlines } from '../../models/IAirlines';

export const airlineState = atom<IAirlines>({
  key: "airlinesState",
  default:  {} as IAirlines,
});
