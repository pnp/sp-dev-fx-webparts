/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import { IdPrefixProvider, Theme, tokens } from "@fluentui/react-components";

import { CalendarAppControl } from "./CalendarAppControl";
import { ErrorBoundary } from "react-error-boundary";
import { ICalendarProps } from "./ICalendarProps";
import { Provider as JotaiProvider } from "jotai";
import { Provider } from "@nuvemerudita/react-controls";
import ShowError from "./showError/ShowError";
import { convertThemeV8toV9 } from "../utils/themeUtils";
import { css } from "@emotion/css";

export const Calendar: React.FunctionComponent<ICalendarProps> = (
  props: React.PropsWithChildren<ICalendarProps>
) => {
  const { themeString, theme, hasTeamsContext } = props;
  const [fui9Theme, setfui9Theme] = React.useState<Theme | undefined>(
    undefined
  );

  React.useEffect(() => {
    setfui9Theme(
      convertThemeV8toV9(theme as any, hasTeamsContext, themeString)
    );
  }, []);

  const styles = React.useMemo(() => {
    return {
      root: css({
        width: "100%",
        backgroundColor: !hasTeamsContext
          ? "transparent"
          : tokens.colorNeutralBackground1,
        padding: 0,
      }),
    };
  }, [hasTeamsContext]);

  const fallbackRender = React.useCallback(({ error, resetErrorBoundary }) => {
    console.error(`[Calendar:Error: ${error.message}`);
    return <ShowError message={error.message}>{null}</ShowError>;
  }, []);

  if (!fui9Theme) return null;

  return (
    <>
      <>
        <IdPrefixProvider value="calendarWebpart-">
          <Provider theme={fui9Theme} className={styles.root}>
            <JotaiProvider>
              <ErrorBoundary fallbackRender={fallbackRender}>
                <CalendarAppControl {...props} />
              </ErrorBoundary>
            </JotaiProvider>
          </Provider>
        </IdPrefixProvider>
      </>
    </>
  );
};
