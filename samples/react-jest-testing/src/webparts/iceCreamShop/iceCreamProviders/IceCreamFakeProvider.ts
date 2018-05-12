import { IceCream } from "./IceCream";
import { IIceCreamProvider } from "./IIceCreamProvider";

export class IceCreamFakeProvider implements IIceCreamProvider {

    public getAll(): Promise<Array<IceCream>> {

        return new Promise<Array<IceCream>>(resolve => {

            let list = [
                { UniqueId: "1", Title: "Cherry" },
                { UniqueId: "2", Title: "Chocolate" },
                { UniqueId: "3", Title: "Coffee and Cookie" },
                { UniqueId: "10", Title: "Vanilla" }
            ] as IceCream[];
            
            resolve(list);
        });
    }

    public buy(uniqueid: string, quantity: number): Promise<void> {

        return new Promise<void>(resolve => resolve());
    }
}