import * as React from 'react';
import {
  FluentProvider,
  Title3,
  Text,
  Spinner,
  Button,
  MessageBar,
  MessageBarBody,
  MessageBarTitle,
  useId,
  IdPrefixProvider
} from '@fluentui/react-components';
import {
  ArrowClockwiseRegular,
  DocumentRegular,
  DataPieRegular,
  AppsListRegular,
  DismissRegular,
  PeopleRegular
} from '@fluentui/react-icons';
import styles from './MyWorkspacesHub.module.scss';
import type { IMyWorkspacesHubProps } from './IMyWorkspacesHubProps';
import { ListView } from '../../../components/ListView';
import { TabList } from '../../../components/TabList';
import { Toaster, useToastController, Toast, ToastTitle, ToastBody } from '../../../components/Toast';
import { ISiteInfo, SiteType, SITE_TYPE_LABELS } from '../../../common/types';
import { GraphSitesService } from '../../../common/services';
import { useMySites } from './hooks/useMySites';
import { useAnalytics } from './hooks/useAnalytics';
import { getMySitesColumns } from './columns';
import { Dashboard } from './dashboard';
import RecentFilesView from './recentFiles/RecentFilesView';
import GroupsView from './groups/GroupsView';
import { SiteContentDrawer } from './panels/SiteContentDrawer';
import { DetailsDrawer } from './panels/DetailsDrawer';
import { MembershipDrawer } from './panels/MembershipDrawer';

const TAB_DASHBOARD = 'dashboard';
const TAB_ALL = 'all';
const TAB_RECENT = 'recent';
const TAB_GROUPS = 'groups';
const DEFAULT_TITLE = 'My Workspaces Hub';

/** Which on-demand drawer is currently open (only one at a time). */
type DrawerKind = 'none' | 'content' | 'details' | 'membership';

interface IDrawerState {
  kind: DrawerKind;
  /** Site the drawer is showing (not used by the user-level recent files drawer). */
  site?: ISiteInfo;
}

function normalizeUrl(url: string): string {
  return url.replace(/\/$/, '').toLowerCase();
}

const MyWorkspacesHub: React.FC<IMyWorkspacesHubProps> = (props) => {
  const { fluentTheme, sp, graph, context, settings, title } = props;
  const { sites, isLoading, error, reload } = useMySites(sp, graph);

  const graphService = React.useMemo(
    () => new GraphSitesService({ sp, graph, context }),
    [sp, graph, context]
  );

  const toasterId = useId('my-workspaces-toaster');
  const { dispatchToast } = useToastController(toasterId);

  // Local portal host so menus and toasts stay inside the themed FluentProvider subtree.
  const [menuMountNode, setMenuMountNode] = React.useState<HTMLDivElement | null>(null);
  const [openMenuId, setOpenMenuId] = React.useState<string | undefined>(undefined);
  const [drawer, setDrawer] = React.useState<IDrawerState>({ kind: 'none' });
  const [followedUrls, setFollowedUrls] = React.useState<Set<string>>(new Set());
  const [selectedTab, setSelectedTab] = React.useState<string>(
    settings.showDashboard ? settings.defaultTab : TAB_ALL
  );
  const [typeFilter, setTypeFilter] = React.useState<SiteType | undefined>(undefined);

  const analytics = useAnalytics(sites);

  const onSelectType = React.useCallback((type: SiteType) => {
    setTypeFilter(type);
    setSelectedTab(TAB_ALL);
  }, []);

  const filteredSites = React.useMemo(
    () => (typeFilter === undefined ? sites : sites.filter((site) => site.type === typeFilter)),
    [sites, typeFilter]
  );

  React.useEffect(() => {
    let cancelled = false;
    graphService
      .getFollowedSiteUrls()
      .then((urls) => {
        if (!cancelled) {
          setFollowedUrls(urls);
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [graphService]);

  const openContent = React.useCallback((site: ISiteInfo) => {
    setDrawer({ kind: 'content', site });
  }, []);

  const openDetails = React.useCallback((site: ISiteInfo) => {
    setDrawer({ kind: 'details', site });
  }, []);

  const openMembership = React.useCallback((site: ISiteInfo) => {
    setDrawer({ kind: 'membership', site });
  }, []);

  const closeDrawer = React.useCallback(() => {
    // Keep `site` so the drawer body doesn't flash empty during the close animation.
    setDrawer((prev) => ({ ...prev, kind: 'none' }));
  }, []);

  const isFollowed = React.useCallback(
    (site: ISiteInfo) => followedUrls.has(normalizeUrl(site.url)),
    [followedUrls]
  );

  const onMenuOpenChange = React.useCallback((siteId: string, open: boolean) => {
    setOpenMenuId(open ? siteId : undefined);
  }, []);

  const toggleFollow = React.useCallback(
    (site: ISiteInfo) => {
      const key = normalizeUrl(site.url);
      const wasFollowed = followedUrls.has(key);

      setFollowedUrls((prev) => {
        const next = new Set(prev);
        if (wasFollowed) {
          next.delete(key);
        } else {
          next.add(key);
        }
        return next;
      });

      const action = wasFollowed
        ? graphService.unfollow(site.url)
        : graphService.follow(site.url);

      action
        .then(() => {
          dispatchToast(
            <Toast>
              <ToastTitle>{wasFollowed ? 'Unfollowed' : 'Following'}</ToastTitle>
              <ToastBody>{site.title}</ToastBody>
            </Toast>,
            { intent: 'success' }
          );
        })
        .catch((err: Error) => {
          setFollowedUrls((prev) => {
            const next = new Set(prev);
            if (wasFollowed) {
              next.add(key);
            } else {
              next.delete(key);
            }
            return next;
          });
          dispatchToast(
            <Toast>
              <ToastTitle>Couldn&apos;t update follow</ToastTitle>
              <ToastBody>{err.message}</ToastBody>
            </Toast>,
            { intent: 'error' }
          );
        });
    },
    [followedUrls, graphService, dispatchToast]
  );

  const columns = React.useMemo(
    () =>
      getMySitesColumns({
        onOpenContent: openContent,
        onDetails: openDetails,
        onMembership: openMembership,
        onToggleFollow: toggleFollow,
        isFollowed,
        followedStarColor: settings.followedStarColor,
        menuMountNode: menuMountNode ?? undefined,
        openMenuId,
        onMenuOpenChange,
        features: {
          siteContent: settings.enableSiteContent,
          follow: settings.enableFollow,
          membership: settings.enableMembership
        }
      }),
    [
      openContent,
      openDetails,
      openMembership,
      toggleFollow,
      isFollowed,
      settings.followedStarColor,
      menuMountNode,
      openMenuId,
      onMenuOpenChange,
      settings.enableSiteContent,
      settings.enableFollow,
      settings.enableMembership
    ]
  );

  return (
    <IdPrefixProvider value="MyWorkspacesHub">
      <FluentProvider theme={fluentTheme} className={styles.root}>
        <div ref={setMenuMountNode} style={{ position: 'relative', zIndex: 1000 }} />
        <div className={styles.shell}>
          <div className={styles.header}>
            <div className={styles.headerText}>
              <Title3>{title?.trim() || DEFAULT_TITLE}</Title3>
            </div>
            <div className={styles.headerActions}>
              <Button
                appearance="subtle"
                icon={<ArrowClockwiseRegular />}
                onClick={reload}
                disabled={isLoading}
              >
                Refresh
              </Button>
            </div>
          </div>

          <TabList
            selectedValue={selectedTab}
            onTabSelect={(_, data) => setSelectedTab(String(data.value))}
            items={[
              ...(settings.showDashboard
                ? [{ value: TAB_DASHBOARD, content: 'Dashboard', icon: <DataPieRegular /> }]
                : []),
              { value: TAB_ALL, content: 'All sites', icon: <AppsListRegular /> },
              ...(settings.enableRecentFiles
                ? [{ value: TAB_RECENT, content: 'Recent files', icon: <DocumentRegular /> }]
                : []),
              { value: TAB_GROUPS, content: 'Groups', icon: <PeopleRegular /> }
            ]}
          />

          {error && (
            <MessageBar intent="error">
              <MessageBarBody>
                <MessageBarTitle>Couldn&apos;t load your workspaces</MessageBarTitle>
                {error}
              </MessageBarBody>
            </MessageBar>
          )}

          {isLoading ? (
            <Spinner
              appearance="primary"
              label="Loading your workspaces…"
              labelPosition="after"
            />
          ) : selectedTab === TAB_DASHBOARD && settings.showDashboard ? (
            <Dashboard analytics={analytics} sp={sp} graph={graph} onSelectType={onSelectType} />
          ) : selectedTab === TAB_RECENT && settings.enableRecentFiles ? (
            <RecentFilesView context={context} sp={sp} graph={graph} />
          ) : selectedTab === TAB_GROUPS ? (
            <GroupsView context={context} sp={sp} graph={graph} />
          ) : (
            <>
              {typeFilter !== undefined && (
                <div className={styles.filterChip}>
                  <Text>Filtered by type: {SITE_TYPE_LABELS[typeFilter]}</Text>
                  <Button
                    size="small"
                    appearance="subtle"
                    icon={<DismissRegular />}
                    onClick={() => setTypeFilter(undefined)}
                  >
                    Clear
                  </Button>
                </div>
              )}
              <ListView<ISiteInfo>
                items={filteredSites}
                columns={columns}
                getRowId={(item) => item.id}
                enableGlobalSearch
                enableColumnChooser
                enableCommonFilter={settings.enableTypeFilter}
                enableBuiltInExport
                enableBuiltInExcelExport
                exportFilename="My Workspaces"
                strings={{ searchPlaceholder: 'Search workspaces' }}
              />
            </>
          )}
        </div>

        <SiteContentDrawer
          site={drawer.site}
          open={drawer.kind === 'content'}
          context={context}
          sp={sp}
          graph={graph}
          onClose={closeDrawer}
        />
        <DetailsDrawer
          site={drawer.site}
          open={drawer.kind === 'details'}
          context={context}
          sp={sp}
          graph={graph}
          onClose={closeDrawer}
        />
        <MembershipDrawer
          site={drawer.site}
          open={drawer.kind === 'membership'}
          context={context}
          sp={sp}
          graph={graph}
          onClose={closeDrawer}
        />
        <Toaster toasterId={toasterId} mountNode={menuMountNode ?? undefined} />
      </FluentProvider>
    </IdPrefixProvider>
  );
};

export default MyWorkspacesHub;
export const MySitesInfo = MyWorkspacesHub;
