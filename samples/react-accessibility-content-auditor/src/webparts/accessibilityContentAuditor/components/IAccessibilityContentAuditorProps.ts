import { IAuditConfig, IAuditResult, ISharePointContentService } from '../../../models/AuditModels';

export interface IAccessibilityContentAuditorProps {
  service: ISharePointContentService;
  config: IAuditConfig;
}

export interface IAuditViewState {
  status: 'loading' | 'ready' | 'error';
  result?: IAuditResult;
  error?: { kind: string; message: string };
}
