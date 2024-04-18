import { IDropdownOption } from '@fluentui/react';

export interface IAsyncDropdownState {
    processed: boolean;
    options: IDropdownOption[];
    selectedKey: string | number;
    error: string;
}
