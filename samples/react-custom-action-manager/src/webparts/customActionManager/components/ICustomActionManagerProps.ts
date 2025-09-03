import { WebPartContext } from '@microsoft/sp-webpart-base';
import { CustomActionScope } from '../../../models';

export interface ICustomActionManagerProps {
  title: string;
  description: string;
  context: WebPartContext;
  defaultScope: CustomActionScope;
  pageSize: number;
  enableSearch: boolean;
  enableFiltering: boolean;
  enableCRUD: boolean;
  showAdvancedProperties: boolean;
}