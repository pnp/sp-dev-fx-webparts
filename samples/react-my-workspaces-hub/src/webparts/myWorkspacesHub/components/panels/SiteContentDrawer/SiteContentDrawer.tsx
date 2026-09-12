import * as React from 'react';
import {
  Spinner,
  MessageBar,
  MessageBarBody
} from '@fluentui/react-components';
import { Drawer } from '../../../../../components/Drawer';
import { Dialog } from '../../../../../components/Dialog';
import { ListView } from '../../../../../components/ListView';
import { SiteContentService } from '../../../../../common/services';
import { ISiteContentItem, IDriveDetails, IAsyncState } from '../../../../../common/types';
import { ISiteContentDrawerProps } from './ISiteContentDrawerProps';
import { getSiteContentColumns } from './siteContentColumns';
import DriveDetailRow from './DriveDetailRow';

const SiteContentDrawer: React.FC<ISiteContentDrawerProps> = ({
  site,
  open,
  context,
  sp,
  graph,
  onClose
}) => {
  const service = React.useMemo(
    () => new SiteContentService({ sp, graph, context }),
    [sp, graph, context]
  );
  const [load, setLoad] = React.useState<IAsyncState<ISiteContentItem[]>>({
    data: [],
    isLoading: false
  });
  const [details, setDetails] = React.useState<{ open: boolean; drive?: IDriveDetails }>({
    open: false
  });
  const [menuMountNode, setMenuMountNode] = React.useState<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open || !site) {
      return undefined;
    }
    let cancelled = false;
    setLoad({ data: [], isLoading: true });

    service
      .getSiteContent(site.url)
      .then((result) => {
        if (!cancelled) {
          setLoad({ data: result, isLoading: false });
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setLoad({ data: [], isLoading: false, error: err.message });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [open, site, service]);

  const handleDetails = React.useCallback(
    (item: ISiteContentItem) => {
      if (!site) {
        return;
      }
      service
        .getDriveDetails(site.url, item.name)
        .then((drive) => {
          setDetails({ open: true, drive });
        })
        .catch((err: Error) => {
          setDetails({ open: true, drive: { description: err.message } });
        });
    },
    [service, site]
  );

  const columns = React.useMemo(
    () =>
      getSiteContentColumns({
        siteUrl: site ? site.url : '',
        onDetails: handleDetails,
        menuMountNode: menuMountNode ?? undefined
      }),
    [site, handleDetails, menuMountNode]
  );

  return (
    <Drawer
      open={open}
      onClose={onClose}
      position="end"
      size="large"
      title={site ? `Lists & libraries — ${site.title}` : 'Lists & libraries'}
    >
      <div ref={setMenuMountNode} />
      {load.error && (
        <MessageBar intent="error">
          <MessageBarBody>{load.error}</MessageBarBody>
        </MessageBar>
      )}

      {load.isLoading ? (
        <Spinner appearance="primary" label="Loading site content…" labelPosition="after" />
      ) : (
        <ListView<ISiteContentItem>
          items={load.data}
          columns={columns}
          getRowId={(item) => item.id}
          enableGlobalSearch
          strings={{ searchPlaceholder: 'Search content' }}
        />
      )}

      <Dialog
        open={details.open}
        onOpenChange={(_, data) => {
          if (!data.open) {
            setDetails((prev) => ({ ...prev, open: false }));
          }
        }}
        modalType="non-modal"
        title="Details"
        body={
          <div>
            <DriveDetailRow label="Description" value={details.drive?.description} />
            <DriveDetailRow label="Drive Id" value={details.drive?.id} />
          </div>
        }
      />
    </Drawer>
  );
};

export default SiteContentDrawer;
