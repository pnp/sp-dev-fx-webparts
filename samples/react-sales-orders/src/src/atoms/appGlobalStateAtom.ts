import { atom } from 'jotai';

import { IAppGlobalState } from '../models/IAppGlobalState';

export const appGlobalStateAtom =  atom<IAppGlobalState>({}   as IAppGlobalState);
