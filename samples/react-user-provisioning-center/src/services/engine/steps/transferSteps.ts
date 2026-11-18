import * as strings from 'UpcStrings';
import { formatString } from '../../util/formatString';
import {
  STEP_FINALIZE_AUDIT,
  STEP_SEND_NOTIFICATIONS,
  STEP_UPDATE_EMPLOYMENT,
  STEP_UPDATE_LICENSES,
  STEP_UPDATE_MANAGER,
  STEP_VALIDATE_TRANSFER
} from '../../../constants/stepIds';
import { StepFailure } from '../stepTypes';
import type { IStepContext, IWorkflowStepDefinition } from '../stepTypes';
import { auditedGraphWrite, getOrNull, runFinalizeAudit } from '../stepHelpers';
import { isTransferPayload } from '../../../models';
import type { ITransferChanges, ITransferPayload } from '../../../models';

function transfer(ctx: IStepContext): ITransferPayload {
  const payload = ctx.job.payload;
  if (!isTransferPayload(payload)) {
    throw new StepFailure('Job payload is not a transfer payload', 'UPC_WrongPayloadKind', false);
  }
  return payload;
}

async function runValidateTransfer(ctx: IStepContext): Promise<void> {
  const payload: ITransferPayload = transfer(ctx);
  const target = payload.target;
  if (!target?.userId || !target.userPrincipalName) {
    throw new StepFailure('Transfer payload has no target user', 'UPC_InvalidPayload', false);
  }
  const c = payload.changes;
  const hasAnyChange: boolean = !!(
    c.jobTitle ||
    c.department ||
    c.officeLocation ||
    c.managerId ||
    (c.addLicenses?.length ?? 0) > 0 ||
    (c.removeLicenseSkuIds?.length ?? 0) > 0
  );
  if (!hasAnyChange) {
    throw new StepFailure('Transfer payload specifies no changes to apply', 'UPC_InvalidPayload', false);
  }
  const user: { id: string } | null = await getOrNull(() =>
    ctx.graph.get<{ id: string }>(`/users/${target.userId}?$select=id`, { signal: ctx.signal })
  );
  if (!user) {
    throw new StepFailure(
      `User ${target.userPrincipalName} was not found in the directory`,
      'UPC_TargetNotFound',
      false
    );
  }
  if (!ctx.job.targetUserId) {
    ctx.job.targetUserId = target.userId;
    await ctx.data.setJobTargetUser(ctx.job.itemId, target.userId);
  }
}

async function runUpdateEmployment(ctx: IStepContext): Promise<void> {
  const payload: ITransferPayload = transfer(ctx);
  const c = payload.changes;
  const userId: string = payload.target.userId;

  const desired: Record<string, string> = {};
  if (c.jobTitle) desired.jobTitle = c.jobTitle;
  if (c.department) desired.department = c.department;
  if (c.officeLocation) desired.officeLocation = c.officeLocation;
  if (Object.keys(desired).length === 0) {
    return;
  }

  const current: { jobTitle?: string; department?: string; officeLocation?: string } | null =
    await getOrNull(() =>
      ctx.graph.get<{ jobTitle?: string; department?: string; officeLocation?: string }>(
        `/users/${userId}?$select=jobTitle,department,officeLocation`,
        { signal: ctx.signal }
      )
    );
  const diff: Record<string, string> = {};
  for (const key of Object.keys(desired)) {
    if ((current as Record<string, string> | null)?.[key] !== desired[key]) {
      diff[key] = desired[key];
    }
  }
  if (Object.keys(diff).length === 0) {
    return;
  }
  await auditedGraphWrite(ctx, 'update-employment', 'PATCH', `/users/${userId}`, diff, () =>
    ctx.graph.patch<void>(`/users/${userId}`, diff, { signal: ctx.signal })
  );
}

async function runUpdateManager(ctx: IStepContext): Promise<void> {
  const payload: ITransferPayload = transfer(ctx);
  const managerId: string | undefined = payload.changes.managerId;
  if (!managerId) {
    return;
  }
  const userId: string = payload.target.userId;
  const currentManager: { id: string } | null = await getOrNull(() =>
    ctx.graph.get<{ id: string }>(`/users/${userId}/manager?$select=id`, { signal: ctx.signal })
  );
  if (currentManager?.id === managerId) {
    return;
  }
  const body = { '@odata.id': `https://graph.microsoft.com/v1.0/users/${managerId}` };
  await auditedGraphWrite(ctx, 'update-manager', 'PUT', `/users/${userId}/manager/$ref`, body, () =>
    ctx.graph.put<void>(`/users/${userId}/manager/$ref`, body, { signal: ctx.signal })
  );
}

async function runUpdateLicenses(ctx: IStepContext): Promise<void> {
  const payload: ITransferPayload = transfer(ctx);
  const { addLicenses, removeLicenseSkuIds } = payload.changes;
  if ((addLicenses?.length ?? 0) === 0 && (removeLicenseSkuIds?.length ?? 0) === 0) {
    return;
  }
  const userId: string = payload.target.userId;
  const details: { value: { skuId: string }[] } = await ctx.graph.get<{
    value: { skuId: string }[];
  }>(`/users/${userId}/licenseDetails?$select=skuId`, { signal: ctx.signal });
  const already: Set<string> = new Set((details.value ?? []).map((d) => d.skuId));

  const toAdd: string[] = (addLicenses ?? []).map((s) => s.skuId).filter((id) => !already.has(id));
  const toRemove: string[] = (removeLicenseSkuIds ?? []).filter((id) => already.has(id));
  if (toAdd.length === 0 && toRemove.length === 0) {
    return;
  }
  const body = {
    addLicenses: toAdd.map((skuId) => ({ skuId, disabledPlans: [] })),
    removeLicenses: toRemove
  };
  await auditedGraphWrite(ctx, 'update-licenses', 'POST', `/users/${userId}/assignLicense`, body, () =>
    ctx.graph.post<void>(`/users/${userId}/assignLicense`, body, { signal: ctx.signal })
  );
}

function summarizeChanges(c: ITransferChanges): string {
  const parts: string[] = [];
  if (c.jobTitle) parts.push(`job title -> ${c.jobTitle}`);
  if (c.department) parts.push(`department -> ${c.department}`);
  if (c.officeLocation) parts.push(`office -> ${c.officeLocation}`);
  if (c.managerDisplayName) parts.push(`manager -> ${c.managerDisplayName}`);
  if ((c.addLicenses?.length ?? 0) > 0) {
    parts.push(`licenses added: ${c.addLicenses.map((l) => l.skuPartNumber).join(', ')}`);
  }
  if ((c.removeLicenseSkuIds?.length ?? 0) > 0) {
    parts.push(`licenses removed: ${c.removeLicenseSkuIds.length}`);
  }
  return parts.length > 0 ? parts.join('; ') : 'no changes recorded';
}

async function runSendNotifications(ctx: IStepContext): Promise<void> {
  const payload: ITransferPayload = transfer(ctx);
  const userId: string = payload.target.userId;

  const manager: { mail?: string; userPrincipalName?: string } | null = await getOrNull(() =>
    ctx.graph.get<{ mail?: string; userPrincipalName?: string }>(
      `/users/${userId}/manager?$select=mail,userPrincipalName`,
      { signal: ctx.signal }
    )
  );
  const notifyAddress: string | undefined = manager?.mail || manager?.userPrincipalName;
  if (!notifyAddress) {
    return;
  }
  const body = {
    message: {
      subject: formatString(strings.MailTransferCompleteSubject, payload.target.displayName),
      body: {
        contentType: 'Text',
        content: formatString(
          strings.MailTransferCompleteBody,
          payload.target.displayName,
          payload.target.userPrincipalName,
          summarizeChanges(payload.changes)
        )
      },
      toRecipients: [{ emailAddress: { address: notifyAddress } }]
    },
    saveToSentItems: true
  };
  await auditedGraphWrite(ctx, 'send-notification', 'POST', '/me/sendMail', body, () =>
    ctx.graph.post<void>('/me/sendMail', body, { signal: ctx.signal })
  );
}

export const TRANSFER_STEPS: IWorkflowStepDefinition[] = [
  { id: STEP_VALIDATE_TRANSFER, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runValidateTransfer },
  { id: STEP_UPDATE_EMPLOYMENT, skippable: true, maxAttempts: 3, continueOnFailure: false, run: runUpdateEmployment },
  { id: STEP_UPDATE_MANAGER, skippable: true, maxAttempts: 3, continueOnFailure: false, run: runUpdateManager },
  { id: STEP_UPDATE_LICENSES, skippable: true, maxAttempts: 3, continueOnFailure: false, run: runUpdateLicenses },
  { id: STEP_SEND_NOTIFICATIONS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runSendNotifications },
  { id: STEP_FINALIZE_AUDIT, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runFinalizeAudit }
];
