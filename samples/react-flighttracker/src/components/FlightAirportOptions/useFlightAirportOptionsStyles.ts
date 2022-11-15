/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as react from 'react';

import { useAtomValue } from 'jotai';
import {
  IStackStyles,
  mergeStyleSets,
} from 'office-ui-fabric-react';

import { globalState } from '../../jotai/atoms';

export const useFlightAeroportOptionsStyles =  () => {

const  globalStateApp  = useAtomValue(globalState);
const { currentTheme } = globalStateApp;

  const stackContainer : IStackStyles = react.useMemo(()=> {
    return {
      root: {
        marginTop: 30,
        width: "100%",
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: currentTheme?.palette?.neutralLighterAlt,
      },
    }
  },[currentTheme]);

  const controlsStyles =  react.useMemo(() => {
    return mergeStyleSets({
      containerGrid: {

        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
        columnGap: "10px",
        rowGap: "0.5em",

      },
      container: {
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        backgroundColor: currentTheme?.palette?.neutralLighterAlt,

      },
      header: {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "50px",
        padding: "10px",
        boxSizing: "border-box",
      },
      title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
      },
      body: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: "10px",
        boxSizing: "border-box",
      },
      footer: {
        display: "flex",
        flexFlow: "row nowrap",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "50px",
        padding: "10px",
        boxSizing: "border-box",
      },
    });
  }, [currentTheme]);


  return {stackContainer, controlsStyles}
}
