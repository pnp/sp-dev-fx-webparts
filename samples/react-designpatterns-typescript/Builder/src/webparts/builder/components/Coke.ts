import ColdDrink from "./ColdDrink";

class Coke extends ColdDrink {
    public price(): number {
       return 2.5;
    }

    public name(): string {
        return "Coca Cola";
    }
}

export default Coke;