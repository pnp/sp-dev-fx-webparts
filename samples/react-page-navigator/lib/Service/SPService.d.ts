import { INavLink } from '@fluentui/react/lib/Nav';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export declare class SPService {
    private static allUrls;
    /**
     * Returns the unique Anchor URL for a heading
     * @param headingValue The text value of the heading
     * @returns anchorUrl
     */
    private static GetAnchorUrl;
    /**
     * Returns the Anchor Links for Nav element
     * @param context Web part context
     * @param isExpanded whether navigation links should be expanded by default
     * @returns anchorLinks
     */
    static GetAnchorLinks(context: WebPartContext, isExpanded?: boolean): Promise<INavLink[]>;
}
//# sourceMappingURL=SPService.d.ts.map