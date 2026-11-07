import {
  addOnlyBasePermissions,
  addOnlyRoleName,
  assignmentIncludesRole,
  isAddOnlyRole,
  maskHasKind,
  parsePermissionMask,
  permissionKind,
  visitorAddOnlyRoleId,
  visitorsCanFlagFromAssignments,
  visitorsHaveAddOnly
} from "./visitorAccess";

describe("Page Trust - Add only permissions", () => {
  const mask = addOnlyBasePermissions();

  it("sets the add and view bits and leaves edit and delete off", () => {
    expect(addOnlyRoleName).toBe("Page Trust - Add only");
    expect(mask).toEqual({ low: 196643, high: 0 });
    expect(maskHasKind(mask, permissionKind.addListItems)).toBe(true);
    expect(maskHasKind(mask, permissionKind.viewListItems)).toBe(true);
    expect(maskHasKind(mask, permissionKind.openItems)).toBe(true);
    expect(maskHasKind(mask, permissionKind.viewPages)).toBe(true);
    expect(maskHasKind(mask, permissionKind.open)).toBe(true);
    expect(maskHasKind(mask, permissionKind.editListItems)).toBe(false);
    expect(maskHasKind(mask, permissionKind.deleteListItems)).toBe(false);
    expect(maskHasKind(mask, permissionKind.viewFormPages)).toBe(false);
    expect(maskHasKind(mask, permissionKind.useClientIntegration)).toBe(false);
    expect(maskHasKind(mask, permissionKind.useRemoteApis)).toBe(false);
    expect(isAddOnlyRole(mask)).toBe(true);
  });

  it("rejects a role that can edit or delete, or that cannot add", () => {
    expect(isAddOnlyRole({ low: mask.low + 4, high: 0 })).toBe(false);
    expect(isAddOnlyRole({ low: mask.low + 8, high: 0 })).toBe(false);
    expect(isAddOnlyRole({ low: mask.low - 2, high: 0 })).toBe(false);
  });

  it("accepts extra view bits that still cannot edit or delete", () => {
    const withViewForms = { low: mask.low + 4096, high: 0 };
    expect(maskHasKind(withViewForms, permissionKind.viewFormPages)).toBe(true);
    expect(isAddOnlyRole(withViewForms)).toBe(true);
  });

  it("reads SharePoint permission words that come back as strings", () => {
    expect(parsePermissionMask({ Low: "196643", High: "0" })).toEqual(mask);
    expect(isAddOnlyRole(parsePermissionMask({ Low: "196643", High: "0" }))).toBe(true);
  });

  it("detects the visitors group's add-only assignment and ignores everyone else", () => {
    const assignments = [
      {
        PrincipalId: 8,
        RoleDefinitionBindings: [{ Id: 3, BasePermissions: { Low: mask.low + 4, High: 0 } }]
      },
      {
        PrincipalId: 15,
        RoleDefinitionBindings: [{ Id: 40, Name: addOnlyRoleName, BasePermissions: { Low: mask.low, High: 0 } }]
      }
    ];
    expect(visitorsHaveAddOnly(assignments, 15)).toBe(true);
    expect(visitorsHaveAddOnly(assignments, 8)).toBe(false);
    expect(assignmentIncludesRole(assignments, 15, 40)).toBe(true);
    expect(assignmentIncludesRole(assignments, 15, 3)).toBe(false);
  });

  it("treats a named Page Trust - Add only binding as enabled when the mask is missing", () => {
    const assignments = [
      {
        PrincipalId: 15,
        RoleDefinitionBindings: [{ Id: 40, Name: "Page Trust - Add only" }]
      }
    ];
    expect(visitorsCanFlagFromAssignments(assignments, 15)).toBe(true);
    expect(visitorsHaveAddOnly(assignments, 15)).toBe(true);
    expect(visitorAddOnlyRoleId(assignments, 15)).toBe(40);
  });

  it("uses the add-only mask id when the role name was not returned", () => {
    const assignments = [
      {
        PrincipalId: 15,
        RoleDefinitionBindings: [{ Id: 41, BasePermissions: { Low: mask.low, High: 0 } }]
      }
    ];
    expect(visitorsCanFlagFromAssignments(assignments, 15)).toBe(true);
    expect(visitorAddOnlyRoleId(assignments, 15)).toBe(41);
  });

  it("prefers the named role id over a different add-only binding", () => {
    const assignments = [
      {
        PrincipalId: 15,
        RoleDefinitionBindings: [
          { Id: 41, BasePermissions: { Low: mask.low, High: 0 } },
          { Id: 40, Name: addOnlyRoleName, BasePermissions: { Low: mask.low, High: 0 } }
        ]
      }
    ];
    expect(visitorAddOnlyRoleId(assignments, 15)).toBe(40);
  });
});
