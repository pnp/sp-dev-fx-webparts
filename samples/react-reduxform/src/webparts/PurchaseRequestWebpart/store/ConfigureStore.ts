import { createStore,combineReducers, applyMiddleware } from "redux";
import { NewPurchaseRequestReducer }  from "../reducers/NewPurchaseRequestReducer";
import thunk from "redux-thunk";
import { reducer as formReducer } from 'redux-form'; 


// Configures the redux store.
export default function ConfigureStore():any{
    
    // Combine multiple reducers to create the store. FormReducer is for the redux-form.
    const PurchaseRequestStore = createStore(
        combineReducers
        ({
            NewFormControlValues:NewPurchaseRequestReducer,
            form:formReducer
        }),
        {},
        applyMiddleware(thunk)
    );

    return PurchaseRequestStore;
}