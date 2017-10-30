import { IWebPartContext} from '@microsoft/sp-webpart-base';
import { ControlMode } from '../../../common/datatypes/ControlMode';

export interface IListFormProps {
  description: string;
  listUrl: string;
  formType: ControlMode;
  id?: number;
  fields?: string[];
  spContext: IWebPartContext;
  onSubmitSucceeded?(id: number): void;
  onSubmitFailed?(fieldErrors: any): void;
  onUpdateFields?(newFields: string[]): void;
}
