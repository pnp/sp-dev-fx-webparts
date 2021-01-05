import * as React from "react";
import { IReactAccordionProps } from "./IReactAccordionProps";
import "./reactAccordion.css";
export interface IReactAccordionState {
    items: Array<any>;
    choices: Array<any>;
    allowMultipleExpanded: boolean;
    allowZeroExpanded: boolean;
}
export default class ReactAccordion extends React.Component<IReactAccordionProps, IReactAccordionState> {
    constructor(props: IReactAccordionProps);
    private getListItems;
    componentDidUpdate(prevProps: IReactAccordionProps): void;
    render(): React.ReactElement<IReactAccordionProps>;
}
//# sourceMappingURL=ReactAccordion.d.ts.map