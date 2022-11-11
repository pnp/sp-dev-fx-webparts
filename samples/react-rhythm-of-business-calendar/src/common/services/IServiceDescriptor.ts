import { IService, ServiceConstructor } from "./IService";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IServiceDescriptor<S extends symbol, I extends IService, P extends Record<S, I>> {
    symbol: S;
    dependencies: symbol[];
    online: ServiceConstructor<I>;
    classic?: ServiceConstructor<I>;
    test?: ServiceConstructor<I>;
}