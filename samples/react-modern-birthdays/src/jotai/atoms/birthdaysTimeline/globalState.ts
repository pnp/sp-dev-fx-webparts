import { atom } from 'jotai';

import { IGlobalState } from '../../../models/birthdaysTimeline';

export const globalState = atom<IGlobalState>({
  isLoading:true,
  error: undefined,
  hasError: false,
  selectedUser: undefined,
} as IGlobalState);
