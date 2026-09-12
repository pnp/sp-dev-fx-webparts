import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { BaseService, IServiceContext } from './BaseService';
import { IGroupDetails, IGroupInfo, IMembership, IPersonInfo, ISiteDetails } from '../types/IGraphModels';
import { ISiteInfo } from '../types/ISiteInfo';

export interface IGraphSitesServiceContext extends IServiceContext {
  context: WebPartContext;
}

interface IGraphPerson {
  id: string;
  displayName?: string;
  mail?: string;
  userPrincipalName?: string;
  jobTitle?: string;
}

interface IGraphGroup {
  id: string;
  displayName?: string;
  description?: string;
  mail?: string;
  mailNickname?: string;
  visibility?: string;
  groupTypes?: string[];
  securityEnabled?: boolean;
  mailEnabled?: boolean;
  createdDateTime?: string;
  renewedDateTime?: string;
  webUrl?: string;
  resourceProvisioningOptions?: string[];
}

interface IGraphSite {
  webUrl?: string;
}

interface ISharePointUser {
  Id: number;
  Title?: string;
  Email?: string;
  UserPrincipalName?: string;
}

/** Normalize a URL for comparison (lower-case, no trailing slash). */
function normalizeUrl(url: string): string {
  return url.replace(/\/$/, '').toLowerCase();
}

function mapPerson(person: IGraphPerson): IPersonInfo {
  return {
    id: person.id,
    displayName: person.displayName ?? person.userPrincipalName ?? person.mail ?? person.id,
    email: person.mail,
    userPrincipalName: person.userPrincipalName,
    jobTitle: person.jobTitle
  };
}

function mapGroup(group: IGraphGroup): IGroupInfo {
  const resourceOptions = group.resourceProvisioningOptions ?? [];
  return {
    id: group.id,
    displayName: group.displayName ?? group.mailNickname ?? group.mail ?? group.id,
    description: group.description,
    mail: group.mail,
    mailNickname: group.mailNickname,
    visibility: group.visibility,
    groupTypes: group.groupTypes ?? [],
    securityEnabled: !!group.securityEnabled,
    mailEnabled: !!group.mailEnabled,
    createdDateTime: group.createdDateTime,
    renewedDateTime: group.renewedDateTime,
    webUrl: group.webUrl,
    isTeam: resourceOptions.includes('Team')
  };
}

function mapSharePointUser(user: ISharePointUser): IPersonInfo {
  return {
    id: String(user.Id),
    displayName: user.Title ?? user.UserPrincipalName ?? user.Email ?? String(user.Id),
    email: user.Email,
    userPrincipalName: user.UserPrincipalName
  };
}

function isSamePerson(left: IPersonInfo | undefined, right: IPersonInfo | undefined): boolean {
  if (!left || !right) {
    return false;
  }
  const leftKeys = [left.id, left.email, left.userPrincipalName]
    .filter((value): value is string => !!value)
    .map((value) => value.toLowerCase());
  const rightKeys = new Set([right.id, right.email, right.userPrincipalName]
    .filter((value): value is string => !!value)
    .map((value) => value.toLowerCase()));
  return leftKeys.some((key) => rightKeys.has(key));
}

/**
 * Microsoft Graph queries for site enrichment: followed-site state,
 * follow/unfollow, group membership, and storage/lifecycle details.
 * Uses the raw MSGraphClient for endpoints not modeled by PnPjs.
 */
export class GraphSitesService extends BaseService {
  private readonly context: WebPartContext;

  public constructor(ctx: IGraphSitesServiceContext) {
    super(ctx);
    this.context = ctx.context;
  }

  /** Resolve a site's Graph id (`{host},{siteGuid},{webGuid}`) from its URL. */
  public async resolveSiteGraphId(siteAbsoluteUrl: string): Promise<string> {
    try {
      const url = new URL(siteAbsoluteUrl);
      const client = await this.context.msGraphClientFactory.getClient('3');
      const site = await client.api(`/sites/${url.hostname}:${url.pathname}`).select('id').get();
      return site.id as string;
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.resolveSiteGraphId');
    }
  }

  /** Set of normalized webUrls the current user follows. */
  public async getFollowedSiteUrls(): Promise<Set<string>> {
    try {
      const client = await this.context.msGraphClientFactory.getClient('3');
      const response = await client.api('/me/followedSites').select('id,webUrl').get();
      const value = (response.value ?? []) as Array<{ webUrl?: string }>;
      const urls = new Set<string>();
      for (const item of value) {
        if (item.webUrl) {
          urls.add(normalizeUrl(item.webUrl));
        }
      }
      return urls;
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.getFollowedSiteUrls');
    }
  }

  /** Follow a site for the current user. */
  public async follow(siteAbsoluteUrl: string): Promise<void> {
    try {
      const id = await this.resolveSiteGraphId(siteAbsoluteUrl);
      const client = await this.context.msGraphClientFactory.getClient('3');
      await client.api('/me/followedSites/add').post({ value: [{ id }] });
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.follow');
    }
  }

  /** Unfollow a site for the current user. */
  public async unfollow(siteAbsoluteUrl: string): Promise<void> {
    try {
      const id = await this.resolveSiteGraphId(siteAbsoluteUrl);
      const client = await this.context.msGraphClientFactory.getClient('3');
      await client.api('/me/followedSites/remove').post({ value: [{ id }] });
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.unfollow');
    }
  }

  /** Owners, members, and SharePoint visitors of a group-connected site/team. */
  public async getMembership(groupId: string, siteUrl?: string): Promise<IMembership> {
    try {
      const client = await this.context.msGraphClientFactory.getClient('3');
      const select = 'id,displayName,mail,userPrincipalName,jobTitle';
      const [ownersResponse, membersResponse, visitors] = await Promise.all([
        client.api(`/groups/${groupId}/owners`).select(select).get(),
        client.api(`/groups/${groupId}/members`).select(select).get(),
        siteUrl ? this.getSiteVisitors(siteUrl) : Promise.resolve([])
      ]);
      return {
        owners: ((ownersResponse.value ?? []) as IGraphPerson[]).map(mapPerson),
        members: ((membersResponse.value ?? []) as IGraphPerson[]).map(mapPerson),
        visitors
      };
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.getMembership');
    }
  }

  /** Microsoft 365 / Entra groups the current user is directly or transitively part of. */
  public async getMyGroups(): Promise<IGroupInfo[]> {
    try {
      const client = await this.context.msGraphClientFactory.getClient('3');
      const select = [
        'id',
        'displayName',
        'description',
        'mail',
        'mailNickname',
        'visibility',
        'groupTypes',
        'securityEnabled',
        'mailEnabled',
        'createdDateTime',
        'renewedDateTime',
        'webUrl',
        'resourceProvisioningOptions'
      ].join(',');
      const response = await client
        .api('/me/transitiveMemberOf/microsoft.graph.group')
        .select(select)
        .top(999)
        .get();
      return ((response.value ?? []) as IGraphGroup[])
        .map(mapGroup)
        .sort((a, b) => a.displayName.localeCompare(b.displayName));
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.getMyGroups');
    }
  }

  /** Group metadata plus owners and members. */
  public async getGroupDetails(groupId: string): Promise<IGroupDetails> {
    try {
      const client = await this.context.msGraphClientFactory.getClient('3');
      const groupSelect = [
        'id',
        'displayName',
        'description',
        'mail',
        'mailNickname',
        'visibility',
        'groupTypes',
        'securityEnabled',
        'mailEnabled',
        'createdDateTime',
        'renewedDateTime',
        'webUrl',
        'resourceProvisioningOptions'
      ].join(',');
      const [groupResponse, siteResponse] = await Promise.all([
        client.api(`/groups/${groupId}`).select(groupSelect).get(),
        client.api(`/groups/${groupId}/sites/root`).select('webUrl').get().catch(() => undefined)
      ]);
      const group = mapGroup(groupResponse as IGraphGroup);
      const siteUrl = (siteResponse as IGraphSite | undefined)?.webUrl ?? group.webUrl;
      const [membership, currentUser] = await Promise.all([
        this.getMembership(groupId, siteUrl),
        this.getCurrentUser()
      ]);
      return {
        ...group,
        webUrl: siteUrl,
        owners: membership.owners,
        members: membership.members,
        visitors: membership.visitors,
        currentUser,
        canManageMembership: membership.owners.some((owner) => isSamePerson(owner, currentUser))
      };
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.getGroupDetails');
    }
  }

  /** Current signed-in user as represented by Microsoft Graph. */
  public async getCurrentUser(): Promise<IPersonInfo> {
    try {
      const client = await this.context.msGraphClientFactory.getClient('3');
      const response = await client.api('/me').select('id,displayName,mail,userPrincipalName,jobTitle').get();
      return mapPerson(response as IGraphPerson);
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.getCurrentUser');
    }
  }

  /** Resolve a user by UPN or email before adding them to owners/members. */
  public async resolveUser(query: string): Promise<IPersonInfo> {
    try {
      const client = await this.context.msGraphClientFactory.getClient('3');
      const trimmed = query.trim();
      const response = await client
        .api(`/users/${encodeURIComponent(trimmed)}`)
        .select('id,displayName,mail,userPrincipalName,jobTitle')
        .get();
      return mapPerson(response as IGraphPerson);
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.resolveUser');
    }
  }

  /** Add a user to a group's members or owners collection. */
  public async addGroupUser(groupId: string, userQuery: string, role: 'members' | 'owners'): Promise<IPersonInfo> {
    try {
      const user = await this.resolveUser(userQuery);
      const client = await this.context.msGraphClientFactory.getClient('3');
      await client.api(`/groups/${groupId}/${role}/$ref`).post({
        '@odata.id': `https://graph.microsoft.com/v1.0/directoryObjects/${user.id}`
      });
      return user;
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.addGroupUser');
    }
  }

  /** Remove a user from a group's members or owners collection. */
  public async removeGroupUser(groupId: string, userId: string, role: 'members' | 'owners'): Promise<void> {
    try {
      const client = await this.context.msGraphClientFactory.getClient('3');
      await client.api(`/groups/${groupId}/${role}/${userId}/$ref`).delete();
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.removeGroupUser');
    }
  }

  /** SharePoint users in the associated visitors group for a group-connected site. */
  private async getSiteVisitors(siteUrl: string): Promise<IPersonInfo[]> {
    try {
      const response = await this.context.spHttpClient.get(
        `${siteUrl}/_api/web/AssociatedVisitorGroup/users?$select=Id,Title,Email,UserPrincipalName`,
        SPHttpClient.configurations.v1
      );
      if (!response.ok) {
        return [];
      }
      const payload = (await response.json()) as { value?: ISharePointUser[] };
      return (payload.value ?? []).map(mapSharePointUser);
    } catch {
      return [];
    }
  }

  /** Storage usage and lifecycle dates for a site. */
  public async getSiteDetails(site: ISiteInfo): Promise<ISiteDetails> {
    try {
      const client = await this.context.msGraphClientFactory.getClient('3');
      const graphId = await this.resolveSiteGraphId(site.url);
      const [siteResponse, driveResponse] = await Promise.all([
        client
          .api(`/sites/${graphId}`)
          .select('description,createdDateTime,lastModifiedDateTime')
          .get(),
        client
          .api(`/sites/${graphId}/drive`)
          .select('quota')
          .get()
          .catch(() => undefined)
      ]);
      const quota = driveResponse?.quota ?? {};
      return {
        description: siteResponse.description,
        createdDateTime: siteResponse.createdDateTime,
        lastModifiedDateTime: siteResponse.lastModifiedDateTime,
        storageUsed: quota.used,
        storageTotal: quota.total,
        storageRemaining: quota.remaining
      };
    } catch (error) {
      throw this.toError(error, 'GraphSitesService.getSiteDetails');
    }
  }
}
