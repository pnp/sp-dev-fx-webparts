import { IceCream } from "./IceCream";

export interface IIceCreamProvider {

    getAll(): Promise<IceCream[]>;

    buy(uniqueid: string, quantity: number): Promise<void>;
}