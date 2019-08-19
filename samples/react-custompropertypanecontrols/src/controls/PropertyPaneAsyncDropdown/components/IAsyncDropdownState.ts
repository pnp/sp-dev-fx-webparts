import { IDropdownOption } from 'office-ui-fabric-react';

export interface IAsyncDropdownState {
  loading: boolean;
  options: IDropdownOption[];
  error: string;
}