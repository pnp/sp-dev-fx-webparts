import { ITaskList } from '../../models/ICommonObjects';
/**
 * This interface describes the serialized properties of the webpart 
 */
export interface ITodoWebPartProps {

  /**
   * Represents the selected Task list 
   */
  SelectedList: ITaskList;

}
