import IItem from "./IItem";

class Meal {
    private items: IItem[] = [];

    public addItem(item: IItem): void {
        this.items.push(item);
    }

    public getCost(): number {
        let cost: number  = 0;
        for(let item of this.items) {
            cost+= item.price();
        }

        return cost;
    }

    public showItems(): string {
        let returnStr: string = "";
        for(let item of this.items) {
            returnStr +="Item:" + item.name();
            returnStr +=", Packing:" + item.packing().pack();
            returnStr +=", Price: " + item.price();
        }

        returnStr += ", Total: " + this.getCost();
        return returnStr;
    }
}

export default Meal;