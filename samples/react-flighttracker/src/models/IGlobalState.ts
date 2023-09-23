import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

import { EInformationType } from '../constants/EInformationType';
import { IAirport } from './IAirport';

export interface IGlobalState {
  isDarkTheme: boolean;
  hasTeamsContext: boolean;
  context: WebPartContext;
  currentTheme: IReadonlyTheme | undefined;
  selectedAirPort:IAirport;
  selectedDate:Date;
  selectedTime:Date;
  selectedInformationType: EInformationType;
  numberItemsPerPage: number;
  currentPage: number;
  isScrolling: boolean;
  hasMore: boolean;
  webpartContainerWidth: number;
  itemHeight:number;

}
