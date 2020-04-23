import IPacking from "./IPacking";

class Bottle implements IPacking {
    public pack(): string {
       return "Bottle";
    }
}

export default Bottle;