import * as React from 'react';
import * as strings from 'ReactDatatableWebPartStrings';
import { IIconProps, PrimaryButton } from 'office-ui-fabric-react';
import styles from './ExportListItemsToPDF.module.scss';
import { isNullOrUndefined } from '../../utilities/utilities';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { Content } from "pdfmake/interfaces";
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

interface IExportToPDF {
    listName: string;
    title: string;
    columns: any[];
    oddRowColor?: string;
    evenRowColor?: string;
    dataSource: () => any[];
}

export function ExportListItemsToPDF(props: IExportToPDF) {

    const downloadIcon: IIconProps = { iconName: 'Download' };

    let { title, listName, columns, oddRowColor, evenRowColor, dataSource } = props;

    function genearatePDF() {
        let dataTableRows = dataSource().map(lItem => 
            columns.reduce((arr, c) => {
                const value = lItem[c];
                // Check for null or undefined values
                if (isNullOrUndefined(value)) {
                    arr.push('');
                } 
                // Check if the value is a React element (such as a div with dangerouslySetInnerHTML)
                else if (typeof value === 'object' && value.$$typeof === Symbol.for('react.element')) {
                    //arr.push(value);  // If it's a React element, add it directly to the array
                    arr.push(value.props.dangerouslySetInnerHTML.__html);
                } 
                // Handle other cases (plain strings, numbers, etc.)
                else {
                    arr.push(value);
                }
        
                return arr;
            }, [])
        );
        let data = {
            content: [
                {
                    text: title,
                    fontSize: 16,
                    alignment: 'center',
                    margin: [0, 0, 0, 15]
                } as Content,
                {
                    style: 'tableExample',
                    table: {
                        widths: new Array(columns.length).fill("auto"),
                        headerRows: 1,
                        body: [
                            columns.map(c => ({ text: c, bold: true })),
                            ...dataTableRows
                        ]
                    },
                    layout: {
                        fillColor: (rowIndex: number) => {
                            if (oddRowColor && evenRowColor)
                                return (rowIndex % 2 === 0) ? evenRowColor : oddRowColor;
                            else
                                return (rowIndex % 2 === 0) ? '#CCCCCC' : null;
                        }
                    }
                } as Content
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
