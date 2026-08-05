import { WebPartContext } from '@microsoft/sp-webpart-base';
import { MSGraphClientV3 } from '@microsoft/sp-http';
import {
  ApprovalResponseType,
  IApprovalAssignee,
  IApprovalItem,
  IApprovalItemRequest,
  IApprovalItemRequestsResult,
  IApprovalItemsResponse,
  IApprovalResponseItem,
  IApprovalResponsesResult
} from '../models/IApprovalItem';

export type ApprovalBucket = 'pendingApproval' | 'myApprovalHistory' | 'sentPending' | 'sentHistory';

// Microsoft Graph caps $batch at 20 sub-requests per call.
const BATCH_SIZE = 20;

interface IBatchResponse {
  responses: {
    id: string;
    status: number;
    body?: { displayName?: string };
  }[];
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

const APPROVAL_ITEMS_ENDPOINT = '/solutions/approval/approvalItems';
const APPROVAL_ITEMS_SELECT = [
  'id',
  'displayName',
  'approvalType',
  'createdDateTime',
  'completedDateTime',
  'state',
  'result',
  'description',
  'allowCancel',
  'approvers',
  'owner',
  'viewPoint'
].join(',');

// Per the approvalItem resource docs, state is one of: canceled, created, pending, completed.
// Only completed/canceled are terminal - created/pending both count as still awaiting action.
const TERMINAL_STATES = new Set(['completed', 'canceled']);

export function isPendingApprovalItem(item: IApprovalItem): boolean {
  return !TERMINAL_STATES.has(item.state);
}

// The API returns every item the caller is party to (as approver and/or owner), not just
// items awaiting the caller's action, so viewPoint.roles is what tells us which relationship
// applies to the signed-in user for a given item.
function hasRole(item: IApprovalItem, role: 'approver' | 'owner'): boolean {
  const roles = item.viewPoint?.roles || [];
  return roles.some(r => r.toLowerCase() === role);
}

export function isApproverItem(item: IApprovalItem): boolean {
  return hasRole(item, 'approver');
}

export function isOwnerItem(item: IApprovalItem): boolean {
  return hasRole(item, 'owner');
}

// NOTE: $filter on the nested `viewPoint/roles` collection (e.g. "viewPoint/roles/any(r:r eq
// 'approver')") is rejected by this endpoint, so the approver/owner/state split can't be pushed
// to the server today. Bucketing is done client-side below instead, after fetching every page.
// If a future API revision accepts this filter, re-enable it per bucket to avoid pulling all pages.
// const BUCKET_FILTERS: Record<ApprovalBucket, string> = {
//   pendingApproval: "viewPoint/roles/any(r:r eq 'approver') and (state eq 'created' or state eq 'pending')",
//   myApprovalHistory: "viewPoint/roles/any(r:r eq 'approver') and (state eq 'completed' or state eq 'canceled')",
//   sentPending: "viewPoint/roles/any(r:r eq 'owner') and (state eq 'created' or state eq 'pending')",
//   sentHistory: "viewPoint/roles/any(r:r eq 'owner') and (state eq 'completed' or state eq 'canceled')"
// };

export class ApprovalsService {
  // Persists for the lifetime of the service instance, so repeated loads don't re-resolve the same users.
  private displayNameCache = new Map<string, string>();
  private currentUserId: string | undefined;

  constructor(private context: WebPartContext) { }

  private async getClient(): Promise<MSGraphClientV3> {
    return this.context.msGraphClientFactory.getClient('3');
  }

  // The signed-in user's AAD object id isn't exposed on SPFx's pageContext, so it's resolved once
  // via /me and cached - used to tell whether the current user is still the active approver on a
  // request (as opposed to having been reassigned away, or having already responded).
  public async getCurrentUserId(): Promise<string> {
    if (!this.currentUserId) {
      const client = await this.getClient();
      const me: { id: string } = await client.api('/me').version('v1.0').select('id').get();
      this.currentUserId = me.id;
    }
    return this.currentUserId;
  }

  public async getMyApprovalItems(): Promise<Record<ApprovalBucket, IApprovalItem[]>> {
    const items = await this.fetchAllPages();
    await this.hydrateOwnerAndApproverNames(items);

    return {
      pendingApproval: items.filter(item => isApproverItem(item) && isPendingApprovalItem(item)),
      myApprovalHistory: items.filter(item => isApproverItem(item) && !isPendingApprovalItem(item)),
      sentPending: items.filter(item => isOwnerItem(item) && isPendingApprovalItem(item)),
      sentHistory: items.filter(item => isOwnerItem(item) && !isPendingApprovalItem(item))
    };
  }

  public async submitApprovalResponse(approvalItemId: string, response: ApprovalResponseType, comments: string): Promise<void> {
    const client = await this.getClient();

    await client
      .api(`${APPROVAL_ITEMS_ENDPOINT}/${approvalItemId}/responses`)
      .version('beta')
      .post({ response, comments });
  }

  // Per-approver comments live on the responses sub-resource, not on the approvalItem itself,
  // so this is a separate call made lazily (only when a detail panel is opened) rather than
  // being pulled for every item on every list load.
  public async getApprovalItemResponses(approvalItemId: string): Promise<IApprovalResponseItem[]> {
    const client = await this.getClient();
    const result: IApprovalResponsesResult = await client
      .api(`${APPROVAL_ITEMS_ENDPOINT}/${approvalItemId}/responses`)
      .version('beta')
      .select('id,createdDateTime,response,comments,createdBy')
      .get();

    const responses = result.value || [];
    await this.hydrateAssigneeNames(responses.map(r => r.createdBy));
    return responses;
  }

  // Each entry is a per-approver assignment; a reassignment shows up as a new entry whose
  // reassignedFrom names the prior approver, with the superseded entry's isReassigned flipped
  // to true. Lazy, per-item, same reasoning as getApprovalItemResponses.
  public async getApprovalItemRequests(approvalItemId: string): Promise<IApprovalItemRequest[]> {
    const client = await this.getClient();
    const result: IApprovalItemRequestsResult = await client
      .api(`${APPROVAL_ITEMS_ENDPOINT}/${approvalItemId}/requests`)
      .version('beta')
      .select('id,createdDateTime,isReassigned,approver,reassignedFrom')
      .get();

    const requests = result.value || [];
    const assignees: (IApprovalAssignee | null | undefined)[] = [];
    requests.forEach(request => {
      assignees.push(request.approver);
      assignees.push(request.reassignedFrom);
    });
    await this.hydrateAssigneeNames(assignees);
    return requests;
  }

  // Follows @odata.nextLink until the API stops returning one, so callers always get the
  // complete result set instead of just the first page.
  private async fetchAllPages(): Promise<IApprovalItem[]> {
    const client = await this.getClient();
    const items: IApprovalItem[] = [];

    let response: IApprovalItemsResponse = await client
      .api(APPROVAL_ITEMS_ENDPOINT)
      .version('beta')
      .select(APPROVAL_ITEMS_SELECT)
      .orderby('createdDateTime desc')
      .top(100)
      .get();
    items.push(...(response.value || []));

    while (response['@odata.nextLink']) {
      response = await this.fetchRawByNextLink(response['@odata.nextLink']);
      items.push(...(response.value || []));
    }

    return items;
  }

  private async fetchRawByNextLink(nextLink: string): Promise<IApprovalItemsResponse> {
    // MSGraphClientV3.api() expects a relative path, so pull the "/beta/..." portion
    // (path + query string) back out of the absolute @odata.nextLink URL.
    const url = new URL(nextLink);
    const versionMatch = /^\/(v1\.0|beta)(\/.*)$/.exec(url.pathname);
    const version = versionMatch ? versionMatch[1] : 'beta';
    const path = versionMatch ? versionMatch[2] : url.pathname;

    const client = await this.getClient();
    return client.api(`${path}${url.search}`).version(version).get();
  }

  // approvalItem's owner/approvers occasionally come back with a user id but no displayName
  // (e.g. guest accounts, or names that just haven't synced to the resource yet). Rather than
  // showing a blank name, look the missing ones up by id and patch them in place.
  private async hydrateOwnerAndApproverNames(items: IApprovalItem[]): Promise<void> {
    const assignees: (IApprovalAssignee | null | undefined)[] = [];
    items.forEach(item => {
      assignees.push(item.owner);
      assignees.push(...item.approvers);
    });
    await this.hydrateAssigneeNames(assignees);
  }

  // Shared by both approvalItem owner/approvers and response createdBy - same shape, same fix.
  private async hydrateAssigneeNames(assignees: (IApprovalAssignee | null | undefined)[]): Promise<void> {
    const missingIds = new Set<string>();
    assignees.forEach(assignee => {
      if (assignee?.user?.id && !assignee.user.displayName && !this.displayNameCache.has(assignee.user.id)) {
        missingIds.add(assignee.user.id);
      }
    });

    if (missingIds.size > 0) {
      await this.resolveDisplayNames(Array.from(missingIds));
    }

    assignees.forEach(assignee => {
      if (assignee?.user?.id && !assignee.user.displayName) {
        const resolved = this.displayNameCache.get(assignee.user.id);
        if (resolved) {
          assignee.user.displayName = resolved;
        }
      }
    });
  }

  // Resolves user ids to display names via Graph $batch (20 sub-requests per call) and populates
  // displayNameCache. Best-effort: a failed chunk just leaves those ids unresolved for this call.
  private async resolveDisplayNames(userIds: string[]): Promise<void> {
    const client = await this.getClient();

    for (const batchIds of chunk(userIds, BATCH_SIZE)) {
      try {
        const batchResponse: IBatchResponse = await client
          .api('/$batch')
          .version('v1.0')
          .post({
            requests: batchIds.map(id => ({
              id,
              method: 'GET',
              url: `/users/${id}?$select=id,displayName`
            }))
          });

        for (const response of batchResponse.responses || []) {
          if (response.status === 200 && response.body?.displayName) {
            this.displayNameCache.set(response.id, response.body.displayName);
          }
        }
      } catch {
        // Missing names just fall back to "Unknown"/"Unassigned" in the UI.
      }
    }
  }
}
