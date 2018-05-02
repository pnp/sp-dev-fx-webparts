import { INewFormState } from '../state/INewFormControlsState';
import { GetInitialControlValuesAction } from '../actions/NewFormControlsValuesAction';

// Initial state of the purcahse request.
export const newFormControlsInitialState:INewFormState = {
    purchasedFor:"",
    typeOfPurchaseRequest:"",
    purchasedForOptions:[],
    typeOfPurchaseRequestOptions:[],
    purchaseItems:[]
};

export const NewPurchaseRequestReducer = (state:INewFormState=newFormControlsInitialState,action) => {
    switch(action.type){

        // Gets the values for dropdown fields from SharePoint choice columns.
        case "GET_DEFAULT_CONTROL_VALUES":

            state={
                ...state,
                purchasedForOptions : action.payload.purchasedForOptions,
                typeOfPurchaseRequestOptions : action.payload.typeOfPurchaseRequestOptions,
            };

        break;

        // Creates a new purchase request.
        case "CREATE_NEW_REQUEST":
        
                    state={
                        ...state,
                        purchasedFor : action.payload.purchasedFor,
                        typeOfPurchaseRequest : action.payload.typeOfPurchaseRequest,
                        purchasedForOptions : action.payload.purchasedForOptions,
                        typeOfPurchaseRequestOptions : action.payload.typeOfPurchaseRequestOptions,
                        purchaseItems: action.payload.purchaseItems
                    };
        
        break;
    }
  

    return state;
};

