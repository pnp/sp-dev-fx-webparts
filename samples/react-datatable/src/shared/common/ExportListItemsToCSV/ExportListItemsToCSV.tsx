import * as React from 'react';
import * as strings from 'ReactDatatableWebPartStrings';
import { ExportToCsv } from 'export-to-csv';
import { Button } from '@material-ui/core';
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
interface IExportToCSV {
    columnHeader: Array<string>;
    listItems: any[];
    listName: string;
    description: string;
}

export function ExportListItemsToCSV(props: IExportToCSV) {

    let { columnHeader, listItems, listName, description } = props;

    function generateCSV() {
        let colHeader = columnHeader;
        const options = {
            filename: listName,
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: '',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            headers: colHeader
        };
        const csvExporter = new ExportToCsv(options);
        csvExporter.generateCsv(listItems);
    }

    return (
        <Button variant="contained"
            onClick={() => generateCSV()}
            startIcon={<GetAppSharpIcon />}>
            {strings.DownloadAsCSVLabel}
        </Button>
    );

}