import { IButtonStyles, IDocumentCardActionsStyles, IStackStyles, mergeStyles, mergeStyleSets } from "office-ui-fabric-react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Theme from "spfx-uifabric-themes";
const currentTheme = window.__themeState__.theme;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useHoverCardStyles = () => {

  const stackPersonaStyles: Partial<IStackStyles> = {
    root: { padding: 15 },
  };
  const stackCompactStyles: Partial<IStackStyles> = {
    root: { padding: 15 },
  };

  const documentCardActionStyles: Partial<IDocumentCardActionsStyles> = {
    root: {
      width: '100%',
      marginTop:10,
      paddingLeft: 10,
      paddingRight: 10,
      backgroundColor: currentTheme.neutralLighter,
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderTopColor: currentTheme.neutralLight,
    },
  };

  const buttonStylesHouver: IButtonStyles = {
    root: {
      marginRight: 10,
    },
    icon: {
      fontSize: 16,
    },
    iconHovered: {
      //   color: currentTheme.themePrimary,
      fontWeight: 600,
    },
  };

  const expandedCardStackStyle: IStackStyles = {
    root: {
     // marginTop: 10,
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 15,
      paddingBottom: 30,
      backgroundColor: currentTheme.neutralLighterAlt,
    },
  };

  const hoverCardStyles = mergeStyleSets({
    separatorHorizontal: mergeStyles({
      width: "100%",
      height:0,
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderTopColor: currentTheme.neutralLight,
    }),
    iconStyles: mergeStyles({
      fontSize: 16, color: currentTheme.themePrimary
    }),
    hoverHeader: mergeStyles({
      minWidth: '100%',
      borderStyle: "none",
      borderWidth: 0,
      borderRadius: 0,
    }),
  });

  return {stackCompactStyles, documentCardActionStyles, hoverCardStyles, expandedCardStackStyle, buttonStylesHouver, stackPersonaStyles };
};
