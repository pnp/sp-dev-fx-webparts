import IItem from "./IItem";
import Wrapper from "./Wrapper";
import IPacking from "./IPacking";

abstract class Burger implements IItem {
    public abstract name(): string ;

    public packing(): IPacking {
        return new Wrapper();
    }

    public abstract price(): number ;

}

export default Burger;