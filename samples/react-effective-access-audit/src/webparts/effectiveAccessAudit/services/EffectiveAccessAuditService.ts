import type { WebPartContext } from '@microsoft/sp-webpart-base';
import { spfi, SPFx, type SPFI } from '@pnp/sp';
import '@pnp/sp/lists';
import '@pnp/sp/security';
import '@pnp/sp/webs';
import type {
  AuditLoadErrorKind,
  IAccessAuditConfig,
  IAccessAuditResult
} from '../models/IAccessAudit';
import {
  MAX_ROLE_ASSIGNMENTS,
  projectAuditResults,
  validateConfig,
  validateRootPath
} from '../utils/auditUtils';

export class AccessAuditDataError extends Error {
  public constructor(public readonly kind: AuditLoadErrorKind, message: string) {
    super(message);
    this.name = 'AccessAuditDataError';
  }
}

function errorStatus(error: unknown): number | undefined {
  if (!error || typeof error !== 'object') {
    return undefined;
  }
  const record = error as Record<string, unknown>;
  const response = record.response && typeof record.response === 'object'
    ? record.response as Record<string, unknown>
    : undefined;
  const status = record.status ?? record.statusCode ?? response?.status;
  const numberStatus = typeof status === 'number' ? status : Number(status);
  return Number.isFinite(numberStatus) ? numberStatus : undefined;
}

export function classifyAccessAuditError(error: unknown): AccessAuditDataError {
  if (error instanceof AccessAuditDataError) {
    return error;
  }
  const status = errorStatus(error);
  if (status === 401 || status === 403) {
    return new AccessAuditDataError('accessDenied', 'SharePoint denied access to the configured web or list.');
  }
  if (status === 404) {
    return new AccessAuditDataError('notFound', 'The configured web or list was not found.');
  }
  if (status === 429 || status === 503) {
    return new AccessAuditDataError('throttled', 'SharePoint is temporarily throttling this request.');
  }
  return new AccessAuditDataError('generic', 'The SharePoint permission data could not be loaded.');
}

function resolveRootWebUrl(rootPath: string, currentWebUrl: string): string {
  if (!validateRootPath(rootPath)) {
    throw new Error('The root web path is not safe.');
  }
  const current = new URL(currentWebUrl);
  const path = rootPath.trim() || current.pathname;
  const resolved = new URL(path, current.origin);
  if (resolved.origin !== current.origin) {
    throw new Error('The root web path must use the current SharePoint origin.');
  }
  return resolved.toString().replace(/\/$/, '');
}

interface IRoleAssignmentResponse {
  readonly Id?: number;
  readonly PrincipalId?: number;
  readonly Member?: Record<string, unknown>;
  readonly RoleDefinitionBindings?: ReadonlyArray<Record<string, unknown>>;
}

interface IWebSecurityResponse {
  readonly HasUniqueRoleAssignments?: boolean;
}

interface IListSecurityResponse {
  readonly Title?: string;
  readonly HasUniqueRoleAssignments?: boolean;
}

export class EffectiveAccessAuditService {
  private readonly sp: SPFI;

  public constructor(context: WebPartContext, rootPath: string) {
    this.sp = spfi(resolveRootWebUrl(rootPath, context.pageContext.web.absoluteUrl)).using(SPFx(context));
  }

  public async getAudit(config: IAccessAuditConfig): Promise<IAccessAuditResult> {
    const errors = validateConfig(config);
    if (errors.length) {
      throw new AccessAuditDataError('generic', errors.join(' '));
    }

    try {
      const webInfoPromise = this.sp.web.select('HasUniqueRoleAssignments')() as Promise<IWebSecurityResponse>;
      const webAssignmentsPromise = this.sp.web.roleAssignments
        .select('Id', 'PrincipalId', 'Member/Title', 'Member/PrincipalType', 'Member/LoginName', 'Member/Email', 'RoleDefinitionBindings/Name')
        .expand('Member', 'RoleDefinitionBindings')
        .top(MAX_ROLE_ASSIGNMENTS)() as Promise<ReadonlyArray<IRoleAssignmentResponse>>;

      const [webInfo, webAssignments] = await Promise.all([webInfoPromise, webAssignmentsPromise]);
      const listTitle = config.listTitle.trim();
      let listInfo: IListSecurityResponse | undefined;
      let listAssignments: ReadonlyArray<IRoleAssignmentResponse> = [];

      if (listTitle) {
        const list = this.sp.web.lists.getByTitle(listTitle);
        const [loadedListInfo, loadedAssignments] = await Promise.all([
          list.select('Title', 'HasUniqueRoleAssignments')() as Promise<IListSecurityResponse>,
          list.roleAssignments
            .select('Id', 'PrincipalId', 'Member/Title', 'Member/PrincipalType', 'Member/LoginName', 'Member/Email', 'RoleDefinitionBindings/Name')
            .expand('Member', 'RoleDefinitionBindings')
            .top(MAX_ROLE_ASSIGNMENTS)() as Promise<ReadonlyArray<IRoleAssignmentResponse>>
        ]);
        listInfo = loadedListInfo;
        listAssignments = loadedAssignments;
      }

      return {
        assignments: projectAuditResults(
          webAssignments,
          listAssignments,
          webInfo.HasUniqueRoleAssignments === true,
          listInfo?.HasUniqueRoleAssignments
        ),
        webUrl: this.sp.web.toUrl(),
        listTitle: listTitle || undefined
      };
    } catch (error) {
      throw classifyAccessAuditError(error);
    }
  }
}
