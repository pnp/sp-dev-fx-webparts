import * as React from 'react';

import { ThemeProvider } from '@fluentui/react';

import { MantineProvider } from '@mantine/core';

import {
  useMantineThemeFromFluentTheme,
} from '../../hooks/useMantineThemeFromFluentTheme';
import { BirthdaysTimelineControl } from './BirthdaysTimelineControl';
import { IBirthdaysTimelineProps } from './IBirthdaysTimelineProps';

export const BirthdaysTimeline: React.FunctionComponent<IBirthdaysTimelineProps> = (props: React.PropsWithChildren<IBirthdaysTimelineProps>) => {
  const { theme } = props;
  const mantineTheme = useMantineThemeFromFluentTheme(theme);
  return (
     <>
      <MantineProvider theme={ mantineTheme} withCSSVariables={false}>
        <ThemeProvider theme={theme}>
          <BirthdaysTimelineControl {...props} />
        </ThemeProvider>
      </MantineProvider>
     </>
   );
 };


