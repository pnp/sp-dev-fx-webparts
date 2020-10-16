import { ControlMode } from '../datatypes/ControlMode';
import { IFieldSchema } from './datatypes/RenderListData';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IListFormService {
    getFieldSchemasForForm: (webUrl: string, listUrl: string, formType: ControlMode) => Promise<IFieldSchema[]>;
    getLookupfieldOptions: (fieldSchema: any, webUrl: string) => Promise<any[]>;
    getLookupfieldsOnList: (listUrl: string, webUrl: string, formType: ControlMode) => Promise<any[]>;
    getDataForForm: (webUrl: string, listUrl: string, itemId: number, formType: ControlMode) => Promise<any>;
    getExtraFieldData(data: any, fieldSchema: any, ctx: IWebPartContext, siteUrl: string);
    updateItem: (webUrl: string, listUrl: string, itemId: number,
        fieldsSchema: IFieldSchema[],
        data: any, originalData: any) => Promise<any>;
    createItem: (webUrl: string, listUrl: string, fieldsSchema: IFieldSchema[], data: any) => Promise<any>;
}
