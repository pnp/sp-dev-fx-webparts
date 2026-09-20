import * as React from 'react';
import { Badge, Body1, Button, Caption1, MessageBar, MessageBarBody, Spinner, Subtitle2 } from '@fluentui/react-components';
import type { SelectTabData, SelectTabEvent, TabValue } from '@fluentui/react-components';
import { AddRegular, DeleteRegular } from '@fluentui/react-icons';
import { Drawer } from '../../../../components/Drawer';
import { IListViewColumn, ListView } from '../../../../components/ListView';
import { PeoplePicker, type IPeoplePickerItem } from '../../../../components/PeoplePicker';
import { TabList } from '../../../../components/TabList';
import { ExternalLink } from '../../../../components/ExternalLink';
import { GraphSitesService } from '../../../../common/services';
import { IAsyncState, IGroupDetails, IPersonInfo } from '../../../../common/types';
import { formatDate } from '../../../../common/utils';
import { PERSON_COLUMNS } from '../panels/MembershipDrawer/membershipColumns';
import styles from './GroupDetailsDrawer.module.scss';
import type { IGroupDetailsDrawerProps } from './IGroupDetailsDrawerProps';

const TAB_OWNERS = 'owners';
const TAB_MEMBERS = 'members';
const TAB_VISITORS = 'visitors';
type TManageablePeopleTab = typeof TAB_OWNERS | typeof TAB_MEMBERS;
const ROW_HEIGHT = 44;
const HEADER_HEIGHT = 44;
const VIEWPORT_EXTRA_HEIGHT = 8;
const EMPTY_HEIGHT = 96;
const MAX_LIST_HEIGHT = 520;

function getPeopleListHeight(itemCount: number): number {
  return itemCount > 0
    ? Math.min(HEADER_HEIGHT + itemCount * ROW_HEIGHT + VIEWPORT_EXTRA_HEIGHT, MAX_LIST_HEIGHT)
    : EMPTY_HEIGHT;
}

function getCompactListStyles(itemCount: number): { table: React.CSSProperties; viewport: React.CSSProperties } {
  const needsScroll = HEADER_HEIGHT + itemCount * ROW_HEIGHT + VIEWPORT_EXTRA_HEIGHT > MAX_LIST_HEIGHT;
  return {
    table: { minHeight: 'unset' },
    viewport: { overflowY: needsScroll ? 'auto' : 'hidden' }
  };
}

function isManageablePeopleTab(value: TabValue): value is TManageablePeopleTab {
  return value === TAB_OWNERS || value === TAB_MEMBERS;
}

function isSamePerson(left: IPersonInfo | undefined, right: IPersonInfo | undefined): boolean {
  if (!left || !right) {
    return false;
  }
  const leftKeys = [left.id, left.email, left.userPrincipalName]
    .filter((value): value is string => !!value)
    .map((value) => value.toLowerCase());
  const rightKeys = new Set([right.id, right.email, right.userPrincipalName]
    .filter((value): value is string => !!value)
    .map((value) => value.toLowerCase()));
  return leftKeys.some((key) => rightKeys.has(key));
}

function GroupDetailsDrawer({
  group,
  open,
  context,
  sp,
  graph,
  onClose
}: Readonly<IGroupDetailsDrawerProps>): JSX.Element {
  const service = React.useMemo(
    () => new GraphSitesService({ sp, graph, context }),
    [sp, graph, context]
  );
  const [load, setLoad] = React.useState<IAsyncState<IGroupDetails | undefined>>({
    data: undefined,
    isLoading: false
  });
  const [selectedPeopleTab, setSelectedPeopleTab] = React.useState<TabValue>(TAB_OWNERS);
  const [selectedUsers, setSelectedUsers] = React.useState<IPeoplePickerItem[]>([]);
  const [operationError, setOperationError] = React.useState<string | undefined>();
  const [operationMessage, setOperationMessage] = React.useState<string | undefined>();
  const [busyAction, setBusyAction] = React.useState<string | undefined>();

  const onPeopleTabSelect = React.useCallback((_event: SelectTabEvent, data: SelectTabData): void => {
    setSelectedPeopleTab(data.value);
    setSelectedUsers([]);
  }, []);

  const loadGroupDetails = React.useCallback(async (groupId: string, isCancelled: () => boolean): Promise<void> => {
    setLoad({ data: undefined, isLoading: true });
    try {
      const result = await service.getGroupDetails(groupId);
      if (!isCancelled()) {
        setLoad({ data: result, isLoading: false });
      }
    } catch (err) {
      if (!isCancelled()) {
        const error = err instanceof Error ? err : new Error(String(err));
        setLoad({ data: undefined, isLoading: false, error: error.message });
      }
    }
  }, [service]);

  React.useEffect(() => {
    if (!open || !group) {
      return undefined;
    }
    let cancelled = false;
    setSelectedUsers([]);
    setOperationError(undefined);
    setOperationMessage(undefined);

    loadGroupDetails(group.id, () => cancelled).catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, [loadGroupDetails, open, group]);

  const details = load.data ?? group;
  const kind = details?.isTeam
    ? 'Team'
    : details?.groupTypes.includes('Unified')
      ? 'Microsoft 365 group'
      : details?.securityEnabled
        ? 'Security group'
        : 'Group';
  const owners = load.data?.owners ?? [];
  const members = load.data?.members ?? [];
  const visitors = load.data?.visitors ?? [];
  const selectedPeople = selectedPeopleTab === TAB_MEMBERS
    ? members
    : selectedPeopleTab === TAB_VISITORS
      ? visitors
      : owners;
  const canManageSelectedPeople = !!load.data?.canManageMembership && isManageablePeopleTab(selectedPeopleTab);
  const selectedRole = isManageablePeopleTab(selectedPeopleTab) ? selectedPeopleTab : undefined;
  const currentUser = load.data?.currentUser;
  const searchPlaceholder = selectedPeopleTab === TAB_MEMBERS
    ? 'Search members'
    : selectedPeopleTab === TAB_VISITORS
      ? 'Search visitors'
      : 'Search owners';
  const addPlaceholder = selectedPeopleTab === TAB_MEMBERS
    ? 'Search for users to add as members'
    : 'Search for users to add as owners';

  const refreshAfterMutation = React.useCallback(async (): Promise<void> => {
    if (!group) {
      return;
    }
    await loadGroupDetails(group.id, () => false);
  }, [group, loadGroupDetails]);

  const handleAddUser = React.useCallback(async (): Promise<void> => {
    if (!group || !selectedRole || selectedUsers.length === 0) {
      return;
    }
    setBusyAction('add');
    setOperationError(undefined);
    setOperationMessage(undefined);
    try {
      const results = await Promise.all(
        selectedUsers.map((selectedUser) => {
          const userLookup = selectedUser.email ?? selectedUser.loginName ?? String(selectedUser.id);
          return service
            .addGroupUser(group.id, userLookup, selectedRole)
            .then((user) => ({ user }))
            .catch((error: unknown) => ({ error }));
        })
      );
      const addedUsers = results
        .filter((result): result is { user: IPersonInfo } => 'user' in result)
        .map((result) => result.user);
      const failedCount = results.length - addedUsers.length;

      setSelectedUsers([]);
      setOperationMessage(
        addedUsers.length === 1
          ? `${addedUsers[0].displayName} was added to ${selectedRole}.`
          : `${addedUsers.length} users were added to ${selectedRole}.`
      );
      if (failedCount > 0) {
        setOperationError(`${failedCount} selected user${failedCount === 1 ? '' : 's'} could not be added.`);
      }
      await refreshAfterMutation();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setOperationError(error.message);
    } finally {
      setBusyAction(undefined);
    }
  }, [group, refreshAfterMutation, selectedRole, selectedUsers, service]);

  const handleRemoveUser = React.useCallback(async (person: IPersonInfo): Promise<void> => {
    if (!group || !selectedRole || isSamePerson(person, currentUser)) {
      return;
    }
    setBusyAction(`remove-${person.id}`);
    setOperationError(undefined);
    setOperationMessage(undefined);
    try {
      await service.removeGroupUser(group.id, person.id, selectedRole);
      setOperationMessage(`${person.displayName} was removed from ${selectedRole}.`);
      await refreshAfterMutation();
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setOperationError(error.message);
    } finally {
      setBusyAction(undefined);
    }
  }, [currentUser, group, refreshAfterMutation, selectedRole, service]);

  const peopleColumns = React.useMemo<IListViewColumn<IPersonInfo>[]>(() => {
    if (!canManageSelectedPeople) {
      return PERSON_COLUMNS;
    }

    return [
      ...PERSON_COLUMNS,
      {
        key: 'actions',
        header: 'Actions',
        dataType: 'custom',
        getValue: () => '',
        width: 96,
        renderCell: (person) => {
          const isCurrentUser = isSamePerson(person, currentUser);
          return (
            <Button
              appearance="subtle"
              icon={<DeleteRegular />}
              disabled={isCurrentUser || busyAction !== undefined}
              aria-label={isCurrentUser ? 'You cannot remove yourself' : `Remove ${person.displayName}`}
              onClick={() => { handleRemoveUser(person).catch(() => undefined); }}
            >
              Remove
            </Button>
          );
        }
      }
    ];
  }, [busyAction, canManageSelectedPeople, currentUser, handleRemoveUser]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      position="end"
      size="large"
      title={group ? `Group — ${group.displayName}` : 'Group'}
    >
      {load.error && (
        <MessageBar intent="error">
          <MessageBarBody>{load.error}</MessageBarBody>
        </MessageBar>
      )}

      {operationError && (
        <MessageBar intent="error">
          <MessageBarBody>{operationError}</MessageBarBody>
        </MessageBar>
      )}

      {operationMessage && (
        <MessageBar intent="success">
          <MessageBarBody>{operationMessage}</MessageBarBody>
        </MessageBar>
      )}

      {details && (
        <div className={styles.root}>
          <section className={styles.summary}>
            <div className={styles.summaryHeader}>
              <div>
                <Subtitle2 block>{details.displayName}</Subtitle2>
                <Caption1 className={styles.muted}>{details.mail ?? details.mailNickname ?? 'No email address'}</Caption1>
              </div>
              <Badge appearance="filled" color={details.isTeam ? 'brand' : 'subtle'}>{kind}</Badge>
            </div>

            {details.description && <Body1 className={styles.description}>{details.description}</Body1>}

            <dl className={styles.metaGrid}>
              <div>
                <dt>Visibility</dt>
                <dd>{details.visibility ?? '-'}</dd>
              </div>
              <div>
                <dt>Created</dt>
                <dd>{formatDate(details.createdDateTime) || '-'}</dd>
              </div>
              <div>
                <dt>Renewed</dt>
                <dd>{formatDate(details.renewedDateTime) || '-'}</dd>
              </div>
              <div>
                <dt>Site</dt>
                <dd>
                  {details.webUrl ? (
                    <ExternalLink href={details.webUrl} ariaLabel={`Open ${details.displayName} site in new tab`}>
                      Open site
                    </ExternalLink>
                  ) : '-'}
                </dd>
              </div>
            </dl>
          </section>

          <div className={styles.peopleTabs}>
            <TabList
              selectedValue={selectedPeopleTab}
              onTabSelect={onPeopleTabSelect}
              items={[
                { value: TAB_OWNERS, content: `Owners (${owners.length})` },
                { value: TAB_MEMBERS, content: `Members (${members.length})` },
                { value: TAB_VISITORS, content: `Visitors (${visitors.length})` }
              ]}
            />
          </div>

          {load.isLoading ? (
            <div className={styles.loadingState}>
              <Spinner appearance="primary" label="Loading group people..." labelPosition="after" />
            </div>
          ) : (
            <>
              {canManageSelectedPeople && (
                <div className={styles.manageBar}>
                  <PeoplePicker
                    context={context}
                    mode="multiple"
                    selectedItems={selectedUsers}
                    onSelectionChange={setSelectedUsers}
                    searchScope="users"
                    sourceStrategy="graph-only"
                    label={selectedPeopleTab === TAB_MEMBERS ? 'Add members' : 'Add owners'}
                    placeholder={addPlaceholder}
                    disabled={busyAction !== undefined}
                    className={styles.manageField}
                  />
                  <Button
                    appearance="primary"
                    icon={<AddRegular />}
                    disabled={selectedUsers.length === 0 || busyAction !== undefined}
                    onClick={() => { handleAddUser().catch(() => undefined); }}
                  >
                    Add
                  </Button>
                </div>
              )}

              <ListView<IPersonInfo>
                items={selectedPeople}
                columns={peopleColumns}
                getRowId={(item) => item.id}
                enableGlobalSearch
                rowHeight={ROW_HEIGHT}
                viewportHeight={getPeopleListHeight(selectedPeople.length)}
                styles={getCompactListStyles(selectedPeople.length)}
                strings={{ searchPlaceholder }}
              />
            </>
          )}
        </div>
      )}
    </Drawer>
  );
}

export default GroupDetailsDrawer;
