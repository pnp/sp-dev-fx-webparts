import * as React from 'react';
import { TableCellLayout } from '@fluentui/react-components';
import { IListViewColumn } from '../../../../../components/ListView';
import { ExternalLink } from '../../../../../components/ExternalLink';
import { ISiteContentItem } from '../../../../../common/types';
import { getItemThumbnail } from '../../../../../common/utils';
import { ISiteContentColumnActions } from './ISiteContentColumnActions';
import SiteContentRowMenu from './SiteContentRowMenu';

export function getSiteContentColumns(
  actions: ISiteContentColumnActions
): IListViewColumn<ISiteContentItem>[] {
  return [
    {
      key: 'name',
      header: 'Name',
      dataType: 'custom',
      getValue: (item) => item.name,
      isSortable: true,
      isFilterable: true,
      width: 260,
      isFlexibleWidth: true,
      renderCell: (item) => {
        const thumbnail = getItemThumbnail(item.thumbnail);
        return (
          <TableCellLayout
            media={
              thumbnail ? (
                <img src={thumbnail} alt="" width={20} height={20} />
              ) : undefined
            }
          >
            {item.target ? (
              <ExternalLink href={item.target} ariaLabel={`Open ${item.name} in new tab`}>
                {item.name}
              </ExternalLink>
            ) : item.name}
          </TableCellLayout>
        );
      }
    },
    {
      key: 'type',
      header: 'Type',
      dataType: 'text',
      getValue: (item) => item.type,
      isSortable: true,
      isFilterable: true,
      width: 160
    },
    {
      key: 'items',
      header: 'Items',
      dataType: 'text',
      getValue: (item) =>
        item.items !== undefined && item.items > -1 ? String(item.items) : '',
      isSortable: true,
      width: 90
    },
    {
      key: 'modified',
      header: 'Modified',
      dataType: 'text',
      getValue: (item) => item.modified,
      isSortable: true,
      width: 150
    },
    {
      key: 'description',
      header: 'Description',
      dataType: 'text',
      getValue: (item) => item.description,
      isFlexibleWidth: true,
      format: { text: { emptyText: '—' } }
    },
    {
      key: 'actions',
      header: '',
      dataType: 'custom',
      getValue: () => '',
      width: 48,
      renderCell: (item) => {
        const hasTarget = !!item.target;
        const hasSettings = item.baseTemplate > 0;

        return hasTarget || hasSettings ? (
          <SiteContentRowMenu
            item={item}
            siteUrl={actions.siteUrl}
            onDetails={() => actions.onDetails(item)}
            menuMountNode={actions.menuMountNode}
          />
        ) : undefined;
      }
    }
  ];
}
