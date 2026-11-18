import type { GraphService } from '../graph/GraphService';
import type { SharePointDataService } from '../sharePointData/SharePointDataService';
import { isDelegationActive } from '../../models';
import { BOOTSTRAP_PERMISSIONS } from '../../models';
import type { AppPermission, AppRole, IApprovalDelegation, IResolvedRoles, IRoleDefinition } from '../../models';

const CACHE_TTL_MS: number = 15 * 60 * 1000;
const CHECK_MEMBER_GROUPS_LIMIT: number = 20;

export const DEFAULT_ROLE_PERMISSIONS: Record<AppRole, AppPermission[]> = {
  ITAdmin: [
    'createJobs',
    'approveJobs',
    'runJobs',
    'retrySteps',
    'skipSteps',
    'cancelJobs',
    'rollbackJobs',
    'manageTemplates',
    'viewAudit',
    'manageTasks',
    'manageSettings',
    'manageDelegations'
  ],
  HRAdmin: ['createJobs', 'approveJobs', 'viewAudit'],
  DepartmentManager: ['createJobs'],
  ServiceDesk: ['createJobs', 'runJobs', 'retrySteps', 'manageTasks'],
  Auditor: ['viewAudit'],
  ReadOnly: []
};

export class RoleService {
  private readonly _graph: GraphService;
  private readonly _data: SharePointDataService;
  private readonly _operatorUpn: string;
  private _cache: { value: IResolvedRoles; expiresAt: number } | undefined;

  public constructor(graph: GraphService, data: SharePointDataService, operatorUpn: string = '') {
    this._graph = graph;
    this._data = data;
    this._operatorUpn = operatorUpn;
  }

  public async getResolvedRoles(forceRefresh: boolean = false): Promise<IResolvedRoles> {
    if (!forceRefresh && this._cache && this._cache.expiresAt > Date.now()) {
      return this._cache.value;
    }
    const value: IResolvedRoles = await this._resolve();
    this._cache = { value, expiresAt: Date.now() + CACHE_TTL_MS };
    return value;
  }

  public async isMemberOfGroup(groupId: string, signal?: AbortSignal): Promise<boolean> {
    if (!groupId) {
      return false;
    }
    try {
      const result: { value: string[] } = await this._graph.post<{ value: string[] }>(
        '/me/checkMemberGroups',
        { groupIds: [groupId] },
        { signal }
      );
      return (result.value ?? []).indexOf(groupId) !== -1;
    } catch {
      return false;
    }
  }

  private async _resolve(): Promise<IResolvedRoles> {
    let definitions: IRoleDefinition[] = [];
    try {
      definitions = await this._data.getRoleDefinitions();
    } catch {
      definitions = [];
    }

    const groupIds: string[] = definitions.map((d) => d.memberGroupId);
    const memberOf: Set<string> = new Set();
    for (let i = 0; i < groupIds.length; i += CHECK_MEMBER_GROUPS_LIMIT) {
      const chunk: string[] = groupIds.slice(i, i + CHECK_MEMBER_GROUPS_LIMIT);
      try {
        const result: { value: string[] } = await this._graph.post<{ value: string[] }>('/me/checkMemberGroups', {
          groupIds: chunk
        });
        for (const id of result.value ?? []) {
          memberOf.add(id);
        }
      } catch (chunkErr) {
        void chunkErr;
      }
    }

    const roles: AppRole[] = [];
    const permissions: Set<AppPermission> = new Set();
    for (const definition of definitions) {
      if (!memberOf.has(definition.memberGroupId)) {
        continue;
      }
      roles.push(definition.role);
      const effective: AppPermission[] =
        definition.permissions.length > 0 ? definition.permissions : DEFAULT_ROLE_PERMISSIONS[definition.role] ?? [];
      for (const permission of effective) {
        permissions.add(permission);
      }
    }
    const unconfigured: boolean = definitions.length === 0;
    let bootstrapGranted: boolean = false;
    if (unconfigured && roles.length === 0) {
      try {
        bootstrapGranted = await this._data.canManageWeb();
      } catch {
        bootstrapGranted = false;
      }
      if (bootstrapGranted) {
        for (const permission of BOOTSTRAP_PERMISSIONS) {
          permissions.add(permission);
        }
      }
    }

    if (roles.length === 0) {
      roles.push('ReadOnly');
    }

    try {
      const delegations: IApprovalDelegation[] = await this._data.getActiveDelegationsFor(this._operatorUpn);
      if (delegations.some((d) => isDelegationActive(d))) {
        permissions.add('approveJobs');
      }
    } catch (delegationErr) {
      void delegationErr;
    }

    return {
      roles,
      permissions,
      resolvedUtc: new Date().toISOString(),
      unconfigured,
      bootstrapGranted
    };
  }
}
