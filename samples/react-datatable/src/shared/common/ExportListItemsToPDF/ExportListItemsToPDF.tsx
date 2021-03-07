import * as React from 'react';
import * as strings from 'ReactDatatableWebPartStrings';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Button } from '@material-ui/core';
import GetAppSharpIcon from '@material-ui/icons/GetAppSharp';
interface IExportToPDF {
    htmlElementForPDF: string;
    listName: string;
}

export function ExportListItemsToPDF(props: IExportToPDF) {

    let { htmlElementForPDF, listName } = props;

    function genearatePDF() {
        const doc = new jsPDF();
        autoTable(doc, { html: htmlElementForPDF, theme: 'grid' });
        doc.save(`${listName}.pdf`);
    }

    return (
        <Button variant="contained"
            onClick={() => genearatePDF()}
            startIcon={<GetAppSharpIcon />}>
            {strings.DownloadAsPDFLabel}
        </Button>
    );
}