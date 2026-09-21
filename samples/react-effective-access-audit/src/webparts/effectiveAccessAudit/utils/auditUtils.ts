import type {
  AuditInheritance,
  AuditScope,
  IAccessAuditConfig,
  IRoleAssignmentView
} from '../models/IAccessAudit';

export const MAX_ROLE_ASSIGNMENTS = 100;
export const MAX_ROOT_PATH_LENGTH = 200;
export const MAX_LIST_TITLE_LENGTH = 128;
export const MAX_ROLE_NAMES = 30;
export const MAX_DISPLAY_TEXT_LENGTH = 256;

const PATH_TRAVERSAL_PATTERN = /(^|\/)\.\.?($|\/)/;

function containsControlCharacter(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const code = value.charCodeAt(index);
    if (code <= 0x1f || code === 0x7f) {
      return true;
    }
  }
  return false;
}

function text(value: unknown, maxLength = MAX_DISPLAY_TEXT_LENGTH): string {
  if (typeof value !== 'string') {
    return '';
  }
  const trimmed = value.trim();
  return trimmed.length > maxLength ? trimmed.slice(0, maxLength) : trimmed;
}

function decodePath(value: string): string | undefined {
  let decoded = value;
  for (let index = 0; index < 3; index += 1) {
    try {
      const next = decodeURIComponent(decoded);
      if (next === decoded) {
        return decoded;
      }
      decoded = next;
    } catch {
      return undefined;
    }
  }
  return /%[0-9a-f]{2}/i.test(decoded) ? undefined : decoded;
}

export function validateRootPath(value: unknown): boolean {
  if (typeof value !== 'string' || value.length > MAX_ROOT_PATH_LENGTH) {
    return false;
  }
  const path = value.trim();
  if (!path) {
    return true;
  }
  const decoded = decodePath(path);
  return !!decoded
    && decoded.startsWith('/')
    && !decoded.startsWith('//')
    && !/[?#\\]/.test(decoded)
    && !containsControlCharacter(decoded)
    && !PATH_TRAVERSAL_PATTERN.test(decoded);
}

export function validateListTitle(value: unknown, required = false): boolean {
  if (typeof value !== 'string' || value.length > MAX_LIST_TITLE_LENGTH) {
    return false;
  }
  const title = value.trim();
  return (required ? !!title : true) && !containsControlCharacter(title);
}

export function validateConfig(config: Partial<IAccessAuditConfig> | unknown): ReadonlyArray<string> {
  const candidate = config && typeof config === 'object' ? config as Partial<IAccessAuditConfig> : {};
  const errors: string[] = [];
  if (!validateRootPath(candidate.rootPath)) {
    errors.push('Root web path must be a site-relative path without a URL, query, fragment, backslash, or traversal.');
  }
  if (!validateListTitle(candidate.listTitle)) {
    errors.push('List title must be 128 characters or fewer and contain no control characters.');
  }
  return errors;
}

function principalType(value: unknown): string {
  const type = typeof value === 'number' ? value : Number(value);
  if (type & 8) return 'SharePoint group';
  if (type & 4) return 'Security group';
  if (type & 2) return 'Distribution list';
  if (type & 1) return 'User';
  return 'Unknown principal';
}

function objectValue(value: unknown, key: string): unknown {
  return value && typeof value === 'object' ? (value as Record<string, unknown>)[key] : undefined;
}

export function mapRoleAssignments(
  rawAssignments: ReadonlyArray<unknown> | unknown,
  scope: AuditScope,
  inheritance: AuditInheritance
): IRoleAssignmentView[] {
  if (!Array.isArray(rawAssignments)) {
    return [];
  }
  return rawAssignments.slice(0, MAX_ROLE_ASSIGNMENTS).map((assignment, index) => {
    const member = objectValue(assignment, 'Member');
    const id = text(objectValue(assignment, 'PrincipalId')) || text(objectValue(assignment, 'Id')) || String(index + 1);
    const title = text(objectValue(member, 'Title'))
      || text(objectValue(member, 'LoginName'))
      || text(objectValue(member, 'Email'))
      || 'Unknown principal';
    const roleBindings = objectValue(assignment, 'RoleDefinitionBindings');
    const roleNames = Array.isArray(roleBindings)
      ? roleBindings
        .map((role) => text(objectValue(role, 'Name')))
        .filter(Boolean)
        .slice(0, MAX_ROLE_NAMES)
      : [];
    const loginName = text(objectValue(member, 'LoginName')) || undefined;
    const email = text(objectValue(member, 'Email')) || undefined;
    return {
      key: `${scope}-${id}-${index}`,
      principalTitle: title,
      principalType: principalType(objectValue(member, 'PrincipalType')),
      loginName,
      email,
      roleNames,
      scope,
      inheritance
    };
  });
}

export function projectAuditResults(
  webAssignments: ReadonlyArray<unknown> | unknown,
  listAssignments: ReadonlyArray<unknown> | unknown,
  webIsUnique: boolean,
  listIsUnique: boolean | undefined
): IRoleAssignmentView[] {
  return [
    ...mapRoleAssignments(webAssignments, 'Web', webIsUnique ? 'Unique' : 'Inherited'),
    ...mapRoleAssignments(listAssignments, 'List', listIsUnique ? 'Unique' : 'Inherited')
  ].slice(0, MAX_ROLE_ASSIGNMENTS);
}
