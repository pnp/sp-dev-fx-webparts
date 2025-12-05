import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IUser, ISite, IGroup } from '../types/interfaces';
import { CacheService } from './CacheService';
import { GroupMemberService } from './GroupMemberService';

interface IMSGraphClient {
  api(path: string): IMSGraphClientRequest;
}

interface IMSGraphClientRequest {
  select(properties: string): IMSGraphClientRequest;
  get(): Promise<Record<string, unknown>>;
}

export interface ISitePermissionService {
  getCurrentSite(): Promise<ISite | undefined>;
  getSiteMembers(siteId: string): Promise<IUser[]>;
  getAllSiteMembers(): Promise<IUser[]>;
}

type AccessLevel = 'owner' | 'admin' | 'member' | 'visitor';

const allMembersCacheKey = (siteId: string): string => `allSiteMembers_${siteId}`;
const siteMembersCacheKey = (siteId: string): string => `siteMembers_${siteId}`;

type RoleDefinitionBinding = {
  Name?: string;
  BasePermissions?: unknown;
};

interface IRoleAssignment {
  Member: {
    Id: number;
    Title: string;
    Email?: string;
    UserPrincipalName?: string;
    LoginName: string;
    PrincipalType: number;
    Users?: { results?: Array<Record<string, string>> };
  };
  RoleDefinitionBindings: RoleDefinitionBinding[];
}

export class SitePermissionService implements ISitePermissionService {
  private graphClient: IMSGraphClient | undefined;
  private cacheService: CacheService;
  private groupMemberService: GroupMemberService;
  private sharePointGroupDirectory: Map<number, IUser[]> | undefined;

  constructor(private context: WebPartContext) {
    this.cacheService = CacheService.getInstance();
    this.groupMemberService = new GroupMemberService(context);
  }

  private async getGraphClient(): Promise<IMSGraphClient> {
    if (!this.graphClient) {
      this.graphClient = await this.context.msGraphClientFactory.getClient('3');
    }
    return this.graphClient;
  }

  public async getCurrentSite(): Promise<ISite | undefined> {
    try {
      const client = await this.getGraphClient();
      const siteUrl = this.context.pageContext.web.absoluteUrl;
      const hostname = new URL(siteUrl).hostname;
      const sitePath = new URL(siteUrl).pathname;
      const response = await client.api(`/sites/${hostname}:${sitePath}`).get();
      const data = response as Record<string, unknown> & { sharepointIds?: Record<string, unknown> };
      return {
        id: data.id as string,
        displayName: data.displayName as string,
        webUrl: data.webUrl as string,
        siteCollectionId: data.sharepointIds?.siteId as string,
        webId: data.sharepointIds?.webId as string
      };
    } catch (error) {
      console.warn('Could not get current site info:', error);
      return undefined;
    }
  }

  public async getSiteMembers(siteId: string): Promise<IUser[]> {
    const cacheKey = siteMembersCacheKey(siteId);
    const cached = this.cacheService.getUserData(cacheKey);
    if (cached) {
      return cached as IUser[];
    }

    const sharePointMembers = await this.getSharePointRestApiMembers();
    const roleAssignmentMembers = await this.getRoleAssignmentMembers();
    const deduped = this.deduplicateUsers([
      ...sharePointMembers,
      ...roleAssignmentMembers
    ]);
    this.cacheService.setUserData(cacheKey, deduped);
    return deduped;
  }

  public async getAllSiteMembers(): Promise<IUser[]> {
    const currentSite = await this.getCurrentSite();
    if (!currentSite) {
      return [];
    }

    const cacheKey = allMembersCacheKey(currentSite.id);
    const cached = this.cacheService.getUserData(cacheKey);
    if (cached) {
      return cached as IUser[];
    }

    const [associatedGroupMembers, sharePointMembers] = await Promise.all([
      this.getAssociatedGroupMembers(currentSite),
      this.getSharePointRestApiMembers()
    ]);

    const roleAssignmentMembers = await this.getRoleAssignmentMembers();

    const merged = this.deduplicateUsers([
      ...associatedGroupMembers,
      ...sharePointMembers,
      ...roleAssignmentMembers
    ]);

    this.cacheService.setUserData(cacheKey, merged);
    return merged;
  }

  private async getAssociatedGroupMembers(site: ISite): Promise<IUser[]> {
    try {
      const group = await this.findAssociatedGroup(site);
      if (!group) {
        return [];
      }

      const [owners, members] = await Promise.all([
        this.groupMemberService.getGroupMembers(group.id, 'admin'),
        this.groupMemberService.getGroupMembers(group.id, 'member')
      ]);

      const mappedOwners = owners.map(user => ({
        ...user,
        accessLevel: 'owner' as const,
        source: 'group' as const,
        principalType: 'User',
        isGroup: false
      }));

      const mappedMembers = members.map(user => ({
        ...user,
        accessLevel: 'member' as const,
        source: 'group' as const,
        principalType: 'User',
        isGroup: false
      }));

      return [...mappedOwners, ...mappedMembers];
    } catch (error) {
      console.warn('Failed to resolve associated group members:', error);
      return [];
    }
  }

  private async findAssociatedGroup(site: ISite): Promise<IGroup | undefined> {
    try {
      const contextGroupId = this.context.pageContext.site?.group?.id;
      if (!contextGroupId) {
        return undefined;
      }

      const client = await this.getGraphClient();
      const response = await client
        .api(`/groups/${contextGroupId}`)
        .select('id,displayName,description')
        .get();
      const group = response as Record<string, unknown>;
      if (!group?.id) {
        return undefined;
      }
      return {
        id: group.id as string,
        displayName: group.displayName as string,
        '@odata.type': '#microsoft.graph.group',
        description: group.description as string
      };
    } catch {
      return undefined;
    }
  }

  private deduplicateUsers(users: IUser[]): IUser[] {
    const map = new Map<string, IUser>();
    for (const user of users) {
      const key = user.userPrincipalName || user.mail || user.id;
      if (!key) {
        continue;
      }
      const existing = map.get(key);
      if (!existing || this.getAccessLevelPriority(user.accessLevel) > this.getAccessLevelPriority(existing.accessLevel)) {
        map.set(key, user);
      }
    }
    return Array.from(map.values());
  }

  private isClaimsPrincipal(loginName?: string, title?: string): boolean {
    const value = (loginName || title || '').toLowerCase();
    if (!value) {
      return false;
    }
    return value.includes('c:0') || value.includes('spo-grid-all-users') || value.includes('everyone except external users') || value === 'everyone';
  }

  private getAccessLevelPriority(level?: string): number {
    switch (level) {
      case 'owner':
        return 4;
      case 'admin':
        return 3;
      case 'member':
        return 2;
      case 'visitor':
        return 1;
      default:
        return 0;
    }
  }

  private assignAccessLevelFromGroupName(groupName: string): AccessLevel {
    const lower = groupName.toLowerCase();
    if (lower.includes('owner')) {
      return 'owner';
    }
    if (lower.includes('admin') || lower.includes('manage') || lower.includes('design')) {
      return 'admin';
    }
    if (lower.includes('member') || lower.includes('edit') || lower.includes('contribute')) {
      return 'member';
    }
    return 'visitor';
  }

  private async getSharePointRestApiMembers(): Promise<IUser[]> {
    const spHttpClient = this.context.spHttpClient;
    const siteUrl = this.context.pageContext.web.absoluteUrl;

    const [siteUsersResponse, groupsResponse] = await Promise.all([
      spHttpClient.get(
        `${siteUrl}/_api/web/siteusers?$select=Id,Title,Email,UserPrincipalName,LoginName`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: 'application/json;odata.metadata=minimal'
          }
        }
      ),
      spHttpClient.get(
        `${siteUrl}/_api/web/sitegroups?$expand=Users&$select=Id,Title,Users/Id,Users/Title,Users/Email,Users/UserPrincipalName,Users/LoginName`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: 'application/json;odata.metadata=minimal'
          }
        }
      )
    ]);

    const users: IUser[] = [];
    const groupDirectory = new Map<number, IUser[]>();

      if (siteUsersResponse.ok) {
        const data = await siteUsersResponse.json();
        const results = (data.value || []) as Array<Record<string, string>>;
        for (const entry of results) {
          if (entry.LoginName && entry.LoginName.includes('SHAREPOINT\\system')) {
            continue;
          }
          const isClaim = this.isClaimsPrincipal(entry.LoginName, entry.Title);
          users.push({
            id: entry.LoginName || String(entry.Id),
            displayName: entry.Title || entry.Email || 'Unknown User',
            mail: entry.Email,
            userPrincipalName: entry.UserPrincipalName || entry.Email || entry.LoginName,
            accessLevel: 'member',
            source: 'site',
            principalType: isClaim ? 'ClaimsPrincipal' : 'User',
            isGroup: isClaim
          });
        }
      }

    if (groupsResponse.ok) {
      const data = await groupsResponse.json();
      const groups = (data.value || []) as Array<Record<string, unknown>>;
        for (const group of groups) {
          const typedGroup = group as Record<string, unknown> & { Users?: { results?: unknown[] } | unknown[] };
          const groupTitle = typeof typedGroup.Title === 'string' ? typedGroup.Title : '';
          const accessLevel = this.assignAccessLevelFromGroupName(groupTitle);
          const groupId = typeof typedGroup.Id === 'number' ? typedGroup.Id : undefined;
        const rawUsers = Array.isArray(typedGroup.Users)
          ? (typedGroup.Users as unknown[])
          : (typedGroup.Users as { results?: unknown[] } | undefined)?.results;
        const groupUsers = (rawUsers || []) as Array<Record<string, string>>;
        const convertedUsers: IUser[] = [];
            for (const user of groupUsers) {
              if (user.LoginName && user.LoginName.includes('SHAREPOINT\\system')) {
                continue;
              }
              const convertedUser: IUser = {
                id: user.LoginName || user.Email || user.UserPrincipalName,
                displayName: user.Title || user.Email || 'Unknown User',
                mail: user.Email,
                userPrincipalName: user.UserPrincipalName || user.Email || user.LoginName,
                accessLevel,
                source: 'site',
                principalType: 'User',
                isGroup: false
              };
          users.push(convertedUser);
          convertedUsers.push(convertedUser);
        }
        if (groupId !== undefined) {
          groupDirectory.set(groupId, convertedUsers);
        }
      }
    }

    this.sharePointGroupDirectory = groupDirectory;
    return users;
  }

  private async getRoleAssignmentMembers(): Promise<IUser[]> {
    try {
      if (!this.sharePointGroupDirectory) {
        await this.getSharePointRestApiMembers();
      }

      const spHttpClient = this.context.spHttpClient;
      const siteUrl = this.context.pageContext.web.absoluteUrl;
      const response = await spHttpClient.get(
        `${siteUrl}/_api/web/roleassignments?$expand=Member/Users,RoleDefinitionBindings`,
        SPHttpClient.configurations.v1,
        {
          headers: {
            Accept: 'application/json;odata.metadata=minimal'
          }
        }
      );

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      const assignments = (data.value || []) as IRoleAssignment[];
      const members: IUser[] = [];
      const securityGroupPromises: Array<Promise<IUser[]>> = [];

      for (const assignment of assignments) {
        const accessLevel = this.mapRoleDefinitionBindings(assignment.RoleDefinitionBindings);
        const member = assignment.Member;

        if (member.PrincipalType === 1) {
          members.push({
            id: member.LoginName,
            displayName: member.Title,
            mail: member.Email,
            userPrincipalName: member.UserPrincipalName || member.Email || member.LoginName,
            accessLevel,
            source: 'site',
            principalType: 'User',
            isGroup: false
          });
        } else if (member.PrincipalType === 4) {
          const groupUsers = member.Id !== undefined ? this.sharePointGroupDirectory?.get(member.Id) : undefined;
          if (groupUsers) {
            members.push(...groupUsers.map(user => ({
              ...user,
              accessLevel,
              principalType: 'User',
              isGroup: false
            })));
          }
        } else if (member.PrincipalType === 8) {
          const graphGroupId = this.extractGraphGroupId(member.LoginName);
          if (graphGroupId) {
            securityGroupPromises.push(
              this.groupMemberService.resolveGroupMembers(graphGroupId, accessLevel)
            );
          }
        }
      }

      if (securityGroupPromises.length > 0) {
        try {
          const resolved = await Promise.all(securityGroupPromises);
          for (const groupMembers of resolved) {
            members.push(...groupMembers);
          }
        } catch (error) {
          console.warn('Failed to expand security group members', error);
        }
      }

      return members;
    } catch (error) {
      console.warn('Failed to retrieve role assignments', error);
      return [];
    }
  }

  private mapRoleDefinitionBindings(bindings: RoleDefinitionBinding[] = []): AccessLevel {
    const normalizedNames = bindings
      .map(binding => binding.Name?.toLowerCase() ?? '')
      .filter(name => name.length > 0);

    if (normalizedNames.some(name => name.includes('full control') || name.includes('manage hierarchy'))) {
      return 'owner';
    }

    if (normalizedNames.some(name => name.includes('edit') || name.includes('contribute') || name.includes('design'))) {
      return 'member';
    }

    if (normalizedNames.some(name => name.includes('read') || name.includes('view'))) {
      return 'visitor';
    }

    return 'member';
  }

  private extractGraphGroupId(loginName: string): string | undefined {
    if (!loginName) {
      return undefined;
    }
    const match = loginName.match(/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/);
    return match ? match[0] : undefined;
  }
}

export default SitePermissionService;
