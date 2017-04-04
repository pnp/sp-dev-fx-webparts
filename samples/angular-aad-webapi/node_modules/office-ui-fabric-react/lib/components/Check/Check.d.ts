import * as React from 'react';
import './Check.scss';
export interface ICheckProps extends React.Props<Check> {
    /**
     * Whether or not this menu item is currently checked.
     * @defaultvalue false
     */
    checked?: boolean;
    /**
     * @deprecated
     * Deprecated at v.65.1 and will be removed by v 1.0. Use 'checked' instead.
     */
    isChecked?: boolean;
}
export declare class Check extends React.Component<ICheckProps, {}> {
    static defaultProps: {
        isChecked: boolean;
    };
    shouldComponentUpdate(newProps: ICheckProps): boolean;
    render(): JSX.Element;
}
