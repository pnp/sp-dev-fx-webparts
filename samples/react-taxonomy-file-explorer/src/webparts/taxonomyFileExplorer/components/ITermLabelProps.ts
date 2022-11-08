import { IFileItem } from "../../../model/IFileItem";
import { ITermNode } from "../../../model/ITermNode";

export interface ITermLabelProps {
    node: ITermNode;
    selectedNode: string;
    collapseAll: boolean;
    expandAll: boolean;
    renderFiles: (files: IFileItem[]) => void;
    resetChecked: (s: string) => void;
    addTerm: (file: IFileItem, newValue: string) => void;
    replaceTerm: (file: IFileItem, newValue: string) => void;
    copyFile: (file: IFileItem, newValue: string) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    uploadFile: (file: any, newValue: string) => void;
}