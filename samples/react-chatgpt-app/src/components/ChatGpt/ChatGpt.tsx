/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import { Provider } from 'jotai';
import { ThemeProvider } from 'office-ui-fabric-react/lib/Theme';

import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';

import {
  useMantineThemeFromFluentTheme,
} from '../../hooks/useMantineThemeFromFluentTheme';
import { IChatGptProps } from '../../models/IChatGptProps';
import { ChatGptControl } from './ChatGptControl';

export const ChatGpt: React.FunctionComponent<IChatGptProps> = (props: React.PropsWithChildren<IChatGptProps>) => {
  const { theme } = props;
  const mantineTheme = useMantineThemeFromFluentTheme(theme);

  return (
    <>
      <MantineProvider theme={mantineTheme} withCSSVariables={false}>
        <ThemeProvider theme={theme}>
          <Provider>
            <NotificationsProvider position="top-right" zIndex={2077}>
              <ChatGptControl {...props} />
            </NotificationsProvider>
          </Provider>
        </ThemeProvider>
      </MantineProvider>
    </>
  );
};
