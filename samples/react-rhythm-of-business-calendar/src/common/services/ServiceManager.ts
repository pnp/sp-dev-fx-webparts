import { includes } from 'lodash';
import { EnvironmentType, Environment, ServiceScope } from "@microsoft/sp-core-library";
import { IMicrosoftTeams } from '@microsoft/sp-webpart-base';
import { perf, ArrayType, UnionToIntersectionType } from "../Utils";
import { IService } from "./IService";
import { IServiceDescriptor } from "./IServiceDescriptor";
import { ServiceKeyBuilder } from "./ServiceKeyBuilder";
import { SpfxContext, SpfxProp, SpfxComponent, Properties, TeamsJs } from "./SpfxContext";

export type ServiceDescriptorArray<S extends symbol = symbol, I extends IService = IService, P extends Record<S, I> = Record<S, I>> = Array<IServiceDescriptor<S, I, P>>;
export type ServiceDescriptorToProp<D extends IServiceDescriptor<any, any, any>> = D extends IServiceDescriptor<infer S, any, infer P> ? S extends symbol ? P : never : never;
export type ServicesType<D extends ServiceDescriptorArray> = UnionToIntersectionType<ServiceDescriptorToProp<ArrayType<D>>> & SpfxProp;

export class ServiceManager<TDescriptors extends ServiceDescriptorArray, TProperties = any> {
    public static async create<TDescriptorArray extends ServiceDescriptorArray, TProperties = any>(appName: string, component: SpfxComponent, context: SpfxContext, teams: IMicrosoftTeams, properties: TProperties, descriptors: TDescriptorArray, environment?: EnvironmentType): Promise<ServiceManager<TDescriptorArray>> {
        ServiceManager.throwIfAnyDependencyIsNotDescribed(descriptors);

        const manager = new ServiceManager<TDescriptorArray, TProperties>(descriptors, component, context, teams, properties);
        const serviceKeyBuilder = new ServiceKeyBuilder<ServicesType<TDescriptorArray>>(appName, environment || Environment.type, manager.services);
        await ServiceManager.serviceScopeWhenFinishedAsync(context.serviceScope, scope => manager._init(scope, serviceKeyBuilder));
        return manager;
    }

    private static async serviceScopeWhenFinishedAsync(scope: ServiceScope, fn: (scope: ServiceScope) => Promise<void>): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            scope.whenFinished(async () => {
                try {
                    await fn(scope);
                    resolve();
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }

    private static throwIfAnyDependencyIsNotDescribed(descriptors: ServiceDescriptorArray) {
        const describedServiceSymbols = descriptors.map(d => d.symbol);

        for (const descriptor of descriptors) {
            for (const dependency of descriptor.dependencies) {
                if (!includes(describedServiceSymbols, dependency)) {
                    throw Error(`No descriptor found for dependency '${dependency.toString()}' of service '${descriptor.symbol.toString()}'`);
                }
            }
        }
    }

    public readonly services: ServicesType<TDescriptors>;

    constructor(
        private readonly _descriptors: ServiceDescriptorArray,
        component: SpfxComponent,
        context: SpfxContext,
        teams: IMicrosoftTeams,
        properties: TProperties
    ) {
        this.services = {
            [SpfxComponent]: component,
            [SpfxContext]: context,
            [TeamsJs]: teams,
            [Properties]: properties
        } as ServicesType<TDescriptors>;
    }

    private async _init(scope: ServiceScope, serviceKeyBuilder: ServiceKeyBuilder<ServicesType<TDescriptors>>) {
        const initGroups = ServiceManager._buildDependencyGroups(this._descriptors);

        for (const initGroup of initGroups) {
            const initPromises: Promise<void>[] = [];

            for (const descriptor of initGroup) {
                const key = serviceKeyBuilder.build(descriptor);
                const service = scope.consume(key);
                (this.services as any)[descriptor.symbol] = service;
                const perfLabel = `${descriptor.symbol.description} initialize`;
                const initPromise = perf(perfLabel, () => service.initialize());
                initPromises.push(initPromise);
            }

            await Promise.all(initPromises);
        }
    }

    private static _buildDependencyGroups(descriptors: ServiceDescriptorArray): ServiceDescriptorArray[] {
        const dep = new Map<IServiceDescriptor<symbol, IService, Record<symbol, IService>>, symbol[]>();
        descriptors.forEach(descriptor => dep.set(descriptor, [...descriptor.dependencies]));

        const groups: ServiceDescriptorArray[] = [];

        while (dep.size > 0) {
            const group: ServiceDescriptorArray = [];

            // push services with no dependencies to this initialization group
            dep.forEach((remainingDependencies, descriptor) => {
                if (remainingDependencies.length === 0)
                    group.push(descriptor);
            });

            // remove services with no dependencies from the map
            group.forEach(ig => dep.delete(ig));

            // remove dependencies on services that are in the current initialization group
            dep.forEach((dependencies, descriptor) => {
                const remainingDependencies = dependencies.filter(dependency => group.every(ig => ig.symbol !== dependency));
                dep.set(descriptor, remainingDependencies);
            });

            groups.push(group);
        }

        return groups;
    }
}
