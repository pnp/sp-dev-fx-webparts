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
  showTitleColumn?: boolean;
  showLocationColumn?: boolean;
  showSiteColumn?: boolean;
  showScopeColumn?: boolean;
  showComponentColumn?: boolean;
  showSequenceColumn?: boolean;
  showDescriptionColumn?: boolean;
  columnOrder?: string;
  columnConfiguration?: string;
}
