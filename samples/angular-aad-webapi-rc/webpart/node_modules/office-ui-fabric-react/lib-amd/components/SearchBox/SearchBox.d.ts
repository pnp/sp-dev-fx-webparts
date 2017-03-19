import { ISearchBoxProps } from './SearchBox.Props';
import { BaseComponent } from '../../Utilities';
import './SearchBox.scss';
export interface ISearchBoxState {
    value?: string;
    hasFocus?: boolean;
    id?: string;
}
export declare class SearchBox extends BaseComponent<ISearchBoxProps, ISearchBoxState> {
    static defaultProps: ISearchBoxProps;
    private _rootElement;
    private _inputElement;
    constructor(props: ISearchBoxProps);
    componentWillReceiveProps(newProps: ISearchBoxProps): void;
    render(): JSX.Element;
    private _onClearClick(ev?);
    private _onFocusCapture(ev);
    private _onKeyDown(ev);
    private _onInputChange(ev);
    private _handleDocumentFocus(ev);
    private _callOnChange(newValue);
}
