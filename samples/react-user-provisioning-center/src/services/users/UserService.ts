import type { GraphService } from '../graph/GraphService';
import { escapeODataLiteral } from '../util/odata';

export interface IDirectoryUserHit {
  id: string;
  displayName: string;
  userPrincipalName: string;
  jobTitle?: string;
}

export interface IVerifiedDomain {
  id: string;
  isDefault: boolean;
}

export interface IDirectoryGroupHit {
  id: string;
  displayName: string;
  mail?: string;
}

export type GroupSearchKind = 'security' | 'm365';

export class UserService {
  private readonly _graph: GraphService;

  public constructor(graph: GraphService) {
    this._graph = graph;
  }

  public async isEmployeeIdTaken(employeeId: string, signal?: AbortSignal): Promise<boolean> {
    const literal: string = escapeODataLiteral(employeeId.trim());

    const result: { value: { id: string }[] } = await this._graph.get<{
      value: { id: string }[];
    }>(
      `/users?$count=true&$top=1&$select=id&$filter=${encodeURIComponent(
        `employeeId eq '${literal}'`
      )}`,
      { headers: { ConsistencyLevel: 'eventual' }, signal }
    );
    return (result.value ?? []).length > 0;
  }

  public async searchUsers(term: string, signal?: AbortSignal): Promise<IDirectoryUserHit[]> {
    const literal: string = escapeODataLiteral(term.trim());
    if (!literal) {
      return [];
    }
    const filter: string =
      `startswith(displayName,'${literal}') or startswith(userPrincipalName,'${literal}') ` +
      `or startswith(mail,'${literal}')`;
    const result: { value: IDirectoryUserHit[] } = await this._graph.get<{
      value: IDirectoryUserHit[];
    }>(
      `/users?$top=8&$select=id,displayName,userPrincipalName,jobTitle&$filter=${encodeURIComponent(
        filter
      )}`,
      { signal }
    );
    return result.value ?? [];
  }

  public async getUserByUpn(upn: string, signal?: AbortSignal): Promise<IDirectoryUserHit | null> {
    const literal: string = escapeODataLiteral(upn.trim());
    if (!literal) {
      return null;
    }
    const result: { value: IDirectoryUserHit[] } = await this._graph.get<{
      value: IDirectoryUserHit[];
    }>(
      `/users?$top=1&$select=id,displayName,userPrincipalName,jobTitle&$filter=${encodeURIComponent(
        `userPrincipalName eq '${literal}'`
      )}`,
      { signal }
    );
    return (result.value ?? [])[0] ?? null;
  }

  public async searchGroups(
    term: string,
    kind: GroupSearchKind,
    signal?: AbortSignal
  ): Promise<IDirectoryGroupHit[]> {
    const literal: string = escapeODataLiteral(term.trim());
    if (!literal) {
      return [];
    }
    const typeFilter: string =
      kind === 'm365' ? `groupTypes/any(t:t eq 'Unified')` : 'securityEnabled eq true and mailEnabled eq false';
    const filter: string = `startswith(displayName,'${literal}') and ${typeFilter}`;
    const result: { value: IDirectoryGroupHit[] } = await this._graph.get<{
      value: IDirectoryGroupHit[];
    }>(`/groups?$top=15&$select=id,displayName,mail&$filter=${encodeURIComponent(filter)}&$count=true`, {
      headers: { ConsistencyLevel: 'eventual' },
      signal
    });
    return result.value ?? [];
  }

  public async getGroupsByIds(ids: string[], signal?: AbortSignal): Promise<IDirectoryGroupHit[]> {
    if (ids.length === 0) {
      return [];
    }
    const clause: string = ids.map((id) => `'${escapeODataLiteral(id)}'`).join(',');
    const result: { value: IDirectoryGroupHit[] } = await this._graph.get<{
      value: IDirectoryGroupHit[];
    }>(`/groups?$top=999&$select=id,displayName,mail&$filter=${encodeURIComponent(`id in (${clause})`)}`, {
      headers: { ConsistencyLevel: 'eventual' },
      signal
    });
    return result.value ?? [];
  }

  public async getUserLicenseSkuIds(userId: string, signal?: AbortSignal): Promise<string[]> {
    const result: { value: { skuId: string }[] } = await this._graph.get<{
      value: { skuId: string }[];
    }>(`/users/${userId}/licenseDetails?$select=skuId`, { signal });
    return (result.value ?? []).map((d) => d.skuId);
  }

  public async getVerifiedDomains(signal?: AbortSignal): Promise<IVerifiedDomain[]> {
    const result: { value: { id: string; isVerified: boolean; isDefault: boolean }[] } =
      await this._graph.get<{
        value: { id: string; isVerified: boolean; isDefault: boolean }[];
      }>('/domains?$select=id,isVerified,isDefault', { signal });
    return (result.value ?? [])
      .filter((d) => d.isVerified)
      .map((d) => ({ id: d.id, isDefault: d.isDefault }))
      .sort((a, b) => Number(b.isDefault) - Number(a.isDefault));
  }
}
