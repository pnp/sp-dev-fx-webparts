import * as React                               from 'react';
import { Text }                                 from '@microsoft/sp-core-library';
import { Dropdown, IDropdownOption, Spinner }   from 'office-ui-fabric-react';
import { IAsyncDropdownProps }                  from './IAsyncDropdownProps';
import { IAsyncDropdownState }                  from './IAsyncDropdownState';

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
            options: new Array<IDropdownOption>()
        });

        this.props.loadOptions().then((options: IDropdownOption[]) => {
            this.setState({
                processed: true,
                error: null,
                options: options
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
     * Renders the the AsyncDropdown component
     *************************************************************************************/
    public render() {
        
        const loading = !this.state.processed ? <Spinner label={this.props.loadingLabel} /> : <div />;
        const error = this.state.error != null ? <div className="ms-TextField-errorMessage ms-u-slideDownIn20">{ Text.format(this.props.errorLabelFormat, this.state.error) }</div> : <div />;

        return (
            <div>
                <Dropdown label={this.props.label}
                          isDisabled={this.props.disabled}
                          onChanged={this.props.onChanged}
                          selectedKey={this.props.selectedKey}
                          options={this.state.options} />

                {loading}
                {error}
            </div>
        );
    }
}
