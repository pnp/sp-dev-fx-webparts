import { IComboBoxOption } from '@fluentui/react';
export interface ICategoryProps {
    catogries: IComboBoxOption[];
    selectedCategories: IComboBoxOption[];
    onChangeCategories: (onChangeCategories: IComboBoxOption[]) => void;
 
}
export interface ICategoryState {
    selectedKeys: string[];
}