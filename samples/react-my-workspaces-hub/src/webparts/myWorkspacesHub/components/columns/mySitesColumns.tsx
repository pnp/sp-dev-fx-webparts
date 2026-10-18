import * as React from 'react';
import { IListViewColumn } from '../../../../components/ListView';
import { ISiteInfo } from '../../../../common/types';
import { IMySitesRowActions } from './IMySitesRowActions';
import MySitesRowMenu from './MySitesRowMenu';
import SiteTitleCell from './SiteTitleCell';
import FollowStarCell from './FollowStarCell';

/**
 * Default-visible columns for the My Sites list: an inline follow toggle, Title,
 * Description, Type and a per-row actions menu. Built as a factory so row
 * actions can close over the container's drawer handlers.
 */
export function getMySitesColumns(actions: IMySitesRowActions): IListViewColumn<ISiteInfo>[] {
  const columns: IListViewColumn<ISiteInfo>[] = [];

  if (actions.features.follow) {
    columns.push({
      key: 'followed',
      header: 'Followed',
      renderHeader: () => undefined,
      dataType: 'boolean',
      getValue: (item) => actions.isFollowed(item),
      format: { boolean: { trueLabel: 'Followed', falseLabel: 'Not followed' } },
      isSortable: true,
      isFilterable: true,
      width: 48,
      minWidth: 48,
      maxWidth: 48,
      isResizable: false,
      renderCell: (item) => (
        <FollowStarCell
          site={item}
          followed={actions.isFollowed(item)}
          color={actions.followedStarColor}
          onToggle={actions.onToggleFollow}
        />
      )
    });
  }

  columns.push(
    {
      key: 'title',
      header: 'Title',
      dataType: 'text',
      getValue: (item) => item.title,
      isSortable: true,
      isFilterable: true,
      width: 360,
      minWidth: 220,
      isFlexibleWidth: true,
      renderCell: (item) => <SiteTitleCell site={item} />
    },
    {
      key: 'description',
      header: 'Description',
      dataType: 'text',
      getValue: (item) => item.description,
      isSortable: true,
      format: { text: { emptyText: '' } },
      isFlexibleWidth: true
    },
    {
      key: 'type',
      header: 'Type',
      dataType: 'text',
      getValue: (item) => item.typeLabel,
      isSortable: true,
      isFilterable: true,
      width: 190
    },
    {
      key: 'actions',
      header: 'Actions',
      dataType: 'custom',
      getValue: () => '',
      width: 48,
      renderCell: (item) => <MySitesRowMenu site={item} actions={actions} />
    }
  );

  return columns;
}
