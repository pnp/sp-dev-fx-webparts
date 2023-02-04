/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import { useAtom } from 'jotai';
import { IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { IStackStyles } from 'office-ui-fabric-react/lib/components/Stack';
import { IIconStyles } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { ITextStyles } from 'office-ui-fabric-react/lib/Text';

import {
  IDocumentCardDetailsStyles,
  IDocumentCardStyles,
  IPersonaStyles,
  mergeStyleSets,
} from '@fluentui/react';
import { createStyles } from '@mantine/core';

import { globalState } from '../../jotai/atoms/birthdaysTimeline';
import { IGlobalState } from '../../models/birthdays';

export const useBirthdaysTimelineStyles = () => {
  const [appGlobalState] = useAtom(globalState);
  const { theme } = appGlobalState || ({} as IGlobalState);

  const bottomIconStyles: Partial<IIconStyles> = React.useMemo(() => {
    return {
      root: { fontSize: 14, color: theme?.semanticColors?.menuIcon },
    };
  }, [theme?.semanticColors?.menuIcon]);

  const buttonStyles: Partial<IButtonStyles> = React.useMemo(() => {
    return {
      root: {
        borderWidth: 0,
        borderStyle: "solid",
        borderColor: theme?.palette?.neutralQuaternaryAlt,
      },
    };
  }, [theme?.palette?.neutralQuaternaryAlt]);

  const renderItemStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        padding: 10,
        paddingBottom: 5,
        paddingTop: 5,
        ":hover": {
          backgroundColor: theme?.palette.neutralLighterAlt,
          boxShadow: theme?.effects.elevation4,
        },
      },
    };
  }, [theme?.effects.elevation4, theme?.palette.neutralLighterAlt]);

  const messageCongratulationStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        fontFamily: `"Dancing Script",cursive`,
        fontWeight: 600,
        display: "-webkit-box",
        "-webkit-line-clamp": "1",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textAlign: "start",
        lineHeight: 35,
        fontSize: 30,
        wordBreak: "break-word",
        color: theme?.palette?.themePrimary,
      },
    };
  }, [theme?.palette?.themePrimary]);

  const todayStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        fontWeight: 600,
        display: "-webkit-box",
        "-webkit-line-clamp": "1",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        color: theme?.palette?.themePrimary,

      },

    };
  }, [theme?.palette.themePrimary]);

  const documentCardDetailsStyles: IDocumentCardDetailsStyles = React.useMemo(() => {
    return {
      root: {
        padding: 15
      },
    };
  }, []);

  const documentCardStyles: IDocumentCardStyles = React.useMemo(() => {
    return {
      root: {
        // boxShadow: "0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%)",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        borderColor: theme?.palette?.neutralLighter,
        position: "relative",
        width: "100%",
        maxWidth: 400,
        maxheight: 600,
        height: "100%",
        minHeight: 400,
        borderRadius: 8,
        overflow: "hidden",
        paddingBottom: 20,

        ":hover:after": {
          borderRadius: 8,

          border: "unset",
        },
        ":hover": {
          borderColor: theme?.palette?.neutralTertiaryAlt,
        },
      },
    };
  }, [theme?.palette?.neutralTertiaryAlt, theme?.palette?.neutralLighter]);

const personalPrimaryText :ITextStyles =  React.useMemo(()=>{
  return {
    root:{
      fontWeight: 600,
      paddingRight: 10,
        display: "-webkit-box",
        "-webkit-line-clamp": "1",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textAlign: "start",
    }
  }
}, []);

const personalSecondaryText :ITextStyles =  React.useMemo(()=>{
  return {
    root:{
        paddingRight: 10,
        display: "-webkit-box",
        "-webkit-line-clamp": "1",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textAlign: "start",
    }
  }
}, [])

  const personaStyles: Partial<IPersonaStyles>  = React.useMemo(() => {
    return {
      primaryText: {
        fontWeight: 600,
        display: "-webkit-box",
        "-webkit-line-clamp": "1",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textAlign: "start",
      },
      secondaryText: {
        display: "-webkit-box",
        "-webkit-line-clamp": "1",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textAlign: "start",
      }
    };
  }, [theme?.palette?.themePrimary]);

  const controlStyles = React.useMemo(() => {
    return mergeStyleSets({
      usersContainer: mergeStyles({
        ":nth-child(1n)": {
          paddingTop: 7,
        },
      }),
      imageProfile: mergeStyles({
        padding: 1,
        backgroundColor: theme?.palette?.white,
        width: 40,
        height:40,
        border: "2px solid",
        borderColor: theme?.palette?.neutralLighter,
        borderRadius: "50%",
        objectFit: "cover",
      }),
      partyWhishtle: mergeStyles({
        padding: 5,
        backgroundColor: "transparent",
        width: 45,
        height: 45,
        fill: theme?.palette?.neutralSecondaryAlt,
      }),
      ballons: mergeStyles({
        objectFit: "cover",
        height: 500,
        opacity: 0.3,
      }),
      scrollableContainerStyles: mergeStyles({
        position: "relative",
        minHeight: 300,
        height: "100%",
        maxHeight: 500,
        overflowY: "auto",
        overflowX: "hidden",
        "::-webkit-scrollbar-thumb": {
          backgroundColor: theme?.palette.themeLight,
          display: "none",
        },
        "::-webkit-scrollbar": {
          height: 10,
          width: 7,
        },
        "scrollbar-color": theme?.semanticColors.bodyFrameBackground,
        "scrollbar-width": "thin",
      }),
      separator: mergeStyles({
        height: "1px",
        paddingLeft: 10,
        paddingright: 10,

        backgroundColor: theme?.palette?.neutralLighter,
        opacity: theme?.isInverted ? "0.2" : "1",
        width: "100%",
      }),
    });
  }, [theme?.isInverted, theme?.palette?.neutralLight]);

  const timelineStyles = React.useCallback(
    () =>
      createStyles((theme, _params, getRef) => ({
        itemTitle: {
          color: theme?.primaryColor,
        },
      })),
    []
  );

  return {
    controlStyles,
    documentCardStyles,
    documentCardDetailsStyles,
    timelineStyles,
    messageCongratulationStyles,
    todayStyles,
    renderItemStyles,
    bottomIconStyles,
    buttonStyles,
    personaStyles,
    personalPrimaryText,
    personalSecondaryText
  };
};
