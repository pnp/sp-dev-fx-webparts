import { IDropdownOption } from 'office-ui-fabric-react';

export interface IAsyncDropdownState {
    processed: boolean;
    options: IDropdownOption[];
    error: string;
}