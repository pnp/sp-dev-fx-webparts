import * as react from 'react';

import {
  FontSizes,
  FontWeights,
  IDocumentCardPreviewStyles,
  IDocumentCardStyles,
  IIconStyles,
  IStackStyles,
  ITextStyles,
} from 'office-ui-fabric-react';

import {
  GlobalStateContext,
  IGlobalStateContext,
} from '../../globalStateProvider';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useRoomChatStyles = ( ) => {
  const { GlobalState } = react.useContext<IGlobalStateContext>(GlobalStateContext);
  const { theme } = GlobalState;
  const previewIconStyles: Partial<IDocumentCardPreviewStyles> = react.useMemo(() => {
    return {
      previewIcon: { backgroundColor: theme?.palette.neutralLighter },

    };
  }, [theme]);

  const documentCardStyles: IDocumentCardStyles = react.useMemo(() => {
    return {
      root: {
        maxWidth: 320,
        maxHeight: 106,
        minHeight: 106,
        height: '100%',
        width: '100%',
      },
    };
  }, []);

  const stackContainerStyles: IStackStyles = react.useMemo(() => {
    return {
      root: {
        paddingTop: 10,
        paddingLeft:15,
        paddingRight: 15,
        paddingBottom: 10,
      },
    };
  }, []);

  const textStyles: ITextStyles = react.useMemo(() => {
    return {
      root: {
        color: theme?.palette?.themePrimary,
        fontWeight: FontWeights.semibold,
        display: "-webkit-box",
        WebkitLineClamp: 2,
        WebkitBoxOrient: "vertical",
        overflow: "hidden",
        textAlign: "start",

      },
    };
  }, [theme]);

  const iconStyles: IIconStyles = react.useMemo(() => {
    return {
      root: { fontSize: FontSizes.superLarge, color: theme?.palette?.themePrimary },
    };
  }, [theme]);

  return { previewIconStyles, documentCardStyles, stackContainerStyles, textStyles, iconStyles };
};
