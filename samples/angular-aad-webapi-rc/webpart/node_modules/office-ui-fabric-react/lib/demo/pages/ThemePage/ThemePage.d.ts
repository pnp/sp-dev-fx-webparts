import * as React from 'react';
import { DetailsList } from '../../../index';
import './ThemePage.scss';
export declare class ThemePage extends React.Component<any, any> {
    refs: {
        [key: string]: React.ReactInstance;
        list: DetailsList;
    };
    constructor();
    render(): JSX.Element;
    private _onSwatchClicked(item, index, ev);
    private _onColorChanged(index, newColor);
    private _onPickerDismiss();
}
