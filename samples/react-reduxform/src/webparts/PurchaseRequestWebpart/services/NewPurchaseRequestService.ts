import INewPurchaseRequestService from "./INewPurchaseRequestService";
import pnp from "sp-pnp-js";
import { INewFormState } from "../state/INewFormControlsState";
import { ItemAddResult,Web } from "sp-pnp-js";


export default class NewPurchaseRequestService implements INewPurchaseRequestService{

    private getPurchasedForControlValues():Promise<any>{
        return pnp.sp.web.fields.getByTitle("PurchasedFor").select("Choices").get().then(response => {
            return response;
        });
    }

    private getTypeOfPurchaseRequestValues():Promise<any>{
        return pnp.sp.web.fields.getByTitle("TypeOfPR").select("Choices").get().then(response => {
            return response;
        });
    }

    // Gets the choices to be displayed in the dropdown fields.
    getNewFormControlsState():Promise<any>{

        let newFormControlsState = {} as INewFormState;

        return this.getPurchasedForControlValues().then(purchasedForValuesResponse => {
            newFormControlsState.purchasedForOptions = purchasedForValuesResponse.Choices;
            
            return this.getTypeOfPurchaseRequestValues().then(typeOfPurchaseRequestResponse => {
                newFormControlsState.typeOfPurchaseRequestOptions = typeOfPurchaseRequestResponse.Choices;

                return newFormControlsState;
            });
        });
    }

    // Creates a new purchase request. The request is created in two list. One where the master data is stored and one
    // where the purchase items are stored with a reference of the ID of master request.
    async createNewPurchaseRequest(purchaseRequestData:INewFormState,siteUrl) : Promise<any>{

        return pnp.sp.web.lists.getByTitle("PurchaseRequest").items.add({
                PurchasedFor:purchaseRequestData.purchasedFor,
                TypeOfPR:purchaseRequestData.typeOfPurchaseRequest})

            .then((result:ItemAddResult)=>{
                let purchaseRequestID = result.data.Id;
                console.log("Purchase request created : " + purchaseRequestID);
                if(purchaseRequestData.purchaseItems != null && purchaseRequestData.purchaseItems.length > 0){

                    // Creates the multiple purchase items in batch.
                    let web = new Web(siteUrl);
                    let batch = web.createBatch();
                    
                    purchaseRequestData.purchaseItems.forEach(purchaseItem => {
                        web.lists.getByTitle("PurchaseRequestItems").items.inBatch(batch).add({
                            ProductCode:purchaseItem.productCode,
                            Quantity:purchaseItem.quantity,
                            RatePerUnit:purchaseItem.ratePerUnit,
                            TotalCost:purchaseItem.totalCost,
                            PurchaseRequestID:purchaseRequestID
                        });
                    });

                    batch.execute().then(()=>{
                        console.log("Purchase items added to the list....");
                    });
                }
                else{
                    alert('Select atleast one purchase item.');
                }
        });
    }
}