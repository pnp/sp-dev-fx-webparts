import * as React                               from 'react';
import { Text }                                 from '@microsoft/sp-core-library';
import { Dropdown, IDropdownOption, Spinner }   from 'office-ui-fabric-react';
import { IAsyncDropdownProps }                  from './IAsyncDropdownProps';
import { IAsyncDropdownState }                  from './IAsyncDropdownState';
import { cloneDeep }                            from '@microsoft/sp-lodash-subset';

export class AsyncDropdown extends React.Component<IAsyncDropdownProps, IAsyncDropdownState> {


    /*************************************************************************************
     * Component's constructor
     * @param props 
     * @param state 
     *************************************************************************************/
    constructor(props: IAsyncDropdownProps, state: IAsyncDropdownState) {
        super(props);

        this.state = {
            processed: false,
            options: new Array<IDropdownOption>(),
            selectedKey: props.selectedKey,
            error: null
        };
    }


    /*************************************************************************************
     * Called once after initial rendering
     *************************************************************************************/
    public componentDidMount(): void {
        this.loadOptions();
    }


    /*************************************************************************************
     * Called immediately after updating occurs
     *************************************************************************************/
    public componentDidUpdate(prevProps: IAsyncDropdownProps, prevState: IAsyncDropdownState): void {
        if (this.props.disabled !== prevProps.disabled || this.props.stateKey !== prevProps.stateKey) {
            this.loadOptions();
        }
    }


    /*************************************************************************************
     * Loads the dropdown options asynchronously
     *************************************************************************************/
    private loadOptions(): void {
        this.setState({
            processed: false,
            error: null,
            options: new Array<IDropdownOption>(),
            selectedKey: null
        });

        this.props.loadOptions().then((options: IDropdownOption[]) => {
            this.setState({
                processed: true,
                error: null,
                options: options,
                selectedKey: this.props.selectedKey
            });
        })
        .catch((error: any) => {
            this.setState((prevState: IAsyncDropdownState, props: IAsyncDropdownProps): IAsyncDropdownState => {
                prevState.processed = true;
                prevState.error = error;
                return prevState;
            });
        });
    }


    /*************************************************************************************
     * Temporary fix because of an issue introducted in office-ui-fabric-react 4.32.0 :
     * https://github.com/OfficeDev/office-ui-fabric-react/issues/2719
     * Issue has been resolved but SPFX still refers to 4.32.0, so this is a temporary fix
     * while waiting for SPFX to use a more recent version of office-ui-fabric-react
     *************************************************************************************/
    private onChanged(option: IDropdownOption, index?: number): void {

        // reset previously selected options
        const options: IDropdownOption[] = this.state.options;
        options.forEach((o: IDropdownOption): void => {
            if (o.key !== option.key) {
                o.selected = false;
            }
        });
        this.setState((prevState: IAsyncDropdownState, props: IAsyncDropdownProps): IAsyncDropdownState => {
            prevState.options = options;
            prevState.selectedKey = option.key;
            return prevState;
        });
        if (this.props.onChanged) {
            this.props.onChanged(option, index);
        }
    }


    /*************************************************************************************
     * Renders the the AsyncDropdown component
     *************************************************************************************/
    public render() {
        
        const loading = !this.state.processed ? <Spinner label={this.props.loadingLabel} /> : <div />;
        const error = this.state.error != null ? <div className="ms-TextField-errorMessage ms-u-slideDownIn20">{ Text.format(this.props.errorLabelFormat, this.state.error) }</div> : <div />;

        return (
            <div>
                <Dropdown label={this.props.label}
                          isDisabled={this.props.disabled}
                          onChanged={this.onChanged.bind(this)}
                          selectedKey={this.state.selectedKey}
                          options={this.state.options} />

                {loading}
                {error}
            </div>
        );
    }
}
