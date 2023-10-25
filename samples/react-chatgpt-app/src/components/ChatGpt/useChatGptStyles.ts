/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import { useAtom } from 'jotai';
import { DefaultEffects } from 'office-ui-fabric-react/lib/Styling';
import { ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';

import { IButtonStyles } from '@fluentui/react/lib/Button';
import { IStackStyles } from '@fluentui/react/lib/Stack';
import {
  mergeStyles,
  mergeStyleSets,
} from '@fluentui/react/lib/Styling';
import { ITextStyles } from '@fluentui/react/lib/Text';

import { globalState } from '../../atoms';
import { IGlobalState } from '../../models/IGlobalState';

export const useChatGptStyles = () => {
  const [appGlobalState] = useAtom(globalState);
  const { theme, hasTeamsContext, chatId } = appGlobalState || ({} as IGlobalState);

  const isInChat = React.useMemo(() => {
    return hasTeamsContext && chatId;
  }, [chatId, hasTeamsContext]);

  const nameStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        color: theme?.semanticColors?.bodyText,
        fontWeight: 700,
      },
    };
  }, [theme]);

  const containerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        borderRadius: isInChat ? "unset" : 8,
        borderWidth: isInChat ? "unset" : 1,
        borderStyle: isInChat ? "unset" : "solid",
        borderColor: isInChat ? "unset" : theme?.palette?.neutralLighter,
        borderTopStyle: isInChat ? "solid" : "none",
        borderTopWidth: isInChat ? 1 : "unset",
        borderTopColor: isInChat ? theme?.palette.neutralQuaternaryAlt : "unset",
        marginTop: isInChat ? 20 : 0,
        maxWidth: 700,
        width: "100%",
        height: 600,
        overflowY: "auto",
        overflowX: "hidden",
       /*  backgroundColor: theme?.palette?.neutralLighterAlt, */
        boxShadow: isInChat ? "unset" : DefaultEffects.elevation4,
        wordBreak: "break-word",
        paddingBottom: 20,
      },
    };
  }, [theme]);

  const scrollableContainerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        padding: 10,
        height: 500,
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
    };
  }, [theme]);

  const answerContainerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        width: "100%",
        ":nth-child(1n)": {
          marginTop: 20,
        },
      },
    };
  }, [theme]);



  const questionStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        marginTop: 20,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        width: "fit-content",
        boxShadow: DefaultEffects.elevation4,
        backgroundColor: theme?.palette?.neutralLight,
        maxWidth:470,
      },
    };
  }, [theme]);

  const answerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        boxShadow: DefaultEffects.elevation4,
        width: "fit-content",
       /*  backgroundColor: theme?.semanticColors?.bodyBackground, */
       backgroundColor: theme?.palette?.neutralLighterAlt,
      },
    };
  }, [theme]);

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
  }, [theme]);

  const imageOAtyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        backgroundColor: theme?.palette?.themePrimary,
        color: theme?.palette?.white,
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: 700,
        fontSize: 12,
        lineHeight: 36,
      },
    };
  }, [theme]);

  const headerContainertyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        backgroundColor: theme?.palette.neutralLighterAlt,
      },
    };
  }, [theme]);

  const buttonIconStyles: IButtonStyles = React.useMemo(() => {
    return {
      root: { transform: "rotate(-30deg)" },
    };
  }, [theme]);

  const messageChatInfoStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        color: theme?.semanticColors?.bodySubtext,
        fontWeight: 700,
      },
    };
  }, [theme]);

  const messageChatInfoContainerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: { height: "100%" },
    };
  }, [theme]);

  const textFieldStyles: Partial<ITextFieldStyles> = React.useMemo(() => {
    return {
      root: { marginBottom: 7, width: "100%", minHeight: 32 },
      field: {
        padding: 10,
        minHeight: 32,
        height: 40,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme?.palette.neutralQuaternaryAlt,
        borxerRadius: 5,
        ":focus": {
          borderBottomStyle: "solid",
          borderBottomWidth: 2,
          borderBottomColor: theme?.palette.themePrimary,
        },
      },
      fieldGroup: {
        minHeight: 32,
        ":after": {
          minHeight: 32,
          content: "",
          borderBottomStyle: "solid",
          borderBottomWidth: 2,
          borderBottomColor: theme?.palette.themePrimary,
        },
        borderWidth: 0,
      },
      wrapper: {
        minHeight: 32,
        ":focus": {
          borderBottomStyle: "solid",
          borderBottomWidth: 2,
          borderBottomColor: theme?.palette.themePrimary,
        },
      },
      suffix: {
        backgroundColor: theme?.palette.neutralLight,
      },
    };
  }, [theme]);

  const sendButtonStyles: IButtonStyles = React.useMemo(() => {
    return {
      root: {
        backgroundColor: theme?.palette.themePrimary,
        color: theme?.palette.white,
        width: 50,
        minWidth: 50,
        height: 32,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme?.palette.neutralQuaternaryAlt,
      },
      rootHovered: {
        backgroundColor: theme?.palette.themeDark,
        color: theme?.palette.white,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: theme?.palette.themePrimary,
      },
      rootPressed: {
        backgroundColor: theme?.palette.themeDark,
        color: theme?.palette.white,
      },
    };
  }, [theme]);


  const messageErrorContainerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
       width:'100%',
      },
    };
  }, [theme]);

  const controlStyles = React.useMemo(() => {
    return mergeStyleSets({
      imageOPAILogo: mergeStyles({
        borderRadius: "50%",
        backgroundColor: theme?.palette?.themePrimary,
        color: theme?.palette?.white,
        textAlign: "center",
        verticalAlign: "middle",
        fontWeight: 700,
        fontSize: 12,
        lineHeight: 36,
      }),
      scrollableContainerStyles: mergeStyles({
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
        height: 500,
        overflowY: "auto",
        overflowX: "hidden",
        "::-webkit-scrollbar-thumb": {
          backgroundColor: theme?.palette.themeLight,
          width: 5,
        },
        "::-webkit-scrollbar": {
          height: 10,
          width: 5,
        },
        "scrollbar-color": theme?.semanticColors.bodyFrameBackground,
        "scrollbar-width": "thin",
      }),
      answerStyles: {
        whiteSpace: "pre-wrap",
        overflowWrap: "break-word",
        wordBreak: "break-word",
        paddingTop:10
      },
      bigLogo: {
        padding: 1,
        backgroundColor: theme?.palette?.white,
        width: 92,
        height: 92,
        border: "2px solid",
        borderColor: theme?.palette?.neutralLighter,
        borderRadius: "50%",
        objectFit: "cover",
        color: theme?.palette.themePrimary,
        textAlign: "center",
        verticalAlign: "middle",

        fontWeight: 700,
      },

      separator: mergeStyles({
        height: "1px",
        backgroundColor: theme?.palette?.neutralLight,
        opacity: theme?.isInverted ? "0.2" : "1",
        width: "100%",
      }),
    });
  }, [theme]);

  return {
    scrollableContainerStyles,
    containerStyles,
    sendButtonStyles,
    controlStyles,
    textFieldStyles,
    stackBottomStyles,
    nameStyles,
    imageOAtyles,
    questionStyles,
    answerStyles,
    answerContainerStyles,
    headerContainertyles,
    buttonIconStyles,
    messageChatInfoStyles,
    messageChatInfoContainerStyles,
    messageErrorContainerStyles
  };
};
