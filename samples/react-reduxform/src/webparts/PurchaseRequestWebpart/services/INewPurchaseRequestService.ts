import { INewFormState } from '../state/INewFormControlsState';

// Represents the service to interact with SharePoint to work with purchase request.
export default interface INewPurchaseRequestService{
    getNewFormControlsState() : Promise<any>;
    createNewPurchaseRequest(purchaseRequestData:INewFormState,siteUrl) : Promise<any>;
}