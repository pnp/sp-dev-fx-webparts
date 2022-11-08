import React, { ComponentType } from "react";
import { Params, useParams } from "react-router-dom";

type TParamsProps = {
    params: Partial<Params>;
};

export const withRouterParams = <P extends TParamsProps>(WrappedComponent: ComponentType<P>) =>
    (props: Omit<P, keyof TParamsProps>) => <WrappedComponent {...(props as P)} params={useParams()} />
