import { ControlMode } from '../../common/datatypes/ControlMode';

export interface IListFormWebPartProps {
  description: string;
  listUrl: string;
  formType: ControlMode;
  itemId?: number;
  fields?: string;
}
