import * as React                   from 'react';
import { clone }                    from '@microsoft/sp-lodash-subset';
import { Text }                     from '@microsoft/sp-core-library';
import { Spinner, Label, Checkbox } from 'office-ui-fabric-react';
import { IAsyncChecklistProps }     from './IAsyncChecklistProps';
import { IAsyncChecklistState }     from './IAsyncChecklistState';
import { IChecklistItem }           from './IChecklistItem';
import styles                       from './AsyncChecklist.module.scss';

export class AsyncChecklist extends React.Component<IAsyncChecklistProps, IAsyncChecklistState> {

    /*************************************************************************************
     * Stores the checked items 
     *************************************************************************************/
    private checkedItems: string[];


    /*************************************************************************************
     * Component's constructor
     *************************************************************************************/
    constructor(props: IAsyncChecklistProps, state: IAsyncChecklistState) {
        super(props);

        this.state = { loading: true, items: [], error: null };
        this.checkedItems = this.getDefaultCheckedItems();
    }


    /*************************************************************************************
     * Gets the default checked items
     *************************************************************************************/
    private getDefaultCheckedItems() {
        return  this.props.checkedItems ? clone(this.props.checkedItems) : new Array<string>();
    }


    /*************************************************************************************
     * When a checkbox changes within the checklist
     * @param ev : The React.FormEvent object which contains the element that has changed
     * @param checked : Whether the checkbox is not checked or not
     *************************************************************************************/
    private onCheckboxChange(ev?: React.FormEvent<HTMLInputElement>, checked?: boolean) {
        let checkboxKey = ev.currentTarget.attributes.getNamedItem('value').value;
        let itemIndex = this.checkedItems.indexOf(checkboxKey);

        if(checked) {
            if(itemIndex == -1) {
                this.checkedItems.push(checkboxKey);
            }
        }
        else {
            if(itemIndex >= 0) {
                this.checkedItems.splice(itemIndex, 1);
            }
        }

        if(this.props.onChange) {
            this.props.onChange(this.checkedItems);
        }
    }


    /*************************************************************************************
     * Returns whether the checkbox with the specified ID should be checked or not
     * @param checkboxId 
     *************************************************************************************/
    private isCheckboxChecked(checkboxId: string) {
        return (this.checkedItems.filter((checkedItem) => { return checkedItem.toLowerCase().trim() == checkboxId.toLowerCase().trim(); }).length > 0);
    }


    /*************************************************************************************
     * Loads the checklist items asynchronously
     *************************************************************************************/
    private loadItems() {
        let _this_ = this;

        _this_.checkedItems = this.getDefaultCheckedItems();

        this.setState({
            loading: true,
            items: new Array<IChecklistItem>(),
            error: null
        });

        this.props.loadItems().then((items: IChecklistItem[]) => {
            _this_.setState((prevState: IAsyncChecklistState, props: IAsyncChecklistProps): IAsyncChecklistState => {
                prevState.loading = false;
                prevState.items = items;
                return prevState;
            });
        })
        .catch((error: any) => {
            _this_.setState((prevState: IAsyncChecklistState, props: IAsyncChecklistProps): IAsyncChecklistState => {
                prevState.loading = false;
                prevState.error = error;
                return prevState;
            });
        });
    }


    /*************************************************************************************
     * Called once after initial rendering
     *************************************************************************************/
    public componentDidMount(): void {
        this.loadItems();
    }


    /*************************************************************************************
     * Called immediately after updating occurs
     *************************************************************************************/
    public componentDidUpdate(prevProps: IAsyncChecklistProps, prevState: {}): void {
        if (this.props.disable !== prevProps.disable || this.props.stateKey !== prevProps.stateKey) {
            this.loadItems();
        }
    }


    /*************************************************************************************
     * Renders the the QueryFilter component
     *************************************************************************************/
    public render() {
        const loading = this.state.loading ? <Spinner label={this.props.strings.loading} /> : <div />;
        const error = this.state.error != null ? <div className="ms-TextField-errorMessage ms-u-slideDownIn20">{ Text.format(this.props.strings.errorFormat, this.state.error) }</div> : <div />;

        const checklistItems = this.state.items.map((item, index) => {
            return (
                <Checkbox id={ item.id }
                          label={ item.label }
                          defaultChecked={ this.isCheckboxChecked(item.id) }
                          disabled={ this.props.disable }
                          onChange={ this.onCheckboxChange.bind(this) }
                          inputProps={ { value: item.id } }
                          className={ styles.checklistItem }
                          key={ index } />
            );
        });

        return (
            <div className={ styles.checklist }>
                
                <Label>{ this.props.strings.label }</Label>

                { loading }

                { !this.state.loading && 
                    <div className={ styles.checklistItems }>
                        <div className={ styles.checklistPadding }>{ checklistItems }</div>
                    </div>
                }

                { error }
            </div>
        );
    }
}
