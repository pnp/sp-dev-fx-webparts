import spservice from './../../../../services/spservices';
import { ITaskExternalReference } from '../../../../services/ITaskExternalReference';
import { ITaskDetails } from '../../../../services/ITaskDetails';

export interface IAttachmentsProps {
  spservice: spservice;
  groupId: string;
  taskDetails: ITaskDetails;

}
