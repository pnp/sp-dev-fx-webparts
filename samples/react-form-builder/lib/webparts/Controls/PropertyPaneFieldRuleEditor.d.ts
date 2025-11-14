import { IPropertyPaneField, PropertyPaneFieldType } from '@microsoft/sp-property-pane';
import { IFieldRulesInternalProps } from './IFieldRulesInternalProps';
import { IPropertyPaneFieldRulesProps } from './IPropertyPaneFieldRulesProps';
export declare class PropertyPaneFieldRuleEditor implements IPropertyPaneField<IPropertyPaneFieldRulesProps> {
    type: PropertyPaneFieldType;
    targetProperty: string;
    properties: IFieldRulesInternalProps;
    shouldFocus?: boolean;
    private elem;
    constructor(targetProperty: string, properties: IPropertyPaneFieldRulesProps);
    render(): void;
    private onRender;
    private onChanged;
}
//# sourceMappingURL=PropertyPaneFieldRuleEditor.d.ts.map