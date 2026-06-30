import * as React from "react";
import {
  Gantt as SvarGantt,
  Willow,
  WillowDark,
  Tooltip,
} from "@svar-ui/react-gantt";
import type { IColumnConfig } from "@svar-ui/react-gantt";
import {
  FluentProvider,
  IdPrefixProvider,
  teamsDarkTheme,
  teamsLightTheme,
  teamsHighContrastTheme,
  Card,
  Spinner,
  Subtitle1,
  tokens,
} from "@fluentui/react-components";
import type { Theme } from "@fluentui/react-components";
import { MessageBar, MessageBarType } from "@fluentui/react";

import type { IGanttProps } from "./IGanttProps";
import { useGanttFluentThemeClass } from "./useGanttFluentThemeClass";
import { GanttPlaceholder } from "./GanttPlaceholder";
import { useSharePointGanttData } from "../hooks/useSharePointGanttData";
import {
  SCALE_PRESETS,
  DEFAULT_SCALE,
  getDefaultColumns,
  getColumnDefs,
} from "../constants/constants";
import { EAppHostName } from "../constants/EAppHostName";
import * as strings from "GanttWebPartStrings";
import { useAvailableHeight } from "./useAvailableHeight";

const buildColumns = (visibleColumns?: string[]): IColumnConfig[] => {
  const defs = getColumnDefs();
  if (!visibleColumns || visibleColumns.length === 0)
    return getDefaultColumns();
  return visibleColumns
    .map((colId) => defs[colId])
    .filter((col): col is IColumnConfig => col !== undefined);
};

export const BOTTOM_PADDING = 16;
const DEFAULT_SP_HEIGHT = 800;

const GanttChart: React.FC<IGanttProps> = (props) => {
  const {
    isDarkTheme,
    appHostName,
    theme,
    themeString,
    listId,
    fieldMappings,
    visibleColumns,
    scale,
    spHttpClient,
    siteUrl,
    onConfigure,
    height,
  } = props;

  const isTeamsHost = appHostName !== EAppHostName.SharePoint;

  const fluentTheme = React.useMemo<Theme | undefined>(() => {
    if (isTeamsHost) {
      if (themeString === "dark") return teamsDarkTheme;
      if (themeString === "contrast") return teamsHighContrastTheme;
      return teamsLightTheme;
    }
    return theme;
  }, [isTeamsHost, themeString, theme]);

  const hasListConfig = !!(
    listId &&
    fieldMappings?.text &&
    fieldMappings?.start &&
    fieldMappings?.duration
  );
  const { tasks, links, isLoading, error } = useSharePointGanttData(
    spHttpClient,
    siteUrl,
    listId,
    fieldMappings,
  );
  const columns = React.useMemo(
    () => buildColumns(visibleColumns),
    [visibleColumns],
  );
  const scales = React.useMemo(
    () => SCALE_PRESETS[scale || DEFAULT_SCALE],
    [scale],
  );
  const themeClass = useGanttFluentThemeClass(isDarkTheme);
  const ThemeWrapper = React.useMemo(
    () => (isDarkTheme ? WillowDark : Willow),
    [isDarkTheme],
  );
  const useFullHeight = isTeamsHost;
  const fixedHeight = height || DEFAULT_SP_HEIGHT;
  const { ref: dynamicRef, height: dynamicHeight } = useAvailableHeight(
    useFullHeight,
    fixedHeight,
  );
  const ganttHeight = useFullHeight ? dynamicHeight : fixedHeight;

  return (
    <IdPrefixProvider value="gantt-">
      <FluentProvider
        theme={fluentTheme}
        style={{
          background: "transparent",
          padding: 15,
        }}
      >
        {props.title && (
          <div style={{ marginBottom: tokens.spacingVerticalXXL }}>
            <Subtitle1> {props.title}</Subtitle1>
          </div>
        )}

        <Card
          ref={useFullHeight ? dynamicRef : undefined}
          className={themeClass}
          style={{ padding: 20, height: `${ganttHeight}px` }}
        >
          {/* SVAR icon font — loaded via CDN because SPFx css-loader hashes class names */}
          <link
            rel="stylesheet"
            href="https://cdn.svar.dev/fonts/wxi/wx-icons.css"
          />

          {!hasListConfig && onConfigure && (
            <GanttPlaceholder onConfigure={onConfigure} />
          )}

          {isLoading && hasListConfig && (
            <Spinner size="small" label={strings.LoadingTasks} />
          )}

          {error && hasListConfig && (
            <MessageBar messageBarType={MessageBarType.error}>
              {strings.ErrorPrefix}
              {error}
            </MessageBar>
          )}

          {hasListConfig && !isLoading && !error && (
            <ThemeWrapper fonts={false}>
              <SvarGantt
                tasks={tasks}
                links={links}
                columns={columns}
                cellHeight={38}
                cellWidth={100}
                scaleHeight={38}
                scales={scales}
              >
                <Tooltip />
              </SvarGantt>
            </ThemeWrapper>
          )}
        </Card>
      </FluentProvider>
    </IdPrefixProvider>
  );
};

/**  wrapper  */
const Gantt: React.FC<IGanttProps> = (props) => {
  return <GanttChart {...props} />;
};

export default Gantt;
