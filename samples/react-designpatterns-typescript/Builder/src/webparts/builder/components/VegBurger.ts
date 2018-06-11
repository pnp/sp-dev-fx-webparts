import Burger from "./Burger";

class VegBurger extends Burger {
    public price(): number {
        return 11;
    }

    public name(): string {
        return "Veg Burger";
    }
}

export default VegBurger;