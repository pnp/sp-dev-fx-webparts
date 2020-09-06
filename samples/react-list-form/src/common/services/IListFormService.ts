import { ControlMode } from '../datatypes/ControlMode';
import { IFieldSchema } from './datatypes/RenderListData';

export interface IListFormService {
    getFieldSchemasForForm: (webUrl: string, listUrl: string, formType: ControlMode) => Promise<IFieldSchema[]>;
    getDataForForm: (webUrl: string, listUrl: string, itemId: number, formType: ControlMode) => Promise<any>;
    updateItem: (webUrl: string, listUrl: string, itemId: number,
        fieldsSchema: IFieldSchema[],
        data: any, originalData: any) => Promise<any>;
    createItem: (webUrl: string, listUrl: string, fieldsSchema: IFieldSchema[], data: any) => Promise<any>;
}
