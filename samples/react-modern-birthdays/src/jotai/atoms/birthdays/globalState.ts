import { atom } from 'jotai';

import { IGlobalState } from '../../../models/birthdays';

export const globalState = atom<IGlobalState>({
  isLoading:true,
  error: undefined,
  hasError: false,
} as IGlobalState);
