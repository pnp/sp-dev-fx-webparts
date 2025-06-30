import { IColumn } from "@fluentui/react";
import { ThemedPalette } from "../../common/ColorsHelper";

export interface IHeatmapDetailsListProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[];
    columns: IColumn[];
    dataTypes: Map<string, string>;
    listPalette: ThemedPalette;
    showTotalColumnName?:string;
}