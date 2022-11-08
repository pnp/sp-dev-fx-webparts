import { SpfxProp } from "./SpfxContext";

export type ServicesProp<S = {}> = {
    services: S & SpfxProp;
};

export interface IService {
    initialize(): Promise<void>;
}

export type ServiceContext<S = {}> = S & SpfxProp;

export interface ServiceConstructor<I extends IService> {
    new(context: ServiceContext): I;
}