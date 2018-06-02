import ColdDrink from "./ColdDrink";

class Pepsi extends ColdDrink {
    public price(): number {
       return 1.5;
    }

    public name(): string {
        return "Pepsi Cola";
    }
}

export default Pepsi;