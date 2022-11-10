import React, { createContext, Component, ComponentType, useContext } from "react";
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ServicesProp } from './IService';
import { Properties, SpfxComponent, SpfxContext, SpfxProp, TeamsJs } from "./SpfxContext";

const ServicesContext = createContext({});
export const ServicesProvider = ServicesContext.Provider;
export const ServicesConsumer = ServicesContext.Consumer;

type ComponentTypeWithoutServices<P> = {
    WithoutServices: ComponentType<P>;
};

export const withServices = <P extends ServicesProp<{}>>(
    ServicedComponent: ComponentType<P>
): ComponentType<Omit<P, keyof ServicesProp<{}>>> & ComponentTypeWithoutServices<P> => {
    class ComponentWithServices extends Component<P> {
        public static displayName = `withServices(${ServicedComponent.displayName || ServicedComponent.name})`;
        public static WithoutServices: ComponentType<P> = ServicedComponent;

        public render() {
            return (
                <ServicesConsumer>
                    {services => <ServicedComponent {...this.props} services={services} />}
                </ServicesConsumer>
            );
        }
    }

    return hoistNonReactStatics(ComponentWithServices, ServicedComponent);
};

export const useServices = <S extends {}>() => useContext<any>(ServicesContext) as S;
export const useSpfxComponent = () => useServices<SpfxProp>()[SpfxComponent];
export const useSpfxContext = () => useServices<SpfxProp>()[SpfxContext];
export const useTeamsJS = () => useServices<SpfxProp>()[TeamsJs];
export const useProperties = <P extends {}>() => useServices<SpfxProp>()[Properties] as P;