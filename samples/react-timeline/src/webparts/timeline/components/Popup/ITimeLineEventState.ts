import { ITimelineActivity } from '../../../../models/ITimelineActivity';
import { DayOfWeek} from 'office-ui-fabric-react/lib/DatePicker';
import {  IDropdownOption } from 'office-ui-fabric-react/';
export interface IEventState {
  showPanel: boolean;
  eventData: ITimelineActivity;  
  startSelectedHour: IDropdownOption ;
  startSelectedMin: IDropdownOption ;
  activityTitle: string;
  activityLink: string;
  acivityDate: Date;
  activityPictureUrl: string;
  activityDescription: string; 
  errorMessage?:string;
  hasError?:boolean;
  disableButton?: boolean;
  isSaving?:boolean;
  isDeleting?:boolean;
  displayDialog:boolean;  
  isloading:boolean;  
}
