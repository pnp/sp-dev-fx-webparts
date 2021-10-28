import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { IFAQList } from '../../_helpers/listModel';

export interface IQuestionsModalState {
  questions: IFAQList[];
  openQuestionsModal: boolean;
  columns: IColumn[];
  titleCategory: string;
}