import * as React from 'react';

import {
  IProcessedStyleSet,
  mergeStyles,
  mergeStyleSets,
} from '@uifabric/merge-styles';

import {
  GlobalStateContext,
  IGlobalStateContext,
} from '../../globalStateProvider';
import { getBackgroundColor } from '../../utils/avatars';

interface IAvatarsStyles {
  avatarControlStyles: IProcessedStyleSet<{
    smallAvatarStyle: string;
  }>;
  avatarContainerStyle: (avatar: string, selectedAvatar: string) => string;
}

export const useAvatarsStyles = (): IAvatarsStyles => {
  const { GlobalState } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const { theme } = GlobalState;

  const avatarControlStyles: IProcessedStyleSet<{
    smallAvatarStyle: string;
  }> = React.useMemo(() => mergeStyleSets({
    smallAvatarStyle: mergeStyles({
      height: "1.75rem",
      width: "2rem",
      color: "#444444",
      fontWeight: 400,
      fontSize: "1.5rem",
      letterSpacing: "0",
      lineHeight: "1.75rem",
      textAlign: "center",
      cursor: "pointer",
    }),
  }), []);

  const avatarContainerStyle: (avatar: string, selectedAvatar: string) => string = React.useCallback(
    (avatar: string, selectedAvatar: string): string =>
      mergeStyles({
        padding: 3,
        borderRadius: "50%",
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        outline: "none",
        backgroundColor: `${getBackgroundColor(avatar).backgroundColor}`,
        border: `2px solid ${
          avatar === selectedAvatar ? theme?.palette?.neutralSecondaryAlt : theme?.palette?.neutralQuaternaryAlt
        }`,
        "&:hover": {
          border: `2px solid ${ avatar === selectedAvatar ? theme?.palette?.neutralSecondaryAlt : theme?.palette?.neutralQuaternary}`,
          borderRadius: "50%",
        },
      }),
    [theme]
  );

  return { avatarControlStyles, avatarContainerStyle };
};
