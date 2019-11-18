import { ITask} from './../../../../services/ITask';
export interface IMyTasksState {
  tasks: ITask[];
  isloading: boolean;
  currentFilter: number;
  currentFilterLabel:string;
  hasError: boolean;
  errorMessage: string;
  hasMoreTasks: boolean;
  showDialog:boolean;
}
