import * as strings from 'UpcStrings';
import { formatString } from '../../util/formatString';
import {
  STEP_BLOCK_SIGN_IN,
  STEP_CREATE_HANDOVER_TASKS,
  STEP_FINALIZE_AUDIT,
  STEP_REMOVE_GROUPS,
  STEP_REMOVE_LICENSES,
  STEP_SEND_NOTIFICATIONS,
  STEP_VALIDATE_TARGET
} from '../../../constants/stepIds';
import { RequestAbortedError } from '../../graph/GraphError';
import type { IBatchRequest } from '../../graph/GraphService';
import { StepFailure } from '../stepTypes';
import type { IStepContext, IWorkflowStepDefinition } from '../stepTypes';
import { auditedGraphWrite, getOrNull, runFinalizeAudit } from '../stepHelpers';
import { isOffboardingPayload } from '../../../models';
import type { IOffboardingPayload } from '../../../models';

const BATCH_SIZE: number = 20;

function offboarding(ctx: IStepContext): IOffboardingPayload {
  const payload = ctx.job.payload;
  if (!isOffboardingPayload(payload)) {
    throw new StepFailure('Job payload is not an offboarding payload', 'UPC_WrongPayloadKind', false);
  }
  return payload;
}

async function runValidateTarget(ctx: IStepContext): Promise<void> {
  const payload: IOffboardingPayload = offboarding(ctx);
  const target = payload.target;
  if (!target?.userId || !target.userPrincipalName) {
    throw new StepFailure('Offboarding payload has no target user', 'UPC_InvalidPayload', false);
  }
  if (payload.options.mailboxAction === 'forward' && !payload.options.forwardingAddress) {
    throw new StepFailure('Mail forwarding selected but no forwarding address provided', 'UPC_InvalidPayload', false);
  }
  const user: { id: string } | null = await getOrNull(() =>
    ctx.graph.get<{ id: string }>(`/users/${target.userId}?$select=id`, { signal: ctx.signal })
  );
  if (!user) {
    throw new StepFailure(`User ${target.userPrincipalName} was not found in the directory`, 'UPC_TargetNotFound', false);
  }
  if (!ctx.job.targetUserId) {
    ctx.job.targetUserId = target.userId;
    await ctx.data.setJobTargetUser(ctx.job.itemId, target.userId);
  }
}

async function runBlockSignIn(ctx: IStepContext): Promise<void> {
  const payload: IOffboardingPayload = offboarding(ctx);
  const userId: string = payload.target.userId;

  const current: { accountEnabled: boolean; onPremisesSyncEnabled: boolean | null } | null = await getOrNull(() =>
    ctx.graph.get<{ accountEnabled: boolean; onPremisesSyncEnabled: boolean | null }>(
      `/users/${userId}?$select=accountEnabled,onPremisesSyncEnabled`,
      { signal: ctx.signal }
    )
  );

  if (current?.onPremisesSyncEnabled) {
    await ctx.data.createTask(
      ctx.job.jobId,
      'OnPremAdAccount',
      `Disable on-premises AD account: ${payload.target.userPrincipalName}`,
      `${payload.target.userPrincipalName} is synced from on-premises Active Directory (onPremisesSyncEnabled). Disabling sign-in through Graph would be reverted by the next directory sync — disable or move the account in on-prem AD instead so the change survives sync.`
    );
  } else if (current?.accountEnabled !== false) {
    const body = { accountEnabled: false };
    await auditedGraphWrite(ctx, 'block-sign-in', 'PATCH', `/users/${userId}`, body, () =>
      ctx.graph.patch<void>(`/users/${userId}`, body, { signal: ctx.signal })
    );
  }
  await auditedGraphWrite(ctx, 'revoke-sessions', 'POST', `/users/${userId}/revokeSignInSessions`, {}, () =>
    ctx.graph.post<void>(`/users/${userId}/revokeSignInSessions`, {}, { signal: ctx.signal })
  );
}

async function runRemoveLicenses(ctx: IStepContext): Promise<void> {
  const payload: IOffboardingPayload = offboarding(ctx);
  if (!payload.options.removeLicenses) {
    return;
  }
  const userId: string = payload.target.userId;
  const details: { value: { skuId: string }[] } = await ctx.graph.get<{ value: { skuId: string }[] }>(
    `/users/${userId}/licenseDetails?$select=skuId`,
    { signal: ctx.signal }
  );
  const skuIds: string[] = (details.value ?? []).map((d) => d.skuId);
  if (skuIds.length === 0) {
    return;
  }
  const body = { addLicenses: [], removeLicenses: skuIds };
  await auditedGraphWrite(ctx, 'remove-licenses', 'POST', `/users/${userId}/assignLicense`, body, () =>
    ctx.graph.post<void>(`/users/${userId}/assignLicense`, body, { signal: ctx.signal })
  );
}

interface IMemberGroup {
  id: string;
  displayName: string;
  groupTypes?: string[];
  mailEnabled?: boolean;
  onPremisesSyncEnabled?: boolean | null;
}

interface IMemberGroupPage {
  value: IMemberGroup[];
  '@odata.nextLink'?: string;
}

async function fetchAllMemberGroups(ctx: IStepContext, userId: string): Promise<IMemberGroup[]> {
  const groups: IMemberGroup[] = [];
  let url: string | undefined = `/users/${userId}/memberOf/microsoft.graph.group?$select=id,displayName,groupTypes,mailEnabled,onPremisesSyncEnabled&$top=999`;
  while (url) {
    const page: IMemberGroupPage = await ctx.graph.get<IMemberGroupPage>(url, { signal: ctx.signal });
    groups.push(...(page.value ?? []));
    url = page['@odata.nextLink'];
  }
  return groups;
}

async function runRemoveGroups(ctx: IStepContext): Promise<void> {
  const payload: IOffboardingPayload = offboarding(ctx);
  if (!payload.options.removeFromGroups) {
    return;
  }
  const userId: string = payload.target.userId;
  const allGroups: IMemberGroup[] = await fetchAllMemberGroups(ctx, userId);

  const notRemovable: string[] = [];
  const removable: IMemberGroup[] = [];
  for (const group of allGroups) {
    const groupTypes: string[] = group.groupTypes ?? [];
    const isDynamic: boolean = groupTypes.indexOf('DynamicMembership') !== -1;
    const isUnified: boolean = groupTypes.indexOf('Unified') !== -1;
    if (isDynamic || group.onPremisesSyncEnabled || (group.mailEnabled && !isUnified)) {
      notRemovable.push(group.displayName);
      continue;
    }
    removable.push(group);
  }

  for (let i = 0; i < removable.length; i += BATCH_SIZE) {
    const chunk: IMemberGroup[] = removable.slice(i, i + BATCH_SIZE);
    const requests: IBatchRequest[] = chunk.map((group) => ({
      id: group.id,
      method: 'DELETE',
      url: `/groups/${group.id}/members/${userId}/$ref`
    }));

    try {
      const responses = await ctx.graph.batch(requests, { signal: ctx.signal });
      let anySucceeded: boolean = false;
      for (const group of chunk) {
        const response = responses.get(group.id);
        const status = response?.status ?? 0;
        if ((status >= 200 && status < 300) || status === 404) {
          anySucceeded = true;
          continue;
        }
        notRemovable.push(group.displayName);
      }
      if (anySucceeded) {
        await ctx.audit.log({
          jobId: ctx.job.jobId,
          action: 'remove-group-member',
          targetUser: payload.target.userPrincipalName,
          graphEndpoint: '/$batch',
          requestSummary: JSON.stringify({ groupCount: chunk.length }),
          responseCode: 200,
          durationMs: 0,
          result: 'Success',
          correlationId: ctx.job.correlationId
        });
      }
    } catch (err) {
      if (err instanceof RequestAbortedError) {
        throw err;
      }
      notRemovable.push(...chunk.map((g) => g.displayName));
    }
  }

  if (notRemovable.length > 0) {
    await ctx.data.createTask(
      ctx.job.jobId,
      'DistributionList',
      `Remove ${payload.target.userPrincipalName} from remaining groups`,
      `These memberships could not be removed through Graph: ${notRemovable.join(', ')}`
    );
  }
}

async function runCreateHandoverTasks(ctx: IStepContext): Promise<void> {
  const payload: IOffboardingPayload = offboarding(ctx);
  const upn: string = payload.target.userPrincipalName;
  const options = payload.options;
  if (options.mailboxAction === 'convertShared') {
    await ctx.data.createTask(
      ctx.job.jobId,
      'MailboxConvertShared',
      `Convert mailbox to shared: ${upn}`,
      `Convert the mailbox of ${upn} to a shared mailbox (Exchange admin center or PowerShell).`
    );
  }
  if (options.mailboxAction === 'forward' && options.forwardingAddress) {
    await ctx.data.createTask(
      ctx.job.jobId,
      'MailForwarding',
      `Set mail forwarding: ${upn}`,
      `Forward mail from ${upn} to ${options.forwardingAddress}.`
    );
  }
  if (options.oneDriveAccessUpn) {
    await ctx.data.createTask(
      ctx.job.jobId,
      'OneDriveHandling',
      `Grant OneDrive access: ${upn}`,
      `Grant ${options.oneDriveAccessUpn} access to the OneDrive content of ${upn}.`
    );
  }
}

async function runSendNotifications(ctx: IStepContext): Promise<void> {
  const payload: IOffboardingPayload = offboarding(ctx);
  const notifyUpn: string | undefined = payload.options.oneDriveAccessUpn;
  if (!notifyUpn) {
    return;
  }
  const body = {
    message: {
      subject: formatString(strings.MailOffboardCompleteSubject, payload.target.displayName),
      body: {
        contentType: 'Text',
        content: formatString(
          strings.MailOffboardCompleteBody,
          payload.target.displayName,
          payload.target.userPrincipalName
        )
      },
      toRecipients: [{ emailAddress: { address: notifyUpn } }]
    },
    saveToSentItems: true
  };
  await auditedGraphWrite(ctx, 'send-notification', 'POST', '/me/sendMail', body, () =>
    ctx.graph.post<void>('/me/sendMail', body, { signal: ctx.signal })
  );
}

export const OFFBOARDING_STEPS: IWorkflowStepDefinition[] = [
  { id: STEP_VALIDATE_TARGET, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runValidateTarget },
  { id: STEP_BLOCK_SIGN_IN, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runBlockSignIn },
  { id: STEP_REMOVE_LICENSES, skippable: true, maxAttempts: 3, continueOnFailure: false, run: runRemoveLicenses },
  { id: STEP_REMOVE_GROUPS, skippable: true, maxAttempts: 3, continueOnFailure: false, run: runRemoveGroups },
  { id: STEP_CREATE_HANDOVER_TASKS, skippable: true, maxAttempts: 3, continueOnFailure: false, run: runCreateHandoverTasks },
  { id: STEP_SEND_NOTIFICATIONS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runSendNotifications },
  { id: STEP_FINALIZE_AUDIT, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runFinalizeAudit }
];
