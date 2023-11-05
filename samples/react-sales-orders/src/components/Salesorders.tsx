import * as React from 'react';

import { Provider } from 'jotai';

import {
  FluentProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  tokens,
} from '@fluentui/react-components';

import { ISalesordersProps } from './ISalesordersProps';
import { SalesordersControl } from './SalesordersControls';

export const Salesorders: React.FunctionComponent<ISalesordersProps> = (props: React.PropsWithChildren<ISalesordersProps>) => {
  const { themeString ,   } = props;
  return (
    <>
      <FluentProvider
        theme={
          themeString === "dark"
            ? teamsDarkTheme
            : themeString === "contrast"
            ? teamsHighContrastTheme
            : {
                ...teamsLightTheme,
                colorNeutralBackground3: "#eeeeee",
              }
        }
        style={{ background: tokens.colorNeutralBackground3 }}
      >
        <Provider>
          <SalesordersControl {...props} />
        </Provider>
      </FluentProvider>

    </>
  );
};