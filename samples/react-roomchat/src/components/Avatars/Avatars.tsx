/* eslint-disable react/jsx-no-bind */
import * as React from 'react';

import { Stack } from 'office-ui-fabric-react';

import {
  GlobalStateContext,
  IGlobalStateContext,
} from '../../globalStateProvider';
import { IUserIdentity } from '../../models/IUserIdentity';
import {
  BOY,
  CAT,
  FOX,
  GIRL,
  KOALA,
  MAN,
  MONKEY,
  MOUSE,
  OCTOPUS,
  WOMAN,
} from '../../utils/avatars';
import { useAvatarsStyles } from './useAvatarsStyles';

export interface IAvatarsProps {
  onSelect: (avatar: string) => void;
}


export const Avatars: React.FunctionComponent<IAvatarsProps> = (props: React.PropsWithChildren<IAvatarsProps>) => {
  const avatars: string[] = [CAT, MOUSE, FOX, KOALA, OCTOPUS, MONKEY, GIRL, BOY, MAN, WOMAN];
  const { GlobalState } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const { useIdentity  } = GlobalState ;
  const { avatar } = useIdentity || {} as IUserIdentity;
  const { onSelect } = props;
  const { avatarControlStyles, avatarContainerStyle } = useAvatarsStyles();
  return (
    <>
      <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 5 }} wrap role="list">
        {avatars.map((avatarElement, index) => {
          return (
            <div
              role="listitem"
              id={avatarElement}
              key={index}
              data-is-focusable={true}
              className={avatarContainerStyle(avatarElement, avatar)}
              onClick={() => onSelect(avatarElement)}
            >
              <div data-is-focusable={true} className={avatarControlStyles.smallAvatarStyle} key={index}>
                {avatarElement}
              </div>
            </div>
          );
        })}
      </Stack>
    </>
  );
};
