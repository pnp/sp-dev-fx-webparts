export declare const baseElementEvents: string[];
export declare const baseElementProperties: string[];
export declare const htmlElementProperties: string[];
export declare const anchorProperties: string[];
export declare const buttonProperties: string[];
export declare const divProperties: string[];
export declare const inputProperties: string[];
export declare const textAreaProperties: string[];
export declare const imageProperties: string[];
/**
 * Gets native supported props for an html element provided the allowance set. Use one of the property
 * sets defined (divProperties, buttonPropertes, etc) to filter out supported properties from a given
 * props set. Note that all data- and aria- prefixed attributes will be allowed.
 * NOTE: getNativeProps should always be applied first when adding props to a react component. The
 * non-native props should be applied second. This will prevent getNativeProps from overriding your custom props.
 * For example, if props passed to getNativeProps has an onClick function and getNativeProps is added to
 * the component after an onClick function is added, then the getNativeProps onClick will override it.
 * @param props The unfiltered input props
 * @param allowedPropsNames The array of allowed propnames.
 * @returns The filtered props
 */
export declare function getNativeProps<T>(props: any, allowedPropNames: string[], excludedPropNames?: string[]): T;
