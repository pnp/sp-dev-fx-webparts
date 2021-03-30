import { IBaseItem } from './IBaseItem';

export interface IBaseLookupItem extends IBaseItem {
    name: string;
    sortOrder?: number;
    showInUI?: boolean;
}
