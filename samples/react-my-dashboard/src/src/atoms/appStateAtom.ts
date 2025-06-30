import { atom } from 'jotai';

import { IAppState } from '../models/IAppState';

export const appStateAtom =  atom<IAppState>({} as IAppState);