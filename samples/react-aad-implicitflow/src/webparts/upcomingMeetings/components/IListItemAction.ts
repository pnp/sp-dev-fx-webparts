import { IMeeting } from './IMeeting';

export interface IListItemAction {
  icon: string;
  item: IMeeting;
  action: () => void;
}