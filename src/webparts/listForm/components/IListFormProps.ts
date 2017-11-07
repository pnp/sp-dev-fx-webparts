import { IWebPartContext} from '@microsoft/sp-webpart-base';
import { ControlMode } from '../../../common/datatypes/ControlMode';
import { IFieldConfiguration } from './IFieldConfiguration';

export interface IListFormProps {
  title: string;
  description?: string;
  listUrl: string;
  formType: ControlMode;
  id?: number;
  fields?: IFieldConfiguration[];
  spContext: IWebPartContext;
  inDesignMode?: boolean;
  onSubmitSucceeded?(id: number): void;
  onSubmitFailed?(fieldErrors: any): void;
  onUpdateFields?(newFields: IFieldConfiguration[]): void;
}
