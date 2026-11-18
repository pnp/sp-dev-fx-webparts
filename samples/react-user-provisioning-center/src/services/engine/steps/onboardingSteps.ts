import * as strings from 'UpcStrings';
import { validatePayload } from '../../../validators/payloadValidator';
import { generateTempPassword } from '../../passwords/passwordGenerator';
import { formatString } from '../../util/formatString';
import {
  STEP_ASSIGN_APPLICATIONS,
  STEP_ASSIGN_GROUPS,
  STEP_ASSIGN_LICENSES,
  STEP_ASSIGN_MANAGER,
  STEP_ASSIGN_SHAREPOINT,
  STEP_ASSIGN_TEAMS,
  STEP_COPY_GROUPS,
  STEP_COPY_LICENSES,
  STEP_CREATE_USER,
  STEP_FINALIZE_AUDIT,
  STEP_PRESENT_CREDENTIALS,
  STEP_SCHEDULE_ACCESS_REVIEW,
  STEP_SEND_NOTIFICATIONS,
  STEP_SET_USAGE_LOCATION,
  STEP_UPLOAD_PHOTO,
  STEP_VALIDATE_CLONE_SOURCE,
  STEP_VALIDATE_INPUT
} from '../../../constants/stepIds';
import { RequestAbortedError } from '../../graph/GraphError';
import type { IBatchRequest } from '../../graph/GraphService';
import { checkMemberGroups } from '../../graph/checkMemberGroups';
import { StepFailure } from '../stepTypes';
import type { IStepContext, IWorkflowStepDefinition } from '../stepTypes';
import { auditedGraphWrite, getOrNull, runFinalizeAudit } from '../stepHelpers';
import { isOnboardingPayload } from '../../../models';
import type { IApplicationCatalogItem, IOnboardingPayload, UpnAvailability } from '../../../models';
import { escapeODataLiteral } from '../../util/odata';

const BATCH_SIZE: number = 20;

async function requireTargetUser(ctx: IStepContext): Promise<string> {
  if (!ctx.job.targetUserId) {
    throw new StepFailure('Target user has not been created yet', 'UPC_NoTargetUser', false);
  }
  return ctx.job.targetUserId;
}

function onboarding(ctx: IStepContext): IOnboardingPayload {
  const payload = ctx.job.payload;
  if (!isOnboardingPayload(payload)) {
    throw new StepFailure('Job payload is not an onboarding payload', 'UPC_WrongPayloadKind', false);
  }
  return payload;
}

async function runValidateInput(ctx: IStepContext): Promise<void> {
  const payload: IOnboardingPayload = onboarding(ctx);
  const errors: string[] = validatePayload(payload);
  if (errors.length > 0) {
    throw new StepFailure(`Payload validation failed: ${errors.join('; ')}`, 'UPC_InvalidPayload', false);
  }
  if (ctx.job.targetUserId) {
    return;
  }
  if (payload.identity.accountType === 'guest') {
    return;
  }
  const employeeIdTaken: boolean = await ctx.users.isEmployeeIdTaken(payload.personal.employeeId, ctx.signal);
  if (employeeIdTaken) {
    throw new StepFailure(`employeeId ${payload.personal.employeeId} already exists in the directory`, 'UPC_DuplicateEmployeeId', false);
  }
  const availability: UpnAvailability = await ctx.naming.checkUpnAvailability(payload.identity.userPrincipalName, ctx.signal);
  if (availability !== 'available') {
    throw new StepFailure(`UPN ${payload.identity.userPrincipalName} is no longer available (${availability})`, 'UPC_UpnCollision', false);
  }
}

interface ICreatedUser {
  id: string;
}

async function runCreateUser(ctx: IStepContext): Promise<void> {
  const payload: IOnboardingPayload = onboarding(ctx);
  if (payload.identity.accountType === 'guest') {
    return runInviteGuest(ctx, payload);
  }

  if (ctx.job.targetUserId) {
    const existing: ICreatedUser | null = await getOrNull(() =>
      ctx.graph.get<ICreatedUser>(`/users/${ctx.job.targetUserId}?$select=id`, { signal: ctx.signal })
    );
    if (existing) {
      return;
    }
  }

  const upn: string = payload.identity.userPrincipalName;
  const byUpn: { value: ICreatedUser[] } = await ctx.graph.get<{ value: ICreatedUser[] }>(
    `/users?$select=id&$filter=${encodeURIComponent(`userPrincipalName eq '${escapeODataLiteral(upn)}'`)}`,
    { signal: ctx.signal }
  );
  if ((byUpn.value ?? []).length > 0) {
    ctx.job.targetUserId = byUpn.value[0].id;
    await ctx.data.setJobTargetUser(ctx.job.itemId, ctx.job.targetUserId);
    return;
  }

  const password: string = generateTempPassword();
  ctx.secrets.temporaryPassword = password;

  const body: Record<string, unknown> = {
    accountEnabled: payload.accountSettings.accountEnabled,
    displayName: payload.personal.displayName,
    mailNickname: payload.identity.mailNickname,
    userPrincipalName: upn,
    passwordProfile: { password, forceChangePasswordNextSignIn: payload.accountSettings.forceChangePassword },
    department: payload.employment.department,
    jobTitle: payload.employment.jobTitle,
    officeLocation: payload.employment.officeLocation || undefined,
    companyName: payload.employment.companyName || undefined,
    country: payload.employment.country || undefined,
    usageLocation: payload.accountSettings.usageLocation,
    employeeId: payload.personal.employeeId,
    employeeHireDate: payload.employment.hireDate ? `${payload.employment.hireDate}T00:00:00Z` : undefined,
    employeeType: payload.employment.employeeType,
    mobilePhone: payload.personal.mobilePhone || undefined,
    otherMails: payload.personal.personalEmail ? [payload.personal.personalEmail] : undefined
  };

  const created: ICreatedUser = await auditedGraphWrite(ctx, 'create-user', 'POST', '/users', body, () =>
    ctx.graph.post<ICreatedUser>('/users', body, { signal: ctx.signal })
  );
  ctx.job.targetUserId = created.id;
  await ctx.data.setJobTargetUser(ctx.job.itemId, created.id);
}

async function runInviteGuest(ctx: IStepContext, payload: IOnboardingPayload): Promise<void> {
  if (ctx.job.targetUserId) {
    const existing: ICreatedUser | null = await getOrNull(() =>
      ctx.graph.get<ICreatedUser>(`/users/${ctx.job.targetUserId}?$select=id`, { signal: ctx.signal })
    );
    if (existing) {
      return;
    }
  }

  const email: string = payload.identity.userPrincipalName;
  const byMail: { value: ICreatedUser[] } = await ctx.graph.get<{ value: ICreatedUser[] }>(
    `/users?$select=id&$filter=${encodeURIComponent(`mail eq '${escapeODataLiteral(email)}'`)}`,
    { signal: ctx.signal }
  );
  if ((byMail.value ?? []).length > 0) {
    ctx.job.targetUserId = byMail.value[0].id;
    await ctx.data.setJobTargetUser(ctx.job.itemId, ctx.job.targetUserId);
    return;
  }

  const body = {
    invitedUserEmailAddress: email,
    invitedUserDisplayName: payload.personal.displayName,
    inviteRedirectUrl: 'https://myapplications.microsoft.com',
    sendInvitationMessage: true
  };
  const result: { invitedUser: ICreatedUser } = await auditedGraphWrite(ctx, 'invite-guest', 'POST', '/invitations', body, () =>
    ctx.graph.post<{ invitedUser: ICreatedUser }>('/invitations', body, { signal: ctx.signal })
  );
  ctx.job.targetUserId = result.invitedUser.id;
  await ctx.data.setJobTargetUser(ctx.job.itemId, result.invitedUser.id);
}

async function runSetUsageLocation(ctx: IStepContext): Promise<void> {
  if (onboarding(ctx).identity.accountType === 'guest') {
    return;
  }
  const userId: string = await requireTargetUser(ctx);
  const desired: string = onboarding(ctx).accountSettings.usageLocation;
  const current: { usageLocation: string | null } | null = await getOrNull(() =>
    ctx.graph.get<{ usageLocation: string | null }>(`/users/${userId}?$select=usageLocation`, { signal: ctx.signal })
  );
  if (current?.usageLocation === desired) {
    return;
  }
  const body = { usageLocation: desired };
  await auditedGraphWrite(ctx, 'set-usage-location', 'PATCH', `/users/${userId}`, body, () =>
    ctx.graph.patch<void>(`/users/${userId}`, body, { signal: ctx.signal })
  );
}

async function runAssignManager(ctx: IStepContext): Promise<void> {
  const managerId: string | undefined = onboarding(ctx).employment.managerId;
  if (!managerId) {
    return;
  }
  const userId: string = await requireTargetUser(ctx);
  const currentManager: { id: string } | null = await getOrNull(() =>
    ctx.graph.get<{ id: string }>(`/users/${userId}/manager?$select=id`, { signal: ctx.signal })
  );
  if (currentManager?.id === managerId) {
    return;
  }
  const body = { '@odata.id': `https://graph.microsoft.com/v1.0/users/${managerId}` };
  await auditedGraphWrite(ctx, 'assign-manager', 'PUT', `/users/${userId}/manager/$ref`, body, () =>
    ctx.graph.put<void>(`/users/${userId}/manager/$ref`, body, { signal: ctx.signal })
  );
}

async function runAssignLicenses(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  if (payload.identity.accountType === 'guest') {
    return;
  }
  const selections = payload.licenses;
  if (selections.length === 0) {
    return;
  }
  const userId: string = await requireTargetUser(ctx);
  const details: { value: { skuId: string }[] } = await ctx.graph.get<{ value: { skuId: string }[] }>(
    `/users/${userId}/licenseDetails?$select=skuId`,
    { signal: ctx.signal }
  );
  const already: Set<string> = new Set((details.value ?? []).map((d) => d.skuId));
  const toAdd: string[] = selections.map((s) => s.skuId).filter((skuId) => !already.has(skuId));
  if (toAdd.length === 0) {
    return;
  }
  const body = { addLicenses: toAdd.map((skuId) => ({ skuId, disabledPlans: [] })), removeLicenses: [] };
  await auditedGraphWrite(ctx, 'assign-licenses', 'POST', `/users/${userId}/assignLicense`, body, () =>
    ctx.graph.post<void>(`/users/${userId}/assignLicense`, body, { signal: ctx.signal })
  );
}

function isMemberAlreadyExistsResponse(status: number, body: unknown): boolean {
  if (status === 409) {
    return true;
  }
  if (status !== 400 || body === undefined || body === null) {
    return false;
  }
  const text: string = (typeof body === 'string' ? body : JSON.stringify(body)).toLowerCase();
  return text.indexOf('already exist') !== -1 || text.indexOf('already a member') !== -1;
}

async function batchAddGroupMembers(ctx: IStepContext, userId: string, groupIds: string[], action: string): Promise<string[]> {
  const failed: string[] = [];
  const body = { '@odata.id': `https://graph.microsoft.com/v1.0/directoryObjects/${userId}` };

  for (let i = 0; i < groupIds.length; i += BATCH_SIZE) {
    const chunk: string[] = groupIds.slice(i, i + BATCH_SIZE);
    const requests: IBatchRequest[] = chunk.map((groupId) => ({ id: groupId, method: 'POST', url: `/groups/${groupId}/members/$ref`, body }));

    try {
      const responses = await ctx.graph.batch(requests, { signal: ctx.signal });
      let anySucceeded: boolean = false;
      for (const groupId of chunk) {
        const response = responses.get(groupId);
        const status = response?.status ?? 0;
        if ((status >= 200 && status < 300) || isMemberAlreadyExistsResponse(status, response?.body)) {
          anySucceeded = true;
          continue;
        }
        failed.push(groupId);
      }
      if (anySucceeded) {
        await ctx.audit.log({
          jobId: ctx.job.jobId,
          action,
          targetUser: '',
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
      failed.push(...chunk);
    }
  }

  return failed;
}

async function batchRemoveGroupMembers(ctx: IStepContext, userId: string, groupIds: string[], action: string): Promise<void> {
  for (let i = 0; i < groupIds.length; i += BATCH_SIZE) {
    const chunk: string[] = groupIds.slice(i, i + BATCH_SIZE);
    const requests: IBatchRequest[] = chunk.map((groupId) => ({
      id: groupId,
      method: 'DELETE',
      url: `/groups/${groupId}/members/${userId}/$ref`
    }));
    try {
      const responses = await ctx.graph.batch(requests, { signal: ctx.signal });
      let removed: number = 0;
      for (const groupId of chunk) {
        const status = responses.get(groupId)?.status ?? 0;
        if ((status >= 200 && status < 300) || status === 404) {
          removed++;
        }
      }
      if (removed > 0) {
        await ctx.audit.log({
          jobId: ctx.job.jobId,
          action,
          targetUser: ctx.job.targetUpn,
          graphEndpoint: '/$batch',
          requestSummary: JSON.stringify({ groupCount: removed }),
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
    }
  }
}

async function compensateAssignGroups(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const groupIds: string[] = [...payload.access.securityGroups, ...payload.access.m365Groups];
  if (groupIds.length === 0 || !ctx.job.targetUserId) {
    return;
  }
  await batchRemoveGroupMembers(ctx, ctx.job.targetUserId, groupIds, 'rollback-assign-groups');
}

async function compensateAssignTeams(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const teamIds: string[] = payload.access.teams.map((t) => t.teamId);
  if (teamIds.length === 0 || !ctx.job.targetUserId) {
    return;
  }
  await batchRemoveGroupMembers(ctx, ctx.job.targetUserId, teamIds, 'rollback-assign-teams');
}

async function compensateAssignApplications(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const appItemIds: string[] = payload.access.applications;
  if (appItemIds.length === 0 || !ctx.job.targetUserId) {
    return;
  }
  const catalog: IApplicationCatalogItem[] = await ctx.data.getApplicationCatalog();
  const byId: Map<string, IApplicationCatalogItem> = new Map(catalog.map((a) => [String(a.itemId), a]));
  const groupIds: string[] = appItemIds
    .map((appItemId) => byId.get(appItemId))
    .filter((app): app is IApplicationCatalogItem => !!app && app.provisioningType === 'GroupBased' && !!app.targetGroupId)
    .map((app) => app.targetGroupId as string);
  if (groupIds.length === 0) {
    return;
  }
  await batchRemoveGroupMembers(ctx, ctx.job.targetUserId, groupIds, 'rollback-assign-applications');
}

async function compensateAssignLicenses(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const skuIds: string[] = payload.licenses.map((l) => l.skuId);
  if (skuIds.length === 0 || !ctx.job.targetUserId) {
    return;
  }
  const userId: string = ctx.job.targetUserId;
  const body = { addLicenses: [], removeLicenses: skuIds };
  await auditedGraphWrite(ctx, 'rollback-assign-licenses', 'POST', `/users/${userId}/assignLicense`, body, () =>
    ctx.graph.post<void>(`/users/${userId}/assignLicense`, body, { signal: ctx.signal })
  );
}

async function compensateAssignManager(ctx: IStepContext): Promise<void> {
  if (!ctx.job.targetUserId) {
    return;
  }
  const userId: string = ctx.job.targetUserId;
  await auditedGraphWrite(ctx, 'rollback-assign-manager', 'DELETE', `/users/${userId}/manager/$ref`, {}, () =>
    ctx.graph.delete<void>(`/users/${userId}/manager/$ref`, { signal: ctx.signal })
  );
}

async function compensateCreateUser(ctx: IStepContext): Promise<void> {
  if (!ctx.job.targetUserId) {
    return;
  }
  const userId: string = ctx.job.targetUserId;
  const body = { accountEnabled: false };
  await auditedGraphWrite(ctx, 'rollback-create-user', 'PATCH', `/users/${userId}`, body, () =>
    ctx.graph.patch<void>(`/users/${userId}`, body, { signal: ctx.signal })
  );
}

async function runAssignGroups(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const groupIds: string[] = [...payload.access.securityGroups, ...payload.access.m365Groups];
  if (groupIds.length === 0) {
    return;
  }
  const userId: string = await requireTargetUser(ctx);
  const already: Set<string> = await checkMemberGroups(ctx.graph, `/users/${userId}`, groupIds, ctx.signal);

  const toAdd: string[] = groupIds.filter((id) => !already.has(id));
  if (toAdd.length === 0) {
    return;
  }
  const failed: string[] = await batchAddGroupMembers(ctx, userId, toAdd, 'assign-group');
  if (failed.length > 0) {
    await ctx.data.createTask(
      ctx.job.jobId,
      'GroupAssignment',
      `Add ${payload.identity.userPrincipalName} to remaining groups`,
      `These group memberships could not be added through Graph: ${failed.join(', ')}`
    );
  }
}

async function batchAddTeamMembers(ctx: IStepContext, userId: string, assignments: { teamId: string; role: 'member' | 'owner' }[]): Promise<string[]> {
  const failed: string[] = [];

  for (let i = 0; i < assignments.length; i += BATCH_SIZE) {
    const chunk = assignments.slice(i, i + BATCH_SIZE);
    const requests: IBatchRequest[] = chunk.map((assignment) => ({
      id: assignment.teamId,
      method: 'POST',
      url: `/teams/${assignment.teamId}/members`,
      body: {
        '@odata.type': '#microsoft.graph.aadUserConversationMember',
        roles: assignment.role === 'owner' ? ['owner'] : [],
        'user@odata.bind': `https://graph.microsoft.com/v1.0/users('${userId}')`
      }
    }));

    try {
      const responses = await ctx.graph.batch(requests, { signal: ctx.signal });
      for (const assignment of chunk) {
        const response = responses.get(assignment.teamId);
        const status = response?.status ?? 0;
        if ((status >= 200 && status < 300) || isMemberAlreadyExistsResponse(status, response?.body)) {
          continue;
        }
        failed.push(assignment.teamId);
      }
    } catch (err) {
      if (err instanceof RequestAbortedError) {
        throw err;
      }
      failed.push(...chunk.map((a) => a.teamId));
    }
  }

  return failed;
}

async function runAssignTeams(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const assignments = payload.access.teams;
  if (assignments.length === 0) {
    return;
  }
  const userId: string = await requireTargetUser(ctx);

  const teamIds: string[] = assignments.map((a) => a.teamId);
  const already: Set<string> = await checkMemberGroups(ctx.graph, `/users/${userId}`, teamIds, ctx.signal);

  const toAdd = assignments.filter((a) => !already.has(a.teamId));
  if (toAdd.length === 0) {
    return;
  }
  const failed: string[] = await batchAddTeamMembers(ctx, userId, toAdd);
  if (failed.length > 0) {
    await ctx.data.createTask(
      ctx.job.jobId,
      'TeamAssignment',
      `Add ${payload.identity.userPrincipalName} to remaining Teams`,
      `These Teams memberships could not be added through Graph: ${failed.join(', ')}`
    );
  }
}

async function runAssignSharePoint(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const assignments = payload.access.sharePointSites;
  if (assignments.length === 0) {
    return;
  }
  await requireTargetUser(ctx);

  const failed: string[] = [];
  for (const assignment of assignments) {
    const started: number = Date.now();
    try {
      await ctx.siteAccess.grantAccess(assignment.siteUrl, payload.identity.userPrincipalName, assignment.role);
      await ctx.audit.log({
        jobId: ctx.job.jobId,
        action: 'assign-sharepoint-access',
        targetUser: payload.identity.userPrincipalName,
        graphEndpoint: '',
        requestSummary: JSON.stringify({ siteUrl: assignment.siteUrl, role: assignment.role }),
        responseCode: 200,
        durationMs: Date.now() - started,
        result: 'Success',
        correlationId: ctx.job.correlationId
      });
    } catch {
      await ctx.audit.log({
        jobId: ctx.job.jobId,
        action: 'assign-sharepoint-access',
        targetUser: payload.identity.userPrincipalName,
        graphEndpoint: '',
        requestSummary: JSON.stringify({ siteUrl: assignment.siteUrl, role: assignment.role }),
        responseCode: 0,
        durationMs: Date.now() - started,
        result: 'Failure',
        correlationId: ctx.job.correlationId
      });
      failed.push(assignment.siteUrl);
    }
  }
  if (failed.length > 0) {
    await ctx.data.createTask(
      ctx.job.jobId,
      'SharePointAccess',
      `Grant ${payload.identity.userPrincipalName} SharePoint access`,
      `These site grants could not be completed automatically: ${failed.join(', ')}`
    );
  }
}

async function runAssignApplications(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const appItemIds = payload.access.applications;
  if (appItemIds.length === 0) {
    return;
  }
  const userId: string = await requireTargetUser(ctx);

  const catalog: IApplicationCatalogItem[] = await ctx.data.getApplicationCatalog();
  const byId: Map<string, IApplicationCatalogItem> = new Map(catalog.map((a) => [String(a.itemId), a]));

  const groupBasedTargets: IApplicationCatalogItem[] = [];
  const manualEntries: string[] = [];
  for (const appItemId of appItemIds) {
    const app = byId.get(appItemId);
    if (!app) {
      continue;
    }
    if (app.provisioningType === 'GroupBased' && app.targetGroupId) {
      groupBasedTargets.push(app);
    } else {
      manualEntries.push(app.title);
    }
  }

  const groupIds: string[] = groupBasedTargets.map((t) => t.targetGroupId as string);
  const already: Set<string> = await checkMemberGroups(ctx.graph, `/users/${userId}`, groupIds, ctx.signal);

  const toAdd: string[] = groupIds.filter((id) => !already.has(id));
  const failedGroupBased: string[] = await batchAddGroupMembers(ctx, userId, toAdd, 'assign-application');

  const needsAttention: string[] = [
    ...manualEntries,
    ...groupBasedTargets.filter((app) => failedGroupBased.indexOf(app.targetGroupId as string) !== -1).map((app) => app.title)
  ];
  if (needsAttention.length > 0) {
    await ctx.data.createTask(
      ctx.job.jobId,
      'ApplicationAssignment',
      `Grant ${payload.identity.userPrincipalName} access to applications`,
      `These applications need manual provisioning or could not be group-assigned: ${needsAttention.join(', ')}`
    );
  }
}

async function runPresentCredentials(ctx: IStepContext): Promise<void> {
  const payload: IOnboardingPayload = onboarding(ctx);
  if (payload.identity.accountType === 'guest') {
    return;
  }
  const userId: string = await requireTargetUser(ctx);
  const upn: string = payload.identity.userPrincipalName;

  if (payload.accountSettings.credentialMode === 'tap') {
    const existing: { value: { id: string }[] } | null = await getOrNull(() =>
      ctx.graph.get<{ value: { id: string }[] }>(`/users/${userId}/authentication/temporaryAccessPassMethods`, { signal: ctx.signal })
    );
    const staleTapIds: string[] = (existing?.value ?? []).map((m) => m.id);
    for (let i = 0; i < staleTapIds.length; i += BATCH_SIZE) {
      const chunk: string[] = staleTapIds.slice(i, i + BATCH_SIZE);
      const requests: IBatchRequest[] = chunk.map((id) => ({
        id,
        method: 'DELETE',
        url: `/users/${userId}/authentication/temporaryAccessPassMethods/${id}`
      }));
      try {
        await ctx.graph.batch(requests, { signal: ctx.signal });
      } catch (err) {
        if (err instanceof RequestAbortedError) {
          throw err;
        }
      }
    }
    const tap: { temporaryAccessPass: string } = await auditedGraphWrite(
      ctx,
      'create-tap',
      'POST',
      `/users/${userId}/authentication/temporaryAccessPassMethods`,
      {},
      () => ctx.graph.post<{ temporaryAccessPass: string }>(`/users/${userId}/authentication/temporaryAccessPassMethods`, {}, { signal: ctx.signal })
    );
    ctx.secrets.temporaryAccessPass = tap.temporaryAccessPass;
    await ctx.presentCredentials({ kind: 'tap', value: tap.temporaryAccessPass, userPrincipalName: upn });
    return;
  }

  if (!ctx.secrets.temporaryPassword) {
    const password: string = generateTempPassword();
    const body = { passwordProfile: { password, forceChangePasswordNextSignIn: payload.accountSettings.forceChangePassword } };
    await auditedGraphWrite(ctx, 'reset-temp-password', 'PATCH', `/users/${userId}`, body, () =>
      ctx.graph.patch<void>(`/users/${userId}`, body, { signal: ctx.signal })
    );
    ctx.secrets.temporaryPassword = password;
  }
  await ctx.presentCredentials({ kind: 'password', value: ctx.secrets.temporaryPassword, userPrincipalName: upn });
}

async function runUploadPhoto(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const dataUrl: string | undefined = payload.personal.photoDataUrl;
  if (!dataUrl) {
    return;
  }
  const userId: string = await requireTargetUser(ctx);

  const match: RegExpExecArray | null = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) {
    return;
  }
  const [, contentType, base64] = match;
  const binary: string = atob(base64);
  const bytes: Uint8Array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }

  await auditedGraphWrite(ctx, 'upload-photo', 'PUT', `/users/${userId}/photo/$value`, { contentType, bytes: bytes.length }, () =>
    ctx.graph.put<void>(`/users/${userId}/photo/$value`, bytes.buffer, { signal: ctx.signal, headers: { 'Content-Type': contentType } })
  );
}

async function runSendNotifications(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const managerUpn: string | undefined = payload.employment.managerUpn;
  if (!managerUpn) {
    return;
  }
  const body = {
    message: {
      subject: formatString(strings.MailOnboardCompleteSubject, payload.personal.displayName),
      body: {
        contentType: 'Text',
        content: formatString(
          strings.MailOnboardCompleteBody,
          payload.personal.displayName,
          payload.identity.userPrincipalName
        )
      },
      toRecipients: [{ emailAddress: { address: managerUpn } }]
    },
    saveToSentItems: true
  };
  await auditedGraphWrite(ctx, 'send-notification', 'POST', '/me/sendMail', body, () =>
    ctx.graph.post<void>('/me/sendMail', body, { signal: ctx.signal })
  );
}

async function runScheduleAccessReview(ctx: IStepContext): Promise<void> {
  const payload = onboarding(ctx);
  const days: number | null = payload.expirationReviewDays;
  if (!days || days <= 0) {
    return;
  }
  const dueDateLabel: string = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  await ctx.data.createTask(
    ctx.job.jobId,
    'AccessReview',
    `Review access for ${payload.identity.userPrincipalName} by ${dueDateLabel}`,
    `This account's access was granted under a ${days}-day review policy. Review whether ${payload.identity.userPrincipalName}'s licenses, groups and access are still needed, and offboard or renew as appropriate. Due: ${dueDateLabel}.`
  );
}

function cloneSource(ctx: IStepContext): string | undefined {
  return onboarding(ctx).cloneSourceUserId;
}

async function runValidateCloneSource(ctx: IStepContext): Promise<void> {
  const sourceId: string | undefined = cloneSource(ctx);
  if (!sourceId) {
    throw new StepFailure('Clone job has no source user set', 'UPC_InvalidPayload', false);
  }
  const source: { id: string } | null = await getOrNull(() => ctx.graph.get<{ id: string }>(`/users/${sourceId}?$select=id`, { signal: ctx.signal }));
  if (!source) {
    throw new StepFailure('The clone source user was not found in the directory', 'UPC_TargetNotFound', false);
  }
}

async function runCopyLicenses(ctx: IStepContext): Promise<void> {
  const sourceId: string | undefined = cloneSource(ctx);
  if (!sourceId) {
    return;
  }
  const userId: string = await requireTargetUser(ctx);
  const source: { value: { skuId: string }[] } = await ctx.graph.get<{ value: { skuId: string }[] }>(
    `/users/${sourceId}/licenseDetails?$select=skuId`,
    { signal: ctx.signal }
  );
  const sourceSkuIds: string[] = (source.value ?? []).map((d) => d.skuId);
  if (sourceSkuIds.length === 0) {
    return;
  }
  const target: { value: { skuId: string }[] } = await ctx.graph.get<{ value: { skuId: string }[] }>(
    `/users/${userId}/licenseDetails?$select=skuId`,
    { signal: ctx.signal }
  );
  const already: Set<string> = new Set((target.value ?? []).map((d) => d.skuId));
  const toAdd: string[] = sourceSkuIds.filter((id) => !already.has(id));
  if (toAdd.length === 0) {
    return;
  }
  const body = { addLicenses: toAdd.map((skuId) => ({ skuId, disabledPlans: [] })), removeLicenses: [] };
  await auditedGraphWrite(ctx, 'copy-licenses', 'POST', `/users/${userId}/assignLicense`, body, () =>
    ctx.graph.post<void>(`/users/${userId}/assignLicense`, body, { signal: ctx.signal })
  );
}

interface ISourceGroup {
  id: string;
  groupTypes?: string[];
  mailEnabled?: boolean;
  onPremisesSyncEnabled?: boolean | null;
}
interface ISourceGroupPage {
  value: ISourceGroup[];
  '@odata.nextLink'?: string;
}

async function fetchAssignableGroups(ctx: IStepContext, sourceUserId: string): Promise<string[]> {
  const groups: ISourceGroup[] = [];
  let url: string | undefined = `/users/${sourceUserId}/memberOf/microsoft.graph.group?$select=id,groupTypes,mailEnabled,onPremisesSyncEnabled&$top=999`;
  while (url) {
    const page: ISourceGroupPage = await ctx.graph.get<ISourceGroupPage>(url, { signal: ctx.signal });
    groups.push(...(page.value ?? []));
    url = page['@odata.nextLink'];
  }
  return groups
    .filter((g) => {
      const types: string[] = g.groupTypes ?? [];
      const isDynamic: boolean = types.indexOf('DynamicMembership') !== -1;
      const isUnified: boolean = types.indexOf('Unified') !== -1;
      return !isDynamic && !g.onPremisesSyncEnabled && (!g.mailEnabled || isUnified);
    })
    .map((g) => g.id);
}

async function runCopyGroups(ctx: IStepContext): Promise<void> {
  const sourceId: string | undefined = cloneSource(ctx);
  if (!sourceId) {
    return;
  }
  const userId: string = await requireTargetUser(ctx);
  const groupIds: string[] = await fetchAssignableGroups(ctx, sourceId);
  if (groupIds.length === 0) {
    return;
  }
  const already: Set<string> = await checkMemberGroups(ctx.graph, `/users/${userId}`, groupIds, ctx.signal);

  const toAdd: string[] = groupIds.filter((id) => !already.has(id));
  const failed: string[] = await batchAddGroupMembers(ctx, userId, toAdd, 'copy-group');
  if (failed.length > 0) {
    await ctx.data.createTask(
      ctx.job.jobId,
      'GroupAssignment',
      `Add ${onboarding(ctx).identity.userPrincipalName} to remaining cloned groups`,
      `These group memberships could not be copied through Graph: ${failed.join(', ')}`
    );
  }
}

export const ONBOARDING_STEPS: IWorkflowStepDefinition[] = [
  { id: STEP_VALIDATE_INPUT, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runValidateInput },
  { id: STEP_CREATE_USER, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runCreateUser, compensate: compensateCreateUser },
  { id: STEP_SET_USAGE_LOCATION, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runSetUsageLocation },
  { id: STEP_ASSIGN_MANAGER, skippable: true, maxAttempts: 3, continueOnFailure: false, run: runAssignManager, compensate: compensateAssignManager },
  { id: STEP_ASSIGN_LICENSES, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runAssignLicenses, compensate: compensateAssignLicenses },
  { id: STEP_ASSIGN_GROUPS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runAssignGroups, compensate: compensateAssignGroups },
  { id: STEP_ASSIGN_TEAMS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runAssignTeams, compensate: compensateAssignTeams },
  { id: STEP_ASSIGN_SHAREPOINT, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runAssignSharePoint },
  { id: STEP_ASSIGN_APPLICATIONS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runAssignApplications, compensate: compensateAssignApplications },
  { id: STEP_UPLOAD_PHOTO, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runUploadPhoto },
  { id: STEP_PRESENT_CREDENTIALS, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runPresentCredentials },
  { id: STEP_SEND_NOTIFICATIONS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runSendNotifications },
  { id: STEP_SCHEDULE_ACCESS_REVIEW, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runScheduleAccessReview },
  { id: STEP_FINALIZE_AUDIT, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runFinalizeAudit }
];

export const CLONE_STEPS: IWorkflowStepDefinition[] = [
  { id: STEP_VALIDATE_INPUT, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runValidateInput },
  { id: STEP_CREATE_USER, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runCreateUser, compensate: compensateCreateUser },
  { id: STEP_SET_USAGE_LOCATION, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runSetUsageLocation },
  { id: STEP_ASSIGN_MANAGER, skippable: true, maxAttempts: 3, continueOnFailure: false, run: runAssignManager, compensate: compensateAssignManager },
  { id: STEP_ASSIGN_LICENSES, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runAssignLicenses, compensate: compensateAssignLicenses },
  { id: STEP_VALIDATE_CLONE_SOURCE, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runValidateCloneSource },
  { id: STEP_COPY_LICENSES, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runCopyLicenses },
  { id: STEP_COPY_GROUPS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runCopyGroups },
  { id: STEP_ASSIGN_GROUPS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runAssignGroups, compensate: compensateAssignGroups },
  { id: STEP_ASSIGN_TEAMS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runAssignTeams, compensate: compensateAssignTeams },
  { id: STEP_ASSIGN_SHAREPOINT, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runAssignSharePoint },
  { id: STEP_ASSIGN_APPLICATIONS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runAssignApplications, compensate: compensateAssignApplications },
  { id: STEP_UPLOAD_PHOTO, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runUploadPhoto },
  { id: STEP_PRESENT_CREDENTIALS, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runPresentCredentials },
  { id: STEP_SEND_NOTIFICATIONS, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runSendNotifications },
  { id: STEP_SCHEDULE_ACCESS_REVIEW, skippable: true, maxAttempts: 3, continueOnFailure: true, run: runScheduleAccessReview },
  { id: STEP_FINALIZE_AUDIT, skippable: false, maxAttempts: 3, continueOnFailure: false, run: runFinalizeAudit }
];
