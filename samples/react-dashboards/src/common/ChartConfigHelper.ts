import { ChartLegendOptions, ChartOptions, ChartXAxe, TickOptions, TimeUnit } from "chart.js";
import ChartHelper from "./ChartHelper";

//#region DataSetStylesConfig
const dataSetPropStyle_Line = {
    lineTension: 0,
    borderWidth: 1
}
const dataSetPropStyle_Bar = {
    barThickness: 'flex',
}
const dataSetPropStyle_BarTime = {
    barThickness: 'flex',
    maxBarThickness: 10,
    minBarLength: 2,
}
const dataSetPropStyle_Pie = {
}
const dataSetPropStyle_None = {
}

const DataSetStylesConfig = {
    Line: dataSetPropStyle_Line,
    Bar: dataSetPropStyle_Bar,
    BarTime: dataSetPropStyle_BarTime,
    Pie: dataSetPropStyle_Pie,
    None: dataSetPropStyle_None
}
//#endregion

//#region ChartOptionsConfig
const legendOptions: ChartLegendOptions = {
    display: true,
    position: 'bottom',
    labels: {
        usePointStyle: true,
        boxWidth: 5,
    },
    onClick: () => { return false; }, // disable legend onClick functionality that filters datasets
}

const timeAxeConfig: ChartXAxe = {
    type: "time",
    time: {
        unit: 'day',
    },
    gridLines: {
        color: 'rgba(0, 0, 0, 0.1)',
        zeroLineColor: 'rgba(0, 0, 0, 0.1)',
        lineWidth: 0.5,
        zeroLineWidth: 0.5
    }
}
const xAxeTicksOptions: TickOptions = {
    fontSize: 12,
    maxRotation: 90,
    callback: (value) => { return ChartHelper.GetText(value, 25) }
}
const yAxeTicksOptions: TickOptions = {
    fontSize: 12,
    callback: (value) => { return ChartHelper.GetText(value, 20) }
}

const xAxesOptions: ChartXAxe = {
    offset: true,
    ticks: {
        source: 'auto',
        ...xAxeTicksOptions
    }
}
const xAxesOptions_Bar: ChartXAxe = {
    ticks:
    {
        beginAtZero: true,
        ...xAxeTicksOptions
    }
}

const yAxesOptions: ChartXAxe = {
    ticks: {
        min: 0,
        ...yAxeTicksOptions
    }
}
const yAxesOptions_Bar: ChartXAxe = {
    ticks: {
        min: 0,
        beginAtZero: true,
        ...yAxeTicksOptions
    },
    scaleLabel: {
        display: false,
        labelString: 'Y'
    }
}

const chartOptionsBase: ChartOptions = {
    legend: legendOptions,
    responsive: true,
    maintainAspectRatio: true,

    layout: {
        padding: 10
    },
    elements: {
        point: {
            radius: 2,
            hitRadius: 5,
            hoverRadius: 3,
        },
    }
}
const chartOptionsLine: ChartOptions = {
    ...chartOptionsBase,
    scales: {
        xAxes: [
            xAxesOptions
        ],
        yAxes: [
            yAxesOptions
        ]
    }
}
const chartOptionsLine_TimeX: ChartOptions = {
    ...chartOptionsBase,
    scales: {
        xAxes: [{
            ...xAxesOptions,
            ...timeAxeConfig,
            offset: true,

        }],
        yAxes: [
            yAxesOptions
        ]
    }
}
const chartOptions_TimeXGranularity = (timeGranularity: TimeUnit): ChartOptions => {
    return {
        scales: {
            xAxes: [{
                time: {
                    unit: timeGranularity,
                }
            }]
        }
    }
}
const chartOptions_TimeYGranularity = (timeGranularity: TimeUnit): ChartOptions => {
    return {
        scales: {
            yAxes: [{
                time: {
                    unit: timeGranularity,
                }
            }]
        }
    }
}

const chartOptionsHorizontalBar: ChartOptions = {
    ...chartOptionsBase,
    scales: {
        xAxes: [
            xAxesOptions_Bar
        ],
        yAxes: [
            yAxesOptions_Bar
        ]
    }
}
const chartOptionsHorizontalBar_TimeY: ChartOptions = {
    ...chartOptionsBase,
    scales: {
        xAxes: [
            xAxesOptions_Bar
        ],
        yAxes: [{
            ...yAxesOptions_Bar,
            ...timeAxeConfig,
            offset: true,
        }]
    }
}

const chartOptionsVerticalBar: ChartOptions = {
    ...chartOptionsBase,
    scales: {
        xAxes: [
            xAxesOptions_Bar
        ],
        yAxes: [
            yAxesOptions_Bar
        ]
    }
}
const chartOptionsVerticalBar_TimeX: ChartOptions = {
    ...chartOptionsBase,
    scales: {
        xAxes: [{
            ...xAxesOptions_Bar,
            ...timeAxeConfig,
            offset: true,

        }],
        yAxes: [
            yAxesOptions_Bar
        ]
    }
}

const chartOptionsPie: ChartOptions = {
    ...chartOptionsBase,
}

const ChartOptionsConfig = {
    Line: chartOptionsLine,
    Line_TimeX: chartOptionsLine_TimeX,
    BarHorizontal: chartOptionsHorizontalBar,
    BarHorizontal_TimeY: chartOptionsHorizontalBar_TimeY,
    BarVertical: chartOptionsVerticalBar,
    BarVertical_TimeX: chartOptionsVerticalBar_TimeX,
    TimeAxe: timeAxeConfig,
    TimeXGranularity: chartOptions_TimeXGranularity,
    TimeYGranularity: chartOptions_TimeYGranularity,
    Pie: chartOptionsPie
}
//#endregion

export { DataSetStylesConfig, ChartOptionsConfig };

