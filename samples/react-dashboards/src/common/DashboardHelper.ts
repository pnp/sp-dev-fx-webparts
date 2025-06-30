import { IStackItemStyles, mergeStyleSets } from "@fluentui/react";
import { stackStyles } from "./ComponentStyles";

export enum ListStyles {
    "list"=1,
    "heatmap",
    "heatmapCol"
}
export enum ChartStyles {
    "linechart"=1,
    "areachart",
    "barchart",
    "columnchart",
    "piechart",
}

export enum LayoutStyles {
    "SingleColumn"=1,
    "DoubleColumn",
    "ColumnRightTwoThirds",
    "ColumnLeftTwoThirds"
}

export const enum PanelSize {
    Small = 1,
    Medium = 2,
    Large = 3,
    XLarge = 4
}

const gridWidth = {
    small: 380,
    medium: 586,
    large: 792
}

export default class DashboardHelper {

    private static getSize = (parentWidth: number): PanelSize => {
        if (parentWidth <= gridWidth.small) {
            return PanelSize.Small;
        }
        else if (parentWidth > gridWidth.small && parentWidth <= gridWidth.medium) {
            return PanelSize.Medium;
        }
        else if (parentWidth > gridWidth.medium && parentWidth <= gridWidth.large) {
            return PanelSize.Large;
        }
        else {
            return PanelSize.XLarge;
        }
    }
    public static GetStackItemStyle = (layoutSettings: LayoutStyles, parentWidth: number): { list: IStackItemStyles, chart: IStackItemStyles } => {
        const areaSize = DashboardHelper.getSize(parentWidth);
        let stackItemStylesList: IStackItemStyles = {}
        let stackItemStylesChart: IStackItemStyles = {}

        switch (layoutSettings) {
            case LayoutStyles.SingleColumn:
                stackItemStylesList = mergeStyleSets(stackStyles.item, stackStyles.item100);
                stackItemStylesChart = mergeStyleSets(stackStyles.item, stackStyles.item100);
                break;
            case LayoutStyles.DoubleColumn:
                {
                    const style = (areaSize === PanelSize.Small)
                        ? stackStyles.item100
                        : stackStyles.item50;
                    stackItemStylesList = mergeStyleSets(stackStyles.item, style);
                    stackItemStylesChart = mergeStyleSets(stackStyles.item, style);
                }
                break;
            case LayoutStyles.ColumnLeftTwoThirds:
                {
                    const styleList = (areaSize === PanelSize.Small || areaSize === PanelSize.Medium)
                        ? stackStyles.item100
                        : stackStyles.item66;
                    const styleChart = (areaSize === PanelSize.Small || areaSize === PanelSize.Medium)
                        ? stackStyles.item100
                        : stackStyles.item33;
                    stackItemStylesList = mergeStyleSets(stackStyles.item, styleList);
                    stackItemStylesChart = mergeStyleSets(stackStyles.item, styleChart);
                }
                break;
            case LayoutStyles.ColumnRightTwoThirds:
                {
                    const styleList = (areaSize === PanelSize.Small || areaSize === PanelSize.Medium)
                        ? stackStyles.item100
                        : stackStyles.item33;
                    const styleChart = (areaSize === PanelSize.Small || areaSize === PanelSize.Medium)
                        ? stackStyles.item100
                        : stackStyles.item66;
                    stackItemStylesList = mergeStyleSets(stackStyles.item, styleList);
                    stackItemStylesChart = mergeStyleSets(stackStyles.item, styleChart);
                }
                break;
            default:
                stackItemStylesList = mergeStyleSets(stackStyles.item, stackStyles.item100);
                stackItemStylesChart = mergeStyleSets(stackStyles.item, stackStyles.item100);
                break;
        }
        return {
            list: stackItemStylesList,
            chart: stackItemStylesChart
        };
    }
    public static GetStackItemStyleFull = (): IStackItemStyles=> {
        return mergeStyleSets(stackStyles.item, stackStyles.item100);
    }
}