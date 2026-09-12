import * as React from 'react';
import { MessageBar, MessageBarBody, Spinner } from '@fluentui/react-components';
import type { SelectTabData, SelectTabEvent, TabValue } from '@fluentui/react-components';
import { Drawer } from '../../../../../components/Drawer';
import { ListView } from '../../../../../components/ListView';
import { TabList } from '../../../../../components/TabList';
import { GraphSitesService } from '../../../../../common/services';
import { IMembership, IPersonInfo, IAsyncState } from '../../../../../common/types';
import styles from './MembershipDrawer.module.scss';
import { IMembershipDrawerProps } from './IMembershipDrawerProps';
import { PERSON_COLUMNS } from './membershipColumns';

const TAB_OWNERS = 'owners';
const TAB_MEMBERS = 'members';
const TAB_VISITORS = 'visitors';
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

const MembershipDrawer: React.FC<IMembershipDrawerProps> = ({
  site,
  open,
  context,
  sp,
  graph,
  onClose
}) => {
  const service = React.useMemo(
    () => new GraphSitesService({ sp, graph, context }),
    [sp, graph, context]
  );
  const [load, setLoad] = React.useState<IAsyncState<IMembership | undefined>>({
    data: undefined,
    isLoading: false
  });
  const [selectedPeopleTab, setSelectedPeopleTab] = React.useState<TabValue>(TAB_OWNERS);

  const onPeopleTabSelect = React.useCallback((_event: SelectTabEvent, data: SelectTabData): void => {
    setSelectedPeopleTab(data.value);
  }, []);

  React.useEffect(() => {
    if (!open || !site?.groupId) {
      return undefined;
    }
    let cancelled = false;
    setLoad({ data: undefined, isLoading: true });

    service
      .getMembership(site.groupId, site.url)
      .then((result) => {
        if (!cancelled) {
          setLoad({ data: result, isLoading: false });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setLoad({ data: undefined, isLoading: false, error: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, site, service]);

  const membership = load.data;
  const owners = membership?.owners ?? [];
  const members = membership?.members ?? [];
  const visitors = membership?.visitors ?? [];
  const selectedPeople = selectedPeopleTab === TAB_MEMBERS
    ? members
    : selectedPeopleTab === TAB_VISITORS
      ? visitors
      : owners;
  const searchPlaceholder = selectedPeopleTab === TAB_MEMBERS
    ? 'Search members'
    : selectedPeopleTab === TAB_VISITORS
      ? 'Search visitors'
      : 'Search owners';

  return (
    <Drawer
      open={open}
      onClose={onClose}
      position="end"
      size="large"
      title={site ? `People — ${site.title}` : 'People'}
    >
      {load.error && (
        <MessageBar intent="error">
          <MessageBarBody>{load.error}</MessageBarBody>
        </MessageBar>
      )}

      {load.isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '28px 0' }}>
          <Spinner appearance="primary" label="Loading people…" labelPosition="after" />
        </div>
      ) : (
        <div className={styles.peopleGroups}>
          <div className={styles.groupTitle}>
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

          <ListView<IPersonInfo>
            items={selectedPeople}
            columns={PERSON_COLUMNS}
            getRowId={(item) => item.id}
            enableGlobalSearch
            rowHeight={ROW_HEIGHT}
            viewportHeight={getPeopleListHeight(selectedPeople.length)}
            styles={getCompactListStyles(selectedPeople.length)}
            strings={{ searchPlaceholder }}
          />
        </div>
      )}
    </Drawer>
  );
};

export default MembershipDrawer;
