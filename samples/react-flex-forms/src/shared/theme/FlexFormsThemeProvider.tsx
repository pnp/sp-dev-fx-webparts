import { FluentProvider, webDarkTheme, webLightTheme } from '@fluentui/react-components';
import * as React from 'react';

export interface IFlexFormsThemeProviderProps {
  children?: React.ReactNode;
  isDarkTheme: boolean;
}

export const FlexFormsThemeProvider: React.FC<IFlexFormsThemeProviderProps> = ({ children, isDarkTheme }) => {
  return (
    <FluentProvider theme={isDarkTheme ? webDarkTheme : webLightTheme}>
      {children}
    </FluentProvider>
  );
};
