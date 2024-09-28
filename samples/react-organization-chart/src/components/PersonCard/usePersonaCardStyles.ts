import { IButtonStyles, IDocumentCardActionsStyles, IStackStyles, mergeStyles, mergeStyleSets } from "@fluentui/react";
import type { Theme } from "spfx-uifabric-themes";
const currentTheme: Theme = window.__themeState__.theme;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/explicit-function-return-type
export const usePersonaCardStyles = () => {

  const stackPersonaStyles: Partial<IStackStyles> = {
    root: { padding: 15 },
  };

  const buttonStyles: IButtonStyles = {
    icon: {
      fontSize: 12,
    },
    iconHovered: {
      fontWeight: 600,
    },
  };

  const documentCardActionStyles: Partial<IDocumentCardActionsStyles> = {
    root: {
      height: 34,
      padding: 0,
      backgroundColor: currentTheme.neutralLighterAlt,
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderTopColor: currentTheme.neutralLight,
      width: "100%",
    },
  };

  const personaCardStyles = mergeStyleSets({
    separatorHorizontal: mergeStyles({
      width: "100%",
      borderWidth: 0.5,
      borderStyle: "solid",
      borderColor: currentTheme.neutralLight,
    }),
    iconStyles: mergeStyles({
      fontSize: 16, color: currentTheme.themePrimary
    }),
    hoverHeader: mergeStyles({
      minWidth: 260,
      maxWidth: 260,
      borderStyle: "none",
      borderWidth: 0,
      borderRadius: 0,
    }),
    tileCurrentUser: mergeStyles({
      minWidth: 260,
      maxWidth: '260px !important',
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 0,

      borderColor: currentTheme.themePrimary,
      boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",
    }),
    tile: mergeStyles({
      minWidth: 260,
      maxWidth: '260px !important',
      borderStyle: "solid",
      borderWidth: 1,
      borderRadius: 0,
      borderColor: currentTheme.neutralQuaternaryAlt,
      backgroundColor: currentTheme.white,
      boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",
      selectors: {
        ":hover": {
          borderStyle: "solid",
          borderWidth: 1,
          borderLeftStyle: "solid",
          borderRadius: 0,
          borderColor: currentTheme.themePrimary,
          // borderColor: props.color,
          //     borderTopWidth: 2,
        },
        ":focus": {
          borderStyle: "solid",
          borderWidth: 1,
          borderLeftStyle: "solid",
          borderRadius: 0,
          borderColor: currentTheme.themePrimary,
          // borderTopWidth: 2,
        },
        "@media(max-width : 480px)": {
          maxWidth: "100%",
          minWidth: "100%",
        },
        "@media((min-width : 481px) and (max-width : 12480px))": {
          maxWidth: 260,
          minWidth: "min(50%, 260px)",
        },
      }
    }),
  });

  return {documentCardActionStyles, personaCardStyles, buttonStyles, stackPersonaStyles };
};
