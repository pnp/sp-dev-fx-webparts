import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class PdfExportService {
  /**
   * Export specified HTML element to PDF
   * @param elementId HTML element ID to export
   * @param fileName File name for the generated PDF
   */
  public static async exportElementToPdf(elementId: string, fileName: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? 'landscape' : 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${fileName}.pdf`);
  }
}
