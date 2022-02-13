import * as React from 'react';
import * as strings from 'ReactDatatableWebPartStrings';
import { ExportToCsv } from 'export-to-csv';
import CsvDownloader from 'react-csv-downloader';
import { IIconProps, PrimaryButton } from 'office-ui-fabric-react';
import styles from './ExportListItemsToCSV.module.scss';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { Button, Chip } from '@material-ui/core';
interface IExportToCSV {
    columnHeader: Array<string>;
    listName: string;
    description: string;
    dataSource: () => any[];
}

export function ExportListItemsToCSV(props: IExportToCSV) {

    const downloadIcon: IIconProps = { iconName: 'Download' };

    let { columnHeader, listName, dataSource } = props;

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
        csvExporter.generateCsv(dataSource());
    }

    return (
        <div style={{width:"fit-content",float:"left"}}>
        <CsvDownloader filename={listName} datas={dataSource()} >
        <Button style={{color:"black"}} variant="outlined" startIcon={<CloudDownload />}>
            {strings.DownloadAsCSVLabel}
        </Button>
        </CsvDownloader>
        </div>
    );
}
