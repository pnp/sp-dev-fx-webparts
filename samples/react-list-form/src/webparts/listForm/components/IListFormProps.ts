import { SPHttpClient } from '@microsoft/sp-http';
import { ControlMode } from '../../../common/datatypes/ControlMode';
import { IFieldConfiguration } from './IFieldConfiguration';

export interface IListFormProps {
  title: string;
  description?: string;
  webUrl: string;
  listUrl: string;
  formType: ControlMode;
  id?: number;
  fields?: IFieldConfiguration[];
  spHttpClient: SPHttpClient;
  inDesignMode?: boolean;
  showUnsupportedFields?: boolean;
  onSubmitSucceeded?(id: number): void;
  onSubmitFailed?(fieldErrors: any): void;
  onUpdateFields?(newFields: IFieldConfiguration[]): void;
}
