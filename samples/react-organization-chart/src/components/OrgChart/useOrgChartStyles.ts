import { mergeStyles, mergeStyleSets } from "office-ui-fabric-react";

const currentTheme = window.__themeState__.theme;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useOrgChartStyles = () => {

  const orgChartClasses = mergeStyleSets({
    tilesContainer: mergeStyles({
      marginBottom: 10,
      marginTop: 0,
      gridGap: "10px",
      padding: 10,
      justifyContent: "center",
    }),

    separatorVertical: mergeStyles({
      height: 25,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: currentTheme.neutralQuaternary,
    }),

    separatorHorizontal: mergeStyles({
      width: "100%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: currentTheme.neutralQuaternary,
    }),
  });

  return { orgChartClasses };
};
