import { IFieldInfo } from '../models/IFieldInfo';
import { ICamlCondition } from '../models/ICamlCondition';

export interface ICamlQueryBuilderProps {
  fields: IFieldInfo[];
  onGenerateQuery: (queryXml: string) => void;
  initialConditions?: ICamlCondition[];
}