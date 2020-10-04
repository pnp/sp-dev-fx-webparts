import { IPropertyPaneField, PropertyPaneFieldType } from "@microsoft/sp-property-pane";
import { IPropertyPaneHTMLProps } from './IPropertyPaneHTMLProps';
import { IPropertyPaneHTMLInternalProps } from './IPropertyPaneHTMLInternalProps';
export declare class PropertyPaneHTMLBuilder implements IPropertyPaneField<IPropertyPaneHTMLProps> {
    type: PropertyPaneFieldType;
    properties: IPropertyPaneHTMLInternalProps;
    private elem;
    targetProperty: string;
    shouldFocus?: boolean;
    constructor(properties: IPropertyPaneHTMLProps);
    render(): void;
    private onDispose;
    private onRender;
}
export declare function PropertyPaneHTML(properties: IPropertyPaneHTMLProps): IPropertyPaneField<IPropertyPaneHTMLProps>;
//# sourceMappingURL=PropertyPaneHTML.d.ts.map