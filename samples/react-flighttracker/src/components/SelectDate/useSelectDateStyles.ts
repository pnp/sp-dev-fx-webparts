import * as react from 'react';

import { useAtomValue } from 'jotai';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  IDatePickerStyles,
  ILabelStyles,
} from 'office-ui-fabric-react';

import { globalState } from '../../jotai/atoms';

export const useSelctedDateStyles= () => {
  const appState = useAtomValue(globalState);

  const { currentTheme } = appState;

  const labelDateStyles = react.useMemo(() => {
  return {
    root:{
     width: '75%',
    }
  }

  }, []);

  const labelTimeStyles:ILabelStyles = react.useMemo(() => {
    return {
      root:{
       width: '25%',
      }
    }

    }, []);

  const textFieldStyles  = react.useMemo(() => {
    return {
     field: {
         color: currentTheme?.semanticColors?.bodyText,

      },
    };
  }, [currentTheme]);

  const selectedDateStyle: Partial<IDatePickerStyles> = react.useMemo(() => {
    return {
      root:{
        width: "100%",
        color: currentTheme?.semanticColors?.bodyText,
        ".ms-TextField-fieldGroup":{
          borderWidth: `0px !important`,
          backgroundColor: currentTheme?.semanticColors.bodyBackground ,

        },
      },
      fieldGroup:{
        color: currentTheme?.semanticColors?.bodyText,

      } ,

      textField: {
        borderStyle: "solid",
        width: "100%",
        borderWidth: 1,
        backgroundColor: currentTheme?.palette?.white ,
        borderRadius: 0,
        color: currentTheme?.semanticColors?.bodyText,
        borderColor:  `${currentTheme?.palette?.neutralQuaternaryAlt} !important` ,
        ":focus": {
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: `${currentTheme?.palette?.themePrimary} !important`   ,
        },
        ":hover": {
          borderStyle: "solid",
          borderWidth: 1,
          borderColor: `${currentTheme?.palette?.themePrimary} !important`   ,
        },
        ":after": {
          borderWidth: 0,
          borderRadius: 0,
        },
      },
    };
  }, [currentTheme]);


  return {textFieldStyles, selectedDateStyle, labelDateStyles, labelTimeStyles};
}
