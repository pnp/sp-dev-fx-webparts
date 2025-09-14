import { CustomActionScope } from '../../models';

export interface ICustomActionManagerWebPartProps {
  title: string;
  description: string;
  defaultScope: CustomActionScope;
  pageSize: number;
  enableSearch: boolean;
  enableFiltering: boolean;
  enableCRUD: boolean;
  showAdvancedProperties: boolean;
}