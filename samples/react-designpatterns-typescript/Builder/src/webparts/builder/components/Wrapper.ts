import IPacking from "./IPacking";

class Wrapper implements IPacking {
    public pack(): string {
       return "Wrapper";
    }
}

export default Wrapper;