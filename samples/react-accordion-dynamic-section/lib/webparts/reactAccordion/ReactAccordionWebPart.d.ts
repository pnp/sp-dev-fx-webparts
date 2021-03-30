import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
import "core-js/es6/array";
import "es6-map/implement";
import "core-js/modules/es6.array.find";
export interface IReactAccordionWebPartProps {
    listId: string;
    accordionTitle: string;
    columnTitle: string;
    selectedChoice: string;
    allowZeroExpanded: boolean;
    allowMultipleExpanded: boolean;
    accordianTitleColumn: string;
    accordianContentColumn: string;
}
export default class ReactAccordionWebPart extends BaseClientSideWebPart<IReactAccordionWebPartProps> {
    private listColumns;
    private allListColumns;
    private columnChoices;
    private columnsDropdownDisabled;
    private choicesDropdownDisabled;
    onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected readonly disableReactivePropertyChanges: boolean;
    protected readonly dataVersion: Version;
    private loadColumns;
    private loadAllColumns;
    private loadCateogryChoices;
    protected onPropertyPaneConfigurationStart(): void;
    protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=ReactAccordionWebPart.d.ts.map