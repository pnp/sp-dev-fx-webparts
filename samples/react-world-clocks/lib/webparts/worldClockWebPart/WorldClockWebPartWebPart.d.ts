import { Version } from "@microsoft/sp-core-library";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
export interface IWorldClockWebPartWebPartProps {
    selectedList: string;
    description: string;
    ShowTime: boolean;
    showActiveOnly: boolean;
    showTitle: boolean;
}
export default class WorldClockWebPartWebPart extends BaseClientSideWebPart<IWorldClockWebPartWebPartProps> {
    render(): void;
    onInit(): Promise<void>;
    protected onDispose(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    private _getLocations;
}
//# sourceMappingURL=WorldClockWebPartWebPart.d.ts.map