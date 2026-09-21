import type { IAccessAuditConfig, IRoleAssignmentView } from '../models/IAccessAudit';
import type { EffectiveAccessAuditService } from '../services/EffectiveAccessAuditService';

export interface IAccessAuditProps {
  readonly config: IAccessAuditConfig;
  readonly service: EffectiveAccessAuditService;
}

export interface IAccessAuditState {
  readonly status: 'loading' | 'success' | 'empty' | 'error';
  readonly assignments: ReadonlyArray<IRoleAssignmentView>;
  readonly errorKind?: 'accessDenied' | 'notFound' | 'throttled' | 'generic';
}
