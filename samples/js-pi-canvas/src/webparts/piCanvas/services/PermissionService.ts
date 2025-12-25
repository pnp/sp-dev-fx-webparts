/**
 * Permission Service for PiCanvas
 * Handles SharePoint group membership checks with caching
 */

import { SPHttpClient } from '@microsoft/sp-http';
import { WebPartContext } from '@microsoft/sp-webpart-base';

/**
 * Represents a SharePoint group
 */
export interface ISPGroup {
  Id: number;
  Title: string;
  LoginName: string;
}

/**
 * Standard SharePoint group types
 */
export type StandardGroupType = 'Owners' | 'Members' | 'Visitors';

/**
 * Permission configuration for a single tab
 */
export interface ITabPermissionConfig {
  /** If true, permission checking is enabled for this tab */
  enabled: boolean;
  /** Standard groups (Owners, Members, Visitors) */
  standardGroups: StandardGroupType[];
  /** Custom group IDs (numbers) */
  customGroupIds: number[];
}

/**
 * Result of permission check - cached user data
 */
export interface IPermissionCheckResult {
  /** User ID */
  userId: number;
  /** Groups the user belongs to */
  userGroups: ISPGroup[];
  /** Standard site group IDs (owner, member, visitor) */
  associatedGroups: {
    ownerId: number | null;
    memberId: number | null;
    visitorId: number | null;
  };
  /** Timestamp when this was cached */
  cachedAt: number;
}

export class PermissionService {
  private static readonly CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

  private context: WebPartContext;
  private siteUrl: string;

  // Cache for permission check results (per webpart instance)
  private _permissionCache: IPermissionCheckResult | null = null;

  constructor(context: WebPartContext) {
    this.context = context;
    this.siteUrl = context.pageContext.web.absoluteUrl;
  }

  /**
   * Get current user's groups and associated site groups
   * Results are cached for CACHE_DURATION_MS
   */
  public async getUserPermissionData(): Promise<IPermissionCheckResult> {
    // Return cached result if valid
    if (this._permissionCache &&
        Date.now() - this._permissionCache.cachedAt < PermissionService.CACHE_DURATION_MS) {
      return this._permissionCache;
    }

    try {
      // Parallel fetch: user groups and associated site groups
      const [userGroups, associatedGroups] = await Promise.all([
        this.getCurrentUserGroups(),
        this.getAssociatedGroups()
      ]);

      // Get user ID from legacy page context
      const userId = this.context.pageContext.legacyPageContext?.userId || 0;

      const result: IPermissionCheckResult = {
        userId,
        userGroups,
        associatedGroups,
        cachedAt: Date.now()
      };

      this._permissionCache = result;
      return result;
    } catch (error) {
      console.error('PermissionService: Failed to get user permission data', error);
      // Return empty result on failure - tabs will default to visible
      return {
        userId: this.context.pageContext.legacyPageContext?.userId || 0,
        userGroups: [],
        associatedGroups: { ownerId: null, memberId: null, visitorId: null },
        cachedAt: Date.now()
      };
    }
  }

  /**
   * Get all groups the current user belongs to
   */
  private async getCurrentUserGroups(): Promise<ISPGroup[]> {
    try {
      const url = `${this.siteUrl}/_api/web/currentuser/groups?$select=Id,Title,LoginName`;
      const response = await this.context.spHttpClient.get(
        url,
        SPHttpClient.configurations.v1
      );

      if (!response.ok) {
        console.warn('PermissionService: Failed to get user groups, status:', response.status);
        return [];
      }

      const data = await response.json();
      return data.value || [];
    } catch (error) {
      console.warn('PermissionService: Error fetching user groups', error);
      return [];
    }
  }

  /**
   * Get the IDs of the site's associated groups (Owners, Members, Visitors)
   */
  private async getAssociatedGroups(): Promise<IPermissionCheckResult['associatedGroups']> {
    const result: IPermissionCheckResult['associatedGroups'] = {
      ownerId: null,
      memberId: null,
      visitorId: null
    };

    const groupFetches: Array<{ key: keyof typeof result; url: string }> = [
      { key: 'ownerId', url: `${this.siteUrl}/_api/web/associatedownergroup?$select=Id` },
      { key: 'memberId', url: `${this.siteUrl}/_api/web/associatedmembergroup?$select=Id` },
      { key: 'visitorId', url: `${this.siteUrl}/_api/web/associatedvisitorgroup?$select=Id` }
    ];

    await Promise.all(groupFetches.map(async ({ key, url }) => {
      try {
        const response = await this.context.spHttpClient.get(
          url,
          SPHttpClient.configurations.v1
        );
        if (response.ok) {
          const data = await response.json();
          result[key] = data.Id || null;
        }
      } catch {
        // Silently fail - some sites may not have associated groups
      }
    }));

    return result;
  }

  /**
   * Check if user has permission to view a tab based on its configuration
   * @param config - The tab's permission configuration
   * @param permissionData - Cached user permission data
   * @returns true if user can view the tab
   */
  public checkTabPermission(
    config: ITabPermissionConfig,
    permissionData: IPermissionCheckResult
  ): boolean {
    // If permission checking is disabled, show the tab
    if (!config.enabled) {
      return true;
    }

    const hasStandardGroups = config.standardGroups && config.standardGroups.length > 0;
    const hasCustomGroups = config.customGroupIds && config.customGroupIds.length > 0;

    // If no groups specified, show the tab (empty = visible to all)
    if (!hasStandardGroups && !hasCustomGroups) {
      return true;
    }

    const userGroupIds = new Set(permissionData.userGroups.map(g => g.Id));

    // Check standard groups (OR logic)
    if (hasStandardGroups) {
      for (const groupType of config.standardGroups) {
        let groupId: number | null = null;
        switch (groupType) {
          case 'Owners':
            groupId = permissionData.associatedGroups.ownerId;
            break;
          case 'Members':
            groupId = permissionData.associatedGroups.memberId;
            break;
          case 'Visitors':
            groupId = permissionData.associatedGroups.visitorId;
            break;
        }
        if (groupId !== null && userGroupIds.has(groupId)) {
          return true;
        }
      }
    }

    // Check custom group IDs (OR logic)
    if (hasCustomGroups) {
      for (const groupId of config.customGroupIds) {
        if (userGroupIds.has(groupId)) {
          return true;
        }
      }
    }

    // User is not in any of the specified groups
    return false;
  }

  /**
   * Clear the permission cache (useful when user might have changed)
   */
  public clearCache(): void {
    this._permissionCache = null;
  }
}
