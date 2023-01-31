import * as React from 'react';

import { IUser } from '../../models';

export interface IRenderTimeLineItemsProps {
  usersGroupedByDate: { [key: string]: IUser[] };
  onSelect: (user: IUser) => void;
}

export const RenderTimeLineItems: React.FunctionComponent<IRenderTimeLineItemsProps> = (
  props: React.PropsWithChildren<IRenderTimeLineItemsProps>
) => {

  return (
    <>
      {}
    </>
  );
};
