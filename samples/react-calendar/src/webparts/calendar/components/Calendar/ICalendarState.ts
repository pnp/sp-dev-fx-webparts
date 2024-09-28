import { IPanelModelEnum} from '../../../../controls/Event/IPanelModeEnum';
import { IEventData } from './../../../../services/IEventData';
import { IComboBoxOption } from '@fluentui/react';
export interface ICalendarState {
  showDialog: boolean;
  categories: IComboBoxOption[];
  selectedCategories: IComboBoxOption[];
  eventData:  IEventData[];
  selectedEvent: IEventData;
  panelMode?: IPanelModelEnum;
  startDateSlot?: Date;
  endDateSlot?:Date;
  isloading: boolean;
  hasError: boolean;
  errorMessage: string;
}
