import { ITaskCheckListItem} from './ITaskCheckListItem';
import { ITaskExternalReference } from './ITaskExternalReference';
export interface ITaskDetails {
  "@odata.context":string;
  "@odata.etag":string;
  checklist: ITaskCheckListItem[];
  description: string;
  id: string;
  previewType: string;
  references: ITaskExternalReference;
}


