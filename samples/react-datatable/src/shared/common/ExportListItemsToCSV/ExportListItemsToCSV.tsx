import * as React from 'react';
import * as strings from 'ReactDatatableWebPartStrings';
import { ExportToCsv } from 'export-to-csv';
import { IIconProps, PrimaryButton } from 'office-ui-fabric-react';
import styles from './ExportListItemsToCSV.module.scss';
interface IExportToCSV {
    columnHeader: Array<string>;
    listName: string;
    description: string;
    dataSource: ()=> any[];
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
        <PrimaryButton
            text={strings.DownloadAsCSVLabel}
            iconProps={downloadIcon}
            onClick={() => generateCSV()}
            className={styles.btnCSV}
        />
    );
}