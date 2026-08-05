import * as React from 'react';
import { useEffect, useMemo, useState, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  DefaultButton,
  PrimaryButton,
  Dropdown,
  IDropdownOption,
  SearchBox,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
  Panel,
  PanelType,
  Stack,
  Text,
  TextField
} from '@fluentui/react';
import styles from './PowerAutomateApprovals.module.scss';
import type { IPowerAutomateApprovalsProps } from './IPowerAutomateApprovalsProps';
import type { ApprovalResponseType, IApprovalAssignee, IApprovalItem, IApprovalItemRequest, IApprovalResponseItem } from '../models/IApprovalItem';
import type { ApprovalBucket } from '../services/ApprovalsService';
import { isPendingApprovalItem } from '../services/ApprovalsService';

type TabKey = ApprovalBucket;
type View = 'dashboard' | TabKey;
type SortOrder = 'newest' | 'oldest';

const TAB_KEYS: TabKey[] = ['pendingApproval', 'myApprovalHistory', 'sentPending', 'sentHistory'];
// sentPending/sentHistory are requests I raised - the secondary line on those rows names the approver, not the requester.
const OWNER_VIEW_TABS = new Set<TabKey>(['sentPending', 'sentHistory']);

const TAB_LABELS: Record<TabKey, string> = {
  pendingApproval: 'Requests Awaiting My Action',
  myApprovalHistory: 'Approved / Rejected by Me',
  sentPending: 'My Requests — Pending',
  sentHistory: 'My Requests — Past'
};

const TAB_TILE_CLASS: Record<TabKey, string> = {
  pendingApproval: styles.statTileBlue,
  myApprovalHistory: styles.statTileGreen,
  sentPending: styles.statTileOrange,
  sentHistory: styles.statTilePurple
};

const LIST_SUBTITLES: Record<TabKey, string> = {
  pendingApproval: 'Requests raised by others, waiting on your decision.',
  myApprovalHistory: 'Requests you have already actioned.',
  sentPending: "Requests you've raised that are still awaiting a decision.",
  sentHistory: "Requests you've raised that have been completed."
};

const TAB_EMPTY_MESSAGES: Record<TabKey, (userDisplayName: string) => string> = {
  pendingApproval: name => `No approvals are waiting on ${name}.`,
  myApprovalHistory: name => `${name} has not approved or rejected any requests yet.`,
  sentPending: name => `${name} has no approval requests awaiting a response.`,
  sentHistory: name => `None of ${name}'s requests have been completed yet.`
};

const SORT_OPTIONS: IDropdownOption[] = [
  { key: 'newest', text: 'Newest first' },
  { key: 'oldest', text: 'Oldest first' }
];

function emptyRecord<T>(value: T): Record<TabKey, T> {
  return {
    pendingApproval: value,
    myApprovalHistory: value,
    sentPending: value,
    sentHistory: value
  };
}

// eslint-disable-next-line @rushstack/no-new-null -- completedDateTime is null (not undefined) per the Graph API response
function formatDateShort(value: string | null): string {
  return value ? new Date(value).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';
}

// eslint-disable-next-line @rushstack/no-new-null -- completedDateTime is null (not undefined) per the Graph API response
function formatDateTime(value: string | null): string {
  if (!value) {
    return '';
  }
  const date = new Date(value);
  const datePart = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  const timePart = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  return `${datePart} · ${timePart}`;
}

function getErrorMessage(err: unknown, fallback: string): string {
  return err instanceof Error && err.message ? err.message : fallback;
}

// eslint-disable-next-line @rushstack/no-new-null -- reassignedFrom is null (not undefined) per the Graph API response
function getAssigneeName(assignee: IApprovalAssignee | null | undefined): string | undefined {
  return assignee?.user?.displayName || assignee?.group?.displayName || undefined;
}

function getApproversLabel(item: IApprovalItem): string {
  const names = item.approvers
    .map(getAssigneeName)
    .filter((name): name is string => !!name);
  return names.length > 0 ? names.join(', ') : 'Unassigned';
}

// The approvers a request was originally assigned to (approvalItem.approvers) don't update after
// a reassignment - the /requests sub-resource is the source of truth for who's actually on the
// hook right now (isReassigned: false means still active).
function getCurrentApproverNames(requests: IApprovalItemRequest[]): string[] {
  return requests
    .filter(request => !request.isReassigned)
    .map(request => getAssigneeName(request.approver))
    .filter((name): name is string => !!name);
}

// item.result comes back from the API as the action verb ("Approve"/"Reject"), but status
// tags should read as a completed state ("Approved"/"Rejected"), not an instruction.
function isApprovedResult(item: IApprovalItem): boolean {
  return item.result === 'Approve' || item.result === 'Approved';
}

function isRejectedResult(item: IApprovalItem): boolean {
  return item.result === 'Reject' || item.result === 'Rejected';
}

function getPastStateLabel(item: IApprovalItem): string {
  if (item.state === 'canceled') {
    return 'Canceled';
  }
  if (isApprovedResult(item)) {
    return 'Approved';
  }
  if (isRejectedResult(item)) {
    return 'Rejected';
  }
  return item.result || 'Completed';
}

// Activity timeline entries name who took the action, unlike the status pill which just names the state.
function getActivityActionLabel(item: IApprovalItem): string {
  if (item.state === 'canceled') {
    return `Canceled by ${item.owner?.user?.displayName || 'Unknown'}`;
  }
  if (isApprovedResult(item)) {
    return `Accepted by ${getApproversLabel(item)}`;
  }
  if (isRejectedResult(item)) {
    return `Rejected by ${getApproversLabel(item)}`;
  }
  return getPastStateLabel(item);
}

function isApprovedResponse(response: IApprovalResponseItem): boolean {
  return response.response === 'Approve' || response.response === 'Approved';
}

function isRejectedResponse(response: IApprovalResponseItem): boolean {
  return response.response === 'Reject' || response.response === 'Rejected';
}

function getResponseActorName(response: IApprovalResponseItem): string {
  return getAssigneeName(response.createdBy) || 'Unknown';
}

function getResponseActionLabel(response: IApprovalResponseItem): string {
  if (isApprovedResponse(response)) {
    return `Accepted by ${getResponseActorName(response)}`;
  }
  if (isRejectedResponse(response)) {
    return `Rejected by ${getResponseActorName(response)}`;
  }
  return `${response.response} by ${getResponseActorName(response)}`;
}

function getResponseDotClassName(response: IApprovalResponseItem): string {
  if (isApprovedResponse(response)) {
    return styles.rowBarApproved;
  }
  if (isRejectedResponse(response)) {
    return styles.rowBarRejected;
  }
  return styles.rowBarCanceled;
}

// Everything shown in the Activity timeline - creation, reassignments, and responses/completion -
// is normalized into this shape so the whole list can be sorted together, newest first.
interface IActivityEvent {
  key: string;
  date: string;
  label: string;
  comment?: string;
  dotClassName: string;
}

function buildReassignmentEvent(request: IApprovalItemRequest): IActivityEvent | undefined {
  if (!request.reassignedFrom) {
    return undefined;
  }
  const fromName = getAssigneeName(request.reassignedFrom) || 'Unknown';
  const toName = getAssigneeName(request.approver) || 'Unknown';
  return {
    key: `reassign-${request.id}`,
    date: request.createdDateTime,
    label: `Reassigned from ${fromName} to ${toName}`,
    dotClassName: styles.rowBarCanceled
  };
}

function buildResponseEvent(response: IApprovalResponseItem): IActivityEvent {
  return {
    key: `response-${response.id}`,
    date: response.createdDateTime,
    label: getResponseActionLabel(response),
    comment: response.comments || undefined,
    dotClassName: getResponseDotClassName(response)
  };
}

function getPastStateClassName(item: IApprovalItem): string {
  if (item.state === 'canceled') {
    return styles.stateCanceled;
  }
  return isApprovedResult(item) ? styles.stateApproved : styles.stateRejected;
}

function getRowBarClassName(item: IApprovalItem): string {
  if (isPendingApprovalItem(item)) {
    return styles.rowBarPending;
  }
  if (item.state === 'canceled') {
    return styles.rowBarCanceled;
  }
  return isApprovedResult(item) ? styles.rowBarApproved : styles.rowBarRejected;
}

// The "activity date" for a row is when something last happened on it - completion for
// finished items, creation for anything still open.
function getActivityDate(item: IApprovalItem): string {
  if (isPendingApprovalItem(item)) {
    return item.createdDateTime;
  }
  return item.completedDateTime || item.createdDateTime;
}

interface IApprovalRowProps {
  item: IApprovalItem;
  bucket: TabKey;
  onClick: () => void;
}

const ApprovalRow: React.FunctionComponent<IApprovalRowProps> = ({ item, bucket, onClick }) => {
  const pending = isPendingApprovalItem(item);
  const secondaryLabel = OWNER_VIEW_TABS.has(bucket) ? 'Approver' : 'Requested by';
  const secondaryName = OWNER_VIEW_TABS.has(bucket) ? getApproversLabel(item) : (item.owner?.user?.displayName || 'Unknown');

  return (
    <button type="button" className={`${styles.row} ${getRowBarClassName(item)}`} onClick={onClick}>
      <div className={styles.rowMain}>
        <Text block className={styles.rowTitle}>{item.displayName}</Text>
        <Text variant="small" block className={styles.rowSubtitle}>{secondaryLabel}: {secondaryName}</Text>
      </div>
      <div className={styles.rowRight}>
        <span className={`${styles.statePill} ${pending ? styles.statePending : getPastStateClassName(item)}`}>
          {pending ? 'Pending' : getPastStateLabel(item)}
        </span>
        <Text variant="xSmall" block className={styles.rowDate}>{formatDateShort(getActivityDate(item))}</Text>
      </div>
    </button>
  );
};

const PowerAutomateApprovals: React.FunctionComponent<IPowerAutomateApprovalsProps> = (props) => {
  const { approvalsService, userDisplayName } = props;

  const [view, setView] = useState<View>('dashboard');
  const [itemsByTab, setItemsByTab] = useState<Record<TabKey, IApprovalItem[]>>(emptyRecord<IApprovalItem[]>([]));
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [selectedItem, setSelectedItem] = useState<IApprovalItem | undefined>(undefined);
  const [selectedItemBucket, setSelectedItemBucket] = useState<TabKey | undefined>(undefined);
  const [responses, setResponses] = useState<IApprovalResponseItem[]>([]);
  const [responsesLoading, setResponsesLoading] = useState<boolean>(false);
  const [responsesError, setResponsesError] = useState<string | undefined>(undefined);
  const [requests, setRequests] = useState<IApprovalItemRequest[]>([]);
  const [requestsLoading, setRequestsLoading] = useState<boolean>(false);
  const [requestsError, setRequestsError] = useState<string | undefined>(undefined);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);
  // TEMP: raw JSON inspector for data verification - remove once viewPoint data is confirmed.
  const [debugPayload, setDebugPayload] = useState<{ item: IApprovalItem; responses: IApprovalResponseItem[]; requests: IApprovalItemRequest[] } | undefined>(undefined);
  const [comment, setComment] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | undefined>(undefined);

  const goToList = useCallback((tab: TabKey): void => {
    setSearchQuery('');
    setSortOrder('newest');
    setView(tab);
  }, []);

  const goToDashboard = useCallback((): void => setView('dashboard'), []);

  const openPanel = useCallback((item: IApprovalItem, bucket: TabKey): void => {
    setSelectedItem(item);
    setSelectedItemBucket(bucket);
    setComment('');
    setSubmitError(undefined);
  }, []);

  const closePanel = useCallback((): void => {
    setSelectedItem(undefined);
    setSelectedItemBucket(undefined);
    setComment('');
    setSubmitError(undefined);
  }, []);

  const selectedItemId = selectedItem?.id;

  useEffect(() => {
    if (!selectedItemId) {
      setResponses([]);
      setResponsesError(undefined);
      return;
    }
    let cancelled = false;
    setResponsesLoading(true);
    setResponsesError(undefined);

    const load = async (): Promise<void> => {
      try {
        const result = await approvalsService.getApprovalItemResponses(selectedItemId);
        if (!cancelled) {
          const sorted = [...result].sort((a, b) => new Date(b.createdDateTime).getTime() - new Date(a.createdDateTime).getTime());
          setResponses(sorted);
        }
      } catch (err) {
        if (!cancelled) {
          setResponsesError(getErrorMessage(err, 'Failed to load approver comments.'));
        }
      } finally {
        if (!cancelled) {
          setResponsesLoading(false);
        }
      }
    };
    load().catch(() => { /* handled above */ });

    return () => { cancelled = true; };
  }, [selectedItemId, approvalsService]);

  useEffect(() => {
    if (!selectedItemId) {
      setRequests([]);
      setRequestsError(undefined);
      return;
    }
    let cancelled = false;
    setRequestsLoading(true);
    setRequestsError(undefined);

    const load = async (): Promise<void> => {
      try {
        const result = await approvalsService.getApprovalItemRequests(selectedItemId);
        if (!cancelled) {
          setRequests(result);
        }
      } catch (err) {
        if (!cancelled) {
          setRequestsError(getErrorMessage(err, 'Failed to load reassignment history.'));
        }
      } finally {
        if (!cancelled) {
          setRequestsLoading(false);
        }
      }
    };
    load().catch(() => { /* handled above */ });

    return () => { cancelled = true; };
  }, [selectedItemId, approvalsService]);

  useEffect(() => {
    approvalsService.getCurrentUserId()
      .then(id => setCurrentUserId(id))
      .catch(() => { /* leave undefined - actionability checks fall back to the old behavior */ });
  }, [approvalsService]);

  const loadApprovals = useCallback(async (): Promise<void> => {
    setLoading(true);
    setError(undefined);
    try {
      const buckets = await approvalsService.getMyApprovalItems();
      setItemsByTab(buckets);
    } catch (err) {
      setError(getErrorMessage(err, 'Failed to load approvals from Microsoft Graph.'));
    } finally {
      setLoading(false);
    }
  }, [approvalsService]);

  const submitResponse = useCallback(async (response: ApprovalResponseType): Promise<void> => {
    if (!selectedItem) {
      return;
    }
    const respondedItemId = selectedItem.id;
    setSubmitting(true);
    setSubmitError(undefined);
    try {
      await approvalsService.submitApprovalResponse(respondedItemId, response, comment);
      closePanel();
      // Re-fetch everything so the item moves into "Approved / Rejected" with its real state/result.
      await loadApprovals();
      // Graph can briefly lag behind the response we just submitted, so make sure the item we
      // personally just acted on never reappears as "awaiting my action" even if that refresh
      // still reports it as pending.
      setItemsByTab(prev => ({
        ...prev,
        pendingApproval: prev.pendingApproval.filter(i => i.id !== respondedItemId)
      }));
    } catch (err) {
      setSubmitError(getErrorMessage(err, `Failed to submit ${response.toLowerCase()} response.`));
    } finally {
      setSubmitting(false);
    }
  }, [approvalsService, selectedItem, comment, closePanel, loadApprovals]);

  const handleApprove = useCallback((): void => {
    submitResponse('Approve').catch(() => { /* handled in submitResponse */ });
  }, [submitResponse]);

  const handleReject = useCallback((): void => {
    submitResponse('Reject').catch(() => { /* handled in submitResponse */ });
  }, [submitResponse]);

  useEffect(() => {
    loadApprovals().catch(() => {
      /* handled in loadApprovals */
    });
  }, [loadApprovals]);

  const recentActivity = useMemo(() => {
    const merged: { item: IApprovalItem; bucket: TabKey }[] = [];
    TAB_KEYS.forEach(tabKey => {
      itemsByTab[tabKey].forEach(item => merged.push({ item, bucket: tabKey }));
    });
    return merged
      .sort((a, b) => new Date(getActivityDate(b.item)).getTime() - new Date(getActivityDate(a.item)).getTime())
      .slice(0, 8);
  }, [itemsByTab]);

  const filteredListItems = useMemo(() => {
    if (view === 'dashboard') {
      return [];
    }
    const items = itemsByTab[view];
    const query = searchQuery.trim().toLowerCase();
    const matches = !query ? items : items.filter(item => {
      const owner = (item.owner?.user?.displayName || '').toLowerCase();
      const approvers = getApproversLabel(item).toLowerCase();
      return item.displayName.toLowerCase().includes(query) || owner.includes(query) || approvers.includes(query);
    });
    return [...matches].sort((a, b) => {
      const diff = new Date(a.createdDateTime).getTime() - new Date(b.createdDateTime).getTime();
      return sortOrder === 'oldest' ? diff : -diff;
    });
  }, [itemsByTab, view, searchQuery, sortOrder]);

  const isSelectedItemPending = !!selectedItem && isPendingApprovalItem(selectedItem);

  // Being an approver on the item overall isn't enough - after a reassignment, the prior approver
  // still has the "approver" role on the item forever, so the buttons must also confirm the
  // signed-in user is still the currently-assigned (non-reassigned) approver and hasn't already
  // responded themselves. Falls back to "allow" when the supporting data isn't available yet, so
  // this never blocks the existing approve/reject flow on a missing/failed lookup.
  const isCurrentUserActiveApprover = useMemo(() => {
    if (!currentUserId || requests.length === 0) {
      return true;
    }
    return requests.some(request => !request.isReassigned && request.approver.user?.id === currentUserId);
  }, [requests, currentUserId]);

  const hasCurrentUserAlreadyResponded = useMemo(() => {
    if (!currentUserId || responses.length === 0) {
      return false;
    }
    return responses.some(response => response.createdBy.user?.id === currentUserId);
  }, [responses, currentUserId]);

  const isSelectedItemActionable = !!selectedItem
    && selectedItemBucket === 'pendingApproval'
    && isCurrentUserActiveApprover
    && !hasCurrentUserAlreadyResponded;

  // requests/responses load lazily after responses/requests fetch, so this recomputes once either lands.
  const activityEvents = useMemo((): IActivityEvent[] => {
    if (!selectedItem) {
      return [];
    }
    const events: IActivityEvent[] = [
      {
        key: 'created',
        date: selectedItem.createdDateTime,
        label: `Request created by ${selectedItem.owner?.user?.displayName || 'Unknown'}`,
        dotClassName: styles.rowBarPending
      }
    ];

    requests.forEach(request => {
      const reassignmentEvent = buildReassignmentEvent(request);
      if (reassignmentEvent) {
        events.push(reassignmentEvent);
      }
    });

    if (selectedItem.state === 'canceled') {
      if (selectedItem.completedDateTime) {
        events.push({
          key: 'completed-fallback',
          date: selectedItem.completedDateTime,
          label: getActivityActionLabel(selectedItem),
          dotClassName: getRowBarClassName(selectedItem)
        });
      }
    } else if (responses.length > 0) {
      responses.forEach(response => events.push(buildResponseEvent(response)));
    } else if (!isPendingApprovalItem(selectedItem) && selectedItem.completedDateTime) {
      events.push({
        key: 'completed-fallback',
        date: selectedItem.completedDateTime,
        label: getActivityActionLabel(selectedItem),
        dotClassName: getRowBarClassName(selectedItem)
      });
    }

    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedItem, responses, requests]);

  const currentApproverNames = getCurrentApproverNames(requests);
  const approverLabel = currentApproverNames.length > 0
    ? currentApproverNames.join(', ')
    : (selectedItem ? getApproversLabel(selectedItem) : '');

  return (
    <section className={styles.powerAutomateApprovals}>
      <Stack horizontal horizontalAlign="space-between" verticalAlign="start" className={styles.header}>
        <div>
          {view === 'dashboard' ? (
            <>
              <Text variant="xLarge" block>My Approvals Dashboard</Text>
              <Text variant="small" block className={styles.subtitle}>Track requests waiting on you and requests you&apos;ve raised.</Text>
            </>
          ) : (
            <>
              <button type="button" className={styles.backLink} onClick={goToDashboard}>← Back to dashboard</button>
              <Text variant="xLarge" block>{TAB_LABELS[view]}</Text>
              <Text variant="small" block className={styles.subtitle}>{LIST_SUBTITLES[view]}</Text>
            </>
          )}
        </div>
        <DefaultButton text="Refresh" onClick={() => { loadApprovals().catch(() => { /* handled */ }); }} disabled={loading} />
      </Stack>

      {error && (
        <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setError(undefined)}>
          {error}
        </MessageBar>
      )}

      {loading && (
        <Stack horizontalAlign="center" className={styles.loading}>
          <Spinner size={SpinnerSize.large} label="Loading approvals..." />
        </Stack>
      )}

      {!loading && !error && view === 'dashboard' && (
        <>
          <div className={styles.statTiles}>
            {TAB_KEYS.map(tabKey => (
              <div key={tabKey} className={`${styles.statTile} ${TAB_TILE_CLASS[tabKey]}`}>
                <Text variant="small" block className={styles.statTileLabel}>{TAB_LABELS[tabKey]}</Text>
                <Text block className={styles.statTileNumber}>{itemsByTab[tabKey].length}</Text>
                <button type="button" className={styles.viewAllLink} onClick={() => goToList(tabKey)}>View all →</button>
              </div>
            ))}
          </div>

          <Text variant="large" block className={styles.sectionHeading}>Recent Activity</Text>
          {recentActivity.length === 0 ? (
            <MessageBar messageBarType={MessageBarType.info}>No activity to show for {userDisplayName} yet.</MessageBar>
          ) : (
            <div className={styles.rowList}>
              {recentActivity.map(({ item, bucket }) => (
                <ApprovalRow key={item.id} item={item} bucket={bucket} onClick={() => openPanel(item, bucket)} />
              ))}
            </div>
          )}
        </>
      )}

      {!loading && !error && view !== 'dashboard' && (
        <>
          <Stack horizontal tokens={{ childrenGap: 8 }} className={styles.searchSortBar}>
            <SearchBox
              placeholder="Search by title, requester, or approver"
              value={searchQuery}
              onChange={(_ev, value) => setSearchQuery(value || '')}
              className={styles.searchBox}
            />
            <Dropdown
              selectedKey={sortOrder}
              options={SORT_OPTIONS}
              onChange={(_ev, option) => setSortOrder((option?.key as SortOrder) || 'newest')}
              className={styles.sortDropdown}
            />
          </Stack>

          {filteredListItems.length === 0 ? (
            <MessageBar messageBarType={MessageBarType.info}>
              {TAB_EMPTY_MESSAGES[view](userDisplayName)}
            </MessageBar>
          ) : (
            <div className={styles.rowList}>
              {filteredListItems.map(item => (
                <ApprovalRow key={item.id} item={item} bucket={view} onClick={() => openPanel(item, view)} />
              ))}
            </div>
          )}
        </>
      )}

      <Panel
        isOpen={!!selectedItem}
        onDismiss={closePanel}
        type={PanelType.medium}
        closeButtonAriaLabel="Close"
        isFooterAtBottom={isSelectedItemActionable}
        onRenderFooterContent={isSelectedItemActionable ? () => (
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
            <PrimaryButton
              text="Approve"
              iconProps={{ iconName: 'CheckMark' }}
              className={styles.approveButton}
              onClick={handleApprove}
              disabled={submitting}
            />
            <DefaultButton
              text="Reject"
              iconProps={{ iconName: 'Cancel' }}
              className={styles.rejectButton}
              onClick={handleReject}
              disabled={submitting}
            />
            {submitting && <Spinner size={SpinnerSize.small} />}
          </Stack>
        ) : undefined}
      >
        {selectedItem && (
          <>
            <div className={styles.panelHeader}>
              <span className={`${styles.statePill} ${isSelectedItemPending ? styles.statePending : getPastStateClassName(selectedItem)}`}>
                {isSelectedItemPending ? 'Pending' : getPastStateLabel(selectedItem)}
              </span>
              <Text variant="xLarge" block className={styles.panelTitle}>{selectedItem.displayName}</Text>
            </div>

            <div className={styles.metaGrid}>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Requested by</span>
                <span className={styles.metaValue}>{selectedItem.owner?.user?.displayName || 'Unknown'}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Approver</span>
                <span className={styles.metaValue}>{approverLabel}</span>
              </div>
              <div className={styles.metaRow}>
                <span className={styles.metaLabel}>Created</span>
                <span className={styles.metaValue}>{formatDateTime(selectedItem.createdDateTime)}</span>
              </div>
              {!isSelectedItemPending && selectedItem.completedDateTime && (
                <div className={styles.metaRow}>
                  <span className={styles.metaLabel}>Completed</span>
                  <span className={styles.metaValue}>{formatDateTime(selectedItem.completedDateTime)}</span>
                </div>
              )}
            </div>

            <Text variant="mediumPlus" block className={styles.sectionHeading}>Details</Text>
            <div className={styles.markdownBody}>
              {selectedItem.description
                ? <ReactMarkdown>{selectedItem.description}</ReactMarkdown>
                : <Text className={styles.placeholderText}>No additional details provided.</Text>}
            </div>

            <Text variant="mediumPlus" block className={styles.sectionHeading}>Attachments</Text>
            <Text className={styles.placeholderText}>No attachments for this request.</Text>

            <Text variant="mediumPlus" block className={styles.sectionHeading}>Activity</Text>
            {responsesError && (
              <Text variant="xSmall" block className={styles.placeholderText}>{responsesError}</Text>
            )}
            {requestsError && (
              <Text variant="xSmall" block className={styles.placeholderText}>{requestsError}</Text>
            )}
            <div className={styles.activityList}>
              {(responsesLoading || requestsLoading) && (
                <div className={styles.activityEntry}>
                  <Spinner size={SpinnerSize.small} label="Loading activity..." />
                </div>
              )}
              {!responsesLoading && !requestsLoading && activityEvents.map(event => (
                <div className={styles.activityEntry} key={event.key}>
                  <span className={`${styles.activityDot} ${event.dotClassName}`} />
                  <div>
                    <Text block>{event.label}</Text>
                    {event.comment && (
                      <Text variant="small" block className={styles.activityComment}>{`"${event.comment}"`}</Text>
                    )}
                    <Text variant="xSmall" block className={styles.timestamp}>{formatDateTime(event.date)}</Text>
                  </div>
                </div>
              ))}
            </div>

            {isSelectedItemActionable && (
              <div className={styles.reassignRow}>
                <DefaultButton text="Reassign" disabled title="Reassign functionality to be added later" />
                <Text variant="xSmall" className={styles.placeholderText}>Reassign functionality to be added later.</Text>
              </div>
            )}

            {isSelectedItemActionable && (
              <TextField
                label="Comments"
                placeholder="Add a comment for the requester (optional)"
                multiline
                rows={4}
                value={comment}
                onChange={(_ev, value) => setComment(value || '')}
                disabled={submitting}
                className={styles.commentBox}
              />
            )}
            {submitError && (
              <MessageBar messageBarType={MessageBarType.error} onDismiss={() => setSubmitError(undefined)}>
                {submitError}
              </MessageBar>
            )}

            {/* TEMP: raw JSON inspector for data verification - remove once viewPoint data is confirmed. */}
            <button
              type="button"
              className={styles.debugLink}
              onClick={() => setDebugPayload({ item: selectedItem, responses, requests })}
            >
              View raw JSON (debug) - includes fetched responses/requests
            </button>
          </>
        )}
      </Panel>

      {/* TEMP: raw JSON inspector for data verification - remove once viewPoint data is confirmed. */}
      <Panel
        isOpen={!!debugPayload}
        onDismiss={() => setDebugPayload(undefined)}
        type={PanelType.medium}
        headerText={`Raw JSON: ${debugPayload?.item.displayName ?? ''}`}
        closeButtonAriaLabel="Close"
      >
        <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontSize: 12 }}>
          {debugPayload ? JSON.stringify(debugPayload, null, 2) : ''}
        </pre>
      </Panel>
    </section>
  );
};

export default PowerAutomateApprovals;
