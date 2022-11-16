/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as react from 'react';

import { useAtomValue } from 'jotai';
import {
  IBasePickerStyles,
  IContextualMenuStyles,
  IStackStyles,
  ITextFieldStyles,
  ITextStyles,
  mergeStyles,
  mergeStyleSets,
} from 'office-ui-fabric-react';

import { globalState } from '../../jotai/atoms';

export const useSelectAirportStyles = () => {
  const appState = useAtomValue(globalState);

  const { currentTheme, selectedAirPort } = appState;

  const contextMenuStyles: Partial<IContextualMenuStyles> = react.useMemo(() => {
    return {
      root: {
        width: "100%",
      },
    };
  }, []);

  const textFieldSelectAirPortStyles: Partial<ITextFieldStyles> = react.useMemo(() => {
    return {
      prefix: {
        width: selectedAirPort?.iata_code ? 55 : 0,
        paddingLeft: selectedAirPort?.iata_code ? 10 : 0,
        paddingRight: selectedAirPort?.iata_code ? 10 : 0,
        backgroundColor: selectedAirPort?.iata_code
          ? currentTheme?.palette?.themePrimary
          : currentTheme?.semanticColors.inputBackground,
      },
    };
  }, [currentTheme, selectedAirPort]);

  const IATACodePrefixStyle: ITextStyles = react.useMemo(() => {
    return {
      root: {
        padding: 7,
        transform: "uppercase",
        fontWeight: "bold",
        color: currentTheme?.palette?.white,
        minWidth: 55,
        textAlign: "center",
      },
    };
  }, [currentTheme]);

  const IATACodeStyle: ITextStyles = react.useMemo(() => {
    return {
      root: {
        backgroundColor: currentTheme?.palette?.themePrimary,
        padding: 7,
        transform: "uppercase",
        fontWeight: "bold",
        color: currentTheme?.palette?.white,
        minWidth: 55,
        textAlign: "center",
      },
    };
  }, [currentTheme]);

  const selectedAirPortIATACodeStyle: ITextStyles = react.useMemo(() => {
    return {
      root: {
        backgroundColor: currentTheme?.palette?.themePrimary,
        padding: 2,
        transform: "uppercase",
        fontWeight: "bold",
        color: currentTheme?.palette?.white,
        minWidth: 55,
        textAlign: "center",
      },
    };
  }, [currentTheme]);

  const airportContainerStyles: IStackStyles = react.useMemo(() => {
    return {
      root: {
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
      },
    };
  }, [currentTheme]);

  const selectedAirportContainerStyles: IStackStyles = react.useMemo(() => {
    return {
      root: {
        paddingLeft: 10,
        paddingRight: 10,
      },
    };
  }, []);

  const airportNameStyles: IStackStyles = react.useMemo(() => {
    return {
      root: {
        textAlign: "left",
        color: currentTheme?.semanticColors?.bodyText,
      },
    };
  }, [currentTheme]);

  const airportItemStyles: IStackStyles = react.useMemo(() => {
    return {
      root: {
        cursor: "pointer",
        ":hover": {
          backgroundColor: currentTheme?.palette?.neutralLighterAlt,
        },
      },
    };
  }, [currentTheme]);

  const selectedAirportItemStyles: IStackStyles = react.useMemo(() => {
    return {
      root: {
        backgroundColor: currentTheme?.palette?.white,
      },
    };
  }, [currentTheme]);

  const selecteAirportPickerStyles: Partial<IBasePickerStyles> = react.useMemo(() => {
    return {
      root: {
        width: " 100%",
        borderRadius: 0,
        marginTop: 0,
      },

      input: {
        width: "100%",
        color: currentTheme?.semanticColors?.bodyText,
        backgroundColor: currentTheme?.palette?.white,
        "::placeholder": {
          color: currentTheme?.semanticColors?.bodyText,
        }

      },

      text: {

        borderStyle: "solid",
        width: "100%",
        borderWidth: 1,
        backgroundColor: currentTheme?.palette?.white,
        borderRadius: 0,
        // borderColor:  "rgb(225 223 221)" ,
        borderColor: `${currentTheme?.palette?.neutralQuaternaryAlt} !important`,
        ":focus": {
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: `${currentTheme?.palette?.themePrimary} !important`,
        },
        ":hover": {
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: `${currentTheme?.palette?.themePrimary} !important`,
        },
        ":after": {
          borderWidth: 0,
          borderRadius: 0,
        },
      },
    };
  }, [currentTheme?.palette, currentTheme?.semanticColors]);

  const controlStyles = react.useMemo(() => {
    return mergeStyleSets({
      container: {
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "white",
        padding: "10px",
        boxSizing: "border-box",
      },
      separator: mergeStyles({
        marginTop: 2,
        marginBottom: 2,
        borderBottomWidth: 1,
        borderBottomColor: currentTheme?.palette?.neutralLighter,
        borderBottomStyle: "solid",
      }),
      airportItemStyles: mergeStyles({
        cursor: "pointer",
        ":hover": {
          backgroundColor: currentTheme?.palette?.neutralLighterAlt,
        },
      }),
      searchContainerStyles: mergeStyles({

        width: "100%",
      }),
      pickerItemStyles: mergeStyles({
        width: "100%",
      }),
      placeHolderStyles: mergeStyles({
       color: currentTheme?.semanticColors?.bodyText,
      }),
    });
  }, [currentTheme]);

  return {
    selectedAirportContainerStyles,
    selectedAirportItemStyles,
    textFieldSelectAirPortStyles,
    IATACodePrefixStyle,
    controlStyles,
    IATACodeStyle,
    airportContainerStyles,
    airportItemStyles,
    airportNameStyles,
    contextMenuStyles,
    selectedAirPortIATACodeStyle,
    selecteAirportPickerStyles,
  };
};
