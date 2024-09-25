import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from "@pnp/sp/presets/all";
import { IPropertyFieldGroupOrPerson } from "@pnp/spfx-property-controls";

export class UserGroupCheck {

    _claimUserPrefix = "i:0#.f|membership";
    _claimGroupPrefix = "c:0o.c|federateddirectoryclaimprovider|";
    _aadGroupCacheKey = "SPFxModernScriptEditorAudienceAADCache";
    _audiences: IPropertyFieldGroupOrPerson[];
    _audienceCacheDuration: number; // hours
    _context: WebPartContext;

    constructor(audiences: IPropertyFieldGroupOrPerson[], audienceCacheDuration: number, context: WebPartContext) {
        this._audiences = audiences;
        this._audienceCacheDuration = audienceCacheDuration || 24;
        this._context = context;
    }

    public async CheckAudiences(): Promise<boolean> {
        const aadGroupIds = [];

        // Check if an audience is a the current person first as it's no API calls
        for (const audience of this._audiences) {
            if (audience.id.replace(this._claimUserPrefix, "").toLocaleLowerCase() === this._context.pageContext.user.loginName.toLocaleLowerCase()) {
                return true;
            }
            // Collect all AAD group IDs
            if (audience.login === "FederatedDirectoryClaimProvider") {
                aadGroupIds.push(audience.id.replace(this._claimGroupPrefix, ""));
            }
        }

        const promises = [];
        for (const audience of this._audiences) {
            if (audience.id) {
                // Check if the audience is a SharePoint group
                const spGroupId = parseInt(audience.id, 10);
                if (!isNaN(spGroupId)) {
                    promises.push(this.isCurrentUserMemberOfGroup(spGroupId));
                }
            }
        }

        // Check if the audience is a security group
        if (aadGroupIds.length > 0) {
            promises.push(this.isCurrentUserMemberOfAADGroup(aadGroupIds));
        }

        const results = await Promise.all(promises);
        return results.some(result => result === true);
    }


    /**
     * Function to check if the current user is a member of a specific SharePoint Group
     * @param groupId The ID of the SharePoint group to check
     * @returns true if the user is a member, false otherwise
     */
    private async isCurrentUserMemberOfGroup(groupId: number): Promise<boolean> {
        try {
            const groupUsers = await sp.web.siteGroups.getById(groupId).users
                .usingCaching({
                    storeName: "local",
                    key: `isCurrentUserMemberOfGroup-${groupId}-${this._context.pageContext.web.id.toString()}`,
                    expiration: new Date(new Date().getTime() + (this._audienceCacheDuration * 60 * 60 * 1000))
                })();

            // Check if the current user's ID is in the list of group users
            return groupUsers.some(user => user.Id === this._context.pageContext.legacyPageContext.userId);
        } catch (error) {
            console?.error(`Error checking user membership: ${error}`);
            return false;
        }
    }

    /**
     * Check if the current user is a member or transitive member of an AAD group
     * @param groupId The ID of the Azure AD group
     * @returns true if the user is a member of the group, false otherwise
     */
    private async isCurrentUserMemberOfAADGroup(groupIds: string[]): Promise<boolean> {
        try {
            // Check if groupIds and timestamp are already cached in localStorage
            const cachedData = localStorage.getItem(this._aadGroupCacheKey);
            if (cachedData) {
                const { ids, timestamp } = JSON.parse(cachedData);
                const cachedTimestamp = new Date(parseInt(timestamp));
                const currentTime = new Date();
                const timeDiff = currentTime.getTime() - cachedTimestamp.getTime();
                const hoursDiff = timeDiff / (1000 * 60 * 60);
                if (hoursDiff < this._audienceCacheDuration) {
                    // Filter locally for the group IDs you're interested in
                    return groupIds.some(groupId => ids.includes(groupId));
                }
            }

            const graphClient = await this._context.msGraphClientFactory.getClient('3');
            // Get the list of groups (including nested groups) the current user is a member of
            const transitiveGroups = await graphClient
                .api('/me/transitiveMemberOf')
                .version('v1.0')
                .select('id') // Only select group IDs to reduce the payload
                .get();

            // Cache the groupIds and timestamp in localStorage
            const transitiveGroupIds = transitiveGroups.value.map((group: any) => group.id);
            const groupData = {
                ids: transitiveGroupIds,
                timestamp: new Date().getTime().toString()
            };
            localStorage.setItem(this._aadGroupCacheKey, JSON.stringify(groupData));

            // Filter locally for the group IDs you're interested in
            return groupIds.some(groupId => transitiveGroupIds.includes(groupId));
        } catch (error) {
            console?.error(`Error checking transitive AAD group membership: ${error}`);
            return false;
        }
    }
}
