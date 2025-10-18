import { IPropertyPaneField, PropertyPaneFieldType, IPropertyPaneCustomFieldProps } from "@microsoft/sp-property-pane";
export declare class PropertyPaneLogo implements IPropertyPaneField<IPropertyPaneCustomFieldProps> {
    type: PropertyPaneFieldType;
    targetProperty: string;
    properties: IPropertyPaneCustomFieldProps;
    constructor();
    private onRender;
}
export default PropertyPaneLogo;
//# sourceMappingURL=PropertyPaneLogo.d.ts.map