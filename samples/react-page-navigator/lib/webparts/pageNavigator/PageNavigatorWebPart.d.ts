import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration } from "@microsoft/sp-property-pane";
export interface IPageNavigatorWebPartProps {
    stickyMode: boolean;
    stickyParentDistance: string;
    isExpanded: boolean;
}
export default class PageNavigatorWebPart extends BaseClientSideWebPart<IPageNavigatorWebPartProps> {
    private anchorLinks;
    private _themeProvider;
    private _themeVariant;
    onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    private validateDistanceParam;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
    private _handleThemeChangedEvent;
}
//# sourceMappingURL=PageNavigatorWebPart.d.ts.map