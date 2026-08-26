import * as React from 'react';
import { ConfirmDeleteDialog } from '../../../../common/components';
import type { IGroupDeleteDialogProps } from './types';

export const GroupDeleteDialog: React.FC<IGroupDeleteDialogProps> = ({
  open,
  groups,
  canManageGroups,
  spService,
  onClose,
  onCompleted
}) => {
  const items = React.useMemo(
    () => groups.map((g) => ({ id: g.Id, title: g.Title })),
    [groups]
  );

  return (
    <ConfirmDeleteDialog
      open={open}
      items={items}
      canDelete={canManageGroups}
      entityName="group"
      accessDeniedMessage="You don't have the required permissions to delete groups. Contact your SharePoint administrator to request access."
      onDelete={(item) => spService.deleteGroup(item.id as number)}
      onClose={onClose}
      onCompleted={onCompleted}
    />
  );
};
