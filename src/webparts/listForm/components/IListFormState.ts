import { IFieldSchema } from '../../../common/services/datatypes/RenderListData';


export interface IListFormState {
  isLoadingSchema: boolean;
  isLoadingData: boolean;
  isSaving: boolean;
  fieldsSchema?: IFieldSchema[];
  data: any;
  originalData: any;
  errors: string[];
  fieldErrors: {[fieldName: string]: string};
}
