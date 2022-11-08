import { ServiceKey, EnvironmentType } from "@microsoft/sp-core-library";
import { IService, ServiceConstructor } from "./IService";
import { IServiceDescriptor } from "./IServiceDescriptor";
import { SpfxProp } from "./SpfxContext";

export class ServiceKeyBuilder<TServices extends SpfxProp> {
    constructor(
        private readonly _appName: string,
        private readonly _environment: EnvironmentType,
        private readonly _services: TServices) {
    }

    public build<S extends symbol, I extends IService, P extends Record<S, I>>(descriptor: IServiceDescriptor<S, I, P>): ServiceKey<I> {
        const { symbol, online, classic, test } = descriptor;

        const sharepointServiceKey = online && this.createServiceKey<I>(symbol, online);
        const classicSharePointServiceKey = classic && this.createServiceKey<I>(symbol, classic);
        const testServiceKey = test && this.createServiceKey<I>(symbol, test);

        switch (this._environment) {
            case EnvironmentType.SharePoint:
                return sharepointServiceKey;
            case EnvironmentType.ClassicSharePoint:
                return classicSharePointServiceKey || sharepointServiceKey;
            case EnvironmentType.Test:
                return testServiceKey || sharepointServiceKey || classicSharePointServiceKey;
            default:
                throw Error('Unknown SharePoint environment');
        }
    }

    private createServiceKey<T extends IService>(symbol: symbol, ctor: ServiceConstructor<T>) {
        const serviceName = this.buildServiceName(symbol);
        return ServiceKey.createCustom<T>(serviceName, () => new ctor(this._services));
    }

    private buildServiceName(symbol: symbol) {
        return `${this._appName}.Services.${symbol.toString()}`;
    }
}