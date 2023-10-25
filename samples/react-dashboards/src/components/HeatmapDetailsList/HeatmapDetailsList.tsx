import { DetailsListLayoutMode, FontWeights, IColumn, SelectionMode, ShimmeredDetailsList } from "@fluentui/react";
import { cloneDeep } from "@microsoft/sp-lodash-subset";
import * as React from 'react';
import ApiHelper from "../../common/ApiHelper";
import ColorsHelper, { ThemedPalette } from "../../common/ColorsHelper";
import { getColorRGBA, heatmapStyles } from "../../common/ComponentStyles";
import styles from "./Heatmap.module.scss";
import { IHeatmapDetailsListProps } from "./IHeatmapDetailsListProps";

interface DataRange {
    min: number,
    max: number
}

const HeatmapDetailsList: React.FunctionComponent<IHeatmapDetailsListProps> = (props) => {
    //#region State
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [items, setItems] = React.useState<any[]>(null);
    const [listCols, setListCols] = React.useState<IColumn[]>([]);
    const [firstColKey, setFirstColKey] = React.useState<string>();
    const [firstColHeader, setFirstColHeader] = React.useState<boolean>();
    //#endregion

    //#region methods
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _renderNumericalItemColumn = (item: any, index: number, column: IColumn, dataRange: DataRange, colorBckg: string): JSX.Element => {
        const isHeaderCol = (firstColHeader && firstColKey === column.key);
        const fieldContent = item[column.key];

        //calculate color opacity for heatmap cell background
        const opacity = ((fieldContent - dataRange.min) / (dataRange.max - dataRange.min)).toFixed(4);
        const cellCol = getColorRGBA(colorBckg, opacity)
        const txtColor= ColorsHelper.GetContrastColor(cellCol);

        return <div
            className={styles.heatmapCell}
            style={isHeaderCol
                ? { fontWeight: FontWeights.bold }
                : { backgroundColor: cellCol, color: txtColor }}
        >{fieldContent!== 0 && fieldContent < 0.001
            ? "<0.001"
            : Number(fieldContent.toFixed(3))
        }</div>;

    }
    const _shouldSkipFirstCol = (dataTypes: Map<string, string>): boolean => {
        return ApiHelper.GetColByType(dataTypes, "string").length > 0
    }
    const _getColumns = (columns: IColumn[], numericalCols: string[], width: number, dataRange: DataRange, colorBckg: string): IColumn[] => {

        if (columns.length > 0) {

            const heatmapCols = cloneDeep(columns);

            const colWidth = (width) / heatmapCols.length;
            const minWidth = colWidth - 20; //padding
            heatmapCols.forEach((column: IColumn) => {
                column.minWidth = minWidth;
                column.maxWidth = colWidth;
            });

            //Set rendering for numerical columns ONLY
            const numericCols = heatmapCols.filter((col) => {
                return numericalCols.includes(col.key);
            });
            numericCols.forEach((column: IColumn) => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                column.onRender = (item: any, index: number, column: IColumn) => {
                    return _renderNumericalItemColumn(item, index, column, dataRange, colorBckg)
                }
            });

            return heatmapCols;
        }
        else {
            return columns;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _getMinMaxNumber = (items: any[], dataTypes: Map<string, string>, skipFirstCol: boolean): DataRange => {

        if (items.length > 0 && dataTypes.size > 0) {

            const columnsNumber = ApiHelper.GetColByTypes(dataTypes, ApiHelper.NumericTypes);
            const props = (skipFirstCol && Object.keys(dataTypes)[0] === columnsNumber[0])
                ? columnsNumber.slice(1)
                : columnsNumber;

            if (props.length > 0) {
                const min = items.reduce(function (min, curRow) {
                    const rMmin = props.reduce(function (max, prop) {
                        return curRow[prop] < min ? curRow[prop] : max;
                    }, curRow[props[0]]);
                    return rMmin < min ? rMmin : min;
                }, items[0][props[0]]);

                const max = items.reduce(function (max, curRow) {
                    const rMax = props.reduce(function (max, prop) {
                        return curRow[prop] > max ? curRow[prop] : max;
                    }, curRow[props[0]]);
                    return rMax > max ? rMax : max;
                }, items[0][props[0]]);

                return {
                    min: Number(min.toFixed(4)),
                    max: Number(max.toFixed(4))
                }
            }
        }
        return null;
    }
    const _getFirstColKey = (columns: IColumn[], skipFirstCol: boolean): string => {

        return (columns.length > 0)
            ? skipFirstCol ? columns[0].key : ''
            : '';
    }
    //#endregion

    //#region Effects
    React.useEffect((): void => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const setHeatmapConfiguration = (items: any[], columns: IColumn[], dataTypes: Map<string, string>, listPalette: ThemedPalette): void => {
            if (items && columns && dataTypes) {
                try {
                    const skipFirstCol = _shouldSkipFirstCol(dataTypes);
                    const dataRange = _getMinMaxNumber(items, dataTypes, skipFirstCol);
                    const color = ColorsHelper.GetThemeMonochromaticColors(listPalette as ThemedPalette, 2).Colors[0];  //can't use 1 becasue PaletteGenerator divides by 0
                    const numericalCols = ApiHelper.GetColByTypes(dataTypes, ApiHelper.NumericTypes);

                    setFirstColHeader(skipFirstCol);
                    setListCols(
                        _getColumns(columns, numericalCols, heatmapStyles.minWidth, dataRange, color)
                    );
                    setFirstColKey(
                        _getFirstColKey(columns, skipFirstCol)
                    )
                    setItems(items);
                }
                catch (err) {
                    console.log(err);
                }
            }
        }
        setHeatmapConfiguration(props.items, props.columns, props.dataTypes, props.listPalette)
    }, [props.items, props.columns, props.dataTypes, props.listPalette]);
    //#endregion

    return (
        <ShimmeredDetailsList
            enableShimmer={!items}
            items={items || []}
            columns={listCols}
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            compact={true}
        />
    )
}
export default HeatmapDetailsList;
