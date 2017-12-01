import { ControlMode } from '../../common/datatypes/ControlMode';
import { IFieldConfiguration } from './components/IFieldConfiguration';

export interface IListFormWebPartProps {
  title: string;
  description: string;
  listUrl: string;
  formType: ControlMode;
  itemId?: string;
  showUnsupportedFields: boolean;
  redirectUrl?: string;
  fields?: IFieldConfiguration[];
}
