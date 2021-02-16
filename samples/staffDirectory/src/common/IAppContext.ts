import { MSGraphClient } from "@microsoft/sp-http";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
export interface IAppContext {
    currentUser: any;
    msGraphClient: MSGraphClient;
    themeVariant: IReadonlyTheme;
}
//# sourceMappingURL=IAppContext.d.ts.map