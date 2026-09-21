export type AuditScope = 'Web' | 'List';
export type AuditInheritance = 'Unique' | 'Inherited';
export type AuditLoadErrorKind = 'accessDenied' | 'notFound' | 'throttled' | 'generic';

export interface IAccessAuditConfig {
  readonly rootPath: string;
  readonly listTitle: string;
}

export interface IRoleAssignmentView {
  readonly key: string;
  readonly principalTitle: string;
  readonly principalType: string;
  readonly loginName?: string;
  readonly email?: string;
  readonly roleNames: ReadonlyArray<string>;
  readonly scope: AuditScope;
  readonly inheritance: AuditInheritance;
}

export interface IAccessAuditResult {
  readonly assignments: ReadonlyArray<IRoleAssignmentView>;
  readonly webUrl: string;
  readonly listTitle?: string;
}
