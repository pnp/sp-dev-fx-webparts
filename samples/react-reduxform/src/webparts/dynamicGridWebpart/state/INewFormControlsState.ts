// Represents a purchase request
export interface INewFormState{

    // Represent the choices to be displayed in dropdown when the form loads.
    purchasedForOptions:string[];
    typeOfPurchaseRequestOptions:string[];

    // Represent the values selected for the fields
    purchasedFor:string;
    typeOfPurchaseRequest:string;
    purchaseItems:IPurchaseItem[];
}


// Represents one purchase item in the purchase request.
export interface IPurchaseItem{
    productCode:string;
    quantity:number;
    ratePerUnit:number;
    totalCost:number;
}
