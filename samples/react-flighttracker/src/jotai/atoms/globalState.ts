import { atom } from 'jotai';

import { EInformationType } from '../../constants/EInformationType';
import { IGlobalState } from '../../models/IGlobalState';

export const globalState = atom<IGlobalState>({
    isDarkTheme: false,
    hasTeamsContext: false,
    context: undefined,
    currentTheme: undefined,
    selectedAirPort: undefined,
    selectedDate: new Date(),
    selectedTime: new Date(),
    selectedInformationType: EInformationType.DEPARTURES,
    numberItemsPerPage: 7,
    currentPage: 0,
    isScrolling: false,
    hasMore: true,
    webpartContainerWidth: 0,
    itemHeight:87

});
