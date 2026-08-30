import {
  mapRoleAssignments,
  projectAuditResults,
  validateConfig,
  validateListTitle,
  validateRootPath
} from './auditUtils';

describe('audit validation', () => {
  it('accepts blank or safe site-relative paths', () => {
    expect(validateRootPath('')).toBe(true);
    expect(validateRootPath('/sites/Operations/Shared%20Docs')).toBe(true);
    expect(validateRootPath('/sites/Operations?x=1')).toBe(false);
  });

  it('rejects malformed, absolute, encoded, and unbounded paths', () => {
    expect(validateRootPath('https://tenant.sharepoint.com/sites/a')).toBe(false);
    expect(validateRootPath('\\sites\\a')).toBe(false);
    expect(validateRootPath('/sites/a/../b')).toBe(false);
    expect(validateRootPath('/sites/%252e%252e/secret')).toBe(false);
    expect(validateRootPath('/sites/%ZZ')).toBe(false);
    expect(validateRootPath('/' + 'a'.repeat(200))).toBe(false);
    expect(validateRootPath(null)).toBe(false);
  });

  it('validates optional list titles and complete config', () => {
    expect(validateListTitle('')).toBe(true);
    expect(validateListTitle('Access Requests')).toBe(true);
    expect(validateListTitle('bad\nname')).toBe(false);
    expect(validateConfig({ rootPath: '/sites/a', listTitle: '' })).toEqual([]);
    expect(validateConfig({ rootPath: '/sites/a?x=1', listTitle: 'x' })).toHaveLength(1);
    expect(validateConfig('malformed')).toHaveLength(2);
  });
});

describe('audit mapping', () => {
  it('maps principal and role fields without expanding groups', () => {
    const result = mapRoleAssignments([{
      Id: 4,
      PrincipalId: 12,
      Member: {
        Title: 'Operations readers',
        PrincipalType: 8,
        LoginName: 'c:0o.c|federateddirectoryclaimprovider|group',
        Email: ''
      },
      RoleDefinitionBindings: [{ Name: 'Read' }, { Name: 'Limited Access' }]
    }], 'List', 'Unique');
    expect(result).toEqual([expect.objectContaining({
      principalTitle: 'Operations readers',
      principalType: 'SharePoint group',
      loginName: 'c:0o.c|federateddirectoryclaimprovider|group',
      roleNames: ['Read', 'Limited Access'],
      scope: 'List',
      inheritance: 'Unique'
    })]);
  });

  it('returns empty output for empty and malformed API collections', () => {
    expect(mapRoleAssignments([], 'Web', 'Inherited')).toEqual([]);
    expect(mapRoleAssignments(undefined, 'Web', 'Inherited')).toEqual([]);
    expect(projectAuditResults([], [], false, undefined)).toEqual([]);
    expect(mapRoleAssignments([{ Member: null }], 'Web', 'Inherited')).toEqual([
      expect.objectContaining({ principalTitle: 'Unknown principal', roleNames: [] })
    ]);
  });
});
