/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';

import { useAtomValue } from 'jotai';
import {
  FontWeights,
  IScrollablePaneStyles,
  IStackStyles,
  ITextStyles,
  mergeStyles,
  mergeStyleSets,
} from 'office-ui-fabric-react';

import { globalState } from '../../jotai/atoms';

export const useFlightTrackerStyles = () => {
  const globalStateApp = useAtomValue(globalState);
  const { currentTheme, numberItemsPerPage, itemHeight } = globalStateApp;

  const listHeaderStyles: ITextStyles = React.useMemo(() => {
    return { root: { fontWeight: FontWeights.semibold, color: currentTheme?.semanticColors?.bodyText } };
  }, [currentTheme]);
  const itemContainer: IStackStyles = React.useMemo(() => {
    return {
      root: {
        maxWidth: "100%",
        overflow: "auto",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: currentTheme?.palette?.neutralQuaternaryAlt,
        margin: 3,
        backgroundColor: currentTheme?.palette?.white,
      //  boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",
        ":hover": {
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: currentTheme?.palette?.themePrimary,
        },
      },
    };
  }, [currentTheme,  ]);

  const attributeContainer: IStackStyles = React.useMemo(() => {
    return {
      root: {

        backgroundColor: currentTheme?.palette?.themeLighterAlt,

      },
    };
  }, [currentTheme]);

  const scollableContainerStyles: Partial<IScrollablePaneStyles> = React.useMemo(() => {
    return {
      root: { position: "relative", height: ((itemHeight *   numberItemsPerPage)) - 20,  //max height of the scrollable container
    },
    contentContainer: {  "::-webkit-scrollbar-thumb": {

      backgroundColor: currentTheme?.palette.themeLight,     },
    "::-webkit-scrollbar": {
      height: 10,
      width: 7,

    },
    "scrollbar-color": currentTheme?.semanticColors.bodyFrameBackground,
    "scrollbar-width": "thin", },
    };
  }, [currentTheme, numberItemsPerPage, itemHeight]);

  const stackContainerStyles: IStackStyles= React.useMemo(() => {
    return {
        root:{padding: 20, backgroundColor: currentTheme?.palette?.neutralLighterAlt}
    };
  }, [currentTheme]);

  const noDataContainerStyles: IStackStyles= React.useMemo(() => {
    return {
        root:{paddingTop: 50,  }
    };
  }, [currentTheme]);

  const controlStyles = mergeStyleSets({
    fileIconHeaderIcon: ({
      padding: 0,
      fontSize: "16px",
    }),
    fileIconCell:  mergeStyles({
      textAlign: "center",
      selectors: {
        "&:before": {
          content: ".",
          display: "inline-block",
          verticalAlign: "middle",
          height: "100%",
          width: "0px",
          visibility: "hidden",
        },
      },
    }),
    fileIconImg:  mergeStyles({
      verticalAlign: "middle",
      maxHeight: "16px",
      maxWidth: "16px",
    }),
    controlWrapper:  mergeStyles({
      display: "flex",
      flexWrap: "wrap",
    }),

    selectionDetails:  mergeStyles({
      marginBottom: "20px",
    }),
    attributeContainerGrid: mergeStyles({
     width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
      columnGap: '10px',
      rowGap: 10,
    } ),

    noDataFoundStyles: {
        width: "300px", height: "300px",
    },
    separator: mergeStyles({
      height: "1px",
      backgroundColor: currentTheme?.palette?.neutralLight,
      opacity:  currentTheme.isInverted ? "0.2" : "1",
    }),
  });

  return {attributeContainer,noDataContainerStyles, stackContainerStyles, scollableContainerStyles, itemContainer, controlStyles, listHeaderStyles };
};
