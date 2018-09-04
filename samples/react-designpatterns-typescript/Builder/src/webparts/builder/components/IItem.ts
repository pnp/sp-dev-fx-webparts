import IPacking from "./IPacking";

interface IItem {
    name(): string;
    packing(): IPacking;
    price(): number;
}

export default IItem;