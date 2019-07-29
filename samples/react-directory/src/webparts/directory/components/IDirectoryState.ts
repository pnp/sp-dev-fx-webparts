import { IProfileProperties}  from './../../../SPServices/IProfileProperties';
import { PeoplePickerEntity } from '@pnp/pnpjs';
export interface IDirectoryState {
  users:PeoplePickerEntity[];
  isLoading: boolean;
  errorMessage:string;
  hasError:boolean;

}
