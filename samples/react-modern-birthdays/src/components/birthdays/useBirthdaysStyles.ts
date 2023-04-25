/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';

import { useAtom } from 'jotai';

import {
  IButtonStyles,
  IDocumentCardDetailsStyles,
  IDocumentCardStyles,
  IIconStyles,
  IImageStyles,
  IStackStyles,
  ITextStyles,
  mergeStyles,
  mergeStyleSets,
} from '@fluentui/react';

import { globalState } from '../../jotai/atoms/birthdays';
import { IGlobalState } from '../../models/birthdays';

export const useBirthdaysStyles = () => {
  const [appGlobalState] = useAtom(globalState);
  const {
    upcomingBirthdaysBackgroundImage,
    todayBirthdaysBackgroundImage,
    theme,
    todayBirthdaysMessageColor,
    upcomingBirthdaysMessageColor,
    gridHeight,
  } = appGlobalState || ({} as IGlobalState);

  const containerSocialInfoStyles: IStackStyles = React.useMemo(() => {
    return {
      root: { position: "absolute", bottom: 15, width: "100%" },
    };
  }, []);

  const bottomIconStyles: Partial<IIconStyles> = React.useMemo(() => {
    return {
      root: { fontSize: 12, color: theme?.semanticColors?.menuIcon },
    };
  }, [theme?.semanticColors?.menuIcon]);

  const buttonStyles: Partial<IButtonStyles> = React.useMemo(() => {
    return {
      root: {
        borderWidth: 1.5,
        borderStyle: "solid",
        borderColor: theme?.palette?.neutralQuaternaryAlt,
        borderRadius: "50%",
        padding: 5,
        width: 25,
        height: 25,
      },
    };
  }, [theme?.palette?.neutralQuaternaryAlt]);

  const nameStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        paddingTop: 7,
        color: theme?.semanticColors?.bodyText,
        fontWeight: 600,
      },
    };
  }, [theme?.semanticColors?.bodyText]);
  const navigationTextStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        color: theme?.palette.themePrimary,
        fontWeight: 500,
      },
    };
  }, [theme?.semanticColors?.bodyText]);

  const jobTitleStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        color: theme?.semanticColors?.bodySubtext,
      },
    };
  }, [theme?.semanticColors?.bodySubtext]);

  const birthdayStyles = React.useCallback(
    (isSameDayAndMonth: boolean): ITextStyles => {
      return {
        root: {
          color: isSameDayAndMonth ? theme?.palette?.themePrimary : theme?.semanticColors?.bodySubtext,
          fontWeight: 600,
        },
      };
    },
    [theme?.palette?.themePrimary, theme?.semanticColors?.bodySubtext]
  );

  const containerUserImageStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        position: "absolute",
        top: 95,
        width: "100%",
      },
    };
  }, []);

  const userPhotoStyles: Partial<IImageStyles> = React.useMemo(() => {
    return {
      root: {
        margingBottom: 5,
      },
      image: {
        padding: 5,
        backgroundColor: theme?.palette?.white,
        width: 100,
        height: 100,
        border: "5px solid",
        borderColor: theme?.palette?.neutralLighter,
        borderRadius: "50%",
      },
    };
  }, [theme?.palette?.neutralLighter, theme?.palette?.white]);

  const messageContainerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        width: "100%",
        position: "absolute",
        top: 20,
        paddingLeft: 10,
        paddingRight: 10,
      },
    };
  }, []);

  const todayMessageTextStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        fontFamily: `"Dancing Script",cursive`,
        fontWeight: 600,
        display: "-webkit-box",
        "-webkit-line-clamp": "2",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textAlign: "center",
        lineHeight: 30,
        fontSize: 30,
        color: todayBirthdaysMessageColor,
        height: 65,
      },
    };
  }, [todayBirthdaysMessageColor]);

  const noBirthdayMessageTextStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        fontFamily: `"Dancing Script",cursive`,
        fontWeight: 600,
        display: "-webkit-box",
        "-webkit-line-clamp": "2",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textAlign: "center",
        lineHeight: 30,
        fontSize: 30,
        color: theme?.semanticColors?.bodySubtext,
        height: 65,
      },
    };
  }, [theme?.semanticColors?.bodySubtext]);

  const upComingMessageTextStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        fontFamily: `"Dancing Script",cursive`,
        fontWeight: 600,
        display: "-webkit-box",
        "-webkit-line-clamp": "2",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textAlign: "center",
        lineHeight: 30,
        fontSize: 30,
        color: upcomingBirthdaysMessageColor,
        height: 65,
      },
    };
  }, [upcomingBirthdaysMessageColor]);

  const documentCardDetailsStyles: IDocumentCardDetailsStyles = React.useMemo(() => {
    return {
      root: {
        padding: "10px 16px",
      },
    };
  }, []);

  const stackBottomStyles: Partial<IStackStyles> = React.useMemo(() => {
    return {
      root: {
        padding: "0px 16px",
        color: theme?.semanticColors?.bodySubtext,
        position: "absolute",
        bottom: 10,
        width: "100%",
      },
    };
  }, [theme?.semanticColors?.bodySubtext]);

  const documentCardStyles: IDocumentCardStyles = React.useMemo(() => {
    return {
      root: {
        // boxShadow: "0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%)",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        borderColor: undefined,
        position: "relative",
        maxWidth: "100%",
        minWidth: 256,
        height: 330,
        borderRadius: 8,
        overflow: "hidden",

        ":hover:after": {
          borderRadius: 8,

          border: "unset",
        },
        ":hover": {
          borderColor: theme?.palette?.neutralTertiaryAlt,
        },
      },
    };
  }, [theme?.palette?.neutralTertiaryAlt]);

  const noBirthdaysDocumentCardStyles: IDocumentCardStyles = React.useMemo(() => {
    return {
      root: {
        // boxShadow: "0 1.6px 3.6px 0 rgb(0 0 0 / 13%), 0 0.3px 0.9px 0 rgb(0 0 0 / 11%)",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        borderColor: undefined,
        position: "relative",
        maxWidth: "100%",
        minWidth: 256,
        height: 350,
        borderRadius: 8,
        overflow: "hidden",
        backgroundColor: theme?.palette?.neutralLighterAlt,
        opacity: 0.7,
        ":hover:after": {
          borderRadius: 8,

          border: "unset",
        },
        ":hover": {
          borderColor: theme?.palette?.neutralTertiaryAlt,
        },
      },
    };
  }, [theme?.palette?.neutralTertiaryAlt]);

  const iconCancelButtonStyles: Partial<IButtonStyles> = React.useMemo(() => {
    return {
      root: {
        color: theme?.palette?.neutralPrimary,
        marginLeft: "auto",
        marginTop: "4px",
        marginRight: "2px",
      },
      rootHovered: {
        color: theme?.palette?.neutralDark,
      },
    };
  }, [theme?.palette?.neutralDark, theme?.palette?.neutralPrimary]);

  const controlStyles = React.useMemo(() => {
    return mergeStyleSets({
      scrollableContainerStyles: {
        position: "relative",
        height: gridHeight,
        overflowY: "auto",
        overflowX: "hidden",
        "::-webkit-scrollbar-thumb": {
          backgroundColor: theme?.palette.themeLight,
        },
        "::-webkit-scrollbar": {
          height: 10,
          width: 7,
        },
        "scrollbar-color": theme?.semanticColors.bodyFrameBackground,
        "scrollbar-width": "thin",
      },
      imageProfile: {
        padding: 5,
        backgroundColor: theme?.palette?.white,
        width: 85,
        height: 85,
        border: "5px solid",
        borderColor: theme?.palette?.neutralLighter,
        borderRadius: "50%",
        objectFit: "cover",
      },
      partyWhishtle: {
        padding: 5,
        backgroundColor: "transparent",
        width: 45,
        height: 45,
        fill: theme?.palette?.neutralSecondaryAlt,
      },
      upcomingBirthdaysImageStyles: mergeStyles({
        height: 150,
        backgroundSize: "cover",
        backgroundImage: upcomingBirthdaysBackgroundImage ? ` url(${upcomingBirthdaysBackgroundImage})` : "",
      }),

      todayBirthdaysImageStyles: mergeStyles({
        height: 150,
        backgroundSize: "cover",
        backgroundImage: todayBirthdaysBackgroundImage ? ` url(${todayBirthdaysBackgroundImage})` : "",
      }),

      ContainerGrid: mergeStyles({
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 256px), 1fr))",
        columnGap: "10px",
        rowGap: "10px",
        overflow: "auto",
        paddingRight: 10,
        paddingleft: 10,
        "::-webkit-scrollbar-thumb": {
          display: "none",
        },
        "::-webkit-scrollbar": {
          height: 10,
          width: 7,
        },
        "scrollbar-width": "thin",
      }),
      separator: mergeStyles({
        height: "1px",
        backgroundColor: theme?.palette?.neutralLight,
        opacity: theme?.isInverted ? "0.2" : "1",
        width: "100%",
      }),
    });
  }, [
    todayBirthdaysBackgroundImage,
    upcomingBirthdaysBackgroundImage,
    theme?.isInverted,
    theme?.palette?.neutralLight,
    gridHeight,
  ]);

  return {
    messageContainerStyles,
    userPhotoStyles,
    todayMessageTextStyles,
    upComingMessageTextStyles,
    noBirthdayMessageTextStyles,
    controlStyles,
    documentCardStyles,
    documentCardDetailsStyles,
    containerUserImageStyles,
    stackBottomStyles,
    nameStyles,
    jobTitleStyles,
    birthdayStyles,
    bottomIconStyles,
    buttonStyles,
    containerSocialInfoStyles,
    iconCancelButtonStyles,
    noBirthdaysDocumentCardStyles,
    navigationTextStyles,
  };
};
