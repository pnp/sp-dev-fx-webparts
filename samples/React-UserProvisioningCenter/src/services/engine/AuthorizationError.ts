export class AuthorizationError extends Error {
  public readonly permission: string;

  public constructor(permission: string) {
    super(`Operation requires permission: ${permission}`);
    Object.setPrototypeOf(this, AuthorizationError.prototype);
    this.name = 'AuthorizationError';
    this.permission = permission;
  }
}
