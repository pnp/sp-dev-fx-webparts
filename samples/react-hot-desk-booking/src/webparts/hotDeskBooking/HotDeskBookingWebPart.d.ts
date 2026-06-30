import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration } from '@microsoft/sp-webpart-base';
export interface IHotDeskBookingWebPartProps {
    title: string;
    resourcesListName: string;
    bookingsListName: string;
    isAdminMode: boolean;
    defaultResourceType: string;
}
export default class HotDeskBookingWebPart extends BaseClientSideWebPart<IHotDeskBookingWebPartProps> {
    protected onInit(): Promise<void>;
    render(): void;
    protected onDispose(): void;
    protected get dataVersion(): Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
//# sourceMappingURL=HotDeskBookingWebPart.d.ts.map