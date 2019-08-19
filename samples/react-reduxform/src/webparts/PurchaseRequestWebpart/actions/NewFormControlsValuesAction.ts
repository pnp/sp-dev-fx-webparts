import { INewFormState } from '../state/INewFormControlsState';
import NewPurchaseRequestService from '../services/NewPurchaseRequestService';

// The file contains actions for the NewPurchaseRequestReducer

// Gets the choices for dropdown fields in the new form. The values are fetched from the choice field options.
export function GetInitialControlValuesAction(){

     return dispatch => {
       
        let newPurchaseRequestServiceObj:NewPurchaseRequestService = new NewPurchaseRequestService();
        let formControlsState = {purchasedForOptions:[],typeOfPurchaseRequestOptions:[]} as INewFormState;

        newPurchaseRequestServiceObj.getNewFormControlsState().then((resp:INewFormState) => {

            formControlsState.purchasedForOptions = resp.purchasedForOptions;
            formControlsState.typeOfPurchaseRequestOptions = resp.typeOfPurchaseRequestOptions;

            dispatch({
                type:"GET_DEFAULT_CONTROL_VALUES",
                payload:formControlsState
            });
        });
    };
}


// Creates a new purchase request.
export function CreateNewPurchaseRequest(purchaseRequestData:INewFormState, siteUrl){
    return dispatch => {
        
        let newPurchaseRequestServiceObj:NewPurchaseRequestService = new NewPurchaseRequestService();

        newPurchaseRequestServiceObj.createNewPurchaseRequest(purchaseRequestData,siteUrl).then(response =>{
            alert("Purchase request created...");
        }).catch(()=>{
            alert("Error in creating purchase request...")
        });

        dispatch({
            type:"CREATE_NEW_REQUEST",
            payload:purchaseRequestData
        });
    };
}