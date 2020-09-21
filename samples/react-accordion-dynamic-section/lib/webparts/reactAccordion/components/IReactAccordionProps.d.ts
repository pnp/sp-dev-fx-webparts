import { DisplayMode } from "@microsoft/sp-core-library";
export interface IReactAccordionProps {
    listId: string;
    accordionTitle: string;
    columnTitle: string;
    selectedChoice: string;
    accordianTitleColumn: string;
    accordianContentColumn: string;
    allowZeroExpanded: boolean;
    allowMultipleExpanded: boolean;
    displayMode: DisplayMode;
    updateProperty: (value: string) => void;
    onConfigure: () => void;
}
//# sourceMappingURL=IReactAccordionProps.d.ts.map