import type { GraphService } from '../graph/GraphService';
import type { SharePointDataService } from '../sharePointData/SharePointDataService';
import type { AuditService } from '../audit/AuditService';
import type { NamingPolicyService } from '../namingPolicy/NamingPolicyService';
import type { UserService } from '../users/UserService';
import type { SiteAccessService } from '../sites/SiteAccessService';
import type { CredentialMode, IAppSettings, IProvisioningJob } from '../../models';

export interface IJobSecrets {
  temporaryPassword?: string;
  temporaryAccessPass?: string;
}

export interface ICredentialPresentation {
  kind: CredentialMode;
  value: string;
  userPrincipalName: string;
}

export interface IStepContext {
  graph: GraphService;
  data: SharePointDataService;
  audit: AuditService;
  naming: NamingPolicyService;
  users: UserService;
  siteAccess: SiteAccessService;
  job: IProvisioningJob;
  secrets: IJobSecrets;
  signal?: AbortSignal;
  settings: IAppSettings;
  presentCredentials: (credential: ICredentialPresentation) => Promise<void>;
}

export class StepFailure extends Error {
  public readonly graphCode: string;
  public readonly retryable: boolean;

  public constructor(message: string, graphCode: string, retryable: boolean) {
    super(message);
    Object.setPrototypeOf(this, StepFailure.prototype);
    this.name = 'StepFailure';
    this.graphCode = graphCode;
    this.retryable = retryable;
  }
}

export interface IWorkflowStepDefinition {
  id: string;
  skippable: boolean;
  maxAttempts: number;
  continueOnFailure: boolean;
  run: (ctx: IStepContext) => Promise<void>;
  compensate?: (ctx: IStepContext) => Promise<void>;
}
