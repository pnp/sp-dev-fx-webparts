/* eslint-disable @typescript-eslint/explicit-function-return-type */

import * as React from 'react';

import { useAtomValue } from 'jotai';
import {
  mergeStyles,
  mergeStyleSets,
} from 'office-ui-fabric-react';
import { IDropdownStyles } from 'office-ui-fabric-react/lib/Dropdown';

import { globalState } from '../../jotai/atoms';

/* eslint-disable @typescript-eslint/no-empty-function */
export const useSelectTimeStyles = () => {
  const  appState  = useAtomValue(globalState);
  const { currentTheme } = appState;


  const dropdownStyles: Partial<IDropdownStyles> = React.useMemo(() => {
    return {
      caretDownWrapper: {
        color: currentTheme?.semanticColors?.bodyText,
        ":hover": { color: currentTheme?.semanticColors?.bodyText },
      },
      title: {
        borderWidth: 0,
        borderStyle: undefined,
        backgroundColor: currentTheme?.palette?.white,
        color: currentTheme?.semanticColors?.bodyText,
      },
      dropdown: {
        minWidth: 95,
        width: '100%',
        borderStyle: "solid",

        borderWidth: 1,
        backgroundColor: currentTheme?.palette?.white,
        borderRadius: 0,
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
          '.ms-Dropdown-caretDown': {
            color: currentTheme?.semanticColors?.bodyText,
          }
        },
        ":after": {
          borderWidth: 0,
          borderRadius: 0,
        },
        ":focus:after": {
          borderWidth: 0,
        },
      },
    };
  }, [currentTheme]);

  const controlStyles = React.useMemo(() => {
    return mergeStyleSets({
      iconStyles: mergeStyles({
        width: "20px",
        height: "20px",
        fill: `${currentTheme?.semanticColors?.bodyText} !important`,
      }),
    });
  }, [currentTheme]);

  return { controlStyles, dropdownStyles };
};
