import IItem from "./IItem";
import IPacking from "./IPacking";
import Bottle from "./Bottle";

abstract class ColdDrink implements IItem {
    public abstract name(); 
    
    public packing(): IPacking {
        return new Bottle();
    }

    public abstract price(): number ;

}

export default ColdDrink;