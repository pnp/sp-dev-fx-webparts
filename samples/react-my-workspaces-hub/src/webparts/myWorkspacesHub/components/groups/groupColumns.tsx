import * as React from 'react';
import { Link } from '@fluentui/react-components';
import { IListViewColumn } from '../../../../components/ListView';
import { IGroupInfo } from '../../../../common/types';
import { formatDate } from '../../../../common/utils';

export function getGroupColumns(onOpenDetails: (group: IGroupInfo) => void): IListViewColumn<IGroupInfo>[] {
  return [
    {
      key: 'displayName',
      header: 'Name',
      dataType: 'custom',
      getValue: (item) => item.displayName,
      isSortable: true,
      isFilterable: true,
      isFlexibleWidth: true,
      width: 280,
      renderCell: (item) => (
        <Link as="button" onClick={() => onOpenDetails(item)}>
          {item.displayName}
        </Link>
      )
    },
    {
      key: 'mail',
      header: 'Email',
      dataType: 'text',
      getValue: (item) => item.mail,
      isSortable: true,
      format: { text: { emptyText: '-' } },
      isFlexibleWidth: true
    },
    {
      key: 'kind',
      header: 'Kind',
      dataType: 'text',
      getValue: (item) => {
        if (item.isTeam) {
          return 'Team';
        }
        if (item.groupTypes.includes('Unified')) {
          return 'Microsoft 365 group';
        }
        return item.securityEnabled ? 'Security group' : 'Group';
      },
      isSortable: true,
      isFilterable: true,
      width: 180
    },
    {
      key: 'visibility',
      header: 'Visibility',
      dataType: 'text',
      getValue: (item) => item.visibility,
      isSortable: true,
      isFilterable: true,
      format: { text: { emptyText: '-' } },
      width: 120
    },
    {
      key: 'createdDateTime',
      header: 'Created',
      dataType: 'text',
      getValue: (item) => formatDate(item.createdDateTime),
      isSortable: true,
      format: { text: { emptyText: '-' } },
      width: 130
    }
  ];
}
