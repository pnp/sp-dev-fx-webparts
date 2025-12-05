import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IUser, IGroup } from '../types/interfaces';
import { CacheService } from './CacheService';

// Type for Microsoft Graph Client
interface IMSGraphClient {
  api(path: string): IMSGraphClientRequest;
}

interface IMSGraphClientRequest {
  select(properties: string): IMSGraphClientRequest;
  get(): Promise<{ value?: unknown[] } & Record<string, unknown>>;
}

interface IBatchRequest {
  id: string;
  method: string;
  url: string;
}

interface IBatchResponse {
  responses: Array<{
    id: string;
    status: number;
    body: { value?: IUser[] };
  }>;
}

export interface IGroupMemberService {
  getGroupMembers(groupId: string, role: 'admin' | 'member'): Promise<IUser[]>;
  getUserGroups(): Promise<IGroup[]>;
  batchGetGroupMembers(requests: Array<{ groupId: string; role: 'admin' | 'member' }>): Promise<Record<string, IUser[]>>;
  resolveGroupMembers(groupId: string, accessLevel: 'owner' | 'admin' | 'member' | 'visitor'): Promise<IUser[]>;
}

export class GroupMemberService implements IGroupMemberService {
  private context: WebPartContext;
  private graphClient: IMSGraphClient | undefined;
  private readonly BATCH_SIZE = 20;
  private readonly RATE_LIMIT_DELAY = 100;
  private cacheService: CacheService;

  constructor(context: WebPartContext) {
    this.context = context;
    this.cacheService = CacheService.getInstance();
  }

  private async getGraphClient(): Promise<IMSGraphClient> {
    if (!this.graphClient) {
      this.graphClient = await this.context.msGraphClientFactory.getClient('3');
    }
    return this.graphClient;
  }

  public async getUserGroups(): Promise<IGroup[]> {
    try {
      const client = await this.getGraphClient();
      const response = await client.api('/me/memberOf').get();
      
      return (response.value || []).filter(
        (group: unknown) => (group as Record<string, unknown>)['@odata.type'] === '#microsoft.graph.group'
      ).map((group: unknown) => {
        const g = group as Record<string, unknown>;
        return {
          id: g.id as string,
          displayName: g.displayName as string,
          '@odata.type': g['@odata.type'] as string,
          description: g.description as string
        };
      });
    } catch (error) {
      console.error('Error fetching user groups:', error);
      throw new Error('Failed to fetch user groups');
    }
  }

  public async getGroupMembers(groupId: string, role: 'admin' | 'member'): Promise<IUser[]> {
    const cacheKey = `groupUsers_${role}_${groupId}`;
    
    const cachedData = this.cacheService.getUserData(cacheKey);
    if (cachedData) {
      return cachedData as IUser[];
    }

    try {
      const client = await this.getGraphClient();
      const endpoint = role === 'admin' ? `/groups/${groupId}/owners` : `/groups/${groupId}/members`;
      
      const response = await client
        .api(endpoint)
        .select('id,displayName,jobTitle,mail,userPrincipalName,department,officeLocation')
        .get();

      const users = response?.value || [];
      
      const mappedUsers = users.map((user: unknown) => {
        const u = user as Record<string, unknown>;
        return {
          id: u.id as string,
          displayName: u.displayName as string,
          jobTitle: u.jobTitle as string,
          mail: u.mail as string,
          userPrincipalName: u.userPrincipalName as string,
          department: u.department as string,
          officeLocation: u.officeLocation as string
        };
      });

      this.cacheService.setUserData(cacheKey, mappedUsers);
      
      return mappedUsers;
    } catch (error) {
      console.error(`Error fetching ${role}s for group ${groupId}:`, error);
      return [];
    }
  }

  public async batchGetGroupMembers(requests: Array<{ groupId: string; role: 'admin' | 'member' }>): Promise<Record<string, IUser[]>> {
    if (requests.length === 0) {
      return {};
    }

    const results: Record<string, IUser[]> = {};
    const uncachedRequests: Array<{ groupId: string; role: 'admin' | 'member'; requestId: string }> = [];

    for (const request of requests) {
      const cacheKey = `groupUsers_${request.role}_${request.groupId}`;
      const cachedData = this.cacheService.getUserData(cacheKey);
      
      if (cachedData) {
        results[`${request.groupId}_${request.role}`] = cachedData as IUser[];
        continue;
      }

      uncachedRequests.push({
        ...request,
        requestId: `${request.groupId}_${request.role}`
      });
    }

    if (uncachedRequests.length === 0) {
      return results;
    }

    // Process in batches to respect Graph API limits
    const batches = [];
    for (let i = 0; i < uncachedRequests.length; i += this.BATCH_SIZE) {
      batches.push(uncachedRequests.slice(i, i + this.BATCH_SIZE));
    }

    try {
      for (const batch of batches) {
        const batchRequests: IBatchRequest[] = batch.map((req, index) => ({
          id: `${index}`,
          method: 'GET',
          url: req.role === 'admin' 
            ? `/groups/${req.groupId}/owners?$select=id,displayName,jobTitle,mail,userPrincipalName,department,officeLocation`
            : `/groups/${req.groupId}/members?$select=id,displayName,jobTitle,mail,userPrincipalName,department,officeLocation`
        }));

        const batchPayload = {
          requests: batchRequests
        };

        const tokenProvider = await this.context.aadTokenProviderFactory.getTokenProvider();
        const token = await tokenProvider.getToken("https://graph.microsoft.com");

        const batchResponse = await fetch('https://graph.microsoft.com/v1.0/$batch', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(batchPayload)
        });

        if (!batchResponse.ok) {
          throw new Error(`Batch request failed: ${batchResponse.statusText}`);
        }

        const batchResult: IBatchResponse = await batchResponse.json();

        for (let i = 0; i < batchResult.responses.length; i++) {
          const response = batchResult.responses[i];
          const originalRequest = batch[parseInt(response.id)];

          if (response.status === 200 && response.body?.value) {
            const users = response.body.value.map((user: unknown) => {
              const u = user as Record<string, unknown>;
              return {
                id: u.id as string,
                displayName: u.displayName as string,
                jobTitle: u.jobTitle as string,
                mail: u.mail as string,
                userPrincipalName: u.userPrincipalName as string,
                department: u.department as string,
                officeLocation: u.officeLocation as string
              };
            });

            results[originalRequest.requestId] = users;

            const cacheKey = `groupUsers_${originalRequest.role}_${originalRequest.groupId}`;
            this.cacheService.setUserData(cacheKey, users);
          } else {
            console.warn(`Failed to fetch ${originalRequest.role}s for group ${originalRequest.groupId}:`, response.status);
            results[originalRequest.requestId] = [];
          }
        }

        if (batches.indexOf(batch) < batches.length - 1) {
          await new Promise(resolve => setTimeout(resolve, this.RATE_LIMIT_DELAY * 5));
        }
      }
    } catch (error) {
      console.error('Batch request failed:', error);
      for (const request of uncachedRequests) {
        if (!results[request.requestId]) {
          try {
            const users = await this.getGroupMembers(request.groupId, request.role);
            results[request.requestId] = users;
          } catch (individualError) {
            console.warn(`Fallback request failed for ${request.requestId}:`, individualError);
            results[request.requestId] = [];
          }
        }
      }
    }

    return results;
  }

  public async resolveGroupMembers(groupId: string, accessLevel: 'owner' | 'admin' | 'member' | 'visitor'): Promise<IUser[]> {
    const cacheKey = `resolvedGroupMembers_${groupId}_${accessLevel}`;
    
    const cachedData = this.cacheService.getUserData(cacheKey);
    if (cachedData) {
      return cachedData as IUser[];
    }

    try {
      const client = await this.getGraphClient();
      
      // First, try to get group information to determine type
      const groupInfo = await client.api(`/groups/${groupId}`).select('id,displayName,groupTypes').get();
      const groupInfoTyped = groupInfo as Record<string, unknown>;
      const groupTypes = groupInfoTyped.groupTypes as string[] || [];
      
      const members: IUser[] = [];
      
      if (groupTypes.includes('Unified')) {
        try {
          const groupMembers = await this.getGroupMembers(groupId, 'member');
          members.push(...groupMembers.map(user => ({
            ...user,
            accessLevel,
            source: 'site' as const
          })));
        } catch (error) {
          console.warn(`Failed to get M365 group members for ${groupId}:`, error);
        }
      } else {
        try {
          const response = await client
            .api(`/groups/${groupId}/members`)
            .select('id,displayName,mail,userPrincipalName,jobTitle,department,officeLocation')
            .get();

          const groupMembers = response.value || [];
          members.push(...groupMembers.map((member: unknown) => {
            const m = member as Record<string, unknown>;
            return {
              id: m.id as string,
              displayName: m.displayName as string,
              mail: m.mail as string,
              userPrincipalName: m.userPrincipalName as string,
              jobTitle: m.jobTitle as string,
              department: m.department as string,
              officeLocation: m.officeLocation as string,
              accessLevel,
              source: 'site' as const
            };
          }));
        } catch (error) {
          console.warn(`Failed to get security group members for ${groupId}:`, error);
        }
      }

      this.cacheService.setUserData(cacheKey, members);
      
      return members;
    } catch (error) {
      console.error(`Error resolving group members for ${groupId}:`, error);
      return [];
    }
  }
}