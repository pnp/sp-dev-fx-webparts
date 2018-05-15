import { IceCream } from "../iceCreamProviders/IceCream";

export interface IIceCreamShopState {
    selectedIceCream: IceCream;
    quantity: number;
    iceCreamFlavoursList: IceCream[];
    totalPrice: number;
    hasBoughtIceCream: boolean;
  }
  