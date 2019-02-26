import { IceCream } from "./IceCream";
import { IIceCreamProvider } from "./IIceCreamProvider";

export class IceCreamFakeProvider implements IIceCreamProvider {

    public getAll(): Promise<Array<IceCream>> {

        return new Promise<Array<IceCream>>(resolve => {

            let list = [
                { UniqueId: "1", Title: "Cherry", Price: 1 },
                { UniqueId: "2", Title: "Chocolate", Price: 2 },
                { UniqueId: "3", Title: "Coffee and Cookie", Price: 2.11 },
                { UniqueId: "10", Title: "Vanilla", Price: 2.5 }
            ] as IceCream[];
            
            resolve(list);
        });
    }

    public buy(uniqueid: string, quantity: number): Promise<void> {

        return new Promise<void>(resolve => resolve());
    }
}