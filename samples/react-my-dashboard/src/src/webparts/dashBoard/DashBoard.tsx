import * as React from 'react';

import { Provider } from 'jotai';

import {
  FluentProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  Theme,
  tokens,
} from '@fluentui/react-components';

import {
  DashboardControl,
} from '../../components/dashBoardControl/DashboardControl';
import { createv9Theme } from '../../utils/V8toV9ThemeShim/v9ThemeShim';
import { IDashBoardProps } from './IDashBoardProps';

export const Dashboard: React.FunctionComponent<IDashBoardProps > = (props: React.PropsWithChildren<IDashBoardProps >) => {
  const { themeString , theme, hasTeamsContext  } = props;

  const setTheme = React.useCallback(():Partial<Theme>  => {
      if (hasTeamsContext){
       return  themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
      } else {
           return  createv9Theme(theme)
        }
    
  }, [themeString, theme, hasTeamsContext, createv9Theme]);

  return (
    <>
      <FluentProvider
        theme={
          setTheme()
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Provider>
          <DashboardControl  {...props} />
        </Provider>
      </FluentProvider>

    </>
  );
};

