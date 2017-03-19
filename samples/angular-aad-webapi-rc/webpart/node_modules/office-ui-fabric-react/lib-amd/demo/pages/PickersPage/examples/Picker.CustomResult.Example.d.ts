import * as React from 'react';
import { IDocumentCardActionsProps, IDocumentCardPreviewProps, IDocumentCardProps, IDocumentCardTitleProps, IDocumentCardActivityProps, IBasePickerProps } from '../../../../index';
import { BasePicker } from '../../../../components/pickers/BasePicker';
import { IPickerItemProps } from '../../../../components/pickers/PickerItem.Props';
import './Picker.CustomResult.Example.scss';
export interface IPeoplePickerExampleState {
    contextualMenuVisible?: boolean;
    contextualMenuTarget?: HTMLElement;
}
export interface IFullDocumentCardProps {
    documentCardProps?: IDocumentCardProps;
    documentActionsProps?: IDocumentCardActionsProps;
    documentPreviewProps?: IDocumentCardPreviewProps;
    documentActivityProps?: IDocumentCardActivityProps;
    documentTitleProps?: IDocumentCardTitleProps;
}
export interface IDocumentPickerProps extends IBasePickerProps<IFullDocumentCardProps> {
}
export declare const SuggestedDocumentItem: (documentProps: IFullDocumentCardProps) => JSX.Element;
export declare const SuggestedBigItem: (documentProps: IFullDocumentCardProps) => JSX.Element;
export declare const SelectedDocumentItem: (documentProps: IPickerItemProps<IFullDocumentCardProps>) => JSX.Element;
export declare class PickerCustomResultExample extends React.Component<any, IPeoplePickerExampleState> {
    constructor();
    render(): JSX.Element;
    private _onFilterChanged(filterText, items);
    private _listContainsDocument(document, items);
}
export declare class DocumentPicker extends BasePicker<IFullDocumentCardProps, IDocumentPickerProps> {
    render(): JSX.Element;
    protected _onBackspace(ev: React.KeyboardEvent<HTMLElement>): void;
}
