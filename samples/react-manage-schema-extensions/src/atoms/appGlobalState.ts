import { IAppGlobalState } from '../models/IAppGlobalState';
import { atom } from 'jotai';

export const appGlobalStateAtom = atom<IAppGlobalState>({} as unknown as IAppGlobalState);