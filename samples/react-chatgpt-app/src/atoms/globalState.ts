import { atom } from 'jotai';

import { IGlobalState } from '../models/IGlobalState';

export const globalState = atom<IGlobalState>({} as IGlobalState);
