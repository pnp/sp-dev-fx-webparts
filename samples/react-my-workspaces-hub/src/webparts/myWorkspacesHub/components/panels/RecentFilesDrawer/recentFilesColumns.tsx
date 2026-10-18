import * as React from 'react';
import { IListViewColumn } from '../../../../../components/ListView';
import { ExternalLink } from '../../../../../components/ExternalLink';
import { IRecentFile } from '../../../../../common/types';
import { formatDate } from '../../../../../common/utils';

/** Columns for the user's recent-files list. */
export const RECENT_FILE_COLUMNS: IListViewColumn<IRecentFile>[] = [
  {
    key: 'name',
    header: 'Name',
    dataType: 'custom',
    getValue: (item) => item.name,
    isSortable: true,
    isFilterable: true,
    width: 300,
    isFlexibleWidth: true,
    renderCell: (item) =>
      item.webUrl ? (
        <ExternalLink href={item.webUrl} ariaLabel={`Open ${item.name} in new tab`}>
          {item.name}
        </ExternalLink>
      ) : (
        item.name
      )
  },
  {
    key: 'containerName',
    header: 'Location',
    dataType: 'text',
    getValue: (item) => item.containerName,
    isSortable: true,
    isFilterable: true,
    format: { text: { emptyText: '—' } },
    isFlexibleWidth: true
  },
  {
    key: 'type',
    header: 'Type',
    dataType: 'text',
    getValue: (item) => item.type,
    isSortable: true,
    format: { text: { emptyText: '—' } },
    width: 110
  },
  {
    key: 'lastUsed',
    header: 'Last used',
    dataType: 'text',
    getValue: (item) => formatDate(item.lastUsed),
    isSortable: true,
    format: { text: { emptyText: '—' } },
    width: 130
  }
];
