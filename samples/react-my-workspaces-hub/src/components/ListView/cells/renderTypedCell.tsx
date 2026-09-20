import * as React from 'react';
import type { IListViewCellRenderContext, IListViewColumn } from '../interfaces/IListView';
import { toUserArray } from '../utils/formatters';
import { UserCell } from './UserCell';
import { BooleanCell } from './BooleanCell';

/**
 * Renders the default content for a typed column cell. Falls back to the formatted display
 * value for `text`, `number`, `currency`, `date`, and `custom` types.
 */
export const renderTypedCell = <TItem,>(
  item: TItem,
  column: IListViewColumn<TItem>,
  ctx: IListViewCellRenderContext<TItem>
): React.ReactNode => {
  const dataType = column.dataType ?? 'text';
  const raw = column.getValue(item);

  if (dataType === 'user') {
    const users = toUserArray(raw);
    return (
      <UserCell
        users={users}
        showAvatar={column.format?.user?.showAvatar}
        showSecondary={column.format?.user?.showSecondary}
        showHoverCard={column.format?.user?.showHoverCard}
        avatarSize={column.format?.user?.avatarSize}
      />
    );
  }

  if (dataType === 'boolean') {
    return <BooleanCell value={Boolean(raw)} format={column.format?.boolean} />;
  }

  return <>{ctx.formattedValue}</>;
};
