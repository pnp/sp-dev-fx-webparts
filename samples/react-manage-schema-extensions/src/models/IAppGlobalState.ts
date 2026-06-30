import { IManageSchemaExtensionsProps } from '../components/ManageSchemaExtensions/IManageSchemaExtensionsProps';

export interface IAppGlobalState extends Partial<IManageSchemaExtensionsProps> {
  
  isLoading?: boolean;
  error?: string;
}