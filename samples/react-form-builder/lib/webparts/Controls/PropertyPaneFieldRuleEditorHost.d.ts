import * as React from "react";
import { IRuleEntry } from '../../Common/IRuleEntry';
import { IFieldRulesProps } from "./IFieldRulesProps";
export interface IFieldRulesHostState {
    fieldRules: {
        [key: string]: IRuleEntry;
    };
    currentEditRule: IRuleEntry;
}
export default class PropertyPaneFieldRuleEditorHost extends React.Component<IFieldRulesProps, IFieldRulesHostState> {
    constructor(props: IFieldRulesProps, state: IFieldRulesHostState);
    render(): JSX.Element;
    private onTextChange;
    private onChange;
}
//# sourceMappingURL=PropertyPaneFieldRuleEditorHost.d.ts.map