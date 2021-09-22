import * as React from 'react';
import * as strings from 'ReactDatatableWebPartStrings';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { IIconProps, PrimaryButton } from 'office-ui-fabric-react';
import styles from './ExportListItemsToPDF.module.scss';
import { isNullOrUndefined } from '../../utilities/utilities';
import { IPropertyPaneDropdownOption } from '@microsoft/sp-property-pane';

interface IExportToPDF {
    listName: string;
    title: string;
    columns: any[];
    oddRowColor?: string;
    evenRowColor?: string;
    dataSource: ()=> any[];
}

export function ExportListItemsToPDF(props: IExportToPDF) {

    const downloadIcon: IIconProps = { iconName: 'Download' };

    let { title, listName, columns, oddRowColor, evenRowColor, dataSource } = props;

    function genearatePDF() {

        let dataTableRows = dataSource().map(lItem => columns.reduce((arr, c) => [...arr, isNullOrUndefined(lItem[c]) ? '' : lItem[c]], []));

        let data = {
            content: [
                {
                    text: title,
                    fontSize: 16,
                    alignment: 'center',
                    margin: [0, 0, 0, 15]
                },
                {
                    style: 'tableExample',
                    table: {
                        widths: new Array(columns.length).fill("auto"),
                        headerRows: 1,
                        body: [
                            columns.map(c=> ({text: c, bold: true})),
                            ...dataTableRows
                        ]
                    },
                    layout: {
                        fillColor: (rowIndex: number)=> {
                            if (oddRowColor && evenRowColor)
                                return (rowIndex % 2 === 0) ? evenRowColor : oddRowColor;
                            else
                                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                        }
                    }
                }
            ]
        };
        pdfMake.createPdf(data).download(`${listName}.pdf`);
    }

    return (
        <PrimaryButton
            text={strings.DownloadAsPDFLabel}
            iconProps={downloadIcon}
            onClick={() => genearatePDF()}
            className={styles.btnPDF}
        />
    );
}
