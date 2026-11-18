import type { IAuthorizationService } from './IAuthorizationService';
import { AuthorizationError } from './AuthorizationError';
import type { RoleService } from '../roles/RoleService';
import type { AppPermission } from '../../models';

export class AppAuthorizationService implements IAuthorizationService {
  private readonly _roles: RoleService;

  public constructor(roles: RoleService) {
    this._roles = roles;
  }

  public async require(permission: AppPermission): Promise<void> {
    const resolved = await this._roles.getResolvedRoles();
    if (!resolved.permissions.has(permission)) {
      throw new AuthorizationError(permission);
    }
  }

  public async has(permission: AppPermission): Promise<boolean> {
    const resolved = await this._roles.getResolvedRoles();
    return resolved.permissions.has(permission);
  }
}
