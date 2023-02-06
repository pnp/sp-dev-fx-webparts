import * as React from 'react';

import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { IUser } from '../../models/IUser';
import { RenderPersona } from './RenderPersona';
import { useBirthdaysTimelineStyles } from './useBirthdaysTimelineStyles';

export interface IRenderItemProps {
  user: IUser;
  onSelect: (user: IUser) => void;
  isBirthdayToday?: boolean;
}

export const RenderItem: React.FunctionComponent<IRenderItemProps> = (
  props: React.PropsWithChildren<IRenderItemProps>
) => {
  const { user, onSelect } = props;

  const { renderItemStyles } = useBirthdaysTimelineStyles();

  const { name } = user;

  const onMouseEnter = React.useCallback(() => {
    if (onSelect) onSelect(user);
  }, [user]);
  const onMouseLeave = React.useCallback(() => {
    if (onSelect) onSelect(undefined);
  }, []);

  return (
    <>
      <Stack
        styles={renderItemStyles}
        tokens={{ childrenGap: 10 }}
        horizontalAlign="start"
        verticalAlign="center"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        title={name}
      >
        <RenderPersona user={user} />
      </Stack>
    </>
  );
};
