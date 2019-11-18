import spservice from '../../services/spservices';
import { IFile } from '../../webparts/myTasks/components/Attachments/IFile';
import { ITaskExternalReference } from '../../services/ITaskExternalReference';
export interface IUploadFromSharePointProps {
  spservice: spservice;
  onSelectedFile?: (file:IFile) => void;
  groupId:string;
  displayDialog: boolean;
  onDismiss: () => void;
  currentReferences: ITaskExternalReference;
}
