/**
 * SP.PermissionKind ordinals from @pnp/sp 4.22. The REST mask bit is 2^(kind - 1).
 * The role grants add and view, and withholds edit and delete.
 */
export const permissionKind = {
  viewListItems: 1,
  addListItems: 2,
  editListItems: 3,
  deleteListItems: 4,
  openItems: 6,
  viewFormPages: 13,
  open: 17,
  viewPages: 18,
  useClientIntegration: 37,
  useRemoteApis: 38
};

export const addOnlyRoleName: string = "Page Trust - Add only";

export const addOnlyRoleDescription: string =
  "Add and view items in Page Review Requests. Does not allow editing or deleting items.";

export const addOnlyRoleConflictMessage: string =
  "A permission level named Page Trust - Add only already exists, but it allows editing or deleting, or it is missing add and view. Verified Page Banner left it unchanged. Rename that permission level, then try again.";

export const visitorFlagExplanation: string =
  "Verified Page Banner gives the site Visitors group Page Trust - Add only on the Page Review Requests list. They can add and view requests, not edit or delete them. Site and page permissions stay the same.";

export const visitorFlagEnabledText: string =
  "Visitors can flag pages.";

export const visitorFlagStopHint: string =
  "Removes Page Trust - Add only from the Visitors group on that list. Other permissions on the list stay as they are.";

export const visitorFlagStopLabel: string =
  "Stop letting visitors flag pages";

export const managePermissionsMessage: string =
  "You need Manage Permissions on this site to let visitors flag pages.";

export const inheritedRoleDefinitionsMessage: string =
  "This site inherits permission levels, so Verified Page Banner can't create the Page Trust - Add only permission level here. Create that permission level on the site that owns permission levels, then try again.";

export const rootManagePermissionsMessage: string =
  "This site inherits permission levels, so Verified Page Banner tried to create Page Trust - Add only on the top-level site. You need Manage Permissions on that top-level site.";

export const roleNotVisibleMessage: string =
  "Verified Page Banner created the Page Trust - Add only permission level on the top-level site, but this site does not use that site's permission levels. Create the permission level on the parent this site inherits from, then try again.";

export const missingVisitorsGroupMessage: string =
  "This site has no Visitors group, so Verified Page Banner can't let visitors flag pages.";

const requiredKinds: readonly number[] = [
  permissionKind.viewListItems,
  permissionKind.addListItems,
  permissionKind.openItems,
  permissionKind.viewPages,
  permissionKind.open
];

const forbiddenKinds: readonly number[] = [
  permissionKind.editListItems,
  permissionKind.deleteListItems
];

export interface IPermissionMask {
  low: number;
  high: number;
}

export interface IRolePermissionSource {
  Low?: number | string;
  High?: number | string;
}

export interface IRoleBinding {
  Id?: number;
  Name?: string;
  BasePermissions?: IRolePermissionSource;
}

export interface IPrincipalAssignment {
  PrincipalId?: number;
  RoleDefinitionBindings?: IRoleBinding[];
}

export function permissionBit(kind: number): IPermissionMask {
  const index = kind - 1;
  if (!Number.isFinite(kind) || index < 0 || index > 62) {
    return { low: 0, high: 0 };
  }
  if (index < 32) {
    return { low: Math.pow(2, index), high: 0 };
  }
  return { low: 0, high: Math.pow(2, index - 32) };
}

export function combineMasks(kinds: readonly number[]): IPermissionMask {
  let low = 0;
  let high = 0;
  for (let index = 0; index < kinds.length; index++) {
    const bit = permissionBit(kinds[index]);
    low += bit.low;
    high += bit.high;
  }
  return { low, high };
}

/**
 * SharePoint Online accepts this mask. Microsoft's permission dependency table
 * (Understanding permission levels) says Add Items depends on View Items, View Pages,
 * and Open, and Open Items depends on View Items, View Pages, and Open. View Items
 * depends on View Pages and Open. View Pages depends on Open. That closure is the
 * mask below.
 *
 * View Application Pages depends only on Open. Use Client Integration Features
 * depends on Use Remote Interfaces and Open. Neither is a dependency of Add Items
 * or Open Items, and the role-definition REST call stores the supplied mask rather
 * than rejecting a mask that omits them. The copied Read assignment already includes
 * those bits, which is what lets the web part call the list REST API. The grant is
 * added with roleassignments/addroleassignment(principalid, roledefid). That method
 * accepts the associated Visitors group principal id.
 */
export function addOnlyBasePermissions(): IPermissionMask {
  return combineMasks(requiredKinds);
}

export function maskHasKind(mask: IPermissionMask, kind: number): boolean {
  const bit = permissionBit(kind);
  if (bit.low !== 0) {
    return Math.floor(mask.low / bit.low) % 2 === 1;
  }
  if (bit.high !== 0) {
    return Math.floor(mask.high / bit.high) % 2 === 1;
  }
  return false;
}

function readPermissionWord(value: number | string | undefined): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return 0;
}

export function parsePermissionMask(value: IRolePermissionSource | undefined): IPermissionMask {
  return {
    low: readPermissionWord(value && value.Low),
    high: readPermissionWord(value && value.High)
  };
}

/** Required add/view bits are present, and edit and delete are absent. Extra harmless bits are allowed. */
export function isAddOnlyRole(mask: IPermissionMask): boolean {
  for (let index = 0; index < requiredKinds.length; index++) {
    if (!maskHasKind(mask, requiredKinds[index])) {
      return false;
    }
  }
  for (let index = 0; index < forbiddenKinds.length; index++) {
    if (maskHasKind(mask, forbiddenKinds[index])) {
      return false;
    }
  }
  return true;
}

function bindingGrantsVisitorFlag(binding: IRoleBinding): boolean {
  if (binding.Name === addOnlyRoleName) {
    return true;
  }
  return isAddOnlyRole(parsePermissionMask(binding.BasePermissions));
}

export function visitorsHaveAddOnly(assignments: readonly IPrincipalAssignment[], visitorId: number): boolean {
  return visitorsCanFlagFromAssignments(assignments, visitorId);
}

/** True when Visitors have Page Trust - Add only, by name or by the add-only mask. */
export function visitorsCanFlagFromAssignments(assignments: readonly IPrincipalAssignment[], visitorId: number): boolean {
  for (let index = 0; index < assignments.length; index++) {
    const assignment = assignments[index];
    if (assignment.PrincipalId !== visitorId) {
      continue;
    }
    const bindings = assignment.RoleDefinitionBindings || [];
    for (let bindingIndex = 0; bindingIndex < bindings.length; bindingIndex++) {
      if (bindingGrantsVisitorFlag(bindings[bindingIndex])) {
        return true;
      }
    }
  }
  return false;
}

/** Role id to remove. Name match wins. The mask match covers a binding whose name was not returned. */
export function visitorAddOnlyRoleId(assignments: readonly IPrincipalAssignment[], visitorId: number): number | undefined {
  let maskId: number | undefined;
  for (let index = 0; index < assignments.length; index++) {
    const assignment = assignments[index];
    if (assignment.PrincipalId !== visitorId) {
      continue;
    }
    const bindings = assignment.RoleDefinitionBindings || [];
    for (let bindingIndex = 0; bindingIndex < bindings.length; bindingIndex++) {
      const binding = bindings[bindingIndex];
      if (binding.Name === addOnlyRoleName && binding.Id && binding.Id > 0) {
        return binding.Id;
      }
      if (!maskId && binding.Id && binding.Id > 0 && isAddOnlyRole(parsePermissionMask(binding.BasePermissions))) {
        maskId = binding.Id;
      }
    }
  }
  return maskId;
}

export function assignmentIncludesRole(
  assignments: readonly IPrincipalAssignment[],
  visitorId: number,
  roleId: number
): boolean {
  for (let index = 0; index < assignments.length; index++) {
    const assignment = assignments[index];
    if (assignment.PrincipalId !== visitorId) {
      continue;
    }
    const bindings = assignment.RoleDefinitionBindings || [];
    for (let bindingIndex = 0; bindingIndex < bindings.length; bindingIndex++) {
      if (bindings[bindingIndex].Id === roleId) {
        return true;
      }
    }
  }
  return false;
}
