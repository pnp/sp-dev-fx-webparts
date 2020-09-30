import { ITask} from './../../../../services/ITask';
import spservice from './../../../../services/spservices';
export interface INewTaskProps{
  spservice: spservice;
  displayDialog:boolean;
  onDismiss: (refresh:boolean) => void;
}
