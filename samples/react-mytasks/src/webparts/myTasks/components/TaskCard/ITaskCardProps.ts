import { ITask} from './../../../../services/ITask';
import spservice from './../../../../services/spservices';
export interface ITaskCardProps {
 task: ITask;
 spservice: spservice;
 refreshList?: (refresh: boolean) => void;
}
