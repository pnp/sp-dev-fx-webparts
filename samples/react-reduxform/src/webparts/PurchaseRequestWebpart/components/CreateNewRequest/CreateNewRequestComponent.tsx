import * as React from 'react';
import { INewFormState } from '../../state/INewFormControlsState';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IPurchaseRequestWebpartProps } from '../PurchaseRequestWebpart/IPurchaseRequestWebpartProps';
import { GetInitialControlValuesAction, CreateNewPurchaseRequest } from '../../actions/NewFormControlsValuesAction';
import { Dropdown, IDropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Field, reduxForm, InjectedFormProps, FieldArray, WrappedFieldArrayProps, BaseFieldArrayProps } from 'redux-form';
import pnp from 'sp-pnp-js';
import { renderDropDown, renderInput } from '../Redux-Form-CustomComponents/FieldRenderers';

// Connected state
interface INewFormConnectedState{

    // Represents a purchase request and the data from the form.
    newFormControlValues : INewFormState;

    // Represents the initial values. << Unused now. Useful for edit item feature >>
    initialValues:any;
}

// Represents the connected dispatch
interface INewFormConnectedDispatch{

    // Gets the options for dropdown fields
    getDefaultControlsData:() => void;

    createNewPurchaseRequest:(purchaseRequestData:INewFormState, siteUrl:string) => void;
}

// Validations for the redux form
const required = value => (value ? undefined : ' *');
const number = value =>
value && isNaN(Number(value)) ? ' Invalid value' : undefined;


// Represents the repeating purchase items component. 
// Used in "NewRequestComponent" react component below along with "FieldsArray" from redux-form.
// Renders custom input component with validations
class PurchaseItemsComponent extends React.Component<WrappedFieldArrayProps<any>,{}>{

    public render(){
        return(
            <div>
                <button type="button" onClick={() => this.props.fields.push({})}>Add purchase item</button>
                {this.props.fields.map((purchaseItem, index) =>
                <tr>
                    <div>
                        <h4>Item {index + 1}</h4>
                        <td>
                            <Field name={`${purchaseItem}.productCode`} type="text" component={renderInput} placeholder="Product code" validate={[required]}/>
                        </td>
                        <td>
                            <Field name={`${purchaseItem}.quantity`} type="text" component={renderInput} placeholder="Quantity" validate={[required,number]}/>
                        </td>
                        <td>
                            <Field name={`${purchaseItem}.ratePerUnit`} type="text" component={renderInput} placeholder="Price per unit" validate={[required,number]}/>
                        </td>
                        <td>
                            <Field name={`${purchaseItem}.totalCost`} type="text" component={renderInput} placeholder="Total Cost" validate={[required,number]}/>
                        </td>
                        <td>
                            <button type="button" title="Remove Item" onClick={() => this.props.fields.remove(index)}>Remove item</button>
                        </td>
                    </div>
                </tr>
                )}
          </div>
        );
    }

}

class NewRequestComponent extends React.Component<INewFormConnectedState & INewFormConnectedDispatch & IPurchaseRequestWebpartProps & InjectedFormProps<{}, INewFormConnectedState>>{
    
    constructor(props){
        super(props);
    }
 
    public render(){

        return(
            
          <div>
           {/* Sent the props as well to the SubmitForm handler to use the Connected Dispatch. Renders custom dropdown component with validation*/}
           <form onSubmit={this.props.handleSubmit(((values)=>this.SubmitForm(values,this.props)))}>
                <div>
                    <Field component={renderDropDown} label="Purchased for : " name="purchasedFor" validate={required}>
                        <option key='' value=''></option>
                        {this.props.newFormControlValues.purchasedForOptions.map(purchasedFor => {return <option key={purchasedFor} value={purchasedFor}>{purchasedFor}</option>})};
                    </Field>
                </div>
                <br/>
                <div>
                    <Field component={renderDropDown} label="Type of purchase request : " name="typeOfPurchaseRequest" validate={required}>
                        <option key='' value=''></option>
                        {this.props.newFormControlValues.typeOfPurchaseRequestOptions.map(typeOfPr => {return <option key={typeOfPr} value={typeOfPr}>{typeOfPr}</option>})}    ;
                    </Field>
                </div>
                <br/>
                <table>
                    <FieldArray name="purchaseItems" component={PurchaseItemsComponent}/>
                </table>
                <br/>
                <button type="submit" disabled={this.props.submitting}>Create purchase request</button>
                <br/>
            </form>
            
          </div>
        );
    }
   
    // Handles the submit form.
    SubmitForm(values, props){

        let purchaseRequestData = {} as INewFormState;
        purchaseRequestData = values;
        purchaseRequestData.purchasedForOptions = props.newFormControlValues.purchasedForOptions;
        purchaseRequestData.typeOfPurchaseRequestOptions = props.newFormControlValues.typeOfPurchaseRequestOptions;
        
        // Call the connected dispatch to create new purchase request
        props.createNewPurchaseRequest(purchaseRequestData,props.siteUrl);
    }


    componentDidMount(){
        this.props.getDefaultControlsData();
    }
}

// Maps the State to props
const mapStateToProps = (state) : INewFormConnectedState => {

    // Includes the initialValues property to load the form with initial values
    return{
        newFormControlValues : state.NewFormControlValues,
        initialValues : state.NewFormControlValues
    };
};

// Maps dispatch to props
const mapDispatchToProps = (dispatch):INewFormConnectedDispatch => {
    return{
        getDefaultControlsData:() => {
            return dispatch(GetInitialControlValuesAction());
        },
        createNewPurchaseRequest:(purchaseRequestData:INewFormState, siteUrl:string) => {
            return dispatch(CreateNewPurchaseRequest(purchaseRequestData,siteUrl));
        }
    };
};


export default connect(mapStateToProps,mapDispatchToProps)(
    reduxForm<{},INewFormConnectedState>(
        {
            form:'NewPurchaseRequestForm',
            destroyOnUnmount:false,

            // Reinitializes when the state changes. << Unused at the moment. Useful in edit item feature >>
            enableReinitialize:true
        }
    )(NewRequestComponent)
);
