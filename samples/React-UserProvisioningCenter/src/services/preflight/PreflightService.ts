import { batchTyped, type GraphService } from '../graph/GraphService';
import { GraphServiceError } from '../graph/GraphError';
import type { SharePointDataService } from '../sharePointData/SharePointDataService';
import type { TelemetryService } from '../telemetry/TelemetryService';
import type { CapabilityId, ICapabilityCheck, IPreflightResult, ISchemaGap } from '../../models';

export const REQUIRED_GRAPH_SCOPES: string[] = [
  'User.ReadWrite.All',
  'GroupMember.ReadWrite.All',
  'Organization.Read.All',
  'Directory.Read.All',
  'UserAuthenticationMethod.ReadWrite.All',
  'Mail.Send',
  'User.Invite.All',
  'TeamMember.ReadWrite.All'
];

const ROLE_TEMPLATE: Record<string, string> = {
  globalAdministrator: '62e90394-69f5-4237-9190-012177145e10',
  userAdministrator: 'fe930be7-5e62-47db-91af-98c3a49a38b1',
  licenseAdministrator: '4d6ac14f-3453-41d0-bef9-a3e0c569773a',
  groupsAdministrator: 'fdd7a751-b60b-444a-984c-02652fe8fa1c',
  teamsAdministrator: '69091246-20e8-4a56-aa4d-066075b2a7a8',
  authenticationAdministrator: 'c4e39bd9-1100-46d3-8c65-fb160da0071f',
  privilegedAuthenticationAdministrator: '7be44c8a-adaf-4e2a-84d6-ab2649e08a13',
  guestInviter: '95e79109-95c0-4d8e-aee3-d01accf2d47b'
};

interface ICapabilityRule {
  capability: CapabilityId;
  label: string;
  detail: string;
  satisfiedBy: string[];
}

const CAPABILITY_RULES: ICapabilityRule[] = [
  {
    capability: 'createUsers',
    label: 'Create and update users',
    detail: 'Requires the User Administrator role.',
    satisfiedBy: [ROLE_TEMPLATE.userAdministrator]
  },
  {
    capability: 'assignLicenses',
    label: 'Assign and remove licenses',
    detail: 'Requires the License Administrator (or User Administrator) role.',
    satisfiedBy: [ROLE_TEMPLATE.licenseAdministrator, ROLE_TEMPLATE.userAdministrator]
  },
  {
    capability: 'groupWrites',
    label: 'Manage group membership',
    detail: 'Requires the Groups Administrator role, or ownership of the target groups.',
    satisfiedBy: [ROLE_TEMPLATE.groupsAdministrator]
  },
  {
    capability: 'teamsWrites',
    label: 'Manage Teams membership',
    detail: 'Requires the Teams Administrator role, or ownership of the target teams.',
    satisfiedBy: [ROLE_TEMPLATE.teamsAdministrator]
  },
  {
    capability: 'tapCreation',
    label: 'Create Temporary Access Passes',
    detail: 'Requires the Authentication Administrator role.',
    satisfiedBy: [ROLE_TEMPLATE.authenticationAdministrator, ROLE_TEMPLATE.privilegedAuthenticationAdministrator]
  },
  {
    capability: 'guestInvites',
    label: 'Invite guests',
    detail: 'Requires the Guest Inviter or User Administrator role.',
    satisfiedBy: [ROLE_TEMPLATE.guestInviter, ROLE_TEMPLATE.userAdministrator]
  },
  {
    capability: 'revokeSessions',
    label: 'Revoke sign-in sessions (offboarding)',
    detail: 'Requires the User Administrator role.',
    satisfiedBy: [ROLE_TEMPLATE.userAdministrator]
  }
];

interface IDirectoryRolesResponse {
  value: { roleTemplateId?: string; displayName?: string }[];
}

export class PreflightService {
  private readonly _graph: GraphService;
  private readonly _data: SharePointDataService;
  private _telemetry: TelemetryService | undefined;

  public constructor(graph: GraphService, data: SharePointDataService) {
    this._graph = graph;
    this._data = data;
  }

  public setTelemetry(telemetry: TelemetryService): void {
    this._telemetry = telemetry;
  }

  public async run(signal?: AbortSignal): Promise<IPreflightResult> {
    const checks: ICapabilityCheck[] = [];
    const started: number = Date.now();

    try {
      const me: { userPrincipalName: string } = await this._graph.get<{ userPrincipalName: string }>(
        '/me?$select=userPrincipalName',
        { signal }
      );

      const probes = await batchTyped(
        this._graph,
        {
          org: { method: 'GET', url: '/organization?$select=id' },
          skus: { method: 'GET', url: '/subscribedSkus' },
          users: { method: 'GET', url: '/users?$top=1&$select=id' }
        },
        { signal }
      );
      const probeOk = (id: keyof typeof probes): boolean => {
        const status: number = probes[id]?.status ?? 0;
        return status >= 200 && status < 300;
      };
      checks.push({
        capability: 'directoryRead',
        label: 'Read the directory',
        detail: 'Directory.Read.All / Organization.Read.All consent missing or denied.',
        ok: probeOk('org') && probeOk('users')
      });
      checks.push({
        capability: 'licenseRead',
        label: 'Read subscribed licenses',
        detail: 'Organization.Read.All consent missing or denied.',
        ok: probeOk('skus')
      });

      let sharePointReadOk: boolean = false;
      try {
        await this._data.getRoleDefinitions();
        sharePointReadOk = true;
      } catch {
        sharePointReadOk = false;
      }
      checks.push({
        capability: 'sharePointRead',
        label: 'Read UPC lists',
        detail: 'Cannot read the UPC SharePoint lists. Check list permissions.',
        ok: sharePointReadOk
      });

      let sharePointWriteOk: boolean = false;
      try {
        sharePointWriteOk = await this._data.probeWriteAccess();
      } catch {
        sharePointWriteOk = false;
      }
      checks.push({
        capability: 'sharePointWrite',
        label: 'Write to UPC lists',
        detail: 'Cannot write the UPC SharePoint lists. Check list permissions.',
        ok: sharePointWriteOk
      });

      let schemaGaps: ISchemaGap[] = [];
      if (sharePointReadOk) {
        try {
          const schema = await this._data.validateSchema();
          schemaGaps = schema.gaps;
        } catch {
          schemaGaps = [];
        }
      }
      checks.push({
        capability: 'schemaValid',
        label: 'UPC list columns are up to date',
        detail:
          schemaGaps.length > 0
            ? `Missing or unreadable: ${schemaGaps
                .map((g) =>
                  g.missingList
                    ? `${g.list} (list not found)`
                    : g.missingFields.length > 0
                      ? `${g.list} (${g.missingFields.join(', ')})`
                      : `${g.list} (${g.error})`
                )
                .join('; ')}. Run Provision lists from the web part properties.`
            : 'All UPC lists have the columns this version expects.',
        ok: schemaGaps.length === 0
      });

      let groupMemberReadOk: boolean = false;
      try {
        await this._graph.post<{ value: string[] }>(
          '/me/checkMemberGroups',
          { groupIds: ['00000000-0000-0000-0000-000000000000'] },
          { signal }
        );
        groupMemberReadOk = true;
      } catch (err) {
        groupMemberReadOk = err instanceof GraphServiceError && err.statusCode === 403 ? false : true;
      }
      checks.push({
        capability: 'groupMemberRead',
        label: 'Read group membership',
        detail: 'GroupMember.Read.All or Group.Read.All consent missing or denied.',
        ok: groupMemberReadOk
      });

      let templateIds: string[] = [];
      try {
        const roles: IDirectoryRolesResponse = await this._graph.get<IDirectoryRolesResponse>(
          '/me/memberOf/microsoft.graph.directoryRole?$select=displayName,roleTemplateId',
          { signal }
        );
        templateIds = (roles.value ?? []).map((r) => r.roleTemplateId ?? '').filter((id) => id.length > 0);
      } catch {
        templateIds = [];
      }
      const isGlobalAdmin: boolean = templateIds.indexOf(ROLE_TEMPLATE.globalAdministrator) !== -1;

      for (const rule of CAPABILITY_RULES) {
        const ok: boolean = isGlobalAdmin || rule.satisfiedBy.some((id) => templateIds.indexOf(id) !== -1);
        checks.push({ capability: rule.capability, label: rule.label, detail: rule.detail, ok });
      }

      const result: IPreflightResult = {
        checks,
        missing: checks.filter((c) => !c.ok),
        directoryRoleTemplateIds: templateIds,
        operatorUpn: me.userPrincipalName,
        requiredGraphScopes: REQUIRED_GRAPH_SCOPES,
        schemaGaps
      };
      if (this._telemetry) {
        this._telemetry.trackEvent(
          'preflight.run',
          { operatorUpn: me.userPrincipalName, missingCount: result.missing.length, globalAdmin: isGlobalAdmin },
          'info'
        );
      }
      return result;
    } catch (err) {
      if (this._telemetry) {
        this._telemetry.trackError(err, { durationMs: Date.now() - started });
      }
      throw err;
    }
  }
}
