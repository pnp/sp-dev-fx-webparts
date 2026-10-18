import * as React from 'react';
import { Spinner, MessageBar, MessageBarBody, Divider, Link } from '@fluentui/react-components';
import { Drawer } from '../../../../../components/Drawer';
import { GraphSitesService } from '../../../../../common/services';
import { ISiteDetails, IAsyncState } from '../../../../../common/types';
import { formatBytes, formatDate } from '../../../../../common/utils';
import styles from './DetailsDrawer.module.scss';
import { IDetailsDrawerProps } from './IDetailsDrawerProps';
import DetailRow from './DetailRow';

const DetailsDrawer: React.FC<IDetailsDrawerProps> = ({
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
  const [load, setLoad] = React.useState<IAsyncState<ISiteDetails | undefined>>({
    data: undefined,
    isLoading: false
  });

  React.useEffect(() => {
    if (!open || !site) {
      return undefined;
    }
    let cancelled = false;
    setLoad({ data: undefined, isLoading: true });

    service
      .getSiteDetails(site)
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

  const details = load.data;
  const storageUsed = formatBytes(details?.storageUsed);
  const storageTotal = formatBytes(details?.storageTotal);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      position="end"
      size="medium"
      title={site ? `Details — ${site.title}` : 'Details'}
    >
      {load.error && (
        <MessageBar intent="error">
          <MessageBarBody>{load.error}</MessageBarBody>
        </MessageBar>
      )}

      {load.isLoading ? (
        <Spinner appearance="primary" label="Loading details…" labelPosition="after" />
      ) : (
        <div>
          <DetailRow label="Type" value={site?.typeLabel ?? '—'} />
          <DetailRow
            label="URL"
            value={
              site ? (
                <Link href={site.url} target="_blank" rel="noopener noreferrer" title={site.url}>
                  {site.title}
                </Link>
              ) : (
                '—'
              )
            }
          />
          <Divider className={styles.divider} />
          <DetailRow label="Description" value={details?.description || site?.description || '—'} />
          <DetailRow label="Created" value={formatDate(details?.createdDateTime, '—')} />
          <DetailRow label="Last modified" value={formatDate(details?.lastModifiedDateTime, '—')} />
          <Divider className={styles.divider} />
          <DetailRow label="Storage used" value={storageUsed} />
          <DetailRow label="Storage quota" value={storageTotal} />
        </div>
      )}
    </Drawer>
  );
};

export default DetailsDrawer;
