import type { AppPermission } from '../../models';

export interface IAuthorizationService {
  require(permission: AppPermission): Promise<void>;
  has(permission: AppPermission): Promise<boolean>;
}
