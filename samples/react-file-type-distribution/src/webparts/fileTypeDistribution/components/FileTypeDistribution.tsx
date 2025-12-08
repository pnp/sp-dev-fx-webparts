import * as React from "react";
import { IFileTypeDistributionState, type IFileTypeDistributionProps } from "./IFileTypeDistribution";
import { IRefinerEntry } from "../../../common/models/IRefinerEntry";
import { Button, Combobox, FluentProvider, IdPrefixProvider, Option, Spinner, webLightTheme } from "@fluentui/react-components";
import { ChartDataPoint, DataVizPalette, DonutChart, getColorFromToken, HorizontalBarChart } from "@fluentui/react-charts";

const paletteTokens = Object.values(DataVizPalette);
const paletteLength = paletteTokens.length;

const FileTypeDistribution = (props: IFileTypeDistributionProps): JSX.Element => {
  const { spService, chartType } = props;

  const [state, setState] = React.useState<IFileTypeDistributionState>({
    loading: false,
    libraries: [],
    selectedLib: undefined,
    horizontalBarChartData: [],
    donutChartData: undefined,
    totalDocs: 0,
  });

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      try {
        setState((prevState) => ({ ...prevState, loading: true }));
        const libs = await spService.getLibraries();
        setState((prevState) => ({ ...prevState, libraries: libs, selectedLib: libs?.[0]?.serverRelativeUrl, loading: false }));
      } catch (ex) {
        console.log(ex);
        setState((prevState) => ({ ...prevState, loading: false }));
      }
    })();
  }, []);

  const analyze = async (): Promise<void> => {
    try {
      setState((prevState) => ({ ...prevState, loading: true }));
      const lib = state.libraries?.find((l) => l.serverRelativeUrl === state.selectedLib);
      if (!lib) return;
      const refiners: IRefinerEntry[] = await spService.getFileTypeRefiners(lib.serverRelativeUrl);
      // build deterministic color per extension
      const hash = (str: string): number => {
        let h = 0;
        for (let i = 0; i < str.length; i++) {
          h = Math.trunc(Math.imul(31, h) + str.charCodeAt(i));
        }
        return Math.abs(h);
      };
      const totalDocs = refiners.reduce((acc, curr) => acc + curr.count, 0);
      if (chartType === "HorizontalBarChart") {
        const chartData = refiners.map((r) => {
          const index = hash(r.name) % paletteLength;
          const color = getColorFromToken(paletteTokens[index]);

          return {
            chartTitle: r.name,
            chartData: [
              {
                legend: r.name,
                horizontalBarChartdata: { x: r.count, total: totalDocs },
                color: color ?? getColorFromToken(DataVizPalette.color1),
              },
            ],
          };
        });
        setState((prevState) => ({ ...prevState, loading: false, totalDocs: totalDocs, horizontalBarChartData: chartData }));
      } else {
        const chartData: ChartDataPoint[] = refiners.map((r) => {
          const index = hash(r.name) % paletteLength;
          const color = getColorFromToken(paletteTokens[index]);
          return {
            legend: r.name,
            data: r.count,
            color: color,
          };
        });
        setState((prevState) => ({
          ...prevState,
          loading: false,
          totalDocs: totalDocs,
          donutChartData: {
            chartTitle: "",
            chartData: chartData,
          },
        }));
      }
    } catch (ex) {
      console.log(ex);
      setState((prevState) => ({ ...prevState, loading: false }));
    }
  };
  return (
    <IdPrefixProvider value="App-FileTypeDistributionProvider">
      <FluentProvider id="FileTypeDistributionFluentProvider" theme={webLightTheme}>
        <div style={{ display: "flex", gap: 15, marginBottom: 15 }}>
          <Combobox
            value={state.libraries.find((lib) => lib.serverRelativeUrl === state.selectedLib)?.title}
            selectedOptions={state.selectedLib ? [state.selectedLib] : []}
            onOptionSelect={(_, d) => setState((prevState) => ({ ...prevState, selectedLib: d.optionValue! }))}
          >
            {state.libraries.map((l) => (
              <Option key={l.id} value={l.serverRelativeUrl} text={l.title}>
                {l.title}
              </Option>
            ))}
          </Combobox>
          <Button appearance="primary" onClick={analyze}>
            Analyze
          </Button>
        </div>

        {state.loading && <Spinner />}
        {state.loading ? null : (
          <>
            {!!state.horizontalBarChartData.length && chartType === "HorizontalBarChart" && (
              <HorizontalBarChart data={state.horizontalBarChartData} chartDataMode={"default"} className={"hbcbasic"} />
            )}
            {chartType === "DonutChart" && state.donutChartData && (
              <DonutChart data={state.donutChartData} innerRadius={55} valueInsideDonut={state.totalDocs} />
            )}
          </>
        )}
      </FluentProvider>
    </IdPrefixProvider>
  );
};

export default FileTypeDistribution;
